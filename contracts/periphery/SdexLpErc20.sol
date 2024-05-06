// SPDX-License-Identifier: GPL-3

pragma solidity 0.8.19;

import "../libraries/PoolSpecs.sol";
import "../interfaces/ISdexLpConduit.sol";
import "../interfaces/ISdexMinion.sol";
import { ERC20Upgradeable } from "@openzeppelin/contracts-upgradeable/token/ERC20/ERC20Upgradeable.sol";
import { IERC20MetadataUpgradeable } from "@openzeppelin/contracts-upgradeable/interfaces/IERC20MetadataUpgradeable.sol";
import { IERC20MetadataUpgradeable } from "@openzeppelin/contracts-upgradeable/interfaces/IERC20MetadataUpgradeable.sol";

import { Address } from "@openzeppelin/contracts/utils/Address.sol";

contract SdexLpErc20 is ERC20Upgradeable, ISdexLpConduit {
    using Address for address;
    bytes32 public poolHash;
    address public baseToken;
    address public quoteToken;
    uint256 public poolType;
    address public sdex;

    modifier onlySdex() {
        require(msg.sender == sdex, "SdexLpErc20: only Sdex");
        _;
    }

    constructor() {
      _disableInitializers();
    }
    
    function initialize (address _base, address _quote, uint256 _poolIdx, address _sdex) public initializer {

         //ERC20 ("Sdex Ambient LP ERC20 Token", "LP-SdexAmb", 18) {

        // SdexSwap protocol uses 0x0 for native ETH, so it's possible that base
        // token could be 0x0, which means the pair is against native ETH. quote
        // will never be 0x0 because native ETH will always be the base side of
        // the pair.
        require(
            (_base == address(0) || _base.isContract()) 
            && _base != address(this),
            "Invalid Base Token");
        require(
            _quote.isContract() 
            && _quote != address(this),
            "Invalid Quote Token");
        require(
            _quote > _base, 
            "Invalid Token Pair"
        );


        bytes memory callData = abi.encodeWithSignature("acceptSdexDex()");
        (bool success, bytes memory data) = _sdex.call(callData);
        require(success && abi.decode(data, (bool)), "SdexLpErc20: Wrong _dex address - acceptSdexDex() failed");

        baseToken = _base;
        quoteToken = _quote;
        poolType = _poolIdx;
        poolHash = PoolSpecs.encodeKey(_base, _quote, _poolIdx);
        sdex = _sdex;

        string memory baseTokenSymbol = "ETH";
        string memory quoteTokenSymbol = "ETH";

        if(baseToken != address(0)) {
            baseTokenSymbol = IERC20MetadataUpgradeable(baseToken).symbol();
        } 
        if(quoteToken != address(0)) {
            quoteTokenSymbol = IERC20MetadataUpgradeable(quoteToken).symbol();
        }

        __ERC20_init(string.concat("Sdex Ambient LP ERC20 ", baseTokenSymbol, "/",  quoteTokenSymbol, " Token"), string.concat("LP-SdexAmb-", baseTokenSymbol, "/", quoteTokenSymbol));
    }
    
    function depositSdexLiq (address sender, bytes32 pool,
                             int24 lowerTick, int24 upperTick, uint128 seeds,
                             uint72) public override onlySdex returns (bool) {
        require(pool == poolHash, "Wrong pool");
        require(lowerTick == 0 && upperTick == 0, "Non-Ambient LP Deposit");
        _mint(sender, seeds);
        return true;
    }

    function withdrawSdexLiq (address sender, bytes32 pool,
                              int24 lowerTick, int24 upperTick, uint128 seeds,
                              uint72) public override onlySdex returns (bool) {
        require(pool == poolHash, "Wrong pool");
        require(lowerTick == 0 && upperTick == 0, "Non-Ambient LP Deposit");
        _burn(sender, seeds);
        return true;
    }

}
