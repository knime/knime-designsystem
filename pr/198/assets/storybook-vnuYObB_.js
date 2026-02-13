import{d as j,ah as V,r as h,c as w,ai as N,aj as $,z as p,A as i,af as d,a5 as b,B as n,ak as M,a9 as S,aa as U,al as A,a7 as T,a8 as O,a6 as L,am as k,an as q,ad as E,ao as _,ap as J}from"./iframe-wnIQFRtP.js";const H={class:"design-comparator"},R={key:0,class:"no-token-warning"},X={class:"controls"},G={key:0,class:"loading"},K={class:"groups"},Q=["src"],D=4,W=.5,F=j({__name:"DesignComparator",props:{designsToCompare:{},component:{},wrapperStyle:{type:[Boolean,null,String,Object,Array],default:void 0}},setup(t){V(o=>({v6fb7b5ee:D,v5469732c:v.value,v20d56d92:r.value}));const s=t,r=h(W),m=h(!1),v=w(()=>m.value?"unset":1-r.value),u=h({}),c=h(!1),g=N("storybook-figma-token","");function C(o){const e=o.match(/node-id=([\d-]+)/);return e?e[1]:null}async function B(){if(!g.value){console.error("No Figma token provided.");return}if(!s.designsToCompare){console.error("No designs to compare provided.");return}const o=Object.values(s.designsToCompare).flatMap(a=>Object.keys(a.variants)),e=o[0].match(/figma\.com\/design\/([^/]+)\//);if(!e){console.error("Invalid Figma design URL:",o[0]);return}const l=e[1],y=o.map(a=>C(a)).filter(a=>a!==null);c.value=!0,await fetch(`https://api.figma.com/v1/images/${l}?ids=${y.join(",")}&format=png&scale=${D}`,{headers:{"X-Figma-Token":g.value}}).then(a=>a.json()).then(a=>{u.value=Object.fromEntries(Object.entries(a.images).map(([f,z])=>[f.replace(":","-"),z])),c.value=!1})}const x=w(()=>o=>{const e=C(o);if(e)return u.value[e]||void 0});$(()=>g.value,()=>{B()},{immediate:!0});function I(o){const e=o.clipboardData?.getData("text");e&&(g.value=e)}return(o,e)=>(i(),p("div",H,[e[10]||(e[10]=d(" This view overlays the design in Figma with the component implementation. It's especially useful for checking sizes and positioning of elements. ",-1)),M(g)?b("",!0):(i(),p("div",R,[e[2]||(e[2]=d(" To be able to fetch images from Figma, please ",-1)),e[3]||(e[3]=n("a",{href:"https://help.figma.com/hc/en-us/articles/8085703771159-Manage-personal-access-tokens",target:"_blank"},"get a Personal Access Token",-1)),e[4]||(e[4]=d(" with ",-1)),e[5]||(e[5]=n("code",null,"file_content:read",-1)),e[6]||(e[6]=d(" permission and paste it here: ",-1)),n("input",{type:"text",placeholder:"Figma Token",onPaste:I},null,32)])),n("div",X,[e[8]||(e[8]=d(" Design  ",-1)),S(n("input",{"onUpdate:modelValue":e[0]||(e[0]=l=>r.value=l),type:"range",min:"0",max:"1",step:"0.01",class:"opacity-slider"},null,512),[[U,r.value]]),e[9]||(e[9]=d(" Implementation   ",-1)),n("label",null,[S(n("input",{"onUpdate:modelValue":e[1]||(e[1]=l=>m.value=l),type:"checkbox"},null,512),[[A,m.value]]),e[7]||(e[7]=d(" Overlay",-1))]),c.value?(i(),p("span",G,"Loading images from Figma…")):b("",!0)]),n("div",K,[(i(!0),p(T,null,O(s.designsToCompare,(l,y)=>(i(),p("div",{key:y,class:"group"},[n("h5",null,L(y),1),(i(!0),p(T,null,O(l.variants,(a,f)=>(i(),p("div",{key:f,class:"variant",style:k({"--figma-offset-x":`${a.parameters?.figmaOffset?.x??0}px`,"--figma-offset-y":`${a.parameters?.figmaOffset?.y??0}px`})},[x.value(f)?(i(),p("img",{key:0,class:"design",src:x.value(f),alt:"Figma snapshot"},null,8,Q)):b("",!0),n("div",{class:"implementation",style:k({opacity:r.value})},[n("div",{style:k(s.wrapperStyle),class:q({"pseudo-hover-all":!!a.parameters?.pseudo?.hover,"pseudo-active-all":!!a.parameters?.pseudo?.active,"pseudo-focus-all":!!a.parameters?.pseudo?.focus,"pseudo-focus-visible-all":!!a.parameters?.pseudo?.focusVisible})},[s.component?(i(),E(J(s.component),_({key:0,ref_for:!0},{...l.props,...a}),null,16)):b("",!0)],6)],4)],4))),128))]))),128))])]))}});F.__docgenInfo={exportName:"default",displayName:"DesignComparator",description:"",tags:{},props:[{name:"designsToCompare",required:!0,type:{name:"DesignsToCompare"}},{name:"component",required:!0,type:{name:"Component"}},{name:"wrapperStyle",required:!1,type:{name:"StyleValue"},defaultValue:{func:!1,value:"undefined"}}],sourceFiles:["/home/runner/work/knime-designsystem/knime-designsystem/packages/components/src/test-utils/DesignComparator.vue"]};function Y(t){const s=Object.keys(t);function r(m,v){if(m===s.length)return[v];const u=s[m];return t[u].flatMap(c=>r(m+1,{...v,[u]:c}))}return r(0,{})}function P(t){const s=[];return t.combinationsProps.forEach(r=>{s.push(...Y(r))}),{parameters:{controls:{disable:!0},...t.parameters},render:()=>({setup(){return{allCombinations:s,component:t.component,pseudoStates:["",...t.pseudoStates??[]]}},template:`
      Hover to see the props of each instance:
      <div style="display: grid; grid-template-columns: repeat(4, auto); gap: 1rem;">
        <template v-for="(state, stateIndex) in pseudoStates" :key="state">
          <div v-if="state" style="grid-column: span 4; font-weight: bold; margin-top: 1rem; text-transform: capitalize;">
            {{ state }}
          </div>
          <template v-for="(props, index) in allCombinations" :key="index">
            <div 
              :title="state ? JSON.stringify({ ...props, _pseudo: state }, null, 2) : JSON.stringify(props, null, 2)" 
              style="display: grid; 
              gap: 0.5rem;"
              :class="state ? \`pseudo-\${state}-all\` : undefined"
            >
              <div>
                <div style="font-size: 10px; color: var(--kds-color-text-and-icon-subtle);">
                  {{ index + stateIndex * allCombinations.length }}
                </div>
                <Component :is="component" v-bind="props" />
              </div>
            </div>
          </template>
        </template>
      </div>
    `})}}function ee(t){return{parameters:{a11y:{disable:!0},controls:{disable:!0},actions:{disable:!0},chromatic:{disableSnapshot:!0}},render:()=>({components:{DesignComparator:F},setup(){return{designsToCompare:t.designsToCompare,component:t.component,wrapperStyle:t.wrapperStyle}},template:`
        <DesignComparator 
          :designs-to-compare="designsToCompare" 
          :component="component"
          :wrapper-style="wrapperStyle"
        />`})}}function te(t){return{render:s=>({setup(){return{component:t.component,width:t.width||200,height:t.height||"auto",args:s}},template:`
      Component without size restrictions to check if it has a max size itself<br>
      <Component :is="component" v-bind="args" /><br>
      Component with size restrictions. Try by resizing the box!
      <div :style="{ width: width + 'px', height: height + 'px', padding: '10px', background: 'lightgray', resize: 'both', overflow: 'auto' }">
        <Component :is="component" v-bind="args" />
      </div>`})}}export{te as a,P as b,ee as c};
