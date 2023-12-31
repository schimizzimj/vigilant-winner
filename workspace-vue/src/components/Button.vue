<template>
  <button :class="classes"><slot /></button>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: "Button",
  computed: {
    classes(): Record<string, boolean> {
      return {
        [this.$style.btn]: true,
        [this.$style["btn-primary"]]: this.mode === "primary",
      };
    },
  },
  props: {
    mode: {
      type: String,
      required: false,
      default: "",
      validator: (value: string) => {
        const isValid = ["primary"].includes(value);
        if (!isValid) {
          console.warn(`Invalid prop: ${value}`);
        }
        return isValid;
      },
    },
  },
});
</script>

<style module>
.btn {
  --button-primary: #14775d;
  --button-primary-color: #fff;
  --button-dark: #333;
  --button-line-height: 1.25rem;
  --button-font-size: 1rem;
  --button-light: #e9e9e9;
  --button-transition-duration: 200ms;
  --button-font-stack: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
    Roboto, Ubuntu, "Helvetica Neue", sans-serif;

  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  user-select: none;
  appearance: none;
  cursor: pointer;
  box-sizing: border-box;
  transition-property: all;
  transition-duration: var(--button-transition-duration);
  color: var(--button-dark);
  background-color: var(--button-light);
  border-color: var(--button-light);
  border-style: solid;
  border-width: 1px;
  font-family: var(--button-font-stack);
  font-weight: 400;
  font-size: var(--button-font-size);
  line-height: var(--button-line-height);
  padding-block-start: 0.5rem;
  padding-block-end: 0.5rem;
  padding-inline-start: 0.75rem;
  padding-inline-end: 0.75rem;
  text-decoration: none;
  text-align: center;
}

.btn-primary {
  color: var(--button-primary-color);
  background-color: var(--button-primary);
  border-color: var(--button-primary);
}

/* Respect users reduced motion preferences */
@media (prefers-reduced-motion) {
  .btn {
    transition-duration: 0.001ms !important;
  }
}
</style>
