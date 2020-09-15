import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Form, Button } from 'react-bootstrap'
import { connect } from 'react-redux'
import ModalSocialSignin from '../ModalSocialSignin'
import { socialLoginGithubActionCreator } from '../../redux/actions/social'

const SocialLoginGithub = (props) => {
  const [trigger, setTrigger] = useState(false)
  const { style, history, state, sociaLoginGithubAction } = props
  const { btnText, btnDisabled, message } = state
  let tab = window

  useEffect(() => {
    onTabErrorClose()
  }, [message])

  const onSubmit = (e) => {
    e.preventDefault()

    sociaLoginGithubAction('SOCIAL_LOGIN_GITHUB_SUCCESS', {
      btnText: <i className='spinner-border spinner-border-sm' />,
      btnDisabled: true
    })

    if (!window.localStorage.getItem('errloginGithub')) {
      onCleanupErrorLogin()
      window.localStorage.setItem('login', 'loginGithub')
      tab = window.open('/auth/github', 'github', 'width=768; height=512;')
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
        sociaLoginGithubAction('SOCIAL_LOGIN_GITHUB_CLEANUP', {})
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
    if (window.localStorage.getItem('errloginGithub')) {
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
            {!btnDisabled && <div> Sign in with Github </div>}
            {btnDisabled && <div> {btnText} </div>}
          </Button>
        </Form.Group>
      </Form>
    </>
  )
}

SocialLoginGithub.propTypes = {
  btnDisabled: PropTypes.bool,
  btnText: PropTypes.string,
  style: PropTypes.object,
  state: PropTypes.object,
  history: PropTypes.object,
  sociaLoginGithubAction: PropTypes.func
}

const mapStateToProps = (state) => ({
  state: state.socialLoginGithub
})

const mapDispatchToProps = (dispatch) => ({
  sociaLoginGithubAction: (type, payload) => dispatch(socialLoginGithubActionCreator(type, { ...payload }))
})

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(SocialLoginGithub))
