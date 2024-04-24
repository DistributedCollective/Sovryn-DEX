// SPDX-License-Identifier: GPL-3
pragma solidity 0.8.19;

import "@openzeppelin/contracts/proxy/beacon/BeaconProxy.sol";

interface IOwnable {
    function owner() external view returns (address);
}

contract SdexBeaconProxy is BeaconProxy {
   constructor(address _beaconAddress, bytes memory _data) payable BeaconProxy(_beaconAddress, _data) {}

   function getBeacon() external view returns (address) {
      return _getBeacon();
   }

   modifier onlyBeaconOwner {
      require(msg.sender == IOwnable(_getBeacon()).owner(), "Only beacon owner");
      _;
   }

   function setBeacon(address _newBeacon, bytes memory _data) external virtual onlyBeaconOwner {
      _setBeacon(_newBeacon, _data);
   }

}