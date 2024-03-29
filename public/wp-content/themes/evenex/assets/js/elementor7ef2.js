(function($, elementor) {
  "use strict";

  var Evenex = {
    init: function() {
      var widgets = {
        "evenex-speaker.default": Evenex.Speaker,
        "evenex-advanced-tab.default": Evenex.Advnaced_Tab,
        "evenex-back-to-top.default": Evenex.Back_To_Top,
        "evenex-schedule.default": Evenex.Schedule,
        "evenex-event-slider.default": Evenex.EventSlider,
        "evenex-eventin-event.default": Evenex.Evenex_Eventin_MultiEvent,
      };
      $.each(widgets, function(widget, callback) {
        elementor.hooks.addAction("frontend/element_ready/" + widget, callback);
      });
    },
    Speaker: function($scope) {
      var $container = $scope.find(".spaker_masonry_grid");
      if ($container.length > 0) {
        var colWidth = function colWidth() {
            var w = $container.width(),
              columnNum,
              columnWidth = 0;
            if (w > 1024) {
              columnNum = 3;
            } else if (w > 768) {
              columnNum = 2;
            }
            columnWidth = Math.floor(w / columnNum);
            $container.find(".spaker_masonry_grid_item").each(function() {
              var $item = $(this),
                multiplier_w = $item
                  .attr("class")
                  .match(/spaker_masonry_grid_item-w(\d)/),
                width = multiplier_w
                  ? columnWidth * multiplier_w[1]
                  : columnWidth;
              $item.css({
                width: width
              });
            });
            return columnWidth;
          },
          isotope = function isotope() {
            $container.isotope({
              resizable: false,
              itemSelector: ".spaker_masonry_grid_item",
              masonry: {
                columnWidth: colWidth(),
                gutterWidth: 0
              }
            });
          };
        isotope();
        $(window).on("resize load", isotope);
      }
    },
    Advnaced_Tab: function($scope) {
      $scope.find('.xs-tab-svg-icon').each(function () {
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
    },
    Back_To_Top: function($scope) {
      $scope.find('.BackTo').on('click', function (e) {
        e.preventDefault();
        $('body, html').animate({
          scrollTop: 0
        }, 1500)
      });
      $(window).on("scroll", function() {
        var scrolltop = $(window).scrollTop(),
            docHeight = $(document).height() / 2;

          if (scrolltop > docHeight) {
            $scope.fadeIn("slow");
          } else {
            $scope.fadeOut("slow");
          }
      });
    },
    Schedule: function ($scope) {
      if ($scope.find('.xs-schedule-accordion').length > 0) {
        $scope.find('.schedule-accordion-card').on('click', function () {
          $(this).siblings().removeClass('show');
          if (!$(this).hasClass('show')) {
            $(this).addClass('show');
          }
        })
      }
    },
    EventSlider: function($scope){
      var el = $scope.find('.evenex-event-slider-wrapper');

      new Swiper(el, {
        slidesPerView: 1,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true
        }
      })
    },
    Evenex_Eventin_MultiEvent: function($scope) {
      if ($scope.find('.etn_event_slider').length > 0) {
        let $this = $scope.find('.etn_event_slider');
        new Swiper($this, {
          // slidesPerView: $this.attr("data-slidesperview"),
          spaceBetween: 30,
          navigation: {
            nextEl: $scope.find('.event-slider-button-next'),
            prevEl: $scope.find('.event-slider-button-prev'),
          },
          breakpoints: {
            640: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: $this.attr("data-slidesperview"),
            },
          }
        });
      }
      if ($scope.find('.event_filter_list').length > 0) {
        let $galleryGrid = $scope.find('.event_filter_list');

        $galleryGrid.imagesLoaded( function() {
          $galleryGrid.isotope();
        } );

        // Filter List
        var $filterList = $scope.find( '.filter-button-wraper' ),
          $filterLinks = $filterList.find( 'a' );

        $filterLinks.on( 'click', function( e ) {
          e.preventDefault();

          var $this = $( this );

          $this.parents( '.option-set' ).find( '.selected' ).removeClass( 'selected' );
          $this.addClass( 'selected' );

          $galleryGrid.isotope( {
            filter: $this.data( 'option-value' ),
          } );
        } );
      }
    },
  };
  $(window).on("elementor/frontend/init", Evenex.init);
})(jQuery, window.elementorFrontend);
