
import React, { useState, useCallback } from 'react';
import Header from './components/Header';
import DescriptionInput from './components/DescriptionInput';
import ThumbnailDisplay from './components/ThumbnailDisplay';
import { generateThumbnail, enhanceThumbnail } from './services/geminiService';

const App: React.FC = () => {
  const [description, setDescription] = useState<string>('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isEnhancing, setIsEnhancing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [title, setTitle] = useState<string>('');
  const [logo, setLogo] = useState<{ B64: string, name: string, mimeType: string } | null>(null);


  const handleGenerate = useCallback(async () => {
    if (!description.trim()) {
      setError('Please enter a video description.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setImageUrl(null);
    setTitle('');
    setLogo(null);

    try {
      const generatedImageUrl = await generateThumbnail(description);
      setImageUrl(generatedImageUrl);
      // Automatically set the title from the first line of the description
      const firstLine = description.split('\n')[0].trim();
      setTitle(firstLine);
    } catch (err) {
      console.error(err);
      setError('Failed to generate thumbnail. Please check your API key and try again.');
    } finally {
      setIsLoading(false);
    }
  }, [description]);
  
  const handleEnhance = useCallback(async () => {
    if (!imageUrl) {
        setError('Generate an image before enhancing.');
        return;
    }
    if (!title.trim()) {
      setError('Please enter a title to add to the thumbnail.');
      return;
    }

    setIsEnhancing(true);
    setError(null);

    try {
      const base64ImageData = imageUrl.split(',')[1];
      const enhancedImageUrl = await enhanceThumbnail(base64ImageData, title, logo);
      setImageUrl(enhancedImageUrl);
    } catch (err) {
      console.error(err);
      setError('Failed to enhance thumbnail. The model may not be suitable for image editing. Please try again.');
    } finally {
      setIsEnhancing(false);
    }
  }, [imageUrl, title, logo]);

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  }

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const dataUrl = reader.result as string;
        const mimeType = dataUrl.split(':')[1].split(';')[0];
        const base64String = dataUrl.split(',')[1];
        setLogo({ B64: base64String, name: file.name, mimeType });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto p-4 md:p-8 flex flex-col lg:flex-row gap-8">
        <div className="lg:w-1/3 flex flex-col">
          <DescriptionInput
            description={description}
            onDescriptionChange={handleDescriptionChange}
            onGenerate={handleGenerate}
            isLoading={isLoading}
          />
        </div>
        <div className="lg:w-2/3 flex-grow flex flex-col">
          <ThumbnailDisplay
            imageUrl={imageUrl}
            isLoading={isLoading}
            isEnhancing={isEnhancing}
            error={error}
            title={title}
            logoName={logo?.name}
            onTitleChange={handleTitleChange}
            onLogoChange={handleLogoChange}
            onEnhance={handleEnhance}
            onRegenerate={handleGenerate}
          />
        </div>
      </main>
      <footer className="text-center p-4 text-slate-500 text-sm">
        <p>Powered by Google Gemini. For channel: <a href="https://www.youtube.com/@ImbilaAI" target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">ImbilaAI</a></p>
      </footer>
    </div>
  );
};

export default App;
