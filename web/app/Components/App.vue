<template>
  <div>
    <div v-if="loaded">
      <Header id="mobile" class="hide-on-large-only" @tab="setTab"/>
      <div class="container">
        <Header id="desktop" class="hide-on-med-and-down" @tab="setTab"/>

        <div v-if="tab === 'domains'" class="col s12">
          <div v-show="view === 'domain-list'">
            <domain-list :ip="config.client_ip" :domains="config.domains" @edit="edit"/>
            <div class="fixed-action-btn">
              <a class="btn-floating btn-large red" @click="add()">
                <i class="large material-icons">add</i>
              </a>
            </div>
          </div>

          <div v-show="view === 'domain-add'">
            <domain-edit :add="true" @back="showList"/>
          </div>

          <div v-show="view === 'domain-edit'">
            <domain-edit :domain="domain" @back="showList"/>
          </div>
        </div>

        <div v-if="tab === 'how-it-works'" class="col s12">
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
      tab: 'domains',
      view: 'domain-list',
    }
  },
  mounted() {
    this.loadConfig();
    M.FloatingActionButton.init(document.querySelectorAll('.fixed-action-btn'));
  },
  computed: {
    activeView() {
      return this.views.filter((view) => {
        return view.name === this.view;
      })[0] || null;
    }
  },
  methods: {
    setTab(tab) {
      this.tab = tab;
    },
    loadConfig() {
      http.get('/config')
          .then((res) => {
            this.loaded = true;
            this.$set(this, 'config', res.data);
          });
    },
    add() {
      this.view = 'domain-add';
    },
    showList() {
      this.view = 'domain-list';
      this.loadConfig();
    },
    edit(domain) {
      this.view = 'domain-edit';
      this.domain = domain;
    },
    setView(view) {
      this.view = view;
    }
  }
}
</script>

<style scoped>

</style>