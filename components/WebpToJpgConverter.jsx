import React, { useState } from 'react';

const WebpToJpgConverter = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [convertedImage, setConvertedImage] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === 'image/webp') {
      setSelectedFile(file);
      setConvertedImage(null);
    } else {
      alert('Proszę wybrać plik WebP');
    }
  };

  const convertToJpg = () => {
    if (!selectedFile) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0);
        canvas.toBlob((blob) => {
          const url = URL.createObjectURL(blob);
          setConvertedImage(url);
        }, 'image/jpeg', 0.9);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Konwerter WebP na JPG</h1>
      <input type="file" accept=".webp" onChange={handleFileChange} className="mb-4" />
      {selectedFile && (
        <div className="mb-4">
          <p>Wybrany plik: {selectedFile.name}</p>
          <button onClick={convertToJpg} className="bg-blue-500 text-white px-4 py-2 rounded">
            Konwertuj na JPG
          </button>
        </div>
      )}
      {convertedImage && (
        <div>
          <p className="mb-2">Skonwertowany obraz:</p>
          <img src={convertedImage} alt="Skonwertowany JPG" className="max-w-full h-auto" />
        </div>
      )}
    </div>
  );
};

export default WebpToJpgConverter;