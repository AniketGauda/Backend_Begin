const modal = document.getElementById('modal');
// const saveBtn = document.getElementById('saveBtn');

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const roleInput = document.getElementById('role-input');

const form = document.querySelector('form');

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
})