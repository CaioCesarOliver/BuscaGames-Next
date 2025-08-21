import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/auth';

import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

import AccessDenied from "@/components/AccessDenied";

export const metadata = {
  title: 'BuscaGames',
  description: 'O Melhor Site de Ofertas de Jogos',
};

export default async function RootLayout({ children }) {
    const session = await getServerSession(authOptions);
    
    if (!session?.user) {
        return <AccessDenied/>
    }
    
    return (
        <html lang="pt-BR">
            <Nav />
            {children}
            <Footer />
        </html>
    );
}