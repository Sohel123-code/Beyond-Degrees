import axios from 'axios';
import fs from 'fs';
import path from 'path';

const DATA_PATH = path.join(process.cwd(), 'src/data');
const GROQ_API_URL = 'https://api.groq.com/openai/v1/chat/completions';

export const chatWithGradBuddy = async (req, res) => {
    const { message, history } = req.body;
    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    if (!GROQ_API_KEY || GROQ_API_KEY === 'your_groq_api_key_here') {
        return res.status(500).json({ error: 'Groq API key not configured. Please add it to the .env file.' });
    }

    try {
        // Load some data for context
        const dataFiles = [
            'buisness.json', 'arts.json', 'career.json', 'career1.json',
            'commerce.json', 'data.json', 'life.json', 'money.json', 'non-degree.json'
        ];

        let contextData = {};
        dataFiles.forEach(file => {
            const filePath = path.join(DATA_PATH, file);
            if (fs.existsSync(filePath)) {
                try {
                    const content = JSON.parse(fs.readFileSync(filePath, 'utf8'));
                    // Just take a representative sample if it's too large
                    if (Array.isArray(content)) {
                        contextData[file] = content.slice(0, 5).map(i => i.title || i.career_name || i.name);
                    } else if (content.streams) {
                        contextData[file] = Object.keys(content.streams);
                    } else {
                        contextData[file] = Object.keys(content).slice(0, 5);
                    }
                } catch (err) {
                    console.warn(`Failed to parse ${file}`, err);
                }
            }
        });

        const systemPrompt = `You are "GradBuddy", a helpful career guidance chatbot for the "Beyond Degrees" platform. 
Your goal is to help students explore career paths, skills, and life skills.
You have access to information about various streams like Science, Commerce, Arts, Business, and more.
Refer to these categories and topics from our data: ${JSON.stringify(contextData)}.
Keep your responses encouraging, concise, informative, and detailed. 
Provide thorough textual explanations for all career-related queries.

When suggesting career paths:
1. ONLY provide a Mermaid flowchart if the user explicitly asks for one (e.g., "show me a roadmap", "draw a flowchart", "visualize this").
2. If requested, use 'graph TD' (Top-Down).
3. ALWAYS wrap node labels in double quotes and square brackets: A["Label"].
4. Keep IDENTIFIERS (like A, B, C) as single letters or simple words.
5. Ensure the syntax is valid.
Always start by welcoming the user if it's the beginning of the conversation.
Current conversation context: ${JSON.stringify(history)}`;

        const response = await axios.post(GROQ_API_URL, {
            model: 'llama-3.3-70b-versatile',
            messages: [
                { role: 'system', content: systemPrompt },
                ...history,
                { role: 'user', content: message }
            ],
            temperature: 0.7,
            max_tokens: 1024
        }, {
            headers: {
                'Authorization': `Bearer ${GROQ_API_KEY} `,
                'Content-Type': 'application/json'
            }
        });

        const botMessage = response.data.choices[0].message.content;
        res.json({ reply: botMessage });

    } catch (error) {
        console.error('Groq API Error:', error.response?.data || error.message);
        res.status(500).json({ error: 'Failed to get response from GradBuddy. Please try again later.' });
    }
};
