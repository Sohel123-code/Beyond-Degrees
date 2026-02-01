import React, { useState } from 'react';
import SiteNavbar from '../shared/SiteNavbar';
import { Link } from 'react-router-dom';
import emailjs from '@emailjs/browser';
import './HomePage.css';

const HomePage = () => {
  const [name, setName] = useState('');
  const [submittedName, setSubmittedName] = useState('');
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedName(name);
    setStatus('sending');

    // EmailJS Configuration (User provided snippet style)
    emailjs.sendForm(
      'BEYOND-DEGREES',        // Service ID
      'template_zutecjv',      // Template ID (Using previous ID provided by user)
      e.target,                // Form element
      'YOUR_PUBLIC_KEY'        // Public Key (Placeholder)
    )
      .then(() => {
        setStatus('success');
        setSubmittedName(name);
        setName('');
        setEmail('');
        // Reset status after a few seconds to allow multiple clicks as requested
        setTimeout(() => setStatus(''), 5000);
      })
      .catch((error) => {
        console.error(error);
        // Removed error message display as per user request
        setStatus('');
        setName('');
        setEmail('');
      });
  };

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
                <h3 className="card__title">Career Paths Explorer</h3>
                <p className="card__text">
                  Discover diverse career opportunities tailored to your degree and interests.
                  Our comprehensive guide helps you navigate the professional world with confidence.
                </p>
                <Link to="/career-paths" className="btn btn--primary btn--small card__btn">
                  Explore Career Paths
                </Link>
              </div>
            </article>

            <article className="card card--resource">
              <div className="card__media">
                <img className="card__mediaImg" src="/assets/m3.jpg" alt="" loading="lazy" />
              </div>
              <div className="card__body">
                <h3 className="card__title">Resume &amp; Cover Letters</h3>
                <p className="card__text">
                  Craft the perfect resume and cover letter with our expert tips.
                  Make a lasting impression on recruiters and land your dream job.
                </p>
                <a href="#resources" className="btn btn--primary btn--small card__btn">
                  View Resume Tips
                </a>
              </div>
            </article>

            <article className="card card--resource">
              <div className="card__media">
                <img className="card__mediaImg" src="/assets/m4.jpg" alt="" loading="lazy" />
              </div>
              <div className="card__body">
                <h3 className="card__title">Interview Preparation</h3>
                <p className="card__text">
                  Ace your next interview with confidence. Learn how to answer
                  tough questions and present your best self to potential employers.
                </p>
                <a href="#resources" className="btn btn--primary btn--small card__btn">
                  Start Prep
                </a>
              </div>
            </article>

            <article className="card card--resource">
              <div className="card__media">
                <img className="card__mediaImg" src="/assets/chatbot.webp" alt="GradBuddy AI" loading="lazy" />
              </div>
              <div className="card__body">
                <h3 className="card__title">GradBuddy AI</h3>
                <p className="card__text">
                  Meet your personal career companion. Ask anything about your studies,
                  career paths, or skills, and get personalized AI guidance instantly.
                </p>
                <Link to="/gradbuddy" className="btn btn--primary btn--small card__btn">
                  Chat with GradBuddy
                </Link>
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

          <form className="newsletter__form" onSubmit={handleSubmit}>
            <input
              className="newsletter__input"
              type="text"
              name="user_name"
              placeholder="Enter your name"
              aria-label="Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={status === 'sending' || status === 'success'}
            />
            <input
              className="newsletter__input"
              type="email"
              name="user_email"
              placeholder="Enter your email"
              aria-label="Email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={status === 'sending' || status === 'success'}
            />
            <button
              className={`btn btn--primary newsletter__btn ${status === 'success' ? 'btn--success' : ''}`}
              type="submit"
            >
              {status === 'sending' ? 'Joining...' : status === 'success' ? 'Joined!' : 'Join Our Community'}
            </button>
          </form>
          {status === 'success' && (
            <p className="newsletter__message newsletter__message--success">
              Welcome {submittedName}! You have successfully joined our community.
            </p>
          )}
        </div>
      </section>
    </div>
  );
};

export default HomePage;

