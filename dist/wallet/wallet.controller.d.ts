import { WalletService } from './wallet.service';
export declare class WalletController {
    private walletService;
    constructor(walletService: WalletService);
    getWalletInfo(req: any): Promise<{
        message: string;
    } | {
        balance: string;
        balanceInEth: string;
        address: string;
        message?: undefined;
    }>;
    getBalance(address: string): Promise<{
        balance: string;
        balanceInEth: string;
    } | {
        error: string;
    }>;
}
