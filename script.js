const yearSlider = document.getElementById('yearRange');
const yearLabels = document.getElementById('yearLabels');
let currentYear = yearSlider.value;

// Отображаем года под слайдером
const years = Array.from({ length: 13 }, (_, i) => 2006 + i);
yearLabels.innerHTML = years.map(year => `<span>${year}</span>`).join('');

// Цветовая шкала
const colorScale = value => {
  if (value < 2) return '#ffffcc';
  if (value < 3) return '#c2e699';
  if (value < 4) return '#78c679';
  if (value < 5) return '#31a354';
  return '#006837';
};

// Стилизация одного объекта
const getFeatureStyle = feature => {
  const value = parseFloat(feature.get(currentYear));
  return new ol.style.Style({
    fill: new ol.style.Fill({
      color: colorScale(value)
    }),
    stroke: new ol.style.Stroke({
      color: '#333',
      width: 1
    })
  });
};

// Источник данных
const vectorSource = new ol.source.Vector({
  url: 'yield_all_years.geojson',
  format: new ol.format.GeoJSON()
});

// Слой
const vectorLayer = new ol.layer.Vector({
  source: vectorSource,
  style: getFeatureStyle
});

// Обновление стилей всех объектов
const updateFeatureStyles = () => {
  vectorSource.getFeatures().forEach(feature => {
    feature.setStyle(getFeatureStyle(feature));
  });
};

// Обновление при изменении года
yearSlider.addEventListener('input', () => {
  currentYear = yearSlider.value;
  updateFeatureStyles();
});

// Карта
const map = new ol.Map({
  target: 'map',
  layers: [
    new ol.layer.Tile({
      source: new ol.source.XYZ({
        url: 'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}',
        attributions: 'Tiles © Esri — Esri, DeLorme, NAVTEQ',
        maxZoom: 16
      })
    }),
    vectorLayer
  ],
  view: new ol.View({
    center: ol.proj.fromLonLat([56, 57.2]), // место где центр карты
    zoom: 6.8
  })
});

