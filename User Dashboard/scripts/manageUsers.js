const modal = document.getElementById('modal');
const saveBtn = document.getElementById('saveBtn');

const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

const roleInput = document.getElementById('role-input');

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