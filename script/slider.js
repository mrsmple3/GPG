document.addEventListener("DOMContentLoaded", function () {
	function size(px) {
		const conversionFactor = 24;
		const index = window.innerWidth * 0.01 + window.innerHeight * 0.01;
		return (px / conversionFactor) * index;
	}

	let minWidthMobile = window.innerWidth < 1025 ? false : true;

	// Функция для обновления слайдера, если он существует
	function updateSlider(sliderInstance, selector) {
		if (document.querySelector(selector)) {
			sliderInstance.update();
		}
	}

	window.addEventListener("resize", function () {
		minWidthMobile = window.innerWidth < 1025 ? false : true;
		updateSlider(sliderCatalogItem, ".swiper.main-slider");
		updateSlider(swiperCertificates, ".swiper.certificates__slider");
		updateSlider(swiperRecommendation, ".recommendation__slider");
		updateSlider(swiperNews, ".news__card__slider");
	});

	const sliderCatalogItem = new Swiper(".swiper.catalog__item__slider", {
		pagination: {
			el: ".catalog__item__top .swiper-fraction",
			clickable: true,
		},
		navigation: {
			nextEl: ".catalog__item__top .next",
			prevEl: ".catalog__item__top .prev",
		},
		slidesPerView: 1,
		initialSlide: 0,
		speed: 1300,
		loop: true,
	});

	const swiperCertificates = new Swiper(".swiper.certificates__slider", {
		navigation: {
			nextEl: ".certificate__btn.next",
			prevEl: ".certificate__btn.prev",
		},
		slidesPerView: minWidthMobile ? 4 : 2,
		speed: 1300,
		spaceBetween: size(20),
		loop: true,
	});

	const swiperRecommendation = new Swiper(".recommendation__slider", {
		navigation: {
			nextEl: ".recommendation__btn.next",
			prevEl: ".recommendation__btn.prev",
		},
		slidesPerView: minWidthMobile ? 5 : 2,
		speed: 1300,
		spaceBetween: size(37),
		loop: true,
	});

	const swiperNews = new Swiper(".news__card__slider", {
		navigation: {
			nextEl: ".news__slider__btn.next",
			prevEl: ".news__slider__btn.prev",
		},
		slidesPerView: minWidthMobile ? 4 : 1,
		speed: 1300,
		spaceBetween: size(20),
		loop: true,
	});
});
