import { PrismaClient, KycStatus, SkillCategory } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting database seeding for CoopServe...');

  // 1. Create Federation
  const federation = await prisma.federation.upsert({
    where: { registrationNo: 'FED-KA-2026-001' },
    update: {},
    create: {
      name: 'Karnataka State Labour Cooperative Federation',
      stateCode: 'KA',
      registrationNo: 'FED-KA-2026-001',
      configPolicies: {
        workerWageCutPercent: 82,
        societyFeePercent: 8,
        welfarePercent: 5,
        platformFeePercent: 5,
        serviceWarrantyHours: 48,
        sosAutoAlert: true,
      },
    },
  });

  console.log(`✅ Created Federation: ${federation.name}`);

  // 2. Create District Societies
  const society = await prisma.society.upsert({
    where: { registrationNo: 'SOC-BLR-SOUTH-042' },
    update: {},
    create: {
      federationId: federation.id,
      name: 'Bengaluru South Skilled Labourers Cooperative Society',
      registrationNo: 'SOC-BLR-SOUTH-042',
      district: 'Bengaluru Urban',
      state: 'Karnataka',
      contactPhone: '+918023456789',
      contactEmail: 'contact@blr-south-coop.org',
      serviceRadiusKm: 15.0,
      centerLat: 12.9250,
      centerLng: 77.5938,
    },
  });

  console.log(`✅ Created Society: ${society.name}`);

  // 3. Create Demo Verified Workers
  const worker1 = await prisma.worker.upsert({
    where: { phone: '+919876543210' },
    update: {},
    create: {
      societyId: society.id,
      phone: '+919876543210',
      fullName: 'Ramesh Kumar (Master Electrician)',
      kycStatus: KycStatus.VERIFIED,
      skills: [SkillCategory.ELECTRICAL, SkillCategory.APPLIANCE_REPAIR],
      currentLat: 12.9345,
      currentLng: 77.6101,
      isAvailable: true,
      isActive: true,
      walletBalance: 250.00,
      ratingAverage: 4.9,
      totalJobsCompleted: 142,
    },
  });

  const worker2 = await prisma.worker.upsert({
    where: { phone: '+919876543211' },
    update: {},
    create: {
      societyId: society.id,
      phone: '+919876543211',
      fullName: 'Suresh Patil (Certified Plumber)',
      kycStatus: KycStatus.VERIFIED,
      skills: [SkillCategory.PLUMBING, SkillCategory.GENERAL_MAINTENANCE],
      currentLat: 12.9200,
      currentLng: 77.5850,
      isAvailable: true,
      isActive: true,
      walletBalance: 180.00,
      ratingAverage: 4.8,
      totalJobsCompleted: 98,
    },
  });

  console.log(`✅ Created Demo Workers: ${worker1.fullName}, ${worker2.fullName}`);

  // 4. Create Demo Customer
  const customer = await prisma.customer.upsert({
    where: { phone: '+919811122233' },
    update: {},
    create: {
      phone: '+919811122233',
      fullName: 'Ananya Sharma',
      email: 'ananya.sharma@example.com',
      defaultAddress: {
        addressLine1: 'Flat 402, Green Glen Layout, Bellandur',
        city: 'Bengaluru',
        state: 'Karnataka',
        postalCode: '560103',
        lat: 12.9260,
        lng: 77.6762,
      },
      ratingAverage: 5.0,
    },
  });

  console.log(`✅ Created Demo Customer: ${customer.fullName}`);
  console.log('🌟 Seeding finished successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
