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
exports.MintNFTDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class MintNFTDto {
}
exports.MintNFTDto = MintNFTDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'NFT name',
        example: 'My Awesome NFT',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MintNFTDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'NFT description',
        example: 'This is a unique digital artwork',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], MintNFTDto.prototype, "description", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'NFT image URL',
        example: 'https://example.com/image.jpg',
    }),
    (0, class_validator_1.IsUrl)(),
    __metadata("design:type", String)
], MintNFTDto.prototype, "imageUrl", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'NFT price in MATIC',
        example: 0.1,
        minimum: 0,
    }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], MintNFTDto.prototype, "price", void 0);
//# sourceMappingURL=mint-nft.dto.js.map