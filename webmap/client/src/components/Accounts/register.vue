<template>
    <v-container mt-5 class="register">
        <v-layout row wrap>
            <v-flex md4 offset-md7>
                <v-container class="createAccounts grey darken-3">
                   <v-form ref="form" v-model="valid" lazy-validation>
                    <v-text-field
                    v-model="fullname"
                    label="Fullname"
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
                    v-model="select"
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

  export default {
    data: () => ({
      valid: true,
      fullname: '',
      username: '',
      usernameRules: [
        v => !!v || 'Name is required',
        v => (v && v.length <= 10) || 'User name must be less than 10 characters'
      ],
      email: '',
      password: '',
      emailRules: [
        v => !!v || 'E-mail is required',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      select: null,
      items: [
        'Admin',
        'Sales'
      ],
      checkbox: false
    }),

    methods: {
      submit () {
        if (this.$refs.form.validate()) {
          // Native form submission is not yet supported
          axios.post('/register', {
            name: this.name,
            email: this.email,
            select: this.select,
            checkbox: this.checkbox
          })
        }
      },
      clear () {
        this.$refs.form.reset()
      }
    }
  }
</script>

<style lang="sass" scoped>
.register
    position: relative
    top: 6vh 
</style>
