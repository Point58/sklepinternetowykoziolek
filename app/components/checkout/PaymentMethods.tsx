"use client";

/**
 * Sekcja wyboru metody płatności.
 * Tutaj możesz dodać integrację np. Stripe:
 *
 * - Zainstaluj: npm install @stripe/stripe-js @stripe/react-stripe-js
 * - Utwórz Stripe Checkout Session po stronie API (Route Handler)
 * - Tutaj wyrenderuj <Elements> z Stripe i komponent płatności
 * - Lub przekieruj do Stripe Checkout / Payment Element
 *
 * Przykład użycia Stripe:
 * import { loadStripe } from "@stripe/stripe-js";
 * import { Elements } from "@stripe/react-stripe-js";
 * import CheckoutForm from "./CheckoutForm"; // formularz z kartą
 * const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_KEY!);
 * <Elements stripe={stripePromise}><CheckoutForm amount={total} /></Elements>
 */

type PaymentMethodsProps = {
  totalPrice: string;
  onPaymentMethodSelect?: (method: string) => void;
};

export default function PaymentMethods({
  totalPrice,
  onPaymentMethodSelect,
}: PaymentMethodsProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <h3 className="text-lg font-semibold text-white">
        Metoda płatności
      </h3>
      <p className="mt-2 text-sm text-white/60">
        Do zapłaty: <strong className="text-white">{totalPrice}</strong>
      </p>
      <div className="mt-4 rounded-xl border border-white/10 border-dashed bg-white/[0.03] p-6 text-center">
        <p className="text-sm text-white/50">
          Tutaj dodaj integrację Stripe lub inną metodę płatności.
        </p>
        <p className="mt-1 text-xs text-white/40">
          (np. Stripe Checkout, Payment Element, PayU, Przelewy24)
        </p>
        {/* Miejsce na <StripeCheckout /> lub <Elements><PaymentElement /></Elements> */}
      </div>
    </div>
  );
}
