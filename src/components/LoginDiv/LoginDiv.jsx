"use client"


import { useRef } from "react";



// components
import Input from "../Input/Input";






// custom hooks
import { useGetAPI } from "../../CustomHooks/useGetAPI";
import { useLoadingStart, useLoadingStop } from "../PreLoader/PreLoader";
import { usePushToastMessage } from "../ToastMessage/ToastMessage";









export default function LoginDiv({ signUpShiftFunc }) {



    // custom hooks
    const api = useGetAPI();
    const loadingStart = useLoadingStart();
    const loadingStop = useLoadingStop();
    const pushToastMessage = usePushToastMessage();





    // variables

    const userNameInput = useRef();
    const passwordInput = useRef();



















    // functions

    function _(el) { return document.querySelector(el); }





    async function loginBtnFunc(e) {
        const username = userNameInput.current.value.trim();
        const password = passwordInput.current.value;

        if (username == "" || password == "") return;





        loadingStart('loginPage');


        const response = await fetch(`${api}/credential/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username, password
            })
        }).then(data => data.json())





        loadingStop('loginPage');


        if (response.err != undefined)
            pushToastMessage(response.err, "#fff", "red")

        else if (response.jwtToken != undefined) {
            localStorage.setItem("authToken", response.jwtToken)

            pushToastMessage("logged in")

            setTimeout(() => {
                window.location.reload();
            }, 2000);
        }


    }












    return (
        <div className="loginDiv">

            <h1>Login</h1>
            <hr />

            <Input
                type="username"
                text="username"
                refVar={userNameInput}
            />
            <Input
                type="password"
                text="password"
                refVar={passwordInput}
                enterCallBack={loginBtnFunc}
            />



            <a href="#">Forgot Password?</a>

            <button
                onClick={loginBtnFunc}
                id='loginBtn'
            >
                Login
            </button>


            <p id='bottomPID'>don't have an Account?

                <a
                    onClick={signUpShiftFunc}
                    href="#"

                >Signup</a></p>
        </div>

    )
}