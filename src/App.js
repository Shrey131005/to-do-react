import "./App.css";
import { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import { FaCheck } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
function App() {

  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const [allTodos, setTodos] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completedTodos, setCompletedTodos] = useState([]);
  const [currentEdit, setCurrentEdit] = useState("");
  const [currentEditItem, setCurrentEditedItem] = useState("");

  const handleAddTodo = () => {
    let newTodoItem = {
      title: newTitle,
      description: newDescription,
    };

    let updatedTodoArr = [...allTodos];
    updatedTodoArr.push(newTodoItem);
    setTodos(updatedTodoArr);
    localStorage.setItem("todolist", JSON.stringify(updatedTodoArr)); //converts array to string
  };

  const handleDeleteTodo = (index) => {
    let reducedTodo = [...allTodos];
    reducedTodo.splice(index, 1); // Remove only one task at the specified index
    setTodos(reducedTodo);
    localStorage.setItem("todolist", JSON.stringify(reducedTodo)); //converts array to string
  };

  const handleComplete = (index) => {
    let now = new Date();
    let dd = now.getDate();
    let mm = now.getMonth() + 1;
    let yyyy = now.getFullYear();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let completedOn = dd + "-" + mm + "-" + yyyy + " at " + h + ":" + m + ":" + s;
    
    let filteredItem = {
      ...allTodos[index],
      completedOn: completedOn,
    };

    let updatedCompletedArr = [...completedTodos];
    updatedCompletedArr.push(filteredItem);
    setCompletedTodos(updatedCompletedArr);
    handleDeleteTodo(index); // Remove the task from the to-do list after marking as complete
    localStorage.setItem("completedTodos", JSON.stringify(updatedCompletedArr)); //converts array to string
  };

  const handleDeleteCompletedTodo = (index) => {
    let reducedTodo = [...completedTodos];
    reducedTodo.splice(index, 1); // Remove only one task at the specified index
    setCompletedTodos(reducedTodo);
    localStorage.setItem("completedTodos", JSON.stringify(reducedTodo));
  };

  useEffect(() => {
    let savedTodo = JSON.parse(localStorage.getItem("todolist")); //converts local storage string to array
    let savedCompletedTodo = JSON.parse(localStorage.getItem("completedTodos")); //converts local storage string to array
    if (savedTodo) {
      setTodos(savedTodo);
    }
    if (savedCompletedTodo) {
      setCompletedTodos(savedCompletedTodo);
    }
  }, []);


  const handleEdit = (ind,item) => {
    setCurrentEdit(ind);
    setCurrentEditedItem(item);
  };

  const handleUpdateTitle = (value) => {
    setCurrentEditedItem((prev)=>{
      return{...prev,title:value}
    })
  };

  const handleUpdateDescription = (value) => {
    setCurrentEditedItem((prev)=>{
      return{...prev,description:value}
    })
  };

  const handleUpdateTodo = () => {
    let newTodos = [...allTodos];
    newTodos[currentEdit] = currentEditItem;
    setTodos(newTodos);
    setCurrentEdit("");

  }

  return (
    <div className="App">
      <div className="MainHeader">
      <button className="mainButton">ToDoApp</button>
      </div>
      

      <div className="todo-wrapper" id="todo-wrapper">
        <div className="todo-input">
          <div className="todo-input-item">
            <label> Title</label>
            <input className="input-task" type="text" value={newTitle} onChange={(e) => setNewTitle(e.target.value)} placeholder="Enter Task Title" />
          </div>
          <div className="todo-input-item">
            <label> Description</label>
            <input className="input-description" type="text" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="Enter Task Description" />
          </div>
          <div className="todo-input-item">
            <button type="button" onClick={handleAddTodo} className="primaryBtn">
              Add
            </button>
          </div>
        </div>

        <div className="btn-area">
          <button className={`secondaryBtn ${isCompleteScreen === false && `active`}`} id="b1" onClick={() => setIsCompleteScreen(false)} >ToDo</button>
          <button className={`secondaryBtn ${isCompleteScreen === true && `active`}`} id="b2" onClick={() => setIsCompleteScreen(true)}>Completed</button>
        </div>

        <div className="todo-list">

          {isCompleteScreen === false && allTodos.map((item, index) => {
            if(currentEdit === index){
              return (
                <div className="edit-wrapper" key={index}>
                <input placeholder = "Updated Title" 
                onChange={(e)=>handleUpdateTitle(e.target.value)}  
                value={currentEditItem.title}
                />

                <textarea placeholder = "Updated Description"
                rows={4}
                onChange={(e)=>handleUpdateDescription(e.target.value)
                  } value={currentEditItem.description}
                />

                  <button type="button" onClick={handleUpdateTodo}         className="primaryBtn">
                      Update
                    </button>
                </div>
              )
            }else{
              return (
                <div className="todo-list-item" key={index}>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
  
                  <div >
                    <FaRegEdit
                    className="icon-edit" onClick={() => handleEdit(index,item)} title="Edit" />
                    <FaCheck className="check-icon" onClick={() => handleComplete(index)} title="Complete?" />
                    <MdDelete className="icon" onClick={() => handleDeleteTodo(index)} title="Delete?" />
                    
                    

                  </div>
                </div>
              );
            }

            
          })}
          {isCompleteScreen === true && completedTodos.map((item, index) => {
            return (
              <div className="todo-list-item" key={index}>
                <div>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                  <p><small>Completed on: {item.completedOn}</small></p>
                </div>

                <div >
                  <MdDelete
                    className="icon"
                    onClick={() => handleDeleteCompletedTodo(index)}
                    title="Delete?"
                  />
                </div>
              </div>
            );
          })}


        </div>
      </div>
    </div>
  );
}

export default App;
