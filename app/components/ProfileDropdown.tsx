"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/app/lib/supabase/client";

interface User {
  email?: string | null;
}

const sidebarItems = [
  {
    label: "Moje konto",
    href: "/profil",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="4" />
        <path d="M20 21a8 8 0 1 0-16 0" />
      </svg>
    ),
  },
  {
    label: "Zamówienia",
    href: "/zamowienia",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M16.5 9.4 7.55 4.24" />
        <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
        <polyline points="3.29 7 12 12 20.71 7" />
        <line x1="12" y1="22" x2="12" y2="12" />
      </svg>
    ),
  },
  {
    label: "Lista życzeń",
    href: "/lista-zyczen",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    ),
  },
  {
    label: "Ustawienia",
    href: "/ustawienia",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
        <circle cx="12" cy="12" r="3" />
      </svg>
    ),
  },
  {
    label: "Pomoc",
    href: "/pomoc",
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <path d="M12 17h.01" />
      </svg>
    ),
  },
];

export default function ProfileDropdown({ user }: { user: User | null }) {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    if (open) {
      document.addEventListener("keydown", handleKey);
    }
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  if (!user) {
    return (
      <Link
        href="/logowanie"
        className="text-sm text-white/70 hover:text-white transition-colors duration-200"
      >
        Zaloguj się
      </Link>
    );
  }

  const initial = (user.email?.[0] ?? "U").toUpperCase();

  async function handleLogout() {
    setOpen(false);
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-xs font-semibold text-black transition-opacity duration-200 hover:opacity-80"
        aria-label="Menu profilu"
      >
        {initial}
      </button>

      {open && createPortal(
        <div className="animate-overlay-fade fixed inset-0 z-[9999] flex" style={{ background: "#ffffff" }}>
          {/* ── Left sidebar ── */}
          <aside className="flex w-72 flex-col border-r border-black/6 bg-black/[0.02] px-5 py-8">
            {/* User info */}
            <div className="flex items-center gap-3.5 px-3 pb-8">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                {initial}
              </div>
              <div className="min-w-0">
                <p className="truncate text-sm font-medium text-black">
                  Moje konto
                </p>
                <p className="truncate text-xs text-black/40">
                  {user.email}
                </p>
              </div>
            </div>

            {/* Navigation */}
            <nav className="flex flex-1 flex-col gap-1">
              {sidebarItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-3.5 rounded-xl px-3 py-3 text-sm text-black/65 transition-colors duration-150 hover:bg-black/5 hover:text-black"
                >
                  <span className="text-black/35">{item.icon}</span>
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Back to shop */}
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="flex items-center gap-3.5 rounded-xl px-3 py-3 text-sm text-black/45 transition-colors duration-150 hover:bg-black/5 hover:text-black"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <line x1="19" y1="12" x2="5" y2="12" />
                <polyline points="12 19 5 12 12 5" />
              </svg>
              Wróć do sklepu
            </Link>
          </aside>

          {/* ── Right content area ── */}
          <div className="flex flex-1 flex-col">
            {/* Top bar with close */}
            <div className="flex items-center justify-end px-8 py-6">
              <button
                onClick={() => setOpen(false)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-black/40 transition-colors duration-150 hover:bg-black/5 hover:text-black"
                aria-label="Zamknij"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>

            {/* Content */}
            <div className="flex flex-1 flex-col px-10 pb-10 sm:px-16">
              <h1 className="text-2xl font-semibold tracking-tight text-black">
                Profil
              </h1>
              <p className="mt-2 text-sm text-black/45">
                Zarządzaj swoim kontem i ustawieniami.
              </p>

              {/* Action cards */}
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {/* Logout card */}
                <button
                  onClick={handleLogout}
                  className="group flex flex-col items-start gap-3 rounded-2xl border border-black/6 bg-white p-6 text-left shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-200 hover:border-red-500/20 hover:shadow-[0_2px_12px_rgba(239,68,68,0.08)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-50 text-red-500/70 transition-colors duration-200 group-hover:bg-red-100 group-hover:text-red-600">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                      <polyline points="16 17 21 12 16 7" />
                      <line x1="21" y1="12" x2="9" y2="12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-black">Wyloguj się</p>
                    <p className="mt-0.5 text-xs text-black/40">Zakończ bieżącą sesję</p>
                  </div>
                </button>

                {/* Edit profile card */}
                <Link
                  href="/profil"
                  onClick={() => setOpen(false)}
                  className="group flex flex-col items-start gap-3 rounded-2xl border border-black/6 bg-white p-6 text-left shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-200 hover:border-black/12 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/[0.04] text-black/50 transition-colors duration-200 group-hover:bg-black/[0.07] group-hover:text-black/70">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                      <path d="m15 5 4 4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-black">Edytuj profil</p>
                    <p className="mt-0.5 text-xs text-black/40">Zmień dane osobowe</p>
                  </div>
                </Link>

                {/* Change password card */}
                <Link
                  href="/ustawienia"
                  onClick={() => setOpen(false)}
                  className="group flex flex-col items-start gap-3 rounded-2xl border border-black/6 bg-white p-6 text-left shadow-[0_1px_3px_rgba(0,0,0,0.04)] transition-all duration-200 hover:border-black/12 hover:shadow-[0_2px_12px_rgba(0,0,0,0.06)]"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/[0.04] text-black/50 transition-colors duration-200 group-hover:bg-black/[0.07] group-hover:text-black/70">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect width="18" height="11" x="3" y="11" rx="2" ry="2" />
                      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-black">Zmień hasło</p>
                    <p className="mt-0.5 text-xs text-black/40">Zaktualizuj zabezpieczenia</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </div>,
        document.body
      )}
    </>
  );
}
