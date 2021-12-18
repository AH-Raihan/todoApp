const titleInput = document.querySelector('input#title');
const descInput = document.querySelector('input#desc');
const addBtn = document.querySelector('button#AddBtn');

const tbody = document.querySelector('#tbody');

// *** Edit & Delete Button ***

const updateCon = document.getElementById('update');
const editBtn = document.getElementsByClassName('EditBtn');
const deleteBtn = document.getElementsByClassName('DeleteBtn');
const updateCencel = document.getElementById('updateCencel');

/* check Array have */

if (!localStorage.getItem('todo')) {
    localStorage.setItem('todo', JSON.stringify(new Array()));
}





/* loop array from localStorage */
let loopTodos = () => {

    tbody.innerHTML = "";
    let currentItems = JSON.parse(localStorage.getItem('todo'));
    if(currentItems.length === 0){
        document.querySelector('table thead tr').style.display="none";
        document.getElementById('emptyMsg').innerHTML="no data avalable!";
    }else{
        document.querySelector('table thead tr').style.display="table-row";
        document.getElementById('emptyMsg').innerHTML="";
    }
    let serial = 1;
    currentItems.forEach((value, index) => {

        tbody.innerHTML += `
        <tr>
          <td>${serial}</td>
          <td>${value.title}</td>
          <td>${value.desc}</td>
          <td>
            <button data-itemid="${index}" id="EditBtn" class="EditBtn">Edit</button>
            <button data-itemid="${index}" id="DeleteBtn" class="DeleteBtn">Delete</button>
          </td>
        </tr>`;
        serial++;
    });
    deleteTodo();
	updateTodo();
}

/* add to todo */
let addTodo = () => {

    addBtn.addEventListener("click", function () {
        let todoTitle = titleInput.value.trim();
        let todoDesc = descInput.value.trim();

        currentTodo = JSON.parse(localStorage.getItem('todo'));
        currentTodo.push({
            title: todoTitle,
            desc: todoDesc
        });
        localStorage.setItem('todo', JSON.stringify(currentTodo));
        titleInput.value = "";
        descInput.value = "";
        loopTodos();
    });


}

let deleteTodo = () => {
    
    for (let i = 0; i < deleteBtn.length; i++) {
        deleteBtn[i].addEventListener('click', function () {
            currentDTodo = JSON.parse(localStorage.getItem('todo'));
            let removeItemIndex = Number(deleteBtn[i].getAttribute('data-itemid'));

            let remainingItems = currentDTodo.filter((item, index) => {
                return index !== removeItemIndex;
            });

            localStorage.setItem('todo',JSON.stringify(remainingItems));
            
            loopTodos();
        });
    }


}


let updateTodo= () => {
    let editContainer=document.getElementById('editContainer');
    let editInpTitle=document.getElementById('updateInputTitle');
    let editInpDesc=document.getElementById('updateInputDesc');
	let editInpBtn=document.getElementById('updateInputBtn');

    for(let i=0;i<editBtn.length;i++){
        editBtn[i].addEventListener('click',function(){
			updateCon.classList.remove('d-none');
            let id=editBtn[i].getAttribute("data-itemid");

            let TodoItems= JSON.parse(localStorage.getItem('todo'));
			let itemId= editBtn[i].getAttribute('data-itemid');
			editInpTitle.value=TodoItems[itemId].title;
			editInpDesc.value=TodoItems[itemId].desc;
			
			editInpTitle.setAttribute("data-clickedid",itemId);
			
			loopTodos();
			
        });
    }
	
		
	
	
}

const editInpBtn=document.getElementById('updateInputBtn');
	editInpBtn.addEventListener('click',function(){
	    let editInpTitle=document.getElementById('updateInputTitle');
				let editedInpTitle=document.getElementById('updateInputTitle');
				let editedInpDesc=document.getElementById('updateInputDesc');
				let getStorageData= JSON.parse(localStorage.getItem('todo'));
				let clickedid=editInpTitle.getAttribute("data-clickedid");
				if(editedInpTitle.value!==""){
					getStorageData[clickedid].title=editedInpTitle.value;
					getStorageData[clickedid].desc=editedInpDesc.value;
				}else{
					alert("Empty");
				}
				
				
				
				localStorage.setItem("todo",JSON.stringify(getStorageData));
				editedInpTitle.value="";
				editedInpDesc.value="";
				editInpTitle.removeAttribute("data-clickedid");
				updateCon.classList.add('d-none');
				loopTodos();
	});
	
	updateCencel.addEventListener("click",function(){
		updateCon.classList.add('d-none');
		let editInpTitle=document.getElementById('updateInputTitle');
		let editedInpTitle=document.getElementById('updateInputTitle');
		let editedInpDesc=document.getElementById('updateInputDesc');
		editedInpTitle.value="";
		editedInpDesc.value="";
		editInpTitle.removeAttribute("data-clickedid");
		
	});

loopTodos();
addTodo();
deleteTodo();
updateTodo();