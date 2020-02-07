DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS company;
DROP TABLE IF EXISTS worker;
CREATE TABLE users(
   id serial PRIMARY KEY,
   name VARCHAR (50) NOT NULL,
   login VARCHAR (355) NOT NULL,
   password VARCHAR (355) NOT NULL
);
CREATE TABLE company(
   id serial PRIMARY KEY,
   name VARCHAR (50) NOT NULL,
   email VARCHAR (355) NOT NULL,
   phone VARCHAR (355) NOT NULL
);
CREATE TABLE worker(
   id serial PRIMARY KEY,
   name VARCHAR (50) NOT NULL,
   email VARCHAR (355) NOT NULL,
   company_id integer NOT NULL,
   CONSTRAINT worker_company_id_fkey FOREIGN KEY (company_id)
      REFERENCES company (id) MATCH SIMPLE
      ON UPDATE NO ACTION ON DELETE RESTRICT
);
INSERT INTO company (name, email, phone) VALUES ('Slack', 'sales@slackmail.ua', '+13213212321');
INSERT INTO company (name, email, phone) VALUES ('Brix', 'info@brix.cn', '+53215658965');
INSERT INTO company (name, email, phone) VALUES ('Skynet LLC', 'contacts@sky.net', '+03333665468');
INSERT INTO worker (name, email, company_id) VALUES ('Jim', 'jim@@slackmail.ua', 1);
INSERT INTO worker (name, email, company_id) VALUES ('Bob', 'bob@@slackmail.ua', 1);
INSERT INTO worker (name, email, company_id) VALUES ('Yun', 'yun@@brix.cn', 2);

select * from worker full join company c on worker.company_id = c.id;
