<template>
  <v-container grid-list-md mt-5>
    <v-layout row wrap>
      <v-flex md4 offset-md4 color="black">
        <v-container class="login-module grey darken-3">
          <img src="../assets/logo.png">
            <form>
            <v-text-field
              v-model="name"
              :counter="10"
              label="Username"
              required
            ></v-text-field>
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              required
            ></v-text-field>

            <v-btn @click="submit" type="submit" block class="login-button mt-5 red darken-4">Login</v-btn>
          </form>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  import axios from 'axios'

  export default {

    data: () => ({
      name: '',
      password: ''
    }),

    methods: {
      submit () {
        axios.post('http://localhost:8081/login', {
          username: this.username,
          password: this.password
        })
        .then(function(response){
          const status = 
          JSON.parse(response.data.response.status);
          if (status == '200') {
            // this.$router.push({ path: '/dashboard' });
             console.log("test complete");
          }
        });
      },
      clear () {
        this.name = ''
        this.email = ''
        this.select = null
        this.$validator.reset()
      }
    }
  }
</script>

<style lang="sass" scoped>
.login-module
  height: 30rem  !important
  img
    width: 20vw
  .login-button
    width: 100rem important
</style>
