declare module 'react-google-recaptcha' {
  import * as React from 'react';
  interface ReCAPTCHAProps {
    sitekey: string;
    onChange?: (token: string | null) => void;
    onExpired?: () => void;
    onErrored?: () => void;
    theme?: 'light' | 'dark';
    type?: 'image' | 'audio';
    tabindex?: number;
    size?: 'compact' | 'normal' | 'invisible';
    badge?: 'bottomright' | 'bottomleft' | 'inline';
    hl?: string;
    isolated?: boolean;
    stoken?: string;
    grecaptcha?: any;
    ref?: React.Ref<any>;
    className?: string;
    style?: React.CSSProperties;
  }
  const ReCAPTCHA: React.FC<ReCAPTCHAProps>;
  export default ReCAPTCHA;
}