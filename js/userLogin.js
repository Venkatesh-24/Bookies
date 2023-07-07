const searchBar = document.getElementById('query');
const suggestionsContainer = document.getElementById("suggestionsContainer");
const resultsPerPage = 5; // Number of results per page
let totalItems = 0; // Total number of books matching the search term
let currentPage = 0; // Current page number of results
let currentBooks = []; 
const totalPages = 6;

var butt1 = false;
var butt2 = false;
var butt3 = false;
var butt4 = false;
var btn;

function button1() {
  butt1 = true;
  butt2 = false;
  butt3 = false;
  butt4 = false;
  btn = document.getElementById("fil1");
  document.getElementById("fil1").classList.add('active');
  document.getElementById("fil2").classList.remove('active');
  document.getElementById("fil3").classList.remove('active');
  document.getElementById("fil4").classList.remove('active');
}

function button2() {
  butt1 = false;
  butt2 = true;
  butt3 = false;
  butt4 = false;
  btn = document.getElementById("fil2");
  document.getElementById("fil2").classList.add('active');
  document.getElementById("fil1").classList.remove('active');
  document.getElementById("fil3").classList.remove('active');
  document.getElementById("fil4").classList.remove('active');
}

function button3() {
  butt1 = false;
  butt2 = false;
  butt3 = true;
  butt4 = false;
  btn = document.getElementById("fil3");
  document.getElementById("fil3").classList.add('active');
  document.getElementById("fil2").classList.remove('active');
  document.getElementById("fil1").classList.remove('active');
  document.getElementById("fil4").classList.remove('active');
}

function button4() {
  butt1 = false;
  butt2 = false;
  butt3 = false;
  butt4 = true;
  btn = document.getElementById("fil4");
  document.getElementById("fil4").classList.add('active');
  document.getElementById("fil2").classList.remove('active');
  document.getElementById("fil3").classList.remove('active');
  document.getElementById("fil1").classList.remove('active');
}
  
function displayTable(page) {
    const tableBody = document.getElementById("table-body");
    tableBody.innerHTML = ""; 

    const startIndex = (page - 1) * resultsPerPage;
    const endIndex = startIndex + resultsPerPage;

    console.log(currentBooks);
  
    for (let i = startIndex; i < endIndex && i < currentBooks.length; i++) {
      const row = document.createElement("tr");
      row.setAttribute('id','rowTab');

      console.log(currentBooks[i]);

      const id = currentBooks[i].id;
      const date = currentBooks[i].volumeInfo.publishedDate? currentBooks[i].volumeInfo.publishedDate: "2001-01-01";
      const price = currentBooks[i].saleInfo.retailPrice ? currentBooks[i].saleInfo.retailPrice.amount : "200.00";
      const title = currentBooks[i].volumeInfo.title;
      const authors = currentBooks[i].volumeInfo.authors ? currentBooks[i].volumeInfo.authors.join(", ") : "Anonymous";
      const thumbnail = currentBooks[i].volumeInfo.imageLinks ? currentBooks[i].volumeInfo.imageLinks.thumbnail : "data:image/png;base64,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";
      const description = currentBooks[i].volumeInfo.description ? currentBooks[i].volumeInfo.description : "No description available";

      let count = 20;

      for (let index = 0; index < boughtItems.length; index++) {
        const Bid = boughtItems[index].id;

        if(id == Bid){
          count -= boughtItems[index].count;
        }
        
      }

      let availability = "Add Item";
      let color = "green";
      let flag = "enabled";

      if(count==0){
        availability = "Not Available";
        color="red";
        flag="disabled";
      }

      row.innerHTML =`
        <div>
        <td style=""><img src="${thumbnail}" alt="${title}" />
          <br>
          <button id="Button" style="background-color: ${color}; height: 44px; border-radius: 28px; width: 162px;" ${flag}
          onclick="addItem(event)">${availability}
          </button>
        </td>
          <td><strong>${title}</strong><br><br>
          <strong> By ${authors}</strong>
          <br>
          <strong> ${date}</strong>
          <br>
          <h4>Price : Rs. ${price}</h4>
          <br>
          <input type="hidden" value="${id}">
          <br>
          <p>
          ${description}
          </p>
        </td>
        <td>
           Available count : ${count}
        </td>
        </div>
      `;

      tableBody.appendChild(row);
    }
}
  
  // Generate buttons
  function generatePagination() {
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = ""; // Clear existing pagination buttons
  
    // Generate a button for each page
    for (let i = 1; i <= totalPages; i++) {
      const button = document.createElement("button");
      
      button.style.padding= '10px 15px';
      button.style.margin= '20px 5px';
      button.style.border= '2px solid #4CAF50';
      button.style.color= '#333';
      button.style.fontSize= '14px';
      button.style.borderRadius= '200px';
      button.style.cursor= 'pointer';
      button.style.transitionDuration = '0.4s';
      button.classList.add('pagination-button');
      button.innerText = i;
      button.addEventListener("click", function () {
        displayTable(i);
      });
      paginationContainer.appendChild(button);
    }
  }

searchBar.addEventListener('input', function() {
  const searchTerm = searchBar.value;

  // Clear previous suggestions
  suggestionsContainer.innerHTML = '';

  if (searchTerm === '') {
    return;
  }

  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}&maxResults=5`;

  //console.log(url);
  fetch(url)
    .then(response => response.json())
    .then(data => {
      suggest(data.items);
    })
    .catch(error => {
      console.log("An error occurred:", error);
    });
});

function searchBooks() {
  const searchTerm = document.getElementById('query').value;

  let btnVal = '';
  if(btn!==undefined) btnVal = btn.value;

  var url;

  if (btnVal === 'title') {
    url = `https://www.googleapis.com/books/v1/volumes?q=intitle:${encodeURIComponent(searchTerm)}&maxResults=30`;
  }
  else if (btnVal === 'author') {
    url = `https://www.googleapis.com/books/v1/volumes?q=inauthor:${encodeURIComponent(searchTerm)}&maxResults=30`;
  }
  else if (btnVal === 'subject') {
    url = `https://www.googleapis.com/books/v1/volumes?q=subject:${encodeURIComponent(searchTerm)}&maxResults=30`;
  }
  else if (btnVal === 'publishDate') {
    url = `https://www.googleapis.com/books/v1/volumes?q=publishedDate:${encodeURIComponent(searchTerm)}&maxResults=30`;
  }
  else {
    url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}&maxResults=30`;
  }

  console.log(url);

  fetchBooks(url);
}

function fetchBooks(url) {  

  suggestionsContainer.innerHTML = '';

  fetch(url)
    .then(response => response.json())
    .then(data => {
      //console.log("hello");
      currentBooks = data.items;
      displayTable(1);
      generatePagination();
    
    })
    .catch(error => {
      console.log("An error occurred:", error);
    });
}

function displayResults(books) {
    const resultsContainer = document.getElementById("results");
    
    suggestionsContainer.innerHTML = '';

    resultsContainer.innerHTML = "";


    //console.log(books);
    //return;

    if (!books || books.length === 0) {
      resultsContainer.innerHTML = "<p>No results found :( </p>";
      return;
    }

    books.slice(0,resultsPerPage).forEach(book => {
      const title = book.volumeInfo.title;
      const authors = book.volumeInfo.authors ? book.volumeInfo.authors.join(", ") : "Anonymous";
      const thumbnail = book.volumeInfo.imageLinks ? book.volumeInfo.imageLinks.thumbnail : "";
      const description = book.volumeInfo.description ? book.volumeInfo.description : "No description available";

      const bookElement = document.createElement("div");
      bookElement.innerHTML = `
        <img src="${thumbnail}" alt="${title}" />
        <h3>${title}</h3>
        <p><strong>Author(s):</strong> ${authors}</p>
        <br>
      `;

      resultsContainer.appendChild(bookElement);
    });
}

function suggest(books) {

    const suggestionsContainer = document.getElementById("suggestionsContainer");
    const searchBox = document.getElementById("query");
    suggestionsContainer.innerHTML = "";

    books.forEach(book => {
      const title = book.volumeInfo.title;
    
      const bookElement = document.createElement("div");
      bookElement.classList.add('suggestion-item');
      bookElement.textContent = title;
      console.log(title);
      bookElement.addEventListener('click', function() {
              // Set the suggestion as the search input value
              searchBox.value = title;
        });

       suggestionsContainer.appendChild(bookElement);
  });
}

function suggestN(searchData){
  displayResults(searchData);

}
  
searchBar.addEventListener('input', function() {
    const searchTerm = searchBar.value;
  
    // Clear previous suggestions
    suggestionsContainer.innerHTML = '';
  
    if (searchTerm === '') {
      return;
    }
  
    const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(searchTerm)}&maxResults=5`;
  
    //console.log(url);
    fetch(url)
      .then(response => response.json())
      .then(data => {
        suggestN(data.items);
      })
      .catch(error => {
        console.log("An error occurred:", error);
      });
});

function displayResults(results) {
  let searchResults = document.getElementById('search-results');
  let searchInput = document.getElementById('query');

   searchResults.innerHTML = '';     
   results.forEach(book => {
    
      let li = document.createElement('li');
      const title = book.volumeInfo.title;

      li.textContent = title;
      li.addEventListener('click', () => {
         searchInput.value = title;
         searchResults.innerHTML = '';
      });
      searchResults.appendChild(li);
   }); 
}

function logout() {
    // clear session variables
    localStorage.setItem('isLoggedIn', false);
    window.location.href = 'index.html';
}
