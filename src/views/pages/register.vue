<template>
  <div>
    <b-container>
      <b-row class="justify-content-center">
        <b-col md="6" cols="10" class="form-background">
          <form role="form" class="align-middle" @submit.prevent="onSubmit()">
            <div>
              <h2 class="text-center pt-3">
                REGISTER
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
                  placeholder="Username"
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
                  class="mb-3"
                  addon-left-icon="ni ni-lock-circle-open"
                  v-model="password"
                  style="height : 40px"
                >
                </b-form-input>
              </b-input-group>

              <b-input-group>
                <b-input-group-prepend style="height : 40px">
                  <span class="input-group-text"
                    ><i class="fa fa-user"></i
                  ></span>
                </b-input-group-prepend>
                <b-form-input
                  alternative
                  class="mb-3"
                  placeholder="Full Name"
                  v-model="name"
                  id="tooltip-fullname"
                  style="height : 40px"
                >
                </b-form-input>
              </b-input-group>

              <div class="text-center">
                <b-button
                  variant="success"
                  class="my-4"
                  type="submit"
                  :disabled="!username || !password || !name"
                  >Register</b-button
                >
              </div>

              <div>
                <a href="/login" class="text-right" style="float:right">
                  <span style="color : blue">login</span>
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
export default {
  data() {
    return {
      username: "",
      password: "",
      name: "",
    };
  },
  methods: {
    async onSubmit() {
      const payload = {
        username: this.username,
        password: this.password,
        name: this.name,
      };
      await api.post(`auth/signup`, payload);
    },
  },
};
</script>
