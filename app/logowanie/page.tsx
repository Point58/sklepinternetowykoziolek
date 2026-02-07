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
    <div className="page-backdrop min-h-screen text-black">
      <div className="relative z-10 flex min-h-screen flex-col">
        {/* Header */}
        <header className="sticky top-0 z-50 border-b border-black/5 bg-white/70 backdrop-blur-xl">
          <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6 sm:px-8">
            <Link
              href="/"
              className="text-sm font-medium text-black hover:opacity-70 transition-opacity duration-200"
            >
              Sklep
            </Link>
          </div>
        </header>

        <main className="flex-1 flex items-center justify-center px-6 py-16">
          <div className="w-full max-w-md">
            <div className="rounded-3xl border border-black/5 bg-white p-8 shadow-[0_1px_3px_rgba(0,0,0,0.04)] sm:p-10">
              {/* Tabs */}
              <div className="flex gap-1 rounded-full border border-black/8 bg-black/[0.02] p-1">
                <button
                  onClick={() => {
                    setIsLogin(true);
                    setError(null);
                    setMessage(null);
                  }}
                  className={`flex-1 rounded-full py-2.5 text-sm font-medium transition-all duration-200 ${
                    isLogin
                      ? "bg-black text-white shadow-sm"
                      : "text-black/60 hover:text-black"
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
                      ? "bg-black text-white shadow-sm"
                      : "text-black/60 hover:text-black"
                  }`}
                >
                  Rejestracja
                </button>
              </div>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-black/70 mb-2"
                  >
                    Adres e-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full rounded-full border border-black/12 bg-black/[0.02] px-5 py-3.5 text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-black/15"
                    placeholder="jan@przyklad.pl"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium text-black/70 mb-2"
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
                    className="w-full rounded-full border border-black/12 bg-black/[0.02] px-5 py-3.5 text-black placeholder:text-black/40 focus:outline-none focus:ring-2 focus:ring-black/15"
                    placeholder="Minimum 6 znaków"
                  />
                </div>

                {error && (
                  <p className="text-sm text-red-600 bg-red-50 rounded-2xl px-4 py-3">
                    {error}
                  </p>
                )}

                {message && (
                  <p className="text-sm text-green-700 bg-green-50 rounded-2xl px-4 py-3">
                    {message}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-full bg-black px-7 py-3.5 text-sm font-medium text-white shadow-sm hover:bg-black/88 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
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
