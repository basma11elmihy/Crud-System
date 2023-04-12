var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCat = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var addBtn = document.getElementById("addBtn");
var updateBtn = document.getElementById("updateBtn");

var productsList=[];
let current; 
if(localStorage.getItem('products') != null)
{
    productsList = JSON.parse( localStorage.getItem('products'));
    displayProducts(productsList);
}

addBtn.addEventListener('click',addProduct);
updateBtn.addEventListener('click',updateProduct);

function addProduct(){
    var product = {
        name: productName.value,
        price: productPrice.value,
        category: productCat.value,
        desc: productDesc.value
    }
    productsList.push(product);
    localStorage.setItem('products',JSON.stringify(productsList));
    clearForm();
    displayProducts(productsList);
}

function displayProducts(list){
    let temp='';

    for(var i = 0; i< list.length ; i++){
        temp+=`<tr>
        <td>${list[i].name}</td>
        <td>${list[i].price}</td>
        <td>${list[i].category}</td>
        <td>${list[i].desc}</td>
        <td><button onclick="setUpdateProduct(${i})" class="btn btn-outline-warning btn-sm">Update</button></td>
        <td><button onclick="deleteProduct(${i})" class="btn btn-outline-danger btn-sm">Delete</button></td>
    </tr>`;

    document.getElementById('tableBody').innerHTML = temp;
    }
}

function clearForm(){
    productName.value = "";
    productPrice.value = "";
    productCat.value = "";
    productDesc.value = "";
}

function deleteProduct(productId){
    productsList.splice(productId,1);
    localStorage.setItem('products',JSON.stringify(productsList));
    displayProducts(productsList);
}

function searchName(term){
    let matchedOutput = [];
    for(let i = 0; i < productsList.length ; i++){
        if (productsList[i].name.toLowerCase().includes(term)){
            matchedOutput.push(productsList[i]);
        }
    }
    displayProducts(matchedOutput);
}

function setUpdateProduct(index){
    current = index;
    addBtn.classList.replace('d-block','d-none');
    updateBtn.classList.replace('d-none','d-block');

    productName.value = productsList[index].name;
    productPrice.value = productsList[index].price;
    productCat.value = productsList[index].category;
    productDesc.value = productsList[index].desc;
}

function updateProduct(){
    productsList[current].name = productName.value;
    productsList[current].price = productPrice.value;
    productsList[current].category = productCat.value;
    productsList[current].desc = productDesc.value;
    localStorage.setItem('products',JSON.stringify(productsList));

    displayProducts(productsList);
    done();
}

function done(){
    current = "";
    clearForm();
    updateBtn.classList.replace('d-block','d-none');
    addBtn.classList.replace('d-none','d-block');
}