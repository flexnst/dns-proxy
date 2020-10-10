<template>
  <div>
    <h5>How it works?</h5>
    <p>This service creates its own DNS server that is able to serve devices personally, identifying them by the IP
      address. Each device has its own domain and IP address mapping list.</p>
    <h5>How to use?</h5>
    <p>
      On your device, in the network settings, you must add a DNS server with the IP address <i>{{
        config.server_ip
      }}</i>
    </p>
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