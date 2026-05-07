document.addEventListener('DOMContentLoaded', function () {
    let books = [];
    const RENDER_EVENT = 'render-book';
    const STORAGE_KEY = 'BOOKSHELF_APP';

    const bookForm = document.getElementById('bookForm');
    const incompleteBookList = document.getElementById('incompleteBookList');
    const completeBookList = document.getElementById('completeBookList');
    const bookFormIsComplete = document.getElementById('bookFormIsComplete');

    bookFormIsComplete.addEventListener('change', function () {
        const span = document.querySelector('#bookFormSubmit span');
        span.innerText = bookFormIsComplete.checked ? 'Selesai dibaca' : 'Belum selesai dibaca';
    });

    function isStorageExist() {
        if (typeof (Storage) === 'undefined') {
            alert('Browser kamu tidak mendukung local storage');
            return false;
        }
        return true;
    }

    function saveData() {
        if (isStorageExist()) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
        }
    }

    function loadDataFromStorage() {
        const serializedData = localStorage.getItem(STORAGE_KEY);
        let data = JSON.parse(serializedData);

        if (data !== null) {
            books = data;
        }
        document.dispatchEvent(new Event(RENDER_EVENT));
    }

    bookForm.addEventListener('submit', function (event) {
        event.preventDefault();

        const title = document.getElementById('bookFormTitle').value;
        const author = document.getElementById('bookFormAuthor').value;
        const year = parseInt(document.getElementById('bookFormYear').value);
        const isComplete = bookFormIsComplete.checked;

        const editingId = bookForm.getAttribute('data-editing');

        if (editingId) {
            const bookIndex = books.findIndex(book => book.id == editingId);
            books[bookIndex] = { ...books[bookIndex], title, author, year, isComplete };

            alert(`Berhasil memperbarui buku: ${title}`);
            bookForm.removeAttribute('data-editing');
        } else {
            const generatedID = +new Date();
            const bookObject = { id: generatedID, title, author, year, isComplete };
            books.push(bookObject);

            alert(`Berhasil menambahkan buku: ${title}`);
        }

        document.dispatchEvent(new Event(RENDER_EVENT));
        saveData();
        bookForm.reset();
        document.querySelector('#bookFormSubmit span').innerText = 'Belum selesai dibaca';
        document.getElementById('bookFormSubmit').innerText = 'Masukkan Buku ke rak Belum selesai dibaca';
    });

    document.addEventListener(RENDER_EVENT, function () {
        incompleteBookList.innerHTML = '';
        completeBookList.innerHTML = '';

        for (const bookItem of books) {
            const bookElement = makeBook(bookItem);
            if (!bookItem.isComplete) {
                incompleteBookList.append(bookElement);
            } else {
                completeBookList.append(bookElement);
            }
        }
    });

    function makeBook(bookObject) {
        const { id, title, author, year, isComplete } = bookObject;

        const container = document.createElement('div');
        container.setAttribute('data-bookid', id);
        container.setAttribute('data-testid', 'bookItem');

        container.innerHTML = `
            <h3 data-testid="bookItemTitle">${title}</h3>
            <p data-testid="bookItemAuthor">Penulis: ${author}</p>
            <p data-testid="bookItemYear">Tahun: ${year}</p>
        `;

        const actionContainer = document.createElement('div');

        const toggleButton = document.createElement('button');
        toggleButton.setAttribute('data-testid', 'bookItemIsCompleteButton');
        toggleButton.innerText = isComplete ? 'Belum selesai dibaca' : 'Selesai dibaca';
        toggleButton.addEventListener('click', function () {
            toggleBookStatus(id);
        });

        const deleteButton = document.createElement('button');
        deleteButton.setAttribute('data-testid', 'bookItemDeleteButton');
        deleteButton.innerText = 'Hapus Buku';
        deleteButton.addEventListener('click', function () {
            removeBook(id, title);
        });

        const editButton = document.createElement('button');
        editButton.setAttribute('data-testid', 'bookItemEditButton');
        editButton.innerText = 'Edit Buku';
        editButton.addEventListener('click', function () {
            editBook(id);
        });

        actionContainer.append(toggleButton, deleteButton, editButton);
        container.append(actionContainer);

        return container;
    }

    function toggleBookStatus(bookId) {
        const bookTarget = books.find(book => book.id === bookId);
        if (bookTarget == null) return;

        bookTarget.isComplete = !bookTarget.isComplete;
        const status = bookTarget.isComplete ? 'Selesai dibaca' : 'Belum selesai dibaca';

        alert(`Buku "${bookTarget.title}" dipindahkan ke rak: ${status}`);

        document.dispatchEvent(new Event(RENDER_EVENT));
        saveData();
    }

    function removeBook(bookId, title) {
        const confirmDelete = confirm(`Apakah Anda yakin ingin menghapus buku "${title}"?`);

        if (confirmDelete) {
            const bookIndex = books.findIndex(book => book.id === bookId);
            if (bookIndex === -1) return;

            books.splice(bookIndex, 1);
            alert(`Buku "${title}" telah dihapus.`);

            document.dispatchEvent(new Event(RENDER_EVENT));
            saveData();
        }
    }

    function editBook(bookId) {
        const bookTarget = books.find(book => book.id === bookId);
        if (bookTarget == null) return;

        document.getElementById('bookFormTitle').value = bookTarget.title;
        document.getElementById('bookFormAuthor').value = bookTarget.author;
        document.getElementById('bookFormYear').value = bookTarget.year;
        document.getElementById('bookFormIsComplete').checked = bookTarget.isComplete;

        bookForm.setAttribute('data-editing', bookId);

        const submitButton = document.getElementById('bookFormSubmit');
        submitButton.innerText = 'Simpan Perubahan Buku';

        window.scrollTo({ top: 0, behavior: 'smooth' });
        alert(`Silakan ubah data buku "${bookTarget.title}" pada form di atas.`);
    }

    const searchForm = document.getElementById('searchBook');
    searchForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const searchTitle = document.getElementById('searchBookTitle').value.toLowerCase();

        const filteredBooks = books.filter(book =>
            book.title.toLowerCase().includes(searchTitle)
        );

        renderFilteredBooks(filteredBooks);
    });

    function renderFilteredBooks(filteredBooks) {
        incompleteBookList.innerHTML = '';
        completeBookList.innerHTML = '';

        for (const bookItem of filteredBooks) {
            const bookElement = makeBook(bookItem);
            if (!bookItem.isComplete) {
                incompleteBookList.append(bookElement);
            } else {
                completeBookList.append(bookElement);
            }
        }
    }

    if (isStorageExist()) {
        loadDataFromStorage();
    }
});