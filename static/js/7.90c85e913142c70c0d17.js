webpackJsonp([7],{544:function(t,e,r){r(581);var a=r(8)(r(562),r(593),"data-v-3ae1b59a",null);t.exports=a.exports},562:function(t,e,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r(54),s=r.n(a),o=r(192),i=r.n(o),c=r(188),n=r(62),A=r(195),h=r.n(A),p=r(45),l=r(193),u=r.n(l),C=r(190),d=r.n(C),x=r(63),B=r.n(x),b=r(81);e.default={mixins:[b.c,b.b],created:function(){this._getHotKey()},data:function(){return{hotKeys:[]}},methods:s()({handlePlayList:function(t){var e=t.length>0?"60px":"";this.$refs.shortcutWrapper.style.bottom=e,this.$refs.shortcut.refresh(),this.$refs.searchResult.style.bottom=e,this.$refs.suggest.refresh()},cleanSearchHistory:function(){this.$refs.confirm.show()},_getHotKey:function(){var t=this;r.i(c.b)().then(function(e){e.code===n.a&&(t.hotKeys=e.data.hotkey.slice(0,10))})}},r.i(p.b)(["clearHistory"])),computed:{shortcut:function(){return this.searchHistory.concat(this.hotKeys)}},watch:{query:function(t,e){var r=this;t||setTimeout(function(){r.$refs.shortcut.refresh()},20)}},components:{searchBox:i.a,Suggest:h.a,searchList:u.a,Confirm:d.a,Scroll:B.a}}},571:function(t,e,r){e=t.exports=r(539)(!0),e.push([t.i,'.search .search-box-wrapper[data-v-3ae1b59a]{margin:20px}.search .shortcut-wrapper[data-v-3ae1b59a]{position:fixed;top:178px;bottom:0;width:100%}.search .shortcut-wrapper .shortcut[data-v-3ae1b59a]{height:100%;overflow:hidden}.search .shortcut-wrapper .shortcut .hot-key[data-v-3ae1b59a]{margin:0 20px 20px}.search .shortcut-wrapper .shortcut .hot-key .title[data-v-3ae1b59a]{margin-bottom:20px;font-size:14px;color:hsla(0,0%,100%,.5)}.search .shortcut-wrapper .shortcut .hot-key .item[data-v-3ae1b59a]{display:inline-block;padding:5px 10px;margin:0 20px 10px 0;border-radius:6px;background:#333;font-size:14px;color:hsla(0,0%,100%,.3)}.search .shortcut-wrapper .shortcut .search-history[data-v-3ae1b59a]{position:relative;margin:0 20px}.search .shortcut-wrapper .shortcut .search-history .title[data-v-3ae1b59a]{display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;height:40px;font-size:14px;color:hsla(0,0%,100%,.5)}.search .shortcut-wrapper .shortcut .search-history .title .text[data-v-3ae1b59a]{-webkit-box-flex:1;-ms-flex:1;flex:1}.search .shortcut-wrapper .shortcut .search-history .title .clear[data-v-3ae1b59a]{position:relative}.search .shortcut-wrapper .shortcut .search-history .title .clear[data-v-3ae1b59a]:before{content:"";position:absolute;top:-10px;left:-10px;right:-10px;bottom:-10px}.search .shortcut-wrapper .shortcut .search-history .title .clear .icon-clear[data-v-3ae1b59a]{font-size:14px;color:hsla(0,0%,100%,.3)}.search .search-result[data-v-3ae1b59a]{position:fixed;width:100%;top:178px;bottom:0}',"",{version:3,sources:["C:/Users/Administrator/Desktop/workplace/vueMusic/vueMusic/src/components/search/search.vue"],names:[],mappings:"AACA,6CACE,WAAa,CACd,AACD,2CACE,eAAgB,AAChB,UAAW,AACX,SAAU,AACV,UAAY,CACb,AACD,qDACE,YAAa,AACb,eAAiB,CAClB,AACD,8DACE,kBAAyB,CAC1B,AACD,qEACE,mBAAoB,AACpB,eAAgB,AAChB,wBAA6B,CAC9B,AACD,oEACE,qBAAsB,AACtB,iBAAkB,AAClB,qBAAsB,AACtB,kBAAmB,AACnB,gBAAiB,AACjB,eAAgB,AAChB,wBAA6B,CAC9B,AACD,qEACE,kBAAmB,AACnB,aAAe,CAChB,AACD,4EACE,oBAAqB,AACrB,oBAAqB,AACrB,aAAc,AACd,yBAA0B,AACtB,sBAAuB,AACnB,mBAAoB,AAC5B,YAAa,AACb,eAAgB,AAChB,wBAA6B,CAC9B,AACD,kFACE,mBAAoB,AAChB,WAAY,AACR,MAAQ,CACjB,AACD,mFACE,iBAAmB,CACpB,AACD,0FACE,WAAY,AACZ,kBAAmB,AACnB,UAAW,AACX,WAAY,AACZ,YAAa,AACb,YAAc,CACf,AACD,+FACE,eAAgB,AAChB,wBAA6B,CAC9B,AACD,wCACE,eAAgB,AAChB,WAAY,AACZ,UAAW,AACX,QAAU,CACX",file:"search.vue",sourcesContent:["\n.search .search-box-wrapper[data-v-3ae1b59a] {\n  margin: 20px;\n}\n.search .shortcut-wrapper[data-v-3ae1b59a] {\n  position: fixed;\n  top: 178px;\n  bottom: 0;\n  width: 100%;\n}\n.search .shortcut-wrapper .shortcut[data-v-3ae1b59a] {\n  height: 100%;\n  overflow: hidden;\n}\n.search .shortcut-wrapper .shortcut .hot-key[data-v-3ae1b59a] {\n  margin: 0 20px 20px 20px;\n}\n.search .shortcut-wrapper .shortcut .hot-key .title[data-v-3ae1b59a] {\n  margin-bottom: 20px;\n  font-size: 14px;\n  color: rgba(255,255,255,0.5);\n}\n.search .shortcut-wrapper .shortcut .hot-key .item[data-v-3ae1b59a] {\n  display: inline-block;\n  padding: 5px 10px;\n  margin: 0 20px 10px 0;\n  border-radius: 6px;\n  background: #333;\n  font-size: 14px;\n  color: rgba(255,255,255,0.3);\n}\n.search .shortcut-wrapper .shortcut .search-history[data-v-3ae1b59a] {\n  position: relative;\n  margin: 0 20px;\n}\n.search .shortcut-wrapper .shortcut .search-history .title[data-v-3ae1b59a] {\n  display: -webkit-box;\n  display: -ms-flexbox;\n  display: flex;\n  -webkit-box-align: center;\n      -ms-flex-align: center;\n          align-items: center;\n  height: 40px;\n  font-size: 14px;\n  color: rgba(255,255,255,0.5);\n}\n.search .shortcut-wrapper .shortcut .search-history .title .text[data-v-3ae1b59a] {\n  -webkit-box-flex: 1;\n      -ms-flex: 1;\n          flex: 1;\n}\n.search .shortcut-wrapper .shortcut .search-history .title .clear[data-v-3ae1b59a] {\n  position: relative;\n}\n.search .shortcut-wrapper .shortcut .search-history .title .clear[data-v-3ae1b59a]:before {\n  content: '';\n  position: absolute;\n  top: -10px;\n  left: -10px;\n  right: -10px;\n  bottom: -10px;\n}\n.search .shortcut-wrapper .shortcut .search-history .title .clear .icon-clear[data-v-3ae1b59a] {\n  font-size: 14px;\n  color: rgba(255,255,255,0.3);\n}\n.search .search-result[data-v-3ae1b59a] {\n  position: fixed;\n  width: 100%;\n  top: 178px;\n  bottom: 0;\n}"],sourceRoot:""}])},581:function(t,e,r){var a=r(571);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);r(540)("26bd4402",a,!0)},593:function(t,e){t.exports={render:function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"search"},[r("div",{staticClass:"search-box-wrapper"},[r("search-box",{ref:"searchBox",on:{query:t.setQuery}})],1),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:!t.query,expression:"!query"}],ref:"shortcutWrapper",staticClass:"shortcut-wrapper"},[r("scroll",{ref:"shortcut",staticClass:"shortcut",attrs:{data:t.shortcut,refreshDelay:t.refreshDelay}},[r("div",[r("div",{staticClass:"hot-key"},[r("h1",{staticClass:"title"},[t._v("热门搜索")]),t._v(" "),r("ul",t._l(t.hotKeys,function(e){return r("li",{staticClass:"item",on:{click:function(r){t.addQueryVal(e.k)}}},[r("span",[t._v(t._s(e.k))])])}))]),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:t.searchHistory.length,expression:"searchHistory.length"}],staticClass:"search-history"},[r("h1",{staticClass:"title"},[r("span",{staticClass:"text"},[t._v("搜索历史")]),t._v(" "),r("span",{staticClass:"clear",on:{click:t.cleanSearchHistory}},[r("i",{staticClass:"icon-clear"})])]),t._v(" "),r("search-list",{attrs:{searches:t.searchHistory},on:{select:t.addQueryVal,delete:t.deleteHistory}})],1)])])],1),t._v(" "),r("div",{directives:[{name:"show",rawName:"v-show",value:t.query,expression:"query"}],ref:"searchResult",staticClass:"search-result"},[r("suggest",{ref:"suggest",attrs:{query:t.query},on:{listScroll:t.inputBlur,select:t.saveSearch}})],1),t._v(" "),r("confirm",{ref:"confirm",attrs:{title:"是否清空所有搜索历史",confirmBtnText:"清空"},on:{confirm:t.clearHistory}}),t._v(" "),r("router-view")],1)},staticRenderFns:[]}}});
//# sourceMappingURL=7.90c85e913142c70c0d17.js.map