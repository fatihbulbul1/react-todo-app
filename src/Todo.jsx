import React, { useEffect, useState } from "react";

const Todo = () =>{
    let [left,setLeft] = useState(2)
    let [input,setInput] = useState('')
    const [todos, setTodo] = useState(['Default Todo1','Default Todo2'])
    function active(e){
        let active = document.querySelector('.active')
        active.classList.remove('active')
        e.target.classList.add('active')
    }
    function enter(e){
        if(e.keyCode == 13){
            addTodo()
        }
    }
    function change(e) {
        input = e.target.value
    }
    function leftTodo(){
        let lefttodo = document.querySelectorAll('.not-finished')
        setLeft(lefttodo.length)
    }
    function addTodo() {
        let lft = left
        if (input.length > 0){
            let temp = [...todos]
            temp.push(input)
            setTodo()
            setTodo(temp)
            document.getElementById('search').value = ''
            setLeft(lft + 1)
        }
    }
    function tick(e) {
        let parent = e.target.parentElement
        let text = e.target.nextElementSibling
          if(e.target.classList.contains('fa-regular')){
            e.target.classList.remove('fa-regular')
            e.target.classList.add('fa-solid')
            text.classList.add('lined')
            parent.classList.add('delete')
            parent.classList.remove('not-finished')
            parent.lastChild.style.display = 'inline-block'
            leftTodo()
        }
        else{
            e.target.classList.remove('fa-solid')
            e.target.classList.add('fa-regular')
            text.classList.remove('lined')
            parent.classList.remove('delete')
            parent.classList.add('not-finished')
            parent.lastChild.style.display = 'none'
            leftTodo()
        }
    }
    function clear() {
        let deletes = document.querySelectorAll('.delete')
        deletes.forEach(e =>{
            e.style.display = 'none'
        })
        leftTodo()
    }
    function all() {
        let deletes = document.querySelectorAll('.delete')
        deletes.forEach(e =>{
            e.style.display = 'flex'
        })
        let actives = document.querySelectorAll('.not-finished')
        actives.forEach(e =>{
            e.style.display = 'flex'
        }) 
        document.getElementById('clearbtn').disabled = true
    }
    function activefn(){
        let actives = document.querySelectorAll('.not-finished')
        actives.forEach(e =>{
            e.style.display = 'flex'
        }) 
        let deletes = document.querySelectorAll('.delete')
        deletes.forEach(e =>{
            e.style.display = 'none'

        })
        document.getElementById('clearbtn').removeAttribute('disabled');
    }
    function finished() {
        let actives = document.querySelectorAll('.not-finished')
        actives.forEach(e =>{
            e.style.display = 'none'
        }) 
        let deletes = document.querySelectorAll('.delete')
        deletes.forEach(e =>{
            e.style.display = 'flex'
        })
        document.getElementById('clearbtn').disabled = true
    }
    function xmark(e) {
        if(document.getElementById('act').classList.contains('active')){
            e.target.style.display = 'none'
            e.target.parentElement.style.display = 'none'
            leftTodo()
        }
    }
    return(
        <div id="todo">
            <div id="todo-container">
                <div id="search-section">
                    <input onKeyDown={enter} onChange={change} autoComplete="off" type="search" id="search"/>
                    <button onClick={addTodo} id="add">✓</button>
                </div>
                <div id="btns-div">
                    <p onClick={(e) => {active(e);all();}} className="btns">All</p>
                    <p id="act" onClick={(e) => {active(e);activefn();}} className="btns active">Active</p>
                    <p onClick={(e) => {active(e);finished();}} className="btns">Finished</p>
                </div>
                <div id="todos">
                    <ul>
                        {
                            todos.map((todo) =>{
                                return(
                                <li className="not-finished" key={todo}><i onClick={tick} className="fa-regular fa-circle"></i><span>{todo}</span><i onClick={xmark} style={{display : 'none'}} className="fa-solid fa-xmark"></i></li>)   
                            })
                        }
                    </ul>
                </div>
                <div id="end-div">
                    <button id='clearbtn' onClick={clear}>Clear finished</button>
                    <span>{left} active todos left</span>
                </div>
            </div>
        </div>
    )
}

export default Todo