const phoneInput = document.querySelector('#phone_input')
const phoneButton = document.querySelector('#phone_button')
const phoneResult = document.querySelector('#phone_result')
const redExp = /^\+996 [2579]\d{2} \d{2}-\d{2}-\d{2}$/
phoneButton.addEventListener('click', () => {
    if (redExp.test(phoneInput.value)) {
        phoneResult.innerHTML = 'OK'
        phoneResult.style.color = 'green'
    } else {
        phoneResult.innerHTML = 'NOT OK'
        phoneResult.style.color = 'red'
    }
})

const tabContentItems = document.querySelectorAll('.tab_content_block')
const tabItems = document.querySelectorAll('.tab_content_item')
const tabItemsParent = document.querySelector('.tab_content_items')
const hideTabContent = () => {
    tabContentItems.forEach((item) => {
        item.style.display = 'none'
    })
    tabItems.forEach((item) => {
        item.classList.remove('tab_content_item_active')
    })
}

const showTabContent = (index = 0) => {
    tabContentItems[index].style.display = 'block'
    tabItems[index].classList.add('tab_content_item_active')
}
hideTabContent()
showTabContent()

tabItemsParent.onclick = (event) => {
    if (event.target.classList.contains('tab_content_item')) {
        tabItems.forEach((tabItem, tabIndex) => {
            if (event.target === tabItem) {
                hideTabContent()
                showTabContent(tabIndex)
            }
        })
    }
}

const auto = (index = 0) => {
    setInterval(() => {
        index++
        if (index > tabItems.length - 1) {
            index = 0
        }
        hideTabContent()
        showTabContent(index)
    }, 1000)
}
auto()

// Converter

const somInput= document.querySelector('#som')
const usdInput= document.querySelector('#usd')
const eurInput = document.querySelector('#eur')
const converter = (element, targetElement,targetElement2, current) =>{
    try {
        element.oninput=() =>{
            const request = new XMLHttpRequest()
            request.open ('GET', '../data/converter.json')
            request.setRequestHeader('Content-type', 'application/json')
            request.send()

            request.onload=() =>{
                const data = JSON.parse(request.response)
                switch (current){
                    case 'som':
                        targetElement.value=(element.value / data.usd).toFixed(2)
                        targetElement2.value=(element.value/data.eur).toFixed(2)
                        break
                    case 'usd':
                        targetElement.value=(element.value * data.usd).toFixed(2)
                        targetElement2.value=((element.value * data.usd)/data.eur).toFixed(2)
                        break
                    case 'eur':
                        targetElement.value=(element.value*data.eur).toFixed(2)
                        targetElement2.value=(element.value*data.eurInUsd).toFixed(2)
                    default:
                        break
                }
                element.value==='' &&(targetElement.value='')
            }
        }
    }catch (error){
        console.log(error)
    }
}
converter(somInput, usdInput,eurInput, 'som')
converter(usdInput, somInput,eurInput, 'usd')
converter(eurInput, somInput,usdInput, 'eur')

// Card Switcher

const btnPrev = document.querySelector('#btn-prev')
const btnNext = document.querySelector('#btn-next')
const cardBlock = document.querySelector('.card')
let count =1

// btnNext.onclick =() =>{
//     count ++
//     fetch(`https://jsonplaceholder.typicode.com/todos/${count}`)
//         .then(response => response.json())
//         .then(data =>{
//             cardBlock.innerHTML=`
//                 <p>${data.title}</p>
//                 <p style ='color:  ${data.completed ? 'green':'red'} '> ${data.completed}</p>
//                 <span>${data.id}</span>
//             `
//         })
//
// }
// const getrequest = () =>{
//     fetch(`https://jsonplaceholder.typicode.com/todos/${count}`)
//         .then(response => response.json())
//         .then(data =>{
//             cardBlock.innerHTML=`
//                 <p>${data.title}</p>
//                 <p style ='color:  ${data.completed ? 'green':'red'} '> ${data.completed}</p>
//                 <span>${data.id }</span>
//             `
//         })
// }
const getrequest = async () =>{
    try{
        const url = await `https://jsonplaceholder.typicode.com/todos/${count}`
        const response= await fetch(url)
        const data= await response.json()
        const getData= await (() =>{
            cardBlock.innerHTML=`
                <p>${data.title}</p>
                <p style ='color:  ${data.completed ? 'green':'red'} '> ${data.completed}</p>
                <span>${data.id }</span>
            `
        })
        getData()
    }catch (error){
        console.log()
    }
}

const slideCard= (button, current) =>{
    getrequest()
    button.onclick =() =>{
        switch(current){
            case 'next':
                if(count===200){
                    count=0
                }
                count++
                break
            case 'prev':
                if(count===1){
                    count=201
                }
                count=count-1
        }
        getrequest()

    }
}
slideCard(btnNext, 'next')
slideCard(btnPrev, 'prev')

// Задание2
const getData= async () =>{
    try {
        const url="https://jsonplaceholder.typicode.com/posts"
        const response= await fetch(url)
        const data = await response.json()
        console.log(data)
    }catch(error) {
        console.log(error)
    }
}
getData()
// Weather

const cityInput = document.querySelector('.cityName')
const city= document.querySelector('.city')
const temp= document.querySelector('.temp')
const base_url="http://api.openweathermap.org"
const api_key='e417df62e04d3b1b111abeab19cea714'
// const citySearch=() =>{
//     cityInput.oninput=(event) =>{
//         fetch(`${base_url}/data/2.5/weather?q=${event.target.value}&appid=${api_key}`)
//             .then(response => response.json())
//             .then(data=> {
//                 city.innerHTML=data.name || 'Город не найден...'
//                 temp.innerHTML=data.main?.temp ? Math.round(data.main?.temp - 273) + '&degC': '...'
//             })
//     }
// }
// citySearch()
const citySearch= () =>{
    try {
        cityInput.oninput = async (event) =>{
            const url=await `${base_url}/data/2.5/weather?q=${event.target.value}&appid=${api_key}`
            const response= await fetch(url)
            const data= await response.json()
            const getData =await (()=> {
                city.innerHTML=data.name || 'Город не найден...'
                temp.innerHTML=data.main?.temp ? Math.round(data.main?.temp - 273) + '&degC': '...'
            })
            getData()
        }
    }catch (error){
        console.log(error + 'что то пошло не так...')
    }
}
citySearch()