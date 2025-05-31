import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <div className="container">
        <nav className="nav">
          <h1>我的博客</h1>
          <div className="nav-links">
            <Link 
              to="/" 
              className={location.pathname === '/' ? 'active' : ''}
            >
              首页
            </Link>
            <Link 
              to="/create" 
              className={location.pathname === '/create' ? 'active' : ''}
            >
              写文章
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;
