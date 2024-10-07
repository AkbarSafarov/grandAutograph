const myObj = {
    queue: [],
    init: function () {
        let queue = this.queue;

        for (key in queue) {
            let f = queue[key];
            if (typeof f == 'function') {
                f();
            }
        }
    }
};
document.addEventListener('DOMContentLoaded', function () {
    myObj.init();
});

(function () {
    let IsMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
        site_scroll,
        lenis;
    myObj.queue = {
        // HEADER BEGIN
        headerFunctions: function () {
            const HEADER_WR = document.querySelector('.site-header');
            const BURGER_BLOCK = document.querySelector('.burger-block');
            const BURGER_BTN = document.querySelector('.site-header__burger-btn span');
            const TAXI_BTN = document.querySelector('.site-header__taxi-btn span');
            const VIDEO_BTN = document.querySelector('.main-first__video-btn');
            const ROUTE_BTN = document.querySelector('.main-first__right-title');
            const LANG_BTN = document.querySelector('.site-header__langs-btn');
            const isIPhone = /iPhone/i.test(navigator.userAgent);


            /*site_scroll = new LocomotiveScroll({
                el: document.querySelector('[data-scroll-container]'),
                smooth: true
            });*/
            
            if(isIPhone && IsMobile) {
                document.querySelector('.burger-block__inner').classList.add('iphone-padding');
            } 
            if (navigator.userAgent.indexOf('CriOS') >= 0 && isIPhone) {
                document.querySelector('.burger-block__inner').classList.add('iphone-padding-chrome');
            }

            lenis = new Lenis({
                // параметры настройки
                lerp: 0.08, // коэффициент сглаживания (0 - 1)
                smooth: true, // включить плавный скролл
                direction: 'vertical', // направление скролла (vertical or horizontal)
                smoothWheel: true, // плавный скролл колесом мыши
                smoothTouch: false, // плавный скролл при касании (mobile)
                infinite: false // бесконечный скролл
            })

            // запуск анимации скролла
            function raf(time) {
                lenis.raf(time)
                requestAnimationFrame(raf)
            }

            requestAnimationFrame(raf);

            if (IsMobile) {
                LANG_BTN.addEventListener('click', (e) => {
                    e.target.classList.toggle('active')
                    document.querySelector('.site-header__langs-list').classList.toggle('opened')
                })
                if (window.outerWidth <= 767) {
                    if(document.querySelector('.main-first__mobile-wr')){
                        document.querySelector('.main-first__mobile-wr').append(document.querySelector('.main-first__video-btn'))
                        document.querySelector('.main-first__mobile-wr').append(document.querySelector('.main-first__right-title'))
                        document.querySelector('.interiors-block__body').append(document.querySelector('.interiors-block__left-bigText'))
                    }
                }
            }

            if(document.querySelector('.first-letter')){
                document.querySelector('.first-letter').style.width = document.querySelector('.first-letter_in').getBoundingClientRect().width;
                document.querySelector('.v-letter').style.width = document.querySelector('.v-letter_in').getBoundingClientRect().width;
                document.querySelector('.v-letter').style.left = document.querySelector('.v-letter_in').getBoundingClientRect().width + document.querySelector('.second-letter_in').getBoundingClientRect().width + 10;
                document.querySelector('.last-word').style.width = document.querySelector('.main_svg_last_word').getBoundingClientRect().width;

                window.addEventListener('resize', () => {
                    document.querySelector('.first-letter').style.width = document.querySelector('.first-letter_in').getBoundingClientRect().width;
                    document.querySelector('.v-letter').style.width = document.querySelector('.v-letter_in').getBoundingClientRect().width;
                    document.querySelector('.v-letter').style.left = document.querySelector('.v-letter_in').getBoundingClientRect().width + document.querySelector('.second-letter_in').getBoundingClientRect().width + 10;
                    document.querySelector('.last-word').style.width = document.querySelector('.main_svg_last_word').getBoundingClientRect().width;
                });
            }

            document.addEventListener('scroll', () => {
                if (window.scrollY > 0) {
                    HEADER_WR.classList.add('fixed');
                    document.querySelector('.burger-block').classList.add('fixed');
                    document.querySelector('.site-header__langs-list').classList.remove('active');
                } else {
                    HEADER_WR.classList.remove('fixed')
                    document.querySelector('.burger-block').classList.remove('fixed');
                }
            });
            if (window.scrollY > 0) {
                HEADER_WR.classList.add('fixed')
                document.querySelector('.site-header__langs-list').classList.remove('active');
            } else {
                HEADER_WR.classList.remove('fixed')
            }

            if(document.querySelector('.main-first__image')){
                document.querySelector('.main-first__image').classList.add('active');
                document.querySelector('.main-first__title').classList.add('active');
            }

            BURGER_BTN.addEventListener('click', () => {
                BURGER_BTN.classList.toggle('active');
                BURGER_BLOCK.classList.toggle('opened');
                HEADER_WR.classList.toggle('header_active');

                document.documentElement.classList.toggle('overflow-hidden')
                if (BURGER_BTN.classList.contains('active')) {
                    lenis.stop();
                    
                    setTimeout(function(){
                        document.querySelector('.burger-block__image').classList.add('scale');
                    }, 500);
                } else {
                    lenis.start();
                    document.querySelector('.burger-block__image').classList.remove('scale');
                }
            });

            TAXI_BTN.addEventListener('click', (e) => {
                e.target.classList.toggle('active')
                document.querySelector('.popup-form').classList.toggle('opened')
                document.documentElement.classList.add('overflow-hidden')
                lenis.stop();
            });

            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('popup-form') || e.target.classList.contains('popup-form__closer')) {
                    document.querySelector('.popup-form').classList.remove('opened');
                    document.documentElement.classList.remove('overflow-hidden')
                    lenis.start();
                }
            })

            if (document.querySelector('.fixed-btns__popup-btn')) {
                document.querySelector('.fixed-btns__popup-btn span').addEventListener('click', (e) => {
                    e.target.classList.toggle('active')
                    document.querySelector('.fixed-btns__list').classList.toggle('active')
                });
            }

            document.addEventListener('click', (e) => {
                if (!e.target.classList.contains('fixed-btns__popup-btn-s') && !e.target.classList.contains('fixed-btns__btn-a')) {
                    document.querySelector('.fixed-btns__popup-btn-s').classList.remove('active');
                    document.querySelector('.fixed-btns__list').classList.remove('active')
                }
            })

            let phoneInputs = document.querySelectorAll('.phone_field');
            let maskOptions = {
                mask: '+{7} (000) 000-00-00'
            };
            phoneInputs.forEach(function (phoneInput) {
                IMask(phoneInput, maskOptions);
            });

            if(VIDEO_BTN){

                VIDEO_BTN.addEventListener('click', () => {
                    /*document.querySelector('.main-first__video').classList.add('active')
                    setTimeout(function () {
                        document.querySelector('.main-first__video video').play()
                    }, 500)*/
                });
            }

            let videoContainer = document.querySelector('.main-first__video');
            if(videoContainer){
                document.querySelector('.main-first__video video').addEventListener('ended', function () {
                    videoContainer.classList.remove('active');
                });
            }

            if(ROUTE_BTN){
                ROUTE_BTN.addEventListener('click', () => {
                    document.querySelector('.popup-map').classList.add('opened')
                    document.documentElement.classList.add('overflow-hidden')
                    lenis.stop();
                });
            }

            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('popup-map') || e.target.classList.contains('popup-map__closer')) {
                    document.querySelector('.popup-map').classList.remove('opened');
                    document.documentElement.classList.remove('overflow-hidden')
                    lenis.start();
                }
            })

            if (!IsMobile) {
                document.querySelectorAll('.burger-block__menu ul li a').forEach((item) => {
                    item.addEventListener('mouseenter', () => {
                        if(!item.classList.contains('active')) {
                            //document.querySelector('.burger-block__image').classList.add('v_hidden');
                            //document.querySelector('.burger-block__image').classList.remove('scale')
                            document.querySelector('.burger-block__image').remove();
                            document.querySelectorAll('.burger-block__menu ul li a').forEach((element) => element.classList.remove('active'));
                            if (item.dataset.img) {
                                item.classList.add('active')
                                    const burgerBlock = document.createElement('div');
                                    burgerBlock.classList.add('burger-block__image');
                                    const burgerImage = document.createElement('img')
                                    burgerImage.src = item.dataset.img;
                                    burgerImage.alt = 'burger_image';
                                    burgerBlock.appendChild(burgerImage);
                                    document.querySelector('.burger-block__top').appendChild(burgerBlock);
                                setTimeout(() => {
                                    //document.querySelector('.burger-block__image img').setAttribute('src', item.dataset.img)
                                    //document.querySelector('.burger-block__image').classList.remove('v_hidden')
                                }, 300)
                                setTimeout(() => {
                                    document.querySelector('.burger-block__image').classList.add('scale')
                                }, 300)
                            } else {
                                //document.querySelector('.burger-block__image').classList.add('v_hidden');
                            }
                        }
                    })
                })
            }

            let linkToggle = document.querySelectorAll('.burger-block__menu ul li.hasChild > a');

            for (i = 0; i < linkToggle.length; i++) {

                linkToggle[i].addEventListener('click', function (event) {
                    event.preventDefault();
                    event.target.classList.toggle('active');
                    if(event.target.querySelector('.arrow')) {
                        event.target.querySelector('.arrow').classList.toggle('active');
                    }
                    console.log(event.target.querySelector('.arrow'))
                    event.target.closest('li').classList.toggle('active');
                    let container = event.target.nextElementSibling;

                    if (!container.classList.contains('active')) {

                        container.classList.add('active');
                        container.style.height = 'auto';

                        let height = container.clientHeight + 'px';

                        container.style.height = '0px';

                        setTimeout(function () {
                            container.style.height = height;
                        }, 0);

                    } else {

                        container.style.height = '0px';

                        container.addEventListener('transitionend', function () {
                            container.classList.remove('active');
                        }, {
                            once: true
                        });

                    }

                });

            }
        },
        // HEADER END

        // INTERIORS BLOCK BEGIN
        interiorsBlockFunctions: function () {
            if(document.querySelector('.interiors-block__left-slider')) {
                document.querySelector('.interiors-block__left-slider').style.height = document.querySelector('.interiors-block__left-slider .swiper-wrapper').height;


                const INTER_LEFT = new Swiper('.interiors-block__left-slider .swiper', {
                    slidesPerView: 1,
                    loop: false,
                    effect: 'slide',
                    speed: 1000,
                    spaceBetween: 0,
                    navigation: {
                        nextEl: '.interiors-block__left-slider .swiper-button-next',
                        prevEl: '.interiors-block__left-slider .swiper-button-prev',
                    }
                });
                lightGallery(document.querySelector('.interiors-block__left-slider'), {
                    download: false,
                    counter: true,
                    selector: 'a.slider-item__image'
                });

                document.querySelector('.interiors-block__left-slider').addEventListener('onAfterOpen', function () {
                    lenis.stop(); // Остановить Lenis при открытии галереи
                });
                document.querySelector('.interiors-block__left-slider').addEventListener('onBeforeClose', function () {
                    lenis.start(); // Возобновить Lenis при открытии галереи
                });

                const INTER_RIGHT = new Swiper('.interiors-block__right-slider .swiper', {
                    slidesPerView: 1,
                    loop: false,
                    effect: 'slide',
                    speed: 1000,
                    spaceBetween: 0,
                    navigation: {
                        nextEl: '.interiors-block__right-slider .swiper-button-next',
                        prevEl: '.interiors-block__right-slider .swiper-button-prev',
                    }
                });
            }
        },
        // INTERIORS BLOCK END

        // ANNOUNCES BLOCK BEGIN
        announcesBlockFunctions: function () {
            const slider = document.querySelector('.announces-block__slider .swiper');

            if(!slider) return;

            const ANNOUNCES_SLIDER = new Swiper('.announces-block__slider .swiper', {
                slidesPerView: 2,
                loop: true,
                effect: 'slide',
                speed: 1000,
                spaceBetween: 10,
                navigation: {
                    nextEl: '.announces-block .swiper-button-next',
                    prevEl: '.announces-block .swiper-button-prev',
                },
                breakpoints: {
                    550: {
                        spaceBetween: 10
                    },
                    1024: {
                        spaceBetween: 20
                    },
                    1025: {
                        spaceBetween: 0
                    }
                }
            });

            function setEqualHeight() {
                var items = document.querySelectorAll('.announces-block__slider-item .item-title');
                items.forEach(function (item) {
                    item.style.height = 'auto';
                });
                var maxHeight = 0;
                items.forEach(function (item) {
                    if (item.offsetHeight > maxHeight) {
                        maxHeight = item.offsetHeight;
                    }
                });
                items.forEach(function (item) {
                    item.style.height = maxHeight + 'px';
                });
            }

            window.addEventListener('load', setEqualHeight);
            window.addEventListener('resize', setEqualHeight);
        },
        // ANNOUNCES BLOCK END

        // RESTAURANTS BLOCK BEGIN
        restaurantsBlockFunctions: function () {
            const RESTAURANT_SLIDER = new Swiper('.restaurants-block__bottom-slider .swiper', {
                slidesPerView: 1,
                loop: false,
                effect: 'slide',
                speed: 1000,
                spaceBetween: 0,
                navigation: {
                    nextEl: '.restaurants-block__slider-nav .swiper-button-next',
                    prevEl: '.restaurants-block__slider-nav .swiper-button-prev',
                }
            });
        },
        // RESTAURANTS BLOCK END

        // CONGRESS BLOCK BEGIN
        congressBlockFunctions: function () {
            if(!document.querySelector('.congress-block__gallery')) return;

            lightGallery(document.querySelector('.congress-block__gallery'), {
                download: false,
                counter: true,
                selector: 'a'
            });

            document.querySelector('.congress-block__gallery').addEventListener('onAfterOpen', function () {
                lenis.stop(); // Остановить Lenis при открытии галереи
            });
            document.querySelector('.congress-block__gallery').addEventListener('onBeforeClose', function () {
                lenis.start(); // Возобновить Lenis при открытии галереи
            });
        },
        // CONGRESS BLOCK END

        // BLOCK ANIMATIONS BEGIN
        blockAnimations: function () {
            gsap.registerPlugin(ScrollTrigger/*, SplitText*/);

            const imageItems = document.querySelectorAll('.image-item-wr, .restaurants-block__bottom-slider, .interiors-block__left-slider, .interiors-block__right-slider, .announces-block__slider, .fitnes_block_wr .left_slider,.fitnes_block_wr .right_slider,.chef_block_wr .block-padding .left,.menu_food_block,.rest_slider_wr,.form_bottom_rest, .announces_list_wrap .announces-block__slider-item');

            const observerOptions = {
                root: null, // viewport
                rootMargin: '80px',
                threshold: 0.5 // процент видимости элемента (0.1 = 10%)
            };

            const observerCallback = (entries, observer) => {
                const visibleEntries = entries.filter(entry => entry.isIntersecting);

                visibleEntries.forEach((entry, index) => {
                    // Убираем наблюдение, чтобы избежать повторных вызовов
                    observer.unobserve(entry.target);

                    // Используем setTimeout для добавления класса с задержкой
                    setTimeout(() => {
                        entry.target.classList.add('showed');
                    }, index * 1000); // задержка 200мс между добавлением классов
                });
            };

            const observer = new IntersectionObserver(observerCallback, observerOptions);

            imageItems.forEach(item => {
                observer.observe(item);
            });

            // Выбираем все элементы с классом 'citys-pearl__item'
            const items = document.querySelectorAll('.citys-pearl__item');

            // Настраиваем анимацию для каждого элемента
            items.forEach((item, index) => {
                gsap.fromTo(item,
                    {
                        opacity: 0,
                        y: 50
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scrollTrigger: {
                            trigger: item,
                            //scroller: "[data-scroll-container]",
                            start: "top 80%", // Настраиваем когда запускать анимацию
                            toggleActions: "play", // Настраиваем когда запускать и останавливать анимацию
                            stagger: 0.2 // Задержка между анимацией элементов
                        },
                        duration: 1, // Длительность анимации
                        delay: (index % 4) * 0.25 // Задержка между элементами в ряду по 4
                    }
                );
            });

            const items2 = document.querySelectorAll('.site-footer__menu nav > ul > li');

            // Настраиваем анимацию для каждого элемента
            items2.forEach((item, index) => {
                gsap.fromTo(item,
                    {
                        opacity: 0,
                        y: 50
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scrollTrigger: {
                            trigger: item,
                            //scroller: "[data-scroll-container]",
                            start: "top 110%", // Настраиваем когда запускать анимацию
                            toggleActions: "play", // Настраиваем когда запускать и останавливать анимацию
                            stagger: 0.1 // Задержка между анимацией элементов
                        },
                        duration: 0.5, // Длительность анимации
                        delay: (index % 5) * 0.25 // Задержка между элементами в ряду по 5
                    }
                );
            });


            const blocks = document.querySelectorAll(".congress-block__text p, .map-block__text, .restaurants-block__bottom-slider, .restaurants-block__bottom-right .text p, .restaurants-block__bottom-right .title, .restaurants-block__middle-body > div, .restaurants-block__middle-image, .restaurants-block__body .image-item-wr, .restaurants-block__top-right > .title, .announces-block__slider-item .item-header, .announces-block__slider-item .item-title, .announces-block__slider-item .item-date, .announces-block__slider-item .item-body, .citys-pearl__text, .interiors-block__left-text, .interiors-block__left-bigText, .interiors-block__right-text, .chef_block_wr .block-padding .right");
            blocks.forEach((block) => {
                gsap.set(block, { opacity: 0, y: 100 });

                ScrollTrigger.create({
                    trigger: block,
                    //scroller: "[data-scroll-container]",
                    start: "top 99%",
                    stagger: 0.7, // Задержка между анимацией элементов
                    toggleActions: "play reverse play reverse",
                    onEnter: () => {
                        gsap.to(block, { opacity: 1, y: 0, duration: 2, ease: "power2.out" });
                    }
                });
            });

            document.querySelectorAll('.congress-block__gallery-item').forEach((blockItem, index) => {
                let content = blockItem;
                let contentHeight = content.offsetHeight;

                gsap.fromTo(blockItem,
                    {
                        height: 0
                    },
                    {
                        height: contentHeight,
                        scrollTrigger: {
                            trigger: blockItem,
                            //scroller: "[data-scroll-container]",
                            start: "top 50%",
                            end: "bottom top",
                            scrub: false,
                            toggleActions: 'play'
                        },
                        duration: 1,
                        ease: "power2.out",
                        delay: index * 0.2,
                        //onComplete: () => site_scroll.update()
                    }
                );

                gsap.to(content, {
                    opacity: 1,
                    scrollTrigger: {
                        //scroller: "[data-scroll-container]",
                        trigger: blockItem,
                        start: "top 50%",
                        end: "bottom top",
                        scrub: false,
                        toggleActions: 'play'
                    },
                    duration: 1,
                    ease: "power2.out",
                    delay: index * 0.2,
                    //onComplete: () => site_scroll.update()
                });
            });

            let wordAnimate = document.querySelectorAll(".block-title"),
                text,
                wordSpan,
                letterSpan;

            wordAnimate.forEach((item) => {
                text = item.textContent;
                item.innerHTML = "";

                // Разделите текст на слова и оберните каждое слово в <span> с классом "word"
                text.split(" ").forEach(word => {
                    wordSpan = document.createElement("span");
                    wordSpan.classList.add("word");

                    // Разделите каждое слово на буквы и оберните каждую букву в <span>
                    word.split("").forEach(letter => {
                        letterSpan = document.createElement("span");
                        letterSpan.textContent = letter;
                        wordSpan.appendChild(letterSpan);
                    });

                    // Добавьте слово в контейнер
                    item.appendChild(wordSpan);
                    // Добавьте пробел между словами
                    item.appendChild(document.createTextNode(" "));
                });

                // Получите все span элементы с классом word
                const letterSpans = item.querySelectorAll(".word span");

                // Запустите анимацию
                gsap.fromTo(letterSpans, {
                    opacity: 0,
                    y: 20, // Начальная позиция смещена вниз
                }, {
                    duration: 1,
                    opacity: 1,
                    y: 0, // Конечная позиция
                    stagger: 0.05, // Задержка между анимациями букв
                    ease: "power1.out",
                    scrollTrigger: {
                        //scroller: "[data-scroll-container]",
                        trigger: item,
                        start: 'top 80%',
                        end: 'bottom 20%',
                        toggleActions: 'play',
                    }
                });
            })

            let interiors_images = document.querySelectorAll('.interiors-block img');

            interiors_images.forEach(image => {
                gsap.fromTo(image,
                    { y: '-10%' },
                    {
                        y: '10%',
                        scrollTrigger: {
                            //scroller: "[data-scroll-container]",
                            trigger: '.interiors-block',
                            start: 'top 40%',
                            end: 'bottom top',
                            scrub: true,
                            stagger: 0.5,
                            duration: 1
                        }
                    }
                );
            });

            let restautants_images = document.querySelectorAll('.image-item-wr img');

            restautants_images.forEach(image => {
                gsap.fromTo(image,
                    { y: '-10%' },
                    {
                        y: '10%',
                        scrollTrigger: {
                            //scroller: "[data-scroll-container]",
                            trigger: image.closest('.image-item-wr'),
                            start: 'top 40%',
                            end: 'bottom top',
                            scrub: true,
                            stagger: 0.5,
                            duration: 1
                        }
                    }
                );
            });

            let restautants_images_new = document.querySelectorAll('.gal_res_block .block-padding .item .image img');

            restautants_images_new.forEach(image => {
                gsap.fromTo(image,
                    { y: '-10%' },
                    {
                        y: '10%',
                        scrollTrigger: {
                            //scroller: "[data-scroll-container]",
                            trigger: image.closest('.gal_res_block'),
                            start: 'top 40%',
                            end: 'bottom top',
                            scrub: true,
                            stagger: 0.5,
                            duration: 1
                        }
                    }
                );
            });

            let restautants_slider_images = document.querySelectorAll('.restaurants-block__bottom-slider img');

            restautants_slider_images.forEach(image => {
                gsap.fromTo(image,
                    { y: '-10%' },
                    {
                        y: '10%',
                        scrollTrigger: {
                            //scroller: "[data-scroll-container]",
                            trigger: '.restaurants-block__bottom-slider',
                            start: 'top 40%',
                            end: 'bottom top',
                            scrub: true,
                            stagger: 0.5,
                            duration: 1
                        }
                    }
                );
            });

            gsap.fromTo(document.querySelector('.citys-pearl .small-pearl img'),
                { y: '30%' },
                {
                    y: '-30%',
                    scrollTrigger: {
                        //scroller: "[data-scroll-container]",
                        trigger: '.citys-pearl',
                        start: 'top 100%',
                        end: 'bottom top',
                        scrub: true,
                        stagger: 0.5,
                        duration: 1
                    }
                }
            );

            gsap.fromTo(document.querySelector('.citys-pearl__top-image .medium-pearl'),
                { y: '40%' },
                {
                    y: '-40%',
                    scrollTrigger: {
                        //scroller: "[data-scroll-container]",
                        trigger: '.citys-pearl',
                        start: 'top 100%',
                        end: 'bottom top',
                        scrub: true,
                        stagger: 1,
                        duration: 2
                    }
                }
            );

            gsap.fromTo(document.querySelector('.citys-pearl .big-pearl img'),
                { y: '25%' },
                {
                    y: '-25%',
                    scrollTrigger: {
                        //scroller: "[data-scroll-container]",
                        trigger: '.citys-pearl',
                        start: 'bottom 80%',
                        end: 'bottom top',
                        scrub: true,
                        stagger: 2,
                        duration: 20
                    }
                }
            );

            gsap.fromTo(document.querySelector('.congress-block .congress-block__top-pearl'),
                { y: '40%' },
                {
                    y: '-40%',
                    scrollTrigger: {
                        //scroller: "[data-scroll-container]",
                        trigger: '.congress-block',
                        start: 'top 80%',
                        end: 'bottom top',
                        scrub: true,
                        stagger: 1,
                        duration: 5
                    }
                }
            );

            gsap.fromTo(document.querySelector('.congress-block__bottom-pearls .big'),
                { y: '20%' },
                {
                    y: '-20%',
                    scrollTrigger: {
                        //scroller: "[data-scroll-container]",
                        trigger: '.congress-block',
                        start: 'bottom 70%',
                        end: 'bottom top',
                        scrub: true,
                        stagger: 1,
                        duration: 5
                    }
                }
            );
            gsap.fromTo(document.querySelector('.congress-block__bottom-pearls .medium'),
                { y: '20%' },
                {
                    y: '-20%',
                    scrollTrigger: {
                        //scroller: "[data-scroll-container]",
                        trigger: '.congress-block__body',
                        start: 'bottom 70%',
                        end: 'bottom top',
                        scrub: true,
                        stagger: 11,
                        ease: "power2.inOut",
                        duration: 115
                    }
                }
            );

            gsap.fromTo(document.querySelector('.congress-block__bottom-pearls .small'),
                { y: '55%' },
                {
                    y: '-55%',
                    scrollTrigger: {
                        //scroller: "[data-scroll-container]",
                        trigger: '.congress-block__body',
                        start: 'bottom 70%',
                        end: 'bottom top',
                        scrub: true,
                        stagger: 11,
                        ease: "power2.inOut",
                        duration: 115
                    }
                }
            );

            gsap.fromTo(document.querySelector('.restaurants-block__pearl'),
                { y: '30%' },
                {
                    y: '-30%',
                    scrollTrigger: {
                        //scroller: "[data-scroll-container]",
                        trigger: '.restaurants-block',
                        start: 'top 40%',
                        end: 'bottom top',
                        scrub: true,
                        stagger: 1,
                        duration: 2
                    }
                }
            );

            gsap.fromTo(document.querySelector('.map-block__pearl'),
                { y: '30%' },
                {
                    y: '-30%',
                    scrollTrigger: {
                        //scroller: "[data-scroll-container]",
                        trigger: '.map-block',
                        start: 'top 40%',
                        end: 'bottom top',
                        scrub: true,
                        ease: "power2.inOut",
                        stagger: 2,
                        duration: 5
                    }
                }
            );

            gsap.fromTo(document.querySelector('.interiors-block__pearl img'),
                { y: '100%' },
                {
                    y: '-100%',
                    scrollTrigger: {
                        //scroller: "[data-scroll-container]",
                        trigger: '.interiors-block__left',
                        start: 'top 100%',
                        end: 'bottom top',
                        scrub: true,
                        stagger: 1,
                        duration: 2
                    }
                }
            );

            gsap.fromTo(document.querySelector('.restaurants-block__mobile-pearls .small'),
                { y: '100%' },
                {
                    y: '-100%',
                    scrollTrigger: {
                        //scroller: "[data-scroll-container]",
                        trigger: '.restaurants-block__middle',
                        start: 'top 100%',
                        end: 'bottom top',
                        scrub: true,
                        stagger: 1,
                        duration: 20
                    }
                }
            );

            gsap.fromTo(document.querySelector('.restaurants-block__mobile-pearls .big'),
                { y: '30%' },
                {
                    y: '-30%',
                    scrollTrigger: {
                        //scroller: "[data-scroll-container]",
                        trigger: '.restaurants-block__middle',
                        start: 'top 100%',
                        end: 'bottom top',
                        scrub: true,
                        stagger: 1,
                        duration: 20
                    }
                }
            );

            gsap.fromTo(document.querySelector('.events-pearl__top-image .small-pearl_top'),
                { y: '30%' },
                {
                    y: '-30%',
                    scrollTrigger: {
                        trigger: '.events_items',
                        start: 'top 100%',
                        end: 'bottom top',
                        scrub: true,
                        stagger: 0.5,
                        duration: 1
                    }
                }
            );

            gsap.fromTo(document.querySelector('.events-pearl__top-image .small-pearl_left'),
                { y: '40%' },
                {
                    y: '-40%',
                    scrollTrigger: {
                        trigger: '.events_items',
                        start: 'top 100%',
                        end: 'bottom top',
                        scrub: true,
                        stagger: 1,
                        duration: 2
                    }
                }
            );

            gsap.fromTo(document.querySelector('.events-pearl__top-image .small-pearl_right'),
                { y: '40%' },
                {
                    y: '-40%',
                    scrollTrigger: {
                        trigger: '.events_items',
                        start: 'top 100%',
                        end: 'bottom top',
                        scrub: true,
                        stagger: 1,
                        duration: 2
                    }
                }
            );

            gsap.fromTo(document.querySelector('.events-pearl__top-image .small-pearl_bottom'),
                { y: '60%' },
                {
                    y: '-60%',
                    scrollTrigger: {
                        trigger: '.events_items',
                        start: 'top 100%',
                        end: 'bottom top',
                        scrub: true,
                        stagger: 0.5,
                        duration: 1
                    }
                }
            );

            let congress_images = document.querySelectorAll('.congress-block__gallery-item img');

            congress_images.forEach(image => {
                gsap.fromTo(image,
                    { y: '-10%' },
                    {
                        y: '10%',
                        scrollTrigger: {
                            //scroller: "[data-scroll-container]",
                            trigger: '.congress-block',
                            start: 'top 40%',
                            end: 'bottom top',
                            scrub: true
                        }
                    }
                );
            });
            //site_scroll.update()
        },
        // BLOCK ANIMATIONS END

        // FOOTER SCRIPTS BEGIN
        footerScripts: function () {
            /*document.querySelectorAll('.site-footer__menu ul li.hasChild > a .arrow').forEach((item) => {
                item.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.target.classList.toggle('active')
                    e.target.closest('li').querySelector('ul').classList.toggle('opened')
                });
            })*/

            let linkToggle = document.querySelectorAll('.site-footer__menu ul li.hasChild > a');

            for (i = 0; i < linkToggle.length; i++) {

                linkToggle[i].addEventListener('click', function (event) {
                    event.preventDefault();
                    event.target.classList.toggle('active');
                    if(event.target.querySelector('.arrow')) {
                        event.target.querySelector('.arrow').classList.toggle('active');
                    }
                    console.log(event.target.querySelector('.arrow'))
                    event.target.closest('li').classList.toggle('active');
                    let container = event.target.nextElementSibling;

                    if (!container.classList.contains('active')) {

                        container.classList.add('active');
                        container.style.height = 'auto';

                        let height = container.clientHeight + 'px';

                        container.style.height = '0px';

                        setTimeout(function () {
                            container.style.height = height;
                        }, 0);

                    } else {

                        container.style.height = '0px';

                        container.addEventListener('transitionend', function () {
                            container.classList.remove('active');
                        }, {
                            once: true
                        });

                    }

                });

            }
        },
        // FOOTER SCRIPTS END
        historyBlock: function(){
            const HISTORY_BTN = document.querySelector('.btn_history');

            if(!HISTORY_BTN) return;

            HISTORY_BTN.addEventListener('click', (e) => {
                e.preventDefault();
                e.target.classList.toggle('active')
                document.querySelector('.history_popup').classList.toggle('opened')
                document.documentElement.classList.add('overflow-hidden')
                //lenis.stop();
            });

            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('history_popup') || e.target.classList.contains('history_popup__closer')) {
                    document.querySelector('.history_popup').classList.remove('opened');
                    document.documentElement.classList.remove('overflow-hidden')
                    //lenis.start();
                }
            })
        },
        accordion: function(){

            const accor = document.querySelectorAll('.accor_block');

            if(!accor) return;            

            function slideToggle(element, duration = 600) {
                let isCollapsed = window.getComputedStyle(element).display === 'none';

                if (isCollapsed) {
                    element.style.display = 'block';
                    let height = element.scrollHeight;
                    element.style.height = 0;
                    element.style.overflow = 'hidden';
                    element.style.transition = `height ${duration}ms ease`;
                    
                    requestAnimationFrame(() => {
                        element.style.height = height + 'px';
                    });

                    setTimeout(() => {
                        element.style.height = '';
                        element.style.overflow = '';
                        element.style.transition = '';
                    }, duration);
                } else {
                    element.style.height = element.scrollHeight + 'px';
                    element.style.overflow = 'hidden';
                    element.style.transition = `height ${duration}ms ease`;

                    requestAnimationFrame(() => {
                        element.style.height = 0;
                    });

                    setTimeout(() => {
                        element.style.display = 'none';
                        element.style.height = '';
                        element.style.overflow = '';
                        element.style.transition = '';
                    }, duration);
                }
            }

            accor.forEach((item) => {
                const btn = item.querySelector('.accor_name');
                const body = item.querySelector('.accor_body');

                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    item.classList.toggle('opened');
                    slideToggle(body);
                });
            })   
        },
        animationBlock: function(){
            const blocks = document.querySelectorAll('.animation_block');

            if(!blocks.length) return;

            blocks.forEach((item, index) => {
                gsap.fromTo(item,
                    {
                        opacity: 0,
                        y: 50
                    },
                    {
                        opacity: 1,
                        y: 0,
                        scrollTrigger: {
                            trigger: item,
                            start: "top 110%", 
                            toggleActions: "play", 
                            stagger: 0.1 
                        },
                        duration: 0.5,
                        delay: (index % 5) * 0.25 
                    }
                );
            });
        },
        tabsBlock: function(){
            const tabBlocks = document.querySelectorAll('.tab_block');
            const tabActive = 'active';
            
            if(!tabBlocks.length) return;

            tabBlocks.forEach(function(tabBlock) {
                const tabTitles = tabBlock.querySelectorAll('.tab_list .tab_title');
                const tabBodies = tabBlock.querySelectorAll('.tab_main .tab_body');

                tabTitles.forEach(function(tabTitle, index) {
                    tabTitle.addEventListener('click', function() {
                        tabTitles.forEach(function(t) { t.classList.remove(tabActive); });
                        tabTitle.classList.add(tabActive);

                        tabBodies.forEach(function(b) { b.classList.remove(tabActive); });
                        tabBodies[index].classList.add(tabActive);
                    });
                });
            });
        },
        pressSlider: function(){

            const tabsBody = document.querySelectorAll('.tab_body');

            if(!tabsBody.length) return;

            tabsBody.forEach((slider) => {
                const sliderBlock = slider.querySelector('.swiper');
                const prevBtn = slider.querySelector('.swiper-button-prev');
                const nextBtn = slider.querySelector('.swiper-button-next');

                const tabSlider = new Swiper(`.${sliderBlock.className}`, {
                    slidesPerView: 3,
                    loop: true,
                    effect: 'slide',
                    speed: 1000,
                    spaceBetween: 20,
                    navigation: {
                        nextEl: `.${nextBtn.className}`,
                        prevEl: `.${prevBtn.className}`,
                    },
                    breakpoints: {
                        0: {
                            slidesPerView: 2,
                            spaceBetween: 10
                        },
                        1024: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
                        1441: {
                            slidesPerView: 3,
                            spaceBetween: 20
                        }
                    }
                });
            })

            function setEqualHeight() {
                var items = document.querySelectorAll('.announces-block__slider-item .item-title');
                items.forEach(function (item) {
                    item.style.height = 'auto';
                });
                var maxHeight = 0;
                items.forEach(function (item) {
                    if (item.offsetHeight > maxHeight) {
                        maxHeight = item.offsetHeight;
                    }
                });
                items.forEach(function (item) {
                    item.style.height = maxHeight + 'px';
                });
            }

            window.addEventListener('load', setEqualHeight);
            window.addEventListener('resize', setEqualHeight);
        },
        numberSlider: function(){
            const numbers = document.querySelectorAll('.number_items .item');

            if(!numbers.length) return;

            numbers.forEach((slider) => {
                const sliderBlock = slider.querySelector('.swiper_slider');
                const pagination = slider.querySelector('.pagination_block');

                const numberSlider = new Swiper(`.${sliderBlock.className}`, {
                    slidesPerView: 1,
                    loop: true,
                    effect: 'slide',
                    speed: 1000,
                    spaceBetween: 0,
                    pagination: {
                        el: `.${pagination.className}`,
                        clickable: true,
                    }
                });
            })
        },
        cardSlider: function(){
            const cardImage = document.querySelector('.swiper_card_slider');

            if(!cardImage) return;

            const sliderBlock = cardImage.querySelector('.swiper');
            const pagination = cardImage.querySelector('.pagination_block');

            const slider = new Swiper('.swiper_card_slider .swiper', {
                slidesPerView: 1,
                loop: true,
                effect: 'slide',
                speed: 1000,
                spaceBetween: 0,
                pagination: {
                    el: `.${pagination.className}`,
                    clickable: true,
                }
            });
        },
        reviewSlider: function(){
            const reviewWrapper = document.querySelector('.review_slider_wrapper');

            if(!reviewWrapper) return;   

            const slider = new Swiper('.swiper_review_slider', {
                slidesPerView: 3,
                loop: true,
                spaceBetween: 20,
                navigation: {
                    nextEl: '.review_slider_wrapper .swiper-button-next',
                    prevEl: '.review_slider_wrapper .swiper-button-prev',
                },
                breakpoints: {
                    0: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    1441: {
                        slidesPerView: 3,
                        spaceBetween: 20
                    }
                }
            });
        },
        roomsSlider: function(){
            const roomWrapper = document.querySelector('.rooms_slider_wrapper');

            if(!roomWrapper) return; 

            const slider = new Swiper('.swiper_slider_room', {
                slidesPerView: 4,
                loop: true,
                spaceBetween: 20,
                navigation: {
                    nextEl: '.rooms_slider_wrapper .swiper-button-next',
                    prevEl: '.rooms_slider_wrapper .swiper-button-prev',
                },
                breakpoints: {
                    0: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },
                    1024: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    },
                    1441: {
                        slidesPerView: 4,
                        spaceBetween: 20
                    }
                }
            });
        },
        pressModal: function(){
            const pressBtn = document.querySelectorAll('.announces-block__slider-item');

            if(!pressBtn) return;

            pressBtn.forEach((item) => {
                const btn = item.querySelector('.item-btn a');
                
                btn.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.target.classList.toggle('active')
                    document.querySelector('.press_popup').classList.toggle('opened')
                    document.documentElement.classList.add('overflow-hidden')
                    //lenis.stop();
                });
            })

            document.addEventListener('click', (e) => {
                if (e.target.classList.contains('press_popup') || e.target.classList.contains('press_popup__closer')) {
                    document.querySelector('.press_popup').classList.remove('opened');
                    document.documentElement.classList.remove('overflow-hidden')
                    //lenis.start();
                }
            })
        },
        afishaSlider: function(){

            const afishaBody = document.querySelectorAll('.afisha_center_page');

            if(!afishaBody.length) return;

            afishaBody.forEach((slider) => {
                const sliderBlock = slider.querySelector('.swiper');
                const prevBtn = slider.querySelector('.swiper-button-prev');
                const nextBtn = slider.querySelector('.swiper-button-next');

                const tabSlider = new Swiper('.afisha_slider_bottom', {
                    slidesPerView: 3,
                    loop: true,
                    effect: 'slide',
                    speed: 1000,
                    spaceBetween: 20,
                    navigation: {
                        nextEl: `.${nextBtn.className}`,
                        prevEl: `.${prevBtn.className}`,
                    },
                    breakpoints: {
                        0: {
                            slidesPerView: 2,
                            spaceBetween: 10
                        },
                        1024: {
                            slidesPerView: 2,
                            spaceBetween: 20
                        },
                        1441: {
                            slidesPerView: 3,
                            spaceBetween: 20
                        }
                    }
                });
            })

            function setEqualHeight() {
                var items = document.querySelectorAll('.announces-block__slider-item .item-title');
                items.forEach(function (item) {
                    item.style.height = 'auto';
                });
                var maxHeight = 0;
                items.forEach(function (item) {
                    if (item.offsetHeight > maxHeight) {
                        maxHeight = item.offsetHeight;
                    }
                });
                items.forEach(function (item) {
                    item.style.height = maxHeight + 'px';
                });
            }

            window.addEventListener('load', setEqualHeight);
            window.addEventListener('resize', setEqualHeight);
        },
        afishaCalendar: function(){
            const year = new Date().getFullYear();
            const currentMonth = new Date().getMonth();
            const days = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
            const monthNames = [
                "Январь", "Февраль", "Март", "Апрель", "Май", "Июнь",
                "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
            ];

            const wrapper = document.querySelector(".calendar_main .wrapper");

            if (!wrapper) return;

            function generateCalendar() {
                for (let month = 0; month < 12; month++) {
                    const firstDateMonth = new Date(year, month, 1);
                    const lastDateMonth = new Date(year, month + 1, 0);
                    const firstDayOfWeek = firstDateMonth.getDay();
                    let date = new Date(firstDateMonth);
                    let weeks = [];
                    let week = new Array(7).fill({ date: "" });

                    for (let i = 0; i < firstDayOfWeek; i++) {
                        week[i] = { date: "" };
                    }

                    while (date <= lastDateMonth) {
                        if (date.getDay() === 0) {
                            weeks.push(week);
                            week = new Array(7).fill({ date: "" });
                        }
                        week[date.getDay()] = { date: date.getDate() };
                        date.setDate(date.getDate() + 1);
                    }
                    weeks.push(week);

                    const card = document.createElement("div");
                    card.classList.add("card", "swiper-slide");

                    if (month === currentMonth) {
                        card.classList.add("active");
                    }

                    const cardInner = document.createElement("div");
                    cardInner.classList.add("card_inner");

                    const title = document.createElement("h2");
                    title.classList.add("card--title");
                    title.innerHTML = `<span class="index">${month + 1}.</span> ${monthNames[month]}`;
                    cardInner.appendChild(title);

                    const table = document.createElement("table");
                    table.classList.add("calendar");

                    const thead = document.createElement("thead");
                    const tr = document.createElement("tr");

                    days.forEach((day) => {
                        const th = document.createElement("th");
                        th.classList.add("calendar--day");
                        th.textContent = day;
                        tr.appendChild(th);
                    });

                    thead.appendChild(tr);
                    table.appendChild(thead);

                    const tbody = document.createElement("tbody");
                    tbody.classList.add("calendar-body");

                    weeks.forEach((week) => {
                        const tr = document.createElement("tr");
                        week.forEach((day) => {
                            const td = document.createElement("td");
                            td.textContent = day.date;
                            td.dataset.date = `${year}-${month + 1}-${day.date}`;
                            
                            if (!day.date) {
                                td.classList.add("empty-day"); // Добавляем класс пустым ячейкам
                            } else {
                                td.addEventListener("click", function() {
                                    this.classList.toggle("selected");
                                });
                            }

                            if (isToday(day, month)) {
                                td.classList.add("today");
                            }

                            tr.appendChild(td);
                        });
                        tbody.appendChild(tr);
                    });

                    table.appendChild(tbody);
                    cardInner.appendChild(table);
                    card.appendChild(cardInner);
                    wrapper.appendChild(card);
                }
            }

            function isToday(day, month) {
                const today = new Date();
                return (
                    day.date &&
                    day.date === today.getDate() &&
                    month === today.getMonth() &&
                    year === today.getFullYear()
                );
            }

            generateCalendar();

            const calendarSlider = new Swiper('.container-calendar', {
                slidesPerView: 2,
                speed: 1000,
                spaceBetween: 20,
                navigation: {
                    nextEl: '.calendar_top_title .swiper-button-next',
                    prevEl: '.calendar_top_title .swiper-button-prev',
                },
                breakpoints: {
                    0: {
                        slidesPerView: 1,
                        spaceBetween: 10
                    },
                    768: {
                        slidesPerView: 2,
                        spaceBetween: 10
                    },
                    1340: {
                        slidesPerView: 1,
                        spaceBetween: 20
                    },
                    1444: {
                        slidesPerView: 2,
                        spaceBetween: 20
                    }
                },
                initialSlide: currentMonth
            });
        },
        fitnesSlider: function() {
            const fitnesWrapper = document.querySelector('.fitnes_block_wr');
            if (!fitnesWrapper) return;

            var listArray = ["slide1", "slide2", "slide3"]; // Массив может использоваться для другого функционала

            // Инициализация основного слайдера с изображениями
            const sliderImage = new Swiper('.right_slider_fitnes', {
                slidesPerView: 1,
                loop: true,
                effect: 'slide',
                speed: 1000,
                spaceBetween: 0,
                autoplay: {
                    delay: 3000,
                },
                fadeEffect: {
                    crossFade: true
                },
                pagination: {
                    el: '.fitnes_pagination_block',
                    clickable: true,
                    type: 'bullets',
                    renderBullet: function (index, className) {
                        // Возвращаем кастомный элемент пагинации
                        return '<span class="' + className + '">' + '<i></i>' + '<b></b>'  + '</span>';
                    },
                },
            });

            // Инициализация слайдера с текстом (thumbs-слайдер)
            const sliderText = new Swiper('.left_slider_fitnes', {
                slidesPerView: 1,
                loop: true,
                effect: 'fade',
                speed: 1000,
                spaceBetween: 0,
                navigation: {
                    nextEl: '.fitnes_arrow_btn.swiper-button-next',
                    prevEl: '.fitnes_arrow_btn.swiper-button-prev',
                },
                pagination: {
                    el: ".pagination_fitnes",
                    type: "fraction",
                },
            });

            // Устанавливаем `sliderText` как thumbs для `sliderImage`, чтобы текстовый слайдер был "миниатюрами"
            sliderImage.thumbs.swiper = sliderText;
        },
        notXSlider: function(){
            const notWrapper = document.querySelector('.block_not_x');

            if(!notWrapper) return; 

            const sliderImage = new Swiper('.slider_not', {
                slidesPerView: 'auto',
                loop: true,
                effect: 'slide',
                speed: 1000,
                spaceBetween: 20,
                pagination: {
                    el: '.pagination_not',
                    type: "fraction",
                },
                navigation: {
                    nextEl: '.not_arrow_btn.swiper-button-next',
                    prevEl: '.not_arrow_btn.swiper-button-prev',
                },
                breakpoints: {
                    0: {
                        spaceBetween: 10
                    },
                    768: {
                        spaceBetween: 20
                    }
                },
            });
        },
        positionSlider: function(){
            const positionWrapper = document.querySelector('.position_block');

            if(!positionWrapper) return; 

            const sliderText = new Swiper('.slider_position', {
                slidesPerView: 1,
                loop: true,
                effect: 'slide',
                speed: 1000,
                spaceBetween: 0,
                navigation: {
                    nextEl: '.position_arrow_btn.swiper-button-next',
                    prevEl: '.position_arrow_btn.swiper-button-prev',
                },  
            });
        },
        eventsSlider: function(){
            const eventsWrapper = document.querySelector('.events_block_wr');

            if(!eventsWrapper) return; 

            const sliderImage = new Swiper('.right_slider_events', {
                slidesPerView: 1,
                loop: true,
                effect: 'slide',
                speed: 1000,
                spaceBetween: 0,
                pagination: {
                    el: '.events_pagination_block',
                    clickable: true,
                },
            });

            const sliderText = new Swiper('.left_slider_events', {
                slidesPerView: 1,
                loop: true,
                effect: 'fade',
                speed: 1000,
                spaceBetween: 0,
                navigation: {
                    nextEl: '.events_arrow_btn.swiper-button-next',
                    prevEl: '.events_arrow_btn.swiper-button-prev',
                },
                thumbs: {
                    swiper: sliderImage,
                },
                breakpoints: {
                    0: {
                        pagination: {
                            el: ".right_slider_bottom .pagination_events",
                            type: "fraction",
                        },
                    },
                    768: {
                        pagination: {
                            el: ".left_slider_bottom .pagination_events",
                            type: "fraction",
                        },
                    }
                },    
            });
        },
        eventsItemSlider: function() {
            const eventWrapper = document.querySelector('.events_items');

            if(!eventWrapper) return; 

            const initSlider = () => {
                if (window.innerWidth <= 767) {
                    if (!eventWrapper.classList.contains('swiper-initialized')) {
                        eventWrapper.classList.add('swiper-initialized');
                        new Swiper('.slider_events_items', {
                            slidesPerView: 'auto',
                            loop: true,
                            effect: 'slide',
                            speed: 1000,
                            spaceBetween: 10,
                            navigation: {
                                nextEl: '.events_items_arrow_btn.swiper-button-next',
                                prevEl: '.events_items_arrow_btn.swiper-button-prev',
                            },
                        });
                    }
                } else {
                    if (eventWrapper.classList.contains('swiper-initialized')) {
                        eventWrapper.classList.remove('swiper-initialized');
                        if (eventWrapper.swiper) {
                            eventWrapper.swiper.destroy(true, true);
                        }
                    }
                }
            };

            window.addEventListener('resize', initSlider);
            initSlider(); 
        },
        spesSlider: function() {
            const spesWrap = document.querySelector('.spes_slider_wrapper');

            if(!spesWrap) return;

            const slider = new Swiper('.swiper_slider_spes', {
                slidesPerView: 'auto',
                loop: true,
                effect: 'slide',
                speed: 1000,
                spaceBetween: 20,
                navigation: {
                    nextEl: '.spes_arrow.swiper-button-next',
                    prevEl: '.spes_arrow.swiper-button-prev',
                },
                breakpoints: {
                    0: {
                        spaceBetween: 10
                    },
                    768: {
                        spaceBetween: 20
                    }
                }
            });
        },
        restaurantSlider: function(){
            const restaurantWrapper = document.querySelector('.rest_slider_wr');

            if(!restaurantWrapper) return; 

            const sliderImage = new Swiper('.right_slider_rest_slider', {
                slidesPerView: 1,
                loop: true,
                effect: 'slide',
                speed: 1000,
                spaceBetween: 0,
            });

            const sliderText = new Swiper('.left_slider_rest_slider', {
                slidesPerView: 1,
                loop: true,
                effect: 'fade',
                speed: 1000,
                spaceBetween: 0,
                navigation: {
                    nextEl: '.rest_slider_arrow_btn.swiper-button-next',
                    prevEl: '.rest_slider_arrow_btn.swiper-button-prev',
                },
                thumbs: {
                    swiper: sliderImage,
                },
                pagination: {
                    el: ".left_slider_bottom .pagination_rest_slider",
                    type: "fraction",
                },   
            });
        },
        placetSlider: function(){
            const restaurantWrapper = document.querySelector('.place_block_wr');

            if(!restaurantWrapper) return; 

            const sliderImage = new Swiper('.right_slider_place', {
                slidesPerView: 1,
                loop: true,
                effect: 'slide',
                speed: 1000,
                spaceBetween: 0,
                navigation: {
                    nextEl: '.place_arrow.swiper-button-next',
                    prevEl: '.place_arrow.swiper-button-prev',
                },
            });

            const sliderText = new Swiper('.left_slider_place', {
                slidesPerView: 1,
                loop: true,
                effect: 'slide',
                speed: 1000,
                spaceBetween: 0,
                navigation: {
                    nextEl: '.place_arrow_btn.swiper-button-next',
                    prevEl: '.place_arrow_btn.swiper-button-prev',
                },
                pagination: {
                    el: ".left_slider_bottom .pagination_place",
                    type: "fraction",
                },   
            });
        },
    }
}())