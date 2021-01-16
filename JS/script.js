//Get the UI element
let form = document.querySelector('#book-form');
let booklist = document.querySelector('#book-list');





// book class declare

class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//ui class, book list show in ui in a table
class UI {

    static addToBooklist(book) {
        let list = document.querySelector('#book-list')
        let row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td> <a href="#" class="delete" style="color:red">X</a> </td>
        `
        list.appendChild(row)
        // console.log(row)
    }

    static clearFields() {
        document.querySelector("#title").value = '';
        document.querySelector("#author").value = '';
        document.querySelector("#isbn").value = '';
    }

    static showAlert(message, className) {
        let div = document.createElement('div');
        div.className = `alert ${className}`;
        div.appendChild(document.createTextNode(message));
        let container = document.querySelector('.container');
        let form = document.querySelector('#book-form');
        container.insertBefore(div, form);

        setTimeout(() => {
            document.querySelector(".alert").remove()
        }, 2000)
    }

    static deleteFromBook(target) {
        if (target.hasAttribute('href')) {
            target.parentElement.parentElement.remove();
            Store.removeBook(target.parentElement.previousElementSibling.textContent.trim())

            // Store.removeBook(target.)

            UI.showAlert('Book Removed successfully!', 'success')
        }
    }
}


/// local storage class
class Store {
    static getBooks() {
        let books;
        if (localStorage.getItem('books') === null) {
            books = [];
        } else {
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books
    }

    static addBook(book) {
        let books = Store.getBooks();
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books))
    }

    static displayBooks() {
        let books = Store.getBooks();

        books.map(book => {
            UI.addToBooklist(book);

        })
    }

    static removeBook(isbn) {
        let books = Store.getBooks();

        books.map((book, index) => {
            if (book.isbn === isbn) {
                books.splice(index, 1)
            }
        })

        localStorage.setItem('books', JSON.stringify(books))
    }
}




// add event listener
form.addEventListener('submit', newBook);
booklist.addEventListener('click', removeBook);
document.addEventListener('DOMContentLoaded', Store.displayBooks())



//define function

function newBook(e) {
    let title = document.querySelector("#title").value;
    let author = document.querySelector("#author").value;
    let isbn = document.querySelector("#isbn").value;



    if (title === '' || author === '' || isbn === '') {
        UI.showAlert("Please fill all the fields!", "error")

    } else {
        let book = new Book(title, author, isbn);


        UI.addToBooklist(book);

        UI.clearFields();

        UI.showAlert("Book added successfully!", "success");

        Store.addBook(book);

    }



    e.preventDefault()
}

function removeBook(e) {


    UI.deleteFromBook(e.target);

    e.preventDefault();
}