import { type DefineComponent, type Ref, shallowRef, watch } from "vue";

export default ({
  name,
  folder,
}: {
  name: Ref<string>;
  folder: "icons" | "type-icons";
}) => {
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
      } catch (_error) {
        iconComponent.value = null;
      }
    },
    { immediate: true },
  );

  return iconComponent as Readonly<typeof iconComponent>;
};
