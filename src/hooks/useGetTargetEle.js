/**
 * @description: 获取不同的Section组件中  目标元素的类名组合 （避免类型重复）
 * @param sectionClass Section的class类名
 */
export const useGetTargetEle = sectionClass => {
  // sonEleClass: 目标html元素的class类名
  const getTargetClass = (sonEleClass = "") => {
    return sonEleClass.length ? `.${sectionClass} .${sonEleClass}` : `.${sectionClass}`;
  };

  return {
    getTargetClass
  };
};
