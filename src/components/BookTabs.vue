<template>
  <div class="book-tabs">
    <div class="show-hide">
      <a href="#" @click="feedbackSection(true)" v-if="!showTab">Show Ratings</a>
      <a href="#" @click="feedbackSection(false)" v-else>Hide Ratings</a>
    </div>
    <div class="tab-section" v-show="showTab">
      <span
        class="tab"
        v-for="(tab,index) in tabs"
        :key="index"
        :class="{ 'active-tab': chosenTab == tab }"
        @click="chosenTab = tab"
      >{{ tab }}</span>
      <hr />
      <div class="tab-content">
        <div v-if="chosenTab == 'View Ratings'">
          <span v-if="ratings.length == 0">There are no ratings yet...</span>
          <ul v-else>
            <li v-for="rating in ratings">{{ rating.name }}: {{ rating.rate }}/5</li>
          </ul>
        </div>
        <div v-if="chosenTab == 'Give Rating'">
          <BookReview @send-rating="getRating"></BookReview>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import BookReview from "./BookReview";

export default {
  name: "BookTabs",
  components: { BookReview },
  data() {
    return {
      showTab: false,
      tabs: ["View Ratings", "Give Rating"],
      chosenTab: "View Ratings",
      ratings: []
    };
  },
  methods: {
    feedbackSection(shouldOpen) {
      this.showTab = shouldOpen;
    },
    getRating(new_rating) {
      this.ratings.push(new_rating);
      let avgRating = 0;
      for (var i = this.ratings.length - 1; i >= 0; i--) {
        avgRating += this.ratings[i].rate;
      }
      this.$emit("get-avg-rating", avgRating / this.ratings.length);
    }
  }
};
</script>

<style>
.tab-section {
  margin-top: 15px;
}

.tab {
  padding: 5px 5px;
  cursor: pointer;
  color: mediumblue;
}

.active-tab {
  background: #6bfa77;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  cursor: default;
  color: black;
}

hr {
  margin: 4px 0px;
}
</style>