PGDMP         2                y            bd_Reto_Geteco    13.4    13.4     ?           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                      false            ?           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                      false            ?           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                      false            ?           1262    16394    bd_Reto_Geteco    DATABASE     l   CREATE DATABASE "bd_Reto_Geteco" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE = 'Spanish_Spain.1252';
     DROP DATABASE "bd_Reto_Geteco";
                postgres    false            ?            1259    16397    crud    TABLE     <  CREATE TABLE public.crud (
    id integer NOT NULL,
    fecha_hora_atencion timestamp without time zone,
    hora_final time without time zone,
    empresa character varying(100),
    ciudad character varying(100),
    asunto character varying(200),
    respuesta character varying(300),
    fecha_solicitud date
);
    DROP TABLE public.crud;
       public         heap    postgres    false            ?            1259    16395    crud_id_seq    SEQUENCE     ?   CREATE SEQUENCE public.crud_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 "   DROP SEQUENCE public.crud_id_seq;
       public          postgres    false    201            ?           0    0    crud_id_seq    SEQUENCE OWNED BY     ;   ALTER SEQUENCE public.crud_id_seq OWNED BY public.crud.id;
          public          postgres    false    200            #           2604    16400    crud id    DEFAULT     b   ALTER TABLE ONLY public.crud ALTER COLUMN id SET DEFAULT nextval('public.crud_id_seq'::regclass);
 6   ALTER TABLE public.crud ALTER COLUMN id DROP DEFAULT;
       public          postgres    false    200    201    201            ?          0    16397    crud 
   TABLE DATA           x   COPY public.crud (id, fecha_hora_atencion, hora_final, empresa, ciudad, asunto, respuesta, fecha_solicitud) FROM stdin;
    public          postgres    false    201   /       ?           0    0    crud_id_seq    SEQUENCE SET     :   SELECT pg_catalog.setval('public.crud_id_seq', 13, true);
          public          postgres    false    200            %           2606    16405    crud crud_pkey 
   CONSTRAINT     L   ALTER TABLE ONLY public.crud
    ADD CONSTRAINT crud_pkey PRIMARY KEY (id);
 8   ALTER TABLE ONLY public.crud DROP CONSTRAINT crud_pkey;
       public            postgres    false    201            ?   y   x?m?1?0@??9E.??vI?d?,n? R?Q??? Q???_?F?cG;K?|H???????#?f?yn?¤'miy-?@U{??????zHܿ?w??!P?l???},???2-??8c???1~     