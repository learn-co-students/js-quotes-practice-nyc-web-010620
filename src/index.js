QOTES_URL = "http://localhost:3000/quotes"
LIKES_URL = "http://localhost:3000/likes"
BASE_URL ="http://localhost:3000/quotes?_embed=likes"

document.addEventListener("DOMContentLoaded", e=>{

    let quoteUl = document.querySelector("#quote-list")
    
    fetch(BASE_URL)
    .then(resp =>resp.json())
    .then(data =>data.forEach(renderQuotes))
    
    
    function renderQuotes(quote){
        
        let quoteLi = document.createElement("li")
        quoteLi.className = "quote-card"
        quoteLi.innerHTML =`
            <blockquote class="blockquote">
            <p class="mb-0">${quote.quote}</p>
            <footer class="blockquote-footer">${quote.author}</footer>
            <br>
            <button class='btn-success'>Likes: <span>${quote.likes.length}</span></button>
            <button class='btn-danger' data-id=${quote.id}>Delete</button>
            </blockquote>
        `
        quoteUl.appendChild(quoteLi)
    }

   function addNewQuote(){

        let form  = document.getElementById("new-quote-form")
        form.addEventListener("submit", e=>{
        
            e.preventDefault()
            let quote = e.target.quote.value
            let author = e.target.author.value
            let likes = []
        
        
            let newQuote= {
                quote: quote,
                author: author,
                likes: likes
            }
        
            renderQuotes(newQuote)
        
            let options = {
            method: "POST",
            headers:{
                "Content-Type": "application/json",
                Accept: "application/json"
            },
            body: JSON.stringify(newQuote)
            }
        
            fetch(BASE_URL, options)
        
        })//eventListener
    }//f addQuote
    
    
    addNewQuote()
    
    //     // debugger
    function toggleButtons(){

        quoteUl.addEventListener("click", e=>{

            if(e.target.innerText ==="Delete"){

                let quoteId = e.target.dataset.id
                let parentLi = e.target.parentNode.parentNode
                let new_link = `http://localhost:3000/quotes/${quoteId}`
                const option = {
                    method: "DELETE"
                }
                fetch(new_link, option)  
                .then(res =>{
                    parentLi.remove()
                })
            } else {
                console.log("likes")
            }
        })
    } //f deleteQuote
    
    toggleButtons()
    
    function addLikes(){
        ul.getElementById("click", e=>{
            console.log("clicks")
        })     
    }
    
    addLikes()



    

    



    
})//DomLoaded



        

    














