"use strict";

ymaps.ready(init);

var sightseeingsOptions = {preset: "islands#violetIcon"},
    streetOptions = {preset: "islands#redIcon"},
    myMap;

function init() {
    myMap = new ymaps.Map("map", {
        center: [51.809653, 143.154497],
        zoom: 14,
        controls: ["rulerControl", "typeSelector", "zoomControl", "geolocationControl"]
    });

    initPlacemarks(sightseeingsPlacemarks, sightseeingsOptions);

    function initPlacemarks(placemarks, options) {
        myMap.geoObjects.removeAll();
        placemarks.forEach(function (item) {
            item.properties.balloonContentBody = [
                '<address>',
                '<img class="img" src="' + item.data.img + '" data-action="zoom"/>',
                '<br/>',
                item.properties.balloonContent,
                '<br/>',
                '<a href="http://lib-nogliki.muzkult.ru/img/upload/3368/documents/Putevoditel_Tropami_Noglik2_legkij.pdf">Скачать путеводитель</a>',
                '</address>'
            ].join('');
            myMap.geoObjects.add(new ymaps.Placemark(item.coordinates, item.properties, options));
        });
    }

    function switchActive(button, placemarks, options) {
        $(document).ready(function () {
            button.click(function () {
                $("div.active").removeClass("active");
                $(this).addClass("active");
                initPlacemarks(placemarks, options);
            });
        });

    };

    switchActive($(".sightseeings-button"), sightseeingsPlacemarks, sightseeingsOptions);
    switchActive($(".street-button"), streetsPlacemarks, streetOptions);

}

