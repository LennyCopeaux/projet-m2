import { NextResponse } from 'next/server';
import { addSubscription, getSubscriptions } from '../subscriptions';

export async function POST(request: Request) {
  try {
    const subscription = await request.json();
    const count = addSubscription(subscription);
    
    console.log('Subscription enregistrée:', subscription.endpoint);
    
    return NextResponse.json({ success: true, count });
  } catch (error) {
    console.error('Erreur lors de l\'enregistrement:', error);
    return NextResponse.json(
      { success: false, error: 'Erreur lors de l\'enregistrement' },
      { status: 500 }
    );
  }
}

// Route GET pour récupérer toutes les subscriptions (pour debug)
export async function GET() {
  const subscriptions = getSubscriptions();
  return NextResponse.json({ count: subscriptions.length });
}

