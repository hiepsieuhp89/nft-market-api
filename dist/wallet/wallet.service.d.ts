import { ethers } from 'ethers';
export interface WalletData {
    address: string;
    privateKey: string;
    mnemonic?: string;
}
export declare class WalletService {
    generateWallet(): Promise<WalletData>;
    saveWallet(userId: string, walletData: WalletData): Promise<void>;
    getWallet(userId: string): Promise<{
        address: string;
    } | null>;
    getWalletForSigning(userId: string): Promise<ethers.Wallet | null>;
    getWalletBalance(address: string): Promise<{
        balance: string;
        balanceInEth: string;
    }>;
    private encryptPrivateKey;
    private decryptPrivateKey;
    isValidAddress(address: string): boolean;
}
