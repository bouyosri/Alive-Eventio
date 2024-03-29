jQuery(document).ready(function ($) {
    "use strict";
    /* ----------------------------------------------------------- */
    /*  Mobile Menu
    /* ----------------------------------------------------------- */
    $(".dropdown > a").on("click", function (e) {
        if ($(window).width() > 991) {
            location.href = this.href;
        }
        var dropdown = $(this).parent(".dropdown");
        dropdown.find(">.dropdown-menu").slideToggle("show");
        $(this).toggleClass("opened");
        return false;
    });

    $(".nav-search-area").on("click", ".header-search-icon", function () {
        $(".xs-search-group").fadeToggle(350);
    });

    $('[data-toggle="tooltip"]').tooltip();

    /* ----------------------------------------------------------- */
    /*  Back to top
     /* ----------------------------------------------------------- */

    $(window).on("scroll", function () {
        var scrolltop = $(window).scrollTop(),
            docHeight = $(document).height() / 2;

        if (scrolltop > docHeight) {
            $(".back_to_top").fadeIn("slow");
        } else {
            $(".back_to_top").fadeOut("slow");
        }

        if ($(document).width() < 992) {
            return;
        }
        if (scrolltop > 300) {
            $(".navbar-sticky").addClass("fixed-top");
        } else {
            $(".navbar-sticky").removeClass("fixed-top");
        }
    });

    if ($('.comments-link').length) {
        $('.comments-link').on('click', function (e) {
            var target_hash = $(this.hash),
                target_hash = target_hash.length ? target_hash : $('[name=' + this.hash.slice(1) + ']');
            if (target_hash.length) {
                e.preventDefault();
                $('html, body').animate({
                    scrollTop: target_hash.offset().top
                }, 1000);
            }
        })
    }

    /* ----------------------------------------------------------- */
    /* Cursor Follower
    /* ----------------------------------------------------------- */
    var xsCursorFollowerEl = $(".xs_cursor_follower"),
        xsCursorFollowerOuterEl = $(".xs_cursor_follower_outer"),
        xsCursorFollowerTargets =
            ".ekit-wid-con a, .ekit-wid-con button, .cursor-pointer, .cursor-pointers a";

    if (xsCursorFollowerEl.length > 0) {
        $("body").on("mousemove", function (e) {
            requestAnimationFrame(function () {
                xsCursorFollowerEl.css({
                    transform: "translate(" + e.clientX + "px, " + e.clientY + "px)"
                });
                xsCursorFollowerOuterEl.css({
                    transform: "translate(" + e.clientX + "px, " + e.clientY + "px)"
                });
            });
        });

        $("body").on("mouseover", xsCursorFollowerTargets, function () {
            var target = this.className;
            if (this.getAttribute("data-elementor-open-lightbox") === "yes") {
                target = "lightbox";
            }
            xsCursorFollowerEl.addClass("active");
            xsCursorFollowerEl.attr("data-target", target);
        }).on("mouseout", xsCursorFollowerTargets, function () {
            xsCursorFollowerEl.removeClass("active");
            xsCursorFollowerEl.attr("data-target", "");
        });
    }

    /* ----------------------------------------------------------- */
    /* Single Speaker
    /* ----------------------------------------------------------- */
    $(window).on('load', function () {
        $('.speaker-details-col').each(function () {
            let column = $(this).find('.xs-schedule-box').length;
            if (column === 0) {
                $(this).remove()
            }
        })
    })

    $('.post-meta').each(function () {
        if ($(this).text().trim().length === 0) {
            $(this).addClass('d-none')
        }
    })

    /* ----------------------------------------------------------- */
    /* Event Single Page sidebar
    /* ----------------------------------------------------------- */
    var $sticky = $('.etn-sidebar, .etn_search_archive_sidebar');
    var $stickyrStopper = $('.etn-event-single-content-wrap, .xs_search_archive_content_wraper');
    if (!!$sticky.offset() && ($(window).width() > 991) && ($stickyrStopper.height() > $sticky.height())) {
        var generalSidebarHeight = $sticky.innerHeight();
        var stickyTop = $sticky.offset().top;
        var stickOffset = $('.xs_sticky_border_shadow').length ? $('.xs_sticky_border_shadow').innerHeight() + 20 : 0;
        var stickyStopperPosition = $stickyrStopper.innerHeight();
        var stopPoint = stickyStopperPosition - generalSidebarHeight - stickOffset;
        var sticky_initial = stickyTop + stickOffset;
        $(window).on('scroll', function () {
            var windowTop = $(window).scrollTop();
            if ($stickyrStopper.offset().top + $stickyrStopper.height() > $(window).scrollTop() + $sticky.height() && $stickyrStopper.offset().top < $(window).scrollTop()) {
                $sticky.css({ position: 'fixed', top: stickOffset });
            } else if (stopPoint < windowTop) {
                $sticky.css({ position: 'sticky', top: sticky_initial });
            }
            else {
                $sticky.css({ position: 'absolute', top: 'initial' });
            }
        });
    }

    // Select2
    if ($('.etn_evenex_select2').length) {
        $('.etn_evenex_select2').select2();
    }

    // Preview style switch
    if ($('.preview_type_lists').length && $('.etn_search_item_container').length) {
        let $old_class = $('.etn_search_item_container').attr("class");
        $old_class = $old_class.replace('card_preview_style_one', '');
        $('.preview_type_lists').find('>li').on('click', function () {
            // -- Add Container Class
            let $new_class = $(this).attr("data-class");
            const queryString = new URL(window.location);
            queryString.searchParams.set('preview_type', $new_class);
            window.history.pushState({}, '', queryString);

            if ($(this).parents('body').find('.etn_search_item_container').hasClass($new_class)) {
                $(this).parents('body').find('.etn_search_item_container').attr("class", $old_class)
            } else {
                $(this).parents('body').find('.etn_search_item_container').attr("class", [$old_class, $new_class].join(" "))
            }
            // --- Add active class
            if (!$(this).hasClass('active')) {
                $('.preview_type_lists').find('>li').not($(this).addClass('active')).removeClass('active');
            }
        });

        function show_preview_type(current) {

            let list_items = $('.preview_type_lists');

            const queryValue = new URLSearchParams(window.location.search);

            let preview_type = queryValue.get("preview_type");

            let $old_class = $('.etn_search_item_container').attr("class");
            $old_class = $old_class.replace('card_preview_style_one', '');

            if (preview_type !== null && preview_type.length) {
                list_items.find('>li').each(function () {
                    if ($(this).attr('data-class') === preview_type) {
                        $(this).addClass('active');
                        let $new_class = $(this).attr("data-class");
                        $(this).parents('body').find('.etn_search_item_container').attr("class", [$old_class, $new_class].join(" "))
                    }
                });
            } else {
                let $new_class = list_items.find('>li:nth-child(1)').attr("data-class");
                if (!list_items.find('>li:nth-child(1)').hasClass('active')) {
                    list_items.find('>li:nth-child(1)').addClass('active');
                    $('.etn_search_item_container').attr("class", [$old_class, $new_class].join(" "))
                }
            }
        }

        show_preview_type();

        // -- Get svg raw code
        let $target = $('.preview_type_lists');
        $target.find('>li img').each(function () {
            var img = $(this);
            var attributes = img.prop("attributes");
            var imgURL = img.attr("src");
            $.get(imgURL, function (data) {
                var svg = $(data).find('svg');
                svg = svg.removeAttr('xmlns:a');
                $.each(attributes, function () {
                    svg.attr(this.name, this.value);
                });
                img.replaceWith(svg);
            });
        });
    }

    /*============================
        Dark-light mode
    =============================== */
    if ($('.change-mode').length) {
        $(document).on('click', '.change-mode', function () {

            var defaultSkin = $('html').data('skin'),
                siteSkin = 'light';

            if ($('html').hasClass('dark-themes')) {
                siteSkin = 'dark';
            }

            var switchTo = (siteSkin == 'dark') ? 'light' : 'dark';
            if ('undefined' != typeof localStorage) {
                localStorage.setItem('digi-skin', switchTo);
            }

            if (defaultSkin == switchTo) {
                $('html').removeClass('digi-skin-switch');
            }
            else {
                $('html').addClass('digi-skin-switch');
            }

            if (switchTo == 'dark') {
                $('html').addClass('dark-themes');
            }
            else {
                $('html').removeClass('dark-themes');
            }
        });
        if (localStorage.getItem('digi-skin') === 'dark') {
            $('html').addClass('dark-themes');
        } else {
            $('html').removeClass('dark-themes');
        }
    }
});