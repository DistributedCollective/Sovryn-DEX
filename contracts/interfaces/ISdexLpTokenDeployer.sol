// SPDX-License-Identifier: GPL-3 

pragma solidity 0.8.19;

interface ISdexLpTokenDeployer {
    function deployLpToken(address base, address quote, uint256 poolIdx, address sdex) external returns(address);
}
