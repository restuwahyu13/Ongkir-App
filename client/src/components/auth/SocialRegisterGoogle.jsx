import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ModalSocialSignup from '../ModalSocialSignup'
import { socialRegisterGoogleActionCreator } from '../../redux/actions/social'

const SocialRegisterGoogle = (props) => {
  const [trigger, setTrigger] = useState(false)
  const { style, history, state, socialRegisterGoogleAction } = props
  const { btnText, btnDisabled, message } = state
  let tab = window

  useEffect(() => {
    onTabErrorClose()
  }, [message])

  const onSubmit = (e) => {
    e.preventDefault()

    socialRegisterGoogleAction('SOCIAL_REGISTER_GOOGLE_SUCCESS', {
      btnText: <i className='spinner-border spinner-border-sm' />,
      btnDisabled: true
    })

    if (!window.localStorage.getItem('errregisterGoogle')) {
      onCleanupErrorRegister()
      window.localStorage.setItem('register', 'registerGoogle')
      tab = window.open('/auth/google', 'google', 'width=768; height=512;')
      onTabSuccessClose()
    }

    onModalTrigger()
  }

  // redirect if autheinticate successfuly and close tab
  const onTabSuccessClose = () => {
    window.addEventListener('storage', (e) => {
      if (e.newValue !== null && e.newValue.length < 20) {
        tab.close()
        setTimeout(() => history.push('/'), 1000)
      }
    })
  }

  // after sign up error message already from localStorage close tab
  const onTabErrorClose = () => {
    // first tab
    window.addEventListener('storage', (e) => {
      if (e.newValue !== null && e.newValue.length > 30) {
        tab.close()
        socialRegisterGoogleAction('SOCIAL_REGISTER_GOOGLE_CLEANUP', {})
        onModalTrigger()
      }
    })
    // last tab
    if (window.localStorage.getItem('errregisterGoogle')) {
      tab.close()
    }
  }

  // trigger this modal if error message is exists
  const onModalTrigger = () => {
    if (window.localStorage.getItem('errregisterGoogle')) {
      setTrigger(true)
    }
  }

  // cleanup error register if exists after sign up
  const onCleanupErrorRegister = () => {
    const register = window.localStorage.getItem('register')
    const patternError = /(registerGithub|registerGoogle|registerFacebook)/gi.exec(register)
    if (patternError !== null) {
      return window.localStorage.removeItem(`err${patternError[0]}`) || window.localStorage.removeItem('register')
    }
  }

  return (
    <>
      {message && <ModalSocialSignup onShow={trigger} onHide={setTrigger} />}
      <Form onSubmit={onSubmit} encType='application/x-www-form-urlencoded'>
        <Form.Group className='mb-2'>
          <Button type='submit' className='btn btn-block' style={style} disabled={btnDisabled}>
            {!btnDisabled && <div> Sign up with Google</div>}
            {btnDisabled && <div> {btnText} </div>}
          </Button>
        </Form.Group>
      </Form>
    </>
  )
}

SocialRegisterGoogle.propTypes = {
  style: PropTypes.object,
  history: PropTypes.object,
  btnDisabled: PropTypes.bool,
  btnText: PropTypes.string,
  state: PropTypes.object,
  socialRegisterGoogleAction: PropTypes.func
}

const mapStateToProps = (state) => ({
  state: state.socialRegisterGoogle
})

const mapDispatchToProps = (dispatch) => ({
  socialRegisterGoogleAction: (type, payload) => dispatch(socialRegisterGoogleActionCreator(type, { ...payload }))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SocialRegisterGoogle))
