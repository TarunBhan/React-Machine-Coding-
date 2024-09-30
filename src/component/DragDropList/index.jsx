import React, { useEffect, useRef, useState } from 'react'
import { DndProvider, useDrag, useDrop, DraggleBa } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
const List = () => {
    const [listArray, setListArray] = useState([])
    const inputRef = useRef([])
    const parentListRef = useRef()

    const handleNewListCreation = () => {
        const randomId = Math.random() * 10
        setListArray((prev) => {
            let temp = [...prev]
            temp.push({ id: randomId, item: [], title: parentListRef.current.value })
            return temp
        })
    }

    //current single list
    const orderList = (dragIndex, hoverIndex, parentListSelectedIndex) => {
        let updateList = [...listArray[parentListSelectedIndex].item];
        if (dragIndex >= updateList.length || hoverIndex >= updateList.length) {
            console.error('Indices out of bounds');
            return;
        }
        let [movedItem] = updateList.splice(dragIndex, 1);
        updateList.splice(hoverIndex, 0, movedItem);
        let updatedListArray = [...listArray];
        updatedListArray[parentListSelectedIndex] = { item: updateList };
        setListArray(updatedListArray);
    }


    const addListItem = (parentIndex) => {
        setListArray((prev) => {
            const newArray = prev.map((item, index) => {
                if (index === parentIndex) {
                    return {
                        ...item,
                        item: [...item.item, inputRef.current[parentIndex].value],
                    };
                }
                return item;
            });
            return newArray;
        });
    };

    const deleteListItem = (parentIndex, itemIndex) => {
        console.log(parentIndex, itemIndex);
        setListArray((prev) => {
            const newArray = prev.map((item, index) => {
                if (index === parentIndex) {
                    return {
                        ...item,
                        item: item.item.filter((_, i) => i !== itemIndex), // Filter out the item at itemIndex
                    };
                }
                return item;
            });

            return newArray;
        });
    };

    console.log(listArray);
    const DragItemBox = ({ id, item, itemIndex, parentListSelectedIndex, orderList }) => {

        const [, ref] = useDrag({
            type: 'itemBox',
            item: { id, itemIndex, parentIndex: parentListSelectedIndex }
        })
        const [, dropItem] = useDrop({
            accept: 'itemBox',
            hover: (dragItem) => {
                if (dragItem.itemIndex)
                    if (dragItem?.itemIndex !== itemIndex) {
                        console.log('called>>>');
                        orderList(dragItem.itemIndex, itemIndex, parentListSelectedIndex)
                        dragItem.itemIndex = itemIndex
                    }

            }
        })

        return (
            <div ref={(refNode) => ref(dropItem(refNode))} style={{ width: "90%", border: '1px solid black', margin: 10, display: 'flex', flexDirection: 'row' }}>
                <h1 style={{ width: '90%' }}>
                    {item}
                </h1>
                <button onClick={() => deleteListItem(parentListSelectedIndex, itemIndex)} style={{ background: 'red', color: 'white', width: '80px' }}> Delete Item</button>
            </div >
        )
    }

    return (
        <div style={{ flexDirection: "column", display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'center', height: '100%' }}>
            <div style={{ flexDirection: "column", display: 'flex', width: '30%', alignItems: 'center', justifyContent: 'center' }}>
                <input type='text' style={{ border: '1px solid black', borderRadius: '10px', marginBlock: '40px' }} ref={parentListRef} />
                <button onClick={handleNewListCreation} style={{ color: 'white', background: 'blue', padding: 3, marginBottom: 20 }}>Add New List</button>
                {/* <button onClick={handleDeleteList} style={{ color: 'white', background: 'blue', padding: 3, marginBottom: 20 }}>Delete List</button> */}
            </div>
            {/* List FUnciton */}
            <div style={{

            }}>
                <DndProvider backend={HTML5Backend}>
                    <div style={{ display: 'flex', flexDirection: 'row', gap: 10 }}>
                        {listArray.length > 0 && listArray?.map((item, parentIndex) => {
                            return (
                                <div key={parentIndex} style={{ display: 'flex', flexDirection: 'column', border: '1px solid black', padding: 5 }}>
                                    <div>
                                        <h1 style={{ fontSize: '18px' }}>{item.title}</h1>
                                        <input placeholder='Add Item' ref={inputRef.current[item]} ref={(el) => inputRef.current[parentIndex] = el} style={{ border: '1px solid black' }} />
                                        <button onClick={(e) => {
                                            e.preventDefault()
                                            addListItem(parentIndex)
                                        }}> Add List Item</button>
                                    </div>
                                    <div>
                                        {item.item.map((lists, index) => {
                                            return (
                                                <DragItemBox id={item.id} key={index} itemIndex={index} item={lists} parentListSelectedIndex={parentIndex} orderList={orderList} />
                                            )
                                        })}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </DndProvider>
            </div>
        </div>
    )
}
export default List