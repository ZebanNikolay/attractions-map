"use strict";
ymaps.ready(init);

var options = {preset: "islands#violetIcon"},
    myMap;

function init() {
    myMap = new ymaps.Map("map", {
        center: [51.809653, 143.154497],
        zoom: 14,
        controls: ["rulerControl", "typeSelector", "zoomControl", "geolocationControl"]
    });

    initPlacemarks(sightseeingsPlacemarks);

    function initPlacemarks(placemarks) {
        myMap.geoObjects.removeAll();
        placemarks.forEach(function (item) {
            item.properties.balloonContentBody = [
                '<address>',
                '<img class="img" src="' + item.data.img + '"/>',
                '<br/>',
                item.properties.balloonContent,
                '<br/>',
                '<a href="http://lib-nogliki.muzkult.ru/img/upload/3368/documents/Putevoditel_Tropami_Noglik2_legkij.pdf">Скачать путеводитель</a>',
                '</address>'
            ].join('');
            myMap.geoObjects.add(new ymaps.Placemark(item.coordinates, item.properties, options));
        });
    }

    var switchActive = function (button, placemarks) {
        $(document).ready(function(){
            button.click(function(){
                $("div.active").removeClass("active");
                $(this).addClass("active");
                initPlacemarks(placemarks);
            });
        });

    };

    switchActive($(".sightseeings-button"), sightseeingsPlacemarks);
    switchActive($(".street-button"), streetsPlacemarks);

}
