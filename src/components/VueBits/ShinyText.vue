<script setup lang="ts">
import { computed } from 'vue';

interface ShinyTextProps {
  text: string;
  disabled?: boolean;
  speed?: number;
  className?: string;
}

const props = withDefaults(defineProps<ShinyTextProps>(), {
  text: '',
  disabled: false,
  speed: 5,
  className: ''
});

const animationDuration = computed(() => `${props.speed}s`);
</script>

<template>
  <div class="shineText">
    <div class="text-bg">{{ props.text }}</div>
    <div 
      class="text-shine"
      :style="{ animationDuration: animationDuration }"
    >
      {{ props.text }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
@keyframes shine {
  0% {
    background-position: 100%;
  }
  100% {
    background-position: -100%;
  }
}

.shineText {
    display: inline-block;
    position: relative;
}

.text-bg {
    background: linear-gradient(120deg, #76B6E8, #D37EEA);
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
}

.text-shine {
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(120deg, rgba(248, 248, 248, 0) 30%, rgba(248, 248, 248, 1) 50%, rgba(248, 248, 248, 0) 70%);
    background-size: 200% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    color: transparent;
    animation: shine 5s linear infinite;
    pointer-events: none;
}
</style>
