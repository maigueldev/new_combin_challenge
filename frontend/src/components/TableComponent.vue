<template>
  <div class="col-md-6">
    <div class="table-responsive">
      <h4>Data List</h4>
      <div v-if="loading">
        <img src="../assets/loading.gif" alt="Loading" width="125px" />
      </div>
      <table v-else class="table table-bordered table-striped">
        <thead>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Address</th>
          <th>SSN</th>
        </thead>
        <tbody>
          <tr v-for="(value, index) in data" :key="index">
            <td>{{ value.firstName }}</td>
            <td>{{ value.lastName }}</td>
            <td>{{ value.address }}</td>
            <td>{{ value.ssn }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: "TableComponent",
  props: ["data", "loading"],
};
</script>
