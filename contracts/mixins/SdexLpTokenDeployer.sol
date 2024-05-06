// SPDX-License-Identifier: GPL-3

pragma solidity 0.8.19;
pragma experimental ABIEncoderV2;

import '@openzeppelin/contracts/access/Ownable.sol';
import '../proxy/SdexBeaconProxy.sol';
import { Address } from "@openzeppelin/contracts/utils/Address.sol";

contract SdexLpTokenDeployer is Ownable {
    using Address for address;
    address public lpTokenBeaconAddress;

    event LpTokenBeaconSet (address indexed oldLpTokenBeaconAddress, address indexed newLpTokenBeaconAddress);
    event LpTokenCreated(address indexed base, address indexed quote, uint256 poolIdx, address sdex, address lpTokenAddress);

    constructor(address _lpTokenBeaconAddress) {
        require(_lpTokenBeaconAddress.isContract(), "invalid lpTokenBeaconAddress");
        lpTokenBeaconAddress = _lpTokenBeaconAddress;
    }

    function setLpTokenBeaconAddress(address _newLpTokenBeaconAddress) external onlyOwner {
        require(_newLpTokenBeaconAddress.isContract(), "invalid _newLpTokenBeaconAddress");
        emit LpTokenBeaconSet(lpTokenBeaconAddress, _newLpTokenBeaconAddress);

        lpTokenBeaconAddress = _newLpTokenBeaconAddress;
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