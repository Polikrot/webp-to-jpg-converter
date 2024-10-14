import React, { useState, useCallback } from 'react';
import Head from 'next/head';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Upload, Image, Moon, Sun } from 'lucide-react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { Switch } from '@/components/ui/switch';

const WebpToJpgConverter = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [convertedImage, setConvertedImage] = useState(null);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    const file = acceptedFiles[0];
    if (file && file.type === 'image/webp') {
      setSelectedFile(file);
      setConvertedImage(null);
    } else {
      alert('Proszę wybrać plik WebP');
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {'image/webp': ['.webp']},
    multiple: false 
  });

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
          setConvertedImage(URL.createObjectURL(blob));
        }, 'image/jpeg', 0.9);
      };
      img.src = e.target.result;
    };
    reader.readAsDataURL(selectedFile);
  };

  return (
    <>
      <Head>
        <title>Konwerter WebP na JPG | Darmowe narzędzie online</title>
        <meta name="description" content="Bezpłatny konwerter WebP na JPG. Łatwo przekonwertuj obrazy WebP do formatu JPG online. Szybki, prosty i bez utraty jakości." />
        <meta name="keywords" content="konwerter WebP na JPG, konwersja obrazów, WebP, JPG, darmowe narzędzie online, bez utraty jakości" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://twoja-domena.pl/konwerter-webp-na-jpg" />
        <meta property="og:title" content="Konwerter WebP na JPG | Darmowe narzędzie online" />
        <meta property="og:description" content="Bezpłatny konwerter WebP na JPG. Łatwo przekonwertuj obrazy WebP do formatu JPG online. Szybki, prosty i bez utraty jakości." />
        <meta property="og:url" content="https://twoja-domena.pl/konwerter-webp-na-jpg" />
        <meta property="og:type" content="website" />
      </Head>
      <div className={`min-h-screen flex flex-col items-center justify-center p-4 transition-all duration-300 ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
        <h1 className={`text-4xl font-bold text-center mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          Konwerter WebP na JPG
        </h1>
        <p className={`text-center mb-8 max-w-2xl ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          Szybko i łatwo przekonwertuj swoje obrazy WebP do formatu JPG za pomocą naszego darmowego narzędzia online. Bez utraty jakości, bez rejestracji, bez ograniczeń.
        </p>
        <Card className={`w-full max-w-md mx-auto overflow-hidden shadow-lg transition-all duration-300 ${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white'}`}>
          <CardHeader className="relative">
            <CardTitle className="text-3xl font-bold text-center mb-2">WebP na JPG</CardTitle>
            <p className={`text-center text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Konwerter 2024</p>
            <div className="absolute right-4 top-4 flex items-center space-x-2">
              <Sun className="h-4 w-4" />
              <Switch
                checked={isDarkMode}
                onCheckedChange={setIsDarkMode}
              />
              <Moon className="h-4 w-4" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <motion.div 
              {...getRootProps()} 
              className={`flex items-center justify-center w-full border-2 border-dashed rounded-xl cursor-pointer transition-all duration-300 
                ${isDragActive ? 'border-blue-500 bg-blue-50' : isDarkMode ? 'border-gray-600 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'}
                ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-50 hover:bg-gray-100'}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <input {...getInputProps()} />
              <div className="flex flex-col items-center justify-center py-10">
                <Upload className={`w-16 h-16 mb-4 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`} />
                <p className={`text-lg font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Przeciągnij i upuść plik WebP
                </p>
                <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>lub kliknij, aby wybrać</p>
              </div>
            </motion.div>
            {selectedFile && (
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`text-sm text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
              >
                Wybrano: {selectedFile.name}
              </motion.p>
            )}
            {convertedImage && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-4"
              >
                <p className={`text-sm font-semibold mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>Skonwertowany obraz JPG:</p>
                <img src={convertedImage} alt="Skonwertowany JPG" className="max-w-full h-auto rounded-lg shadow-lg" />
              </motion.div>
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
              <Image className="w-6 h-6 mr-2" />
              Konwertuj WebP na JPG
            </Button>
          </CardFooter>
        </Card>
        <section className={`mt-12 max-w-2xl text-center ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
          <h2 className={`text-2xl font-bold mb-4 ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
            Dlaczego warto używać naszego konwertera WebP na JPG?
          </h2>
          <ul className="list-disc list-inside text-left space-y-2">
            <li>Szybka i łatwa konwersja plików WebP do formatu JPG</li>
            <li>Zachowanie wysokiej jakości obrazu podczas konwersji</li>
            <li>Brak limitów rozmiaru pliku - konwertuj duże obrazy WebP</li>
            <li>Bezpieczne i prywatne - nie przechowujemy Twoich plików</li>
            <li>Darmowe narzędzie online - bez konieczności rejestracji</li>
            <li>Kompatybilne ze wszystkimi popularnymi przeglądarkami</li>
          </ul>
        </section>
      </div>
    </>
  );
};

export default WebpToJpgConverter;