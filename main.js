let title = document.getElementById("title")

let price = document.getElementById("price")
let taxes = document.getElementById("taxes")
let ads = document.getElementById("ads")
let discount = document.getElementById("discount")
let total = document.getElementById("total")
let count = document.getElementById("count")
let category = document.getElementById("category")
let submit = document.getElementById("submit")
let tmp;
let mood = "create"

function myTotal(){
if(price.value != ""){
let result = (+price.value + +taxes.value + +ads.value) - +discount.value
total.innerHTML = result
total.style.background = "green"
}else {
total.innerHTML = ""
total.style.background = "red"
}
}

let dataPro;

if(localStorage.product != null){
dataPro = JSON.parse(localStorage.product)
}else{
dataPro = []
}

submit.onclick = function(){

let newPro = {
title:title.value.toLowerCase(),
price:price.value,
taxes:taxes.value,
ads:ads.value,
discount:discount.value,
total:total.innerHTML,
count:count.value,
category:category.value.toLowerCase()
}

if(title.value != "" && newPro.count < 150){
if(mood === "create"){
if(newPro.count > 1){
for(let i = 0; i < newPro.count; i++){
dataPro.push(newPro)}
}else {
dataPro.push(newPro)
}

} else {
dataPro[tmp] = newPro
mood = "create"
submit.innerHTML = "Creat"
count.style.display = "block"
}
clearDate()

}





localStorage.setItem("product", JSON.stringify(dataPro))
showDate()
}


//clear data//
function clearDate(){

title.value = ``
price.value = ``
taxes.value = ``
discount.value = ``
ads.value = ``
count.value = ``
category.value = ``
total.innerHTML = ``
}

//show data//

function showDate(){
let table = ``;
for(let i = 0; i < dataPro.length; i++){

table += `
<tr>
<td>${i}</td>
<td>${dataPro[i].title}</td>
<td>${dataPro[i].price}</td>
<td>${dataPro[i].taxes}</td>
<td>${dataPro[i].ads}</td>
<td>${dataPro[i].discount}</td>
<td>${dataPro[i].total}</td>
<td>${dataPro[i].category}</td>
<td><button onclick="updateData(${i})" id="update">update</button></td>
<td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
</tr>
`
}
document.getElementById("tbody").innerHTML = table

let btnDelete = document.getElementById("deleteAll")

if(dataPro.length > 0){
btnDelete.innerHTML = `<button onclick="deleteAll()" >Delete All (${dataPro.length})</button>`
} else {
btnDelete.innerHTML = ``
}
}
showDate()

//deleteitem//
function deleteItem(i){

dataPro.splice(i, 1)
localStorage.product  = JSON.stringify(dataPro)
showDate()



}
//deleteall//
function deleteAll(){
localStorage.clear()
dataPro.splice(0)
showDate()

}

//update//
function updateData(i){
myTotal();
title.value = dataPro[i].title
price.value = dataPro[i].price
taxes.value = dataPro[i].taxes
ads.value = dataPro[i].ads
category.value = dataPro[i].category
count.style.display = "none"
submit.innerHTML = "UPDATE"
mood = "update"
tmp = i ;
scroll({
top: 0, 
behavior: "smooth"

})

}

//search//
let  searchMood = "title"


function getSearchMood(id) {
let search = document.getElementById("search")

if(id === "searchtitle"){
searchMood = "title"
}else{
searchMood = "category"
}
search.focus()
search.placeholder = "search by " + searchMood
search.value = ""
showDate()

}

function searchData(value){
let table = "";

for(let i = 0; i < dataPro.length; i++){

if(searchMood == "title"){

if(dataPro[i].title.includes(value.toLowerCase())){

table += `
<tr>
<td>${i}</td>
<td>${dataPro[i].title}</td>
<td>${dataPro[i].price}</td>
<td>${dataPro[i].taxes}</td>
<td>${dataPro[i].ads}</td>
<td>${dataPro[i].discount}</td>
<td>${dataPro[i].total}</td>
<td>${dataPro[i].category}</td>
<td><button onclick="updateData(${i})" id="update">update</button></td>
<td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
</tr>
`
}

}else{
if(dataPro[i].category.includes(value.toLowerCase())){
table += `
<tr>
<td>${i}</td>
<td>${dataPro[i].title}</td>
<td>${dataPro[i].price}</td>
<td>${dataPro[i].taxes}</td>
<td>${dataPro[i].ads}</td>
<td>${dataPro[i].discount}</td>
<td>${dataPro[i].total}</td>
<td>${dataPro[i].category}</td>
<td><button onclick="updateData(${i})" id="update">update</button></td>
<td><button onclick="deleteItem(${i})" id="delete">delete</button></td>
</tr>
`
}

}
}
document.getElementById("tbody").innerHTML = table

}
