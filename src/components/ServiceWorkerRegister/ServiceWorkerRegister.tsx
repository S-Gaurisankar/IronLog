'use client';

import { useEffect } from 'react';
import { PWA_CONSTANTS } from 'src/constants';

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
      // Register service worker after page load
      const registerSW = () => {
        navigator.serviceWorker.register(PWA_CONSTANTS.SW_PATH).then(
          (registration) => {
            console.log('ServiceWorker registration successful with scope: ', registration.scope);
          },
          (err) => {
            console.error('ServiceWorker registration failed: ', err);
          }
        );
      };

      if (document.readyState === 'complete') {
        registerSW();
      } else {
        window.addEventListener('load', registerSW);
        return () => window.removeEventListener('load', registerSW);
      }
    }
  }, []);

  return null;
}
