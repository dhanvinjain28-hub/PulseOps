import { Request, Response, NextFunction } from 'express';
import { PaymentMethod, PaymentStatus } from '@coopserve/types';
import { splitEngine } from '../services/splitEngine.js';

export class PaymentController {
  public static async processPayment(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { bookingId, baseLabor, materialCost = 0, paymentMethod = PaymentMethod.UPI } = req.body;

      const split = splitEngine.calculateSplit(Number(baseLabor), Number(materialCost));
      const isCod = paymentMethod === PaymentMethod.CASH_ON_DELIVERY;

      let codReconciliation = null;
      if (isCod) {
        codReconciliation = splitEngine.reconcileCodPayment(Number(baseLabor), Number(materialCost), 500.00);
      }

      res.json({
        success: true,
        message: 'Payment processed and revenue split recorded',
        data: {
          paymentId: `PAY-${Date.now().toString(36).toUpperCase()}`,
          bookingId,
          paymentMethod,
          status: PaymentStatus.SUCCESSFUL,
          split,
          codReconciliation,
          paidAt: new Date().toISOString(),
        },
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  }
}
