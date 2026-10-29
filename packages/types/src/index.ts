/**
 * CoopServe Domain Types & DTOs
 * Version: 1.1 (SRS aligned)
 */

// ==========================================
// 1. ENUMS
// ==========================================

export enum UserRole {
  CUSTOMER = 'CUSTOMER',
  WORKER = 'WORKER',
  SOCIETY_ADMIN = 'SOCIETY_ADMIN',
  FEDERATION_ADMIN = 'FEDERATION_ADMIN',
  PLATFORM_SUPERADMIN = 'PLATFORM_SUPERADMIN',
}

export enum KycStatus {
  PENDING = 'PENDING',
  VERIFIED = 'VERIFIED',
  REJECTED = 'REJECTED',
  SUSPENDED = 'SUSPENDED',
}

export enum BookingStatus {
  DRAFT = 'DRAFT',
  REQUESTED = 'REQUESTED',
  ASSIGNED = 'ASSIGNED',
  EN_ROUTE = 'EN_ROUTE',
  ARRIVED = 'ARRIVED',
  IN_PROGRESS = 'IN_PROGRESS',
  QUOTE_PENDING = 'QUOTE_PENDING',
  COMPLETED = 'COMPLETED',
  PAYMENT_SETTLED = 'PAYMENT_SETTLED',
  CLOSED = 'CLOSED',
  CANCELLED_BY_CUSTOMER = 'CANCELLED_BY_CUSTOMER',
  CANCELLED_BY_WORKER = 'CANCELLED_BY_WORKER',
  EXPIRED = 'EXPIRED',
}

export enum SkillCategory {
  ELECTRICAL = 'ELECTRICAL',
  PLUMBING = 'PLUMBING',
  CARPENTRY = 'CARPENTRY',
  PAINTING = 'PAINTING',
  CLEANING = 'CLEANING',
  CAREGIVING = 'CAREGIVING',
  GARDENING = 'GARDENING',
  APPLIANCE_REPAIR = 'APPLIANCE_REPAIR',
  MASONRY = 'MASONRY',
  GENERAL_MAINTENANCE = 'GENERAL_MAINTENANCE',
}

export enum PaymentMethod {
  UPI = 'UPI',
  CARD = 'CARD',
  NET_BANKING = 'NET_BANKING',
  WALLET = 'WALLET',
  CASH_ON_DELIVERY = 'CASH_ON_DELIVERY',
}

export enum PaymentStatus {
  PENDING = 'PENDING',
  SUCCESSFUL = 'SUCCESSFUL',
  FAILED = 'FAILED',
  REFUNDED = 'REFUNDED',
  DISPUTED = 'DISPUTED',
}

export enum TransactionType {
  CREDIT = 'CREDIT',
  DEBIT = 'DEBIT',
  COD_RECONCILIATION = 'COD_RECONCILIATION',
  WELFARE_DEDUCTION = 'WELFARE_DEDUCTION',
  PAYOUT = 'PAYOUT',
}

export enum WelfareFundType {
  HEALTH_INSURANCE = 'HEALTH_INSURANCE',
  ACCIDENT_INSURANCE = 'ACCIDENT_INSURANCE',
  PENSION_SAVINGS = 'PENSION_SAVINGS',
  EMERGENCY_AID = 'EMERGENCY_AID',
}

// ==========================================
// 2. SPATIAL & LOCATION INTERFACES
// ==========================================

export interface GeoLocation {
  latitude: number;
  longitude: number;
  addressLine1?: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  landmark?: string;
}

export interface WorkerLocationUpdate {
  workerId: string;
  latitude: number;
  longitude: number;
  heading?: number;
  speed?: number;
  timestamp: string;
}

// ==========================================
// 3. FINANCIAL & SPLIT INTERFACES
// ==========================================

export interface PaymentSplitResult {
  totalAmount: number;
  baseLabor: number;
  materialCost: number;
  workerWage: number;       // 82% of base labor + 100% materials
  societyFee: number;       // 8% of base labor
  welfareContribution: number; // 5% of base labor
  platformFee: number;      // 5% of base labor
}

export interface SplitFormulaConfig {
  workerWagePercent: number;     // e.g. 0.82
  societyFeePercent: number;     // e.g. 0.08
  welfarePercent: number;        // e.g. 0.05
  platformFeePercent: number;    // e.g. 0.05
}

export interface CodReconciliationDetails {
  collectedCash: number;
  workerRetainedCash: number;
  walletDeductionTotal: number;
  societyCut: number;
  welfareCut: number;
  platformCut: number;
  newWalletBalance: number;
}

// ==========================================
// 4. DATA TRANSFER OBJECTS (DTOs)
// ==========================================

export interface CreateBookingDTO {
  customerId: string;
  skillCategory: SkillCategory;
  serviceDescription: string;
  location: GeoLocation;
  scheduledAt?: string; // ISO 8601
  estimatedDurationHours?: number;
  preferredPaymentMethod?: PaymentMethod;
}

export interface VerifyOtpDTO {
  bookingId: string;
  otp: string;
  type: 'START' | 'END';
  workerId: string;
}

export interface AddMaterialQuoteDTO {
  bookingId: string;
  workerId: string;
  materialCost: number;
  description: string;
  receiptImageUrls?: string[];
}

export interface CustomerQuoteApprovalDTO {
  bookingId: string;
  approved: boolean;
  notes?: string;
}

export interface WorkerDispatchCandidate {
  workerId: string;
  fullName: string;
  phoneNumber: string;
  societyId: string;
  distanceMeters: number;
  ratingAverage: number;
  completedJobsCount: number;
  lastAssignedAt?: string;
}

export interface KycVerificationDTO {
  workerId: string;
  societyAdminId: string;
  status: KycStatus;
  remarks?: string;
}

// ==========================================
// 5. API RESPONSE WRAPPERS
// ==========================================

export interface ApiResponse<T = unknown> {
  success: boolean;
  message?: string;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: unknown;
  };
  timestamp: string;
}
