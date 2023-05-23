-- MySQL dump 10.13  Distrib 8.0.31, for macos12.6 (x86_64)
--
-- Host: localhost    Database: testAnsiedad
-- ------------------------------------------------------
-- Server version	8.0.31

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `admin`
--

DROP TABLE IF EXISTS `admin`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `admin` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nick` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `admin`
--

LOCK TABLES `admin` WRITE;
/*!40000 ALTER TABLE `admin` DISABLE KEYS */;
/*!40000 ALTER TABLE `admin` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pregunta`
--

DROP TABLE IF EXISTS `pregunta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pregunta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `texto_pregunta` varchar(250) NOT NULL,
  `cla_pregunta_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_tipoPregunta` (`cla_pregunta_id`),
  CONSTRAINT `fk_tipoPregunta` FOREIGN KEY (`cla_pregunta_id`) REFERENCES `tipoPregunta` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pregunta`
--

LOCK TABLES `pregunta` WRITE;
/*!40000 ALTER TABLE `pregunta` DISABLE KEYS */;
INSERT INTO `pregunta` VALUES (1,'¿En qué medida te conoces a ti mismo/a?',1),(2,'¿Eres consciente de tus emociones en diferentes situaciones?',1),(3,'¿Puedes identificar tus fortalezas y debilidades emocionales?',1),(4,'¿Eres consciente de cómo tus emociones afectan tus decisiones?',1),(5,'¿Cómo de bien entiendes tus valores y creencias personales?',1),(6,'¿Eres capaz de expresar tus emociones de manera adecuada?',1),(7,'¿Cómo de consciente eres de tu cuerpo y las señales que te envía?',1),(8,'¿Puedes reconocer las emociones de los demás con facilidad?',1),(9,'¿Eres consciente de cómo tu lenguaje corporal afecta tus interacciones?',1),(10,'¿Puedes describir claramente cómo te sientes en diferentes momentos del día?',1),(11,'¿En qué medida puedes manejar tus emociones negativas?',2),(12,'¿Eres capaz de mantener la calma en situaciones estresantes?',2),(13,'¿Puedes regular tus impulsos emocionales cuando es necesario?',2),(14,'¿Eres capaz de controlar tus reacciones emocionales en situaciones difíciles?',2),(15,'¿Cómo de bien puedes adaptarte a cambios inesperados?',2),(16,'¿Eres capaz de resistir las tentaciones y retrasar la gratificación?',2),(17,'¿Puedes mantener la concentración y la atención en una tarea?',2),(18,'¿Eres capaz de tomar decisiones racionales en lugar de dejarte llevar por las emociones?',2),(19,'¿Cómo de bien puedes lidiar con la frustración y la adversidad?',2),(20,'¿Eres capaz de controlar tu nivel de estrés en situaciones desafiantes?',2),(21,'¿En qué medida eres capaz de motivarte a ti mismo/a para alcanzar tus metas?',3),(22,'¿Tienes una visión clara de lo que quieres lograr en la vida?',3),(23,'¿Eres capaz de persistir en tus esfuerzos a pesar de los obstáculos?',3),(24,'¿Cómo de bien puedes enfocarte en tus tareas diarias?',3),(25,'Eres capaz de mantener un nivel de energía constante y motivado/a?',3),(26,'¿Cómo de comprometido/a estás con tus metas a largo plazo?',3),(27,'¿Eres capaz de superar la procrastinación y comenzar las tareas importantes?',3),(28,'¿Puedes mantenerte enfocado/a en el trabajo sin distraerte fácilmente?',3),(29,'¿Cómo de determinado/a estás en lograr tus objetivos a pesar de los contratiempos?',3),(30,'¿Eres capaz de mantener un estado de ánimo positivo y optimista ante los desafíos?',3),(31,'¿En qué medida puedes comprender y compartir las emociones de los demás?',4),(32,'¿Eres capaz de ponerse en el lugar de los demás y ver las cosas desde su perspectiva?',4),(33,'¿Cómo de bien puedes percibir las necesidades emocionales de las personas que te rodean?',4),(34,'¿Eres capaz de mostrar compasión y empatía hacia los demás en momentos difíciles?',4),(35,'¿Cómo de atento/a estás a las señales no verbales y emocionales que otros expresan?',4),(36,'¿Eres capaz de establecer y mantener relaciones saludables y significativas?',4),(37,'¿Puedes resolver conflictos de manera pacífica y encontrar soluciones que beneficien a todos?',4),(38,'¿Cómo de abierto/a estás a las opiniones y perspectivas diferentes a las tuyas?',4),(39,'¿Eres capaz de brindar apoyo emocional y ser un buen oyente cuando alguien lo necesita?',4),(40,'¿Cómo de sensible eres a los sentimientos y necesidades de los demás en diferentes situaciones?',4),(41,'¿En qué medida puedes comunicarte eficazmente con los demás?',5),(42,'¿Eres capaz de expresar tus ideas y sentimientos de manera clara y asertiva?',5),(43,'¿Cómo de bien puedes trabajar en equipo y colaborar con los demás?',5),(44,'¿Eres capaz de influir positivamente en las personas que te rodean?',5),(45,'¿Cómo de efectivo/a eres al resolver conflictos y encontrar soluciones mutuamente beneficiosas?',5),(46,'¿Eres capaz de adaptar tu estilo de comunicación a diferentes situaciones y personas?',5),(47,'¿Puedes construir y mantener relaciones sólidas y duraderas con los demás?',5),(48,'¿Cómo de hábil eres al liderar y motivar a un grupo de personas?',5),(49,'¿Eres capaz de leer el lenguaje corporal y las señales sociales de los demás con precisión?',5),(50,'¿Cómo de bien puedes adaptarte a diferentes entornos sociales y culturas?',5);
/*!40000 ALTER TABLE `pregunta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `respuesta`
--

DROP TABLE IF EXISTS `respuesta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `respuesta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `usuario_id` int NOT NULL,
  `pregunta_id` int NOT NULL,
  `name_intento` varchar(50) NOT NULL,
  `valor_respuesta` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_pregunta` (`pregunta_id`),
  KEY `fk_user` (`usuario_id`),
  CONSTRAINT `fk_pregunta` FOREIGN KEY (`pregunta_id`) REFERENCES `pregunta` (`id`),
  CONSTRAINT `fk_user` FOREIGN KEY (`usuario_id`) REFERENCES `pregunta` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `respuesta`
--

LOCK TABLES `respuesta` WRITE;
/*!40000 ALTER TABLE `respuesta` DISABLE KEYS */;
INSERT INTO `respuesta` VALUES (1,6,1,'primer_intento',4);
/*!40000 ALTER TABLE `respuesta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipoPregunta`
--

DROP TABLE IF EXISTS `tipoPregunta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipoPregunta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tipo` varchar(50) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipoPregunta`
--

LOCK TABLES `tipoPregunta` WRITE;
/*!40000 ALTER TABLE `tipoPregunta` DISABLE KEYS */;
INSERT INTO `tipoPregunta` VALUES (1,'Autoconciencia'),(2,'Autocontrol'),(3,'Automotivacion'),(4,'Empatia'),(5,'Habilidades Sociales');
/*!40000 ALTER TABLE `tipoPregunta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nick` varchar(50) NOT NULL,
  `nombres` varchar(50) DEFAULT NULL,
  `apellido1` varchar(50) DEFAULT NULL,
  `apellido2` varchar(50) DEFAULT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(100) NOT NULL,
  `estudiante` tinyint(1) NOT NULL,
  `respuesta_id` int NOT NULL,
  `admin_id` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_respuesta` (`respuesta_id`),
  CONSTRAINT `fk_respuesta` FOREIGN KEY (`respuesta_id`) REFERENCES `respuesta` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user`
--

LOCK TABLES `user` WRITE;
/*!40000 ALTER TABLE `user` DISABLE KEYS */;
INSERT INTO `user` VALUES (1,'john','','','','jhon@example.com','password1',1,0,0),(2,'mary','','','','mary@example.com','password2',0,0,0),(3,'alex','','','','alex@example.com','password3',1,0,0),(4,'emily','','','','emily@example.com','password4',0,0,0),(5,'david','','','','david@example.com','password5',1,0,0),(6,'eder','','','','eder@example.com','edercito',1,0,0),(12,'abcd',NULL,NULL,NULL,'abcd','abcd',1,0,0),(13,'asdf',NULL,NULL,NULL,'asdf','asdf',0,0,0),(14,'',NULL,NULL,NULL,'','',1,0,0),(15,'admin',NULL,NULL,NULL,'admin','admin',0,0,0),(16,'luis',NULL,NULL,NULL,'luis','luis',1,0,0),(17,'carlos',NULL,NULL,NULL,'carlos','carlos',1,0,0);
/*!40000 ALTER TABLE `user` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-05-23 13:44:37
