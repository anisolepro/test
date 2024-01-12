import React from 'react'

// css
import './SchemaElement.css'



const SchemaElement = ({
    name,
    type
}) => {


    if (type.toLowerCase() == "datetime")

        return (
            <label className='SchemaElement'>
                <h3>{name}</h3>
                <input type="datetime-local"
                    spellCheck={false}
                />
            </label>
        )






    // default 
    return (
        <label className='SchemaElement'>
            <h3>{name}</h3>
            <input type={type.toLowerCase()}
                spellCheck={false}
            />
        </label>
    )
}

export default SchemaElement