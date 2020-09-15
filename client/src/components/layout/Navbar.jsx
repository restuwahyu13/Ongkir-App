import React from 'react'
import PropTypes from 'prop-types'
import { Navbar, Nav, Image } from 'react-bootstrap'
import { Link, withRouter } from 'react-router-dom'
import DropButton from '../DropButton'
import { isAuthLocal, isAuthSocial } from '../../services/authenticate'
import { styles } from '../../styles/js/styleNavbar'
import '../../styles/css/styleNavbar.css'

const NavbarLink = ({ location }) => {
  const isPath = location.pathname
  const isAuth = () => isAuthLocal() || isAuthSocial()
  const isActive = (active) => (active === isPath ? '#00D8FF' : '#fafafa')
  const isMatch = () => (isPath === '/signin' || isPath === '/signup' ? 'inline-block' : 'none')

  return (
    <>
      <Navbar expand='md' bg='dark' className='p-3'>
        <Navbar.Brand href='/' className='d-flex justify-content-center align-items-center p-2'>
          <Image
            src='https://www.vectorlogo.zone/logos/reactjs/reactjs-icon.svg'
            style={styles.brandImage}
            alt='logo'
          />
          <span style={styles.brandTitle}>Ngintip Ongkir</span>
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          <Nav className='d-flex flex-fill justify-content-end align-items-end  mr-4'>
            {isAuth() && (
              <Nav.Item>
                <Link to='/' style={{ color: isActive('/') }} className='linkStyle'>
                  Ongkir App
                </Link>
              </Nav.Item>
            )}
            {isAuth() && <DropButton active={isActive} />}
            {!isAuth() && (
              <Nav.Item>
                <Link to='/signin' style={{ color: isActive('/signin'), display: isMatch() }} className='linkStyle'>
                  Sign in
                </Link>
              </Nav.Item>
            )}
            {!isAuth() && (
              <Nav.Item>
                <Link to='/signup' style={{ color: isActive('/signup'), display: isMatch() }} className='linkStyle'>
                  Sign up
                </Link>
              </Nav.Item>
            )}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </>
  )
}

PropTypes.NavbarLink = {
  location: PropTypes.object
}

export default withRouter(NavbarLink)
