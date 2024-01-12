/*

* wrap main component in ToastMessageProvider { context provider hook }
* then import pushToastMessage this function with the help of 
 usePushToastMessage custom hook

 * pushToastMessage function will push the message to the toast message list
        this function will take 3 arguments 
        1 -> message
        2 -> text color
        3 -> background color 




*/

"use client"









import React, { useContext, useEffect, useRef, useState } from 'react'

//css
import './ToastMessage.css'






// context api
const ToastMessagesContext = React.createContext();
const SetToastMessageContext = React.createContext();
const PushToastMessageContext = React.createContext();
const toastDuration = 4;












// functions 






export function useGetToastMessages() { return useContext(ToastMessagesContext) }

export function useSetToastMessages() { return useContext(SetToastMessageContext) }


export function usePushToastMessage() { return useContext(PushToastMessageContext); }





export default function ToastMessage() {

    const messages = useGetToastMessages();
    const setMessages = useSetToastMessages();
    const lastMessageAnimation = useRef();




    function toastMessageBtnFunc(index) {
        setMessages(arr => arr.filter(e => e != arr[index]))
    }




    useEffect(() => {
        setTimeout(() => {
            lastMessageAnimation.current && lastMessageAnimation.current.classList.add('startAnimation');
        }, 10);



    })


    return (
        <div className='ToastMessage'>



            {messages.map((message, index) => {

                let refVariable;
                if (index == messages.length - 1)
                    refVariable = lastMessageAnimation

                return <button
                    ref={refVariable}
                    key={index}
                    onClick={() => toastMessageBtnFunc(index)}
                    className='message'
                    style={{
                        "--back-color": message.backColor,
                        "--color": message.color
                    }}
                >
                    <div className='contentDiv'>

                        <p>{message.text} </p>
                        <i className="fa fa-remove"></i>
                    </div>
                    {/* <div className='timerBar'>
                        <div></div>
                    </div> */}
                </button>



            })}



        </div >
    )
}






export function ToastMessageProvider({ children }) {

    const [toastMessages, setToastMessages] = useState([])




    function pushToastMessage(text, color = "#000", backColor = "#00b9fd") {



        setToastMessages([...toastMessages, {
            text,
            color,
            backColor
        }])


        setTimeout(() => {

            setToastMessages(arr => arr.slice(1))
        }, 1000 * toastDuration)
        // }, 40000)   //testing

    }





    return <ToastMessagesContext.Provider value={toastMessages}>
        <SetToastMessageContext.Provider value={setToastMessages}>
            <PushToastMessageContext.Provider value={pushToastMessage}>


                {children}

            </PushToastMessageContext.Provider>
        </SetToastMessageContext.Provider>
    </ToastMessagesContext.Provider>
}


