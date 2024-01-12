"use client"

import React, { useContext, useState } from 'react'



const GetAPIContext = React.createContext();



export function useGetAPI() { return useContext(GetAPIContext) }




export default function APIProvider({ children }) {

    const api = "/api/"

    return <GetAPIContext.Provider value={api}>

        {children}

    </GetAPIContext.Provider>
}