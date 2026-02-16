import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import axios from 'axios';
import authRoutes from './routes/authRoutes.js';
import chatRoutes from './routes/chatRoutes.js';

dotenv.config();
dotenv.config({ path: 'api/.env' });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use('/auth', authRoutes);
app.use('/api', chatRoutes); // Mounts at /api/gradbuddy

const DATA_PATH = path.join(process.cwd(), 'src/data');

// Helper to extract YouTube ID from various link formats
const extractVideoId = (link) => {
    if (!link) return null;
    const regex = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = link.match(regex);
    return match ? match[1] : null;
};

// Base categories metadata
const categoriesMetadata = {
    'money-finance': {
        title: 'Money & Finance',
        emoji: '💰',
        image: '/assets/concept-hub/money.jpg',
        description: 'Personal finance, stock market, investing, taxes, and wealth building.',
        colorHint: '#ffd700'
    },
    'career-skills': {
        title: 'Career Skills',
        emoji: '🚀',
        image: '/assets/concept-hub/career.png',
        description: 'Essential skills to accelerate your professional growth.',
        colorHint: '#9370db'
    },
    'life-skills': {
        title: 'Life Skills',
        emoji: '🧠',
        image: '/assets/concept-hub/life.jpg',
        description: 'Navigate adult life with confidence and emotional intelligence.',
        colorHint: '#40e0d0'
    },
    'real-world': {
        title: 'Real-World Knowledge',
        emoji: '🌍',
        image: '/assets/concept-hub/real-world.png',
        description: 'Understanding how the world works, from taxes to law.',
        colorHint: '#ff4500'
    },
    'business-freelancing': {
        title: 'Business & Freelancing',
        emoji: '🧑‍💼',
        image: '/assets/concept-hub/business-freelancing.png',
        description: 'Start your own venture or thrive as a freelancer.',
        colorHint: '#4169e1'
    },
    'offbeat-careers': {
        title: 'Offbeat Careers',
        emoji: '🛫',
        image: '/assets/concept-hub/offbeat-careers.png',
        description: 'Explore unconventional paths and turning passions into careers.',
        colorHint: '#ff69b4'
    }
};

const getMergedData = () => {
    try {
        const fileMapping = {
            'money-finance': ['money.json'],
            'career-skills': ['career.json', 'career1.json'],
            'life-skills': ['life.json'],
            'real-world': ['real.json'],
            'business-freelancing': ['buisness.json'],
            'offbeat-careers': ['offbeat.json']
        };

        const result = Object.keys(categoriesMetadata).map(id => {
            const meta = categoriesMetadata[id];
            let allSources = [];

            const filenames = fileMapping[id] || [];

            filenames.forEach(filename => {
                const filePath = path.join(DATA_PATH, filename);
                if (fs.existsSync(filePath)) {
                    const raw = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                    let videoList = [];

                    // Handle different formats
                    if (Array.isArray(raw)) {
                        videoList = raw;
                    } else if (raw.careerSkills) {
                        videoList = raw.careerSkills;
                    } else if (raw.learnConcepts) {
                        const cat = raw.learnConcepts.find(c => c.category.includes(meta.title.split(' ')[0]));
                        if (cat) videoList = cat.sources;
                    } else if (raw.learnConcepts_remaining) {
                        const cat = raw.learnConcepts_remaining.find(c => c.category.includes(meta.title.split(' ')[0]));
                        if (cat) videoList = cat.sources;
                    } else if (typeof raw === 'object' && !Array.isArray(raw)) {
                        // Flattens all arrays in the object (supports money.json categorization)
                        Object.values(raw).forEach(arr => {
                            if (Array.isArray(arr)) {
                                videoList = [...videoList, ...arr];
                            }
                        });
                    }

                    const processedGroup = videoList.map(v => ({
                        name: v.title || v.name,
                        link: v.link || v.url,
                        creator: v.creator || v.source || '',
                        topic: v.topic || '',
                        videoId: extractVideoId(v.link || v.url),
                        info: (v.creator || v.source) ? `By ${v.creator || v.source}` : (v.info || 'YouTube Tutorial')
                    }));

                    allSources = [...allSources, ...processedGroup];
                }
            });

            return {
                id,
                ...meta,
                sources: allSources
            };
        });

        return result;
    } catch (error) {
        console.error('Error reading data:', error);
        return [];
    }
};

app.get('/api/concepts', (req, res) => {
    const data = getMergedData();
    res.json(data);
});

app.get('/api/concepts/:categoryId', (req, res) => {
    const { categoryId } = req.params;
    const data = getMergedData();

    const category = data.find(c => c.id === categoryId);

    if (category) {
        res.json(category);
    } else {
        res.status(404).json({ error: 'Category not found' });
    }
});

// GradBuddy Bot Implementation moved to controllers/chatController.js


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
