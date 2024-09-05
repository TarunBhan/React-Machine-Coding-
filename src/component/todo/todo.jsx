import React, { useRef, useState } from "react"
const Todo = () => {
    const [todoList, settodoList] = useState([])
    const inputRef = useRef()
    const [selectedIndex, setSelectedIndex] = useState(null)

    const handleOnClick = () => {
        if (!inputRef.current.value) {
            return
        }
        let tempVal = inputRef.current.value
        const randomId = Math.random().toString(36).substr(2, 9) + '-' + Date.now()

        settodoList((prev) => [
            ...prev,
            { id: randomId, value: tempVal }
        ])
        inputRef.current.value = ''
    }
    const handleSelectItem = (itemId) => {
        setSelectedIndex(itemId)
    }
    const onDelete = () => {
        const filterArray = todoList.filter((item) => item.id !== selectedIndex)

        settodoList(filterArray)
    }
    return (
        <div className="min-h-screen w-full bg-white flex justify-center items-center flex-col">
            <input type={'text'} ref={inputRef} className="border-2 border-red-500" />
            <div>
                {
                    todoList.map((item, index) => {
                        return <div key={index} onClick={() => handleSelectItem(item.id)} className="flex flex-row border-4 border-red-800 p-1 mt-5">
                            <div>{item.value}</div>
                            {selectedIndex === item.id && <div><p> selectedIndex</p></div>}
                        </div>
                    })
                }
            </div>
            <button className="h-10 w-32 bg-blue-500 text-red-800 rounded-xl font-serif text-center font text-xs my-5" onClick={handleOnClick}>ADD</button>
            <button className="h-10 w-32 bg-red-500 text-white rounded-xl font-serif text-xs" onClick={onDelete}>Delete</button>
        </div>
    )
}
export default Todo