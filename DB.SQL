CREATE DATABASE TODOdb
GO
USE TODOdb
GO
---Create table
CREATE TABLE [User](
	id Varchar(255) Primary Key,
	[name] Varchar(255) ,
	email Varchar(255)
)


GO
CREATE TABLE Todo(
	id Varchar(255) Primary Key,
	title Varchar(255),
	content Varchar(255), 
)

GO
CREATE TABLE TodoTransaction(
	id Varchar(255) Primary key,
	idTodo Varchar(255) Foreign Key REFERENCES Todo(id),
	idUser Varchar(255) Foreign Key REFERENCES [User](id),
)

GO
CREATE TABLE DetailTodoTransaction(
	idTodoTransaction Varchar(255) REFERENCES [TodoTransaction](id),
	idUser Varchar(255) REFERENCES [User](id),
	PRIMARY KEY (idTodoTransaction,idUser)
)

GO
INSERT INTO [User] VALUES 
('US001','Naka','Naka@gmail.com'),
('US002','Nuku','Nuku@gmail.com'),
('US003','Noko','Noko@gmail.com'),
('US004','Neke','Neke@gmail.com')

GO
INSERT INTO [Todo] VALUES 
('TO001','Diary Naka','Ini adalah catatan Naka'),
('TO002','Diary Noko','Ini adalah catatan noko')

GO
INSERT INTO TodoTransaction VALUES
('TT001','TO001','US001'),
('TT002','TO002','US003')

GO
INSERT INTO DetailTodoTransaction VALUES
('TO001','US002'),
('TO001','US003'),
('TO001','US004')




