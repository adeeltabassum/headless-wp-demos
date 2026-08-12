"use client";

import { useLocalContent } from "./LocalContentProvider";

export function QuoteForm() {
  const localContent = useLocalContent();
  const { quoteForm, phone, phoneHref } = localContent;

  return (
    <div id="quote-form" className="fb-hero__form-card">
      <h2 className="fb-quote-form__title">{quoteForm.title}</h2>
      <h2 className="fb-quote-form__subtitle">
        {quoteForm.subtitle}
        <br />
        <span className="fb-quote-form__phone">
          <a href={phoneHref}>{phone}</a>
        </span>
      </h2>

      <form className="fb-quote-form" action="#" method="post" noValidate>
        <div className="fb-quote-form__fields">
          <div className="fb-quote-form__group">
            <label htmlFor="form-field-name" className="fb-quote-form__label fb-quote-form__label--required">
              Full Name
            </label>
            <input
              id="form-field-name"
              type="text"
              name="form_fields[name]"
              className="fb-quote-form__input"
              placeholder={quoteForm.fields.name}
              required
            />
          </div>

          <div className="fb-quote-form__group fb-quote-form__group--half">
            <label htmlFor="form-field-email" className="fb-quote-form__label fb-quote-form__label--required">
              Email
            </label>
            <input
              id="form-field-email"
              type="email"
              name="form_fields[email]"
              className="fb-quote-form__input"
              placeholder={quoteForm.fields.email}
              required
            />
          </div>

          <div className="fb-quote-form__group fb-quote-form__group--half">
            <label htmlFor="form-field-phone" className="fb-quote-form__label fb-quote-form__label--required">
              Phone Number
            </label>
            <input
              id="form-field-phone"
              type="tel"
              name="form_fields[phone]"
              className="fb-quote-form__input"
              placeholder={quoteForm.fields.phone}
              pattern="[0-9()#&+*\\-=\\.]+"
              required
            />
          </div>

          <div className="fb-quote-form__group fb-quote-form__group--half">
            <label htmlFor="form-field-from" className="fb-quote-form__label fb-quote-form__label--required">
              Moving From
            </label>
            <input
              id="form-field-from"
              type="text"
              name="form_fields[from_location]"
              className="fb-quote-form__input"
              placeholder={quoteForm.fields.from}
              autoComplete="off"
              required
            />
          </div>

          <div className="fb-quote-form__group fb-quote-form__group--half">
            <label htmlFor="form-field-to" className="fb-quote-form__label fb-quote-form__label--required">
              Moving To
            </label>
            <input
              id="form-field-to"
              type="text"
              name="form_fields[to_location]"
              className="fb-quote-form__input"
              placeholder={quoteForm.fields.to}
              autoComplete="off"
              required
            />
          </div>

          <div className="fb-quote-form__group">
            <label htmlFor="form-field-date" className="fb-quote-form__label fb-quote-form__label--required">
              Estimated Move Date
            </label>
            <input
              id="form-field-date"
              type="text"
              name="form_fields[moving_date]"
              className="fb-quote-form__input"
              placeholder={quoteForm.fields.date}
              required
            />
          </div>

          <div className="fb-quote-form__group">
            <button type="submit" className="fb-quote-form__submit">
              {quoteForm.submit}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
