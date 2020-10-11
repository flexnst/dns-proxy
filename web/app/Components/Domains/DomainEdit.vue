<template>
  <div class="card">
    <div class="card-content">
      <span class="card-title" v-if="add">New domain</span>
      <span class="card-title" v-else>Edit domain</span>
      <form class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <input placeholder="example.local.dev" id="name" type="text" class="validate" v-model="editDomain.name">
            <label for="name" class="active">Domain name</label>
          </div>
        </div>
        <div class="row">
          <div class="input-field col s12">
            <input placeholder="192.168.0.0" id="ip" type="text" class="validate" v-model="editDomain.ip">
            <label for="ip" class="active">Target IP address</label>
          </div>
        </div>
      </form>
    </div>

    <div class="card-action hide-on-med-and-down">
      <span class="waves-effect waves-light btn green" @click="save()">
        <i class="material-icons left">check_circle</i>
        Save
      </span>
      <span v-if="!add" class="waves-effect waves-light btn red" @click="remove()">
        <i class="material-icons left">delete_forever</i>
        Remove
      </span>
      <span class="waves-effect waves-light black-text btn white right" @click="cancel()">
        <i class="material-icons left">arrow_back</i>
        Cancel
      </span>
    </div>

    <div class="card-action hide-on-large-only">
      <span class="waves-effect waves-light btn green" style="width: 100px" @click="save()">
        <i class="material-icons center">check_circle</i>
      </span>
      <span v-if="!add" class="waves-effect waves-light btn red" @click="remove()">
        <i class="material-icons center">delete_forever</i>
      </span>
      <span class="waves-effect waves-light black-text btn white right" @click="cancel()">
        <i class="material-icons center">arrow_back</i>
      </span>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    add: {
      type: Boolean,
      default: false
    },
    domain: {
      type: Object,
      default: () => {
        return {
          old_name: undefined,
          name: '',
          ip: ''
        }
      }
    }
  },
  data() {
    return {
      editDomain: {
        name: '',
        ip: ''
      }
    };
  },
  created() {
    this.editDomain.name = this.domain.name;
    this.editDomain.ip = this.domain.ip;
  },
  methods: {
    save() {
      http.post('/save', {
        old_name: this.domain.name,
        name: this.editDomain.name,
        ip: this.editDomain.ip
      })
          .then((res) => {
            this.$emit('back', res);
          })
          .catch((err) => {
            console.error(err);
          })
    },
    remove() {
      http.post('/delete', this.domain)
          .then((res) => {
            this.$emit('back', res);
          })
          .catch((err) => {
            console.error(err);
          })
    },
    cancel() {
      this.$emit('back');
    }
  }
}
</script>