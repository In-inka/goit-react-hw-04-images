import { Overlay, ModalStyle } from './Modal.styled';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Modal = ({ image, tag, onCloseModal }) => {
  const onOpenOverlay = evt => {
    if (evt.target === evt.currentTarget) {
      onCloseModal();
    }
  };

  useEffect(() => {
    const closeESC = e => {
      if (e.code === 'Escape') {
        onCloseModal();
      }
    };
    document.addEventListener('keydown', closeESC);

    return () => {
      document.addEventListener('keydown', closeESC);
    };
  }, [onCloseModal]);

  return (
    <>
      <Overlay onClick={onOpenOverlay}>
        <div>
          <ModalStyle src={image} alt={tag} />
        </div>
      </Overlay>
    </>
  );
};

Modal.propTypes = {
  image: PropTypes.string.isRequired,
  tag: PropTypes.string.isRequired,
  onCloseModal: PropTypes.func.isRequired,
};

export default Modal;
