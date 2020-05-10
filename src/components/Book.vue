<template>
  <div class="book">
    <div class="book-title" :title="book.overview">{{ book.name }}</div>
    <div class="volumes">
      Volumes:
      <ul>
        <li v-for="(volume,index) in book.volumes" :key="index">{{ volume.name }}</li>
      </ul>
    </div>
    <div class="bottom-bar">
      <div>Rating: {{ getAvgRating }}</div>
      <BookTabs @get-avg-rating="updateAvgRating"></BookTabs>
    </div>
  </div>
</template>

<script>
import BookTabs from "./BookTabs";

export default {
  name: "Book",
  components: { BookTabs },
  data() {
    return {
      id: 1,
      avgRating: "NA",
      feedbackOpen: false
    };
  },
  props: {
    book: {
      type: Object,
      required: true,
      default: {
        name: "Harry Potter",
        overview: "qwertyuiop",
        volumes: [
          { name: "First edition" },
          { name: "Second edition" },
          { name: "Third edition" },
          { name: "Fourth edition" },
          { name: "Fifth edition" },
          { name: "Sixth edition" },
          { name: "Seven edition" }
        ]
      }
    }
  },
  methods: {
    feedbackSection(shouldOpen) {
      this.feedbackOpen = shouldOpen;
    },
    updateAvgRating(avg_rating) {
      this.avgRating = avg_rating;
    }
  },
  computed: {
    getAvgRating() {
      if (typeof this.avgRating == "number") {
        return this.avgRating + "/5";
      } else {
        return this.avgRating;
      }
    }
  }
};
</script>

<style>
.book {
  margin: 10px;
  border: green 1px solid;
  padding: 10px;
  border-radius: 10px;
  min-width: 180px;
}

.book-title {
  text-align: center;
  font-size: 1.5em;
  background: #8ade9d;
  border-radius: 5px;
}

.book-tabs {
  margin-top: 5px;
}

.volumes {
  margin: 10px 0px;
  font-size: 0.9em;
}
</style>
