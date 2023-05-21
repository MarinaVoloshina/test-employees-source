<template>
  <v-data-table :items="items" :headers="headers">
    <template #[`item.actions`]="{ item }">
      <div class="text-no-wrap">
        <v-btn icon @click="$emit('edit', item.id)">
          <v-icon dark color="primary"> mdi-pencil </v-icon></v-btn
        >

        <ui-button-dialog
          dialog-title="Запись будет удалена. Уверены?"
          @confirm="$emit('delete', item.id)"
        >
          <template #activator="{ on, attrs }">
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon color="red lighten-2"> mdi-delete </v-icon></v-btn
            >
          </template>
        </ui-button-dialog>
      </div>
    </template>
  </v-data-table>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import UiButtonDialog from "@/components/common/UiButtonDialog.vue";

@Component({ name: "data-table", components: { UiButtonDialog } })
export default class DataTable extends Vue {
  @Prop({ type: Array, required: true }) headers!: any[];
  @Prop({ type: Array, required: true }) items!: any[];
}
</script>
