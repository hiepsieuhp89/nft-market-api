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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const admin = require("firebase-admin");
const wallet_service_1 = require("../wallet/wallet.service");
let AuthService = class AuthService {
    constructor(jwtService, walletService) {
        this.jwtService = jwtService;
        this.walletService = walletService;
        if (!admin.apps.length) {
            admin.initializeApp({
                credential: admin.credential.cert({
                    projectId: process.env.FIREBASE_PROJECT_ID,
                    privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
                    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
                }),
            });
        }
    }
    async register(registerDto) {
        const { email, password, displayName } = registerDto;
        try {
            const hashedPassword = await bcrypt.hash(password, 12);
            const userRecord = await admin.auth().createUser({
                email,
                password,
                displayName,
            });
            const wallet = await this.walletService.generateWallet();
            const userData = {
                uid: userRecord.uid,
                email,
                displayName: displayName || email.split('@')[0],
                walletAddress: wallet.address,
                createdAt: admin.firestore.FieldValue.serverTimestamp(),
                updatedAt: admin.firestore.FieldValue.serverTimestamp(),
            };
            await admin.firestore()
                .collection('users')
                .doc(userRecord.uid)
                .set(userData);
            await this.walletService.saveWallet(userRecord.uid, wallet);
            const payload = {
                sub: userRecord.uid,
                email: userRecord.email,
                walletAddress: wallet.address,
            };
            const accessToken = this.jwtService.sign(payload);
            return {
                user: {
                    uid: userRecord.uid,
                    email: userRecord.email,
                    displayName: userData.displayName,
                    walletAddress: wallet.address,
                },
                accessToken,
            };
        }
        catch (error) {
            if (error.code === 'auth/email-already-exists') {
                throw new common_1.ConflictException('Email already exists');
            }
            throw error;
        }
    }
    async login(loginDto) {
        const { email, password } = loginDto;
        try {
            const userRecord = await admin.auth().getUserByEmail(email);
            const userDoc = await admin.firestore()
                .collection('users')
                .doc(userRecord.uid)
                .get();
            if (!userDoc.exists) {
                throw new common_1.UnauthorizedException('User not found');
            }
            const userData = userDoc.data();
            const isValidPassword = await this.verifyPassword(email, password);
            if (!isValidPassword) {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            const payload = {
                sub: userRecord.uid,
                email: userRecord.email,
                walletAddress: userData.walletAddress,
            };
            const accessToken = this.jwtService.sign(payload);
            return {
                user: {
                    uid: userRecord.uid,
                    email: userRecord.email,
                    displayName: userData.displayName,
                    walletAddress: userData.walletAddress,
                },
                accessToken,
            };
        }
        catch (error) {
            if (error.code === 'auth/user-not-found') {
                throw new common_1.UnauthorizedException('Invalid credentials');
            }
            throw error;
        }
    }
    async validateUser(payload) {
        try {
            const userRecord = await admin.auth().getUser(payload.sub);
            const userDoc = await admin.firestore()
                .collection('users')
                .doc(userRecord.uid)
                .get();
            if (!userDoc.exists) {
                return null;
            }
            const userData = userDoc.data();
            return {
                uid: userRecord.uid,
                email: userRecord.email,
                displayName: userData.displayName,
                walletAddress: userData.walletAddress,
            };
        }
        catch (error) {
            return null;
        }
    }
    async verifyPassword(email, password) {
        const apiKey = process.env.FIREBASE_API_KEY;
        if (!apiKey) {
            throw new Error('Firebase API key not configured');
        }
        try {
            const response = await fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                    returnSecureToken: true,
                }),
            });
            return response.ok;
        }
        catch (error) {
            return false;
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        wallet_service_1.WalletService])
], AuthService);
//# sourceMappingURL=auth.service.js.map