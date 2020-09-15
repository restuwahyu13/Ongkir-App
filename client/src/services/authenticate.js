import cookie from 'js-cookie'
import jwt from 'jsonwebtoken'

const isCookieRemove = () => {
  return cookie.remove('local_token') || cookie.remove('social_token')
}

const isLocalStorageRemove = () => {
  return window.localStorage.removeItem('local_auth') || window.localStorage.removeItem('social_auth')
}

export const setAuthLocal = (token) => {
  try {
    const decoded = jwt.decode(token)
    cookie.set('local_token', token, { expires: 86400 })
    window.localStorage.setItem('local_auth', decoded.username)
  } catch (err) {
    return err
  }
}

export const setAuthSocial = (token, callback) => {
  try {
    const decoded = jwt.decode(token)
    cookie.set('social_token', token, { expires: 86400 })
    window.localStorage.setItem('social_auth', decoded.name)
    callback()
  } catch (err) {
    return err
  }
}

export const isAuthLocal = () => {
  if (!window.localStorage.getItem('local_auth') && !cookie.get('local_token')) return false
  return window.localStorage.getItem('local_auth')
}

export const isAuthSocial = () => {
  if (!window.localStorage.getItem('social_auth') && !cookie.get('social_token')) return false
  return window.localStorage.getItem('social_auth')
}

export const isNotAuth = (callback) => {
  if (isAuthLocal() || isAuthSocial()) {
    isCookieRemove()
    isLocalStorageRemove()
    callback()
  }
  return false
}
