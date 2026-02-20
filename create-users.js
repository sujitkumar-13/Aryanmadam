const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

// Initialize Prisma with proper configuration for v7
const prisma = new PrismaClient({
  log: ['error', 'warn'],
}); 

async function main() {
  console.log('🌱 Creating users...\n');

  try {
    // Connect to database
    await prisma.$connect();
    console.log('✅ Database connected\n');

    // Admin user
    const hashedAdminPassword = await bcrypt.hash('Admin@123', 10);
    
    const admin = await prisma.user.upsert({
      where: { email: 'admin@aryamadam.com' },
      update: {
        password: hashedAdminPassword,
        role: 'ADMIN',
      },
      create: {
        email: 'admin@aryamadam.com',
        name: 'Admin User',
        password: hashedAdminPassword,
        role: 'ADMIN',
        emailVerified: new Date(),
      },
    });

    console.log('✅ Admin user created/updated:');
    console.log('   📧 Email:', admin.email);
    console.log('   🔑 Password: Admin@123');
    console.log('   👤 Role:', admin.role);
    console.log('   🆔 ID:', admin.id);
    console.log('');

    // Test user
    const hashedUserPassword = await bcrypt.hash('User@123', 10);
    
    const user = await prisma.user.upsert({
      where: { email: 'user@test.com' },
      update: {
        password: hashedUserPassword,
        role: 'USER',
      },
      create: {
        email: 'user@test.com',
        name: 'Test User',
        password: hashedUserPassword,
        role: 'USER',
        emailVerified: new Date(),
      },
    });

    console.log('✅ Test user created/updated:');
    console.log('   📧 Email:', user.email);
    console.log('   🔑 Password: User@123');
    console.log('   👤 Role:', user.role);
    console.log('   🆔 ID:', user.id);
    console.log('\n🎉 All users created successfully!\n');

    // Verify admin role
    const verifyAdmin = await prisma.user.findUnique({
      where: { email: 'admin@aryamadam.com' },
      select: { email: true, role: true, password: true }
    });

    if (verifyAdmin && verifyAdmin.role === 'ADMIN') {
      console.log('✅ Admin role verified in database!');
    } else {
      console.log('❌ WARNING: Admin role not set correctly!');
    }

  } catch (error) {
    console.error('❌ Error:', error.message);
    console.error('\n💡 Troubleshooting:');
    console.error('   1. Check if DATABASE_URL is set in .env file');
    console.error('   2. Run: npx prisma generate');
    console.error('   3. Run: npx prisma db push');
    throw error;
  }
}

main()
  .catch((e) => {
    console.error('\n❌ Fatal error:', e.message);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    console.log('\n👋 Disconnected from database');
  });