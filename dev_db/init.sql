CREATE USER metallic_user WITH ENCRYPTED PASSWORD 'pass';
CREATE DATABASE metallic_db WITH OWNER = metallic_user ENCODING = 'UTF8';
