// SPDX-License-Identifier: GPL-3

pragma solidity 0.8.19;

import '../libraries/TransferHelper.sol';
import '../libraries/TokenFlow.sol';
import '../libraries/SafeCast.sol';
import './StorageLayout.sol';

import '../interfaces/IFeeProtocolCollector.sol';

/* @title Protocol Account Mixin
 * @notice Tracks and pays out the accumulated protocol fees across the entire exchange 
 *         These are the fees belonging to the SdexSwap protocol, not the liquidity 
 *         miners.
 * @dev Unlike liquidity fees, protocol fees are accumulated as resting tokens 
 *      instead of ambient liquidity. */
contract ProtocolAccount is StorageLayout  {
    using SafeCast for uint256;
    using TokenFlow for address;

    address public constant PROTOCOL_FEES_RECEIVER_HASH =
        address(uint160(uint256(keccak256("PROTOCOL_FEES_RECEIVER_HASH"))));
    
    /* @notice Called at the completion of a swap event, incrementing any protocol
     *         fees accumulated in the swap. */
    function accumProtocolFees (TokenFlow.PairSeq memory accum) internal {
        accumProtocolFees(accum.flow_, accum.baseToken_, accum.quoteToken_);
    }

    /* @notice Increments the protocol's account with the fees collected on the pair. */
    function accumProtocolFees (Chaining.PairFlow memory accum,
                                address base, address quote) internal {
        if (accum.baseProto_ > 0) {
            feesAccum_[base] += accum.baseProto_;
        }
        if (accum.quoteProto_ > 0) {
            feesAccum_[quote] += accum.quoteProto_;
        }
    }

    /* @notice Pays out the earned, but unclaimed protocol fees in the pool.
     * @param tokens - The token address of the quote token.
     */
    function disburseProtocolFees (address[] memory tokens) internal {
        for(uint256 i = 0; i < tokens.length; i++) {
            address token = tokens[i];
            uint128 collected = feesAccum_[token];
            feesAccum_[token] = 0;
            if (collected > 0) {
                /**
                * directly deposit token to fee protocol collector
                */
                bytes32 payoutKey = keccak256(abi.encode(PROTOCOL_FEES_RECEIVER_HASH, token));
                userBals_[payoutKey].surplusCollateral_ += collected;
                require(userBals_[payoutKey].surplusCollateral_ <= type(uint96).max, "Value exceeds uint96 range");

                uint256 amountToTransfer = uint96(userBals_[payoutKey].surplusCollateral_);

                IERC20Minimal(token).approve(treasury_, amountToTransfer);
                IFeeProtocolCollector(treasury_).transferTokens(token, uint96(amountToTransfer));
                userBals_[payoutKey].surplusCollateral_ = 0;
            }
        }
    }
}
