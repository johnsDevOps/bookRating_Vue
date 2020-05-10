<template>
  <div class="main-modal">
    <div class="new-book-modal">
      <div class="modal-header">
        <span class="heading-text">Add a new book</span>
        <span class="close-modal" @click="closeModal">&times;</span>
      </div>

      <form @submit.prevent="onSubmit">
        <div class="modal-body">
          <div class="error-section" v-show="errorState">
            <p>There were few errors while processing your input...</p>
            <ul class="error-list">
              <li v-show="name == null">Please provide a name</li>
              <li v-show="overview == null">Please provide the overview</li>
              <li v-show="volumes == null">Please provide the volumes</li>
            </ul>
          </div>

          <div class="book-input-section">
            <label for="name">Name</label>
            <br />
            <input type="text" v-model="name" placeholder="Book name..." />
          </div>

          <div class="book-input-section">
            <label for="overview">Overview</label>
            <br />
            <input type="text" v-model="overview" placeholder="Book overview..." />
          </div>

          <div class="book-input-section">
            <label for="volumes">Volumes</label>
            &nbsp;&nbsp;&nbsp;
            <button @click="addVolumeField" title="Add new volume">+</button>
            <br />
            <div v-for="(volume, index) in volumes">
              <input type="text" v-model="volume.name" placeholder="Volume name..." />
              <button
                @click="removeVolumeField(index)"
                v-show="canRemoveVolume"
                title="Remove this volume"
              >-</button>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <div>
            <input type="reset" value="Reset fields" @click="resetAllFields" />
            <input class="new-book-submit" type="submit" value="Add book" @click="onSubmit" />
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewBook",
  data() {
    return {
      name: "",
      overview: "",
      volumes: [{ name: "" }],
      errorState: false
    };
  },
  methods: {
    addVolumeField() {
      this.volumes.push({ name: "" });
    },
    removeVolumeField(volumeIndex) {
      if (volumeIndex >= 0) this.volumes.splice(volumeIndex, 1);
    },
    checkNameErr() {
      return (
        this.name == null || !(this.name.length >= 1 && this.name.length <= 30)
      );
    },
    checkOverviewErr() {
      return (
        this.overview == null ||
        !(this.overview.length >= 10 && this.overview.length <= 100)
      );
    },
    checkVolumesErr() {
      let i = 0;
      while (i < this.volumes.length) {
        if (
          this.volumes[i].name == null ||
          !(
            this.volumes[i].name.length >= 1 &&
            this.volumes[i].name.length <= 30
          )
        )
          return true;
        i++;
      }
      return false;
    },
    onSubmit() {
      this.errorState =
        this.checkNameErr() ||
        this.checkOverviewErr() ||
        this.checkVolumesErr();
      if (!this.errorState) {
        let bookDetails = {
          name: this.name,
          overview: this.overview,
          volumes: []
        };
        for (var i = 0; i < this.volumes.length; i++) {
          bookDetails.volumes.push({ name: this.volumes[i].name });
        }
        this.$emit("send-new-book", bookDetails);
        this.closeModal();
      }
    },
    preventSubmit() {
      return false;
    },
    resetAllFields() {
      this.name = "";
      this.overview = "";
      this.volumes = [{ name: "" }];
    },
    closeModal() {
      this.resetAllFields();
      this.$emit("close-book-modal");
    }
  },
  computed: {
    canRemoveVolume() {
      return this.volumes.length > 1;
    },
    showNameErr() {
      return (
        this.name == null || !(this.name.length >= 1 && this.name.length <= 30)
      );
    },
    showOverviewErr() {
      return (
        this.overview == null ||
        !(this.overview.length >= 10 && this.overview.length <= 100)
      );
    },
    showVolumesErr() {
      let i = 0;
      while (i < this.volumes.length) {
        if (
          this.volumes[i].name == null ||
          !(
            this.volumes[i].name.length >= 1 &&
            this.volumes[i].name.length <= 30
          )
        )
          return true;
        i++;
      }
      return false;
    }
  }
};
</script>

<style>
.main-modal {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
}

.new-book-modal {
  width: 350px;
  position: fixed;
  background: white;
  padding: 10px;
  border-radius: 10px;
  border: darkgray 1px solid;
  box-shadow: black 10px 10px 15px 8px;
  top: 25%;
  left: 30%;
}

.close-modal {
  cursor: pointer;
  font-size: 1.6em;
  float: right;
}

.heading-text {
  font-size: 1.8em;
  font-weight: bold;
}

.modal-header {
  margin-bottom: 10px;
  padding-bottom: 10px;
  border-bottom: darkgray 1px solid;
}

.book-input-section {
  padding: 5px 0px;
}

.book-input-section input {
  margin: 5px 0px;
}

.modal-footer {
  margin-top: 10px;
  padding-top: 10px;
  border-top: darkgray 1px solid;
}

.new-book-submit {
  float: right;
}

.error-section {
  border: red 1px solid;
  border-radius: 8px;
  padding: 0px 10px 17px 10px;
  background: rgba(255, 0, 0, 0.19);
  width: 327px;
}
</style>
