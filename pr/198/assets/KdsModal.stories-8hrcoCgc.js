import{i as g}from"./def-BoP1xJxP.js";import{W as b,X as v,Y as f,Z as h,$ as d,_ as m}from"./iframe-DNHZNOPe.js";import"./preload-helper-PPVm8Dsz.js";const t=`
Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut
labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate
velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor
sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna
aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex
ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu
fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia
deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit,
sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit
in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat
non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit
amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua.
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid ex ea commodi
consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id est
laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore
et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid
ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim id
est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut labore
et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquid
ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt mollit anim
id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor incidunt ut
labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse cillum dolore eu
fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa qui officia deserunt
mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed eiusmod tempor
incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in voluptate velit esse
cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non proident, sunt in culpa
qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing
elit, sed eiusmod tempor incidunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
exercitation ullamco laboris nisi ut aliquid ex ea commodi consequat. Quis aute iure reprehenderit in
voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint obcaecat cupiditat non
proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`.trim(),{useArgs:q}=__STORYBOOK_MODULE_PREVIEW_API__,{fn:x}=__STORYBOOK_MODULE_TEST__,S={title:"Components/overlays/KdsModal",component:d,tags:["autodocs"],parameters:{docs:{description:{component:"A modal dialog component that uses the HTML native &lt;dialog&gt; tag. Uses `KdsModalLayout` in the `default` slot and provides a `body` and `footer` slot."}},design:{type:"figma",url:"https://www.figma.com/design/AqT6Q5R4KyYqUb6n5uO2XE/%F0%9F%A7%A9-kds-Components?node-id=6220-89388"}},argTypes:{icon:{options:[void 0,...g]},closedby:{options:h},variant:{options:f},width:{options:v},height:{options:b}},args:{onClose:x()},render:(r,s)=>{const e=s.parameters?.modalOptions??{};return{components:{KdsModal:d,KdsButton:m},setup(){return{args:r,cancelButton:{show:!0,label:"Cancel",...e.cancelButton},confirmButton:{show:!0,label:"Confirm",...e.confirmButton}}},template:`
    <KdsModal>
      <template #body>
        ${e.content??"Modal content text."}
      </template>

      <template #footer>
        <KdsButton
          v-if="cancelButton.show"
          :label="cancelButton.label"
          variant="transparent"
          @click="$emit('close')"
        />
        <KdsButton
          v-if="confirmButton.show"
          :label="confirmButton.label"
          variant="filled"
          @click="$emit('close')"
        />
      </template>
    </KdsModal>
  `}},decorators:[(r,s)=>{const e=r(),u=s.parameters?.modalOptions??{},[c,p]=q();return{components:{Story:e,KdsButton:m},setup(){return{args:c,updateArgs:p}},template:`
        <KdsButton
          v-if="${!u.hideButton}"
          label="${u.buttonLabel??"Show modal"}"
          variant="filled"
          @click="updateArgs({ active: true })"
        />
        <Story v-bind="args" @close="updateArgs({ active: false })" />
        `.trim()}}]},a={parameters:{modalOptions:{buttonLabel:"Show modal",content:"Modal content text. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",confirmButton:{label:"Confirm"},cancelButton:{label:"Cancel"}}},args:{title:"Title"}},i={parameters:{modalOptions:{hideButton:!0,content:"This should be visible on load.",confirmButton:{label:"Confirm"},cancelButton:{label:"Cancel"}},docs:{disable:!0}},args:{active:!0,title:"Show on load…"}},o={parameters:{modalOptions:{buttonLabel:"Variant plain",content:`<div>${t} ${t}</div>`}},args:{title:"Variant Plain",variant:"plain"}},n={parameters:{modalOptions:{buttonLabel:"Full size modal",content:`
      <div style="padding: var(--modal-padding-top) var(--modal-padding-right) var(--modal-gap) var(--modal-padding-left);">This is some message that will not scroll.</div>
      <div style="padding: 0 var(--modal-padding-right) 0 var(--modal-padding-left); overflow: auto;">${t} ${t}</div>
      <div style="padding: var(--modal-gap) var(--modal-padding-right) var(--modal-padding-bottom) var(--modal-padding-left);">Also here no scrolling.</div>
        `.trim()}},args:{icon:"info",title:"Scrollable inner content",width:"full",height:"full",variant:"plain"}},l={parameters:{modalOptions:{buttonLabel:"Show info",content:t,cancelButton:{show:!1},confirmButton:{label:"Ok"}}},args:{title:"Please read carefully. A click outside should close the modal.",closedby:"any"}};a.parameters={...a.parameters,docs:{...a.parameters?.docs,source:{originalSource:`{
  parameters: {
    modalOptions: {
      buttonLabel: "Show modal",
      content: "Modal content text. At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.",
      confirmButton: {
        label: "Confirm"
      },
      cancelButton: {
        label: "Cancel"
      }
    }
  },
  args: {
    title: "Title"
  }
}`,...a.parameters?.docs?.source}}};i.parameters={...i.parameters,docs:{...i.parameters?.docs,source:{originalSource:`{
  parameters: {
    modalOptions: {
      hideButton: true,
      content: "This should be visible on load.",
      confirmButton: {
        label: "Confirm"
      },
      cancelButton: {
        label: "Cancel"
      }
    },
    docs: {
      disable: true
    }
  },
  args: {
    active: true,
    title: "Show on load…"
  }
}`,...i.parameters?.docs?.source}}};o.parameters={...o.parameters,docs:{...o.parameters?.docs,source:{originalSource:`{
  parameters: {
    modalOptions: {
      buttonLabel: "Variant plain",
      content: \`<div>\${veryLongText} \${veryLongText}</div>\`
    }
  },
  args: {
    title: "Variant Plain",
    variant: "plain"
  }
}`,...o.parameters?.docs?.source}}};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`{
  parameters: {
    modalOptions: {
      buttonLabel: "Full size modal",
      content: \`
      <div style="padding: var(--modal-padding-top) var(--modal-padding-right) var(--modal-gap) var(--modal-padding-left);">This is some message that will not scroll.</div>
      <div style="padding: 0 var(--modal-padding-right) 0 var(--modal-padding-left); overflow: auto;">\${veryLongText} \${veryLongText}</div>
      <div style="padding: var(--modal-gap) var(--modal-padding-right) var(--modal-padding-bottom) var(--modal-padding-left);">Also here no scrolling.</div>
        \`.trim()
    }
  },
  args: {
    icon: "info",
    title: "Scrollable inner content",
    width: "full",
    height: "full",
    variant: "plain"
  }
}`,...n.parameters?.docs?.source}}};l.parameters={...l.parameters,docs:{...l.parameters?.docs,source:{originalSource:`{
  parameters: {
    modalOptions: {
      buttonLabel: "Show info",
      content: veryLongText,
      cancelButton: {
        show: false
      },
      confirmButton: {
        label: "Ok"
      }
    }
  },
  args: {
    title: "Please read carefully. A click outside should close the modal.",
    closedby: "any"
  }
}`,...l.parameters?.docs?.source}}};const O=["Default","ShowOnLoad","VariantPlain","FullSizeInnerScrollable","LightDismissible"];export{a as Default,n as FullSizeInnerScrollable,l as LightDismissible,i as ShowOnLoad,o as VariantPlain,O as __namedExportsOrder,S as default};
