import { login } from './framework.js'
const logBtn = document.getElementById('log-btn')
logBtn.addEventListener('click', function(e) {
    e.preventDefault()
    login()
})