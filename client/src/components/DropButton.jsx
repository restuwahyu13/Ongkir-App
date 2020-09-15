import React from 'react'
import { Dropdown, Nav } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { isAuthLocal, isAuthSocial } from '../services/authenticate'
import { styles } from '../styles/js/styleDrop'
import '../styles/css/styleDropdown.css'

const DropButton = ({ active }) => {
  const isAuth = () => isAuthLocal() || isAuthSocial()
  return (
    <>
      <Dropdown>
        <Dropdown.Toggle style={styles.dropToogle} variant='dark-outline' id='dropdown-basic'>
          {isAuth()}
        </Dropdown.Toggle>
        <Dropdown.Menu style={styles.dropMenu}>
          <Nav.Item>
            <Link to='/profile' style={{ color: active('/profile'), ...styles.dropLink }} className='dropLink'>
              Profile
            </Link>
          </Nav.Item>
          <Nav.Item>
            <Link to='/logout' style={{ color: active('/logout'), ...styles.dropLink }} className='dropLink'>
              Logout
            </Link>
          </Nav.Item>
        </Dropdown.Menu>
      </Dropdown>
    </>
  )
}

export default DropButton
