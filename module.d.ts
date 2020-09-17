interface ILogoConfig {
  image: string;
  href: string;
}

interface INavItem {
  title: string;
  path: string;
}

interface INavGroupItem {
  name: string;
  items: INavItem[];
}

interface ILocaleItem {
  text: string;
  nav: INavGroupItem[];
}

interface IDocxConfig {
  title: string;
  defaultLang: string;
  logo: ILogoConfig;
  locales: ILocaleItem;
}


declare module 'site-desktop-shared' {
  const config:IDocxConfig;
}
