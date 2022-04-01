<template>
  <div class="col-md-6">
    <h4>Form Data</h4>
    <div class="form-group">
      <label for="firstName">
        First Name
        <span class="red">*</span>
      </label>
      <input
        v-model="formData.firstName"
        @change="applyTrim('firstName')"
        type="text"
        name="firstName"
        id="firstName"
        class="form-control"
        autocomplete="off"
      />
    </div>

    <div class="form-group">
      <label for="lastName">
        Last Name
        <span class="red">*</span>
      </label>
      <input
        v-model="formData.lastName"
        @change="applyTrim('lastName')"
        type="text"
        name="lastName"
        id="lastName"
        class="form-control"
        autocomplete="off"
      />
    </div>

    <div class="form-group">
      <label for="address">
        Address
        <span class="red">*</span>
      </label>
      <input
        v-model="formData.address"
        @change="applyTrim('address')"
        type="text"
        name="address"
        id="address"
        class="form-control"
        autocomplete="off"
      />
    </div>

    <div class="form-group">
      <label for="ssn">
        SSN
        <span class="red">*</span>
      </label>
      <input
        v-model="formData.ssn"
        @change="applyTrim('ssn')"
        type="text"
        name="ssn"
        id="ssn"
        class="form-control"
        autocomplete="off"
        maxlength="11"
      />
    </div>

    <div class="row mt-3" v-if="getHasError || getHasSuccess">
      <div class="col">
        <div :class="alertClass" role="alert">
          <ul v-if="messages.length">
            <li v-for="(value, index) in messages" :key="index">
              {{ value }}
            </li>
          </ul>
          <span v-else>Ops! We have a problem with the API</span>
        </div>
      </div>
    </div>

    <div class="row">
      <div class="col text-center">
        <button @click="resetForm()" class="btn btn-warning mt-4">Reset</button>
      </div>
      <div class="col text-center">
        <button
          v-bind="isDisabledButton"
          @click="saveForm()"
          class="btn btn-primary mt-4"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  name: "FormComponent",
  props: ["rowsData"],
  data() {
    return {
      formData: {
        firstName: "",
        lastName: "",
        address: "",
        ssn: "",
      },
      messages: [],
    };
  },
  computed: {
    ...mapGetters(["getStatusCreate", "getHasError", "getHasSuccess"]),

    isDisabledButton: function () {
      const inputs = Object.keys(this.formData);
      let isDisabled = true;

      if (this.minLengthValidation(inputs)) {
        if (this.isValidSSN) {
          isDisabled = false;
        }
      }

      return {
        disabled: isDisabled,
      };
    },
    isValidSSN: function () {
      return this.regexSSNValidation(this.formData.ssn);
    },
    alertClass: function () {
      return this.getHasError ? "alert alert-danger" : "alert alert-primary";
    },
    ssnInTable: function () {
      return this.rowsData.map((row) => row.ssn);
    },
  },
  methods: {
    ...mapActions(["create", "setErrorCreate"]),

    applyTrim: function (element) {
      this.formData[element] = this.formData[element].trim();
    },

    saveForm: async function () {
      this.messages = [];

      if (this.validSSNInTable(this.formData.ssn)) {
        this.setErrorCreate();
        this.messages.push(
          "Fields require a minimum of two characters or SSN already exist in data"
        );
        return;
      }

      await this.create(this.formData);

      if (this.getHasSuccess) {
        this.messages.push("Success!");
        this.$emit("addRow", { ...this.formData });
        this.resetForm();
      }
    },
    resetForm: function () {
      this.formData = {
        firstName: "",
        lastName: "",
        address: "",
        ssn: "",
      };
      this.hasError = false;
      this.hasSuccess = false;
    },
    minLengthValidation: function (inputs) {
      const resultado = inputs.every((input) => {
        return this.formData[input].length > 1;
      });

      return resultado;
    },
    regexSSNValidation: function (value) {
      return !!value.match(/^([0-9]{3})-([0-9]{2})-([0-9]{4})/);
    },
    validSSNInTable: function (value) {
      return this.ssnInTable.includes(value);
    },
  },
};
</script>

<style scoped>
.red {
  color: red;
}
</style>
