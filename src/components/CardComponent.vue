<script setup>
const props = defineProps({
    iconeCard: String,
    titleCard: String,
    paragraphCard: {
    type: String,
    default: 'text'
  },
})
</script>

<template>
  <div class="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center">
    <div
      class="relative flex flex-col min-w-0 break-words bg-white w-full mb-8 shadow-lg rounded-lg"
    >
      <div class="px-4 py-5 flex-auto h-64">
        <div
          class="text-white p-3 text-center inline-flex items-center justify-center w-12 h-12 mb-5 shadow-lg rounded-full bg-red-400"
        >
          <i :class="props.iconeCard"></i>
        </div>
        <h6 class="text-xl font-semibold">{{props.titleCard}}</h6>
        <p class="mt-2 mb-4 text-gray-600">
            {{ props.paragraphCard }}
        </p>
      </div>
    </div>
  </div>
</template>
