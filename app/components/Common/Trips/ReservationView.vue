<template>
    <section class="p-6 max-w-2xl mx-auto space-y-6" dir="rtl">
        <div v-if="!details?.customerName"
            class="flex flex-col items-center justify-center text-center text-gray-500 py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
            <div class="text-5xl mb-4">📄</div>
            <p class="text-xl font-medium">لا توجد تفاصيل للحجز حالياً</p>
        </div>
        <div v-else class="space-y-6">
            <div
                class="flex flex-wrap items-center justify-between gap-4 bg-white p-4 rounded-xl shadow-sm border border-gray-100">
                <div class="flex items-center gap-4">
                    <h1 class="text-2xl font-black text-gray-900">تفاصيل الحجز</h1>
                    <span :class="{
                        'bg-yellow-100 text-yellow-700': details.status === 'pending',
                        'bg-green-100 text-green-700': details.status === 'confirmed',
                        'bg-red-100 text-red-700': details.status === 'cancelled',
                        'bg-blue-100 text-blue-700': details.status === 'ended'
                    }" class="px-4 py-1 rounded-full text-sm font-bold">
                        {{
                            details.status === 'pending' ? 'قيد الانتظار' :
                                details.status === 'confirmed' ? 'مؤكد' :
                                    details.status === 'cancelled' ? 'ملغي' : 'منتهي'
                        }}
                    </span>
                </div>

                <div class="flex items-center gap-2">

                    <template v-if="details.status === 'pending'">
                        <button @click="$emit('changeStatus', 'confirmed')"
                            class="flex items-center gap-1 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-md active:scale-95">
                            <span>✅</span> تأكيد الحجز
                        </button>
                        <button @click="$emit('changeStatus', 'cancelled')"
                            class="flex items-center gap-1 bg-white hover:bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-lg text-sm font-bold transition-all active:scale-95">
                            <span>❌</span> إلغاء
                        </button>
                    </template>
                    <button v-if="details.status === 'confirmed'" @click="$emit('changeStatus', 'ended')"
                        class="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all shadow-md active:scale-95">
                        <span>🏁</span> إنهاء الحجز
                    </button>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div
                    class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-200 transition-colors">
                    <div class="flex items-center gap-3 mb-4 text-blue-600">
                        <span class="text-xl">👤</span>
                        <h2 class="font-bold text-gray-800">بيانات العميل</h2>
                    </div>
                    <ul class="space-y-3 text-sm">
                        <li class="flex justify-between border-b border-gray-50 pb-2">
                            <span class="text-gray-500">الاسم:</span>
                            <span class="font-semibold text-gray-900">{{ details.customerName }}</span>
                        </li>
                        <li class="flex justify-between border-b border-gray-50 pb-2">
                            <span class="text-gray-500">رقم الهاتف:</span>
                            <span class="font-semibold text-gray-900 font-sans">{{ details.phone }}</span>
                        </li>
                        <li class="flex justify-between">
                            <span class="text-gray-500">عدد الأفراد:</span>
                            <span class="font-semibold text-gray-900">{{ details.peopleCount }} أفراد</span>
                        </li>
                    </ul>
                </div>
                <div
                    class="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 hover:border-green-200 transition-colors">
                    <div class="flex items-center gap-3 mb-4 text-green-600">
                        <span class="text-xl">🌍</span>
                        <h2 class="font-bold text-gray-800">تفاصيل الرحلة</h2>
                    </div>
                    <ul class="space-y-3 text-sm">
                        <li class="flex justify-between border-b border-gray-50 pb-2">
                            <span class="text-gray-500">الرحلة:</span>
                            <span class="font-semibold text-gray-900">{{ details.tripName }}</span>
                        </li>
                        <li class="flex justify-between border-b border-gray-50 pb-2">
                            <span class="text-gray-500">النوع:</span>
                            <span class="font-semibold text-gray-900">{{ details.tripType }}</span>
                        </li>
                        <li class="flex justify-between">
                            <span class="text-gray-500">التاريخ:</span>
                            <span class="font-semibold text-gray-900 font-sans">{{ details.date }}</span>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="bg-gradient-to-l from-indigo-50 to-white p-6 rounded-2xl border border-indigo-100">
                <div class="flex items-center gap-3 mb-4 text-indigo-700">
                    <span class="text-xl">🏨</span>
                    <h2 class="font-bold text-lg">تفاصيل الإقامة</h2>
                </div>
                <div class="grid grid-cols-2 gap-4">
                    <div class="bg-white/60 p-3 rounded-lg">
                        <p class="text-xs text-indigo-500 mb-1">الفندق</p>
                        <p class="font-bold text-gray-800">{{ details.hotel }}</p>
                    </div>
                    <div class="bg-white/60 p-3 rounded-lg">
                        <p class="text-xs text-indigo-500 mb-1">رقم الغرفة</p>
                        <p class="font-bold text-gray-800 font-sans">#{{ details.roomNumber || 'غير محدد' }}</p>
                    </div>
                </div>
            </div>
            <div v-if="details.specialRequest"
                class="bg-amber-50 p-5 rounded-2xl border border-amber-100 relative overflow-hidden">
                <div class="absolute -left-2 -top-2 text-amber-200/50 text-6xl select-none">“</div>
                <h2 class="font-bold text-amber-800 mb-2 flex items-center gap-2">
                    <span>📝</span> طلبات خاصة
                </h2>
                <p class="text-amber-900/80 leading-relaxed text-sm italic">
                    {{ details.specialRequest }}
                </p>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
import { emit } from 'node:cluster'

interface Props {
    customerName?: string
    tripName?: string
    tripType?: string
    hotel?: string
    roomNumber?: string | number
    date?: string
    specialRequest?: string
    status?: string
    peopleCount?: number
    phone?: string
}

defineProps<{
    details: Props
}>()
const emits = defineEmits<{
    (e: 'changeStatus', status: string): void
}>()

</script>