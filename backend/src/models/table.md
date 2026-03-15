
create extension if not exists "pgcrypto"
create table users_model(id uuid primary key default gen_random_uuid(),
name text not null,
email text unique not null,
password text not null,
balance numeric,
created_at timestamp default now());


create type transaction_type as enum ('credit','debit');

create table transactions(id uuid primary key default gen_random_uuid(),
sender_id uuid default gen_random_uuid(),
receiver_id uuid default gen_random_uuid(),
amount numeric not null,
type transaction_type not null,
created_at timestamp default now());