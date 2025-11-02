// Service Worker source pour next-pwa avec support des notifications push
// Ce fichier sera traité par next-pwa lors du build

// Import workbox (sera injecté automatiquement par next-pwa)
import { precacheAndRoute } from 'workbox-precaching';

// Precache les fichiers statiques
precacheAndRoute(self.__WB_MANIFEST || []);

// Gestion des notifications push
self.addEventListener('push', function(event) {
  let data = { title: 'Projet M2', body: 'Nouvelle notification !' };
  
  if (event.data) {
    try {
      data = JSON.parse(event.data.text());
    } catch (e) {
      data.body = event.data.text();
    }
  }

  const options = {
    body: data.body || data.message || 'Nouvelle notification !',
    title: data.title || 'Projet M2',
    icon: '/icon-192x192.png',
    badge: '/icon-192x192.png',
    vibrate: [200, 100, 200],
    tag: 'notification',
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    }
  };

  event.waitUntil(
    self.registration.showNotification(data.title || 'Projet M2', options)
  );
});

// Gestion du clic sur les notifications
self.addEventListener('notificationclick', function(event) {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow('/')
  );
});

