<template>
  <div class="section section-two">
    <div class="text">section two</div>
  </div>
</template>

<script setup>
import { watch } from "vue";
import gsap from "gsap";

const props = defineProps({
  // 滚动标志
  isScrolling: {
    default: false,
    type: Boolean
  },
  // 当前显示在第几个section
  currentSection: {
    default: 0,
    type: Number
  }
});

const SectionValue = 2;

/* 监听当前显示的section */
watch(
  () => props.currentSection,
  newValue => {
    if (newValue === SectionValue) {
      startAnimation();
    } else {
      resetAnimation();
    }
  }
);

const startAnimation = () => {
  gsap.fromTo(
    ".section-two .text",
    { opacity: 0, x: -500, rotation: 0 },
    { opacity: 1, x: 0, duration: 1, rotation: 360, ease: "power2.inOut" }
  );
};

const resetAnimation = () => {
  gsap.killTweensOf(".section-two .text");
  gsap.set(".section-two .text", { opacity: 0, x: -500, rotation: 0 });
};
</script>

<style lang="scss" scoped>
.section-two {
  color: #ffffff;
  font-size: 40px;
  font-weight: 600;
  background-image: linear-gradient(128deg, #ff9a3f, #ff4b40);
}
</style>
