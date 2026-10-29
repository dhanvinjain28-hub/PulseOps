import { Request, Response, NextFunction } from 'express';
import { KycStatus, SkillCategory, WorkerDispatchCandidate } from '@coopserve/types';
import { DispatchEngine } from '../services/dispatchEngine.js';

// Demo workers for instant evaluation
const demoWorkers: WorkerDispatchCandidate[] = [
  {
    workerId: 'W-001',
    fullName: 'Ramesh Kumar (Master Electrician)',
    phoneNumber: '+919876543210',
    societyId: 'SOC-BLR-SOUTH',
    distanceMeters: 1200,
    ratingAverage: 4.9,
    completedJobsCount: 142,
    lastAssignedAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(), // 5 hours ago
  },
  {
    workerId: 'W-002',
    fullName: 'Suresh Patil (Senior Plumber)',
    phoneNumber: '+919876543211',
    societyId: 'SOC-BLR-SOUTH',
    distanceMeters: 2400,
    ratingAverage: 4.8,
    completedJobsCount: 98,
    lastAssignedAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(), // 2 hours ago
  },
  {
    workerId: 'W-003',
    fullName: 'Lakshmi Devi (Professional Painter)',
    phoneNumber: '+919876543212',
    societyId: 'SOC-BLR-SOUTH',
    distanceMeters: 800,
    ratingAverage: 4.95,
    completedJobsCount: 210,
    lastAssignedAt: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(), // 12 hours ago
  }
];

export class WorkerController {
  public static async getAvailableWorkers(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { lat = 12.9260, lng = 77.6762, radius = 5000 } = req.query;
      const ranked = DispatchEngine.rankCandidates(demoWorkers, Number(radius));

      res.json({
        success: true,
        data: ranked,
        total: ranked.length,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  }

  public static async updateKycStatus(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { workerId } = req.params;
      const { status = KycStatus.VERIFIED, remarks } = req.body;

      res.json({
        success: true,
        message: `Worker ${workerId} KYC status successfully updated to ${status}`,
        data: {
          workerId,
          kycStatus: status,
          remarks,
          verifiedAt: new Date().toISOString(),
        },
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  }
}
