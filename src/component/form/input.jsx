import React, { useState } from 'react'

const Form = () => {
    const TEST = /[A-Z]/
    const errorMap = {
        'name': /[A-Z]/,
        'class': /^[a-z]+$/,
        'roll': /[0-9]/,
        'subject': /[\b\w{1,5}\b]/
    }
    const [formData, setFormData] = useState({
        name: '',
        class: '',
        roll: '',
        subject: '',
    })
    const [errorState, setErrorState] = useState({
        name: null,
        class: null,
        roll: null,
        subject: null
    })

    const handleInputChange = (e) => {
        const { id, value } = e.target

        if (value !== '') {
            const isValid = errorMap[id].test(value)

            if (!isValid) {
                setErrorState((prev) => ({
                    ...prev,
                    [id]: 'Error Please use correct format',
                }))
            } else {
                setErrorState((prev) => ({
                    ...prev,
                    [id]: null,
                }))
            }
        }
        else {
            setErrorState((prev) => ({
                ...prev,
                [id]: null,
            }))
        }
        setFormData((prev) => ({
            ...prev,
            id: value
        }))
    }
    const handleSubmitClick = (e) => {
        e.preventDefault();
    }
    console.log({ errorState });

    return (
        <div className='flex min-h-screen w-full fkex-col justify-center '>
            <form className='flex flex-col gap-3'>

                <label>Name</label>
                <input className='border-2 border-black rounded-lg pl-1' id='name' onChange={handleInputChange} required />
                {errorState.name && <p className='text-red-500'>{errorState.name}</p>}
                <label>Class</label>
                <input className='border-2 border-black rounded-lg pl-1' id='class' onChange={handleInputChange} required />
                {errorState.class && <p className='text-red-500'>{errorState.class}</p>}

                <label>Roll </label>
                <input className='border-2 border-black rounded-lg pl-1' id='roll' type='number' onChange={handleInputChange} min={0} max={90} required />
                {errorState.roll && <p className='text-red-500'>{errorState.roll}</p>}

                <label>Subject</label>
                <input className='border-2 border-black rounded-lg pl-1' id='subject' onChange={handleInputChange} required />
                {errorState.subject && <p className='text-red-500'>{errorState.subject}</p>}
                <button className=' h-10 bg-blue-700 rounded-lg text-white' type='submit' onSubmit={handleSubmitClick}> Submit</button>

            </form>
        </div>
    )
}
export default Form
