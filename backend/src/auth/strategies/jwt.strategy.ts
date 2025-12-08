import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { Strategy } from 'passport-jwt';

// Custom extractor to read JWT from cookies
const cookieExtractor = (req: Request): string | null => {
  let token = null;
  if (req && req.cookies) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    token = req.cookies['auth_token'];
    console.log('Cookie found:', token ? 'Yes' : 'No');
    console.log('All cookies:', req.cookies);
  } else {
    console.log('No cookies object on request');
  }
  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor() {
    const secret = 'fallback-secret-key';
    console.log('JWT Strategy initialized with secret:', secret);

    super({
      jwtFromRequest: cookieExtractor,
      secretOrKey: secret,
    });
  }

  validate(payload: any) {
    return {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      id: payload.sub,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      email: payload.email,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      role: payload.role,
    };
  }
}
