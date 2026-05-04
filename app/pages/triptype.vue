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
                        <UiBaseButton :loading="buttonLoading" @save="submit" />
                    </template>
                </UiBaseFormModal>
            </UiBaseOverlay>
        </section>
        <div class="bg-gray-50 py-10">
            <section id="table">
                <UiTableBaseTable :cols="cols" :rows="rows" :loading="pending" :pagination="pagination"><template
                        #actions="{ row }"><button class="btn" @click="openoverly(row.id.value, 'edit')">
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
import { addTripType, deleteTripType, editTripType } from "@/services/trips";
import { useValidation } from '@/composables/useValidation'; import {
    faPen, faTrash
} from '@fortawesome/free-solid-svg-icons'
import { useToast } from "@/composables/useToast";
const pagination = {
    page: 1,
    perPage: 10,
    total: 1
}
definePageMeta({
    middleware: 'auth'
})

const { addToast } = useToast()
// const { data, pending, refresh } = useAsyncData('trips', async () => {
//     const { $api } = useNuxtApp()
//     return await $api.get('/trip-type')
// });
const { data, pending, refresh } = useAsyncData(
    'trip-types',
    async () => {
        const { $api } = useNuxtApp()
        return await $api.get('/trip-type')
    },
    {
        default: () => ({ data: [] }),
        server: false // 👈 VERY important for hydration mismatch
    }
)
const formData = ref<Record<string, string | null>>({
    type: null
})
const errors = ref<Record<string, string | null>>({
    type: null
})
const modalType = ref<"add" | "edit">("add")
const selectedId = ref<number | null>(null)
const { validateRequiredInput, resetValues, resetErrors } = useValidation(formData.value, errors.value, ['type'])
const buttonLoading = ref<boolean>(false)
const FormInupts = ref([{
    id: 'type',
    type: "string",
    model: 'type',
    disabled: false,
    palceholder: "ادخل نوع الرحلة",
    label: "نوع الرحلة",
    required: true,
    error: 'type'
},])
const openModal = ref(false)
const cols = ref([{
    key: 'type',
    value: 'نوع الرحلة',
}, {
    key: 'actions',
    value: 'الاجراءات',
    slot: "actions"
},
])
const rows = computed(() => {

    if (!data.value) return [];
    return data.value.data.map((T: any) => ({
        id: { value: T.id, class: '' },
        type: { value: T.type, class: '' },
    }))
})
const submit = async () => {
    const valid = validateRequiredInput()
    buttonLoading.value = true
    if (!valid) return;
    try {
        const res = modalType.value === 'edit' ? await editTripType(selectedId.value, formData.value) : await addTripType(formData.value)
        addToast("تمت اضافة نوع الرحلة بنجاح", "success")
        resetValues()
        refresh()
        openModal.value = false
    } catch (error) {
        addToast("حدث خطأ اثناء اضافة نوع الرحلة", "error")

    } finally {
        buttonLoading.value = false
    }
}

const openoverly = (id: number, type: 'add' | 'edit') => {
    resetErrors()
    resetValues()
    modalType.value = type
    openModal.value = true
    selectedId.value = id
    if (!data.value) return
    formData.value.type = data.value?.data?.find((T: any) => T.id === id).type
}
const removeTripType = async (id: number) => {
    try {
        await deleteTripType(id)
        addToast("تم حذف نوع الرحلة بنجاح", "success")
        refresh()
    } catch (error) {
        addToast("حدث خطأ اثناء حذف نوع الرحلة", "error")

    }
}   
</script>