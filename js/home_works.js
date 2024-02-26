const gmailInput = document.querySelector('#gmail_input')
const gmailButton = document.querySelector('#gmail_button')
const gmailResult = document.querySelector('#gmail_result')

const regExp = /^\w{5,30}@gmail.com$/g
gmailButton.onclick = () => {
    if (regExp.test(gmailInput.value)) {
        gmailResult.innerHTML = 'OK'
        gmailResult.style.color = 'green'
    } else {
        gmailResult.innerHTML = 'NOT OK'
        gmailResult.style.color = 'red'
    }
}
const childBlock = document.querySelector('.child_block')
const parentBlock = document.querySelector('.parent_block')
const mainWidth = parentBlock.offsetWidth - childBlock.offsetWidth
const mainHeight = parentBlock.offsetHeight - childBlock.offsetHeight

let moveLeft = 0
let moveBottom = 0
let moveRight = mainWidth
let moveTop = mainHeight
let f =0

const moveLeftChildBlock = () => {
    if (moveLeft < mainWidth) {
        moveLeft += 5
        childBlock.style.left = `${moveLeft}px`
        requestAnimationFrame(moveLeftChildBlock)

    } else if (moveLeft >= mainWidth && moveBottom< mainHeight) {
        moveBottom += 5
        childBlock.style.top = `${moveBottom}px`
        requestAnimationFrame(moveLeftChildBlock)
    } else if(moveBottom >= mainHeight&& moveRight>0){
        moveRight-=5
        childBlock.style.left = `${moveRight}px`
        requestAnimationFrame(moveLeftChildBlock)
    } else if(moveRight<=0&& moveTop>0){
        moveTop-=5
        childBlock.style.top = `${moveTop}px`
        requestAnimationFrame(moveLeftChildBlock)
    } else if (moveTop<=0) {
        moveLeft=0
        moveBottom=0
        moveRight=mainWidth
        moveTop=mainHeight
        moveLeftChildBlock()
    }

}
moveLeftChildBlock()


const seconds = document.querySelector('#seconds')
const start = document.querySelector('#start')
const stop = document.querySelector('#stop')
const reset = document.querySelector( '#reset')
let nullValue = 0
let timer

const buttonAction=()=> {
    start.addEventListener('click' , () =>{
        timer = setInterval(() =>{
            nullValue++
            seconds.innerHTML=nullValue
        },1000)
        start.disabled=true
    })
    stop.addEventListener('click', () => {
        clearInterval(timer)
        start.disabled=false

    })
    reset.onclick=() =>{
        clearInterval(timer)
        nullValue=0
        seconds.innerHTML=nullValue
        start.disabled=false

    }

}
buttonAction()
