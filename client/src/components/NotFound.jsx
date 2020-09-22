import React from 'react'
import { Link } from 'react-router-dom'
import { Image, Button } from 'react-bootstrap'
import { ArrowLeftOutlined } from '@ant-design/icons'
import { styles } from '../styles/js/styleNotFound'

const NotFound = () => (
  <div>
    <div style={styles.container}>
      <Image src='https://bit.ly/2Fg2Zmn' style={styles.notLogo} alt='logo-404' />
    </div>
    <div className='d-flex justify-content-center align-items-center mt-2'>
      <Button type='button' className='btn' style={styles.btnRedirect}>
        <Link to='/signin' style={styles.linkRedirect}>
          <div className='d-flex justify-content-center align-items-center'>
            <ArrowLeftOutlined style={styles.iconRedirect} />
            <span style={styles.titleRedirect}>Back To HomePage</span>
          </div>
        </Link>
      </Button>
    </div>
  </div>
)

export default NotFound
