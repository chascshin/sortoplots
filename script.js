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
  const value = parseFloat(feature.get(currentYear)); // Динамическое значение по текущему году
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

// Обновление стилей при изменении года - СЮДА ТОЖЕ ДОПИСЫВАТЬ
const updateFeatureStyles = () => {
  vectorLayer.setStyle(getFeatureStyle);
  vectorLayer1.setStyle(getFeatureStyle);
  vectorLayer2.setStyle(getFeatureStyle);
  vectorLayer3.setStyle(getFeatureStyle);
  vectorLayer4.setStyle(getFeatureStyle);
  vectorLayer5.setStyle(getFeatureStyle);
};
// Обновление стилей при изменении года
yearSlider.addEventListener('input', function () {
  currentYear = this.value;
  updateFeatureStyles();
});

// Слой базовой карты - серый ESRI
const baseLayer = new ol.layer.Tile({
  source: new ol.source.XYZ({
    url: 'https://services.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}'
  })
});

// Векторный слой для "вятка2"
const vectorSource = new ol.source.Vector({
  url: 'yield_all_years.geojson',
  format: new ol.format.GeoJSON()
});

// Слой "вятка2" в вебе
const vectorLayer = new ol.layer.Vector({
  source: vectorSource,
  style: getFeatureStyle
});

// Векторный слой для "кировская"
const vectorSource1 = new ol.source.Vector({
  url: 'kirovskaya.geojson', // Путь к файлу GeoJSON
  format: new ol.format.GeoJSON()
});

// Слой "кировская" в вебе
const vectorLayer1 = new ol.layer.Vector({
  source: vectorSource1,
  style: getFeatureStyle,
  visible: false
});

// Векторный слой для "фаленская4"
const vectorSource2 = new ol.source.Vector({
  url: 'falen.geojson',
  format: new ol.format.GeoJSON()
});

// Слой "фаленская4" в вебе
const vectorLayer2 = new ol.layer.Vector({
  source: vectorSource2,
  style: getFeatureStyle,
  visible: false
});

// Векторный слой для "иргина"
const vectorSource3 = new ol.source.Vector({
  url: 'irgina.geojson',
  format: new ol.format.GeoJSON()
});

// Слой "иргина" в вебе
const vectorLayer3 = new ol.layer.Vector({
  source: vectorSource3,
  style: getFeatureStyle,
  visible: false
});

// Векторный слой для "горноуральская"
const vectorSource4 = new ol.source.Vector({
  url: 'gornourals.geojson',
  format: new ol.format.GeoJSON()
});

// Слой "горноуральская" в вебе
const vectorLayer4 = new ol.layer.Vector({
  source: vectorSource4,
  style: getFeatureStyle,
  visible: false
});

// Векторный слой для "Красноуфимская100"
const vectorSource5 = new ol.source.Vector({
  url: 'krasufa.geojson',
  format: new ol.format.GeoJSON()
});

// Слой "Красноуфимская100" в вебе
const vectorLayer5 = new ol.layer.Vector({
  source: vectorSource5,
  style: getFeatureStyle,
  visible: false
});

// Карта
const map = new ol.Map({
  target: 'map',
  layers: [baseLayer, vectorLayer5, vectorLayer4, vectorLayer3, vectorLayer2, vectorLayer1, vectorLayer], // Добавляем оба слоя в массив СЮДА НУЖНО ПРОПИСАТЬ
  view: new ol.View({
    center: ol.proj.fromLonLat([56, 57.2]), // Центр карты
    zoom: 6.8
  })
});

// Обработчик включения/выключения слоя "вятка2"
document.getElementById('toggleWMS_vyatka2').addEventListener('change', function () {
  vectorLayer.setVisible(this.checked); // Управляем видимостью слоя
  if (this.checked) {
    currentYear = yearSlider.value; // Если включаем слой, обновляем год
    updateFeatureStyles(); // Обновляем стили для текущего слоя
  }
});

// Обработчик включения/выключения слоя "кировская"
document.getElementById('toggleWMS_kirovskaya').addEventListener('change', function () {
  const isVisible = this.checked;
  vectorLayer1.setVisible(isVisible); // Управляем видимостью слоя
  if (isVisible) {
    currentYear = yearSlider.value; // Если включаем слой, обновляем год
    updateFeatureStyles(); // Обновляем стили для текущего слоя
  }
});

// Обработчик включения/выключения слоя "фаленская4"
document.getElementById('toggleWMS_falen').addEventListener('change', function () {
  const isVisible = this.checked;
  vectorLayer2.setVisible(isVisible); // Управляем видимостью слоя
  if (isVisible) {
    currentYear = yearSlider.value; // Если включаем слой, обновляем год
    updateFeatureStyles(); // Обновляем стили для текущего слоя
  }
});

// Обработчик включения/выключения  слоя "иргина"
document.getElementById('toggleWMS_irgina').addEventListener('change', function () {
  const isVisible = this.checked;
  vectorLayer3.setVisible(isVisible); // Управляем видимостью слоя
  if (isVisible) {
    currentYear = yearSlider.value; // Если включаем слой, обновляем год
    updateFeatureStyles(); // Обновляем стили для текущего слоя
  }
});

// Обработчик включения/выключения  слоя "горноуральская"
document.getElementById('toggleWMS_gornoural').addEventListener('change', function () {
  const isVisible = this.checked;
  vectorLayer4.setVisible(isVisible); // Управляем видимостью слоя
  if (isVisible) {
    currentYear = yearSlider.value; // Если включаем слой, обновляем год
    updateFeatureStyles(); // Обновляем стили для текущего слоя
  }
});

// Обработчик включения/выключения  слоя "Красноуфимская100"
document.getElementById('toggleWMS_krasnoufimsk').addEventListener('change', function () {
  const isVisible = this.checked;
  vectorLayer5.setVisible(isVisible); // Управляем видимостью слоя
  if (isVisible) {
    currentYear = yearSlider.value; // Если включаем слой, обновляем год
    updateFeatureStyles(); // Обновляем стили для текущего слоя
  }
});