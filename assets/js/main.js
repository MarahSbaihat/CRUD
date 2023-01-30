var productName=document.getElementById("productName");
var productCategory=document.getElementById("productCategory");
var productPrice=document.getElementById("productPrice");
var productDescription=document.getElementById("productDescription");
var addBtn=document.getElementById("addBtn");
var deleteBtn=document.getElementById("deleteBtn");
var data=document.getElementById("data");
var nameAlert=document.getElementById("nameAlert");
var currentIndex;

if (localStorage.getItem("productsList")==null){
    var products = [];
}
else {
    var products = JSON.parse(localStorage.getItem("productsList"));
    readProduct();
}

addBtn.onclick = function() {
    if (addBtn.innerHTML=="Add Products"){
        addProduct();
    }
    else {
        updateProduct();
        addBtn.innerHTML="Add Products";
    }
    //read
    readProduct();
    //clear
    clearAfterAdd();
}

function addProduct (){
    var product = {
        name:productName.value,
        category:productCategory.value,
        price:productPrice.value,
        description:productDescription.value
    };

    products.push(product);

    localStorage.setItem("productsList",JSON.stringify(products));

    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'The Product has been added',
        showConfirmButton: false,
        timer: 1500
    })
}

function readProduct (){
    var result = "";
    for (var i=0; i<products.length; i++){
        result += `<tr>
            <td>${i}</td>
            <td>${products[i].name}</td>
            <td>${products[i].category}</td>
            <td>${products[i].price}</td>
            <td>${products[i].description}</td>
            <td>
                <button onclick="getProductData(${i})" class="btn btn-outline-info">update</button>
                <button onclick="deleteProduct(${i})" class="btn btn-outline-danger">delete</button>
            </td>
        </tr>`
    }
    data.innerHTML = result;
}

function clearAfterAdd (){
    productName.value = "";
    productCategory.value = "";
    productPrice.value = "";
    productDescription.value = "";
}

function deleteProduct (index){
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }
    )
    .then((result) => {
        if (result.isConfirmed) {
            Swal.fire(
                products.splice(index,1),
                localStorage.setItem("productsList",JSON.stringify(products)),
                readProduct(),
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
        }
    }
    );
}

deleteBtn.onclick = function (){
    localStorage.removeItem("productsList");
    products = [];
    data.innerHTML="";
}

function search (srch){
    var result = "";
    for (var i=0; i<products.length; i++){
        if (products[i].name.toLowerCase().includes(srch.toLowerCase())){
            result += `<tr>
                <td>${i}</td>
                <td>${products[i].name}</td>
                <td>${products[i].category}</td>
                <td>${products[i].price}</td>
                <td>${products[i].description}</td>
                <td>
                    <button class="btn btn-outline-info">update</button>
                    <button onclick="deleteProduct(${i})" class="btn btn-outline-danger">delete</button>
                </td>
            </tr>`
        }
    }
    data.innerHTML = result;
}

function getProductData (index){
    var product = products[index];
    productName.value = product.name;
    productCategory.value = product.category;
    productPrice.value = product.price;
    productDescription.value = product.description;
    addBtn.innerHTML="Update Products";
    currentIndex = index;
}

function updateProduct (){
    var product = {
        name:productName.value,
        category:productCategory.value,
        price:productPrice.value,
        description:productDescription.value
    };
    products[currentIndex].name=product.name;
    products[currentIndex].category=product.category;
    products[currentIndex].price=product.price;
    products[currentIndex].description=product.description;

    localStorage.setItem("productsList",JSON.stringify(products));
}

productName.onkeyup=function(){
    var pattern = /^[A-Z][a-z]{2,8}$/;
    if (pattern.test(productName.value)){
        console.log('hh');

        addBtn.removeAttribute("disabled");
        productName.classList.add("is-valid");
        productName.classList.remove("is-invalid");
        nameAlert.classList.add("d-none");
    }
    else {
        addBtn.setAttribute("disabled","disabled");
        productName.classList.replace("is-valid","is-invalid");
        nameAlert.classList.add("d-block");
        nameAlert.classList.remove("d-none");
    }
}