import { ongkirState, CITY_ALL, PROV_ALL, KAB_ALL, ONGKIR_SUCCESS, ONGKIR_CLEANUP } from '../actions/ongkir'

export const ongkirReducer = (state = ongkirState, action) => {
  switch (action.type) {
    case CITY_ALL:
      return { ...state, city: [...action.payload] }
    case PROV_ALL:
      return { ...state, prov: [...action.payload] }
    case KAB_ALL:
      return { ...state, kab: [...action.payload] }
    case ONGKIR_SUCCESS:
      return {
        ...state,
        cost: [...action.payload.cost],
        btnText: action.payload.btnText,
        btnDisabled: action.payload.btnDisabled
      }
    case ONGKIR_CLEANUP: {
      return {
        ...state,
        kab: action.payload.kab,
        btnText: action.payload.btnText,
        btnDisabled: action.payload.btnDisabled
      }
    }
    default:
      return state
  }
}
