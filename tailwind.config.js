module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}", // Aplica o Tailwind em todos os arquivos JS/JSX
  ],
  theme: {
    extend: {
      colors: {
        cyberblue: "#00ffea", // Azul neon
        cyberdark: "#0a0a0a", // Preto
        cybergray: "#111", // Cinza escuro
        cyberpurple: "#6b46c1", // Roxo neon (opcional)
      },
      fontFamily: {
        orbitron: ["Orbitron", "sans-serif"], // Fonte futurista
      },
      boxShadow: {
        neon: "0 0 10px #00ffea, 0 0 20px #00ffea", // Sombra neon
      },
    },
  },
  plugins: [],
};