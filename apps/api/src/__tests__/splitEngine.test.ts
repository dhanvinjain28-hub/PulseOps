import { describe, it } from 'node:test';
import assert from 'node:assert';
import { SplitEngine } from '../services/splitEngine.js';

describe('CoopServe SplitEngine (SRS v1.1 Verification)', () => {
  const engine = new SplitEngine({
    workerWagePercent: 0.82,
    societyFeePercent: 0.08,
    welfarePercent: 0.05,
    platformFeePercent: 0.05,
  });

  it('correctly splits standard $100 base labor with no materials', () => {
    const split = engine.calculateSplit(100.00, 0);

    assert.strictEqual(split.totalAmount, 100.00);
    assert.strictEqual(split.baseLabor, 100.00);
    assert.strictEqual(split.materialCost, 0);
    assert.strictEqual(split.workerWage, 82.00);       // 82%
    assert.strictEqual(split.societyFee, 8.00);        // 8%
    assert.strictEqual(split.welfareContribution, 5.00); // 5%
    assert.strictEqual(split.platformFee, 5.00);      // 5%

    // Verify sum consistency
    const totalDeductions = split.workerWage + split.societyFee + split.welfareContribution + split.platformFee;
    assert.strictEqual(totalDeductions, split.totalAmount);
  });

  it('passes 100% of material costs directly to worker without platform/society cut', () => {
    const split = engine.calculateSplit(100.00, 50.00);

    assert.strictEqual(split.totalAmount, 150.00);
    assert.strictEqual(split.workerWage, 132.00); // $82 labor + $50 materials = $132
    assert.strictEqual(split.societyFee, 8.00);
    assert.strictEqual(split.welfareContribution, 5.00);
    assert.strictEqual(split.platformFee, 5.00);

    const sum = split.workerWage + split.societyFee + split.welfareContribution + split.platformFee;
    assert.strictEqual(sum, split.totalAmount);
  });

  it('accurately reconciles COD payments against worker wallet balance', () => {
    const cod = engine.reconcileCodPayment(100.00, 0, 200.00);

    assert.strictEqual(cod.collectedCash, 100.00);
    assert.strictEqual(cod.workerRetainedCash, 100.00);
    assert.strictEqual(cod.walletDeductionTotal, 18.00); // $8 society + $5 welfare + $5 platform
    assert.strictEqual(cod.newWalletBalance, 182.00);    // $200 - $18 = $182
  });
});
