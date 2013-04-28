      dojo.require("dijit.layout.BorderContainer");
      dojo.require("dijit.layout.ContentPane");
      dojo.require("esri.map");
      dojo.require("dijit.layout.AccordionContainer");
      dojo.require("esri.dijit.Bookmarks");      
     
      var map;
      function init() {
        var initialExtent = new esri.geometry.Extent({"xmin":-15949444,"ymin":2286770,"xmax":-6507942,"ymax":7374419,"spatialReference":{"wkid":102100}});
        map = new esri.Map("map", {
          extent: initialExtent
        });

        // Resize the map when the browser resizes
        dojo.connect(map, 'onLoad', function() {
          dojo.connect(dijit.byId('map'), 'resize', map, map.resize);
        });
        var url = "http://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer";
        var tiledLayer = new esri.layers.ArcGISTiledMapServiceLayer(url);
        map.addLayer(tiledLayer);

        // Create the bookmark widget
        // specify "editable" as true to enable editing
        var bookmark = new esri.dijit.Bookmarks({
          map: map,
          bookmarks: [],
          editable: true
        }, dojo.byId('bookmark'));

        // Add bookmarks to the widget
        var bookmarkCA = {
          "extent": {
            "spatialReference": {
                "wkid": 102100
            },
            "xmin":-14201669,
            "ymin":4642975,
            "xmax":-13021482,
            "ymax":5278931
          },
          "name": "Northern California"
        }
        var bookmarkPA = {
          "extent": {
            "spatialReference": {
              "wkid":102100
            },
            "xmin":-8669334,
            "ymin":4982379,
            "xmax":-8664724,
            "ymax":4984864
          },
          "name": "Central Pennsylvania"
        }
                bookmark.addBookmark(bookmarkCA);
                bookmark.addBookmark(bookmarkPA);
      }
