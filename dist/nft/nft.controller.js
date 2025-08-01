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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const nft_service_1 = require("./nft.service");
const mint_nft_dto_1 = require("./dto/mint-nft.dto");
const transfer_nft_dto_1 = require("./dto/transfer-nft.dto");
const jwt_auth_guard_1 = require("../auth/guards/jwt-auth.guard");
let NftController = class NftController {
    constructor(nftService) {
        this.nftService = nftService;
    }
    async mintNFT(req, mintDto) {
        return await this.nftService.mintNFT(req.user.uid, mintDto);
    }
    async transferNFT(req, transferDto) {
        return await this.nftService.transferNFT(req.user.uid, transferDto);
    }
    async getUserNFTs(req) {
        return await this.nftService.getUserNFTs(req.user.uid);
    }
    async getNFTDetails(tokenId) {
        return await this.nftService.getNFTDetails(tokenId);
    }
    async getTransactionHistory(req) {
        return await this.nftService.getTransactionHistory(req.user.uid);
    }
};
exports.NftController = NftController;
__decorate([
    (0, common_1.Post)('mint'),
    (0, swagger_1.ApiOperation)({ summary: 'Mint a new NFT' }),
    (0, swagger_1.ApiResponse)({ status: 201, description: 'NFT minted successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, mint_nft_dto_1.MintNFTDto]),
    __metadata("design:returntype", Promise)
], NftController.prototype, "mintNFT", null);
__decorate([
    (0, common_1.Post)('transfer'),
    (0, swagger_1.ApiOperation)({ summary: 'Transfer an NFT' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'NFT transferred successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Bad request' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'NFT not found' }),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, transfer_nft_dto_1.TransferNFTDto]),
    __metadata("design:returntype", Promise)
], NftController.prototype, "transferNFT", null);
__decorate([
    (0, common_1.Get)('my-nfts'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user NFTs' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'User NFTs retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NftController.prototype, "getUserNFTs", null);
__decorate([
    (0, common_1.Get)('details/:tokenId'),
    (0, swagger_1.ApiOperation)({ summary: 'Get NFT details' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'NFT details retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'NFT not found' }),
    __param(0, (0, common_1.Param)('tokenId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NftController.prototype, "getNFTDetails", null);
__decorate([
    (0, common_1.Get)('transactions'),
    (0, swagger_1.ApiOperation)({ summary: 'Get user transaction history' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Transaction history retrieved successfully' }),
    (0, swagger_1.ApiResponse)({ status: 401, description: 'Unauthorized' }),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], NftController.prototype, "getTransactionHistory", null);
exports.NftController = NftController = __decorate([
    (0, swagger_1.ApiTags)('NFT'),
    (0, common_1.Controller)('nft'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, swagger_1.ApiBearerAuth)(),
    __metadata("design:paramtypes", [nft_service_1.NftService])
], NftController);
//# sourceMappingURL=nft.controller.js.map