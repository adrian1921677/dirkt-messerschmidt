const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcryptjs');

const prisma = new PrismaClient();

async function createAdmin() {
  try {
    // Prüfen ob Admin bereits existiert
    const existingAdmin = await prisma.user.findFirst({
      where: { role: 'ADMIN' }
    });

    if (existingAdmin) {
      console.log('Admin-User existiert bereits:', existingAdmin.email);
      return;
    }

    // Passwort hashen
    const hashedPassword = await bcrypt.hash('admin123', 12);

    // Admin-User erstellen
    const admin = await prisma.user.create({
      data: {
        email: 'admin@dirk-messerschmidt.de',
        name: 'Dirk Messerschmidt',
        password: hashedPassword,
        role: 'ADMIN'
      }
    });

    console.log('Admin-User erfolgreich erstellt:');
    console.log('Email:', admin.email);
    console.log('Passwort: admin123');
    console.log('Rolle:', admin.role);

  } catch (error) {
    console.error('Fehler beim Erstellen des Admin-Users:', error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();
