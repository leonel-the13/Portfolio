import Link from "next/link";

/**
 * "/" não tem conteúdo próprio: redirecciona para /en/ se o browser estiver em inglês,
 * caso contrário para /pt/ (idioma por defeito). Funciona em alojamento estático.
 */
const redirectScript = `try{var l=(navigator.language||"").toLowerCase();location.replace(l.indexOf("en")===0?"/en/":"/pt/")}catch(e){location.replace("/pt/")}`;

export default function RootPage() {
  return (
    <>
      <meta httpEquiv="refresh" content="1; url=/pt/" />
      <link rel="canonical" href="/pt/" />
      <script dangerouslySetInnerHTML={{ __html: redirectScript }} />
      <p style={{ padding: 24 }}>
        <Link href="/pt/" style={{ color: "#60a5fa" }}>
          victor-kangombe.me
        </Link>
      </p>
    </>
  );
}
