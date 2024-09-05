import { useRef } from "react"

const OtpInput = () => {
    const inputRef1 = useRef()
    const inputRef2 = useRef(false)
    const inputRef3 = useRef()

    const handleInputChange = (e) => {
        if (e.target.id === 'input1' && e.target.value !== '') {
            inputRef2.current.focus()
            return
        }
        if (e.target.id === 'input2' && e.target.value !== '') {
            inputRef3.current.focus()
            return
        }
    }

    const handleKeyDown = (e) => {
        if (e.key === 'Backspace') {
            if (e.target.id === 'input3') {
                inputRef2.current.focus()
                inputRef3.current.value = ''
                return
            }
            else if (e.target.id === 'input2') {
                inputRef1.current.focus()
            }
        }
    }



    return (

        <div className="parent-div">
            <form>
                <input style={{ height: '50px', width: '50px' }} onInput={handleInputChange} id={'input1'} ref={inputRef1} onKeyDown={handleKeyDown} />
                <input style={{ height: '50px', width: '50px' }} onInput={handleInputChange} id={'input2'} ref={inputRef2} onKeyDown={handleKeyDown} />
                <input style={{ height: '50px', width: '50px' }} onInput={handleInputChange} id={'input3'} ref={inputRef3} onKeyDown={handleKeyDown} />
            </form>
        </div>
    )
}
export default OtpInput