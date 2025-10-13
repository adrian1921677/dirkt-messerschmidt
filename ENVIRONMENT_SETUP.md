# Umgebungsvariablen Setup

## Lokale Entwicklung

Erstellen Sie eine `.env.local` Datei im `website` Verzeichnis mit folgenden Variablen:

```env
# Datenbank
DATABASE_URL="postgresql://username:password@localhost:5432/dirk_messerschmidt"

# NextAuth
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# E-Mail (Resend)
RESEND_API_KEY="re_123456789"

# Admin
ADMIN_EMAIL="admin@dirk-messerschmidt.de"
```

## Vercel Deployment

Konfigurieren Sie folgende Umgebungsvariablen in Vercel:

### Erforderliche Variablen:
- `DATABASE_URL` - PostgreSQL Verbindungsstring
- `NEXTAUTH_URL` - Ihre Domain (z.B. https://dirk-messerschmidt.vercel.app)
- `NEXTAUTH_SECRET` - Zufälliger String für JWT-Signierung
- `RESEND_API_KEY` - API-Schlüssel von Resend
- `ADMIN_EMAIL` - E-Mail-Adresse des Admins

### Demo Admin Account:
- **E-Mail**: admin@demo.de
- **Passwort**: admin123

## Datenbank Setup

1. Erstellen Sie eine PostgreSQL Datenbank
2. Führen Sie `npx prisma db push` aus
3. Erstellen Sie einen Admin-User:

```sql
INSERT INTO users (id, email, name, role, "createdAt", "updatedAt") 
VALUES ('admin-1', 'admin@demo.de', 'Admin User', 'ADMIN', NOW(), NOW());
```

## E-Mail Service (Resend)

1. Registrieren Sie sich bei [Resend](https://resend.com)
2. Erstellen Sie einen API-Schlüssel
3. Fügen Sie den Schlüssel zu den Umgebungsvariablen hinzu
4. Verifizieren Sie Ihre Domain für E-Mail-Versand


