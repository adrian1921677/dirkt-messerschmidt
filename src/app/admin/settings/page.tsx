'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { 
  Settings, 
  ArrowLeft,
  Save,
  Mail,
  Phone,
  MapPin,
  Globe,
  User,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';

export default function SettingsPage() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  // Einstellungen State
  const [settings, setSettings] = useState({
    // Kontaktdaten
    businessName: 'Dirk Messerschmidt',
    address: 'Alt-Wolfshahn 12',
    city: '42117 Wuppertal',
    phone: '0202 / 423 110',
    mobile: '0171 / 14 15 899',
    email: 'info@messerschmidt.eu',
    website: 'www.messerschmidt.eu',
    
    // Termin-Einstellungen
    defaultSlotDuration: 60,
    workingHoursStart: '09:00',
    workingHoursEnd: '17:00',
    advanceBookingDays: 30,
    cancellationHours: 24,
    
    // E-Mail-Einstellungen
    emailNotifications: true,
    autoConfirmBookings: false,
    sendReminders: true,
    reminderHours: 24,
    
    // Allgemeine Einstellungen
    maintenanceMode: false,
    allowWeekendBookings: false,
    allowHolidayBookings: false,
    maxBookingsPerSlot: 1,
    
    // Datenschutz
    privacyPolicyUrl: 'https://dirkt-messerschmidt.vercel.app/datenschutz',
    termsUrl: 'https://dirkt-messerschmidt.vercel.app/impressum',
  });

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      // Hier würde normalerweise die API aufgerufen werden
      console.log('Speichere Einstellungen:', settings);
      
      // Simuliere API-Aufruf
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Einstellungen erfolgreich gespeichert!');
    } catch (error) {
      console.error('Fehler beim Speichern:', error);
      alert('Fehler beim Speichern der Einstellungen');
    } finally {
      setIsSaving(false);
    }
  };

  const updateSetting = (key: string, value: any) => {
    setSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link href="/admin/dashboard" className="flex items-center space-x-2 text-blue-600 hover:text-blue-700">
                <ArrowLeft className="h-5 w-5" />
                <span>Zurück zum Dashboard</span>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">
                Angemeldet als: {session?.user?.name || session?.user?.email}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Kontaktdaten */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <User className="h-6 w-6 mr-2" />
                Kontaktdaten
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="businessName">Geschäftsname</Label>
                  <Input
                    id="businessName"
                    value={settings.businessName}
                    onChange={(e) => updateSetting('businessName', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Telefon</Label>
                  <Input
                    id="phone"
                    value={settings.phone}
                    onChange={(e) => updateSetting('phone', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="mobile">Mobil</Label>
                  <Input
                    id="mobile"
                    value={settings.mobile}
                    onChange={(e) => updateSetting('mobile', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="email">E-Mail</Label>
                  <Input
                    id="email"
                    type="email"
                    value={settings.email}
                    onChange={(e) => updateSetting('email', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={settings.website}
                    onChange={(e) => updateSetting('website', e.target.value)}
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="address">Adresse</Label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  <Input
                    id="address"
                    placeholder="Straße und Hausnummer"
                    value={settings.address}
                    onChange={(e) => updateSetting('address', e.target.value)}
                  />
                  <Input
                    placeholder="PLZ und Ort"
                    value={settings.city}
                    onChange={(e) => updateSetting('city', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Termin-Einstellungen */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Settings className="h-6 w-6 mr-2" />
                Termin-Einstellungen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="slotDuration">Standard-Slot-Dauer (Minuten)</Label>
                  <Input
                    id="slotDuration"
                    type="number"
                    value={settings.defaultSlotDuration}
                    onChange={(e) => updateSetting('defaultSlotDuration', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="advanceBooking">Vorausbuchung (Tage)</Label>
                  <Input
                    id="advanceBooking"
                    type="number"
                    value={settings.advanceBookingDays}
                    onChange={(e) => updateSetting('advanceBookingDays', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="workingStart">Arbeitsbeginn</Label>
                  <Input
                    id="workingStart"
                    type="time"
                    value={settings.workingHoursStart}
                    onChange={(e) => updateSetting('workingHoursStart', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="workingEnd">Arbeitsende</Label>
                  <Input
                    id="workingEnd"
                    type="time"
                    value={settings.workingHoursEnd}
                    onChange={(e) => updateSetting('workingHoursEnd', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="cancellationHours">Stornierung bis (Stunden vorher)</Label>
                  <Input
                    id="cancellationHours"
                    type="number"
                    value={settings.cancellationHours}
                    onChange={(e) => updateSetting('cancellationHours', parseInt(e.target.value))}
                  />
                </div>
                <div>
                  <Label htmlFor="maxBookings">Max. Buchungen pro Slot</Label>
                  <Input
                    id="maxBookings"
                    type="number"
                    min="1"
                    value={settings.maxBookingsPerSlot}
                    onChange={(e) => updateSetting('maxBookingsPerSlot', parseInt(e.target.value))}
                  />
                </div>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Wochenend-Buchungen erlauben</Label>
                    <p className="text-sm text-gray-600">Kunden können Termine am Wochenende buchen</p>
                  </div>
                  <Switch
                    checked={settings.allowWeekendBookings}
                    onCheckedChange={(checked) => updateSetting('allowWeekendBookings', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Feiertags-Buchungen erlauben</Label>
                    <p className="text-sm text-gray-600">Kunden können Termine an Feiertagen buchen</p>
                  </div>
                  <Switch
                    checked={settings.allowHolidayBookings}
                    onCheckedChange={(checked) => updateSetting('allowHolidayBookings', checked)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* E-Mail-Einstellungen */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Mail className="h-6 w-6 mr-2" />
                E-Mail-Einstellungen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>E-Mail-Benachrichtigungen</Label>
                    <p className="text-sm text-gray-600">Erhalte E-Mails bei neuen Buchungsanfragen</p>
                  </div>
                  <Switch
                    checked={settings.emailNotifications}
                    onCheckedChange={(checked) => updateSetting('emailNotifications', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Automatische Bestätigung</Label>
                    <p className="text-sm text-gray-600">Buchungen automatisch bestätigen (ohne manuelle Prüfung)</p>
                  </div>
                  <Switch
                    checked={settings.autoConfirmBookings}
                    onCheckedChange={(checked) => updateSetting('autoConfirmBookings', checked)}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Erinnerungen senden</Label>
                    <p className="text-sm text-gray-600">Kunden vor ihrem Termin erinnern</p>
                  </div>
                  <Switch
                    checked={settings.sendReminders}
                    onCheckedChange={(checked) => updateSetting('sendReminders', checked)}
                  />
                </div>
              </div>
              
              {settings.sendReminders && (
                <div>
                  <Label htmlFor="reminderHours">Erinnerung (Stunden vorher)</Label>
                  <Input
                    id="reminderHours"
                    type="number"
                    value={settings.reminderHours}
                    onChange={(e) => updateSetting('reminderHours', parseInt(e.target.value))}
                    className="max-w-xs"
                  />
                </div>
              )}
            </CardContent>
          </Card>

          {/* Allgemeine Einstellungen */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Shield className="h-6 w-6 mr-2" />
                Allgemeine Einstellungen
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Wartungsmodus</Label>
                    <p className="text-sm text-gray-600">Website für Wartungsarbeiten sperren</p>
                  </div>
                  <Switch
                    checked={settings.maintenanceMode}
                    onCheckedChange={(checked) => updateSetting('maintenanceMode', checked)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="privacyUrl">Datenschutz-URL</Label>
                  <Input
                    id="privacyUrl"
                    value={settings.privacyPolicyUrl}
                    onChange={(e) => updateSetting('privacyPolicyUrl', e.target.value)}
                  />
                </div>
                <div>
                  <Label htmlFor="termsUrl">Impressum-URL</Label>
                  <Input
                    id="termsUrl"
                    value={settings.termsUrl}
                    onChange={(e) => updateSetting('termsUrl', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Speichern Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={isSaving} size="lg">
              <Save className="h-4 w-4 mr-2" />
              {isSaving ? 'Speichere...' : 'Einstellungen speichern'}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
