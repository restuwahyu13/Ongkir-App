import cookie from 'js-cookie'
import jwt from 'jsonwebtoken'

export const isId = () => {
  const token = cookie.get('social_token') || cookie.get('local_token')
  const decoded = jwt.decode(token)
  const id = decoded._id || decoded.id
  if (decoded) return id
  return null
}
