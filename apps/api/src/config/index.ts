import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

export const config = {
  port: parseInt(process.env.PORT || '4000', 10),
  nodeEnv: process.env.NODE_ENV || 'development',
  jwtSecret: process.env.JWT_SECRET || 'coopserve-dev-super-secret-key-2026',
  corsOrigin: process.env.CORS_ORIGIN || '*',
  splitPolicy: {
    workerWagePercent: 0.82,       // 82%
    societyFeePercent: 0.08,       // 8%
    welfarePercent: 0.05,          // 5%
    platformFeePercent: 0.05,      // 5%
  },
  dispatch: {
    defaultRadiusMeters: 5000,    // 5 km
    expandedRadiusMeters: 10000,  // 10 km
    acceptanceTimeoutSeconds: 45,
  }
};
