import { headerScroll, options, resetData, removePopUp, addData, clearData, projectsHandle, delItem } from './framework.js'

//Header Scroll
headerScroll()


//Clear Data
const lists = document.querySelectorAll('.tools ul li')
lists.forEach((e) => {
    e.addEventListener('click', function() {
        options(e)
        clearData(e)
        projectsHandle()
    })
})

const overlay = document.querySelectorAll('.pop .overlay')
overlay.forEach((over) => {
    over.addEventListener('click', function() {
        resetData()
        removePopUp()
    })
})

const resetBtn = document.querySelectorAll('.pop .contain form .btns .reset button')
resetBtn.forEach((i) => {
    i.addEventListener('click', function(e) {
        e.preventDefault()
        resetData()
    })
})

const addBtn = document.querySelectorAll('.pop .contain form .btns .add button')
addBtn.forEach((add) => {
    add.addEventListener("click", function(e) {
        e.preventDefault()
        addData(add)
        projectsHandle()
    })
})

const delBtn = document.querySelectorAll('.pop .contain form .btns .del button')
delBtn.forEach((del) => {
    del.addEventListener('click', function(e) {
        e.preventDefault()
        delItem(del)
        projectsHandle()
    })
})

projectsHandle()