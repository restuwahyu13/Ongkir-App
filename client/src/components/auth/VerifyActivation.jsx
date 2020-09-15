import React, { useEffect } from 'react'
import { Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { LockOutlined } from '@ant-design/icons'
import { toast, ToastContainer } from 'react-toastify'
import { connect } from 'react-redux'
import { activationActionCreator } from '../../redux/actions/activation'
import { styles } from '../../styles/js/styleActivation'

const VerifyActivation = (props) => {
  const { match, state, activationAction } = props
  const { id } = match.params
  const { type, expired, message } = state

  useEffect(() => {
    activationAction('ACTIVATION_SUCCESS', { id })
    onMessage()
  }, [message])

  const isExpired = () => (
    <>
      <div>
        <div style={styles.container}>
          <Image src='https://i.imgur.com/vOEfLhO.png' style={styles.notLogo} alt='logo-404' />
        </div>
        <div className='d-flex justify-content-center align-items-center mt-2'>
          <Button type='button' className='btn' style={styles.btnRedirect}>
            <Link to='/resend-token' style={styles.linkRedirect}>
              <div className='d-flex justify-content-center align-items-center'>
                <LockOutlined style={styles.iconRedirect} />
                <span style={styles.titleRedirect}>Resend Token</span>
              </div>
            </Link>
          </Button>
        </div>
      </div>
    </>
  )

  const onMessage = () => {
    if (message !== '' && type !== 'ACTIVATION_SUCCESS') {
      toast.error(message, {
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
      {expired && isExpired()}
    </>
  )
}

const mapStateToProps = (state) => ({
  state: state.activation
})

const mapDispatchToProps = (dispatch) => ({
  activationAction: (type, payload) => dispatch(activationActionCreator(type, { ...payload }))
})

export default connect(mapStateToProps, mapDispatchToProps)(VerifyActivation)
