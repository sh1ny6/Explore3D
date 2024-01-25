import { useState, useRef } from 'react';
import React from 'react';
import './App.css';
import classes from './components/Header/Header.module.css';
import { styled, keyframes } from 'styled-components';
import Header from './components/Header/Header.jsx';
// import EffectSection from './components/EffectSection/EffectSection';
// import { cameraOrbitIntrinsics } from '@google/model-viewer/lib/features/controls';
import { TypeAnimation } from 'react-type-animation';
import Modal from '../src/components/Modal/Modal.jsx';
import Button from './components/Button/Button.jsx';
import { fadeInLeftBig, zoomIn } from 'react-animations';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useMatch,
  useResolvedPath,
} from 'react-router-dom';
import 'animate.css/animate.compat.css';
// import ScrollAnimation from 'react-animate-on-scroll';

const FadeIn = styled.div`
  animation: 2s ${keyframes`${fadeInLeftBig}`};
`;
const Zoom = styled.div`
  animation: 2s ${keyframes`${zoomIn}`};
`;
let HeaderContainer = styled.header`
  height: 140px;
  display: flex;
  padding: 0 2rem;
  justify-content: space-between;
  align-items: center;
`;
let LogoName = styled.div`
  text-align: center;
  align-items: center;
  color: #181818;
  text-decoration: none;
  font-size: 36px;
  border: none;
  margin-left: 20px;
`;
// let AlignItems = styled.div``;
// dropdown context for open state
const DropdownContext = React.createContext({
  open: false,
  setOpen: () => {},
});
// dropdown component for wrapping and providing context
function Dropdown({ children, ...props }) {
  const [open, setOpen] = React.useState(false);
  const dropdownRef = React.useRef(null);

  // click listeners for closing dropdown
  React.useEffect(() => {
    // close dropdown if click outside
    function close(e) {
      if (!dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    // add or remove event listener
    if (open) {
      window.addEventListener('click', close);
    }
    // cleanup
    return function removeListener() {
      window.removeEventListener('click', close);
    };
  }, [open]); // only run if open state changes

  return (
    <DropdownContext.Provider value={{ open, setOpen }}>
      <div ref={dropdownRef} className='relative m-1'>
        {children}
      </div>
    </DropdownContext.Provider>
  );
}

// dropdown button for triggering open
function DropdownButton({ children, ...props }) {
  const { open, setOpen } = React.useContext(DropdownContext); // get the context

  // to open and close the dropdown
  function toggleOpen() {
    setOpen(!open);
  }

  return (
    <button
      onClick={toggleOpen}
      className='rounded px-4 py-2 font-bold text-white bg-gray-800 flex items-center'
    >
      {children}
      <svg
        xmlns='http://www.w3.org/2000/svg'
        fill='none'
        viewBox='0 0 24 24'
        width={15}
        height={15}
        strokeWidth={4}
        stroke='currentColor'
        className={`ml-2 ${open ? 'rotate-180' : 'rotate-0'}`}
      >
        <path
          strokeLinecap='round'
          strokeLinejoin='round'
          d='M19.5 8.25l-7.5 7.5-7.5-7.5'
        />
      </svg>
    </button>
  );
}

// dropdown content for displaying dropdown
function DropdownContent({ children }) {
  const { open } = React.useContext(DropdownContext); // get the context

  return (
    <div
      className={`absolute z-20 rounded border border-gray-300 bg-white overflow-hidden my-1 overflow-y-auto ${
        open ? 'shadow-md' : 'hidden'
      }`}
    >
      {children}
    </div>
  );
}

// dropdown list for dropdown menus
function DropdownList({ children, ...props }) {
  const { setOpen } = React.useContext(DropdownContext); // get the context

  return (
    <ul
      onClick={() => setOpen(false)}
      className='divide-y divide-gray-200 text-gray-700'
      {...props}
    >
      {children}
    </ul>
  );
}

// dropdown items for dropdown menus
function DropdownItem({ children, ...props }) {
  return (
    <li>
      <button
        className='py-3 px-5 whitespace-nowrap hover:underline'
        {...props}
      >
        {children}
      </button>
    </li>
  );
}

// optional - but I like this pattern to know it must be a child of Dropdown
Dropdown.Button = DropdownButton;
Dropdown.Content = DropdownContent;
Dropdown.List = DropdownList;
Dropdown.Item = DropdownItem;

export default function App() {
  const [cameraOrbit, setCameraOrbit] = useState('-317.1deg 69.51deg 13.51m');
  const [cameraTarget, setCameraTarget] = useState('');
  const [cameraFov, setFov] = useState('20.45deg');
  const modelViewer2 = useRef(null);
  const [modal, setModal] = useState(false);
  const [models, setModels] = useState('');
  const [disc, setDisc] = useState('');
  const [title, setTitle] = useState('');

  const [activeTab, setActiveTab] = useState('');
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
      dataset.fov !== undefined &&
      dataset.tab !== undefined
    ) {
      // setCameraOrbit(dataset.orbit);
      // setCameraTarget(dataset.position);
      // setFov(dataset.fov);
      modelViewer2.current.cameraOrbit = dataset.orbit;
      modelViewer2.current.cameraTarget = dataset.position;
      modelViewer2.current.fieldOfView = dataset.fov;
      setActiveTab(dataset.tab);
    }
    // changeActiveTab(e);
  };

  const openModal = (e) => {
    let dataset = e.target.dataset;
    if (dataset.models !== undefined && dataset.disc !== undefined) {
      setModels(dataset.models);
      setDisc(dataset.disc);
      setTitle(dataset.title);
      setModal(true);
    }
  };

  // const changeActiveTab = (e) => {
  //   let dataset = e.target.dataset;
  //   if (
  //     dataset.tab !== undefined
  //     //  && dataset.tab !== activeTab
  //   ) {
  //     setActiveTab(dataset.tab);
  //   }
  // };

  return (
    <Router>
      <Header />
      {modal && (
        <Modal open={modal}>
          <h2 className='h2' style={{ fontFamily: 'Roboto Mono' }}>
            {title}
          </h2>
          <div style={{ display: 'flex', marginBottom: 20, marginTop: 10 }}>
            <div
              className='smallform3d'
              style={{ width: 500, height: 600 }}
              dangerouslySetInnerHTML={{
                __html: models,
              }}
            ></div>
            <p
              style={{
                fontFamily: 'Roboto Mono',
                margin: '40px 0px 0 30px',
              }}
            >
              {disc}
            </p>
          </div>
          <Button onClick={() => setModal(false)}>Закрыть</Button>
        </Modal>
      )}
      <Routes>
        <Route
          exact
          path='/'
          element={
            <>
              <section
                className='HellosSection container'
                style={{
                  marginTop: 130,
                  display: 'flex',
                  justifyContent: 'space-between',
                }}
              >
                <FadeIn>
                  <div className='man'>
                    <img
                      src='/assets/img/Malepeepsitting12.svg'
                      alt='man'
                      style={{ width: 450, height: 600 }}
                      // className='animate__animated animate__backInUp man'
                    />
                  </div>
                </FadeIn>
                <TypeAnimation
                  // speed={}
                  sequence={[
                    1000,
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
                id='benefits'
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
                      src='/assets/img/noad.png'
                      alt='noad'
                    />
                    <h3 className='h3 mt10'>Никакой рекламы</h3>
                    <p className='what__p'>
                      Мы ценим ваше время и возможности.
                    </p>
                  </li>
                  <li className='what__el'>
                    <img
                      className='what__img'
                      src='/assets/img/box.png'
                      alt='box'
                    />
                    <h3 className='h3 mt10'>Всё просто и понятно</h3>
                    <p className='what__p'>
                      Наш удобный дизайн, не заставит вас теряться, ведь мы
                      постарались убрать всё ненужное, оставив самое главное.
                    </p>
                  </li>
                  <li className='what__el'>
                    <img
                      className='what__img'
                      src='/assets/img/tel.png'
                      alt='mob'
                    />
                    <h3 className='h3 mt10'>Адаптация под телефоны</h3>
                    <p className='what__p'>
                      Любой желающий может узнать как устроен тот или иной
                      механизм в пару мгновений.
                    </p>
                  </li>
                  <li className='what__el'>
                    <img
                      className='what__img'
                      src='/assets/img/info.png'
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
                id='projects'
                className='Projects container'
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginBottom: 160,
                  position: 'relative',
                }}
              >
                <h2 className='h2' style={{ alignSelf: 'center' }}>
                  Ознакомтесь с нашими проектами
                </h2>
                <ul
                  style={{
                    marginTop: 100,
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: 120,
                    justifyContent: 'center',
                    fontFamily: 'Roboto Mono',
                  }}
                >
                  <li>
                    <Link to='/pc'>
                      <button
                        className='project__el'
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
                          src='/assets/img/posterpc.png'
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
                          style={{
                            width: 300,
                            marginTop: 20,
                            marginBottom: 40,
                          }}
                        >
                          Устройство персонального компьютера с наглядными
                          примерами
                        </p>
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to='/car'>
                      <button
                        className='project__el'
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
                          src='/assets/img/postercar.png'
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
                          style={{
                            width: 300,
                            marginTop: 20,
                            marginBottom: 40,
                          }}
                        >
                          Устройство автомобиля и его базовых механизмов
                        </p>
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to='/human'>
                      <button
                        className='project__el'
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
                          src='/assets/img/posterhuman.png'
                          alt='human'
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
                          style={{
                            width: 300,
                            marginTop: 20,
                            marginBottom: 40,
                          }}
                        >
                          Как выглядят органы человека?
                        </p>
                      </button>
                    </Link>
                  </li>
                  <li>
                    <Link to='/plane'>
                      <button
                        className='project__el'
                        style={{
                          padding: 0,
                          borderRadius: 80,
                          width: 400,
                          display: 'flex',
                          flexDirection: 'column',
                          alignItems: 'center',
                          position: 'relative',
                          top: -50,
                          // '&:hover': {
                          //   borderColor: '#2c2c2c',
                          // },
                        }}
                      >
                        <img
                          src='/assets/img/posterplane.png'
                          alt='pc'
                          style={{ width: 400, height: 400, paddingRight: 20 }}
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
                          style={{
                            width: 300,
                            marginTop: 20,
                            marginBottom: 40,
                          }}
                        >
                          Принципы работы самолёта
                        </p>
                      </button>
                    </Link>
                  </li>
                </ul>
              </section>
              <section
                id='about'
                className='Authors container'
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginBottom: 200,
                }}
              >
                <h2 className='h2' style={{ alignSelf: 'flex-end' }}>
                  Авторы
                </h2>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: 100,
                  }}
                >
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <div
                      className='author'
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        alignSelf: 'flex-start',
                      }}
                    >
                      <div className='boximg sasha'></div>
                      <h3 className='h3' style={{ marginTop: 20 }}>
                        Александр Распопов
                      </h3>
                      <p
                        className='authors__p'
                        style={{ maxWidth: 240, marginTop: 8 }}
                      >
                        ответственный за интерактивную платформу
                      </p>
                    </div>
                    <div
                      className='author'
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        marginTop: 100,
                        marginLeft: 240,
                      }}
                    >
                      <div className='boximg vanya'></div>
                      <h3 className='h3' style={{ marginTop: 20 }}>
                        Иван Костючков
                      </h3>
                      <p className='authors__p' style={{ marginTop: 8 }}>
                        ответственный за 3D-модели
                      </p>
                    </div>
                  </div>
                  <img
                    src='/assets/img/author.svg'
                    alt='comment'
                    style={{ width: 700 }}
                  />
                </div>
              </section>
            </>
          }
        ></Route>

        <Route
          path='/pc'
          element={
            <>
              <div
                className='form3d'
                style={{ marginTop: 100, marginBottom: 50 }}
              >
                <model-viewer
                  id='modelspc'
                  className='modelspc'
                  style={{ width: 1100, height: 800, borderRadius: 38 }}
                  src='/assets/models/pc/newcomp.glb'
                  ar
                  ar-modes='webxr scene-viewer quick-look'
                  camera-controls
                  poster='/assets/models/pc/newcomp.webp'
                  shadow-intensity='1'
                  // auto-rotate
                  camera-orbit='37.39deg 71.99deg 0.5613m'
                  field-of-view='30deg'
                  exposure='1'
                >
                  <button
                    data-models="<model-viewer
          loading='eager'
        className='smallform3d'
        style='width:500px;height:600px;border-radius:38px;'
      src='/assets/models/pc/SSD.glb'
      ar
      ar-modes='webxr scene-viewer quick-look'
      camera-controls
      tone-mapping='commerce'
      poster='/assets/models/pc/SSD.webp'
      shadow-intensity='1'
      camera-orbit='32.49deg 80.66deg 0.2438m'
      field-of-view='30deg'
      auto-rotate
    ></model-viewer>"
                    data-title='SSD SATA'
                    data-disc='Твердотельный накопитель (SSD) — это компьютерное энергонезависимое немеханическое запоминающее устройство на основе микросхем памяти, альтернатива жёстким дискам (HDD). Наиболее распространённый вид твердотельных накопителей использует для хранения данных флеш-память типа NAND, однако существуют варианты, в которых накопитель создаётся на базе DRAM-памяти, снабжённой дополнительным источником питания — аккумулятором.'
                    onClick={openModal}
                    className='Hotspot'
                    slot='hotspot-1'
                    data-surface='975 0 1098 200 744 0.453 0.030 0.516'
                    data-visibility-attribute='visible'
                  >
                    SSD
                  </button>
                  <button
                    data-models="<model-viewer
          loading='eager'
        className='smallform3d'
        style='width:500px;height:600px;border-radius:38px;'
      src='/assets/models/pc/RAM.glb'
      ar
      ar-modes='webxr scene-viewer quick-look'
      camera-controls
      tone-mapping='commerce'
      poster='/assets/models/pc/RAM.webp'
      shadow-intensity='1'
      camera-orbit='32.49deg 80.66deg 0.2438m'
      field-of-view='30deg'
      auto-rotate
    ></model-viewer>"
                    data-title='ОЗУ'
                    data-disc='Оперативная память, или оперативное запоминающее устройство (ОЗУ) — временное хранилище для данных, необходимых для работы игр и программ. Оперативка обеспечивает процессору и видеокарте моментальный доступ к запрашиваемой информации, чтобы не пришлось считывать её с медленного жёсткого диска или недостаточно скоростного SSD-накопителя.'
                    onClick={openModal}
                    className='Hotspot'
                    slot='hotspot-2'
                    data-surface='959 0 56 13 61 0.601 0.319 0.080'
                    data-visibility-attribute='visible'
                  >
                    ОЗУ
                  </button>
                  <button
                    data-models="<model-viewer
          loading='eager'
        className='smallform3d'
        style='width:500px;height:600px;border-radius:38px;'
      src='/assets/models/pc/CPU.glb'
      ar
      ar-modes='webxr scene-viewer quick-look'
      camera-controls
      tone-mapping='commerce'
      poster='/assets/models/pc/CPU.webp'
      shadow-intensity='1'
      camera-orbit='244.4deg 73.1deg 2.882m'
      field-of-view='30deg'
      auto-rotate
    ></model-viewer>"
                    data-title='Процессор'
                    data-disc='Центральный процессор (ЦПУ) – это аппаратный компонент, который является основным вычислительным блоком сервера. Серверы и другие интеллектуальные устройства преобразуют данные в цифровые сигналы и выполняют над ними математические операции. Центральный процессор является основным компонентом, который обрабатывает сигналы и делает возможными вычисления. Он действует как мозг любого вычислительного устройства.'
                    onClick={openModal}
                    className='Hotspot'
                    slot='hotspot-3'
                    data-surface='140 0 995 1003 1011 0.503 0.105 0.392'
                    data-visibility-attribute='visible'
                  >
                    ЦПУ
                  </button>
                  <button
                    data-models="<model-viewer
          loading='eager'
        className='smallform3d'
        style='width:500px;height:600px;border-radius:38px;'
      src='/assets/models/pc/GPU.glb'
      ar
      ar-modes='webxr scene-viewer quick-look'
      camera-controls
      tone-mapping='commerce'
      poster='/assets/models/pc/GPU.webp'
      shadow-intensity='1'
      camera-orbit='32.49deg 80.66deg 0.2438m'
      field-of-view='30deg'
      auto-rotate
    ></model-viewer>"
                    data-title='Видеокарта'
                    data-disc='Графический процессор (GPU) — это электронная схема, которая может выполнять математические вычисления с высокой скоростью. Вычислительные задачи, такие как рендеринг графики, машинное обучение и редактирование видео, требуют применения сходных математических операций к большому набору данных.'
                    onClick={openModal}
                    className='Hotspot'
                    slot='hotspot-4'
                    data-surface='768 0 65 152 73 0.380 0.465 0.155'
                    data-visibility-attribute='visible'
                  >
                    Видеокарта
                  </button>
                  <button
                    data-models="<model-viewer
          loading='eager'
        className='smallform3d'
        style='width:500px;height:600px;border-radius:38px;'
      src='/assets/models/pc/PSU.glb'
      ar
      ar-modes='webxr scene-viewer quick-look'
      camera-controls
      tone-mapping='commerce'
      poster='/assets/models/pc/PSU.webp'
      shadow-intensity='1'
      camera-orbit='584.7deg 71.22deg 12.63m'
      field-of-view='30deg'
      auto-rotate
    ></model-viewer>"
                    data-title='Блок питания'
                    data-disc='Блок питания (он же БП) – источник питания в системном блоке, который отвечает за обеспечение энергией остальных компонентов. От БП во многом зависит долговечность и стабильность работы всей системы. Помимо этого, компьютерный блок питания препятствует потере информации с персонального компьютера, предотвращая скачки энергии.'
                    onClick={openModal}
                    className='Hotspot'
                    slot='hotspot-6'
                    data-surface='1082 0 1317 1390 1320 0.498 0.138 0.363'
                    data-visibility-attribute='visible'
                  >
                    Блок Питания
                  </button>
                  <button
                    data-models="<model-viewer
          loading='eager'
        className='smallform3d'
        style='width:500px;height:600px;border-radius:38px;'
      src='/assets/models/pc/waterCooling.glb'
      ar
      ar-modes='webxr scene-viewer quick-look'
      camera-controls
      tone-mapping='commerce'
      poster='/assets/models/pc/waterCooling.webp'
      shadow-intensity='1'
      camera-orbit='421.1deg 65.17deg 11.49m'
      field-of-view='30deg'
      auto-rotate
    ></model-viewer>"
                    data-title='Водянка'
                    data-disc='Жидкостное охлаждение — лучший способ охладить процессор, потому что вода передает тепло намного эффективнее, чем воздух. Кроме того, системы водяного охлаждения делают работу компьютера тише, избавляя вас от шелеста вентиляторов, которые при серьезной нагрузке начинают работать на высоких оборотах и шуметь. В то же время СВО менее безопасны: например, если трубки для прогона жидкости плохо соединены фитингами — капли воды могут попасть на компонентную базу системной платы и вызвать замыкание.'
                    onClick={openModal}
                    className='Hotspot'
                    slot='hotspot-7'
                    data-surface='1050 0 53 57 134 0.058 0.285 0.658'
                    data-visibility-attribute='visible'
                  >
                    Водяное охлаждение
                  </button>
                  <button
                    data-models="<model-viewer
            loading='eager'
          className='smallform3d'
          style='width:500px;height:600px;border-radius:38px;'
        src='/assets/models/pc/motherBoard.glb'
        ar
        ar-modes='webxr scene-viewer quick-look'
        camera-controls
        tone-mapping='commerce'
        poster='/assets/models/pc/motherBoard.webp'
        shadow-intensity='1'
        camera-orbit='32.49deg 80.66deg 0.2438m'
        field-of-view='30deg'
        auto-rotate
      ></model-viewer>"
                    data-title='Материнская плата'
                    data-disc='Материнская (системная) плата — это основа построения модульного электронного устройства, например компьютера. Она содержит основную часть устройства, например в случае компьютера — процессор, системную шину или шины, оперативную память, «встроенные» контроллеры периферийных устройств, сервисную логику — и разъёмы для подключения дополнительных взаимозаменяемых плат, называемых платами расширений.'
                    onClick={openModal}
                    className='Hotspot'
                    slot='hotspot-9'
                    data-surface='207 0 1464 1129 1247 0.029 0.299 0.672'
                    data-visibility-attribute='visible'
                  >
                    Материнская Плата
                  </button>
                  <button
                    data-models="<model-viewer
          loading='eager'
        className='smallform3d'
        style='width:500px;height:600px;border-radius:38px;'
      src='/assets/models/pc/case.glb'
      ar
      ar-modes='webxr scene-viewer quick-look'
      camera-controls
      tone-mapping='commerce'
      poster='/assets/models/pc/case.webp'
      shadow-intensity='1'
      camera-orbit='418.1deg 65.93deg 0.5611m'
      field-of-view='30deg'
      auto-rotate
    ></model-viewer>"
                    data-title='Корпус'
                    data-disc='Компьютерный корпус (системный блок, системник, computer case) служит защитной внешней оболочкой и одновременно каркасом (шасси), к которому крепятся все остальные компоненты компьютера. Фактически это то же самое, что и панцирь для черепахи. Кроме того, корпус участвует в охлаждении остальных комплектующих компьютера, а так же экранирует (если он из металла) электромагнитное излучение остальных компонентов аппаратного обеспечения.'
                    onClick={openModal}
                    className='Hotspot'
                    slot='hotspot-11'
                    data-surface='708 0 2884 36 967 0.086 0.432 0.482'
                    data-visibility-attribute='visible'
                  >
                    Системный блок
                  </button>
                  <button
                    data-models="<model-viewer
          loading='eager'
        className='smallform3d'
        style='width:500px;height:600px;border-radius:38px;'
      src='/assets/models/pc/M2.glb'
      ar
      ar-modes='webxr scene-viewer quick-look'
      camera-controls
      tone-mapping='commerce'
      poster='/assets/models/pc/ssdm2.webp'
      shadow-intensity='1'
      camera-orbit='77.44deg 56.11deg 4.906m'
      field-of-view='25deg'
      auto-rotate
    ></model-viewer>"
                    data-title='SSD M.2'
                    data-disc='SSD M.2 обеспечивает значительно более высокую скорость передачи данных по сравнению с SSD SATA. Это связано с тем, что SSD M.2 подключается напрямую к материнской плате через интерфейс PCI Express (PCIe) или Serial ATA (SATA), в то время как SSD SATA подключается через интерфейс SATA.'
                    onClick={openModal}
                    className='Hotspot'
                    slot='hotspot-12'
                    data-surface='668 0 2 14 11 0.493 0.463 0.044'
                    data-visibility-attribute='visible'
                  >
                    SSD
                  </button>
                  <button
                    data-models="<model-viewer
            loading='eager'
          className='smallform3d'
          style='width:500px;height:600px;border-radius:38px;'
        src='/assets/models/pc/radiator.glb'
        ar
        ar-modes='webxr scene-viewer quick-look'
        camera-controls
        tone-mapping='commerce'
        poster='/assets/models/pc/radiator.webp'
        shadow-intensity='1'
        camera-orbit='394.7deg 72.35deg 4.718m'
        field-of-view='30deg'
        auto-rotate
      ></model-viewer>"
                    data-title='Воздушка'
                    data-disc='Воздушная система охлаждения - это самый простой вариант охлаждения — потоком воздуха. Внешнюю поверхность блока цилиндров двигателя с воздушной системой охлаждения делают специальной формы — с ребрами. Так увеличивают площадь поверхности, с которой отводится тепло. Двигатель охлаждается за счет естественной конвекции — потока воздуха, который нагревается при контакте с ребрами и поднимается вверх, уступая место холодному, или за счет набегающего потока воздуха при движении.'
                    onClick={openModal}
                    className='Hotspot'
                    slot='hotspot-13'
                    data-surface='998 0 366 215 371 0.064 0.850 0.086'
                    data-visibility-attribute='visible'
                  >
                    Воздушное охлаждение
                  </button>
                  <button slot='ar-button' id='ar-button'>
                    View in your space
                  </button>
                </model-viewer>
              </div>
              <Link to='/' className='GoBack'>
                <h3 className='h3'>К проектам</h3>
              </Link>
            </>
          }
        />
        <Route
          path='/car'
          element={
            <>
              <div
                className='form3d'
                style={{ display: 'flex', marginTop: 100, marginBottom: 50 }}
              >
                <model-viewer
                  ref={modelViewer2}
                  id='modelscar'
                  className='modelscar'
                  style={{
                    width: 1100,
                    height: 800,
                    borderRadius: '38px 0 0 38px',
                  }}
                  src='/assets/models/car/car.glb'
                  ar
                  ar-modes='webxr scene-viewer quick-look'
                  camera-controls
                  poster='/assets/models/car/car.webp'
                  shadow-intensity='1'
                  exposure='0.8'
                  // auto-rotate
                  camera-orbit={cameraOrbit}
                  camera-target={cameraTarget}
                  field-of-view={cameraFov}
                >
                  <button
                    onClick={changeCam}
                    data-tab='engine'
                    // onShow
                    className='Hotspot'
                    id='hotspot-1'
                    slot='hotspot-1'
                    data-position='-0.0017432640324489667m 0.8183699835417795m 1.3979560123354162m'
                    data-normal='-0.010713029820749434m 0.9953146056976239m 0.09609405120528333m'
                    data-visibility-attribute='visible'
                    data-orbit='-0.3727deg 59.77deg 5.261m'
                    data-fov='12deg'
                    data-title='Двигатель'
                    data-desc='Двигатель — это механическая машина, которая преобразует энергию топлива в механическую энергию и приводит в движение транспортное средство. Для разных двигателей могут использоваться различные виды топлива (например, природный газ, бензин, дизельное топливо и т.д.). Двигатели используются во всем мире для различных автомобилей, мотоциклов, автобусов, кораблей, самолетов, железнодорожных поездов и т. д.'
                    data-img='/assets/models/car/dvig.png'
                  >
                    Двигатель
                  </button>
                  <button
                    onClick={changeCam}
                    data-tab='rul'
                    className='Hotspot'
                    slot='hotspot-2'
                    id='hotspot-2'
                    data-position='-0.4271322423377759m 0.8141278148018181m -0.02109609419316504m'
                    data-normal='-0.011410756603810392m 0.3109337354359672m -0.9503630920872109m'
                    data-visibility-attribute='visible'
                    data-orbit='222.4deg 72.48deg 5.261m'
                    data-fov='12deg'
                    data-title='Рулевое управление'
                    data-desc='Рулевое управление — совокупность механизмов автомобиля или другой колёсной машины (трактора, комбайна, строительной техники, боевых машин), а также шасси самолёта, обеспечивающая движение по заданному водителем направлению. Состоит из рулевого колеса, рулевого механизма и рулевого привода.'
                    data-img='/assets/models/car/dvig.png'
                  >
                    Рулевое управление
                  </button>
                  <button
                    data-tab='podveska'
                    onClick={changeCam}
                    className='Hotspot'
                    slot='hotspot-3'
                    id='hotspot-3'
                    data-position='0.53448420498753m 0.45093817154737925m -1.3063243590478146m'
                    data-normal='-0.6057783061584652m -0.6909737247718588m -0.3944463911137794m'
                    data-visibility-attribute='visible'
                    data-orbit='233.6deg 123.9deg 7.991m'
                    data-fov='12deg'
                    data-title='Подвеска'
                    data-desc='Подвеска автомобиля — совокупность устройств, обеспечивающих упругую связь между несущей системой и колёсами (или мостами) автомобиля, уменьшение динамических нагрузок на несущую систему и колёса и затухание их колебаний, а также регулирование положения кузова автомобиля во время движения. Свойства подвески конкретного автомобиля зависят от различных параметров (неподрессоренных масс автомобиля, кинематики подвески, колёсной базы, колеи, жёсткости кузова) и взаимодействия отдельных деталей (от типа и жёсткости упругих элементов, амортизаторов, стабилизаторов, шарниров, рычагов, и особенно от шин).'
                    data-img='/assets/models/car/dvig.png'
                  >
                    Подвеска
                  </button>
                  <button
                    onClick={changeCam}
                    data-tab='wheel'
                    className='Hotspot'
                    slot='hotspot-4'
                    id='hotspot-4'
                    data-position='-0.8480648099247934m 0.33435741330162855m 1.3670811985821523m'
                    data-normal='-0.9991475301225782m 0.03059796610184273m 0.02771240733647095m'
                    data-visibility-attribute='visible'
                    data-orbit='251.5deg 77.32deg 5.261m'
                    data-fov='12deg'
                    data-title='Колесо'
                    data-desc='
            Колесо — элемент ходовой части автомобиля, связывающий его с дорогой. Именно колеса предоставляют автомобилю возможность двигаться в заданном направлении. Колеса передают удары на элементы подвески. Ведущие колеса передают усилие от двигателя. Колесо конструктивно состоит из двух основных частей – шины и диска. Колесный диск. Колесный диск выполняет роль основы, на которую устанавливается шина. На диск передается усилие от вращения оси.'
                    data-img='/assets/models/car/dvig.png'
                  >
                    Колесо
                  </button>
                  <button
                    onClick={changeCam}
                    data-tab='ts'
                    className='Hotspot'
                    slot='hotspot-5'
                    id='hotspot-5'
                    data-position='-0.8148970007896423m 0.3551181250040389m -1.363451396048058m'
                    data-normal='-1m 0m 0m'
                    data-visibility-attribute='visible'
                    data-orbit='293.6deg 88.5deg 5.261m'
                    data-fov='12deg'
                    data-title='Тормозная система'
                    data-desc='Тормозная система автомобиля предназначена для замедления движущегося автомобиля вплоть до полной остановки и, при необходимости, удержания его на месте, например при парковке. В автомобилях используют разные виды тормозов, но физический принцип работы тормозов всегда един: они преобразуют энергию движения в тепло.'
                    data-img='/assets/models/car/dvig.png'
                  >
                    Тормозная система
                  </button>
                  <button
                    onClick={changeCam}
                    data-tab='trans'
                    className='Hotspot'
                    slot='hotspot-6'
                    id='hotspot-6'
                    data-position='-0.008162177111915359m 0.5950701697264106m -0.012376007290469603m'
                    data-normal='0.014603436670219481m 0.10542082397487057m -0.9943204662028629m'
                    data-visibility-attribute='visible'
                    data-orbit='-244.4deg 63.91deg 5.654m'
                    data-fov='12deg'
                    data-title='Трансмиссия'
                    data-desc='Трансмиссия — один из важнейших элементов транспортного средства. Чаще всего под ней понимают определенный тип коробки переключения передач, но в самом широком смысле — это набор механизмов. Ее конструкция тесно связана с изначальной компоновкой транспортного средства, то есть как расположен двигатель и ведущие колеса относительно друг друга. У переднеприводных авто двигатель и трансмиссия это по сути единый узел под капотом. При заднеприводной компоновке двигатель спереди, а ведущие колеса — задние.'
                    data-img='/assets/models/car/dvig.png'
                  >
                    Трансмиссия
                  </button>
                  <button
                    onClick={changeCam}
                    data-tab='kuzov'
                    className='Hotspot'
                    slot='hotspot-7'
                    id='hotspot-7'
                    data-position='0.6847879996954527m 0.9068931424221599m -1.3433404753521008m'
                    data-normal='0.2916569434605815m 0.9534812026888208m -0.07622219788428657m'
                    data-visibility-attribute='visible'
                    data-orbit='142.7deg 73.19deg 7.991m'
                    data-fov='13.71deg'
                    data-title='Кузов'
                    data-desc='Несущая система - основа автомобиля, к которому крепятся все агрегаты автомобиля и который воспринимает все виды нагрузок. Несущая система автомобиля является его основанием, на котором устанавливаются все элементы автомобиля. В качестве несущей системы могут выступать как рама автомобиля, так и его кузов, который в этом случае называют несущим. Если несущей системой является рама, то дополнительно на неё устанавливается кузов или кабина для размещения водителя, пассажиров и грузов.'
                    data-img='/assets/models/car/dvig.png'
                  >
                    Несущая система, т.е. кузов или рама
                  </button>
                  <button slot='ar-button' id='ar-button'>
                    View in your space
                  </button>
                </model-viewer>
                <div
                  style={{
                    padding: 20,
                    backgroundColor: '#eee',
                    borderRadius: '0 38px 38px 0',
                  }}
                >
                  <ul style={{ overflowY: 'scroll', height: 800 }}>
                    <li
                      className='panel__el'
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: 400,
                      }}
                    >
                      <h3
                        className='h3 panel__h3'
                        style={{
                          padding: 10,
                          border: '1px solid black',
                          borderRadius: '5px',
                          backgroundColor: '#ddd',
                        }}
                        data-tab='engine'
                        onClick={changeCam}
                        data-orbit='-0.3727deg 59.77deg 5.261m'
                        data-fov='12deg'
                        data-position='-0.0017432640324489667m 0.8183699835417795m 1.3979560123354162m'
                      >
                        Двигатель
                      </h3>
                      <div
                        className={
                          activeTab === 'engine'
                            ? 'animation'
                            : 'hide animation'
                        }
                        // isActive={activeIndex === 0}
                        // onShow={() => setActiveIndex(0)}
                      >
                        <div
                          style={{
                            position: 'relative',
                            left: '50%',
                            width: 1,
                            height: 16,
                            backgroundColor: 'black',
                            alignSelf: 'center',
                            marginTop: 5,
                          }}
                        ></div>
                        <p
                          style={{
                            maxWidth: 400,
                            padding: 8,
                            marginTop: 6,
                            fontSize: 13,
                            border: '1px solid rgba(161, 161, 161)',
                            borderRadius: '4px',
                            backgroundColor: '#f9f9f9',
                          }}
                        >
                          Двигатель — это механическая машина, которая
                          преобразует энергию топлива в механическую энергию и
                          приводит в движение транспортное средство. Для разных
                          двигателей могут использоваться различные виды топлива
                          (например, природный газ, бензин, дизельное топливо и
                          т.д.). Двигатели используются во всем мире для
                          различных автомобилей, мотоциклов, автобусов,
                          кораблей, самолетов, железнодорожных поездов и т. д.
                        </p>
                      </div>
                    </li>
                    <li
                      className='panel__el'
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: 400,
                      }}
                    >
                      <h3
                        className='h3 panel__h3'
                        style={{
                          padding: 10,
                          border: '1px solid black',
                          borderRadius: '5px',
                          backgroundColor: '#ddd',
                          marginTop: 20,
                        }}
                        data-tab='wheel'
                        onClick={changeCam}
                        data-position='-0.8480648099247934m 0.33435741330162855m 1.3670811985821523m'
                        data-orbit='251.5deg 77.32deg 5.261m'
                        data-fov='12deg'
                      >
                        Колесо
                      </h3>
                      <div
                        className={
                          activeTab === 'wheel' ? 'animation' : 'hide animation'
                        }
                        // isActive={activeIndex === 0}
                        // onShow={() => setActiveIndex(0)}
                      >
                        <div
                          style={{
                            position: 'relative',
                            left: '50%',
                            width: 1,
                            height: 16,
                            backgroundColor: 'black',
                            alignSelf: 'center',
                            marginTop: 5,
                          }}
                        ></div>
                        <p
                          style={{
                            maxWidth: 400,
                            padding: 8,
                            marginTop: 6,
                            fontSize: 13,
                            border: '1px solid rgba(161, 161, 161)',
                            borderRadius: '4px',
                            backgroundColor: '#f9f9f9',
                          }}
                        >
                          Колесо — элемент ходовой части автомобиля, связывающий
                          его с дорогой. Именно колеса предоставляют автомобилю
                          возможность двигаться в заданном направлении. Колеса
                          передают удары на элементы подвески. Ведущие колеса
                          передают усилие от двигателя. Колесо конструктивно
                          состоит из двух основных частей – шины и диска.
                          Колесный диск. Колесный диск выполняет роль основы, на
                          которую устанавливается шина. На диск передается
                          усилие от вращения оси.
                        </p>
                      </div>
                    </li>
                    <li
                      className='panel__el'
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: 400,
                      }}
                    >
                      <h3
                        className='h3 panel__h3'
                        style={{
                          padding: 10,
                          border: '1px solid black',
                          borderRadius: '5px',
                          backgroundColor: '#ddd',
                          marginTop: 20,
                        }}
                        data-tab='rul'
                        onClick={changeCam}
                        data-position='-0.4271322423377759m 0.8141278148018181m -0.02109609419316504m'
                        data-orbit='222.4deg 72.48deg 5.261m'
                        data-fov='12deg'
                      >
                        Рулевое управление
                      </h3>
                      <div
                        className={
                          activeTab === 'rul' ? 'animation' : 'hide animation'
                        }
                        // isActive={activeIndex === 0}
                        // onShow={() => setActiveIndex(0)}
                      >
                        <div
                          style={{
                            position: 'relative',
                            left: '50%',
                            width: 1,
                            height: 16,
                            backgroundColor: 'black',
                            alignSelf: 'center',
                            marginTop: 5,
                          }}
                        ></div>
                        <p
                          style={{
                            maxWidth: 400,
                            padding: 8,
                            marginTop: 6,
                            fontSize: 13,
                            border: '1px solid rgba(161, 161, 161)',
                            borderRadius: '4px',
                            backgroundColor: '#f9f9f9',
                          }}
                        >
                          Рулевое управление — совокупность механизмов
                          автомобиля или другой колёсной машины (трактора,
                          комбайна, строительной техники, боевых машин), а также
                          шасси самолёта, обеспечивающая движение по заданному
                          водителем направлению. Состоит из рулевого колеса,
                          рулевого механизма и рулевого привода.
                        </p>
                      </div>
                    </li>
                    <li
                      className='panel__el'
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: 400,
                      }}
                    >
                      <h3
                        className='h3 panel__h3'
                        style={{
                          padding: 10,
                          border: '1px solid black',
                          borderRadius: '5px',
                          backgroundColor: '#ddd',
                          marginTop: 20,
                        }}
                        data-tab='trans'
                        onClick={changeCam}
                        data-position='-0.008162177111915359m 0.5950701697264106m -0.012376007290469603m'
                        data-orbit='-244.4deg 63.91deg 5.654m'
                        data-fov='12deg'
                      >
                        Трансмиссия
                      </h3>
                      <div
                        className={
                          activeTab === 'trans' ? 'animation' : 'hide animation'
                        }
                        // isActive={activeIndex === 0}
                        // onShow={() => setActiveIndex(0)}
                      >
                        <div
                          style={{
                            position: 'relative',
                            left: '50%',
                            width: 1,
                            height: 16,
                            backgroundColor: 'black',
                            alignSelf: 'center',
                            marginTop: 5,
                          }}
                        ></div>
                        <p
                          style={{
                            maxWidth: 400,
                            padding: 8,
                            marginTop: 6,
                            fontSize: 13,
                            border: '1px solid rgba(161, 161, 161)',
                            borderRadius: '4px',
                            backgroundColor: '#f9f9f9',
                          }}
                        >
                          Трансмиссия — один из важнейших элементов
                          транспортного средства. Чаще всего под ней понимают
                          определенный тип коробки переключения передач, но в
                          самом широком смысле — это набор механизмов. Ее
                          конструкция тесно связана с изначальной компоновкой
                          транспортного средства, то есть как расположен
                          двигатель и ведущие колеса относительно друг друга. У
                          переднеприводных авто двигатель и трансмиссия это по
                          сути единый узел под капотом. При заднеприводной
                          компоновке двигатель спереди, а ведущие колеса —
                          задние.
                        </p>
                      </div>
                    </li>
                    <li
                      className='panel__el'
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: 400,
                      }}
                    >
                      <h3
                        className='h3 panel__h3'
                        style={{
                          padding: 10,
                          border: '1px solid black',
                          borderRadius: '5px',
                          backgroundColor: '#ddd',
                          marginTop: 20,
                        }}
                        data-tab='kuzov'
                        onClick={changeCam}
                        data-position='0.6847879996954527m 0.9068931424221599m -1.3433404753521008m'
                        data-orbit='142.7deg 73.19deg 7.991m'
                        data-fov='13.71deg'
                      >
                        Кузов
                      </h3>
                      <div
                        className={
                          activeTab === 'kuzov' ? 'animation' : 'hide animation'
                        }
                        // isActive={activeIndex === 0}
                        // onShow={() => setActiveIndex(0)}
                      >
                        <div
                          style={{
                            position: 'relative',
                            left: '50%',
                            width: 1,
                            height: 16,
                            backgroundColor: 'black',
                            alignSelf: 'center',
                            marginTop: 5,
                          }}
                        ></div>
                        <p
                          style={{
                            maxWidth: 400,
                            padding: 8,
                            marginTop: 6,
                            fontSize: 13,
                            border: '1px solid rgba(161, 161, 161)',
                            borderRadius: '4px',
                            backgroundColor: '#f9f9f9',
                          }}
                        >
                          Несущая система - основа автомобиля, к которому
                          крепятся все агрегаты автомобиля и который
                          воспринимает все виды нагрузок. Несущая система
                          автомобиля является его основанием, на котором
                          устанавливаются все элементы автомобиля. В качестве
                          несущей системы могут выступать как рама автомобиля,
                          так и его кузов, который в этом случае называют
                          несущим. Если несущей системой является рама, то
                          дополнительно на неё устанавливается кузов или кабина
                          для размещения водителя, пассажиров и грузов.
                        </p>
                      </div>
                    </li>
                    <li
                      className='panel__el'
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: 400,
                      }}
                    >
                      <h3
                        className='h3 panel__h3'
                        style={{
                          padding: 10,
                          border: '1px solid black',
                          borderRadius: '5px',
                          backgroundColor: '#ddd',
                          marginTop: 20,
                        }}
                        data-tab='ts'
                        onClick={changeCam}
                        data-position='-0.8148970007896423m 0.3551181250040389m -1.363451396048058m'
                        data-orbit='293.6deg 88.5deg 5.261m'
                        data-fov='12deg'
                      >
                        Тормозная система
                      </h3>
                      <div
                        className={
                          activeTab === 'ts' ? 'animation' : 'hide animation'
                        }
                        // isActive={activeIndex === 0}
                        // onShow={() => setActiveIndex(0)}
                      >
                        <div
                          style={{
                            position: 'relative',
                            left: '50%',
                            width: 1,
                            height: 16,
                            backgroundColor: 'black',
                            alignSelf: 'center',
                            marginTop: 5,
                          }}
                        ></div>
                        <p
                          style={{
                            maxWidth: 400,
                            padding: 8,
                            marginTop: 6,
                            fontSize: 13,
                            border: '1px solid rgba(161, 161, 161)',
                            borderRadius: '4px',
                            backgroundColor: '#f9f9f9',
                          }}
                        >
                          Тормозная система автомобиля предназначена для
                          замедления движущегося автомобиля вплоть до полной
                          остановки и, при необходимости, удержания его на
                          месте, например при парковке. В автомобилях используют
                          разные виды тормозов, но физический принцип работы
                          тормозов всегда един: они преобразуют энергию движения
                          в тепло.
                        </p>
                      </div>
                    </li>
                    <li
                      className='panel__el'
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: 400,
                      }}
                    >
                      <h3
                        className='h3 panel__h3'
                        style={{
                          padding: 10,
                          border: '1px solid black',
                          borderRadius: '5px',
                          backgroundColor: '#ddd',
                          marginTop: 20,
                        }}
                        data-tab='podveska'
                        onClick={changeCam}
                        data-position='0.53448420498753m 0.45093817154737925m -1.3063243590478146m'
                        data-orbit='233.6deg 123.9deg 7.991m'
                        data-fov='12deg'
                      >
                        Подвеска
                      </h3>
                      <div
                        className={
                          activeTab === 'podveska'
                            ? 'animation'
                            : 'hide animation'
                        }
                        // isActive={activeIndex === 0}
                        // onShow={() => setActiveIndex(0)}
                      >
                        <div
                          style={{
                            position: 'relative',
                            left: '50%',
                            width: 1,
                            height: 16,
                            backgroundColor: 'black',
                            alignSelf: 'center',
                            marginTop: 5,
                          }}
                        ></div>
                        <p
                          style={{
                            maxWidth: 400,
                            padding: 8,
                            marginTop: 6,
                            fontSize: 13,
                            border: '1px solid rgba(161, 161, 161)',
                            borderRadius: '4px',
                            backgroundColor: '#f9f9f9',
                          }}
                        >
                          Подвеска автомобиля — совокупность устройств,
                          обеспечивающих упругую связь между несущей системой и
                          колёсами (или мостами) автомобиля, уменьшение
                          динамических нагрузок на несущую систему и колёса и
                          затухание их колебаний, а также регулирование
                          положения кузова автомобиля во время движения.
                          Свойства подвески конкретного автомобиля зависят от
                          различных параметров (неподрессоренных масс
                          автомобиля, кинематики подвески, колёсной базы, колеи,
                          жёсткости кузова) и взаимодействия отдельных деталей
                          (от типа и жёсткости упругих элементов, амортизаторов,
                          стабилизаторов, шарниров, рычагов, и особенно от шин).
                        </p>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <Link to='/' className='GoBack'>
                <h3 className='h3'>К проектам</h3>
              </Link>
            </>
          }
        />
        <Route
          path='/plane'
          element={
            <>
              <div className='form3d'>
                <model-viewer
                  style={{ width: 1100, height: 800, borderRadius: 38 }}
                  src='/assets/models/plane/plane3d.glb'
                  ar
                  ar-modes='webxr scene-viewer quick-look'
                  camera-controls
                  tone-mapping='commerce'
                  poster='/assets/models/plane/plane3d.webp'
                  shadow-intensity='1'
                  camera-orbit='200deg 73.82deg 1.485m'
                  field-of-view='30deg'
                >
                  <button
                    className='Hotspot'
                    slot='hotspot-1'
                    data-position='-0.07377009492306269m -0.05625971145866452m 0.0066937693014066935m'
                    data-normal='0m -0.005618033029430497m -0.9999842187279159m'
                    data-visibility-attribute='visible'
                  >
                    Шасси
                  </button>
                  <button
                    className='Hotspot'
                    slot='hotspot-2'
                    data-position='0.09828737087521056m 0.024687464212839766m 0.311938939874637m'
                    data-normal='-0.0009001244441525913m 0.9994168810649938m 0.034133379825401586m'
                    data-visibility-attribute='visible'
                  >
                    Системы управления полётом самолёта
                  </button>
                  <button
                    style={{
                      maxWidth: 370,
                    }}
                    className='Hotspot'
                    slot='hotspot-3'
                    data-position='0.02977480452722242m -0.030387603254379662m -0.047691889707447255m'
                    data-normal='0.0912269180223583m -0.995830130809527m 1.502312537554795e-7m'
                    data-visibility-attribute='visible'
                  >
                    Система силовой установки самолёта для размещения топлива
                  </button>
                  <div className='progress-bar hide' slot='progress-bar'>
                    <div className='update-bar'></div>
                  </div>
                  <button slot='ar-button' id='ar-button'>
                    View in your space
                  </button>
                </model-viewer>
              </div>
              <Link to='/' className='GoBack'>
                <h3 className='h3'>К проектам</h3>
              </Link>
            </>
          }
        ></Route>
        <Route
          path='/human'
          element={
            <>
              <div
                className='form3d'
                style={{ marginTop: 100, marginBottom: 50 }}
              >
                <model-viewer
                  id='modelshuman'
                  className='modelshuman'
                  style={{ width: 1100, height: 800, borderRadius: 38 }}
                  src='/assets/models/human/chelovek.glb'
                  ar
                  ar-modes='webxr scene-viewer quick-look'
                  camera-controls
                  poster='/assets/models/human/chelovek.webp'
                  shadow-intensity='1'
                  // auto-rotate
                  camera-orbit='37.39deg 71.99deg 5m'
                  field-of-view='30deg'
                  exposure='1.3'
                  tone-mapping='commerce'
                >
                  <button
                    className='Hotspot'
                    slot='hotspot-1'
                    data-position='0.16513825555101794m -0.4449907698349196m -0.00135276831718803m'
                    data-normal='0.7808282752679202m 0.010624848158140084m 0.6246553586928889m'
                    data-visibility-attribute='visible'
                    data-models="<model-viewer
                    loading='eager'
                    className='smallform3d'
                    style='width:500px;height:600px;border-radius:38px;'
                  src='/assets/models/human/bones.glb'
                                    ar
                                    ar-modes='webxr scene-viewer quick-look'
                                    camera-controls
                                    tone-mapping='commerce'
                                    shadow-intensity='1'
                                    camera-orbit='17.24deg 74.61deg 28.41m'
                                    field-of-view='30deg'
                                    auto-rotate
                                    poster='/assets/models/human/bones.webp'
                                  ></model-viewer>"
                    data-title='Скелет'
                    data-disc='Скелет человека — совокупность костей человеческого организма, пассивная часть опорно-двигательного аппарата. Служит опорой мягким тканям, точкой приложения мышц, вместилищем и защитой внутренних органов.'
                    onClick={openModal}
                  >
                    Скелет
                  </button>
                  <button
                    className='Hotspot'
                    slot='hotspot-2'
                    data-position='0.045776994457783465m 0.7880084526038269m 0.0027966540702434595m'
                    data-normal='0.6306679074728233m 0.7127425307455717m 0.3070115231554808m'
                    data-visibility-attribute='visible'
                    data-models="<model-viewer
                    loading='eager'
                    className='smallform3d'
                    style='width:500px;height:600px;border-radius:38px;'
                  src='/assets/models/human/brain.glb'
                                    ar
                                    ar-modes='webxr scene-viewer quick-look'
                                    camera-controls
                                    tone-mapping='commerce'
                                    shadow-intensity='1'
                                    camera-orbit='17.24deg 74.61deg 28.41m'
                                    field-of-view='30deg'
                                    auto-rotate
                                    poster='/assets/models/human/brain.webp'
                                  ></model-viewer>"
                    data-title='Мозг'
                    data-disc='Головной мозг человека — орган центральной нервной системы, состоящей из множества взаимосвязанных между собой нервных клеток и их отростков. Головной мозг человека занимает почти всю полость мозгового отдела черепа, кости которого защищают головной мозг от внешних механических повреждений.'
                    onClick={openModal}
                  >
                    Мозг
                  </button>
                  <button
                    className='Hotspot'
                    slot='hotspot-3'
                    data-position='-0.05815729738761436m 0.16683299379509067m -0.13875224126325594m'
                    data-normal='-0.0986855009242085m -0.43358557629848443m -0.8956923132042887m'
                    data-visibility-attribute='visible'
                    data-models="<model-viewer
                    loading='eager'
                    className='smallform3d'
                    style='width:500px;height:600px;border-radius:38px;'
                  src='/assets/models/human/bud.glb'
                                    ar
                                    ar-modes='webxr scene-viewer quick-look'
                                    camera-controls
                                    tone-mapping='commerce'
                                    shadow-intensity='1'
                                    camera-orbit='17.24deg 74.61deg 28.41m'
                                    field-of-view='30deg'
                                    auto-rotate
                                    poster='/assets/models/human/bud.webp'
                                  ></model-viewer>"
                    data-title='Почка'
                    data-disc='Почка — парный орган выделительной системы позвоночных, который поддерживает баланс воды и электролитов в организме, фильтрует кровь, выводит продукты метаболизма, у многих позвоночных также вырабатывает гормоны (в частности, ренин), участвует в синтезе или метаболизме отдельных витаминов и поддерживает кровяное давление.'
                    onClick={openModal}
                  >
                    Правая почка
                  </button>
                  <button
                    className='Hotspot'
                    slot='hotspot-4'
                    data-position='0.0383653140154169m 0.36214984165569897m 0.052345548399569064m'
                    data-normal='-0.18977502478652025m 0.22149671545203317m 0.95651693399084m'
                    data-visibility-attribute='visible'
                    data-models="<model-viewer
                    loading='eager'
                    className='smallform3d'
                    style='width:500px;height:600px;border-radius:38px;'
                  src='/assets/models/human/heart.glb'
                                    ar
                                    ar-modes='webxr scene-viewer quick-look'
                                    camera-controls
                                    tone-mapping='commerce'
                                    shadow-intensity='1'
                                    camera-orbit='17.24deg 74.61deg 28.41m'
                                    field-of-view='30deg'
                                    auto-rotate
                                    poster='/assets/models/human/heart.webp'
                                  ></model-viewer>"
                    data-title='Сердце'
                    data-disc='Сердце человека — это своеобразный насос, который обеспечивает постоянное и непрерывное движение крови по сосудам в нужном направлении. Двустворчатый и трёхстворчатый клапаны обеспечивают ток крови в одном направлении — из предсердий в желудочки.'
                    onClick={openModal}
                  >
                    Сердце
                  </button>
                  <button
                    className='Hotspot'
                    slot='hotspot-10'
                    data-position='-0.02708023380011726m 0.705446783689814m 0.028028842886098637m'
                    data-normal='-0.10483951168826751m 0.6665163049557039m 0.7380817651298268m'
                    data-visibility-attribute='visible'
                    data-models="<model-viewer
                    loading='eager'
                    className='smallform3d'
                    style='width:500px;height:600px;border-radius:38px;'
                  src='/assets/models/human/eye.glb'
                                    ar
                                    ar-modes='webxr scene-viewer quick-look'
                                    camera-controls
                                    tone-mapping='commerce'
                                    shadow-intensity='1'
                                    camera-orbit='17.24deg 74.61deg 28.41m'
                                    field-of-view='30deg'  
                                    auto-rotate
                                    poster='/assets/models/human/eye.webp'
                                  ></model-viewer>"
                    data-title='Глаз'
                    data-disc='Глаз — сенсорный орган (орган зрительной системы) человека, обладающий способностью воспринимать электромагнитное излучение в видимом диапазоне длин волн и обеспечивающий функцию зрения. У человека через глаз поступает около 90 % информации из окружающего мира.'
                    onClick={openModal}
                  >
                    Глаз
                  </button>
                  <button
                    className='Hotspot'
                    slot='hotspot-5'
                    data-position='-0.05681393147857536m 0.242493471754321m 0.057443865987130374m'
                    data-normal='-0.35121557071919957m 0.026260215221931248m 0.9359262919594069m'
                    data-visibility-attribute='visible'
                    data-models="<model-viewer
                    loading='eager'
                    className='smallform3d'
                    style='width:500px;height:600px;border-radius:38px;'
                  src='/assets/models/human/liver.glb'
                                    ar
                                    ar-modes='webxr scene-viewer quick-look'
                                    camera-controls
                                    tone-mapping='commerce'
                                    shadow-intensity='1'
                                    camera-orbit='17.24deg 74.61deg 28.41m'
                                    field-of-view='30deg'
                                    auto-rotate
                                    poster='/assets/models/human/liver.webp'
                                  ></model-viewer>"
                    data-title='Печень'
                    data-disc='Печень — самый большой внутренний орган человека. Она находится справа в полости живота под диафрагмой (в правом подреберье) и очень редко печень может находится слева. Печень — непарный орган, то есть второго такого органа в организме нет, и нарушение функции печени опасно для жизни.'
                    onClick={openModal}
                  >
                    Печень
                  </button>
                  <button
                    className='Hotspot'
                    slot='hotspot-6'
                    data-position='-0.0604089183176897m 0.4047845086910014m 0.034161480060886096m'
                    data-normal='-0.09111785143769503m 0.46803378212924174m 0.8790005210096157m'
                    data-visibility-attribute='visible'
                    data-models="<model-viewer
                    loading='eager'
                    className='smallform3d'
                    style='width:500px;height:600px;border-radius:38px;'
                  src='/assets/models/human/lungs.glb'
                                    ar
                                    ar-modes='webxr scene-viewer quick-look'
                                    camera-controls
                                    tone-mapping='commerce'
                                    shadow-intensity='1'
                                    camera-orbit='17.24deg 74.61deg 28.41m'
                                    field-of-view='30deg'
                                    auto-rotate
                                    poster='/assets/models/human/lungs.webp'
                                  ></model-viewer>"
                    data-title='Легкие'
                    data-disc='Лёгкие выполняют жизненно важную функцию — снабжение организма человека кислородом. Они отвечают за газообмен между кровью и атмосферным воздухом. Лёгкие — это парный орган. Они находятся в грудной клетке рядом с сердцем и крупными кровеносными сосудами.'
                    onClick={openModal}
                  >
                    Легкие
                  </button>
                  <button
                    className='Hotspot'
                    slot='hotspot-7'
                    data-position='-0.32615172962916916m -0.03574148915920239m 0.09366410775728784m'
                    data-normal='-0.5939181014776903m 0.38076078218440595m 0.7087189255885971m'
                    data-visibility-attribute='visible'
                    data-models="<model-viewer
                    loading='eager'
                    className='smallform3d'
                    style='width:500px;height:600px;border-radius:38px;'
                  src='/assets/models/human/skin.glb'
                                    ar
                                    ar-modes='webxr scene-viewer quick-look'
                                    camera-controls
                                    tone-mapping='commerce'
                                    shadow-intensity='1'
                                    camera-orbit='212.3deg 76.57deg 0.3826m' field-of-view='30deg'
                                    auto-rotate
                                    poster='/assets/models/human/skin.webp'
                                  ></model-viewer>"
                    data-title='Кожа'
                    data-disc='Кожа - самый большой орган, который защищает нас от негативного воздействия окружающей среды и нуждается в постоянном и тщательном уходе. Кожа состоит из трех основных слоев - эпидермиса, дермы и подкожной жировой клетчатки. Внешний вид нашей кожи определяется, главным образом, двумя ее слоями - дермой и эпидермисом.'
                    onClick={openModal}
                  >
                    Кожа
                  </button>
                  <button slot='ar-button' id='ar-button'>
                    View in your space
                  </button>
                </model-viewer>
              </div>
              <Link to='/' className='GoBack'>
                <h3 className='h3'>К проектам</h3>
              </Link>
            </>
          }
        />

        {/* <div
        className='form3d'
        style={{ display: 'flex', marginTop: 100, marginBottom: 50 }}
      >
        <model-viewer
          // ref={modelViewer2}
          id='modelscar'
          className='modelscar'
          style={{ width: 1100, height: 800, borderRadius: '38px 0 0 38px' }}
          src='/assets/models/car/car.glb'
          ar
          ar-modes='webxr scene-viewer quick-look'
          camera-controls
          poster='/assets/models/car/car.webp'
          shadow-intensity='1'
          exposure='0.8'
          // auto-rotate
          camera-orbit={cameraOrbit}
          camera-target={cameraTarget}
          field-of-view={cameraFov}
        >
          <button
            onClick={changeCam}
            // onShow
            className='Hotspot'
            id='hotspot-1'
            slot='hotspot-1'
            data-position='-0.0017432640324489667m 0.8183699835417795m 1.3979560123354162m'
            data-normal='-0.010713029820749434m 0.9953146056976239m 0.09609405120528333m'
            data-visibility-attribute='visible'
            data-orbit='-0.3727deg 59.77deg 5.261m'
            data-fov='12deg'
            data-title='Двигатель'
            data-desc='Двигатель — это механическая машина, которая преобразует энергию топлива в механическую энергию и приводит в движение транспортное средство. Для разных двигателей могут использоваться различные виды топлива (например, природный газ, бензин, дизельное топливо и т.д.). Двигатели используются во всем мире для различных автомобилей, мотоциклов, автобусов, кораблей, самолетов, железнодорожных поездов и т. д.'
            data-img='/assets/models/car/dvig.png'
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
            data-title='Рулевое управление'
            data-desc='Рулевое управление — совокупность механизмов автомобиля или другой колёсной машины (трактора, комбайна, строительной техники, боевых машин), а также шасси самолёта, обеспечивающая движение по заданному водителем направлению. Состоит из рулевого колеса, рулевого механизма и рулевого привода.'
            data-img='/assets/models/car/dvig.png'
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
            data-title='Подвеска'
            data-desc='Подвеска автомобиля — совокупность устройств, обеспечивающих упругую связь между несущей системой и колёсами (или мостами) автомобиля, уменьшение динамических нагрузок на несущую систему и колёса и затухание их колебаний, а также регулирование положения кузова автомобиля во время движения. Свойства подвески конкретного автомобиля зависят от различных параметров (неподрессоренных масс автомобиля, кинематики подвески, колёсной базы, колеи, жёсткости кузова) и взаимодействия отдельных деталей (от типа и жёсткости упругих элементов, амортизаторов, стабилизаторов, шарниров, рычагов, и особенно от шин).'
            data-img='/assets/models/car/dvig.png'
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
            data-title='Колесо'
            data-desc='
            Колесо — элемент ходовой части автомобиля, связывающий его с дорогой. Именно колеса предоставляют автомобилю возможность двигаться в заданном направлении. Колеса передают удары на элементы подвески. Ведущие колеса передают усилие от двигателя. Колесо конструктивно состоит из двух основных частей – шины и диска. Колесный диск. Колесный диск выполняет роль основы, на которую устанавливается шина. На диск передается усилие от вращения оси.'
            data-img='/assets/models/car/dvig.png'
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
            data-title='Тормозная система'
            data-desc='Тормозная система автомобиля предназначена для замедления движущегося автомобиля вплоть до полной остановки и, при необходимости, удержания его на месте, например при парковке. В автомобилях используют разные виды тормозов, но физический принцип работы тормозов всегда един: они преобразуют энергию движения в тепло.'
            data-img='/assets/models/car/dvig.png'
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
            data-title='Трансмиссия'
            data-desc='Трансмиссия — один из важнейших элементов транспортного средства. Чаще всего под ней понимают определенный тип коробки переключения передач, но в самом широком смысле — это набор механизмов. Ее конструкция тесно связана с изначальной компоновкой транспортного средства, то есть как расположен двигатель и ведущие колеса относительно друг друга. У переднеприводных авто двигатель и трансмиссия это по сути единый узел под капотом. При заднеприводной компоновке двигатель спереди, а ведущие колеса — задние.'
            data-img='/assets/models/car/dvig.png'
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
            data-title='Кузов'
            data-desc='Несущая система - основа автомобиля, к которому крепятся все агрегаты автомобиля и который воспринимает все виды нагрузок. Несущая система автомобиля является его основанием, на котором устанавливаются все элементы автомобиля. В качестве несущей системы могут выступать как рама автомобиля, так и его кузов, который в этом случае называют несущим. Если несущей системой является рама, то дополнительно на неё устанавливается кузов или кабина для размещения водителя, пассажиров и грузов.'
            data-img='/assets/models/car/dvig.png'
          >
            Несущая система, т.е. кузов или рама
          </button>
          <button slot='ar-button' id='ar-button'>
            View in your space
          </button>
        </model-viewer>
        <div
          style={{
            padding: 20,
            backgroundColor: '#eee',
            borderRadius: '0 38px 38px 0',
          }}
        >
          <ul style={{ overflowY: 'scroll', height: 800 }}>
            <li
              className='panel__el'
              style={{ display: 'flex', flexDirection: 'column', width: 400 }}
            >
              <h3
                className='h3 panel__h3'
                style={{
                  padding: 10,
                  border: '1px solid black',
                  borderRadius: '5px',
                  backgroundColor: '#ddd',
                }}
              >
                Двигатель
              </h3>
              <div
                style={{ flexDirection: 'column' }}
                // isActive={activeIndex === 0}
                // onShow={() => setActiveIndex(0)}
              >
                <div
                  style={{
                    position: 'relative',
                    left: '50%',
                    width: 1,
                    height: 16,
                    backgroundColor: 'black',
                    alignSelf: 'center',
                    marginTop: 5,
                  }}
                ></div>
                <p
                  style={{
                    maxWidth: 400,
                    padding: 8,
                    marginTop: 6,
                    fontSize: 13,
                    border: '1px solid rgba(161, 161, 161)',
                    borderRadius: '4px',
                    backgroundColor: '#f9f9f9',
                  }}
                >
                  Двигатель — это механическая машина, которая преобразует
                  энергию топлива в механическую энергию и приводит в движение
                  транспортное средство. Для разных двигателей могут
                  использоваться различные виды топлива (например, природный
                  газ, бензин, дизельное топливо и т.д.). Двигатели используются
                  во всем мире для различных автомобилей, мотоциклов, автобусов,
                  кораблей, самолетов, железнодорожных поездов и т. д.
                </p>
              </div>
            </li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
      </div> */}
        {/* <div className='GoBack'>
        <h3 className='h3'>К проектам</h3>
      </div>
      <div className='form3d'>
        <model-viewer
          id='modelspc'
          className='modelspc'
          style={{ width: 1100, height: 800, borderRadius: 38 }}
          src='/assets/models/pc/newcomp.glb'
          ar
          ar-modes='webxr scene-viewer quick-look'
          camera-controls
          poster='/assets/models/pc/newcomp.webp'
          shadow-intensity='1'
          // auto-rotate
          camera-orbit='37.39deg 71.99deg 0.5613m'
          field-of-view='30deg'
          exposure='1'
        >
          <button
            data-models="<model-viewer
          loading='eager'
        className='smallform3d'
        style='width:500px;height:600px;border-radius:38px;'
      src='/assets/models/pc/SSD.glb'
      ar
      ar-modes='webxr scene-viewer quick-look'
      camera-controls
      tone-mapping='commerce'
      poster='/assets/models/pc/SSD.webp'
      shadow-intensity='1'
      camera-orbit='32.49deg 80.66deg 0.2438m'
      field-of-view='30deg'
      auto-rotate
    ></model-viewer>"
            data-title='SSD SATA'
            data-disc='Твердотельный накопитель (SSD) — это компьютерное энергонезависимое немеханическое запоминающее устройство на основе микросхем памяти, альтернатива жёстким дискам (HDD). Наиболее распространённый вид твердотельных накопителей использует для хранения данных флеш-память типа NAND, однако существуют варианты, в которых накопитель создаётся на базе DRAM-памяти, снабжённой дополнительным источником питания — аккумулятором.'
            onClick={openModal}
            className='Hotspot'
            slot='hotspot-1'
            data-surface='975 0 1098 200 744 0.453 0.030 0.516'
            data-visibility-attribute='visible'
          >
            SSD
          </button>
          <button
            data-models="<model-viewer
          loading='eager'
        className='smallform3d'
        style='width:500px;height:600px;border-radius:38px;'
      src='/assets/models/pc/RAM.glb'
      ar
      ar-modes='webxr scene-viewer quick-look'
      camera-controls
      tone-mapping='commerce'
      poster='/assets/models/pc/RAM.webp'
      shadow-intensity='1'
      camera-orbit='32.49deg 80.66deg 0.2438m'
      field-of-view='30deg'
      auto-rotate
    ></model-viewer>"
            data-title='ОЗУ'
            data-disc='Оперативная память, или оперативное запоминающее устройство (ОЗУ) — временное хранилище для данных, необходимых для работы игр и программ. Оперативка обеспечивает процессору и видеокарте моментальный доступ к запрашиваемой информации, чтобы не пришлось считывать её с медленного жёсткого диска или недостаточно скоростного SSD-накопителя.'
            onClick={openModal}
            className='Hotspot'
            slot='hotspot-2'
            data-surface='959 0 56 13 61 0.601 0.319 0.080'
            data-visibility-attribute='visible'
          >
            ОЗУ
          </button>
          <button
            data-models="<model-viewer
          loading='eager'
        className='smallform3d'
        style='width:500px;height:600px;border-radius:38px;'
      src='/assets/models/pc/CPU.glb'
      ar
      ar-modes='webxr scene-viewer quick-look'
      camera-controls
      tone-mapping='commerce'
      poster='/assets/models/pc/CPU.webp'
      shadow-intensity='1'
      camera-orbit='244.4deg 73.1deg 2.882m'
      field-of-view='30deg'
      auto-rotate
    ></model-viewer>"
            data-title='Процессор'
            data-disc='Центральный процессор (ЦПУ) – это аппаратный компонент, который является основным вычислительным блоком сервера. Серверы и другие интеллектуальные устройства преобразуют данные в цифровые сигналы и выполняют над ними математические операции. Центральный процессор является основным компонентом, который обрабатывает сигналы и делает возможными вычисления. Он действует как мозг любого вычислительного устройства.'
            onClick={openModal}
            className='Hotspot'
            slot='hotspot-3'
            data-surface='140 0 995 1003 1011 0.503 0.105 0.392'
            data-visibility-attribute='visible'
          >
            ЦПУ
          </button>
          <button
            data-models="<model-viewer
          loading='eager'
        className='smallform3d'
        style='width:500px;height:600px;border-radius:38px;'
      src='/assets/models/pc/GPU.glb'
      ar
      ar-modes='webxr scene-viewer quick-look'
      camera-controls
      tone-mapping='commerce'
      poster='/assets/models/pc/GPU.webp'
      shadow-intensity='1'
      camera-orbit='32.49deg 80.66deg 0.2438m'
      field-of-view='30deg'
      auto-rotate
    ></model-viewer>"
            data-title='Видеокарта'
            data-disc='Графический процессор (GPU) — это электронная схема, которая может выполнять математические вычисления с высокой скоростью. Вычислительные задачи, такие как рендеринг графики, машинное обучение и редактирование видео, требуют применения сходных математических операций к большому набору данных.'
            onClick={openModal}
            className='Hotspot'
            slot='hotspot-4'
            data-surface='768 0 65 152 73 0.380 0.465 0.155'
            data-visibility-attribute='visible'
          >
            Видеокарта
          </button>
          <button
            data-models="<model-viewer
          loading='eager'
        className='smallform3d'
        style='width:500px;height:600px;border-radius:38px;'
      src='/assets/models/pc/PSU.glb'
      ar
      ar-modes='webxr scene-viewer quick-look'
      camera-controls
      tone-mapping='commerce'
      poster='/assets/models/pc/PSU.webp'
      shadow-intensity='1'
      camera-orbit='584.7deg 71.22deg 12.63m'
      field-of-view='30deg'
      auto-rotate
    ></model-viewer>"
            data-title='Блок питания'
            data-disc='Блок питания (он же БП) – источник питания в системном блоке, который отвечает за обеспечение энергией остальных компонентов. От БП во многом зависит долговечность и стабильность работы всей системы. Помимо этого, компьютерный блок питания препятствует потере информации с персонального компьютера, предотвращая скачки энергии.'
            onClick={openModal}
            className='Hotspot'
            slot='hotspot-6'
            data-surface='1082 0 1317 1390 1320 0.498 0.138 0.363'
            data-visibility-attribute='visible'
          >
            Блок Питания
          </button>
          <button
            data-models="<model-viewer
          loading='eager'
        className='smallform3d'
        style='width:500px;height:600px;border-radius:38px;'
      src='/assets/models/pc/waterCooling.glb'
      ar
      ar-modes='webxr scene-viewer quick-look'
      camera-controls
      tone-mapping='commerce'
      poster='/assets/models/pc/waterCooling.webp'
      shadow-intensity='1'
      camera-orbit='421.1deg 65.17deg 11.49m'
      field-of-view='30deg'
      auto-rotate
    ></model-viewer>"
            data-title='Водянка'
            data-disc='Жидкостное охлаждение — лучший способ охладить процессор, потому что вода передает тепло намного эффективнее, чем воздух. Кроме того, системы водяного охлаждения делают работу компьютера тише, избавляя вас от шелеста вентиляторов, которые при серьезной нагрузке начинают работать на высоких оборотах и шуметь. В то же время СВО менее безопасны: например, если трубки для прогона жидкости плохо соединены фитингами — капли воды могут попасть на компонентную базу системной платы и вызвать замыкание.'
            onClick={openModal}
            className='Hotspot'
            slot='hotspot-7'
            data-surface='1050 0 53 57 134 0.058 0.285 0.658'
            data-visibility-attribute='visible'
          >
            Водяное охлаждение
          </button>
          <button
            data-models="<model-viewer
            loading='eager'
          className='smallform3d'
          style='width:500px;height:600px;border-radius:38px;'
        src='/assets/models/pc/motherBoard.glb'
        ar
        ar-modes='webxr scene-viewer quick-look'
        camera-controls
        tone-mapping='commerce'
        poster='/assets/models/pc/motherBoard.webp'
        shadow-intensity='1'
        camera-orbit='32.49deg 80.66deg 0.2438m'
        field-of-view='30deg'
        auto-rotate
      ></model-viewer>"
            data-title='Материнская плата'
            data-disc='Материнская (системная) плата — это основа построения модульного электронного устройства, например компьютера. Она содержит основную часть устройства, например в случае компьютера — процессор, системную шину или шины, оперативную память, «встроенные» контроллеры периферийных устройств, сервисную логику — и разъёмы для подключения дополнительных взаимозаменяемых плат, называемых платами расширений.'
            onClick={openModal}
            className='Hotspot'
            slot='hotspot-9'
            data-surface='207 0 1464 1129 1247 0.029 0.299 0.672'
            data-visibility-attribute='visible'
          >
            Материнская Плата
          </button>
          <button
            data-models="<model-viewer
          loading='eager'
        className='smallform3d'
        style='width:500px;height:600px;border-radius:38px;'
      src='/assets/models/pc/case.glb'
      ar
      ar-modes='webxr scene-viewer quick-look'
      camera-controls
      tone-mapping='commerce'
      poster='/assets/models/pc/case.webp'
      shadow-intensity='1'
      camera-orbit='418.1deg 65.93deg 0.5611m'
      field-of-view='30deg'
      auto-rotate
    ></model-viewer>"
            data-title='Корпус'
            data-disc='Компьютерный корпус (системный блок, системник, computer case) служит защитной внешней оболочкой и одновременно каркасом (шасси), к которому крепятся все остальные компоненты компьютера. Фактически это то же самое, что и панцирь для черепахи. Кроме того, корпус участвует в охлаждении остальных комплектующих компьютера, а так же экранирует (если он из металла) электромагнитное излучение остальных компонентов аппаратного обеспечения.'
            onClick={openModal}
            className='Hotspot'
            slot='hotspot-11'
            data-surface='708 0 2884 36 967 0.086 0.432 0.482'
            data-visibility-attribute='visible'
          >
            Системный блок
          </button>
          <button
            data-models="<model-viewer
          loading='eager'
        className='smallform3d'
        style='width:500px;height:600px;border-radius:38px;'
      src='/assets/models/pc/M2.glb'
      ar
      ar-modes='webxr scene-viewer quick-look'
      camera-controls
      tone-mapping='commerce'
      poster='/assets/models/pc/ssdm2.webp'
      shadow-intensity='1'
      camera-orbit='77.44deg 56.11deg 4.906m'
      field-of-view='25deg'
      auto-rotate
    ></model-viewer>"
            data-title='SSD M.2'
            data-disc='SSD M.2 обеспечивает значительно более высокую скорость передачи данных по сравнению с SSD SATA. Это связано с тем, что SSD M.2 подключается напрямую к материнской плате через интерфейс PCI Express (PCIe) или Serial ATA (SATA), в то время как SSD SATA подключается через интерфейс SATA.'
            onClick={openModal}
            className='Hotspot'
            slot='hotspot-12'
            data-surface='668 0 2 14 11 0.493 0.463 0.044'
            data-visibility-attribute='visible'
          >
            SSD
          </button>
          <button
            data-models="<model-viewer
            loading='eager'
          className='smallform3d'
          style='width:500px;height:600px;border-radius:38px;'
        src='/assets/models/pc/radiator.glb'
        ar
        ar-modes='webxr scene-viewer quick-look'
        camera-controls
        tone-mapping='commerce'
        poster='/assets/models/pc/radiator.webp'
        shadow-intensity='1'
        camera-orbit='394.7deg 72.35deg 4.718m'
        field-of-view='30deg'
        auto-rotate
      ></model-viewer>"
            data-title='Воздушка'
            data-disc='Воздушная система охлаждения - это самый простой вариант охлаждения — потоком воздуха. Внешнюю поверхность блока цилиндров двигателя с воздушной системой охлаждения делают специальной формы — с ребрами. Так увеличивают площадь поверхности, с которой отводится тепло. Двигатель охлаждается за счет естественной конвекции — потока воздуха, который нагревается при контакте с ребрами и поднимается вверх, уступая место холодному, или за счет набегающего потока воздуха при движении.'
            onClick={openModal}
            className='Hotspot'
            slot='hotspot-13'
            data-surface='998 0 366 215 371 0.064 0.850 0.086'
            data-visibility-attribute='visible'
          >
            Воздушное охлаждение
          </button>
          <button slot='ar-button' id='ar-button'>
            View in your space
          </button>
        </model-viewer>
      </div> */}

        {/* <EffectSection></EffectSection> */}
      </Routes>
      <footer
        className='footer'
        style={{
          backgroundColor: 'rgba(20, 20, 20, 0.95)',
          color: 'white',
          fontFamily: 'Roboto Mono',
          padding: 16,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
        }}
      >
        <div
          className='container'
          style={{
            alignSelf: 'center',
            display: 'flex',
            justifyContent: 'space-between',
          }}
        >
          <p style={{ alignSelf: 'center' }}>
            © 2024 Explore3D. Все права защищены.
          </p>
          <ul
            // className={classes.menu}
            style={{
              display: 'flex',
              width: 400,
              justifyContent: 'space-between',
            }}
          >
            <a
              // className={classes.a}
              id='models'
              href='/#projects'
            >
              <li>Материал</li>
            </a>
            <a
              // className={classes.a}
              href='/#benefits'
            >
              <li>Преимущества</li>
            </a>
            <a
              // className={classes.a}
              href='/#about'
            >
              <li>О создателях</li>
            </a>
          </ul>
        </div>
      </footer>
    </Router>
  );
}
