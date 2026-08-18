"use client";

import { useState } from "react";
import { useEcommerceContent } from "../EcommerceContentProvider";

export function ContactView() {
  const { contact } = useEcommerceContent();
  const [sent, setSent] = useState(false);
  const F = contact.form;

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <main className="ec-contact">
      <header className="ec-page-hero">
        <div className="ec-container">
          <h1>{contact.title}</h1>
          <p className="ec-page-hero__desc">{contact.description}</p>
        </div>
      </header>

      <div className="ec-container ec-contact-layout">
        <div className="ec-contact-info">
          <h2>{contact.infoHeading}</h2>
          <p>{contact.infoBody}</p>
          <ul className="ec-about-list ec-about-list--checks">
            {contact.infoBullets.map((b) => (
              <li key={b}>{b}</li>
            ))}
          </ul>
          <ul className="ec-contact-details">
            <li>
              <span className="ec-contact-details__icon" aria-hidden="true">
                <ClockIcon />
              </span>
              {contact.hours}
            </li>
            <li>
              <span className="ec-contact-details__icon" aria-hidden="true">
                <MailIcon />
              </span>
              <a href={`mailto:${contact.email}`}>{contact.email}</a>
            </li>
            <li>
              <span className="ec-contact-details__icon" aria-hidden="true">
                <PhoneIcon />
              </span>
              {contact.phones}
            </li>
            <li>
              <span className="ec-contact-details__icon" aria-hidden="true">
                <PinIcon />
              </span>
              {contact.address}
            </li>
          </ul>
        </div>

        <div className="ec-contact-card">
          {sent ? (
            <p className="ec-contact-success">{contact.successMessage}</p>
          ) : (
            <form className="ec-contact-form" onSubmit={onSubmit}>
              <div className="ec-contact-form__row">
                <label>
                  <span>{F.firstNameLabel}</span>
                  <input required name="firstName" />
                </label>
                <label>
                  <span>{F.lastNameLabel}</span>
                  <input required name="lastName" />
                </label>
              </div>
              <label>
                <span>{F.emailLabel}</span>
                <input required type="email" name="email" />
              </label>
              <label>
                <span>{F.phoneLabel}</span>
                <input type="tel" name="phone" />
              </label>
              <label>
                <span>{F.locationLabel}</span>
                <select required name="location" defaultValue="">
                  <option value="" disabled>
                    {F.locationPlaceholder}
                  </option>
                  {F.locations.map((loc) => (
                    <option key={loc} value={loc}>
                      {loc}
                    </option>
                  ))}
                </select>
              </label>
              <label>
                <span>{F.messageLabel}</span>
                <textarea required name="message" rows={5} placeholder={F.messagePlaceholder} />
              </label>
              <button type="submit" className="ec-btn ec-btn--dark">
                {F.submitLabel} →
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v4l3 2" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7">
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 7 9-7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M6.5 4.5h3l1.5 4-2 1.5a12 12 0 0 0 5.5 5.5l1.5-2 4 1.5v3A2 2 0 0 1 18 20 14 14 0 0 1 4 6a2 2 0 0 1 2.5-1.5z" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d="M12 21s7-5.2 7-11a7 7 0 1 0-14 0c0 5.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}
