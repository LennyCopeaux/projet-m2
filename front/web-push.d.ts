declare module 'web-push' {
  interface PushSubscription {
    endpoint: string;
    keys: {
      p256dh: string;
      auth: string;
    };
  }

  const webpush: {
    setVapidDetails(
      subject: string,
      publicKey: string,
      privateKey: string
    ): void;
    sendNotification(
      subscription: PushSubscription,
      payload: string | Buffer,
      options?: Record<string, unknown>
    ): Promise<void>;
  };

  export default webpush;
}

