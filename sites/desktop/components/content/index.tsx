import React from 'react';
import { useLocation } from "react-router-dom";
import classnames from 'classnames';
import PageHeader from '../header';
import SideNav from '../side-nav';
import { config } from 'site-desktop-shared';

import './styles.scss';

const { showSimulator } = config;

interface IProps {
  locale: string;
  children: React.ReactChild;
  onChange: (locale:string) => void;
}

const Layout: React.FC<IProps> = ({
  locale,
  children,
}) => {
  const location = useLocation();
  const { pathname } = location;
  const withSimulator = !!showSimulator;

  const [ innerHeight, setInnerHeight ] = React.useState(window.innerHeight);
  const [ scrollY, setScrollY ] = React.useState(window.scrollY);
  const iframeRef = React.useRef(null);

  const simulatorStyles = React.useMemo(() => {
    const height = Math.min(640, innerHeight - 90);
    return { 
      height: height + 'px',
    }
  }, [innerHeight])

  const isFixed = React.useMemo(() => {
    return scrollY > 60;
  }, [scrollY])

  React.useEffect(() => {
    window.addEventListener('scroll', () => {
      setScrollY(window.scrollY);
    });
    window.addEventListener('resize', () => {
      setInnerHeight(window.innerHeight);
    });
  }, [])

  const cls = React.useMemo(() => {
    return classnames({
      'van-doc-nav-fixed': isFixed,
    })
  }, [isFixed])
  
  return (
    <div className="van-doc">
      <PageHeader locale={locale} />
      <SideNav locale={locale} className={cls}/>
      <div className={classnames('van-doc-container van-doc-row', {
        'van-doc-container--with-simulator': withSimulator,
      })}>
        <div className="van-doc-content">
          <div >{children}</div>
        </div>
        {withSimulator && <div className={classnames('van-doc-simulator', {
          'van-doc-simulator-fixed': isFixed
        })}>
          <iframe ref={iframeRef} src={`simulator.html#${pathname}`} style={simulatorStyles} frameBorder="0" ></iframe>
        </div>}
      </div>
    </div>
  );
}

export default Layout
