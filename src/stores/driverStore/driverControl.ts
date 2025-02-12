import { driver, Driver } from "driver.js";
import { defineStore } from "pinia";
import { nextTick, reactive, ref } from "vue";
import { useRouter } from "vue-router";

export interface GuideStep {
  element: string;
  popover: {
    title: string;
    description: string;
  };
  route?: string;
}

export const useDriverStore = defineStore("driver", () => {
  const router = useRouter();
  const isGuideActive = ref(false);
  const driverInstance = ref<Driver | null>(null);
  const currentStepIndex = ref(0);
  const stepsGuide = reactive<GuideStep[]>([
    {
      element: "#step1",
      popover: {
        title: "Добро пожаловать",
        description:
          "Приветсвую вас в программе для администрирования, добро пожаловать в команду!",
      },
      route: "/",
    },
    {
      element: "#step1",
      popover: {
        title: "Подключения",
        description: "Тут вы можете увидеть количество заявок на подключения",
      },
      route: "/connections",
    },
  ]);
  const initDriver = () => {
    driverInstance.value = driver({
      animate: true,
      allowClose: false,
      nextBtnText: "Далее",
      prevBtnText: "Назад",
      doneBtnText: "ОК",
      showProgress: true,
      steps: stepsGuide.map((step) => ({
        element: step.element,
        popover: {
          title: step.popover.title,
          description: step.popover.description,
        },
      })),
      progressText: "{{current}} из {{total}}",
      onNextClick: handleNextStep,
      onPrevClick: handlePrevStep,
      onDestroyed: () => {},
    });
  };

  const handlePrevStep = async () => {
    const prevStepIndex = currentStepIndex.value - 1;
    if (prevStepIndex >= 0) {
      const prevStep = stepsGuide[prevStepIndex];
      if (prevStep.route) {
        await router.push(prevStep.route);
        await nextTick();
      }
      currentStepIndex.value = prevStepIndex;
      driverInstance.value?.moveTo(prevStepIndex);
    }
  };

  const startGuide = () => {
    if (stepsGuide.length > 0) {
      isGuideActive.value = true;
      currentStepIndex.value = 0;
      driverInstance.value?.drive(currentStepIndex.value);
    }
  };

  const resetGuide = () => {
    isGuideActive.value = false;
    currentStepIndex.value = 0;
    driverInstance.value?.destroy();
  };
  const handleNextStep = async () => {
    const nextStepIndex = currentStepIndex.value + 1;
    if (nextStepIndex < stepsGuide.length) {
      const nextStep = stepsGuide[nextStepIndex];
      if (nextStep.route) {
        await router.push(nextStep.route);
        await nextTick();
      }
      currentStepIndex.value = nextStepIndex;
      driverInstance.value?.moveTo(nextStepIndex);
    }
  };
  return {
    driverInstance,
    isGuideActive,
    currentStepIndex,
    stepsGuide,
    initDriver,
    startGuide,
    resetGuide,
    handleNextStep,
    handlePrevStep,
  };
});
