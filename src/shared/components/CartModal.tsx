import { forwardRef, useImperativeHandle, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Cart from './Cart';

const CartModal = forwardRef(function CartModal({ title, children }: { title: string; children: React.ReactNode }, 
  ref: React.Ref<any>) {
  const [show, setShow] = useState(false);

  const closeModal = () => setShow(false);
  const showModal = () => setShow(true);

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        showModal();
      },
      close: () => {
        closeModal();
      }
    };
  });
  return (
    <>
      <Modal show={show} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body><Cart /></Modal.Body>
        <Modal.Footer>
          {children}
        </Modal.Footer>
      </Modal>
    </>
  );
})

export default CartModal;