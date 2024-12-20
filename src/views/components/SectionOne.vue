<template>
  <div class="section section-one">
    <p class="text">section one</p>
    <img class="img" src="../../assets/vue.svg" alt="" />
  </div>
</template>

<script setup>
import { watch, onMounted } from "vue";
import gsap from "gsap";
import { useGetTargetEle } from "../../hooks/useGetTargetEle.js";

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

const SectionValue = 1;

/* 监听当前显示的section */
watch(
  () => props.currentSection,
  newValue => {
    newValue === SectionValue ? startAnimation() : resetAnimation();
  }
);

onMounted(() => {
  setInitStyle();
});

// 动画class类名定义
const { getTargetClass } = useGetTargetEle("section-one");
const text = getTargetClass("text");
const img = getTargetClass("img");

// 设置初始css样式
const setInitStyle = () => {
  gsap.set(text, { opacity: 0, y: 0 });
  gsap.set(img, { opacity: 0, y: 0, rotation: 0 });
};

// 开始动画
const startAnimation = () => {
  gsap.fromTo(text, { opacity: 0, y: 0 }, { opacity: 1, y: -100, duration: 1 });
  gsap.fromTo(img, { opacity: 0, y: 0, rotation: 0 }, { opacity: 1, y: 100, rotation: 360, duration: 1 });
};

// 重置动画与css样式
const resetAnimation = () => {
  gsap.killTweensOf(text);
  gsap.killTweensOf(img);
  setInitStyle();
};
</script>

<style lang="scss" scoped>
.section-one {
  color: #ffffff;
  font-size: 40px;
  font-weight: 600;
  background-image: linear-gradient(128deg, #40afff, #3f61ff);
}
</style>
