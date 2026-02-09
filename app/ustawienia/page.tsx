"use client";

import { useState, useEffect } from "react";
import { createClient } from "@/app/lib/supabase/client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import ProfileDropdown from "@/app/components/ProfileDropdown";

export default function UstawieniaPage() {
  const supabase = createClient();
  const router = useRouter();

  const [user, setUser] = useState<{ email?: string | null } | null>(null);
  const [loading, setLoading] = useState(true);

  // Change password
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordLoading, setPasswordLoading] = useState(false);
  const [passwordMsg, setPasswordMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Change email
  const [newEmail, setNewEmail] = useState("");
  const [emailLoading, setEmailLoading] = useState(false);
  const [emailMsg, setEmailMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  // Logout
  const [logoutLoading, setLogoutLoading] = useState(false);

  // Delete account
  const [deleteConfirm, setDeleteConfirm] = useState("");
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [deleteMsg, setDeleteMsg] = useState<{ type: "success" | "error"; text: string } | null>(null);

  useEffect(() => {
    async function getUser() {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push("/logowanie");
        return;
      }
      setUser(user);
      setLoading(false);
    }
    getUser();
  }, [supabase, router]);

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault();
    setPasswordMsg(null);

    if (newPassword.length < 6) {
      setPasswordMsg({ type: "error", text: "Hasło musi mieć co najmniej 6 znaków." });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPasswordMsg({ type: "error", text: "Hasła nie są identyczne." });
      return;
    }

    setPasswordLoading(true);
    const { error } = await supabase.auth.updateUser({ password: newPassword });

    if (error) {
      setPasswordMsg({ type: "error", text: error.message });
    } else {
      setPasswordMsg({ type: "success", text: "Hasło zostało zmienione." });
      setNewPassword("");
      setConfirmPassword("");
    }
    setPasswordLoading(false);
  }

  async function handleEmailChange(e: React.FormEvent) {
    e.preventDefault();
    setEmailMsg(null);

    if (!newEmail || !newEmail.includes("@")) {
      setEmailMsg({ type: "error", text: "Podaj prawidłowy adres e-mail." });
      return;
    }

    setEmailLoading(true);
    const { error } = await supabase.auth.updateUser({ email: newEmail });

    if (error) {
      setEmailMsg({ type: "error", text: error.message });
    } else {
      setEmailMsg({ type: "success", text: "Link potwierdzający został wysłany na nowy adres e-mail." });
      setNewEmail("");
    }
    setEmailLoading(false);
  }

  async function handleLogout() {
    setLogoutLoading(true);
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  async function handleDeleteAccount() {
    if (deleteConfirm !== "USUŃ") {
      setDeleteMsg({ type: "error", text: "Wpisz USUŃ, aby potwierdzić usunięcie konta." });
      return;
    }

    setDeleteLoading(true);
    setDeleteMsg(null);

    const { error } = await supabase.rpc("delete_user");

    if (error) {
      setDeleteMsg({ type: "error", text: "Nie udało się usunąć konta. Skontaktuj się z obsługą." });
    } else {
      await supabase.auth.signOut();
      router.push("/");
    }
    setDeleteLoading(false);
  }

  if (loading) {
    return (
      <div className="page-backdrop page-home-dark min-h-screen text-white flex items-center justify-center">
        <div className="relative z-10 text-white/40 text-sm">Ładowanie...</div>
      </div>
    );
  }

  const navLinks = [
    { label: "Strona główna", href: "/" },
    { label: "Oferta", href: "/oferta" },
    { label: "Kontakt", href: "/kontakt" },
  ];

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
            <nav className="flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="hidden sm:block text-sm text-white/70 hover:text-white transition-colors duration-200"
                >
                  {link.label}
                </Link>
              ))}
              <ProfileDropdown user={user} />
            </nav>
          </div>
        </header>

        <main className="flex-1 px-6 py-12 sm:py-16">
          <div className="mx-auto w-full max-w-2xl">
            {/* Page title */}
            <div className="mb-10">
              <Link
                href="/profil"
                className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 transition-colors duration-200 mb-4"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="19" y1="12" x2="5" y2="12" />
                  <polyline points="12 19 5 12 12 5" />
                </svg>
                Powrót do profilu
              </Link>
              <h1 className="text-2xl font-semibold tracking-tight text-white">
                Ustawienia
              </h1>
              <p className="mt-2 text-sm text-white/45">
                Zarządzaj swoim kontem i zabezpieczeniami.
              </p>
            </div>

            <div className="space-y-6">
              {/* Change password section */}
              <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/50">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-base font-medium text-white">Zmień hasło</h2>
                    <p className="text-xs text-white/40">Zaktualizuj hasło do swojego konta</p>
                  </div>
                </div>

                <form onSubmit={handlePasswordChange} className="space-y-4">
                  <div>
                    <label htmlFor="new-password" className="block text-sm font-medium text-white/70 mb-2">
                      Nowe hasło
                    </label>
                    <input
                      id="new-password"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      minLength={6}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200"
                      placeholder="Minimum 6 znaków"
                    />
                  </div>
                  <div>
                    <label htmlFor="confirm-password" className="block text-sm font-medium text-white/70 mb-2">
                      Potwierdź hasło
                    </label>
                    <input
                      id="confirm-password"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                      minLength={6}
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200"
                      placeholder="Powtórz nowe hasło"
                    />
                  </div>

                  {passwordMsg && (
                    <p className={`text-sm rounded-xl px-4 py-3 ${
                      passwordMsg.type === "success"
                        ? "text-green-400 bg-green-950/30"
                        : "text-red-400 bg-red-950/30"
                    }`}>
                      {passwordMsg.text}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={passwordLoading}
                    className="rounded-xl bg-white px-6 py-2.5 text-sm font-medium text-black transition-all duration-200 hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {passwordLoading ? "Zapisywanie..." : "Zmień hasło"}
                  </button>
                </form>
              </section>

              {/* Change email section */}
              <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/50">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="20" height="16" x="2" y="4" rx="2" />
                      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-base font-medium text-white">Zmień adres e-mail</h2>
                    <p className="text-xs text-white/40">
                      Obecny: <span className="text-white/60">{user?.email}</span>
                    </p>
                  </div>
                </div>

                <form onSubmit={handleEmailChange} className="space-y-4">
                  <div>
                    <label htmlFor="new-email" className="block text-sm font-medium text-white/70 mb-2">
                      Nowy adres e-mail
                    </label>
                    <input
                      id="new-email"
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      required
                      className="w-full rounded-xl border border-white/15 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-white/20 transition-all duration-200"
                      placeholder="nowy@przyklad.pl"
                    />
                  </div>

                  {emailMsg && (
                    <p className={`text-sm rounded-xl px-4 py-3 ${
                      emailMsg.type === "success"
                        ? "text-green-400 bg-green-950/30"
                        : "text-red-400 bg-red-950/30"
                    }`}>
                      {emailMsg.text}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={emailLoading}
                    className="rounded-xl bg-white px-6 py-2.5 text-sm font-medium text-black transition-all duration-200 hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {emailLoading ? "Zapisywanie..." : "Zmień e-mail"}
                  </button>
                </form>
              </section>

              {/* Logout section */}
              <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/5 text-white/50">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-base font-medium text-white">Wyloguj się</h2>
                      <p className="text-xs text-white/40">Zakończ bieżącą sesję</p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    disabled={logoutLoading}
                    className="rounded-xl bg-white px-6 py-2.5 text-sm font-medium text-black transition-all duration-200 hover:bg-white/90 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {logoutLoading ? "Wylogowywanie..." : "Wyloguj się"}
                  </button>
                </div>
              </section>

              {/* Delete account section */}
              <section className="rounded-2xl border border-red-500/20 bg-red-500/[0.03] p-6 sm:p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10 text-red-400/70">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 6h18" />
                      <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" />
                      <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" />
                      <line x1="10" y1="11" x2="10" y2="17" />
                      <line x1="14" y1="11" x2="14" y2="17" />
                    </svg>
                  </div>
                  <div>
                    <h2 className="text-base font-medium text-red-400">Usuń konto</h2>
                    <p className="text-xs text-white/40">Ta operacja jest nieodwracalna</p>
                  </div>
                </div>

                <p className="text-sm text-white/50 mb-4">
                  Po usunięciu konta wszystkie Twoje dane zostaną trwale usunięte. Wpisz <strong className="text-white/70">USUŃ</strong>, aby potwierdzić.
                </p>

                <div className="space-y-4">
                  <input
                    type="text"
                    value={deleteConfirm}
                    onChange={(e) => setDeleteConfirm(e.target.value)}
                    className="w-full rounded-xl border border-red-500/20 bg-white/5 px-4 py-3 text-sm text-white placeholder:text-white/30 focus:outline-none focus:ring-2 focus:ring-red-500/30 transition-all duration-200"
                    placeholder='Wpisz "USUŃ" aby potwierdzić'
                  />

                  {deleteMsg && (
                    <p className={`text-sm rounded-xl px-4 py-3 ${
                      deleteMsg.type === "success"
                        ? "text-green-400 bg-green-950/30"
                        : "text-red-400 bg-red-950/30"
                    }`}>
                      {deleteMsg.text}
                    </p>
                  )}

                  <button
                    onClick={handleDeleteAccount}
                    disabled={deleteLoading || deleteConfirm !== "USUŃ"}
                    className="rounded-xl bg-red-500/20 px-6 py-2.5 text-sm font-medium text-red-400 transition-all duration-200 hover:bg-red-500/30 disabled:opacity-40 disabled:cursor-not-allowed"
                  >
                    {deleteLoading ? "Usuwanie..." : "Usuń konto na stałe"}
                  </button>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
