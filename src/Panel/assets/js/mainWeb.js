 
(function() {
  "use strict";
 
  var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
   var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
   return new bootstrap.Tooltip(tooltipTriggerEl)
   })
 
   $(".banner_slider").owlCarousel({
      autoplay: true,
      autoplayHoverPause: false,
      autoplayTimeout: 4000,
      dots: false,
      loop:true,  
      autoHeight: true, 
      items: 1,
      nav: true,  
  });

   $(".category_slider").owlCarousel({
      autoplay: false,
      autoplayHoverPause: false,
      autoplayTimeout: 2000,
      dots: false,
      loop:false,
      autoWidth:true, 
      autoHeight: true, 
      items: 8,
      nav: true,  
      responsive : { 
        0 : {
          nav: false,  
        },
        768 : {
          nav: true,  
        }
    }
  });


    $(document).ready(function () {
      $('.fav_btn').on('click', function () { 
        $(this).toggleClass('change_btn'); 
      })
  }); 


    $('.offer_request_top').click(function(e) {
        $('.offer_request_box').removeClass('active');
        $(this).parent().addClass('active');
    }); 

    $(window).scroll(function() {
        var scroll = $(window).scrollTop();
        if (scroll >= 100) {
            $('.header_main').addClass("header_fixed");
        } else {
            $('.header_main').removeClass("header_fixed");
        }
    });
  
    $('.scrollTo').click(function(e){
      e.preventDefault();
      var target = $($(this).attr('href'));
      if(target.length){
        var scrollTo = target.offset().top;
        $('body, html').animate({
            scrollTop: $( $(this).attr('href') ).offset().top - 170
        }, 1000);
      }
    });
    
      $(document).ready(function() {
        $('.minus').click(function () {
          var $input = $(this).parent().find('input');
          var count = parseInt($input.val()) - 1;
          count = count < 1 ? 1 : count;
          $input.val(count);
          $input.change();
          return false;
        });
        $('.plus').click(function () {
          var $input = $(this).parent().find('input');
          $input.val(parseInt($input.val()) + 1);
          $input.change();
          return false;
        });
      });

      $(document).ready(function () {
          $('.offerpost_btns').on('click', function () { 
              $('.post_offer_show').toggleClass('show_btnss');  
              $('.Mobile_menus').toggleClass('show_blur');    
          })
          $('.offerpost_btns').on('click', function () {  
              $('.act').removeClass('active');   
          })
          $('.offerpost_btns').on('click', function () {   
            $('.offerpost_btns').toggleClass('active');  
          })
          $('.onclk').on('click', function () {   
            $('body').toggleClass('removebottom_bar');  
          })
          $('.profile_main .btn-close').on('click', function () {   
            $('body').toggleClass('removebottom_bar');  
          })
      });
      
    $(document).ready(function () {
        $('#categorry .category-box').on('click', function () {  
            $('#sub_category').removeClass('show_subcategory');  
            $('#sub_category').addClass('show_subcategory');  
        })
        $('#sub_category .category-box').on('click', function () {  
            $('#Brands_category').removeClass('show_brands');  
            $('#Brands_category').addClass('show_brands');  
        })
        $('#categorry .category-box').on('click', function () {  
          $('#years_category').removeClass('show_years');  
          $('#years_category').addClass('show_years');  
        })

        $('#categorry .category-box').on('click', function () {  
            $('#follow-category').removeClass('show_follow');  
            $('#follow-category').addClass('show_follow');  
        })
    });

    $(document).ready(function () {
      $('#categorry .category-box').click(function(e) {
        $('#categorry .category-box').removeClass('active');
        $(this).addClass('active');
      });
    });

    $(document).ready(function () {
      $('#sub_category .category-box').click(function(e) {
        $('#sub_category .category-box').removeClass('active');
        $(this).addClass('active');
      });
    });
    $(document).ready(function () {
      $('#Brands_category .category-box').click(function(e) {
        $('#Brands_category .category-box').removeClass('active');
        $(this).addClass('active');
      });
    });


    $('.bell_drop').on('click', function () { 
        $('.Inbox_drop_tab').toggleClass('show_box');     
    })
  
    // zooom js 
        var options = {
          zoom: {
              width: 300,
              height: 300,
              zIndex: 600
          },
          overlay: {
              opacity: 0.65,
              zIndex: 500,
              backgroundColor: '#000000',
              fade: true
          },
          detail: {
              zIndex: 600,
              margin: {
                  top: 0,
                  left: 10
              },
              fade: true
          }
      };
      jQuery(document).ready(function() {
          jQuery('.imgZoom').mooZoom(options);
      });
    // zooom js 
	


     var btn = $('.back_to_top');

     $(window).scroll(function() {
       if ($(window).scrollTop() > 300) {
         btn.addClass('show');
       } else {
         btn.removeClass('show');
       }
     });
     
     btn.on('click', function(e) {
       e.preventDefault();
       $('html, body').animate({scrollTop:0}, '300');
     });
     


})();