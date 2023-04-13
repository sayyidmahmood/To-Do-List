
let kitchenInput = document.getElementById("kitchen-input");
let addBtn = document.getElementById("add-btn");
let kitchenItemsList = document.getElementById("kitchen-items-list");

let kitchenInputData;
let kitchenInputDataArray=[];

///////create an empty arry///////////

//let kitchenItems = [];

function setLocalStorage(){
    localStorage.setItem("Name",JSON.stringify(kitchenInputDataArray));  //value data string convert into array
}

function getLocalStorage(){
    if(localStorage.getItem("Name")){
        kitchenInputDataArray = JSON.parse(localStorage.getItem("Name")); //value data return time in araay convert into string
        console.log(kitchenInputDataArray);
        buildUI();
        console.log("Data found")
    }else{
        console.log("No data found")
    }
   
    
    //console.log(kitchenInputData)
}

function det(){
   // localStorage.removeItem("Name");
}



function buildUI(){
    kitchenItemsList.textContent = "";
    kitchenInputDataArray.forEach((item) =>{
        // create DOM element now
        let li = document.createElement("li");

        let spanE1 = document.createElement('span')
        li.appendChild(spanE1)
        spanE1.innerText = item;

        // li.innerText = kitchenInputData;
        li.style.cssText = "animation-name:slideIn;";
        kitchenItemsList.appendChild(li);
        kitchenInput.value='';
        kitchenInput.focus();

        //array push
        // kitchenItems.push(kitchenInputData)
        // console.log(kitchenItems)

        //crate delete button
        let trashBtn = document.createElement("i")
        trashBtn.classList.add('fas','fa-trash')
        li.appendChild(trashBtn);
        console.log(trashBtn)

        //create a edit button

        let editBtn = document.createElement('i')
        editBtn.classList.add('fas','fa-edit')
        li.appendChild(editBtn)
    })

    
}
//step 2//
//add kitchen items

function addKitchenItems(){
    kitchenInputData = kitchenInput.value;

    kitchenInputDataArray.push(kitchenInputData);
    console.log(kitchenInputDataArray)
    // last step set to local srorage
    setLocalStorage(); 
    //get from local storage
    getLocalStorage();

   
}

// delete item from kitchen list  //event(e) parameter
function deleteKitchenItem(event){
  //  console.log(event.target.classList[0]);
    if(event.target.classList[1] === "fa-trash"){
        let item = event.target.parentElement;
        console.log(item);
        let itemText = item.querySelector('span').innerText; // Get the text of the item
        console.log(itemText)
        let itemIndex = kitchenInputDataArray.indexOf(itemText); // Find the index of the item in the array
        console.log(itemIndex)
        if (itemIndex !== -1) {
            kitchenInputDataArray.splice(itemIndex, 1); // Remove the item from the array
            setLocalStorage(); // Save the updated array to localStorage
        }
        item.classList.add("slideOut")
        item.addEventListener('transitionend',function(){
            console.log("item remove")
           // item.remove();
        })
    }
}



//edit kitchen items
function editKitchenItem(e){
   if(e.target.classList[1] === "fa-edit"){
    let editedValue = prompt("please add new Text") // Prompt for new value
    //console.log(editedValue)
    let item = e.target.parentElement;
    //item.innerText = editedValue;
    let spanE1 = item.querySelector('span')
    spanE1.innerText = editedValue; // Update the DOM with the new value
     console.log(spanE1)
    let index = Array.from(kitchenItemsList.children).indexOf(item); // Get the index of the item in the list
    console.log(index)
    kitchenInputDataArray[index] = editedValue; // Update the corresponding value in the array
    setLocalStorage(); // Update the localStorage with the new value
   }
   //console.log(e.target.classList[1])
}




//step 1
//add an event lister to the button
addBtn.addEventListener('click',addKitchenItems)
kitchenItemsList.addEventListener('click',deleteKitchenItem)
kitchenItemsList.addEventListener('click',editKitchenItem)

getLocalStorage();

// local storage

// set data to local storage
//localStorage.setItem("name","tony")

// get data from local storage
//let name = localStorage.getItem("name")
//console.log(name);