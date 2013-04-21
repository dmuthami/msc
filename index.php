<!DOCTYPE HTML>
<?php
//load php file that stores and connects to the mysql database
include('db/connection.php');

$q = $_GET["q"];
$y = $_GET["y"];
?>
<html> 
    <head> 
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=7,IE=9" />
        <!--The viewport meta tag is used to improve the presentation and behavior of the samples 
          on iOS devices-->
        <meta name="viewport" content="initial-scale=1, maximum-scale=1,user-scalable=no"/>
        <meta http-equiv="cache-control" content="no-cache">
        <meta http-equiv="pragma" content="no-cache">
        <meta http-equiv="expires" content="0">
        <title> 
        </title> 

        <!-- Style element goes here -->
        <link rel="stylesheet" type="text/css" href="http://serverapi.arcgisonline.com/jsapi/arcgis/3.0/js/dojo/dijit/themes/claro/claro.css">    
        <link rel="stylesheet" type="text/css" href="css/layout.css">
        <link rel="stylesheet" type="text/css" href="css/jah.css">
        
        <!-- ArcGIS Javascript Stylesheets -->    
        <link rel="stylesheet" type="text/css" href="http://serverapi.arcgisonline.com/jsapi/arcgis/2.5/js/esri/dijit/css/Popup.css"/>
        <link rel="stylesheet" type="text/css" href="http://serverapi.arcgisonline.com/jsapi/arcgis/2.0/js/dojo/dojox/grid/resources/Grid.css">
        <link rel="stylesheet" type="text/css" href="http://serverapi.arcgisonline.com/jsapi/arcgis/2.0/js/dojo/dojox/grid/resources/tundraGrid.css">
        <link rel="stylesheet" type="text/css" href="http://serverapi.arcgisonline.com/jsapi/arcgis/2.5/js/dojo/dijit/themes/claro/claro.css">

        <!-- Script ensures integration of Google Maps and 
            ArcGIS Javascrpt API--> 
        <script type="text/javascript"> 
            var djConfig = {
                parseOnLoad: true,
                baseUrl: './',
                modulePaths: {
                    // if use local copy, make sure the path reference is relative to 'baseUrl', e.g.:
                    //'agsjs': '../build/agsjs'
                    // use absolute path for online version. Note sometimes googlecode.com can be slow.
                    'agsjs': 'http://gmaps-utility-gis.googlecode.com/svn/tags/agsjs/1.07/build/agsjs'
                }		
            };
        </script> 

        <!-- ArcGIS Javascript API's -->	
        <!--<script type="text/javascript" src="http://serverapi.arcgisonline.com/jsapi/arcgis/?v=3.1"></script> -->
        <script type="text/javascript" src="http://serverapi.arcgisonline.com/jsapi/arcgis/?v=2.5"></script>


        <!-- Load external scripts -->
        <script type="text/javascript" src="js/csoMap.js"></script>		
        <script type="text/javascript" src="js/csoWin.js"></script>
        <script type="text/javascript" src="js/csoSearch.js"></script>
        <script type="text/javascript" src="js/jah.js"></script>	

        <!-- Load jQuery and jQuery UI via Google AJAX Libraries API-->
        <link rel="stylesheet" href="js/themes/base/jquery.ui.all.css">
        <script src="js/jquery-1.7.2.js"></script>
        <script src="js/ui/jquery.ui.core.js"></script>
        <script src="js/ui/jquery.ui.widget.js"></script>
        <script src="js/ui/jquery.ui.mouse.js"></script>
        <script src="js/ui/jquery.ui.sortable.js"></script>
        <script src="js/ui/jquery.ui.accordion.js"></script>
        <script src="js/ui/jquery.ui.button.js"></script>
        <script src="js/ui/jquery.ui.draggable.js"></script>
        <script src="js/ui/jquery.ui.position.js"></script>
        <script src="js/ui/jquery.ui.resizable.js"></script>
        <script src="js/ui/jquery.ui.dialog.js"></script>

        <!-- Reference highcharts-->
        <script src="http://code.highcharts.com/highcharts.js"></script>
        <script src="http://code.highcharts.com/modules/exporting.js"></script>

        <!-- Load dojo libraries-->
        <script type="text/javascript"> 
            dojo.require("dijit.dijit"); // optimize: load dijit layer
            dojo.require("dijit.layout.BorderContainer");
            dojo.require("dijit.layout.ContentPane");
            dojo.require("esri.map");
            dojo.require("esri.virtualearth.VETiledLayer");
            dojo.require("dijit.TitlePane");
            dojo.require("esri.dijit.BasemapGallery");
            dojo.require("esri.arcgis.utils");
            dojo.require("agsjs.layers.GoogleMapsLayer");	
            dojo.require("esri.layers.FeatureLayer");
		
            //Required for WMS support
            dojo.require("dijit.layout.AccordionContainer");
            dojo.require("esri.geometry");
            dojo.require("esri.layers.wms");

            //show map on load 
            dojo.addOnLoad(initBaseMap);
        </script> 

        <!-- Accordion script -->
        <script>
            /*
             * Function for handling the accordion
             */
            $(function() {
                /*
                 * icons code goes here
                 */
                var icons = {
                    header: "ui-icon-circle-arrow-e",
                    activeHeader: "ui-icon-circle-arrow-s"
                };
               
                /*
                 * Formating code goes here for the accordion
                 */
                $( "#accordion" )
                .accordion({
                    header: "> div > h3",
                    icons: icons
                })
                .sortable({
                    axis: "y",
                    handle: "h3",
                    stop: function( event, ui ) {
                        // IE doesn't register the blur when sorting
                        // so trigger focus out handlers to remove .ui-state-focus
                        ui.item.children( "h3" ).triggerHandler( "focusout" );
                    }
                });
            });
        </script>

        <script type="text/javascript">
            /*
             * This fuction checks if the menu containing options for the charts are open
             * or closed and does exactly the opposed
             * 
             * Switch basemaps also is handled here
             */
            $(function() {
                $(".btmiddle").click(function() {
                    if ($(".btmiddle").hasClass("bt")) {
                        //menu is closed and requires showing or opening
                        $(".btmiddle").removeClass("bt");
                        $(".btmiddle").addClass("clicked");
                        $("#menu").show();
                    } else {
                        //menu is closed and requires hiding or closing
                        $(".btmiddle").removeClass("clicked");
                        $(".btmiddle").addClass("bt");
                        $("#menu").hide();
                    }
                });
            });

            /*
             * This fuction checks if the advanced query div is open or closed
             * 
             */
            $(function() {
                $(".btmiddle1").click(function() {
                    if ($(".btmiddle1").hasClass("bt")) {
                        $(".btmiddle1").removeClass("bt");
                        $(".btmiddle1").addClass("clicked");
                        $("#filterz").show();
                    } else {
                        $(".btmiddle1").removeClass("clicked");
                        $(".btmiddle1").addClass("bt");
                        $("#filterz").hide();
                    }
                });
            });
            
            /*
             * This fuction checks if the switch base maps containing options for the maps
             * 
             */
            $(function() {
                $(".btright").click(function() {
                    if ($(".btright").hasClass("bt")) {
                        $(".btright").removeClass("bt");
                        $(".btright").addClass("clicked");
                        $("#gallery").show();
                    } else {
                        $(".btright").removeClass("clicked");
                        $(".btright").addClass("bt");
                        $("#gallery").hide();
                    }
                });
            });
        </script>
        
        <script>
            
            // increase the default animation speed to exaggerate the effect
            $.fx.speeds._default = 1000;
            $(function() {
                //set properties of the dialog box
                $( "#dialog" ).dialog({
                    autoOpen: false,
                    show: "blind",
                    hide: "explode"
                });
                //show dialog box
                $( "#fungua" ).click(function() {
                    $( "#dialog" ).dialog( "open" );
                    return false;
                });
            });
        </script>

        <!--
            Code below pulls out the div elements that show the charts
        -->
        <script>
            jQuery(function($) {
                $('a.panel').click(function() {
                    var $target = $($(this).attr('href')),
                    $other = $target.siblings('.active'),
                    animIn = function () {
                        $target.addClass('active').show().css({
                            left: -($target.width())
                        }).animate({
                            left: 0
                        }, 500);
                    };
        
                    if (!$target.hasClass('active') && $other.length > 0) {
                        $other.each(function(index, self) {
                            var $this = $(this);
                            $this.removeClass('active').animate({
                                left: -$this.width()
                            }, 500, animIn);
                        });
                    } else if (!$target.hasClass('active')) {
                        animIn();
                    }
                });

            });
        </script>


        <!--
        fixes or styles the div element for the charts
        -->
        <style>
            div.panel {
                position: absolute;
                width: 450px;
                height: 400px;
                display: none;
            }
        </style>

        <!--
            Server side code required during inittialization process
            After pulling all libraries from jquery thats when this maps should be loaded
        -->
        <?php
        include('db/grades.php');
        include('db/gender.php');
        include('db/catez.php');
        include('db/line_grades.php');
        ?> 
    </head> 
    <body class="claro"> 
        <!-- Map area-->  
        <div id="base" dojotype="dijit.layout.BorderContainer" design="headline" gutters="false" style="width:100%;height:100%;margin:0;">

            <div id="map" dojotype="dijit.layout.ContentPane" addarcgisbasemaps="true" region="center" style="border:1px solid #000;padding:0;">

                <!-- The box containing contents for 
                    search
                    Reports
                    Share This
                    Switch Base Maps
                -->
		  <div id="box"  style="position:absolute; right:30%;  z-Index:999;">
                    <input type="text" name="searchz" id="searchz">
                        <a href="javascript: searchz();" class="bt btleft">Search<span id="fungua"><img src="img/16table.png"/>&#9734; </span></a>
                    <a href="#" class="bt btmiddle">Reports <span>&#9660;</span></a>
                    <a href="#" class="bt btmiddle1">Filter <span>&#9660;</span></a>
                    <a href="#" class="bt btright">Switch Basemap <span>&#9660;</span></a>
                </div>

                <!--
                    Advanced query session goes here
                -->                
         
                <!-- Section Drop down combo box for select constituency-->
                <div id="filterz" style="position:absolute; left:8%; top:15%; z-Index:999;">
                     <!-- Section for select constituencncy-->                   
                    <select name="zote_a" id="zote_a" onchange="zote()">
                        <!-- Value is null so that when user selects this option
                            a null value is passed as argument thereby returning all records
                            for constituency-->
                        <option value="">Select Constituency</option>
                        <!-- Subsequent options populated from the database through php-->
                        <?php
                            $query2 = "SELECT DISTINCT constituen FROM `grades`;";
                            $result2 = mysql_query($query2);
                            /*
                             * create combo box for webform for constituencies
                             * create options
                             */
                            while ($row2 = mysql_fetch_array($result2)) {
                        ?>
                                <font face="verdana" size ="0.5" color="green">
                                    <option value="<?php echo $row2[0]; ?>">
                                        <?php echo $row2[0]; ?> 
                                    </option>
                                </font>
                                <?php
                            }
                                ?>
                    </select>

                    <!-- Section for select category of school-->
                    <select name="zote_b" id="zote_b" onchange="zote()">
                        <!-- Value is null so that when user selects this option
                            a null value is passed as argument thereby returning all records
                            for category-->
                        <option value="">Select Category</option>
                        <?php
                            $query = "SELECT DISTINCT category FROM `school`;";
                            $result = mysql_query($query);
                            /*
                             * create combo box for webform for constituencies
                             * create options
                             */
                            while ($row = mysql_fetch_array($result)) {
                        ?>
                                <font face="verdana" size ="0.5" color="green">
                                    <option value="<?php echo $row[0]; ?>">
                                        <?php echo $row[0]; ?></a> 
                                    </option>
                                </font>
                                <?php
                            }
                                ?>
                    </select>

                    <!-- Section for select category of boarding or day school-->
                    <select name="zote_c" id="zote_c" onchange="zote()" >
                        <!-- Value is null so that when user selects this option
                            a null value is passed as argument thereby returning all records
                            for day or boarding-->
                        <option value="">Select Day/Boarding</option>
                        <?php
                        $query2 = "SELECT DISTINCT day_or_boa FROM `school`;";
                        $result2 = mysql_query($query2);
                            /*
                             * create combo box for webform for day or boarding
                             * create options
                             */
                        while ($row2 = mysql_fetch_array($result2)) {
                            ?>
                            <font face="verdana" size ="0.5" color="green">
                                <option value="<?php echo $row2[0]; ?>">
                                    <?php echo $row2[0]; ?> 
                                </option>
                            </font>
                            <?php
                        }
                            ?>
                    </select>

                    <!-- Section for select gender-->
                    <select name="zote_d" id="zote_d" onchange="zote()">
                        <!-- Value is null so that when user selects this option
                            a null value is passed as argument thereby returning all records
                            for  gender-->
                        <option value="">Select Gender</option>
                        <?php
                            $query2 = "SELECT DISTINCT gender FROM `school`;";
                            $result2 = mysql_query($query2);
                            /*
                             * create combo box for webform for day or boarding
                             * create options
                             */
                            while ($row2 = mysql_fetch_array($result2)) {
                        ?>
                                <font face="verdana" size ="0.5" color="green">
                                    <option value="<?php echo $row2[0]; ?>">
                                        <?php echo $row2[0];?> 
                                    </option>
                                </font>
                                <?php
                            }
                                ?>
                    </select>
                    
                    <!-- Section for select special or ordinary-->
                    <select name="zote_e" id="zote_e" onchange="zote()" >
                        <!-- Value is null so that when user selects this option
                            a null value is passed as argument thereby returning all records
                            for ordinary or special-->
                        <option value="">Select special/ordinary</option>
                        <?php
                            $query2 = "SELECT DISTINCT ordinary_o FROM `school`;";
                            $result2 = mysql_query($query2);
                            /*
                             * create combo box for webform for ordinary or special
                             * create options
                             */
                        while ($row2 = mysql_fetch_array($result2)) {
                            ?>
                            <font face="verdana" size ="0.5" color="green">
                            <option value="<?php echo $row2[0]; ?>"><?php echo $row2[0]; ?> </option>
                            </font>
                            <?php
                        }
                        ?>
                    </select>

                    <!-- Section for select sponsor-->
                    <select name="zote_f" id="zote_f" onchange="zote()>
                        <!-- Value is null so that when user selects this option
                            a null value is passed as argument thereby returning all records
                            for sponsor-->
                        <option value="">Select Sponsor</option>
                        <?php
                            $query2 = "SELECT DISTINCT sponsor FROM `shule`;";
                            $result2 = mysql_query($query2);
                            /*
                             * create combo box for webform for sponsor
                             * create options
                             */
                            while ($row2 = mysql_fetch_array($result2)) {
                                ?>
                                <font face="verdana" size ="0.5" color="green">
                                    <option value="<?php echo $row2[0]; ?>">
                                        <?php echo $row2[0]; ?> 
                                    </option>
                                </font>
                                <?php
                            }
                                ?>
                    </select>
 
                </div>                              

                <!--
                Div element that is displayed when you click Reports
                Click provided links to display charts for 
                    gender
                    sponsor
                    category & 
                    grades
                -->
                <div id="menu" style="position:absolute; left:40%; top:15%; z-Index:999;">
                    <div id="triangle"></div>
                    <div id="tooltip_menu">

                        <a href="#m_gender" class="panel">

                            Gender
                        </a>
                        <a href="#m_sponsor" class="panel">

                            Sponsor
                        </a>
                        <a href="#m_categories" class="panel">

                            Category
                        </a>
                        <a href="#m_grade" class="panel">

                            Grades
                        </a>
                    </div>
                </div>

                <!--
					!!!!!!!!!!!!This is to be removed!!!!!!!!!!!!!!!!
                -->				
                <div id="gallery" dojoType="dijit.layout.ContentPane" style="position:absolute; width:55%; top:20%; left:20%; height:auto; z-Index:999; overflow:auto;">
                    <div id="basemapGallery" >
					</div>
				</div>

                <!--
                 Div element that displays the filters 
                     Filter By Category
                     Filter By Constituency
                     Filter By Gender
                     Filter By Sponsor 
                     Filter By Boarding
                     Filter By Grades
                -->

                <div style="position:absolute; right:10px; top:10px; z-Index:999;">
                    <div id="accordion" STYLE="font-family: Arial Black; width:auto; font-size: 10px; color: black">
                    <!-- Section for filter by category-->
                        <div class="group">
                            <h3><a href="#">Filter By Category</a></h3>
                            <div>
                                <form>
                                    <!-- 
                                        On change function calls jin_ajax_loop() 
                                    -->
                                    <select name="typo" id="typo" onchange="jin_ajax_loop()">
                                        <option value="">Select Category</option>
                                        <?php
                                        $query = "SELECT DISTINCT category FROM `school`;";
                                        $result = mysql_query($query);


                                        while ($row = mysql_fetch_array($result)) {
                                            ?>
                                            <font face="verdana" size ="0.5" color="green">
                                            <option value="<?php echo $row[0]; ?>"><?php echo $row[0]; ?></a> </option>
                                            </font>
                                            <?php
                                        }
                                        ?>
                                    </select>

                                </form>
                            </div>
                        </div>
                    <!-- Section for filter by constituency-->
                        <div class="group">
                            <h3><a href="#">Filter By Constituency</a></h3>
                            <div>

                                <select name="sectac" id="sectac" onchange="sectac()">
                                    <option value="">Select Constituency</option>
                                    <?php
                                    $query2 = "SELECT DISTINCT constituen FROM `grades`;";
                                    $result2 = mysql_query($query2);

                                    //create combo box for webform
                                    while ($row2 = mysql_fetch_array($result2)) {
                                        ?>

                                        <font face="verdana" size ="0.5" color="green">
                                        <option value="<?php echo $row2[0]; ?>">
                                            <?php echo $row2[0]; ?> </option>
                                        </font>
                                        <?php
                                    }
                                    ?>
                                </select>
                            </div>
                        </div>
                    <!-- Section for filter by gender-->
                        <div class="group">
                            <h3><a href="#gender">Filter By Gender</a></h3>
                            <div>
                                <select name="secta" id="secta" onchange="secta()">
                                    <option value="">Select Gender</option>
                                    <?php
                                    $query2 = "SELECT DISTINCT gender FROM `school`;";
                                    $result2 = mysql_query($query2);


//create combo box for webform
                                    while ($row2 = mysql_fetch_array($result2)) {
                                        ?>

                                        <font face="verdana" size ="0.5" color="green">
                                        <option value="<?php echo $row2[0]; ?>"><?php echo $row2[0]; ?> </option>
                                        </font>
                                        <?php
                                    }
                                    ?>
                                </select>
                            </div>
                        </div>
                    <!-- Section for filter by sponsor-->
                        <div class="group">
                            <h3><a href="#">Filter By Sponsor</a></h3>
                            <div>
                                <select name="sectax" id="sectax" onchange="sectax()">
                                    <option value="">Select ...</option>
                                    <?php
                                    $query2 = "SELECT DISTINCT sponsor FROM `shule`;";
                                    $result2 = mysql_query($query2);

                                    while ($row2 = mysql_fetch_array($result2)) {
                                        ?>

                                        <font face="verdana" size ="0.5" color="green">
                                        <option value="<?php echo $row2[0]; ?>"><?php echo $row2[0]; ?> </option>
                                        </font>
                                        <?php
                                    }
                                    ?>
                                </select>
                            </div>
                        </div>
                    <!-- Section for filter by boarding-->
                        <div class="group">
                            <h3><a href="#">Filter By Boarding</a></h3>
                            <div>
                                <select name="sectaz" id="sectaz" onchange="sectaz()">
                                    <option value="">Select ...</option>
                                    <?php
                                    $query2 = "SELECT DISTINCT day_or_boa FROM `school`;";
                                    $result2 = mysql_query($query2);


//create combo box for webform
                                    while ($row2 = mysql_fetch_array($result2)) {
                                        ?>

                                        <font face="verdana" size ="0.5" color="green">
                                        <option value="<?php echo $row2[0]; ?>"><?php echo $row2[0]; ?> </option>
                                        </font>
                                        <?php
                                    }
                                    ?>
                                </select>
                            </div>
                        </div>	
                    <!-- Section for filter by grades-->
                        <div class="group">
                            <h3><a href="#"><b>Filter By Grades</b></a></h3>
                            <div>
                                <select name="sectag" id="sectag" >
                                    <option value="">Select Grade</option>
                                    <?php
                                    $query2 = "SELECT DISTINCT grade_attained FROM `grades` ORDER BY grade_attained ASC;";
                                    $result2 = mysql_query($query2);


//create combo box for webform
                                    while ($row2 = mysql_fetch_array($result2)) {
                                        ?>

                                        <font face="verdana" size ="0.5" color="green">
                                        <option value="<?php echo $row2[0]; ?>"><?php echo $row2[0]; ?> </option>
                                        </font>
                                        <?php
                                    }
                                    ?>
                                </select>
                                <select name="sectay" id="sectay" onchange="sectag()">
                                    <option value="">Select Year</option>
                                    <?php
                                    $query2 = "SELECT DISTINCT `year` FROM `grades` ORDER BY `year` ASC;";
                                    $result2 = mysql_query($query2);


//create combo box for webform
                                    while ($row2 = mysql_fetch_array($result2)) {
                                        ?>

                                        <font face="verdana" size ="0.5" color="green">
                                        <option value="<?php echo $row2[0]; ?>"><?php echo $row2[0]; ?> </option>
                                        </font>
                                        <?php
                                    }
                                    ?>
                                </select>
                            </div>
                        </div>	
                    </div>
                </div>
            </div>
        </div>
    </div>

    <!-- Div elements for the charts-->
    <div id="right" style="position:absolute; left:10px; bottom:30px; z-Index:999;
         margin: 0 5px 0 0;
         border: 0px solid black;
         width: 450px;
         height: 400px;
         overflow: hidden;">
        <div class="panel" id="m_gender" style="background:none" style="">Gender<br></div>
        <div class="panel" id="m_sponsor" style="background:none">Sponsor</div>
        <div class="panel" id="m_categories" style="background:none">Category</div>
        <div class="panel" id="m_grade" style="background:none">Grades</div>
    </div>

    <!--
            Div element that displays a table
            populated by php
    -->
    <div class="demo">
        <div id="dialog" title="Search Results">
            <table id ="stud_tbl"  align="center">
            </table id ="all_stud_tbl" > 
        </div>
    </div>

</body> 

</html>
