const CONTACT_EMAIL = "seuemail@exemplo.com";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-zinc-950 text-zinc-100 font-sans">
      {/* Navbar */}
      <header className="fixed top-0 w-full z-10 bg-zinc-950/80 backdrop-blur border-b border-zinc-800">
        <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 py-4">
          <span className="text-lg font-bold tracking-tight text-white">
            Meu Portfólio
          </span>
          <ul className="flex gap-6 text-sm text-zinc-400">
            <li>
              <a href="#sobre" className="hover:text-white transition-colors">
                Sobre
              </a>
            </li>
            <li>
              <a href="#projetos" className="hover:text-white transition-colors">
                Projetos
              </a>
            </li>
            <li>
              <a href="#contato" className="hover:text-white transition-colors">
                Contato
              </a>
            </li>
          </ul>
        </nav>
      </header>

      {/* Hero */}
      <section className="flex flex-1 flex-col items-center justify-center text-center px-6 pt-32 pb-20">
        <p className="text-sm font-medium tracking-widest text-indigo-400 uppercase mb-4">
          Olá, seja bem-vindo(a)!
        </p>
        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-white mb-6">
          Desenvolvedor <span className="text-indigo-400">Full-Stack</span>
        </h1>
        <p className="max-w-xl text-lg text-zinc-400 leading-relaxed mb-8">
          Apaixonado por criar experiências web modernas e de alta performance.
          Explore meus projetos e entre em contato!
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#projetos"
            className="px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
          >
            Ver Projetos
          </a>
          <a
            href="#contato"
            className="px-6 py-3 rounded-full border border-zinc-700 hover:border-zinc-500 text-zinc-300 hover:text-white font-medium transition-colors"
          >
            Falar Comigo
          </a>
        </div>
      </section>

      {/* Sobre */}
      <section id="sobre" className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold text-white mb-4">Sobre Mim</h2>
        <div className="h-1 w-12 bg-indigo-500 rounded mb-8" />
        <p className="text-zinc-400 leading-relaxed max-w-2xl">
          Sou um desenvolvedor apaixonado por tecnologia, sempre em busca de
          aprender novas ferramentas e boas práticas. Tenho experiência com
          React, Next.js, Node.js e muito mais. Gosto de transformar ideias em
          produtos digitais bonitos e funcionais.
        </p>
      </section>

      {/* Projetos */}
      <section id="projetos" className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold text-white mb-4">Projetos</h2>
        <div className="h-1 w-12 bg-indigo-500 rounded mb-8" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              title: "Projeto 1",
              desc: "Descrição breve do projeto. Tecnologias utilizadas e objetivo principal.",
            },
            {
              title: "Projeto 2",
              desc: "Descrição breve do projeto. Tecnologias utilizadas e objetivo principal.",
            },
            {
              title: "Projeto 3",
              desc: "Descrição breve do projeto. Tecnologias utilizadas e objetivo principal.",
            },
          ].map((project) => (
            <div
              key={project.title}
              className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-indigo-500 transition-colors"
            >
              <div className="w-10 h-10 rounded-lg bg-indigo-600 mb-4" />
              <h3 className="text-white font-semibold text-lg mb-2">
                {project.title}
              </h3>
              <p className="text-zinc-400 text-sm leading-relaxed">
                {project.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Contato */}
      <section id="contato" className="max-w-5xl mx-auto px-6 py-20">
        <h2 className="text-2xl font-bold text-white mb-4">Contato</h2>
        <div className="h-1 w-12 bg-indigo-500 rounded mb-8" />
        <p className="text-zinc-400 mb-6">
          Quer bater um papo ou colaborar em um projeto? Manda uma mensagem!
        </p>
        <a
          href={`mailto:${CONTACT_EMAIL}`}
          className="inline-block px-6 py-3 rounded-full bg-indigo-600 hover:bg-indigo-500 text-white font-medium transition-colors"
        >
          {CONTACT_EMAIL}
        </a>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-800 py-6 text-center text-zinc-600 text-sm">
        © {new Date().getFullYear()} Meu Portfólio — Desenvolvido com Next.js e
        Tailwind CSS
      </footer>
    </div>
  );
}
