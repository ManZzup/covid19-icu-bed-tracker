(this["webpackJsonp@dhis2/app-shell"]=this["webpackJsonp@dhis2/app-shell"]||[]).push([[127],{428:function(e,t,a){},435:function(e,t,a){"use strict";a.r(t);var n=a(194),r=a(1),i=a.n(r),l=a(189),c=a(17),s=(a(7),a(5)),o=a(272),d=a(204);const u=Object(d.b)({name:"app",initialState:{activeUser:null,activeOrgUnit:null,activeICU:null,metaData:null,icuList:[],ICUEventId:"fKXrko0yhua"},reducers:{setActiveOrgUnit(e,t){e.activeOrgUnit=t.payload},setActiveICU(e,t){e.activeICU=t.payload},setActiveUser(e,t){e.activeUser=t.payload},setMetaData(e,t){e.metaData=t.payload},setICUBeds(e,t){e.activeICU&&e.activeICU.id===t.payload.icuId&&(e.activeICU.beds=t.payload.beds)},updateBedStatus(e,t){const a=e.activeICU.beds.findIndex(e=>e.trackedEntityInstance===t.payload.bedId);a>-1&&(e.activeICU.beds[a].status=t.payload.status,e.activeICU.beds[a].lastEvent=t.payload.lastEvent)},updateFilteredICUList(e,t){e.icuList=t.payload},updateICUStat(e,t){const a=e.icuList.findIndex(e=>e.id===t.payload.icuId);a>-1&&(e.icuList[a].available=t.payload.stat.available,e.icuList[a].total=t.payload.stat.total,e.icuList[a].name=t.payload.icuName)},updateICUDistance(e,t){const a=e.icuList.findIndex(e=>e.id===t.payload.icuId);a>-1&&(e.icuList[a].distance=t.payload.distance)}}}),{setActiveOrgUnit:m,setActiveICU:p,setMetaData:E,setICUBeds:y,updateBedStatus:b,updateFilteredICUList:v,updateICUStat:g,setActiveUser:f,updateICUDistance:O}=u.actions;var h=u.reducer;const C={organisationUnits:{resource:"organisationUnits.json",params:{paging:"false",fields:"id,name,level,children,geometry,parent[id, displayName]"}}};let I={};function k(){const{loading:e,error:t,data:a,refetch:d}=Object(c.c)(C),[u,E]=Object(r.useState)(null),[y,b]=Object(r.useState)(!1),g=Object(l.b)();var f=[];Object(r.useEffect)(()=>{if(a){const e=a.organisationUnits.organisationUnits,t=a.organisationUnits.organisationUnits.filter(e=>1===e.level)[0];t.children=function e(t,a){let r=[];for(var i of a){let a=t.filter(e=>e.id===i.id);1===a.length&&(a=a[0],0===a.children.length?a.children=null:a.children=e(t,a.children),r.push(Object(n.a)({},a,{active:!1})))}let l=[];for(var i of r)f=[],O(i,5),f.length>0&&(l.push(i),I[i.id]=Object(n.a)({},i,{list:[...f]}));return l}(e,t.children),E(t)}},[e]);function O(e,t){if(e.level===t&&e.name.includes("ICU"))f.push(Object(n.a)({},e));else if(e.children)for(var a of e.children)I[a.id]?f=f.concat(I[a.id].list):O(a,t)}const h=e=>{f=[],O(e,5);let t=[];for(var a of f)t.push(Object(n.a)({},a,{distance:0,total:null,available:null,geometry:I[a.parent.id]&&I[a.parent.id].geometry&&"Point"===I[a.parent.id].geometry.type?{lat:I[a.parent.id].geometry.coordinates[1],lng:I[a.parent.id].geometry.coordinates[0]}:{lat:0,lng:0}}));g(v(t)),g(m({id:e.id,name:e.name,level:e.level})),5===e.level&&g(p({id:e.id,beds:[]}))};return i.a.createElement(s.d,null,u&&i.a.createElement(o.Treebeard,{data:u,onToggle:(e,t)=>{y&&(y.active=!1),e.active=!0,e.children&&(e.toggled=t),b(e),E(Object.assign({},u)),h(e)}}))}a(428);var U=a(25);const N=Object(d.b)({name:"notification",initialState:{isOpen:!1,message:null,type:null},reducers:{showNotification(e,t){e.isOpen=!0,e.message=t.payload.message,e.type=t.payload.type},hideNotification(e,t){isOpen=!1,e.message=null,e.type=null}}});var j=N.reducer;const{showNotification:S,hideNotification:A}=N.actions,D=["v5eNzdQsLox","eBlbs7BzVfX","JJ2DQSnlhfR","m64bCKnUD8L","Xar8cTc8XN0","k7eXIuzzhat","JZXI1GzSoYx"],T=["Jio5MTDVFo4","yvOZEiBS5cd","CGp0lKLkSKY","YCILPvLTofG"],w=["j1hbO7zzRgV","sK09QRLNyAA","malZQqUEzi9","qh9bc6jlauE"];function B(e,t){let a={};return"Discharged"===t?a={dataElement:"MtYPOv0wqCg",value:"Discharged"}:"Admitted"===t?a={dataElement:"MtYPOv0wqCg",value:"Admitted"}:"Reserved"===t&&(a={dataElement:"MtYPOv0wqCg",value:"Reserved"}),a}function V(e){if(e.dataValues.length>0)switch(e.dataValues[0].value){case"Discharged":return"AVAILABLE";case"Admitted":return"OCCUPIED";case"Reserved":return"RESERVED"}return""}function L(e,t){return async(a,n,r)=>{try{const n={results:{resource:"trackedEntityInstances",params:{ou:e,fields:"trackedEntityInstance,attributes[attribute,displayName,value],enrollments",program:t}}},l=(await r.query(n)).results.trackedEntityInstances;for(var i of l)a(Y(i.trackedEntityInstance));a(y({icuId:e,beds:l}))}catch(l){a(S({message:"failed to load icu bed data",type:"error"})),console.log("Error in query:",l)}}}function Y(e){return async(t,a,n)=>{const r={events:{resource:"events",params:{trackedEntityInstance:e,paging:"false",status:"ACTIVE"}}},i=(await n.query(r)).events.events;let l="";if(i.length>0){const a=i[0],n=a.dataValues.findIndex(e=>"MtYPOv0wqCg"===e.dataElement);if(n>-1)switch(a.dataValues[n].value){case"Discharged":l="AVAILABLE";break;case"Admitted":l="OCCUPIED";break;case"Reserved":l="RESERVED"}t(b({bedId:e,status:l,lastEvent:a}))}}}function R(e,t,a,n,r,i=[]){return async(l,c,s)=>{try{const o={events:{resource:"events",params:{trackedEntityInstance:e,paging:"false",status:"ACTIVE"}}},d=await s.query(o);if(d.events.events.length>0){const r={resource:"events",type:"create",data:{event:d.events.events[0].event,trackedEntityInstance:e,program:t,programStage:a,enrollment:n,orgUnit:n,completedDate:U().format("YYYY-MM-DD"),status:"COMPLETED"}};await s.mutate(r)}const u=[B(c().app.metaData.dataElements,r),...i],m={resource:"events",type:"create",data:{trackedEntityInstance:e,program:t,programStage:a,enrollment:n,orgUnit:n,dataValues:u,eventDate:U().format("YYYY-MM-DD"),status:"ACTIVE"}};await s.mutate(m);l(Y(e))}catch(o){l(S({message:"error in adding bed event",type:"error"})),console.log("Error in creating:",o)}}}function z(e,t={}){return async(a,n,r)=>{try{let n="";for(var i in t){if(0===t[i].length)continue;const e=t[i].map(e=>e.value);n+="".concat(i,":IN:").concat(e.join(";"),",")}n=n.substr(0,n.length-1);const c={events:{resource:"events",params:{orgUnit:e.id,paging:"false",status:"ACTIVE"}},filteredTEI:{resource:"trackedEntityInstances",params:{ou:e.id,paging:"false",fields:"trackedEntityInstance",filter:n}},organisationUnit:{resource:"organisationUnits/"+e.id,params:{fields:"id,displayName,parent[displayName, geometry]"}}},s=await r.query(c);let o={available:0,total:0};for(var l of s.events.events){-1!==s.filteredTEI.trackedEntityInstances.findIndex(e=>e.trackedEntityInstance===l.trackedEntityInstance)&&("AVAILABLE"===V(l)&&o.available++,o.total++)}a(g({icuId:e.id,stat:o,icuName:"".concat(s.organisationUnit.parent.displayName," - ").concat(s.organisationUnit.displayName)}))}catch(c){a(S({message:"error in retrieving ICU status",type:"error"})),console.log("Error in creating:",c)}}}function M(e,t,a){const{setLocationData:n,sortedBy:r,setSortedBy:i,sortOrder:l,setSortOrder:c}=a;let s=t.slice();s=s.sort((t,a)=>{let n=t[e],i=a[e],c=0;return n>i?c=1:n<i&&(c=-1),r===e&&(c=-1*c*l),c}),n(s),i(e),c(-1*l)}function P({data:e,onSelectICU:t}){const[a,n]=Object(r.useState)([]),[c,o]=Object(r.useState)("distance"),[d,u]=Object(r.useState)(1),m=(Object(l.b)(),{setLocationData:n,sortedBy:c,setSortedBy:o,sortOrder:d,setSortOrder:u});return Object(r.useEffect)(()=>{M(c,e,m)},[e]),e?i.a.createElement(s.x,null,i.a.createElement(s.B,null,i.a.createElement(s.C,null,i.a.createElement(s.A,null,i.a.createElement(s.i,{primary:"name"===c,onClick:()=>{M("name",a,m)}},"ICU")),i.a.createElement(s.A,null,i.a.createElement(s.i,{primary:"distance"===c,onClick:()=>{M("distance",a,m)}},"Distance")),i.a.createElement(s.A,null,i.a.createElement(s.i,{primary:"total"===c,onClick:()=>{M("total",a,m)}},"TotalBeds")),i.a.createElement(s.A,null,i.a.createElement(s.i,{primary:"available"===c,onClick:()=>{M("available",a,m)}},"AvailableBeds")))),i.a.createElement(s.y,null,a.map((e,a)=>i.a.createElement(s.C,{key:a},i.a.createElement(s.z,null,i.a.createElement("a",{href:"#",onClick:()=>t(e)},e.name)),i.a.createElement(s.z,null,e.distance),i.a.createElement(s.z,null,e.total),i.a.createElement(s.z,null,e.available))))):i.a.createElement("div",null)}var X=a(190);const x=Object(X.combineReducers)({app:h,notification:j});Object(d.a)({reducer:x});var G=a(15);const F="VIEW_ICU",q="CONFIG_ICU",W="ADD_EVENT";function J(e,t,a,n,r){return"LkEkMDG0zfj"===t.group||(!(e!==F||!n[t.group]||!n[t.group].canRead)||(!!(e===q&&t.organisationUnits.indexOf(r)>-1&&n[t.group]&&n[t.group].canWrite)||!!(e===W&&a[t.group]&&a[t.group].canWrite&&t.organisationUnits.indexOf(r)>-1)))}var K=a(429),Z=a(433);function Q({name:e,status:t,onView:a,onOccupy:n,onDischarge:l,onReserve:c,hasEventPerm:o,onViewPatient:d,hasEditPerm:u}){const m=Object(r.useRef)(null),[p,E]=Object(r.useState)(!1),y=()=>{o&&E(!p)};return i.a.createElement("div",{className:"icu-bed ".concat("AVAILABLE"===t?"available":"OCCUPIED"===t?"occupied":"RESERVED"===t?"reserved":""),ref:m,onClick:y},i.a.createElement(K.a,{icon:Z.a,size:"lg"}),i.a.createElement("span",null,e),p&&Object(G.createPortal)(i.a.createElement(s.u,{onClick:y,transparent:!0},i.a.createElement(s.t,{placement:"right",reference:m},i.a.createElement("div",{className:"bed-options"},("AVAILABLE"===t||"RESERVED"===t)&&i.a.createElement("div",{onClick:()=>{E(!1),n()}},"Occupy"),"AVAILABLE"===t&&i.a.createElement("div",{onClick:()=>{E(!1),c()}},"Reserve"),"AVAILABLE"!==t&&i.a.createElement("div",{onClick:()=>{E(!1),l()}},"Discharge"),i.a.createElement("div",{onClick:a},"View"),u&&("OCCUPIED"===t||"RESERVED"===t)&&i.a.createElement("div",{onClick:d},"View Patient")))),document.body))}const _=[{label:"No",value:"false"},{label:"Yes",value:"true"}],H=["v5eNzdQsLox","eBlbs7BzVfX","JJ2DQSnlhfR","m64bCKnUD8L","Xar8cTc8XN0","k7eXIuzzhat","JZXI1GzSoYx"],$=["Jio5MTDVFo4","yvOZEiBS5cd","CGp0lKLkSKY","YCILPvLTofG"],ee=["tswabivShTy","Xt5tV6OFSEW","XYNBoDZS0aV"];function te(e,t){const a=e.filter(e=>e.attribute===t);return a.length>0?a[0].value:null}function ae(e,t){return e.filter(e=>e.code===t)[0]}function ne({open:e,onClose:t,selectedBed:a,editable:o}){const d=Object(l.c)(e=>e.app.metaData),u=Object(l.c)(e=>e.app.activeICU),[m,p]=Object(r.useState)([]),[E,y]=Object(r.useState)({}),b=(Object(c.b)(),Object(l.b)());if(Object(r.useEffect)(()=>{if(d){let t=d.trackedEntityType.trackedEntityTypeAttributes,n={};for(var e of t){let t=null;if(a&&(t=te(a.attributes,e.id)),"TEXT"===e.valueType)if(e.optionSet&&e.optionSet.options&&e.optionSet.options.length>0)if(t){const a=ae(e.optionSet.options,t);n[e.id]={label:a.displayName,value:a.code}}else n[e.id]={label:e.optionSet.options[0].displayName,value:e.optionSet.options[0].code};else n[e.id]=t||"";else"BOOLEAN"===e.valueType&&(n[e.id]={label:t&&"true"===t?"Yes":"No",value:t||"false"})}y(n),p(t)}},[d]),!e)return i.a.createElement(i.a.Fragment,null);const v=(e,t)=>{y(Object(n.a)({},E,{[e]:t}))},g=(e,t)=>{const a=m.find(t=>t.id===e);return a.optionSet&&a.optionSet.options&&a.optionSet.options.length>0?i.a.createElement(s.v,{key:t,label:a.formName,name:a.id,onChange:e=>v(a.id,e.selected),selected:E[a.id],disabled:!o},a.optionSet.options.map((e,t)=>i.a.createElement(s.w,{key:t,label:e.displayName,value:e.code}))):"TEXT"===a.valueType?i.a.createElement(s.j,{key:t,label:a.formName,name:a.id,type:"text",onChange:e=>v(a.id,e.value),value:E[a.id],disabled:!o}):"BOOLEAN"===a.valueType?i.a.createElement(s.v,{key:t,label:a.formName,name:a.id,onChange:e=>v(a.id,e.selected),selected:E[a.id],disabled:!o},_.map((e,t)=>i.a.createElement(s.w,{key:t,label:e.label,value:e.value}))):void 0};return i.a.createElement(s.m,{open:!0},i.a.createElement(s.p,null,o?a?"Update":"Add":"View"," ICU Bed"),i.a.createElement(s.o,null,m.length>0&&i.a.createElement("div",{className:"form"},ee.map((e,t)=>g(e,t)),i.a.createElement("h4",null,"Facilities"),$.map((e,t)=>g(e,t)),i.a.createElement("h4",null,"Expertise"),H.map((e,t)=>g(e,t)))),i.a.createElement(s.n,null,i.a.createElement(s.c,{end:!0},i.a.createElement(s.b,{onClick:t,secondary:!0,type:"button"},"Close"),o&&i.a.createElement(s.b,{onClick:async()=>{const e=[];for(var n in E)e.push({attribute:n,value:E[n].value?E[n].value:E[n]});b(a?function(e,t,a){return async(n,r,i)=>{try{const l={resource:"trackedEntityInstances/"+t,type:"update",data:{orgUnit:e,attributes:a}};await i.mutate(l);n(L(e,r().app.metaData.id))}catch(l){n(S({message:"error in updating bed",type:"error"})),console.log("Error in creating:",l)}}}(u.id,a.trackedEntityInstance,e):function(e,t,a,n){return async(r,i,l)=>{try{const c={resource:"trackedEntityInstances",type:"create",data:{trackedEntityType:e,orgUnit:t,attributes:n,enrollments:[{orgUnit:t,program:a,enrollmentDate:U().format("YYYY-MM-DD"),incidentDate:U().format("YYYY-MM-DD")}]}};r(R((await l.mutate(c)).response.importSummaries[0].reference,a,i().app.ICUEventId,t,"Discharged")),r(L(t,a))}catch(c){r(S({message:"error in creating bed",type:"error"})),console.log("Error in creating:",c)}}}(d.trackedEntityType.id,u.id,d.id,e)),t()},primary:!0,type:"button"},a?"Update Bed":"Add New Bed"))))}function re(){return{show:(e,t,a)=>{confirm(e)?t():a()}}}function ie({open:e,onClose:t,selectedBed:a,actionType:c,editable:o}){const[d,u]=Object(r.useState)({}),m=Object(l.b)(),p=Object(l.c)(e=>e.app.metaData),E=Object(l.c)(e=>e.app.ICUEventId),y=Object(l.c)(e=>e.app.activeICU);re();Object(r.useEffect)(()=>{let e={};for(var t of w){const n=Object.values(p.dataElements).find(e=>e.id===t);"TEXT"===n.type&&(!o&&a.lastEvent?e[n.id]=a.lastEvent.dataValues.find(e=>e.dataElement===n.id).value:e[n.id]="")}u(e)},[a]);const b=(e,t)=>{const a=Object.values(p.dataElements).find(t=>t.id===e);if("TEXT"===a.type)return i.a.createElement(s.j,{key:t,label:a.formName,name:a.id,onChange:e=>((e,t)=>{u(Object(n.a)({},d,{[e]:t}))})(a.id,e.value),value:d[a.id],disabled:!o})};return i.a.createElement(s.m,{open:!0},i.a.createElement(s.p,null,o&&i.a.createElement("span",null,"admit"===c?"Admit":"Reserve"," New Patient"),!o&&i.a.createElement("span",null,"View Patient")),i.a.createElement(s.o,null,w.map((e,t)=>b(e,t))),i.a.createElement(s.n,null,i.a.createElement(s.c,{end:!0},i.a.createElement(s.b,{onClick:t,secondary:!0,type:"button"},"Close"),o&&i.a.createElement(s.b,{onClick:()=>{let e=[];for(var n in d)e.push({dataElement:n,value:d[n]});"admit"===c?m(R(a.trackedEntityInstance,p.id,E,y.id,"Admitted",e)):"reserve"===c&&m(R(a.trackedEntityInstance,p.id,E,y.id,"Reserved",e)),t()},primary:!0,type:"button"},"admit"===c?"Admit":"Reserve"," Patient"))))}var le=a(434);const ce={height:"600px",width:"100%"},se={lat:8.11,lng:80.77},oe=Object(n.a)({visible:!1},se);function de(e){const{onMarkerClick:t,data:a,origin:l,updateDistance:c}=e,[s,o]=Object(r.useState)(oe),[d,u]=Object(r.useState)(null),[m,p]=Object(r.useState)(null);Object(r.useEffect)(()=>{if(a){let t=[],n={};for(var e of a)n[e.parent.id]||(t.push({id:e.parent.id,name:e.parent.displayName,geometry:e.geometry,icus:[]}),n[e.parent.id]=!0),t.find(t=>t.id===e.parent.id).icus.push(e.name);let r=null,i=null;l&&(r=t.map(e=>e.geometry),i={origins:[{lat:l[1],lng:l[0]}],destinations:r,travelMode:"DRIVING"}),u(t),p(i)}},[a.length,l]);const E=e=>{o(Object(n.a)({visible:!0},e))},y={icon:{path:"M0-48c-9.8 0-17.7 7.8-17.7 17.4 0 15.5 17.7 30.6 17.7 30.6s17.7-15.4 17.7-30.6c0-9.6-7.9-17.4-17.7-17.4z",fillColor:"#00802b",fillOpacity:1,strokeColor:"",strokeWeight:0}};return i.a.createElement(le.d,{id:"script-loader",googleMapsApiKey:"AIzaSyBjlDmwuON9lJbPMDlh_LI3zGpGtpK9erc"},d&&i.a.createElement(le.b,{id:"example-map",mapContainerStyle:ce,zoom:7.6,center:se},d.map((e,a)=>i.a.createElement(le.e,{position:{lat:e.geometry.lat,lng:e.geometry.lng},onClick:()=>{t(e)},onMouseOver:()=>{E(e)},onMouseOut:()=>{E(oe)},options:y,key:a})),s.visible&&i.a.createElement(le.c,{position:s,options:{closeBoxURL:""}},i.a.createElement("div",{style:{backgroundColor:"white",opacity:.95,padding:5}},i.a.createElement("div",{style:{fontSize:14,fontColor:"#08233B"}},i.a.createElement("div",null,"Hospital: ",s.name),i.a.createElement("div",null,i.a.createElement("b",null,"ICUs")),s.icus.map(e=>i.a.createElement("div",null,e)))))),m&&i.a.createElement(le.a,{options:m,callback:(e,t)=>c(e,status)}))}function ue(e){const{isOpen:t,message:a,type:n}=Object(l.c)(e=>e.notification);return t?i.a.createElement(s.a,{duration:5e3,icon:!0,critical:"error"===n,warning:"warning"===n,success:"success"===n},a):null}function me(e,t){for(var a of e.attributes)if(a.displayName===t)return a.value;return""}function pe(){const e=Object(l.c)(e=>e.app.activeOrgUnit),t=Object(l.c)(e=>e.app.activeUser),a=Object(l.c)(e=>e.app.icuList),c=Object(l.c)(e=>e.app.metaData),o=Object(l.b)();let d=null,u=null;c&&(d=c.trackedEntityType.trackedEntityTypeAttributes.find(({id:e})=>"XYNBoDZS0aV"===e),u=c.trackedEntityType.trackedEntityTypeAttributes.find(({id:e})=>"Xt5tV6OFSEW"===e));const[E,y]=Object(r.useState)({XYNBoDZS0aV:[],Xt5tV6OFSEW:[]});if(Object(r.useEffect)(()=>{if(a)for(var e of a)null===e.total&&(o(z(e,E)),o(g({icuId:e.id,stat:{total:"Updating...",available:null}})))},[a]),Object(r.useEffect)(()=>{if(a)for(var e of a)o(z(e,E))},[E]),!e)return i.a.createElement("p",null,"Please select an organization unit");if(5===e.level)return i.a.createElement(Ee,null);return e.level<6&&i.a.createElement(i.a.Fragment,null,i.a.createElement("span",{className:"t20"},"Showing ICU Locations for ",i.a.createElement("b",null,e.name)),i.a.createElement("div",{className:"filter-area"},i.a.createElement(s.q,{selected:E.XYNBoDZS0aV,placeholder:d.displayName,onChange:({selected:e})=>{y(Object(n.a)({},E,{XYNBoDZS0aV:e}))}},d&&d.optionSet.options.map((e,t)=>i.a.createElement(s.r,{key:t,value:e.code,label:e.displayName}))),i.a.createElement(s.q,{selected:E.Xt5tV6OFSEW,placeholder:u.displayName,onChange:({selected:e})=>{y(Object(n.a)({},E,{Xt5tV6OFSEW:e}))}},u&&u.optionSet.options.map((e,t)=>i.a.createElement(s.r,{key:t,value:e.code,label:e.displayName})))),i.a.createElement("div",{className:"icu-org"},i.a.createElement("div",{className:"icu-table"},i.a.createElement(P,{data:a,onSelectICU:e=>{o(m({id:e.id,name:e.name,level:e.level})),o(p({id:e.id,beds:[]}))}})),i.a.createElement("div",{className:"icu-map"},i.a.createElement(de,{onMarkerClick:e=>{console.log(e)},data:a.map(e=>({name:e.name,parent:e.parent,geometry:e.geometry})),origin:t.origin,updateDistance:(e,t)=>{if(e.rows&&e.rows.length>0&&e.rows[0].elements&&e.rows[0].elements.length===a.length)for(var n in a)"OK"===e.rows[0].elements[n].status&&o(O({icuId:a[n].id,distance:"".concat(e.rows[0].elements[n].distance.text," (").concat(e.rows[0].elements[n].duration.text,")")}))}}))))}function Ee(){const e=Object(l.c)(e=>e.app.activeUser),t=Object(l.c)(e=>e.app.activeOrgUnit),a=Object(l.c)(e=>e.app.activeICU),n=Object(l.c)(e=>e.app.metaData),c=Object(l.c)(e=>e.app.ICUEventId),[o,d]=Object(r.useState)(!1),[u,m]=Object(r.useState)(!1),[p,E]=Object(r.useState)(!1),[y,b]=Object(r.useState)("admit"),[v,g]=Object(r.useState)(null),[f,O]=Object(r.useState)(!1),[h,C]=Object(r.useState)(!0),I=Object(l.b)(),k=re();Object(r.useEffect)(()=>{n&&(I(L(a.id,n.id)),J(W,e,n.programAccess,n.trackedEntityType.access,a.id)&&O(!0))},[n,a.id]);if(!t)return i.a.createElement("p",null,"Please select an organization unit");const U=(e,t,a)=>"true"===e.attributes.find(e=>e.attribute===t).value?i.a.createElement("p",{key:a},n.trackedEntityType.trackedEntityTypeAttributes.find(e=>e.id===t).formName):"";return i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"inner-header"},i.a.createElement("span",{className:"t20"},"Showing ICU Bed status at ",i.a.createElement("b",null,t.name)),J(q,e,n.programAccess,n.trackedEntityType.access,a.id)&&i.a.createElement(s.b,{onClick:()=>d(!0),className:"pull-right"},"Configure Beds")),i.a.createElement("div",{className:"info"},a.beds.length>0&&i.a.createElement("div",{className:"contact"},i.a.createElement("p",null,i.a.createElement("b",null,"Facilities")),T.map((e,t)=>U(a.beds[0],e,t))),a.beds.length>0&&i.a.createElement("div",{className:"contact"},i.a.createElement("p",null,i.a.createElement("b",null,"Expertise")),D.map((e,t)=>U(a.beds[0],e,t))),i.a.createElement("div",{className:"contact"},i.a.createElement("p",null,i.a.createElement("b",null,"Primary Contact")),i.a.createElement("p",null,"Dr. John Doe"),i.a.createElement("p",null,"+94771234568"),i.a.createElement("p",null,"+94717894562"))),a&&i.a.createElement(i.a.Fragment,null,o&&i.a.createElement(ye,{onBack:()=>d(!1)}),!o&&i.a.createElement("div",{className:"icu-bed-container"},!a.beds.length&&i.a.createElement("p",null,"No beds currently added"),a.beds.map((t,r)=>i.a.createElement(Q,{key:r,name:me(t,"ICU - Bed Number"),status:t.status?t.status:"IDLE",onView:()=>(e=>{g(e),m(!0)})(t),onOccupy:()=>(e=>{g(e),C(!0),b("admit"),E(!0)})(t),onDischarge:()=>(e=>{k.show("Do you want to confirm discharging this bed?",()=>I(R(e.trackedEntityInstance,n.id,c,a.id,"Discharged")),()=>{})})(t),onReserve:()=>(e=>{g(e),C(!0),b("reserve"),E(!0)})(t),onViewPatient:()=>(e=>{g(e),C(!1),E(!0)})(t),hasEventPerm:f,hasEditPerm:J(q,e,n.programAccess,n.trackedEntityType.access,a.id)})))),u&&i.a.createElement(ne,{open:u,onClose:()=>m(!1),selectedBed:v,editable:!1}),p&&i.a.createElement(ie,{open:p,onClose:()=>E(!1),selectedBed:v,actionType:y,editable:h}))}function ye({onBack:e}){const[t,a]=Object(r.useState)(!1),n=Object(l.b)(),c=Object(l.c)(e=>e.app.activeICU),[o,d]=(Object(l.c)(e=>e.app.metaData),Object(r.useState)(null)),u=re(),m=e=>{u.show("Do you really want to remove this bed?",()=>{var t,a;n((t=c.id,a=e.enrollments[0].enrollment,async(e,n,r)=>{try{const i={resource:"enrollments/"+a,type:"delete"};await r.mutate(i),e(L(t,n().app.metaData.id))}catch(i){e(S({message:"error in deleting bed",type:"error"})),console.log("Error in creating:",i)}}))},()=>{})};return i.a.createElement(i.a.Fragment,null,i.a.createElement("div",{className:"inner-header"},i.a.createElement(s.c,{end:!0},i.a.createElement(s.b,{onClick:e},"Back"),i.a.createElement(s.b,{primary:!0,onClick:()=>{d(null),a(!0)}},"Add New Bed"))),i.a.createElement("div",{className:"inner-container"},i.a.createElement(s.x,null,i.a.createElement(s.B,null,i.a.createElement(s.C,null,i.a.createElement(s.A,null,"Bed No"),i.a.createElement(s.A,null,"Bed Type"),i.a.createElement(s.A,null,"Covid Type"),i.a.createElement(s.A,null,"Action"))),c&&i.a.createElement(s.y,null,c.beds.map((e,t)=>i.a.createElement(s.C,{key:t},i.a.createElement(s.z,null,me(e,"ICU - Bed Number")),i.a.createElement(s.z,null,me(e,"ICU - Type")),i.a.createElement(s.z,null,me(e,"ICU - COVID Type")),i.a.createElement(s.z,null,i.a.createElement(s.c,null,i.a.createElement(s.b,{onClick:()=>(e=>{d(e),a(!0)})(e)},"View Details"),i.a.createElement(s.b,{destructive:!0,onClick:()=>m(e)},"Remove")))))))),t&&i.a.createElement(ne,{open:t,onClose:()=>a(!1),selectedBed:o,editable:!0}))}function be({children:e}){const t=Object(l.b)();return Object(r.useEffect)(()=>{t(async(e,t,a)=>{try{const t={program:{resource:"programs/C1wTfmmMQUn",params:{fields:"id,name,userGroupAccesses,trackedEntityType[id, displayName, userGroupAccesses, trackedEntityTypeAttributes[trackedEntityAttribute[id, displayName, formName, valueType, optionSet[options[displayName, id, code]]]]]"}},dataElements:{resource:"dataElements",params:{paging:"false",program:"C1wTfmmMQUn",fields:"id,displayName,displayFormName,valueType,optionSet[options[id, displayName, code]]"}}},{program:l,dataElements:c}=await a.query(t);let s={id:l.id,name:l.name,trackedEntityType:{id:l.trackedEntityType.id,displayName:l.trackedEntityType.displayName,trackedEntityTypeAttributes:[]}},o={};for(var n of l.userGroupAccesses)o[n.userGroupUid]={canRead:n.access.startsWith("rw"),canWrite:n.access.startsWith("rwrw")};for(var r of(s.programAccess=o,l.trackedEntityType.trackedEntityTypeAttributes))s.trackedEntityType.trackedEntityTypeAttributes.push(r.trackedEntityAttribute);let d={};for(var n of l.trackedEntityType.userGroupAccesses)d[n.userGroupUid]={canRead:n.access.startsWith("rw"),canWrite:n.access.startsWith("rwrw")};s.trackedEntityType.access=d;let u={};for(var i of c.dataElements)if(i.displayName.startsWith("ICU")){let e={id:i.id,displayName:i.displayName,formName:i.displayFormName,type:i.valueType};i.optionSet&&(e.options=i.optionSet.options),u[i.displayName]=e}s.dataElements=u,e(E(s))}catch(l){e(S({message:"failed to load metadata",type:"error"})),console.log("Error in query:",l)}}),t(async(e,t,a)=>{try{const t={user:{resource:"me",params:{fields:"id,displayName,userGroups,organisationUnits[id, geometry]"}}},{user:n}=await a.query(t);e(f({id:n.id,name:n.displayName,group:n.userGroups.length>0?n.userGroups[0].id:null,organisationUnits:n.organisationUnits.map(e=>e.id),origin:n.organisationUnits.length>0&&n.organisationUnits[0].geometry?n.organisationUnits[0].geometry.coordinates:null}))}catch(n){e(S({message:"Error loading user",type:"error"})),console.log("Error in query:",n)}})},[]),i.a.createElement("div",{style:{height:"100vh"}},e)}t.default=function(){const e=Object(c.b)(),t=Object(d.c)({thunk:{extraArgument:e}}),a=Object(d.a)({reducer:x,middleware:t});return i.a.createElement(l.a,{store:a},i.a.createElement(be,null,i.a.createElement("div",{className:"container"},i.a.createElement("div",{className:"left-column"},i.a.createElement(k,null)),i.a.createElement("div",{className:"right-column"},i.a.createElement(pe,null))),i.a.createElement("div",{style:{bottom:0,left:0,paddingLeft:16,position:"fixed",width:"60%"}},i.a.createElement(ue,null))))}}}]);
//# sourceMappingURL=app.b558e6dd.chunk.js.map