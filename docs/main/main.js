let map;
function MapInizialized(mapTarget) {
  map = new ol.Map({
    target: mapTarget
  });
  return map;
};
let view;
function MapSetView(longitude, latitude, zoomLevel, setMaxZoom, setMinZoom) {
  view = new ol.View({
    center: ol.proj.fromLonLat([longitude, latitude]),
    zoom: zoomLevel,
    maxZoom: setMaxZoom,
    minZoom: setMinZoom
  });
  map.setView(view);
  return view;
};
function MapScaleLine() {
  const scaleLine = new ol.control.ScaleLine({
    className: 'ol-scale-line',
    target: document.getElementById('scale-line')
  });
  map.addControl(scaleLine);
  return scaleLine;
};
function MapFullScreen() {
  const fullScreen = new ol.control.FullScreen({
    className: 'ol-full-screen',
    tipLabel: 'Toggle full-screen'
  });
  map.addControl(fullScreen);
  return fullScreen;
};
function BaseMapLayer(baseMapName) {
  this.baseMapName = baseMapName;
  let empty;
  let osm;
  return {
    'createEmpty': function() {
      const empty = new ol.layer.Tile({
        title: 'Empty Map',
        source: new ol.source.XYZ(),
        zIndex: 0
      });
      return empty;
    },
    'createOSMStandard': function() {
      let osm = new ol.layer.Tile({
        title: baseMapName,
        source: new ol.source.OSM(),
        zIndex: 0
      });
      return osm;
    }
  }
};
function vectorsLayer(
  vectorType,
  urlAPI,
  vectorsLayerName
){

  this.vectorType = vectorType;
  this.urlAPI = urlAPI;
  this.vectorsLayerName = vectorsLayerName;

  let layerVector;

  return {

    'createVector': function(
      setStrokeColor,
      setStrokeLineDashLength,
      setStrokeLineDashSpace,
      setStrokeWidth,
      setFillColor,
      setMaxZoom,
      setMinZoom,
      setZIndex
    ){
      this.setStrokeColor = setStrokeColor;
      this.setStrokeLineDashLength = setStrokeLineDashLength;
      this.setStrokeLineDashSpace = setStrokeLineDashSpace;
      this.setStrokeWidth = setStrokeWidth;
      this.setFillColor = setFillColor;
      this.setMaxZoom = setMaxZoom;
      this.setMinZoom = setMinZoom;
      this.setZIndex = setZIndex;

      stroke = new ol.style.Stroke({
          color: setStrokeColor,
          width: setStrokeWidth,
          lineDash: [setStrokeLineDashLength, setStrokeLineDashSpace],
          lineCap: 'butt',
          lineJoin: 'miter'
      });
      fill = new ol.style.Fill({
        color: setFillColor,
      });

      let style;
      if (vectorType.toLowerCase() === 'polygon') {
        style = new ol.style.Style({
            stroke: stroke,
            fill: fill
        });
      } else if (vectorType.toLowerCase() === 'linestring') {
        style = new ol.style.Style({
            stroke: stroke
        });
      } else if (vectorType.toLowerCase() === 'point') {
        style = new ol.style.Style({
            image: new ol.style.Circle({
              radius: setStrokeWidth * 5,
              stroke: stroke,
              fill: fill
            })
        });
      } else {
        console.error('Geometry not recognized! Accepted geometries: point, linestring, polygon.');
      }

      layerVector = new ol.layer.Vector({
        title: vectorsLayerName,
        source: new ol.source.Vector({
            url: urlAPI,
            format: new ol.format.GeoJSON(),
        }),
        style: style,
        minZoom: setMinZoom,
        maxZoom: setMaxZoom,
        zIndex: setZIndex
      });
      return layerVector;
    },
    'zoomToExtent': function(
      paddingTop,
      paddingLeft,
      paddingBottom,
      paddingRight,
      durationMilliseconds
    ){

      this.paddingTop = paddingTop;
      this.paddingLeft = paddingLeft;
      this.paddingBottom = paddingBottom;
      this.paddingRight = paddingRight;
      this.durationMilliseconds = durationMilliseconds;

      layerVector.getSource().once('change', function(evt) {
        if (layerVector.getSource().getState() === 'ready') {
          if (layerVector.getSource().getFeatures().length > 0) {
            extent = layerVector.getSource().getExtent();
            options = {
              size: map.getSize(),
              padding: [paddingTop, paddingLeft, paddingBottom, paddingRight],
              duration: durationMilliseconds
            }
            map.getView().fit(extent, options);
          }
        }
      });
    },
  };
};
