<template>
    <UiBaseOverlay :open-modal="openModal">
        <UiBaseFormModal @close="openModal = false" title="الرحلات"> <template #form>
                <template v-for="input in FormInupts" :key="input.id">
                    <UiFormBaseInput v-if="input.type != 'select'" :id="input.id" :required="input.required"
                        :placeholder="input.palceholder" :disabled="false" v-model="formData[input.model]"
                        :type="input.type" :label="input.label" :error="errors[input.error]" />
                    <UiFormBaseSelectInput v-else v-model="formData[input.model]" :select-options="selectedOptions"
                        :label="input.label" :required="input.required" :placeholder="input.palceholder"
                        :disabled="false" id="78a" :error="errors[input.error]" />
                </template>
                <UiBaseButton :loading="buttonLoading" @save="submit" />
            </template>
        </UiBaseFormModal>
    </UiBaseOverlay>
    <div class="bg-gray-50 py-10">
    </div>
</template>

<script setup lang="ts">
import { useValidation } from '@/composables/useValidation'
const formData = ref<Record<string, string | null>>({
    tripName: null,
    tirpProgram: null,
    tripPrice: null,
    tripNumber: null
})
const errors = ref<Record<string, string | null>>({
    tripName: null,
    tirpProgram: null,
    tripPrice: null
})
const { validateRequiredInput, resetValues } = useValidation(formData.value, errors.value, ['tripName', 'tirpProgram', 'tripNumber'])
const selectedOptions = ref<Record<string, string | number>[]>([{
    id: 1,
    value: 'elia'
}, {
    id: 5,
    value: 'zeko'
}, {
    id: 2,
    value: 'rezk'
},])
const buttonLoading = ref<boolean>(false)

const FormInupts = ref([{
    id: 'trip_name',
    type: "string",
    model: 'tripName',
    disabled: false,
    palceholder: "ادخل اسم الرحلة",
    label: "اسم الرحلة",
    required: true,
    error: 'tripName'
},
{
    id: 'trip_program',
    type: "string",
    model: 'tirpProgram',
    disabled: false,
    palceholder: "ادخل برنامج الرحلة",
    label: "برنامج الرحلة",
    required: true,
    error: 'tirpProgram'
}, {
    id: 'trip_number',
    type: "select",
    selectOptions: selectedOptions.value,
    model: 'tripNumber',
    disabled: false,
    palceholder: "ادخل رقم الرحلة",
    label: "رقم الرحلة",
    required: true,
    error: 'tripNumber'
}])
const openModal = ref(true)
const cols = ref([{
    key: 'name',
    value: 'name'
},
{
    key: 'role',
    value: 'role'
}, {
    key: 'dream',
    value: 'dream'
}
])
const rows = ref([{
    name: { value: 'elia', class: "" },

}, { name: { value: 'rezk' } }])
const submit = () => {
    validateRequiredInput()
    console.log(formData.value)
    console.log(errors.value)
}
</script>