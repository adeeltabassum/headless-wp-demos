"use client";

import { useMemo, useState } from "react";
import { useEcommerceContent } from "../EcommerceContentProvider";
import { MediaPlaceholder } from "../ui/MediaPlaceholder";
import type { EcommerceTrackSampleOrder } from "@/lib/ecommerce/content";

function money(prefix: string, value: number) {
  return `${prefix}${value.toFixed(2)}`;
}

function normalizeId(value: string) {
  return value.trim().replace(/^#/, "").toLowerCase();
}

function matchesSample(
  orderId: string,
  email: string,
  sample: EcommerceTrackSampleOrder
) {
  return (
    normalizeId(orderId) === normalizeId(sample.orderId) &&
    email.trim().toLowerCase() === sample.email.trim().toLowerCase()
  );
}

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

export type TrackViewMode = "form" | "detail" | "not-found";

export function TrackView({
  initialMode = "form",
}: {
  initialMode?: TrackViewMode;
}) {
  const { track } = useEcommerceContent();
  const [mode, setMode] = useState<TrackViewMode>(initialMode);
  const [orderId, setOrderId] = useState(
    initialMode === "detail" ? track.sampleOrder.orderId : ""
  );
  const [email, setEmail] = useState(
    initialMode === "detail" ? track.sampleOrder.email : ""
  );
  const [order, setOrder] = useState<EcommerceTrackSampleOrder | null>(
    initialMode === "detail" ? track.sampleOrder : null
  );

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (matchesSample(orderId, email, track.sampleOrder)) {
      setOrder(track.sampleOrder);
      setMode("detail");
      return;
    }
    setOrder(null);
    setMode("not-found");
  }

  function tryAgain() {
    setMode("form");
    setOrder(null);
  }

  return (
    <main className="ec-track">
      {mode === "form" ? (
        <div className="ec-container">
          <div className="ec-track-card">
            <h1>{track.title}</h1>
            <p className="ec-track-card__desc">{track.description}</p>
            <form className="ec-track-form" onSubmit={onSubmit}>
              <label>
                <span>{reqLabel(track.orderIdLabel)}</span>
                <input
                  required
                  value={orderId}
                  placeholder={track.orderIdPlaceholder}
                  onChange={(e) => setOrderId(e.target.value)}
                />
              </label>
              <label>
                <span>{reqLabel(track.emailLabel)}</span>
                <input
                  required
                  type="email"
                  value={email}
                  placeholder={track.emailPlaceholder}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <button type="submit" className="ec-btn ec-btn--dark">
                {track.submitLabel} →
              </button>
            </form>
          </div>
        </div>
      ) : null}

      {mode === "detail" && order ? <TrackDetail order={order} /> : null}

      {mode === "not-found" ? (
        <>
          <div className="ec-container">
            <div className="ec-track-card ec-track-card--muted">
              <h1>{track.title}</h1>
              <p className="ec-track-card__desc">{track.description}</p>
            </div>
          </div>
          <div
            className="ec-track-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ec-track-not-found-title"
          >
            <button
              type="button"
              className="ec-track-modal__backdrop"
              aria-label="Close"
              onClick={tryAgain}
            />
            <div className="ec-track-modal__panel">
              <div className="ec-track-modal__head">
                <div className="ec-track-modal__title-row">
                  <span className="ec-track-modal__icon" aria-hidden="true">
                    !
                  </span>
                  <h2 id="ec-track-not-found-title">{track.notFoundTitle}</h2>
                </div>
                <button
                  type="button"
                  className="ec-track-modal__close"
                  aria-label="Close"
                  onClick={tryAgain}
                >
                  <svg
                    viewBox="0 0 24 24"
                    width="18"
                    height="18"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                  >
                    <path d="M6 6l12 12M18 6L6 18" />
                  </svg>
                </button>
              </div>
              {track.notFoundBody.map((para) => (
                <p key={para.slice(0, 32)}>{para}</p>
              ))}
              <button type="button" className="ec-btn ec-btn--dark" onClick={tryAgain}>
                {track.tryAgainLabel} →
              </button>
            </div>
          </div>
        </>
      ) : null}
    </main>
  );
}

function TrackDetail({ order }: { order: EcommerceTrackSampleOrder }) {
  const { track } = useEcommerceContent();
  const steps = track.statusSteps;
  const current = Math.min(Math.max(order.currentStep, 1), steps.length);

  const progressWidth = useMemo(() => {
    if (steps.length <= 1) return "0%";
    return `${((current - 1) / (steps.length - 1)) * 100}%`;
  }, [current, steps.length]);

  const orderDisplay = order.orderId.startsWith("#")
    ? order.orderId
    : `#${order.orderId}`;

  return (
    <div className="ec-container ec-track-detail">
      <div className="ec-track-detail__intro">
        <h1>{track.title}</h1>
        <p className="ec-track-card__desc">{track.description}</p>
      </div>

      <div className="ec-track-detail__meta">
        <p>
          {track.placedAtPrefix} <strong>{order.placedAtLabel}</strong>
        </p>
        <p>
          {track.orderNumberPrefix} {orderDisplay}
        </p>
      </div>

      <div className="ec-track-status-card">
        <div className="ec-track-status-card__top">
          <div>
            <span>{track.orderPlacedLabel}</span>
            <strong>{order.placedDate}</strong>
          </div>
          <div>
            <span>{track.shippingToLabel}</span>
            <strong>{order.shippingAddress}</strong>
          </div>
        </div>

        <div className="ec-track-stepper">
          <div className="ec-track-stepper__rail" aria-hidden="true">
            <div
              className="ec-track-stepper__rail-fill"
              style={{ width: progressWidth }}
            />
          </div>
          <ol>
            {steps.map((step, i) => {
              const n = i + 1;
              const done = n <= current;
              return (
                <li key={step.id} className={done ? "is-done" : undefined}>
                  <span className="ec-track-stepper__dot">{n}</span>
                  <span className="ec-track-stepper__label">{step.label}</span>
                </li>
              );
            })}
          </ol>
        </div>

        <ul className="ec-track-items">
          {order.items.map((item) => (
            <li key={`${item.title}-${item.price}`}>
              <MediaPlaceholder
                className="ec-track-items__thumb"
                src={item.image}
                alt=""
              />
              <div>
                <h3>{item.title}</h3>
                <p>{item.subtitle}</p>
              </div>
              <strong>{item.price}</strong>
            </li>
          ))}
        </ul>

        <div className="ec-track-totals">
          <div>
            <span>{track.subtotalLabel}</span>
            <span>{money(track.currencyPrefix, order.subtotal)}</span>
          </div>
          <div>
            <span>{track.shippingLabel}</span>
            <span>{money(track.currencyPrefix, order.shipping)}</span>
          </div>
          <div>
            <span>{track.taxesLabel}</span>
            <span>{money(track.currencyPrefix, order.taxes)}</span>
          </div>
          <div className="ec-track-totals__grand">
            <span>{track.totalLabel}</span>
            <strong>{money(track.currencyPrefix, order.total)}</strong>
          </div>
        </div>
      </div>
    </div>
  );
}
