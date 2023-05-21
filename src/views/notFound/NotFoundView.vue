<template>
  <div class="text-center">
    <ui-title title="Страница не найдена" />

    <p class="mb-8">Упс... Такой страницы не существует</p>

    <v-btn @click="$router.push('/')" color="primary">
      Вернуться на главную
    </v-btn>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from "vue-property-decorator";
import UiTitle from "@/components/common/UiTitle.vue";

@Component({ name: "not-found-view", components: { UiTitle } })
export default class NotFoundView extends Vue {}
</script>
