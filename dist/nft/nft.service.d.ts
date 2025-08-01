import { DefenderService } from './services/defender.service';
import { WalletService } from '../wallet/wallet.service';
import { MintNFTDto } from './dto/mint-nft.dto';
import { TransferNFTDto } from './dto/transfer-nft.dto';
export declare class NftService {
    private defenderService;
    private walletService;
    constructor(defenderService: DefenderService, walletService: WalletService);
    mintNFT(userId: string, mintDto: MintNFTDto): Promise<any>;
    transferNFT(userId: string, transferDto: TransferNFTDto): Promise<any>;
    getUserNFTs(userId: string): Promise<{
        id: string;
    }[]>;
    getNFTDetails(tokenId: string): Promise<any>;
    getTransactionHistory(userId: string): Promise<{
        id: string;
    }[]>;
    private uploadMetadataToIPFS;
    private saveTransaction;
}
