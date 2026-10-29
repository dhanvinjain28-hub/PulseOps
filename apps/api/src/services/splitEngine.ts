import { PaymentSplitResult, SplitFormulaConfig, CodReconciliationDetails } from '@coopserve/types';
import { config } from '../config/index.js';

export class SplitEngine {
  private splitConfig: SplitFormulaConfig;

  constructor(customConfig?: Partial<SplitFormulaConfig>) {
    this.splitConfig = {
      ...config.splitPolicy,
      ...customConfig,
    };
  }

  /**
   * Calculates the exact financial split for a completed service.
   * Total = Base Labor + Extra Approved Materials
   * Split applied only to Base Labor; Materials are 100% passed to worker.
   */
  public calculateSplit(baseLabor: number, materialCost: number = 0): PaymentSplitResult {
    if (baseLabor < 0 || materialCost < 0) {
      throw new Error('Base labor and material cost must be non-negative numbers');
    }

    const round = (num: number): number => Math.round((num + Number.EPSILON) * 100) / 100;

    const baseLaborWage = round(baseLabor * this.splitConfig.workerWagePercent);
    const societyFee = round(baseLabor * this.splitConfig.societyFeePercent);
    const welfareContribution = round(baseLabor * this.splitConfig.welfarePercent);
    
    // Platform fee takes remainder to guarantee exact cents precision
    const totalDeductions = baseLaborWage + societyFee + welfareContribution;
    const platformFee = round(baseLabor - totalDeductions);

    const totalWorkerPayout = round(baseLaborWage + materialCost);
    const totalAmount = round(baseLabor + materialCost);

    return {
      totalAmount,
      baseLabor: round(baseLabor),
      materialCost: round(materialCost),
      workerWage: totalWorkerPayout,
      societyFee,
      welfareContribution,
      platformFee,
    };
  }

  /**
   * Reconciles Cash on Delivery (COD).
   * Worker collected 100% cash in hand from customer.
   * The society, welfare, and platform shares are deducted from worker's prepaid wallet balance.
   */
  public reconcileCodPayment(
    baseLabor: number,
    materialCost: number,
    currentWalletBalance: number
  ): CodReconciliationDetails {
    const split = this.calculateSplit(baseLabor, materialCost);
    const walletDeductionTotal = split.societyFee + split.welfareContribution + split.platformFee;
    const newWalletBalance = Math.round((currentWalletBalance - walletDeductionTotal + Number.EPSILON) * 100) / 100;

    return {
      collectedCash: split.totalAmount,
      workerRetainedCash: split.totalAmount,
      walletDeductionTotal,
      societyCut: split.societyFee,
      welfareCut: split.welfareContribution,
      platformCut: split.platformFee,
      newWalletBalance,
    };
  }
}

export const splitEngine = new SplitEngine();
