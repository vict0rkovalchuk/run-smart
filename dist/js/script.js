$(document).ready(function () {
  $('.carousel__inner').slick({
    speed: 300,
    adaptiveHeight: true,
    prevArrow:
      '<button type="button" class="slick-prev"><img src="./icons/left.svg"/></button>',
    nextArrow:
      '<button type="button" class="slick-next"><img src="./icons/right.svg"/></button>',
    responsive: [
      {
        breakpoint: 991,
        settings: {
          dots: true,
          arrows: false
        }
      }
    ]
  });

  $('ul.catalog__tabs').on(
    'click',
    'li:not(.catalog__tab_active)',
    function () {
      $(this)
        .addClass('catalog__tab_active')
        .siblings()
        .removeClass('catalog__tab_active')
        .closest('.catalog')
        .find('div.catalog__content')
        .removeClass('catalog__content_active')
        .eq($(this).index())
        .addClass('catalog__content_active');
    }
  );

  function toggleClasses(className) {
    $(`.${className}`).each(function (i) {
      $(this).on('click', function (e) {
        e.preventDefault();
        $('.catalog-item__content')
          .eq(i)
          .toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      });
    });
  }

  toggleClasses('catalog-item__back');
  toggleClasses('catalog-item__link');

  $('[data-modal="consultation"]').on('click', function () {
    $('.overlay, #consultation').fadeIn();
  });

  $('.modal__close').on('click', function () {
    $('.overlay, #consultation, #order, #thanks').fadeOut();
  });

  $('.button_mini').on('click', function () {
    $('.overlay, #order').fadeIn();
  });

  $('.button_mini').each(function (i) {
    $(this).on('click', function () {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
    });
  });

  function validateForm(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: 'required',
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: "Будь ласка, введіть своє ім'я",
          minlength: jQuery.validator.format('Введіть {0} символа!')
        },
        phone: 'Будь ласка, введіть свій номер телефону',
        email: {
          required: 'Будь ласка, введіть свою пошту',
          email: 'Неправильно введена адреса пошти'
        }
      }
    });
  }

  validateForm('#consultation-from');
  validateForm('#consultation form');
  validateForm('#order form');

  $('input[name="phone"]').mask('+38(999) 999-99-99');

  $('form').submit(function (e) {
    e.preventDefault();

    if (!$(this).valid()) {
      return;
    }

    $.ajax({
      type: 'POST',
      url: 'mailer/smart.php',
      data: $(this).serialize()
    }).done(function () {
      $(this).find('input').val('');
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn();

      $('form').trigger('reset');
    });
    return false;
  });

  $(window).scroll(function () {
    if ($(this).scrollTop() > 1600) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });

  $('.pageup').on('click', function (event) {
    if (this.hash !== '') {
      event.preventDefault();

      const hash = this.hash;

      $('html, body').animate(
        {
          scrollTop: $(hash).offset().top
        },
        800,
        function () {
          window.location.hash = hash;
        }
      );
    }
  });

  new WOW().init();
});
