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
    d.*
from
        (select
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
                ST_Within(c.geom, query1.geom) = true)  as d
where

    lower(category) like lower('%PUBLIC%')

    and	lower(sponsor) like lower('%%')

    and	lower(gender) like lower('%%')

    and	lower(day_or_boarding) like lower('%%')

    and	lower(ordinary_or_special) like lower('%%')

order by
	name asc
;