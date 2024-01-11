"use client"

import React, { useContext, useEffect, useState } from 'react'
import { useGetAPI } from './useGetAPI';



const UserDetailContext = React.createContext();
const SetUserDetailContext = React.createContext();






export function useUserDetail() { return useContext(UserDetailContext) }
export function useSetUserDetail() { return useContext(SetUserDetailContext) }




export default function UserDetailProvider({ children }) {



    const api = useGetAPI();
    const [userDetails, setUserDetails] = useState(null);




    function updateUserDetails() {
        const authToken = window.localStorage.getItem('authToken');

        if (!authToken && window.location.pathname != '/login') {
            window.location.href = '/login';
            return;
        }


        if (!authToken || userDetails) return;
        fetch(`${api}/credential/auth`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                authToken
            }
        }).then(response => {

            if (response.status == 401 || response.status == 403)
                window.localStorage.clear();

            if (!window.localStorage.getItem('authToken'))
                window.location.href = '/login'


            return response.json()
        })
            .then(data => setUserDetails(data))
    }



    useEffect(() => {
        updateUserDetails();

    }, []);



    return <UserDetailContext.Provider value={userDetails}>
        <SetUserDetailContext.Provider value={setUserDetails}>

            {children}

        </SetUserDetailContext.Provider>
    </UserDetailContext.Provider>
}