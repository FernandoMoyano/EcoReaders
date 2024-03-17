

USE eco_readers

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
  images JSON,
  bookCondition VARCHAR(50) NOT NULL,
  category VARCHAR(50) NOT NULL,
  publisherId INT NOT NULL,
  status VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (publisherId) REFERENCES users(id)
  
);


-- Inserción de datos en la tabla books
INSERT INTO books (isbn, title, author, description, price, images, bookCondition, category, publisherId, status) VALUES
('978-1-1234-5678-9','Cien años de soledad', 'Gabriel García Márquez', 'Una saga familiar que abarca varias generaciones en el pueblo ficticio de Macondo, explorando temas de amor, soledad, poder y magia.',20.50, '{"frontCover":"https://images.cdn3.buscalibre.com/fit-in/360x360/61/8d/618d227e8967274cd9589a549adff52d.jpg","backCover":"https://images.uncyclomedia.co/inciclopedia/es/4/44/100ads2.jpg"}', 'New', 'Fiction', 1, 'Available');


INSERT INTO books (isbn, title, author, description, price, images, bookCondition, category, publisherId, status) VALUES
('978-2-2345-6789-0','La sombra del viento', 'Carlos Ruiz Zafón', 'Una novela misteriosa que sigue a un joven llamado Daniel Sempere mientras descubre un libro maldito y se ve envuelto en una trama de secretos y peligros en el corazón de Barcelona.', 15.75,'{"frontCover":"https://images.cdn3.buscalibre.com/fit-in/360x360/95/96/959650703c00cf7676e4d7adee78c281.jpg","backCover":"https://resources.claroshop.com/imagenes-sanborns-ii/1200/9786070721632_2.jpg"}', 'Lined', 'No fiction', 2, 'Sold');


INSERT INTO books (isbn, title, author, description, price, images, bookCondition, category, publisherId, status) VALUES
('978-3-3456-7890-1','El laberinto de los espíritus', 'Carlos Ruiz Zafón', 'La culminación de la saga del Cementerio de los Libros Olvidados, donde los secretos del pasado de Barcelona finalmente se revelan en una historia llena de intriga, amor y venganza.', 30.00,
'{"frontCover":"https://www.planetadelibros.com.ar/usuaris/libros/fotos/222/m_libros/221906_portada_el-laberinto-de-los-espiritus_carlos-ruiz-zafon_201608291240.jpg","backCover":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK083N47kT-VDcOfi6ZxcMSSRdx55DxKaZP9PSPugRBX921oDxf3iCVyOApH9VRvMOsoM&usqp=CAU"}',  'Like new', 'Fancy', 3, 'Reserved');


