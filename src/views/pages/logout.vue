<template> <div></div></template>
<script>
export default {
  name: "auth.logout",
  data() {
    return {};
  },
  mounted() {
    localStorage.removeItem("user");
    this.$router.push({ name: "login" });
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
img {
  border-radius: 50%;
}
</style>
