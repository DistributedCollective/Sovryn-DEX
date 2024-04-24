// SPDX-License-Identifier: GPL-3

pragma solidity 0.8.19;

import "../interfaces/ISdexMinion.sol";

contract MockMinion is ISdexMinion {

    bytes[] public userCmds_;
    bytes[] public protoCmds_;
    uint16[] public paths_;
    address[] public callers_;
    bool[] public sudos_;

    function protocolCmd (uint16 proxyPath, bytes calldata cmd, bool sudo) public payable
        override {
        paths_.push(proxyPath);
        protoCmds_.push(cmd);
        callers_.push(tx.origin);
        sudos_.push(sudo);
    }

    function userCmd (uint16 proxyPath, bytes calldata cmd) public payable returns
        (bytes memory) {
        paths_.push(proxyPath);
        userCmds_.push(cmd);
        callers_.push(tx.origin);
        return abi.encode();
    }

    function acceptSdexDex() public pure returns (bool) { return true; }
}

contract MockMaster is ISdexMaster {

    address dex_;

    constructor (address dex) {
        dex_ = dex;
    }

    function protocolCmd (uint16 proxyPath, bytes calldata cmd, bool sudo) public payable {
        ISdexMinion(dex_).protocolCmd(proxyPath, cmd, sudo);
    }

    function acceptsSdexAuthority() override external pure returns (bool) { return true; }
}
