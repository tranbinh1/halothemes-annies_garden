import { hooks } from '@bigcommerce/stencil-utils';
import CatalogPage from './catalog';
import FacetedSearch from './common/faceted-search';
import compareProducts from './global/compare-products';
import urlUtils from './common/url-utils';
import Url from 'url';
import collapsibleFactory from './common/collapsible';
import 'jstree';
import nod from './common/nod';
import productDisplayMode from './halothemes/haloProductDisplayMode';
import haloSideAllCategory from './halothemes/haloSideAllCategory';
import haloAddOptionForProduct from './halothemes/haloAddOptionForProductCard';
import haloStickyToolbar from './halothemes/haloStickyToolbar';

export default class Search extends CatalogPage {
    formatCategoryTreeForJSTree(node) {
        const nodeData = {
            text: node.data,
            id: node.metadata.id,
            state: {
                selected: node.selected,
            },
        };

        if (node.state) {
            nodeData.state.opened = node.state === 'open';
            nodeData.children = true;
        }

        if (node.children) {
            nodeData.children = [];
            node.children.forEach((childNode) => {
                nodeData.children.push(this.formatCategoryTreeForJSTree(childNode));
            });
        }

        return nodeData;
    }

    showProducts(navigate = true) {
        this.$productListingContainer.removeClass('u-hiddenVisually');
        this.$facetedSearchContainer.removeClass('u-hiddenVisually');
        this.$contentResultsContainer.addClass('u-hiddenVisually');

        $('[data-content-results-toggle]').removeClass('navBar-action-color--active');
        $('[data-content-results-toggle]').addClass('navBar-action');

        $('[data-product-results-toggle]').removeClass('navBar-action');
        $('[data-product-results-toggle]').addClass('navBar-action-color--active');

        if (!navigate) {
            return;
        }

        const searchData = $('#search-results-product-count span').data();
        const url = (searchData.count > 0) ? searchData.url : urlUtils.replaceParams(searchData.url, {
            page: 1,
        });

        urlUtils.goToUrl(url);
    }

    showContent(navigate = true) {
        this.$contentResultsContainer.removeClass('u-hiddenVisually');
        this.$productListingContainer.addClass('u-hiddenVisually');
        this.$facetedSearchContainer.addClass('u-hiddenVisually');

        $('[data-product-results-toggle]').removeClass('navBar-action-color--active');
        $('[data-product-results-toggle]').addClass('navBar-action');

        $('[data-content-results-toggle]').removeClass('navBar-action');
        $('[data-content-results-toggle]').addClass('navBar-action-color--active');

        if (!navigate) {
            return;
        }

        const searchData = $('#search-results-content-count span').data();
        const url = (searchData.count > 0) ? searchData.url : urlUtils.replaceParams(searchData.url, {
            page: 1,
        });

        urlUtils.goToUrl(url);
    }

    onReady() {
        compareProducts(this.context.urls);

        const $searchForm = $('[data-advanced-search-form]');
        const $categoryTreeContainer = $searchForm.find('[data-search-category-tree]');
        const url = Url.parse(window.location.href, true);
        const treeData = [];
        this.$productListingContainer = $('#product-listing-container');
        this.$facetedSearchContainer = $('#faceted-search-container');
        this.$contentResultsContainer = $('#search-results-content');

        // Init faceted search
        if ($('#facetedSearch').length > 0) {
            this.initFacetedSearch();
        } else {
            this.onSortBySubmit = this.onSortBySubmit.bind(this);
            hooks.on('sortBy-submitted', this.onSortBySubmit);
        }

        // Init collapsibles
        collapsibleFactory();

        $('[data-product-results-toggle]').on('click', event => {
            event.preventDefault();
            this.showProducts();
        });

        $('[data-content-results-toggle]').on('click', event => {
            event.preventDefault();
            this.showContent();
        });

        if (this.$productListingContainer.find('li.product').length === 0 || url.query.section === 'content') {
            this.showContent(false);
        } else {
            this.showProducts(false);
        }

        const validator = this.initValidation($searchForm)
            .bindValidation($searchForm.find('#search_query_adv'));

        this.context.categoryTree.forEach((node) => {
            treeData.push(this.formatCategoryTreeForJSTree(node));
        });

        this.categoryTreeData = treeData;
        this.createCategoryTree($categoryTreeContainer);

        $searchForm.on('submit', event => {
            const selectedCategoryIds = $categoryTreeContainer.jstree().get_selected();

            if (!validator.check()) {
                return event.preventDefault();
            }

            $searchForm.find('input[name="category\[\]"]').remove();

            for (const categoryId of selectedCategoryIds) {
                const input = $('<input>', {
                    type: 'hidden',
                    name: 'category[]',
                    value: categoryId,
                });

                $searchForm.append(input);
            }
        });

        this.showProductsPerPage();
        this.showMoreProducts();
        this.showItem();
        this.loadOptionForProductCard(this.context);
        this.fancyboxVideoBanner();

        haloSideAllCategory();
        productDisplayMode();
        haloStickyToolbar(this.context);
    }

    loadTreeNodes(node, cb) {
        $.ajax({
            url: '/remote/v1/category-tree',
            data: {
                selectedCategoryId: node.id,
                prefix: 'category',
            },
            headers: {
                'x-xsrf-token': window.BCData && window.BCData.csrf_token ? window.BCData.csrf_token : '',
            },
        }).done(data => {
            const formattedResults = [];

            data.forEach((dataNode) => {
                formattedResults.push(this.formatCategoryTreeForJSTree(dataNode));
            });

            cb(formattedResults);
        });
    }

    createCategoryTree($container) {
        const treeOptions = {
            core: {
                data: (node, cb) => {
                    // Root node
                    if (node.id === '#') {
                        cb(this.categoryTreeData);
                    } else {
                        // Lazy loaded children
                        this.loadTreeNodes(node, cb);
                    }
                },
                themes: {
                    icons: true,
                },
            },
            checkbox: {
                three_state: false,
            },
            plugins: [
                'checkbox',
            ],
        };

        $container.jstree(treeOptions);
    }

    initFacetedSearch() {
        const $productListingContainer = $('#product-listing-container .productListing');
        const $contentListingContainer = $('#search-results-content');
        const $facetedSearchContainer = $('#faceted-search-container');
        const $searchHeading = $('#search-results-heading');
        const $searchCount = $('#search-results-product-count');
        const $contentCount = $('#search-results-content-count');
        const $paginatorContainer = $('.pagination');
        const $showMoreContainer = $('.halo-product-show-more');
        const productsPerPage = this.context.searchProductsPerPage;
        const requestOptions = {
            template: {
                productListing: 'halothemes/gallery/halo-product-listing',
                contentListing: 'search/content-listing',
                sidebar: 'search/sidebar',
                heading: 'search/heading',
                productCount: 'search/product-count',
                contentCount: 'search/content-count',
                paginator: 'halothemes/gallery/halo-product-paginator',
            },
            config: {
                product_results: {
                    limit: productsPerPage,
                },
            },
            showMore: 'search/show-more',
        };

        this.facetedSearch = new FacetedSearch(requestOptions, (content) => {
            $searchHeading.html(content.heading);

            const url = Url.parse(window.location.href, true);
            if (url.query.section === 'content') {
                $contentListingContainer.html(content.contentListing);
                $contentCount.html(content.contentCount);

                this.showContent(false);
            } else {
                $productListingContainer.html(content.productListing);
                $facetedSearchContainer.html(content.sidebar);
                $searchCount.html(content.productCount);
                $paginatorContainer.html($(content.paginator).find('.pagination').children());
                $showMoreContainer.html($(content.paginator).find('.halo-product-show-more').children());

                this.showProducts(false);
                this.showProductsPerPage();
                this.showItem();
                this.showMoreProducts();
                
                if($('#product-listing-container .product').length > 0){
                    haloAddOptionForProduct(this.context, 'product-listing-container');
                }
            }

            $('body').triggerHandler('compareReset');

            $('html, body').animate({
                scrollTop: 0,
            }, 100);
        });
    }

    initValidation($form) {
        this.$form = $form;
        this.validator = nod({
            submit: $form,
        });

        return this;
    }

    bindValidation($element) {
        if (this.validator) {
            this.validator.add({
                selector: $element,
                validate: 'presence',
                errorMessage: $element.data('errorMessage'),
            });
        }

        return this;
    }

    check() {
        if (this.validator) {
            this.validator.performCheck();
            return this.validator.areAll('valid');
        }

        return false;
    }

    showProductsPerPage(){
        try {
            var url = new URL(window.location.href);
            var c = url.searchParams.get("limit");
            if(c != null){
                var limit = document.querySelectorAll('select#limit option');
                Array.prototype.forEach.call(limit, function(element) {
                    if(element.value == c){
                        element.selected = true;
                    }
                });
            }
        } catch(e) {}
    }

    showMoreProducts() {
        const context = this.context;

        const getUrlParameter = this.getUrlParameter('limit');

        $('#listing-showmoreBtn > a').on('click', (event) => {
            event.preventDefault();

            var nextPage = $(".pagination-item--current").next(),
                link = nextPage.find("a").attr("href");

            $('#listing-showmoreBtn > a').addClass('loading');

            $.ajax({
                type: 'get',
                url: link.replace("http://", "//"),
                success: function(data) {
                    if ($(data).find('#product-listing-container .productListing').length > 0) {
                        $('#product-listing-container .productListing').append($(data).find('#product-listing-container .productListing').children());

                        $('.pagination-list').html($(data).find(".pagination-list").html());

                        $('#listing-showmoreBtn > a').removeClass('loading').blur();

                        nextPage = $(".pagination-item--current").next();

                        if (nextPage.length === 0) {
                            $('#listing-showmoreBtn > a').addClass('disable').text('No more products');
                            $('.pagination .pagination-info .end').text($('.pagination-info .total').text());
                        } else{
                            var limit = getUrlParameter,
                                productPerPage,
                                pageCurrent = parseInt($(".pagination-item--current > a").text());

                            if (limit !== undefined) {
                                productPerPage = limit;
                            } else{
                                productPerPage = context.searchProductsPerPage;
                            }

                            $('.pagination .pagination-info .end').text(parseInt(productPerPage)*pageCurrent);
                        }

                        if($(data).find('#product-listing-container .product').length > 0){
                            haloAddOptionForProduct(context, 'product-listing-container');
                        }
                    }
                }
            });
        });
    }

    showItem() {
        var total = parseInt($('.pagination-info .total').text()),
            limit = this.getUrlParameter('limit'),
            productPerPage;

        if (limit !== undefined) {
            productPerPage = limit;
        } else{
            productPerPage = this.context.searchProductsPerPage;
        }

        var start = 1,
            end = total,
            checkLastPage = false,
            lastPage = 1;
            
        var checkLink = $(".pagination-list .pagination-item--current").next();
        var pageNotLast = lastPage - 1;
        var totalNotLast = pageNotLast * productPerPage;
        var productsLastPage = total - totalNotLast;
        var currentPage = parseInt($('.pagination-item--current > a').text());
        var prevPage = currentPage - 1;

        if (checkLink.length === 0) {
            lastPage = parseInt($(".pagination-item--current").find("a").text());
            checkLastPage = true;
        } else {
            lastPage = parseInt(checkLink.find("a").text());
            checkLastPage = false;
        }
        
        if (total <= productPerPage) {
            $('.pagination-info .start').text(start);
            $('.pagination-info .end').text(end);
        } else {
            if (currentPage <= 1) {
                end = productPerPage;
            } else {
                start = (prevPage * productPerPage) + 1;
                
                if (checkLastPage = true) {
                    if($('.pagination-list .pagination-item--next').length > 0){
                        end = totalNotLast + productsLastPage - 1;
                    } else{
                        end = totalNotLast + productsLastPage;
                    }
                } else {
                    end = currentPage * productPerPage;
                }
            }

            $('.pagination-info .start').text(start);
            $('.pagination-info .end').text(end);
        }
    }

    fancyboxVideoBanner(){
        if ($(".video-block-image[data-fancybox]").length) {
            $(".video-block-image[data-fancybox]").fancybox({
                'autoDimensions': false,
                'padding' : 0,
                'width' : 970,
                'height' : 600,
                'autoScale' : false,
                'transitionIn' : 'none',
                'transitionOut' : 'none'
            });
        }

        if ($(".button-popup-video[data-fancybox]").length) {
            $(".button-popup-video[data-fancybox]").fancybox({
                'autoDimensions': false,
                'padding' : 0,
                'width' : 970,
                'height' : 600,
                'autoScale' : false,
                'transitionIn' : 'none',
                'transitionOut' : 'none'
            });
        }
    }

    getUrlParameter(sParam) {
        var sPageURL = decodeURIComponent(window.location.search.substring(1)),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : sParameterName[1];
            }
        }
    }

    loadOptionForProductCard(context){
        if($('#featured-products .card').length > 0){
            haloAddOptionForProduct(context, 'featured-products');
        }

        if($('#product-listing-container .product').length > 0){
            haloAddOptionForProduct(context, 'product-listing-container');
        }
    }
}
