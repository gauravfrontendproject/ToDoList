import React, { useEffect, useState } from 'react'
import "./style.css"

// get the localStorange data back
const getLocalData = () => {
    const lists = localStorage.getItem("mytodolist")

    if (lists) {
        return JSON.parse(lists);
    } else {
        return [];
    }
}

const Todo = () => {
    const [inputdata, setInputData] = useState("")
    const [items, setItems] = useState(getLocalData())
    const [isEditItem, setIsEditItem] = useState("")
    const [toggleButton, setToggleButton] = useState(false)
    const addItem = () => {
        if (!inputdata) {
            alert("Please fill the data")
        }
        else if (inputdata && toggleButton) {
            setItems(
                items.map((curElem) => {
                    if (curElem.id == isEditItem) {
                        return { ...curElem, name: inputdata }
                    }
                    return curElem;
                })
            )
            setInputData([])
            setIsEditItem()
            setToggleButton(false)
        }
        else {
            const myNewInputData = {
                id: new Date().getTime().toString(),
                name: inputdata,
            }
            setItems([...items, myNewInputData])
            setInputData("");
        }
    }


    // edit the items
    const editItem = (index) => {
        const item_todo_edited = items.find((curElem) => {
            return curElem.id === index;
        })
        setInputData(item_todo_edited.name)
        setIsEditItem(index)
        setToggleButton(true)
    }

    // How to delere items Section
    const deleteItem = (index) => {
        const updatedItems = items.filter((curElem) => {
            return curElem.id === index;
        })
        setItems(updatedItems)
    }


    // remove all the elemens
    const removeAll = () => {
        setItems([])
    }

    // adding localstorage
    useEffect(() => {
        localStorage.setItem("mytodolist", JSON.stringify(items))
    })
    return (
        <>
            <div className="main-div">
                <div className='child-div'>
                    <figure>
                        <img src="./images/todo.svg" alt="todologo" />
                        <figcaption>Add Your List Here ✌️</figcaption>
                    </figure>
                    <div className="addItems">
                        <input type="text" name="" id="" placeholder="✍️ Add Item"
                            className="form-control"
                            value={inputdata}
                            onChange={(event) => setInputData(event.target.value)}

                        />
                        {toggleButton ? (
                            <i className="fa fa-edit add-btn" onClick={addItem}></i>
                        ) : (
                            <i className="fa fa-plus add-btn" onClick={addItem}></i>
                        )}

                    </div>
                    {/* Show our items */}
                    <div className="showItems">

                        {items.map((curElem, index) => {
                            return (
                                <div className="eachItem" key={curElem.id}>
                                    <h3>{curElem.name}</h3>
                                    <div className="todo-btn">
                                        <i className="far fa-edit add-btn" onClick={() => editItem(curElem.id)}></i>
                                        <i className="far fa-trash-alt add-btn" onClick={() => {
                                            deleteItem(curElem.id)
                                        }}></i>
                                    </div>
                                </div>
                            )
                        })}
                    </div>

                    {/* Remove all button */}
                    <div className="showItems">
                        <button className="btn effect04" data-sm-link-text="Remove ALl"
                            onClick={removeAll}>
                            <span> CHECK LIST </span>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Todo
