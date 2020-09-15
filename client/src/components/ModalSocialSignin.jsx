import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
import { Modal, Button, Alert } from 'react-bootstrap'
import { setAuthSocial } from '../services/authenticate'
import { styles } from '../styles/js/styleModalForm'

const ModalSocialSignin = ({ history, onShow, onHide }) => {
  const [attrGoogle, setAttributeGoogle] = useState({ btnTextGoogle: '', btnDisabledGoogle: false })
  const [attrFb, setAttributeFb] = useState({ btnTextFb: '', btnDisabledFb: false })
  const [attrGithub, setAttributeGithub] = useState({ btnTextGithub: '', btnDisabledGithub: false })

  const { modalHeader, modalHeaderTitle, googleBtn, facebookBtn, githubBtn } = styles
  const { btnTextGoogle, btnDisabledGoogle } = attrGoogle
  const { btnTextFb, btnDisabledFb } = attrFb
  const { btnTextGithub, btnDisabledGithub } = attrGithub

  /**
   * @description on from data
   */

  const onAuthGoogle = () => {
    setAttributeGoogle({
      ...btnDisabledGoogle,
      btnTextGoogle: <i className='spinner-border spinner-border-sm' />,
      btnDisabledGoogle: true
    })

    onAuthGoogleRedirect()
    onCleanupGoogle()
  }

  const onAuthFacebook = () => {
    setAttributeFb({
      ...attrFb,
      btnTextFb: <i className='spinner-border spinner-border-sm' />,
      btnDisabledFb: true
    })

    onAuthFbRedirect()
    onCleanupFb()
  }

  const onAuthGithub = () => {
    setAttributeGithub({
      ...attrGithub,
      btnTextGithub: <i className='spinner-border spinner-border-sm' />,
      btnDisabledGithub: true
    })

    onAuthGithubRedirect()
    onCleanupGithub()
  }

  /**
   * @description on redirect auth
   */

  const onAuthGoogleRedirect = async () => {
    if (!btnDisabledGoogle) {
      const { data } = await axios.get('/api/user/social-register?type=register')
      setAuthSocial(data.secret, () => setTimeout(() => history.push('/'), 3000))
      onCleanupErrorLogin()
    }
  }

  const onAuthFbRedirect = async () => {
    if (!btnDisabledFb) {
      const { data } = await axios.get('/api/user/social-register?type=register')
      setAuthSocial(data.secret, () => setTimeout(() => history.push('/'), 3000))
      onCleanupErrorLogin()
    }
  }

  const onAuthGithubRedirect = async () => {
    if (!btnDisabledGithub) {
      const { data } = await axios.get('/api/user/social-register?type=register')
      setAuthSocial(data.secret, () => setTimeout(() => history.push('/'), 3000))
      onCleanupErrorLogin()
    }
  }

  /**
   * @description on cleanup
   */

  const onCleanupGoogle = () => {
    setTimeout(() => setAttributeGoogle({ ...attrGoogle, btnTextGoogle: '', btnDisabledGoogle: false }), 3500)
  }

  const onCleanupFb = () => {
    setTimeout(() => setAttributeFb({ ...attrFb, btnTextFb: '', btnDisabledFb: false }), 3500)
  }

  const onCleanupGithub = () => {
    setTimeout(() => setAttributeGithub({ ...attrGithub, btnTextGithub: '', btnDisabledGithub: false }), 3500)
  }

  // cleanup error login if exists before sign up
  const onCleanupErrorLogin = () => {
    const login = window.localStorage.getItem('login')
    const patternError = /(loginGithub|loginGoogle|loginFb)/gi.exec(login)
    if (patternError !== null) {
      return window.localStorage.removeItem(`err${patternError[0]}`) || window.localStorage.removeItem('login')
    }
  }

  return (
    <>
      <Modal show={onShow} onHide={() => onHide(false)}>
        <Modal.Header closeButton style={modalHeader}>
          <Modal.Title style={modalHeaderTitle} as='div'>
            <Alert variant='danger'>
              <b>Note:</b> User account is not exists, please sign up now
            </Alert>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Button onClick={onAuthGoogle} className='btn btn-block' style={googleBtn} disabled={btnDisabledGoogle}>
            {!btnDisabledGoogle && 'Sign up with Google'}
            {btnDisabledGoogle && btnTextGoogle}
          </Button>
          <Button onClick={onAuthFacebook} className='btn btn-block' style={facebookBtn} disabled={btnDisabledFb}>
            {!btnDisabledFb && 'Sign up with Facebook'}
            {btnDisabledFb && btnTextFb}
          </Button>
          <Button onClick={onAuthGithub} className='btn btn-block' style={githubBtn} disabled={btnDisabledGithub}>
            {!btnDisabledGithub && 'Sign up with Github'}
            {btnDisabledGithub && btnTextGithub}
          </Button>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default withRouter(ModalSocialSignin)
