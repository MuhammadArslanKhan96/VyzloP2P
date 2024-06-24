import Cookies from 'js-cookie';

// Function to set wallet address in a cookie
export const setWalletAddress = (walletAddress: any): void => {
  Cookies.set('walletAddress', walletAddress, { expires: 7 }); // Cookie will expire in 7 days
};

// Function to get wallet address from a cookie
export const getWalletAddress = (): string | undefined => {
  return Cookies.get('walletAddress');
};

// Function to remove wallet address from a cookie
export const removeWalletAddress = (): void => {
  Cookies.remove('walletAddress');
};
