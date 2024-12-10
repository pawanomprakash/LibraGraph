import React, { useEffect, useState } from 'react';

const DigitalContent = () => {
  const [ebooks, setEbooks] = useState([]);
  const [audiobooks, setAudiobooks] = useState([]);
  const [ebookStartIndex, setEbookStartIndex] = useState(0);
  const [audiobookStartIndex, setAudiobookStartIndex] = useState(0);
  const [isLoadingEBooks, setIsLoadingEBooks] = useState(false);
  const [isLoadingAudiobooks, setIsLoadingAudiobooks] = useState(false);

  const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY; 
  const MAX_RESULTS = 12; 

  const fetchDigitalContent = async (type, startIndex) => {
    try {
      const url =
        type === 'ebooks'
          ? `https://www.googleapis.com/books/v1/volumes?q=filter=ebooks&startIndex=${startIndex}&maxResults=${MAX_RESULTS}&key=${API_KEY}`
          : `https://www.googleapis.com/books/v1/volumes?q=subject:audiobooks&startIndex=${startIndex}&maxResults=${MAX_RESULTS}&key=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error('Error fetching digital content:', error);
      return [];
    }
  };

  useEffect(() => {
    const fetchInitialContent = async () => {
      setIsLoadingEBooks(true);
      const initialEBooks = await fetchDigitalContent('ebooks', ebookStartIndex);
      setEbooks(initialEBooks);
      setIsLoadingEBooks(false);

      setIsLoadingAudiobooks(true);
      const initialAudiobooks = await fetchDigitalContent('audiobooks', audiobookStartIndex);
      setAudiobooks(initialAudiobooks);
      setIsLoadingAudiobooks(false);
    };

    fetchInitialContent();
  }, []); 

  const loadMoreEBooks = async () => {
    setIsLoadingEBooks(true);
    const newIndex = ebookStartIndex + MAX_RESULTS;
    const newEBooks = await fetchDigitalContent('ebooks', newIndex);
    setEbooks((prev) => [...prev, ...newEBooks]);
    setEbookStartIndex(newIndex);
    setIsLoadingEBooks(false);
  };

  const loadMoreAudiobooks = async () => {
    setIsLoadingAudiobooks(true);
    const newIndex = audiobookStartIndex + MAX_RESULTS;
    const newAudiobooks = await fetchDigitalContent('audiobooks', newIndex);
    setAudiobooks((prev) => [...prev, ...newAudiobooks]);
    setAudiobookStartIndex(newIndex);
    setIsLoadingAudiobooks(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-gray-100">
      <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400 mb-6 animate-pulse">
        Digital Content
      </h2>

      {/* Display eBooks */}
      <div className="max-w-6xl w-full mb-12">
        <h3 className="text-2xl font-bold mb-4 text-cyan-400">E-Books</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ebooks.map((book, index) => (
            <div
              key={index}
              className="p-4 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-500 rounded-lg shadow-md hover:scale-105 transition-transform"
            >
              <img
                src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
                alt={book.volumeInfo.title}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <h4 className="text-lg font-semibold">{book.volumeInfo.title}</h4>
              <p className="text-sm text-gray-300">{book.volumeInfo.authors?.join(', ')}</p>
              <a
                href={book.volumeInfo.previewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-pink-300 hover:underline text-sm block mt-2"
              >
                Preview
              </a>
            </div>
          ))}
        </div>
        <button
          onClick={loadMoreEBooks}
          className="mt-6 px-6 py-2 bg-cyan-500 text-gray-900 font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform"
        >
          {isLoadingEBooks ? 'Loading...' : 'Load More E-Books'}
        </button>
      </div>

      {/* Display Audiobooks */}
      <div className="max-w-6xl w-full">
        <h3 className="text-2xl font-bold mb-4 text-purple-400">Audiobooks</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {audiobooks.map((book, index) => (
            <div
              key={index}
              className="p-4 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 rounded-lg shadow-md hover:scale-105 transition-transform"
            >
              <img
                src={book.volumeInfo.imageLinks?.thumbnail || 'https://via.placeholder.com/150'}
                alt={book.volumeInfo.title}
                className="w-full h-64 object-cover rounded-md mb-4"
              />
              <h4 className="text-lg font-semibold">{book.volumeInfo.title}</h4>
              <p className="text-sm text-gray-300">{book.volumeInfo.authors?.join(', ')}</p>
              <a
                href={book.volumeInfo.previewLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-teal-300 hover:underline text-sm block mt-2"
              >
                Listen
              </a>
            </div>
          ))}
        </div>
        <button
          onClick={loadMoreAudiobooks}
          className="mt-6 px-6 py-2 bg-purple-500 text-gray-900 font-semibold rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform"
        >
          {isLoadingAudiobooks ? 'Loading...' : 'Load More Audiobooks'}
        </button>
      </div>
    </div>
  );
};

export default DigitalContent;
