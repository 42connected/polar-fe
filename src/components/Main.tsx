import React, { useState, useEffect } from 'react';
import Modal from './modal';
import './Modal.css';

const Main = () => {
  const [modalOpen, setModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <React.Fragment>
      <button onClick={openModal}>팝업</button>
      <Modal
        open={modalOpen}
        close={closeModal}
        header="Mentoring Schedule"
      ></Modal>
    </React.Fragment>
  );
};

export default Main;
