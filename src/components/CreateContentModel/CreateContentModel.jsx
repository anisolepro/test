import { useRef, useState } from 'react'



// css
import './CreateContentModel.css'



// react icons 
import { RiDeleteBin2Fill } from "react-icons/ri";
import { MdCancel } from "react-icons/md";



// components
import Input from '../Input/Input'



const Model = ({
    ModelHeading,
    callBackSubmitFunc
}) => {

    const modelRef = useRef()
    const nameInputRef = useRef();


    const [contentSchema, setContentSchema] = useState([])
    const elementTypes = [
        'text',
        'numb',
        'code',
        'bool',
        'Date',
        'DateTime',
        'file',
        'image',
        'URL',
    ]





    // functions 


    function cancelModelFunc() {
        modelRef.current.classList.remove('showModelDiv');

    }







    function nameInputEnterFunc(e) {
        // todo
        console.log(e)
    }


    function addContentSchema() {
        setContentSchema(preState => [...preState, {
            name: "",
            type: "text"
        }])
    }

    function updateContentSchema(index, key, value) {
        setContentSchema(preState => {
            preState[index][key] = value

            return [...preState]
        })

    }

    function removeContentSchema(index) {
        setContentSchema(preState => [...preState.slice(0, index), ...preState.slice(index + 1)])
    }





    function submitBtn() {


        callBackSubmitFunc(nameInputRef.current.value, contentSchema)

        setContentSchema([])
        cancelModelFunc()

    }

















    return (
        <div
            ref={modelRef}
            className='createContentModelDiv smoothTransition'>
            <h1 align="center">{ModelHeading}
                <button
                    className='childCenter'
                    onClick={cancelModelFunc}
                >
                    <MdCancel />
                </button>
            </h1>

            <div className='InputSection'>
                <label >

                    <Input
                        type="text"
                        text="Name "
                        refVar={nameInputRef}
                        enterCallBack={nameInputEnterFunc}
                        textColor={"#fff"}
                    />

                </label>



                <label >

                    <h3>Content Schema</h3>
                    <div className='ContentSchema'>

                        <div className='contentSchemaListDiv'>


                            {
                                contentSchema.map((e, i) => {
                                    return <div
                                        className='SchemaElement'
                                        key={i}>
                                        <input type="text"
                                            placeholder='Name'
                                            value={e.name}
                                            onChange={(el) => updateContentSchema(i, 'name', el.target.value)}
                                        />
                                        <select value={e.type}
                                            onChange={el => updateContentSchema(i, "type", el.target.value)}
                                        >
                                            {
                                                elementTypes.map(type => <option
                                                    key={type}
                                                    value={type}>{type}</option>
                                                )
                                            }
                                        </select>
                                        <button
                                            onClick={() => removeContentSchema(i)}
                                        >
                                            <RiDeleteBin2Fill />
                                        </button>
                                    </div>
                                })
                            }
                        </div>

                        <a
                            onClick={addContentSchema}
                            className='contentAddBtn smoothTransition'
                        >+</a>
                    </div>
                </label>



                <button
                    onClick={submitBtn}
                >Submit</button>
            </div>
        </div>
    )
}

export default Model