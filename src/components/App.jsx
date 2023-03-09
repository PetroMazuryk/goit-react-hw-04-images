import { Component } from 'react';
import fetchImage from 'servises/FetchApi';
import SearchForm from './Searchbar/Searchbar';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Button } from 'components/Button/Button';
import { Loader } from './Loader/Loader';

import Modal from './Modal/Modal';

import { Container } from './App.styled';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default class App extends Component {
  state = {
    status: 'idle',
    imageName: '',
    images: [],
    page: 1,
    error: null,
    largeImageURL: '',

    isEmpty: false,
    showModal: false,
  };

  async componentDidUpdate(_, prevState) {
    const { imageName, page } = this.state;
    if (prevState.imageName !== imageName || prevState.page !== page) {
      try {
        this.setState({ status: 'pending' });
        const newImages = await fetchImage(imageName, page);
        if (!imageName.trim() || !newImages.length) {
          this.setState({ status: 'rejected' });
          return toast.error(
            `Sorry, but there are no results for your query: ${imageName}`
          );
        }
        this.setState({
          images: [...this.state.images, ...newImages],
          status: 'resolved',
        });
      } catch (error) {
        this.setState({ status: 'rejected' });
        return toast.error('Oops, something went wrong');
      }
    }
  }

  handleFormSubmit = imageName => {
    this.setState({ imageName, page: 1, images: [] });
  };

  handleBtnClick = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  toogleModal = (largeImageURL, imgTags) => {
    this.setState(({ showModal }) => ({
      showModal: !showModal,
    }));
    this.setState({ largeImageURL, imgTags });
  };

  render() {
    const { images, status, largeImageURL, tags, showModal } = this.state;
    return (
      <Container>
        <ToastContainer />
        <SearchForm onSubmit={this.handleFormSubmit} />

        {status === 'idle' && (
          <div style={{ textAlign: 'center' }}>
            Enter text to search for an image
          </div>
        )}

        {status === 'pending' && <Loader />}

        <ImageGallery images={images} onClick={this.toogleModal} />
        {!images.length || <Button onClick={this.handleBtnClick} />}

        {showModal && (
          <Modal onClose={this.toogleModal}>
            <img src={largeImageURL} alt={tags} />
          </Modal>
        )}
      </Container>
    );
  }
}
