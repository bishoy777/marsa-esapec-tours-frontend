<template>
    <section class="p-4 space-y-4" dir="rtl">

        <!-- Empty State -->
        <div v-if="!reviews?.length" class="text-center text-gray-500 py-10">
            لا يوجد تقييمات
        </div>

        <!-- Reviews -->
        <div v-for="(review, index) in reviews" :key="index"
            class="bg-white border border-border rounded-xl p-4 shadow-sm hover:shadow-md transition">

            <!-- Header: flex-wrap handles small screens by pushing rating below name if needed -->
            <div class="flex flex-wrap items-start justify-between gap-3 mb-3">

                <!-- userName + Avatar -->
                <div class="flex items-center gap-3">
                    <div class="w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center shrink-0">
                        {{ review.userName.charAt(0) }}
                    </div>

                    <div class="flex flex-col gap-1">
                        <h3 class="font-semibold text-gray-800 leading-none">
                            {{ review.userName }}
                        </h3>

                        <!-- Status -->
                        <div>
                            <span class="text-[10px] md:text-xs px-2 py-1 rounded-full font-medium" :class="statusMap[review.status]?.class">
                                {{ statusMap[review.status].label }}
                            </span>
                        </div>
                    </div>
                </div>

                <!-- Rating -->
                <div class="flex items-center gap-0.5 pt-1">
                    <span v-for="i in 5" :key="i" class="text-base md:text-sm"
                        :class="i <= review.rating ? 'text-yellow-400' : 'text-gray-300'">
                        ★
                    </span>
                </div>

            </div>

            <!-- Comment -->
            <p class="text-gray-600 text-sm leading-relaxed break-words">
                {{ review.comment }}
            </p>

            <!-- Action Buttons: Full width on tiny screens, auto on larger -->
            <div class="flex items-center justify-end gap-2 mt-4">
                <!-- Accept -->
                <button :disabled="review.status === 'accepted'" 
                    class="px-4 py-1.5 md:py-1 text-sm rounded-lg font-medium transition-colors flex-1 sm:flex-none" 
                    :class="review.status == 'accepted'
                        ? 'bg-gray-100 text-gray-400 cursor-not-allowed border border-gray-200'
                        : 'bg-green-500 text-white hover:bg-green-600 active:bg-green-700'"
                    @click="$emit('change-status', { id: review.id, status: 'accepted' })">
                    قبول
                </button>

                <!-- Reject -->
                <button 
                    class="px-4 py-1.5 md:py-1 text-sm rounded-lg font-medium bg-red-500 text-white hover:bg-red-600 active:bg-red-700 transition-colors flex-1 sm:flex-none"
                    @click="$emit('change-status', { id: review.id, status: 'rejected' })">
                    رفض
                </button>
            </div>
        </div>

    </section>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'; // Added missing import

interface Review {
    id: number // Added id as it's used in emit
    userName: string
    rating: number
    comment: string
    status: 'accepted' | 'rejected' | 'pending'
}

const props = defineProps<{
    reviews: Review[]
}>()

const { reviews } = toRefs(props)

const emit = defineEmits<{
    (e: 'change-status', payload: { id: number; status: string }): void
}>()

const statusMap = {
    accepted: {
        label: 'مؤكد',
        class: 'bg-green-100 text-green-600'
    },
    rejected: {
        label: 'ملغي',
        class: 'bg-red-100 text-red-600'
    },
    pending: {
        label: 'انتظار',
        class: 'bg-yellow-100 text-yellow-600'
    }
}
</script>