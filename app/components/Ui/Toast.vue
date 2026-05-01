<template>
    <div class="fixed top-5 right-5 space-y-3 z-50">
        <div v-for="(toast,index) in toasts" :key="toast.id"
            class="px-5 py-3 rounded-xl shadow-lg text-white flex items-center gap-3 animate-slide"
            :class="toastClass(toast.type)">
            <span>{{ toast.message }}</span>

            <button class="ml-auto" @click="toasts.splice(index, 1)">
                ✕
            </button>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useToast } from "@/composables/useToast"

const { toasts, addToast } = useToast()
const toastClass = (type: string) => {
    switch (type) {
        case "success":
            return "bg-green-500"
        case "error":
            return "bg-red-500"
        default:
            return "bg-blue-500"
    }
}
onMounted(() => {
     
})
onUpdated(() => {
     
})
</script>

<style scoped>
@keyframes slide {
    from {
        opacity: 0;
        transform: translateX(100%);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

.animate-slide {
    animation: slide 0.3s ease;
}
</style>