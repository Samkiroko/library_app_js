let myLibrary = [
  {
    title: 'Title: 1984',
    author: 'Author: George Orwell',
    pages: 'Number of Pages: 326',
    read: true,
  },
  {
    title: 'Title: To Kill a Mockingbird',
    author: 'Author: Harper Lee',
    pages: 'Number of Pages: 281',
    read: false,
  },
];
const library = document.getElementById('library');
const addBook = document.getElementById('add-Book');
const title = document.getElementById('title');
const author = document.getElementById('author');
const pages = document.getElementById('pages');
const read = document.getElementById('read');
const form = document.getElementById('newBookForm');
let deleteTracking = 0;
let readTracking = 0;
if (localStorage.length === 1) {
  pullFromLocalStorage();
}
render();

class Book {
  constructor(title, author, pages, read) {
    this.title = `Title: ${title}`;
    this.author = `Author: ${author}`;
    this.pages = `Number of Pages: ${pages}`;
    this.read = read.toLowerCase() === 'yes';
  }
}

function pushToLocalStorage() {
  localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
}
function pullFromLocalStorage() {
  myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
}

function addBookToLibrary() {
  if (
    title.value === ''
    || author.value === ''
    || pages.value === ''
    || read.value === ''
  ) return;
  const book = new Book(title.value, author.value, pages.value, read.value);
  myLibrary.push(book);
  pushToLocalStorage();
  render();
  form.reset();
}

function render() {
  library.innerHTML = '';
  for (let i = 0; i < myLibrary.length; i++) {
    // Create book div.
    const div = document.createElement('div');
    div.className = 'book';
    // Create an array of values of the book.
    const properties = Object.values(myLibrary[i]);
    // Loop trough properties of each book and append them.
    for (let i = 0; i < properties.length; i++) {
      const property = document.createElement('div');
      property.className = 'properties';
      property.innerHTML = properties[i];
      // Set the read property according to the read boolean value.
      if (properties[i] === true) {
        property.innerHTML = 'Read';
        property.className = 'read-status';
      } else if (properties[i] === false) {
        property.innerHTML = 'Not Read';
        property.className = 'read-status';
      }
      div.appendChild(property);
    }
    library.appendChild(div);
  }
  addDeleteButton();
  addReadButton();
}

function addDeleteButton() {
  let index = 0;
  [].forEach.call(document.querySelectorAll('.book'), (el) => {
    // Add the delete button for each element.
    const deleteBook = document.createElement('button');
    deleteBook.innerHTML = 'Delete';
    deleteBook.className = 'delete';
    deleteBook.id = index;
    index++;
    deleteBook.onclick = function () {
      const index = deleteBook.id;
      myLibrary.splice(index, 1);
      pushToLocalStorage();
      render();
      showDeleteButton();
    };
    el.appendChild(deleteBook);
  });
}

function addReadButton() {
  let index = 0;
  [].forEach.call(document.querySelectorAll('.book'), (el) => {
    // Add the delete button for each element.
    const readButton = document.createElement('button');
    readButton.innerHTML = 'Change Status';
    readButton.className = 'read';
    readButton.id = index;
    index++;
    readButton.onclick = function () {
      const index = readButton.id;
      if (myLibrary[index].read === true) {
        myLibrary[index].read = false;
        pushToLocalStorage();
      } else {
        myLibrary[index].read = true;
        pushToLocalStorage();
      }
      render();
      showReadButton();
    };
    el.appendChild(readButton);
  });
}

function openForm() {
  document.getElementById('myForm').style.display = 'block';
}

function closeForm() {
  document.getElementById('myForm').style.display = 'none';
  form.reset();
}

function showDeleteButton() {
  if (deleteTracking === 0) {
    [].forEach.call(document.querySelectorAll('.delete'), (el) => {
      el.style.visibility = 'visible';
    });
    deleteTracking = 1;
  } else {
    [].forEach.call(document.querySelectorAll('.delete'), (el) => {
      el.style.visibility = 'hidden';
    });
    deleteTracking = 0;
  }
}

function showReadButton() {
  if (readTracking === 0) {
    [].forEach.call(document.querySelectorAll('.read'), (el) => {
      el.style.visibility = 'visible';
    });
    readTracking = 1;
  } else {
    [].forEach.call(document.querySelectorAll('.read'), (el) => {
      el.style.visibility = 'hidden';
    });
    readTracking = 0;
  }
}
