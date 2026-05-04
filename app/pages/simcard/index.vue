<template>
    <section>
        <div class="flex justify-end p-4">
            <button @click="openoverly(0, 'add')" class=" flex items-center gap-2 bg-primary font-medium hover:bg-primary/90 text-gray-500 px-5 py-2.5
                rounded-xl shadow-sm hover:shadow-md transition duration-200">
                اضافة خط موبايل
            </button>
        </div>
        <section id="render_hidden_details">
            <UiBaseOverlay :open-modal="openModal">
                <UiBaseFormModal @close="openModal = false" title="خطوط الموبايل">
                    <template #form>
                        <template v-for="input in FormInupts" :key="input.id">
                            <UiFormBaseInput v-if="input?.type != 'select'" :id="input?.id" :required="input?.required"
                                :placeholder="input?.palceholder" :disabled="false" v-model="formData[input?.model]"
                                :type="input?.type" :label="input?.label" :error="errors[input?.error]" />
                        </template>
                        <UiBaseButton :loading="buttonLoading" @save="submit" />
                    </template>
                </UiBaseFormModal>
            </UiBaseOverlay>
        </section>
        <div class="bg-gray-50 py-10">
            <section id="table">
                <UiTableBaseTable :cols="cols" :rows="rows" :loading="pending" :pagination="pagination"
                    @changePage="changePage"><template #actions="{ row }">
                        <button class="btn mx-3" @click="removeSimCard(row.id.value)">
                            <font-awesome-icon :icon="faTrash" />
                        </button></template>
                </UiTableBaseTable>
            </section>
        </div>
    </section>
</template>

<script setup lang="ts">
import { addSimCard, deleteSimCard } from "@/services/trips";
import { useValidation } from '@/composables/useValidation';
import {
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
const { data, pending, refresh } = useAsyncData(
    'simcards',
    async () => {
        const { $api } = useNuxtApp()
        const res = await $api.get(`/simcards?page=${pagination.value.page || 1}&perPage=${pagination.value.perpage || 10}`)
      pagination.value = res?.data?.pagination
        return res

    },
    {
        default: () => ({ data: [] }),
        server: false // 👈 VERY important for hydration mismatch
    }
)
const formData = ref<Record<string, string | null>>({
    price: null,
    capacity: null
})
const errors = ref<Record<string, string | null>>({
    price: null,
    capacity: null
})
const modalType = ref<"add" | "edit">("add")
const { validateRequiredInput, resetValues, resetErrors } = useValidation(formData.value, errors.value, ['price', 'capacity'])
const buttonLoading = ref<boolean>(false)
const FormInupts = ref([{
    id: 'capacity',
    type: "string",
    model: 'capacity',
    disabled: false,
    palceholder: "ادخل الباقة  ",
    label: " الباقة",
    required: true,
    error: 'capacity'
}, {
    id: 'price',
    type: "number",
    model: 'price',
    disabled: false,
    palceholder: " ادخل سعر الباقة",
    label: " سعر الباقة",
    required: true,
    error: 'price'
},
])
const openModal = ref(false)
const cols = ref([{
    key: 'capacity',
    value: 'الباقة',
}, {
    key: 'price',
    value: 'سعر الباقة',
}, {
    key: 'actions',
    value: 'الاجراءات',
    slot: "actions"
},
])
const rows = computed(() => {

    if (!data.value) return [];
    return data?.value?.data?.data?.map((T: any) => ({
        id: { value: T.id, class: '' },
        capacity: { value: T.capacity, class: '' },
        price: { value: T.price, class: '' },
    }))
})
const submit = async () => {
    const valid = validateRequiredInput()
    buttonLoading.value = true
    if (!valid) return;
    try {
        const res = await addSimCard(formData.value)
        addToast("نم اضافة الخط بنجاح    ", "success")
        resetValues()
        refresh()
        openModal.value = false
    } catch (error) {
        addToast("حدث خطأ  اضافة  الخط", "error")
         
    } finally {
        buttonLoading.value = false
    }
}

const openoverly = (id: number, type: 'add') => {
    resetErrors()
    resetValues()
    modalType.value = type
    openModal.value = true

}
const removeSimCard = async (id: number) => {
    try {
        await deleteSimCard(id)
        addToast("تم حذف   الخط", "success")
        refresh()
    } catch (error) {
        addToast("حدث خطأ  حذف  الخط", "error")
         
    }
}   
</script>