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
