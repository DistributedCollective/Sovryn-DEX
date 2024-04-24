// SPDX-License-Identifier: GPL-3 

pragma solidity 0.8.19;

import '../libraries/CurveCache.sol';

/* @notice Simple interface that defines the surface between the SdexSwapDex
 *         itself and protocol governance and policy. All governance actions are
 *         are executed through the single protocolCmd() method. */
interface ISdexMinion {

    /* @notice Calls a general governance authorized command on the SdexSwapDex contract.
     *
     * @param proxyPath The proxy callpath sidecar to execute the command within. (Will
     *                  call protocolCmd
     * @param cmd       The underlying command content to pass to the proxy sidecar call.
     *                  Will DELEGATECALL (protocolCmd(cmd) on the sidecar proxy.
     * @param sudo      Set to true for commands that require escalated privilege (e.g. 
     *                  authority transfers or upgrades.) The ability to call with sudo 
     *                  true should be reserved for privileged callpaths in the governance
     *                  controller contract. */
    function protocolCmd (uint16 proxyPath, bytes calldata cmd, bool sudo)
        payable external;
}

/* @notice Interface for a contract that directly governs a SdexSwap dex contract. */
interface ISdexMaster {
    /* @notice Used to validate governance contract to prevent authority transfer to an
     *         an invalid address or contract. */
    function acceptsSdexAuthority() external returns (bool);
}