import { styled } from 'styled-components';
import classes from './Header.module.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useMatch,
  useResolvedPath,
} from 'react-router-dom';
import { NavList } from '@primer/react';

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
  function NavItem({ to, children }) {
    const resolved = useResolvedPath(to);
    const isCurrent = useMatch({ path: resolved.pathname, end: true });
    return (
      <NavList.Item
        className={classes.a}
        as={Link}
        to={to}
        aria-current={isCurrent ? 'page' : undefined}
      >
        {children}
      </NavList.Item>
    );
  }

  return (
    <>
      <div className='container'>
        <HeaderContainer>
          <Link to='/' className={classes.logodf}>
            <img src='../src/assets/img/icons8-3d-cube-96.png' alt='logo' />
            <LogoName>Explore3D</LogoName>
          </Link>
          {/* <NavList className={classes.menu}>
            <NavItem  id='models' href='#projects'>
              Материал
              <NavList.SubNav>
                <NavItem to='/pc'>ПК</NavItem>
                <NavItem to='/car'>Авто</NavItem>
                <NavItem to='/plane'>Самолёт</NavItem>
                <NavItem to='/human'>Человек</NavItem>
              </NavList.SubNav>
            </NavItem>
            <NavItem href='#benefits'>
              Преимущества
            </NavItem>
            <NavItem href='#about'>
              О создателях
            </NavItem>
          </NavList> */}
          <NavList
            className={classes.menu}
          >
            <NavList.Item className={classes.a} sx={{fontSize:20, color: '#181818'}} id='models' href='#projects'>
              Материал
              <NavList.SubNav sx={{marginTop:'4px'}}>
                <NavList.Item style={{ fontSize: 16, paddingLeft:8, borderRadius:3,border:'1px solid #f1f1f1', backgroundColor:'#f9f9f9'}} href='/pc'>
                  ПК
                </NavList.Item>
                <NavList.Item style={{marginTop:4, fontSize: 16, paddingLeft:8, borderRadius:3,border:'1px solid #f1f1f1', backgroundColor:'#f9f9f9'}} href='/car'>
                  Авто
                </NavList.Item>
                <NavList.Item style={{marginTop:4, fontSize: 16, paddingLeft:8, borderRadius:3,border:'1px solid #f1f1f1', backgroundColor:'#f9f9f9'}} href='/plane'>
                  Самолёт
                </NavList.Item>
                <NavList.Item style={{marginTop:4, fontSize: 16, paddingLeft:8, borderRadius:3,border:'1px solid #f1f1f1', backgroundColor:'#f9f9f9'}} href='/human'>
                  Человек
                </NavList.Item>
              </NavList.SubNav>
            </NavList.Item>
            <NavList.Item className={classes.a} href='/#benefits'>
              Преимущества
            </NavList.Item>
            <NavList.Item className={classes.a} href='/#about'>
              О создателях
            </NavList.Item>
          </NavList>
        </HeaderContainer>
      </div>
      <div className={`${classes.headerborder}`}></div>
    </>
  );
}
