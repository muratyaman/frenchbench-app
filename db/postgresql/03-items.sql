-- Table: public.items

-- DROP TABLE public.items;

CREATE TABLE public.items
(
    id uuid NOT NULL DEFAULT gen_random_uuid(),
    created_at timestamp(0) with time zone NOT NULL DEFAULT now(),
    updated_at timestamp(0) with time zone NOT NULL DEFAULT now(),
    user_id bigint NOT NULL,
    item_name character varying(200) COLLATE pg_catalog."default" NOT NULL,
    item_desc text COLLATE pg_catalog."default" NOT NULL,
    value_min numeric(11,2),
    value_max numeric(11,2),
    is_product boolean NOT NULL DEFAULT false,
    CONSTRAINT items_pkey PRIMARY KEY (id),
    CONSTRAINT fk_items_user_id FOREIGN KEY (user_id)
        REFERENCES public.users (id) MATCH SIMPLE
        ON UPDATE CASCADE
        ON DELETE CASCADE
)

TABLESPACE pg_default;

ALTER TABLE public.items
    OWNER to frenchbench;

COMMENT ON TABLE public.items
    IS 'products and services provided by users';
-- Index: idx_items_created_at_desc

-- DROP INDEX public.idx_items_created_at_desc;

CREATE INDEX idx_items_created_at_desc
    ON public.items USING btree
    (created_at DESC NULLS LAST)
    TABLESPACE pg_default;
-- Index: idx_items_is_product

-- DROP INDEX public.idx_items_is_product;

CREATE INDEX idx_items_is_product
    ON public.items USING btree
    (is_product ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: idx_items_user_id

-- DROP INDEX public.idx_items_user_id;

CREATE INDEX idx_items_user_id
    ON public.items USING btree
    (user_id ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: idx_items_value_max

-- DROP INDEX public.idx_items_value_max;

CREATE INDEX idx_items_value_max
    ON public.items USING btree
    (value_max ASC NULLS LAST)
    TABLESPACE pg_default;
-- Index: idx_items_value_min

-- DROP INDEX public.idx_items_value_min;

CREATE INDEX idx_items_value_min
    ON public.items USING btree
    (value_min ASC NULLS LAST)
    TABLESPACE pg_default;
