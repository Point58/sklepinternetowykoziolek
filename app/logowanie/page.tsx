"use client";

import { useState } from "react";
import { createClient } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LogowaniePage() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setMessage(null);
    setLoading(true);

    if (isLogin) {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        router.push("/profil");
      }
    } else {
      const { error } = await supabase.auth.signUp({
        email,
        password,
      });
      if (error) {
        setError(error.message);
      } else {
        setMessage("Sprawdź swoją skrzynkę e-mail, aby potwierdzić konto.");
      }
    }

    setLoading(false);
  }

  return (
    <div className="page-backdrop page-home-dark min-h-screen text-white">
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-white/10 bg-black/40 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6 sm:px-8">
            <Link
              href="/"
              className="text-sm font-medium text-white/90 hover:text-white transition-opacity duration-200"
            >
              Sklep
            </Link>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-6 py-16">
          <div className="w-full max-w-md">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 shadow-2xl backdrop-blur-sm sm:p-10">
              {/* Tabs */}
              <div className="flex gap-1 rounded-full border border-white/10 bg-white/5 p-1">
                <button
                  onClick={() => {
                    setIsLogin(true);
                    setError(null);
                    setMessage(null);
                  }}
                  className={`flex-1 rounded-full py-2.5 text-sm font-medium transition-all duration-200 ${
                    isLogin
                      ? "bg-white text-black shadow-sm"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  Logowanie
                </button>
                <button
                  onClick={() => {
                    setIsLogin(false);
                    setError(null);
                    setMessage(null);
                  }}
                  className={`flex-1 rounded-full py-2.5 text-sm font-medium transition-all duration-200 ${
                    !isLogin
                      ? "bg-white text-black shadow-sm"
                      : "text-white/60 hover:text-white"
                  }`}
                >
                  Rejestracja
                </button>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-white/70 mb-2"
                  >
                    Adres e-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-full border border-white/15 bg-white/5 px-5 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                    placeholder="jan@przyklad.pl"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-white/70 mb-2"
                  >
                    Hasło
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    minLength={6}
                    className="w-full rounded-full border border-white/15 bg-white/5 px-5 py-3.5 text-white placeholder:text-white/40 focus:outline-none focus:ring-2 focus:ring-white/20"
                    placeholder="Minimum 6 znaków"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-400 bg-red-950/30 rounded-2xl px-4 py-3">
                    {error}
                  </p>
                )}

                {message && (
                  <p className="text-sm text-green-400 bg-green-950/30 rounded-2xl px-4 py-3">
                    {message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-white px-7 py-3.5 text-sm font-medium text-black shadow-sm hover:bg-white/90 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading
                    ? "Ładowanie..."
                    : isLogin
                      ? "Zaloguj się"
                      : "Zarejestruj się"}
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
