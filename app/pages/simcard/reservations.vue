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
                <UiBaseFormModal @close="openModal = false" title="الخطوط">
                    <template #form>
                        <section class="p-4">
                            <div v-if="!seletedRquest" class="text-center text-gray-400 py-10">
                                لا يوجد طلبات
                            </div>
                            <div v-else class="bg-white border border-border rounded-xl p-5 shadow-sm space-y-3">

                                <h2 class="font-semibold text-danger flex items-center gap-2">
                                    📝 الطلبات الخاصة
                                </h2>

                                <p class="text-gray-500 leading-relaxed text-sm">
                                    {{ seletedRquest }}
                                </p>
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
import { editTaxiTransfer, deleteSimreservation, addTaxiTransfer } from "@/services/trips";
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
    'simreservation',
    async () => {
        const { $api } = useNuxtApp()
        const res = await $api.get(`/simreservation?page=${pagination.value.page || 1}&perPage=${pagination.value.perpage}`)
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
    key: 'simpackage',
    value: ' الباقة',
}, {
    key: 'simcards',
    value: "عدد الخطوط",
}, {
    key: 'delevirylocation',
    value: 'مكان التسليم',
}, {
    key: 'roomNumber',
    value: 'رقم الغرفة او الرحلة',
}, {
    key: 'date',
    value: 'تاريخ ',
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
        name: { value: T.fullName, class: '' },
        phone: { value: T.phone, class: '' },
        simpackage: { value: T.simPackage, class: '' },
        simcards: { value: T.cardsCount, class: '' },
        date: { value: formatDate(T.date), class: '' },
        delevirylocation: { value: T.deliveryLocation, class: '' },
        roomNumber: { value: T.roomNumber, class: '' },
        totalPrice: { value: T.price, class: '' },
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
const seletedRquest = ref()
const openoverly = (id: number) => {
    openModal.value = true
    const selected = data.value?.data?.find((T: any) => T.id === id)
    seletedRquest.value = selected.specialRequest
}
const removeTaxiTransfer = async (id: number) => {
    try {
        await deleteSimreservation(id)
        addToast("تم الحذف بنجاج ", "success")
        refresh()
    } catch (error) {
        addToast("حدث خطأ اثناء عملية الحذفة", "error")
         
    }
}   
</script>