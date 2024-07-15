import { defineStore } from "pinia";
import { reactive } from "vue";

export const usePopupStore = defineStore("popup", () => {
  const state = reactive({
    visible: false,
    title: "",
    message: "",
    confirmAction: null,
  });

  const showPopup = (title, message, confirmAction) => {
    state.title = title;
    state.message = message;
    state.confirmAction = confirmAction;
    state.visible = true;
  };

  const closePopup = () => {
    state.visible = false;
  };

  return { state, showPopup, closePopup };
});
