'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, ArrowLeft, Home } from 'lucide-react';
import { Suspense } from 'react';

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  const getErrorMessage = (error: string | null) => {
    switch (error) {
      case 'Configuration':
        return 'Es gibt ein Problem mit der Server-Konfiguration.';
      case 'AccessDenied':
        return 'Zugriff verweigert. Sie haben keine Berechtigung für diesen Bereich.';
      case 'Verification':
        return 'Der Verifizierungscode ist ungültig oder abgelaufen.';
      case 'Default':
      case 'undefined':
      default:
        return 'Ein unbekannter Fehler ist aufgetreten. Bitte versuchen Sie es erneut.';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <Card>
          <CardHeader className="text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-red-100 mb-4">
              <AlertCircle className="h-6 w-6 text-red-600" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Anmeldefehler
            </CardTitle>
            <CardDescription className="text-gray-600">
              {getErrorMessage(error)}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-gray-500 mb-6">
                Bitte überprüfen Sie Ihre Anmeldedaten und versuchen Sie es erneut.
              </p>
            </div>
            
            <div className="space-y-3">
              <Button asChild className="w-full">
                <Link href="/admin/login">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Zurück zur Anmeldung
                </Link>
              </Button>
              
              <Button asChild variant="outline" className="w-full">
                <Link href="/">
                  <Home className="h-4 w-4 mr-2" />
                  Zur Startseite
                </Link>
              </Button>
            </div>

            {error && (
              <div className="mt-4 p-3 bg-gray-100 rounded-md">
                <p className="text-xs text-gray-600">
                  <strong>Fehlercode:</strong> {error}
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default function AdminErrorPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ErrorContent />
    </Suspense>
  );
}
