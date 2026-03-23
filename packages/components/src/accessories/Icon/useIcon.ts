import {
  type DefineComponent,
  type Ref,
  type ShallowRef,
  shallowRef,
  watch,
} from "vue";

function useIcon({
  name,
  folder,
}: {
  name: Ref<string>;
  folder: "icons" | "type-icons";
}): Readonly<ShallowRef<DefineComponent | null, DefineComponent | null>> {
  const iconCache = new Map<string, DefineComponent>();

  const iconComponent = shallowRef<DefineComponent | null>(null);

  watch(
    () => name.value,
    (newName) => {
      if (iconCache.has(newName)) {
        iconComponent.value = iconCache.get(newName)!;
        return;
      }

      // Do *not* change this code to use try/catch blocks:
      //   try/catch relies on the async frame being intact when the rejection resumes.
      //   Which might be gone due to vue teardown.
      //   `.catch()` registers a reaction on the Promise's internal [[PromiseRejectReactions]]
      //   slot directly, so it doesn't depend on a live call frame.
      import(
        `../../../node_modules/@knime/kds-styles/dist/img/${folder}/${newName}.svg`
      )
        .then((module) => {
          iconCache.set(newName, module.default);
          iconComponent.value = module.default;
        })
        .catch((error) => {
          // do not log an abort, might happen due to teardown
          if (error.name === "AbortError") {
            return;
          }

          // eslint-disable-next-line no-console
          console.error(
            `Failed to load icon "${newName}" from folder "${folder}":`,
            error,
          );

          iconComponent.value = null;
        });
    },
    { immediate: true },
  );

  return iconComponent;
}

export default useIcon;
