import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SiteNavbar from '../../shared/SiteNavbar';
import './ConceptHub.css';

const ConceptHub = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await fetch('/api/concepts');
                if (response.ok) {
                    const data = await response.json();
                    setCategories(data);
                } else {
                    throw new Error('Failed to fetch from server');
                }
            } catch (error) {
                console.warn('Backend server not available, using fallback...', error);
                // Fallback hardcoded categories if server is down
                setCategories([
                    {
                        id: 'money-finance',
                        title: 'Money & Finance',
                        emoji: '💰',
                        image: '/assets/concept-hub/money-finance.png',
                        description: 'Master budgeting, investing, and financial independence.',
                        colorHint: '#ffd700'
                    },
                    {
                        id: 'career-skills',
                        title: 'Career Skills',
                        emoji: '🚀',
                        image: '/assets/concept-hub/career-skills.png',
                        description: 'Essential skills to accelerate your professional growth.',
                        colorHint: '#9370db'
                    },
                    {
                        id: 'life-skills',
                        title: 'Life Skills',
                        emoji: '🧠',
                        image: '/assets/concept-hub/life-skills.png',
                        description: 'Navigate adult life with confidence and emotional intelligence.',
                        colorHint: '#40e0d0'
                    },
                    {
                        id: 'real-world',
                        title: 'Real-World Knowledge',
                        emoji: '🌍',
                        image: '/assets/concept-hub/real-world.png',
                        description: 'Understanding how the world works, from taxes to law.',
                        colorHint: '#ff4500'
                    },
                    {
                        id: 'business-freelancing',
                        title: 'Business & Freelancing',
                        emoji: '🧑‍💼',
                        image: '/assets/concept-hub/business-freelancing.png',
                        description: 'Start your own venture or thrive as a freelancer.',
                        colorHint: '#4169e1'
                    },
                    {
                        id: 'offbeat-careers',
                        title: 'Offbeat Careers',
                        emoji: '🛫',
                        image: '/assets/concept-hub/offbeat-careers.png',
                        description: 'Explore unconventional paths and turning passions into careers.',
                        colorHint: '#ff69b4'
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchCategories();
    }, []);

    return (
        <div className="concept-hub">
            <SiteNavbar />

            <header className="hub-hero">
                <div className="container">
                    <h1 className="hub-hero__title">Concept Hub</h1>
                    <p className="hub-hero__subtitle">
                        Structured learning for the skills they didn't teach you in school.
                    </p>
                </div>
            </header>

            <section className="categories-section">
                <div className="container">
                    {loading ? (
                        <div className="loading-state">Loading categories...</div>
                    ) : (
                        <div className="categories-grid">
                            {categories.map((category) => (
                                <Link
                                    key={category.id}
                                    to={`/concept-hub/${category.id}`}
                                    className="category-card"
                                >
                                    <div className="category-card__media">
                                        <img src={category.image} alt={category.title} className="category-card__img" />
                                        <div className="category-card__overlay" style={{ backgroundColor: category.colorHint }}></div>
                                    </div>
                                    <div className="category-card__content">
                                        <div className="category-card__header">
                                            <span className="category-card__emoji" role="img" aria-label={category.title}>
                                                {category.emoji}
                                            </span>
                                            <h3 className="category-card__title">{category.title}</h3>
                                        </div>
                                        <p className="category-card__description">{category.description}</p>
                                        <span className="category-card__link">Explore Concepts →</span>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
};

export default ConceptHub;
