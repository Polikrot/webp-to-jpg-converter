import React, { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Image as ImageIcon } from 'lucide-react';
import { Switch } from '@/components/ui/switch';

const WebpToJpgConverter = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [convertedImage, setConvertedImage] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

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
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 transition-all duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <Card className={`w-full max-w-md mx-auto overflow-hidden shadow-lg transition-all duration-300 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
        <CardHeader className="relative">
          <CardTitle className="text-3xl font-bold text-center mb-2">WebP na JPG</CardTitle>
          <p className={`text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Konwerter 2024</p>
          <div className="absolute right-4 top-4 flex items-center space-x-2">
            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Jasny</span>
            <Switch
              checked={isDarkMode}
              onCheckedChange={setIsDarkMode}
            />
            <span className={isDarkMode ? 'text-gray-400' : 'text-gray-600'}>Ciemny</span>
          </div>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className={`flex items-center justify-center w-full border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 
            ${isDarkMode ? 'border-gray-600 hover:border-gray-500 bg-gray-700 hover:bg-gray-600' : 'border-gray-300 hover:border-gray-400 bg-gray-50 hover:bg-gray-100'}`}>
            <label htmlFor="file-upload" className="w-full cursor-pointer">
              <div className="flex flex-col items-center justify-center py-10">
                <Upload className={`w-16 h-16 mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <p className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Kliknij lub przeciągnij i upuść plik WebP
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Maksymalny rozmiar: 10MB</p>
              </div>
              <input id="file-upload" type="file" onChange={handleFileChange} accept=".webp" className="hidden" />
            </label>
          </div>
          {selectedFile && (
            <p className={`text-sm text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
              Wybrano: {selectedFile.name}
            </p>
          )}
          {convertedImage && (
            <div className="mt-4">
              <p className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Skonwertowany obraz JPG:</p>
              <img src={convertedImage} alt="Skonwertowany JPG" className="max-w-full h-auto rounded-lg shadow-lg" />
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button 
            onClick={convertToJpg} 
            disabled={!selectedFile}
            className={`w-full py-6 text-lg font-semibold transition-all duration-300 ${
              !selectedFile 
                ? 'opacity-50 cursor-not-allowed' 
                : 'hover:scale-105 active:scale-95'
            }`}
          >
            <ImageIcon className="w-6 h-6 mr-2" />
            Konwertuj WebP na JPG
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default WebpToJpgConverter;