const toDoForm=document.querySelector(".js-toDoForm"),
toDoInput= toDoForm.querySelector("input"),
toDoList= document.querySelector(".js-toDoList");

const TODOS_LS="toDos";

let toDos=[];

function deleteToDo(event){
    const btn= event.target;
    const li=btn.parentNode;
    toDoList.removeChild(li);
    const cleanToDos=toDos.filter(function(toDo){
        return toDo.id !==parseInt(li.id);
    });
    console.log(cleanToDos);
    toDos=cleanToDos;
    saveToDos();
}

function saveToDos(){
    localStorage.setItem(TODOS_LS,JSON.stringify(toDos));

}

let idNumbers=1;

function paintToDo(text){
    const li = document.createElement("li");
    const delBtn= document.createElement("button");
    const span = document.createElement("span");
    const newId= idNumbers;
    idNumbers+=1;
    span.innerText= text;
    delBtn.innerText="❌";
    delBtn.addEventListener("click",deleteToDo);
    li.appendChild(delBtn);
    li.appendChild(span);
    li.id=newId;
    toDoList.appendChild(li);
    const toDoObj={
        text: text,
        id: newId
    }
    toDos.push(toDoObj);
    saveToDos();
}

function handleSubmit(event){
    event.preventDefault();
    const currentValue= toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value="";
}

function printToDo(toDo){
    paintToDo(toDo.text);
}

function loadToDos(){
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if(loadedToDos=== null){

    }else{
        const parsedToDos=JSON.parse(loadedToDos);
        parsedToDos.forEach(printToDo)
    }
}

function init(){
    loadToDos();
    toDoForm.addEventListener("submit",handleSubmit);
}

init()