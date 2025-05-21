export interface TokenPair {
  accessToken: string;
  refreshToken: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
}

export interface JwtPayloadWithRefresh extends JwtPayload {
  refreshToken: string;
}
