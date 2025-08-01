"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletService = void 0;
const common_1 = require("@nestjs/common");
const ethers_1 = require("ethers");
const admin = require("firebase-admin");
let WalletService = class WalletService {
    async generateWallet() {
        const wallet = ethers_1.ethers.Wallet.createRandom();
        return {
            address: wallet.address,
            privateKey: wallet.privateKey,
            mnemonic: wallet.mnemonic?.phrase,
        };
    }
    async saveWallet(userId, walletData) {
        try {
            const encryptedPrivateKey = this.encryptPrivateKey(walletData.privateKey);
            const walletDoc = {
                userId,
                address: walletData.address,
                encryptedPrivateKey,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            };
            await admin.firestore()
                .collection('wallets')
                .doc(userId)
                .set(walletDoc);
        }
        catch (error) {
            console.error('Error saving wallet:', error);
            throw new Error('Failed to save wallet data');
        }
    }
    async getWallet(userId) {
        try {
            const walletDoc = await admin.firestore()
                .collection('wallets')
                .doc(userId)
                .get();
            if (!walletDoc.exists) {
                return null;
            }
            const walletData = walletDoc.data();
            return {
                address: walletData.address,
            };
        }
        catch (error) {
            console.error('Error getting wallet:', error);
            return null;
        }
    }
    async getWalletForSigning(userId) {
        try {
            const walletDoc = await admin.firestore()
                .collection('wallets')
                .doc(userId)
                .get();
            if (!walletDoc.exists) {
                return null;
            }
            const walletData = walletDoc.data();
            const privateKey = this.decryptPrivateKey(walletData.encryptedPrivateKey);
            return new ethers_1.ethers.Wallet(privateKey);
        }
        catch (error) {
            console.error('Error getting wallet for signing:', error);
            return null;
        }
    }
    async getWalletBalance(address) {
        try {
            const provider = new ethers_1.ethers.JsonRpcProvider(process.env.RPC_URL);
            const balance = await provider.getBalance(address);
            return {
                balance: balance.toString(),
                balanceInEth: ethers_1.ethers.formatEther(balance),
            };
        }
        catch (error) {
            console.error('Error getting wallet balance:', error);
            throw new Error('Failed to get wallet balance');
        }
    }
    encryptPrivateKey(privateKey) {
        const key = process.env.ENCRYPTION_KEY || 'default-key-change-in-production';
        let encrypted = '';
        for (let i = 0; i < privateKey.length; i++) {
            encrypted += String.fromCharCode(privateKey.charCodeAt(i) ^ key.charCodeAt(i % key.length));
        }
        return Buffer.from(encrypted).toString('base64');
    }
    decryptPrivateKey(encryptedPrivateKey) {
        const key = process.env.ENCRYPTION_KEY || 'default-key-change-in-production';
        const encrypted = Buffer.from(encryptedPrivateKey, 'base64').toString();
        let decrypted = '';
        for (let i = 0; i < encrypted.length; i++) {
            decrypted += String.fromCharCode(encrypted.charCodeAt(i) ^ key.charCodeAt(i % key.length));
        }
        return decrypted;
    }
    isValidAddress(address) {
        return ethers_1.ethers.isAddress(address);
    }
};
exports.WalletService = WalletService;
exports.WalletService = WalletService = __decorate([
    (0, common_1.Injectable)()
], WalletService);
//# sourceMappingURL=wallet.service.js.map