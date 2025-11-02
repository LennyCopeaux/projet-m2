import { NextResponse } from 'next/server';
import webpush from 'web-push';
import { getSubscriptions, removeSubscription } from '../subscriptions';

// Configuration VAPID
const publicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY || 'BJR2sNi2S2ZZmyD7Tfo0t2b3qlAmfse-w98GfqYWLUxAqRUznXtcQwN6kdV5Qr2L0pZG_lAeSc6NN2BvAPcAMs0';
const privateKey = process.env.VAPID_PRIVATE_KEY || 'zjmjebDl6xHsTJibcKwxCVe2JUzx6XzLGZ9swHhJeak';

webpush.setVapidDetails(
  'mailto:test@example.com',
  publicKey,
  privateKey
);

export async function POST(request: Request) {
  try {
    const { title = 'Notification depuis PC', message = 'Message par défaut' } = await request.json();
    
    const subscriptions = getSubscriptions();
    
    if (subscriptions.length === 0) {
      return NextResponse.json(
        { success: false, error: 'Aucune subscription enregistrée' },
        { status: 400 }
      );
    }

    const payload = JSON.stringify({
      title,
      body: message,
      icon: '/icon-192x192.png',
    });

    const promises = subscriptions.map(async (subscription) => {
      try {
        await webpush.sendNotification(subscription, payload);
        console.log('Notification envoyée à:', subscription.endpoint);
      } catch (error: any) {
        console.error('Erreur lors de l\'envoi:', error);
        // Retirer les subscriptions invalides
        if (error.statusCode === 410 || error.statusCode === 404) {
          removeSubscription(subscription.endpoint);
        }
      }
    });

    await Promise.allSettled(promises);

    return NextResponse.json({ 
      success: true, 
      sent: subscriptions.length 
    });
  } catch (error) {
    console.error('Erreur:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de l\'envoi' },
      { status: 500 }
    );
  }
}

