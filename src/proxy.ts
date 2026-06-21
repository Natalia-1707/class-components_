import createMiddleware from 'next-intl/middleware';

export default createMiddleware({
  // Список всех поддерживаемых языков в вашем приложении
  locales: ['en', 'ru'],

  // Язык, который будет использоваться по умолчанию
  defaultLocale: 'en',

  // Автоматически перенаправлять на URL с префиксом (например, /main -> /en/main)
  localePrefix: 'always'
});

export const config = {
  // Запуск middleware для всех путей, кроме системных файлов Next.js и ассетов
  matcher: [
    // Поддерживаем корневой роут и пути с локалями
    '/',
    '/(ru|en)/:path*',
    
    // Включаем обработку обычных страниц без локали, чтобы middleware мог сделать редирект
    '/((?!api|_next|_vercel|.*\\..*).*)'
  ]
};