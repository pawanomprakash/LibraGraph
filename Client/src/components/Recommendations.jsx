import React from 'react';

const recommendations = [
  { id: 1, title: 'The Alchemist', image: 'https://schoolworkhelper.net/wp-content/uploads/2021/10/The-Alchemist.jpg' },
  { id: 2, title: 'Sapiens', image: 'https://d30a6s96kk7rhm.cloudfront.net/original/readings/978/009/959/9780099590088.jpg' },
  { id: 3, title: 'Clean Code', image: 'https://miro.medium.com/max/1103/1*PKsDuPxNoKJyJvmlLc64qg.jpeg' },
  { id: 4, title: 'Atomic Habits', image: 'https://jamesclear.com/wp-content/uploads/2019/04/Atomic-Habits-image-e1556227442177.jpg' },
  { id: 5, title: 'Harry Potter', image: 'https://th.bing.com/th/id/R.847ff818eb060a80aa401c0273ee49ef?rik=PitBxG7NXly9yA&riu=http%3a%2f%2fi2.wp.com%2fgeekdad.com%2fwp-content%2fuploads%2f2013%2f02%2fHP1-Kibuishi.jpg&ehk=uafYYv3yMqpRGlecJf0Si6SPSZwksDcZUzc982%2byhlQ%3d&risl=&pid=ImgRaw&r=0' },
  { id: 6, title: 'The Great Gatsby', image: 'https://th.bing.com/th/id/OIP.P1hfBfyKdnmO2R82Ow3lewHaLH?rs=1&pid=ImgDetMain' },
  { id: 7, title: 'The Pragmatic Programmer', image: 'https://th.bing.com/th/id/OIP.KI_tsGHe4sBa0xd3WjpMyQHaJs?rs=1&pid=ImgDetMain' },

];

const Recommendations = () => {
  return (
    <section className="mb-12">
      <div className="flex space-x-4 overflow-x-scroll no-scrollbar">
        {recommendations.map((book) => (
          <div
            key={book.id}
            className="flex-shrink-0 w-48 h-64 rounded-lg shadow-lg bg-gray-700 overflow-hidden"
          >
            <img
              src={book.image}
              alt={book.title}
              className="w-full h-40 object-cover"
            />
            <div className="p-4 text-center text-gray-200 font-semibold">
              {book.title}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Recommendations;
