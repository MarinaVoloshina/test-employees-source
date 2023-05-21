<template>
  <router-view />
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";

@Component({ name: "employees-view" })
export default class EmployeesView extends Vue {}
</script>
