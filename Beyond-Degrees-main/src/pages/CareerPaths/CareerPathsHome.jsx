import React from 'react';
import { Link } from 'react-router-dom';
import SiteNavbar from '../../shared/SiteNavbar';
import { STREAMS } from '../../data/careers';
import './CareerPaths.css';

const CareerPathsHome = () => {
  return (
    <div className="cp">
      <SiteNavbar />

      <header className="cpHero">
        <div className="container">
          <h1 className="cpHero__title">Career Paths</h1>
          <p className="cpHero__sub">Choose your stream to explore careers beyond traditional options.</p>
        </div>
      </header>

      <main className="cpMain">
        <div className="container">
          <div className="cpGrid">
            {STREAMS.map((s) => (
              <Link key={s.key} className="cpStream" to={`/career-paths/${s.key}`}>
                <div className="cpStream__imgWrap">
                  <img
                    className="cpStream__img"
                    src={s.image}
                    alt={s.label}
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.src = '/assets/background.png';
                    }}
                  />
                </div>
                <div className="cpStream__body">
                  <h3 className="cpStream__title">{s.label}</h3>
                  <p className="cpStream__text">Explore curated careers for your stream.</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default CareerPathsHome;

