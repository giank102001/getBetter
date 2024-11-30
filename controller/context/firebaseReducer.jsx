import { CREAR_CUENTA, INICIAR_SESION } from '../types'

const FirebaseReducer = (state, action) => {
    switch (action.type) {
        case CREAR_CUENTA:
            return {
                ...state,
                resultCreate: action.payload
            }
        case INICIAR_SESION:
            return {
                ...state,
                userLog: action.payload
            }
        default:
            return state;
    }
}

export default FirebaseReducer;