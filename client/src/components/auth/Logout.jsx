import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { isNotAuth, isAuthLocal, isAuthSocial } from '../../services/authenticate'
import {
  socialLoginGoogleActionCreator,
  socialLoginFbActionCreator,
  socialLoginGithubActionCreator,
  socialRegisterGoogleActionCreator,
  socialRegisterFbActionCreator,
  socialRegisterGithubActionCreator
} from './../../redux/actions/social'

const Logout = (props) => {
  const {
    history,
    socialLoginGoogleAction,
    socialLoginFbAction,
    socialLoginGithubAction,
    socialRegisterGoogleAction,
    socialRegisterFbAction,
    socialRegisterGithubAction
  } = props
  const isAuth = () => isAuthLocal() || isAuthSocial()

  useEffect(() => {
    onCleanup()
  }, [])

  const onCleanup = () => {
    socialLoginGoogleAction('SOCIAL_LOGIN_GOOGLE_CLEANUP')
    socialLoginFbAction('SOCIAL_LOGIN_FB_CLEANUP')
    socialLoginGithubAction('SOCIAL_LOGIN_GITHUB_CLEANUP')
    socialRegisterGoogleAction('SOCIAL_REGISTER_GOOGLE_CLEANUP')
    socialRegisterFbAction('SOCIAL_REGISTER_FB_CLEANUP')
    socialRegisterGithubAction('SOCIAL_REGISTER_GITHUB_CLEANUP')
  }

  const isLogout = () => isNotAuth(() => history.push('/signin'))
  return (
    <>
      {!isAuth() && <Redirect to='/signin' />}
      {isLogout()}
    </>
  )
}

Logout.propTypes = {
  history: PropTypes.object,
  socialLoginGoogleAction: PropTypes.func,
  socialLoginFbAction: PropTypes.func,
  socialLoginGithubAction: PropTypes.func,
  socialRegisterGoogleAction: PropTypes.func,
  socialRegisterFbAction: PropTypes.func,
  socialRegisterGithubAction: PropTypes.func
}

const mapDispatchToProps = (dispatch) => ({
  socialLoginGoogleAction: (type) => dispatch(socialLoginGoogleActionCreator(type, {})),
  socialLoginFbAction: (type) => dispatch(socialLoginFbActionCreator(type, {})),
  socialLoginGithubAction: (type) => dispatch(socialLoginGithubActionCreator(type, {})),
  socialRegisterGoogleAction: (type) => dispatch(socialRegisterGoogleActionCreator(type, {})),
  socialRegisterFbAction: (type) => dispatch(socialRegisterFbActionCreator(type, {})),
  socialRegisterGithubAction: (type) => dispatch(socialRegisterGithubActionCreator(type, {}))
})

export default connect(null, mapDispatchToProps)(Logout)
