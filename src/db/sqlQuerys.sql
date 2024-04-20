

USE eco_readers

-- Definición de la tabla users
CREATE TABLE users (
  id VARCHAR(36) PRIMARY KEY,
  username VARCHAR(50) NOT NULL,
  email VARCHAR(255) NOT NULL,
  password VARCHAR(255) NOT NULL
);


-- Inserción de datos en la tabla users
INSERT INTO users (id,username, email, password) VALUES
('550e8400-e29b-41d4-a716-446655440000','Usuario4', 'usuario4@example.com', 'falknhb9834523457nglangladfhdshh'),
('93253a00-85cf-4f26-84a3-bc0d99e1355a','Usuario5', 'usuario2@example.com', '0286nwsnlb9wyth;sdkgshsksksk'),
('6ba7b810-9dad-11d1-80b4-00c04fd430c8','Usuario6', 'usuario3@example.com', 'mzjqogl82390tyjslsnbsdhsksfskfgk');


-- Definición de la tabla books
CREATE TABLE books (
  id VARCHAR(36) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(10, 2) NOT NULL,
  images JSON,
  bookCondition VARCHAR(50) NOT NULL,
  category VARCHAR(50) NOT NULL,
  publisherId VARCHAR(36),
  status VARCHAR(50) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (publisherId) REFERENCES users(id)
  
);


-- Inserción de datos en la tabla books
INSERT INTO books (id, title, author, description, price, images, bookCondition, category, publisherId, status) VALUES
('550e8466-e29b-41d4-a716-446655660000','Cien años de soledad', 'Gabriel García Márquez', 'Una saga familiar que abarca varias generaciones en el pueblo ficticio de Macondo, explorando temas de amor, soledad, poder y magia.',20.50, '{"frontCover":"https://images.cdn3.buscalibre.com/fit-in/360x360/61/8d/618d227e8967274cd9589a549adff52d.jpg","backCover":"https://images.uncyclomedia.co/inciclopedia/es/4/44/100ads2.jpg"}', 'New', 'Fiction', '550e8400-e29b-41d4-a716-446655440000', 'Available');


INSERT INTO books (id, title, author, description, price, images, bookCondition, category, publisherId, status) VALUES
('550e8446-e29b-41d4-a788-446655660022','La sombra del viento', 'Carlos Ruiz Zafón', 'Una novela misteriosa que sigue a un joven llamado Daniel Sempere mientras descubre un libro maldito y se ve envuelto en una trama de secretos y peligros en el corazón de Barcelona.', 15.75,'{"frontCover":"https://images.cdn3.buscalibre.com/fit-in/360x360/95/96/959650703c00cf7676e4d7adee78c281.jpg","backCover":"https://resources.claroshop.com/imagenes-sanborns-ii/1200/9786070721632_2.jpg"}', 'Lined', 'No fiction', '93253a00-85cf-4f26-84a3-bc0d99e1355a', 'Sold');


INSERT INTO books (id, title, author, description, price, images, bookCondition, category, publisherId, status) VALUES
('550e8454-e29b-41d4-a788-446654330034','El laberinto de los espíritus', 'Carlos Ruiz Zafón', 'La culminación de la saga del Cementerio de los Libros Olvidados, donde los secretos del pasado de Barcelona finalmente se revelan en una historia llena de intriga, amor y venganza.', 30.00,
'{"frontCover":"https://www.planetadelibros.com.ar/usuaris/libros/fotos/222/m_libros/221906_portada_el-laberinto-de-los-espiritus_carlos-ruiz-zafon_201608291240.jpg","backCover":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQK083N47kT-VDcOfi6ZxcMSSRdx55DxKaZP9PSPugRBX921oDxf3iCVyOApH9VRvMOsoM&usqp=CAU"}',  'Like new', 'Fancy', '93253a00-85cf-4f26-84a3-bc0d99e1355a', 'Reserved');


