"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftService = void 0;
const common_1 = require("@nestjs/common");
const admin = require("firebase-admin");
const defender_service_1 = require("./services/defender.service");
const wallet_service_1 = require("../wallet/wallet.service");
let NftService = class NftService {
    constructor(defenderService, walletService) {
        this.defenderService = defenderService;
        this.walletService = walletService;
    }
    async mintNFT(userId, mintDto) {
        try {
            const wallet = await this.walletService.getWallet(userId);
            if (!wallet) {
                throw new Error('User wallet not found');
            }
            const metadata = {
                name: mintDto.name,
                description: mintDto.description,
                image: mintDto.imageUrl,
                attributes: [
                    {
                        trait_type: 'Creator',
                        value: userId,
                    },
                    {
                        trait_type: 'Created At',
                        value: new Date().toISOString(),
                    },
                ],
            };
            const tokenURI = await this.uploadMetadataToIPFS(metadata);
            const mintResult = await this.defenderService.mintNFT({
                to: wallet.address,
                tokenURI,
                price: mintDto.price.toString(),
            });
            const nftData = {
                userId,
                name: mintDto.name,
                description: mintDto.description,
                imageUrl: mintDto.imageUrl,
                price: mintDto.price,
                walletAddress: wallet.address,
                tokenId: mintResult.tokenId,
                tokenURI,
                transactionHash: mintResult.transactionHash,
                blockNumber: mintResult.blockNumber,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
                isTransferred: false,
            };
            const docRef = await admin.firestore()
                .collection('nfts')
                .add(nftData);
            await this.saveTransaction({
                userId,
                walletAddress: wallet.address,
                type: 'mint',
                tokenId: mintResult.tokenId,
                nftName: mintDto.name,
                transactionHash: mintResult.transactionHash,
                blockNumber: mintResult.blockNumber,
                status: 'confirmed',
            });
            return {
                id: docRef.id,
                ...mintResult,
                metadata,
            };
        }
        catch (error) {
            console.error('Error minting NFT:', error);
            throw new Error(`Failed to mint NFT: ${error.message}`);
        }
    }
    async transferNFT(userId, transferDto) {
        try {
            const wallet = await this.walletService.getWallet(userId);
            if (!wallet) {
                throw new Error('User wallet not found');
            }
            const nftDoc = await admin.firestore()
                .collection('nfts')
                .where('tokenId', '==', transferDto.tokenId)
                .where('userId', '==', userId)
                .where('isTransferred', '==', false)
                .limit(1)
                .get();
            if (nftDoc.empty) {
                throw new Error('NFT not found or already transferred');
            }
            const transferResult = await this.defenderService.transferNFT({
                from: wallet.address,
                to: transferDto.to,
                tokenId: transferDto.tokenId,
            });
            const nftDocRef = nftDoc.docs[0].ref;
            await nftDocRef.update({
                isTransferred: true,
                transferredTo: transferDto.to,
                transferredAt: admin.firestore.FieldValue.serverTimestamp(),
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            });
            await this.saveTransaction({
                userId,
                walletAddress: wallet.address,
                type: 'transfer',
                tokenId: transferDto.tokenId,
                nftName: nftDoc.docs[0].data().name,
                transactionHash: transferResult.transactionHash,
                blockNumber: transferResult.blockNumber,
                status: 'confirmed',
                recipientAddress: transferDto.to,
            });
            return transferResult;
        }
        catch (error) {
            console.error('Error transferring NFT:', error);
            throw new Error(`Failed to transfer NFT: ${error.message}`);
        }
    }
    async getUserNFTs(userId) {
        try {
            const nftsSnapshot = await admin.firestore()
                .collection('nfts')
                .where('userId', '==', userId)
                .where('isTransferred', '==', false)
                .orderBy('createdAt', 'desc')
                .get();
            const nfts = nftsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            return nfts;
        }
        catch (error) {
            console.error('Error getting user NFTs:', error);
            throw new Error('Failed to get user NFTs');
        }
    }
    async getNFTDetails(tokenId) {
        try {
            const nftSnapshot = await admin.firestore()
                .collection('nfts')
                .where('tokenId', '==', tokenId)
                .limit(1)
                .get();
            if (!nftSnapshot.empty) {
                return {
                    id: nftSnapshot.docs[0].id,
                    ...nftSnapshot.docs[0].data(),
                };
            }
            const blockchainData = await this.defenderService.getNFTDetails(tokenId);
            return blockchainData;
        }
        catch (error) {
            console.error('Error getting NFT details:', error);
            throw new Error('Failed to get NFT details');
        }
    }
    async getTransactionHistory(userId) {
        try {
            const transactionsSnapshot = await admin.firestore()
                .collection('transactions')
                .where('userId', '==', userId)
                .orderBy('createdAt', 'desc')
                .limit(50)
                .get();
            const transactions = transactionsSnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));
            return transactions;
        }
        catch (error) {
            console.error('Error getting transaction history:', error);
            throw new Error('Failed to get transaction history');
        }
    }
    async uploadMetadataToIPFS(metadata) {
        const metadataString = JSON.stringify(metadata);
        const base64Data = Buffer.from(metadataString).toString('base64');
        return `data:application/json;base64,${base64Data}`;
    }
    async saveTransaction(transactionData) {
        try {
            await admin.firestore()
                .collection('transactions')
                .add({
                ...transactionData,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
            });
        }
        catch (error) {
            console.error('Error saving transaction:', error);
        }
    }
};
exports.NftService = NftService;
exports.NftService = NftService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [defender_service_1.DefenderService,
        wallet_service_1.WalletService])
], NftService);
//# sourceMappingURL=nft.service.js.map