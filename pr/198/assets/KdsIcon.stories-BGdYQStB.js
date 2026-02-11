import{b as t,e as s}from"./iframe-DNHZNOPe.js";import{i as l}from"./def-BoP1xJxP.js";import"./preload-helper-PPVm8Dsz.js";const r={title:"Components/KdsIcon",component:s,tags:["autodocs"],parameters:{docs:{description:{component:"Displays an icon from the KDS icon set. The icon color inherits the text color of the parent element."}}},argTypes:{name:{control:{type:"select"},options:l},size:{control:{type:"select"},options:t}}},e={args:{name:"placeholder",size:"medium"}},n={render:i=>({components:{KdsIcon:s},setup:()=>({args:i}),template:`
      <div style="display:flex; gap: 16px; align-items: center;">
        <div style="display:flex; flex-direction:column; gap: 8px; align-items:center;">
          <div style="font-size: 12px;">xsmall</div>
          <KdsIcon v-bind="args" size="xsmall" />
        </div>
        <div style="display:flex; flex-direction:column; gap: 8px; align-items:center;">
          <div style="font-size: 12px;">small</div>
          <KdsIcon v-bind="args" size="small" />
        </div>
        <div style="display:flex; flex-direction:column; gap: 8px; align-items:center;">
          <div style="font-size: 12px;">medium</div>
          <KdsIcon v-bind="args" size="medium" />
        </div>
        <div style="display:flex; flex-direction:column; gap: 8px; align-items:center;">
          <div style="font-size: 12px;">large</div>
          <KdsIcon v-bind="args" size="large" />
        </div>
      </div>
    `}),args:{name:"placeholder"}};e.parameters={...e.parameters,docs:{...e.parameters?.docs,source:{originalSource:`{
  args: {
    name: "placeholder",
    size: "medium"
  }
}`,...e.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  render: args => ({
    components: {
      KdsIcon
    },
    setup: () => ({
      args
    }),
    template: \`
      <div style="display:flex; gap: 16px; align-items: center;">
        <div style="display:flex; flex-direction:column; gap: 8px; align-items:center;">
          <div style="font-size: 12px;">xsmall</div>
          <KdsIcon v-bind="args" size="xsmall" />
        </div>
        <div style="display:flex; flex-direction:column; gap: 8px; align-items:center;">
          <div style="font-size: 12px;">small</div>
          <KdsIcon v-bind="args" size="small" />
        </div>
        <div style="display:flex; flex-direction:column; gap: 8px; align-items:center;">
          <div style="font-size: 12px;">medium</div>
          <KdsIcon v-bind="args" size="medium" />
        </div>
        <div style="display:flex; flex-direction:column; gap: 8px; align-items:center;">
          <div style="font-size: 12px;">large</div>
          <KdsIcon v-bind="args" size="large" />
        </div>
      </div>
    \`
  }),
  args: {
    name: "placeholder"
  }
}`,...n.parameters?.docs?.source}}};const c=["IconStory","SizeComparison"];export{e as IconStory,n as SizeComparison,c as __namedExportsOrder,r as default};
