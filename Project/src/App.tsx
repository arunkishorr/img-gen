import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ImageIcon, Loader2, Hexagon as Dragon, Mail, Info } from 'lucide-react';
import { motion } from 'framer-motion';

// Initialize the Gemini API
const genAI = new GoogleGenerativeAI('AIzaSyBWVaF3uhexudMtLf4580ryBWYeWB0KMvg');

function App() {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('generate');

  const generateImage = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      setGeneratedImage(`https://source.unsplash.com/random/800x600/?${encodeURIComponent(prompt)}`);
    } catch (err) {
      setError('Failed to generate image. Please try again.');
      console.error('Error generating image:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 to-black text-white relative overflow-hidden">
      {/* Cyber Dragon Background */}
      <div 
        className="absolute inset-0 opacity-10 bg-cover bg-center z-0"
        style={{
          backgroundImage: 'url("https://images.unsplash.com/photo-1634228932730-b408fb28d52d?q=80&w=2070")',
          backgroundBlendMode: 'overlay'
        }}
      />

      <div className="container mx-auto px-4 py-8 relative z-10">
        <motion.header 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Dragon className="w-12 h-12 text-purple-400" />
            <h1 className="text-4xl font-bold">Dragon AI Generator</h1>
          </div>
          <p className="text-gray-300">Transform your ideas into stunning images using AI</p>
        </motion.header>

        <nav className="max-w-2xl mx-auto mb-8">
          <motion.div 
            className="flex justify-center gap-4 bg-white/5 p-2 rounded-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {['generate', 'about', 'contact'].map((section) => (
              <button
                key={section}
                onClick={() => setActiveSection(section)}
                className={`px-4 py-2 rounded-lg transition-all duration-300 ${
                  activeSection === section 
                    ? 'bg-purple-600 text-white' 
                    : 'hover:bg-white/10'
                }`}
              >
                {section.charAt(0).toUpperCase() + section.slice(1)}
              </button>
            ))}
          </motion.div>
        </nav>

        <div className="max-w-2xl mx-auto">
          {activeSection === 'generate' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-8"
            >
              <motion.div 
                className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-xl hover:shadow-purple-500/20 transition-shadow duration-300"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="mb-6">
                  <label htmlFor="prompt" className="block text-sm font-medium mb-2">
                    Enter your prompt
                  </label>
                  <textarea
                    id="prompt"
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none text-white"
                    rows={3}
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe the image you want to generate..."
                  />
                </div>

                <motion.button
                  onClick={generateImage}
                  disabled={loading}
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {loading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <ImageIcon className="w-5 h-5" />
                      Generate Image
                    </>
                  )}
                </motion.button>

                {error && (
                  <div className="mt-4 text-red-400 text-sm text-center">
                    {error}
                  </div>
                )}
              </motion.div>

              {generatedImage && (
                <motion.div 
                  className="mt-8"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="bg-white/10 backdrop-blur-lg rounded-lg p-4 hover:shadow-purple-500/20 transition-shadow duration-300">
                    <img
                      src={generatedImage}
                      alt="Generated"
                      className="w-full h-auto rounded-lg shadow-lg"
                    />
                  </div>
                </motion.div>
              )}
            </motion.div>
          )}

          {activeSection === 'about' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <Info className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold">About Dragon AI</h2>
              </div>
              <p className="text-gray-300 mb-4">
                Dragon AI is a cutting-edge image generation platform that harnesses the power of artificial intelligence to transform your ideas into stunning visual creations. Our system uses advanced machine learning models to understand and interpret your prompts, generating unique and creative images that match your vision.
              </p>
              <p className="text-gray-300">
                Whether you're an artist seeking inspiration, a designer looking for quick concepts, or just someone who loves to experiment with AI, Dragon AI is here to help bring your imagination to life.
              </p>
            </motion.div>
          )}

          {activeSection === 'contact' && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="bg-white/10 backdrop-blur-lg rounded-lg p-6 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-purple-400" />
                <h2 className="text-2xl font-bold">Contact Us</h2>
              </div>
              <p className="text-gray-300 mb-6">
                Have questions or feedback? We'd love to hear from you! Reach out to us using the form below.
              </p>
              <form className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium mb-2">Email</label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none text-white"
                    placeholder="your@email.com"
                  />
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium mb-2">Message</label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/20 focus:border-purple-500 focus:ring-2 focus:ring-purple-500 focus:outline-none text-white"
                    placeholder="Your message here..."
                  />
                </div>
                <motion.button
                  type="submit"
                  className="w-full bg-purple-600 hover:bg-purple-700 text-white font-medium py-2 px-4 rounded-lg transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Send Message
                </motion.button>
              </form>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;