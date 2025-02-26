import { Book, markAsRead, addReview, deleteBook, fetchBooks } from "./api";

const bookList = document.getElementById("book-list") as HTMLUListElement;
const bookTemplate = document.getElementById("book-template") as HTMLLIElement;

export const displayBooks = (books: Book[]) => {
  bookList.innerHTML = "";
  books.forEach(book => {
    const li = createBookListItem(book);
    bookList.appendChild(li);
  });
};

const createBookListItem = (book: Book): HTMLLIElement => {
  const li = bookTemplate.cloneNode(true) as HTMLLIElement;
  li.id = book.id;
  li.classList.remove("hidden");

  const titleElement = li.querySelector(".book-title") as HTMLElement;
  const writerElement = li.querySelector(".book-writer") as HTMLElement;
  const statusElement = li.querySelector(".book-status") as HTMLElement;
  const reviewElement = li.querySelector(".book-review") as HTMLElement;
  const markAsReadButton = li.querySelector(".mark-as-read") as HTMLButtonElement;
  const likeButton = li.querySelector(".like") as HTMLButtonElement;
  const dislikeButton = li.querySelector(".dislike") as HTMLButtonElement;
  const deleteButton = li.querySelector(".delete") as HTMLButtonElement;

  titleElement.textContent = book.title;
  writerElement.textContent = `Author: ${book.writer}`;
  statusElement.textContent = `Status: ${book.read ? "Read" : "Unread"}`;
  statusElement.className = `book-status ${book.read ? "read" : "unread"}`;

  if (book.read) {
    reviewElement.textContent = `Review: ${book.review || "No review"}`;
    reviewElement.className = `book-review ${book.review || ""}`;
    if (book.review === "disliked") {
      deleteButton.classList.remove("hidden");
      deleteButton.addEventListener("click", async () => {
        await deleteBook(book.id);
        await refreshBooks();
      });
    }
  } else {
    markAsReadButton.classList.remove("hidden");
    markAsReadButton.addEventListener("click", async () => {
      await markAsRead(book.id);
      await refreshBooks();
    });
  }

  if (book.read && !book.review) {
    likeButton.classList.remove("hidden");
    likeButton.addEventListener("click", async () => {
      await addReview(book.id, "liked");
      await refreshBooks();
    });

    dislikeButton.classList.remove("hidden");
    dislikeButton.addEventListener("click", async () => {
      await addReview(book.id, "disliked");
      await refreshBooks();
    });
  }

  return li;
};

export const refreshBooks = async () => {
  const books = await fetchBooks();
  displayBooks(books);
};