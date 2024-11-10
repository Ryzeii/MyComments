import React from "react";

class TodoApp extends React.Component{
    constructor(){
        super(); // конструктор из React.Component
       this.state = {
        toDos:[],
        newTodoText:'',
        newAuthor:''
       };
    }
    componentDidMount(){
        const savedComments = JSON.parse(localStorage.getItem("comments"));
        if(Array.isArray(savedComments)){
            this.setState({toDos:savedComments})
        }
        else{
            this.setState({
                        toDos :[
                        {name: 'Крутая фотка',time:new Date().toLocaleString(),author:"Данил "},
                        {name: 'Можно было и лучше',time:new Date().toLocaleString(),author:"Евгений"},
                        {name: 'Ничего не понятно...',time:new Date().toLocaleString(),author:"Вячеслав"}
                    ]
                   
             
        });
    }
}
    updateLocalStorage = (comments)=>{
        localStorage.setItem("comments",JSON.stringify(comments));
    }
    
    addTodo=()=>{
    const {newTodoText,newAuthor,toDos} = this.state;
    if(newTodoText.trim()&&newAuthor.trim()){
        const newComment = {
            name:newTodoText,
            author:newAuthor,
            time:new Date().toLocaleString()
        };
        const updateComments = [...toDos,newComment];
        this.setState({
            toDos:updateComments,
            newTodoText:'',
            newAuthor:''
        });
        this.updateLocalStorage(updateComments);
    }
    }
    deleteTodo =(index)=>{
        const updateComments =this.state.toDos.filter((_,i)=>i !== index);
        this.setState({toDos:updateComments});
        this.updateLocalStorage(updateComments);
    }

    render(){
        return (
            <div>
                <h1>Комментарии</h1>
            <ul>
                {
                    this.state.toDos.map((todo,i) => {
                        return(
                            <li key={i}>
                               <p>{todo.name}</p>
                               <p><b>Дата:</b>{todo.time}</p>
                               <p><b>Автор:</b>{todo.author}</p>
                               <button onClick={()=>this.deleteTodo(i)}>Удалить</button>
                            </li>
                            
                        )                     
                    })
                }
            </ul>
            <input 
            type="text" 
            placeholder="Ваше имя"
            value={this.state.newAuthor}
            onChange={ev =>{
                this.setState({newAuthor:ev.target.value});
            }}
            />
            <br/> <br/> 
            <input 
            type="text" 
            placeholder="Добавьте комментарий "
            value={this.state.newTodoText}
            onChange={ev =>{
                this.setState({newTodoText:ev.target.value});
            }}
            onKeyUp={ev => {
                if(ev.keyCode === 13){
                    this.addTodo();
                }
            }}
            />
            <br/><br/>
            <button onClick={this.addTodo}>Добавить комментарий</button>
            </div>
            
        );
    }

}

export default TodoApp;