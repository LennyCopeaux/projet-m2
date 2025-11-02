// Stockage partagé des subscriptions push
// En production, remplacez par une vraie base de données (Redis, MongoDB, etc.)
let subscriptions: any[] = [];

export function addSubscription(subscription: any) {
  subscriptions.push(subscription);
  return subscriptions.length;
}

export function getSubscriptions() {
  return subscriptions;
}

export function removeSubscription(endpoint: string) {
  subscriptions = subscriptions.filter(sub => sub.endpoint !== endpoint);
}

export function clearSubscriptions() {
  subscriptions = [];
}

