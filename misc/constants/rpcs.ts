

export const RPC_URLS = {
    'mock': "http://127.0.0.1:8545/",
    '0x1': `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`,
    '0x1B669': 'https://virtual.mainnet.rpc.tenderly.co/4a0f7fb8-07fb-4cdd-baad-ec76fc7c6233',
    '0x97114F': 'https://bob-sepolia.rpc.caldera.xyz/http',
    '0xaa36a7': `https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`,
    '0xed88': `https://rpc.gobob.xyz/`, // BOB mainnet
    '0x6f': `https://testnet.rpc.gobob.xyz/`, // BOB testnet (L2 on Sepolia) 
    '0x03106a': `https://rpc.ankr.com/bitlayer_testnet`,
}
