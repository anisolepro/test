"use client"


import { useRef } from "react";




// components
import Input from "../Input/Input";












// custom hooks
import { useGetAPI } from "../../CustomHooks/useGetAPI";
import { useLoadingStart, useLoadingStop } from "../PreLoader/PreLoader";
import { usePushToastMessage } from "../ToastMessage/ToastMessage";
















export default function SignupDiv({ loginShiftFunc }) {


    // custom hooks
    const api = useGetAPI();
    const loadingStart = useLoadingStart();
    const loadingStop = useLoadingStop();
    const pushToastMessage = usePushToastMessage();



    // variables


    const userNameInput = useRef();
    const emailInput = useRef();
    const passwordInput = useRef();
    const cPasswordInput = useRef();



















    // functions




    function _(el) { return document.querySelector(el); }





    async function signupBtnFunc() {




        // variables
        const username = userNameInput.current.value.trim();
        const email = emailInput.current.value.trim();
        const password = passwordInput.current.value;
        const cPassword = cPasswordInput.current.value;












        if (password != cPassword) {
            pushToastMessage("password doesn't match", "#fff", "red")
            return;
        }




        if (username == "" || password == "") return;







        loadingStart('loginPage');

        const response = await fetch(`${api}/signup`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username, email, password
            })
        }).then(data => data.json())









        loadingStop('loginPage');

        if (response.err != undefined)
            pushToastMessage(response.err, "#fff", "red")

        else if (response.jwtToken != undefined) {
            localStorage.setItem("authToken", response.jwtToken)
            pushToastMessage("Signed Up")

            setTimeout(() => {
                window.location.reload();
            }, 3000);
        }




    }














    return (

        <div className="signupDiv">

            <h1>Sign Up</h1>
            <hr />
            <Input
                type="username"
                text="username"
                refVar={userNameInput}
            />
            <Input
                type="email"
                text="Email"
                refVar={emailInput}
            />
            <Input
                type="password"
                text="password"
                refVar={passwordInput}
            />
            <Input
                type="password"
                text="retype password"
                refVar={cPasswordInput}
                enterCallBack={signupBtnFunc}
            />




            <button
                onClick={signupBtnFunc}
                id='signupBtn'
            >
                Signup
            </button>


            <p id='bottomPID'>Already have an Account?

                <a
                    onClick={loginShiftFunc}
                    href="#"

                >login</a></p>
        </div>


    )

}