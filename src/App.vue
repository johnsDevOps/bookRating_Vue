<template>
  <div id="app">
    <div class="header">
      <span class="brand">Vue Library</span>
      <span class="add-new-book-button">
        <a href="#" @click="openNewBookModal">Add a book</a>
      </span>
      <div class="books-count" title="Your Bookings">{{ userBooksCount }}</div>
    </div>
    <div class="container">
      <NewBook
        v-show="showNewBookModal"
        @send-new-book="addNewBook"
        @close-book-modal="closeNewBookModal"
      />
      <Book v-for="(book, index) in currentBooks" :book="book" :key="index"></Book>
    </div>
  </div>
</template>

<script>
import Book from "./components/Book";
import NewBook from "./components/NewBook";

export default {
  name: "App",
  components: { NewBook, Book },
  data() {
    return {
      currentBooks: [
        {
          name: "Harry Potter",
          overview: "qwertyuiop",
          volumes: [
            { name: "First edition" },
            { name: "Second edition" },
            { name: "Third edition" },
            { name: "Fourth edition" },
            { name: "Fifth edition" },
            { name: "Sixth edition" },
            { name: "Seven edition" },
            { name: "Eight edition" }
          ]
        }
      ],
      showNewBookModal: false
    };
  },
  methods: {
    openNewBookModal() {
      this.showNewBookModal = true;
    },
    closeNewBookModal() {
      this.showNewBookModal = false;
    },
    addNewBook(newBookDetails) {
      if (this.isUniqueBook(newBookDetails)) {
        this.currentBooks.push(newBookDetails);
        alert("Book added successfully.");
      } else alert("Book name/overview already exists.");
    },
    isUniqueBook(newBookDetails) {
      for (var i = 0; i < this.currentBooks.length; i++) {
        if (
          this.currentBooks[i].name.toUpperCase() ==
            newBookDetails.name.toUpperCase() ||
          this.currentBooks[i].overview.toUpperCase() ==
            newBookDetails.overview.toUpperCase()
        )
          return false;
      }
      return true;
    }
  },
  computed: {
    userBooksCount() {
      return this.currentBooks.length;
    }
  }
};
</script>

<style>
body {
  margin: 0px;
}

.header {
  padding: 10px;
  background: linear-gradient(to right, #b5f595, #defccf);
}

.books-count {
  width: 25%;
  float: right;
  text-align: right;
  padding-right: 2%;
  padding-top: 0.8%;
}

.brand {
  font-weight: bold;
  font-size: 1.8em;
}

.container {
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
}

.add-new-book-button {
  padding-left: 15px;
}
</style>
