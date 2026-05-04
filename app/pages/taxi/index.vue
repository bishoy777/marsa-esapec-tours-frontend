<template>
    <section>
        <div class="flex justify-end p-4">
            <button @click="openoverly(0, 'add')" class=" flex items-center gap-2 bg-primary font-medium hover:bg-primary/90 text-gray-500 px-5 py-2.5
                rounded-xl shadow-sm hover:shadow-md transition duration-200">
                اضافة نوع رحلة
            </button>
        </div>
        <section id="render_hidden_details">
            <UiBaseOverlay :open-modal="openModal">
                <UiBaseFormModal @close="openModal = false" title="الرحلات">
                    <template #form>
                        <template v-for="input in FormInupts" :key="input.id">
                            <UiFormBaseInput v-if="input?.type != 'select'" :id="input?.id" :required="input?.required"
                                :placeholder="input?.palceholder" :disabled="false" v-model="formData[input?.model]"
                                :type="input?.type" :label="input?.label" :error="errors[input?.error]" />
                        </template>

                        <div class="grid grid-cols-2 gap-4 my-6">
                            <div @click="formData.isHotel = true"
                                :class="['cursor-pointer p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2',
                                    formData.isHotel ? 'border-success bg-success/5 ring-4 ring-success/10' : 'border-gray-100 bg-white hover:border-gray-300']">
                                <div
                                    :class="['p-3 rounded-full', formData.isHotel ? 'bg-success text-white' : 'bg-gray-100 text-gray-500']">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path
                                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                                            stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                                <span
                                    :class="['font-bold', formData.isHotel ? 'text-success' : 'text-gray-600']">فندق</span>
                            </div>

                            <div @click="formData.isHotel = false"
                                :class="['cursor-pointer p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2',
                                    !formData.isHotel ? 'border-success bg-success/5 ring-4 ring-success/10' : 'border-gray-100 bg-white hover:border-gray-300']">
                                <div
                                    :class="['p-3 rounded-full', !formData.isHotel ? 'bg-success text-white' : 'bg-gray-100 text-gray-500']">
                                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" stroke-width="2"
                                            stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                                <span
                                    :class="['font-bold', !formData.isHotel ? 'text-success' : 'text-gray-600']">مطار</span>
                            </div>
                        </div>
                        <UiBaseButton :loading="buttonLoading" @save="submit" />
                    </template>
                </UiBaseFormModal>
            </UiBaseOverlay>
        </section>
        <div class="bg-gray-50 py-10">
            <!-- Search & Filter Header -->
            <div class="bg-white border border-gray-100 rounded-xl shadow-sm p-5 mb-6">
                <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6">

                    <!-- Left Side: Search with Input & Button -->
                    <div class="flex-1 max-w-2xl">
                        <label class="block text-sm font-semibold text-gray-700 mb-2">Search Trips</label>
                        <div class="flex items-center gap-2">
                            <div class="relative flex-1 group">
                                <div
                                    class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-400 group-focus-within:text-blue-500 transition-colors">

                                </div>
                                <!-- Removed @input="onSearch" -->
                                <input v-model="searchQuery" type="text"
                                    placeholder="ابحث عن رحلة... باستخدام مكان الانطلاق"
                                    class="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                    @keyup.enter="refresh" />
                            </div>
                            <!-- New Search Button -->
                            <button @click="refresh()"
                                class="px-6 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors shadow-sm flex items-center gap-2">
                                <span>بحث</span>
                            </button>
                        </div>
                    </div>

                    <!-- Right Side: Controls -->
                    <div class="flex flex-wrap items-center gap-4">
                        <!-- Rows Per Page Selector -->
                        <div class="flex items-center bg-gray-50 border border-gray-200 rounded-lg px-3 py-1">
                            <span class="text-xs font-bold text-gray-500 uppercase tracking-wider mr-3">Show</span>
                            <select v-model="pagination?.perpage"
                                class="bg-transparent text-sm font-semibold text-gray-700 outline-none cursor-pointer py-1.5"
                                @change="refresh()">
                                <option value="10">10 رحلة</option>
                                <option value="25">25 رحلة</option>
                                <option value="50">50 رحلة</option>
                            </select>
                        </div>
                        <div class="hidden sm:block px-4 py-2 bg-blue-50 text-blue-700 rounded-lg text-sm font-medium">
                            عدد الرحلات: {{ pagination.total }} رحلة
                        </div>
                    </div>

                </div>
            </div>
            <section id="table">
                <UiTableBaseTable :cols="cols" :rows="rows" :loading="pending" :pagination="pagination"
                    @changePage="changePage"><template #actions="{ row }"><button class="btn"
                            @click="openoverly(row.id.value, 'edit')">
                            <font-awesome-icon :icon="faPen" />
                        </button><button class="btn mx-3" @click="removeTripType(row.id.value)">
                            <font-awesome-icon :icon="faTrash" />
                        </button></template>
                </UiTableBaseTable>
            </section>
        </div>
    </section>
</template>

<script setup lang="ts">
import { editTaxiTransfer, deleteTaxiTrip, addTaxiTransfer, taxiSearch } from "@/services/trips";
import { useValidation } from '@/composables/useValidation'; import {
    faPen, faTrash
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
const searchQuery = ref("")
const { data, pending, refresh } = useAsyncData(
    'taxi',
    async () => {

        const { $api } = useNuxtApp()
        const res = await $api.get(`/taxi?page=${pagination.value.page || 1}&perPage=${pagination.value.perpage || 10}${searchQuery.value ? `&search=${searchQuery.value}` : ''}`)
        console.log(res.data, "taxi data")
        console.log(res?.data?.pagination, "s data")
        pagination.value = res?.data?.pagination

        return res

    },
    {
        default: () => ({ data: [] }),
        server: false // 👈 VERY important for hydration mismatch
    }
)
const formData = ref<Record<string, any>>({
    from: null,
    to: null,
    sedanPrice: null,
    HighSprice: null,
    isHotel: false,

})
const errors = ref<Record<string, string | null>>({
    from: null,
    to: null,
    sedanPrice: null,
    HighSprice: null,

})
const modalType = ref<"add" | "edit">("add")
const selectedId = ref<number | null>(null)
const { validateRequiredInput, resetErrors, resetValues } = useValidation(formData.value, errors.value, ['from', 'to', 'sedanPrice', 'HighSprice'])
const buttonLoading = ref<boolean>(false)
const FormInupts = ref([{
    id: 'from',
    type: "string",
    model: 'from',
    disabled: false,
    palceholder: "ادخل  مكان الانطلاق",
    label: "مكان الانطلاق",
    required: true,
    error: 'from'
}, {
    id: 'to',
    type: "string",
    model: 'to',
    disabled: false,
    palceholder: " ادخل  مكان الوصول",
    label: " مكان الوصول",
    required: true,
    error: 'to'
}, {
    id: 'HighSprice',
    type: "number",
    model: 'HighSprice',
    disabled: false,
    palceholder: "ادخل  السعر للعربية الميكروباص",
    label: "السعر للعربية الميكروباص",
    required: true,
    error: 'HighSprice'
}, {
    id: 'sedanPrice',
    type: "number",
    model: 'sedanPrice',
    disabled: false,
    palceholder: "ادخل  السعر للعربية الملاكي",
    label: "السعر للعربية الملاكي",
    required: true,
    error: 'sedanPrice'
},])
const openModal = ref(false)
const cols = ref([{
    key: 'from',
    value: 'من',
}, {
    key: 'to',
    value: 'الي',
}, {
    key: 'HighSprice',
    value: "سعر العربية الميكروباص"
}, {
    key: 'sedanPrice',
    value: 'سعر العربية الملاكي',
}, {
    key: 'actions',
    value: 'الاجراءات',
    slot: "actions"
},
])
const rows = computed(() => {
    if (!data.value) return [];
    return data.value?.data?.data?.map((T: any) => ({
        id: { value: T.id, class: '' },
        from: { value: T.from, class: '' },
        to: { value: T.to, class: '' },
        HighSprice: { value: T.HighSprice, class: '' },
        sedanPrice: { value: T.sedanPrice, class: '' },
        isHotel: { value: T.isHotel, class: '' },
        specialRequest: { value: T.specialRequest, class: '' },
    }))
})
const submit = async () => {
    const valid = validateRequiredInput()
    buttonLoading.value = true
    if (!valid) return;
    try {
        const res = modalType.value === 'edit' ? await editTaxiTransfer(selectedId.value, formData.value) : await addTaxiTransfer(formData.value)
        addToast("تمت اضافة الرحلة بنجاح", "success")
        resetValues()
        resetErrors()
        formData.value.isHotel = false
        refresh()
        openModal.value = false
    } catch (error) {
        addToast("حدث خطأ اثناء اضافة الرحلة", "error")

    } finally {
        buttonLoading.value = false
    }
}

const openoverly = (id: number, type: 'add'
    | 'edit'
) => {
    resetValues()
    formData.value.isHotel = false
    resetErrors()
    modalType.value = type
    openModal.value = true
    selectedId.value = id
    if (modalType.value === "edit") {
        const rowData = rows.value.find((r: any) => r.id.value === id)
        formData.value.from = rowData.from.value
        formData.value.to = rowData.to.value
        formData.value.HighSprice = Number(rowData.HighSprice.value)
        formData.value.sedanPrice = Number(rowData.sedanPrice.value)
        formData.value.isHotel = rowData.isHotel.value

    }
}
const removeTripType = async (id: number) => {
    try {
        await deleteTaxiTrip(id)
        addToast("تم حذف نوع الرحلة ", "success")
        refresh()
    } catch (error) {
        addToast("حدث خطأ اثناء حذف نوع ", "error")

    }
}   
</script>