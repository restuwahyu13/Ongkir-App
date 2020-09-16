import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ModalSocialSignin from '../ModalSocialSignin'
import { socialLoginFbActionCreator } from '../../redux/actions/social'

const SocialLoginFacebook = (props) => {
  const [trigger, setTrigger] = useState(false)
  const { style, history, state, sociaLoginFbAction } = props
  const { btnText, btnDisabled, message } = state
  let tab = window

  useEffect(() => {
    onTabErrorClose()
  }, [message])

  const onSubmit = (e) => {
    e.preventDefault()

    sociaLoginFbAction('SOCIAL_LOGIN_FB_SUCCESS', {
      btnText: <i className='spinner-border spinner-border-sm' />,
      btnDisabled: true
    })

    if (!window.localStorage.getItem('errloginFb')) {
      onCleanupErrorLogin()
      window.localStorage.setItem('login', 'loginFb')
      tab = window.open('/auth/facebook', 'facebook', 'width=768; height=512;')
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
        sociaLoginFbAction('SOCIAL_LOGIN_FB_CLEANUP', {})
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
    if (window.localStorage.getItem('errloginFb')) {
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
            {!btnDisabled && <div> Sign in with Facebook </div>}
            {btnDisabled && <div> {btnText} </div>}
          </Button>
        </Form.Group>
      </Form>
    </>
  )
}

SocialLoginFacebook.propTypes = {
  style: PropTypes.object,
  history: PropTypes.object,
  state: PropTypes.object,
  sociaLoginFbAction: PropTypes.func
}

const mapStateToProps = (state) => ({
  state: state.socialLoginFb
})

const mapDispatchToProps = (dispatch) => ({
  sociaLoginFbAction: (type, payload) => dispatch(socialLoginFbActionCreator(type, { ...payload }))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SocialLoginFacebook))
