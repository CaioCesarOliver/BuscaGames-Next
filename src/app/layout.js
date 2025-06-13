import '../styles/globals.css';
import AuthProvider from '@/provider/AuthProvider';
import { CartProvider } from '@/context/CartContext';
import { FavoritesProvider } from '@/context/FavoritesContext'; // 👈 importar aqui

export const metadata = {
  title: 'BuscaGames',
  description: 'O Melhor Site de Ofertas de Jogos',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          <CartProvider>
            <FavoritesProvider>
              {children}
            </FavoritesProvider>
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
