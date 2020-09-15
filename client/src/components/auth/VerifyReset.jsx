import React, { useEffect } from 'react'
import { Image, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { KeyOutlined } from '@ant-design/icons'
import { toast, ToastContainer } from 'react-toastify'
import { connect } from 'react-redux'
import { resetIdactionCreator } from '../../redux/actions/reset'
import { styles } from '../../styles/js/styleActivation'

const VerifyReset = (props) => {
  const { match, state, resetActionId } = props
  const { id } = match.params
  const { type, expired, messages } = state

  useEffect(() => {
    resetActionId('RESET_SUCCESS_ID', { id })
    onMessage()
  }, [messages])

  const isExpired = () => (
    <>
      <ToastContainer />
      <div style={styles.container}>
        <Image src='https://i.imgur.com/vOEfLhO.png' style={styles.notLogo} alt='logo-404' />
      </div>
      <div className='d-flex justify-content-center align-items-center mt-2'>
        <Button type='button' className='btn' style={styles.btnRedirect}>
          <Link to='/forgot-password' style={styles.linkRedirect}>
            <div className='d-flex justify-content-center align-items-center'>
              <KeyOutlined style={styles.iconRedirect} />
              <span style={styles.titleRedirect}>Reset Password</span>
            </div>
          </Link>
        </Button>
      </div>
    </>
  )

  const onMessage = () => {
    if (messages !== '' && type !== 'RESET_SUCCESS') {
      toast.error(messages, {
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

const mapStateToProps = (state) => ({ state: state.reset })

const mapDispatchToProps = (dispatch) => ({
  resetActionId: (type, payload) => dispatch(resetIdactionCreator(type, { ...payload }))
})

export default connect(mapStateToProps, mapDispatchToProps)(VerifyReset)
