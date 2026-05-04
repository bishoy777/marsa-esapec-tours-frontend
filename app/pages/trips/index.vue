<template>
    <section>
        <div class="flex justify-end p-4">
            <button @click="openOverlay(0, 'form')" class=" flex items-center gap-2 bg-primary font-medium hover:bg-primary/90 text-gray-500 px-5 py-2.5
                rounded-xl shadow-sm hover:shadow-md transition duration-200">
                اضافة رحلة
            </button>
        </div>
        <section id="render_hidden_details">
            <UiBaseOverlay :open-modal="openModal">
                <UiBaseFormModal @close="openModal = false" title="الرحلات">
                    <template v-if="modalType === 'form' || modalType == 'edit'" #form>
                        <template v-for="input in FormInupts" :key="input.id">
                            <UiFormBaseInput v-if="input.type != 'select'" :id="input.id" :required="input.required"
                                :placeholder="input.palceholder" :disabled="false" v-model="formData[input.model]"
                                :type="input.type" :label="input.label" :error="errors[input.error]" />
                            <UiFormBaseSelectInput v-else v-model="formData[input.model]"
                                :select-options="selectedOptions" :label="input.label" :required="input.required"
                                :placeholder="input.palceholder" :disabled="false" id="78a"
                                :error="errors[input.error]" />
                        </template>
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
                            <label class="block text-center text-emerald-600 font-semibold mb-2">الاماكن</label>
                            <template v-for="(i, index) in places" :key="index">
                                <div
                                    class="relative bg-white/80 backdrop-blur border border-emerald-200 rounded-xl p-2 mb-2 shadow-sm">
                                    <button class="absolute left-2 top-2 text-red-400 hover:text-red-600"
                                        @click="places.splice(index, 1)">
                                        ❌
                                    </button>
                                    <UiFormBaseInput :id="index" :required="true"
                                        placeholder="اكتب اماكن الزيارة في الرحلة" :disabled="false" v-model="i.model"
                                        type="string" :label="`رقم ${index + 1}`" :error="i.errors" />
                                </div>
                            </template>
                            <button @click="places.push({
                                model: '',
                                errors: ''
                            })" class=" w-full text-emerald-600 hover:text-emerald-800 font-medium transition">
                                ➕ إضافة
                            </button>
                        </div>
                        <div class="bg-gradient-to-br from-yellow-50 to-yellow-100 my-2 py-3 rounded-2xl shadow-sm">
                            <label class="block text-center text-blue-600 font-semibold mb-2">
                                الايام
                            </label>
                            <template v-for="(day, index) in days" :key="index">
                                <div
                                    class="relative  backdrop-blur border border-yellow-200 rounded-xl p-3 mb-4 shadow">
                                    <div
                                        class="flex items-center justify-between bg-white/80 backdrop-blur border border-gray-200 rounded-xl px-4 py-2 shadow-sm my-2">
                                        <p class="text-gray-700 font-semibold">
                                            يوم رقم <span class="text-gray-200 font-bold">{{ index + 1 }}</span>
                                        </p>
                                        <button class="flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm font-medium 
               bg-red-50 text-red-600 border border-red-200
               hover:bg-red-100 hover:text-red-700 transition" @click="days.splice(index, 1)">
                                            ❌ حذف اليوم
                                        </button>
                                    </div>
                                    <div class="bg-blue-50 relative border border-blue-100 rounded-xl p-3 mb-3">

                                        <p class="text-blue-600 font-medium mb-2">الصباح</p>
                                        <template v-for="(period, index) in day.morning" :key="index">
                                            <div class="relative"><button
                                                    class="absolute left-2 top-2 text-red-400 hover:text-red-600"
                                                    @click="day.morning.splice(index, 1)"
                                                    :disabled="day.morning.length == 1">
                                                    ❌
                                                </button>
                                                <UiFormBaseInput :id="index" :required="true"
                                                    placeholder="اكتب نشاط في الصباح" :disabled="false"
                                                    v-model="period.model" type="string" :label="`رقم ${index + 1}`"
                                                    :error="period.errors" />
                                            </div>

                                            <button class="w-full text-blue-500 hover:text-blue-700 transition"
                                                @click="day.morning.push({ model: '', errors: '' })">
                                                ➕
                                            </button>
                                        </template>
                                    </div>
                                    <div class="bg-orange-50 border border-orange-100 rounded-xl p-3 mb-3">
                                        <p class="text-orange-600 font-medium mb-2">الظهيرة</p>
                                        <template v-for="(period, index) in day.afternoon" :key="index">
                                            <div class="relative"><button
                                                    class="absolute left-2 top-2 text-red-400 hover:text-red-600"
                                                    @click="day.afternoon.splice(index, 1)"
                                                    :disabled="day.afternoon.length == 1">
                                                    ❌
                                                </button>
                                                <UiFormBaseInput :id="index" :required="true"
                                                    placeholder="اكتب نشاط وقت الظهيرة" :disabled="false"
                                                    v-model="period.model" type="string" :label="`رقم ${index + 1}`"
                                                    :error="period.errors" />
                                            </div>
                                            <button class="w-full text-orange-500 hover:text-orange-700 transition"
                                                @click="day.afternoon.push({ model: '', errors: '' })">
                                                ➕
                                            </button>
                                        </template>
                                    </div>

                                    <!-- Evening -->
                                    <div class="bg-purple-50 border border-purple-100 rounded-xl p-3">
                                        <p class="text-purple-600 font-medium mb-2">المساء</p>
                                        <template v-for="(period, index) in day.evining" :key="index">
                                            <div class="relative"><button
                                                    class="absolute left-2 top-2 text-red-400 hover:text-red-600"
                                                    @click="day.evining.splice(index, 1)"
                                                    :disabled="day.evining.length == 1">
                                                    ❌
                                                </button>
                                                <UiFormBaseInput :id="index" :required="true"
                                                    placeholder="اكتب نشاط في المساء" :disabled="false"
                                                    v-model="period.model" type="string" :label="`رقم ${index + 1}`"
                                                    :error="period.errors" />
                                            </div>
                                        </template>

                                        <button class="w-full text-purple-500 hover:text-purple-700 transition"
                                            @click="day.evining.push({ model: '', errors: '' })">
                                            ➕
                                        </button>
                                    </div>
                                </div>
                            </template>
                            <button @click="addDay"
                                class="w-full bg-yellow-200 hover:bg-yellow-300 text-yellow-800 py-2 rounded-xl font-medium transition">
                                ➕ إضافة يوم
                            </button>
                        </div>
                        <UiBaseButton :loading="buttonLoading" @save="submit" />
                    </template>
                    <template #view v-else>
                        <component :is="component" v-bind="componentProps" @deleteImage="handleRemove"
                            @change-status="handleStatus" @addImage="handleAddImages">
                        </component>
                    </template>
                </UiBaseFormModal>
            </UiBaseOverlay>
        </section>
        <div class="bg-gray-50 py-10">
            <section id="table">
                <UiTableBaseTable :cols="cols" :rows="rows" :loading="pending" :pagination="pagination"
                    @changePage="changePage">
                    <template #reviews="{ row }"><button class="btn" @click="openOverlay(row.id.value, 'reviews')">
                            <font-awesome-icon :icon="faEye" />
                        </button></template> <template #days="{ row }"><button class="btn"
                            @click="openOverlay(row.id.value, 'program')">
                            <font-awesome-icon :icon="faEye" />
                        </button></template>
                    <template #package="{ row }"><button class="btn" @click="openOverlay(row.id.value, 'package')">
                            <font-awesome-icon :icon="faEye" />
                        </button></template> <template #images="{ row }"><button class="btn"
                            @click="openOverlay(row.id.value, 'images')">
                            <font-awesome-icon :icon="faEye" />
                        </button></template><template #actions="{ row }"><button class="btn"
                            @click="openOverlay(row.id.value, 'edit')">
                            <font-awesome-icon :icon="faPen" />
                        </button><button class="btn mx-3" @click="removeTrip(row.id.value)">
                            <font-awesome-icon :icon="faTrash" />
                        </button></template>
                </UiTableBaseTable>
            </section>
        </div>
    </section>
</template>
<script lang="ts" setup>
import {
    faEye, faPen, faTrash
} from '@fortawesome/free-solid-svg-icons'
import { deleteImage, addImage, getTripTypes, addTrip, deleteTrip, editTrip, edtiReviewStatus } from '~/services/trips';
definePageMeta({
    middleware: 'auth'
})
import { useToast } from '@/composables/useToast';
const { addToast } = useToast()
const openModal = ref(false);
const selectedTripId = ref<number>()//fetch trips data

const pagination = ref({
    page: 1,
    perpage: 10,
    total: 1
})
const changePage = (page: number) => {

    pagination.value.page = page
    refresh()
}
const { data, pending, refresh } = useAsyncData('trips', async () => {
    const { $api } = useNuxtApp()
    const res = await $api.get(`/trip?page=${pagination.value.page || 1}&perPage=${pagination.value.perpage || 10}`)

    pagination.value = res?.data?.pagination
    return res
}, {
    default: () => ({ data: [] }),
    server: false // 👈 VERY important for hydration mismatch
},);
const cols = ref([{
    key: 'name',
    value: 'الاسم',
}, {
    key: 'type',
    value: 'نوع الرحلة',
}, {
    key: 'price',
    value: 'السعر',
}, {
    key: 'reviews',
    value: 'التقيمات',
    slot: "reviews"
}, {
    key: 'days',
    value: 'البرنامج',
    slot: "days"
}, {
    key: 'package',
    value: 'نظرة عامة',
    slot: "package"
}, {
    key: 'images',
    value: 'الصور',
    slot: "images"
}, {
    key: 'actions',
    value: 'الاجراءات',
    slot: "actions"
},
])

const rows = computed(() => {
    return data.value?.data?.data?.map((T: any) => ({
        id: { value: T.id, class: '' },
        name: { value: T.name, class: '' },
        type: { value: T.tripType?.type, class: 'bg-blue-100 text-blue-600 px-2 py-1 rounded' },
        price: { value: T.price, class: '' },
        reviews: { value: T.reviews, class: '' },
        days: { value: T.days, class: '' },
        included: { value: T.included, class: '' },
        excluded: { value: T.excluded, class: '' },
        images: { value: T.images, class: '' },
        places: { value: T.places, class: '' },
        overview: { value: T.overview, class: '' }
    }))
})
type component = 'reviews' | 'package' | 'images' | 'program' | 'places' | 'form' | 'edit'
const modalType = ref<component>('program')
const component = computed(() => {
    switch (modalType.value) {
        case 'reviews': { return resolveComponent('CommonTripsReviews') }
        case 'program': { return resolveComponent('CommonTripsProgram') }
        case 'package': { return resolveComponent('CommonTripsPackage') }
        case 'images': { return resolveComponent('CommonTripsImages') }
    }
}
)
const componentProps = computed(() => {

    const rowData = rows.value.find((r: any) => {
        return r.id.value === selectedTripId.value
    })
    switch (modalType.value) {
        case 'reviews':
            return { reviews: rowData?.reviews.value }
        case 'program':
            return { program: rowData?.days.value }
        case 'package':
            return {
                included: rowData?.included.value,
                excluded: rowData?.excluded.value,
                places: rowData?.places.value,
                overview: rowData?.overview.value,
            }
        case 'images':
            return {
                id: rowData.id.value,
                images: rowData?.images.value,

            }
    }
})
const openOverlay = (id: number = 0, type: component) => {
    modalType.value = type
    selectedTripId.value = id
    openModal.value = true
    resetErrors()
    if (type === 'edit') {
        const rowData = rows.value.find((r: any) => {
            return r.id.value === selectedTripId.value
        })
        formData.value.name = rowData?.name.value
        formData.value.price = rowData?.price.value
        formData.value.overview = rowData?.overview.value
        formData.value.tripTypeId = selectedOptions.value.find((o: any) => o.value === rowData?.type.value)?.id || null
        included.value = rowData?.included.value.map((i: string) => ({
            model: i,
            errors: ''
        }))
        excluded.value = rowData?.excluded.value.map((i: string) => ({
            model: i,
            errors: ''
        }))
        places.value = rowData?.places.value.map((i: string) => ({
            model: i,
            errors: ''
        }))
        days.value = rowData?.days.value.map((d: any) => ({
            morning: d.morning.map((p: string) => ({
                model: p,
                errors: ''
            })),
            afternoon: d.afternoon.map((p: string) => ({
                model: p,
                errors: ''
            })),
            evining: d.evining.map((p: string) => ({
                model: p,
                errors: ''
            }))
        }))
    } else {
        formData.value.name = null
        formData.value.price = null
        formData.value.overview = null
        formData.value.tripTypeId = null
        included.value = [{
            model: '',
            errors: ""
        },];
        excluded.value = [{
            model: '',
            errors: ""
        },];
        places.value = [{
            model: '',
            errors: ""
        },];
        days.value = [{

            morning: [{
                model: '',
                errors: ""
            }], afternoon: [{
                model: '',
                errors: ""
            }], evining: [{
                model: '',
                errors: ""
            }]

        },]
    }
};
import { useValidation } from '@/composables/useValidation'
const formData = ref<Record<string, any>>({
    name: null,
    price: null,
    overview: null,
    tripTypeId: null,
    included: [],
    excluded: [],
    places: [],
    days: []
})
const included = ref([{
    model: '',
    errors: ""
},]);
const excluded = ref([{
    model: '',
    errors: ""
},]);
const places = ref([{
    model: '',
    errors: ""
},]);
const days = ref([{
    morning: [{
        model: '',
        errors: ""
    }], afternoon: [{
        model: '',
        errors: ""
    }], evining: [{
        model: '',
        errors: ""
    }]

},])
const addDay = () => {
    days.value.push({

        morning: [{
            model: '',
            errors: ""
        }], afternoon: [{
            model: '',
            errors: ""
        }], evining: [{
            model: '',
            errors: ""
        }]

    })
}
const errors = ref<Record<string, string | null>>({
    tripTypeId: null,
    overview: null,
    price: null,
    name: null
})
const { validateRequiredInput, resetValues, resetErrors } = useValidation(formData.value, errors.value, ['tripTypeId', 'overview', 'price', 'name'])
const selectedOptions = ref<Record<string, string | number>[]>([{}])
const buttonLoading = ref<boolean>(false)
const getTripsTypes = async () => {
    try {
        const res = await getTripTypes()

        selectedOptions.value = res.data.map((t: any) => ({
            id: t.id,
            value: t.type
        }))
    } catch (err) {

    }
}
onMounted(() => {
    getTripsTypes()
});
const FormInupts = ref([{
    id: 'name',
    type: "string",
    model: 'name',
    disabled: false,
    palceholder: "ادخل اسم الرحلة",
    label: "اسم الرحلة",
    required: true,
    error: 'name'
},
{
    id: 'overview',
    type: "textarea",
    model: 'overview',
    disabled: false,
    palceholder: " اكتب هنا ",
    label: "نظرة عامة",
    required: true,
    error: 'overview'
}, {
    id: 'price',
    type: "number",
    model: 'price',
    disabled: false,
    palceholder: "ادخل السعر",
    label: "السعر",
    required: true,
    error: 'price'
},
{
    id: 'trip_type',
    type: "select",
    selectOptions: selectedOptions.value,
    model: 'tripTypeId',
    disabled: false,
    palceholder: "ادخل نوع الرحلة",
    label: " نوع الرحلة",
    required: true,
    error: 'tripTypeId'
}])
const handleRemove = async (id: number) => {
    if (!data.value) return
    const tripIndex = data.value.data?.data.findIndex(
        (trip: any) => trip.id === selectedTripId.value
    )
    const backupImages = [...data.value.data?.data[tripIndex].images]
    if (tripIndex === -1) return
    data.value.data.data[tripIndex].images =
        data.value.data?.data[tripIndex].images.filter(
            (img: any) => img.id !== id
        )
    data.value = { ...data.value, ...data.value?.data?.data }
    try {
        const res = await deleteImage(id)
        addToast('تم حذف الصورة بنجاح', 'success')
    } catch (err) {
        addToast(' حدث خطاء اثناء حذف الصورة', 'error')
        if (data.value) {
            data.value.data.data[tripIndex].images = backupImages
            data.value = {
                ...data.value, ...data.value?.data?.data
            }
        }
    }
}
const handleAddImages = async (FormData: Event) => {
    try {
        const res = await addImage(selectedTripId.value as number, FormData)
        addToast('نم اضافة الصورة بنجاح', 'success')
        refresh()
    } catch (err) {

    }
};
const handleStatus = async ({ id, status }: { id: number; status: string }) => {
    try {

        await edtiReviewStatus(id, { status: status })

        addToast('تم تغيير حالة التقييم بنجاح', 'success')
        refresh()

    } catch (error) {
        console.error(error)
    }
}
const submit = async () => {
    const valid = validateRequiredInput()
    if (!valid) {
        addToast('يرجى ملئ الحقول المطلوبة', 'error')
        return
    }
    formData.value.included = included.value.map(i => i.model)
    formData.value.excluded = excluded.value.map(i => i.model)
    formData.value.places = places.value.map(i => i.model)

    formData.value.days = days.value.map(d => ({
        morning: d.morning.map(p => p.model),
        afternoon: d.afternoon.map(p => p.model),
        evining: d.evining.map(p => p.model)
    }))
    try {
        buttonLoading.value = true

        const res = modalType.value === 'form' ? await addTrip(formData.value) : await editTrip(selectedTripId.value, formData.value)
        addToast('تم اضافة الرحلة بنجاح', 'success')
        resetValues()
        resetErrors()
        included.value = [{
            model: '',
            errors: ""
        },];
        excluded.value = [{
            model: '',
            errors: ""
        },];
        places.value = [{
            model: '',
            errors: ""
        },];
        days.value = [{

            morning: [{
                model: '',
                errors: ""
            }], afternoon: [{
                model: '',
                errors: ""
            }], evining: [{
                model: '',
                errors: ""
            }]

        },]
        refresh()
    } catch (err) {
        addToast('حدث خطاء اثناء اضافة الرحلة', 'error')
    } finally {
        buttonLoading.value = false
    }
}
const removeTrip = async (id: number) => {
    if (!data.value) return
    const backupTrips = [...data.value.data?.data]
    data.value.data = data.value.data?.data.filter((t: any) => t.id !== id)
    try {
        const res = await deleteTrip(id)
        addToast('تم حذف الرحلة بنجاح', 'success')
        await refresh()
    } catch (err) {
        addToast('حدث خطاء اثناء حذف الرحلة', 'error')
        data.value.data = backupTrips
    }
}   
</script>