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
  children
}: {
  children: React.ReactNode;
}) {
  const messages = await getMessages();

  return (
    <html lang="en">
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