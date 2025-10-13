# Contact API Setup

## Umgebungsvariablen (.env.local)

```bash
# E-Mail (Resend)
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
NOTIFY_EMAIL_TO=inhaber@domain.de
NOTIFY_EMAIL_FROM=kontakt@domain.de

# Slack
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/XXX/YYY/ZZZ

# WhatsApp (Cloud API – empfohlen)
WHATSAPP_TOKEN=EAAG... // Langzeit-Token aus Meta
WHATSAPP_PHONE_NUMBER_ID=123456789012345
WHATSAPP_TO=4917XXXXXXXXX   # Empfängernummer im internationalen Format ohne +

# (Optional) WhatsApp via CallMeBot – nur falls du es nutzen willst
CALLMEBOT_PHONE=4917XXXXXXXXX
CALLMEBOT_APIKEY=XXXXXXXX
```

## API Endpoint

**POST** `/api/contact`

### Request Body
```json
{
  "name": "Max Mustermann",
  "email": "max@example.com",
  "subject": "Anfrage",
  "body": "Hallo, ich hätte gerne ein Gutachten...",
  "phone": "+49 123 456789"
}
```

### Response
```json
{
  "ok": true
}
```

## Test

```bash
curl -X POST http://localhost:3000/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","subject":"Ping","body":"Hallo vom cURL!"}'
```

## Features

- ✅ Request Validierung mit Zod
- ✅ E-Mail Benachrichtigung (Resend)
- ✅ Slack Webhook
- ✅ WhatsApp Cloud API (offiziell)
- ✅ WhatsApp CallMeBot (optional)
- ✅ Fehlerbehandlung
- ✅ Parallel Benachrichtigungen
