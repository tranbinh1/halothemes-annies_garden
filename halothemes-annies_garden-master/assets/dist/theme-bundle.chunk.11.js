(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{636:function(o,t,e){"use strict";e.r(t),function(o){e.d(t,"default",(function(){return s}));e(307),e(1);var n=e(67),a=e(640),i=e(639);function l(o,t){return(l=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(o,t){return o.__proto__=t,o})(o,t)}var s=function(t){var e,n;function s(o){return t.call(this,o)||this}n=t,(e=s).prototype=Object.create(n.prototype),e.prototype.constructor=e,l(e,n);var r=s.prototype;return r.onReady=function(){this.faqsPage(),this.faqsToggle(),this.portfolioPage(),Object(i.a)(this.context),Object(a.a)(this.context,o(".halo-lookbook-slider")),this.lookbookCarousel(),this.portfolioCustomCarousel()},r.faqsPage=function(){o(".faq-desc").appendTo(".page-normal .page-description")},r.portfolioPage=function(){o(".halo-image-portfolio .item:hidden").slice(0,6).css("display","inline-block"),o(".halo-image-portfolio .item").length>6&&o(".halo-image-portfolio").append('<div class="halo-infinite-portfolio"><div class="button button--transparent">Load More</div></div>'),o(".halo-infinite-portfolio .button").on("click",(function(t){t.preventDefault(),o(".halo-image-portfolio .item:hidden").slice(0,6).css("display","inline-block"),0==o(".halo-image-portfolio .item:hidden").length&&o(".halo-infinite-portfolio .button").addClass("disable").text("No more items")})),o(".page-portfolio .page-sidebar-mobile").length>0&&o(".page-portfolio .page-sidebar-mobile").append('<svg class="icon"><use xlink:href="#icon-sidebar"></use></svg>'),o(".halo-image-portfolio .item").each((function(t,e){o(".external-link",e).length>0&&o(".external-link",e).append('<svg class="icon"><use xlink:href="#icon-external-link"></use></svg>')}))},r.faqsToggle=function(){o(".page-normal .card .title").on("click",(function(t){t.preventDefault();var e=o(t.currentTarget);o(".page-normal .card .title").not(e).removeClass("collapsed"),e.hasClass("collapsed")?e.removeClass("collapsed"):e.addClass("collapsed"),o(".page-normal .card").each((function(t,e){o(".title",e).hasClass("collapsed")?o(e).find(".collapse").slideDown("slow"):o(e).find(".collapse").slideUp("slow")}))}))},r.lookbookCarousel=function(){o(".halo-lookbook-slider").length&&(o(".halo-lookbook-slider").hasClass("slick-slider")||o(".halo-lookbook-slider").slick({dots:!0,arrows:!1,mobileFirst:!0,adaptiveHeight:!0,slidesToShow:1,slidesToScroll:1,lazyLoad:"anticipated",nextArrow:"<svg class='slick-next slick-arrow slick-arrow-large' aria-label='Next Slide'><use xlink:href=#slick-arrow-next></use></svg>",prevArrow:"<svg class='slick-prev slick-arrow slick-arrow-large' aria-label='Previous Slide'><use xlink:href=#slick-arrow-prev></use></svg>",responsive:[{breakpoint:1024,settings:{dots:!1,arrows:!0}}]}))},r.portfolioCustomCarousel=function(){o(".halo-portfolio-custom .halo-row").length&&(o(".halo-portfolio-custom .halo-row").hasClass("slick-slider")||o(".halo-portfolio-custom .halo-row").slick({dots:!0,arrows:!1,mobileFirst:!0,infinite:!1,adaptiveHeight:!0,slidesToShow:1,slidesToScroll:1,lazyLoad:"anticipated",nextArrow:"<svg class='slick-next slick-arrow slick-arrow-large' aria-label='Next Slide'><use xlink:href=#slick-arrow-next></use></svg>",prevArrow:"<svg class='slick-prev slick-arrow slick-arrow-large' aria-label='Previous Slide'><use xlink:href=#slick-arrow-prev></use></svg>",responsive:[{breakpoint:1024,settings:{dots:!1,arrows:!0}}]}))},s}(n.a)}.call(this,e(3))},639:function(o,t,e){"use strict";(function(o){e(1);var n=e(306);t.a=function(t,e){if(1==t.themeSettings.haloAddOptionForProduct){var a=function(o){return n("/graphql",{method:"POST",headers:{"Content-Type":"application/json",Authorization:"Bearer "+l},body:JSON.stringify({query:"\n                    query SeveralProductsByID {\n                      site {\n                        products(entityIds: ["+o+"], first: 50) {\n                          edges {\n                            node {\n                              entityId\n                              name\n                               productOptions(first: 50) {\n                                edges {\n                                  node {\n                                    entityId\n                                    displayName\n                                    isRequired\n                                    ... on MultipleChoiceOption {\n                                      displayStyle\n                                      values {\n                                        edges {\n                                          node {\n                                            entityId\n                                            label\n                                            isDefault\n                                            ... on SwatchOptionValue {\n                                              hexColors\n                                              imageUrl(width: 50)\n                                            }\n                                          }\n                                        }\n                                      }\n                                    }\n                                  }\n                                }\n                              }\n                            }\n                          }\n                        }\n                      }\n                    }\n                  "})}).then((function(o){return o.json()})).then((function(o){return o.data}))},i=function(e){var n=e.site.products.edges;o.each(n,(function(e,a){var i=n[e].node.entityId,l=s.find(".card-option-"+i+" .form-field:not(.form-field--size)"),r=s.find(".card-option-"+i+" .form-field--size"),c=n[e].node.productOptions.edges,p=c.filter((function(o){return"Swatch"===o.node.displayStyle})),d=c.filter((function(o){return o.node.displayName===t.themeSettings.haloAddOptionForProduct2}));if(p.length>0){var f=p[0].node.values.edges;o.each(f,(function(o,t){var e=f[o].node.label,n=f[o].node.entityId,a=f[o].node.hexColors.length,i=f[o].node.hexColors[0],s=f[o].node.hexColors[1],r=f[o].node.hexColors[2],c=f[o].node.imageUrl;2==a?l.append('<label class="form-option form-option-swatch" data-product-swatch-value="'+n+'"><span class="form-option-tooltip">'+e+'</span><span class="form-option-variant form-option-variant--color form-option-variant--color2" title="'+e+'"><span style="background-color:'+i+'"></span><span style="background-color:'+s+'"></span></span></label>'):3===a?l.append('<label class="form-option form-option-swatch" data-product-swatch-value="'+n+'"><span class="form-option-tooltip">'+e+'</span><span class="form-option-variant form-option-variant--color form-option-variant--color2" title="'+e+'"><span style="background-color:'+i+'"></span><span style="background-color:'+s+'"></span><span style="background-color:'+r+'"></span></span></label>'):Boolean(i)?l.append('<label class="form-option form-option-swatch" data-product-swatch-value="'+n+'"><span class="form-option-tooltip">'+e+'</span><span class="form-option-variant form-option-variant--color" title="'+e+'" style="background-color: '+i+'"></span></label>'):Boolean(c)&&l.append('<label class="form-option form-option-swatch" data-product-swatch-value="'+n+'"><span class="form-option-tooltip">'+e+'</span><span class="form-option-variant form-option-variant--pattern" title="'+e+'" style="background-image: url('+c+')"></span></label>')}))}else l.remove();d.length>0&&r.length<1&&s.find(".card-option-"+i).append('<div class="form-field form-field--size"><label class="form-option">'+t.themeSettings.haloAddOptionForProductText.toString()+"</label></div>"),0==d.length&&0==p.length&&s.find(".card-option-"+i).remove()}))},l=t.token,s=o("#"+e),r=s.find(".card"),c=[];r.each((function(t,e){var n=o(e).data("product-id");c.push(n.toString())})),c.length>0&&a(c).then((function(t){i(t),o.each(c,(function(t,e){var n={},a=c[t];if(s.find(".card-option-"+a+" .form-option-swatch").each((function(t,e){var a=o(e).data("product-swatch-value");n[a]?o(e).remove():n[a]=!0})),s.find(".card-option-"+a+" .form-option-swatch").length>4){var i=s.find(".card-option-"+a+" .form-option-swatch").length-4,l=s.find('[data-product-id="'+a+'"]').find(".card-link").attr("href");s.find(".card-option-"+a+" .form-option-swatch").each((function(t,e){t>=4&&o(e).remove()})),s.find(".card-option-"+a+" .form-field .showmore").length<1&&s.find(".card-option-"+a+" .form-field:not(.form-field--size)").append('<a href="'+l+'" class="showmore">+'+i+"</a>")}}))}))}}}).call(this,e(3))},640:function(o,t,e){"use strict";(function(o){var n=e(1);t.a=function(t,e){var a=o(".lookbook-popup"),i=e,l={template:"halothemes/products/halo-lookbook-tmp"};i.find(".item .item-point").on("click",(function(t){a.removeClass("is-open").empty();var e=o(t.target).data("product-id"),s=o(t.target).offset(),r=i.offset();null!=e&&(n.b.api.product.getById(e,l,(function(o,t){if(o)return!1;a.html(t)})),o(window).width()>=551?a.css({top:s.top-r.top-100,left:s.left-r.left+30}):a.css({top:s.top-r.top+15,left:15}),a.addClass("is-open"))})),o(document).on("click",".close-product",(function(o){o.preventDefault(),a.hasClass("is-open")&&a.removeClass("is-open")})),o(document).on("click",(function(t){a.hasClass("is-open")&&0===o(t.target).closest(a).length&&0===o(t.target).closest(".item .item-point").length&&a.removeClass("is-open")}))}}).call(this,e(3))}}]);
//# sourceMappingURL=theme-bundle.chunk.11.js.map