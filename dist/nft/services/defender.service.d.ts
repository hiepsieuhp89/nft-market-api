export interface MintNFTRequest {
    to: string;
    tokenURI: string;
    price: string;
}
export interface TransferNFTRequest {
    to: string;
    tokenId: string;
    from: string;
}
export declare class DefenderService {
    private defender;
    constructor();
    mintNFT(request: MintNFTRequest): Promise<any>;
    transferNFT(request: TransferNFTRequest): Promise<any>;
    getNFTDetails(tokenId: string): Promise<any>;
    getNFTsByOwner(ownerAddress: string): Promise<any>;
    createRelayer(name: string, network: string): Promise<any>;
    getRelayer(relayerId: string): Promise<any>;
}
