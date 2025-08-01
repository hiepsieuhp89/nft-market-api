import { NftService } from './nft.service';
import { MintNFTDto } from './dto/mint-nft.dto';
import { TransferNFTDto } from './dto/transfer-nft.dto';
export declare class NftController {
    private nftService;
    constructor(nftService: NftService);
    mintNFT(req: any, mintDto: MintNFTDto): Promise<any>;
    transferNFT(req: any, transferDto: TransferNFTDto): Promise<any>;
    getUserNFTs(req: any): Promise<{
        id: string;
    }[]>;
    getNFTDetails(tokenId: string): Promise<any>;
    getTransactionHistory(req: any): Promise<{
        id: string;
    }[]>;
}
