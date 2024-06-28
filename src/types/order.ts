export interface Order {
    country: any;
    time(time: any): import("react").ReactNode;
    paymentMethod: any;
    min: any;
    max: any;
    price: any;
    method: string;
    fiatCurrency: any;
    cryptoSymbol: any;
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