// SPDX-License-Identifier: GPL-3

pragma solidity 0.8.19;
pragma experimental ABIEncoderV2;

import '@openzeppelin/contracts/access/Ownable.sol';
import '../proxy/SdexBeaconProxy.sol';
import { Address } from "@openzeppelin/contracts/utils/Address.sol";

contract SdexLpTokenDeployer is Ownable {
    using Address for address;
    address public immutable lpTokenBeaconAddress;

    event LpTokenBeaconSet (address indexed oldLpTokenBeaconAddress, address indexed newLpTokenBeaconAddress);
    event LpTokenCreated(address indexed base, address indexed quote, uint256 poolIdx, address sdex, address lpTokenAddress);

    constructor(address _lpTokenBeaconAddress) {
        require(_lpTokenBeaconAddress.isContract(), "invalid lpTokenBeaconAddress");
        lpTokenBeaconAddress = _lpTokenBeaconAddress;
    }

    function deployLpToken(address base, address quote, uint256 poolIdx, address sdex) external returns(address) {
        address lpTokenAddress = address(new SdexBeaconProxy(lpTokenBeaconAddress, abi.encodeWithSignature(
            "initialize(address,address,uint256,address)",
            base,
            quote,
            poolIdx,
            sdex
        )));

        emit LpTokenCreated(base, quote, poolIdx, sdex, lpTokenAddress);
        return lpTokenAddress;
    }
}