import { JwtModuleOptions } from "@nestjs/jwt";

export function getJwtConfig(): JwtModuleOptions {
  return {
    global: true,
    secret: process.env.JWT_SECRET,
    signOptions: { expiresIn: +process.env.JWT_ACCESS_REVOKED },
  };
}
