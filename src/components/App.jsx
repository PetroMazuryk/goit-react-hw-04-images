import { useState, useEffect } from 'react';
import fetchImage from 'servises/FetchApi';

import SearchBar from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from './Loader/Loader';

import { Modal } from './Modal/Modal';

import { Container } from './App.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App() {
  const [imageName, setImageName] = useState('');
  const [images, setImages] = useState([]);
  const [status, setStatus] = useState('idle');
  const [page, setPage] = useState(1);
  const [largeImageURL, setLargeImageUrl] = useState('');
  const [imgTags, setImgTags] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    async function getImages() {
      if (!imageName) return;
      try {
        setStatus('pending');
        const newImages = await fetchImage(imageName, page);

        if (!imageName.trim() || !newImages.length) {
          setStatus('rejected');
          return toast.error(
            `Sorry, but there are no results for your query: ${imageName}`
          );
        }
        setImages(prev => [...prev, ...newImages]);
        setStatus('resolved');
      } catch (error) {
        setStatus('rejected');
        return toast.error('Oops, something went wrong');
      }
    }
    getImages();
  }, [imageName, page]);

  const handleFormSubmit = imageName => {
    setImageName(imageName);
    setPage(1);
    setImages([]);
  };

  const handleBtnClick = () => {
    setPage(prev => prev + 1);
  };

  const toogleModal = (largeImageURL, imgTags) => {
    setShowModal(prev => !prev);
    setImgTags(imgTags);
    setLargeImageUrl(largeImageURL);
  };

  return (
    <Container>
      <ToastContainer />
      <SearchBar onSubmit={handleFormSubmit} />

      {status === 'idle' && (
        <div style={{ textAlign: 'center' }}>
          Enter text to search for an image
        </div>
      )}

      {status === 'pending' && <Loader />}

      <ImageGallery images={images} onClick={toogleModal} />
      {!images.length || <Button onClick={handleBtnClick} />}

      {showModal && (
        <Modal onClose={toogleModal} src={largeImageURL} alt={imgTags} />
      )}
    </Container>
  );
}
