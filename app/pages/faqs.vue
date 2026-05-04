<template>
    <section>
        <!-- ADD BUTTON -->
        <div class="flex justify-end p-4">
            <button @click="openoverly(0, 'add')"
                class="flex items-center gap-2 bg-primary font-medium hover:bg-primary/90 text-gray-500 px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md transition duration-200">
                اضافة سؤال
            </button>
        </div>
        <div class="flex flex-wrap gap-3 p-6 bg-gray-50 rounded-xl">
            <button @click="changeType('faqs')" :class="buttonClass('faqs')">
                اسئلة بخصوص الرحلات
            </button>

            <button @click="changeType('taxifaqs')" :class="buttonClass('taxifaqs')">
                اسئلة بخصوص التاكسي
            </button>

            <button @click="changeType('simfaqs')" :class="buttonClass('simfaqs')">
                اسئلة بخصوص خط الانترنت
            </button>
        </div>
        <!-- MODAL -->
        <UiBaseOverlay :open-modal="openModal">
            <UiBaseFormModal @close="openModal = false" title="FAQ">
                <template #form>
                    <template v-for="input in FormInupts" :key="input.id">
                        <UiFormBaseInput :id="input?.id" :required="input?.required" :placeholder="input?.placeholder"
                            :disabled="false" v-model="formData[input?.model]" :type="input?.type" :label="input?.label"
                            :error="errors[input?.error]" />
                    </template>

                    <UiBaseButton :loading="buttonLoading" @save="submit" />
                </template>
            </UiBaseFormModal>
        </UiBaseOverlay>

        <!-- TABLE -->
        <div class="bg-gray-50 py-10">
            <UiTableBaseTable :cols="cols" :rows="rows" :loading="pending" :pagination="pagination">
                <template #actions="{ row }">
                    <!-- <button class="btn" @click="openoverly(row.id.value, 'edit')">
                        <font-awesome-icon :icon="faPen" />
                    </button> -->

                    <button class="btn mx-3" @click="removeFaq(row.id.value)">
                        <font-awesome-icon :icon="faTrash" />
                    </button>
                </template>
            </UiTableBaseTable>
        </div>
    </section>
</template>

<script setup lang="ts">
import { addFaq, deleteFaq } from "@/services/trips";
import { useValidation } from "@/composables/useValidation";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import { useToast } from "@/composables/useToast";
const pagination = {
    page: 1,
    perPage: 10,
    total: 1
}
definePageMeta({
    middleware: "auth",
});
const url = ref<string>('faqs')
const { addToast } = useToast();
const buttonClass = (type: string) => {
    const isActive = url.value === type;

    return [
        "px-5 py-2.5 rounded-lg border transition duration-200",

        isActive
            ? "bg-danger/90 text-white border-primary shadow-md"
            : "bg-white text-gray-700 border-gray-200 hover:bg-gray-100 hover:border-gray-300",
    ];
};
/* GET DATA */
const { data, pending, refresh } = useAsyncData(
    "faqs",
    async () => {
        const { $api } = useNuxtApp();
        switch (url.value) {
            case 'faqs':
                return await $api.get("/faqs");
            case 'taxifaqs':
                return await $api.get("/taxifaqs");
            case 'simfaqs':
                return await $api.get("/simfaqs");
        }

    },
    {
        default: () => ({ data: [] }),
        server: false,
    }
);

/* FORM STATE */
const formData = ref<Record<string, string | null>>({
    question: null,
    answer: null,
});

const errors = ref<Record<string, string | null>>({
    question: null,
    answer: null,
});

const { validateRequiredInput, resetValues, resetErrors } = useValidation(
    formData.value,
    errors.value,
    ["question", "answer"]
);

const buttonLoading = ref(false);
const modalType = ref<"add" | "edit">("add");
const selectedId = ref<number | null>(null);
const openModal = ref(false);

/* INPUTS */
const FormInupts = ref([
    {
        id: "question",
        type: "text",
        model: "question",
        placeholder: "ادخل السؤال",
        label: "السؤال",
        required: true,
        error: "question",
    },
    {
        id: "answer",
        type: "text",
        model: "answer",
        placeholder: "ادخل الاجابة",
        label: "الاجابة",
        required: true,
        error: "answer",
    },
]);

/* TABLE */
const cols = ref([
    { key: "question", value: "السؤال" },
    { key: "answer", value: "الاجابة" },
    { key: "actions", value: "الاجراءات", slot: "actions" },
]);

const rows = computed(() => {
    if (!data.value) return [];
    return data.value.data.map((item: any) => ({
        id: { value: item.id },
        question: { value: item.question },
        answer: { value: item.answer },
    }));
});

/* SUBMIT */
const submit = async () => {
    const valid = validateRequiredInput();
    buttonLoading.value = true;

    if (!valid) {
        buttonLoading.value = false;
        return;
    }

    try {

        await addFaq(url.value, formData.value);
        addToast("تمت اضافة السؤال بنجاح", "success");

        resetValues();
        refresh();
        openModal.value = false;
    } catch (error) {
        addToast("حدث خطأ", "error");

    } finally {
        buttonLoading.value = false;
    }
};

/* OPEN MODAL */
const openoverly = (id: number, type: "add" | "edit") => {
    resetErrors();
    resetValues();

    modalType.value = type;
    openModal.value = true;
    selectedId.value = id;

    if (type === "edit") {
        const item = data.value?.data?.find((f: any) => f.id === id);
        if (!item) return;

        formData.value.question = item.question;
        formData.value.answer = item.answer;
    }
};

/* DELETE */
const removeFaq = async (id: number) => {
    try {
        await deleteFaq(url.value, id);
        addToast("تم حذف السؤال بنجاح", "success");
        refresh();
    } catch (error) {
        addToast("حدث خطأ اثناء الحذف", "error");

    }
};
const changeType = (type: string) => {
    url.value = type
    refresh()
}
</script>