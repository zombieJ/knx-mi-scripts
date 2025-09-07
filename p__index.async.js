"use strict";(self.webpackChunk=self.webpackChunk||[]).push([[866],{58895:function(V,f,e){e.r(f),e.d(f,{default:function(){return L}});var N=e(82242),i=e.n(N),Z=e(39647),K=e.n(Z),X=e(79800),y=e.n(X),j=e(21739),k=e(17543),a=e(98964),m=e(23452),S=e(57852),w=e(80421),s=e(11053),I=e(85759),P=`
- id: '\u3010\u7F16\u53F7\u3011'
  alias: '\u3010\u623F\u95F4\u3011 - open \u3010KNX\u8BBE\u5907ID\u3011 2 \u3010\u5C0F\u7C73\u8BBE\u5907\u6309\u952EID\u3011'
  description: ''
  triggers:
  - trigger: state
    entity_id:
    - \u3010KNX\u8BBE\u5907ID\u3011
    to: 'on'
  conditions:
  - condition: device
    type: is_off
    device_id: \u3010\u5C0F\u7C73\u8BBE\u5907ID\u3011
    entity_id: \u3010\u5C0F\u7C73\u8BBE\u5907\u6309\u952EID\u3011
    domain: switch
  actions:
  - type: turn_on
    device_id: \u3010\u5C0F\u7C73\u8BBE\u5907ID\u3011
    entity_id: \u3010\u5C0F\u7C73\u8BBE\u5907\u6309\u952EID\u3011
    domain: switch
  mode: single
`.trim(),T=`
- id: '\u3010\u7F16\u53F7\u3011'
  alias: '\u3010\u623F\u95F4\u3011 - close \u3010KNX\u8BBE\u5907ID\u3011 2 \u3010\u5C0F\u7C73\u8BBE\u5907\u6309\u952EID\u3011'
  description: ''
  triggers:
  - trigger: state
    entity_id:
    - \u3010KNX\u8BBE\u5907ID\u3011
    to: 'off'
  conditions:
  - condition: device
    type: is_on
    device_id: \u3010\u5C0F\u7C73\u8BBE\u5907ID\u3011
    entity_id: \u3010\u5C0F\u7C73\u8BBE\u5907\u6309\u952EID\u3011
    domain: switch
  actions:
  - type: turn_off
    device_id: \u3010\u5C0F\u7C73\u8BBE\u5907ID\u3011
    entity_id: \u3010\u5C0F\u7C73\u8BBE\u5907\u6309\u952EID\u3011
    domain: switch
  mode: single
`.trim(),O=`
- id: '\u3010\u7F16\u53F7\u3011'
  alias: '\u3010\u623F\u95F4\u3011 - open \u3010\u5C0F\u7C73\u8BBE\u5907\u6309\u952EID\u3011 2 \u3010KNX\u8BBE\u5907ID\u3011'
  description: ''
  triggers:
  - type: turned_on
    device_id: \u3010\u5C0F\u7C73\u8BBE\u5907ID\u3011
    entity_id: \u3010\u5C0F\u7C73\u8BBE\u5907\u6309\u952EID\u3011
    domain: switch
    trigger: device
  conditions:
  - condition: state
    entity_id: \u3010KNX\u8BBE\u5907ID\u3011
    state: 'off'
  actions:
  - action: light.turn_on
    metadata: {}
    data: {}
    target:
      entity_id: \u3010KNX\u8BBE\u5907ID\u3011
  mode: single
`.trim(),M=`
- id: '\u3010\u7F16\u53F7\u3011'
  alias: '\u3010\u623F\u95F4\u3011 - close \u3010\u5C0F\u7C73\u8BBE\u5907\u6309\u952EID\u3011 2 \u3010KNX\u8BBE\u5907ID\u3011'
  description: ''
  triggers:
  - type: turned_off
    device_id: \u3010\u5C0F\u7C73\u8BBE\u5907ID\u3011
    entity_id: \u3010\u5C0F\u7C73\u8BBE\u5907\u6309\u952EID\u3011
    domain: switch
    trigger: device
  conditions:
  - condition: state
    entity_id: \u3010KNX\u8BBE\u5907ID\u3011
    state: 'on'
  actions:
  - action: light.turn_off
    metadata: {}
    data: {}
    target:
      entity_id: \u3010KNX\u8BBE\u5907ID\u3011
  mode: parallel
`.trim(),W=`
- id: '`.concat(Date.now()-233,`'
  alias: resync all knx 2 mi
  description: ""
  triggers:
    - trigger: homeassistant
      event: start
  conditions: []
  actions:
    - action: automation.turn_off
      metadata: {}
      data:
        stop_actions: true
      target:
        label_id: mi_2_knx
    - delay: "00:01:00"
    - action: automation.turn_on
      metadata: {}
      data: {}
      target:
        label_id: sync
  mode: single
`),h=function(g,C,x,l,D,E,v){var p=g.replaceAll("\u3010\u623F\u95F4\u3011",C).replaceAll("\u3010\u7F16\u53F7\u3011",(v+E).toString()).replaceAll("\u3010\u5C0F\u7C73\u8BBE\u5907ID\u3011",l).replaceAll("\u3010\u5C0F\u7C73\u8BBE\u5907\u6309\u952EID\u3011",D).replaceAll("\u3010KNX\u8BBE\u5907ID\u3011",x)+`
`;return p},u=e(27174),z=["key","name"];function L(){var A=k.Z.useApp(),g=A.modal,C=a.Z.useForm(),x=y()(C,1),l=x[0],D=(0,j.useState)(""),E=y()(D,2),v=E[0],p=E[1];(0,j.useEffect)(function(){var F=localStorage.getItem("knxMiFormValues");if(F)try{var t=JSON.parse(F);l.setFieldsValue(t)}catch(r){console.error("Failed to parse localStorage data",r)}},[l]);var $=function(t,r){localStorage.setItem("knxMiFormValues",JSON.stringify(r))},H=function(t){if(!t.items||!Array.isArray(t.items)||t.items.length===0){g.info({title:"\u63D0\u793A",content:"\u81F3\u5C11\u9700\u8981\u6DFB\u52A0\u4E00\u7EC4 KNX/\u5C0F\u7C73 \u5F00\u5173\u7684\u6620\u5C04\u5173\u7CFB"});return}var r=[],d=0,o=Date.now();t.items&&Array.isArray(t.items)&&t.items.forEach(function(n){n&&n.knxSwitchId&&n.miSwitchId&&(r.push("##### KNX: ".concat(n.knxSwitchName||"\u9ED8\u8BA4\u623F\u95F4"," (").concat(n.knxSwitchId,") -> \u5C0F\u7C73: ").concat(n.miSwitchName||"\u9ED8\u8BA4\u623F\u95F4"," (").concat(n.miDeviceId,".").concat(n.miSwitchId,")")),r.push(h(P,n.knxSwitchName||"\u9ED8\u8BA4\u623F\u95F4",n.knxSwitchId,n.miDeviceId,n.miSwitchId,d++,o),h(T,n.knxSwitchName||"\u9ED8\u8BA4\u623F\u95F4",n.knxSwitchId,n.miDeviceId,n.miSwitchId,d++,o),h(O,n.knxSwitchName||"\u9ED8\u8BA4\u623F\u95F4",n.knxSwitchId,n.miDeviceId,n.miSwitchId,d++,o),h(M,n.knxSwitchName||"\u9ED8\u8BA4\u623F\u95F4",n.knxSwitchId,n.miDeviceId,n.miSwitchId,d++,o)))}),p(r.join(`
`))};return(0,u.jsxs)(m.Z,{children:[(0,u.jsxs)(m.Z.Panel,{defaultSize:"50%",style:{paddingInline:24},children:[(0,u.jsxs)(S.Z,{children:[(0,u.jsx)("h3",{children:"KNX-MI \u6620\u5C04\u914D\u7F6E"}),(0,u.jsx)("pre",{children:(0,u.jsxs)("ul",{style:{margin:0},children:[(0,u.jsxs)("li",{children:["\u5F00\u5173\u540D\u5B57\u53EF\u4EE5\u968F\u4FBF\u5199\uFF0C\u63A8\u8350\u81EA\u5DF1\u597D\u8BB0\u7684\uFF0C\u5982\uFF1A",(0,u.jsx)("strong",{children:"knx-\u4E3B\u5367-\u4E3B\u706F"})]}),(0,u.jsxs)("li",{children:["\u5B9E\u4F53 ID \u5728\uFF1A",(0,u.jsx)("strong",{children:"\u8BBE\u7F6E - \u8BBE\u5907\u4E0E\u670D\u52A1 - \u5B9E\u4F53"})," ","\u4E2D\u67E5\u770B\u3002\u70B9\u5F00\u5B9E\u4F53\u540E\uFF0C\u5728\u5F39\u7A97\u53F3\u4E0A\u89D2\u70B9\u51FB ",(0,u.jsx)("strong",{children:"\u8BBE\u7F6E"})," ","\u6309\u94AE\uFF0C\u590D\u5236 ",(0,u.jsx)("strong",{children:"\u5B9E\u4F53\u6807\u8BC6\u7B26"})]}),(0,u.jsxs)("li",{children:["\u8BBE\u5907 ID \u5728\uFF1A",(0,u.jsx)("strong",{children:"\u8BBE\u7F6E - \u8BBE\u5907\u4E0E\u670D\u52A1 - \u8BBE\u5907"})," ","\u4E2D\u67E5\u770B\u3002\u70B9\u5F00\u8BBE\u5907\u540E\uFF0C\u70B9\u51FB ",(0,u.jsx)("strong",{children:"\u4FE1\u606F"}),"\uFF0C\u5728\u5F39\u7A97\u53F3\u4E0A\u89D2\u70B9\u51FB"," ",(0,u.jsx)("strong",{children:"\u8BBE\u7F6E"})," \u6309\u94AE\uFF0C\u590D\u5236 ",(0,u.jsx)("strong",{children:"\u5B9E\u4F53\u6807\u8BC6\u7B26"})]}),(0,u.jsxs)("li",{children:[(0,u.jsx)(S.Z.Text,{strong:!0,type:"danger",children:"\u5907\u4EFD"})," ","automations.yaml \u6587\u4EF6\uFF0C\u5C06\u751F\u6210\u7684\u811A\u672C\u8986\u76D6\u8BE5\u6587\u4EF6"]})]})})]}),(0,u.jsx)(a.Z,{form:l,onFinish:H,onValuesChange:$,autoComplete:"off",children:(0,u.jsx)(a.Z.List,{name:"items",children:function(t,r){var d=r.add,o=r.remove;return(0,u.jsxs)(u.Fragment,{children:[t.map(function(n){var J=n.key,c=n.name,B=K()(n,z);return(0,u.jsxs)(w.Z,{align:"flex-start",gap:8,children:[(0,u.jsx)(a.Z.Item,i()(i()({},B),{},{name:[c,"knxSwitchName"],rules:[{required:!0,message:"\u5FC5\u586B"}],children:(0,u.jsx)(s.Z,{placeholder:"knx\u5F00\u5173\u540D\u79F0"})})),(0,u.jsx)(a.Z.Item,i()(i()({},B),{},{name:[c,"knxSwitchId"],rules:[{required:!0,message:"\u5FC5\u586B"}],children:(0,u.jsx)(s.Z,{placeholder:"knx\u5F00\u5173ID"})})),(0,u.jsx)(a.Z.Item,i()(i()({},B),{},{name:[c,"miSwitchName"],rules:[{required:!0,message:"\u5FC5\u586B"}],children:(0,u.jsx)(s.Z,{placeholder:"\u5C0F\u7C73\u5F00\u5173\u540D\u79F0"})})),(0,u.jsx)(a.Z.Item,i()(i()({},B),{},{name:[c,"miDeviceId"],rules:[{required:!0,message:"\u5FC5\u586B"}],children:(0,u.jsx)(s.Z,{placeholder:"\u8BBE\u5907ID"})})),(0,u.jsx)(a.Z.Item,i()(i()({},B),{},{name:[c,"miSwitchId"],rules:[{required:!0,message:"\u5FC5\u586B"}],children:(0,u.jsx)(s.Z,{placeholder:"\u5C0F\u7C73\u5F00\u5173ID"})})),(0,u.jsx)(I.ZP,{onClick:function(){return o(c)},type:"primary",danger:!0,children:"\u5220\u9664"})]},J)}),(0,u.jsx)(I.ZP,{type:"dashed",onClick:function(){return d()},block:!0,children:"\u6DFB\u52A0"}),(0,u.jsx)(I.ZP,{type:"primary",htmlType:"submit",block:!0,style:{marginTop:16},children:"\u751F\u6210\u811A\u672C"})]})}})})]}),(0,u.jsx)(m.Z.Panel,{defaultSize:"50%",style:{paddingInline:24},children:(0,u.jsx)(s.Z.TextArea,{value:v,readOnly:!0,style:{height:"90vh",resize:"none"}})})]})}}}]);
