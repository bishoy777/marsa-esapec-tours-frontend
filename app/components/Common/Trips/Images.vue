<template>
    <section class="p-4 space-y-4">
        <div class="flex justify-end">
            <label class="bg-primary text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-primary/90">
                ➕ إضافة صورة
                <input type="file" class="hidden" multiple @change="addImg" />
            </label>
        </div>
        <!-- Empty State -->
        <div v-if="!images?.length" class="text-center text-gray-400 py-10">
            لا توجد صور
        </div>

        <!-- Responsive Grid: 1 col on mobile, 2 on sm, 3 on md -->
        <div v-if="images?.length" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            <div v-for="(img, index) in fullImages" :key="index" class="relative">
                <img :src="img.url" @click="selectedImage = img.url"
                    class="w-full h-48 md:h-60 object-cover rounded-xl border transition" :class="selectedImage === img.url
                        ? 'border-primary scale-105'
                        : 'border-border hover:border-gray-300'" />
                <button @click.stop="emits('deleteImage', img.id)"
                    class="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-lg hover:bg-red-600">
                    <font-awesome-icon :icon="faClose" />
                </button>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { ref, computed, toRefs } from 'vue'; // Added missing imports
import { faClose } from '@fortawesome/free-solid-svg-icons';

const props = defineProps<{
    id: number
    images: any[] // Changed to any[] because your logic uses img.url and img.id
}>();

const emits = defineEmits<{
    (e: 'deleteImage', id: number): void;
    (e: 'addImage', formData: any): void;
}>()
const config = useRuntimeConfig();

const BASE_URL = config.public.apiBase;

const { images } = toRefs(props)

const fullImages = computed(() => {
    return images.value.map(img => {
        return {
            url: `${BASE_URL}${img.url}`,
            id: img.id
        }
    })
})

const selectedImage = ref<string>('');
const formData = ref<FormData>(new FormData());

const addImg = (e: Event) => {
    const target = e.target as HTMLInputElement
    if (!target.files?.length) return

    // Clear previous form data if you want fresh upload per click, 
    // or keep it to append as per your original logic.
    const newFormData = new FormData();
    Array.from(target.files).forEach((file) => {
        newFormData.append(`images`, file)
    })
    emits('addImage', newFormData)
}
</script>