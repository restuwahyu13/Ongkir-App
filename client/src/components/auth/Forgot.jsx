import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import { Form, Row, Col, Button, Card, Container } from 'react-bootstrap'
import { forgotActionCreator } from '../../redux/actions/forgot'
import { styles } from '../../styles/js/styleForgot'

const ForgotPassword = (props) => {
  const [{ email }, setValue] = useState({ email: '' })
  const { state, forgotAction } = props
  const { type, messages, btnText, btnDisabled } = state

  useEffect(() => {
    onMessage()
  }, [messages])

  const onSubmit = (e) => {
    e.preventDefault()
    forgotAction('FORGOT_SUCCESS', {
      email,
      btnText: <i className='spinner-border spinner-border-sm' />,
      btnDisabled: true
    })
    onCleanup()
  }

  const onCleanup = () => setTimeout(() => setValue({ email: '' }), 3000)
  const onMessage = () => {
    if (btnDisabled && type === 'FORGOT_SUCCESS') {
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

    if (btnDisabled && type !== 'FORGOT_SUCCESS') {
      setTimeout(() => {
        if (messages.length > 0) {
          for (const i in messages) {
            toast.error(messages[i].msg, {
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
      <Container className='mt-5'>
        <Row className='justify-content-center aligns-items-center'>
          <Col lg={5} md={5} sm={12}>
            <Card>
              <Card.Header className='bg-white'>
                <h4 style={styles.formHeaderTitle}>Forgot Password</h4>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={onSubmit}>
                  <Form.Group>
                    <Form.Label style={styles.formLabel}> Email</Form.Label>
                    <Form.Control
                      type='text'
                      name='email'
                      placeholder='Enter Email'
                      value={email}
                      onChange={(e) => setValue({ [e.target.name]: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Button
                      type='submit'
                      className='btn btn-primary btn-block'
                      style={styles.formBtn}
                      disabled={btnDisabled}>
                      {btnText}
                    </Button>
                  </Form.Group>
                </Form>
              </Card.Body>
              <Card.Footer className='bg-white'>
                <div style={styles.cardFooter}>
                  Back to
                  <Link to='/signin' style={styles.cardFooterLink}>
                    Sign in
                  </Link>
                  page or
                  <Link to='/signup' style={styles.cardFooterLink}>
                    Sign up
                  </Link>
                </div>
              </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

ForgotPassword.propTypes = {
  state: PropTypes.object,
  forgotAction: PropTypes.func
}

const mapStateToProps = (state) => ({
  state: state.forgot
})

const mapDispatchToProps = (dispatch) => ({
  forgotAction: (type, payload) => dispatch(forgotActionCreator(type, { ...payload }))
})

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)
