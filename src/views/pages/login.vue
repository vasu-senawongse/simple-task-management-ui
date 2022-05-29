<template>
  <div>
    <b-container>
      <b-row class="justify-content-center">
        <b-col md="6" cols="10" class="form-background">
          <form role="form" class="align-middle" @submit.prevent="onSubmit()">
            <div>
              <h2 class="text-center pt-3">
                WELCOME
              </h2>

              <b-input-group>
                <b-input-group-prepend style="height : 40px">
                  <span class="input-group-text"
                    ><i class="fa fa-user"></i
                  ></span>
                </b-input-group-prepend>
                <b-form-input
                  alternative
                  class="mb-3"
                  placeholder="Username / Email"
                  v-model="username"
                  id="tooltip-userName"
                  style="height : 40px"
                >
                </b-form-input>
              </b-input-group>

              <b-input-group>
                <b-input-group-prepend style="height : 40px">
                  <span class="input-group-text"
                    ><i class="fa fa-lock"></i
                  ></span>
                </b-input-group-prepend>
                <b-form-input
                  alternative
                  type="password"
                  placeholder="Password"
                  addon-left-icon="ni ni-lock-circle-open"
                  v-model="password"
                  style="height : 40px"
                >
                </b-form-input>
              </b-input-group>

              <div class="text-center">
                <b-button
                  variant="success"
                  class="my-4"
                  type="submit"
                  :disabled="!username || !password"
                  >SIGN IN</b-button
                >
              </div>

              <div>
                <a href="/register" class="text-right" style="float:right">
                  <span style="color : blue">Create Account</span>
                </a>
              </div>
            </div>
          </form>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>
<script>
import api from "@/services/api.js";
import draggable from "vuedraggable";
export default {
  components: {
    draggable,
  },
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async onSubmit() {
      const payload = {
        username: this.username,
        password: this.password,
      };
      api
        .post(`auth/signin`, payload)
        .then((response) => {
          this.result = response.data;
          if (this.result.name) {
            localStorage.setItem("user", this.result.name);
            this.$router.push({ name: "index" });
          }
        })
        .catch((err) => {
          if (err.response.status === 401);
          this.$swal(err.response.data, "", "error");
        });
    },
  },
};
</script>
