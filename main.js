// Mudar o caminho do ícone para adicionar o marcador no mapa
const iconPath = `iconeTeste.png`;

let latP1, longP1, latP2, longP2;
let disLat, disLong, angle;
let iconFeature, vectorSource, vectorLayer;

// instância do mapa
let map;

function initiate() {
  latP1 = -19.917456;
  longP1 = -43.945317;
  document.getElementById("latPoint").value = latP1;
  document.getElementById("longPoint").value = longP1;

  map = new ol.Map({
    interactions: ol.interaction.defaults({
      altShiftDragRotate: false,
      pinchRotate: false,
    }),
    target: document.getElementById("mapaid"),
    layers: [
      new ol.layer.Tile({
        source: new ol.source.OSM(),
      }),
    ],
    view: new ol.View({
      center: ol.proj.fromLonLat([longP1, latP1]),
      zoom: 18,
    })
  });

  iconFeature = new ol.Feature({
    geometry: new ol.geom.Point(ol.proj.fromLonLat([longP1, latP1])),
    id: 1
  });

  iconFeature.setStyle(new ol.style.Style({
    image: new ol.style.Icon({
      anchor: [0.5, 0.5],
      anchorXUnits: "fraction",
      anchorYUnits: "fraction",
      crossOrigin: "anonymous",
      src: iconPath
    })
  }));

  vectorSource = new ol.source.Vector({
    features: [iconFeature]
  });

  vectorLayer = new ol.layer.Vector({
    source: vectorSource
  });

  map.addLayer(vectorLayer);
};

initiate();

function calcAngle() {
  disLat = latP1 - latP2;
  disLong = longP1 - longP2;

  angle = Math.PI + Math.atan2(disLong, disLat);
}

function move() {
  latP2 = document.getElementById("latPoint").value;
  longP2 = document.getElementById("longPoint").value;

  if (isNaN(latP2) || isNaN(longP2)) {
    alert("Input is Empty!");
  }

  calcAngle();
  
  iconFeature.setGeometry(new ol.geom.Point(ol.proj.fromLonLat([longP2, latP2])));
  iconFeature.setStyle(new ol.style.Style({
    image: new ol.style.Icon({
      rotation: angle,
      src: iconPath
    })
  }));
  

  latP1 = latP2;
  longP1 = longP2;
}

function moveCamera() {
  latP2 = document.getElementById("latPoint").value;
  longP2 = document.getElementById("longPoint").value;

  if (isNaN(latP2) || isNaN(longP2)) {
    alert("Input is Empty!");
  }

  map.setView(new ol.View({
      center: ol.proj.fromLonLat([longP2, latP2]),
      zoom: 18,
  }));
}


