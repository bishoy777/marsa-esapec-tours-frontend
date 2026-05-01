<template>
  <div class="min-h-[90vh] flex items-center justify-center p-6 bg-[#fafafa]">
    <div class="max-w-4xl w-full">
      <!-- Main Welcome Card -->
      <div class="relative overflow-hidden bg-white border border-slate-100 rounded-[3rem] p-8 md:p-16 shadow-2xl shadow-blue-900/5 text-center">
        
        <!-- Decorative Background Element -->
        <div class="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary-danger/5 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-96 h-96 bg-[#082852]/5 rounded-full blur-3xl"></div>

        <div class="relative z-10 space-y-8 animate-welcome">
          <!-- Animated Avatar/Icon -->
          <div class="flex justify-center">
            <div class="w-24 h-24 bg-[#082852] rounded-3xl rotate-12 flex items-center justify-center shadow-xl shadow-blue-900/20 group hover:rotate-0 transition-transform duration-500">
              <span class="text-4xl -rotate-12 group-hover:rotate-0 transition-transform">👋</span>
            </div>
          </div>

          <!-- The Greeting -->
          <div class="space-y-3">
            <h1 class="text-4xl md:text-6xl font-black text-[#082852] tracking-tighter">
              Welcome Back, <span class="text-primary-danger">Beshoy!</span>
            </h1>
            <p class="text-slate-400 font-bold uppercase tracking-[0.3em] text-xs">
              Administrator • Marsa Escape
            </p>
          </div>

          <!-- Motivational Quote Section -->
          <div class="max-w-xl mx-auto py-8 border-y border-slate-50">
            <p class="text-xl md:text-2xl font-medium text-slate-600 italic leading-relaxed">
              "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work."
            </p>
            <p class="mt-4 text-primary-danger font-black text-sm uppercase tracking-widest">— Steve Jobs</p>
          </div>

          <!-- Personal Mission Statement -->
          <p class="text-slate-500 text-base max-w-md mx-auto">
            Today is a new opportunity to create perfect travel experiences for our guests. 
            The system is ready. Are you?
          </p>

          <!-- Quick Action -->
          <div class="pt-6">
            <button class="bg-[#082852] text-white px-10 py-4 rounded-2xl font-bold text-lg shadow-xl shadow-blue-900/30 hover:scale-105 active:scale-95 transition-all">
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>

      <!-- Footer Motivation -->
      <p class="mt-8 text-center text-slate-300 font-medium text-sm">
        Marsa Alam Time: {{ currentTime }}
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const currentTime = ref('');

onMounted(() => {
  const updateTime = () => {
    currentTime.value = new Date().toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };
  updateTime();
  setInterval(updateTime, 60000);
});
</script>

<style scoped>
@keyframes welcomeEntrance {
  0% { opacity: 0; transform: translateY(30px) scale(0.95); }
  100% { opacity: 1; transform: translateY(0) scale(1); }
}

.animate-welcome {
  animation: welcomeEntrance 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

/* Custom Selection Color */
::selection {
  background-color: #082852;
  color: white;
}
</style>