<template>
    <section id="layout" class="flex flex-row gap-2 md:gap-4 my-4 min-h-screen " dir="rtl">
        
        <!-- Sidebar -->
        <!-- Logic: w-20 for icons on mobile, w-72 for full text on desktop -->
        <aside class="w-20 sm:w-72 bg-primary relative py-6 h-full rounded-3xl flex flex-col transition-all duration-300 shadow-xl ">
            
            <!-- Logo Area -->
            <div class="flex justify-center mb-10 shrink-0">
                <Logo class="w-10 sm:w-32 transition-all" />
            </div>

            <!-- Sidebar Items Container -->
            <div class="flex-1  px-3 space-y-2 custom-scrollbar">
                <div v-for="i in items" :key="i.to" class="relative group">
                    
                    <NuxtLink :to="i.to"
                        class="flex items-center justify-center sm:justify-between rounded-xl sm:rounded-full p-3 sm:px-4 sm:py-2 text-white/70 transition-all duration-200 hover:bg-white/10 hover:text-white"
                        active-class="!bg-white !text-blue-600 font-bold shadow-md active-link">
                        
                        <!-- Desktop Text (Hidden on mobile) -->
                        <p class="hidden sm:inline text-sm whitespace-nowrap">{{ i.text }}</p>

                        <!-- Icon (Always visible) -->
                        <div class="flex items-center justify-center w-6 h-6">
                            <font-awesome-icon :icon="i.icon" class="text-lg sm:text-base" />
                        </div>

                        <!-- Mobile Pop-out Text (The "Hover" effect) -->
                        <!-- 
                          This div is positioned to the LEFT of the sidebar.
                          It uses a dark background and white text for maximum readability.
                        -->
                        <div class="sm:hidden absolute right-full top-1/2 -translate-y-1/2 mr-3 z-50
                                    opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 
                                    pointer-events-none transition-all duration-200 z-50">
                            <div class="bg-gray-900 text-white text-xs font-bold py-2 px-4 rounded-lg shadow-2xl whitespace-nowrap relative">
                                <!-- Pointer Arrow -->
                                <div class="absolute -right-1 top-1/2 -translate-y-1/2 w-2 h-2 bg-gray-900 rotate-45 "></div>
                                {{ i.text }}
                            </div>
                        </div>
                    </NuxtLink>

                </div>
            </div>
        </aside>

        <!-- Main Content Area -->
        <div class="flex-1 flex flex-col min-w-0">
            <!-- Header -->
            <header class="w-full h-16 mb-4 bg-white/80 border border-gray-100 backdrop-blur-md rounded-3xl flex items-center justify-center shadow-sm shrink-0">
                <Logo class="w-40 sm:w-64 h-full py-2" />
            </header>
            
            <!-- Content -->
            <main class="flex-1 overflow-y-auto p-4 bg-gray-50 rounded-3xl border border-gray-200">
                <slot></slot>
            </main>
        </div>
    </section>
</template>

<script setup lang="ts">
import Logo from "@/assets/svgs/marsaescapelogo.svg";
import { 
    faUser, 
    faSuitcaseRolling, 
    faTags, 
    faCalendarCheck, 
    faBoxOpen, 
    faStar, 
    faTaxi, 
    faMobileAlt, 
    faQuestionCircle 
} from '@fortawesome/free-solid-svg-icons';

const items = [
    { to: '/users', text: "المستخدمين", icon: faUser },
    { to: '/trips', text: "الرحلات", icon: faSuitcaseRolling },
    { to: '/triptype', text: "انواع الرحلات", icon: faTags },
    { to: '/trips/reservations', text: "حجوزات الرحلات", icon: faCalendarCheck },
    { to: '/packagereservation', text: "حجوزات الباقات", icon: faBoxOpen },
    { to: '/trips/reviews', text: "تقييمات الرحلات", icon: faStar },
    { to: '/taxi', text: "تاكسي", icon: faTaxi },
    { to: '/taxi/reservations', text: "حجوزات التاكسي", icon: faCalendarCheck },
    { to: '/taxi/reviews', text: "تقييمات التاكسي", icon: faStar },
    { to: '/simcard', text: "خطوط الموبايل", icon: faMobileAlt },
    { to: '/simcard/reservations', text: "حجوزات الخطوط", icon: faCalendarCheck },
    { to: '/simcard/reviews', text: "تقييمات الخطوط", icon: faStar },
    { to: '/faqs', text: "الاسئلة الشائعة", icon: faQuestionCircle },
]
</script>

<style scoped>
/* Custom Scrollbar for the sidebar */
.custom-scrollbar::-webkit-scrollbar {
    width: 0px; /* Hide scrollbar for clean look */
}

/* Ensure FontAwesome colors don't conflict with active state */
.active-link svg {
    color: #2563eb !important;
}

/* Active class override to handle background/text contrast */
.router-link-active {
    background-color: white !important;
    color: #2563eb !important;
}
</style>