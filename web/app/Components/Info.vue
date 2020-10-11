<template>
  <div>

    <div class="card">
      <div class="card-content">
        <span class="card-title">How it works?</span>
        <p>This service creates its own DNS server that is able to serve devices personally, identifying them by the IP
          address. Each device has its own domain and IP address mapping list.</p>
      </div>
    </div>

    <div class="card">
      <div class="card-content">
        <span class="card-title">How to use?</span>
        <p>
          On your device, in the network settings, you must add a DNS server with the IP address
          <b><i>{{ config.server_ip }}</i></b>
          and open in browser link <a :href="`http://${config.server_ip}/`">http://{{ config.server_ip }}/</a> for
          create your domains.
        </p>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    config: {
      type: Object,
      required: true
    }
  }
}
</script>