<template>
  <employees-form v-model="model" :form-action="formActionEnum.EDIT" />
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import EmployeesForm from "@/components/employees/EmployeesForm.vue";
import { FormActionEnum } from "@/constants/formActionEnum";
import { EmployeeModel } from "@/models/Employee";

@Component({
  name: "employees-edit",
  components: { EmployeesForm },
})
export default class EmployeesEdit extends Vue {
  formActionEnum = FormActionEnum;

  model = new EmployeeModel();
}
</script>
