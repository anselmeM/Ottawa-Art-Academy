$(document).ready(function() {
    // 1. Mobile Menu Toggle
    $('.nav__toggler').click(function () {
        $(this).toggleClass('active');
        $('.nav-list-box').toggleClass('active');
        if ($('.nav-list-box').hasClass('active')) {
            gsap.fromTo(".nav-list__item", 
                { opacity: 0, x: 25 }, 
                { opacity: 1, x: 0, duration: 0.4, stagger: 0.05, ease: "power2.out" }
            );
        }
    });

    // 2. Search Toggle
    $('.search-btn').click(function () {
        $('.search-input').toggleClass('active');
        if ($('.search-input').hasClass('active')) {
            $('.search-input').focus();
        }
    });

    // Close search if clicked outside
    $(document).click(function(e) {
        if (!$(e.target).closest('.search-form').length) {
            $('.search-input').removeClass('active');
        }
    });

    // 3. Sticky Header on Scroll
    $(window).on('scroll', function() {
        if ($(window).scrollTop() > 50) {
            $('.navbar').addClass('navbar--scrolled');
        } else {
            $('.navbar').removeClass('navbar--scrolled');
        }
    });

    // 4. Portfolio Filters (GSAP Animated Layout)
    $('.filter-btn').click(function() {
        $('.filter-btn').removeClass('active');
        $(this).addClass('active');
        
        var filter = $(this).data('filter');
        
        if (filter === 'all') {
            $(".portfolio-item").each(function() {
                $(this).css('display', 'flex');
                gsap.fromTo($(this), 
                    { opacity: 0, y: 15 },
                    { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
                );
            });
        } else {
            $(".portfolio-item").each(function() {
                if ($(this).data('category') === filter) {
                    $(this).css('display', 'flex');
                    gsap.fromTo($(this), 
                        { opacity: 0, y: 15 },
                        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
                    );
                } else {
                    $(this).css('display', 'none');
                }
            });
        }
        // Recalculate ScrollTrigger markers since page height changed
        if (typeof ScrollTrigger !== 'undefined') {
            setTimeout(function() {
                ScrollTrigger.refresh();
            }, 300);
        }
    });

    // 5. Lightbox Modal for Art Gallery
    $('.portfolio-item .craft-content-box1 img').click(function() {
        var imgSrc = $(this).attr('src');
        var imgAlt = $(this).attr('alt');
        
        $('#lightboxImg').attr('src', imgSrc);
        $('#lightboxCaption').text(imgAlt);
        
        $('#galleryLightbox').addClass('active');
        $('body').css('overflow', 'hidden');
    });

    $('#lightboxClose, #galleryLightbox').click(function(e) {
        if (e.target.id === 'galleryLightbox' || e.target.id === 'lightboxClose' || $(e.target).hasClass('lightbox-close')) {
            $('#galleryLightbox').removeClass('active');
            $('body').css('overflow', 'auto');
        }
    });

    // 6. Form Floating Labels Support
    $('.form-input').on('focus', function() {
        $(this).parent().addClass('focused');
    }).on('blur', function() {
        if ($(this).val() === '') {
            $(this).parent().removeClass('focused');
        }
    });

    // 7. Interactive FAQ Accordion (GSAP Animated)
    $('.faq-header').click(function() {
        var item = $(this).parent('.faq-item');
        var content = item.find('.faq-content');
        
        if (item.hasClass('active')) {
            // Close current item
            gsap.to(content, {
                maxHeight: 0,
                duration: 0.35,
                ease: "power2.inOut",
                onComplete: function() {
                    item.removeClass('active');
                }
            });
        } else {
            // Close other active FAQ items
            $('.faq-item.active').each(function() {
                var otherItem = $(this);
                var otherContent = otherItem.find('.faq-content');
                gsap.to(otherContent, {
                    maxHeight: 0,
                    duration: 0.35,
                    ease: "power2.inOut"
                });
                otherItem.removeClass('active');
            });
            
            // Open clicked item
            item.addClass('active');
            var targetHeight = content[0].scrollHeight;
            gsap.to(content, {
                maxHeight: targetHeight,
                duration: 0.45,
                ease: "power2.out"
            });
        }
        
        // Refresh ScrollTrigger markers
        if (typeof ScrollTrigger !== 'undefined') {
            setTimeout(function() {
                ScrollTrigger.refresh();
            }, 500);
        }
    });
});

// 8. Preloader & GSAP Entrance Animations (Runs on full Window Load)
$(window).on('load', function() {
    if (typeof gsap !== 'undefined') {
        gsap.to(".se-pre-con", {
            opacity: 0,
            duration: 0.6,
            ease: "power2.out",
            onComplete: function() {
                $(".se-pre-con").css("display", "none");
                initPageLoadAnimations();
            }
        });
    } else {
        $(".se-pre-con").fadeOut("slow");
    }
});

// Animate entrance elements
function initPageLoadAnimations() {
    if (typeof gsap === 'undefined') return;

    // A. Main Headings Reveal
    gsap.fromTo("#bannerHeading", 
        { opacity: 0, y: 40 }, 
        { opacity: 1, y: 0, duration: 1.2, ease: "power4.out" }
    );
    
    // B. Sub-banner headers
    gsap.fromTo(".sub-banner__heading, .sub-banner__line, .sub-banner__desc",
        { opacity: 0, y: 25 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: "power2.out" }
    );

    // C. Floating Left Socials Reveal
    gsap.fromTo(".our-socials", 
        { opacity: 0, x: -30 }, 
        { opacity: 1, x: 0, duration: 1, delay: 0.5, ease: "power2.out" }
    );

    // D. Hero Showcase Reveal
    if ($("#featuredShowcase").length) {
        gsap.fromTo("#featuredShowcase",
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 1.2, delay: 0.2, ease: "power3.out" }
        );
    }

    // E. Sidebar items staggered reveal
    if ($("#sidebarArticles .banner-sidebar-box").length) {
        gsap.fromTo("#sidebarArticles .banner-sidebar-box",
            { opacity: 0, x: 30 },
            { opacity: 1, x: 0, duration: 0.8, delay: 0.4, stagger: 0.15, ease: "power2.out" }
        );
    }

    // 9. Register ScrollTrigger animations
    if (typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);

        // F. Index Tutorials stagger
        if ($(".toturials-box").length) {
            gsap.from(".toturials-box", {
                scrollTrigger: {
                    trigger: ".toturials",
                    start: "top 85%"
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                stagger: 0.2,
                ease: "power2.out"
            });
        }

        // G. Alternating rows stagger (Portfolio & Workshops)
        if ($(".craft-content-wrapper").length) {
            gsap.from(".craft-content-wrapper", {
                scrollTrigger: {
                    trigger: ".craft",
                    start: "top 80%"
                },
                opacity: 0,
                y: 50,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out"
            });
        }

        // H. Enrolment pricing cards
        if ($(".enrolment-grid").length) {
            gsap.from(".craft-pricing", {
                scrollTrigger: {
                    trigger: ".enrolment-grid",
                    start: "top 85%"
                },
                opacity: 0,
                y: 40,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out"
            });
        }

        // I. Contact layout columns
        if ($(".contact-layout").length) {
            gsap.from("#contactInfo, #contactFormCol", {
                scrollTrigger: {
                    trigger: ".contact-layout",
                    start: "top 80%"
                },
                opacity: 0,
                y: 40,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out"
            });
        }

        // J. Contact schedule table
        if ($(".schedule-table-wrapper").length) {
            gsap.from(".schedule-table-wrapper", {
                scrollTrigger: {
                    trigger: "#timetable",
                    start: "top 80%"
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                ease: "power2.out"
            });
        }

        // K. Timeline enrolment steps
        if ($(".steps-grid").length) {
            gsap.from(".step-card", {
                scrollTrigger: {
                    trigger: ".steps-grid",
                    start: "top 85%"
                },
                opacity: 0,
                y: 30,
                duration: 0.8,
                stagger: 0.15,
                ease: "power2.out"
            });
        }

        // L. General Scroll animations for newly expanded layout sections
        if ($(".scroll-anim").length) {
            $(".scroll-anim").each(function() {
                gsap.from($(this), {
                    scrollTrigger: {
                        trigger: this,
                        start: "top 85%",
                        toggleActions: "play none none none"
                    },
                    opacity: 0,
                    y: 40,
                    duration: 0.8,
                    ease: "power2.out"
                });
            });
        }
    }
}