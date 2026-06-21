'use client';

import { NextIntlClientProvider } from 'next-intl';

export default function I18nProvider({
  children,
  messages
}: {
  children: React.ReactNode;
  messages: any;
}) {
  return (
    <NextIntlClientProvider messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}