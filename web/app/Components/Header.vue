<template>
  <nav class="nav-extended">

    <div class="nav-wrapper">
      <a href="/" class="brand-logo">
        Easy DNS
      </a>
    </div>

    <div class="nav-content">
      <ul class="tabs tabs-transparent">
        <li class="tab" v-for="tab in tabs" v-if="tab.show">
          <a :href="`#${tab.name}`" @click="selectTab(tab.name, $event)"
             v-bind:class="{active: tab.name === currentTab.name}" :title="tab.title">
            <i class="material-icons">{{ tab.icon }}</i>
            <span class="hide-on-med-and-down">{{ tab.title }}</span>
          </a>
        </li>
      </ul>
    </div>

  </nav>
</template>

<script>
export default {
  name: "Header",
  props: {
    ip: {
      type: String,
      default: ''
    },
    tabs: {
      type: Array,
      default: []
    },
    currentTab: {
      type: Object,
      default: null
    }
  },
  methods: {
    selectTab(tabName, event) {
      // Disable link hash
      if (event) {
        event.preventDefault();
      }
      this.$emit('select', tabName);
    }
  }
}
</script>