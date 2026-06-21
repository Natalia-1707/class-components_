import type {Metadata} from 'next';
import ReduxProvider from '../../store/ReduxProvider';
import '../../index.css';
import {ThemeProvider} from '../../context/ThemeContext';
import ErrorBoundary from '../../components/ErrorBoundary/ErrorBoundary';
import {NextIntlClientProvider} from 'next-intl';
import {getMessages} from 'next-intl/server';

export const metadata: Metadata = {
  title: 'Star Trek Search'
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{locale: string}>
}) {
  const messages = await getMessages(); 
  const {locale: currentLocale} = await params;
  const locale = currentLocale === 'main' || currentLocale === 'about' ? 'en' : currentLocale;

    return (
    /* prettier-ignore */
    <html lang={locale}>
      <head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
        />
        </head>
        <body>
          <NextIntlClientProvider messages={messages}>
            <ReduxProvider>
              <ThemeProvider>
                <ErrorBoundary>{children}</ErrorBoundary>
              </ThemeProvider>
            </ReduxProvider>
          </NextIntlClientProvider>
        </body>
      </html>
  );
}
