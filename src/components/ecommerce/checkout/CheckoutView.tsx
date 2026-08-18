"use client";

import { useMemo, useState } from "react";
import { useEcommerceContent } from "../EcommerceContentProvider";
import { useEcommerceCart } from "../CartProvider";
import { CheckoutEmpty, OrderSummary } from "./OrderSummary";
import {
  CheckoutResultModal,
  maskPaymentMethod,
  type CheckoutResultKind,
} from "./CheckoutResultModal";

type Step = 1 | 2 | 3;

type ShippingForm = {
  fullName: string;
  email: string;
  address: string;
  city: string;
  zip: string;
  country: string;
  phone: string;
  shippingMethodId: string;
};

type PaymentForm = {
  nameOnCard: string;
  cardNumber: string;
  expiration: string;
  cvc: string;
};

const emptyShipping = (defaultMethod: string): ShippingForm => ({
  fullName: "",
  email: "",
  address: "",
  city: "",
  zip: "",
  country: "",
  phone: "",
  shippingMethodId: defaultMethod,
});

const emptyPayment = (): PaymentForm => ({
  nameOnCard: "",
  cardNumber: "",
  expiration: "",
  cvc: "",
});

function reqLabel(label: string) {
  return (
    <>
      {label}
      <span className="ec-required" aria-hidden="true">
        *
      </span>
    </>
  );
}

function money(prefix: string, value: number) {
  return `${prefix}${value.toFixed(2)}`;
}

export function CheckoutView({
  initialStep = 1 as Step,
  initialResult = null,
}: {
  initialStep?: Step;
  initialResult?: CheckoutResultKind | null;
}) {
  const { checkout } = useEcommerceContent();
  const { items, clearCart } = useEcommerceCart();
  const [step, setStep] = useState<Step>(initialStep);
  const [result, setResult] = useState<CheckoutResultKind | null>(initialResult);
  const [orderTotalLabel, setOrderTotalLabel] = useState(() =>
    money(checkout.currencyPrefix, 123.45)
  );
  const [shipping, setShipping] = useState<ShippingForm>(() =>
    emptyShipping(checkout.shippingMethods[0]?.id || "free")
  );
  const [payment, setPayment] = useState<PaymentForm>(() => {
    if (initialResult === "failed") {
      return {
        nameOnCard: checkout.placeholders.nameOnCard,
        cardNumber: "4242 4242 4242 0000",
        expiration: checkout.placeholders.expiration,
        cvc: checkout.placeholders.cvc,
      };
    }
    return emptyPayment();
  });

  const method = useMemo(
    () =>
      checkout.shippingMethods.find((m) => m.id === shipping.shippingMethodId) ||
      checkout.shippingMethods[0],
    [checkout.shippingMethods, shipping.shippingMethodId]
  );
  const shippingPrice = method?.price ?? 0;

  const addressLine = [
    shipping.address,
    shipping.city,
    shipping.zip,
    shipping.country,
  ]
    .filter(Boolean)
    .join(", ");

  const subtotal = items.reduce((sum, l) => sum + l.priceValue * l.quantity, 0);
  const liveTotal = subtotal + shippingPrice + checkout.taxAmount;

  if (!items.length && !result) {
    return <CheckoutEmpty />;
  }

  function onShippingSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep(2);
  }

  function onPaymentSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStep(3);
  }

  function placeOrder() {
    const digits = payment.cardNumber.replace(/\D/g, "");
    const declined = digits.length >= 4 && digits.endsWith("0000");
    setOrderTotalLabel(money(checkout.currencyPrefix, liveTotal || 123.45));
    if (declined) {
      setResult("failed");
      return;
    }
    setResult("success");
  }

  function closeSuccess() {
    clearCart();
    setResult(null);
  }

  function closeFailed() {
    setResult(null);
  }

  function tryAgain() {
    setResult(null);
    setStep(2);
  }

  const L = checkout.labels;
  const P = checkout.placeholders;
  const paymentMasked = maskPaymentMethod(
    payment.cardNumber,
    checkout.failedModal.samplePaymentMethod
  );

  return (
    <main className={`ec-checkout${result ? " is-blurred" : ""}`}>
      <div className="ec-container ec-checkout-layout">
        <div className="ec-checkout-card">
          <div className="ec-checkout-card__head">
            <h1>
              {step === 1
                ? checkout.step1Title
                : step === 2
                  ? checkout.step2Title
                  : checkout.step3Title}
            </h1>
            <span className="ec-checkout-step">Step {step}</span>
          </div>

          {step === 1 ? (
            <form className="ec-checkout-form" onSubmit={onShippingSubmit}>
              <div className="ec-checkout-grid-2">
                <label>
                  <span>{reqLabel(L.fullName)}</span>
                  <input
                    required
                    value={shipping.fullName}
                    placeholder={P.fullName}
                    onChange={(e) => setShipping({ ...shipping, fullName: e.target.value })}
                  />
                </label>
                <label>
                  <span>{reqLabel(L.email)}</span>
                  <input
                    required
                    type="email"
                    value={shipping.email}
                    placeholder={P.email}
                    onChange={(e) => setShipping({ ...shipping, email: e.target.value })}
                  />
                </label>
              </div>
              <label>
                <span>{reqLabel(L.address)}</span>
                <input
                  required
                  value={shipping.address}
                  placeholder={P.address}
                  onChange={(e) => setShipping({ ...shipping, address: e.target.value })}
                />
              </label>
              <div className="ec-checkout-grid-2">
                <label>
                  <span>{reqLabel(L.city)}</span>
                  <input
                    required
                    value={shipping.city}
                    placeholder={P.city}
                    onChange={(e) => setShipping({ ...shipping, city: e.target.value })}
                  />
                </label>
                <label>
                  <span>{reqLabel(L.zip)}</span>
                  <input
                    required
                    value={shipping.zip}
                    placeholder={P.zip}
                    onChange={(e) => setShipping({ ...shipping, zip: e.target.value })}
                  />
                </label>
              </div>
              <div className="ec-checkout-grid-2">
                <label>
                  <span>{reqLabel(L.country)}</span>
                  <input
                    required
                    value={shipping.country}
                    placeholder={P.country}
                    onChange={(e) => setShipping({ ...shipping, country: e.target.value })}
                  />
                </label>
                <label>
                  <span>{L.phone}</span>
                  <input
                    type="tel"
                    value={shipping.phone}
                    placeholder={P.phone}
                    onChange={(e) => setShipping({ ...shipping, phone: e.target.value })}
                  />
                </label>
              </div>
              <fieldset className="ec-checkout-methods">
                <legend>{reqLabel(L.shippingMethod)}</legend>
                {checkout.shippingMethods.map((m) => (
                  <label key={m.id} className="ec-checkout-method">
                    <input
                      type="radio"
                      name="shippingMethod"
                      checked={shipping.shippingMethodId === m.id}
                      onChange={() =>
                        setShipping({ ...shipping, shippingMethodId: m.id })
                      }
                    />
                    <span>
                      <strong>{m.label}</strong>
                      <em>{m.detail}</em>
                    </span>
                    <strong>{m.priceLabel}</strong>
                  </label>
                ))}
              </fieldset>
              <div className="ec-checkout-actions ec-checkout-actions--end">
                <button type="submit" className="ec-btn ec-btn--dark">
                  {checkout.nextLabel} →
                </button>
              </div>
            </form>
          ) : null}

          {step === 2 ? (
            <form className="ec-checkout-form" onSubmit={onPaymentSubmit}>
              <label>
                <span>{reqLabel(L.nameOnCard)}</span>
                <input
                  required
                  value={payment.nameOnCard}
                  placeholder={P.nameOnCard}
                  onChange={(e) => setPayment({ ...payment, nameOnCard: e.target.value })}
                />
              </label>
              <label className="ec-checkout-card-number">
                <span>{reqLabel(L.cardNumber)}</span>
                <div className="ec-checkout-input-icon">
                  <input
                    required
                    value={payment.cardNumber}
                    placeholder={P.cardNumber}
                    onChange={(e) => setPayment({ ...payment, cardNumber: e.target.value })}
                  />
                  <svg
                    viewBox="0 0 24 24"
                    width="20"
                    height="20"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    aria-hidden="true"
                  >
                    <rect x="2" y="5" width="20" height="14" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </div>
              </label>
              <div className="ec-checkout-grid-2">
                <label>
                  <span>{reqLabel(L.expiration)}</span>
                  <input
                    required
                    value={payment.expiration}
                    placeholder={P.expiration}
                    onChange={(e) => setPayment({ ...payment, expiration: e.target.value })}
                  />
                </label>
                <label>
                  <span>{reqLabel(L.cvc)}</span>
                  <input
                    required
                    value={payment.cvc}
                    placeholder={P.cvc}
                    onChange={(e) => setPayment({ ...payment, cvc: e.target.value })}
                  />
                </label>
              </div>
              <div className="ec-checkout-actions">
                <button type="button" className="ec-btn ec-btn--outline" onClick={() => setStep(1)}>
                  ← {checkout.previousLabel}
                </button>
                <button type="submit" className="ec-btn ec-btn--dark">
                  {checkout.nextLabel} →
                </button>
              </div>
            </form>
          ) : null}

          {step === 3 ? (
            <div className="ec-checkout-review">
              <section>
                <div className="ec-checkout-review__head">
                  <h2>{checkout.shippingToLabel}</h2>
                  <button type="button" className="ec-text-link" onClick={() => setStep(1)}>
                    {checkout.editLabel}
                  </button>
                </div>
                <div className="ec-checkout-review__row">
                  <span>{L.address}</span>
                  <strong>{addressLine || "—"}</strong>
                </div>
              </section>

              <section>
                <div className="ec-checkout-review__head">
                  <h2>{checkout.paymentMethodLabel}</h2>
                  <button type="button" className="ec-text-link" onClick={() => setStep(2)}>
                    {checkout.editLabel}
                  </button>
                </div>
                <div className="ec-checkout-review__row">
                  <span>{L.nameOnCard}</span>
                  <strong>{payment.nameOnCard || "—"}</strong>
                </div>
                <div className="ec-checkout-review__row">
                  <span>{L.expiration}</span>
                  <strong>{payment.expiration || "—"}</strong>
                </div>
                <div className="ec-checkout-review__row">
                  <span>{L.cvc}</span>
                  <strong>{payment.cvc || "—"}</strong>
                </div>
              </section>

              <div className="ec-checkout-actions">
                <button type="button" className="ec-btn ec-btn--outline" onClick={() => setStep(2)}>
                  ← {checkout.previousLabel}
                </button>
                <button type="button" className="ec-btn ec-btn--dark" onClick={placeOrder}>
                  {checkout.placeOrderLabel}
                </button>
              </div>
            </div>
          ) : null}
        </div>

        <OrderSummary items={items} shippingPrice={shippingPrice} />
      </div>

      {result === "success" ? (
        <CheckoutResultModal
          kind="success"
          success={{
            orderNumber: checkout.successModal.sampleOrderNumber,
            trackingNumber: checkout.successModal.sampleTrackingNumber,
            orderTotal:
              liveTotal > 0
                ? money(checkout.currencyPrefix, liveTotal)
                : orderTotalLabel,
          }}
          onClose={closeSuccess}
          onTryAgain={closeSuccess}
        />
      ) : null}

      {result === "failed" ? (
        <CheckoutResultModal
          kind="failed"
          failed={{ paymentMethod: paymentMasked }}
          onClose={closeFailed}
          onTryAgain={tryAgain}
        />
      ) : null}
    </main>
  );
}
