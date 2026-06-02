import  { useState } from 'react';
import { postJson } from '../lib/api';

type Props = {
  email: string;
  onVerified?: () => void;
};

export default function VerifyAccount({ email, onVerified }: Props) {
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const resend = async () => {
    setLoading(true);
    setMessage(null);
    const res = await postJson('/resend-verification', { email });
    setLoading(false);
    if (res.status === 200) setMessage('Verification OTP sent to your email.');
    else setMessage(res.data?.message || 'Error sending OTP');
  };

  const verify = async () => {
    setLoading(true);
    setMessage(null);
    const res = await postJson('/verify-email', { email, otp });
    setLoading(false);
    if (res.status === 200) {
      setMessage('Account verified successfully.');
      onVerified && onVerified();
    } else {
      setMessage(res.data?.message || 'Invalid or expired OTP');
    }
  };

  return (
    <div style={{ border: '1px solid #e5e7eb', padding: 16, borderRadius: 8, maxWidth: 420 }}>
      <h3>Verify your account</h3>
      <p style={{ marginTop: 0 }}>A verification code was sent to <strong>{email}</strong>.</p>

      <div style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
        <input value={otp} onChange={e => setOtp(e.target.value)} placeholder="Enter OTP" />
        <button onClick={verify} disabled={loading || otp.length === 0}>Verify</button>
      </div>

      <div style={{ display: 'flex', gap: 8 }}>
        <button onClick={resend} disabled={loading}>Resend verification</button>
      </div>

      {message && <p style={{ marginTop: 12 }}>{message}</p>}
    </div>
  );
}
