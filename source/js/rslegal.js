window.MOBILE_WIDTH = 990;

jQuery(document).ready(function($) {

  var isFPactive = false;

  var MARKER_MOBILE_SIZE = {
    width: 80,
    height: 88
  };

  var currentMarkerSize = MARKER_MOBILE_SIZE;

  /* Полный экран и анимация */

  var startFullPage = function () {
    var fpSelector = ".js-fullpage";
    var fpSections = $(fpSelector),
        fpAnchors = [];

    fpSections.each(function() {
      fpAnchors.push($(this).attr("data-menuanchor"));
    });

    $(".site-content").fullpage({
      sectionSelector: fpSelector,
      controlArrows: false,
      navigation: true,
      navigationPosition: "left",
      anchors: fpAnchors,
      slidesNavigation: false,
      verticalCentered: false,
      css3: true,
      keyboardScrolling: true,
      onLeave: function(origin, destination, direction) {
        var sectionClass = $("[data-menuanchor=" + destination.anchor + "]").attr("data-color");

        $("body").removeClass("site--dark site--light");
        $("body").addClass(sectionClass);
      }
    });
  };

  /* Полный экран и анимация */
  /* Проверка разрешения экрана с отключением fullpage для экранов с разрешением по горизонтали менее 990 пикс */

  var getWindowResolution = function () {
    if ($(window).width() <= window.MOBILE_WIDTH) {
      $("body").addClass("mobile");
      $("body").removeClass("site--dark site--light");

      if(isFPactive) {
        fullpage_api.destroy("all");
        isFPactive = false;
      }
    } else {
      $("body").removeClass("mobile");

      if(!isFPactive) {
        startFullPage();
        isFPactive = true;
      }
    }
  };

  if ($("body").hasClass("home")) {
    $(window).on("load resize", getWindowResolution);
  }

  /* Проверка разрешения экрана */
  /* Прелоадер */

  $(window).on("load", function () {
    $(".loading").fadeOut(300);
    $("body").removeClass("no-js");
	});

  /* Прелоадер */
  /* Слайдер - услуги */

	var servicesSlider = $( "#services-slider" );

	servicesSlider.owlCarousel({
		nav: false,
		loop: true,
		autoplay: true,
		autoplayTimeOut: 5000,
		autoplayHoverPause: true,
		autoplaySpeed: 500,
		dots: false,
		lazyLoad: true,
    items: 1,
    autoHeight: true
	});

	$("#services-slider-next").on("click", function(evt) {
		evt.preventDefault();
		servicesSlider.trigger("next.owl.carousel");
	});

	$("#services-slider-prev" ).on("click", function(evt) {
		evt.preventDefault();
		servicesSlider.trigger("prev.owl.carousel");
	});

  /* Слайдер - услуги */
  /* Слайдер - практики */

	window.practicesSlider = $("#practices-slider");

	window.practicesSlider.owlCarousel({
		nav: false,
		loop: true,
		autoplay: false,
		dots: false,
		lazyLoad: true,
		items: 1
	});

	$("#practices-slider-next").on("click", function(evt) {
		evt.preventDefault();
		window.practicesSlider.trigger("next.owl.carousel");
	});

	$("#practices-slider-prev").on("click", function(evt) {
		evt.preventDefault();
		window.practicesSlider.trigger("prev.owl.carousel");
	});

  /* Слайдер - практики */
  /* Слайдер - команда */

  window.teamSlider = $("#team-slider");
  var teamSliderNext = $("#team-slider-next");
  var teamSliderPrev = $("#team-slider-prev");
  var SPEED = 300;

	window.teamSlider.owlCarousel({
		nav: false,
		loop: true,
		autoplay: false,
		dots: false,
		lazyLoad: true,
    items: 1,
    autoHeight: true,
    onTranslate: function (evt) {
      var currentSlideIndex = evt.item.index;
      var slides = window.teamSlider.find('.screen');

      var nextIndex = (currentSlideIndex === evt.item.count + 2) ? 3 : currentSlideIndex + 1;
      var prevIndex = (currentSlideIndex === 2) ? evt.item.count + 1 : currentSlideIndex - 1;

      var nextMember = {
        name: (slides.eq(nextIndex).find(".screen-team__name").html()).replace(/\<br\>/, " "),
        job: slides.eq(nextIndex).find(".screen-team__job").text()
      };

      var prevMember = {
        name: (slides.eq(prevIndex).find(".screen-team__name").html()).replace(/\<br\>/, " "),
        job: slides.eq(prevIndex).find(".screen-team__job").text()
      }

      var nextMemberTitle = teamSliderNext.find(".slider-nav__title-wrapper");
      var prevMemberTitle = teamSliderPrev.find(".slider-nav__title-wrapper");

      nextMemberTitle.add(prevMemberTitle).animate({opacity: 0}, SPEED);

      nextMemberTitle.queue(function () {
        $(this).find(".slider-nav__title").text(nextMember.name);
        $(this).find(".slider-nav__subtitle").text(nextMember.job);

        $(this).dequeue();
      });

      prevMemberTitle.queue(function () {
        $(this).find(".slider-nav__title").text(prevMember.name);
        $(this).find(".slider-nav__subtitle").text(prevMember.job);

        $(this).dequeue();
      });

      nextMemberTitle.add(prevMemberTitle).animate({opacity: 1}, SPEED);
    }
	});

	teamSliderNext.on("click", function(evt) {
		evt.preventDefault();
		window.teamSlider.trigger("next.owl.carousel");
	});

	teamSliderPrev.on("click", function(evt) {
		evt.preventDefault();
		window.teamSlider.trigger("prev.owl.carousel");
	});

  /* Слайдер - команда */
  /* Слайдер - опыт */

	var casesSlider = $("#cases-slider");

	casesSlider.owlCarousel({
		nav: false,
		loop: true,
		autoplay: false,
		dots: false,
    lazyLoad: true,
		responsive: {
			0: {
        items: 1,
        margin: 0
			},
			750: {
        items: 2,
        margin: 50
			},
			1025: {
        items: 3,
        margin: 50
			}
    }
	});

	$("#cases-slider-next").on("click", function(evt) {
		evt.preventDefault();
		casesSlider.trigger("next.owl.carousel");
	});

	$("#cases-slider-prev").on("click", function(evt) {
		evt.preventDefault();
		casesSlider.trigger("prev.owl.carousel");
	});

  /* Слайдер - опыт */
  /* Слайдер - новости */

	var newsSlider = $("#news-slider");

	newsSlider.owlCarousel({
		nav: false,
		loop: true,
		autoplay: false,
		dots: false,
    lazyLoad: true,
		responsive: {
			0: {
        items: 1,
        margin: 0
			},
			750: {
        items: 2,
        margin: 50
			},
			1025: {
        items: 3,
        margin: 50
			}
		}
	});

	$("#news-slider-next").on("click", function(evt) {
    evt.preventDefault();
    newsSlider.trigger("next.owl.carousel");
	});

	$("#news-slider-prev").on("click", function(evt) {
		evt.preventDefault();
		newsSlider.trigger("prev.owl.carousel");
	});

  /* Слайдер - новости */
  /* Карта */

  var map = document.querySelector("#map");
  var mapMarker = {
    coords: "55.765017, 37.598753",
    url: "https://rslegal.ru/wp-content/themes/rslegal/img/marker.svg"
  };
  var mapCoords = (mapMarker.coords).split(",");

  if(map) {

    ymaps.ready(function () {
      var centerCoords = mapCoords, mZoom = 17;
      var myMap = new ymaps.Map("map",
        {
          center: centerCoords,
          zoom: mZoom
        },
        {
          searchControlProvider: "yandex#search"
        }
      ),
      marker = new ymaps.Placemark(mapCoords,
        {
          hintContent: "RS Legal",
          balloonContent: ""
        },
        {
          iconLayout: "default#image",
          iconImageHref: mapMarker.url,
          iconImageSize: [currentMarkerSize.width, currentMarkerSize.height],
          iconImageOffset: [-1 * currentMarkerSize.width / 2, -1 * currentMarkerSize.height ]
        }
      );
      myMap.behaviors.disable("scrollZoom");
      myMap.geoObjects.add(marker);
    });
  }

  /* Карта */
  /* Меню */

  var menuButton = $(".navigation__button");
  var navigation = $(".navigation").removeClass("navigation--open");

  menuButton.on("click", function () {
    navigation.toggleClass("navigation--open");
  });

  /* Меню */
  /* Скроллинг */

  var scrollButton = $(".js-scroll");

  scrollButton.on("click", function (evt) {
    evt.preventDefault();

    var link = $(this).attr("href");
    link = link.replace("#", "");

    var owlParent = $(this).attr("data-owl-parent");
    var owlSlides = $("#" + owlParent).find(".screen");
    var fpMoveToTarget = owlSlides.filter("[data-owl=" + link + "]").first().parent(".owl-item");
    var fpMoveTo = $("#" + owlParent).find(".owl-item").index(fpMoveToTarget);

    if(!$("body").hasClass("mobile")) {

      if($(this).is(".js-scroll-owl")) {
        fullpage_api.moveTo("section-" + owlParent, 0);
        window.practicesSlider.trigger("to.owl.carousel", [fpMoveTo + 1, 300]);
      } else {
        fpMoveTo = "section-" + link;
        fullpage_api.moveTo(fpMoveTo, 0);
      }
    } else {
      if($(this).is(".js-scroll-owl")) {

        console.log(owlParent);
        var target = $("#" + owlParent).offset().top;

        window.practicesSlider.trigger("to.owl.carousel", [fpMoveTo + 1, 300]);
      } else {
        target = $("#" + link).offset().top;
      }

      $("body,html").animate({scrollTop: target},150);
		}

    if(navigation.hasClass("navigation--open")) {
      navigation.removeClass("navigation--open");
    }
  });

  /* Скроллинг */
  /* Форма */

  var formLabels = $(".form__label");

  formLabels.each(function () {
    var formInput = $(this).find(".js-input");
    var that = $(this);

    formInput.on({
      focus: function () {
        that.addClass("form__label--focused");
      },
      blur: function () {
        if ($(this).val() === ""){
          that.removeClass("form__label--focused");
        }
      },
    });
  });

  var buttonShowModal = $(".js-modal");
  var modal = $(".modal");
  var buttonCloseModal = modal.find(".modal__close");

  buttonShowModal.on("click", function (evt) {
    evt.preventDefault();

    modal.addClass("modal--open");

    var formInputs = modal.find(".js-input");

    formInputs.trigger("focus");
    formInputs.first().focus();
  });

  buttonCloseModal.on("click", function (evt) {
    evt.preventDefault();

    modal.removeClass("modal--open");
  });

  var disableSubmit = function (form) {
		$(form).find(".form__button").attr("disabled","disabled").addClass("form__button--disabled");
  };

  var mailResult = function (selector) {
		var form = $(selector);
    var result = form.find(".form__result");

    result.addClass("form__result--showed");

		if (!result.children(".form__server-answer").attr("data-error")) {
			setTimeout(
				function () {
          $(".modal").removeClass("modal--open");
          result.removeClass("form__result--showed").find("span").remove();
					form.find(".js-input").not("[type=hidden]").val("").removeClass("error valid");
					form.find(".form__button").removeAttr("disabled").removeClass("form__button--disabled");
				},
        2000
			);
		} else {
      form.find(".form__button").removeAttr("disabled").removeClass("form__button--disabled");
    }
  };

  var mailOptions = {
		url: "",
		type: "post",
		target: ".form__result",
    success: function () {
      mailResult("#feedback");
    }
  };

  $("#feedback").validate({
    rules: {
      "feedback-name": {
				required: true,
				minlength: 5
      },
      "feedback-phone": {
				required: true,
				phoneRUS: true
      },
      "feedback-email": {
				required: true,
				email: true
      }
    },
    messages: {
      "feedback-name": {
				required: "Должно быть заполнено",
				minlength: "Минимальная длина – 5 символов"
      },
      "feedback-phone": {
				required: "Должно быть заполнено",
				phoneRUS: "Неверный формат"
      },
      "feedback-email": {
				required: "Должно быть заполнено",
				email: "Неверный формат"
      }
    },
    submitHandler: function (form) {
			disableSubmit(form);
			$(form).ajaxSubmit(mailOptions);
		}
  });

  /* Форма */

});
