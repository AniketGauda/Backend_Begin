// const nameInput = document.getElementById('name');
// const emailInput = document.getElementById('email');
// const passwordInput = document.getElementById('password');

// async function sendData() {
//     // making an API Call.

//     // Get API (To Get the Data).
//     // const res = await fetch('https://fakestoreapi.com/products')
//     // const data = await res.json();
//     // console.log(data);

//     const details = {
//         name: nameInput.value,
//         email: emailInput.value,
//         password: passwordInput.value
//     }

//     // On click of save i am clearing the input

//     nameInput.value = '';
//     emailInput.value = '';
//     passwordInput.value = '';

//     const res = await fetch('http://localhost:8000/save',{
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json'
//         },
//         body: JSON.stringify(details)
//     })
//     const data = await res.json();
//     alert(data.message);
// }

const productNameInput = document.getElementById('pName');
const productDescInput = document.getElementById('pDesc');
const productPriceInput = document.getElementById('pPrice');
const productUrlInput = document.getElementById('pUrl');

const productContainer = document.querySelector('section');

async function addProduct () {

    const productDetails = {
        productName: productNameInput.value,
        productDesc: productDescInput.value,
        productPrice: productPriceInput.value,
        productUrl: productUrlInput.value
    }

    productNameInput.value = "";
    productDescInput.value = "";
    productPriceInput.value = "";
    productUrlInput.value = "";

    const res = await fetch("http://localhost:8000/addProduct",{
        method:'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(productDetails),
    })
    const dataFromServer = await res.json();
    alert(dataFromServer);
}

async function getData() {
    const res = await fetch("http://localhost:8000/getAllProducts");
    const products = await res.json();
    return products;
}

async function generateUI() {
    const data = await getData();
    data.forEach((elt,idx)=>{
        productContainer.innerHTML += 
        `
            <div>
                <img src=${elt.productUrl}/>
                <h1>${elt.productName}</h1>
                <h2>${elt.productDesc}</h2>
                <h3>$ ${elt.productPrice}</h3>
            </div>
        `
    })
}

const hideUI = ()=>{
    productContainer.innerHTML = ``;
}