<template>
  <div>
    <h5>Domains for your device</h5>
    <p class="grey-text">
      Domains provided for this IP address ( {{ ip }} )
    </p>

    <domain-item v-for="(domain, i) in domains" :key="i" :domain="domain" @edit="edit"/>
    <div v-if="domains.length === 0">
      <h6>Domains not found</h6>
      <p class="grey-text">Click button at bottom left for add new domain.</p>
    </div>
  </div>
</template>

<script>
import DomainItem from "./DomainItem";

export default {
  components: {DomainItem},
  props: {
    ip: {
      type: String,
      default: ''
    },
    domains: {
      type: Array,
      default: []
    }
  },
  methods: {
    edit(domain) {
      this.$emit('edit', domain);
    }
  }
}
</script>