<template>
    <section>
        <div class="flex justify-end p-4">
            <button @click="openoverly()" class=" flex items-center gap-2 bg-primary font-medium hover:bg-primary/90 text-gray-500 px-5 py-2.5
                rounded-xl shadow-sm hover:shadow-md transition duration-200">
                اضافة تقييم
            </button>
        </div>
        <section id="render_hidden_details">
            <UiBaseOverlay :open-modal="openModal">
                <UiBaseFormModal @close="openModal = false" title="تقييمات خطوط الموبايل">
                    <template #form>
                        <template v-for="input in FormInupts" :key="input.id">
                            <UiFormBaseInput v-if="input.type != 'select'" :id="input.id" :required="input.required"
                                :placeholder="input.palceholder" :disabled="false" v-model="formData[input.model]"
                                :type="input.type" :label="input.label" :error="errors[input.error]" />
                            <UiFormBaseSelectInput v-else v-model="formData[input.model]"
                                :select-options="selectedOptions" :label="input.label" :required="input.required"
                                :placeholder="input.palceholder" :disabled="false" id="78a"
                                :error="errors[input.error]" />
                        </template>
                        <UiBaseButton :loading="buttonLoading" @save="submit" />
                    </template>
                </UiBaseFormModal>
            </UiBaseOverlay>
        </section>
        <div class="bg-gray-50 py-10">
            <section id="table">
                <UiTableBaseTable :cols="cols" :rows="rows" :loading="pending" :pagination="pagination"><template
                        #edit="{ row }">

                        <div class="flex  gap-2">
                            <!-- Accept -->
                            <button :disabled="row.status === 'accepted'" class="px-3 py-1 text-sm rounded-lg" :class="row.status == 'accepted'
                                ? 'bg-gray-300 cursor-not-allowed'
                                : 'bg-green-500 text-white hover:bg-green-600'"
                                @click="changeStatus({ id: row.id.value, status: 'accepted' })">
                                قبول
                            </button>

                            <!-- Reject -->
                            <button
                                class="px-3 py-1 text-sm rounded-lg bg-red-500 text-white hover:bg-red-600 transition"
                                @click="changeStatus({ id: row.id.value, status: 'rejected' })">
                                رفض
                            </button>

                        </div>
                    </template><template #actions="{ row }">

                        <button class="btn mx-3" @click="removeTripReview(row.id.value)">
                            <font-awesome-icon :icon="faTrash" />
                        </button>
                    </template>
                </UiTableBaseTable>
            </section>
        </div>
    </section>
</template>

<script setup lang="ts">
import { addSimcardReview, deleteSimcardReview, edtiSimcardsReviewStatus } from "@/services/trips";
import { useValidation } from '@/composables/useValidation'; import {
    faPen, faTrash
} from '@fortawesome/free-solid-svg-icons'
import { useToast } from "@/composables/useToast";
definePageMeta({
    middleware: 'auth'
})
const pagination = {
    page: 1,
    perPage: 10,
    total: 1
}
const { addToast } = useToast();
const selectedOptions = ref<Record<string, string | number>[]>([{}])
// const { data, pending, refresh } = useAsyncData('trips', async () => {
//     const { $api } = useNuxtApp()
//     return await $api.get('/trip-type')
// });
const { data, pending, refresh } = useAsyncData(
    'simcardreviews',
    async () => {
        const { $api } = useNuxtApp()
        return await $api.get('/simcardreviews')
    },
    {
        default: () => ({ data: [] }),
        server: false // 👈 VERY important for hydration mismatch
    }
)
const formData = ref<Record<string, string | null>>({
    userName: null,
    rating: null,
    comment: null
})
const errors = ref<Record<string, string | null>>({
    userName: null,
    rating: null,
    comment: null
})

const { validateRequiredInput, resetValues, resetErrors } = useValidation(formData.value, errors.value, ['userName', 'rating', 'comment'])
const buttonLoading = ref<boolean>(false)
const FormInupts = ref([{
    id: 'userName',
    type: "string",
    model: 'userName',
    disabled: false,
    palceholder: "ادخل  اسم المستخدم",
    label: " اسم المستخدم",
    required: true,
    error: 'userName'
}, {
    id: 'rating',
    type: "number",
    model: 'rating',
    disabled: false,
    palceholder: "ادخل  التقييم",
    label: "التقييم",
    required: true,
    error: 'rating'
}, {
    id: 'comment',
    type: "string",
    model: 'comment',
    disabled: false,
    palceholder: "ادخل  التعليق",
    label: " التعليق",
    required: true,
    error: 'comment'
},])
const openModal = ref(false)
const cols = ref([{
    key: 'userName',
    value: 'اسم المستخدم',
}, {
    key: 'rating',
    value: 'التقييم',
}, {
    key: 'comment',
    value: 'التعليق',
}, {
    key: 'status',
    value: 'التعليق',
}, {
    key: 'edit',
    value: 'الاجراءات',
    slot: "edit"
}, {
    key: 'actions',
    value: 'الاجراءات',
    slot: "actions"
},
])
const rows = computed(() => {
    if (!data.value) return [];
    return data.value?.data?.map((T: any) => ({
        id: { value: T.id, class: '' },
        rating: { value: T.rating, class: '' },
        comment: { value: T.comment, class: '' },
        userName: { value: T.userName, class: '' },
        status: { value: T.status, class: 'bg-danger rounded-xl py-1 px-2 text-white' },
    }))
})
const submit = async () => {
    const valid = validateRequiredInput()
    buttonLoading.value = true
    if (!valid) return;
    try {
        const res = await addSimcardReview(formData.value)
        addToast("تمت اضافة   التقيمم", "success")
        resetValues()
        refresh()
        openModal.value = false
    } catch (error) {
        addToast("حدث خطأ اثناء اضافة التقيمم ", "error")

    } finally {
        buttonLoading.value = false
    }
}

const openoverly = () => {
    resetErrors()
    resetValues()
    openModal.value = true

}
const removeTripReview = async (id: number) => {
    try {
        await deleteSimcardReview(id)
        addToast("تم حذف  التقييم ", "success")
        refresh()
    } catch (error) {
        addToast("حدث خطأ اثناء التقييم ", "error")

    }
}
const changeStatus = async (param: any) => {
    try {
        await edtiSimcardsReviewStatus(param.id, { status: param.status })
        addToast("تم تغيير حالة  التقييم ", "success")
        refresh()
    } catch (error) {
        addToast("حدث خطأ اثناء تغيير حالة  التقييم ", "error")

    }
}
</script>