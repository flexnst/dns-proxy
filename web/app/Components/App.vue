<template>
  <div>
    <div v-if="loaded">
      <Header class="hide-on-large-only" :ip="config.client_ip" :tabs="tabs" :current-tab="currentTab"
              @select="tabChange"/>
      <div class="container">
        <Header class="hide-on-med-and-down" :ip="config.client_ip" :tabs="tabs" :current-tab="currentTab"
                @select="tabChange"/>

        <div v-show="currentTab.name === 'domain-list'">
          <domain-list :ip="config.client_ip" :domains="config.domains" @edit="edit"/>
          <div class="fixed-action-btn">
            <a class="btn-floating btn-large red" @click="add()">
              <i class="large material-icons">add</i>
            </a>
          </div>
        </div>

        <div v-if="currentTab.name === 'domain-add'">
          <domain-edit :add="true" @back="showList"/>
        </div>

        <div v-if="currentTab.name === 'domain-edit'">
          <domain-edit :domain="domain" @back="showList"/>
        </div>

        <div v-if="currentTab.name === 'how-it-works'">
          <Info :config="config"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "./Header";
import DomainList from "./Domains/DomainList";
import DomainEdit from "./Domains/DomainEdit";
import Info from "./Info";

export default {
  name: 'app',
  components: {Header, DomainList, DomainEdit, Info},
  data() {
    return {
      loaded: false,
      config: {
        server_ip: null,
        client_ip: null,
        domains: []
      },
      domain: {},
      tab: 'domain-list',
      tabs: [
        {title: 'Domains', name: 'domain-list', icon: 'playlist_add', show: true},
        {title: 'How it works', name: 'how-it-works', icon: 'info', show: true},
        {title: 'Add Domain', name: 'domain-add', show: false},
        {title: 'Edit Domain', name: 'domain-edit', show: false},
      ]
    }
  },
  created() {
    this.loadConfig();
    M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'));
  },
  computed: {
    currentTab() {
      return this.tabs.filter((tab) => {
        return tab.name === this.tab;
      })[0] || null;
    }
  },
  methods: {
    loadConfig() {
      http.get('/config')
          .then((res) => {
            this.loaded = true;
            this.$set(this, 'config', res.data)
          });
    },
    add() {
      this.tab = 'domain-add';
    },
    showList() {
      this.tab = 'domain-list';
      this.loadConfig();
    },
    edit(domain) {
      this.tab = 'domain-edit';
      this.domain = domain;
    },
    tabChange(tab) {
      this.tab = tab;
    }
  }
}
</script>

<style scoped>

</style>