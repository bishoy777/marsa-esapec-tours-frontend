<template>
    <section>
        <div class="bg-gray-50 py-10">
            <section id="table">
                <UiTableBaseTable :cols="cols" :rows="rows" :loading="pending" :pagination="pagination" />
            </section>
        </div>
    </section>
</template>
<script lang="ts" setup>
definePageMeta({
    middleware: 'auth'
})
const pagination = {
    page: 1,
    perPage: 10,
    total: 1
}
const cols = ref([{
    key: 'name',
    value: 'name'
},
]);
const { data, pending } = useAsyncData('users', async () => {
    const { $api } = useNuxtApp()
    return await $api.get('/users')
}, {
    default: () => ({ data: [] }),
    server: false // 👈 VERY important for hydration mismatch
});
const rows = computed(() => {
    if (!data.value) return []
    return data.value.data.map((user: any) => ({
        name: { value: user.name, class: '' }
    }))
})
</script>