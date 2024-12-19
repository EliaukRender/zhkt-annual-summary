<template>
  <div class="home" ref="containerRef">
    <div v-for="(item, index) in sectionCmpList" :key="index">
      <component
        :is="item"
        :isScrolling="isScrolling"
        :currentSection="currentSection"
        @confirm="handleConfirm"
      ></component>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount } from "vue";
import SectionZero from "./components/SectionZero.vue";
import SectionOne from "./components/SectionOne.vue";
import SectionTwo from "./components/SectionTwo.vue";
import SectionThree from "./components/SectionThree.vue";
import gsap from "gsap";
import ScrollToPlugin from "gsap/ScrollToPlugin";

const sectionCmpList = [SectionZero, SectionOne, SectionTwo, SectionThree];
const containerRef = ref();
let touchStartY = ref(null);
let touchEndY = ref(null);
const currentSection = ref(0); // 当前Section号
const isScrolling = ref(false);
const isConfirmed = ref(false); // 协议是否确认
const TouchMoveDistance = 35;

onMounted(() => {
  gsap.registerPlugin(ScrollToPlugin);
  containerRef.value.addEventListener("touchstart", handleTouchStart);
  containerRef.value.addEventListener("touchmove", handleTouchMove);
  containerRef.value.addEventListener("touchend", handleTouchEnd);
});

onBeforeUnmount(() => {
  containerRef.value.removeEventListener("touchstart", handleTouchStart);
  containerRef.value.removeEventListener("touchmove", handleTouchMove);
  containerRef.value.removeEventListener("touchend", handleTouchEnd);
});

const handleTouchStart = event => {
  touchStartY.value = event.touches[0].clientY;
};

const handleTouchMove = event => {
  event.preventDefault();
  touchEndY.value = event.touches[0].clientY;
};

const handleTouchEnd = event => {
  if (!touchStartY || !touchEndY.value) {
    touchStartY.value = null;
    touchEndY.value = null;
    return;
  }
  const distance = touchStartY.value - touchEndY.value;
  // 上划
  if (distance > TouchMoveDistance) {
    if (!isConfirmed.value) return; // 第一个Section + 没确认协议 ，不允许上划
    scrollUp();
  }
  // 下划
  if (distance < -TouchMoveDistance) {
    if (currentSection.value === 1) return; // 不允许回退到第一个Section
    scrollDown();
  }
  touchStartY.value = null;
  touchEndY.value = null;
};

// 页面上划
const scrollUp = () => {
  if (currentSection.value === sectionCmpList.length - 1) return;
  if (isScrolling.value) return;
  isScrolling.value = true;
  handleSectionScroll(window.innerHeight * (currentSection.value + 1), 0.5, currentSection.value + 1);
};

// 页面下划
const scrollDown = () => {
  if (!currentSection.value) return;
  if (isScrolling.value) return;
  isScrolling.value = true;
  handleSectionScroll(window.innerHeight * (currentSection.value - 1), 0.5, currentSection.value - 1);
};

/**
 * @description:处理Section的滚动事件
 * @param scrollToValue 距离窗口顶部的距离
 * @param duration 动画时长
 * @param sectionValue 更新currentSection的值
 */
const handleSectionScroll = (scrollToValue, duration, sectionValue) => {
  gsap.to(window, {
    scrollTo: scrollToValue,
    duration: duration,
    ease: "power2.inOut",
    onComplete: () => {
      isScrolling.value = false; // 滚动结束
      currentSection.value = sectionValue; // 滚动结束时更新currentSection的值
    }
  });
};

// 确认阅读协议
const handleConfirm = () => {
  isConfirmed.value = true;
  scrollUp();
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
}
</style>
