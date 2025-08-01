import { JwtService } from '@nestjs/jwt';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { WalletService } from '../wallet/wallet.service';
export declare class AuthService {
    private jwtService;
    private walletService;
    constructor(jwtService: JwtService, walletService: WalletService);
    register(registerDto: RegisterDto): Promise<{
        user: {
            uid: string;
            email: string;
            displayName: string;
            walletAddress: string;
        };
        accessToken: string;
    }>;
    login(loginDto: LoginDto): Promise<{
        user: {
            uid: string;
            email: string;
            displayName: any;
            walletAddress: any;
        };
        accessToken: string;
    }>;
    validateUser(payload: any): Promise<{
        uid: string;
        email: string;
        displayName: any;
        walletAddress: any;
    }>;
    private verifyPassword;
}
