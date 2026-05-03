import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CreditCard } from 'lucide-react';
import { useCart } from '../../contexts/CartContext.jsx';
import './Checkout.css';

const initialForm = {
  fullName: '',
  email: '',
  address: '',
  city: '',
  state: '',
  zip: '',
  cardName: '',
  cardNumber: '',
  expiry: '',
  cvv: ''
};

function validateForm(form) {
  const errors = {};

  if (form.fullName.trim().length < 2) errors.fullName = 'Enter your full name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errors.email = 'Enter a valid email.';
  if (form.address.trim().length < 6) errors.address = 'Enter a complete address.';
  if (form.city.trim().length < 2) errors.city = 'Enter a city.';
  if (form.state.trim().length < 2) errors.state = 'Enter a state.';
  if (!/^\d{5,6}$/.test(form.zip)) errors.zip = 'Enter a valid postal code.';
  if (form.cardName.trim().length < 2) errors.cardName = 'Enter the cardholder name.';
  if (!/^\d{12,19}$/.test(form.cardNumber.replace(/\s/g, ''))) errors.cardNumber = 'Enter 12 to 19 card digits.';
  if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(form.expiry)) errors.expiry = 'Use MM/YY.';
  if (!/^\d{3,4}$/.test(form.cvv)) errors.cvv = 'Use 3 or 4 digits.';

  return errors;
}

function CheckoutForm() {
  const navigate = useNavigate();
  const { clearCart, totals } = useCart();
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => validateForm(form), [form]);
  const hasErrors = Object.keys(errors).length > 0;

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setSubmitted(true);

    if (hasErrors) return;

    const order = {
      id: `ORD-${Date.now()}`,
      customer: form.fullName,
      email: form.email,
      total: totals.total,
      placedAt: new Date().toISOString()
    };

    localStorage.setItem('capstone-last-order', JSON.stringify(order));
    clearCart();
    navigate('/order-success');
  };

  const fieldError = (name) => submitted && errors[name] ? <span className="field-error">{errors[name]}</span> : null;

  return (
    <form className="checkout-form" onSubmit={handleSubmit} noValidate>
      <section>
        <h2>Delivery details</h2>
        <div className="form-grid">
          <label>
            Full name
            <input name="fullName" value={form.fullName} onChange={updateField} autoComplete="name" />
            {fieldError('fullName')}
          </label>
          <label>
            Email
            <input name="email" value={form.email} onChange={updateField} autoComplete="email" />
            {fieldError('email')}
          </label>
          <label className="wide-field">
            Address
            <input name="address" value={form.address} onChange={updateField} autoComplete="street-address" />
            {fieldError('address')}
          </label>
          <label>
            City
            <input name="city" value={form.city} onChange={updateField} autoComplete="address-level2" />
            {fieldError('city')}
          </label>
          <label>
            State
            <input name="state" value={form.state} onChange={updateField} autoComplete="address-level1" />
            {fieldError('state')}
          </label>
          <label>
            Postal code
            <input name="zip" value={form.zip} onChange={updateField} inputMode="numeric" autoComplete="postal-code" />
            {fieldError('zip')}
          </label>
        </div>
      </section>

      <section>
        <h2>Payment simulation</h2>
        <div className="form-grid">
          <label className="wide-field">
            Cardholder name
            <input name="cardName" value={form.cardName} onChange={updateField} autoComplete="cc-name" />
            {fieldError('cardName')}
          </label>
          <label className="wide-field">
            Card number
            <input
              name="cardNumber"
              value={form.cardNumber}
              onChange={updateField}
              inputMode="numeric"
              autoComplete="cc-number"
              placeholder="4242 4242 4242 4242"
            />
            {fieldError('cardNumber')}
          </label>
          <label>
            Expiry
            <input name="expiry" value={form.expiry} onChange={updateField} placeholder="MM/YY" autoComplete="cc-exp" />
            {fieldError('expiry')}
          </label>
          <label>
            CVV
            <input name="cvv" value={form.cvv} onChange={updateField} inputMode="numeric" autoComplete="cc-csc" />
            {fieldError('cvv')}
          </label>
        </div>
      </section>

      <button className="primary-button full-button checkout-submit" type="submit">
        <CreditCard size={18} />
        Place order
      </button>
    </form>
  );
}

export default CheckoutForm;
