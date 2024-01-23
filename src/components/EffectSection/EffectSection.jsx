import { useState } from 'react';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';

export default function EffectSection() {
  const [modal, setModal] = useState(false);

  function openModal(models, disc) {
    setModal(true);
  }
  return (
    <>
      {/* <Button onClick={openModal}>{children}</Button> */}

      <Modal open={modal}>
        <div className='smallform3d'>{models}</div>
        <p>{disc}</p>
        <Button onClick={() => setModal(false)}>Закрыть</Button>
      </Modal>
    </>
  );
}
