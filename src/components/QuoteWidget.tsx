// src/components/QuoteWidget.tsx

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuoteWidget: React.FC = () => {
  // State variables for quote, author, and error
  const [quote, setQuote] = useState<string>('');
  const [author, setAuthor] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // Function to fetch the daily quote from the ZenQuotes API
  const fetchQuote = async () => {
    try {
      setError(null); // Clear any previous errors
      console.log('Fetching quote...');
      
      // Use a CORS proxy if you encounter CORS issues
      const response = await axios.get('https://cors-anywhere.herokuapp.com/https://zenquotes.io/api/today');

      if (response.data && response.data.length > 0) {
        const quoteData = response.data[0];
        setQuote(quoteData.q); // Set quote text
        setAuthor(quoteData.a); // Set quote author
      } else {
        throw new Error('No quote data found');
      }
    } catch (error: any) {
      console.error('Error fetching quote:', error);
      setError('Failed to fetch quote. Please try again later.');
    }
  };

  // Fetch quote on component mount
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <div className="quote-widget">
      <h3>Quote of the Day</h3>
      {error ? (
        <div>
          <p className="error-message">{error}</p>
          <button onClick={fetchQuote} className="retry-button">Retry</button>
        </div>
      ) : (
        <>
          <blockquote>"{quote}"</blockquote>
          <footer>- {author}</footer>
        </>
      )}
    </div>
  );
};

export default QuoteWidget;
