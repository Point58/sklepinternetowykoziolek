import Link from "next/link";
import Particles from "../components/Particles";

const navLinks = [
  { href: "/", label: "Strona główna" },
  { href: "/oferta", label: "Oferta" },
  { href: "/kontakt", label: "Kontakt" },
];

export default function KontaktPage() {
  return (
    <div className="page-backdrop page-home-dark min-h-screen text-white">
      <Particles variant="light" />
      <div className="relative z-10 flex min-h-screen flex-col">
        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6 sm:px-8">
            <Link
              href="/"
              className="inline-block text-sm font-medium text-white/90 transition-all duration-200 hover:scale-105 hover:text-white"
            >
              Sklep
            </Link>
            <nav className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-block text-sm text-white/70 transition-all duration-200 hover:scale-105 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </header>

        <main className="flex-1 px-6 py-20 sm:px-8 sm:py-28">
          <div className="mx-auto max-w-2xl text-center">
            <h1 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              Kontakt
            </h1>
            <p className="mt-6 text-white/60">
              Strona w budowie. Wkrótce pojawią się tu dane kontaktowe.
            </p>
            <Link
              href="/"
              className="mt-10 inline-block text-sm font-medium text-white/70 transition-all duration-200 hover:scale-105 hover:text-white"
            >
              ← Powrót na stronę główną
            </Link>
          </div>
        </main>

        <footer className="border-t border-white/10 bg-black/30 px-6 py-10 sm:px-8">
          <div className="mx-auto max-w-5xl flex flex-col items-center justify-between gap-6 sm:flex-row">
            <Link
              href="/"
              className="inline-block text-sm font-medium text-white/80 transition-all duration-200 hover:scale-105 hover:text-white"
            >
              Sklep
            </Link>
            <nav className="flex gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="inline-block text-sm text-white/55 transition-all duration-200 hover:scale-105 hover:text-white"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
          <p className="mx-auto mt-6 max-w-5xl text-center text-xs text-white/45 sm:text-left">
            © {new Date().getFullYear()} Wszystkie prawa zastrzeżone.
          </p>
        </footer>
      </div>
    </div>
  );
}
