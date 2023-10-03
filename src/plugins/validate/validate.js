import Vue from "vue";
import { ValidationObserver, ValidationProvider, extend } from "vee-validate";
import * as rules from "vee-validate/dist/rules";

const username = /^[a-zA-Zа-яА-ЯёЁ\s]+$/;
const number = /^[^a-zA-Zа-яА-ЯёЁ]+$/;
Object.keys(rules).forEach((rule) => {
  extend(rule, rules[rule]);
});

extend("username", {
  validate: (value) => username.test(value),
  message: "Enter only letters",
});
extend("number", {
  validate: (value) => number.test(value),
  message: "Enter only numbers and symbols",
});

Vue.component("ValidationProvider", ValidationProvider);
Vue.component("ValidationObserver", ValidationObserver);
