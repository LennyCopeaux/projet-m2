export interface BookInfo {
  id: string;
  title: string;
  authors?: string[];
  description?: string;
  image?: string;
  publishedDate?: string;
  pageCount?: number;
  categories?: string[];
  language?: string;
  publisher?: string;
}

export interface GoogleBooksResponse {
  items?: Array<{
    id: string;
    volumeInfo: {
      title: string;
      authors?: string[];
      description?: string;
      imageLinks?: {
        thumbnail?: string;
        smallThumbnail?: string;
      };
      publishedDate?: string;
      pageCount?: number;
      categories?: string[];
      language?: string;
      publisher?: string;
    };
  }>;
}

// Fonction pour nettoyer et valider l'ISBN
export function validateISBN(isbn: string): { isValid: boolean; cleaned: string } {
  // Supprimer les espaces, tirets et caractères non numériques
  const cleaned = isbn.replace(/[\s-]/g, '');
  
  // ISBN-10: 10 chiffres
  // ISBN-13: 13 chiffres (commence généralement par 978 ou 979)
  const isbn10Pattern = /^\d{10}$/;
  const isbn13Pattern = /^\d{13}$/;
  
  const isValid = isbn10Pattern.test(cleaned) || isbn13Pattern.test(cleaned);
  
  return { isValid, cleaned };
}

export async function searchBook(isbn: string): Promise<BookInfo | null> {
  try {
    // Valider l'ISBN
    const { isValid, cleaned } = validateISBN(isbn);
    if (!isValid) {
      throw new Error('ISBN invalide. Veuillez entrer un ISBN-10 (10 chiffres) ou ISBN-13 (13 chiffres).');
    }

    // Utiliser le paramètre isbn: pour rechercher spécifiquement par ISBN
    const response = await fetch(
      `https://www.googleapis.com/books/v1/volumes?q=isbn:${cleaned}&maxResults=1`
    );

    if (!response.ok) {
      throw new Error('Erreur lors de la recherche');
    }

    const data: GoogleBooksResponse = await response.json();

    if (!data.items || data.items.length === 0) {
      return null;
    }

    const book = data.items[0];
    const volumeInfo = book.volumeInfo;

    return {
      id: book.id,
      title: volumeInfo.title,
      authors: volumeInfo.authors,
      description: volumeInfo.description,
      image: volumeInfo.imageLinks?.thumbnail || volumeInfo.imageLinks?.smallThumbnail,
      publishedDate: volumeInfo.publishedDate,
      pageCount: volumeInfo.pageCount,
      categories: volumeInfo.categories,
      language: volumeInfo.language,
      publisher: volumeInfo.publisher,
    };
  } catch (error) {
    console.error('Erreur lors de la recherche de livre:', error);
    throw error;
  }
}

