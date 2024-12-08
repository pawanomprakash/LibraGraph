// OCR.js
import React, { useState } from 'react';


const OCR = () => {
  const [text, setText] = useState('');

  const handleOCR = (event) => {
    const file = event.target.files[0];
    if (file) {
      Tesseract.recognize(file)
        .then(({ data: { text } }) => {
          setText(text);
        })
        .catch((err) => console.error(err));
    }
  };

  return (
    <div>
      <input type="file" onChange={handleOCR} />
      <p>{text}</p>
    </div>
  );
};

export default OCR;
