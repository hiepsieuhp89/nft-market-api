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
exports.DefenderService = void 0;
const common_1 = require("@nestjs/common");
const defender_sdk_1 = require("@openzeppelin/defender-sdk");
let DefenderService = class DefenderService {
    constructor() {
        this.defender = new defender_sdk_1.Defender({
            apiKey: process.env.DEFENDER_API_KEY,
            apiSecret: process.env.DEFENDER_API_SECRET,
        });
    }
    async mintNFT(request) {
        try {
            const webhookUrl = process.env.DEFENDER_MINT_WEBHOOK_URL;
            if (!webhookUrl) {
                throw new Error('Defender mint webhook URL not configured');
            }
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'User-Agent': 'NFT-Marketplace-Backend/1.0',
                },
                body: JSON.stringify({
                    action: 'mint',
                    to: request.to,
                    tokenURI: request.tokenURI,
                    price: request.price,
                }),
            });
            if (!response.ok) {
                throw new Error(`Defender API error: ${response.statusText}`);
            }
            const result = await response.json();
            return result;
        }
        catch (error) {
            console.error('Error minting NFT via Defender:', error);
            throw new Error('Failed to mint NFT');
        }
    }
    async transferNFT(request) {
        try {
            const webhookUrl = process.env.DEFENDER_TRANSFER_WEBHOOK_URL;
            if (!webhookUrl) {
                throw new Error('Defender transfer webhook URL not configured');
            }
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'transfer',
                    to: request.to,
                    tokenId: request.tokenId,
                    from: request.from,
                }),
            });
            if (!response.ok) {
                throw new Error(`Defender API error: ${response.statusText}`);
            }
            const result = await response.json();
            return result;
        }
        catch (error) {
            console.error('Error transferring NFT via Defender:', error);
            throw new Error('Failed to transfer NFT');
        }
    }
    async getNFTDetails(tokenId) {
        try {
            const webhookUrl = process.env.DEFENDER_QUERY_WEBHOOK_URL;
            if (!webhookUrl) {
                throw new Error('Defender query webhook URL not configured');
            }
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'getNFT',
                    tokenId,
                }),
            });
            if (!response.ok) {
                throw new Error(`Defender API error: ${response.statusText}`);
            }
            const result = await response.json();
            return result;
        }
        catch (error) {
            console.error('Error getting NFT details via Defender:', error);
            throw new Error('Failed to get NFT details');
        }
    }
    async getNFTsByOwner(ownerAddress) {
        try {
            const webhookUrl = process.env.DEFENDER_QUERY_WEBHOOK_URL;
            if (!webhookUrl) {
                throw new Error('Defender query webhook URL not configured');
            }
            const response = await fetch(webhookUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    action: 'getNFTsByOwner',
                    ownerAddress,
                }),
            });
            if (!response.ok) {
                throw new Error(`Defender API error: ${response.statusText}`);
            }
            const result = await response.json();
            return result;
        }
        catch (error) {
            console.error('Error getting NFTs by owner via Defender:', error);
            throw new Error('Failed to get NFTs by owner');
        }
    }
    async createRelayer(name, network) {
        try {
            const relayer = await this.defender.relay.create({
                name,
                network,
                minBalance: '100000000000000000',
            });
            return relayer;
        }
        catch (error) {
            console.error('Error creating relayer:', error);
            throw new Error('Failed to create relayer');
        }
    }
    async getRelayer(relayerId) {
        try {
            const relayer = await this.defender.relay.get(relayerId);
            return relayer;
        }
        catch (error) {
            console.error('Error getting relayer:', error);
            throw new Error('Failed to get relayer');
        }
    }
};
exports.DefenderService = DefenderService;
exports.DefenderService = DefenderService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], DefenderService);
//# sourceMappingURL=defender.service.js.map