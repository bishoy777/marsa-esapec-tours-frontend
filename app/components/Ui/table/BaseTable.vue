<template>
    <div>
        <div class="bg-card border border-border rounded-xl overflow-hidden">
            <!-- Added 'block md:table' to allow stacking on mobile -->
            <table class="w-full text-sm text-right block md:table">
                <!-- Hidden on mobile -->
                <thead class="bg-primary text-gray-800 hidden md:table-header-group">
                    <tr>
                        <th v-for="head in cols" :key="head.key" class="px-6 py-3 font-semibold">
                            {{ head.value }}
                        </th>
                        <slot name="thead"></slot>
                    </tr>
                </thead>

                <tbody v-if="loading" class="divide-y divide-border block md:table-row-group">
                    <tr v-for="i in 5" :key="i" class="animate-pulse block md:table-row">
                        <td v-for="col in cols" :key="col.key" class="px-6 py-4 block md:table-cell">
                            <div class="h-4 bg-gray-200 rounded-md w-full"></div>
                        </td>
                    </tr>
                </tbody>

                <tbody class="divide-y divide-border block md:table-row-group" v-else>
                    <!-- Row becomes a block 'card' on mobile -->
                    <tr v-for="(row, index) in rows" :key="index" 
                        class="hover:bg-background transition block md:table-row border-b md:border-b-0 p-4 md:p-0">
                        
                        <!-- Cell becomes a flex container on mobile to show label + value -->
                        <td v-for="col in cols" :key="col.key" 
                            class="px-0 py-2 md:px-6 md:py-4 block md:table-cell flex justify-between items-center md:inline-block">
                            
                            <!-- This label only shows on Mobile -->
                            <span class="md:hidden font-bold text-gray-400 text-xs uppercase">
                                {{ col.value }}
                            </span>

                            <span :class="row[col.key]?.class" v-if="!col.slot">
                                {{ row[col.key]?.value }}
                            </span>
                            <span :class="row[col.key]?.class" v-else>
                                <slot :name="col.slot" :row="row"></slot>
                            </span>
                        </td>
                    </tr>
                </tbody>
            </table>

            <section v-if="loading" class="w-full text-center py-4 flex justify-center gap-2">
                <div v-for="i in 3" :key="i" class="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
            </section>

            <!-- Pagination made flex-wrap to prevent cutting off on mobile -->
            <section class="w-full text-center py-4 flex flex-wrap justify-center gap-2" dir="ltr" v-else>
                <button class="px-3 py-1 border border-border rounded disabled:opacity-40">
                    السابق
                </button>
                <button class="px-3 py-1 rounded border border-border" v-for="(page, index) in pagination.total"
                    :key="index" @click="chagePage(page)" :class="{ 'bg-primary': page === pagination.page }">
                    {{ formatArabicNumber(page) }}
                </button>
                <button class="px-3 py-1 border border-border rounded disabled:opacity-40">التالي</button>
            </section>
        </div>
        <p v-if="!rows?.length" class="text-center py-2 text-gray-600 text-sm">لا يوجد بيانات</p>
    </div>
</template>

<script setup lang="ts">
interface Props {
    cols: any[]
    rows: any[]
    loading: boolean,
    pagination?: {
        page: number,
        total: number
    }
}
const props = defineProps<Props>()
const emits = defineEmits<{
    (e: 'changePage', pageNumber: number): void
}>()

// Kept your local pagination object exactly as you had it
const pagination = {
    page: 10,
    total: 2
}

const chagePage = (page: number) => {
    console.log("page changed to ", page)
    emits('changePage', page)
}
const formatArabicNumber = (num: number) => {
    return new Intl.NumberFormat('ar-EG').format(num)
}
</script>

<style scoped>
@keyframes shimmer {
    0% { background-position: -200% 0; }
    100% { background-position: 200% 0; }
}

.shimmer-effect {
    background: linear-gradient(90deg, #f0f0f0 25%, #e0e0e0 50%, #f0f0f0 75%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
}
</style>