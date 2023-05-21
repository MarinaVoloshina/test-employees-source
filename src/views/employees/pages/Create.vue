<template>
  <employees-form v-model="model" :form-action="formActionEnum.CREATE" />
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import EmployeesForm from "@/components/employees/EmployeesForm.vue";
import { FormActionEnum } from "@/constants/formActionEnum";
import { EmployeeModel } from "@/models/Employee";

@Component({
  name: "employees-create",
  components: { EmployeesForm },
})
export default class EmployeesCreate extends Vue {
  formActionEnum = FormActionEnum;
  model = new EmployeeModel();
}
</script>
