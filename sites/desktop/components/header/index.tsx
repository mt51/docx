import React, { Component } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
// import SearchBox from '../search-box';
import { config, version } from 'site-desktop-shared';

import './style.scss';

const Header: React.FC<{locale: string}> = ({ locale }) => {
  const history = useHistory();
  const location = useLocation();
  const { logo, title, locales } = config;

  const { nav, text: localeText } = locales[locale];

  const localesSelectList = Object.keys(locales).filter(key => key !== locale).map(key => ({
    path: key,
    localeText: locales[locale].text,
  }))

  const toggle = React.useCallback(() => {
    const { replace } = history;
    const path = location.pathname.split('/');
    if (path[1] === 'en') {
      path[1] = 'zh';
    } else {
      path[1] = 'en';
    }
    replace(path.join('/'));
  }, []);

  return (
    <div className="van-doc-header">
      <div className="van-doc-row">
        <div className="van-doc-header__top">
          <a href={logo.href} className="van-doc-header__logo">
            <img
              src={logo.image}
              alt="logo"
            />
            <span>{title}</span>
          </a>
          <ul className="van-doc-header__top-nav">
            {
               version && <li className="van-doc-header__top-nav-item">
               <span
                 className="van-doc-header__cube van-doc-header__version"
               >
                 { version }
               </span>
             </li>
            }
            {
              localesSelectList.length > 0 && <li className="van-doc-header__top-nav-item">
                <a
                  className="van-doc-header__cube"
                  href={localesSelectList[0].path}
                >
                  {localesSelectList[0].localeText}
                </a>
              </li>
            }
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
