let library = [];

// Navigation
function showSection(sectionId) {
  document.querySelectorAll('.section').forEach(section => {
    section.classList.remove('active');
  });
  document.getElementById(sectionId).classList.add('active');

  if (sectionId === 'viewBooks') {
    updateBookList();
  }
}

// Add Book
document.getElementById('addBookForm').addEventListener('submit', event => {
  event.preventDefault();
  const title = document.getElementById('title').value;
  const author = document.getElementById('author').value;
  const copies = parseInt(document.getElementById('copies').value);

  library.push({ title, author, copies });
  alert('Book added successfully!');
  document.getElementById('addBookForm').reset();
  updateBookList();
});

// View All Books
function updateBookList() {
  const bookList = document.getElementById('bookList');
  bookList.innerHTML = '';
  library.forEach(book => {
    const bookElement = document.createElement('p');
    bookElement.textContent = `${book.title} by ${book.author} (Copies: ${book.copies})`;
    bookList.appendChild(bookElement);
  });
}

// Borrow Book
document.getElementById('borrowBookForm').addEventListener('submit', event => {
  event.preventDefault();
  const borrowTitle = document.getElementById('borrowTitle').value;
  const book = library.find(book => book.title.toLowerCase() === borrowTitle.toLowerCase());

  if (book && book.copies > 0) {
    book.copies--;
    alert(`You borrowed '${book.title}'.`);
    updateBookList();
  } else {
    alert('Book not available or out of stock.');
  }
  document.getElementById('borrowBookForm').reset();
});

// Search Book
document.getElementById('searchBookForm').addEventListener('submit', event => {
  event.preventDefault();
  const searchTitle = document.getElementById('searchTitle').value;
  const book = library.find(book => book.title.toLowerCase() === searchTitle.toLowerCase());

  const result = document.getElementById('searchResult');
  if (book) {
    result.textContent = `${book.title} by ${book.author} (Copies: ${book.copies})`;
  } else {
    result.textContent = 'Book not found.';
  }
});

// Delete Book
document.getElementById('deleteBookForm').addEventListener('submit', event => {
  event.preventDefault();
  const deleteTitle = document.getElementById('deleteTitle').value;
  const bookIndex = library.findIndex(book => book.title.toLowerCase() === deleteTitle.toLowerCase());

  if (bookIndex !== -1) {
    library.splice(bookIndex, 1);
    alert(`Book '${deleteTitle}' deleted.`);
    updateBookList();
  } else {
    alert('Book not found.');
  }
  document.getElementById('deleteBookForm').reset();
});