export type SupportedBlockchains = "ZETA" | "POLYGON" | "BSC";


export interface Chain {
    chainId: string,
    chainName: string,
    nativeCurrency: {
        name: string,
        symbol: string,
        decimals: number,
    },
    rpcUrls: string[],
}