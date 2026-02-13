import{d as y,z as g,A as o,B as d,aq as L,a5 as r,ad as i,af as c,a6 as k,_ as m,ab as A}from"./iframe-wnIQFRtP.js";import"./preload-helper-PPVm8Dsz.js";const C={class:"storybook-header"},b={key:0,class:"welcome"},p=y({__name:"Header",props:{user:{}},emits:["login","logout","createAccount"],setup(a){return(l,e)=>(o(),g("header",null,[d("div",C,[e[5]||(e[5]=L('<div data-v-4a6f0661><svg width="32" height="32" viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg" data-v-4a6f0661><g fill="none" fill-rule="evenodd" data-v-4a6f0661><path d="M10 0h12a10 10 0 0110 10v12a10 10 0 01-10 10H10A10 10 0 010 22V10A10 10 0 0110 0z" fill="#FFF" data-v-4a6f0661></path><path d="M5.3 10.6l10.4 6v11.1l-10.4-6v-11zm11.4-6.2l9.7 5.5-9.7 5.6V4.4z" fill="#555AB9" data-v-4a6f0661></path><path d="M27.2 10.6v11.2l-10.5 6V16.5l10.5-6zM15.7 4.4v11L6 10l9.7-5.5z" fill="#91BAF8" data-v-4a6f0661></path></g></svg><h1 data-v-4a6f0661>Acme</h1></div>',1)),d("div",null,[a.user?(o(),g("span",b,[e[3]||(e[3]=c("Welcome, ",-1)),d("b",null,k(a.user.name),1),e[4]||(e[4]=c("!",-1))])):r("",!0),a.user?(o(),i(m,{key:1,size:"small",label:"Log out",onClick:e[0]||(e[0]=u=>l.$emit("logout"))})):r("",!0),a.user?r("",!0):(o(),i(m,{key:2,size:"small",label:"Log in",onClick:e[1]||(e[1]=u=>l.$emit("login"))})),a.user?r("",!0):(o(),i(m,{key:3,primary:"",size:"small",label:"Sign up",onClick:e[2]||(e[2]=u=>l.$emit("createAccount"))}))])])]))}}),v=A(p,[["__scopeId","data-v-4a6f0661"]]);p.__docgenInfo={exportName:"default",displayName:"Header",description:"",tags:{},props:[{name:"user",required:!0,type:{name:"union",elements:[{name:"User"},{name:"null"}]}}],events:[{name:"logout"},{name:"login"},{name:"createAccount"}],sourceFiles:["/home/runner/work/knime-designsystem/knime-designsystem/documentation/stories/Header.vue"]};const{action:t}=__STORYBOOK_MODULE_ACTIONS__,B={title:"Composite Components/Header",component:v,tags:["autodocs"],parameters:{layout:"fullscreen"}},f=a=>({components:{MyHeader:v},setup(){return{args:a}},template:'<my-header v-bind="args" />'}),n=f.bind({});n.args={user:{name:"Jane Doe"},onLogin:t("onLogin"),onLogout:t("onLogout"),onCreateAccount:t("onCreateAccount")};const s=f.bind({});s.args={user:null,onLogin:t("onLogin"),onLogout:t("onLogout"),onCreateAccount:t("onCreateAccount")};n.parameters={...n.parameters,docs:{...n.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MyHeader
  },
  setup() {
    return {
      args
    };
  },
  template: '<my-header v-bind="args" />'
})`,...n.parameters?.docs?.source}}};s.parameters={...s.parameters,docs:{...s.parameters?.docs,source:{originalSource:`args => ({
  components: {
    MyHeader
  },
  setup() {
    return {
      args
    };
  },
  template: '<my-header v-bind="args" />'
})`,...s.parameters?.docs?.source}}};const H=["LoggedIn","LoggedOut"];export{n as LoggedIn,s as LoggedOut,H as __namedExportsOrder,B as default};
