import React, { useEffect, useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ModalSocialSignup from '../ModalSocialSignup'
import { socialRegisterGithubActionCreator } from '../../redux/actions/social'

const SocialRegisterGithub = (props) => {
  const [trigger, setTrigger] = useState(false)
  const { style, history, state, socialRegisterGithubAction } = props
  const { btnText, btnDisabled, message } = state
  let tab = window

  useEffect(() => {
    onTabErrorClose()
  }, [message])

  const onSubmit = (e) => {
    e.preventDefault()

    socialRegisterGithubAction('SOCIAL_REGISTER_GITHUB_SUCCESS', {
      btnText: <i className='spinner-border spinner-border-sm' />,
      btnDisabled: true
    })

    if (!window.localStorage.getItem('errregisterGithub')) {
      onCleanupErrorRegister()
      window.localStorage.setItem('register', 'registerGithub')
      tab = window.open('/auth/github', 'github', 'width=768; height=512;')
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
        socialRegisterGithubAction('SOCIAL_REGISTER_GITHUB_CLEANUP', {})
        onModalTrigger()
      }
    })
    // last tab
    if (window.localStorage.getItem('errregisterGithub')) {
      tab.close()
    }
  }

  // trigger this modal if error message is exists
  const onModalTrigger = () => {
    if (window.localStorage.getItem('errregisterGithub')) {
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
            {!btnDisabled && <div> Sign up with Github </div>}
            {btnDisabled && <div> {btnText} </div>}
          </Button>
        </Form.Group>
      </Form>
    </>
  )
}

SocialRegisterGithub.propTypes = {
  style: PropTypes.object,
  history: PropTypes.object,
  state: PropTypes.object,
  btnDisabled: PropTypes.bool,
  btnText: PropTypes.string,
  socialRegisterGithubAction: PropTypes.func
}

const mapStateToProps = (state) => ({
  state: state.socialRegisterGithub
})

const mapDispatchToProps = (dispatch) => ({
  socialRegisterGithubAction: (type, payload) => dispatch(socialRegisterGithubActionCreator(type, { ...payload }))
})

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SocialRegisterGithub))
