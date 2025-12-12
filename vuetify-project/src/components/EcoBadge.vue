<script setup>
defineProps({
  badges: {
    type: Array,
    default: () => []
  }
})
</script>

<template>
  <div class="d-flex align-center">
    <v-tooltip
      v-for="(badge, i) in badges"
      :key="i"
      location="top"
      :text="badge.label"
    >
      <template #activator="{ props }">
        <v-chip
          v-bind="props"
          size="small"
          :color="badge.color"
          variant="flat"
          class="ml-1"
          pill
          role="img"
          :aria-label="badge.label"
        >
          <v-icon :icon="badge.icon" size="18" class="text-info"></v-icon>
          <span class="sr-only">{{ badge.label }}</span>
        </v-chip>
      </template>
    </v-tooltip>
  </div>
</template>

<style scoped>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  overflow: hidden;
  clip: rect(0,0,0,0);
}
</style>