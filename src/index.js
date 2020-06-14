const clock = document.querySelector("#clock");
const form = document.querySelector("#ToDoListForm");
const pending = document.querySelector("#pendingList");
const finished = document.querySelector("#finishList");
const inputToDo = form.querySelector("#ToDoInput");
const goToDo = document.querySelector("#goToDo");
const userNameInput = document.querySelector('#userNameInput');
let userName = "";
const title = document.querySelector("#title");

let PL = [];
let FL = [];


function saveLocalStorage(){
    localStorage.setItem("PendingList", JSON.stringify(PL));
    localStorage.setItem("FinishList", JSON.stringify(FL));
}

function getClock(){
    const date = new Date();
    const hour = date.getHours();
    const min = date.getMinutes();
    const sec = date.getSeconds();
    const time = 
    `${hour < 10 ? "0"+hour : hour} :
     ${min < 10 ? "0"+min : min} : 
     ${sec < 10 ? "0"+sec : sec}`;
    clock.innerHTML = time;
}

function GoFin(el,event){
    AddFinish(el.value)
    DelPend(el, event)
    console.log(FL)
}

function DelPend(el, event){
    const li =event.target.parentNode.parentNode;
    pending.removeChild(li);
    const filtering =  PL.filter(e => {
        return e.key!==el.key
    })
    PL = filtering
    saveLocalStorage();
}

function DelFin(el, event){
    const li =event.target.parentNode.parentNode;
    finished.removeChild(li);
    const filtering = FL.filter(e => {
        return e.key !== el.key
    })
    FL = filtering
    saveLocalStorage();
}

function returnPend(el, event){
    AddToDo(el.value)
    DelFin(el,event)
}

function AddToDo(el){
    const date = new Date();
    const element = {key : date, value:el};
    PL.push(element);
    const li = document.createElement("li");
    const span = document.createElement("span");
    const div = document.createElement("div");
    const PDelBtn = document.createElement("button");
    const PFinBtn = document.createElement("button");
    PDelBtn.innerHTML = "🗑";
    PFinBtn.innerHTML = "✅";
    PDelBtn.addEventListener("click", (e)=>DelPend(element,e));
    PFinBtn.addEventListener("click", (e)=>GoFin(element,e));
    div.appendChild(PDelBtn);
    div.appendChild(PFinBtn);
    span.innerHTML = el;
    li.className="pending_li";
    li.appendChild(span);
    li.appendChild(div);
    pending.appendChild(li);
}

function AddFinish(el){
    const date = new Date();
    const element = {key : date, value:el};
    FL.push(element);
    const li = document.createElement("li");
    const span = document.createElement("span");
    const div = document.createElement("div");
    const FDelBtn = document.createElement("button");
    const FReturnBtn = document.createElement("button");
    FDelBtn.innerHTML = "🗑";
    FReturnBtn.innerHTML = "📌";
    FReturnBtn.addEventListener("click", (e)=>returnPend(element, e))
    FDelBtn.addEventListener("click", (e)=>DelFin(element,e))
    div.appendChild(FDelBtn);
    div.appendChild(FReturnBtn);
    span.innerHTML = el;
    li.className="pending_li";
    li.appendChild(span);
    li.appendChild(div);
    finished.appendChild(li);
}

function onSubmit(e){
    e.preventDefault();
    if(inputToDo.value !== ""){
        AddToDo(inputToDo.value);
        inputToDo.value=""
        saveLocalStorage();
    }
}

function enterUser(e){
    e.preventDefault();
    const input = userNameInput.querySelector("input");
    if(input.value !== ""){
        userName = input.value;
        localStorage.setItem("user", userName);
        title.innerHTML = userName + "'s ToDo List"
        document.querySelector("#ToUserName").style.display="none";
        goToDo.style.display = "unset";
    }
}



function init(){
    getClock()
    setInterval(getClock, 1000);
    form.addEventListener("submit", onSubmit);
    userNameInput.addEventListener("submit", enterUser);

    if(!localStorage.getItem("user")){
        console.log("not found userName")
    }else{
        userName = localStorage.getItem('user');
        title.innerHTML = userName + "'s ToDo List"
        document.querySelector("#ToUserName").style.display="none";
        goToDo.style.display = "unset";
    }

    if(!localStorage.getItem("PendingList")){
        console.log("not found PendingList!");
    }else{
        const pl = JSON.parse(localStorage.getItem("PendingList"));
        pl.forEach(e=>{
            AddToDo(e.value)
        })
    }

    if(!localStorage.getItem("FinishList")){
        console.log("not found FinishList")
    }else{
        const fl = JSON.parse(localStorage.getItem("FinishList"));
        fl.forEach(e=>{
            AddFinish(e.value)
        })
    }

}

init();