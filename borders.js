// Подключаем слой с границами — он статичен, не зависит от года
const borderLayer = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: 'border.geojson', // Путь к файлу с границами
    format: new ol.format.GeoJSON(),
  }),
  style: new ol.style.Style({
    stroke: new ol.style.Stroke({
      color: '#ff0000',
      width: 2,
    }),
    fill: new ol.style.Fill({
      color: 'rgba(137, 71, 71, 0)', // Прозрачная заливка
    })
  })
});

// Создаем слой с точками
const pointsLayer = new ol.layer.Vector({
  source: new ol.source.Vector({
    url: 'points.geojson', // Путь к файлу с точками
    format: new ol.format.GeoJSON({
      dataProjection: 'EPSG:4326', // Проекция исходных данных
      featureProjection: 'EPSG:3857' // Проекция карты
    })
  }),
  style: new ol.style.Style({
    image: new ol.style.Circle({
      radius: 6,
      fill: new ol.style.Fill({ color: '#ff0000' }), // Цвет точек
      stroke: new ol.style.Stroke({ color: '#ffffff', width: 2 }) // Окантовка точек
    })
  })
});

// Добавляем оба слоя на карту
map.addLayer(borderLayer); // Добавление слоя с границами
map.addLayer(pointsLayer); // Добавление слоя с точками
