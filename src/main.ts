import { addBook, fetchBooks } from "./modules/api.ts";
import { displayBooks, refreshBooks } from "./modules/GUI.ts";

const addBookForm = document.getElementById("add-book-form") as HTMLFormElement;

addBookForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const title = (document.getElementById("title") as HTMLInputElement).value;
  const writer = (document.getElementById("writer") as HTMLInputElement).value;
  await addBook(title, writer);
  addBookForm.reset();
  await refreshBooks();
});

fetchBooks().then(displayBooks);