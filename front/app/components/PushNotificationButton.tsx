'use client';

import { useState, useEffect } from 'react';

const VAPID_PUBLIC_KEY = 'BJR2sNi2S2ZZmyD7Tfo0t2b3qlAmfse-w98GfqYWLUxAqRUznXtcQwN6kdV5Qr2L0pZG_lAeSc6NN2BvAPcAMs0';

export default function PushNotificationButton() {
  const [isSupported, setIsSupported] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Vérifier si les notifications push sont supportées
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      checkSubscription();
    }
  }, []);

  const checkSubscription = async () => {
    try {
      const registration = await navigator.serviceWorker.ready;
      const subscription = await registration.pushManager.getSubscription();
      setIsSubscribed(!!subscription);
    } catch (error) {
      console.error('Erreur lors de la vérification:', error);
    }
  };

  const subscribe = async () => {
    setIsLoading(true);
    try {
      // Demander la permission
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        alert('Permission refusée pour les notifications');
        setIsLoading(false);
        return;
      }

      // Attendre que le service worker soit prêt (géré par next-pwa)
      const registration = await navigator.serviceWorker.ready;
      
      // Convertir la clé VAPID en format ArrayBuffer
      const applicationServerKey = urlBase64ToUint8Array(VAPID_PUBLIC_KEY);
      
      // S'abonner aux notifications push
      const subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey,
      });

      // Enregistrer la subscription sur le serveur
      const response = await fetch('/api/push/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(subscription),
      });

      const data = await response.json();
      if (data.success) {
        setIsSubscribed(true);
        alert('Abonnement réussi ! Vous pouvez maintenant recevoir des notifications.');
      } else {
        alert('Erreur lors de l\'abonnement');
      }
    } catch (error) {
      console.error('Erreur lors de l\'abonnement:', error);
      alert('Erreur lors de l\'abonnement aux notifications');
    } finally {
      setIsLoading(false);
    }
  };

  const sendNotification = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/push/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: 'Notification depuis PC',
          message: 'Salut ! C\'est un message depuis ton PC 🎉',
        }),
      });

      const data = await response.json();
      if (data.success) {
        alert(`Notification envoyée à ${data.sent} appareil(s) !`);
      } else {
        alert('Erreur: ' + (data.error || 'Impossible d\'envoyer la notification'));
      }
    } catch (error) {
      console.error('Erreur:', error);
      alert('Erreur lors de l\'envoi de la notification');
    } finally {
      setIsLoading(false);
    }
  };

  // Fonction pour convertir la clé VAPID base64 en Uint8Array
  function urlBase64ToUint8Array(base64String: string): Uint8Array {
    const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
    const base64 = (base64String + padding)
      .replace(/-/g, '+')
      .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
      outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
  }

  if (!isSupported) {
    return (
      <div className="text-red-500 text-sm">
        Les notifications push ne sont pas supportées sur ce navigateur
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 items-center mt-8">
      {!isSubscribed ? (
        <button
          onClick={subscribe}
          disabled={isLoading}
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
        >
          {isLoading ? 'Chargement...' : 'Activer les notifications'}
        </button>
      ) : (
        <>
          <div className="text-green-500 text-sm">✓ Notifications activées</div>
          <button
            onClick={sendNotification}
            disabled={isLoading}
            className="px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Envoi...' : 'Envoyer une notification au téléphone'}
          </button>
        </>
      )}
    </div>
  );
}

