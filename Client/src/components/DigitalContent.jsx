import React, { useEffect, useState } from "react";

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
        type === "ebooks"
          ? `https://www.googleapis.com/books/v1/volumes?q=filter=ebooks&startIndex=${startIndex}&maxResults=${MAX_RESULTS}&key=${API_KEY}`
          : `https://www.googleapis.com/books/v1/volumes?q=subject:audiobooks&startIndex=${startIndex}&maxResults=${MAX_RESULTS}&key=${API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      return data.items || [];
    } catch (error) {
      console.error("Error fetching digital content:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchInitialContent = async () => {
      setIsLoadingEBooks(true);
      const initialEBooks = await fetchDigitalContent("ebooks", ebookStartIndex);
      setEbooks(initialEBooks);
      setIsLoadingEBooks(false);

      setIsLoadingAudiobooks(true);
      const initialAudiobooks = await fetchDigitalContent("audiobooks", audiobookStartIndex);
      setAudiobooks(initialAudiobooks);
      setIsLoadingAudiobooks(false);
    };

    fetchInitialContent();
  }, []);

  const loadMoreEBooks = async () => {
    setIsLoadingEBooks(true);
    const newIndex = ebookStartIndex + MAX_RESULTS;
    const newEBooks = await fetchDigitalContent("ebooks", newIndex);
    setEbooks((prev) => [...prev, ...newEBooks]);
    setEbookStartIndex(newIndex);
    setIsLoadingEBooks(false);
  };

  const loadMoreAudiobooks = async () => {
    setIsLoadingAudiobooks(true);
    const newIndex = audiobookStartIndex + MAX_RESULTS;
    const newAudiobooks = await fetchDigitalContent("audiobooks", newIndex);
    setAudiobooks((prev) => [...prev, ...newAudiobooks]);
    setAudiobookStartIndex(newIndex);
    setIsLoadingAudiobooks(false);
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-gray-100 py-12 space-y-8">
      <h2 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-pink-400">
        Digital Books Collection
      </h2>

      {/* Horizontal Scroll Section */}
      <div className="w-full space-y-12">
        {/* E-Books Section */}
        <section className="w-full">
          <h3 className="text-3xl font-bold text-cyan-400 mb-4">E-Books</h3>
          <div className="flex space-x-6 overflow-x-scroll scrollbar-hide">
            {ebooks.map((book, index) => (
              <div
                key={index}
                className="min-w-[200px] max-w-[200px] p-4 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
              >
                <img
                  src={book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150"}
                  alt={book.volumeInfo.title}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <h4 className="text-lg font-semibold text-white truncate">
                  {book.volumeInfo.title}
                </h4>
                <p className="text-sm text-gray-300">{book.volumeInfo.authors?.join(", ")}</p>
                <a
                  href={book.volumeInfo.previewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-2 text-cyan-300 hover:text-cyan-500"
                >
                  Preview
                </a>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={loadMoreEBooks}
              className="px-6 py-2 bg-cyan-500 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-cyan-600 transition-transform"
            >
              {isLoadingEBooks ? "Loading..." : "Load More E-Books"}
            </button>
          </div>
        </section>

        {/* Audiobooks Section */}
        <section className="w-full">
          <h3 className="text-3xl font-bold text-purple-400 mb-4">Audiobooks</h3>
          <div className="flex space-x-6 overflow-x-scroll scrollbar-hide">
            {audiobooks.map((book, index) => (
              <div
                key={index}
                className="min-w-[200px] max-w-[200px] p-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg shadow-lg hover:scale-105 transform transition duration-300"
              >
                <img
                  src={book.volumeInfo.imageLinks?.thumbnail || "https://via.placeholder.com/150"}
                  alt={book.volumeInfo.title}
                  className="w-full h-40 object-cover rounded-md mb-3"
                />
                <h4 className="text-lg font-semibold text-white truncate">
                  {book.volumeInfo.title}
                </h4>
                <p className="text-sm text-gray-300">{book.volumeInfo.authors?.join(", ")}</p>
                <a
                  href={book.volumeInfo.previewLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block mt-2 text-pink-300 hover:text-pink-500"
                >
                  Listen
                </a>
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-4">
            <button
              onClick={loadMoreAudiobooks}
              className="px-6 py-2 bg-purple-500 text-gray-900 font-semibold rounded-lg shadow-md hover:bg-purple-600 transition-transform"
            >
              {isLoadingAudiobooks ? "Loading..." : "Load More Audiobooks"}
            </button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default DigitalContent;
