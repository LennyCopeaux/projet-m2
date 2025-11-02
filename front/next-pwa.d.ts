declare module 'next-pwa' {
  import { NextConfig } from 'next';

  interface PWAConfig {
    dest?: string;
    register?: boolean;
    skipWaiting?: boolean;
    disable?: boolean;
    sw?: string;
    swSrc?: string;
    [key: string]: any;
  }

  function withPWA(config?: PWAConfig): (nextConfig: NextConfig) => NextConfig;
  
  export default withPWA;
}

