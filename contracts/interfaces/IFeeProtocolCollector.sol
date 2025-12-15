// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity 0.8.19;

/// @title Minimal ERC20 interface for Uniswap
/// @notice Contains a subset of the full ERC20 interface that is used in Uniswap V3
interface IFeeProtocolCollector {
   	function transferTokens(address _token, uint96 _amount) external;
}
