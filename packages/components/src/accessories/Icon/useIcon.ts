import { type DefineComponent, type Ref, shallowRef, watch } from "vue";

function useIcon({
  name,
  folder,
}: {
  name: Ref<string>;
  folder: "icons" | "type-icons";
}): Readonly<typeof iconComponent> {
  const iconCache = new Map<string, DefineComponent>();

  const iconComponent = shallowRef<DefineComponent | null>(null);

  watch(
    () => name.value,
    async (newName) => {
      if (iconCache.has(newName)) {
        iconComponent.value = iconCache.get(newName)!;
        return;
      }

      try {
        const module = await import(
          `../../../node_modules/@knime/kds-styles/dist/img/${folder}/${newName}.svg`
        );
        iconCache.set(newName, module.default);
        iconComponent.value = module.default;
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(
          `Failed to load icon "${newName}" from folder "${folder}":`,
          error,
        );

        iconComponent.value = null;
      }
    },
    { immediate: true },
  );

  return iconComponent;
}

export default useIcon;
