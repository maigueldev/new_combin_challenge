<template>
  <div class="row">
    <form-component :rowsData="rowsData" @addRow="appendRow" />
    <table-component :data="rowsData" :loading="isLoading" />

    <v-idle @idle="refreshTableData()" :loop="true" :wait="5" :duration="120" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import FormComponent from "../components/FormComponent.vue";
import TableComponent from "../components/TableComponent.vue";

export default {
  name: "HomeView",
  components: {
    FormComponent,
    TableComponent,
  },
  data() {
    return {
      rowsData: [],
      isLoading: false,
    };
  },
  async created() {
    await this.userLogin();
    await this.getDataList();
  },
  computed: {
    ...mapGetters([
      "getUserData",
      "getData",
      "getStatusCreate",
      "getHasError",
      "getHasSuccess",
    ]),
    ssnInTable: function () {
      return this.rowsData.map((row) => row.ssn);
    },
  },
  methods: {
    ...mapActions(["userLogin", "getDataList", "create", "setErrorCreate"]),

    refreshTableData: function () {
      this.isLoading = true;
      setTimeout(() => {
        this.getDataList();
        this.isLoading = false;
      }, 150);
    },
    appendRow: function (value) {
      this.rowsData.push(value);
    },
  },
  watch: {
    getData: function (newValues) {
      this.rowsData = newValues;
    },
  },
};
</script>

<style scoped>
.v-idle {
  display: none;
}
</style>
