

USE read_cycle

-- Definición de la tabla users
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);


-- Inserción de datos en la tabla users
INSERT INTO users (username, email, password) VALUES
('Usuario1', 'usuario1@example.com', 'falknhb9834523457nglangladfhdshh'),
('Usuario2', 'usuario2@example.com', '0286nwsnlb9wyth;sdkgshsksksk'),
('Usuario3', 'usuario3@example.com', 'mzjqogl82390tyjslsnbsdhsksfskfgk');


-- Definición de la tabla books
CREATE TABLE books (
  id INT AUTO_INCREMENT PRIMARY KEY,
  isbn VARCHAR(20) NULL,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  bookCondition VARCHAR(50) NOT NULL,
  category VARCHAR(50) NOT NULL,
  sellerId INT NOT NULL,
  status VARCHAR(50) NOT NULL,
  FOREIGN KEY (sellerId) REFERENCES users(id)
  
);


-- Inserción de datos en la tabla books
INSERT INTO books (isbn, title, author, description, price, bookCondition, category, sellerId, status) VALUES
('978-1-1234-5678-9','Titulo del Libro1', 'Autor1', 'Descripción del Libro1', 20.50, 'New', 'Fiction', 1, 'Available'),
('978-2-2345-6789-0','Titulo del Libro2', 'Autor2', 'Descripción del Libro2', 15.75, 'Lined', 'No fiction', 2, 'Sold'),
('978-3-3456-7890-1','Titulo del Libro3', 'Autor3', 'Descripción del Libro3', 30.00, 'Like new', 'Fancy', 3, 'Reserved');


