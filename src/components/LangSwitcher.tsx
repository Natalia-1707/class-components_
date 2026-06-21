

'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function LangSwitcher() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const toggle = () => {
    const fullPath = window.location.pathname;

    const isRussianNow = fullPath.startsWith('/ru');
    const currentLocale = isRussianNow ? 'ru' : 'en';
    const nextLocale = isRussianNow ? 'en' : 'ru';

    const cleanPathname = fullPath.replace(new RegExp(`^\\/${currentLocale}`), '') || '/';
    const newPathWithLocale = `/${nextLocale}${cleanPathname}`;
    
    const paramsString = searchParams.toString();
    const finalUrl = paramsString ? `${newPathWithLocale}?${paramsString}` : newPathWithLocale;

    router.replace(finalUrl);
  };

  if (!mounted) {
    return <button onClick={toggle}>EN</button>;
  }

  const isRussian = window.location.pathname.startsWith('/ru');
  const buttonText = isRussian ? 'RU' : 'EN';

  return (
    <button onClick={toggle}>
      {buttonText}
    </button>
  );
}