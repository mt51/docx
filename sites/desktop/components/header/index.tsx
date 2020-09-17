import React, { Component } from 'react';
import { useLocation, useHistory } from 'react-router-dom';
import SearchBox from '../search-box';
import { config } from 'site-desktop-shared';

import './style.scss';

const Header: React.FC<{locale: string}> = ({ locale }) => {
  const history = useHistory();
  const location = useLocation();
  const { logo, title, locales } = config;

  const { nav, text: localeText } = locales[locale];

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
          <SearchBox locale={locale} />
          <ul className="van-doc-header__top-nav">
            {
              nav.logoLink.map(item => (
                <li className="van-doc-header__top-nav-item" key={item.url}>
                  <a className="van-doc-header__logo-link" target="_blank" href={item.url}>
                    <img src={item.image} />
                  </a>
                </li>
                )
              )
            }

            {/* <li ref="version" v-if="versions" className="van-doc-header__top-nav-item">
              <span
                className="van-doc-header__cube van-doc-header__version"
              >
                { versions[0] }
              </span>
            </li> */}
            <li className="van-doc-header__top-nav-item">
              <a
                className="van-doc-header__cube"
                href="langLink"
              >
                {localeText}
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Header;
