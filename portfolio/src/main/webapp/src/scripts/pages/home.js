const Flickity = require("flickity");

class HomePage {
    constructor() {
        const carousel = new Flickity(".carousel", {
            prevNextButtons: false,
            pageDots: false,
            freeScroll: true,
            contain: true,
            draggable: true,
        });
    }

    getCarousel() {
        return carousel;
    }
}

export { HomePage } ;
