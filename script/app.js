(function ($) {
	let $minWidthMobile = window.innerWidth < 1050 ? false : true;

	window.addEventListener("resize", function () {
		$minWidthMobile = window.innerWidth < 1050 ? false : true;
	});
	$(document).ready(function () {
		function size(px) {
			const conversionFactor = 24;
			const index = window.innerWidth * 0.01 + window.innerHeight * 0.01;
			return (px / conversionFactor) * index;
		}

		const $headerLogo = $("header .logo__container");
		const $header = $("header");
		const $headerHeight = $header.outerHeight();

		gsap.registerPlugin(ScrollTrigger, Observer);

		let animationRunning = false;

		const mainBlockGsap = gsap.timeline(
			{ defaults: { delay: 0.1 } },
			{
				paused: true,
				onStart: () => {
					animationRunning = true;
				},
				onComplete: () => {
					mainBlockGsap.kill();
					animationRunning = false;
				},
			}
		);

		//!Header
		if ($minWidthMobile) {
			gsap.to("header", {
				background: "white",
				boxShadow: "0px 4px 50px rgba(0, 0, 0, 0.07)",
				scrollTrigger: {
					trigger: ".main-block",
					start: `${$headerHeight} top`,
					end: `${$headerHeight} top`,
					scrub: true,
					onEnter: () => {
						$(".navbar .nav__item").addClass("active");
						$headerLogo.addClass("active");
					},
					onEnterBack: () => {
						$(".navbar .nav__item").removeClass("active");
						$headerLogo.removeClass("active");
					},
				},
			});

			let $subTimeOut;

			$(".submenu").each(function () {
				const $submenu = $(this);
				const $submenuContainer = $(this).find(".submenu__container").first();
				const $title = $(this).find(".submenu__title").first();

				$title.hover(
					function () {
						// over
						clearTimeout($subTimeOut);
						$submenu.addClass("active");
					},
					function () {
						// out
						$submenu.addClass("active");
						$subTimeOut = setTimeout(() => {
							$submenu.removeClass("active");
						}, 300);
					}
				);

				$submenuContainer.hover(
					function () {
						// over
						clearTimeout($subTimeOut);
					},
					function () {
						// out
						$subTimeOut = setTimeout(() => {
							$submenu.removeClass("active");
						}, 300);
					}
				);
			});
		} else {
			$(".submenu").each(function () {
				const $submenu = $(this);
				const $submenuContainer = $(this).find(".submenu__container").first();
				const $title = $(this).find(".submenu__title").first();

				$title.on("click", function (event) {
					event.preventDefault();
					if ($submenu.hasClass("active")) {
						$submenu.removeClass("active");
						console.log($title, "remove");
					} else {
						$submenu.addClass("active");
						console.log($title, "add");
					}
				});
			});
		}

		//!Mobile Dropdown
		$(".menu-btn").click(function (event) {
			$(this).toggleClass("active");
			$(".mobile-menu").toggleClass("active");
			$("body").toggleClass("overflow-hidden");
		});
		function format_number(x) {
			return x.toString();
		}

		//!numerical
		if ($(".numbers .num").length > 0) {
			$(".numbers .num").each(function () {
				const $counter = $(this);
				const value = { val: parseInt($counter.text()) };

				// Function to start the animation
				function startAnimation() {
					gsap.from(value, {
						duration: 3,
						ease: "circ.out",
						val: 0,
						roundProps: "val",
						onUpdate: function () {
							$counter.text(format_number(value.val));
						},
					});
				}

				// Create an Intersection Observer instance
				var observer = new IntersectionObserver(
					function (entries) {
						if (entries[0].isIntersecting) {
							startAnimation();
							observer.disconnect(); // Stop observing after the animation starts
						}
					},
					{ threshold: 0.5 } // Adjust this value to determine when the animation should start
				);

				// Start observing the counter element
				observer.observe(this);
			});
		}

		if (!$minWidthMobile) {
			$(".dropdown__current").on("click", function () {
				const dropdown = $(this).closest(".filter__dropdown");
				if (dropdown.hasClass("active")) {
					dropdown.removeClass("active");
				} else {
					dropdown.addClass("active");
				}
			});
		}

		$(".dropdown__current").on("input", function () {
			var searchValue = $(this).val().toLowerCase();
			var $dropdownContainer = $(this).closest(".filter__dropdown").find(".filter__dropdown__container");

			$dropdownContainer.find(".filter__dropdown__item").each(function () {
				var itemValue = $(this).val().toLowerCase();
				if (itemValue.indexOf(searchValue) > -1) {
					$(this).show();
				} else {
					$(this).hide();
				}
			});
		});

		//!Product
		// Функция для изменения основного изображения и добавления класса active
		function updateCurrentImage($clickedItem) {
			// Убираем класс active у всех элементов
			$(".product__slider__item").removeClass("active");

			// Добавляем класс active к текущему элементу
			$clickedItem.addClass("active");

			// Получаем src изображения из кликнутого элемента
			var imgSrc = $clickedItem.find("img").attr("src");

			// Меняем src изображения в блоке .img-current
			$(".img-current img").attr("src", imgSrc);
		}

		// Устанавливаем первый элемент активным при загрузке
		var $firstItem = $(".product__slider__item").first();
		updateCurrentImage($firstItem);

		// Обработка клика по элементам с классом .product__slider__item
		$(".product__slider__item").on("click", function (e) {
			e.preventDefault();
			updateCurrentImage($(this));
		});

		//Filter
		function filterFunction() {
			const defaultItem = $(".filter__container .filter__item").first();
			$(".filter__item.current .filter__item__title").text(defaultItem.find(".filter__item__title").text());
			$(".filter__item.current .filter__item__logo").attr("src", defaultItem.find(".filter__item__logo").attr("src"));

			// Выполнение только при ширине экрана < 1050px
			if (!$minWidthMobile) {
				$(".filter__item.current").on("click", function (event) {
					event.preventDefault();
					$(this).toggleClass("active");
					$(".filter .filter__container").toggleClass("active");
				});

				$(".filter__container .filter__item").on("click", function (event) {
					event.preventDefault();

					// Смена выбранного текста и логотипа на кликнутый элемент
					const selectedTitle = $(this).find(".filter__item__title").text();
					const selectedLogo = $(this).find(".filter__item__logo").attr("src");

					$(".filter__item.current .filter__item__title").text(selectedTitle);
					$(".filter__item.current .filter__item__logo").attr("src", selectedLogo);

					// Закрыть меню и убрать активный класс
					$(".filter .filter__container").removeClass("active");
					$(".filter__item.current").removeClass("active");
				});
			}
		}
		filterFunction();

		$(".characteristic__title").on("click", function () {
			$(".characteristic__title").removeClass("active");

			$(this).addClass("active");

			var tabNumber = $(this).data("tab");

			$(".characteristic__content").hide();

			$('.characteristic__content[data-content="' + tabNumber + '"]').show();
		});

		// Активируем первый таб и его содержимое по умолчанию
		$('.characteristic__title[data-tab="1"]').addClass("active");
		$('.characteristic__content[data-content="1"]').show();

		//!number::after
		function numberAfter() {
			$(".numbers .num").each(function () {
				const afterValue = $(this).data("after");

				// Добавляем правило стилей через jQuery
				$(this).css("--after-content", `"${afterValue}"`);
			});
		}
		numberAfter();

		$(".distributer__item").on("click", function () {
			if ($(this).hasClass("active")) {
				$(".distributer__item").removeClass("active");
			} else {
				$(".distributer__item").removeClass("active");
				$(this).addClass("active");
			}
		});
	});
})(jQuery);
