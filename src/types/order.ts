export interface Order {
    key: string;
    advertiser: string;
    value: string;
    fiat: string;
    payMethod: string;
    boundries: string;
    available: string;
    symbol: string;
    blockChain: string;
    type: number;
    wallet: string;
    isOpen?: boolean;
}