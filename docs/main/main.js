//////// Inizializzazione della mappa
let map;
function MapInizialized(mapTarget) {
  map = new ol.Map({
    target: mapTarget
  });
  return map;
};
//////// Definizione della view
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
//////// Aggiunta controlli standard
// Scale Line
function MapScaleLine() {
  const scaleLine = new ol.control.ScaleLine({
    className: 'ol-scale-line',
    target: document.getElementById('scale-line')
  });
  map.addControl(scaleLine);
  return scaleLine;
};
// Full Screen
function MapFullScreen() {
  const fullScreen = new ol.control.FullScreen({
    className: 'ol-full-screen',
    tipLabel: 'Toggle full-screen'
  });
  map.addControl(fullScreen);
  return fullScreen;
};
//////// Mappe di sfondo
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
//////// Aggiunta vettori
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
    /// Genera il vettore
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
      // Definizione dello stile in base alla
      // tipologia di geometria
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
    /// Zoom alle estensioni del vettore al primo caricamento della mappa
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
            const extent = layerVector.getSource().getExtent();
            const options = {
              size: map.getSize(),
              padding: [paddingTop, paddingLeft, paddingBottom, paddingRight],
              duration: durationMilliseconds
            }
            map.getView().fit(extent, options);
          }
        }
      });
    },
    /// Bloccare la mappa all'estensione del layer
    'lockToExtent': function(
      paddingTop,
      paddingLeft,
      paddingBottom,
      paddingRight
    ){
      this.paddingTop = paddingTop;
      this.paddingLeft = paddingLeft;
      this.paddingBottom = paddingBottom;
      this.paddingRight = paddingRight;

      layerVector.getSource().once('change', function(evt) {
        if (layerVector.getSource().getState() === 'ready') {
          if (layerVector.getSource().getFeatures().length > 0) {
            const extent = layerVector.getSource().getExtent();
            const options = {
              size: map.getSize(),
              padding: [paddingTop, paddingLeft, paddingBottom, paddingRight],
            }
            map.getView().fit(extent, options);

            newView = new ol.View({
              extent: extent,
              showFullExtent: true,
              center: map.getView().getCenter(),
              zoom: map.getView().getZoom()
            });
            map.setView(newView);
          }
        }
      });
    },
    /// Genera un cluster vector
    'createCluster': function(
      clusterDistance,
      colorMaxCluster,
      colorMiddleCluster,
      colorMinCluster,
      colorUncluster,
      setStrokeColorCluster,
      setStrokeLineDashLengthCluster,
      setStrokeLineDashSpaceCluster,
      setStrokeWidthCluster,
      colorTextCluster,
      setMaxZoom,
      setMinZoom,
      setZIndex
    ){

      this.clusterDistance = clusterDistance;
      this.colorMaxCluster = colorMaxCluster;
      this.colorMiddleCluster = colorMiddleCluster;
      this.colorMinCluster = colorMinCluster;
      this.colorUncluster = colorUncluster;
      this.setStrokeColorCluster = setStrokeColorCluster;
      this.setStrokeLineDashLengthCluster = setStrokeLineDashLengthCluster;
      this.setStrokeLineDashSpaceCluster = setStrokeLineDashSpaceCluster;
      this.setStrokeWidthCluster = setStrokeWidthCluster;
      this.colorTextCluster = colorTextCluster;
      this.setMaxZoom = setMaxZoom;
      this.setMinZoom = setMinZoom;
      this.setZIndex = setZIndex;

      // Definizione dello stile
      let styleCache = {};
      function getStyle (feature, resolution) {
        let size = feature.get('features').length;
        let style = styleCache[size];

        if (!style) {
          let color = size>clusterDistance ? colorMaxCluster : size>clusterDistance/3 ? colorMiddleCluster : size>1 ? colorMinCluster : colorUncluster;
          let radius = Math.max(8, Math.min(size*1.5, 20));
          style = styleCache[size] = new ol.style.Style({
            image: new ol.style.Circle({
              radius: radius*1.5,
              stroke: new ol.style.Stroke({
                color: setStrokeColorCluster,
                width: setStrokeWidthCluster,
                lineDash: [setStrokeLineDashLengthCluster, setStrokeLineDashSpaceCluster],
              }),
              fill: new ol.style.Fill({
                color: color
              })
            }),
            text: new ol.style.Text({
              scale: radius/8,
              text: size.toString(),
              fill: new ol.style.Fill({
                color: colorTextCluster
              }),
              textAlign: 'center',
              textBaseline: 'middle'
            })
          });
        }
        return style;
      };

      // Cluster Vector
      layerVector = new ol.layer.Vector({
        title: vectorsLayerName,
        source: new ol.source.Cluster({
          source: new ol.source.Vector({
              url: urlAPI,
              format: new ol.format.GeoJSON(),
          }),
          distance: clusterDistance
        }),
        style: getStyle,
        minZoom: setMinZoom,
        maxZoom: setMaxZoom,
        zIndex: setZIndex
      });
      return layerVector;
    },
    /// Zoom-in sul singolo cluster
    'zoomOnCluster': function(
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

      map.on('singleclick', function(event) {
        const feature = map.forEachFeatureAtPixel(event.pixel, function(feature) {
            return feature;
        })
        if (feature) {
          const clusterSize = feature.get('features').length;
          if (clusterSize > 1) {
            const extent = ol.extent.createEmpty();
            feature.get('features').forEach(function(feature) {
              ol.extent.extend(extent, feature.getGeometry().getExtent());
            });
            const options = {
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
//////// 6 - Aggiunta WMS
let wmsLayer = function(layerName, wmsLayerPath) {

  this.layerName = layerName;
  this.wmsLayerPath = wmsLayerPath;

  let wms;
  let legendJSON;

  return {

    'createWMSLayer': function(
      wmslayerName,
      wmsLayerStyle,
      setMaxZoom,
      setMinZoom,
      setZIndex,
      setOpacity
    ) {
      this.wmslayerName = wmslayerName;
      this.wmsLayerStyle = wmsLayerStyle;
      this.setMaxZoom = setMaxZoom;
      this.setMinZoom = setMinZoom;
      this.setZIndex = setZIndex;
      this.setOpacity = setOpacity;

      wms = new ol.layer.Tile({
        title: layerName,
        source: new ol.source.TileWMS({
          url: wmsLayerPath,
          params: {
            'LAYERS': wmslayerName,
            'STYLES': wmsLayerStyle,
          }
        }),
        minZoom: setMinZoom,
        maxZoom: setMaxZoom,
        zIndex: setZIndex,
        opacity: setOpacity
      });
      return wms;
    },

  }
};
