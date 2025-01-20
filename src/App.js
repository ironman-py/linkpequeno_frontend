import React, { useState, useEffect } from "react";
import axios from "axios";
import { QRCodeSVG } from "qrcode.react";

function App() {
  const [fullUrl, setFullUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [countdown, setCountdown] = useState(0);
  const [showLink, setShowLink] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCountdown(5);
    setShowLink(false);

    const interval = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    setTimeout(async () => {
      clearInterval(interval);
      try {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/shorten`, {
          fullUrl,
        });
        setShortUrl(`${process.env.REACT_APP_API_URL}/${response.data.short}`);
        setShowLink(true);
      } catch (error) {
        console.error("Erro ao encurtar o link:", error);
      }
    }, 5000);
  };

  const shareOnFacebook = () => {
    window.open(
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
        shortUrl
      )}`,
      "_blank"
    );
  };

  const shareOnTwitter = () => {
    window.open(
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(shortUrl)}`,
      "_blank"
    );
  };

  const shareOnWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shortUrl)}`, "_blank");
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center font-orbitron text-blue-400">
      <div className="bg-gray-800 p-8 rounded-lg shadow-lg max-w-2xl w-full">
        <h1 className="text-4xl font-bold mb-6 text-center text-blue-400">
          Encurtador de Links
        </h1>
        <form onSubmit={handleSubmit} className="mb-6">
          <div className="flex">
            <input
              type="text"
              value={fullUrl}
              onChange={(e) => setFullUrl(e.target.value)}
              placeholder="Cole seu link aqui"
              className="flex-1 p-3 border-2 border-blue-400 bg-gray-700 text-blue-400 rounded-l-lg focus:outline-none focus:border-blue-500"
              required
            />
            <button
              type="submit"
              className="bg-blue-500 text-white px-6 py-3 rounded-r-lg font-bold hover:bg-blue-600 transition-colors"
            >
              Encurtar
            </button>
          </div>
        </form>

        {countdown > 0 && (
          <div className="text-center text-2xl mb-4 text-blue-400">
            Gerando link em... {countdown}
          </div>
        )}

        {showLink && (
          <div className="mt-6">
            <p className="text-lg mb-2 text-blue-400">Link encurtado:</p>
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 underline hover:text-blue-300"
            >
              {shortUrl}
            </a>

            <div className="mt-6">
              <h3 className="text-lg mb-2 text-blue-400">QRCode:</h3>
              <div className="flex justify-center">
                <QRCodeSVG
                  value={shortUrl}
                  className="border-2 border-blue-400 p-2 rounded-lg"
                />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-lg mb-2 text-blue-400">Compartilhar:</h3>
              <div className="flex space-x-4 justify-center">
                <button
                  onClick={shareOnFacebook}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600 transition-colors"
                >
                  Facebook
                </button>
                <button
                  onClick={shareOnTwitter}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600 transition-colors"
                >
                  Twitter
                </button>
                <button
                  onClick={shareOnWhatsApp}
                  className="bg-blue-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-600 transition-colors"
                >
                  WhatsApp
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;