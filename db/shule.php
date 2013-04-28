<?php
header('Content-type: application/json');
require_once('connection.php'); 
  
	  
	   $q=$_GET["q"];
		
	 $query_search = "SELECT * FROM shule ";//WHERE category = ".$q."";
	 //$query_search = "SELECT * FROM population WHERE province='EASTERN'";
	 $result = mysql_query($query_search)or die(mysql_error());
	 	 
      $return_arr= array();
	 while($row = mysql_fetch_array($result)){
   
		
			
			$row_array['name']=$row['CSO_Name'];
			$row_array['locality']=$row['Locality'];
			$row_array['Longitude']=$row['latt'];
			$row_array['Latitude']=$row['longg'];
			$row_array['mail']=$row['Email'];
			$row_array['box']=$row['MailAddress'];
			$row_array['simu']=$row[''];
			$row_array['street']=$row['Street'];
			$row_array['building']=$row['Building'];
			$row_array['site']=$row['Website'];
			$row_array['tarehe']=$row['Date'];
			$row_array['res']=$row['Respondent'];
			$row_array['regn']=$row['RegistrationNum'];
			$row_array['fone']=$row['Telephone'];
			$row_array['typo']=$row['CSOTypeName'];
			
			 array_push($return_arr,$row_array);
			
			 }
			 
			 
 echo json_encode($return_arr); 
     
	 

	 
?>