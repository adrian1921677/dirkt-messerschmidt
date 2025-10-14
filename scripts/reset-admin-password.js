const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function resetAdminPassword() {
  try {
    const adminEmail = 'admin@dirk-messerschmidt.de';
    const newPassword = 'Admin123!';
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    const updatedAdmin = await prisma.user.update({
      where: { email: adminEmail },
      data: { password: hashedPassword }
    });

    console.log('🔐 Admin-Passwort erfolgreich zurückgesetzt!');
    console.log('📧 E-Mail:', updatedAdmin.email);
    console.log('👤 Name:', updatedAdmin.name);
    console.log('🔑 Rolle:', updatedAdmin.role);
    console.log('🔐 Neues Passwort:', newPassword);
    console.log('\n🔗 Login-URL: http://localhost:3000/admin/login');
    console.log('\n⚠️  WICHTIG: Ändern Sie das Passwort nach dem ersten Login!');

  } catch (error) {
    console.error('❌ Fehler beim Zurücksetzen des Admin-Passworts:', error);
  } finally {
    await prisma.$disconnect();
  }
}

resetAdminPassword();


