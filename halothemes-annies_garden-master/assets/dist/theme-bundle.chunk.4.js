(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{317:function(o,t,n){"use strict";n.r(t),function(o){n.d(t,"default",(function(){return s}));var e=n(1),a=n(67),i=n(639),r=n(640);function l(o,t){return(l=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(o,t){return o.__proto__=t,o})(o,t)}var s=function(t){var n,a;function s(o){return t.call(this,o)||this}a=t,(n=s).prototype=Object.create(a.prototype),n.prototype.constructor=n,l(n,a);var c=s.prototype;return c.onReady=function(){this.getAllTags(this.context),Object(i.a)(this.context),Object(r.a)(this.context,o(".halo-blog-lookbook .lookbook-slider")),this.lookbookCarousel()},c.getAllTags=function(t){if(1==t.themeSettings.halo_sidebar_popular_tags){e.b.api.getPage("/blog",{config:{blog:{posts:{limit:100}}},template:"halothemes/halo-all-tags"},(function(t,n){if(t)return"";o(".tags-list").html(n);var e={};o(".tags-list [data-tag]").each((function(){var t=o(this).data("tag");e[t]?o(this).remove():e[t]=!0}))}))}},c.lookbookCarousel=function(){o(".blog-lookbook-gallery .lookbook-slider").length&&(o(".blog-lookbook-gallery .lookbook-slider").hasClass("slick-slider")||o(".blog-lookbook-gallery .lookbook-slider").slick({rows:0,rtl:!1,dots:!0,arrows:!1,mobileFirst:!0,infinite:!1,adaptiveHeight:!0,slidesToShow:1,slidesToScroll:1}))},s}(a.a)}.call(this,n(3))},639:function(o,t,n){"use strict";(function(o){n(1);var e=n(306);t.a=function(t,n){if(1==t.themeSettings.haloAddOptionForProduct){var a=function(o){return e("/graphql",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+r},body:JSON.stringify({query:"\n                    query SeveralProductsByID {\n                      site {\n                        products(entityIds: ["+o+"], first: 50) {\n                          edges {\n                            node {\n                              entityId\n                              name\n                               productOptions(first: 50) {\n                                edges {\n                                  node {\n                                    entityId\n                                    displayName\n                                    isRequired\n                                    ... on MultipleChoiceOption {\n                                      displayStyle\n                                      values {\n                                        edges {\n                                          node {\n                                            entityId\n                                            label\n                                            isDefault\n                                            ... on SwatchOptionValue {\n                                              hexColors\n                                              imageUrl(width: 50)\n                                            }\n                                          }\n                                        }\n                                      }\n                                    }\n                                  }\n                                }\n                              }\n                            }\n                          }\n                        }\n                      }\n                    }\n                  "})}).then((function(o){return o.json()})).then((function(o){return o.data}))},i=function(n){var e=n.site.products.edges;o.each(e,(function(n,a){var i=e[n].node.entityId,r=l.find(".card-option-"+i+" .form-field:not(.form-field--size)"),s=l.find(".card-option-"+i+" .form-field--size"),c=e[n].node.productOptions.edges,p=c.filter((function(o){return"Swatch"===o.node.displayStyle})),d=c.filter((function(o){return o.node.displayName===t.themeSettings.haloAddOptionForProduct2}));if(p.length>0){var f=p[0].node.values.edges;o.each(f,(function(o,t){var n=f[o].node.label,e=f[o].node.entityId,a=f[o].node.hexColors.length,i=f[o].node.hexColors[0],l=f[o].node.hexColors[1],s=f[o].node.hexColors[2],c=f[o].node.imageUrl;2==a?r.append('<label class="form-option form-option-swatch" data-product-swatch-value="'+e+'"><span class="form-option-tooltip">'+n+'</span><span class="form-option-variant form-option-variant--color form-option-variant--color2" title="'+n+'"><span style="background-color:'+i+'"></span><span style="background-color:'+l+'"></span></span></label>'):3===a?r.append('<label class="form-option form-option-swatch" data-product-swatch-value="'+e+'"><span class="form-option-tooltip">'+n+'</span><span class="form-option-variant form-option-variant--color form-option-variant--color2" title="'+n+'"><span style="background-color:'+i+'"></span><span style="background-color:'+l+'"></span><span style="background-color:'+s+'"></span></span></label>'):Boolean(i)?r.append('<label class="form-option form-option-swatch" data-product-swatch-value="'+e+'"><span class="form-option-tooltip">'+n+'</span><span class="form-option-variant form-option-variant--color" title="'+n+'" style="background-color: '+i+'"></span></label>'):Boolean(c)&&r.append('<label class="form-option form-option-swatch" data-product-swatch-value="'+e+'"><span class="form-option-tooltip">'+n+'</span><span class="form-option-variant form-option-variant--pattern" title="'+n+'" style="background-image: url('+c+')"></span></label>')}))}else r.remove();d.length>0&&s.length<1&&l.find(".card-option-"+i).append('<div class="form-field form-field--size"><label class="form-option">'+t.themeSettings.haloAddOptionForProductText.toString()+"</label></div>"),0==d.length&&0==p.length&&l.find(".card-option-"+i).remove()}))},r=t.token,l=o("#"+n),s=l.find(".card"),c=[];s.each((function(t,n){var e=o(n).data("product-id");c.push(e.toString())})),c.length>0&&a(c).then((function(t){i(t),o.each(c,(function(t,n){var e={},a=c[t];if(l.find(".card-option-"+a+" .form-option-swatch").each((function(t,n){var a=o(n).data("product-swatch-value");e[a]?o(n).remove():e[a]=!0})),l.find(".card-option-"+a+" .form-option-swatch").length>4){var i=l.find(".card-option-"+a+" .form-option-swatch").length-4,r=l.find('[data-product-id="'+a+'"]').find(".card-link").attr("href");l.find(".card-option-"+a+" .form-option-swatch").each((function(t,n){t>=4&&o(n).remove()})),l.find(".card-option-"+a+" .form-field .showmore").length<1&&l.find(".card-option-"+a+" .form-field:not(.form-field--size)").append('<a href="'+r+'" class="showmore">+'+i+"</a>")}}))}))}}}).call(this,n(3))},640:function(o,t,n){"use strict";(function(o){var e=n(1);t.a=function(t,n){var a=o(".lookbook-popup"),i=n,r={template:"halothemes/products/halo-lookbook-tmp"};i.find(".item .item-point").on("click",(function(t){a.removeClass("is-open").empty();var n=o(t.target).data("product-id"),l=o(t.target).offset(),s=i.offset();null!=n&&(e.b.api.product.getById(n,r,(function(o,t){if(o)return!1;a.html(t)})),o(window).width()>=551?a.css({top:l.top-s.top-100,left:l.left-s.left+30}):a.css({top:l.top-s.top+15,left:15}),a.addClass("is-open"))})),o(document).on("click",".close-product",(function(o){o.preventDefault(),a.hasClass("is-open")&&a.removeClass("is-open")})),o(document).on("click",(function(t){a.hasClass("is-open")&&0===o(t.target).closest(a).length&&0===o(t.target).closest(".item .item-point").length&&a.removeClass("is-open")}))}}).call(this,n(3))}}]);
//# sourceMappingURL=theme-bundle.chunk.4.js.map