import { GalleryListItem, ImgItem } from './ImageGalleryItem.styled'
import PropTypes from 'prop-types';
export const ImageGalleryItem = ({ webformatURL,
    largeImageURL,
    tags, onClick }) => {

    return (<GalleryListItem>
        <ImgItem src={webformatURL} alt={tags} onClick={() => onClick(largeImageURL, tags)} />
    </GalleryListItem>
    )
}

ImageGalleryItem.propTypes = {
    largeImageURL: PropTypes.string.isRequired,
    webformatURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};