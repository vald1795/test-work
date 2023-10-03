<template>
  <div>
    <div class="header"></div>
    <div v-if="!loading" class="main-page d-flex flex-column justify-content-center align-items-center">
      <div class="box d-flex flex-column">
        <p class="description d-flex flex-column justify-content-center">
          description
        </p>
        <p class="title">
          description
        </p>
        <ValidationObserver v-slot="{ invalid }">
          <form @submit.prevent="onRegister">
            <div class="form-group d-flex flex-column">
              <ValidationProvider class="name-input" rules="required|alpha_spaces" v-slot="{ errors }">
                <input class="form-control" autocomplete="off" v-model.trim="username" type="text" id="Username"
                  name="Username" placeholder="Username">
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>
              <ValidationProvider class="pt-3" rules="required|number" v-slot="{ errors }">
                <input class="form-control" autocomplete="off" v-model.trim="number" type="tel" id="Phone" name="Phone"
                  placeholder="Phone number">
                <span class="error">{{ errors[0] }}</span>
              </ValidationProvider>
              <b-button class="mt-3 btn" type="submit" variant="success" :disabled="invalid">Login</b-button>
            </div>
          </form>
        </ValidationObserver>
      </div>

    </div>
    <div class="footer"></div>
  </div>
</template>


<script>

import axios from 'axios';
import { ValidationObserver } from 'vee-validate';
import { ValidationProvider } from 'vee-validate';

export default {
  components: {
    ValidationObserver,
    ValidationProvider,
  },
  async created() {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      this.users = response.data;
      this.loading = false;
    } catch (error) {
      console.error(error);
    }
  },
  data() {
    return {
      username: '',
      number: '',
      loading: true,
    }
  },
  mounted() {
    this.loading = false;
  },
  computed: {
    nameMatch() {
      return this.users.find(user => user.username === this.username && user.phone === this.number)
    }
  },
  methods: {
    onRegister() {
      if (this.nameMatch !== undefined) {
        console.log('Success! User registered:');
        this.$router.push({ name: 'user-page', params: { userId: this.nameMatch.id } })
      } else {
        throw new Error('Error: User not found in the database');
      }
    }
  },

}
</script>

<style scoped>
.main-page {
  background: #828282;
  height: 100%;
  padding: 1rem;
}

.box {
  max-width: 447px;
  width: 100%;
  background: #C3C3C3;
  border-radius: 6px;
}

.description {
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  height: 50px;
  color: #5F5F5F;
  background: #A5A5A5;
  text-align: center;
  margin: 0;
}

.title {
  color: #5F5F5F;
  padding: 10px 25px;
  margin: 0;
}

.form-group {
  padding: 15px 25px;
  padding-top: 0;
  margin-bottom: 1rem;
}

.btn {
  background: #519945;
  border: 1px solid #519945;
}

.btn:disabled,
.btn.disabled,
fieldset:disabled .btn {
  color: #fff;
  pointer-events: none;
  background-color: #519945;
  border-color: #519945;
  opacity: 0.65;
}

.header {
  height: 60px;
  background: #474747;
}

.footer {
  height: 270px;
  background: #474747;
}

@media (max-width: 447px) {

  .box {
    width: 90%;
  }
}
</style>