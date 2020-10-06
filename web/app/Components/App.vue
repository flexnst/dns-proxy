<template>
  <div>
    <div class="container">
      <div v-if="loading">
        Loading...
      </div>
      <div v-if="loading===null">
        Error...
      </div>
      <div v-else>
        <h2>DNS Proxy</h2>
        <p>
          Add DNS ip firstly to your network connection: <b>{{ config.server_ip }}</b>
        </p>
        <h4>Your ip: {{ config.client_ip }} </h4>

        <table v-if="config.domains.length" border="0" cellpadding="5" cellspacing="0" width="100%">
          <thead>
          <tr>
            <th align="left">Domain</th>
            <th align="left">Target IP</th>
            <th align="left"></th>
          </tr>
          </thead>
          <tbody>
            <tr v-for="(domain, i) in config.domains">
              <td>
                <input type="text" :name="'domains['+i+'][name]'" minlength="3" maxlength="64" v-model="config.domains[i].name" placeholder="example.local.dev"/>
              </td>
              <td>
                <input type="text" :name="'domains['+i+'][ip]'" minlength="7" maxlength="15" v-model="config.domains[i].ip" placeholder="192.168.0.101"/>
              </td>
              <td>
                <button type="button" v-if="config.domains.length" @click="remove(i)">Remove</button>
              </td>
            </tr>
          </tbody>
        </table>

        <button type="button" @click="add()">Add domain</button>
        <button type="button" @click="save()">Save changes</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'app',
  data() {
    return {
      loading: true,
      config: {
        server_ip: null,
        client_ip: null,
        domains: []
      }
    }
  },
  created() {
    http.get('/config')
      .then((res)=>{
         this.loading = false;
         this.$set(this, 'config', res.data)
      })
      .catch((err) => {
          this.loading = null;
      })
  },
  methods: {
    add(){
      this.config.domains.push({
        name: '',
        ip: '',
      });
    },
    remove(i){
      this.config.domains.splice(i, 1);
    },
    save(){
      // const data = new FormData();
      // this.config.domains.forEach((domain, i)=>{
      //   data.append(`name[${i}]`, domain);
      //   data.append(`ip[${i}]`, domain);
      // });

      http.post('/save', this.config.domains)
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.error(err);
        })
    }
  }
}
</script>

<style scoped>

</style>