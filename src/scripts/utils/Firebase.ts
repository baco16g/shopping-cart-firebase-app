import * as firebase from 'firebase'
import config from '@config/firebase'

export type User = firebase.User
export type SnapShot = firebase.database.DataSnapshot

export const initialize = () => firebase.initializeApp(config)

export const signIn = ({ email, password }: ILoginParams) => {
  return firebase.auth().signInWithEmailAndPassword(email, password)
}

export const signOut = () => {
  return firebase.auth().signOut()
}

export const signUp = ({ email, password }: ILoginParams) => {
  return firebase.auth().createUserWithEmailAndPassword(email, password)
}

export const getCurentUser = () => {
  const { currentUser } = firebase.auth()
  return currentUser
}

export const fetchUser = (
  success: (user: User) => void,
  faield: () => void
) => {
  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      success(user)
    } else {
      faield()
    }
  })
}

const connectDBtoProducts = () => {
  return firebase.database().ref(`/products`)
}

export const addEventForfetchProducts = (cb: (snapshot: SnapShot) => void) => {
  connectDBtoProducts().on('value', (snapshot: SnapShot | null) => {
    if (!snapshot) {
      throw new Error('SnapShot not found')
    }
    cb(snapshot)
  })
}
