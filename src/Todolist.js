import React from "react"
import TodoItem from "./TodoItem";

const TodoList = ({ toggleCheck, deleteHandler, todos }) => {
    return (
        
        <div>
            {todos.length === 0 && 'No todos  '}
            {todos.map(todo => {
                return (
                    <TodoItem
                        todo={todo}
                        deleteHandler={deleteHandler}
                        toggleCheck={toggleCheck}
                    />
                )
            })}
        </div>
    )
};

export default TodoList;
