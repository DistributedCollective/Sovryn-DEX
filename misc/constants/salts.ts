import { BigNumber } from "ethers"

const CREATE2_SALTS = new Map<string, string>()

// Tenderly Virtual Network
CREATE2_SALTS.set('0xb5E3dbAF69A46B71Fe9c055e6Fa36992ae6b2c1A'.toLowerCase(), 
    '0xf65e6cba5ef8888d94b33db600156ced592399a5e42bbd56f31fff4c9135677a')

// sepolia
CREATE2_SALTS.set('0x609Ac40043aea999b7d8b7eE8B6e094b32ff4757'.toLowerCase(), 
    '0x3ee464bd0614d5a14688e25333e69650ba9fb97ea27f1fb110e16cf3c62325f6')

// sepolia
CREATE2_SALTS.set('0x1a612d26bB8d612c66F8c6ee345afd7e7936c32a'.toLowerCase(), 
    '0x9060f59924b860979c66134a7f4c6dbb602466d0882949f0df4bdbf5765fbd35')

CREATE2_SALTS.set('0xac2d05A148aB512EDEDc7280c00292ED33d31f1A'.toLowerCase(), 
    '0x25ef3124b85daed03404c5f8316fe84de2b740b2e40bb68d427d2ffaf965f558')

// bitlayer
CREATE2_SALTS.set('0xb5E3dbAF69A46B71Fe9c055e6Fa36992ae6b2c1A'.toLowerCase(), 
    '0x25ef3124b85daed03404c5f8316fe84de2b740b2e40bb68d427d2ffaf965f558')


export function mapSalt(deployerAddr: string): BigNumber {
    console.log("salts deployerAddr:", deployerAddr.toLowerCase());
    const lookup = CREATE2_SALTS.get(deployerAddr.toLowerCase())
    if (!lookup) {
        throw new Error(`No salt found for ${deployerAddr}`)
    }
    return BigNumber.from(lookup)
}
