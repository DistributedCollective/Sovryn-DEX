// SPDX-License-Identifier: GPL-3

pragma solidity 0.8.19;

import "../governance/SdexPolicy.sol";
import "../SdexSwapDex.sol";
import "hardhat/console.sol";

contract MockTimelock {

    address public policy_;

    constructor (address policy) {
        policy_ = policy;
    }

    function acceptAdmin() public payable { 
        require(msg.sender == policy_);
    }

    function treasuryResolution (address minion, uint16 proxyPath,
                                 bytes calldata cmd, bool sudo) public {
        return SdexPolicy(policy_).treasuryResolution(minion, proxyPath, cmd, sudo);
    }

    function opsResolution (address minion, uint16 proxyPath,
                            bytes calldata cmd) public {
        return SdexPolicy(policy_).opsResolution(minion, proxyPath, cmd);
    }

    function transferGovernance (address treasury, address ops, address emergency) public {
        return SdexPolicy(policy_).transferGovernance(treasury, ops, emergency);
    }

    function emergencyHalt (address minion, string calldata reason) public {
        return SdexPolicy(policy_).emergencyHalt(minion, reason);
    }

    function emergencyReset (address conduit, uint16 proxyPath, string calldata reason) public {
        return SdexPolicy(policy_).emergencyReset(conduit, proxyPath, reason);
    }

    function forcePolicy (address conduit, uint16 proxyPath, SdexPolicy.PolicyRule calldata policy) public {
        return SdexPolicy(policy_).forcePolicy(conduit, proxyPath, policy);
    }

    function setPolicy (address conduit, uint16 proxyPath, SdexPolicy.PolicyRule calldata policy) public {
        return SdexPolicy(policy_).setPolicy(conduit, proxyPath, policy);
    }

    function userCmd (address minion, uint16 proxyPath,
                            bytes calldata cmd) public {
        SdexSwapDex(minion).userCmd(proxyPath, cmd);
    }
}
