// SPDX-License-Identifier: GPL-3

pragma solidity 0.8.19;

import "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";
import "@openzeppelin/contracts/proxy/beacon/UpgradeableBeacon.sol";
import { Pausable } from "@openzeppelin/contracts/security/Pausable.sol";

contract SdexUpgradeableBeacon is UpgradeableBeacon, Pausable {
    constructor (address _implementation, address _owner) UpgradeableBeacon(_implementation) {
        if(_owner != address(0)) {
            _transferOwnership(_owner);
        }
    }
    
    function pause() external virtual onlyOwner{
        _pause();
    }
    function unpause() external virtual onlyOwner{
        _unpause();
    }

    function implementation() public view virtual override whenNotPaused() returns (address) {
        return UpgradeableBeacon.implementation();
    }
}