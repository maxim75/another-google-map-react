(this["webpackJsonpanother-google-map-react-example"]=this["webpackJsonpanother-google-map-react-example"]||[]).push([[0],{13:function(e,t,n){},14:function(e,t,n){"use strict";n.r(t);n(8);var o=n(0),r=n.n(o),a=n(5),u=n.n(a),l=n(6),c=n(3),i=Object(o.createContext)(null),s="undefined"!==typeof window;var d=function(e){var t=Object(o.useRef)(null),n=Object(o.useState)(null),r=n[0],a=n[1];return Object(o.useEffect)((function(){s&&function(){try{return Promise.resolve((n=e.gooleMapLoaderUrl,s&&"undefined"!==typeof window.google?Promise.resolve():new Promise((function(e){var t=document.createElement("script");t.type="text/javascript",t.src=n,t.onload=e,document.head.appendChild(t)})))).then((function(){var n=new window.google.maps.Map(t.current,e.googleMapOptions);a(n),e.googleMapRef&&e.googleMapRef(n),n.addListener("bounds_changed",(function(){var t=n.getBounds(),o={east:t.getNorthEast().lng(),west:t.getSouthWest().lng(),south:t.getSouthWest().lat(),north:t.getNorthEast().lat()};e.onBoundsChanged&&e.onBoundsChanged(o)})),n.addListener("click",(function(t){var n={lat:t.latLng.lat(),lng:t.latLng.lng()};e.onClick&&e.onClick(n,t)}))}))}catch(o){return Promise.reject(o)}var n}()}),[]),Object(o.createElement)("div",null,Object(o.createElement)("div",{style:e.style,ref:t}),Object(o.createElement)(i.Provider,{value:r},s&&e.children))};function f(e){return e.properties.key}function g(e){return e.getProperty("key")}function p(e){var t=Object(o.useContext)(i),n=Object(o.useState)(null),r=n[0],a=n[1];return window.google&&null==r&&((r=new window.google.maps.Data).addListener("click",(function(t){e.onFeatureClick&&e.onFeatureClick(t.feature)})),a(r),r.setMap(t),r.setStyle(e.getMapFeatureStyleFunc)),Object(o.useEffect)((function(){if(window.google){var t=[];r.forEach((function(e){t.push(e)}));var n=function(e,t){var n=[],o=[],r=t.map((function(e){return f(e)}));return e.forEach((function(e){var t=g(e);r.includes(t)?o.push(t):n.push(t)})),{featuresToAdd:t.filter((function(e){return!o.includes(f(e))})),idsToRemove:n}}(t,e.features),o=n.featuresToAdd,a=n.idsToRemove;r.forEach((function(e){var t=g(e);a.includes(t)&&r.remove(e)})),r.addGeoJson({type:"FeatureCollection",features:o})}}),[JSON.stringify(e.features)]),null}n(13);function m(e){return e.map((function(e){return{type:"Feature",geometry:{type:"Point",coordinates:[e.lng,e.lat]},properties:{name:"test",id:e.id,key:e.id}}}))}function h(e){return{title:e.getProperty("id")}}var v=function(){var e=r.a.useState([]),t=Object(c.a)(e,2),n=t[0],o=t[1],a=r.a.useState(null),u=Object(c.a)(a,2),i=u[0],s=u[1],f=r.a.useState(null),g=Object(c.a)(f,2),v=g[0],y=g[1];return r.a.useEffect((function(){var e=setInterval((function(){o((function(e){return[].concat(Object(l.a)(e),[{lat:-34+Math.random()-.5,lng:151+Math.random()-.5,id:Math.floor(1e8*Math.random())}])})),o((function(e){return e.length>100?e.slice(1):e}))}),500);return function(){return clearInterval(e)}}),[]),r.a.createElement("div",null,r.a.createElement("div",null,JSON.stringify(i)," Google Map ref: ",(null!==v).toString()),r.a.createElement(d,{googleMapOptions:{center:{lat:-34,lng:151},zoom:10,mapTypeId:"roadmap",streetViewControl:!1},style:{border:"solid 1px Black",height:"calc(100vh - 200px)"},onClick:function(e){return alert(JSON.stringify(e))},onBoundsChanged:function(e){return s(e)},gooleMapLoaderUrl:"https://maps.googleapis.com/maps/api/js?v=beta&libraries=places",googleMapRef:function(e){return y(e)}},r.a.createElement(p,{features:m(n),onFeatureClick:function(e){alert("Feature ID=".concat(e.getProperty("id")," clicked"))},getMapFeatureStyleFunc:h})))};u.a.render(r.a.createElement(v,null),document.getElementById("root"))},7:function(e,t,n){e.exports=n(14)},8:function(e,t,n){}},[[7,1,2]]]);
//# sourceMappingURL=main.120a2ae1.chunk.js.map