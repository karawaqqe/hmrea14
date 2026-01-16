import { useEffect } from 'react';

const Modal = ({ image, onClose }) => {
  useEffect(() => {
    const handleEsc = e => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  return (
    <div className="overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <img src={image} alt="" />
      </div>
    </div>
  );
};

export default Modal;
