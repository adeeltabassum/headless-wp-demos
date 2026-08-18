"use client";

import { EcommerceLink as Link } from "@/components/ecommerce/ui/EcommerceLink";
import { useEcommerceContent } from "../EcommerceContentProvider";

export type CheckoutResultKind = "success" | "failed";

type SuccessDetails = {
  orderNumber: string;
  trackingNumber: string;
  orderTotal: string;
};

type FailedDetails = {
  paymentMethod: string;
};

export function CheckoutResultModal({
  kind,
  success,
  failed,
  onClose,
  onTryAgain,
}: {
  kind: CheckoutResultKind;
  success?: SuccessDetails;
  failed?: FailedDetails;
  onClose: () => void;
  onTryAgain: () => void;
}) {
  const { checkout, siteBase } = useEcommerceContent();

  if (kind === "success" && success) {
    const m = checkout.successModal;
    return (
      <div
        className="ec-result-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ec-checkout-success-title"
      >
        <button
          type="button"
          className="ec-result-modal__backdrop"
          aria-label="Close"
          onClick={onClose}
        />
        <div className="ec-result-modal__panel">
          <button
            type="button"
            className="ec-result-modal__close"
            aria-label="Close"
            onClick={onClose}
          >
            <CloseIcon />
          </button>
          <div className="ec-result-modal__icon ec-result-modal__icon--success" aria-hidden="true">
            <CheckIcon />
          </div>
          <h2 id="ec-checkout-success-title">{m.title}</h2>
          <p className="ec-result-modal__lead">{m.body}</p>
          <dl className="ec-result-modal__box">
            <div>
              <dt>{m.orderNumberLabel}</dt>
              <dd>{success.orderNumber}</dd>
            </div>
            <div>
              <dt>{m.trackingNumberLabel}</dt>
              <dd>{success.trackingNumber}</dd>
            </div>
            <div>
              <dt>{m.orderTotalLabel}</dt>
              <dd>{success.orderTotal}</dd>
            </div>
          </dl>
          <p className="ec-result-modal__note">{m.receiptNote}</p>
          <div className="ec-result-modal__actions">
            <Link className="ec-btn ec-btn--dark" href={`${siteBase}/shop`} onClick={onClose}>
              {m.continueLabel}
            </Link>
            <Link className="ec-btn ec-btn--outline" href={`${siteBase}/track`} onClick={onClose}>
              {m.trackLabel}
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const m = checkout.failedModal;
  return (
    <div
      className="ec-result-modal"
      role="dialog"
      aria-modal="true"
      aria-labelledby="ec-checkout-failed-title"
    >
      <button
        type="button"
        className="ec-result-modal__backdrop"
        aria-label="Close"
        onClick={onClose}
      />
      <div className="ec-result-modal__panel">
        <button
          type="button"
          className="ec-result-modal__close"
          aria-label="Close"
          onClick={onClose}
        >
          <CloseIcon />
        </button>
        <div className="ec-result-modal__icon ec-result-modal__icon--failed" aria-hidden="true">
          !
        </div>
        <h2 id="ec-checkout-failed-title">{m.title}</h2>
        <p className="ec-result-modal__lead">{m.body}</p>
        <dl className="ec-result-modal__box">
          <div>
            <dt>{m.statusLabel}</dt>
            <dd className="ec-result-modal__status">{m.statusValue}</dd>
          </div>
          <div>
            <dt>{m.paymentMethodLabel}</dt>
            <dd>{failed?.paymentMethod || m.samplePaymentMethod}</dd>
          </div>
        </dl>
        <p className="ec-result-modal__note">{m.helpNote}</p>
        <div className="ec-result-modal__actions">
          <button type="button" className="ec-btn ec-btn--dark" onClick={onTryAgain}>
            {m.tryAgainLabel}
          </button>
          <Link className="ec-btn ec-btn--outline" href={m.supportHref} onClick={onClose}>
            {m.supportLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg viewBox="0 0 24 24" width="28" height="28" fill="none" stroke="#fff" strokeWidth="2.4">
      <path d="M6 12.5l4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

/** Mask card for failed modal, e.g. Visa **** 4242 */
export function maskPaymentMethod(cardNumber: string, fallback: string) {
  const digits = cardNumber.replace(/\D/g, "");
  if (digits.length < 4) return fallback;
  const last4 = digits.slice(-4);
  return `Visa **** ${last4}`;
}
