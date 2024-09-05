import React, { useState } from "react"
const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const numericChars = '0123456789';
const specialChars = '!@#$%^&*()_+~`|}{[]:;?><,./-=';
const Password = () => {
    const [password, setPassword] = useState()
    const [inputForm, setInputForm] = useState({
        number: false,
        special_characters: false,
        lowercase: false,
        uppercase: false,
    })

    //Special Character
    //Numeric
    // Include UpperCase
    //Include Lowercase
    //Exclude Duplicate Characters
    const handleInputChange = (e) => {
        const { id, checked } = e.target
        console.log(id, checked);
        setInputForm((prev) => ({
            ...prev,
            [id]: checked
        }))
    }
    console.log(inputForm);
    const generatePassword = () => {
        let allChars = ''
        if (inputForm.number) allChars += numericChars;
        if (inputForm.uppercase) allChars += uppercaseChars;
        if (inputForm.lowercase) allChars += lowercaseChars;
        if (inputForm.special_characters) allChars += specialChars;
        if (allChars === '') { alert('Please select atleast one option'); return; }

        let tempPassword = ''
        if (inputForm.number) tempPassword += randomCharFromSet(numericChars)
        if (inputForm.uppercase) tempPassword += randomCharFromSet(uppercaseChars)
        if (inputForm.lowercase) tempPassword += randomCharFromSet(lowercaseChars)
        if (inputForm.special_characters) tempPassword += randomCharFromSet(specialChars)


        for (let i = tempPassword.length; i < 12; i++) {
            tempPassword += randomCharFromSet(allChars)
        }
        setPassword(shuffleString(tempPassword));
    }

    const shuffleString = (password) => {
        return password.split('').sort(() => Math.random() - 0.5).join('')
    }
    const randomCharFromSet = (tempPassword) => {
        return tempPassword[Math.floor(Math.random() * tempPassword.length)]
    }
    return (
        <div>
            <form className=" ">

                <input type='checkbox' value={'speical_character'} id="special_characters" onChange={handleInputChange} />
                <label>Special</label> <br ></br>

                <input type='checkbox' value={'numeric'} id='number' onChange={handleInputChange} />
                <label>Number</label> <br />
                <input type='checkbox' value={'lower_case'} id='lowercase' onChange={handleInputChange} />
                <label>LowerCase</label> <br />
                <input type='checkbox' value={'uppercase'} id='uppercase' onChange={handleInputChange} />
                <label>Uppercase</label> <br />
            </form>
            <p className='font-sans text-sm text-red-500'>{password}</p>
            <button onClick={generatePassword} className="bg-blue-500 text-white font-serif text-xl p-3">
                Generate Password
            </button>
        </div>
    )
}
export default Password