<template>
    <section>
        <div class="flex justify-end p-4">
            <!-- <button @click="openoverly(0, 'add')" class=" flex items-center gap-2 bg-primary font-medium hover:bg-primary/90 text-gray-500 px-5 py-2.5
                rounded-xl shadow-sm hover:shadow-md transition duration-200">
                اضافة جدول تاكسي
            </button> -->
        </div>
        <section id="render_hidden_details">
            <UiBaseOverlay :open-modal="openModal">
                <UiBaseFormModal @close="openModal = false" title="تفاصيل الرحلات والخطوط">
                    <template #form>
                        <section class="p-6 bg-gray-50/50">
                            <!-- Empty State -->
                            <div v-if="!seletedRquest && (!selectedTrips || !selectedTrips.length)"
                                class="text-center py-16 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                                <div class="text-4xl mb-3 text-gray-300">📁</div>
                                <p class="text-gray-400 font-medium">لا توجد طلبات أو رحلات حالياً</p>
                            </div>

                            <div v-else class="space-y-5">
                                <!-- Special Requests Card -->
                                <div v-if="seletedRquest"
                                    class="bg-white border border-red-100 rounded-2xl p-5 shadow-sm overflow-hidden relative">
                                    <div class="absolute top-0 right-0 w-1 h-full bg-danger"></div>

                                    <h2 class="font-bold text-danger flex items-center gap-2 mb-3 text-lg">
                                        <span class="bg-red-50 p-2 rounded-lg">📝</span>
                                        الطلبات الخاصة
                                    </h2>

                                    <p
                                        class="text-gray-700 leading-relaxed bg-red-50/30 p-4 rounded-xl border border-red-50">
                                        {{ seletedRquest }}
                                    </p>
                                </div>

                                <!-- Trips Section -->
                                <div v-if="selectedTrips && selectedTrips.length" class="space-y-3">
                                    <h3 class="font-bold text-gray-800 flex items-center gap-2 px-1">
                                        <span class="bg-blue-50 p-2 rounded-lg text-blue-600">🚌</span>
                                        الرحلات
                                    </h3>

                                    <!-- Rich Grid of Trip Badges -->
                                    <div class="flex flex-wrap gap-2">
                                        <div v-for="(trip, index) in selectedTrips" :key="index"
                                            class="flex items-center gap-2 bg-white border border-gray-200 hover:border-primary/40 hover:shadow-md transition-all duration-200 px-4 py-2.5 rounded-full shadow-sm">
                                            <span
                                                class="w-6 h-6 flex items-center justify-center bg-primary/10 text-primary text-xs font-bold rounded-full">
                                                {{ index + 1 }}
                                            </span>
                                            <span class="text-gray-700 font-medium text-sm">{{ trip }}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </template>
                </UiBaseFormModal>
            </UiBaseOverlay>
        </section>
        <div class="bg-gray-50 py-10">
            <section id="table">
                <UiTableBaseTable :cols="cols" :rows="rows" :loading="pending" :pagination="pagination"
                    @changePage="changePage"><template #actions="{ row }"><button class="btn mx-3"
                            @click="removeTaxiTransfer(row.id.value)">
                            <font-awesome-icon :icon="faTrash" />
                        </button></template><template #specialRequest="{ row }"><button class="btn mx-3"
                            @click="openoverly(row.id.value)">
                            <font-awesome-icon :icon="faEye" />
                        </button></template>
                </UiTableBaseTable>
            </section>
        </div>
    </section>
</template>

<script setup lang="ts">
import { editTaxiTransfer, deletepackagereservation, addTaxiTransfer } from "@/services/trips";
import { useValidation } from '@/composables/useValidation'; import {
    faEye, faTrash
} from '@fortawesome/free-solid-svg-icons'
import { useToast } from "@/composables/useToast";
definePageMeta({
    middleware: 'auth'
})
const { addToast } = useToast()
// const { data, pending, refresh } = useAsyncData('trips', async () => {
//     const { $api } = useNuxtApp()
//     return await $api.get('/trip-type')
// });
const pagination = ref({
    page: 1,
    perpage: 10,
    total: 1
})
const changePage = (page: number) => {
     
    pagination.value.page = page
    refresh()
}
const { data, pending, refresh } = useAsyncData(
    'packagereservation',
    async () => {
        const { $api } = useNuxtApp()
        const res = await $api.get(`/packagereservation?page=${pagination.value.page || 1}&perPage=${pagination.value.perpage}`)
        pagination.value.total = res?.data?.data?.total
        pagination.value.page = res?.data?.data?.page
        return res

    },
    {
        default: () => ({ data: [] }),
        server: false // 👈 VERY important for hydration mismatch
    }
)
const formData = ref<Record<string, any>>({
    name: null,
    phone: null,
    peopleCount: null,
    date: null,
    carType: null,
    taxiId: null,
    simCapacity: null,
    totalPrice: null

})
const errors = ref<Record<string, string | null>>({
    name: null,
    phone: null,
    peopleCount: null,
    date: null,
    carType: null,
    taxiId: null,
    simCapacity: null,
    totalPrice: null
})
const modalType = ref<"add" | "edit">("add")
const selectedId = ref<number | null>(null)
const { validateRequiredInput, resetErrors, resetValues } = useValidation(formData.value, errors.value, ['name', 'phone', 'peopleCount', 'date', 'carType', 'taxiId', 'totalPrice'])
const buttonLoading = ref<boolean>(false)
// const FormInupts = ref([{
//     id: 'name',
//     type: "string",
//     model: 'name',
//     disabled: false,
//     palceholder: "   ادخل اسم العميل",
//     label: " اسم العميل",
//     required: true,
//     error: 'name'
// }, {
//     id: 'phone',
//     type: "string",
//     model: 'phone',
//     disabled: false,
//     palceholder: "ادخل رقم الهاتف",
//     label: "رقم الهاتف",
//     required: true,
//     error: 'phone'
// }, {
//     id: 'peopleCount',
//     type: "number",
//     model: 'peopleCount',
//     disabled: false,
//     palceholder: "ادخل عدد الأشخاص",
//     label: "  عدد الأشخاص",
//     required: true,
//     error: 'peopleCount'
// }, {
//     id: 'carType',
//     type: "number",
//     model: 'carType',
//     disabled: false,
//     palceholder: "ادخل نوع السيارة",
//     label: "  نوع السيارة",
//     required: true,
//     error: 'carType'
// }{
//     id: 'carType',
//     type: "number",
//     model: 'carType',
//     disabled: false,
//     palceholder: "ادخل نوع السيارة",
//     label: "  نوع السيارة",
//     required: true,
//     error: 'carType'
// },])
const openModal = ref(false)
const cols = ref([{
    key: 'name',
    value: 'اسم العميل',
}, {
    key: 'phone',
    value: 'رقم الهاتف',
}, {
    key: 'hotel',
    value: ' اسم الفندق',
}, {
    key: 'roomNumber',
    value: "رقم الغرفة",
}, {
    key: 'date',
    value: ' التاريخ',
}, {
    key: 'peopleCount',
    value: '  عدد الأشخاص',
}, {
    key: 'totalPrice',
    value: 'السعر الاجمالي',
}, {
    key: 'specialRequest',
    value: ' طلبات خاصة',
    slot: 'specialRequest'
}, {
    key: 'actions',
    value: 'الاجراءات',
    slot: "actions"
},
]);
const formatDate = (date) => {
    const d = new Date(date)
    if (isNaN(d)) return '-'

    return d.toLocaleDateString('ar-EG', {
        day: '2-digit',
        month: 'long',
        year: 'numeric'
    })
}
const rows = computed(() => {
    if (!data.value) return [];
    return data.value.data?.data?.map((T: any) => ({
        id: { value: T.id, class: '' },
        name: { value: T.name, class: '' },
        phone: { value: T.phone, class: '' },
        hotel: { value: T.hotel, class: '' },
        roomNumber: { value: T.roomNumber, class: '' },
        date: { value: formatDate(T.date), class: '' },
        peopleCount: { value: T.peopleCount, class: '' },
        totalPrice: { value: T.price, class: '' },
        trips: { value: T.trips.map(trip => trip.name), class: '' },
        specialRequest: { value: T.specialRequest, class: '' },
    }))
})
// const submit = async () => {
//     const valid = validateRequiredInput()
//     buttonLoading.value = true
//     if (!valid) return;
//     try {
//         const res = modalType.value === 'edit' ? await editTaxiTransfer(selectedId.value, formData.value) : await addTaxiTransfer(formData.value)
//         addToast("تمت اضافة الرحلة بنجاح", "success")
//         resetValues()
//         refresh()
//         openModal.value = false
//     } catch (error) {
//         addToast("حدث خطأ اثناء اضافة الرحلة", "error")
//          
//     } finally {
//         buttonLoading.value = false
//     }
// }
const seletedRquest = ref();
const selectedTrips = ref([]);
const openoverly = (id: number) => {
    openModal.value = true
    const selected = data.value?.data?.data?.find((T: any) => T.id === id)

    seletedRquest.value = selected.specialRequest
    selectedTrips.value = selected.trips.map(trip => trip.name)
}
const removeTaxiTransfer = async (id: number) => {
    try {
        await deletepackagereservation(id)
        addToast("تم الحذف بنجاج ", "success")
        refresh()
    } catch (error) {
        addToast("حدث خطأ اثناء عملية الحذفة", "error")
         
    }
}   
</script>