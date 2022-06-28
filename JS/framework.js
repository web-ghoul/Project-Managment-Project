//Header Scroll
let headerScroll = function() {
    const header = document.querySelector('header .contain')
    window.onscroll = function() {
        if (window.scrollY > 0) {
            header.classList.add('scroll-header')
        } else {
            header.classList.remove('scroll-header')
        }
    }
}


//Learn More
let learMore = function() {
    const mores = document.querySelectorAll('.box .contain .content .learn .more')
    mores.forEach((el) => {
        el.addEventListener('click', function() {
            el.children[0].classList.toggle('fa-plus')
            el.children[0].classList.toggle('fa-minus')
            el.nextElementSibling.classList.toggle('hide')
        })
    })
}


//Add New Project
let options = function(opt) {
    const section = document.querySelector(`section.${opt.dataset.option}`)
    if (section) {
        section.classList.remove('hide')
    }
    window.scroll({
        top: 0,
        behavior: 'smooth'
    })
    document.body.classList.add('pop-up-body')
}


//Remove Pop-up
let removePopUp = function() {
    const pops = document.querySelectorAll('.pop')
    document.body.classList.remove('pop-up-body')
    pops.forEach((pop) => {
        pop.classList.add('hide')
    })
}


//Reset Data
let resetData = function() {
    const inputs = document.querySelectorAll('.pop .contain form >div input')
    const textareas = document.querySelectorAll('.pop .contain form > div textarea')
    inputs.forEach((i) => {
        i.value = ''
    })
    textareas.forEach((text) => {
        text.value = ''
    })
}


//Clear Data
let clearData = function(l) {
    if (l.dataset.option === 'clr-pro') {
        localStorage.setItem('projects', '[]')
    } else if (l.dataset.option === 'clr-news') {
        localStorage.setItem('news', '[]')
    }
    document.body.classList.remove('pop-up-body')
}


//Add Data
let addData = function(btn) {
    let data = {}
    let arr = []
    let array = []
    let b = true
    let pro = btn.parentElement.classList.contains('pro') ? true : false
    if (pro) {
        const inputs = document.querySelectorAll('.add-pro .contain form >div input')
        const textareas = document.querySelector('.add-pro .contain form > div textarea')
        inputs.forEach((i) => {
            if (i.value === '') {
                b = false
            } else {
                arr.push(i.value)
            }
        })
        if (textareas.value === '') {
            b = false
        } else {
            arr.push(textareas.value)
        }
        if (!b) {
            return;
        }
        if (localStorage.getItem('projects')) {
            let array = JSON.parse(localStorage.getItem('projects'))
            for (let i = 0; i < arr.length; i++) {
                if (i === 0) {
                    data.title = arr[i]
                } else if (i === 1) {
                    data.startDate = arr[i]
                } else if (i === 2) {
                    data.endDate = arr[i]
                } else if (i === 3) {
                    data.brief = arr[i]
                }
            }
            array.push(data)
            localStorage.setItem('projects', JSON.stringify(array))
        } else {
            console.log(array)
            localStorage.setItem('projects', JSON.stringify(array))
        }
    } else {
        const inputs = document.querySelectorAll('.add-news .contain form >div input')
        const textareas = document.querySelector('.add-news .contain form > div textarea')
        inputs.forEach((i) => {
            if (i.value === '') {
                b = false
            } else {
                arr.push(i.value)
            }
        })
        if (textareas.value === '') {
            b = false
        } else {
            arr.push(textareas.value)
        }
        if (!b) {
            return;
        }
        if (localStorage.getItem('news')) {
            let array = JSON.parse(localStorage.getItem('projects'))
            for (let i = 0; i < arr.length; i++) {
                if (i === 0) {
                    data.title = arr[i]
                } else if (i === 1) {
                    data.puDate = arr[i]
                } else if (i === 2) {
                    data.endDate = arr[i]
                }
            }
            array.push(data)
            localStorage.setItem('news', JSON.stringify(array))
        } else {
            localStorage.setItem('news', JSON.stringify(array))
        }
    }
    removePopUp()
    Swal.fire({
        icon: 'success',
        title: 'conguratulation!!',
        text: 'Added successfully',
    })
}


//Delete One Item From Data
let delItem = function(del) {
    let array = []
    if (del.parentElement.classList.contains('pro') && JSON.stringify(localStorage.getItem('projects')).length > 2) {
        array = JSON.parse(localStorage.getItem('projects'))
        const id = document.querySelector('.del-pro .contain form input')
        if (id.value !== '' && parseInt(id.value)) {
            for (let i = 0; i < array.length; i++) {
                if (i + 1 === parseInt(id.value)) {
                    array[i] = ''
                    Swal.fire({
                        icon: 'success',
                        title: 'conguratulation!!',
                        text: 'Deleted successfully',
                    })
                    break
                }
            }
            array = array.filter((e) => e !== '')
            localStorage.setItem('projects', JSON.stringify(array))
        } else {
            Swal.fire({
                icon: 'error',
                title: 'error',
                text: 'please enter valid ID',
            })
        }
    } else if (del.parentElement.classList.contains('news') && JSON.stringify(localStorage.getItem('news')).length > 2) {
        array = localStorage.getItem('news')
        const id = document.querySelector('.del-news .contain form input')
        if (id !== '' && parseInt(id)) {
            for (let i = 0; i < array.length; i++) {
                if (i === parseInt(id)) {
                    array = array.slice(0, i).concat(array.slice(i + 1))
                    Swal.fire({
                        icon: 'success',
                        title: 'conguratulation!!',
                        text: 'Deleted successfully',
                    })
                    localStorage.setItem('news', JSON.stringify(array))
                    break
                }
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'error',
                text: 'please enter valid ID',
            })
        }
    } else {
        Swal.fire({
            icon: 'error',
            title: 'error',
            text: 'No Found Data To Delete',
        })
    }
}


//Dashboards Projects Handle
let projectsHandle = function() {
    let array = []
    const dashboardsProjects = document.querySelector(".dashboard .contain .grid .left")
    let projects = ''
    if (localStorage.getItem('projects') !== '[]') {
        array = JSON.parse(localStorage.getItem('projects'))
        array.forEach((pro) => {
            projects += `<div class="project ${array.indexOf(pro)+1} grid-start">
            <h3>${pro.title}</h3>
            <p>${pro.brief}</p>
            <div class ="dates grid-start">
                <p>Start Date : <span>${pro.startDate}</span></p>
                <p>End Date : <span>${pro.endDate}</span></p>
            </div>
            <div class="news flex-start">
                <a href="#">News</a>
                <i class="fa-solid fa-arrow-right-long"></i>
            </div>
        </div>`
        })
        dashboardsProjects.innerHTML = projects
    }
    if (array.length === 0) {
        dashboardsProjects.innerHTML = `<div class='center' style= "font-size:20px">No Data Found.............</div>`
        return
    }
}


//Handle Sign Up Form
let signUp = function() {
    let data = {
        username: '',
        email: '',
        password: '',
        conPassword: '',
        image: '',
        year: '',
        month: '',
        day: '',
        hour: '',
        minute: '',
        second: '',
    }
    const username = document.getElementById('username')
    const email = document.getElementById('email')
    const password = document.getElementById('password')
    const conPassword = document.getElementById('conpassword')
    const signBtn = document.getElementById('sign-btn')
    signBtn.addEventListener('click', function(e) {
        let array = []
        e.preventDefault()
        if (usernameValid() && emailValid() && passwordValid()) {
            Swal.fire({
                icon: 'success',
                title: 'conguratulation!!',
                text: 'your account is created successfully',
                confirmButtonText: "<a href='home.html'>home page</a>"
            })
            data.username = username.value
            data.email = email.value
            data.password = password.value
            data.conPassword = conPassword.value
            data.year = new Date().getFullYear()
            data.month = new Date().getMonth()
            data.day = new Date().getDay()
            data.hour = new Date().getHours()
            data.minute = new Date().getMinutes()
            data.second = new Date().getSeconds()
            data.image = ""
        }
        if (localStorage.getItem('userData')) {
            console.log(1)
            array = JSON.parse(localStorage.getItem('userData'))
            array.push(data)
            localStorage.setItem('userData', JSON.stringify(array))
        } else {
            array.push(data)
            localStorage.setItem('userData', JSON.stringify(array))
        }
    })
}


//Username Valid
let usernameValid = function() {
    const username = document.getElementById('username')
    if (username.value === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'enter username',
        })
        return false
    } else if (/^[A-Za-z][A-Za-z0-9_]{7,29}$/.test(username.value)) {
        return true
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'enter valid username (username must start with an alphabet)',
        })
        return false
    }
}


//Email Valid
let emailValid = function() {
    const email = document.getElementById('email')
    if (email.value === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'enter your email',
        })
        return false
    } else if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.value)) {
        return true
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'enter valid email',
        })
        return false
    }
}


//Password Valid
let passwordValid = function() {
    const password = document.getElementById('password')
    const conPassword = document.getElementById('conpassword')
    if (password.value === "") {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'enter new password',
        })
        return false
    } else if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password.value)) {
        return true
    } else if (password.value !== conPassword.value) {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'confirm password not match',
        })
        return false
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'enter valid paswsord (must be Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character)',
        })
        return false
    }
}


//Handle Login Form
let login = function() {
    const email = document.getElementById('email')
    const password = document.getElementById('password')
    if (localStorage.getItem('userData') && emailValid() && passwordValid()) {
        let array = JSON.parse(localStorage.getItem('userData'))
        for (let i = 0; i < array.length; i++) {
            if (array[i].email === email.value && array[i].password === password.value) {
                window.location.replace('http://127.0.0.1:5500/Portfolio/SP-Project/Company-Managemwnt-Project(web)/HTML/home.html?')
            }
        }
    } else {
        console.log(1)
    }
}


//CurrentYear
let currentYear = function() {
    const year = document.querySelector('.year')
    year.textContent = new Date().getFullYear()
}
currentYear()

export { headerScroll, learMore, signUp, login, options, resetData, removePopUp, addData, clearData, projectsHandle, delItem }