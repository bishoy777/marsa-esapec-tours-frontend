<template>
  
    <div
        class="fixed inset-0 z-50 overflow-y-auto m-auto h-3/4 w-11/12 sm:w-2/3 md:w-1/3 bg-white rounded-3xl py-8 shadow-2xl border border-border">

        <section id="head" class="mb-5 flex flex-row justify-between px-6 items-center">
            <h2 class="font-bold text-gray-700 text-lg">{{ title }}</h2>
            <button @click="fireCloseEmit"
                class="bg-red-500 hover:bg-red-600 rounded-xl p-2 text-white transition-colors shadow-sm">
                <Close class="w-5 h-5" />
            </button>
        </section>

        <hr class="border-t-2 border-primary/20 mb-6 w-11/12 mx-auto" />

        <div class="px-6 pb-4">
            <slot name="form"></slot>
            <slot name="view"></slot>
        </div>
    </div>
</template>
<script setup lang="ts">
import Close from "@/assets/svgs/close.svg"
interface Props {
    title
    : string
}
defineProps<Props>()
const emits = defineEmits<{
    (e: 'close'): void
}>()
const fireCloseEmit = () => {
    emits('close')
}
</script>
