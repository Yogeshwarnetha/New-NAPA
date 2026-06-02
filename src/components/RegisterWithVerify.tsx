import React, { useState } from 'react';
import { postForm } from '../lib/api';
import VerifyAccount from './VerifyAccount';

export default function RegisterWithVerify() {
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [requiresVerification, setRequiresVerification] = useState(false);
  const [serverMessage, setServerMessage] = useState<string | null>(null);
  const [createdEmail, setCreatedEmail] = useState<string | null>(null);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerMessage(null);

    const form = new FormData();
    form.append('firstName', firstName);
    form.append('lastName', lastName);
    form.append('email', email);
    form.append('password', password);
    form.append('confirmPassword', confirmPassword);

    const res = await postForm('/signup', form);
    if (res.status === 201 || res.status === 200) {
      const data = res.data;
      if (data?.requiresVerification || data?.needsVerification) {
        setRequiresVerification(true);
        setCreatedEmail(email);
        setServerMessage(data?.message || 'Please verify your email');
      } else {
        setServerMessage('Registration successful. You may login.');
      }
    } else {
      setServerMessage(res.data?.message || 'Registration error');
      if (res.data?.needsVerification) {
        setRequiresVerification(true);
        setCreatedEmail(res.data.email || email);
      }
    }
  };

  return (
    <div>
      {!requiresVerification ? (
        <form onSubmit={submit} style={{ display: 'grid', gap: 8, maxWidth: 480 }}>
          <input placeholder="First name" value={firstName} onChange={e => setFirstName(e.target.value)} required />
          <input placeholder="Last name" value={lastName} onChange={e => setLastName(e.target.value)} required />
          <input placeholder="Email" type="email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input placeholder="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} required />
          <input placeholder="Confirm password" type="password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} required />
          <button type="submit">Register</button>
          {serverMessage && <p>{serverMessage}</p>}
        </form>
      ) : (
        <div>
          <p>{serverMessage}</p>
          {createdEmail && <VerifyAccount email={createdEmail} onVerified={() => { setRequiresVerification(false); setServerMessage('Verified — you can now login.'); }} />}
        </div>
      )}
    </div>
  );
}
