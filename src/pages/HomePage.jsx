import React from 'react';
import SiteNavbar from '../shared/SiteNavbar';
import './HomePage.css';

const HomePage = () => {
  return (
    <div className="home">
      <SiteNavbar />

      <header className="hero" id="home">
        <div className="container hero__grid">
          <div className="hero__left">
            <h1 className="hero__title">
              Unlock Your Career <br />
              Potential Beyond the <br />
              Degree
            </h1>
            <p className="hero__subtitle">
              Guidance, Skills &amp; Inspiration for Life After Graduation.
            </p>
            <div className="hero__actions">
              <a className="btn btn--primary" href="#get-started">Get Started</a>
              <a className="btn btn--secondary" href="#learn-more">Learn More</a>
            </div>
          </div>

          <div className="hero__right" aria-hidden="true">
            <div className="hero__illustration">
              <img
                className="hero__img"
                src="/assets/i1.jpg"
                alt=""
                loading="eager"
              />
            </div>
          </div>
        </div>
      </header>

      <section className="features" id="learn-more">
        <div className="container">
          <div className="features__grid">
            <div className="card card--feature">
              <div className="card__icon card__icon--blue" aria-hidden="true">
                <span>⏱</span>
              </div>
              <div className="card__body">
                <h3 className="card__title">Career Guidance</h3>
                <p className="card__text">Expert advice to navigate your career path</p>
              </div>
            </div>

            <div className="card card--feature">
              <div className="card__icon card__icon--gray" aria-hidden="true">
                <span>⚙</span>
              </div>
              <div className="card__body">
                <h3 className="card__title">Skill Development</h3>
                <p className="card__text">Grow your professional skills for success</p>
              </div>
            </div>

            <div className="card card--feature">
              <div className="card__icon card__icon--gold" aria-hidden="true">
                <span>🏆</span>
              </div>
              <div className="card__body">
                <h3 className="card__title">Success Stories</h3>
                <p className="card__text">Inspiring stories from graduates thriving in their careers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="resources" id="resources">
        <div className="container">
          <div className="sectionHead">
            <h2 className="sectionHead__title">Explore Our Resources</h2>
            <p className="sectionHead__sub">Tools and tips to help you on your journey</p>
          </div>

          <div className="resources__grid">
            <article className="card card--resource">
              <div className="card__media">
                <img className="card__mediaImg" src="/assets/m1.jpg" alt="" loading="lazy" />
              </div>
              <div className="card__body">
                <h3 className="card__title">Job Search Tips</h3>
                <p className="card__text">Find the best strategies to land your dream job.</p>
              </div>
            </article>

            <article className="card card--resource">
              <div className="card__media">
                <img className="card__mediaImg" src="/assets/m3.jpg" alt="" loading="lazy" />
              </div>
              <div className="card__body">
                <h3 className="card__title">Resume &amp; Cover Letters</h3>
                <p className="card__text">Craft the perfect resume and cover letter.</p>
              </div>
            </article>

            <article className="card card--resource">
              <div className="card__media">
                <img className="card__mediaImg" src="/assets/m4.jpg" alt="" loading="lazy" />
              </div>
              <div className="card__body">
                <h3 className="card__title">Interview Preparation</h3>
                <p className="card__text">Ace your next interview with confidence.</p>
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className="newsletter" id="get-started">
        <div className="container newsletter__inner">
          <div className="newsletter__head">
            <h2 className="newsletter__title">Join Our Community of Ambitious Graduates</h2>
            <p className="newsletter__sub">Get the latest career tips and updates</p>
          </div>

          <form className="newsletter__form" onSubmit={(e) => e.preventDefault()}>
            <input
              className="newsletter__input"
              type="email"
              placeholder="Enter your email"
              aria-label="Email"
              required
            />
            <button className="btn btn--primary newsletter__btn" type="submit">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

