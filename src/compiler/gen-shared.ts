import { genSiteDesktopShared } from './gen-desktop-shared';
import { genSiteMobileShared } from './gen-mobile-shared';

export default function genSiteShared() {
  genSiteDesktopShared();
  genSiteMobileShared();
}
