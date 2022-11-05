<script lang="ts">
import { ref, watch } from "vue";
import IconClose from "~icons/mdi/close";

const props = {
  show: {
    type: Boolean,
    default: false,
  },
};

const components = {
  IconClose,
};

export default {
  name: "ModalDialog",
  props,
  emits: ["close"],
  components,
  setup(props, context) {
    const showModal = ref(false);
    const modal = ref(null);
    // const { onClickOutside } = useClickOutside();

    function closeModal() {
      context.emit("close");
    }

    // onClickOutside(modal, () => {
    //   if (showModal.value === true) {
    //     closeModal();
    //   }
    // });

    watch(
      () => props.show,
      (show) => {
        showModal.value = show;
      }
    );

    return {
      closeModal,
      showModal,
      modal,
    };
  },
};
</script>

<template>
  <teleport to="body">
    <div
      ref="modal-backdrop"
      class="fixed z-10 inset-0 overflow-y-auto bg-black bg-opacity-50"
      v-show="showModal"
    >
      <div class="flex items-start justify-center min-h-screen pt-24 text-center">
        <div
          class="bg-white rounded-lg text-left overflow-hidden shadow-xl p-8 w-1/2"
          role="dialog"
          ref="modal"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <button class="absolute top-4 right-4">
            <icon-close @click="closeModal" />
          </button>
          <slot>I'm empty inside</slot>
        </div>
      </div>
    </div>
  </teleport>
</template>
