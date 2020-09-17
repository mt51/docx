import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import classnames from 'classnames';
import { config } from 'site-desktop-shared';

import './style.scss';

const { locales } = config;

interface IProps {
  locale: string;
  className?: string;
}

interface INavItem {
  title: string;
  path: string;
}

interface INavGroupItem {
  name: string;
  items: INavItem[];
}

export default class SideNav extends Component<IProps> {

  parseData = (item: INavGroupItem, index: number) => (
    <div className="van-doc-nav__item" key={`nav-${index}`}>
      <div className="van-doc-nav__title">
        {item.name}
      </div>
      {item.items && item.items.map(this.parseList)}
    </div>
  );

  parseList = (navItem: INavItem, index: number) => {
    const { title, path } = navItem;


    return (
      <div className="van-doc-nav__item" key={`nav-list-${index}`}>
        <NavLink
          activeClassName="active"
          exact
          to={`/${this.props.locale}/${navItem.path}`}
        >
          {title}
        </NavLink>
      </div>
    );
  };

  render() {
    const { className, locale } = this.props;

    const { nav } = locales[locale];

    return (
      <div className={classnames('van-doc-nav', {
        [className]: !!className,
      })}>
        {nav.map(this.parseData)}
      </div>
    );
  }
}
