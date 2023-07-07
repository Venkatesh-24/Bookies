const tableBody = document.getElementById("table-body");

const localBoughtItems  = JSON.parse(
  localStorage.getItem("bought")
);
let boughtItems = localBoughtItems !== null ? localBoughtItems : [];
function updateBoughtLocaleStorage() {
  localStorage.setItem("bought", JSON.stringify(boughtItems));
  console.log(localStorage.getItem("bought"));
}



const localStorageItems = JSON.parse(
  localStorage.getItem("items")
);
let items = localStorageItems !== null ? localStorageItems : [];
function updateLocaleStorage() {
  localStorage.setItem("items", JSON.stringify(items));
  console.log(localStorage.getItem("items"));
}


function addItem(e) {
  e.preventDefault();
  let tdList = e.target.parentElement.parentElement.childNodes;
  td1 = tdList[2].childNodes;
  td2 = tdList[4].childNodes;

  image = td1[0].currentSrc

  console.log(td2);

  title = td2[0].innerHTML 
  author = td2[4].innerHTML
  date = td2[8].innerHTML;

  price= td2[12].innerHTML;
  id = td2[16].value;
  desc = td2[20].innerText;

  console.log(td2);

  // target.parentElement.parentElement
    const item = {
      id: id,
      image: image,
      title: title,
      desc: desc,
      authors:author,
      price:price,
      date:date
    };
    
    console.log(item);
    showSuccessToast();

    items.push(item);
    updateLocaleStorage();
}

function showSuccessToast() {
  // toast in green color
  var x = document.getElementById("snackbar");
  x.className = "show";
  setTimeout(function(){ x.className = x.className.replace("show", ""); }, 3000);
}

function addItemDOM() {

  tableBody.innerHTML = "";

  if (!items || items.length === 0) {
    document.getElementById("cart").innerHTML = "<p>Cart is Empty !! </p>";
  }

  else{

    console.log(items);

    items.forEach(book => {
      const title = book.title;
      const authors = book.authors;
      const thumbnail = book.image;
      const description = book.desc;

      const row = document.createElement("tr");
      row.innerHTML = `
      <td style=""><img src="${thumbnail}" alt="${title}" />
        <br>
        <button style="background-color: red; height: 44px; border-radius: 28px; width: 162px;"
        onclick="removeItem('${book.id}')"> Remove Item</button>

        </td>
        <td><strong>${title}</strong><br><br>
        <strong> By ${authors}</strong>
        <br>
       </td>`;
      tableBody.appendChild(row);
    });
  }
}

function removeItem(id) {
  console.log(items);
  items = items.filter((item) => item.id !== id);
  updateLocaleStorage();
  init();
}

// Init
function init() {
  tableBody.innerHTML = "";
  addItemDOM();
}

function checkout() {
  let total  = 0.0;
  items.forEach((item)=>{
    total += parseInt(item.price.substring(11));
  });

  // add to boughtItems

  for (let index = 0; index < items.length; index++) {
    let id = items[index].id;
    let flag = false;

    for (let j = 0; j < boughtItems.length; j++) {
      const Bid = boughtItems[j].id;

      if(id===Bid){
        flag=true;
        boughtItems[j].count =  boughtItems[j].count+1; 
      }

    }

    if(flag==false){
      temp  = {}
      temp.id = id;
      temp.count = 1;
      boughtItems.push(temp);
    }
  }

  updateBoughtLocaleStorage();
  
  var x = document.getElementById("toggleCheckout");
  var price = document.getElementById("price");
  price.innerText = total;

  x.className = "show";
}
