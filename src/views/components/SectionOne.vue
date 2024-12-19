<template>
  <div class="section section-one">
    <p class="text">section one</p>
    <img class="img" src="../../assets/vue.svg" alt="" />
  </div>
</template>

<script setup>
import { watch, onMounted } from "vue";
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

const SectionValue = 1;

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

onMounted(() => {});

const startAnimation = () => {
  gsap.fromTo(".section-one .text", { opacity: 0, y: 0 }, { opacity: 1, y: -100, duration: 1 });
  gsap.fromTo(
    " .section-one .img",
    { opacity: 0.2, y: 0, rotation: 0 },
    { opacity: 1, y: 100, rotation: 360, duration: 1 }
  );
};

const resetAnimation = () => {
  gsap.killTweensOf(".section-one .text");
  gsap.killTweensOf(".section-one .img");
  gsap.set(".section-one .text", { opacity: 0, y: 0 });
  gsap.set(".section-one .img", { opacity: 0.5, y: 0, rotation: 0 });
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
