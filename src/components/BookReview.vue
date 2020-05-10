<template>
  <form @submit.prevent="onSubmit" class="review-form">
    <div class='error-section' v-show="errorState">
      <p>There were a few errors while submitting...</p>
      <ul class="error-list">


      </ul>
    </div>

    <div class="rate-input-section">
      <label for="name">Name:</label>
      <br>
      <input class="review-input" v-model="name" id="name" placeholder="Your name please..."></input>
    </div>

    <div class="rate-input-section">
      <label for="rate">Rating:</label>
      <br>
      <select class="review-select review-input" id="rate" v-model.number="rate">
        <option value='0' disabled selected>Please rate...</option>
        <option>5</option>
        <option>4</option>
        <option>3</option>
        <option>2</option>
        <option>1</option>
      </select>
    </div>

    <div class="rate-input-section submit">
      <input type="submit"></input>
    </div>
  </form>
</template>

<script>
export default {
  name: 'BookReview',
  data() {
    return {
      name: null,
      rate: 0,
      errorState: false
    };
  },
  methods: {
    onSubmit() {
      this.errorState = (this.name == null) || (this.rate == 0) || (this.rate == null);
      if(!this.errorState) {
        let rating = {
          name: this.name,
          rate: this.rate
        };
        this.$emit('send-rating', rating);
        this.name = null;
        this.rate = 0;
      }
    }
  }
}
</script>

<style>
.error-section {
  border: red 1px solid;
  border-radius: 8px;
  padding: 0px 10px 17px 10px;
  background: rgba(255, 0, 0, 0.19);
  width: 165px;
}

.rate-input-section {
  margin-top: 5px;
}
</style>