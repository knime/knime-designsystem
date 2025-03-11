/* Custom svgo rule to remove stroke-miterlimit in case it would be ignored anyways */
export const removeMiterlimit = {
  name: "removeMiterlimit",
  description:
    "Remove stroke-miterlimit if stroke-linejoin is round, arcs, or bevel.",
  fn: () => {
    return {
      element: {
        enter: (node) => {
          if (
            node.name === "svg" &&
            (node.attributes["stroke-linejoin"] === "round" ||
              node.attributes["stroke-linejoin"] === "arcs" ||
              node.attributes["stroke-linejoin"] === "bevel")
          ) {
            delete node.attributes["stroke-miterlimit"];
          }
        },
      },
    };
  },
};
