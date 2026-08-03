"use client";

import Link from "next/link";
import { useState } from "react";
import { footerLinks } from "@/lib/grub-gadget/content";

export function GrubGadgetFooter() {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter subscription
    console.log("Subscribe:", email);
    setEmail("");
  };

  return (
    <footer className="gg-footer">
      <div className="gg-container">
        <div className="gg-footer__grid">
          <div>
            <div className="gg-footer__logo">
              <img src="/grub-gadget/images/logo.png" alt="Grub Gadget" width="180" height="87" />
            </div>
          </div>

          <div>
            <h4 className="gg-footer__heading">FEATURED</h4>
            <ul className="gg-footer__links">
              {footerLinks.featured.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="gg-footer__heading">LINKS</h4>
            <ul className="gg-footer__links">
              {footerLinks.links.map((link) => (
                <li key={link.label}>
                  <Link href={link.href}>{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="gg-footer__grid" style={{ marginTop: "20px" }}>
          <div></div>
          <div></div>
          <div>
            <h4 className="gg-footer__heading">Get exclusive review, advice, and special offers</h4>
            <form onSubmit={handleSubscribe}>
              <input
                type="email"
                className="gg-newsletter__input"
                placeholder="Enter your email here"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="gg-newsletter__button">
                Send
              </button>
            </form>
          </div>
        </div>

        <div className="gg-footer__copyright">
          © Copyright 2021 Grub Gadget. All Rights Reserved
        </div>
      </div>
    </footer>
  );
}
