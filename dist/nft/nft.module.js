"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NftModule = void 0;
const common_1 = require("@nestjs/common");
const nft_controller_1 = require("./nft.controller");
const nft_service_1 = require("./nft.service");
const defender_service_1 = require("./services/defender.service");
const wallet_module_1 = require("../wallet/wallet.module");
let NftModule = class NftModule {
};
exports.NftModule = NftModule;
exports.NftModule = NftModule = __decorate([
    (0, common_1.Module)({
        imports: [wallet_module_1.WalletModule],
        controllers: [nft_controller_1.NftController],
        providers: [nft_service_1.NftService, defender_service_1.DefenderService],
        exports: [nft_service_1.NftService],
    })
], NftModule);
//# sourceMappingURL=nft.module.js.map