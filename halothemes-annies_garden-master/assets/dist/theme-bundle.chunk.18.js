(window.webpackJsonp=window.webpackJsonp||[]).push([[18],{637:function(t,e,n){"use strict";n.r(e),function(t){n.d(e,"default",(function(){return b}));var a=n(1),o=n(645),r=n(648),i=n(641),s=n(646),c=n(642),d=n.n(c),l=n(308),u=(n(717),n(36)),h=n(649),p=n(650),g=n(639),f=n(651);function m(t,e){var n="undefined"!=typeof Symbol&&t[Symbol.iterator]||t["@@iterator"];if(n)return(n=n.call(t)).next.bind(n);if(Array.isArray(t)||(n=function(t,e){if(!t)return;if("string"==typeof t)return v(t,e);var n=Object.prototype.toString.call(t).slice(8,-1);"Object"===n&&t.constructor&&(n=t.constructor.name);if("Map"===n||"Set"===n)return Array.from(t);if("Arguments"===n||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n))return v(t,e)}(t))||e&&t&&"number"==typeof t.length){n&&(t=n);var a=0;return function(){return a>=t.length?{done:!0}:{done:!1,value:t[a++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function v(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}function y(t,e){return(y=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(t,e){return t.__proto__=e,t})(t,e)}var b=function(e){var n,o;function c(){return e.apply(this,arguments)||this}o=e,(n=c).prototype=Object.create(o.prototype),n.prototype.constructor=n,y(n,o);var v=c.prototype;return v.formatCategoryTreeForJSTree=function(t){var e=this,n={text:t.data,id:t.metadata.id,state:{selected:t.selected}};return t.state&&(n.state.opened="open"===t.state,n.children=!0),t.children&&(n.children=[],t.children.forEach((function(t){n.children.push(e.formatCategoryTreeForJSTree(t))}))),n},v.showProducts=function(e){if(void 0===e&&(e=!0),this.$productListingContainer.removeClass("u-hiddenVisually"),this.$facetedSearchContainer.removeClass("u-hiddenVisually"),this.$contentResultsContainer.addClass("u-hiddenVisually"),t("[data-content-results-toggle]").removeClass("navBar-action-color--active"),t("[data-content-results-toggle]").addClass("navBar-action"),t("[data-product-results-toggle]").removeClass("navBar-action"),t("[data-product-results-toggle]").addClass("navBar-action-color--active"),e){var n=t("#search-results-product-count span").data(),a=n.count>0?n.url:s.a.replaceParams(n.url,{page:1});s.a.goToUrl(a)}},v.showContent=function(e){if(void 0===e&&(e=!0),this.$contentResultsContainer.removeClass("u-hiddenVisually"),this.$productListingContainer.addClass("u-hiddenVisually"),this.$facetedSearchContainer.addClass("u-hiddenVisually"),t("[data-product-results-toggle]").removeClass("navBar-action-color--active"),t("[data-product-results-toggle]").addClass("navBar-action"),t("[data-content-results-toggle]").removeClass("navBar-action"),t("[data-content-results-toggle]").addClass("navBar-action-color--active"),e){var n=t("#search-results-content-count span").data(),a=n.count>0?n.url:s.a.replaceParams(n.url,{page:1});s.a.goToUrl(a)}},v.onReady=function(){var e=this;Object(i.a)(this.context.urls);var n=t("[data-advanced-search-form]"),o=n.find("[data-search-category-tree]"),r=d.a.parse(window.location.href,!0),s=[];this.$productListingContainer=t("#product-listing-container"),this.$facetedSearchContainer=t("#faceted-search-container"),this.$contentResultsContainer=t("#search-results-content"),t("#facetedSearch").length>0?this.initFacetedSearch():(this.onSortBySubmit=this.onSortBySubmit.bind(this),a.c.on("sortBy-submitted",this.onSortBySubmit)),Object(l.b)(),t("[data-product-results-toggle]").on("click",(function(t){t.preventDefault(),e.showProducts()})),t("[data-content-results-toggle]").on("click",(function(t){t.preventDefault(),e.showContent()})),0===this.$productListingContainer.find("li.product").length||"content"===r.query.section?this.showContent(!1):this.showProducts(!1);var c=this.initValidation(n).bindValidation(n.find("#search_query_adv"));this.context.categoryTree.forEach((function(t){s.push(e.formatCategoryTreeForJSTree(t))})),this.categoryTreeData=s,this.createCategoryTree(o),n.on("submit",(function(e){var a=o.jstree().get_selected();if(!c.check())return e.preventDefault();n.find('input[name="category[]"]').remove();for(var r,i=m(a);!(r=i()).done;){var s=r.value,d=t("<input>",{type:"hidden",name:"category[]",value:s});n.append(d)}})),this.showProductsPerPage(),this.showMoreProducts(),this.showItem(),this.loadOptionForProductCard(this.context),this.fancyboxVideoBanner(),Object(p.a)(),Object(h.a)(),Object(f.a)(this.context)},v.loadTreeNodes=function(e,n){var a=this;t.ajax({url:"/remote/v1/category-tree",data:{selectedCategoryId:e.id,prefix:"category"},headers:{"x-xsrf-token":window.BCData&&window.BCData.csrf_token?window.BCData.csrf_token:""}}).done((function(t){var e=[];t.forEach((function(t){e.push(a.formatCategoryTreeForJSTree(t))})),n(e)}))},v.createCategoryTree=function(t){var e=this,n={core:{data:function(t,n){"#"===t.id?n(e.categoryTreeData):e.loadTreeNodes(t,n)},themes:{icons:!0}},checkbox:{three_state:!1},plugins:["checkbox"]};t.jstree(n)},v.initFacetedSearch=function(){var e=this,n=t("#product-listing-container .productListing"),a=t("#search-results-content"),o=t("#faceted-search-container"),i=t("#search-results-heading"),s=t("#search-results-product-count"),c=t("#search-results-content-count"),l=t(".pagination"),u=t(".halo-product-show-more"),h={template:{productListing:"halothemes/gallery/halo-product-listing",contentListing:"search/content-listing",sidebar:"search/sidebar",heading:"search/heading",productCount:"search/product-count",contentCount:"search/content-count",paginator:"halothemes/gallery/halo-product-paginator"},config:{product_results:{limit:this.context.searchProductsPerPage}},showMore:"search/show-more"};this.facetedSearch=new r.a(h,(function(r){i.html(r.heading),"content"===d.a.parse(window.location.href,!0).query.section?(a.html(r.contentListing),c.html(r.contentCount),e.showContent(!1)):(n.html(r.productListing),o.html(r.sidebar),s.html(r.productCount),l.html(t(r.paginator).find(".pagination").children()),u.html(t(r.paginator).find(".halo-product-show-more").children()),e.showProducts(!1),e.showProductsPerPage(),e.showItem(),e.showMoreProducts(),t("#product-listing-container .product").length>0&&Object(g.a)(e.context,"product-listing-container")),t("body").triggerHandler("compareReset"),t("html, body").animate({scrollTop:0},100)}))},v.initValidation=function(t){return this.$form=t,this.validator=Object(u.a)({submit:t}),this},v.bindValidation=function(t){return this.validator&&this.validator.add({selector:t,validate:"presence",errorMessage:t.data("errorMessage")}),this},v.check=function(){return!!this.validator&&(this.validator.performCheck(),this.validator.areAll("valid"))},v.showProductsPerPage=function(){try{var t=new URL(window.location.href).searchParams.get("limit");if(null!=t){var e=document.querySelectorAll("select#limit option");Array.prototype.forEach.call(e,(function(e){e.value==t&&(e.selected=!0)}))}}catch(t){}},v.showMoreProducts=function(){var e=this.context,n=this.getUrlParameter("limit");t("#listing-showmoreBtn > a").on("click",(function(a){a.preventDefault();var o=t(".pagination-item--current").next(),r=o.find("a").attr("href");t("#listing-showmoreBtn > a").addClass("loading"),t.ajax({type:"get",url:r.replace("http://","//"),success:function(a){if(t(a).find("#product-listing-container .productListing").length>0){if(t("#product-listing-container .productListing").append(t(a).find("#product-listing-container .productListing").children()),t(".pagination-list").html(t(a).find(".pagination-list").html()),t("#listing-showmoreBtn > a").removeClass("loading").blur(),0===(o=t(".pagination-item--current").next()).length)t("#listing-showmoreBtn > a").addClass("disable").text("No more products"),t(".pagination .pagination-info .end").text(t(".pagination-info .total").text());else{var r,i=n,s=parseInt(t(".pagination-item--current > a").text());r=void 0!==i?i:e.searchProductsPerPage,t(".pagination .pagination-info .end").text(parseInt(r)*s)}t(a).find("#product-listing-container .product").length>0&&Object(g.a)(e,"product-listing-container")}}})}))},v.showItem=function(){var e,n=parseInt(t(".pagination-info .total").text()),a=this.getUrlParameter("limit");e=void 0!==a?a:this.context.searchProductsPerPage;var o=1,r=n,i=1,s=t(".pagination-list .pagination-item--current").next(),c=(i-1)*e,d=n-c,l=parseInt(t(".pagination-item--current > a").text()),u=l-1;0===s.length?i=parseInt(t(".pagination-item--current").find("a").text()):i=parseInt(s.find("a").text()),n<=e?(t(".pagination-info .start").text(o),t(".pagination-info .end").text(r)):(l<=1?r=e:(o=u*e+1,r=!0?t(".pagination-list .pagination-item--next").length>0?c+d-1:c+d:l*e),t(".pagination-info .start").text(o),t(".pagination-info .end").text(r))},v.fancyboxVideoBanner=function(){t(".video-block-image[data-fancybox]").length&&t(".video-block-image[data-fancybox]").fancybox({autoDimensions:!1,padding:0,width:970,height:600,autoScale:!1,transitionIn:"none",transitionOut:"none"}),t(".button-popup-video[data-fancybox]").length&&t(".button-popup-video[data-fancybox]").fancybox({autoDimensions:!1,padding:0,width:970,height:600,autoScale:!1,transitionIn:"none",transitionOut:"none"})},v.getUrlParameter=function(t){var e,n,a=decodeURIComponent(window.location.search.substring(1)).split("&");for(n=0;n<a.length;n++)if((e=a[n].split("="))[0]===t)return void 0===e[1]||e[1]},v.loadOptionForProductCard=function(e){t("#featured-products .card").length>0&&Object(g.a)(e,"featured-products"),t("#product-listing-container .product").length>0&&Object(g.a)(e,"product-listing-container")},c}(o.a)}.call(this,n(3))}}]);
//# sourceMappingURL=theme-bundle.chunk.18.js.map