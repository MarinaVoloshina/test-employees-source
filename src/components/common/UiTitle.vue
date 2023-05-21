<template>
  <h2 class="ui-title">
    {{ title }}
  </h2>
</template>

<script lang="ts">
import { Vue, Component, Prop } from "vue-property-decorator";

@Component({ name: "ui-title" })
export default class UiTitle extends Vue {
  @Prop({ type: String, required: true }) title!: string;
}
</script>

<style lang="scss">
.ui-title {
  margin: 1rem 0 2rem;
  font-size: 2rem;
}
</style>
