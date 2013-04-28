--Query 1

select
	nrbcst0.geom,
	nrbcst0.constituen
from
	public.nrbcst0
where
	public.nrbcst0.constituen = 'DAGORETTI SOUTH';

--End Query 1

--Wizard Query 2; Select schools but not based on a spatial query

select
	a.*,
	b.the_geom
from
	school as a inner join school_location as b
on
	a.school_code = b.school_code;

--End Query 
--Apply filters on the above query on the following parameters
--Apply the following filters on the above query
	--Select Public  or Private
	--School sponsor
	--Filter by Gender
	--Day or boarding
	--Ordinary or Special

--pass the filters query for the non spatial query
select
	a.*,
	b.the_geom
from
	school as a inner join school_location as b
on
	a.school_code = b.school_code
and
	lower(public_or_private) like '%%'

and	lower(school_sponsor) like '%%'

and	lower(girls_boys_or_mixed) like '%%'

and	lower(day_or_boarding) like '%%'

and	lower(ordinary_or_special) like '%%'

;

--Wizard Query 3: Select schools based on a spatial query that are within DAGORETTI SOUTH 

with query1 as (
	select
		nrbcst0.geom,
		nrbcst0.constituen
	from
		public.nrbcst0
	where
		public.nrbcst0.constituen = 'DAGORETTI SOUTH'
)
select
	c.*
from

	(select
		a.*,
		b.the_geom
	from	
		school as a inner join school_location as b
	on
		a.school_code = b.school_code) as c, query1
where
	ST_Within(c.the_geom, query1.geom) = true;


--Apply filters on the above query on the following parameters
--Apply the following filters on the above query
	--Select Public  or Private
	--School sponsor
	--Filter by Gender
	--Day or boarding
	--Ordinary or Special

---Pass the filters query private, public between the '%' operators

with query1 as (
        select
                constituency.geom,
                constituency.constituen
        from
                public.constituency
        where
                public.constituency.constituen = 'DAGORETTI SOUTH'
)

select
        c.*
from

        (select
                a.*,
                b.sponsor
        from	

                school as a inner join sponsor as b
        on
                a.sponsor_id = b.sponsor_id

                ) 
        as c, query1
where
        ST_Within(c.geom, query1.geom) = true 
or

lower(category) like '%%'

and	lower(sponsor) like lower('%%')

and	lower(gender) like lower('%%')

and	lower(day_or_boarding) like lower('%%')

and	lower(ordinary_or_special) like lower('%%')

;