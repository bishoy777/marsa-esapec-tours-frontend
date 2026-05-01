<template>
    <!-- Changed to grid-cols-1 by default, md:grid-cols-2 for desktop -->
    <section class="p-4 grid grid-cols-1 md:grid-cols-2 gap-6">
        
        <!-- Overview: Responsive col-span -->
        <div class="bg-white w-full border col-span-1 md:col-span-2 border-border rounded-xl p-5 shadow-sm">
            <h2 class="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                📝 نظرة عامة
            </h2>
            <p class="text-sm text-gray-600 leading-relaxed">
                {{ overview }}
            </p>
        </div>

        <!-- Places: Responsive col-span -->
        <div class="bg-white col-span-1 md:col-span-2 border border-border rounded-xl p-5 shadow-sm">
            <h2 class="font-semibold text-blue-600 mb-4 flex items-center gap-2">
                📍 الاماكن
            </h2>

            <div v-if="!places?.length" class="text-sm text-gray-400">
                لا يوجد بيانات
            </div>

            <ul class="space-y-2 max-h-64 overflow-auto pr-2">
                <li v-for="(item, i) in places" :key="i"
                    class="flex items-center justify-between bg-gray-50 px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition">
                    <div class="flex items-center gap-2">
                        <span class="text-blue-500">📍</span>
                        {{ item }}
                    </div>
                </li>
            </ul>
        </div>

        <!-- Included: Automatically stacks on mobile -->
        <div class="bg-white border border-border rounded-xl p-5 shadow-sm">
            <h2 class="font-semibold text-green-600 mb-4 flex items-center gap-2">
                ✅ المتاح
            </h2>

            <div v-if="!included?.length" class="text-sm text-gray-400">
                لا يوجد بيانات
            </div>

            <ul class="space-y-2 overflow-auto pr-2">
                <li v-for="(item, i) in included" :key="i" class="flex items-center gap-2 text-sm text-gray-700">
                    <span class="text-green-500">✔</span>
                    {{ item }}
                </li>
            </ul>
        </div>

        <!-- Excluded: Automatically stacks on mobile -->
        <div class="bg-white border border-border rounded-xl p-5 shadow-sm">
            <h2 class="font-semibold text-red-600 mb-4 flex items-center gap-2">
                ❌ غير المتاح
            </h2>

            <div v-if="!excluded?.length" class="text-sm text-gray-400">
                لا يوجد بيانات
            </div>

            <ul class="space-y-2 overflow-auto pr-2">
                <li v-for="(item, i) in excluded" :key="i" class="flex items-center gap-2 text-sm text-gray-700">
                    <span class="text-red-500">✖</span>
                    {{ item }}
                </li>
            </ul>
        </div>

    </section>
</template>

<script setup lang="ts">
import { toRefs } from 'vue'; // Added missing import

const props = defineProps<{
    overview: string
    included: string[]
    excluded: string[]
    places: string[]
}>()

const { included, excluded } = toRefs(props)
</script>