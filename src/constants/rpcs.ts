import { Chain, SupportedBlockchains } from "@/types"

export const chains: Record<SupportedBlockchains, Chain> = {
    POLYGON: {
        chainId: `0x${Number("80002").toString(16)}`,
        chainName: "Polygon Amoy Testnet",
        nativeCurrency: {
            name: "MATIC",
            symbol: "MATIC",
            decimals: 18,
        },
        rpcUrls: [
            "https://polygon-amoy.blockpi.network/v1/rpc/public",
        ],
    },
    BSC: {
        chainId: `0x${Number("97").toString(16)}`,
        chainName: "BNB Testnet",
        nativeCurrency: {
            name: "tBNB",
            symbol: "tBNB",
            decimals: 18,
        },
        rpcUrls: [
            "https://bsc-testnet-rpc.publicnode.com	",
        ],
    },
    ZETA: {
        chainId: `0x${Number("7001").toString(16)}`,
        chainName: "ZetaChain Athens 3 Testnet",
        nativeCurrency: {
            name: "ZETA",
            symbol: "ZETA",
            decimals: 18,
        },
        rpcUrls: [
            "https://zetachain-athens-evm.blockpi.network/v1/rpc/public",
        ],
    }
}

export const networkIds = {
    ZETA: 7001,
    BSC: 97,
    POLYGON: 80002
}

export const addresses = {
    ZETA: "0x2B8F40e76c2077a4b0aFb5c4dfe3A41b239E21Cf",
    BSC: "0xE904b252A50007Ca54e4f69b8D915383810ea19F",
    POLYGON: "0x91873fC97aa7c88f70c11fE089e603b15001Ac21"
}