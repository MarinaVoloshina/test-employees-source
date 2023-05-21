<template>
  <v-menu
    offset-y
    :close-on-content-click="false"
    transition="scale-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
        v-bind="attrs"
        v-on="on"
        outlined
        v-model="innerValue"
        :placeholder="placeholder"
        :label="label"
        prepend-icon="mdi-calendar"
        clearable
        :rules="rules"
      />
    </template>

    <v-date-picker v-model="datePickerValue" />
  </v-menu>
</template>

<script lang="ts">
import { Component, Model, Prop, Vue } from "vue-property-decorator";
import { date as dateValidator } from "@/utils/validators/date";

@Component({ name: "ui-date-field" })
export default class UiDateField extends Vue {
  @Model("change", { type: String, default: "" }) value!: string;
  @Prop({ type: String, required: true }) label!: string;
  @Prop({ type: String, default: "Укажите дату" }) placeholder!: string;
  @Prop({ type: Array, default: () => [] }) rules!: any[];

  get innerValue() {
    return this.value;
  }

  set innerValue(v) {
    this.$emit("change", v);
  }

  get datePickerValue() {
    return dateValidator(this.innerValue) === true ? this.innerValue : "";
  }

  set datePickerValue(v) {
    this.innerValue = v;
  }
}
</script>

<style lang="scss">
.v-picker {
  width: 100%;
}
</style>
