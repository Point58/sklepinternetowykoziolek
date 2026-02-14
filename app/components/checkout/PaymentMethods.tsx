"use client";

import { useState } from "react";
import { type CartItem, formatPrice, parsePrice } from "../CartContext";

type PaymentMethodsProps = {
  items: CartItem[];
  totalPrice: string;
  onOrderSuccess: () => void;
};

type FormData = {
  firstName: string;
  lastName: string;
  street: string;
  city: string;
  postalCode: string;
  phone: string;
  email: string;
};

const emptyForm: FormData = {
  firstName: "",
  lastName: "",
  street: "",
  city: "",
  postalCode: "",
  phone: "",
  email: "",
};

export default function PaymentMethods({
  items,
  totalPrice,
  onOrderSuccess,
}: PaymentMethodsProps) {
  const [form, setForm] = useState<FormData>(emptyForm);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  }

  function validate(): boolean {
    const newErrors: Partial<Record<keyof FormData, string>> = {};

    if (!form.firstName.trim()) newErrors.firstName = "Podaj imię";
    if (!form.lastName.trim()) newErrors.lastName = "Podaj nazwisko";
    if (!form.street.trim()) newErrors.street = "Podaj ulicę i numer";
    if (!form.city.trim()) newErrors.city = "Podaj miasto";
    if (!form.postalCode.trim()) {
      newErrors.postalCode = "Podaj kod pocztowy";
    } else if (!/^\d{2}-\d{3}$/.test(form.postalCode.trim())) {
      newErrors.postalCode = "Format: 00-000";
    }
    if (!form.phone.trim()) {
      newErrors.phone = "Podaj numer telefonu";
    } else if (!/^\d{9,15}$/.test(form.phone.trim().replace(/\s/g, ""))) {
      newErrors.phone = "Nieprawidłowy numer";
    }
    if (!form.email.trim()) {
      newErrors.email = "Podaj adres email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email.trim())) {
      newErrors.email = "Nieprawidłowy email";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitError("");

    if (!validate()) return;

    setIsSubmitting(true);

    try {
      const orderItems = items.map((item) => ({
        name: item.name,
        price: formatPrice(parsePrice(item.price) * item.quantity),
        quantity: item.quantity,
      }));

      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customer: {
            firstName: form.firstName.trim(),
            lastName: form.lastName.trim(),
            street: form.street.trim(),
            city: form.city.trim(),
            postalCode: form.postalCode.trim(),
            phone: form.phone.trim().replace(/\s/g, ""),
            email: form.email.trim(),
          },
          items: orderItems,
          totalPrice,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || "Wystąpił błąd");
      }

      onOrderSuccess();
    } catch (err) {
      setSubmitError(
        err instanceof Error ? err.message : "Nie udało się złożyć zamówienia."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  const inputClass = (field: keyof FormData) =>
    `w-full rounded-xl border bg-white/5 px-4 py-3 text-sm text-white placeholder-white/40 outline-none transition-colors focus:border-white/40 focus:bg-white/[0.08] ${
      errors[field] ? "border-red-500/60" : "border-white/10"
    }`;

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-lg font-semibold text-white">Dane dostawy</h3>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm text-white/70">Imię</label>
            <input
              name="firstName"
              value={form.firstName}
              onChange={handleChange}
              placeholder="Jan"
              className={inputClass("firstName")}
            />
            {errors.firstName && (
              <p className="mt-1 text-xs text-red-400">{errors.firstName}</p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-white/70">
              Nazwisko
            </label>
            <input
              name="lastName"
              value={form.lastName}
              onChange={handleChange}
              placeholder="Kowalski"
              className={inputClass("lastName")}
            />
            {errors.lastName && (
              <p className="mt-1 text-xs text-red-400">{errors.lastName}</p>
            )}
          </div>
        </div>

        <div className="mt-4">
          <label className="mb-1.5 block text-sm text-white/70">
            Ulica i numer
          </label>
          <input
            name="street"
            value={form.street}
            onChange={handleChange}
            placeholder="ul. Przykładowa 1"
            className={inputClass("street")}
          />
          {errors.street && (
            <p className="mt-1 text-xs text-red-400">{errors.street}</p>
          )}
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm text-white/70">
              Kod pocztowy
            </label>
            <input
              name="postalCode"
              value={form.postalCode}
              onChange={handleChange}
              placeholder="00-000"
              className={inputClass("postalCode")}
            />
            {errors.postalCode && (
              <p className="mt-1 text-xs text-red-400">{errors.postalCode}</p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-white/70">
              Miasto
            </label>
            <input
              name="city"
              value={form.city}
              onChange={handleChange}
              placeholder="Warszawa"
              className={inputClass("city")}
            />
            {errors.city && (
              <p className="mt-1 text-xs text-red-400">{errors.city}</p>
            )}
          </div>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className="mb-1.5 block text-sm text-white/70">
              Telefon
            </label>
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="123456789"
              className={inputClass("phone")}
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-red-400">{errors.phone}</p>
            )}
          </div>
          <div>
            <label className="mb-1.5 block text-sm text-white/70">Email</label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="jan@example.com"
              className={inputClass("email")}
            />
            {errors.email && (
              <p className="mt-1 text-xs text-red-400">{errors.email}</p>
            )}
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <h3 className="text-lg font-semibold text-white">Metoda płatności</h3>
        <div className="mt-4 flex items-center gap-3 rounded-xl border border-white/20 bg-white/[0.08] px-4 py-3">
          <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-white">
            <div className="h-2.5 w-2.5 rounded-full bg-white" />
          </div>
          <span className="text-sm font-medium text-white">Za pobraniem</span>
        </div>
        <p className="mt-3 text-sm text-white/50">
          Zapłacisz gotówką lub kartą przy odbiorze przesyłki.
        </p>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
        <p className="flex justify-between text-base font-semibold text-white">
          <span>Do zapłaty:</span>
          <span>{totalPrice}</span>
        </p>
      </div>

      {submitError && (
        <div className="rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm text-red-300">
          {submitError}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-full bg-white py-4 text-sm font-semibold text-black transition-all duration-200 hover:scale-[1.02] hover:bg-white/90 disabled:opacity-50 disabled:hover:scale-100"
      >
        {isSubmitting ? "Składanie zamówienia..." : "Złóż zamówienie"}
      </button>
    </form>
  );
}
