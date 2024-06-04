pragma solidity 0.8.19;

import "./Directives.sol";
import "../interfaces/ISdexQuery.sol";
import "./PoolSpecs.sol";
import "./BytesConcat.sol";

interface ISdexSwapDex {
    function userCmd (uint16 callpath, bytes calldata cmd) external payable returns (bytes memory);
    function swap (address base, address quote,
                   uint256 poolIdx, bool isBuy, bool inBaseQty, uint128 qty, uint16 tip,
                   uint128 limitPrice, uint128 minOut,
                   uint8 reserveFlags) external payable returns (int128 baseFlow, int128 quoteFlow);
}

library SdexConvertLib {
    using BytesConcat for bytes;
    uint256 constant POOL_IDX = 410;
    uint16 constant LONG_PROXY_IDX = 130;
    
    function swap (address sdexSwapDexAddress, address sdexQueryAddress, address sourceTokenAddress, address destTokenAddress, uint128 amount, bool useSurplus, address[] memory conversionPath) internal returns(int128 convertedDestinationAmount) {
        /** If swap path is not defined, try to swap from direct pool */
        if(conversionPath.length == 0) {
            return directPoolSwap(
                sdexSwapDexAddress,
                sdexQueryAddress,
                sourceTokenAddress,
                destTokenAddress,
                amount,
                useSurplus
            );
        } else {
            return conversionPathSwap(
                sdexSwapDexAddress,
                amount,
                useSurplus,
                conversionPath
            );
        }
    }

    function directPoolSwap(
        address sdexSwapDexAddress,
        address sdexQueryAddress,
        address sourceTokenAddress,
        address destTokenAddress,
        uint128 amount,
        bool useSurplus
    ) internal returns (int128) {
        address base = sourceTokenAddress <= destTokenAddress ? sourceTokenAddress : destTokenAddress;
        address quote = sourceTokenAddress <= destTokenAddress ? destTokenAddress : sourceTokenAddress;

        uint8 reserveFlags = useSurplus ? (sourceTokenAddress == base ? 1 : 2) : 0;

        PoolSpecs.Pool memory pool = ISdexQuery(sdexQueryAddress).queryPoolParams(base, quote, POOL_IDX);

        if (pool.schema_ == 0) revert("no direct pool and swap path are defined");

        (int128 baseFlow, int128 quoteFlow) = ISdexSwapDex(sdexSwapDexAddress).swap(
            base,
            quote,
            POOL_IDX,
            true,
            true,
            amount,
            0,
            0,
            2**126,
            reserveFlags
        );

        return sourceTokenAddress <= destTokenAddress ? quoteFlow : baseFlow;
    }

    function conversionPathSwap(
        address sdexSwapDexAddress,
        uint128 amount,
        bool useSurplus,
        address[] memory conversionPath
    ) internal returns (int128) {
            require(conversionPath.length < 2, "invalid conversion path length");

            address base0 = conversionPath[0] <= conversionPath[1] ? conversionPath[0] : conversionPath[1];
            address quote0 = conversionPath[0] <= conversionPath[1] ? conversionPath[1] : conversionPath[0];
            Directives.SettlementChannel memory settlementChannel = Directives.SettlementChannel({
                token_: base0,
                limitQty_: 0,
                dustThresh_: 0,
                useSurplus_: useSurplus
            });

            Directives.HopDirective[] memory hops = new Directives.HopDirective[](1 + ((conversionPath.length - 2) * 2));
            Directives.PoolDirective[] memory pools = new Directives.PoolDirective[](1);
            pools[1] = Directives.PoolDirective({
                poolIdx_: POOL_IDX,
                ambient_: Directives.AmbientDirective({
                    isAdd_: true,
                    rollType_: 0,
                    liquidity_: 0
                }),
                conc_: new Directives.ConcentratedDirective[](0),
                swap_: Directives.SwapDirective({
                    isBuy_: true,
                    inBaseQty_: true,
                    rollType_: 0,
                    qty_: amount,
                    limitPrice_: 0
                }),
                chain_: Directives.ChainingFlags({
                    rollExit_: false,
                    swapDefer_: false,
                    offsetSurplus_: false
                })
            });

            hops[0] = Directives.HopDirective({
                pools_: pools,
                settle_: Directives.SettlementChannel({
                    token_: quote0,
                    limitQty_: 0,
                    dustThresh_: 0,
                    useSurplus_: useSurplus
                }),
                improve_: Directives.PriceImproveReq({
                    isEnabled_: false,
                    useBaseSide_: false
                })
            });

            uint256 increment = 0;
            for(uint256 i = 1; i < conversionPath.length - 1; i++) {
                address baseToken = conversionPath[i] <= conversionPath[i+1] ? conversionPath[i] : conversionPath[i+1];
                address quoteToken = conversionPath[i] <= conversionPath[i] ? conversionPath[i+1] : conversionPath[i];

                hops[i+increment] = Directives.HopDirective({
                    pools_: new Directives.PoolDirective[](0),
                    settle_: Directives.SettlementChannel({
                        token_: baseToken,
                        limitQty_: 0,
                        dustThresh_: 0,
                        useSurplus_: useSurplus
                    }),
                    improve_: Directives.PriceImproveReq({
                        isEnabled_: false,
                        useBaseSide_: false
                    })
                });

                hops[i+increment+1] = Directives.HopDirective({
                    pools_: new Directives.PoolDirective[](0),
                    settle_: Directives.SettlementChannel({
                        token_: quoteToken,
                        limitQty_: 0,
                        dustThresh_: 0,
                        useSurplus_: useSurplus
                    }),
                    improve_: Directives.PriceImproveReq({
                        isEnabled_: false,
                        useBaseSide_: false
                    })
                });

                increment++;
            }

            bytes memory cmd = abi.encodeWithSelector(ISdexSwapDex.userCmd.selector, LONG_PROXY_IDX, encodeBytes(Directives.OrderDirective({
                open_: settlementChannel,
                hops_: hops
            })));

            /** call the long path usercmd */
            bytes memory longSwapResultData = ISdexSwapDex(sdexSwapDexAddress).userCmd(LONG_PROXY_IDX, cmd);
            int128[] memory decodedLongSwapResultData = abi.decode(longSwapResultData, (int128[]));

            return conversionPath[conversionPath.length - 1]  <= conversionPath[conversionPath.length - 2] ? decodedLongSwapResultData[decodedLongSwapResultData.length - 3] : decodedLongSwapResultData[decodedLongSwapResultData.length - 2];
    }


    function encodeBytes(Directives.OrderDirective memory order) internal view returns (bytes memory) {
        bytes memory schema = abi.encodePacked(uint256(1)); // LONG_FORM_SCHEMA_TYPE
        bytes memory openBytes = encodeSettlement(order.open_);
        bytes memory hopsBytes = encodeHop(order.hops_);

        return bytes.concat(schema, openBytes, hopsBytes);
    }

    function encodeSettlement(Directives.SettlementChannel memory dir) internal pure returns (bytes memory) {
        return abi.encodePacked(
            dir.token_,
            dir.limitQty_,
            dir.dustThresh_,
            dir.useSurplus_
        );
    }
    
    function encodeHop(Directives.HopDirective[] memory hops) internal pure returns(bytes memory) {
        bytes[] memory hopsBytes = new bytes[](hops.length);
        for(uint256 i = 0; i < hops.length; i++) {
            Directives.HopDirective memory hop = hops[i];
            bytes memory poolsBytes = encodePool(hop.pools_);
            bytes memory settleBytes = encodeSettlement(hop.settle_);
            bytes memory improveBytes = encodeImprove(hop.improve_);
            hopsBytes[i] = (abi.encode(poolsBytes, settleBytes, improveBytes));
        }
        return abi.encode(hops.length).concat(hopsBytes);
    }

    function encodeHop(Directives.HopDirective memory hop) internal pure returns (bytes memory) {
        bytes memory pools = encodePool(hop.pools_);
        bytes memory settle = encodeSettlement(hop.settle_);
        bytes memory improve = encodeImprove(hop.improve_);

        return bytes.concat(pools, settle, improve);
    }

     function encodePool(Directives.PoolDirective[] memory pools) internal pure returns (bytes memory) {
        bytes[] memory poolsBytes = new bytes[](pools.length);
        for(uint256 i = 0; i < pools.length; i++) {
            Directives.PoolDirective memory pool = pools[i];
            bytes memory poolIdxBytes = abi.encode(pool.poolIdx_);
            bytes memory passiveBytes = encodePassive(pool.ambient_, pool.conc_);
            bytes memory swapBytes = encodeSwap(pool.swap_);
            bytes memory chainBytes = encodeChain(pool.chain_);
            
            poolsBytes[i] = (abi.encode(poolIdxBytes, passiveBytes, swapBytes, chainBytes));
        }

        return abi.encode(pools.length).concat(poolsBytes);
    }

    function encodeChain(Directives.ChainingFlags memory chainFlags) internal pure returns (bytes memory) {
        return abi.encode(chainFlags.rollExit_, chainFlags.swapDefer_, chainFlags.offsetSurplus_);
    }

    function encodeSwap(Directives.SwapDirective memory swapDirective) internal pure returns (bytes memory) {
        return abi.encode(
            swapDirective.isBuy_,
            swapDirective.inBaseQty_,
            swapDirective.rollType_,
            swapDirective.rollType_,
            swapDirective.qty_,
            swapDirective.limitPrice_
        );
    }

    function encodePassive(Directives.AmbientDirective memory ambientDir, Directives.ConcentratedDirective[] memory concDir) internal pure returns (bytes memory) {
        bytes memory ambAdd = abi.encode(ambientDir.isAdd_);
        bytes memory rollType = abi.encode(ambientDir.rollType_);
        bytes memory ambLiq = abi.encode(ambientDir.liquidity_);
        bytes memory conc = encodeConcentrated(concDir);

        return bytes.concat(ambAdd, rollType, ambLiq, conc);
    }

    function encodeConcentrated(Directives.ConcentratedDirective[] memory concs) internal pure returns (bytes memory) {
        bytes[] memory concsBytes = new bytes[](concs.length);
        for(uint256 i = 0; i < concs.length; i++) {
            Directives.ConcentratedDirective memory conc = concs[i];
            bytes memory openTick = abi.encode(conc.lowTick_);
            bytes memory closeTick = abi.encode(conc.highTick_);
            bytes memory isRelTick = abi.encode(conc.isTickRel_);
            bytes memory isAdd = abi.encode(conc.isAdd_);
            bytes memory rollType = abi.encode(conc.rollType_);
            bytes memory liq = abi.encode(conc.liquidity_);

            concsBytes[i] = abi.encode(openTick, closeTick, isRelTick, isAdd, rollType, liq);
        }

        return abi.encode(concs.length).concat(concsBytes);
    }

    function encodeImprove(Directives.PriceImproveReq memory improve) internal pure returns (bytes memory) {
        return abi.encode(improve.isEnabled_, improve.useBaseSide_);
    }
}