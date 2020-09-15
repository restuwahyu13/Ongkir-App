import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { toast, ToastContainer } from 'react-toastify'
import PropTypes from 'prop-types'
import { Form, Row, Col, Button, Card, Container } from 'react-bootstrap'
import SocialRegisterGoogle from './SocialRegisterGoogle'
import SocialRegisterFacebook from './SocialRegisterFacebook'
import SocialRegisterGithub from './SocialRegisterGithub'
import { registerActionCreator } from '../../redux/actions/register'
import { styles } from '../../styles/js/styleRegister'

const Register = (props) => {
	const [values, setValues] = useState({ username: '', email: '', password: '' })
	const { history, state, registerAction } = props
	const { type, messages, btnText, btnDisabled } = state
	const { googleBtn, facebookBtn, githubBtn } = styles
	const { username, email, password } = values

	useEffect(() => {
		onMessage()
	}, [type, messages])

	const onSubmit = (e) => {
		e.preventDefault()
		registerAction('REGISTER_SUCCESS', {
			username,
			email,
			password,
			btnText: <i className='spinner-border spinner-border-sm' />,
			btnDisabled: true
		})
		onClean()
	}

	const onClean = () => setTimeout(() => setValues({ ...values, username, email, password }), 3000)
	const onMessage = () => {
		if (btnDisabled && type === 'REGISTER_SUCCESS') {
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
			setTimeout(() => history.push('/signin'), 5000)
		}

		if (btnDisabled && type !== 'REGISTER_SUCCESS') {
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

				if (type !== 'REGISTER_SUCCESS') {
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
			<Container className='mt-4 mb-4'>
				<Row className='justify-content-center aligns-items-center'>
					<Col lg={5} md={8} sm={12}>
						<Card>
							<Card.Header className='bg-white'>
								<h4 style={styles.formHeaderTitle}>Sign up to Ngintip Ongkir</h4>
							</Card.Header>
							<Card.Body>
								<Form onSubmit={onSubmit}>
									<Form.Group>
										<Form.Label style={styles.formLabel}>Username</Form.Label>
										<Form.Control
											type='text'
											name='username'
											placeholder='Enter Username'
											value={username}
											onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
										/>
									</Form.Group>
									<Form.Group>
										<Form.Label style={styles.formLabel}>Email</Form.Label>
										<Form.Control
											type='email'
											name='email'
											placeholder='Enter Email'
											value={email}
											onChange={(e) => setValues({ ...values, [e.target.name]: e.target.value })}
										/>
									</Form.Group>
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
										<Button
											type='submit'
											disabled={btnDisabled}
											className='btn btn-primary btn-block'
											style={styles.formBtn}>
											{btnText}
										</Button>
									</Form.Group>
									<Form.Group>
										<div style={styles.lineContainer} className='col-12'>
											<div style={styles.lineLeft} />
											<span style={styles.lineText}>ATAU</span>
											<div style={styles.lineRight} />
										</div>
									</Form.Group>
								</Form>
								<SocialRegisterGoogle typeAuth='google' style={googleBtn} />
								<SocialRegisterFacebook typeAuth='facebook' style={facebookBtn} />
								<SocialRegisterGithub style={githubBtn} />
							</Card.Body>
						</Card>
					</Col>
				</Row>
			</Container>
		</>
	)
}

Register.propTypes = {
	history: PropTypes.object,
	state: PropTypes.object,
	registerAction: PropTypes.func
}

const mapStateToProps = (state) => ({
	state: state.register
})
const mapDispatchToProps = (dispatch) => ({
	registerAction: (type, payload) => dispatch(registerActionCreator(type, { ...payload }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Register)
