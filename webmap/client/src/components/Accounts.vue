<template>
    <v-container mt-5>
        <v-layout row wrap>
            <v-flex md4 offset-md6>
                <v-container class="createAccounts grey darken-3">
                   <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                    v-model="fullname"
                    label="Name"
                    required
                    ></v-text-field>
                    <v-text-field
                    v-model="username"
                    :rules="usernameRules"
                    :counter="10"
                    label="Username"
                    required
                    ></v-text-field>
                    <v-select
                    v-model="position"
                    :items="items"
                    :rules="[v => !!v || 'Item is required']"
                    label="Position"
                    required
                    ></v-select>
                    <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="Email"
                    required
                    ></v-text-field>
                    <v-text-field
                    v-model="password"
                    label="Password"
                    type="password"
                    required
                    ></v-text-field>
                    <v-text-field
                    label="Confirm Password"
                    type="password"
                    required
                    ></v-text-field>
                    <v-btn @click="clear">clear</v-btn>
                    <v-btn
                    :disabled="!valid"
                    @click="submit"
                    type="submit"
                    >
                    Create Account
                    </v-btn>
                </v-form>
                 </v-container>
            </v-flex>
        </v-layout>
    </v-container>
</template>


<script>
import axios from 'axios'
import { error } from 'util';

  export default {
    data: () => ({
      valid: true,
      usernameRules: [
          v => !!v || 'Name is required',
          v => (v && v.length <= 10) || 'Name must be less than 10 characters'
      ],
      emailRules: [
          v => !!v || 'E-mail is required',
          v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      items: [
          'Admin',
          'Sales'
      ],
        fullname: '',
        username: '',
        email: '',
        password: '',
        position: null
    }),
    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          axios.post('http://localhost:8081/register', {
            fullname: this.fullname,
            username: this.username,
            email: this.email,
            password: this.password,
            position: this.position
          })
            .then(response => response.json())
            .catch(error => {
            console.log(error);
          });
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>

<style lang="sass" scoped>

</style>
