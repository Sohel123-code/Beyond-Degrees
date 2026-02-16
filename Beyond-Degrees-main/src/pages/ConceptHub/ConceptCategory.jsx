import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import SiteNavbar from '../../shared/SiteNavbar';
import VideoPlayer from '../../shared/VideoPlayer';
import './ConceptCategory.css';

const ConceptCategory = () => {
    const { categoryId } = useParams();
    const navigate = useNavigate();
    const [categoryData, setCategoryData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeVideo, setActiveVideo] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchCategory = async () => {
            try {
                // Try fetching from Node.js backend first
                const response = await fetch(`/api/concepts/${categoryId}`);
                if (response.ok) {
                    const data = await response.json();
                    setCategoryData(data);
                } else {
                    throw new Error('Server error');
                }
            } catch (error) {
                console.warn('Backend not available, using fallback...', error);

                // Fallback: This is a bit simplified, in production you'd import the JSONs
                // For now, let's assume the server is the source of truth as requested
                // But if it fails, we show an error or try to load from a static fetch if possible
                try {
                    // Try to fetch static json from public/src/data if served
                    const res1 = await fetch('/src/data/concept.json');
                    const res2 = await fetch('/src/data/concepts2.json');
                    const d1 = await res1.json();
                    const d2 = await res2.json();
                    const allCategories = [...d1.learnConcepts, ...d2.learnConcepts_remaining];

                    const cat = allCategories.find(c => {
                        const id = c.category.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                        return id === categoryId;
                    });

                    if (cat) {
                        setCategoryData(cat);
                    } else {
                        navigate('/concept-hub');
                    }
                } catch (localError) {
                    console.error('Failed to load local data:', localError);
                    navigate('/concept-hub');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchCategory();
    }, [categoryId]);

    if (loading) return <div className="loading-state">Loading concepts...</div>;
    if (!categoryData) return null;

    const filteredSources = categoryData.sources.filter(source =>
        source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (source.creator && source.creator.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (source.topic && source.topic.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    const handlePlayVideo = (source) => {
        if (source.videoId) {
            setActiveVideo(source);
        } else {
            // If no videoId, open the link in a new tab
            window.open(source.link, '_blank');
        }
    };

    return (
        <div className="concept-category-page">
            <SiteNavbar />

            <header className="category-header" style={{ borderBottomColor: categoryData.color }}>
                <div className="container">
                    <button className="back-btn" onClick={() => navigate('/concept-hub')}>
                        ← Back to Hub
                    </button>
                    <div className="header-flex">
                        <div className="header-text">
                            <h1 className="category-title">{categoryData.category}</h1>
                            <p className="category-desc">{categoryData.description}</p>
                        </div>
                        <div className="search-box">
                            <input
                                type="text"
                                placeholder="Search tutorials, creators, or topics..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <span className="search-icon">🔍</span>
                        </div>
                    </div>
                </div>
            </header>

            <main className="container">
                <div className="sources-grid">
                    {filteredSources.map((source, index) => {
                        const videoId = source.videoId;
                        return (
                            <div key={index} className="source-card">
                                <div className="source-card__preview" onClick={() => handlePlayVideo(source)}>
                                    {videoId ? (
                                        <img
                                            src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`}
                                            alt={source.name}
                                            loading="lazy"
                                        />
                                    ) : (
                                        <div className="no-video-placeholder">
                                            <span>Visit YouTube Channel</span>
                                        </div>
                                    )}
                                    {source.topic && (
                                        <span className="topic-badge-floating">{source.topic}</span>
                                    )}
                                    <div className="play-overlay">
                                        <div className="play-icon">▶</div>
                                    </div>
                                </div>
                                <div className="source-card__content">
                                    <h3 title={source.name}>{source.name}</h3>
                                    {source.creator && (
                                        <div className="creator-row">
                                            <span className="creator-avatar">{source.creator[0]}</span>
                                            <span className="creator-name">{source.creator}</span>
                                        </div>
                                    )}
                                    <button
                                        className="view-btn"
                                        onClick={() => handlePlayVideo(source)}
                                    >
                                        {videoId ? 'Watch Video' : 'Visit Channel'}
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </div>
                {filteredSources.length === 0 && (
                    <div className="empty-results">
                        <p>No results found for "{searchQuery}"</p>
                    </div>
                )}
            </main>

            {activeVideo && (
                <VideoPlayer
                    videoId={activeVideo.videoId}
                    title={activeVideo.name}
                    onClose={() => setActiveVideo(null)}
                />
            )}
        </div>
    );
};

export default ConceptCategory;
