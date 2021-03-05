jQuery(document).ready(function($) {
  function getDefaultValue ( cssVar ) {
		return 1 * (cssVar.replace("px", ""));
  }

  if ($(window).width() > window.MOBILE_WIDTH) {
    $(window).on("load", function () {
      var animOffset = 150;
      var fromOffset = 25;
      var animDuration = 0.75;

			var scrollController = new ScrollMagic.Controller({
        globalSceneOptions: {
          triggerHook: "onEnter"
        }
      });

      var menuButton = $(".navigation__button");
      var fpNav = $("#fp-nav");
      var fpMenu = $(".js-fpmenu");
      var menuNav = $(".site-header__navigation");
      var menuButton = $(".navigation__button");
      var modal = $(".modal");
      var modalForm = $(".js-modal-form");
      var modalButtons = $(".js-modal");
      var langs = $(".navigation__langs");

      var menuButtonAnimation = new TimelineMax();
      menuButtonAnimation
        .fromTo(menuButton, animDuration, {opacity: 0}, {opacity: 1}, "-=0.5")
        .call(function () {menuButton.removeClass("navigation__button--hidden")}, null, ">");

      new ScrollMagic.Scene({
        triggerElement: ".navigation__button",
        offset: animOffset
      }).setTween(menuButtonAnimation).addTo(scrollController);

      if (fpNav.length) {
        var fpNavAnimation = new TimelineMax();
        fpNavAnimation
          .staggerFromTo(fpNav.find("li"), animDuration, {top: fromOffset, opacity: 0}, {top: 0, opacity: 1, ease:Power3.easeOut}, 0.15, "+=0.5")
          .fromTo(langs, animDuration, {opacity: 0}, {opacity: 1}, "-=0.5");

        new ScrollMagic.Scene({
          triggerElement: "#fp-nav",
          offset: animOffset
        }).setTween(fpNavAnimation).addTo(scrollController);
      }

      if (fpMenu.length) {
        var menuAnimation = new TimelineMax();

        menuAnimation
          .staggerFromTo(fpMenu.find("li"), animDuration, {top: fromOffset, opacity: 0}, {top: 0, opacity: 1, ease:Power3.easeOut}, 0.15, "+=1");


        menuButton.on("click", function () {
          if (!menuNav.hasClass("navigation--open")) {
            menuAnimation.reverse();
          } else {
            menuAnimation.restart();
          }
        });
      }

      if (modalForm.length) {
        var modalTitle = modalForm.find(".modal__title");
        var modalContent = modalForm.find(".form__row");

        var modalAnimation = new TimelineMax();

        modalAnimation
          .fromTo(modalTitle, animDuration, {right: fromOffset * -1, opacity: 0}, {right: 0, opacity: 1}, "+=1")
          .staggerFromTo(modalContent, animDuration, {right: fromOffset * -1, opacity: 0}, {right: 0, opacity: 1, ease:Power3.easeOut}, 0.15, "-=0.5");

        modalButtons.on("click", function (evt) {
          evt.preventDefault();

          if (modal.hasClass("modal--open")) {
            modalAnimation.restart();
          }
        });
      }

      if ($("body").hasClass("home")) {
        var screenHome = $(".js-screen-home");

        if (screenHome.length) {
          var logo = screenHome.find(".screen-home__logo");
          var logoLeftDeft = getDefaultValue(logo.css("left"));

          var triangle = screenHome.find(".screen-home__bg");
          var triangleLeftDeft = getDefaultValue(triangle.css("left"));

          var mainTitle = screenHome.find(".screen-home__title");
          var servicesSlider = screenHome.find(".screen-home__slider");

          var screenHomeAnimation = new TimelineMax();

          screenHomeAnimation
            .fromTo(triangle, animDuration, {left: triangleLeftDeft + fromOffset * 5, opacity: 0}, {left: triangleLeftDeft, opacity: 1}, "+=0.5")
            .fromTo(mainTitle, animDuration, {left: fromOffset * 3, opacity: 0}, {left: 0, opacity: 1}, "-=0.5")
            .fromTo(logo, animDuration, {left: logoLeftDeft - fromOffset, opacity: 0}, {left: logoLeftDeft, opacity: 1}, "-=1")
            .fromTo(servicesSlider, animDuration, {left: -1 * fromOffset, opacity: 0}, {left: 0, opacity: 1}, "-=0.5");

          new ScrollMagic.Scene({
            triggerElement: ".js-screen-home",
            offset: animOffset
          }).setTween(screenHomeAnimation).addTo(scrollController);
        }

        var screenAbout = $(".js-screen-about");

        if(screenAbout.length) {
          var aboutTitle = screenAbout.find(".screen-layout-2__title");
          var aboutContent = screenAbout.find(".screen-layout-2__content-column > *");

          var screenAboutAnimation = new TimelineMax();

          screenAboutAnimation
            .fromTo(aboutTitle, animDuration, {left: fromOffset * -3, opacity: 0}, {left: 0, opacity: 1, onComplete: function () {aboutTitle.find("span").removeClass("title__underline--hidden")}}, "-=0.5")
            .staggerFromTo(aboutContent, animDuration, {top: fromOffset, opacity: 0}, {top: 0, opacity: 1, ease:Power3.easeOut}, 0.15, "+=0.5");

          new ScrollMagic.Scene({
            triggerElement: ".js-screen-about",
            offset: animOffset
          }).setTween(screenAboutAnimation).addTo(scrollController);
        }

        var screenPractices = $(".js-screen-practices");

        if (screenPractices.length) {
          var practices = screenPractices.find(".js-screen-practice");
          var practicesTimelines = [];

          var callButton = screenPractices.find(".js-modal-practices");
          var callButtonLeftDeft = getDefaultValue(callButton.css("right"));

          var practicesControls = screenPractices.find(".js-practices-nav");
          var practicesControlsBottomDeft = getDefaultValue(practicesControls.css("bottom"));

          practices.each(function () {
            var practiceAnimation = new TimelineMax();
            var practiceContent = $(this).find(".screen-layout-1__content-column > *");

            practicesTimelines.push(practiceAnimation);

            practiceAnimation
              .staggerFromTo(practiceContent, animDuration, {top: fromOffset, opacity: 0}, {top: 0, opacity: 1, ease:Power3.easeOut}, 0.15, "+=0.25");

            new ScrollMagic.Scene({
              triggerElement: ".js-screen-practices",
              offset: animOffset
            }).setTween(practiceAnimation).addTo(scrollController);
          });

          window.practicesSlider.on("translate.owl.carousel", function (evt) {
            practicesTimelines[evt.item.index].restart();
          });

          var callButtonAnimation = new TimelineMax();
          callButtonAnimation
            .fromTo(callButton, animDuration, {right: callButtonLeftDeft + fromOffset * -2, opacity: 0}, {right: callButtonLeftDeft, opacity: 1}, "+=1");

          new ScrollMagic.Scene({
            triggerElement: ".js-modal-practices",
            offset: animOffset
          }).setTween(callButtonAnimation).addTo(scrollController);

          var practicesControlsAnimation = new TimelineMax();
          practicesControlsAnimation
            .fromTo(practicesControls, animDuration, {bottom: practicesControlsBottomDeft + fromOffset * -1, opacity: 0}, {bottom: practicesControlsBottomDeft, opacity: 1}, "+=1");

          new ScrollMagic.Scene({
            triggerElement: ".js-screen-practices",
            offset: animOffset
          }).setTween(practicesControlsAnimation).addTo(scrollController);
        }

        var screenCases = $(".js-screen-cases");

        if (screenCases.length) {
          var casesTitle = screenCases.find(".screen-layout-3__title");
          var cases = screenCases.find(".archive__slide");
          var casesNav = screenCases.find(".screen-layout-3__nav > button");
          var casesLink = screenCases.find(".screen-layout-3__archive-link");

          var screenCasesAnimation = new TimelineMax();

          screenCasesAnimation
            .fromTo(casesTitle, animDuration, {top: fromOffset, opacity: 0}, {top: 0, opacity: 1}, "+=0.5")
            .staggerFromTo(cases, animDuration, {top: fromOffset, opacity: 0}, {top: 0, opacity: 1, ease:Power3.easeOut}, 0.15, "-=0.5")
            .fromTo(casesNav, animDuration, {top: fromOffset, opacity: 0}, {top: 0, opacity: 1}, "-=1")
            .fromTo(casesLink, animDuration, {top: fromOffset, opacity: 0}, {top: 0, opacity: 1}, "-=1");

          new ScrollMagic.Scene({
            triggerElement: ".js-screen-cases",
            offset: animOffset
          }).setTween(screenCasesAnimation).addTo(scrollController);

        }

        var screenNews = $(".js-screen-news");

        if (screenNews.length) {
          var newsTitle = screenNews.find(".screen-layout-3__title");
          var news = screenNews.find(".archive__slide");
          var newsNav = screenNews.find(".screen-layout-3__nav > button");
          var newsLink = screenNews.find(".screen-layout-3__archive-link");

          var screenCasesAnimation = new TimelineMax();

          screenCasesAnimation
            .fromTo(newsTitle, animDuration, {top: fromOffset, opacity: 0}, {top: 0, opacity: 1}, "+=0.5")
            .staggerFromTo(news, animDuration, {top: fromOffset, opacity: 0}, {top: 0, opacity: 1, ease:Power3.easeOut}, 0.15, "-=0.5")
            .fromTo(newsNav, animDuration, {top: fromOffset, opacity: 0}, {top: 0, opacity: 1}, "-=1")
            .fromTo(newsLink, animDuration, {top: fromOffset, opacity: 0}, {top: 0, opacity: 1}, "-=1");

          new ScrollMagic.Scene({
            triggerElement: ".js-screen-news",
            offset: animOffset
          }).setTween(screenCasesAnimation).addTo(scrollController);

        }

        var screenTeam = $(".js-screen-team");

        if (screenTeam.length) {
          var teamMembers = screenTeam.find(".js-screen-team-member");
          var teamTimelines = [];

          var teamNav = screenTeam.find(".js-team-nav");

          teamMembers.each(function () {
            var teamTringle = $(this).find(".screen-team__triangle-color");
            var teamTringleRightDeft = getDefaultValue(teamTringle.css("right"));

            var teamTitle = $(this).find(".screen-team__title");
            var teamContent = $(this).find(".screen-team__content");
            var teamPhoto = $(this).find(".screen-team__portrait");

            var teamName = $(this).find(".screen-team__name-wrapper");
            var teamNameLeftDeft = getDefaultValue(teamName.css("left"));

            var teamAnimation = new TimelineMax();

            teamTimelines.push(teamAnimation);

            teamAnimation
              .fromTo(teamTitle, animDuration, {top: fromOffset, opacity: 0}, {top: 0, opacity: 1}, "+=0.5")
              .fromTo(teamTringle, animDuration, {right: teamTringleRightDeft + fromOffset * -5, opacity: 0}, {right: teamTringleRightDeft, opacity: 1}, "-=0.5")
              .fromTo(teamPhoto, animDuration, {left: fromOffset * 2, opacity: 0}, {left: 0, opacity: 1}, "-=0.5")
              .fromTo(teamName, animDuration, {left: teamNameLeftDeft + fromOffset * 3, opacity: 0}, {left: teamNameLeftDeft, opacity: 1}, "-=0.5")
              .staggerFromTo(teamContent, animDuration, {top: fromOffset, opacity: 0}, {top: 0, opacity: 1, ease:Power3.easeOut}, 0.15, "-=1");

            new ScrollMagic.Scene({
              triggerElement: ".js-screen-team",
              offset: animOffset
            }).setTween(teamTimelines).addTo(scrollController);
          });

          window.teamSlider.on("translate.owl.carousel", function (evt) {
            teamTimelines[evt.item.index].restart();
          });

          var teamNavAnimation = new TimelineMax();
          teamNavAnimation
            .staggerFromTo(teamNav, animDuration, {bottom: fromOffset, opacity: 0}, {bottom: 0, opacity: 1, ease:Power3.easeOut}, 0.3, "+=1");

          new ScrollMagic.Scene({
            triggerElement: ".js-screen-team",
            offset: animOffset
          }).setTween(teamNavAnimation).addTo(scrollController);
        }

        var screenContacts = $(".js-screen-contacts");

        if (screenContacts.length) {
          var contactsTitle = screenContacts.find(".screen-contacts__title");
          var contactsContent = screenContacts.find(".screen-contacts__wrapper > *");
          var contactsButton = screenContacts.find(".screen-contacts__button");

          var contactsMap = screenContacts.find(".screen-contacts__map");
          var contactsMapRightDeft = getDefaultValue(contactsMap.css("right"));

          var contactsAnimation = new TimelineMax();

          contactsAnimation
            .fromTo(contactsTitle, animDuration, {top: fromOffset, opacity: 0}, {top: 0, opacity: 1}, "+=0.5")
            .staggerFromTo(contactsContent, animDuration, {top: fromOffset, opacity: 0}, {top: 0, opacity: 1, ease:Power3.easeOut}, 0.15, "-=0.5")
            .fromTo(contactsButton, animDuration, {left: fromOffset * -1, opacity: 0}, {left: 0, opacity: 1}, "-=0.5")
            .fromTo(contactsMap, animDuration, {right: contactsMapRightDeft + fromOffset * -3, opacity: 0}, {right: contactsMapRightDeft, opacity: 1}, "-=0.5");

          new ScrollMagic.Scene({
            triggerElement: ".js-screen-contacts",
            offset: animOffset
          }).setTween(contactsAnimation).addTo(scrollController);
        }
      }

      if ($("body").hasClass("site--inner")) {
        var headerElements = $(".inner-page__header .js-inner-animation > *");
        var innerPageTitleElements = $(".inner-page__title-wrapper > *");
        var innerPageBreadcrumbs = $(".inner-page__breadcrumbs");
        var contentElements = $(".inner-page__content .js-inner-animation > *");
        var footerElements = $(".site-footer.js-inner-animation > *");

        var innerPageHeaderAnimation = new TimelineMax();
        var innerPageContentAnimation = new TimelineMax();
        var innerPageFooterAnimation = new TimelineMax();

        console.log(innerPageBreadcrumbs);

        innerPageHeaderAnimation
          .staggerFromTo(headerElements, animDuration, {top: fromOffset, opacity: 0}, {top: 0, opacity: 1, ease:Power3.easeOut}, 0.15, "+=0.5")
          .staggerFromTo(innerPageTitleElements, animDuration, {top: fromOffset, opacity: 0}, {top: 0, opacity: 1, ease:Power3.easeOut}, 0.15, "-=0.5")
          .fromTo(innerPageBreadcrumbs, animDuration, {top: fromOffset, opacity: 0}, {top: 0, opacity: 1}, "-=0.5");

        innerPageContentAnimation
          .staggerFromTo(contentElements, animDuration, {top: fromOffset, opacity: 0}, {top: 0, opacity: 1, ease:Power3.easeOut}, 0.15, "+=1.5");

        innerPageFooterAnimation
          .staggerFromTo(footerElements, animDuration, {top: fromOffset, opacity: 0}, {top: 0, opacity: 1, ease:Power3.easeOut}, 0.15, "+=2");

          new ScrollMagic.Scene({
          triggerElement: ".inner-page__header",
          offset: animOffset
        }).setTween(innerPageHeaderAnimation).addTo(scrollController);

        new ScrollMagic.Scene({
          triggerElement: ".inner-page__content",
          offset: animOffset
        }).setTween(innerPageContentAnimation).addTo(scrollController);

        new ScrollMagic.Scene({
          triggerElement: ".inner-page__content",
          offset: animOffset
        }).setTween(innerPageFooterAnimation).addTo(scrollController);
      }
    });
  }
});
