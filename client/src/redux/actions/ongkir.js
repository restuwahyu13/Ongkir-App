import axios from 'axios'

export const ongkirState = {
  city: [],
  prov: [],
  kab: [],
  cost: [],
  cityId: '',
  provId: '',
  from: '',
  to: '',
  weight: '',
  courier: '',
  btnText: ' Cetak Data',
  btnDisabled: false
}

export const CITY_SUCCESS = 'CITY_SUCCESS'
export const CITY_ALL = 'CITY_ALL'
export const PROV_SUCCESS = 'PROV_SUCCESS'
export const PROV_ALL = 'PROV_ALL'
export const KAB_SUCCESS = 'KAB_SUCCESS'
export const KAB_ALL = 'KAB_ALL'
export const COST_SUCCESS = 'COST_SUCCESS'
export const COURIR_SUCCESS = 'COURIR_SUCCESS'
export const ONGKIR_SUCCESS = 'ONGKIR_SUCCESS'
export const ONGKIR_CLEANUP = 'ONGKIR_CLEANUP'

export const cityAllActionCreator = () => async (dispatch) => {
  const { data } = await axios.get('/api/cekongkir/city')
  dispatch({
    type: CITY_ALL,
    payload: data.data.rajaongkir.results
  })
}

export const provAllActionCreator = () => async (dispatch) => {
  const { data } = await axios.get('/api/cekongkir/prov')
  dispatch({
    type: PROV_ALL,
    payload: data.data.rajaongkir.results
  })
}

// export const cityAllActionCreator = () => (dispatch) => {
//   return axios
//     .get('/api/cekongkir/city', { headers: { 'content-Type': 'application/json' } })
//     .then(({ data }) => {
//       dispatch({
//         type: CITY_ALL,
//         payload: data.data.rajaongkir.results
//       })
//     })
//     .catch((err) => {
//       return err
//     })
// }

// export const provAllActionCreator = () => (dispatch) => {
//   return axios
//     .get('/api/cekongkir/prov', { headers: { 'content-Type': 'application/json' } })
//     .then(({ data }) => {
//       dispatch({
//         type: PROV_ALL,
//         payload: data.data.rajaongkir.results
//       })
//     })
//     .catch((err) => {
//       return err
//     })
// }

export const kabAllActionCreator = ({ cityId, provId }) => async (dispatch) => {
  const { data } = await axios.get(`/api/cekongkir/kab?cityid=${''}&provid=${provId}`)
  dispatch({
    type: KAB_ALL,
    payload: data.data.rajaongkir.results
  })
}

// export const kabAllActionCreator = ({ cityId, provId }) => (dispatch) => {
//   return axios
//     .get(`/api/cekongkir/kab?cityid=${''}&provid=${provId}`)
//     .then(({ data }) => {
//       dispatch({
//         type: KAB_ALL,
//         payload: data.data.rajaongkir.results
//       })
//     })
//     .catch((err) => {
//       return err
//     })
// }

export const ongkirActionCreator = (type, payload) => async (dispatch) => {
  const { from, to, weight, courier } = payload
  const { data } = await axios.post('/api/cekongkir/cost', { from, to, weight, courier: courier.toLowerCase() })
  dispatch({
    type: type,
    payload: {
      cost: data.data.rajaongkir.results,
      btnText: payload.btnText,
      btnDisabled: payload.btnDisabled
    }
  })

  setTimeout(() => {
    dispatch({
      type: ONGKIR_CLEANUP,
      payload: { ...ongkirState }
    })
  }, 3000)
}
