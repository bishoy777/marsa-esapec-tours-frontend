<template>
    <section class="p-4 space-y-6">

        <!-- Empty State -->
        <div v-if="!program?.length" class="text-center text-gray-500 py-10">
            لا يوجد برنامج
        </div>

        <!-- Days -->
        <div v-for="day in program" :key="day.id" class="bg-white border border-border rounded-xl p-5 shadow-sm">

            <!-- Day Title -->
            <h2 class="font-bold text-lg text-gray-800 mb-4 pb-2 border-b border-gray-50">
                اليوم {{ day.dayNumber }}
            </h2>

            <!-- Timeline -->
            <div class="space-y-6">

                <!-- Morning -->
                <div v-if="day.morning?.length">
                    <h3 class="font-medium text-sm text-primary mb-2 flex items-center gap-2">
                        <span>🌅</span> Morning
                    </h3>
                    <!-- Changed pl-5 to pr-5 and added list-inside for better RTL mobile support -->
                    <ul class="list-disc pr-5 text-sm text-gray-600 space-y-2">
                        <li v-for="(item, i) in day.morning" :key="i" class="leading-relaxed">
                            {{ item }}
                        </li>
                    </ul>
                </div>

                <!-- Afternoon -->
                <div v-if="day.afternoon?.length">
                    <h3 class="font-medium text-sm text-orange-500 mb-2 flex items-center gap-2">
                        <span>☀️</span> Afternoon
                    </h3>
                    <ul class="list-disc pr-5 text-sm text-gray-600 space-y-2">
                        <li v-for="(item, i) in day.afternoon" :key="i" class="leading-relaxed">
                            {{ item }}
                        </li>
                    </ul>
                </div>

                <!-- Evening -->
                <div v-if="day.evining?.length">
                    <h3 class="font-medium text-sm text-indigo-500 mb-2 flex items-center gap-2">
                        <span>🌙</span> Evining
                    </h3>
                    <ul class="list-disc pr-5 text-sm text-gray-600 space-y-2">
                        <li v-for="(item, i) in day.evining" :key="i" class="leading-relaxed">
                            {{ item }}
                        </li>
                    </ul>
                </div>

            </div>
        </div>

    </section>
</template>

<script setup lang="ts">
import { toRefs } from 'vue';

interface DayProgram {
    id: number
    dayNumber: number
    morning: string[]
    afternoon: string[]
    evining: string[]
}

const props = defineProps<{
    program: DayProgram[]
}>()

const { program } = toRefs(props)
</script>