-- Table: public.profiles

-- DROP TABLE public.profiles;

CREATE TABLE public.profiles
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    user_id bigint NOT NULL,
    summary text COLLATE pg_catalog."default" NOT NULL DEFAULT ''::text,
    created_at timestamp(0) with time zone NOT NULL DEFAULT now(),
    updated_at timestamp(0) with time zone NOT NULL DEFAULT now(),
    latitude double precision NOT NULL DEFAULT 0,
    longitude double precision NOT NULL DEFAULT 0,
    raw_geolocation json NOT NULL DEFAULT '{}'::json,
    nickname character varying(50) COLLATE pg_catalog."default" NOT NULL DEFAULT (gen_random_uuid())::text,
    CONSTRAINT profiles_pkey PRIMARY KEY (id),
    CONSTRAINT fk_profiles_user_id FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE public.profiles
    OWNER to frenchbench;

COMMENT ON TABLE public.profiles
    IS 'profiles of users';
-- Index: profiles_lat_idx

-- DROP INDEX public.profiles_lat_idx;

CREATE INDEX profiles_lat_idx
    ON public.profiles USING btree
    (latitude ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: profiles_lon_idx

-- DROP INDEX public.profiles_lon_idx;

CREATE INDEX profiles_lon_idx
    ON public.profiles USING btree
    (longitude ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: unq_profiles_nickname

-- DROP INDEX public.unq_profiles_nickname;

CREATE UNIQUE INDEX unq_profiles_nickname
    ON public.profiles USING btree
    (nickname COLLATE pg_catalog."default" ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: unq_profiles_user_id

-- DROP INDEX public.unq_profiles_user_id;

CREATE UNIQUE INDEX unq_profiles_user_id
    ON public.profiles USING btree
    (user_id ASC NULLS LAST)
    TABLESPACE pg_default;
