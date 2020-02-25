let quotesArr = []
let quoteUl  = document.getElementById("quote-list")
const form = document.getElementById("new-quote-form")

function renderQoutes(response){
    let quoteHTMLarr = response.map(quote => {
    return( 
  ` <li class='quote-card' id=${quote.id}>
        <blockquote class="blockquote">
        <p class="mb-0">${quote.quote}</p>
        <footer class="blockquote-footer">${quote.author}</footer>
        <br>
        <button class='btn-success' id= ${quote.id}>Likes:  <span> ${quote.likes.length} </span></button>
        <button class='btn-danger' id = ${quote.id}>Delete</button>
        </blockquote>
    </li>`)
    })
    quoteUl.innerHTML = quoteHTMLarr.join("")
}


document.addEventListener('DOMContentLoaded', (event) => {
    fetch("http://localhost:3000/quotes?_embed=likes")
    .then(response => response.json())
    .then(response => {
        quotesArr = response
        console.log(quotesArr)
        renderQoutes(response)
    })

    document.addEventListener("submit", function(event){
        event.preventDefault()
        let newQoute = form.elements[0].value
        let author = form.elements[1].value
        const quote = {
            quote: newQoute,
            author: author,
            likes: []
        }
        fetch("http://localhost:3000/quotes", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
              },
            body: JSON.stringify(quote)
        }).then(response => response.json())
        .then(response => {
            quoteUl.innerHTML += 
            `<li class='quote-card' id =${quote.id}>
            <blockquote class="blockquote">
            <p class="mb-0">${quote.quote}</p>
            <footer class="blockquote-footer">${quote.author}</footer>
            <br>
            <button class='btn-success' id= ${quote.id}>Likes:  <span> ${quote.likes.length} </span></button>
            <button class='btn-danger' id = ${quote.id}>Delete</button>
            </blockquote>
            </li>`
        })
    })

    document.addEventListener("click", function(event){
        if(event.target.className === 'btn-danger'){
            fetch(`http://localhost:3000/quotes/${event.target.id}`,{
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  }
            })
            event.target.parentElement.parentElement.remove() 
        } else if(event.target.className === 'btn-success'){
            const foundQuote = quotesArr.find(quote => quote.id == event.target.id)
            foundQuote.likes.push(1)
            event.target.innerText = `Likes: ${foundQuote.likes.length} `

            fetch("http://localhost:3000/likes", {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
                body: JSON.stringify({quoteId: parseInt(event.target.id)})
            })
        }
    })
});