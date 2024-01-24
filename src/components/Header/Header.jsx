import { styled } from 'styled-components';
import classes from './Header.module.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

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

export default function Header() {
  return (
    <>
      <div className='container'>
        <HeaderContainer>
          <Link to='/' className={classes.logodf}>
            <img src='../src/assets/img/icons8-3d-cube-96.png' alt='logo' />
            <LogoName>Explore3D</LogoName>
          </Link>
          <ul className={classes.menu}>
            <a className={classes.a} id='models' href='/#projects'>
              <li>Материал</li>
            </a>
            <a className={classes.a} href='/#benefits'>
              <li>Преимущества</li>
            </a>
            <a className={classes.a} href='/#about'>
              <li>О создателях</li>
            </a>
          </ul>
        </HeaderContainer>
      </div>
      <div className={`${classes.headerborder}`}></div>
    </>
  );
}
