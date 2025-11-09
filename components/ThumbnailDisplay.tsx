
import React from 'react';

interface ThumbnailDisplayProps {
  imageUrl: string | null;
  isLoading: boolean;
  isEnhancing: boolean;
  error: string | null;
  title: string;
  logoName?: string;
  onTitleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onLogoChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnhance: () => void;
  onRegenerate: () => void;
}

const ThumbnailDisplay: React.FC<ThumbnailDisplayProps> = ({ 
    imageUrl, 
    isLoading, 
    isEnhancing,
    error,
    title,
    logoName,
    onTitleChange,
    onLogoChange,
    onEnhance,
    onRegenerate
}) => {
  const downloadImage = () => {
    if (!imageUrl) return;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'youtube_thumbnail.jpeg';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
    
  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center gap-4">
          <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-cyan-400"></div>
          <h3 className="text-xl font-semibold">Generating your thumbnail...</h3>
          <p className="text-slate-400">This can take a moment. The AI is hard at work creating something amazing!</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center text-center gap-4 text-red-400">
           <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
            <path fillRule="evenodd" d="M9.401 3.003c1.155-2 4.043-2 5.197 0l7.355 12.748c1.154 2-.29 4.5-2.599 4.5H4.645c-2.309 0-3.752-2.5-2.598-4.5L9.4 3.003ZM12 8.25a.75.75 0 0 1 .75.75v3.75a.75.75 0 0 1-1.5 0V9a.75.75 0 0 1 .75-.75Zm0 8.25a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Z" clipRule="evenodd" />
          </svg>
          <h3 className="text-xl font-semibold">An Error Occurred</h3>
          <p>{error}</p>
        </div>
      );
    }
    
    if (imageUrl) {
        return (
            <div className="flex flex-col items-center gap-4 w-full h-full">
                <div className="w-full">
                    <h2 className="text-lg font-semibold text-cyan-300">2. Your Generated Thumbnail</h2>
                    <p className="text-sm text-slate-400 mb-2">Review the generated image. You can download it, regenerate it, or enhance it below.</p>
                </div>
                <div className="relative w-full max-w-3xl aspect-video group">
                    <img src={imageUrl} alt="Generated YouTube Thumbnail" className="w-full h-full rounded-lg shadow-2xl object-cover" />
                </div>
                 <div className="flex items-center gap-4 mt-2">
                    <button
                        onClick={downloadImage}
                        className="bg-green-600 text-white font-bold py-2 px-5 rounded-md hover:bg-green-500 transition-all duration-300 flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path d="M10.75 2.75a.75.75 0 0 0-1.5 0v8.614L6.295 8.235a.75.75 0 1 0-1.09 1.03l4.25 4.5a.75.75 0 0 0 1.09 0l4.25-4.5a.75.75 0 0 0-1.09-1.03l-2.955 3.129V2.75Z" />
                            <path d="M3.5 12.75a.75.75 0 0 0-1.5 0v2.5A2.75 2.75 0 0 0 4.75 18h10.5A2.75 2.75 0 0 0 18 15.25v-2.5a.75.75 0 0 0-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5Z" />
                        </svg>
                        Download
                    </button>
                     <button
                        onClick={onRegenerate}
                        disabled={isLoading}
                        className="bg-slate-600 text-white font-bold py-2 px-5 rounded-md hover:bg-slate-500 transition-all duration-300 flex items-center justify-center gap-2 disabled:bg-slate-700 disabled:cursor-not-allowed"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path fillRule="evenodd" d="M15.312 11.342a1.25 1.25 0 1 1-2.188-1.405l.028.021a3.75 3.75 0 0 0-4.23-5.003l-.03.003a3.75 3.75 0 0 0-4.212 5.006l.03-.003a1.25 1.25 0 1 1-2.188 1.405l-.028-.021a6.25 6.25 0 0 1 7.03-8.353l.042.003a6.25 6.25 0 0 1 7.03 8.353l-.042-.003Z" clipRule="evenodd" />
                            <path fillRule="evenodd" d="M4.688 8.658a1.25 1.25 0 1 1 2.188 1.405l-.028-.021a3.75 3.75 0 0 0 4.23 5.003l.03-.003a3.75 3.75 0 0 0 4.212-5.006l-.03.003a1.25 1.25 0 1 1 2.188-1.405l.028.021a6.25 6.25 0 0 1-7.03 8.353l-.042-.003a6.25 6.25 0 0 1-7.03-8.353l.042.003Z" clipRule="evenodd" />
                        </svg>
                        Regenerate
                    </button>
                </div>
                <div className="w-full border-t border-slate-700 mt-4 pt-4">
                    <h3 className="text-lg font-semibold text-cyan-300">3. Enhance Thumbnail</h3>
                    <p className="text-sm text-slate-400 mb-4">Add a title and an optional logo to your thumbnail.</p>
                    <div className="flex flex-col gap-4">
                        <input 
                            type="text"
                            value={title}
                            onChange={onTitleChange}
                            placeholder="Enter catchy video title here..."
                            className="w-full bg-slate-900 border border-slate-700 rounded-md p-3 text-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all"
                        />
                        <div className="flex items-center gap-4">
                             <label className="flex-grow cursor-pointer bg-slate-700 hover:bg-slate-600 text-slate-300 font-bold py-2 px-4 rounded-md transition-all duration-300 text-center">
                                <input type="file" className="hidden" accept="image/png, image/jpeg, image/webp" onChange={onLogoChange} />
                                {logoName ? `Logo: ${logoName}` : 'Upload Logo (Optional)'}
                            </label>
                            <button
                                onClick={onEnhance}
                                disabled={isEnhancing || !title.trim()}
                                className="w-full flex-grow bg-cyan-500 text-slate-900 font-bold py-2 px-4 rounded-md hover:bg-cyan-400 transition-all duration-300 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isEnhancing ? (
                                    <>
                                        <svg className="animate-spin -ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                                        Enhancing...
                                    </>
                                ) : (
                                    'Enhance with AI'
                                )}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="flex flex-col items-center justify-center text-center gap-4 text-slate-500">
             <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16">
                <path d="M4.5 4.5a3 3 0 0 0-3 3v9a3 3 0 0 0 3 3h15a3 3 0 0 0 3-3v-9a3 3 0 0 0-3-3h-15ZM21 8.25c0-.414-.336-.75-.75-.75H3.75a.75.75 0 0 0 0 1.5h16.5c.414 0 .75-.336.75-.75ZM9 12.75a.75.75 0 0 0 0 1.5h.25a.75.75 0 0 0 0-1.5H9Zm2.25.75a.75.75 0 0 1-.75-.75h-.25a.75.75 0 0 1 0-1.5h.25a.75.75 0 0 1 .75.75v.75a.75.75 0 0 0 1.5 0v-.75a.75.75 0 0 1 .75-.75h.25a.75.75 0 0 1 0 1.5h-.25a.75.75 0 0 1-.75.75v.75a.75.75 0 0 0 1.5 0v-.75a.75.75 0 0 1 .75-.75h.25a.75.75 0 0 1 0 1.5h-.25a.75.75 0 0 1-.75.75Z" />
            </svg>
            <h3 className="text-xl font-semibold">Your thumbnail will appear here</h3>
            <p>Enter a description and click "Generate Thumbnail" to start.</p>
        </div>
    )
  }

  return (
    <div className="bg-slate-800 rounded-lg shadow-xl p-6 flex flex-col items-center justify-center min-h-[480px] lg:min-h-0">
      {renderContent()}
    </div>
  );
};

export default ThumbnailDisplay;
