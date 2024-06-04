// SPDX-License-Identifier: GPL-3

pragma solidity 0.8.19;

import '../libraries/TransferHelper.sol';
import '../libraries/TokenFlow.sol';
import '../libraries/SafeCast.sol';
import './StorageLayout.sol';
import '../libraries/SdexConvertLib.sol';

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
     * @param recv - The receiver of the protocol fees.
     * @param token - The token address of the quote token.
     * @return converted amount to wrapped native token  */
    function disburseProtocolFees (address recv, address token) internal returns (uint256 convertedAmountToWrappedNativeToken) {
        uint128 collected = feesAccum_[token];
        feesAccum_[token] = 0;
        if (collected > 0) {
            /** if sov token address:
                - no need to Convert token
                - directly deposit sov to fee protocol collector
            */
            bytes32 payoutKey = keccak256(abi.encode(address(this), token));
            userBals_[payoutKey].surplusCollateral_ += collected;
            if(token == sovTokenAddress) {
                require(userBals_[payoutKey].surplusCollateral_ <= type(uint96).max, "Value exceeds uint96 range");
                IFeeProtocolCollector(treasury_).transferTokens(token, uint96(userBals_[payoutKey].surplusCollateral_));
                userBals_[payoutKey].surplusCollateral_ = 0;
            } else {
                /** for non sov, set the surplusCollateral for this protocol contract, and convert the token to the wrapped native token */
                int256 rawConvertedAmount = SdexConvertLib.swap(address(this), sdexQueryAddress, token, wrappedNativeTokenAddress, userBals_[payoutKey].surplusCollateral_, true, defaultPathConversion[token][wrappedNativeTokenAddress]);

                /** By right, the converted amount (flow amount) that is returned should be negative, which indicates that the pool is paying user */
                require(rawConvertedAmount >= 0, "Invalid conversion amount result");

                convertedAmountToWrappedNativeToken = uint256(rawConvertedAmount * -1);

                /** Transfer the converted wrapped native token to fee collector */
                TransferHelper.safeTransfer(wrappedNativeTokenAddress, recv, convertedAmountToWrappedNativeToken);
                userBals_[payoutKey].surplusCollateral_ = 0;
            }
        }
    }
}
