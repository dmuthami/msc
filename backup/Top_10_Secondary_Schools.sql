SELECT 
   mean_score.school_code AS school_cod,
   c.name,  
   c.address, 
   c.gender, 
   c.latt, 
   c.longg, 
   c.day_or_boarding AS day_or_bo, 
   mean_score.mean_score, 
   mean_score.year,
   ST_AsText(c.geom) as geom
 FROM 
   public.mean_score, 
   (select
          a.*,
          b.sponsor
  from	

          school as a inner join sponsor as b
  on
          a.sponsor_id = b.sponsor_id

  ) 
  as c   
 WHERE 
   mean_score.school_code = c.school_code AND
   mean_score.year = '2010'
 ORDER BY
   mean_score.mean_score DESC
   limit '10';