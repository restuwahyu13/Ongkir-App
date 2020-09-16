import React, { useEffect, useState, useRef } from 'react'
import uuid from 'react-uuid'
import { Redirect } from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify'
import PropTypes from 'prop-types'
import axios from 'axios'
import { connect } from 'react-redux'
import { Container, Row, Col, Form, Table, Image, Card } from 'react-bootstrap'
import { setAuthSocial, isAuthLocal, isAuthSocial } from '../../services/authenticate'
import { rupiahFormat } from '../../utils/rupiahFormat'
import {
  cityAllActionCreator,
  provAllActionCreator,
  kabAllActionCreator,
  ongkirActionCreator
} from '../../redux/actions/ongkir'
import { styles } from '../../styles/js/styleOngkir'
import '../../styles/css/styleOngkir.css'

const Ongkir = (props) => {
  const [couriers, setCouriers] = useState([])
  const cityRef = useRef(null)
  const provRef = useRef(null)
  const kabRef = useRef(null)
  const kurirRef = useRef(null)
  const beratRef = useRef(null)
  const { history, state, cityAllAction, provAllAction, kabAllAction, ongkirAction } = props
  const isAuth = () => isAuthLocal() || isAuthSocial()
  const isSocialAuth = () => onAuthLogin() || onAuthRegister()
  const ongkirCost = !state.btnDisabled && state.cost.flat(Infinity)[0]

  useEffect(() => {
    isSocialAuth()
    cityAllAction()
    provAllAction()
  }, [])

  const onAuthLogin = () => {
    const typeAuthLogin = window.localStorage.getItem('login')
    const patternSuccess = /(loginGithub|loginGoogle|loginFb)/gi.test(typeAuthLogin)
    const patternError = /(loginGithub|loginGoogle|loginFb)/gi.exec(typeAuthLogin)

    if (patternSuccess) {
      axios
        .get('/api/user/social-login?=login')
        .then(({ data }) => {
          setAuthSocial(data.secret, () => {})
          window.localStorage.removeItem('login')
          window.localStorage.removeItem(`err${patternError[0]}`)
        })
        .catch((err) => {
          window.localStorage.setItem(`err${patternError[0]}`, err.response.data.error)
          setTimeout(() => history.push('/signin'), 1000)
        })
    }
  }

  const onAuthRegister = () => {
    const typeAuthRegister = window.localStorage.getItem('register')
    const patternSuccess = /(registerGithub|registerGoogle|registerFb)/gi.test(typeAuthRegister)
    const patternError = /(registerGithub|registerGoogle|registerFb)/gi.exec(typeAuthRegister)

    if (patternSuccess) {
      axios
        .get('/api/user/social-register?type=register')
        .then(({ data }) => {
          setAuthSocial(data.secret, () => {})
          window.localStorage.removeItem('register')
          window.localStorage.removeItem(`err${patternError[0]}`)
        })
        .catch((err) => {
          window.localStorage.setItem(`err${patternError[0]}`, err.response.data.error)
          setTimeout(() => history.push('/signup'), 1000)
        })
    }
  }

  const onSubmit = (e) => {
    e.preventDefault()
    ongkirAction('ONGKIR_SUCCESS', {
      from: cityRef.current.value,
      to: kabRef.current.value,
      weight: beratRef.current.value,
      courier: kurirRef.current.value,
      btnText: <i className='spinner-border spinner-border-sm' />,
      btnDisabled: true
    })
    onMessage()
  }

  const onSelect = () => {
    kabAllAction({ provId: provRef.current.value })
    setCouriers(['JNE', 'TIKI', 'POS'])
  }

  const onMessage = () => {
    setTimeout(() => {
      toast.success('Yeah..data already to use', {
        position: 'top-right',
        autoClose: 2000,
        pauseOnHover: false,
        draggable: false,
        hideProgressBar: false,
        closeOnClick: false
      })
    }, 3000)
  }

  return (
    <>
      <ToastContainer />
      {!isAuth() && <Redirect to='/signin' />}
      {isAuth() && (
        <Container className='mt-2 mb-5'>
          <Row>
            <Col>
              <div style={styles.brandContainer}>
                <Image src='https://tinyurl.com/y6p8gyf9' style={styles.brandLogo} className='brandLogo' />
                <span style={styles.brandTitle} className='brandTitle'>
                  MERN - Ngintip Ongkir Pengiriman
                </span>
              </div>
              <Form onSubmit={onSubmit} className='mt-3'>
                <Row>
                  <Col lg={3} md={6} sm={12}>
                    <Form.Group>
                      <Form.Label style={styles.formLabel}>Kota Asal</Form.Label>
                      <Form.Control as='select' ref={cityRef} onChange={onSelect}>
                        {state.kab.length < 1 && <option value='pilih kota'>Pilih Kota Tujuan</option>}
                        {state.city.map((c) => (
                          <option key={c.city_id} value={c.city_id}>
                            {c.city_name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col lg={3} md={6} sm={12}>
                    <Form.Group>
                      <Form.Label style={styles.formLabel}>Provinsi Tujuan</Form.Label>
                      <Form.Control as='select' ref={provRef} onChange={onSelect}>
                        {state.kab.length < 1 && <option value='pilih provinsi'>Pilih Provinsi Tujuan</option>}
                        {state.prov.map((p) => (
                          <option key={p.province_id} value={p.province_id}>
                            {p.province}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col lg={3} md={6} sm={12}>
                    <Form.Group>
                      <Form.Label style={styles.formLabel}>Kabupaten Tujuan</Form.Label>
                      <Form.Control as='select' ref={kabRef} onChange={onSelect}>
                        <option value='pilih kabupaten'>Pilih Kabupaten Tujuan</option>
                        {state.kab.map((k) => (
                          <option key={k.city_id} value={k.city_id}>
                            {k.city_name}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                  <Col lg={3} md={6} sm={12}>
                    <Form.Group>
                      <Form.Label style={styles.formLabel}>Jasa Pengiriman</Form.Label>
                      <Form.Control as='select' ref={kurirRef} onChange={onSelect}>
                        {state.kab.length < 1 && <option value='pilih jasa pengiriman'>Pilih Jasa Pengiriman</option>}
                        {couriers.map((c) => (
                          <option key={uuid()} value={c}>
                            {c}
                          </option>
                        ))}
                      </Form.Control>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col lg={3} md={6} sm={12}>
                    <Form.Group>
                      <Form.Label style={styles.formLabel}>Jumlah Berat (Kg)</Form.Label>
                      <Form.Control
                        type='number'
                        ref={beratRef}
                        placeholder='Masukan Jumlah Berat'
                        onChange={onSelect}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col lg={3} md={6} sm={12}>
                    <Form.Group>
                      <button
                        type='submit'
                        className='btn btn-block rounded'
                        style={styles.formBtn}
                        disabled={state.btnDisabled}>
                        {state.btnText}
                      </button>
                    </Form.Group>
                  </Col>
                  <Col lg={6} md={12} sm={12}>
                    <Form.Group>
                      <Card style={styles.tableCard}>
                        <Card.Header className='p-3'>
                          <h5 style={styles.tableCardHeaderTitle}>Table Estimasi Pengiriman</h5>
                        </Card.Header>
                        <Card.Body>
                          <Table bordered hover striped responsive='lg md sm'>
                            <thead style={styles.tableThead}>
                              <tr>
                                <th>Jenis Paket</th>
                                <th>Deskripsi</th>
                                <th>Estimasi Pengiriman</th>
                                <th>Ongkir (Rp)</th>
                              </tr>
                            </thead>
                            <tbody style={styles.tableTbody}>
                              {ongkirCost && (
                                <>
                                  {ongkirCost.costs.map((o) => (
                                    <tr key={uuid()}>
                                      <td>{o.service}</td>
                                      <td>{o.description}</td>
                                      {o.cost.map((v) => (
                                        <>
                                          <td>
                                            {v.etd} {ongkirCost.code !== 'pos' ? 'Hari' : ''}
                                          </td>
                                          <td>{rupiahFormat(v.value)}</td>
                                        </>
                                      ))}
                                    </tr>
                                  ))}
                                </>
                              )}
                            </tbody>
                          </Table>
                        </Card.Body>
                      </Card>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Container>
      )}
    </>
  )
}

Ongkir.propTypes = {
  history: PropTypes.object,
  state: PropTypes.object,
  cityAllAction: PropTypes.func,
  provAllAction: PropTypes.func,
  kabAllAction: PropTypes.func,
  ongkirAction: PropTypes.func
}

const mapStateToProps = (state) => ({
  state: state.ongkir
})

const mapDispatchToProps = (dispatch) => ({
  cityAllAction: () => dispatch(cityAllActionCreator()),
  provAllAction: () => dispatch(provAllActionCreator()),
  kabAllAction: (payload) => dispatch(kabAllActionCreator({ ...payload })),
  ongkirAction: (type, payload) => dispatch(ongkirActionCreator(type, { ...payload }))
})

export default connect(mapStateToProps, mapDispatchToProps)(Ongkir)
