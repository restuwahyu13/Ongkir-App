import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { LoginOutlined } from '@ant-design/icons'
import PropTypes from 'prop-types'
import { Image, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { activationActionCreator } from '../../redux/actions/activation'
import { styles } from '../../styles/js/styleActivation'

const ActivationAccount = (props) => {
  const { id, state, activationAction } = props
  const { type, message } = state

  useEffect(() => {
    activationAction('ACTIVATION_SUCCESS', { id })
    onMessage()
  }, [message])

  const onMessage = () => {
    if (message !== '' && type === 'ACTIVATION_SUCCESS') {
      toast.success(message, {
        position: 'top-right',
        autoClose: 5000,
        pauseOnHover: false,
        draggable: false,
        hideProgressBar: false,
        closeOnClick: false
      })
    }
  }

  return (
    <>
      <ToastContainer />
      <div>
        <div style={styles.container}>
          <Image src='https://i.imgur.com/xhD8DjW.png' style={styles.notLogo} alt='logo-404' />
        </div>
        <div className='d-flex justify-content-center align-items-center mt-2'>
          <Button type='button' className='btn' style={styles.btnRedirect}>
            <Link to='/signin' style={styles.linkRedirect}>
              <div className='d-flex justify-content-center align-items-center'>
                <LoginOutlined style={styles.iconRedirect} />
                <span style={styles.titleRedirect}>Sign in now</span>
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </>
  )
}

ActivationAccount.propTypes = {
  match: PropTypes.object,
  state: PropTypes.object,
  activationAction: PropTypes.func
}

const mapStateToProps = (state) => ({
  state: state.activation
})

const mapDispatchToProps = (dispatch) => ({
  activationAction: (type, payload) => dispatch(activationActionCreator(type, { ...payload }))
})

export default connect(mapStateToProps, mapDispatchToProps)(ActivationAccount)
