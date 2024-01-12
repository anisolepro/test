"use client"

import React, { useEffect } from 'react'





// css
import './style.css';








// components
import PreLoader, { useLoadingStop } from '../../components/PreLoader/PreLoader';
import LoginDiv from '../../components/LoginDiv/LoginDiv';
import SignupDiv from '../../components/SignupDiv/SignupDiv';
import ToastMessage from '../../components/ToastMessage/ToastMessage';











// custom hooks
import { useGetAPI } from '../../CustomHooks/useGetAPI';

















function App() {


    // custom hooks
    const api = useGetAPI();
    const loadingStop = useLoadingStop();















    // functions


    function _(el) { return document.querySelector(el); }






    function signUpShiftFunc() {
        _(".mainCredentialDiv").classList.add("shiftRightTransition")
        _(".App").classList.add("signUpShift")
    }
    function loginShiftFunc() {
        _(".mainCredentialDiv").classList.remove("shiftRightTransition")
        _(".App").classList.remove("signUpShift")
    }











    // useEffect
    useEffect(() => {



        if (localStorage.getItem("authToken") == undefined) {
            loadingStop('loginPage');
            return;
        }


        fetch(`${api}/credential/auth`, {
            method: "POST",

            headers: {
                "Content-Type": "application/json",
                "authToken": localStorage.getItem("authToken"),
            }
        }).then(response => {

            loadingStop('loginPage')

            if (response.status == 401 || response.status == 403)
                localStorage.clear();


            window.location.href = window.location.origin
            return response.json();
        }

        )





    }, [])


    return (
        <>

            <PreLoader
                id={'loginPage'}
            />
            <ToastMessage />



            <div className="App">






                <div className="backgroundLoginDiv">
                    <h3>Already have an account</h3>
                    <button
                        onClick={loginShiftFunc}
                    >Login</button>
                </div>






                <div className="backgroundSignupDiv">
                    <h3>don't have an account?</h3>
                    <button
                        onClick={signUpShiftFunc}
                    >Sign UP</button>
                </div>







                <div className='mainCredentialDiv'>

                    <LoginDiv
                        signUpShiftFunc={signUpShiftFunc}
                    />

                    <SignupDiv
                        loginShiftFunc={loginShiftFunc}
                    />

                </div>









            </div>
        </>
    );
}

export default App;
