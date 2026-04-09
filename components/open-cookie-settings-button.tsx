'use client';

import { OPEN_COOKIE_SETTINGS_EVENT } from '@/components/cookie-consent-events';

type OpenCookieSettingsButtonProps = {
  className?: string;
};

export function OpenCookieSettingsButton({ className }: OpenCookieSettingsButtonProps) {
  function handleClick() {
    window.dispatchEvent(new CustomEvent(OPEN_COOKIE_SETTINGS_EVENT));
  }

  return (
    <button type="button" onClick={handleClick} className={className}>
      Cookies
    </button>
  );
}
