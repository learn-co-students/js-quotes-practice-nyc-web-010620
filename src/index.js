QOTES_URL = "http://localhost:3000/quotes"
LIKES_URL = "http://localhost:3000/likes"
BASE_URL ="http://localhost:3000/quotes?_embed=likes"


fetch(BASE_URL)
.then(resp =>resp.json())
.then( quotes =>{quotes.forEach(addQuote) 
})

function addQuote(quote){

    ul = document.getElementById('quote-list')
    li = document.createElement('li')
    li.className ='quote-card'
    li.id = `${quote.id}`
    blockquote = document.createElement('blockquote')
    blockquote.className = 'blockquote'
    blockquote.innerHTML = `
    <p class="mb-0">${quote.quote}</p>
    <footer class="blockquote-footer">${quote.author}</footer>
    <br>
    <button class='btn-success' data-purpose ="like">Likes: <span>${quote.likes.length}</span></button>
    <button class='btn-danger' data-purpose ="delete">Delete</button>`

    li.appendChild(blockquote)
    ul.appendChild(li)

}//add quote

let form = document.getElementById('new-quote-form')

form.addEventListener('submit', function(event){
    event.preventDefault()
    let quote = form.quote.value
    let author = form.author.value
    let likes = []

    let body ={quote: quote, author:author, likes:likes}
    addQuote(body)
    fetch(BASE_URL, {
        method: 'POST', 
        headers:{
        'Accept': 'application/json',
        'Content-Type': 'application/json'},
        body: JSON.stringify(body)
    
        })//fetch
})//submit new quote

document.addEventListener("click", function(event){
    if (event.target.dataset.purpose ==="delete")

    {let block = event.target.parentNode
        let li = block.parentNode
        li.parentNode.removeChild(li)
    
    
        let quoteId = li.id

        
        fetch(`${QOTES_URL}/${quoteId}`, {
            method: 'DELETE', 
        
        })
    } else if(event.target.dataset.purpose ==="like"){
        // debugger
        let span =  event.target.children[0]
        let spanNumber = parseInt(span.innerText)
        let newNumber = spanNumber+1
        span.innerText = newNumber

        let id = parseInt(event.target.parentNode.parentNode.id)

        body ={quoteId: id}

        fetch("http://localhost:3000/likes", {
            method: 'POST', 
            headers:{
            'Accept': 'application/json',
            'Content-Type': 'application/json'},
            body: JSON.stringify(body)
        })
        .then(resp => console.log(resp))
    }




})//event listener 



        

    














