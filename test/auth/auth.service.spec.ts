import { AuthService } from '../../src/auth/auth.service';
import { JwtService } from '@nestjs/jwt';

describe('AuthService', () => {
  let service: AuthService;
  let jwtService: JwtService;

  beforeEach(() => {
    jwtService = new JwtService({ secret: 'testsecret' });
    const mockUsersRepo = { findOne: jest.fn() } as any;
    const mockLogger = { info: jest.fn(), error: jest.fn(), warn: jest.fn(), debug: jest.fn() } as any;
    service = new AuthService(jwtService, mockUsersRepo, mockLogger);
  });

  it('should return token for correct credentials', async () => {
    const res = await service.login('admin', 'password');
    expect(res.access_token).toBeDefined();
  });

  it('should throw for invalid credentials', async () => {
    await expect(service.login('invalid', 'invalid')).rejects.toThrow();
  });
});
