
import React from 'react';

interface DescriptionInputProps {
  description: string;
  onDescriptionChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onGenerate: () => void;
  isLoading: boolean;
}

const DescriptionInput: React.FC<DescriptionInputProps> = ({
  description,
  onDescriptionChange,
  onGenerate,
  isLoading,
}) => {
  return (
    <div className="bg-slate-800 rounded-lg shadow-xl p-6 flex flex-col gap-4 h-full">
      <h2 className="text-lg font-semibold text-cyan-300">1. Enter Video Description</h2>
      <p className="text-sm text-slate-400">
        Paste your YouTube video description below. The more detailed it is, the better the thumbnail will be.
      </p>
      <textarea
        value={description}
        onChange={onDescriptionChange}
        placeholder="e.g., 'A deep dive into how large language models like Gemini work, explaining concepts like transformers, attention mechanisms, and training data...'"
        className="w-full flex-grow bg-slate-900 border border-slate-700 rounded-md p-3 text-slate-300 focus:ring-2 focus:ring-cyan-500 focus:border-cyan-500 transition-all duration-300 min-h-[200px] lg:min-h-[300px] resize-y"
        disabled={isLoading}
      />
      <button
        onClick={onGenerate}
        disabled={isLoading || !description.trim()}
        className="w-full bg-cyan-500 text-slate-900 font-bold py-3 px-4 rounded-md hover:bg-cyan-400 transition-all duration-300 disabled:bg-slate-700 disabled:text-slate-500 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Generating...
          </>
        ) : (
          <>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16Zm.75-13a.75.75 0 0 0-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 0 0 0-1.5h-3.25V5Z" clipRule="evenodd" />
                <path d="M10 3.5a1.5 1.5 0 0 1 3 0V4a.5.5 0 0 1-1 0V3.5a.5.5 0 0 0-1 0V4a.5.5 0 0 1-1 0V3.5Z" />
            </svg>
            Generate Thumbnail
          </>
        )}
      </button>
    </div>
  );
};

export default DescriptionInput;
