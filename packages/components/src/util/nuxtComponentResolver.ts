/* eslint-disable vue/one-component-per-file */
import { defineComponent, getCurrentInstance, h, useSlots } from "vue";

const getAppInstance = () => {
  const currentInstance = getCurrentInstance();

  return currentInstance?.appContext.app;
};

export const resolveNuxtLinkComponent = () => {
  const app = getAppInstance();

  // only works when NuxtLink is registered globally, which it's not by default
  const nuxtLinkComponent = app?.component("NuxtLink");
  if (nuxtLinkComponent) {
    return nuxtLinkComponent;
  }

  const routerLinkComponent = app?.component("RouterLink");
  if (routerLinkComponent) {
    return routerLinkComponent;
  }

  // fallback component when neither NuxtLink nor RouterLink are available
  const fallbackComponent = defineComponent({
    props: {
      to: {
        type: String,
        default: "",
      },
    },

    render() {
      return h("a", { href: this.to }, [useSlots().default?.()]);
    },
  });

  return fallbackComponent;
};
