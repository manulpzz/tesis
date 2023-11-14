Tecnologías:
- refine (refine.dev -> refine.new): next.js (backend/frontend/motor) -> mantine (interfaz visual) -> RestAPI (backend) -> no auth
- vercel (servidor y base de datos)
-prisma conectar base de datos con el codigo

 
```sql
CREATE TABLE manufacturers (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
CREATE TABLE categories (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
CREATE TABLE brands (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
CREATE TABLE brand_models (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand_id VARCHAR(255) REFERENCES brands(id) NOT NULL
);
CREATE TABLE brand_model_versions (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand_id VARCHAR(255) REFERENCES brands(id) NOT NULL,
    brand_model_id VARCHAR(255) REFERENCES brand_models(id) NOT NULL
);
CREATE TABLE products (
    id VARCHAR(255) NOT NULL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    quantity INT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    brand_id VARCHAR(255) REFERENCES brands(id) NOT NULL,
    brand_model_id VARCHAR(255) REFERENCES brand_models(id) NOT NULL,
    brand_model_version_id VARCHAR(255) REFERENCES brand_model_versions(id) NOT NULL,
    category_id VARCHAR(255) REFERENCES categories(id) NOT NULL,
    manufacturer_id VARCHAR(255) REFERENCES manufacturers(id) NOT NULL
);

INSERT INTO brands (id, name) VALUES ('MARCA-1', 'Marca 1');
INSERT INTO brands (id, name) VALUES ('MARCA-2', 'Marca 2');
INSERT INTO brand_models (id, name, brand_id) VALUES ('MODELO-1', 'Modelo 1', 'MARCA-1');
INSERT INTO brand_models (id, name, brand_id) VALUES ('MODELO-2', 'Modelo 2', 'MARCA-1');
INSERT INTO brand_models (id, name, brand_id) VALUES ('MODELO-A', 'Modelo A', 'MARCA-2');
INSERT INTO brand_models (id, name, brand_id) VALUES ('MODELO-B', 'Modelo B', 'MARCA-2');
INSERT INTO brand_model_versions (id, name, brand_id, brand_model_id) VALUES ('VERSION-@1', 'Versión @1', 'MARCA-1', 'MODELO-1');
INSERT INTO brand_model_versions (id, name, brand_id, brand_model_id) VALUES ('VERSION-@2', 'Versión @2', 'MARCA-1', 'MODELO-1');
INSERT INTO brand_model_versions (id, name, brand_id, brand_model_id) VALUES ('VERSION-@A', 'Versión @A', 'MARCA-1', 'MODELO-2');
INSERT INTO brand_model_versions (id, name, brand_id, brand_model_id) VALUES ('VERSION-@B', 'Versión @B', 'MARCA-1', 'MODELO-2');
INSERT INTO brand_model_versions (id, name, brand_id, brand_model_id) VALUES ('VERSION-#1', 'Versión #1', 'MARCA-2', 'MODELO-A');
INSERT INTO brand_model_versions (id, name, brand_id, brand_model_id) VALUES ('VERSION-#2', 'Versión #2', 'MARCA-2', 'MODELO-A');
INSERT INTO brand_model_versions (id, name, brand_id, brand_model_id) VALUES ('VERSION-#A', 'Versión #A', 'MARCA-2', 'MODELO-B');
INSERT INTO brand_model_versions (id, name, brand_id, brand_model_id) VALUES ('VERSION-#B', 'Versión #B', 'MARCA-2', 'MODELO-B');
INSERT INTO categories (id, name) VALUES ('RUBRO-1', 'Rubro 1');
INSERT INTO categories (id, name) VALUES ('RUBRO-2', 'Rubro 2');
INSERT INTO manufacturers (id, name) VALUES ('FABRICA-1', 'Fábrica 1');
INSERT INTO manufacturers (id, name) VALUES ('FABRICA-2', 'Fábrica 2');
INSERT INTO products (id, name, quantity, price, brand_id, brand_model_id, brand_model_version_id, category_id, manufacturer_id) VALUES ('123ABC', 'Producto 1', 10, 50.00, 'MARCA-1', 'MODELO-1', 'VERSION-@1', 'RUBRO-1', 'FABRICA-1');
INSERT INTO products (id, name, quantity, price, brand_id, brand_model_id, brand_model_version_id, category_id, manufacturer_id) VALUES ('567DEF', 'Producto 2', 10, 50.00, 'MARCA-2', 'MODELO-A', 'VERSION-#1', 'RUBRO-2', 'FABRICA-2');

#====================

DROP TABLE products;
DROP TABLE manufacturers;
DROP TABLE categories;
DROP TABLE brand_model_versions;
DROP TABLE brand_models;
DROP TABLE brands;

```