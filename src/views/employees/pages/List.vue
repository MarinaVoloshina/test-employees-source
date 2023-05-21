<template>
  <div>
    <ui-title title="Список сотрудников" />

    <div class="text-end">
      <v-btn color="primary" class="ml-4 mb-4" @click="handleCreate">
        <v-icon>mdi-plus</v-icon>
        <span class="ml-2"> Добавить запись</span></v-btn
      >
    </div>

    <data-table
      :headers="headers"
      :items="items"
      @edit="handleEdit"
      @delete="handleDelete"
    />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import UiTitle from "@/components/common/UiTitle.vue";
import DataTable from "@/components/common/DataTable.vue";
import EmployeesService from "@/services/EmployeesService";
import { EmployeeModel } from "@/models/Employee";

@Component({
  components: { DataTable, UiTitle },
})
export default class EmployeesList extends Vue {
  service = new EmployeesService();

  headers = [
    { text: "Фамилия", value: "middleName" },
    { text: "Имя", value: "firstName" },
    { text: "Отчество", value: "lastName" },
    { text: "Дата рождения", value: "birthDate" },
    { text: "Описание", value: "description" },
    { text: "Действия", value: "actions", sortable: false },
  ];

  items: EmployeeModel[] = [];

  created() {
    this.items = this.service.getList();
  }

  handleCreate() {
    this.$router.push({ name: "employeesCreate" });
  }

  handleEdit(id) {
    this.$router.push({ name: "employeesEdit", params: { id: id } });
  }

  handleDelete(id) {
    try {
      this.service.delete(id);

      this.items = this.items.filter((e) => e.id !== id);
    } catch (e: any) {
      this.$notify({
        group: "main",
        type: "error",
        title: e.message || "Ошибка при выполнении операции",
      });
    }
  }
}
</script>
