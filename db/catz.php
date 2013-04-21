<?php
header('Content-type: application/json');
require_once('connection.php'); 
  
	  
	   $q=$_GET["q"];
		
	 $query_search = "SELECT * FROM school WHERE category = '".$q."'";
	 //$query_search = "SELECT * FROM population WHERE province='EASTERN'";
	 $result = mysql_query($query_search)or die(mysql_error());
	 	 
      $return_arr= array();
	 while($row = mysql_fetch_array($result)){
   
		
			
			$row_array['namez']=$row['name'];
			$row_array['code']=$row['school_cod'];
			$row_array['Longitude']=$row['longg'];
			$row_array['Latitude']=$row['latt'];
			$row_array['addressz']=$row['address'];
			$row_array['gender']=$row['gender'];
			$row_array['dayz']=$row['day_or_boa'];
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
