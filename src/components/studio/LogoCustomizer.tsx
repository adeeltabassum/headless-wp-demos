"use client";

import { useEffect } from "react";
import type { LogoCustomization } from "@/lib/builder/logoCustomization";
import {
  renderFaviconFromCustomization,
  renderLogoFromCustomization,
} from "@/lib/builder/logoCustomization";

export type { LogoCustomization };

export interface LogoCustomizerProps {
  siteName: string;
  customization: LogoCustomization;
  onChange: (custom: LogoCustomization) => void;
  onApply: (logoUrl: string, faviconUrl: string) => void;
}

export function LogoCustomizer({ siteName, customization, onChange, onApply }: LogoCustomizerProps) {
  useEffect(() => {
    const parts = siteName.trim().split(/\s+/).filter(Boolean);
    if (!parts.length) return;
    const current = customization.words.map((w) => w.text).join(" ");
    if (current === parts.join(" ")) return;
    onChange({
      ...customization,
      words: parts.map((text, i) => ({
        text,
        color: customization.words[i]?.color || "#1a1a1a",
      })),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps -- sync words when site name changes only
  }, [siteName]);

  const logoPreview = renderLogoFromCustomization(customization);
  const faviconPreview = renderFaviconFromCustomization(customization);

  function updateWord(i: number, patch: Partial<LogoCustomization["words"][0]>) {
    const words = customization.words.slice();
    words[i] = { ...words[i], ...patch };
    onChange({ ...customization, words });
  }

  return (
    <div className="builder-logo-customizer">
      <p className="hint">Adjust each word color and icon/favicon colors, then apply to your site.</p>

      <div className="builder-row builder-logo-customizer__previews">
        <div className="builder-image-slot">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="builder-image-slot__thumb builder-image-slot__thumb--logo" src={logoPreview} alt="Logo preview" />
          <div className="builder-image-slot__meta">
            <strong>Logo preview</strong>
          </div>
        </div>
        <div className="builder-image-slot">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="builder-image-slot__thumb builder-image-slot__thumb--favicon" src={faviconPreview} alt="Favicon preview" />
          <div className="builder-image-slot__meta">
            <strong>Favicon preview</strong>
          </div>
        </div>
      </div>

      <div className="builder-field">
        <label>Word colors</label>
        {customization.words.map((word, i) => (
          <div className="builder-color-row builder-logo-customizer__word" key={`${word.text}-${i}`}>
            <span>{word.text}</span>
            <input type="color" value={word.color} onChange={(e) => updateWord(i, { color: e.target.value })} />
            <span>{word.color}</span>
          </div>
        ))}
      </div>

      <div className="builder-row">
        <div className="builder-field">
          <label>Icon background</label>
          <div className="builder-color-row">
            <input
              type="color"
              value={customization.iconBg}
              onChange={(e) => onChange({ ...customization, iconBg: e.target.value })}
            />
            <span>{customization.iconBg}</span>
          </div>
        </div>
        <div className="builder-field">
          <label>Icon text</label>
          <div className="builder-color-row">
            <input
              type="color"
              value={customization.iconText}
              onChange={(e) => onChange({ ...customization, iconText: e.target.value })}
            />
            <span>{customization.iconText}</span>
          </div>
        </div>
      </div>

      <div className="builder-row">
        <div className="builder-field">
          <label>Favicon background</label>
          <div className="builder-color-row">
            <input
              type="color"
              value={customization.faviconBg}
              onChange={(e) => onChange({ ...customization, faviconBg: e.target.value })}
            />
            <span>{customization.faviconBg}</span>
          </div>
        </div>
        <div className="builder-field">
          <label>Favicon text</label>
          <div className="builder-color-row">
            <input
              type="color"
              value={customization.faviconText}
              onChange={(e) => onChange({ ...customization, faviconText: e.target.value })}
            />
            <span>{customization.faviconText}</span>
          </div>
        </div>
      </div>

      <button
        type="button"
        className="builder-btn builder-btn--primary builder-btn--sm"
        onClick={() => onApply(logoPreview, faviconPreview)}
      >
        Apply logo &amp; favicon
      </button>
    </div>
  );
}
