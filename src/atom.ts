// import { getAuth } from 'firebase/auth'
// import { atom } from 'recoil'

// export type User = {
//   id: string,
//   name: string | null,
//   email: string | null
// }

// const auth = getAuth();

// export type AuthState = User | null;

// // export const authState = atom<AuthState>({
// //   key: 'authState',
// //   default: null,
// // })
// export const authState = atom({
//   key: 'authState',
//   default: null,
// })



import { useState, useEffect } from "react";
import { atom, useRecoilValue, useRecoilState } from "recoil"
import { getAuth, onAuthStateChanged, User } from "firebase/auth"
import { app } from "./firebase"

type UserState = User | null;

export const userState = atom<UserState>({
  key: "userState",
  default: null,
  dangerouslyAllowMutability: true,
});

export const useAuth = () => {
  const [user, setUser] = useRecoilState(userState)

  useEffect(() => {
    const auth = getAuth(app);
    return onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
  }, [setUser]);

  return user;
};