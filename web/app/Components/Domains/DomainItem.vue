<template>
  <div class="card" @click="edit(domain)">
    <div class="card-content">
      <span class="card-title">
        <i class="material-icons left">language</i>
        {{ domain.name }}
      </span>
      <p>
        <i class="material-icons left">subdirectory_arrow_right</i>
        {{ domain.ip }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data() {
      return {
        saved: false
      }
    },
    domain: {
      type: Object,
      default: {
        name: '',
        ip: ''
      }
    }
  },
  methods: {
    edit(domain) {
      this.$emit('edit', domain);
    }
  }
}
</script>
