import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
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
    getProfile(req: any): Promise<any>;
}
