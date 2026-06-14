import type { MetadataRoute } from 'next';
import { PWA_CONSTANTS } from 'src/constants';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: PWA_CONSTANTS.NAME,
    short_name: PWA_CONSTANTS.SHORT_NAME,
    description: PWA_CONSTANTS.DESCRIPTION,
    start_url: PWA_CONSTANTS.START_URL,
    display: PWA_CONSTANTS.DISPLAY,
    background_color: PWA_CONSTANTS.BACKGROUND_COLOR,
    theme_color: PWA_CONSTANTS.THEME_COLOR,
    icons: [
      {
        src: PWA_CONSTANTS.ICONS.FAVICON,
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: PWA_CONSTANTS.ICONS.ICON_512,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: PWA_CONSTANTS.ICONS.APPLE_ICON,
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
      {
        src: PWA_CONSTANTS.ICONS.ICON_512,
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      }
    ],
  };
}
