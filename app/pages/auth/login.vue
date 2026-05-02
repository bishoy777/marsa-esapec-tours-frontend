<template>
    <div class="login-container">
        <div class="login-box">
            <div class="logo-section">
                <h1>تسجيل الدخول</h1>
                <p>مرحباً بك مجدداً في مرسي إسكيب تورز</p>
            </div>
            <div class="form-group">
                <label for="email">اسم المستخدم</label>
                <input id="email" v-model="formData.name" type="string" placeholder="أدخل بريدك الإلكتروني" />
                <p class="w-full h-2 text-red-500">{{ errors.name }}</p>
            </div>
            <div class="form-group">
                <label for="password">كلمة المرور</label>
                <input id="password" v-model="formData.password" type="password" placeholder="أدخل كلمة المرور" />
                <p class="w-full h-2 text-red-500">{{ errors.password }}</p>
            </div>
            <button type="submit" @click="handleLogin" class="login-btn"
                :class="{ ' !cursor-not-allowed !opacity-70': loading }">دخول</button>
        </div>
    </div>
</template>
<script setup lang="ts">
import { useValidation } from '@/composables/useValidation';
import { login } from "@/services/login"
import { useRouter } from 'vue-router';
import { C } from 'vue-router/dist/router-CWoNjPRp.mjs';
definePageMeta({
    layout: false
})
const router = useRouter()
const loading = ref<Boolean>(false)
const formData = ref({
    name: null,
    password: null
})
const errors = ref({
    name: null,
    password: null
})
const { validateRequiredInput, resetValues, resetErrors } = useValidation(formData.value, errors.value, ['name', 'password'])
const handleLogin = async () => {
    const isValid = validateRequiredInput()
    if (!isValid) return

    resetErrors()
    loading.value = true
    try {
        console.log("config.public.apiBase");
        const response = await login({
            name: "zakaria",
            password: "password"
        })
        console.log(response);
        const token = useCookie("token")
        token.value = response.data.user.token
        router.push('/')
    } catch (Err) {
        console.log(Err);
    }
    finally {
        loading.value = false
        resetValues()


    }


}
</script>

<style scoped>
.login-container {
    min-height: 100vh;
    background: linear-gradient(135deg, #f5f7fa 0%, #f2e7db 100%);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 20px;
}

.login-box {
    background: white;
    border-radius: 12px;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 400px;
    padding: 40px;
}

.logo-section {
    text-align: center;
    margin-bottom: 30px;
}

.logo-section h1 {
    font-size: 32px;
    color: #f08821;
    margin-bottom: 8px;
    font-weight: 700;
}

.logo-section p {
    color: #666;
    font-size: 14px;
}

.login-form {
    margin-bottom: 20px;
}

.form-group {
    margin-bottom: 20px;
}

.form-group label {
    display: block;
    margin-bottom: 8px;
    color: #333;
    font-weight: 500;
    font-size: 14px;
}

.form-group input {
    width: 100%;
    padding: 12px;
    border: 2px solid #e0e0e0;
    border-radius: 8px;
    font-size: 14px;
    transition: all 0.3s ease;
}

.form-group input:focus {
    outline: none;
    border-color: #f08821;
    box-shadow: 0 0 0 3px rgba(240, 136, 33, 0.1);
}

.remember-forgot {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    font-size: 14px;
}

.checkbox {
    display: flex;
    align-items: center;
    cursor: pointer;
    color: #555;
}

.checkbox input {
    margin-right: 6px;
    cursor: pointer;
}

.forgot-link {
    color: #f08821;
    text-decoration: none;
    transition: color 0.3s ease;
}

.forgot-link:hover {
    color: #d96b0f;
}

.login-btn {
    width: 100%;
    padding: 12px;
    background: #f08821;
    color: white;
    border: none;
    border-radius: 8px;
    font-size: 16px;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
}

.login-btn:hover {
    background: #d96b0f;
    transform: translateY(-2px);
    box-shadow: 0 5px 20px rgba(240, 136, 33, 0.4);
}

.signup-link {
    text-align: center;
    color: #666;
    font-size: 14px;
}

.signup-link a {
    color: #f08821;
    text-decoration: none;
    font-weight: 600;
    transition: color 0.3s ease;
}

.signup-link a:hover {
    color: #d96b0f;
}
</style>