
import React, { useState, useEffect } from 'react';
import '../components/Todo.css'
import { FaPlus, FaEdit, FaTrash, FaTimes } from 'react-icons/fa'; // Importing new icons

const getLocalStorage = () => {
  const lists = localStorage.getItem('mytodolist');

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todo = () => {
  const [inputData, setInputData] = useState('');
  const [items, setItems] = useState(getLocalStorage);
  const [editItems, setEditItems] = useState('');
  const [toggleButton, setToggleButton] = useState(false);

  const addItem = () => {
    if (!inputData) {
      alert('Enter the item');
    } else if (inputData && toggleButton) {
      setItems(
        items.map((curElm) => {
          if (curElm.id === editItems) {
            return { ...curElm, name: inputData };
          }
          return curElm;
        })
      );
      setInputData('');
      setEditItems(null);
      setToggleButton(false);
    } else {
      const myNewInputData = {
        id: new Date().getTime().toString(),
        name: inputData,
      };
      setItems([...items, myNewInputData]);
      setInputData('');
    }
  };

  // edit items
  const editItem = (index) => {
    const item_todo_edited = items.find((curElm) => {
      return curElm.id === index;
    });
    setInputData(item_todo_edited.name);
    setEditItems(index);
    setToggleButton(true);
  };

  const deleteItem = (index) => {
    const updatedItems = items.filter((curElm) => {
      return curElm.id !== index;
    });
    setItems(updatedItems);
  };

  const removeAll = () => {
    return setItems([]);
  };

  // adding localStorage
  useEffect(() => {
    localStorage.setItem('mytodolist', JSON.stringify(items));
  }, [items]);

  return (
    <div>
      <div className="todo-container">
        <h1>Todo List</h1>
        <div className="input-form">
          <input
            type="text"
            placeholder="Enter a new task"
            value={inputData}
            onChange={(e) => setInputData(e.target.value)}
          />
          {toggleButton ? (
            <FaEdit className="btn" onClick={addItem} />
          ) : (
            <FaPlus className="btn" onClick={addItem} />
          )}
        </div>

        <div className="show-items">
          {items.map((curElm) => {
            return (
              <div className="each-item input-form" key={curElm.id}>
                <h3>{curElm.name}</h3>
                <div className="btn">
                  <FaEdit className="btn" onClick={() => editItem(curElm.id)} />
                  <FaTrash className="btn" onClick={() => deleteItem(curElm.id)} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="input-form">
          <button className="btn" onClick={removeAll}>
            <FaTimes /> <span>REMOVE ALL</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Todo;
