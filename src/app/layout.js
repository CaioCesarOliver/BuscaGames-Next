import '../styles/globals.css';
import AuthProvider from '@/provider/AuthProvider';

export const metadata = {
  title: 'BuscaGames',
  description: 'O Melhor Site de Ofertas de Jogos',
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}

import { CartProvider } from "@/context/CartContext";

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
