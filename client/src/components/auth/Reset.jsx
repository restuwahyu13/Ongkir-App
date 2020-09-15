import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { toast, ToastContainer } from 'react-toastify'
import { Form, Row, Col, Button, Card, Container } from 'react-bootstrap'
import { resetActionCreator, resetIdactionCreator } from '../../redux/actions/reset'
import { styles } from '../../styles/js/styleReset'

const ResetPassword = (props) => {
  const [values, setValues] = useState({ password: '', cpassword: '' })
  const { id, hs, state, resetAction, resetActionId } = props
  const { type, messages, btnText, btnDisabled } = state
  const { password, cpassword } = values

  useEffect(() => {
    resetActionId('RESET_SUCCESS_ID', { id })
    onMessage()
  }, [messages])

  const onSubmit = (e) => {
    e.preventDefault()
    resetAction('RESET_SUCCESS', {
      id,
      password,
      cpassword,
      btnText: <i className='spinner-border spinner-border-sm' />,
      btnDisabled: true
    })
    onCleanup()
  }

  const onCleanup = () => setTimeout(() => setValues({ password: '', cpassword: '' }), 3000)
  const onMessage = () => {
    if (btnDisabled && type === 'RESET_SUCCESS') {
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
      setTimeout(() => hs.push('/signin'), 8000)
    }

    if (btnDisabled && type !== 'RESET_SUCCESS') {
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
                <h4 style={styles.formHeaderTitle}>Reset Password</h4>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={onSubmit}>
                  <Form.Group>
                    <Form.Label style={styles.formLabel}>Password</Form.Label>
                    <Form.Control
                      type='password'
                      name='password'
                      placeholder='Enter Password'
                      value={password}
                      onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label style={styles.formLabel}>Confrim Password</Form.Label>
                    <Form.Control
                      type='password'
                      name='cpassword'
                      placeholder='Enter Password Confirmation'
                      value={cpassword}
                      onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
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
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

ResetPassword.propTypes = {
  id: PropTypes.string,
  history: PropTypes.object,
  state: PropTypes.object,
  resetAction: PropTypes.func,
  resetActionId: PropTypes.func
}

const mapStateToProps = (state) => ({ state: state.reset })

const mapDispatchToProps = (dispatch) => ({
  resetAction: (type, payload) => dispatch(resetActionCreator(type, { ...payload })),
  resetActionId: (type, payload) => dispatch(resetIdactionCreator(type, { ...payload }))
})

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)
