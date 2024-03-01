const cardsBlock= document.querySelector('.cards')
const url = 'https://jsonplaceholder.typicode.com/posts'
const url_photo= 'https://www.anti-malware.ru/files/styles/amp_metadata_content_image_min_696px_wide/public/images/source/snimok_ekrana_2020-01-14_v_16.36.41.png?itok=iODP6VVu'
const getCards=async () =>{
    try {
        const response= await fetch(url)
        const data =await response.json()
        data.forEach((person) =>{
            const card= document.createElement('div')
            card.setAttribute('class', 'cardPerson')
            card.innerHTML=`
            <div><img src="${url_photo}" alt="${person.title}"></div>
            <h4 class="cardTitle">${person.title}</h2>
            <span class="cardBody">${person.body}</span>
        `
            cardsBlock.append(card)
        })
    }catch (error){
        console.log(error)
    }

}
getCards()