let myLeads = [];
const inputEl = document.getElementById("inpur-el");
const inputBtn =  document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
let deleteBtn = document.getElementById("delete-btn");
const leadsfromstorage = JSON.parse( localStorage.getItem("myleads"));
const saveTabBtn = document.getElementById("savetab-btn");


if( leadsfromstorage){
    myLeads = leadsfromstorage;
    renderLeads(myLeads);
}


saveTabBtn.addEventListener("click", function(){
    chrome.tabs.query({active : true, currentWindow : true}, function(tabs){
    myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads(myLeads);
    })
})

function renderLeads(myLeads){
    let listItems = "";
    for(let i=0; i<myLeads.length; i++){
        listItems += `
        <li>
            <a target="_blank" href='${myLeads[i]}' >
            ${myLeads[i]}
            </a>
        </li>
    `
    }
    ulEl.innerHTML = listItems;
}

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear()
    myLeads = []
    renderLeads(myLeads);
})
inputBtn.addEventListener("click", function(){
   let inputValue = document.getElementById("input-el");
   myLeads.push(inputValue.value);
   inputValue.value = "";
   localStorage.setItem("myleads", JSON.stringify(myLeads));
   renderLeads(myLeads);
})



