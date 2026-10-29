import { Router } from 'express';
import { BookingController } from '../controllers/bookingController.js';
import { WorkerController } from '../controllers/workerController.js';
import { PaymentController } from '../controllers/paymentController.js';
import { SocietyController } from '../controllers/societyController.js';

export const router = Router();

// Health Check
router.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    service: 'PulseOps API Gateway',
    version: '1.1.0',
    timestamp: new Date().toISOString(),
  });
});

// Bookings
router.post('/bookings', BookingController.createBooking);
router.get('/bookings/:bookingId', BookingController.getBookingById);
router.post('/bookings/:bookingId/accept', BookingController.acceptBooking);
router.post('/bookings/:bookingId/verify-otp', BookingController.verifyOtp);
router.post('/bookings/:bookingId/material-quote', BookingController.addMaterialQuote);

// Workers & Dispatch
router.get('/workers/nearby', WorkerController.getAvailableWorkers);
router.patch('/workers/:workerId/kyc', WorkerController.updateKycStatus);

// Payments & Splits
router.post('/payments/process', PaymentController.processPayment);

// Society Dashboard
router.get('/society/dashboard-stats', SocietyController.getDashboardStats);
