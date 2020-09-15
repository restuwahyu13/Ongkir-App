import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ModalSocialSignin from '../ModalSocialSignin'
import { socialLoginGoogleActionCreator } from '../../redux/actions/social'

const SocialLoginGoogle = (props) => {
  const [trigger, setTrigger] = useState(false)
  const { style, history, state, sociaLoginGoogleAction } = props
  const { btnText, btnDisabled, message } = state
  let tab = window

  useEffect(() => {
    onTabErrorClose()
  }, [message])

  const onSubmit = (e) => {
    e.preventDefault()

    sociaLoginGoogleAction('SOCIAL_LOGIN_GOOGLE_SUCCESS', {
      btnText: <i className='spinner-border spinner-border-sm' />,
      btnDisabled: true
    })

    if (!window.localStorage.getItem('errloginGoogle')) {
      onCleanupErrorLogin()
      window.localStorage.setItem('login', 'loginGoogle')
      tab = window.open('/auth/google', 'google', 'width=768; height=512;')
      onTabCloseSuccess()
    }

    onModalTrigger()
  }

  // redirect if autheinticate successfuly and close tab
  const onTabCloseSuccess = () => {
    window.addEventListener('storage', (e) => {
      if (e.newValue !== null && e.newValue.length < 20) {
        tab.close()
        setTimeout(() => history.push('/'), 1000)
      }
    })
  }

  // after login error message already from localStorage close tab
  const onTabErrorClose = () => {
    // first tab
    window.addEventListener('storage', (e) => {
      if (e.newValue !== null && e.newValue.length > 30) {
        tab.close()
        sociaLoginGoogleAction('SOCIAL_LOGIN_GOOGLE_CLEANUP', {})
        onModalTrigger()
      }
    })
    // last tab
    if (window.localStorage.getItem('errloginGithub')) {
      tab.close()
    }
  }

  // trigger this modal if error message is exists
  const onModalTrigger = () => {
    if (window.localStorage.getItem('errloginGoogle')) {
      setTrigger(true)
    }
  }

  // cleanup error login if exists before sign in
  const onCleanupErrorLogin = () => {
    const login = window.localStorage.getItem('login')
    const patternError = /(loginGithub|loginGoogle|loginFb)/gi.exec(login)
    if (patternError !== null) {
      return window.localStorage.removeItem(`err${patternError[0]}`) || window.localStorage.removeItem('login')
    }
  }

  return (
    <>
      {message && <ModalSocialSignin onShow={trigger} onHide={setTrigger} />}
      <Form onSubmit={onSubmit} encType='application/x-www-form-urlencoded'>
        <Form.Group className='mb-2'>
          <Button type='submit' className='btn btn-block' style={style} disabled={btnDisabled}>
            {!btnDisabled && <div> Sign in with Google </div>}
            {btnDisabled && <div> {btnText} </div>}
          </Button>
        </Form.Group>
      </Form>
    </>
  )
}

SocialLoginGoogle.propTypes = {
  style: PropTypes.object,
  history: PropTypes.object,
  state: PropTypes.object,
  sociaLoginGoogleAction: PropTypes.func
}

const mapStateToProps = (state) => ({
  state: state.socialLoginGoogle
})

const mapDispatchToProps = (dispatch) => ({
  sociaLoginGoogleAction: (type, payload) => dispatch(socialLoginGoogleActionCreator(type, { ...payload }))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SocialLoginGoogle))
