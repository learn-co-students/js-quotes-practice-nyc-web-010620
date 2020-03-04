const quotesURL = 'http://localhost:3000/quotes?_embed=likes';
const baseURL = 'http://localhost:3000/quotes';
const likesURL = 'http://localhost:3000/likes';
const quotesList = document.getElementById('quote-list');
const quoteForm = document.getElementById('new-quote-form');
const deleteButton = document.getElementsByClassName('btn-danger');
const quoteList = document.getElementById('quote-list');

// fetch amount of likes and post it to whatever element on HTML

document.addEventListener('DOMContentLoaded', function(event) {
	getQuotes();
	postNewQuote();

	quoteList.addEventListener('click', function(event) {
		if (event.target.className === 'btn-danger') {
         removeQuote(event.target.dataset.quoteId)
         event.target.parentNode.parentNode.remove()
		}
		if (event.target.className === 'btn-success') {
         likeQuote(event.target.dataset.quoteId);
         let likeCount = parseInt(event.target.children[0].innerText)
         likeCount += 1
         event.target.getElementsByTagName("span")[0].innerText = likeCount
		}
	});
});

function getQuotes() {
	fetch(quotesURL)
		.then(function(response) {
			return response.json();
		})
		.then(function(data) {
			data.forEach(function(quote) {
				let quoteLi = document.createElement('li');
				quoteLi.className = 'quote-card';
				quoteLi.innerHTML = `
         <blockquote class="blockquote">
         <p class="mb-0">${quote.quote}</p>
         <footer class="blockquote-footer">${quote.author}</footer>
         <br>
         <button class='btn-success' data-quote-id=${quote.id}>Likes: <span>0</span></button>
         <button class='btn-danger' data-quote-id=${quote.id}>Delete</button>
       </blockquote>
         `;
				quotesList.append(quoteLi);
			});
		});
}

// Pessimistic rendering -- changes hit database first
function postNewQuote() {
	quoteForm.addEventListener('submit', function(event) {
		event.preventDefault();

		let quoteContent = document.getElementById('new-quote').value;
		let quoteAuthor = document.getElementById('author').value;

		fetch(baseURL, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
				Accept: 'application/json'
			},
			body: JSON.stringify({
				quote: quoteContent,
				author: quoteAuthor
			})
		})
			.then((response) => response.json())
			.then((response) => {
				let newQuoteLi = document.createElement('li');
				newQuoteLi.className = 'quote-card';
				newQuoteLi.innerHTML = `
         <blockquote class="blockquote">
         <p class="mb-0">${response.quote}</p>
         <footer class="blockquote-footer">${response.author}</footer>
         <br>
         <button class='btn-success' ata-quote-id=${response.id}>Likes: <span>0</span></button>
         <button class='btn-danger' data-quote-id=${response.id}>Delete</button>
         </blockquote>
         `;
				quotesList.append(newQuoteLi);
				quoteForm.reset();
			});
	});
}

// Pessimistic rendering
function removeQuote(quoteId) {
	fetch(`${baseURL}/${quoteId}`, {
		method: 'DELETE'
	}).then((response) => response.json());
}

function likeQuote(quoteId) {
   fetch(likesURL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
			Accept: 'application/json'
		},
		body: JSON.stringify({
			quoteId: quoteId
		})
	})
}



