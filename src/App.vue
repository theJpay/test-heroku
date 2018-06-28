<template>
  <div id="app" class="container">

    <h3>Ma todo list :</h3>

    <div class="form-input">
      <form v-on:submit.prevent="sub">
        <div class="row form-group">
          <label class="col-lg-3 lbl" for="newToDo">Nouvelle chose à faire :</label>
          <input type="text" class="col-lg-9 form-control" id="newToDo" placeholder="Ecrire une tache à effectuer..." v-model="newEl">
        </div>
        <div class="row form-group">
          <span class="lbl col-lg-3">Importance :</span>
          <div class="form-check col-lg-3">
            <input class="form-check-input" type="radio" name="importance" id="exampleRadios1" value="faible" v-model="importance">
            <label class="form-check-label" for="exampleRadios1">
              Faible
            </label>
          </div>
          <div class="form-check col-lg-3">
            <input class="form-check-input" type="radio" name="importance" id="exampleRadios2" value="moyenne" v-model="importance">
            <label class="form-check-label" for="exampleRadios2">
              Moyenne
            </label>
          </div>
          <div class="form-check col-lg-3">
            <input class="form-check-input" type="radio" name="importance" id="exampleRadios3" value="elevee" v-model="importance">
            <label class="form-check-label" for="exampleRadios3">
              Elevée
            </label>
          </div>
        </div>
        <div class="text-right">
          <button type="submit" class="btn btn-outline-secondary">Envoyer</button>
        </div>
      </form>
    </div>

    <div class="main-list">
      <ul class="list-group">
        <li v-for="(el, index) in list" v-bind:key="el._id" class="list-group-item" v-bind:class="[el.importance]">
          <div class="container">
            <div class="row">
              <div class="col-12 col-md-10 col-lg-11 text-left px-0">
                <template v-if="index != onEdit">{{ el.text }}</template>
                <input v-if="index == onEdit" type="text" class="edit-text form-control" v-model="editEl" v-on:keypress.enter="edit(index)">
              </div>
              <div class="col-12 col-md-2 col-lg-1 text-center">
                <div class="row">
                  <i class="edit col-6 far fa-edit" v-on:click="edit(index)"></i>
                  <i class="cross col-6 fas fa-times-circle" v-on:click="del(index)"></i>
                </div>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
export default {
  name: "app",
  components: {},
  data: () => {
    return {
      list: [],
      backurl: process.env.VUE_APP_BACK_URL || "https://todo-vuejs.herokuapp.com/",
      newEl: "",
      importance: "moyenne",
      onEdit: -1,
      editEl: ""
    };
  },
  beforeMount() {
    this.fetchToDos();
  },
  methods: {
    fetchToDos: function() {
      let uri = this.backurl + 'todos';
      this.axios.get(uri).then(response => {
        this.list = response.data;
      });
    },
    sub: function() {
      if (this.newEl.length > 0) {
        let imp = "";
        if (this.importance == "faible") {
          imp = "list-group-item-light";
        }
        if (this.importance == "elevee") {
          imp = "list-group-item-primary";
        }
        let newEntry = {
          text: this.newEl,
          importance: imp
        };
        let uri = this.backurl + "todos/add";
        this.axios
          .post(uri, {
            text: this.newEl,
            importance: imp
          })
          .then(res => {
            newEntry._id = res.data.newid;
            this.list.push(newEntry);
          });
        this.newEl = "";
        this.importance = "moyenne";
      }
    },
    del: function(i) {
      const id = this.list[i]._id;
      let uri = this.backurl + "todos/del/" + id;
      this.axios.get(uri);
      this.list.splice(i, 1);
    },
    edit: function(i) {
      if (this.onEdit != i) {
        this.editEl = this.list[i].text;
        this.onEdit = i;
      } else {
        this.list[i].text = this.editEl;
        const id = this.list[i]._id;
        let uri = this.backurl  + "todos/update/" + id;
        this.axios.post(uri, this.list[i]).then(() => {
          this.onEdit = -1;
        });
      }
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 5px;
}

.form-input {
  margin-top: 20px;
}

.lbl {
  margin-top: 5px;
}

.cross {
  color: red;
  cursor: pointer;
  margin-top: 5px;
}

.edit {
  color: green;
  cursor: pointer;
  margin-top: 5px;
}

.edit-text {
  width: 90%;
}

.main-list {
  margin-top: 25px;
}
</style>