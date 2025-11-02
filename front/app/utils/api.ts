/**
 * Construit l'URL de l'API à partir de la variable d'environnement
 * Gère automatiquement l'ajout de https:// et /api si nécessaire
 */
export function getApiUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_URL;
  
  if (!envUrl) {
    return 'http://localhost:3001/api';
  }
  
  // Si l'URL ne commence pas par http:// ou https://, ajouter https://
  let url = envUrl.trim();
  if (!url.startsWith('http://') && !url.startsWith('https://')) {
    url = `https://${url}`;
  }
  
  // Si l'URL ne se termine pas par /api, l'ajouter
  if (!url.endsWith('/api')) {
    url = url.endsWith('/') ? `${url}api` : `${url}/api`;
  }
  
  return url;
}

