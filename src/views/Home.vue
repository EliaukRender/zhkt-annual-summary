<template>
  <div class="home" ref="containerRef">
    <div v-for="(item, index) in sectionCmpList" :key="index">
      <component
        ref="sectionRefList"
        :is="item"
        :isScrolling="isScrolling"
        :currentSection="currentSection"
        @confirm="handleConfirm"
      ></component>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, onBeforeUnmount, computed } from "vue";
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
const currentSection = ref(0); // 当前Section的序号
const isScrolling = ref(false);
// 协议是否确认
const isConfirmed = computed(() => {
  return sectionRefList.value[0] ? !!sectionRefList.value[0].check.length : false;
});
const TouchMoveDistance = 35;
const sectionRefList = ref([]); // Section组件的Refs

onMounted(() => {
  gsap.registerPlugin(ScrollToPlugin);
  containerRef.value.addEventListener("touchstart", handleTouchStart);
  containerRef.value.addEventListener("touchmove", handleTouchMove);
  containerRef.value.addEventListener("touchend", handleTouchEnd);
  containerRef.value.addEventListener("wheel", handleWheel);
});

onBeforeUnmount(() => {
  containerRef.value.removeEventListener("touchstart", handleTouchStart);
  containerRef.value.removeEventListener("touchmove", handleTouchMove);
  containerRef.value.removeEventListener("touchend", handleTouchEnd);
  containerRef.value.removeEventListener("wheel", handleWheel);
});

// 鼠标滚动
const handleWheel = event => {
  event.preventDefault();
  // 页面上翻
  if (event.deltaY > 0) {
    // 第一个Section且没确认协议，不允许上划
    if (currentSection.value === 0 && !isConfirmed.value) {
      sectionRefList.value[0].popupVisible = true;
      return;
    }
    scrollUp();
  } else {
    // 页面下翻
    if (currentSection.value === 1) return; // 不允许回退到第一个Section
    scrollDown();
  }
};

// touch开始
const handleTouchStart = event => {
  touchStartY.value = event.touches[0].clientY;
};

// touch移动
const handleTouchMove = event => {
  event.preventDefault();
  touchEndY.value = event.touches[0].clientY;
};

// touch结束
const handleTouchEnd = event => {
  if (!touchStartY || !touchEndY.value) return;
  const distance = touchStartY.value - touchEndY.value;
  // 页面上翻
  if (distance > TouchMoveDistance) {
    if (currentSection.value === 0 && !isConfirmed.value) {
      sectionRefList.value[0].popupVisible = true; // 打开确定协议的弹窗
    } else {
      scrollUp();
    }
  }
  // 页面下翻
  if (distance < -TouchMoveDistance && currentSection.value !== 1) {
    scrollDown();
  }
  touchStartY.value = null;
  touchEndY.value = null;
};

// 页面上翻一页
const scrollUp = () => {
  if (currentSection.value === sectionCmpList.length - 1) return;
  if (isScrolling.value) return;
  isScrolling.value = true;
  handleSectionScroll(window.innerHeight * (currentSection.value + 1), 0.5, currentSection.value + 1);
};

// 页面下翻一页
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
      isScrolling.value = false; // 当前页面滚动结束
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
  overflow-y: hidden;
}
</style>
