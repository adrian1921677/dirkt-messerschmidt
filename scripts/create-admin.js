const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // Prüfe ob bereits ein Admin existiert
    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (existingAdmin) {
      console.log('✅ Admin-Benutzer bereits vorhanden:');
      console.log(`📧 E-Mail: ${existingAdmin.email}`);
      console.log(`👤 Name: ${existingAdmin.name || 'Nicht gesetzt'}`);
      console.log(`🔑 Rolle: ${existingAdmin.role}`);
      console.log('🔐 Passwort: [Gehasht - kann nicht angezeigt werden]');
      console.log('\n💡 Falls Sie das Passwort vergessen haben, können Sie es zurücksetzen.');
      return;
    }

    // Erstelle neuen Admin-Benutzer
    const adminEmail = 'admin@messerschmidt.eu';
    const adminPassword = 'Admin123!';
    const hashedPassword = await bcrypt.hash(adminPassword, 12);

    const admin = await prisma.user.create({
      data: {
        email: adminEmail,
        name: 'Dirk Messerschmidt',
        password: hashedPassword,
        role: 'ADMIN'
      }
    });

    console.log('🎉 Admin-Benutzer erfolgreich erstellt!');
    console.log('📧 E-Mail:', admin.email);
    console.log('👤 Name:', admin.name);
    console.log('🔑 Rolle:', admin.role);
    console.log('🔐 Passwort:', adminPassword);
    console.log('\n🔗 Login-URL: http://localhost:3000/admin/login');
    console.log('\n⚠️  WICHTIG: Ändern Sie das Passwort nach dem ersten Login!');

  } catch (error) {
    console.error('❌ Fehler beim Erstellen des Admin-Benutzers:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();