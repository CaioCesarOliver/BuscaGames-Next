import SectionTitle from '../components/SectionTitle'
import AboutCard from '../components/AboutCard'
import TeamCard from '../components/TeamCard'
import ContatoForm from '../components/ContatoForm'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function Info() {
  const teamMembers = [
    {
      imageSrc: '/profile1.png',
      name: 'Caio Oliveira',
      role: 'Desenvolvedor',
      position: 'Gerente de Projeto',
      rm: 'RM 561294',
      socialLinks: [
        { icon: 'linkedin', url: 'https://linkedin.com/in/alicesilva' },
        { icon: 'github', url: 'https://github.com/CaioCesarOliver' },
        { icon: 'instagram', url: 'https://www.instagram.com/caiooliverss/' },
      ],
    },
    {
      imageSrc: '/profile2.png',
      name: 'Yuri Lesko',
      role: 'Designer UI/UX',
      position: 'Responsável pelo Design',
      rm: 'RM 564119',
      socialLinks: [
        { icon: 'linkedin', url: 'https://www.linkedin.com/in/yuri-gabriel-matana-lesko-7a5499353/' },
        { icon: 'github', url: 'https://github.com/Lsko27' },
        { icon: 'instagram', url: 'https://www.instagram.com/les.ko_/' },
      ],
    },
    {
      imageSrc: '/profile3.png',
      name: 'Rubens Escobar',
      role: 'Desenvolvedor',
      position: 'Responsável por parte do código do projeto',
      rm: 'RM 562164',
      socialLinks: [
        { icon: 'linkedin', url: 'https://www.linkedin.com/in/rubensescobar/' },
        { icon: 'github', url: 'https://github.com/rubensescobar' },
        { icon: 'instagram', url: 'https://www.instagram.com/r.escobar_/' },
      ],
    },
    {
      imageSrc: '/profile4.png',
      name: 'Gabriel Politano',
      role: 'Desenvolvedor',
      position: 'Responsável por parte do código do projeto',
      rm: 'RM 562798',
      socialLinks: [
        { icon: 'linkedin', url: 'https://www.linkedin.com/in/rubensescobar/' },
        { icon: 'github', url: 'https://github.com/rubensescobar' },
        { icon: 'instagram', url: 'https://www.instagram.com/r.escobar_/' },
      ],
    },
    {
      imageSrc: '/profile5.png',
      name: 'Sérgio Cavalcante',
      role: 'Desenvolvedor',
      position: 'Responsável por parte do código do projeto',
      rm: 'RM 563208',
      socialLinks: [
        { icon: 'linkedin', url: 'https://www.linkedin.com/in/sergio-filipi-cavalcante-737053174/' },
        { icon: 'github', url: 'https://github.com/SergioJCavalcante' },
        { icon: 'instagram', url: 'https://www.instagram.com/sergioo_cavalcante/' },
      ],
    },
  ]

  return (
    <>
      <Nav />

      {/* Hero Section */}
      <section
        className="relative w-screen py-20 min-h-[45vh] bg-cover bg-center flex flex-col justify-center items-center px-4"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,0,0,0.7), rgba(0,0,0,0.6)), url('/freepik__expand__92115.png')",
        }}
      >
        <h1 className="text-5xl font-extrabold mb-4 text-indigo-400 drop-shadow-lg text-center max-w-4xl">
          Sobre a BuscaGames
        </h1>
        <p className="max-w-xl text-center text-indigo-200 text-lg">
          Conheça nossa equipe e missão de levar tecnologia de ponta a você.
        </p>
      </section>

      {/* Main content */}
      <main className="bg-gray-100 dark:bg-gray-900 min-h-screen text-gray-900 dark:text-white">
        <div className="p-8 md:p-16 max-w-7xl mx-auto">
          {/* About Section */}
          <SectionTitle
            imageSrc="/team.png"
            subtitle={`A equipe BuscaGames foi criada em fevereiro de 2025 com base nos projetos mensais propostos pela FIAP para desenvolvermos nossos conhecimentos. Somos uma equipe de estudantes do curso de Sistema de Informações apaixonada por games e tecnologia, unida pelo objetivo de compartilhar conhecimento, novidades e experiências do universo gamer.

Cada membro traz sua visão única — seja em desenvolvimento, design ou curadoria de conteúdo — para criar um espaço completo para quem vive e respira jogos. Acreditamos no poder dos games de conectar pessoas, contar histórias e transformar realidades.`}
          >
            Nossa História
          </SectionTitle>
        </div>

        {/* Team Section */}
        <section className="bg-violet-200 dark:bg-gray-950 w-full py-10">
          <div className="max-w-6xl mx-auto px-5">
            <p className="text-center text-xl mt-10 text-purple-950 dark:text-white">Quem somos</p>
            <h1 className="text-6xl text-center mt-1 mb-10 text-purple-950 dark:text-white font-semibold">
              Equipe do Projeto
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mt-8">
              {teamMembers.map((member, index) => (
                <TeamCard key={index} {...member} />
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="p-8 md:p-16 max-w-7xl mx-auto bg-gray-100 dark:bg-gray-900 py-10">
          <h1 className="text-6xl text-purple-950 pb-6 font-semibold text-center dark:text-white">
            Fale Conosco
          </h1>
          <ContatoForm />
        </section>
      </main>

      <Footer />
    </>
  )
}
