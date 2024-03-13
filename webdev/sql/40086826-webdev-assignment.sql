-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: webdev
-- ------------------------------------------------------
-- Server version	5.5.5-10.4.28-MariaDB

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
-- Table structure for table `emotions`
--

DROP TABLE IF EXISTS `emotions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `emotions` (
  `id` int(50) NOT NULL AUTO_INCREMENT,
  `userID` int(50) NOT NULL,
  `dateLogged` datetime NOT NULL DEFAULT current_timestamp(),
  `enjoyment` int(2) NOT NULL,
  `sadness` int(2) NOT NULL,
  `anger` int(2) NOT NULL,
  `contempt` int(2) NOT NULL,
  `disgust` int(2) NOT NULL,
  `fear` int(2) NOT NULL,
  `surprise` int(2) NOT NULL,
  `triggers` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `userID` (`userID`),
  CONSTRAINT `userID` FOREIGN KEY (`userID`) REFERENCES `users` (`userID`)
) ENGINE=InnoDB AUTO_INCREMENT=52 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `emotions`
--

LOCK TABLES `emotions` WRITE;
/*!40000 ALTER TABLE `emotions` DISABLE KEYS */;
INSERT INTO `emotions` VALUES (7,12,'2024-02-25 12:21:00',1,2,3,4,6,5,4,'hating life today'),(8,12,'2024-02-25 12:24:00',6,6,6,6,6,6,6,'good trip to cinema'),(9,12,'2024-02-25 18:24:00',5,5,5,5,5,5,5,'don\'t know if I will finish assignment in time'),(14,12,'2024-02-28 22:29:00',2,2,2,2,2,2,2,'Testing another redirect'),(15,12,'2024-02-28 22:30:00',1,3,4,5,4,3,1,''),(19,12,'2024-02-29 11:00:00',3,3,3,3,3,3,3,'Testy test'),(29,12,'2024-03-08 14:37:00',5,0,0,0,0,0,0,''),(31,12,'2024-02-26 21:43:00',6,8,10,9,10,9,10,''),(35,12,'2024-03-11 16:44:00',4,4,4,0,0,0,0,''),(36,12,'2024-03-11 16:46:00',2,2,2,2,0,0,0,''),(38,12,'2024-03-11 21:39:00',10,0,0,0,0,0,10,'AXIOS ADD'),(40,12,'2024-03-11 21:48:00',0,0,3,0,0,0,0,''),(42,46,'2024-03-12 11:15:00',3,10,10,5,10,10,0,'Money'),(43,46,'2024-03-02 11:16:00',10,10,3,7,4,5,7,'relationship'),(44,46,'2024-02-21 11:17:00',4,5,5,3,5,8,3,'partner'),(45,46,'2024-03-12 11:24:00',4,0,0,0,0,0,0,''),(46,46,'2024-03-12 11:25:00',0,0,0,0,0,0,0,''),(47,12,'2024-03-12 11:30:00',0,0,0,0,0,0,0,'UPDATED?'),(50,12,'2024-03-12 12:16:00',3,0,0,0,0,0,0,''),(51,12,'2024-03-12 12:24:00',0,0,0,0,3,0,0,'ADDING?');
/*!40000 ALTER TABLE `emotions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userID` int(50) NOT NULL AUTO_INCREMENT,
  `forename` varchar(250) NOT NULL,
  `surname` varchar(50) NOT NULL,
  `emailAddress` varchar(250) NOT NULL,
  `userPassword` varbinary(250) NOT NULL,
  `userTypeID` int(50) NOT NULL,
  PRIMARY KEY (`userID`),
  UNIQUE KEY `emailAddress` (`emailAddress`),
  KEY `UserTypeID` (`userTypeID`),
  CONSTRAINT `UserTypeID` FOREIGN KEY (`userTypeID`) REFERENCES `usertype` (`typeID`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (12,'Sam','ONeill','Sam@sam.com',_binary '$2b$10$4y9g4bNq8zQCVro8USVdCOQfadrlgUxijbiT7/xnTasozqbqeF1wi',1),(46,'Samantha','ONeill','sammorgan940@icloud.com',_binary '$2b$10$.Hz8rP102jmrt2ww1oJT..9FL0IJxNPsFaMVkYftnpz1hm64MMqH2',1);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usertype`
--

DROP TABLE IF EXISTS `usertype`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usertype` (
  `typeID` int(50) NOT NULL AUTO_INCREMENT,
  `role` varchar(50) NOT NULL,
  PRIMARY KEY (`typeID`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usertype`
--

LOCK TABLES `usertype` WRITE;
/*!40000 ALTER TABLE `usertype` DISABLE KEYS */;
INSERT INTO `usertype` VALUES (1,'admin'),(2,'user');
/*!40000 ALTER TABLE `usertype` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-03-12 13:37:19
