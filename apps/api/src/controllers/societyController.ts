import { Request, Response, NextFunction } from 'express';

export class SocietyController {
  public static async getDashboardStats(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      res.json({
        success: true,
        data: {
          societyName: 'Bengaluru South Skilled Labourers Cooperative Society',
          registrationNo: 'SOC-BLR-SOUTH-042',
          activeWorkers: 48,
          verifiedWorkers: 124,
          pendingKycCount: 6,
          completedJobsToday: 32,
          totalRevenueMonth: 486500.00,
          welfareFundAccrued: 24325.00, // 5% of labor
          societyMaintenanceFund: 38920.00, // 8% of labor
          activeDisputes: 0,
        },
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  }
}
