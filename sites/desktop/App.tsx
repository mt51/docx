import React from 'react';
import {
  HashRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';

// import ScrollToTop from './components/scroll-to-top';
// import { version as pkgVersion } from '../../configs/doc.config';
// import navConfig from '../../configs/nav.config';
// import { prefix } from '../../constants';
import DocContent from './components/content';
import getRoutes from './router.config';
import { config } from 'site-desktop-shared';

const routes = getRoutes();

export default function App() {
  const [locale, setLocale] = React.useState<string>(config.defaultLang);

  const changeLocale = React.useCallback((locale: string) => {
    setLocale(locale);
  }, []);

  return <Router>
    <DocContent locale={locale} onChange={changeLocale}>
      {/* <ScrollToTop>
        <Switch>
          {
            routes.map(item => <Route path={item.path} component={item.component} key={item.name} />)
          }
          <Redirect from="/*" to={`${i18n}/quickstart`} />
        </Switch>
      </ScrollToTop> */}
    </DocContent>
  </Router>
}