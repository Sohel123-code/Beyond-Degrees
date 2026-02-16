import React, { useMemo } from 'react';
import { Link, useParams } from 'react-router-dom';
import SiteNavbar from '../../shared/SiteNavbar';
import { getCareerById, getStreamCareers, STREAMS } from '../../data/careers';
import CareerDetailSection from '../../components/careers/CareerDetailSection';
import { slugify } from '../../utils/slugify';
import './CareerPaths.css';

function careerImage(careerName) {
  return `/assets/${slugify(careerName)}.png`;
}

function renderMaybeList(value) {
  if (Array.isArray(value) && value.length > 0) {
    return (
      <ul>
        {value.map((v, idx) => (
          <li key={idx}>{v}</li>
        ))}
      </ul>
    );
  }
  if (typeof value === 'string' && value.trim().length > 0) return <p>{value}</p>;
  return null;
}

const CareerDetail = () => {
  const { stream, careerId } = useParams();

  const streamMeta = useMemo(() => STREAMS.find((s) => s.key === stream), [stream]);
  const career = useMemo(() => getCareerById(stream, careerId), [stream, careerId]);
  const related = useMemo(() => {
    const all = getStreamCareers(stream);
    return all.filter((c) => c.id !== careerId).slice(0, 6);
  }, [stream, careerId]);

  if (!career) {
    return (
      <div className="cp">
        <SiteNavbar />
        <main className="cpMain">
          <div className="container">
            <div className="cpEmpty">
              <h3 className="cpEmpty__title">Career not found</h3>
              <p className="cpEmpty__text">
                Check <code>src/data/data.json</code> for the correct <code>id</code>.
              </p>
              <Link className="btn btn--primary" to={`/career-paths/${stream || 'science'}`}>
                Back to careers
              </Link>
            </div>
          </div>
        </main>
      </div>
    );
  }

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
              <Link className="cpHero__crumb" to={`/career-paths/${stream}`}>
                {streamMeta?.label || 'Stream'}
              </Link>
              <span className="cpHero__sep">/</span>
              <span className="cpHero__crumb cpHero__crumb--current">{career.career_name}</span>
            </div>
            <h1 className="cpHero__title">{career.career_name}</h1>
            <p className="cpHero__sub">{career.category}</p>
          </div>

          <div className="cpHero__detailImgWrap" aria-hidden="true">
            <img
              className="cpHero__detailImg"
              src={careerImage(career.career_name)}
              alt=""
              onError={(e) => {
                e.currentTarget.src = '/assets/background.png';
              }}
            />
          </div>
        </div>
      </header>

      <main className="cpMain">
        <div className="container">
          <div className="cpDetailGrid">
            <div className="cpDetailAside">
              <div className="cpQuick">
                <div className="cpQuick__row">
                  <span className="cpQuick__label">Scope in India</span>
                  <span className="cpQuick__value">{career.scope_in_india}</span>
                </div>
                <div className="cpQuick__row">
                  <span className="cpQuick__label">{stream === 'commerce' ? 'Degree / Course Required' : 'Degree Required'}</span>
                  <span className="cpQuick__value">{career.degree_required}</span>
                </div>
                <div className="cpQuick__row">
                  <span className="cpQuick__label">Eligibility</span>
                  <span className="cpQuick__value">{career.eligibility}</span>
                </div>
                {stream === 'commerce' ? (
                  <>
                    <div className="cpQuick__row">
                      <span className="cpQuick__label">Entry-Level Salary</span>
                      <span className="cpQuick__value">{career?.salary_range_inr?.entry_level || '-'}</span>
                    </div>
                    <div className="cpQuick__row">
                      <span className="cpQuick__label">Mid-Level Salary</span>
                      <span className="cpQuick__value">{career?.salary_range_inr?.mid_level || '-'}</span>
                    </div>
                    <div className="cpQuick__row">
                      <span className="cpQuick__label">High-Level Salary</span>
                      <span className="cpQuick__value">{career?.salary_range_inr?.high_level || '-'}</span>
                    </div>
                  </>
                ) : (
                  <div className="cpQuick__row">
                    <span className="cpQuick__label">Entry Salary</span>
                    <span className="cpQuick__value">{career?.salary_range_inr?.entry_level || '-'}</span>
                  </div>
                )}
              </div>
            </div>

            <div className="cpDetailMain">
              <CareerDetailSection title="1. Overview">{renderMaybeList(career.overview)}</CareerDetailSection>
              <CareerDetailSection title="2. Who Should Choose This">
                {renderMaybeList(career.who_should_choose_this)}
              </CareerDetailSection>
              <CareerDetailSection title="3. Eligibility">{renderMaybeList(career.eligibility)}</CareerDetailSection>
              <CareerDetailSection title="4. Skills Required">{renderMaybeList(career.skills_required)}</CareerDetailSection>
              <CareerDetailSection title="5. Learning Paths">{renderMaybeList(career.learning_paths)}</CareerDetailSection>
              <CareerDetailSection title="6. Career Roadmap">{renderMaybeList(career.career_roadmap)}</CareerDetailSection>
              <CareerDetailSection title="7. Scope in India">{renderMaybeList(career.scope_in_india)}</CareerDetailSection>
              <CareerDetailSection title="8. Salary in India">
                <ul>
                  <li>Entry-Level: {career?.salary_range_inr?.entry_level || career?.entry_salary || '-'}</li>
                  <li>Mid-Level: {career?.salary_range_inr?.mid_level || '-'}</li>
                  <li>High-Level: {career?.salary_range_inr?.high_level || '-'}</li>
                </ul>
              </CareerDetailSection>
              <CareerDetailSection title="9. Work Areas">{renderMaybeList(career.work_areas)}</CareerDetailSection>
              <CareerDetailSection title="10. Pros & Cons">
                {(career?.pros_and_cons?.pros?.length || 0) + (career?.pros_and_cons?.cons?.length || 0) === 0 ? (
                  null
                ) : (
                  <div className="cpProsCons">
                    <div>
                      <h4 className="cpProsCons__h">Pros</h4>
                      {renderMaybeList(career?.pros_and_cons?.pros)}
                    </div>
                    <div>
                      <h4 className="cpProsCons__h">Cons</h4>
                      {renderMaybeList(career?.pros_and_cons?.cons)}
                    </div>
                  </div>
                )}
              </CareerDetailSection>
              <CareerDetailSection title="11. How to Start">{renderMaybeList(career.how_to_start)}</CareerDetailSection>
              <CareerDetailSection title="12. Resources">{renderMaybeList(career.resources)}</CareerDetailSection>
              <CareerDetailSection title="13. Related Careers">
                {related.length === 0 ? (
                  null
                ) : (
                  <div className="cpRelated">
                    {related.map((c) => (
                      <Link key={c.id} className="cpRelated__item" to={`/career-paths/${stream}/${c.id}`}>
                        {c.career_name}
                      </Link>
                    ))}
                  </div>
                )}
              </CareerDetailSection>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CareerDetail;

