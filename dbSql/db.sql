


1. PARA MODIFICAR UNA COLUMNA: 
//tengo una tabla con una columna que no tiene el not null y para agrelarle eso:

ALTER TABLE usuarios
MODIFY COLUMN nombre VARCHAR(50) NOT NULL;

Si se desea modificar mas columnas de una sola vez, lo que se hacer es agregar el modify column antes de cada columna que se quire modificar.

2. PARA PONERLE LA LLAVE PRIMARIA DI DE UNA TABLA:

ALTER TABLE pregunta ADD PRIMARY KEY (id_pregunta);

Tambien podemos agregarle llave primaria con el modify column.

3. PARA BORRAR CLAVE PRIMARIA DE UNA TABLA:
 alter table pregunta drop primary key;

4. SI UNA TABLA YA TIENE UNA COLUMN CON UNA LLAVE PRIMARIA, ES DIFICIL MODIFICARLO. EN SU LUGAR PODEMOS HACER ESTO:
-Eliminar la llave primaria existente y luego modificar la columna para hacerla autoincremental:
-Crear una nueva columna autoincremental y establecerla como llave primaria:

5. PARA BORRAR UNA CLAVE FORANEA:
ALTER TABLE pregunta
DROP FOREIGN KEY respuesta_id;


6. PARA MOSTRAR BASE DE DATOS, TABLAS Y COLUMNAS;
    6.1 PARA MOSTRAR BASE DE DATOS
    SHOW DATABASES;
    6.2 PARA MOSTRAR TABLAS
    SHOW TABLES;
    6.3 PARA MOSTRAR UNA TABLA DESDE SU CREACION
    SHOW CREATE TABLE user;
    6.4 PARA VER LAS PROPIEDADES DE las COLUMNAS DE UNA TABLA
    DESCRIBE user;
    6.4 PARA MOSTRAR LAS PROPIEDADES DE LA TABLA EN ESPECIFICA
    DESCRIBE TABLE user;

7. ERROR SOLUCIONADO: No podia agregar llave foranea a una columna de una tabla, debido a que la variable "foreign_key_check" estaba en "on",
                        por lo que tuve que desactivarla con los sgt pasos:

    7.1 MOSTRAR TODAS LAS VARIABLES GLOBALES, esto muestra muchas variable, es recomendable saber que modificar para no mostrar todas las variables globales.
    SHOW GLOBAL VARIABLES;
    7.2 MOSTRAR VARIBLE GLOBAL ESPECIFICO PARA MODIFICAR, si ya sabemos lo que queremos modificar podemos mostrar antes solo esa variable para ver en que estado esta.
    SHOW GLOBAL VARIABLES LIKE 'FOREIGN_KEY_CHECKS';
    7.2 ESTABLECER OFF ó "0" PARA desactivarla
    SET FOREIGN_KEY_CHECKS=0;

    LEER: con esto ya podemos agregar nuestras llaves foraneas y tambien agregar los constraints.


7. CONSULTAS
    7.1 CONSULTA AGREGANDO INFO DE OTRA TABLA
    select * from respuesta join pregunta on respuesta.pregunta_id = pregunta.id;
    7.2 CONSULTA AGREGANDO INFO DE OTRAS 2 TABLAS:
    select * from respuesta join pregunta on respuesta.pregunta_id = pregunta.id join user on respuesta.usuario_id = user.id;



8. UPDATE user SET nick='admin', email='admin@gmail.com', password='admin' where id='1';

9. EXPORTAR LA BASE DE DATOS DE CONSOLE MYSQL:

mysqldump -u gamler13 -p nombre_de_la_base_de_datos > nombre_del_archivo_por_crear.sql

10. IMPORTAR LA BASE DE DATOS AL TRABAJO LOCAL DESDE TERMINAL
mysql -u gamlerd13 -p nombre_de_la_base_de_datos_por_crear < nombre_del_archivo_creado.sql

ATENCION: POR HACER
-VER EL TEMA DE CREAR UNA TABLA LLAMADA INTENTOS, PARA VER EL CANTIDAD DE INTENTOS DEL TEST DE CADA USUARIO.
-BORRAR EL CAMPO DE RESPUESTA QUE HICE DE PRUEBA, YA QUE ESTO DEBE DE SER LLENADO DESDE EL SISTEMA
