      dojo.require("dijit.dijit"); // optimize: load dijit layer
      dojo.require("dijit.layout.BorderContainer");
      dojo.require("dijit.layout.ContentPane");
      dojo.require("esri.map");
      dojo.require("esri.dijit.BasemapGallery");
      dojo.require("dijit.Tooltip");
      dojo.require("dijit.form.Button");
      dojo.require("dijit.Menu");

      var map, basemapGallery;
      var bingKey = 'Enter your Bing Maps Key';
	  
      function init() {
        var initialExtent = new esri.geometry.Extent({
          "xmin": -1641867,
          "ymin": 2647172,
          "xmax": 3064207,
          "ymax": 4765395,
          "spatialReference": {
            "wkid": 102113
          }
        });
        map = new esri.Map("map", {
          extent: initialExtent
        });

        createBasemapGallery();
 
        dojo.connect(map, 'onLoad', function(map) {
          //resize the map when the browser resizes
          dojo.connect(dijit.byId('map'), 'resize', map,map.resize);
        });

      }
	  
      function createBasemapGallery(){
        //Manually create a list of basemaps to display
        var basemaps = [];
        var basemapRoad = new esri.dijit.Basemap({
          layers: [new esri.dijit.BasemapLayer({
            type: "BingMapsRoad"
          })],
          id: "bmRoad",
          title: "Road"
        });
        basemaps.push(basemapRoad);
        var basemapAerial = new esri.dijit.Basemap({
          layers: [new esri.dijit.BasemapLayer({
            type: "BingMapsAerial"
          })],
          id: "bmAerial",
          title: "Aerial"
        });
        basemaps.push(basemapAerial);
        var basemapHybrid = new esri.dijit.Basemap({
          layers: [new esri.dijit.BasemapLayer({
            type: "BingMapsHybrid"
          })],
          id: "bmHybrid",
          title: "Aerial with labels"
        });
        basemaps.push(basemapHybrid);


        basemapGallery = new esri.dijit.BasemapGallery({
          showArcGISBasemaps: false,
          basemaps: basemaps,
          bingMapsKey: bingKey,
          map: map
        });
        
        //BasemapGallery.startup isn't needed because we aren't using the default basemap, instead
        //we are going to create a custom user interface to display the basemaps, in this case a menu.
        dojo.forEach(basemapGallery.basemaps, function(basemap) {            
          //Add a menu item for each basemap, when the menu items are selected
          dijit.byId("bingMenu").addChild(new dijit.MenuItem({
            label: basemap.title,
            onClick: dojo.hitch(this, function() {
              this.basemapGallery.select(basemap.id);
            })
          }));
          
        });
      }