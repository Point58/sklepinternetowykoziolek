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
    <div className="rounded-2xl border border-black/10 bg-white p-6">
      <h3 className="text-lg font-semibold text-black">
        Metoda płatności
      </h3>
      <p className="mt-2 text-sm text-black/55">
        Do zapłaty: <strong className="text-black">{totalPrice}</strong>
      </p>
      <div className="mt-4 rounded-xl border border-black/10 border-dashed bg-black/[0.02] p-6 text-center">
        <p className="text-sm text-black/50">
          Tutaj dodaj integrację Stripe lub inną metodę płatności.
        </p>
        <p className="mt-1 text-xs text-black/40">
          (np. Stripe Checkout, Payment Element, PayU, Przelewy24)
        </p>
        {/* Miejsce na <StripeCheckout /> lub <Elements><PaymentElement /></Elements> */}
      </div>
    </div>
  );
}
