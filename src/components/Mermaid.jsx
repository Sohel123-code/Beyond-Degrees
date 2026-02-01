import React, { useEffect, useState, useId } from 'react';
import mermaid from 'mermaid';

// Initialize mermaid once
mermaid.initialize({
    startOnLoad: false,
    theme: 'base',
    securityLevel: 'loose',
    themeVariables: {
        primaryColor: '#e0e7ff',
        primaryTextColor: '#1e293b',
        primaryBorderColor: '#6366f1',
        lineColor: '#6366f1',
        secondaryColor: '#f8fafc',
        tertiaryColor: '#f8fafc',
        mainBkg: '#ffffff',
        nodeBorder: '#6366f1',
        clusterBkg: '#f8fafc',
        titleColor: '#1e293b',
        edgeLabelBackground: '#ffffff',
        nodeTextColor: '#1e293b',
        fontSize: '12px',
        fontFamily: 'Inter, system-ui, sans-serif'
    }
});

const Mermaid = ({ chart }) => {
    const [svg, setSvg] = useState('');
    const [error, setError] = useState(null);
    const id = useId().replace(/:/g, '');

    useEffect(() => {
        const renderChart = async () => {
            if (!chart) return;
            try {
                // Ensure chart starts with a valid mermaid keyword if LLM forgot
                let cleanChart = chart.trim();
                if (!cleanChart.startsWith('graph') && !cleanChart.startsWith('flowchart')) {
                    cleanChart = 'graph TD\n' + cleanChart;
                }

                const { svg } = await mermaid.render(`mermaid-${id}`, cleanChart);
                setSvg(svg);
                setError(null);
            } catch (err) {
                console.error('Mermaid Error:', err);
                setError(err.message);
            }
        };

        renderChart();
    }, [chart, id]);

    if (error) {
        return (
            <div className="mermaid-error">
                <p>Flowchart could not be rendered. View as text:</p>
                <pre>{chart}</pre>
            </div>
        );
    }

    return (
        <div
            className="mermaid-wrapper"
            dangerouslySetInnerHTML={{ __html: svg }}
            style={{ width: '100%', textAlign: 'center' }}
        />
    );
};

export default Mermaid;
