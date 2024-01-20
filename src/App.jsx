import { useState, useRef } from 'react';
import './App.css';
import { styled } from 'styled-components';
import Header from './components/Header/Header';
import EffectSection from './components/EffectSection/EffectSection';
// import { cameraOrbitIntrinsics } from '@google/model-viewer/lib/features/controls';
import { TypeAnimation } from 'react-type-animation';

export default function App() {
  const [cameraOrbit, setCameraOrbit] = useState('-317.1deg 69.51deg 13.51m');
  const [cameraTarget, setCameraTarget] = useState('');
  const [cameraFov, setFov] = useState('17.9deg');
  // const modelViewer2 = useRef(null);

  // function changeCam() {
  //   console.log('clicked');
  //   setCamera('-0.3727deg 59.77deg 5.261m');
  // }

  // const modelViewer2 = document.querySelector('#modelscar');
  const changeCam = (e) => {
    let dataset = e.target.dataset;
    if (
      dataset.position !== undefined &&
      dataset.orbit !== undefined &&
      dataset.fov !== undefined
    ) {
      setCameraOrbit(dataset.orbit);
      setCameraTarget(dataset.position);
      setFov(dataset.fov);
      // modelViewer2.current.cameraTarget = dataset.position;
      // modelViewer2.current.cameraOrbit = dataset.orbit;
      // modelViewer2.current.fieldOfView = dataset.fov;
    }
  };

  ///typingtextheader

  return (
    <>
      <Header />
      <section
        className='HellosSection container'
        style={{
          marginTop: 130,
          display: 'flex',
          justifyContent: 'space-between',
        }}
      >
        <div className='man'>
          <img
            src='../src/assets/img/Malepeepsitting12.svg'
            alt='man'
            style={{ width: 450, height: 600 }}
            // className='animate__animated animate__backInUp man'
          />
        </div>
        <TypeAnimation
          sequence={[
            'Изучай.\n',
            1000,
            'Изучай.\n Познавай.',
            1000,
            'Изучай.\n Познавай.\n Постигай.',
            1000,
            'Изучай.\n Познавай.',
            1000,
            'Изучай.\n',
            1000,
            '',
            1000,
          ]}
          style={{
            fontSize: '5em',
            textAlign: 'start',
            marginTop: 60,
            color: 'black',
            marginRight: 200,
            whiteSpace: 'pre-line',
            width: 400,
          }}
          repeat={Infinity}
        />
      </section>
      <section
        className='ForWhat container'
        style={{
          marginTop: 130,
          display: 'flex',
          flexDirection: 'column',
          marginBottom: 240,
        }}
      >
        <h2 className='h2'>Расширяйте свои знания вместе с нами</h2>
        <ul
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginTop: 100,
          }}
        >
          <li className='what__el'>
            <img
              className='what__img'
              src='../src/assets/img/noad.png'
              alt='noad'
            />
            <h3 className='h3 mt10'>Никакой рекламы</h3>
            <p className='what__p'>Мы ценим ваше время и возможности.</p>
          </li>
          <li className='what__el'>
            <img
              className='what__img'
              src='../src/assets/img/box.png'
              alt='box'
            />
            <h3 className='h3 mt10'>Всё просто и понятно</h3>
            <p className='what__p'>
              Наш удобный дизайн, не заставит вас теряться, ведь мы постарались
              убрать всё ненужное, оставив самое главное.
            </p>
          </li>
          <li className='what__el'>
            <img
              className='what__img'
              src='../src/assets/img/tel.png'
              alt='mob'
            />
            <h3 className='h3 mt10'>Адаптация под телефоны</h3>
            <p className='what__p'>
              Любой желающий может узнать как устроен тот или иной механизм в
              пару мгновений.
            </p>
          </li>
          <li className='what__el'>
            <img
              className='what__img'
              src='../src/assets/img/info.png'
              alt='info'
            />
            <h3 className='h3 mt10'>Полезная информация</h3>
            <p className='what__p'>
              Только проверенные источники информации помогают нам быть
              уверенными на 100%.
            </p>
          </li>
        </ul>
      </section>
      <section
        className='Projects container'
        style={{
          display: 'flex',
          flexDirection: 'column',
          marginBottom: 200,
        }}
      >
        <h2 className='h2' style={{ alignSelf: 'center' }}>
          Ознакомтесь с нашими проектами
        </h2>
        <ul
          style={{
            marginTop: 80,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 140,
            justifyContent: 'center',
          }}
        >
          <li>
            <button
              style={{
                padding: 0,
                borderRadius: 80,
                width: 400,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img
                src='../src/assets/img/posterpc.png'
                alt='pc'
                style={{ width: 400, height: 400 }}
              />
              <div
                style={{
                  width: '75%',
                  height: 1,
                  backgroundColor: '#ccc',
                  marginTop: 30,
                }}
              ></div>
              <p
                className='project__p'
                style={{ width: 300, marginTop: 20, marginBottom: 40 }}
              >
                Устройство персонального компьютера с наглядными примерами
              </p>
            </button>
          </li>
          <li>
            <button
              style={{
                padding: 0,
                borderRadius: 80,
                width: 400,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img
                src='../src/assets/img/postercar.png'
                alt='pc'
                style={{ width: 380, height: 380, padding: '0 20' }}
              />
              <div
                style={{
                  width: '75%',
                  height: 1,
                  backgroundColor: '#ccc',
                  marginTop: 30,
                }}
              ></div>
              <p
                className='project__p'
                style={{ width: 300, marginTop: 20, marginBottom: 40 }}
              >
                Устройство автомобиля и его базовых механизмов
              </p>
            </button>
          </li>
          <li>
            <button
              style={{
                padding: 0,
                borderRadius: 80,
                width: 400,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
              }}
            >
              <img
                src='../src/assets/img/posterhuman.png'
                alt='pc'
                style={{ width: 150, height: 350, marginTop: 20 }}
              />
              <div
                style={{
                  width: '75%',
                  height: 1,
                  backgroundColor: '#ccc',
                  marginTop: 30,
                }}
              ></div>
              <p
                className='project__p'
                style={{ width: 300, marginTop: 20, marginBottom: 40 }}
              >
                Как выглядят органы человека?
              </p>
            </button>
          </li>
          <li>
            <button
              style={{
                padding: 0,
                borderRadius: 80,
                width: 400,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                position: 'relative',
                top: -50,
              }}
            >
              <img
                src='../src/assets/img/posterpc.png'
                alt='pc'
                style={{ width: 400, height: 400 }}
              />
              <div
                style={{
                  width: '75%',
                  height: 1,
                  backgroundColor: '#ccc',
                  marginTop: 30,
                }}
              ></div>
              <p
                className='project__p'
                style={{ width: 300, marginTop: 20, marginBottom: 40 }}
              >
                Устройство персонального компьютера с наглядными примерами
              </p>
            </button>
          </li>
        </ul>
      </section>
      <div className='form3d'>
        <model-viewer
          // ref={modelViewer2}
          id='modelscar'
          className='modelscar'
          style={{ width: 1100, height: 800, borderRadius: 38 }}
          src='../src/assets/models/car.glb'
          ar
          ar-modes='webxr scene-viewer quick-look'
          camera-controls
          poster='poster.webp'
          shadow-intensity='1'
          exposure='0.8'
          // auto-rotate
          camera-orbit={cameraOrbit}
          camera-target={cameraTarget}
          field-of-view={cameraFov}
        >
          <button
            onClick={changeCam}
            className='Hotspot'
            id='hotspot-1'
            slot='hotspot-1'
            data-position='-0.0017432640324489667m 0.8183699835417795m 1.3979560123354162m'
            data-normal='-0.010713029820749434m 0.9953146056976239m 0.09609405120528333m'
            data-visibility-attribute='visible'
            data-orbit='-0.3727deg 59.77deg 5.261m'
            data-fov='12deg'
          >
            Двигатель
          </button>
          <button
            onClick={changeCam}
            className='Hotspot'
            slot='hotspot-2'
            id='hotspot-2'
            data-position='-0.4271322423377759m 0.8141278148018181m -0.02109609419316504m'
            data-normal='-0.011410756603810392m 0.3109337354359672m -0.9503630920872109m'
            data-visibility-attribute='visible'
            data-orbit='222.4deg 72.48deg 5.261m'
            data-fov='12deg'
          >
            Рулевое управление
          </button>
          <button
            onClick={changeCam}
            className='Hotspot'
            slot='hotspot-3'
            id='hotspot-3'
            data-position='0.53448420498753m 0.45093817154737925m -1.3063243590478146m'
            data-normal='-0.6057783061584652m -0.6909737247718588m -0.3944463911137794m'
            data-visibility-attribute='visible'
            data-orbit='233.6deg 123.9deg 7.991m'
            data-fov='12deg'
          >
            Подвеска
          </button>
          <button
            onClick={changeCam}
            className='Hotspot'
            slot='hotspot-4'
            id='hotspot-4'
            data-position='-0.8480648099247934m 0.33435741330162855m 1.3670811985821523m'
            data-normal='-0.9991475301225782m 0.03059796610184273m 0.02771240733647095m'
            data-visibility-attribute='visible'
            data-orbit='251.5deg 77.32deg 5.261m'
            data-fov='12deg'
          >
            Колесо
          </button>
          <button
            onClick={changeCam}
            className='Hotspot'
            slot='hotspot-5'
            id='hotspot-5'
            data-position='-0.8148970007896423m 0.3551181250040389m -1.363451396048058m'
            data-normal='-1m 0m 0m'
            data-visibility-attribute='visible'
            data-orbit='293.6deg 88.5deg 5.261m'
            data-fov='12deg'
          >
            Тормозная система
          </button>
          <button
            onClick={changeCam}
            className='Hotspot'
            slot='hotspot-6'
            id='hotspot-6'
            data-position='-0.008162177111915359m 0.5950701697264106m -0.012376007290469603m'
            data-normal='0.014603436670219481m 0.10542082397487057m -0.9943204662028629m'
            data-visibility-attribute='visible'
            data-orbit='-244.4deg 63.91deg 5.654m'
            data-fov='12deg'
          >
            Трансмиссия
          </button>
          <button
            onClick={changeCam}
            className='Hotspot'
            slot='hotspot-7'
            id='hotspot-7'
            data-position='0.6847879996954527m 0.9068931424221599m -1.3433404753521008m'
            data-normal='0.2916569434605815m 0.9534812026888208m -0.07622219788428657m'
            data-visibility-attribute='visible'
            data-orbit='142.7deg 73.19deg 7.991m'
            data-fov='13.71deg'
          >
            Несущая система, т.е. кузов или рама
          </button>
          <div className='progress-bar hide' slot='progress-bar'>
            <div className='update-bar'></div>
          </div>
          <button slot='ar-button' id='ar-button'>
            View in your space
          </button>
        </model-viewer>
      </div>
      {/* <EffectSection></EffectSection> */}
    </>
  );
}
