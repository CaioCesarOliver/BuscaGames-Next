import Footer from "@/components/Footer";
import Nav from "@/components/Nav";
import CartContent from "@/components/CartContent";

export default function CartHeader() {
    return (
        <>
            <Nav />
            <main>
                <section className="bg-[linear-gradient(to_right,_#5b21b6,_#881337)] py-16 mt-16">
                    <div className="max-w-6xl mx-auto px-4">
                        <h1 className="text-4xl font-bold text-white mb-2">Carrinho de Compras</h1>
                        <p className="text-lg text-gray-100">Revise seus itens e finalize sua compra</p>
                    </div>
                </section>

                {/* Conteúdo do Carrinho */}
                <CartContent />
            </main>
            <Footer />
        </>
    );
}