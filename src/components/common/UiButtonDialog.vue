<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on, attrs }">
      <slot name="activator" :on="on" :attrs="attrs">
        <v-btn color="red lighten-2" v-bind="attrs" v-on="on">
          {{ dialogButtonText }}
        </v-btn>
      </slot>
    </template>

    <v-card>
      <v-card-title>
        {{ dialogTitle }}
      </v-card-title>

      <v-card-text v-if="dialogText">
        {{ dialogText }}
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="onCancel"> {{ cancelButtonText }}</v-btn>
        <v-btn color="primary" @click="onConfirm" class="ml-3">
          {{ confirmButtonText }}</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script lang="ts">
import { Component, Emit, Prop, Vue } from "vue-property-decorator";

@Component({ name: "ui-button-dialog" })
export default class UiButtonDialog extends Vue {
  @Prop({ type: String, required: true }) dialogTitle!: string;
  @Prop({ type: String, default: "" }) dialogText!: string;
  @Prop({ type: String, default: "Удалить" }) dialogButtonText!: string;
  @Prop({ type: String, default: "Отмена" }) cancelButtonText!: string;
  @Prop({ type: String, default: "Ок" }) confirmButtonText!: string;

  @Emit("cancel")
  onCancel() {
    this.dialog = false;
    return;
  }

  @Emit("confirm")
  onConfirm() {
    return;
  }

  dialog = false;
}
</script>
