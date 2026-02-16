import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import SiteNavbar from '../../shared/SiteNavbar';
import CareerCard from '../../components/careers/CareerCard';
import { getStreamCareers, STREAMS } from '../../data/careers';
import './CareerPaths.css';

const StreamCareers = () => {
  const { stream } = useParams();

  const streamMeta = useMemo(() => STREAMS.find((s) => s.key === stream), [stream]);
  const careers = useMemo(() => getStreamCareers(stream), [stream]);

  return (
    <div className="cp">
      <SiteNavbar />

      <header className="cpHero">
        <div className="container cpHero__row">
          <div>
            <div className="cpHero__crumbs">
              <Link className="cpHero__crumb" to="/career-paths">
                Career Paths
              </Link>
              <span className="cpHero__sep">/</span>
              <span className="cpHero__crumb cpHero__crumb--current">{streamMeta?.label || 'Stream'}</span>
            </div>
            <h1 className="cpHero__title">{streamMeta?.label || 'Careers'}</h1>
            <p className="cpHero__sub">Browse careers. Tap a card to see full details.</p>
          </div>
          {streamMeta?.image ? (
            <img className="cpHero__badge" src={streamMeta.image} alt="" aria-hidden="true" />
          ) : null}
        </div>
      </header>

      <main className="cpMain">
        <div className="container">
          {careers.length === 0 ? (
            <div className="cpEmpty">
              <h3 className="cpEmpty__title">No careers added yet</h3>
              <p className="cpEmpty__text">Add careers for this stream in <code>src/data/data.json</code>.</p>
            </div>
          ) : (
            <div className="cpCards">
              {careers.map((career) => (
                <CareerCard key={career.id} streamKey={stream} career={career} />
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default StreamCareers;

