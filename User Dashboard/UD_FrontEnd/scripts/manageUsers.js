const modal = document.getElementById('modal');
// const saveBtn = document.getElementById('saveBtn');

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const roleInput = document.getElementById('role-input');

const form = document.querySelector('form');
const searchUsersInput = document.getElementById('searchUsersInput');

let Users;

function openModal() {
    modal.style.display = `flex`;
}

function closeModal() {
    modal.style.display = `none`  
    
    nameInput.value = ``;
    emailInput.value = ``;
    passwordInput.value = ``;

    roleInput.value = `user`;
}

form.addEventListener('submit',async function(e) {
    e.preventDefault();
    const name = nameInput.value;
    const email = emailInput.value;
    const password = passwordInput.value;
    const role = roleInput.value;

    const response = await fetch('http://localhost:8000/createUser',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, email, password, role})
    })
    const data = await response.json();

    console.log('DATA FROM API CALL:: ',data);

    if(data.status == 'false') {
        return alert( `❌ ${data.err} ❌`)
    }
    alert(`${data.message} 🎉🎉🎉`);
    closeModal();
    getAllUsers();
})

async function getAllUsers() {
    const response = await fetch('http://localhost:8000/getAllUsers');
    const data = await response.json();

    if(data.status == 'false') {
        return alert(`❌ ${data.err} ❌`)
    }

    Users = data.users
    showAllUsers(Users);
}

function showAllUsers(users) {
    const userContainer = document.getElementById('user-container');
    userContainer.innerHTML = ``;
    users.forEach((user,idx)=>{
        userContainer.innerHTML += 
        `
            <div class="user">
                <div class="child">
                    <p id="name-uc">${user.name}</p>
                    <p>${user.email}</p>
                </div>
                <div class="child">
                    <p id="role-uc">${user.role}</p>
                </div>
                <div class="child">
                    <p id="password-uc">${user.password}</p>
                </div>
                <div class="child">
                    <img id="action" src="./assets/dots.png"/>
                </div>
            </div>
        `
    })
}

getAllUsers();

searchUsersInput.addEventListener('input',(e)=>{
    applySearchFilter(e.target.value);
})

searchUsersInput.addEventListener('change',(e)=>{
    searchUsersInput.value = ``;
    applySearchFilter(e.target.value);
})

function applySearchFilter(inputValue) {
    const filteredData = Users.filter((user)=>user.name.toLowerCase().startsWith(inputValue.toLowerCase()));
    showAllUsers(filteredData);
}