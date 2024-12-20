<template>
  <div class="section section-zero">
    <div class="info">
      <div class="title">畅言智慧课堂2024年度个人报告</div>
      <van-button class="open-btn" type="primary" @click="clickSummary">开启我的报告</van-button>
    </div>

    <div class="agreement">
      <van-radio :model-value="check" @click="changeCheck" name="1" checked-color="#ee0a24"
        >同意畅言智慧课堂查询并使用个人数据
      </van-radio>
      <span>《授权协议》</span>
    </div>

    <van-popup v-model:show="popupVisible" position="bottom" :style="{ height: '30%' }">
      <div>点击同意，表示已阅读且同意《授权协议》，同时开启年度报告</div>
      <div class="btn-group">
        <van-button @click="cancel">取消</van-button>
        <van-button type="success" @click="confirm">同意</van-button>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import { ref, watch, defineEmits } from "vue";
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

const SectionValue = 0;
const check = ref("");
const popupVisible = ref(false);

/* 监听当前显示的section */
watch(
  () => props.currentSection,
  newValue => {
    if (newValue !== SectionValue) {
      resetAnimation();
    }
  }
);

// 点击单选
const changeCheck = () => {
  check.value = check.value.length ? "" : "1";
};

// 点击开启报告
const clickSummary = () => {
  if (!check.value.length) {
    popupVisible.value = true;
  } else {
    startSummary();
  }
};

const cancel = () => {
  popupVisible.value = false;
};

const confirm = () => {
  check.value = "1";
  popupVisible.value = false;
  startSummary();
};

const emits = defineEmits(["confirm"]);

// 动画class类名定义
const { getTargetClass } = useGetTargetEle("section-zero");
const sectionZero = getTargetClass("");

// 开启报告
const startSummary = () => {
  gsap.to(sectionZero, {
    opacity: 0.2,
    duration: 0.5,
    onStart: function () {
      console.log("动画开始");
    },
    onComplete: function () {
      console.log("动画完成");
      emits("confirm");
    }
  });
};

// 重置动画
const resetAnimation = () => {
  gsap.killTweensOf(sectionZero);
  gsap.set(sectionZero, { opacity: 1 });
};
</script>

<style lang="scss" scoped>
.section-zero {
  color: #ffffff;
  font-weight: 600;
  background: linear-gradient(180deg, rgba(64, 175, 255, 0.7), rgba(63, 97, 255, 0.9));

  .info {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;

    .title {
      font-size: 24px;
    }

    .open-btn {
      margin-top: 100px;
    }
  }

  .agreement {
    height: 10%;
    display: flex;
    align-items: center;
    justify-content: center;

    ::v-deep .van-radio__label {
      color: #ffffff !important;
    }
  }

  .van-popup {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px 10px 0 0;
    color: #333333;

    .btn-group {
      .van-button--success {
        margin-left: 20px;
      }
    }
  }
}
</style>
