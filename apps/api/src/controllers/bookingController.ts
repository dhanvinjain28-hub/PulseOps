import { Request, Response, NextFunction } from 'express';
import { BookingStatus, SkillCategory, PaymentMethod, ApiResponse } from '@coopserve/types';
import { OtpService } from '../services/otpService.js';
import { splitEngine } from '../services/splitEngine.js';

// In-memory demo store for rapid development/testing when DB is offline
const memoryBookings = new Map<string, any>();

export class BookingController {
  /**
   * Creates a new booking and triggers dispatch matching
   */
  public static async createBooking(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const {
        customerId = 'cust-demo-1',
        skillCategory,
        description,
        latitude,
        longitude,
        addressText,
        baseRate = 350.00,
        paymentMethod = PaymentMethod.UPI,
      } = req.body;

      const bookingId = `BK-${Date.now().toString(36).toUpperCase()}`;
      const startOtp = OtpService.generate4DigitOtp();
      const endOtp = OtpService.generate4DigitOtp();

      const newBooking = {
        id: bookingId,
        bookingNumber: bookingId,
        customerId,
        workerId: null,
        societyId: null,
        status: BookingStatus.REQUESTED,
        skillCategory: skillCategory || SkillCategory.ELECTRICAL,
        description: description || 'General Repair Service',
        jobLat: latitude || 12.9260,
        jobLng: longitude || 77.6762,
        addressText: addressText || 'Bengaluru, Karnataka',
        startOtp,
        endOtp,
        baseRate: Number(baseRate),
        materialCost: 0,
        totalAmount: Number(baseRate),
        paymentMethod,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      memoryBookings.set(bookingId, newBooking);

      const response: ApiResponse<typeof newBooking> = {
        success: true,
        message: 'Booking created successfully. Dispatching to nearby cooperative workers.',
        data: newBooking,
        timestamp: new Date().toISOString(),
      };

      res.status(201).json(response);
    } catch (err) {
      next(err);
    }
  }

  /**
   * Worker accepts dispatch
   */
  public static async acceptBooking(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { bookingId } = req.params;
      const { workerId, societyId } = req.body;

      const booking = memoryBookings.get(bookingId as string);
      if (!booking) {
        res.status(404).json({ success: false, message: 'Booking not found', timestamp: new Date().toISOString() });
        return;
      }

      booking.status = BookingStatus.ASSIGNED;
      booking.workerId = workerId || 'worker-demo-1';
      booking.societyId = societyId || 'soc-demo-1';
      booking.updatedAt = new Date().toISOString();

      res.json({
        success: true,
        message: 'Job accepted. Worker en route to destination.',
        data: booking,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Verifies Start OTP or End OTP
   */
  public static async verifyOtp(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { bookingId } = req.params;
      const { otp, type } = req.body; // type: 'START' | 'END'

      const booking = memoryBookings.get(bookingId as string);
      if (!booking) {
        res.status(404).json({ success: false, message: 'Booking not found', timestamp: new Date().toISOString() });
        return;
      }

      if (type === 'START') {
        const isValid = OtpService.verifyOtp(booking.startOtp, otp);
        if (!isValid) {
          res.status(400).json({ success: false, message: 'Invalid Start OTP', timestamp: new Date().toISOString() });
          return;
        }
        booking.status = BookingStatus.IN_PROGRESS;
        booking.startedAt = new Date().toISOString();
      } else if (type === 'END') {
        const isValid = OtpService.verifyOtp(booking.endOtp, otp);
        if (!isValid) {
          res.status(400).json({ success: false, message: 'Invalid End OTP', timestamp: new Date().toISOString() });
          return;
        }
        booking.status = BookingStatus.COMPLETED;
        booking.completedAt = new Date().toISOString();
      } else {
        res.status(400).json({ success: false, message: 'Invalid OTP type specified', timestamp: new Date().toISOString() });
        return;
      }

      booking.updatedAt = new Date().toISOString();

      res.json({
        success: true,
        message: `OTP verified successfully. Status changed to ${booking.status}`,
        data: booking,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Adds material cost quote
   */
  public static async addMaterialQuote(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { bookingId } = req.params;
      const { materialCost, description } = req.body;

      const booking = memoryBookings.get(bookingId as string);
      if (!booking) {
        res.status(404).json({ success: false, message: 'Booking not found', timestamp: new Date().toISOString() });
        return;
      }

      booking.materialCost = Number(materialCost);
      booking.totalAmount = booking.baseRate + booking.materialCost;
      booking.materialDescription = description;
      booking.status = BookingStatus.QUOTE_PENDING;
      booking.updatedAt = new Date().toISOString();

      res.json({
        success: true,
        message: 'Material quote submitted. Awaiting customer approval.',
        data: booking,
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  }

  /**
   * Get single booking details with live split calculations
   */
  public static async getBookingById(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      const { bookingId } = req.params;
      const booking = memoryBookings.get(bookingId as string);

      if (!booking) {
        res.status(404).json({ success: false, message: 'Booking not found', timestamp: new Date().toISOString() });
        return;
      }

      const split = splitEngine.calculateSplit(booking.baseRate, booking.materialCost);

      res.json({
        success: true,
        data: {
          ...booking,
          splitBreakdown: split,
        },
        timestamp: new Date().toISOString(),
      });
    } catch (err) {
      next(err);
    }
  }
}
