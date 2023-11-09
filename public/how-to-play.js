function displayQuote() {
    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => {
        const containerEl = document.querySelector('#quote');
  
        const quoteEl = document.createElement('div');
        const authorEl = document.createElement('div');
        authorEl.id = 'author';
  
        quoteEl.textContent = data.content;
        authorEl.textContent = data.author;
  
        containerEl.innerHTML = '';
        containerEl.appendChild(quoteEl);
        containerEl.appendChild(authorEl);
      });
  }

  displayQuote();