import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'
import { Form, Row, Col, Button, Card, Container } from 'react-bootstrap'
import SocialLoginGoogle from './socialLoginGoogle'
import SocialLoginFacebook from './socialLoginFacebook'
import SocialLoginGithub from './SocialLoginGithub'
import { loginActionCreator } from '../../redux/actions/login'
import { isAuthLocal } from '../../services/authenticate'
import { styles } from '../../styles/js/styleLogin'

const Login = (props) => {
  const [value, setValue] = useState({ username: '', password: '' })
  const { history, state, loginAction } = props
  const { type, btnText, btnDisabled, messages } = state
  const { googleBtn, facebookBtn, githubBtn } = styles
  const { username, password } = value

  useEffect(() => {
    onMessage()
  }, [type, messages])

  const onSubmit = (e) => {
    e.preventDefault()
    loginAction('LOGIN_SUCCESS', {
      username,
      password,
      btnText: <i className="spinner-border spinner-border-sm" />,
      btnDisabled: true
    })
    onAuthLogin()
    onCleanup()
  }

  const onAuthLogin = () => setTimeout(() => isAuthLocal() && history.push('/'), 5000)
  const onCleanup = () => setTimeout(() => setValue({ ...value, username: '', password: '' }), 5000)

  const onMessage = () => {
    if (btnDisabled && type === 'LOGIN_SUCCESS') {
      setTimeout(() => {
        toast.success(messages, {
          position: 'top-right',
          autoClose: 4000,
          pauseOnHover: false,
          draggable: false,
          hideProgressBar: false,
          closeOnClick: false
        })
      }, 3000)
    }

    if (btnDisabled && type !== 'LOGIN_SUCCESS') {
      setTimeout(() => {
        if (messages.length > 0) {
          for (const i of messages) {
            toast.error(i.msg, {
              position: 'top-right',
              autoClose: 4000,
              pauseOnHover: false,
              draggable: false,
              hideProgressBar: false,
              closeOnClick: false
            })
          }
        }

        if (messages !== '') {
          toast.error(messages, {
            position: 'top-right',
            autoClose: 4000,
            pauseOnHover: false,
            draggable: false,
            hideProgressBar: false,
            closeOnClick: false
          })
        }
      }, 3000)
    }
  }

  return (
    <>
      <ToastContainer />
      <Container className="mt-4 mb-4">
        <Row className="justify-content-center aligns-items-center">
          <Col lg={5} md={8} sm={12}>
            <Card>
              <Card.Header className="bg-white">
                <h4 style={styles.formHeaderTitle}>Sign in to Ngintip Ongkir</h4>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={onSubmit}>
                  <Form.Group>
                    <Form.Label style={styles.formLabel}>Username / Email</Form.Label>
                    <Form.Control
                      type="text"
                      name="username"
                      placeholder="Enter username"
                      value={username}
                      onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label style={styles.formLabel}>Password</Form.Label>
                    <Form.Control
                      type="password"
                      name="password"
                      placeholder="Enter password"
                      value={password}
                      onChange={(e) => setValue({ ...value, [e.target.name]: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group className="d-flex justify-content-between align-items-between">
                    <Link to="/resend-token" style={styles.formLink}>
                      Reset Token?
                    </Link>
                    <Link to="/forgot-password" style={styles.formLink}>
                      Forgot Password?
                    </Link>
                  </Form.Group>
                  <Form.Group>
                    <Button
                      type="submit"
                      className="btn btn-primary btn-block"
                      style={styles.formBtn}
                      disabled={btnDisabled}>
                      {btnText}
                    </Button>
                  </Form.Group>

                  <Form.Group>
                    <div style={styles.lineContainer} className="col-12">
                      <div style={styles.lineLeft} />
                      <span style={styles.lineText} className="lineText">
                        ATAU
                      </span>
                      <div style={styles.lineRight} />
                    </div>
                  </Form.Group>
                </Form>
                <SocialLoginGoogle typeAuth="google" style={googleBtn} />
                <SocialLoginFacebook typeAuth="facebook" style={facebookBtn} />
                <SocialLoginGithub style={githubBtn} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

Login.propTypes = {
  history: PropTypes.object,
  state: PropTypes.object,
  loginAction: PropTypes.func
}

const mapStateToProps = (state) => ({
  state: state.login
})

const mapDispatchToProps = (dispatch) => ({
  loginAction: (type, payload) => dispatch(loginActionCreator(type, { ...payload }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Login)
