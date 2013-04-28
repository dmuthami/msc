
-- DROP TABLE constituency;

CREATE TABLE constituency
(
  gid serial NOT NULL,
  objectid_1 integer,
  objectid integer,
  area numeric,
  objectid_2 integer,
  objectid_3 integer,
  county_nam character varying(80),
  const_code numeric,
  constituen character varying(80),
  county_ass numeric,
  county_a_1 character varying(80),
  county_cod numeric,
  latt numeric,
  longg numeric,
  distance numeric,
  shape_leng numeric,
  shape_area numeric,
  geom geometry(MultiPolygon,4326),
  CONSTRAINT constituency_pkey PRIMARY KEY (gid)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE constituency
  OWNER TO postgres;

-- Index: constituency_geom_gist

-- DROP INDEX constituency_geom_gist;

CREATE INDEX constituency_geom_gist
  ON constituency
  USING gist
  (geom);


-- Table: counties

-- DROP TABLE counties;

CREATE TABLE counties
(
  gid serial NOT NULL,
  county_nam character varying(80),
  geom geometry(MultiPolygon,4326),
  CONSTRAINT counties_pkey PRIMARY KEY (gid)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE counties
  OWNER TO postgres;

-- Index: counties_geom_gist

-- DROP INDEX counties_geom_gist;

CREATE INDEX counties_geom_gist
  ON counties
  USING gist
  (geom);

-- Table: facilities

-- DROP TABLE facilities;

CREATE TABLE facilities
(
  facilities_id serial NOT NULL,
  photo_number character varying(15),
  school_code character varying(15),
  description character varying,
  CONSTRAINT facilities_pkey PRIMARY KEY (facilities_id),
  CONSTRAINT facilities_school_code_fkey2 FOREIGN KEY (school_code)
      REFERENCES school (school_code) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT facilities_facilities_id_key UNIQUE (facilities_id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE facilities
  OWNER TO postgres;

-- Index: fki_facilities_school_code_fkey

-- DROP INDEX fki_facilities_school_code_fkey;

CREATE INDEX fki_facilities_school_code_fkey
  ON facilities
  USING btree
  (school_code COLLATE pg_catalog."default");

-- Index: fki_facilities_school_code_fkey2

-- DROP INDEX fki_facilities_school_code_fkey2;

CREATE INDEX fki_facilities_school_code_fkey2
  ON facilities
  USING btree
  (school_code COLLATE pg_catalog."default");


-- Table: feedback

-- DROP TABLE feedback;

CREATE TABLE feedback
(
  fedback_id serial NOT NULL,
  school_code character varying(15),
  description character varying,
  contact character varying(50),
  name character varying(25),
  CONSTRAINT feedback_pkey PRIMARY KEY (fedback_id),
  CONSTRAINT feedback_school_code_fkey2 FOREIGN KEY (school_code)
      REFERENCES school (school_code) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT feedback_fedback_id_key UNIQUE (fedback_id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE feedback
  OWNER TO postgres;

-- Index: fki_feedback_school_code_fkey

-- DROP INDEX fki_feedback_school_code_fkey;

CREATE INDEX fki_feedback_school_code_fkey
  ON feedback
  USING btree
  (school_code COLLATE pg_catalog."default");

-- Index: fki_feedback_school_code_fkey2

-- DROP INDEX fki_feedback_school_code_fkey2;

CREATE INDEX fki_feedback_school_code_fkey2
  ON feedback
  USING btree
  (school_code COLLATE pg_catalog."default");

-- Table: grade

-- DROP TABLE grade;

CREATE TABLE grade
(
  grade_id serial NOT NULL,
  school_code character varying(15),
  year character varying(4),
  gender character varying(1),
  grade_attained character varying(2),
  mean_grade smallint,
  frequency smallint,
  CONSTRAINT grade_pkey PRIMARY KEY (grade_id),
  CONSTRAINT grade_school_code_fkey2 FOREIGN KEY (school_code)
      REFERENCES school (school_code) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT grade_grade_id_key UNIQUE (grade_id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE grade
  OWNER TO postgres;

-- Index: fki_grade_school_code_fkey

-- DROP INDEX fki_grade_school_code_fkey;

CREATE INDEX fki_grade_school_code_fkey
  ON grade
  USING btree
  (school_code COLLATE pg_catalog."default");

-- Index: fki_grade_school_code_fkey2

-- DROP INDEX fki_grade_school_code_fkey2;

CREATE INDEX fki_grade_school_code_fkey2
  ON grade
  USING btree
  (school_code COLLATE pg_catalog."default");

-- Table: mean_score

-- DROP TABLE mean_score;

CREATE TABLE mean_score
(
  mean_score_id serial NOT NULL,
  year character varying(4),
  mean_score double precision,
  school_code character varying(15),
  CONSTRAINT mean_score_pkey PRIMARY KEY (mean_score_id),
  CONSTRAINT mean_score_school_code_fkey2 FOREIGN KEY (school_code)
      REFERENCES school (school_code) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT mean_score_mean_score_id_key UNIQUE (mean_score_id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE mean_score
  OWNER TO postgres;

-- Index: fki_mean_score_school_code_fkey2

-- DROP INDEX fki_mean_score_school_code_fkey2;

CREATE INDEX fki_mean_score_school_code_fkey2
  ON mean_score
  USING btree
  (school_code COLLATE pg_catalog."default");

-- Index: fki_school_code_fkey

-- DROP INDEX fki_school_code_fkey;

CREATE INDEX fki_school_code_fkey
  ON mean_score
  USING btree
  (school_code COLLATE pg_catalog."default");

-- Table: nairobi_county

-- DROP TABLE nairobi_county;

CREATE TABLE nairobi_county
(
  gid serial NOT NULL,
  county_nam character varying(80),
  geom geometry(MultiPolygon,4326),
  CONSTRAINT nairobi_county_pkey PRIMARY KEY (gid)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE nairobi_county
  OWNER TO postgres;

-- Index: nairobi_county_geom_gist

-- DROP INDEX nairobi_county_geom_gist;

CREATE INDEX nairobi_county_geom_gist
  ON nairobi_county
  USING gist
  (geom);

-- Table: school

-- DROP TABLE school;

CREATE TABLE school
(
  gid serial NOT NULL,
  school_code character varying(15) NOT NULL,
  name character varying(50),
  address character varying(50),
  category character varying(15),
  sponsor_id smallint,
  gender character varying(25),
  day_or_boarding character varying(25),
  ordinary_or_special character varying(25),
  enrollment smallint,
  teaching_staff smallint,
  pupil_teacher_ratio numeric,
  tsc_male_teachers smallint,
  tsc_female_teachers smallint,
  local_authority_male_teachers smallint,
  local_authority_female_teachers smallint,
  pta_board_male_teachers smallint,
  pta_board_female_teachers smallint,
  other_male smallint,
  other_female smallint,
  non_teaching_staff_male smallint,
  non_teaching_staff_female smallint,
  acreage double precision,
  latt double precision,
  longg double precision,
  district character varying(25),
  division character varying(25),
  location character varying(25),
  sublocation character varying(50),
  zone character varying(25),
  constituency character varying(25),
  province character varying(25),
  geom geometry(Point,4326),
  CONSTRAINT school_pkey PRIMARY KEY (gid),
  CONSTRAINT school_school_code_key UNIQUE (school_code)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE school
  OWNER TO postgres;

-- Index: school_geom_gist

-- DROP INDEX school_geom_gist;

CREATE INDEX school_geom_gist
  ON school
  USING gist
  (geom);

-- Table: sponsor

-- DROP TABLE sponsor;

CREATE TABLE sponsor
(
  sponsor_id serial NOT NULL,
  sponsor character varying(50),
  CONSTRAINT sponsor_pkey PRIMARY KEY (sponsor_id),
  CONSTRAINT school_sponsor_id_fkey2 FOREIGN KEY (sponsor_id)
      REFERENCES sponsor (sponsor_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT sponsor_sponsor_id_key UNIQUE (sponsor_id)
)
WITH (
  OIDS=FALSE
);
ALTER TABLE sponsor
  OWNER TO postgres;

-----------------------------------------
---------------------------------------
----------------------------------------

-- create a view called grades
CREATE OR REPLACE VIEW grades AS
	SELECT 
	  school.*,
	  grade.year, 
	  grade.gender AS sex, 
	  grade.grade_attained, 
	  grade.mean_grade, 
	  grade.frequency 
	FROM 
	  public.grade, 
	  public.school
	WHERE 
	  school.school_code = grade.school_code;

----View Shule-----------------------------------------------------
 CREATE OR REPLACE VIEW shule AS 
	 select sponsor.sponsor AS sponsor,
	 	school.school_code AS school_cod,
		school.name AS name,
		school.address AS address,
	 	school.category AS category,
	 	school.gender AS gender,
                school.constituency, 
	 	school.day_or_boarding AS day_or_boa,
	 	school.ordinary_or_special AS ordinary_o,
	 	school.enrollment AS enrollment,
	 	school.teaching_staff AS teaching_s,
	 	school.pupil_teacher_ratio AS pupil_teac,
	 	school.tsc_male_teachers AS tsc_male_t,
	 	school.tsc_female_teachers AS tsc_female,
	 	school.local_authority_male_teachers AS local_auth,
	 	school.latt AS latt,
	 	school.longg AS longg 
	from 
	 sponsor join school 
	 on school.sponsor_id = sponsor.sponsor_id ;
---------------------------------------------------------------------
-------------------mean --------------------------------------------------
CREATE OR REPLACE VIEW mean AS 
	select school.gid AS gid,
		school.school_codE AS school_cod,
		school.name AS name,
		school.address AS address,
		school.category AS category,
		school.sponsor_id AS sponsor_id,
		school.gender AS gender,
		school.day_or_boarding AS day_or_boa,
		school.ordinary_or_special AS ordinary_o,
		school.enrollment AS enrollment,
		school.teaching_staff AS teaching_s,
		school.pupil_teacher_ratio AS pupil_teac,
		school.tsc_male_teachers AS tsc_male_t,
		school.tsc_female_teachers AS tsc_female,
		school.local_authority_male_teachers AS local_auth,
		school.local_authority_female_teachers AS local_au_1,
		school.pta_board_male_teachers AS pta_board_,
		school.pta_board_female_teachers AS pta_boar_1,
		school.other_male AS other_male,
		school.other_female AS other_fema,
		school.non_teaching_staff_male AS non_teachi,
		school.non_teaching_staff_female AS non_teac_1,
		school.acreage AS acreage,
		school.latt AS latt,
		school.longg AS longg,
		school.district AS district,
		school.division AS division,
		school.location AS location,
		school.sublocation AS sublocatio,
		school.zone AS zone,school.
		constituency AS constituen,
		school.province AS province,
		mean_score.mean_score AS mean_score,
		mean_score.year AS year 
	from 	
		school join mean_score 
	on
		mean_score.school_code = school.school_code ;
------------------end mean------------------------------------------------
--------------------zote view---------------------------------------------
CREATE OR REPLACE VIEW  zote AS 
	select 
		school.gid AS gid,
		school.school_code AS school_cod,
		school.name AS name,
		school.address AS address,
		school.category AS category,
		school.gender AS gender,
		school.day_or_boarding AS day_or_boa,
		school.ordinary_or_special AS ordinary_o,
		school.enrollment AS enrollment,
		school.teaching_staff AS teaching_s,
		school.pupil_teacher_ratio AS pupil_teac,
		school.tsc_male_teachers AS tsc_male_t,
		school.tsc_female_teachers AS tsc_female,
		school.local_authority_male_teachers AS local_auth,
		school.local_authority_female_teachers AS local_au_1,
		school.pta_board_male_teachers AS pta_board_,
		school.pta_board_female_teachers AS pta_boar_1,
		school.other_male AS other_male,
		school.other_female AS other_fema,
		school.non_teaching_staff_male AS non_teachi,
		school.non_teaching_staff_female AS non_teac_1,
		school.acreage AS acreage,
		school.latt AS latt,
		school.longg AS longg,
		school.district AS district,
		school.division AS division,
		school.location AS location,
		school.sublocation AS sublocatio,
		school.zone AS zone,
		school.constituency AS constituen,
		school.province AS province,
		sponsor.sponsor AS sponsor 
	from 
		school join sponsor 
	on
		sponsor.sponsor_id = school.sponsor_id;

---------------end zote----------------------------------------------------


--inserting geometry
INSERT INTO geotable ( the_geom, the_name )
  VALUES ( ST_GeomFromEWKT('SRID=4326;POINT(-126.4 45.32)'), 'A Place' );

--enabling the postgis extension
create extension postgis;



