<?xml version="1.0" encoding="ISO-8859-1"?>
<StyledLayerDescriptor version="1.0.0" 
    xsi:schemaLocation="http://www.opengis.net/sld StyledLayerDescriptor.xsd" 
    xmlns="http://www.opengis.net/sld" 
    xmlns:ogc="http://www.opengis.net/ogc" 
    xmlns:xlink="http://www.w3.org/1999/xlink" 
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">
  <NamedLayer>
    <Name>Polygon with default label</Name>
    <UserStyle>
      <Title>SLD Cook Book: Polygon with default label</Title>
      <FeatureTypeStyle>
        <Rule>
		  <Name><![CDATA[Division]]></Name>
		  <Title><![CDATA[Division]]></Title>
		  <!-- CssParameters allowed are fill (the color) and fill-opacity 
		  
			  <MinScaleDenominator>577790</MinScaleDenominator>
			  <MaxScaleDenominator>1155582</MaxScaleDenominator>   
			   
		  -->  
		      
          <PolygonSymbolizer>
            <Fill>
              <CssParameter name="fill">#ffeabe</CssParameter>
              <CssParameter name="fill-opacity">0.4</CssParameter>
            </Fill>
            <Stroke>
              <CssParameter name="stroke">#000000</CssParameter>
              <CssParameter name="stroke-width">0.5</CssParameter>
              <CssParameter name="stroke-opacity" >1</CssParameter>
            </Stroke>
          </PolygonSymbolizer>        
          <TextSymbolizer>
            <Label>
              <ogc:PropertyName><![CDATA[DIVISION]]></ogc:PropertyName>
            </Label> 
            <Font>
            	<CssParameter name="font-family">Arial</CssParameter>
            	<CssParameter name="font-size">8</CssParameter>
            	<CssParameter name="font-style">normal</CssParameter>
            	<CssParameter name="font-weight">bold</CssParameter>
            </Font>
         	<LabelPlacement>
           		<PointPlacement>
             		<AnchorPoint>
               			<AnchorPointX>0.5</AnchorPointX>
               			<AnchorPointY>0.5</AnchorPointY>
             		</AnchorPoint>
           		</PointPlacement>
         	</LabelPlacement>
         	<Fill>
           		<CssParameter name="fill">#000000</CssParameter>
         	</Fill>
         	<VendorOption name="autoWrap">60</VendorOption>
         	<VendorOption name="maxDisplacement">150</VendorOption>           
          </TextSymbolizer>
        </Rule>
      </FeatureTypeStyle>
    </UserStyle>
  </NamedLayer>
</StyledLayerDescriptor>