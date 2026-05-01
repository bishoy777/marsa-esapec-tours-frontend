<template>
    <section>
        <div class="flex flex-wrap items-center justify-end gap-3 p-4">
            <button @click="openOverly(null, 'add')"
                class="flex items-center gap-2 bg-primary font-medium hover:bg-primary/90 text-gray-500 px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition duration-200">
                اضافة باقة جديد
            </button>
        </div>
        <section id="render_hidden_details">
            <UiBaseOverlay :open-modal="openModal">
                <UiBaseFormModal @close="openModal = false" title="الباقات">
                    <template #form>
                        <template v-for="input in FormInupts" :key="input.id">
                            <UiFormBaseInput v-if="input.type != 'select'" :id="input.id" :required="input.required"
                                :placeholder="input.palceholder" :disabled="false" v-model="formData[input.model]"
                                :type="input.type" :label="input.label" :error="errors[input.error]" />

                        </template>
                        <div class="grid gap-3 ">
                            <label v-for="trip in selectedTrips" :key="trip.id" :class="[
                                'relative flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all duration-200 ease-in-out group',
                                selectedTrips.includes(trip.id)
                                    ? 'border-blue-600 bg-blue-50/50 shadow-sm'
                                    : 'border-gray-100 bg-white hover:border-gray-200 hover:bg-gray-50'
                            ]">

                                <input type="checkbox" :value="trip.id" v-model="formData.tripIds"
                                    class="peer sr-only" />

                                <div :class="[
                                    'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors',
                                    formData.tripIds.includes(trip.id)
                                        ? 'bg-blue-600 border-blue-600'
                                        : 'border-gray-300 bg-white group-hover:border-gray-400'
                                ]">
                                    <svg v-if="formData.tripIds.includes(trip.id)" class="w-4 h-4 text-white"
                                        fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>

                                <div class="flex flex-col">
                                    <span :class="[
                                        'font-semibold text-sm transition-colors',
                                        formData.tripIds.includes(trip.id) ? 'text-blue-900' : 'text-gray-700'
                                    ]">
                                        {{ trip.value }}
                                    </span>
                                </div>

                                <div v-if="formData.tripIds.includes(trip.id)"
                                    class="absolute top-2 right-2 w-2 h-2 rounded-full bg-blue-600">
                                </div>
                            </label>
                        </div>
                        <!-- INCLUDED -->
                        <div class="bg-gradient-to-br from-blue-50 to-blue-100 my-2 p-3 rounded-2xl shadow-sm">
                            <label class="block text-center text-blue-600 font-semibold mb-2">المتاح</label>
                            <template v-for="(i, index) in included" :key="index">
                                <div
                                    class="relative bg-white/80 backdrop-blur border border-blue-200 rounded-xl p-2 mb-2 shadow-sm">
                                    <button class="absolute left-2 top-2 text-red-400 hover:text-red-600"
                                        @click="included.splice(index, 1)">
                                        ❌
                                    </button>
                                    <UiFormBaseInput :id="index" :required="true"
                                        placeholder="اكتب الاشياء المشمولة في الرحلة" :disabled="false"
                                        v-model="i.model" type="string" :label="`رقم ${index + 1}`" :error="i.errors" />
                                </div>
                            </template>
                            <button @click="included.push({
                                model: '',
                                errors: ''
                            })" class="w-full text-blue-600 hover:text-blue-800 font-medium transition">
                                ➕ إضافة
                            </button>
                        </div>
                        <div class="bg-gradient-to-br from-red-50 to-red-100 my-2 p-3 rounded-2xl shadow-sm">
                            <label class="block text-center text-red-600 font-semibold mb-2">غير المتاح</label>
                            <template v-for="(i, index) in excluded" :key="index">
                                <div
                                    class="relative bg-white/80 backdrop-blur border border-red-200 rounded-xl p-2 mb-2 shadow-sm">
                                    <button class="absolute left-2 top-2 text-red-400 hover:text-red-700"
                                        @click="excluded.splice(index, 1)">
                                        ❌
                                    </button>
                                    <UiFormBaseInput :id="index" :required="true"
                                        placeholder="اكتب الاشياء غير المشمولة في الرحلة" :disabled="false"
                                        v-model="i.model" type="string" :label="`رقم ${index + 1}`" :error="i.errors" />
                                </div>
                            </template>
                            <button @click="excluded.push({
                                model: '',
                                errors: ''
                            })" class=" w-full text-red-600 hover:text-red-800 font-medium transition">
                                ➕ إضافة
                            </button>
                        </div>
                        <div class="bg-gradient-to-br from-green-50 to-emerald-100 my-2 p-3 rounded-2xl shadow-sm">
                            <label class="block text-center text-emerald-600 font-semibold mb-2">ابرز النقاط</label>
                            <template v-for="(i, index) in highlights" :key="index">
                                <div
                                    class="relative bg-white/80 backdrop-blur border border-emerald-200 rounded-xl p-2 mb-2 shadow-sm">
                                    <button class="absolute left-2 top-2 text-red-400 hover:text-red-600"
                                        @click="highlights.splice(index, 1)">
                                        ❌
                                    </button>
                                    <UiFormBaseInput :id="index" :required="true" placeholder="اكتب ابرز النقاط"
                                        :disabled="false" v-model="i.model" type="string" :label="`رقم ${index + 1}`"
                                        :error="i.errors" />
                                </div>
                            </template>
                            <button @click="highlights.push({
                                model: '',
                                errors: ''
                            })" class=" w-full text-emerald-600 hover:text-emerald-800 font-medium transition">
                                ➕ إضافة
                            </button>
                        </div>
                        <UiBaseButton :loading="buttonLoading" @save="submit" />
                    </template>
                </UiBaseFormModal>
            </UiBaseOverlay>
        </section>
        <div class="bg-gray-50 py-10">
            <section id="table">
                <UiTableBaseTable :cols="cols" :rows="rows" :loading="pending" :pagination="pagination"
                    @changePage="changePage"><template #trips="{ row }"><button class="btn mx-3"
                            @click="openOverly(row.id.value, 'edit')">
                            <font-awesome-icon :icon="faPen" />
                        </button></template><template #actions="{ row }"><button class="btn mx-3"
                            @click="removePackage(row.id.value)">
                            <font-awesome-icon :icon="faTrash" />
                        </button></template>
                </UiTableBaseTable>
            </section>
        </div>
    </section>
</template>

<script setup lang="ts">
import { addPackage, deletePackage, getTrips, editPackage } from "@/services/trips";
import { useValidation } from '@/composables/useValidation';
import {
    faPen, faTrash, faEye
} from '@fortawesome/free-solid-svg-icons'
import { useToast } from "@/composables/useToast";
definePageMeta({
    middleware: 'auth'
})
const { addToast } = useToast();
const selectedTrips = ref<Record<string, any>[]>([{}])
const pagination = ref({
    page: 1,
    perpage: 10,
    total: 1
})
const changePage = (page: number) => {
    console.log("page changed sssto ", page)
    pagination.value.page = page
    refresh()
}
const { data, pending, refresh } = useAsyncData('packages', async () => {
    const { $api } = useNuxtApp()
    const res = await $api.get(`/package?page=${pagination.value.page || 1}&perPage=${pagination.value.perpage}`)
    pagination.value.total = res?.data?.data?.total
    pagination.value.page = res?.data?.data?.page
    return res

}, {
    default: () => ({ data: [] }),
    server: false // 👈 VERY important for hydration mismatch
});
const formData = ref<Record<string, any>>({
    name: null,
    price: null,
    included: [],
    excluded: [],
    highlights: [],
    tripIds: [],
})
const errors = ref<Record<string, string | null>>({
    name: null,
    price: null,
})
const modalType = ref<"add" | "edit">("add")
const selectedId = ref<number | null>(null)
const { validateRequiredInput, resetValues, resetErrors } = useValidation(formData.value, errors.value, ['name', 'price'])
const buttonLoading = ref<boolean>(false)
const getTripsTypes = async () => {
    try {
        const res = await getTrips()

        selectedTrips.value = res.data.map((t: any) => ({
            id: t.id,
            value: t.name
        }))
    } catch (err) {

    }
}
const included = ref([{
    model: '',
    errors: ""
},]);
const excluded = ref([{
    model: '',
    errors: ""
},]);
const highlights = ref([{
    model: '',
    errors: ""
},]);
getTripsTypes()
const FormInupts = ref([{
    id: 'name',
    type: "string",
    model: 'name',
    disabled: false,
    palceholder: "ادخل  اسم الباقة",
    label: "اسم الباقة",
    required: true,
    error: 'name'
}, {
    id: 'price',
    type: "number",
    model: 'price',
    disabled: false,
    palceholder: "ادخل سعر الباقة",
    label: "سعر الباقة",
    required: true,
    error: 'price'
},])
const openModal = ref(false)
const cols = ref([{
    key: 'name',
    value: ' الباقة ',
}, {
    key: 'price',
    value: 'السعر',
}, {
    key: 'trips',
    value: 'الرحلات',
    slot: "trips"
}, {
    key: 'actions',
    value: ' الاجراءات',
    slot: "actions"
},
])
const rows = computed(() => {
    console.log("data.value", data.value)
    if (!data.value) return [];
    return data.value.data.map((T: any) => ({
        id: { value: T.id, class: '' },
        name: { value: T.name, class: '' },
        tripName: { value: T.trips.name, class: '' },
        tripType: { value: T.trips?.tripType?.type, class: '' },
        price: { value: T.price, class: '' },

    }))
})
const submit = async () => {
    const valid = validateRequiredInput()
    buttonLoading.value = true
    if (!valid) return; buttonLoading.value = true;
    formData.value.included = included.value.map(i => i.model)
    formData.value.excluded = excluded.value.map(i => i.model)
    formData.value.highlights = highlights.value.map(i => i.model)

    try {
        modalType.value === 'add' ? await addPackage(formData.value) : await editPackage(selectedId.value as number, formData.value)
        addToast("تم انشاء الباقة بنجاح ", "success")
        resetValues()
        resetErrors()
        refresh()
        openModal.value = false
    } catch (error) {
        addToast("حدث خطأ اثناء انشاء الحجز  ", "error")
        console.log(error)
    } finally {
        buttonLoading.value = false
    }
}

const openOverly = (id: number, type: 'add' | 'edit') => {
    modalType.value = type
    openModal.value = true;
    selectedId.value = id
    if (type === 'edit') {
        const reservation = data.value.data.find((T: any) => T.id === id)
        formData.value.name = reservation.name
        formData.value.price = Number(reservation.price)
        formData.value.tripIds = reservation.trips.map((t: any) => t.id)
        included.value = reservation.included.map((i: string) => ({
            model: i,
            errors: ''
        }))
        excluded.value = reservation.excluded.map((i: string) => ({
            model: i,
            errors: ''
        }))
        highlights.value = reservation.highlights.map((i: string) => ({
            model: i,
            errors: ''
        }))
    }
    else {
        formData.value.name = null
        formData.value.price = null
        formData.value.tripIds = []
        included.value = [{
            model: '',
            errors: ''
        }]
        excluded.value = [{
            model: '',
            errors: ''
        }]
        highlights.value = [{
            model: '',
            errors: ''
        }]
    }
}
const removePackage = async (id: number) => {
    try {
        await deletePackage(id)
        addToast("تم حذف الباقة بنجاح", "success")
        refresh()
    } catch (error) {
        addToast("حدث خطأ اثناء حذف الباقة ", "error")
        console.log(error)
    }
}


</script>