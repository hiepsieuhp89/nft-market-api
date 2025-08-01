"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsEthereumAddress = IsEthereumAddress;
const class_validator_1 = require("class-validator");
const ethers_1 = require("ethers");
function IsEthereumAddress(validationOptions) {
    return function (object, propertyName) {
        (0, class_validator_1.registerDecorator)({
            name: 'isEthereumAddress',
            target: object.constructor,
            propertyName: propertyName,
            options: validationOptions,
            validator: {
                validate(value, args) {
                    return typeof value === 'string' && ethers_1.ethers.isAddress(value);
                },
                defaultMessage(args) {
                    return `${args.property} must be a valid Ethereum address`;
                },
            },
        });
    };
}
//# sourceMappingURL=is-ethereum-address.decorator.js.map