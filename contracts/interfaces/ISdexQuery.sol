// SPDX-License-Identifier: GPL-2.0-or-later
pragma solidity 0.8.19;

import "../libraries/PoolSpecs.sol";

interface ISdexQuery {
    function queryPoolParams (address base, address quote, uint256 poolIdx) external view returns (PoolSpecs.Pool memory pool);
}