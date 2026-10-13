/**
 * Transição curta entre páginas. O template volta a montar em cada navegação,
 * por isso a animação CSS repete-se, e funciona mesmo antes do JavaScript carregar.
 */
export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="page-enter">{children}</div>;
}
