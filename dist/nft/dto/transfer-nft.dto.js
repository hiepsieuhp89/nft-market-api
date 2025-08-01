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
exports.TransferNFTDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
const is_ethereum_address_decorator_1 = require("../../common/decorators/is-ethereum-address.decorator");
class TransferNFTDto {
}
exports.TransferNFTDto = TransferNFTDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Token ID to transfer',
        example: '1',
    }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], TransferNFTDto.prototype, "tokenId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        description: 'Recipient wallet address',
        example: '0x742d35Cc6634C0532925a3b8D4C9db96C4b4d8b7',
    }),
    (0, is_ethereum_address_decorator_1.IsEthereumAddress)(),
    __metadata("design:type", String)
], TransferNFTDto.prototype, "to", void 0);
//# sourceMappingURL=transfer-nft.dto.js.map