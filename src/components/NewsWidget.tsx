import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NewsSearchWidget: React.FC = () => {
  const [news, setNews] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Perigon API Key
  const apiKey = 'fe4cda1f-8e43-4a99-8f59-8fcec6983621';

  // Query for AEC-specific keywords
  const keywords =
    'technology OR construction OR engineering OR architecture OR "artificial intelligence" OR "machine learning"';

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await axios.get('https://api.goperigon.com/v1/all', {
          params: {
            apiKey: apiKey,
            q: keywords,
            language: 'en',
            sortBy: 'date',
            category: 'Business',
          },
          timeout: 20000, // 20-second timeout
        });

        if (response.status === 200 && response.data.articles.length > 0) {
          setNews(response.data.articles.slice(0, 5)); // Limit to top 5 articles
        } else {
          setError(
            'No relevant articles found. Please try adjusting the query.'
          );
        }
      } catch (error: any) {
        if (error.code === 'ECONNABORTED') {
          setError('The request took too long - please try again later.');
        } else {
          setError('Failed to fetch news data');
        }
        console.error('Error fetching news data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [apiKey, keywords]);

  return (
    <div className="news-widget">
      <h3>News to Watch</h3>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {loading ? (
        <p>Loading...</p>
      ) : (
        <ul className="news-list">
          {news.map((article, index) => (
            <li key={index} className="news-item">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
              <p>{article.description}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default NewsSearchWidget;
