import React from 'react'

function MCQ({ data }) {
    const { statement, options, id } = data
    
    return (
        <div>
            <h3>{statement}</h3>
            {options.map((option, index) => <div key={index}>
            <input
              type="radio"
              id={option.text}
              value={option.text}
              name="options"
            />
            <label htmlFor={option.text}>{option.text}</label>            </div>)}
        </div>
    )
}

export default MCQ
