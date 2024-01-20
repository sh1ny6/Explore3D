import { useState } from 'react';
import Button from '../Button/Button';
import Modal from '../Modal/Modal';

export default function EffectSection() {
  const [modal, setModal] = useState(false);

  function openModal() {
    setModal(true);
  }
  return (
    <section>
      <h3>Effects</h3>

      <Button onClick={openModal}>Открыть окно</Button>

      <Modal open={modal}>
        <h3>hello</h3>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
          inventore hic libero. Odit temporibus libero earum error eos
          consectetur hic, perspiciatis vero molestias architecto sed laborum!
          Quisquam ut quod optio.
        </p>
        <Button onClick={() => setModal(false)}>close modal</Button>
      </Modal>
    </section>
  );
}
