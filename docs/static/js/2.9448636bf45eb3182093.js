webpackJsonp([2],{85:function(t,e,s){"use strict";function a(t){s(95)}Object.defineProperty(e,"__esModule",{value:!0});var r=s(97),n=s(98),o=s(0),c=a,l=o(r.a,n.a,!1,c,null,null);e.default=l.exports},95:function(t,e,s){var a=s(96);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);s(83)("2c2343d4",a,!0)},96:function(t,e,s){e=t.exports=s(82)(!0),e.push([t.i,".folded{background-color:#3d1255;color:#fff}","",{version:3,sources:["/Users/rbaum/architect/poker_jubilant-sniffle/src/components/playerStack.vue"],names:[],mappings:"AACA,QACE,yBAA0B,AAC1B,UAAa,CACd",file:"playerStack.vue",sourcesContent:["\n.folded {\n  background-color: #3D1255;\n  color: white;\n}\n"],sourceRoot:""}])},97:function(t,e,s){"use strict";var a=s(2),r=s.n(a),n=s(1);e.a={name:"playerStack",data:function(){return{headers:[{text:"name",align:"left",sortable:!1,value:"name"},{text:"stack",value:"stack"},{text:"dealer",value:"dealer"}]}},components:{},computed:r()({},Object(n.c)(["players"])),methods:{}}},98:function(t,e,s){"use strict";var a=function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",[s("v-data-table",{attrs:{headers:t.headers,items:t.players,"hide-actions":""}},[s("template",{attrs:{"scope-slot":"props"},slot:"items"},[s("td",{staticClass:"text-xs-left"},[t._v(t._s(t.props.item.name))]),t._v(" "),s("td",{staticClass:"text-xs-right"},[t._v(t._s(t.props.item.stack))]),t._v(" "),s("td",{staticClass:"text-xs-right"},[t.players[0]===t.props.item?s("v-icon",{attrs:{label:"ni"}},[t._v("\n           donut_small\n       ")]):t._e()],1)])],2)],1)},r=[],n={render:a,staticRenderFns:r};e.a=n}});
//# sourceMappingURL=2.9448636bf45eb3182093.js.map