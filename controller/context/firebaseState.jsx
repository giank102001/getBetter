import React, { useReducer } from "react";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';

import firebase from '../firebase';
import FirebaseContext from "./firebaseContext";
import FirebaseReducer from "./firebaseReducer";

import { CREAR_CUENTA, INICIAR_SESION } from "../types";

const auth = getAuth(firebase);
const db = getFirestore(firebase);


const FirebaseState = (props) => {
    // crear state incial
    const initialState = {
        resultCreate: '',
        userLog: ''
    }

    // useReducer con dispatch para ejecutar las funciones
    const [state, dispatch] = useReducer(FirebaseReducer, initialState);

    // funcion para crear cuenta
    const crearCuenta = async (email, password, userName, role) => {
        let r;
        try {
            // Crea el usuario en Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Guardar datos en Firestore
            const userDocRef = doc(db, 'users', user.uid);
            await setDoc(userDocRef, {
                email: user.email,
                userName,
                role, // Ptient o fisio
                createdAt: new Date().toISOString(),
            });


            // Comprobar que los datos se guardaron en Firestore
            const userDoc = await getDoc(userDocRef);
            if (userDoc.exists()) {
                r = userDoc.data().email;
            } else {
                r = 'incorrect';
            }

        } catch (error) {
            console.error('Error al registrar usuario:', error.message);
            r = 'incorrect';
        }

        // tenemos resultados de la base de datos
        dispatch({
            type: CREAR_CUENTA,
            payload: r
        });
    }

    // funcion para iniciar sesion
    const iniciarSesion = async (email, password) => {
        let user = null;

        try {
            // Inicia sesión con Firebase Authentication
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const firebaseUser = userCredential.user;

            // Recuperar el rol del usuario desde Firestore
            const userDoc = await getDoc(doc(db, 'users', firebaseUser.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                const role = userData.role || 'sin rol'; // Asegurarse de que el rol esté definido
                user = {
                    uid: firebaseUser.uid,
                    email: firebaseUser.email,
                    role,
                };
            } else {
                console.error('Error: No se encontró el documento en Firestore.');
                Alert.alert('Error', 'No se encontraron datos del usuario en Firestore.');
            }

        } catch (error) {
            console.error('Error al iniciar sesión:', error.message);
            user = error.code;
        }

        // tenemos resultados de la base de datos
        dispatch({
            type: INICIAR_SESION,
            payload: user
        });
    }

    return (
        <FirebaseContext.Provider
            value={{
                resultCreate: state.resultCreate,
                userLog: state.userLog,
                firebase,
                crearCuenta,
                iniciarSesion
            }}
        >
            {props.children}
        </FirebaseContext.Provider>
    )
}

export default FirebaseState;