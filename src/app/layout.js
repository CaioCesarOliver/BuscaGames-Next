import '../styles/globals.css';

export const metadata = {
  title: "BuscaGames",
  description: "O Melhor Site de Ofertas de Jogos",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body
       
      >
        {children}
      </body>
    </html>
  );
}
