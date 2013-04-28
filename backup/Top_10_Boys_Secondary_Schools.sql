SELECT
  mean_score.school_code, 
  school.name,  
  mean_score.mean_score, 
  mean_score.year,
  ST_AsText(school.geom) as geom
FROM 
  public.mean_score, 
  public.school
WHERE 
  mean_score.school_code = school.school_code AND
  mean_score.year = '2010' AND 
  school.gender = 'BOYS ONLY'
ORDER BY
  mean_score.mean_score DESC
  limit 10;