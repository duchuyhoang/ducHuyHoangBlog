(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[165],{454:function(e,n,t){(window.__NEXT_P=window.__NEXT_P||[]).push(["/tags",function(){return t(498)}])},297:function(e,n,t){"use strict";var r=t(4051),c=t.n(r),i=t(5893),s=t(1664),a=t.n(s),o=(t(7294),t(381)),l=t.n(o),u=t(1163),d=t(5205),f=t(2775),m=t(7516);function h(e,n,t,r,c,i,s){try{var a=e[i](s),o=a.value}catch(l){return void t(l)}a.done?n(o):Promise.resolve(o).then(r,c)}n.Z=function(e){var n=e.author,t=e.date,r=e.title,s=e.slug,o=e.description,p=e.image,v=e.tags,g=(0,u.useRouter)(),x=(0,f.F)().theme,j=function(){var e,n=(e=c().mark((function e(){return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.push("/post/".concat(s));case 2:case"end":return e.stop()}}),e)})),function(){var n=this,t=arguments;return new Promise((function(r,c){var i=e.apply(n,t);function s(e){h(i,r,c,s,a,"next",e)}function a(e){h(i,r,c,s,a,"throw",e)}s(void 0)}))});return function(){return n.apply(this,arguments)}}();return(0,i.jsxs)("div",{className:"horizontal-card flex-sm-nowrap",onClick:j,style:{boxShadow:x===d.C6.LIGHT?"1px 1px 6px rgba(216, 216, 216, 0.5)":"none"},children:[(0,i.jsx)("div",{className:"image col-12 col-sm-4 col-md-3",children:(0,i.jsx)("img",{src:p,alt:"",className:"horizontal-card-img"})}),(0,i.jsx)("div",{className:"p-2 p-sm-3 col-12 col-sm-8 col-md-9",children:(0,i.jsxs)("div",{className:"horizontal-card-content-container ml-2 mr-2",children:[(0,i.jsx)(a(),{href:"/post/".concat(s),passHref:!0,children:(0,i.jsx)("a",{className:"title",children:r})}),(0,i.jsxs)("div",{className:"d-flex w-100 mb-1",style:{flexWrap:"wrap"},children:[(0,i.jsxs)("div",{className:"col-md-9 col-12 info mb-2 tag-container",children:[(0,i.jsx)("p",{children:null===n||void 0===n?void 0:n.name}),(0,i.jsx)("span",{className:"ml-1 mr-1",children:"on"}),null===v||void 0===v?void 0:v.map((function(e,n){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(a(),{href:"/tag?tag=".concat(e),passHref:!0,children:(0,i.jsx)("a",{children:e})},"tag_".concat(n)),n!==v.length-1&&(0,i.jsx)("span",{children:","})]})}))]}),(0,i.jsxs)("div",{className:"col-md-3 col-12 d-flex align-center justify-content-md-end",children:[(0,i.jsx)("span",{className:"mr-1 mb-1",children:(0,i.jsx)(m.R1q,{})}),(0,i.jsx)("p",{className:"date mb-0",children:l()(t).format("YYYY-MM-DD")})]})]}),(0,i.jsx)("div",{className:"description",children:o})]})})]})}},498:function(e,n,t){"use strict";t.r(n),t.d(n,{__N_SSG:function(){return p},default:function(){return v}});var r=t(5893),c=t(7294),i=function(e){var n=e.label,t=e.handleToggle,c=e.value,i=e.isActive;return(0,r.jsx)("div",{className:"tag-filter ".concat(i?"tag-filter-active":""),onClick:function(){t(c,!i)},children:n})},s=t(682),a=t(297),o=t(5675),l=t.n(o);function u(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}var d,f=function(e){var n=e.text,t=e.containerProps;return(0,r.jsxs)("div",function(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),r.forEach((function(n){u(e,n,t[n])}))}return e}({className:"d-flex align-items-center justify-content-center flex-column"},t,{children:[(0,r.jsx)(l(),{src:"/nothing-found.png",width:330,height:330,alt:"Nothing found"}),(0,r.jsx)("h2",{className:"mt-3",children:null!==n&&void 0!==n?n:"Nothing found"})]}))};function m(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function h(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{},r=Object.keys(t);"function"===typeof Object.getOwnPropertySymbols&&(r=r.concat(Object.getOwnPropertySymbols(t).filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable})))),r.forEach((function(n){m(e,n,t[n])}))}return e}!function(e){e.AND="AND",e.OR="OR"}(d||(d={}));var p=!0,v=function(e){var n=e.tags,t=e.listPost,o=(0,c.useState)([]),l=o[0],u=o[1],m=(0,c.useState)(d.AND),p=m[0],v=m[1],g=function(e,n){var t=new Set(l);n?t.add(e):t.delete(e),u(Array.from(t))},x=function(e){return l.includes(e)},j=(0,c.useMemo)((function(){return t.filter((function(e){return p===d.AND?l.every((function(n){return e.tags.includes(n)})):e.tags.some((function(e){return l.includes(e)}))}))}),[p,t,l]),N=(0,c.useMemo)((function(){return 0===l.length&&p===d.OR||(l.length>0&&0===j.length||void 0)}),[j,l,p]);return(0,r.jsx)("section",{className:"tag-page",children:(0,r.jsxs)(s.Z,{fluid:"lg pt-3",children:[(0,r.jsxs)("div",{className:"d-flex justify-content-between tag-page-title align-items-center",children:[(0,r.jsx)("h1",{children:"Tags and Condition"}),(0,r.jsxs)("select",{className:"form-select conditional-option-filter",value:p,onChange:function(e){v(e.target.value)},children:[(0,r.jsx)("option",{value:d.AND,children:"And"}),(0,r.jsx)("option",{value:d.OR,children:"Or"})]})]}),(0,r.jsx)("div",{className:"tag-container mt-4",children:n.map((function(e){return(0,r.jsx)(i,{label:e,value:e,handleToggle:g,isActive:x(e)},e)}))}),N?(0,r.jsx)("div",{className:"mt-5 mb-5 pt-5 pb-5",children:(0,r.jsx)(f,{})}):(0,r.jsx)("div",{className:"mt-4 mb-4 py-2 pr-2 post-container",children:j.map((function(e){return(0,r.jsx)("div",{className:"mb-3",children:(0,r.jsx)(a.Z,h({},e))},e.slug)}))})]})})}},682:function(e,n,t){"use strict";var r=t(4184),c=t.n(r),i=t(7294),s=t(6792),a=t(5893);const o=i.forwardRef((({bsPrefix:e,fluid:n,as:t="div",className:r,...i},o)=>{const l=(0,s.vE)(e,"container"),u="string"===typeof n?`-${n}`:"-fluid";return(0,a.jsx)(t,{ref:o,...i,className:c()(r,n?`${l}${u}`:l)})}));o.displayName="Container",o.defaultProps={fluid:!1},n.Z=o}},function(e){e.O(0,[885,874,675,774,888,179],(function(){return n=454,e(e.s=n);var n}));var n=e.O();_N_E=n}]);