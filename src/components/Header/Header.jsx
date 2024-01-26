import './Header.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
// let AlignItems = styled.div``;

export default function Header() {
  return (
    <>
      <div className='container'>
        <div className='headercontainer'>
          <Link to='/' className='logodf'>
            <img
              src='/assets/img/icons8-3d-cube-96.png'
              className='logoimg'
              alt='logo'
            />
            <div className='logoname'>Explore3D</div>
          </Link>
          <ul className='menu'>
            <a className='header__a' id='models' href='/#projects'>
              <li>Материал</li>
            </a>
            <a className='header__a' href='/#benefits'>
              <li>Преимущества</li>
            </a>
            <a className='header__a' href='/#about'>
              <li>О создателях</li>
            </a>
          </ul>
        </div>
      </div>
      <div className='headerborder'></div>
    </>
  );
}
