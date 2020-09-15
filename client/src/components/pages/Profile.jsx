import React, { useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify'
import { EditOutlined } from '@ant-design/icons'
import { isAuthLocal, isAuthSocial } from '../../services/authenticate'
import { isId } from '../../services/id'
import { editProfileActionCreator, updateProfileActionCreator } from '../../redux/actions/profile'
import { styles } from '../../styles/js/styleProfile'

const Profile = (props) => {
  const idRef = useRef(null)
  const usernameRef = useRef(null)
  const emailRef = useRef(null)
  const passwordRef = useRef(null)
  const { state, editProfileAction, updateProfileAction } = props
  const { profile, type, btnText, btnDisabled, messages } = state
  const isAuth = () => isAuthLocal() || isAuthSocial()

  useEffect(() => {
    editProfileAction('PROFILE_SUCCESS_ALL', { id: isId() })
    onMessage()
  }, [type, messages])

  const onSubmit = (e) => {
    e.preventDefault()
    updateProfileAction('PROFILE_SUCCESS', {
      id: idRef.current.value,
      username: usernameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      btnText: <i className='spinner-border spinner-border-sm' />,
      btnDisabled: true
    })
  }

  const onMessage = () => {
    if (btnDisabled && type === 'PROFILE_SUCCESS') {
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

    if (btnDisabled && type !== 'PROFILE_SUCCESS') {
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
      {!isAuth() && <Redirect to='/signin' />}
      <ToastContainer />
      <Container className='mt-4 mb-4 d-flex justify-content-center align-items-center'>
        <Row>
          <Col>
            <Card>
              <Card.Header className='bg-white'>
                <div style={styles.cardHeaderContainer}>
                  <span style={styles.cardHeaderTitle}>Edit Profile</span>
                  <i style={styles.cardHeaderIcon}>
                    <EditOutlined />
                  </i>
                </div>
              </Card.Header>
              <Card.Body>
                <Form onSubmit={onSubmit}>
                  <Row>
                    <Col className='col-12'>
                      <Form.Group>
                        <Form.Control type='hidden' ref={idRef} defaultValue={profile._id} />
                      </Form.Group>
                    </Col>
                    <Col lg={6} md={12} sm={12}>
                      <Form.Group>
                        <Form.Label style={styles.formLabel}>Username</Form.Label>
                        <Form.Control type='text' ref={usernameRef} defaultValue={profile.username} />
                      </Form.Group>
                    </Col>
                    <Col lg={6} md={12} sm={12}>
                      <Form.Group>
                        <Form.Label style={styles.formLabel}>Email</Form.Label>
                        <Form.Control type='email' ref={emailRef} defaultValue={profile.email} />
                      </Form.Group>
                    </Col>
                    <Col lg={12} md={12} sm={12}>
                      <Form.Group>
                        <Form.Label style={styles.formLabel}>Password</Form.Label>
                        <Form.Control type='password' ref={passwordRef} defaultValue={profile.password} />
                      </Form.Group>
                    </Col>
                    <Col lg={12} md={12} sm={12}>
                      <Form.Group className='mt-2'>
                        <Button
                          type='submit'
                          className='btn btn-block'
                          style={styles.formButton}
                          disabled={btnDisabled}>
                          {btnText}
                        </Button>
                      </Form.Group>
                    </Col>
                  </Row>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  )
}

const mapStateToProps = (state) => ({
  state: state.profile
})

const mapStateToDispatch = (dispatch) => ({
  editProfileAction: (type, payload) => dispatch(editProfileActionCreator(type, { ...payload })),
  updateProfileAction: (type, payload) => dispatch(updateProfileActionCreator(type, { ...payload }))
})

export default connect(mapStateToProps, mapStateToDispatch)(Profile)
