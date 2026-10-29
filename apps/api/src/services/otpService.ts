import crypto from 'crypto';

export class OtpService {
  /**
   * Generates a cryptographically secure 4-digit numeric OTP.
   */
  public static generate4DigitOtp(): string {
    const number = crypto.randomInt(1000, 10000);
    return number.toString();
  }

  /**
   * Constant-time comparison to prevent timing attacks.
   */
  public static verifyOtp(expected: string, received: string): boolean {
    if (!expected || !received || expected.length !== received.length) {
      return false;
    }
    return crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(received));
  }
}
