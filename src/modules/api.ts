const baseURL = "https://fe24-js2-mp3-backend-adrian-tayeh.onrender.com/books";

export type Book = {
  id: string;
  title: string;
  writer: string;
  read: boolean;
  review?: "liked" | "disliked";
};

export const fetchBooks = async (): Promise<Book[]> => {
  const response = await fetch(baseURL);
  return response.json();
};

export const markAsRead = async (id: string): Promise<void> => {
  await fetch(`${baseURL}/${id}/read`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ read: true })
  });
};

export const addReview = async (id: string, review: "liked" | "disliked"): Promise<void> => {
  await fetch(`${baseURL}/${id}/review`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ review })
  });
};

export const deleteBook = async (id: string): Promise<void> => {
  await fetch(`${baseURL}/${id}`, {
    method: "DELETE"
  });
};

export const addBook = async (title: string, writer: string): Promise<void> => {
  await fetch(baseURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({ title, writer })
  });
};