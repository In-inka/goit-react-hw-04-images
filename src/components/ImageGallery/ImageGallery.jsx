import ImageGalleryItem from '../ImageGalleryItem';
import Modal from '../Modal';
import { List } from './ImageGallery.styled';
import { useState } from 'react';

import PropTypes from 'prop-types';

const ImageGallery = ({ pictures }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageURL, setImageURL] = useState('');
  const [tag, setTag] = useState('');

  const openModal = (imageURL, tag) => {
    setIsModalOpen(true);
    setImageURL(imageURL);
    setTag(tag);
  };
  const closeModal = () => {
    setIsModalOpen(false);
    setImageURL('');
    setTag('');
  };

  return (
    <>
      <List>
        {pictures.map(({ id, webformatURL, largeImageURL, tags }) => {
          return (
            <ImageGalleryItem
              tag={tags}
              key={id}
              webformatURL={webformatURL}
              largeImageURL={largeImageURL}
              onClickOpenModal={openModal}
            />
          );
        })}
      </List>
      {isModalOpen && (
        <Modal image={imageURL} tag={tag} onCloseModal={closeModal} />
      )}
    </>
  );
};

ImageGallery.propTypes = {
  pictures: PropTypes.array.isRequired,
};

export default ImageGallery;
