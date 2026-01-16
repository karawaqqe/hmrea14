import { useState, useEffect } from 'react';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import ImageGalleryItem from './components/ImageGalleryItem';
import Button from './components/Button';
import Loader from './components/Loader';
import Modal from './components/Modal';
import { fetchImages } from './services/pixabayApi';
import './styles/styles.css';

function App() {
  const [query, setQuery] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  useEffect(() => {
    if (!query) return;

    setLoading(true);

    fetchImages(query, page)
      .then(newImages => {
        setImages(prev => [...prev, ...newImages]);
      })
      .finally(() => setLoading(false));
  }, [query, page]);

  const handleSearch = newQuery => {
    if (newQuery === query) return;

    setQuery(newQuery);
    setImages([]);
    setPage(1);
  };

  return (
    <>
      <Searchbar onSubmit={handleSearch} />

      <ImageGallery>
        {images.map(img => (
          <ImageGalleryItem
            key={img.id}
            image={img}
            onClick={() => setModalImage(img.largeImageURL)}
          />
        ))}
      </ImageGallery>

      {loading && <Loader />}
      {images.length > 0 && !loading && (
        <Button onClick={() => setPage(p => p + 1)} />
      )}

      {modalImage && (
        <Modal image={modalImage} onClose={() => setModalImage(null)} />
      )}
    </>
  );
}

export default App;
