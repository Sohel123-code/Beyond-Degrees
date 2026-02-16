import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import Mermaid from '../../components/Mermaid';
import './GradBuddy.css';

const GradBuddy = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef(null);
    const navigate = useNavigate();

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        // Initial greeting
        setMessages([
            {
                role: 'bot',
                content: "Hello! I'm GradBuddy, your AI career companion. 🎓 What are you studying right now?"
            }
        ]);
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSend = async (e) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = { role: 'user', content: input };
        setMessages(prev => [...prev, userMessage]);
        setInput('');
        setIsLoading(true);

        try {
            const response = await fetch('/api/gradbuddy', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    message: input,
                    history: messages.map(m => ({
                        role: m.role === 'bot' ? 'assistant' : 'user',
                        content: m.content
                    }))
                }),
            });

            const data = await response.json();
            if (data.reply) {
                setMessages(prev => [...prev, { role: 'bot', content: data.reply }]);
            } else if (data.error) {
                setMessages(prev => [...prev, { role: 'bot', content: `Error: ${data.error}` }]);
            }
        } catch (error) {
            setMessages(prev => [...prev, { role: 'bot', content: "Sorry, I'm having trouble connecting right now. Please make sure the server is running." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const renderMessageContent = (content) => {
        const parts = content.split(/```mermaid\s*([\s\S]*?)```/i);
        return parts.map((part, index) => {
            if (index % 2 === 1) {
                return <Mermaid key={index} chart={part.trim()} />;
            }
            return <p key={index} style={{ whiteSpace: 'pre-wrap' }}>{part}</p>;
        });
    };

    return (
        <div className="gradbuddy-fullscreen">
            <div className="gradbuddy-header">
                <div className="header-left">
                    <button className="back-btn" onClick={() => navigate('/')}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 12H5M12 19l-7-7 7-7" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <span>Home</span>
                    </button>
                    <div className="bot-info">
                        <span className="bot-icon">🎓</span>
                        <div>
                            <h3>GradBuddy AI</h3>
                            <p>Career Companion</p>
                        </div>
                    </div>
                </div>
                <div className="header-right">
                    <button className="close-btn" onClick={() => navigate('/')}>×</button>
                </div>
            </div>

            <div className="chat-window">
                {messages.map((msg, index) => (
                    <div key={index} className={`message-bubble ${msg.role}`}>
                        <div className="message-content">
                            {renderMessageContent(msg.content)}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className="message-bubble bot">
                        <div className="message-content loading">
                            <span>.</span><span>.</span><span>.</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <form className="chat-input-area" onSubmit={handleSend}>
                <div className="input-wrapper">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask me about careers, skills, or paths..."
                        disabled={isLoading}
                    />
                    <button type="submit" disabled={isLoading || !input.trim()}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M22 2L11 13M22 2L15 22L11 13M11 13L2 9L22 2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>
            </form>
        </div>
    );
};

export default GradBuddy;
