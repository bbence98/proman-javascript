--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.6
-- Dumped by pg_dump version 9.5.6

ALTER TABLE IF EXISTS ONLY public.boards DROP CONSTRAINT IF EXISTS pk_boards_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS pk_cards_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.statuses DROP CONSTRAINT IF EXISTS pk_statuses_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.users DROP CONSTRAINT IF EXISTS pk_users_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS fk_boards_id CASCADE;
ALTER TABLE IF EXISTS ONLY public.cards DROP CONSTRAINT IF EXISTS fk_statuses_id CASCADE;


DROP TABLE IF EXISTS public.boards;
DROP SEQUENCE IF EXISTS public.boards;
CREATE TABLE boards (
    id serial NOT NULL,
    title text
);

DROP TABLE IF EXISTS public.cards;
DROP SEQUENCE IF EXISTS public.cards;
CREATE TABLE cards (
    id serial NOT NULL,
    boards_id integer,
    title text,
    statuses_id integer,
    orders integer
);

DROP TABLE IF EXISTS public.statuses;
DROP SEQUENCE IF EXISTS public.statuses;
CREATE TABLE statuses (
    id serial NOT NULL,
    title text
);

DROP TABLE IF EXISTS public.users;
DROP SEQUENCE IF EXISTS public.users;
CREATE TABLE users (
    id serial NOT NULL,
    name text,
    password text
);

ALTER TABLE ONLY boards
    ADD CONSTRAINT pk_boards_id PRIMARY KEY (id);

ALTER TABLE ONLY cards
    ADD CONSTRAINT pk_cards_id PRIMARY KEY (id);

ALTER TABLE ONLY statuses
    ADD CONSTRAINT pk_statuses_id PRIMARY KEY (id);

ALTER TABLE ONLY users
    ADD CONSTRAINT pk_users_id PRIMARY KEY (id);

ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_boards_id FOREIGN KEY (boards_id) REFERENCES boards(id);

ALTER TABLE ONLY cards
    ADD CONSTRAINT fk_statuses_id FOREIGN KEY (statuses_id) REFERENCES statuses(id);

INSERT INTO public.users (id, name, password) VALUES (1, 'admin', 'admin');
INSERT INTO public.boards (id, title) VALUES (1, 'Board 1');
INSERT INTO public.boards (id, title) VALUES (2, 'Board 2');
INSERT INTO public.statuses (id, title) VALUES (0, 'new');
INSERT INTO public.statuses (id, title) VALUES (1, 'in progress');
INSERT INTO public.statuses (id, title) VALUES (2, 'testing');
INSERT INTO public.statuses (id, title) VALUES (3, 'done');
INSERT INTO public.cards (id, boards_id, title, statuses_id, orders) VALUES (1, 1, 'new card 1', 0, 0);
INSERT INTO public.cards (id, boards_id, title, statuses_id, orders) VALUES (2, 1, 'new card 2', 0, 1);
INSERT INTO public.cards (id, boards_id, title, statuses_id, orders) VALUES (3, 1, 'in progress card', 1, 0);
INSERT INTO public.cards (id, boards_id, title, statuses_id, orders) VALUES (4, 1, 'planning', 2, 0);
INSERT INTO public.cards (id, boards_id, title, statuses_id, orders) VALUES (5, 1, 'done card 1', 3, 0);
INSERT INTO public.cards (id, boards_id, title, statuses_id, orders) VALUES (6, 1, 'done card 1', 3, 1);
INSERT INTO public.cards (id, boards_id, title, statuses_id, orders) VALUES (7, 2, 'new card 1', 0, 0);
INSERT INTO public.cards (id, boards_id, title, statuses_id, orders) VALUES (8, 2, 'new card 2', 0, 1);
INSERT INTO public.cards (id, boards_id, title, statuses_id, orders) VALUES (9, 2, 'in progress card', 1, 0);
INSERT INTO public.cards (id, boards_id, title, statuses_id, orders) VALUES (10, 2, 'planning', 2, 0);
INSERT INTO public.cards (id, boards_id, title, statuses_id, orders) VALUES (11, 2, 'done card 1', 3, 0);
INSERT INTO public.cards (id, boards_id, title, statuses_id, orders) VALUES (12, 2, 'done card 1', 3, 1);
