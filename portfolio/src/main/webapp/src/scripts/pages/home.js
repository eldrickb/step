export default class HomePage {

    constructor() {

        var carousel = new Flickity(".carousel", {
            prevNextButtons: false,
            pageDots: false,
            freeScroll: true,
            contain: true,
            draggable: true,
        });
    }

    getCarousel () {
        return carousel;
    }
}