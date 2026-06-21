import {createNavigation} from 'next-intl/navigation';

export const {Link, useRouter, usePathname, redirect} =
  createNavigation({
    locales: ['en'],
    defaultLocale: 'en',
    pathnames: {
      '/': '/',
      '/main': '/main',
      '/about': '/about'
    }
  });