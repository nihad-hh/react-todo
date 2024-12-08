import { useEffect, useRef, useState } from "react";
import "./css/Todo.css";
import TodoItems from "./TodoItems";

let count = 0;

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const inputRef = useRef(null);

  const add = () => {
    setTodos([
      ...todos,
      { no: count++, text: inputRef.current.value, display: "" },
    ]);
    inputRef.current.value = "";
  };

  useEffect(() => {
    setTodos(JSON.parse(localStorage.getItem("todos")));
    count = localStorage.getItem("todos_count");
  }, []);

  useEffect(() => {
    setTimeout(() => {
      console.log(todos);
      localStorage.setItem("todos", JSON.stringify(todos));
      localStorage.setItem("todos_count", count);
    }, 100);
  }, [todos]);

  return (
    <div className="todo">
      <div className="todo-header">TODO list</div>
      <div className="todo-add">
        <input
          ref={inputRef}
          type="text"
          placeholder="Add Your Task"
          className="todo-input"
        />
        <div className="todo-btn" onClick={() => add()}>
          ADD
        </div>
      </div>
      <div className="todo-list">
        {todos.map((item, index) => {
          return (
            <TodoItems
              key={index}
              no={item.no}
              display={item.display}
              text={item.text}
              setTodos={setTodos}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Todo;
