<template>
  <nav :id="id" class="nav-extended">

    <div class="nav-wrapper">
      <a href="/" class="brand-logo center">
        <img src="/icons/favicon-32x32.png" alt="Logo" height="26"/>
        Easy DNS
      </a>
    </div>

    <div class="nav-content">
      <ul class="tabs tabs-transparent">
        <li class="tab">
          <a @click="tabClick('domains', $event)" href="#" class="active" title="domains">
            <i class="material-icons">playlist_add</i>
            <span class="hide-on-med-and-down">Domains</span>
          </a>
        </li>
        <li class="tab">
          <a @click="tabClick('how-it-works', $event)" href="#" title="How it works?">
            <i class="material-icons">info</i>
            <span class="hide-on-med-and-down">How it works?</span>
          </a>
        </li>
      </ul>
    </div>

  </nav>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: ''
    }
  },
  created() {
    this.initTabs();
  },
  methods: {
    initTabs() {
      let tabs = document.querySelector(`#${this.id} .tabs`);
      if (!tabs) {
        setTimeout(this.initTabs, 200);
        return;
      }
      M.Tabs.init(tabs);
    },
    tabClick(tab, e) {
      e.preventDefault();
      this.$emit('tab', tab);
    }
  }
}
</script>