<script setup>
import { ref } from 'vue';
const emit = defineEmits(['input'])

const inputValue = ref('');

const props = defineProps({
  forLabel: String,
  label: String,
  typeInput: {
    type: String,
    default: 'text'
  },
  id: String
})

const handleInput = (event) => {
  inputValue.value = event.target.value;
  emit('input', inputValue.value);
};

</script>
<template>
  <div class="flex my-4">
    <label
      :for="props.forLabel"
      class="text-xs font-semibold inline-block py-1 px-2 rounded text-blue-600 bg-blue-200 uppercase last:mr-0 mr-1 min-w-max"
      >{{ props.label }}</label
    >
    <input
      :type="props.typeInput"
      :id="props.id"
      :value="inputValue"
      @input="handleInput"
      class="px-2 py-1 placeholder-slate-300 text-slate-600 relative bg-white rounded text-sm border border-slate-300 outline-none focus:outline-none focus:ring w-full"
    />
  </div>
</template>
