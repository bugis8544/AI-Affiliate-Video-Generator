import React, { useState, useCallback } from 'react';
import { FormData, GeneratedContent } from './types';
import { generateVideoScript } from './services/geminiService';
import { InputForm } from './components/InputForm';
import { OutputDisplay } from './components/OutputDisplay';

const App: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    productName: 'VASMALL - Celana Dalam Sekali Pakai Wanita isi 5 pcs',
    description: 'Celana dalam sekali pakai, nyaman, higienis, cocok untuk traveling, umroh, dan masa nifas.',
    targetAudience: 'Wanita Muslimah usia 20-40',
    contentStyle: 'UGC',
    platform: 'TikTok',
  });
  const [generatedContent, setGeneratedContent] = useState<GeneratedContent | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = useCallback(async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setError(null);
    setGeneratedContent(null);

    try {
      const content = await generateVideoScript(formData);
      setGeneratedContent(content);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unexpected error occurred.');
    } finally {
      setIsLoading(false);
    }
  }, [formData]);

  const LoadingSkeleton: React.FC = () => (
    <div className="mt-8 space-y-6 animate-pulse">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 h-48 bg-gray-200 rounded-lg"></div>
            <div className="h-48 bg-gray-200 rounded-lg"></div>
        </div>
        <div className="h-64 bg-gray-200 rounded-lg"></div>
        <div className="h-24 bg-gray-200 rounded-lg"></div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 font-sans text-gray-900">
      <main className="container mx-auto px-4 py-8 md:py-12">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800">
            AI Affiliate Video Generator
          </h1>
          <p className="mt-2 text-md md:text-lg text-gray-600 max-w-2xl mx-auto">
            Create engaging video scripts for your affiliate products in seconds.
          </p>
        </header>

        <div className="max-w-4xl mx-auto">
          <InputForm
            formData={formData}
            setFormData={setFormData}
            onSubmit={handleSubmit}
            isLoading={isLoading}
          />

          {error && (
            <div className="mt-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative" role="alert">
              <strong className="font-bold">Error: </strong>
              <span className="block sm:inline">{error}</span>
            </div>
          )}
          
          {isLoading && <LoadingSkeleton />}

          {generatedContent && !isLoading && (
            <OutputDisplay 
              content={generatedContent} 
              onReroll={() => handleSubmit()}
              isLoading={isLoading}
            />
          )}
        </div>
        
        <footer className="text-center mt-12 text-gray-500 text-sm">
            <p>Powered by Gemini AI</p>
        </footer>
      </main>
    </div>
  );
};

export default App;
