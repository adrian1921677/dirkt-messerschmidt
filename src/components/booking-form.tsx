'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import { Calendar, Clock, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { BookingFormData, TimeSlot } from '@/types/booking';

const bookingSchema = z.object({
  clientName: z.string().min(2, 'Name muss mindestens 2 Zeichen lang sein'),
  clientEmail: z.string().email('Bitte geben Sie eine gültige E-Mail-Adresse ein'),
  clientPhone: z.string().optional(),
  message: z.string().optional(),
  dataProtection: z.boolean().refine(val => val === true, 'Sie müssen der Datenschutzerklärung zustimmen'),
});

interface BookingFormProps {
  selectedDate: Date;
  selectedSlot: TimeSlot;
  onSubmit: (data: BookingFormData) => void;
  isLoading?: boolean;
}

export function BookingForm({ 
  selectedDate, 
  selectedSlot, 
  onSubmit, 
  isLoading = false 
}: BookingFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<BookingFormData>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      dataProtection: false,
    },
  });

  const dataProtectionChecked = watch('dataProtection');

  const handleFormSubmit = async (data: BookingFormData) => {
    setIsSubmitting(true);
    try {
      await onSubmit(data);
    } finally {
      setIsSubmitting(false);
    }
  };

  const formatTime = (timeString: string) => {
    const [hours, minutes] = timeString.split(':');
    return `${hours}:${minutes}`;
  };

  return (
    <Card className="p-6">
      <div className="mb-6">
        <h3 className="text-xl font-semibold mb-4">Terminbuchung</h3>
        
        {/* Ausgewählter Termin */}
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-gray-600">
              <Calendar className="h-4 w-4" />
              <span className="font-medium">
                {format(selectedDate, 'dd. MMMM yyyy', { locale: de })}
              </span>
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <Clock className="h-4 w-4" />
              <span className="font-medium">
                {formatTime(selectedSlot.startTime)} - {formatTime(selectedSlot.endTime)}
              </span>
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="clientName" className="flex items-center gap-2">
            <User className="h-4 w-4" />
            Name *
          </Label>
          <Input
            id="clientName"
            {...register('clientName')}
            placeholder="Ihr vollständiger Name"
            className={errors.clientName ? 'border-red-500' : ''}
          />
          {errors.clientName && (
            <p className="text-sm text-red-600">{errors.clientName.message}</p>
          )}
        </div>

        {/* E-Mail */}
        <div className="space-y-2">
          <Label htmlFor="clientEmail" className="flex items-center gap-2">
            <Mail className="h-4 w-4" />
            E-Mail-Adresse *
          </Label>
          <Input
            id="clientEmail"
            type="email"
            {...register('clientEmail')}
            placeholder="ihre.email@beispiel.de"
            className={errors.clientEmail ? 'border-red-500' : ''}
          />
          {errors.clientEmail && (
            <p className="text-sm text-red-600">{errors.clientEmail.message}</p>
          )}
        </div>

        {/* Telefon */}
        <div className="space-y-2">
          <Label htmlFor="clientPhone" className="flex items-center gap-2">
            <Phone className="h-4 w-4" />
            Telefonnummer (optional)
          </Label>
          <Input
            id="clientPhone"
            type="tel"
            {...register('clientPhone')}
            placeholder="+49 123 456789"
          />
        </div>

        {/* Nachricht */}
        <div className="space-y-2">
          <Label htmlFor="message" className="flex items-center gap-2">
            <MessageSquare className="h-4 w-4" />
            Nachricht (optional)
          </Label>
          <Textarea
            id="message"
            {...register('message')}
            placeholder="Beschreiben Sie kurz Ihr Anliegen oder haben Sie spezielle Wünsche?"
            rows={4}
          />
        </div>

        {/* Datenschutz */}
        <div className="space-y-2">
          <div className="flex items-start space-x-2">
            <Checkbox
              id="dataProtection"
              {...register('dataProtection')}
              checked={dataProtectionChecked}
            />
            <Label 
              htmlFor="dataProtection" 
              className="text-sm leading-relaxed cursor-pointer"
            >
              Ich stimme der{' '}
              <a 
                href="/datenschutz" 
                target="_blank" 
                className="text-blue-600 hover:underline"
              >
                Datenschutzerklärung
              </a>{' '}
              zu und bin damit einverstanden, dass meine Daten zur Bearbeitung 
              meiner Terminanfrage gespeichert und verwendet werden. *
            </Label>
          </div>
          {errors.dataProtection && (
            <p className="text-sm text-red-600">{errors.dataProtection.message}</p>
          )}
        </div>

        {/* Hinweis */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <p className="text-sm text-blue-800">
            <strong>Wichtiger Hinweis:</strong> Diese Terminanfrage ist verbindlich. 
            Sie erhalten eine Bestätigung per E-Mail. Bei Fragen oder Änderungswünschen 
            kontaktieren Sie uns bitte rechtzeitig.
          </p>
        </div>

        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full" 
          disabled={isSubmitting || isLoading}
        >
          {isSubmitting ? 'Wird gesendet...' : 'Termin verbindlich anfragen'}
        </Button>
      </form>
    </Card>
  );
}
