<template>
  <v-form ref="form" lazy-validation>
    <ui-title :title="formTitle" />

    <v-row>
      <v-col v-bind="defaultResponsiveCols">
        <v-text-field
          label="ФИО"
          v-model.trim="fullName"
          outlined
          clearable
          :rules="[validators.required, validators.fullName]"
        />
      </v-col>

      <v-col v-bind="defaultResponsiveCols">
        <ui-date-field
          label="Дата рождения"
          v-model="innerValue.birthDate"
          :rules="[validators.required, validators.date]"
        />
      </v-col>

      <v-col cols="12">
        <v-textarea
          label="Описание"
          v-model="innerValue.description"
          outlined
          no-resize
          clearable
          rows="5"
          :rules="[validators.maxLength]"
        />
      </v-col>
    </v-row>

    <v-row>
      <v-col class="d-flex justify-end">
        <v-btn color="primary" class="ml-4 mb-3" @click="handleCancel"
          >Отмена</v-btn
        >

        <v-btn color="primary" class="ml-4" @click="handleSave"
          >Сохранить</v-btn
        >
      </v-col>
    </v-row>
  </v-form>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue } from "vue-property-decorator";
import { PropType } from "vue";
import { FormActionEnum } from "@/constants/formActionEnum";
import UiTitle from "@/components/common/UiTitle.vue";
import { EmployeeModel } from "@/models/Employee";
import EmployeesService from "@/services/EmployeesService";
import UiDateField from "@/components/common/UiDateField.vue";
import validators from "@/utils/validators/index";

@Component({ name: "employees-form", components: { UiDateField, UiTitle } })
export default class EmployeesForm extends Vue {
  @Model("change", { type: Object as PropType<EmployeeModel>, required: true })
  value!: EmployeeModel;

  validators = validators;
  service = new EmployeesService();

  get innerValue() {
    return this.value;
  }

  set innerValue(v) {
    this.$emit("change", v);
  }

  @Prop({ type: String as PropType<FormActionEnum>, required: true })
  formAction!: FormActionEnum;

  formTitles: Record<FormActionEnum, string> = {
    create: "Создать запись о сотруднике",
    edit: "Редактировать запись о сотруднике",
  };

  defaultResponsiveCols = {
    cols: 12,
    md: 6,
    sm: 12,
  };

  created() {
    if (this.formAction === FormActionEnum.EDIT) {
      this.get(parseInt(this.$route.params.id));
    }
  }

  get fullName(): string {
    const source = [
      this.innerValue.middleName,
      this.innerValue.firstName,
      this.innerValue.lastName,
    ];

    return source.filter((e) => !!e).join(" ");
  }

  set fullName(v) {
    const chunks = (v || "").split(" ");

    this.innerValue.middleName = chunks[0] || "";
    this.innerValue.firstName = chunks[1] || "";
    this.innerValue.lastName = chunks[2] || "";
  }

  get formTitle() {
    return this.formTitles[this.formAction];
  }

  handleCancel() {
    this.$router.push({ name: "employeesList" });
  }

  handleSave() {
    const isValid = this.validate();

    if (!isValid) return;

    switch (this.formAction) {
      case FormActionEnum.EDIT:
        this.put();
        break;
      default:
        this.post();
        break;
    }
  }

  get(id) {
    try {
      this.innerValue = this.service.get(id);
    } catch (e: any) {
      this.$router.push({ name: "employees" });
      this.$notify({
        group: "main",
        type: "error",
        title: e.message || "Ошибка при выполнении операции",
      });
    }
  }

  post() {
    try {
      this.service.post(this.innerValue);
      this.$router.push({ name: "employeesList" });
    } catch (e: any) {
      this.$notify({
        group: "main",
        type: "error",
        title: e.message || "Ошибка при выполнении операции",
      });
    }
  }

  put() {
    try {
      this.service.put(this.innerValue);
      this.$router.push({ name: "employeesList" });
    } catch (e: any) {
      this.$notify({
        group: "main",
        type: "error",
        title: e.message || "Ошибка при выполнении операции",
      });
    }
  }

  validate(): boolean {
    return (this.$refs.form as any).validate();
  }
}
</script>
