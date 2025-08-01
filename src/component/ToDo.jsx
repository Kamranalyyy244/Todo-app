import React, { useEffect, useRef, useState } from 'react'
import Todo_icon from '../assets/todo_icon.png'
import TodoItem from './TodoItem'

const ToDo = () => {

    const [todoList, setTodoList] = useState(localStorage.getItem("todos")?
        JSON.parse(localStorage.getItem("todos")) : []);

    const inputRef = useRef();

    const add = ()=> {
        const inputText = inputRef.current.value.trim();

        if(inputText === ""){
            return null;
        }
        
        const  newTodo = {
            id: Date.now(),
            text: inputText,
            isComplete: false,
        }
        setTodoList((prev)=> [...prev,newTodo]);
        inputRef.current.value= "";
    }
    const deleteTodo = (id)=>{
        setTodoList((prvTodos)=>{
           return prvTodos.filter((todo) => todo.id !== id)
        })
    }

    const toogle = (id) => {
        setTodoList((prevTodos)=>{
            return prevTodos.map((todo)=>{
                if(todo.id === id){
                    return {...todo, isComplete: !todo.isComplete}
                }
                return todo;
            })
        })
    }

    useEffect(()=>{
        localStorage.setItem("todos",JSON.stringify(todoList))
    },[todoList])

  return (
    <div className='bg-white place-self-center w-11/12 max-w-md flex flex-col p-4 sm:p-6 md:7 
    min-h-[550px] rounded-xl shadow-md' >


        {/* Title */}

        <div className='flex items-center mt-7 gap-2' >
            <img src={Todo_icon} className='w-9' alt="" />
            <h1 className='text-2xl sm:text-3xl md:text-4xl font-semibold' >ToDo List</h1>
        </div>

        {/* Input */}
        <div className='flex items-center my-7 bg-gray-200 rounded-full' >
            <input ref={inputRef} className='bg-transparent border-0 outline-none 
            flex-1 h-12 sm:h-14 pl-4 pr-2 placeholder:text-slate-600'  type="text" placeholder='Add your task' />
            <button onClick={add} className='border-none rounded-full bg-orange-600 w-full md:w-32 h-12
             text-white font-medium cursor-pointer transition duration-300 hover:bg-orange-700 ' >ADD +</button>
        </div>

        {/* Todo-list */}

        <div  className='flex flex-col gap-3'>
            {todoList.map((item,index )=>{
                return <TodoItem key={index} id={item.id} text={item.text}
                isComplete={item.isComplete} deleteTodo={deleteTodo}  toogle={toogle} />
            })}
            
        </div>

    </div> 
  )
}

export default ToDo