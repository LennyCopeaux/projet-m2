'use client';

import { useState } from 'react';
import Modal from './Modal';
import { searchBook, BookInfo, validateISBN } from '../services/googleBooks';

export default function AddBookButton() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [book, setBook] = useState<BookInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleOpenModal = () => {
    setIsModalOpen(true);
    setBook(null);
    setError(null);
    setSearchQuery('');
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setBook(null);
    setError(null);
    setSearchQuery('');
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      setError('Veuillez entrer un ISBN');
      return;
    }

    // Valider l'ISBN avant de rechercher
    const { isValid, cleaned } = validateISBN(searchQuery);
    if (!isValid) {
      setError('ISBN invalide. Veuillez entrer un ISBN-10 (10 chiffres) ou ISBN-13 (13 chiffres).');
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const result = await searchBook(cleaned);
      if (result) {
        setBook(result);
      } else {
        setError('Aucun livre trouvé pour cet ISBN');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erreur lors de la recherche. Veuillez réessayer.';
      setError(errorMessage);
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <button
        onClick={handleOpenModal}
        className="px-6 py-3 bg-[#aa3030] text-white hover:bg-[#8a2525] transition-colors rounded-lg font-medium shadow-sm"
      >
        Trouver un livre
      </button>

      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title="Trouver un livre"
      >
        <div className="space-y-5">
          {/* Champ de recherche */}
          <div className="flex gap-3">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              placeholder="ISBN (10 ou 13 chiffres)"
              className="flex-1 px-4 py-2.5 border border-[#060202]/20 bg-white text-[#060202] placeholder-[#060202]/40 focus:outline-none focus:border-[#aa3030] rounded-lg"
            />
            <button
              onClick={handleSearch}
              disabled={isLoading}
              className="px-6 py-2.5 bg-[#aa3030] text-white hover:bg-[#8a2525] disabled:opacity-50 disabled:cursor-not-allowed transition-colors rounded-lg font-medium"
            >
              {isLoading ? 'Recherche...' : 'Rechercher'}
            </button>
          </div>

          {/* Message d'erreur */}
          {error && (
            <div className="p-4 border border-red-300 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          {/* Résultat du livre */}
          {book && (
            <div className="border border-[#dfc09f]/30 p-6 space-y-5 bg-[#dfc09f]/5 rounded-xl">
              <div className="flex gap-5">
                <div className="flex-shrink-0 w-32 h-48 border border-[#dfc09f]/40 rounded-lg bg-[#dfc09f]/10 flex items-center justify-center overflow-hidden">
                  {book.image ? (
                    <img
                      src={book.image}
                      alt={book.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center p-4">
                      <p className="text-xs text-[#060202]/40">Image indisponible</p>
                    </div>
                  )}
                </div>
                <div className="flex-1 space-y-3">
                  <div className="flex items-start justify-between gap-3">
                    <h3 className="text-xl font-normal text-[#060202] leading-tight flex-1">
                      {book.title}
                    </h3>
                    {book.categories && book.categories.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {book.categories.map((category, index) => (
                          <span
                            key={index}
                            className="px-3 py-1 border border-[#d7a20a]/40 bg-[#d7a20a]/10 text-[#8d602c] text-xs rounded-full whitespace-nowrap font-medium"
                          >
                            {category}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-[#060202]/60 mb-1">Auteur(s)</p>
                    <p className="text-[#060202]">
                      {book.authors && book.authors.length > 0
                        ? book.authors.join(', ')
                        : '-'}
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-[#060202]/60 mb-1">Éditeur</p>
                      <p className="text-[#060202]">{book.publisher || '-'}</p>
                    </div>
                    <div>
                      <p className="text-[#060202]/60 mb-1">Date de publication</p>
                      <p className="text-[#060202]">{book.publishedDate || '-'}</p>
                    </div>
                    <div>
                      <p className="text-[#060202]/60 mb-1">Pages</p>
                      <p className="text-[#060202]">{book.pageCount || '-'}</p>
                    </div>
                    <div>
                      <p className="text-[#060202]/60 mb-1">Langue</p>
                      <p className="text-[#060202]">
                        {book.language ? book.language.toUpperCase() : '-'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-4 border-t border-[#dfc09f]/30">
                <h4 className="font-normal text-[#060202] mb-2 text-sm">
                  Description
                </h4>
                <p className="text-[#060202]/80 leading-relaxed text-sm">
                  {book.description
                    ? book.description.length > 500
                      ? `${book.description.substring(0, 500)}...`
                      : book.description
                    : '-'}
                </p>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}

