dojo.require("dijit.dijit"); // optimize: load dijit layer
dojo.require("dijit.layout.BorderContainer");
dojo.require("dijit.layout.ContentPane");
dojo.require("esri.map");
dojo.require("esri.virtualearth.VETiledLayer");
dojo.require("dijit.TitlePane");
dojo.require("esri.dijit.BasemapGallery");
dojo.require("esri.arcgis.utils");
dojo.require("agsjs.layers.GoogleMapsLayer");

var map = null;


function init() {
	
    //configure map zoom rectangle fill by setting style by calling esri.symbol.SimpleFillSymbol.toJson()
    var zoomSymbol = new esri.symbol.SimpleFillSymbol(esri.symbol.SimpleFillSymbol.STYLE_SOLID, new esri.symbol.SimpleLineSymbol(esri.symbol.SimpleLineSymbol.STYLE_DASHDOT, new dojo.Color([0,0,255]), 2), new dojo.Color([255,255,0,0.5]));
    esri.config.defaults.map.zoomSymbol = zoomSymbol.toJson();
    
	var initExtent = new esri.geometry.Extent({"xmin":-19352632.56934903,"ymin":-8834897.47731153,"xmax":20017940.46354308,"ymax":11593968.450292524,"spatialReference":{"wkid":102100}});
	
	//create a popup to replace the map's info window
	
	map = new esri.Map("map", {
	extent: initExtent,
	});
	
	//var basemap = new esri.layers.ArcGISTiledMapServiceLayer("http://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer");
	//map.addLayer(basemap);
	
	createBasemapGallery();
}


function createBasemapGallery() {
//add the basemap gallery, in this case we'll display maps from ArcGIS.com including bing maps
var basemapGallery = new esri.dijit.BasemapGallery({
 showArcGISBasemaps: true,
                //bingMapsKey: 'Ah29HpXlpKwqVbjHzm6mlwMwgw69CYjaMIiW_YOdfTEMFvMr5SNiltLpYAcIocsi',
                toggleReference: true,
                googleMapsApi: {
                  v: '3.6' // use a specific version is recommended for production system.
                },
                map: map
              }, "basemapGallery");

basemapGallery.startup();

dojo.connect(basemapGallery, "onError", function(msg) {console.log(msg)});
}