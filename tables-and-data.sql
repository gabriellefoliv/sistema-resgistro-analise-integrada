CREATE DATABASE  IF NOT EXISTS `srf` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `srf`;
-- MySQL dump 10.13  Distrib 8.0.44, for Win64 (x86_64)
--
-- Host: localhost    Database: srf
-- ------------------------------------------------------
-- Server version	9.6.0

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
SET @MYSQLDUMP_TEMP_LOG_BIN = @@SESSION.SQL_LOG_BIN;
SET @@SESSION.SQL_LOG_BIN= 0;

--
-- Table structure for table `_prisma_migrations`
--

DROP TABLE IF EXISTS `_prisma_migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `_prisma_migrations` (
  `id` varchar(36) COLLATE utf8mb4_unicode_ci NOT NULL,
  `checksum` varchar(64) COLLATE utf8mb4_unicode_ci NOT NULL,
  `finished_at` datetime DEFAULT NULL,
  `migration_name` varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL,
  `logs` text COLLATE utf8mb4_unicode_ci,
  `rolled_back_at` datetime DEFAULT NULL,
  `started_at` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `applied_steps_count` int unsigned NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `_prisma_migrations`
--

LOCK TABLES `_prisma_migrations` WRITE;
/*!40000 ALTER TABLE `_prisma_migrations` DISABLE KEYS */;
INSERT INTO `_prisma_migrations` VALUES ('36f92a31-9af7-4060-b73f-0d09e4b9937b','e6dd744191823d5b7335818807b486d4428c63675ec483556a17074f895f1b03','2026-03-05 13:21:53.570','20260305132136_system_template_structure',NULL,NULL,'2026-03-05 13:21:36.792',1),('4589c10a-ea15-4404-9137-63e0db146f08','9c99d9b3651b8a43375a3a86849dee8cd866a75b8e7aa679df9858e0e4ac788a','2026-03-06 12:18:05.727','20260306121804_fix_card_link_is_optional',NULL,NULL,'2026-03-06 12:18:04.492',1),('bb899775-977d-43f3-bc55-48726c2659b7','dd7300f969f49ee55a6686a08cbf89b5870595482e8764db1b150125acc1fa74','2026-03-05 13:35:50.684','20260305133329_add_specific_database',NULL,NULL,'2026-03-05 13:33:29.953',1);
/*!40000 ALTER TABLE `_prisma_migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `agente_sorologico`
--

DROP TABLE IF EXISTS `agente_sorologico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agente_sorologico` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agente_sorologico`
--

LOCK TABLES `agente_sorologico` WRITE;
/*!40000 ALTER TABLE `agente_sorologico` DISABLE KEYS */;
INSERT INTO `agente_sorologico` VALUES (1,'Ehrlichia canis');
/*!40000 ALTER TABLE `agente_sorologico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `agente_suspeito`
--

DROP TABLE IF EXISTS `agente_suspeito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `agente_suspeito` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agente_suspeito`
--

LOCK TABLES `agente_suspeito` WRITE;
/*!40000 ALTER TABLE `agente_suspeito` DISABLE KEYS */;
/*!40000 ALTER TABLE `agente_suspeito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alocacao_amostra_necropsia`
--

DROP TABLE IF EXISTS `alocacao_amostra_necropsia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alocacao_amostra_necropsia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_necropsia` int NOT NULL,
  `id_tipo_amostra` int NOT NULL,
  `id_armazenamento` int NOT NULL,
  `id_status` int NOT NULL,
  `link_imagem` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `observacao` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantidade` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `alocacao_amostra_necropsia_id_necropsia_id_tipo_amostra_key` (`id_necropsia`,`id_tipo_amostra`),
  KEY `alocacao_amostra_necropsia_id_armazenamento_fkey` (`id_armazenamento`),
  KEY `alocacao_amostra_necropsia_id_tipo_amostra_fkey` (`id_tipo_amostra`),
  KEY `alocacao_amostra_necropsia_id_status_fkey` (`id_status`),
  CONSTRAINT `alocacao_amostra_necropsia_id_armazenamento_fkey` FOREIGN KEY (`id_armazenamento`) REFERENCES `armazem` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `alocacao_amostra_necropsia_id_necropsia_fkey` FOREIGN KEY (`id_necropsia`) REFERENCES `necropsia` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `alocacao_amostra_necropsia_id_status_fkey` FOREIGN KEY (`id_status`) REFERENCES `enum_status_alocacao_amostra_necropsia` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `alocacao_amostra_necropsia_id_tipo_amostra_fkey` FOREIGN KEY (`id_tipo_amostra`) REFERENCES `tipo_amostra_necropsia` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alocacao_amostra_necropsia`
--

LOCK TABLES `alocacao_amostra_necropsia` WRITE;
/*!40000 ALTER TABLE `alocacao_amostra_necropsia` DISABLE KEYS */;
INSERT INTO `alocacao_amostra_necropsia` VALUES (1,1,1,4,1,NULL,NULL,12);
/*!40000 ALTER TABLE `alocacao_amostra_necropsia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `alocacao_amostra_veterinario`
--

DROP TABLE IF EXISTS `alocacao_amostra_veterinario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `alocacao_amostra_veterinario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_visita_veterinaria` int NOT NULL,
  `id_tipo_amostra` int NOT NULL,
  `id_armazenamento` int NOT NULL,
  `id_status` int NOT NULL,
  `link_imagem` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `observacao` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantidade` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `alocacao_amostra_veterinario_id_visita_veterinaria_id_tipo_a_key` (`id_visita_veterinaria`,`id_tipo_amostra`),
  KEY `alocacao_amostra_veterinario_id_armazenamento_fkey` (`id_armazenamento`),
  KEY `alocacao_amostra_veterinario_id_tipo_amostra_fkey` (`id_tipo_amostra`),
  KEY `alocacao_amostra_veterinario_id_status_fkey` (`id_status`),
  CONSTRAINT `alocacao_amostra_veterinario_id_armazenamento_fkey` FOREIGN KEY (`id_armazenamento`) REFERENCES `armazem` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `alocacao_amostra_veterinario_id_status_fkey` FOREIGN KEY (`id_status`) REFERENCES `enum_status_alocacao_amostra_veterinario` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `alocacao_amostra_veterinario_id_tipo_amostra_fkey` FOREIGN KEY (`id_tipo_amostra`) REFERENCES `tipo_amostra_veterinaria` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `alocacao_amostra_veterinario_id_visita_veterinaria_fkey` FOREIGN KEY (`id_visita_veterinaria`) REFERENCES `visita_veterinaria` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alocacao_amostra_veterinario`
--

LOCK TABLES `alocacao_amostra_veterinario` WRITE;
/*!40000 ALTER TABLE `alocacao_amostra_veterinario` DISABLE KEYS */;
INSERT INTO `alocacao_amostra_veterinario` VALUES (8,11,3,4,2,NULL,NULL,12),(9,11,5,5,4,NULL,NULL,1);
/*!40000 ALTER TABLE `alocacao_amostra_veterinario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `analise_ectoparasito_necropsia`
--

DROP TABLE IF EXISTS `analise_ectoparasito_necropsia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `analise_ectoparasito_necropsia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_necropsia` int NOT NULL,
  `id_genero_ectoparasito` int NOT NULL,
  `id_especie_ectoparasito` int NOT NULL,
  `id_subespecie_ectoparasito` int NOT NULL,
  `quantidade_machos` int NOT NULL,
  `quantidade_femeas` int NOT NULL,
  `quantidade_ninfas` int NOT NULL,
  `quantidade_larvas` int NOT NULL,
  `quantidade_ovos` int NOT NULL,
  `observacao` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `analise_ectoparasito_necropsia_id_necropsia_id_genero_ectopa_key` (`id_necropsia`,`id_genero_ectoparasito`,`id_especie_ectoparasito`,`id_subespecie_ectoparasito`),
  KEY `analise_ectoparasito_necropsia_id_genero_ectoparasito_fkey` (`id_genero_ectoparasito`),
  KEY `analise_ectoparasito_necropsia_id_especie_ectoparasito_fkey` (`id_especie_ectoparasito`),
  KEY `analise_ectoparasito_necropsia_id_subespecie_ectoparasito_fkey` (`id_subespecie_ectoparasito`),
  CONSTRAINT `analise_ectoparasito_necropsia_id_especie_ectoparasito_fkey` FOREIGN KEY (`id_especie_ectoparasito`) REFERENCES `especie_ectoparasito` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `analise_ectoparasito_necropsia_id_genero_ectoparasito_fkey` FOREIGN KEY (`id_genero_ectoparasito`) REFERENCES `genero_ectoparasito` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `analise_ectoparasito_necropsia_id_necropsia_fkey` FOREIGN KEY (`id_necropsia`) REFERENCES `necropsia` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `analise_ectoparasito_necropsia_id_subespecie_ectoparasito_fkey` FOREIGN KEY (`id_subespecie_ectoparasito`) REFERENCES `especie_ectoparasito` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `analise_ectoparasito_necropsia`
--

LOCK TABLES `analise_ectoparasito_necropsia` WRITE;
/*!40000 ALTER TABLE `analise_ectoparasito_necropsia` DISABLE KEYS */;
/*!40000 ALTER TABLE `analise_ectoparasito_necropsia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `analise_ectoparasito_veterinario`
--

DROP TABLE IF EXISTS `analise_ectoparasito_veterinario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `analise_ectoparasito_veterinario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_visita_veterinaria` int NOT NULL,
  `id_genero_ectoparasito` int NOT NULL,
  `id_especie_ectoparasito` int NOT NULL,
  `id_subespecie_ectoparasito` int NOT NULL,
  `quantidade_machos` int NOT NULL,
  `quantidade_femeas` int NOT NULL,
  `quantidade_ninfas` int NOT NULL,
  `quantidade_larvas` int NOT NULL,
  `quantidade_ovos` int NOT NULL,
  `observacao` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `analise_ectoparasito_veterinario_id_visita_veterinaria_id_ge_key` (`id_visita_veterinaria`,`id_genero_ectoparasito`,`id_especie_ectoparasito`,`id_subespecie_ectoparasito`),
  KEY `analise_ectoparasito_veterinario_id_genero_ectoparasito_fkey` (`id_genero_ectoparasito`),
  KEY `analise_ectoparasito_veterinario_id_especie_ectoparasito_fkey` (`id_especie_ectoparasito`),
  KEY `analise_ectoparasito_veterinario_id_subespecie_ectoparasito_fkey` (`id_subespecie_ectoparasito`),
  CONSTRAINT `analise_ectoparasito_veterinario_id_especie_ectoparasito_fkey` FOREIGN KEY (`id_especie_ectoparasito`) REFERENCES `especie_ectoparasito` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `analise_ectoparasito_veterinario_id_genero_ectoparasito_fkey` FOREIGN KEY (`id_genero_ectoparasito`) REFERENCES `genero_ectoparasito` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `analise_ectoparasito_veterinario_id_subespecie_ectoparasito_fkey` FOREIGN KEY (`id_subespecie_ectoparasito`) REFERENCES `especie_ectoparasito` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `analise_ectoparasito_veterinario_id_visita_veterinaria_fkey` FOREIGN KEY (`id_visita_veterinaria`) REFERENCES `visita_veterinaria` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `analise_ectoparasito_veterinario`
--

LOCK TABLES `analise_ectoparasito_veterinario` WRITE;
/*!40000 ALTER TABLE `analise_ectoparasito_veterinario` DISABLE KEYS */;
INSERT INTO `analise_ectoparasito_veterinario` VALUES (1,12,1,1,1,1,1,1,1,1,NULL);
/*!40000 ALTER TABLE `analise_ectoparasito_veterinario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `analise_fezes`
--

DROP TABLE IF EXISTS `analise_fezes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `analise_fezes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_visita_veterinaria` int NOT NULL,
  `peso` double NOT NULL,
  `id_tecnologia_processamento` int NOT NULL,
  `observacao` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `analise_fezes_id_visita_veterinaria_key` (`id_visita_veterinaria`),
  KEY `analise_fezes_id_tecnologia_processamento_fkey` (`id_tecnologia_processamento`),
  CONSTRAINT `analise_fezes_id_tecnologia_processamento_fkey` FOREIGN KEY (`id_tecnologia_processamento`) REFERENCES `tecnologia_processamento` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `analise_fezes_id_visita_veterinaria_fkey` FOREIGN KEY (`id_visita_veterinaria`) REFERENCES `visita_veterinaria` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `analise_fezes`
--

LOCK TABLES `analise_fezes` WRITE;
/*!40000 ALTER TABLE `analise_fezes` DISABLE KEYS */;
INSERT INTO `analise_fezes` VALUES (1,12,1,1,NULL),(2,11,123,1,NULL);
/*!40000 ALTER TABLE `analise_fezes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `analise_helminto`
--

DROP TABLE IF EXISTS `analise_helminto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `analise_helminto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_necropsia` int NOT NULL,
  `id_especie_helminto` int NOT NULL,
  `localizacao` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `quantidade_machos` int NOT NULL,
  `quantidade_femeas` int NOT NULL,
  `quantidade_total` int NOT NULL,
  `observacao` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `analise_helminto_id_necropsia_fkey` (`id_necropsia`),
  KEY `analise_helminto_id_especie_helminto_fkey` (`id_especie_helminto`),
  CONSTRAINT `analise_helminto_id_especie_helminto_fkey` FOREIGN KEY (`id_especie_helminto`) REFERENCES `especie_helminto` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `analise_helminto_id_necropsia_fkey` FOREIGN KEY (`id_necropsia`) REFERENCES `necropsia` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `analise_helminto`
--

LOCK TABLES `analise_helminto` WRITE;
/*!40000 ALTER TABLE `analise_helminto` DISABLE KEYS */;
/*!40000 ALTER TABLE `analise_helminto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `analise_molecular`
--

DROP TABLE IF EXISTS `analise_molecular`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `analise_molecular` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_analise_fezes` int NOT NULL,
  `id_especie_ovo_cisto` int NOT NULL,
  `observacao` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `analise_molecular_id_analise_fezes_id_especie_ovo_cisto_key` (`id_analise_fezes`,`id_especie_ovo_cisto`),
  KEY `analise_molecular_id_especie_ovo_cisto_fkey` (`id_especie_ovo_cisto`),
  CONSTRAINT `analise_molecular_id_analise_fezes_fkey` FOREIGN KEY (`id_analise_fezes`) REFERENCES `analise_fezes` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `analise_molecular_id_especie_ovo_cisto_fkey` FOREIGN KEY (`id_especie_ovo_cisto`) REFERENCES `especie_ovo_cisto` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `analise_molecular`
--

LOCK TABLES `analise_molecular` WRITE;
/*!40000 ALTER TABLE `analise_molecular` DISABLE KEYS */;
INSERT INTO `analise_molecular` VALUES (1,1,1,'123');
/*!40000 ALTER TABLE `analise_molecular` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `analise_ovo_cisto`
--

DROP TABLE IF EXISTS `analise_ovo_cisto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `analise_ovo_cisto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_analise_fezes` int NOT NULL,
  `id_especie_ovo_cisto` int NOT NULL,
  `quantidade` int NOT NULL,
  `observacao` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `analise_ovo_cisto_id_analise_fezes_id_especie_ovo_cisto_key` (`id_analise_fezes`,`id_especie_ovo_cisto`),
  KEY `analise_ovo_cisto_id_especie_ovo_cisto_fkey` (`id_especie_ovo_cisto`),
  CONSTRAINT `analise_ovo_cisto_id_analise_fezes_fkey` FOREIGN KEY (`id_analise_fezes`) REFERENCES `analise_fezes` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `analise_ovo_cisto_id_especie_ovo_cisto_fkey` FOREIGN KEY (`id_especie_ovo_cisto`) REFERENCES `especie_ovo_cisto` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `analise_ovo_cisto`
--

LOCK TABLES `analise_ovo_cisto` WRITE;
/*!40000 ALTER TABLE `analise_ovo_cisto` DISABLE KEYS */;
INSERT INTO `analise_ovo_cisto` VALUES (1,1,1,1,NULL),(2,2,1,123,NULL);
/*!40000 ALTER TABLE `analise_ovo_cisto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `analise_sorologica`
--

DROP TABLE IF EXISTS `analise_sorologica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `analise_sorologica` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_visita_veterinaria` int NOT NULL,
  `id_teste_sorologico` int NOT NULL,
  `id_agente_sorologico` int NOT NULL,
  `resultado` double NOT NULL,
  `id_interpretacao` int NOT NULL,
  `id_tipo_resultado` int NOT NULL,
  `simbolo_ponto_corte` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `valor_ponto_corte` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `analise_sorologica_id_visita_veterinaria_key` (`id_visita_veterinaria`),
  KEY `analise_sorologica_id_teste_sorologico_fkey` (`id_teste_sorologico`),
  KEY `analise_sorologica_id_agente_sorologico_fkey` (`id_agente_sorologico`),
  KEY `analise_sorologica_id_interpretacao_fkey` (`id_interpretacao`),
  KEY `analise_sorologica_id_tipo_resultado_fkey` (`id_tipo_resultado`),
  CONSTRAINT `analise_sorologica_id_agente_sorologico_fkey` FOREIGN KEY (`id_agente_sorologico`) REFERENCES `agente_sorologico` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `analise_sorologica_id_interpretacao_fkey` FOREIGN KEY (`id_interpretacao`) REFERENCES `enum_interpretacao_analise_sorologica` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `analise_sorologica_id_teste_sorologico_fkey` FOREIGN KEY (`id_teste_sorologico`) REFERENCES `teste_sorologico` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `analise_sorologica_id_tipo_resultado_fkey` FOREIGN KEY (`id_tipo_resultado`) REFERENCES `enum_tipo_resultado_analise_sorologica` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `analise_sorologica_id_visita_veterinaria_fkey` FOREIGN KEY (`id_visita_veterinaria`) REFERENCES `visita_veterinaria` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `analise_sorologica`
--

LOCK TABLES `analise_sorologica` WRITE;
/*!40000 ALTER TABLE `analise_sorologica` DISABLE KEYS */;
INSERT INTO `analise_sorologica` VALUES (1,12,1,1,123,2,1,'≥','1:50');
/*!40000 ALTER TABLE `analise_sorologica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `animal_morto`
--

DROP TABLE IF EXISTS `animal_morto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animal_morto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_grupo_animal_morto` int NOT NULL,
  `id_especie` int NOT NULL,
  `id_origem_animal_morto` int NOT NULL,
  `id_status_animal_morto` int NOT NULL,
  `data_coleta` datetime NOT NULL,
  `id_responsavel_coleta` int NOT NULL,
  `longitude_coleta` double NOT NULL,
  `latitude_coleta` double NOT NULL,
  `link_imagem` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `observacao` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `codigo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `animal_morto_codigo_key` (`codigo`),
  KEY `animal_morto_id_grupo_animal_morto_fkey` (`id_grupo_animal_morto`),
  KEY `animal_morto_id_especie_fkey` (`id_especie`),
  KEY `animal_morto_id_origem_animal_morto_fkey` (`id_origem_animal_morto`),
  KEY `animal_morto_id_status_animal_morto_fkey` (`id_status_animal_morto`),
  KEY `animal_morto_id_responsavel_coleta_fkey` (`id_responsavel_coleta`),
  CONSTRAINT `animal_morto_id_especie_fkey` FOREIGN KEY (`id_especie`) REFERENCES `especie` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `animal_morto_id_grupo_animal_morto_fkey` FOREIGN KEY (`id_grupo_animal_morto`) REFERENCES `grupo_animal_morto` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `animal_morto_id_origem_animal_morto_fkey` FOREIGN KEY (`id_origem_animal_morto`) REFERENCES `enum_origem_animal_morto` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `animal_morto_id_responsavel_coleta_fkey` FOREIGN KEY (`id_responsavel_coleta`) REFERENCES `responsavel_coleta` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `animal_morto_id_status_animal_morto_fkey` FOREIGN KEY (`id_status_animal_morto`) REFERENCES `enum_status_animal_morto` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animal_morto`
--

LOCK TABLES `animal_morto` WRITE;
/*!40000 ALTER TABLE `animal_morto` DISABLE KEYS */;
INSERT INTO `animal_morto` VALUES (1,1,2,2,2,'2026-12-12 12:00:00.000',3,123,123,NULL,NULL,'LEIMA 01');
/*!40000 ALTER TABLE `animal_morto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `animal_vivo`
--

DROP TABLE IF EXISTS `animal_vivo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `animal_vivo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_especie` int NOT NULL,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_genero` int NOT NULL,
  `data_nascimento` datetime NOT NULL,
  `ativo` tinyint(1) NOT NULL,
  `foto_animal` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `link_carteirinha` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_tutor` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `animal_vivo_id_especie_fkey` (`id_especie`),
  KEY `animal_vivo_id_genero_fkey` (`id_genero`),
  KEY `animal_vivo_id_tutor_fkey` (`id_tutor`),
  CONSTRAINT `animal_vivo_id_especie_fkey` FOREIGN KEY (`id_especie`) REFERENCES `especie` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `animal_vivo_id_genero_fkey` FOREIGN KEY (`id_genero`) REFERENCES `enum_genero_animal` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `animal_vivo_id_tutor_fkey` FOREIGN KEY (`id_tutor`) REFERENCES `tutor` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animal_vivo`
--

LOCK TABLES `animal_vivo` WRITE;
/*!40000 ALTER TABLE `animal_vivo` DISABLE KEYS */;
INSERT INTO `animal_vivo` VALUES (1,1,'Animal Teste 1',1,'2024-02-01 12:00:00.000',1,'https://mail.google.com/mail/u/3/#inbox',NULL,1),(2,1,'Animal Teste 2',2,'2025-10-01 00:00:00.000',1,NULL,NULL,1),(3,2,'Animal Teste 3',1,'2024-04-02 12:00:00.000',1,NULL,NULL,1);
/*!40000 ALTER TABLE `animal_vivo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aplicacao_vacina`
--

DROP TABLE IF EXISTS `aplicacao_vacina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `aplicacao_vacina` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_animal_vivo` int NOT NULL,
  `id_vacina` int NOT NULL,
  `id_visita_veterinaria` int DEFAULT NULL,
  `data` datetime NOT NULL,
  `id_tipo_vacina` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `aplicacao_vacina_id_animal_vivo_fkey` (`id_animal_vivo`),
  KEY `aplicacao_vacina_id_vacina_fkey` (`id_vacina`),
  KEY `aplicacao_vacina_id_visita_veterinaria_fkey` (`id_visita_veterinaria`),
  KEY `aplicacao_vacina_id_tipo_vacina_fkey` (`id_tipo_vacina`),
  CONSTRAINT `aplicacao_vacina_id_animal_vivo_fkey` FOREIGN KEY (`id_animal_vivo`) REFERENCES `animal_vivo` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `aplicacao_vacina_id_tipo_vacina_fkey` FOREIGN KEY (`id_tipo_vacina`) REFERENCES `enum_tipo_vacina` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `aplicacao_vacina_id_vacina_fkey` FOREIGN KEY (`id_vacina`) REFERENCES `vacina` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `aplicacao_vacina_id_visita_veterinaria_fkey` FOREIGN KEY (`id_visita_veterinaria`) REFERENCES `visita_veterinaria` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aplicacao_vacina`
--

LOCK TABLES `aplicacao_vacina` WRITE;
/*!40000 ALTER TABLE `aplicacao_vacina` DISABLE KEYS */;
INSERT INTO `aplicacao_vacina` VALUES (6,2,1,NULL,'2025-12-12 15:00:00.000',1),(7,1,2,11,'2025-12-12 15:00:00.000',1),(8,1,1,11,'2025-12-12 15:00:00.000',1);
/*!40000 ALTER TABLE `aplicacao_vacina` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `armazem`
--

DROP TABLE IF EXISTS `armazem`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `armazem` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `armazem`
--

LOCK TABLES `armazem` WRITE;
/*!40000 ALTER TABLE `armazem` DISABLE KEYS */;
INSERT INTO `armazem` VALUES (1,'LEMA'),(2,'ScienceVet'),(3,'LEIMA'),(4,'IOC-FIOCRUZ'),(5,'ImunoDot');
/*!40000 ALTER TABLE `armazem` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `auditlog`
--

DROP TABLE IF EXISTS `auditlog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `auditlog` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_usuario` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `date` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `acao` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_formulario` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `auditlog_id_usuario_fkey` (`id_usuario`),
  KEY `auditlog_id_formulario_fkey` (`id_formulario`),
  CONSTRAINT `auditlog_id_formulario_fkey` FOREIGN KEY (`id_formulario`) REFERENCES `formulario` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `auditlog_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `auditlog`
--

LOCK TABLES `auditlog` WRITE;
/*!40000 ALTER TABLE `auditlog` DISABLE KEYS */;
INSERT INTO `auditlog` VALUES ('','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-06 17:43:47.121','SUBMIT','examefisico'),('016aee72-ba42-4c71-9833-2d25358447fd','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-22 13:56:12.782','SUBMIT','entrevista'),('01bfd082-ae78-40ab-93c3-d276b6ae0857','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-27 18:11:23.706','SUBMIT','amostras-av'),('01c9ef87-7a6c-4f6e-ad42-669d596f2f7b','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 23:04:33.263','SUBMIT','visitaveterinaria'),('026c710a-cbca-45c0-a042-ff4f94c2b2ac','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-26 20:04:56.116','SUBMIT','vacina'),('046d1565-4e2e-4c02-8c7a-ed0b9c799d82','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-26 21:57:27.033','SUBMIT','cadastrobasico-av'),('05cf41fb-536b-4d42-94f4-089ca006e73f','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 22:17:28.307','SUBMIT','visitaveterinaria'),('0729eff2-35a5-4704-a185-68095f3ce86c','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-22 13:52:44.564','SUBMIT','entrevista'),('074f6095-c982-456f-8664-c896930c252c','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 20:37:36.643','SUBMIT','visitaveterinaria'),('081839b7-b425-4675-bcfa-b67ce0e7eda6','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 23:00:53.287','SUBMIT','visitaveterinaria'),('086119fd-1cb2-44a8-8bc6-d98a66db35b7','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 22:38:19.361','SUBMIT','visitaveterinaria'),('08d9dc61-68a5-4773-885b-0cb1a864b979','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-05-07 20:13:25.272','SUBMIT','analisefezes'),('0a5df749-a378-4965-80fc-652304c90909','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-16 13:07:43.773','SUBMIT','amostras-av'),('0b6321ca-1dea-4411-a4a4-f57aa32779bf','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-27 00:28:56.635','SUBMIT','amostras-av'),('0be3fdc9-8f27-490f-ac27-354e9265fd3c','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 23:08:32.733','SUBMIT','visitaveterinaria'),('0cb3f461-4c9e-47c5-8a65-590fb5afe5b3','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 23:06:38.557','SUBMIT','visitaveterinaria'),('0e96d9bc-c9bb-48c6-8645-fa2451bb0cb2','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-16 11:29:55.427','SUBMIT','visitaveterinaria'),('10ad9873-d58e-4a20-b3eb-69522c3ba3dc','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-02 13:33:19.589','SUBMIT','visitaveterinaria'),('10d31eb8-c6ea-4cb4-bef0-23b218833bf1','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-26 19:36:20.208','SUBMIT','resultadoexame-av'),('10e72f28-f728-403c-9f0b-77d71072919c','5d98ce9c-07fa-4046-b40e-54ff4c733590','2026-03-16 18:33:31.904','SUBMIT','visitaveterinaria'),('12196afd-b11c-4e98-b924-dc033a183b2e','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-26 20:06:35.387','SUBMIT','vacina'),('13779546-4be1-48d9-b4d9-437decaf22cb','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-05-07 20:36:16.422','SUBMIT','analisemolecular'),('1521c2e9-fcb3-4342-83ab-510beb678ca7','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-02 13:24:50.754','SUBMIT','visitaveterinaria'),('16209039-514e-4f37-886c-7e5588f26007','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-21 21:51:17.771','SUBMIT','amostras-am'),('1659610b-acb9-4429-9d84-eab1b9c8696e','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-16 13:10:19.469','SUBMIT','vacina'),('1a5859ec-06bb-4ed2-bf92-c7f70021efea','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-16 11:30:14.558','SUBMIT','visitaveterinaria'),('1a996a49-5cb2-473e-ac8a-80bc7e158b83','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-15 20:58:53.125','SUBMIT','entrevista'),('1deffba2-d7d0-4329-a4e6-eaa6db20a2e2','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-16 11:27:46.267','SUBMIT','visitaveterinaria'),('2030562c-2ec7-42ea-b5bc-682399f59bee','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-08 21:07:49.929','SUBMIT','vacina'),('2077eeba-af7a-493c-afd8-c16e357c7695','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 23:03:29.452','SUBMIT','visitaveterinaria'),('20813f0f-7908-4b5e-99a3-bcfa1a672863','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-25 14:26:39.074','SUBMIT','visitaveterinaria'),('20b93232-14ea-47a3-9177-a4b15e05b2cf','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-09 16:52:41.530','SUBMIT','amostras-av'),('21180d19-b9dc-4650-b3b2-b369b9052d2d','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-25 14:24:38.142','DELETE','amostras-av'),('21be68f0-92d5-4a0e-a589-f697801159cd','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-25 14:26:31.367','SUBMIT','visitaveterinaria'),('238d1139-044b-492e-b639-1416ba8a1e40','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-01 20:12:27.294','SUBMIT','animal-av'),('23afec38-9709-463a-9189-d69ca703bd86','5d98ce9c-07fa-4046-b40e-54ff4c733590','2026-03-26 19:54:53.712','SUBMIT','amostras-av'),('248e9268-9a55-4664-a13e-9e9200e94ffc','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-15 20:58:58.276','SUBMIT','entrevista'),('2506dc55-334f-4720-82db-441e698b70c1','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 23:01:01.434','SUBMIT','visitaveterinaria'),('26a566ab-b2cf-4e72-aaa1-5b7c83a21d9f','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-25 14:24:55.456','SUBMIT','vacina'),('2783b98c-4f48-455d-8ce9-49ab0a9dba16','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-26 21:56:42.903','SUBMIT','cadastrobasico-av'),('285fe6f1-094f-4364-826d-637e9ac5ca8f','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-26 19:45:45.297','SUBMIT','resultadoexame-av'),('28cfb68c-6d1d-4a3d-aa17-f69aa66b0090','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-06 12:56:35.192','SUBMIT','visitaveterinaria'),('29b8b505-ee3b-4f45-b922-941f009401d3','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-27 18:12:15.864','SUBMIT','amostras-av'),('2af5a155-73d1-46cf-9fe3-4a1901825305','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 20:49:32.475','SUBMIT','visitaveterinaria'),('2af6458d-f558-409a-9b0f-d8149e3d16fd','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-15 20:26:14.032','SUBMIT','entrevista'),('2c30f44c-43f4-4d85-a84c-cba18a5bdc6f','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-27 13:48:15.632','SUBMIT','resultadoexame-av'),('2c4957a6-1038-4a3e-9ae7-71d36675bbb6','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-16 19:02:55.514','SUBMIT','visitaveterinaria'),('2d883305-d1e3-4df2-a9dc-f6f697489b44','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-16 11:27:19.467','SUBMIT','visitaveterinaria'),('2df69237-f587-4295-b86f-c468e5d769ee','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-25 14:33:54.414','SUBMIT','visitaveterinaria'),('2e0e9e73-d904-4181-9999-f6ee576fff01','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-19 21:29:56.433','SUBMIT','visitaveterinaria'),('3052ec0c-955c-4b16-8267-993e9de3c58a','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-03 22:16:10.396','SUBMIT','castracao'),('30c2e078-f77a-478c-91bd-3b8f5575b2bf','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 23:03:23.710','SUBMIT','visitaveterinaria'),('316ffda5-dbf3-4a37-b6f3-6c527820d954','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-05-22 14:57:12.662','SUBMIT','entrevista'),('3174d9f0-afb0-4f14-831b-6f52715b2fb5','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-05-22 14:57:59.959','SUBMIT','entrevista'),('349fd84b-e570-4a98-8393-32f0d8bf58f8','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-16 13:54:16.311','SUBMIT','visitaveterinaria'),('37eca6db-12b1-4f2e-bee1-71878e36dcab','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-17 22:33:10.581','SUBMIT','visitaveterinaria'),('3899f44f-4516-4612-abfe-4c520c449879','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-28 20:46:35.397','SUBMIT','amostras-av'),('399cb2fb-743e-4840-bd28-29caa505a45a','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-25 14:24:47.780','SUBMIT','vacina'),('3ab85329-6cd3-4036-b5f5-972d3d29ba33','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-16 11:28:37.832','SUBMIT','vacina'),('3ace798d-261b-4c8f-84fb-b496cea1a7e0','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-16 11:29:28.925','SUBMIT','visitaveterinaria'),('3af6bbda-d816-477a-b7d4-37edb63fbefb','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-02 13:26:29.429','SUBMIT','visitaveterinaria'),('3c15b7d3-9d6b-4c8a-82c4-35c6f7bd7519','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-05-25 12:26:53.718','SUBMIT','entrevista'),('3cf196b8-a895-42f5-9692-fb464cdab99f','5d98ce9c-07fa-4046-b40e-54ff4c733590','2026-03-20 20:24:35.982','SUBMIT','visitaveterinaria'),('3d9ce133-72d3-44f7-b65d-e9f4f84a74f7','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-16 20:41:43.390','SUBMIT','visitaveterinaria'),('40bf7da6-d1c7-4719-a076-e411fa4e2927','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 22:39:32.713','SUBMIT','visitaveterinaria'),('40dbdeed-8218-4f93-85f7-d304124ed304','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-21 22:54:32.762','SUBMIT','amostras-am'),('41c72cee-a5ab-4398-876f-c9d19a726774','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-26 20:06:46.703','SUBMIT','vacina'),('424463ca-6930-4e6e-9b60-3c372308ac14','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-27 13:38:22.613','SUBMIT','visitaveterinaria'),('424f10ad-09b9-4c08-9433-e176c201ec51','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-16 11:27:26.713','SUBMIT','visitaveterinaria'),('42620b8d-d8a5-482c-95f6-2a65a433dd94','5d98ce9c-07fa-4046-b40e-54ff4c733590','2026-03-17 22:54:12.624','SUBMIT','visitaveterinaria'),('44b250ea-8992-4f4b-9ebd-bcf5f3194d66','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-27 12:31:42.367','SUBMIT','amostras-av'),('44d0c36a-cc82-4573-a3b5-d5d1a485efd8','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-25 14:25:04.649','SUBMIT','visitaveterinaria'),('477687e1-a187-45d5-8f73-fb2f764a8ca9','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-16 00:40:59.567','SUBMIT','visitaveterinaria'),('484beeea-4356-455a-9fc5-a32d251782a6','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-27 12:33:07.195','SUBMIT','amostras-av'),('49112fd8-0223-4349-a7bf-39fbf7aa1278','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-27 18:14:45.614','SUBMIT','amostras-av'),('4a568606-72ec-40f3-a19b-27f90475539f','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 23:04:18.636','SUBMIT','visitaveterinaria'),('4cc0917e-7046-44ba-a103-660cc560de49','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-08 20:51:25.094','SUBMIT','vacina'),('4db34fb6-2c1e-43c0-8c72-76c78e1c4ba7','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 23:16:33.373','SUBMIT','visitaveterinaria'),('4def2d6b-48ad-4f6f-9f41-16553e74e19b','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-16 14:02:27.071','DELETE','amostras-av'),('4e2b3f3a-b9fb-4210-b7b1-eb0a9c947334','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-27 18:09:21.802','SUBMIT','amostras-av'),('4e473143-d12c-49e5-83fc-3930ed49340c','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-02 13:30:24.269','SUBMIT','visitaveterinaria'),('50e68a2c-6f5e-45ea-9db5-4e560b07dff7','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-05-05 19:04:59.213','SUBMIT','analiseectoparasitos-av'),('518c673e-bfe1-408d-a4b4-3ab1231ba3e0','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-16 13:05:25.506','SUBMIT','visitaveterinaria'),('544bdbcb-e2c5-4dd7-8ffb-99860cd1d08b','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 20:33:22.040','SUBMIT','visitaveterinaria'),('57565f13-be70-4bf2-a7bb-f728a7b34fc6','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-27 18:11:58.089','SUBMIT','amostras-av'),('57898072-992f-4571-bd6a-5ccbb16b81d9','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-05-20 20:30:18.056','SUBMIT','visitaveterinaria'),('580e797d-1f4a-4e34-b615-549ccdffcfdb','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 22:39:31.249','SUBMIT','visitaveterinaria'),('5bfa634e-5d00-4806-a4ab-32b760084a87','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-17 22:32:54.979','SUBMIT','visitaveterinaria'),('5cfe26e2-b71c-4e8d-a4dc-0041b37e65a8','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-26 21:57:54.637','SUBMIT','cadastrobasico-av'),('5e355148-6c95-49f0-b733-4eeafc8d018b','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-02 13:36:58.059','SUBMIT','visitaveterinaria'),('5eb2488a-2c86-4a7c-a120-45260e24087e','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 23:09:47.986','SUBMIT','visitaveterinaria'),('5fba3d3d-fdf4-4afd-8c50-4739da1f2e8d','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 22:34:06.913','SUBMIT','visitaveterinaria'),('61ed1753-3222-4b57-b3b9-1b2861e90450','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-05-07 20:39:36.099','SUBMIT','vacina'),('62e9517e-22d1-4d9a-a98c-2724d78f521a','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-02 13:31:57.514','SUBMIT','visitaveterinaria'),('62ef141a-4fc1-4416-9dde-bade267227c5','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-26 21:56:33.608','SUBMIT','cadastrobasico-av'),('663875c5-64fb-47da-b47e-72e34bb305a0','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-25 14:26:34.113','SUBMIT','visitaveterinaria'),('68cd32a7-58a6-4ebb-97d9-4b65d66c823e','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-08 21:17:29.379','SUBMIT','vacina'),('6b2ec761-b2d2-407e-8eb2-7412dd2eb9ce','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-02 13:59:17.070','SUBMIT','visitaveterinaria'),('6c518919-b173-4332-8445-20e2eba6ae7a','5d98ce9c-07fa-4046-b40e-54ff4c733590','2026-03-26 19:12:31.171','SUBMIT','amostras-av'),('6c51c92d-942e-479c-89b7-ccd7229f1ca6','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-06 12:23:06.746','SUBMIT','visitaveterinaria'),('6c69c0ea-204b-46d8-bb75-3d8771d2df96','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-26 19:42:33.593','SUBMIT','resultadoexame-av'),('6d0f07f3-204c-421e-8d9e-d8ef082be92e','5d98ce9c-07fa-4046-b40e-54ff4c733590','2026-03-26 19:16:22.022','SUBMIT','amostras-av'),('6d739878-1663-47e7-b7c1-6cfb5010f2a2','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 23:08:47.959','SUBMIT','visitaveterinaria'),('6e7edb1b-9b0d-43da-a014-5eae968e074e','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-22 13:53:37.904','SUBMIT','entrevista'),('6e91608f-f828-4e76-b6b6-188aa0cdfeb4','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 22:30:42.786','SUBMIT','visitaveterinaria'),('70260461-0eb4-434d-8dda-3ee9959b7ee9','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-18 21:59:35.756','UPDATE','necropsia'),('72bd7a96-9354-4923-a6a3-1b3339b13854','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-27 18:12:05.354','SUBMIT','amostras-av'),('739f264f-6c20-4d74-bf01-969162223b52','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-25 14:24:44.152','SUBMIT','vacina'),('783e5dcf-4f89-4d22-9ff9-e382f06c901a','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-05-11 11:51:31.416','SUBMIT','analiseovocistos'),('788364db-0417-490a-b904-99b35239c4ef','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-09 17:04:12.131','SUBMIT','vacina'),('78ebca2d-400f-4bae-b110-aeba9b6ecade','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-21 22:19:07.009','SUBMIT','entrevista'),('79b1a19b-539d-43a8-9cfe-717e7aa3e27c','09af1365-644c-4dd7-8a4b-f00b57024c95','2026-03-13 13:41:11.678','SUBMIT','visitaveterinaria'),('79db068c-30ce-4147-a345-3923addc06ed','5d98ce9c-07fa-4046-b40e-54ff4c733590','2026-03-26 19:17:33.752','SUBMIT','amostras-av'),('7a0b3490-6284-4bcd-8488-56066efd0121','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-18 21:48:20.505','UPDATE','necropsia'),('7b5d3709-613f-4a80-b105-a5eb3f52961b','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 23:08:55.252','SUBMIT','visitaveterinaria'),('7e88c471-4414-446b-939f-717776eab1dc','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-08 11:55:34.830','SUBMIT','animal-av'),('7f7aaae3-4570-4c20-81c7-e07dea94e9c6','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-26 21:57:39.712','SUBMIT','cadastrobasico-av'),('7f9ebe55-b877-4903-8217-0a5369b39c13','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 22:39:48.460','SUBMIT','visitaveterinaria'),('7fb46dd1-9432-4004-be8a-cc0696b58557','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-18 21:58:24.938','UPDATE','necropsia'),('7ffa13f7-8450-4b96-b70d-b0002c9b0b57','5d98ce9c-07fa-4046-b40e-54ff4c733590','2026-03-17 22:53:58.008','SUBMIT','visitaveterinaria'),('817352e6-6b83-4df2-8824-f1659381345e','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 22:40:15.244','SUBMIT','visitaveterinaria'),('818ddbee-d2ac-4ed8-80cc-59f2ba9ffcbb','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-22 13:27:58.416','SUBMIT','entrevista'),('81a15b07-40ec-4b97-b24f-37b03eb899a3','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 22:38:37.853','SUBMIT','visitaveterinaria'),('822ded34-7159-47a7-8dae-f49e3d66b276','5d98ce9c-07fa-4046-b40e-54ff4c733590','2026-03-25 20:53:37.690','SUBMIT','amostras-av'),('8316fb24-d8c3-426f-989a-d19698808463','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-16 11:28:24.096','SUBMIT','vacina'),('83a0cad0-7708-4b42-a1e7-1861bcdb249a','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-18 19:44:41.636','SUBMIT','animal-am'),('83ecd3f7-19df-4934-9f84-79d6fed00f52','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 23:08:22.244','SUBMIT','visitaveterinaria'),('84451d22-3f72-401a-906b-7220742cdbe5','5d98ce9c-07fa-4046-b40e-54ff4c733590','2026-03-26 19:52:18.995','SUBMIT','amostras-av'),('84f1ba3f-0c40-4610-b1bc-83b905d58e55','5d98ce9c-07fa-4046-b40e-54ff4c733590','2026-03-26 19:58:05.575','SUBMIT','amostras-av'),('864e769a-27d8-4411-8740-22028d6a192e','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-05-22 14:56:06.931','SUBMIT','entrevista'),('872500c8-9db9-44e0-ab10-1c7f1d6a2cdd','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-25 14:26:36.484','SUBMIT','visitaveterinaria'),('87aac496-06d4-4cb0-a9d2-7a7e04843bd9','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-26 21:55:44.379','SUBMIT','cadastrobasico-av'),('87f8a485-a7af-47a2-ac77-a80d8ff694aa','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-13 23:04:53.441','SUBMIT','castracao'),('8b0b88a5-749d-45ca-a54a-b2ad455c8800','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-16 13:05:29.913','SUBMIT','visitaveterinaria'),('8b78f7c2-1713-4fc9-855b-f8a7ac7dd485','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-25 14:25:01.733','SUBMIT','visitaveterinaria'),('8c28ea4b-1aa1-4ab6-bb8c-1f82d2feb2a9','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-27 18:25:51.675','DELETE','amostras-av'),('8c8795b2-219b-4c35-85eb-853409b30ed8','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-16 13:51:23.086','SUBMIT','visitaveterinaria'),('8e1d98fe-255e-4e0b-aa70-0190416700fe','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-02 14:01:25.076','SUBMIT','visitaveterinaria'),('8f0f7545-499b-46cc-8b54-667efdb9d63a','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-26 21:55:38.492','SUBMIT','cadastrobasico-av'),('917873a6-6f55-4171-9550-347ec9e60ae4','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 23:08:25.630','SUBMIT','visitaveterinaria'),('924cb362-6739-490c-abee-f4af0e57bf11','5d98ce9c-07fa-4046-b40e-54ff4c733590','2026-03-26 19:18:10.519','SUBMIT','amostras-av'),('945d2b13-3a73-44e4-a566-d834d23ec28f','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-25 14:24:32.267','DELETE','amostras-av'),('95cbbcef-ce7e-4872-a645-71581baec396','5d98ce9c-07fa-4046-b40e-54ff4c733590','2026-03-26 20:03:24.306','SUBMIT','amostras-av'),('974a424f-fe1d-46f8-bc47-d1725f1e1af2','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-25 14:26:28.204','SUBMIT','visitaveterinaria'),('97718a79-a274-4755-bc50-770fc4d89bb6','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-02 13:37:15.389','SUBMIT','visitaveterinaria'),('9835bcc5-a052-40c8-939f-74fb4f3919a9','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-26 21:57:16.836','SUBMIT','cadastrobasico-av'),('9ad26f59-248f-4e16-93ca-73c86c170f6e','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 23:06:30.723','SUBMIT','visitaveterinaria'),('9b16dc6c-b74a-4257-98c6-ea30075b335a','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-08 20:51:43.831','SUBMIT','vacina'),('9cf0c669-257a-4d18-8b63-577591b9c968','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-26 21:55:01.302','SUBMIT','cadastrobasico-av'),('9d13beb4-d355-430e-aef4-c25233d1567a','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-16 11:27:40.750','SUBMIT','visitaveterinaria'),('a2e8da81-429b-4e3f-bf7c-1676181f44d6','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-26 21:57:34.237','SUBMIT','cadastrobasico-av'),('a3a7cf7b-9392-41ab-8bd5-14efb59292b6','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-26 21:55:51.742','SUBMIT','cadastrobasico-av'),('a40753db-672f-48e1-80fb-a1d65b00e6f6','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-02 13:37:23.694','SUBMIT','visitaveterinaria'),('a68a5751-b686-445f-bca3-13c66dbf3b65','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-05-25 13:38:38.299','SUBMIT','entrevista'),('aaa01eb9-06bf-4fb3-bb62-73b3ebc4028d','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-18 21:59:40.519','UPDATE','necropsia'),('aab4c0aa-478a-47e7-9a8f-74c25610e232','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-02 13:58:38.896','SUBMIT','amostras-av'),('ac94ec39-6f9d-4525-8648-082a0f7c6335','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-27 00:29:11.793','SUBMIT','amostras-av'),('ad018eba-50bf-40b6-a22a-133a1183b8d7','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 23:13:10.416','SUBMIT','visitaveterinaria'),('ad750b00-43f3-4fbd-9a6e-1f6dd8db2d83','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-26 21:59:27.710','SUBMIT','cadastrobasico-av'),('aed71874-6a27-4a1f-93ec-9a3aca92a152','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-02 12:42:58.984','SUBMIT','amostras-av'),('af70a5a0-cb53-4e40-a756-fa7a8cf6e090','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-27 00:30:15.621','SUBMIT','visitaveterinaria'),('b0509cbc-4655-43a0-ab9c-a5534fc6cf72','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-21 22:54:37.731','SUBMIT','amostras-am'),('b3057355-d0f2-4dc0-8276-281be910a1ed','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-16 14:05:47.631','SUBMIT','examefisico'),('b607b948-58b6-4d75-97d1-603be2a62271','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-06 17:50:07.343','SUBMIT','examefisico'),('b625e00a-3d8e-4735-815d-0c308d910dde','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-02 12:31:49.030','SUBMIT','examefisico'),('b6bda64c-b15d-4377-a52b-650755d49e8b','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-05-22 14:58:04.559','SUBMIT','entrevista'),('b7397488-dee7-4aed-bf42-af5306c7316f','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-06 17:48:20.890','SUBMIT','visitaveterinaria'),('b765b84a-9bf2-4fea-a7ab-7a49bc9815e3','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-27 18:11:37.142','SUBMIT','amostras-av'),('b76711c3-5bbc-41ff-9703-22e844f4833a','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-22 13:28:56.977','SUBMIT','entrevista'),('ba12f8f3-b3e9-4183-afe3-a0e7ee9b35b3','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-26 20:04:45.446','SUBMIT','vacina'),('ba84e358-0a47-444b-97fe-4ada57f82b6a','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-15 20:58:41.017','SUBMIT','entrevista'),('bcff59cd-cfab-47d8-89b6-e33840145f78','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-02 13:37:08.982','SUBMIT','visitaveterinaria'),('be143cd7-86d3-4064-ab5f-260996a3ff7d','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-22 13:28:11.325','SUBMIT','entrevista'),('be6a601b-2159-4650-888b-855b43d35424','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-26 21:57:03.893','SUBMIT','cadastrobasico-av'),('bea013b1-a55b-4043-93b2-c69fface0c7f','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-25 14:24:52.123','SUBMIT','vacina'),('c19a3ceb-e2c9-489f-a841-6e2fdd9c915b','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-05-03 18:53:49.424','SUBMIT','resultadosorologico'),('c20c9c93-e17b-4ccf-a38a-80a4d61d8210','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-03 22:06:46.132','SUBMIT','castracao'),('c4017a8d-f6e1-431f-a5bf-5cf08a8fa9ec','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-16 14:05:06.012','SUBMIT','vacina'),('c4b2a542-65a3-4d87-bdb6-48bb75f07076','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-09 16:52:16.715','SUBMIT','amostras-av'),('c56a07d7-b8e9-4db4-a9df-157e615732f2','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-16 14:04:46.771','SUBMIT','vacina'),('c7999747-932d-4de0-9332-f03dfc083b74','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-25 14:24:35.405','DELETE','amostras-av'),('c9889762-f2ad-4ffe-8a51-515dbfbc0efe','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-08 11:55:22.346','SUBMIT','animal-av'),('cb37dac7-ae9e-48fb-a74d-57ec348b1300','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-18 21:48:10.006','SUBMIT','necropsia'),('ce659046-286e-46a7-8524-8ee18e223d1a','5d98ce9c-07fa-4046-b40e-54ff4c733590','2026-03-16 18:33:48.192','SUBMIT','visitaveterinaria'),('ce7d7543-54de-4f72-9db9-0c1362f1b395','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-05-20 20:19:56.283','SUBMIT','rastreiogps'),('cebdf072-4b50-4b63-bf06-9954f41cac42','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-16 14:01:59.175','SUBMIT','amostras-av'),('d42b505f-05f1-4427-963f-4481ac42d0f5','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-16 20:59:28.040','SUBMIT','visitaveterinaria'),('d45f8bb4-4c0c-4186-ab0b-1de85d84b241','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-02 12:25:16.804','SUBMIT','examefisico'),('d5b4bf3a-e21e-4ff1-829d-54531a7d31c3','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-25 14:24:28.504','SUBMIT','examefisico'),('d819cf67-01a9-4652-9bc4-615887da1411','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-02 12:31:21.108','SUBMIT','examefisico'),('d891d1df-c2c6-4e8e-a5f2-6fc4beb9c12f','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-02 13:37:12.401','SUBMIT','visitaveterinaria'),('d9a2e6a1-95fb-4aa0-bdd4-b60dd9786f60','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-21 22:18:41.507','SUBMIT','animal-av'),('da19214e-cb43-4ba9-b11f-859a13a3a34f','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-02 13:37:18.696','SUBMIT','visitaveterinaria'),('db7ba675-da5b-4aea-ba92-403504917cc3','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-26 21:59:32.015','SUBMIT','cadastrobasico-av'),('dcd8b5c8-d00d-480a-97a7-872695cec3eb','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-05-22 14:57:55.081','SUBMIT','entrevista'),('dec2ee50-55f2-4ae7-9159-7d98343ab431','5d98ce9c-07fa-4046-b40e-54ff4c733590','2026-03-25 20:53:17.384','SUBMIT','visitaveterinaria'),('e09647fc-267c-4184-9445-8e23abe6e0e4','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-05-25 13:45:20.741','SUBMIT','entrevista'),('e0e94d9d-f47d-4778-a063-b865e1c7a62e','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-08 21:16:27.072','SUBMIT','vacina'),('e0f297d9-d693-4833-88c6-df877cd8bc96','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-27 00:31:04.099','SUBMIT','examefisico'),('e16a0d06-1005-4f3c-b3ae-8d9211114e83','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-08 21:28:35.210','SUBMIT','vacina'),('e2a6bb41-fdd8-4d24-a7e9-3fcec458d12a','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-26 20:06:28.116','SUBMIT','vacina'),('e39da10b-b4e1-446b-9641-8ca116816074','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-16 20:51:42.530','SUBMIT','visitaveterinaria'),('e6728ede-5bbf-4d63-9734-1fe04a050032','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-09 16:52:27.988','SUBMIT','amostras-av'),('e7e6e907-6603-4bc5-a977-50ab2505f010','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-05-11 11:51:16.915','SUBMIT','analisefezes'),('eaf4479c-80fb-4ff0-bf02-550d4c54c8f6','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-21 22:54:24.609','SUBMIT','amostras-am'),('ec16caaf-4653-4790-adc0-d17da8460f39','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-16 11:27:33.742','SUBMIT','visitaveterinaria'),('ecbad320-07ef-4236-8013-a14cb3d06acd','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-17 22:33:01.873','SUBMIT','visitaveterinaria'),('eee3b1d7-4d8e-45dd-bc75-c8a0fb750608','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-08 21:30:26.170','SUBMIT','vacina'),('efd54900-7fc8-468e-a174-3466b12ce50b','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 22:17:21.297','SUBMIT','visitaveterinaria'),('f05ba225-619f-460e-9d31-f1bd43c5c6d3','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-27 12:29:58.851','SUBMIT','amostras-av'),('f0dad485-34cb-492f-a4ca-fc5b8619bffe','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-16 20:59:40.346','SUBMIT','visitaveterinaria'),('f107b9c8-a61e-4090-a3c2-08766951a0c5','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-04-06 17:50:50.356','SUBMIT','examefisico'),('f181b4d2-6eed-4e4e-b4b5-f0575cc05dc1','5d98ce9c-07fa-4046-b40e-54ff4c733590','2026-03-26 19:58:18.085','SUBMIT','amostras-av'),('f21e1b91-33db-4ea0-8d57-464f5334f536','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-05-20 20:19:22.092','SUBMIT','rastreiogps'),('f3094052-27ee-4e44-a976-fe079b248ff1','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-01 20:03:48.468','SUBMIT','animal-av'),('f4cfc609-6941-4ab3-bc67-41817741d4e1','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-05-25 13:46:01.766','SUBMIT','entrevista'),('f5b3a3d1-b57b-4126-937a-4f85379165f0','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-03 22:16:45.040','SUBMIT','castracao'),('f8c75d69-0e92-41a9-99da-0df4b9c0adcf','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-26 21:55:56.017','SUBMIT','cadastrobasico-av'),('fa025591-f1df-4cb4-9470-cc451162a5d2','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-05-07 20:26:59.863','SUBMIT','analiseovocistos'),('fa6f90c9-26a4-4011-872f-f1e7f1706c1d','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-13 23:05:10.594','SUBMIT','castracao'),('fa779762-5723-49d4-8e61-2040fff456cb','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-21 22:18:59.692','SUBMIT','entrevista'),('fb5e9b14-757b-4a16-bb19-fee94ccf38e1','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-03 22:16:52.198','SUBMIT','castracao'),('fe5ecf04-3306-414b-bf19-da23c8dddb85','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 23:08:38.260','SUBMIT','visitaveterinaria'),('ff04f677-2bae-4520-9f27-c8da99f042cd','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-06-18 21:58:50.680','UPDATE','necropsia');
/*!40000 ALTER TABLE `auditlog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `autorizacao_grupo`
--

DROP TABLE IF EXISTS `autorizacao_grupo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `autorizacao_grupo` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_grupo` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_formulario` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_nivel_acesso` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `autorizacao_grupo_id_grupo_fkey` (`id_grupo`),
  KEY `autorizacao_grupo_id_formulario_fkey` (`id_formulario`),
  KEY `autorizacao_grupo_id_nivel_acesso_fkey` (`id_nivel_acesso`),
  CONSTRAINT `autorizacao_grupo_id_formulario_fkey` FOREIGN KEY (`id_formulario`) REFERENCES `formulario` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `autorizacao_grupo_id_grupo_fkey` FOREIGN KEY (`id_grupo`) REFERENCES `grupo` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `autorizacao_grupo_id_nivel_acesso_fkey` FOREIGN KEY (`id_nivel_acesso`) REFERENCES `enum_nivel_acesso` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `autorizacao_grupo`
--

LOCK TABLES `autorizacao_grupo` WRITE;
/*!40000 ALTER TABLE `autorizacao_grupo` DISABLE KEYS */;
INSERT INTO `autorizacao_grupo` VALUES ('001','entr','analiseectoparasitos-am','read'),('002','entr','analiseectoparasitos-av','read'),('003','entr','analisefezes','read'),('004','entr','analisehelmintos','read'),('005','entr','analisemolecular','read'),('006','entr','analiseovocistos','read'),('007','entr','animal-am','read'),('008','entr','animal-av','edit'),('009','entr','entrevista','edit'),('010','entr','cadastrobasico-av','edit'),('011','entr','necropsia','read'),('012','entr','rastreiogps','edit'),('013','entr','resultadoexame-am','read'),('014','entr','resultadoexame-av','read'),('015','entr','resultadosorologico','read'),('016','entr','tutor','edit'),('017','entr','vacina','read'),('018','entr','visitaveterinaria','read'),('019','entr','amostras-av','read'),('020','entr','amostras-am','read'),('021','entr','examefisico','read'),('101','leg','analiseectoparasitos-am','read'),('102','leg','analiseectoparasitos-av','read'),('103','leg','analisefezes','read'),('104','leg','analisehelmintos','edit'),('105','leg','analisemolecular','read'),('106','leg','analiseovocistos','read'),('107','leg','animal-am','edit'),('108','leg','animal-av','read'),('109','leg','entrevista','read'),('110','leg','cadastrobasico-av','edit'),('111','leg','necropsia','edit'),('112','leg','rastreiogps','read'),('113','leg','resultadoexame-am','read'),('114','leg','resultadoexame-av','read'),('115','leg','resultadosorologico','read'),('116','leg','tutor','read'),('117','leg','vacina','read'),('118','leg','visitaveterinaria','read'),('119','leg','amostras-av','read'),('120','leg','amostras-am','read'),('121','leg','examefisico','read'),('201','pesqecto','analiseectoparasitos-am','edit'),('202','pesqecto','analiseectoparasitos-av','edit'),('203','pesqecto','analisefezes','read'),('204','pesqecto','analisehelmintos','read'),('205','pesqecto','analisemolecular','read'),('206','pesqecto','analiseovocistos','read'),('207','pesqecto','animal-am','read'),('208','pesqecto','animal-av','read'),('209','pesqecto','entrevista','read'),('210','pesqecto','cadastrobasico-av','read'),('211','pesqecto','necropsia','read'),('212','pesqecto','rastreiogps','read'),('213','pesqecto','resultadoexame-am','read'),('214','pesqecto','resultadoexame-av','read'),('215','pesqecto','resultadosorologico','read'),('216','pesqecto','tutor','read'),('217','pesqecto','vacina','read'),('218','pesqecto','visitaveterinaria','read'),('219','pesqecto','amostras-av','read'),('220','pesqecto','amostras-am','read'),('221','pesqecto','examefisico','read'),('301','pesqfez','analiseectoparasitos-am','read'),('302','pesqfez','analiseectoparasitos-av','read'),('303','pesqfez','analisefezes','edit'),('304','pesqfez','analisehelmintos','read'),('305','pesqfez','analisemolecular','edit'),('306','pesqfez','analiseovocistos','edit'),('307','pesqfez','animal-am','read'),('308','pesqfez','animal-av','read'),('309','pesqfez','entrevista','read'),('310','pesqfez','cadastrobasico-av','read'),('311','pesqfez','necropsia','read'),('312','pesqfez','rastreiogps','read'),('313','pesqfez','resultadoexame-am','read'),('314','pesqfez','resultadoexame-av','read'),('315','pesqfez','resultadosorologico','read'),('316','pesqfez','tutor','read'),('317','pesqfez','vacina','read'),('318','pesqfez','visitaveterinaria','read'),('319','pesqfez','amostras-av','read'),('320','pesqfez','amostras-am','read'),('321','pesqfez','examefisico','read'),('401','pesqhelm','analiseectoparasitos-am','read'),('402','pesqhelm','analiseectoparasitos-av','read'),('403','pesqhelm','analisefezes','edit'),('404','pesqhelm','analisehelmintos','edit'),('405','pesqhelm','analisemolecular','read'),('406','pesqhelm','analiseovocistos','edit'),('407','pesqhelm','animal-am','read'),('408','pesqhelm','animal-av','read'),('409','pesqhelm','entrevista','read'),('410','pesqhelm','cadastrobasico-av','read'),('411','pesqhelm','necropsia','read'),('412','pesqhelm','rastreiogps','read'),('413','pesqhelm','resultadoexame-am','read'),('414','pesqhelm','resultadoexame-av','read'),('415','pesqhelm','resultadosorologico','read'),('416','pesqhelm','tutor','read'),('417','pesqhelm','vacina','read'),('418','pesqhelm','visitaveterinaria','read'),('419','pesqhelm','amostras-av','read'),('420','pesqhelm','amostras-am','read'),('421','pesqhelm','examefisico','read'),('501','pesqsor','analiseectoparasitos-am','read'),('502','pesqsor','analiseectoparasitos-av','read'),('503','pesqsor','analisefezes','read'),('504','pesqsor','analisehelmintos','read'),('505','pesqsor','analisemolecular','read'),('506','pesqsor','analiseovocistos','read'),('507','pesqsor','animal-am','read'),('508','pesqsor','animal-av','read'),('509','pesqsor','entrevista','read'),('510','pesqsor','cadastrobasico-av','read'),('511','pesqsor','necropsia','read'),('512','pesqsor','rastreiogps','read'),('513','pesqsor','resultadoexame-am','edit'),('514','pesqsor','resultadoexame-av','edit'),('515','pesqsor','resultadosorologico','edit'),('516','pesqsor','tutor','read'),('517','pesqsor','vacina','read'),('518','pesqsor','visitaveterinaria','read'),('519','pesqsor','amostras-av','read'),('520','pesqsor','amostras-am','read'),('521','pesqsor','examefisico','read'),('601','vet','analiseectoparasitos-am','read'),('602','vet','analiseectoparasitos-av','read'),('603','vet','analisefezes','edit'),('604','vet','analisehelmintos','read'),('605','vet','analisemolecular','edit'),('606','vet','analiseovocistos','edit'),('607','vet','animal-am','read'),('608','vet','animal-av','edit'),('609','vet','entrevista','read'),('610','vet','cadastrobasico-av','edit'),('611','vet','necropsia','read'),('612','vet','rastreiogps','read'),('613','vet','resultadoexame-am','read'),('614','vet','resultadoexame-av','read'),('615','vet','resultadosorologico','read'),('616','vet','tutor','edit'),('617','vet','vacina','edit'),('618','vet','visitaveterinaria','edit'),('619','vet','amostras-av','edit'),('620','vet','amostras-am','read'),('621','vet','examefisico','edit');
/*!40000 ALTER TABLE `autorizacao_grupo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `autorizacao_usuario`
--

DROP TABLE IF EXISTS `autorizacao_usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `autorizacao_usuario` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_usuario` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_formulario` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_nivel_acesso` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `autorizacao_usuario_id_usuario_fkey` (`id_usuario`),
  KEY `autorizacao_usuario_id_formulario_fkey` (`id_formulario`),
  KEY `autorizacao_usuario_id_nivel_acesso_fkey` (`id_nivel_acesso`),
  CONSTRAINT `autorizacao_usuario_id_formulario_fkey` FOREIGN KEY (`id_formulario`) REFERENCES `formulario` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `autorizacao_usuario_id_nivel_acesso_fkey` FOREIGN KEY (`id_nivel_acesso`) REFERENCES `enum_nivel_acesso` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `autorizacao_usuario_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `autorizacao_usuario`
--

LOCK TABLES `autorizacao_usuario` WRITE;
/*!40000 ALTER TABLE `autorizacao_usuario` DISABLE KEYS */;
INSERT INTO `autorizacao_usuario` VALUES ('4aab695f-8ea0-4007-bb36-9a1a10b9715f','5d98ce9c-07fa-4046-b40e-54ff4c733590','examefisico','read'),('803e6691-4fb4-4af1-ad3a-d58770196a1d','5d98ce9c-07fa-4046-b40e-54ff4c733590','visitaveterinaria','edit'),('9fe10395-c9d4-43fe-ab6d-c947be32eaf8','5d98ce9c-07fa-4046-b40e-54ff4c733590','amostras-av','read');
/*!40000 ALTER TABLE `autorizacao_usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `castracao`
--

DROP TABLE IF EXISTS `castracao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `castracao` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_animal_vivo` int NOT NULL,
  `id_visita_veterinaria` int DEFAULT NULL,
  `data` datetime NOT NULL,
  `observacao` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `castracao_id_animal_vivo_key` (`id_animal_vivo`),
  UNIQUE KEY `castracao_id_visita_veterinaria_key` (`id_visita_veterinaria`),
  CONSTRAINT `castracao_id_animal_vivo_fkey` FOREIGN KEY (`id_animal_vivo`) REFERENCES `animal_vivo` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `castracao_id_visita_veterinaria_fkey` FOREIGN KEY (`id_visita_veterinaria`) REFERENCES `visita_veterinaria` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `castracao`
--

LOCK TABLES `castracao` WRITE;
/*!40000 ALTER TABLE `castracao` DISABLE KEYS */;
INSERT INTO `castracao` VALUES (2,1,11,'2025-12-12 15:00:00.000',NULL);
/*!40000 ALTER TABLE `castracao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categoria`
--

DROP TABLE IF EXISTS `categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categoria` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `icone_categoria` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `categoria_nome_key` (`nome`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categoria`
--

LOCK TABLES `categoria` WRITE;
/*!40000 ALTER TABLE `categoria` DISABLE KEYS */;
INSERT INTO `categoria` VALUES ('0_animaisvivos','Animais Vivos','https://www.svgrepo.com/show/295893/pet-house-kennel.svg'),('1_animaismortos','Animais Mortos','https://www.svgrepo.com/show/493629/warning-triangle.svg'),('2_cadastrosbasicos','Cadastros Básicos','https://www.svgrepo.com/show/145158/form.svg');
/*!40000 ALTER TABLE `categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `changelog`
--

DROP TABLE IF EXISTS `changelog`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `changelog` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_auditlog` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tabela` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_registro` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `tipo_acao` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `dados_antigos` json DEFAULT NULL,
  `dados_novos` json DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `changelog_id_auditlog_fkey` (`id_auditlog`),
  CONSTRAINT `changelog_id_auditlog_fkey` FOREIGN KEY (`id_auditlog`) REFERENCES `auditlog` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=420 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `changelog`
--

LOCK TABLES `changelog` WRITE;
/*!40000 ALTER TABLE `changelog` DISABLE KEYS */;
INSERT INTO `changelog` VALUES (1,'6c51c92d-942e-479c-89b7-ccd7229f1ca6','veterinarianVisit','31170777-e96a-46ab-b9ad-1a64cdea3125','CREATE',NULL,'{\"id\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"date\": \"2026-03-05T00:00:00.000Z\", \"cardLink\": \"https://translate.google.com/?hl=pt-BR&tab=wT&sl=en&tl=pt&op=translate\", \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(2,'6c51c92d-942e-479c-89b7-ccd7229f1ca6','bodyMeasurementVeterinarian','1037fc15-8b1a-472b-a5b4-b7dbe2fc3932','CREATE',NULL,'{\"id\": \"1037fc15-8b1a-472b-a5b4-b7dbe2fc3932\", \"value\": 13, \"veterinarianVisitId\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"bodyMeasurementTypeId\": \"01test\"}'),(3,'28cfb68c-6d1d-4a3d-aa17-f69aa66b0090','veterinarianVisit','31170777-e96a-46ab-b9ad-1a64cdea3125','UPDATE','{\"id\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"date\": \"2026-03-05T00:00:00.000Z\", \"cardLink\": \"https://translate.google.com/?hl=pt-BR&tab=wT&sl=en&tl=pt&op=translate\", \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"1037fc15-8b1a-472b-a5b4-b7dbe2fc3932\", \"value\": 13, \"veterinarianVisitId\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"bodyMeasurementTypeId\": \"01test\"}]}','{\"id\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"date\": \"2026-04-03T00:00:00.000Z\", \"cardLink\": \"https://translate.google.com/?hl=pt-BR&tab=wT&sl=en&tl=pt&op=translate\", \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(4,'28cfb68c-6d1d-4a3d-aa17-f69aa66b0090','bodyMeasurementVeterinarian','1037fc15-8b1a-472b-a5b4-b7dbe2fc3932','DELETE','{\"id\": \"1037fc15-8b1a-472b-a5b4-b7dbe2fc3932\", \"value\": 13, \"veterinarianVisitId\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(5,'28cfb68c-6d1d-4a3d-aa17-f69aa66b0090','bodyMeasurementVeterinarian','c8dd7376-951a-4bac-beee-567717fef7e2','CREATE',NULL,'{\"id\": \"c8dd7376-951a-4bac-beee-567717fef7e2\", \"value\": 13, \"veterinarianVisitId\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"bodyMeasurementTypeId\": \"01test\"}'),(6,'28cfb68c-6d1d-4a3d-aa17-f69aa66b0090','bodyMeasurementVeterinarian','b30f79cd-20f2-4fd1-b437-884ce85adbeb','CREATE',NULL,'{\"id\": \"b30f79cd-20f2-4fd1-b437-884ce85adbeb\", \"value\": 0, \"veterinarianVisitId\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"bodyMeasurementTypeId\": \"01test\"}'),(7,'28cfb68c-6d1d-4a3d-aa17-f69aa66b0090','bodyMeasurementVeterinarian','7168dc5f-d499-494d-b1df-34337137a6fb','CREATE',NULL,'{\"id\": \"7168dc5f-d499-494d-b1df-34337137a6fb\", \"value\": 0, \"veterinarianVisitId\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"bodyMeasurementTypeId\": \"01test\"}'),(8,'28cfb68c-6d1d-4a3d-aa17-f69aa66b0090','bodyMeasurementVeterinarian','81a8fa3c-2723-4bae-a07c-bf1f007f0aba','CREATE',NULL,'{\"id\": \"81a8fa3c-2723-4bae-a07c-bf1f007f0aba\", \"value\": 0, \"veterinarianVisitId\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"bodyMeasurementTypeId\": \"01test\"}'),(9,'28cfb68c-6d1d-4a3d-aa17-f69aa66b0090','bodyMeasurementVeterinarian','d20c12c9-a495-4a15-bf75-ede046627313','CREATE',NULL,'{\"id\": \"d20c12c9-a495-4a15-bf75-ede046627313\", \"value\": 0, \"veterinarianVisitId\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"bodyMeasurementTypeId\": \"01test\"}'),(10,'544bdbcb-e2c5-4dd7-8ffb-99860cd1d08b','veterinarianVisit','V-001','CREATE',NULL,'{\"id\": \"V-001\", \"date\": \"2025-03-12T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(11,'074f6095-c982-456f-8664-c896930c252c','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2025-03-12T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": []}','{\"id\": \"V-001\", \"date\": \"2025-11-03T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(12,'2af5a155-73d1-46cf-9fe3-4a1901825305','bodyMeasurementVeterinarian','7168dc5f-d499-494d-b1df-34337137a6fb','DELETE','{\"id\": \"7168dc5f-d499-494d-b1df-34337137a6fb\", \"value\": 0, \"veterinarianVisitId\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(13,'2af5a155-73d1-46cf-9fe3-4a1901825305','bodyMeasurementVeterinarian','81a8fa3c-2723-4bae-a07c-bf1f007f0aba','DELETE','{\"id\": \"81a8fa3c-2723-4bae-a07c-bf1f007f0aba\", \"value\": 0, \"veterinarianVisitId\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(14,'2af5a155-73d1-46cf-9fe3-4a1901825305','bodyMeasurementVeterinarian','b30f79cd-20f2-4fd1-b437-884ce85adbeb','DELETE','{\"id\": \"b30f79cd-20f2-4fd1-b437-884ce85adbeb\", \"value\": 0, \"veterinarianVisitId\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(15,'2af5a155-73d1-46cf-9fe3-4a1901825305','bodyMeasurementVeterinarian','c8dd7376-951a-4bac-beee-567717fef7e2','DELETE','{\"id\": \"c8dd7376-951a-4bac-beee-567717fef7e2\", \"value\": 13, \"veterinarianVisitId\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(16,'2af5a155-73d1-46cf-9fe3-4a1901825305','bodyMeasurementVeterinarian','d20c12c9-a495-4a15-bf75-ede046627313','DELETE','{\"id\": \"d20c12c9-a495-4a15-bf75-ede046627313\", \"value\": 0, \"veterinarianVisitId\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(17,'2af5a155-73d1-46cf-9fe3-4a1901825305','veterinarianVisit','31170777-e96a-46ab-b9ad-1a64cdea3125','DELETE','{\"id\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"date\": \"2026-04-03T00:00:00.000Z\", \"cardLink\": \"https://translate.google.com/?hl=pt-BR&tab=wT&sl=en&tl=pt&op=translate\", \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"7168dc5f-d499-494d-b1df-34337137a6fb\", \"value\": 0, \"veterinarianVisitId\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"bodyMeasurementTypeId\": \"01test\"}, {\"id\": \"81a8fa3c-2723-4bae-a07c-bf1f007f0aba\", \"value\": 0, \"veterinarianVisitId\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"bodyMeasurementTypeId\": \"01test\"}, {\"id\": \"b30f79cd-20f2-4fd1-b437-884ce85adbeb\", \"value\": 0, \"veterinarianVisitId\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"bodyMeasurementTypeId\": \"01test\"}, {\"id\": \"c8dd7376-951a-4bac-beee-567717fef7e2\", \"value\": 13, \"veterinarianVisitId\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"bodyMeasurementTypeId\": \"01test\"}, {\"id\": \"d20c12c9-a495-4a15-bf75-ede046627313\", \"value\": 0, \"veterinarianVisitId\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"bodyMeasurementTypeId\": \"01test\"}]}',NULL),(18,'efd54900-7fc8-468e-a174-3466b12ce50b','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2025-11-03T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": []}','{\"id\": \"V-001\", \"date\": \"2025-02-11T00:00:00.000Z\", \"cardLink\": \"Teste\", \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(19,'05cf41fb-536b-4d42-94f4-089ca006e73f','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2025-02-11T00:00:00.000Z\", \"cardLink\": \"Teste\", \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": []}','{\"id\": \"V-001\", \"date\": \"2025-10-02T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(20,'6e91608f-f828-4e76-b6b6-188aa0cdfeb4','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2025-10-02T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": []}','{\"id\": \"V-001\", \"date\": \"2025-01-10T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(21,'6e91608f-f828-4e76-b6b6-188aa0cdfeb4','bodyMeasurementVeterinarian','54481e28-3b81-4d1d-9a01-557faf6c961a','CREATE',NULL,'{\"id\": \"54481e28-3b81-4d1d-9a01-557faf6c961a\", \"value\": 0, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(22,'5fba3d3d-fdf4-4afd-8c50-4739da1f2e8d','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2025-01-10T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"54481e28-3b81-4d1d-9a01-557faf6c961a\", \"value\": 0, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}]}','{\"id\": \"V-001\", \"date\": \"2025-09-01T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(23,'5fba3d3d-fdf4-4afd-8c50-4739da1f2e8d','bodyMeasurementVeterinarian','54481e28-3b81-4d1d-9a01-557faf6c961a','DELETE','{\"id\": \"54481e28-3b81-4d1d-9a01-557faf6c961a\", \"value\": 0, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(24,'5fba3d3d-fdf4-4afd-8c50-4739da1f2e8d','bodyMeasurementVeterinarian','15af529f-a32e-469f-ba16-7974a5e8757a','CREATE',NULL,'{\"id\": \"15af529f-a32e-469f-ba16-7974a5e8757a\", \"value\": -0.03, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(25,'086119fd-1cb2-44a8-8bc6-d98a66db35b7','bodyMeasurementVeterinarian','15af529f-a32e-469f-ba16-7974a5e8757a','DELETE','{\"id\": \"15af529f-a32e-469f-ba16-7974a5e8757a\", \"value\": -0.03, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(26,'086119fd-1cb2-44a8-8bc6-d98a66db35b7','veterinarianVisit','V-001','DELETE','{\"id\": \"V-001\", \"date\": \"2025-09-01T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"15af529f-a32e-469f-ba16-7974a5e8757a\", \"value\": -0.03, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}]}',NULL),(27,'81a15b07-40ec-4b97-b24f-37b03eb899a3','veterinarianVisit','V-001','CREATE',NULL,'{\"id\": \"V-001\", \"date\": \"2026-03-12T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(28,'580e797d-1f4a-4e34-b615-549ccdffcfdb','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-03-12T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": []}','{\"id\": \"V-001\", \"date\": \"2026-02-28T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(29,'40bf7da6-d1c7-4719-a076-e411fa4e2927','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-02-28T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": []}','{\"id\": \"V-001\", \"date\": \"2026-02-28T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(30,'7f9ebe55-b877-4903-8217-0a5369b39c13','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-02-28T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": []}','{\"id\": \"V-001\", \"date\": \"2026-02-28T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(31,'817352e6-6b83-4df2-8824-f1659381345e','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-02-28T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": []}','{\"id\": \"V-001\", \"date\": \"2026-11-25T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(32,'081839b7-b425-4675-bcfa-b67ce0e7eda6','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-11-25T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": []}','{\"id\": \"V-001\", \"date\": \"2026-11-11T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(33,'2506dc55-334f-4720-82db-441e698b70c1','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-11-11T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": []}','{\"id\": \"V-001\", \"date\": \"2026-11-25T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(34,'2506dc55-334f-4720-82db-441e698b70c1','bodyMeasurementVeterinarian','0f6f76ae-3aed-49b6-a8c8-ecf2d07e7b69','CREATE',NULL,'{\"id\": \"0f6f76ae-3aed-49b6-a8c8-ecf2d07e7b69\", \"value\": 0, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(35,'30c2e078-f77a-478c-91bd-3b8f5575b2bf','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-11-25T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"0f6f76ae-3aed-49b6-a8c8-ecf2d07e7b69\", \"value\": 0, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}]}','{\"id\": \"V-001\", \"date\": \"2026-11-25T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(36,'30c2e078-f77a-478c-91bd-3b8f5575b2bf','bodyMeasurementVeterinarian','0f6f76ae-3aed-49b6-a8c8-ecf2d07e7b69','DELETE','{\"id\": \"0f6f76ae-3aed-49b6-a8c8-ecf2d07e7b69\", \"value\": 0, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(37,'30c2e078-f77a-478c-91bd-3b8f5575b2bf','bodyMeasurementVeterinarian','64b5ee84-0704-4a93-be12-f3196d5ab58e','CREATE',NULL,'{\"id\": \"64b5ee84-0704-4a93-be12-f3196d5ab58e\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(38,'2077eeba-af7a-493c-afd8-c16e357c7695','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-11-25T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"64b5ee84-0704-4a93-be12-f3196d5ab58e\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}]}','{\"id\": \"V-001\", \"date\": \"2026-11-11T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(39,'2077eeba-af7a-493c-afd8-c16e357c7695','bodyMeasurementVeterinarian','64b5ee84-0704-4a93-be12-f3196d5ab58e','DELETE','{\"id\": \"64b5ee84-0704-4a93-be12-f3196d5ab58e\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(40,'2077eeba-af7a-493c-afd8-c16e357c7695','bodyMeasurementVeterinarian','3a52a851-a637-41ef-a8d8-130f52968511','CREATE',NULL,'{\"id\": \"3a52a851-a637-41ef-a8d8-130f52968511\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(41,'4a568606-72ec-40f3-a19b-27f90475539f','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-11-11T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"3a52a851-a637-41ef-a8d8-130f52968511\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}]}','{\"id\": \"V-001\", \"date\": \"2026-11-25T00:00:00.000Z\", \"cardLink\": \"test\", \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(42,'4a568606-72ec-40f3-a19b-27f90475539f','bodyMeasurementVeterinarian','3a52a851-a637-41ef-a8d8-130f52968511','DELETE','{\"id\": \"3a52a851-a637-41ef-a8d8-130f52968511\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(43,'4a568606-72ec-40f3-a19b-27f90475539f','bodyMeasurementVeterinarian','e8f4efb0-3de4-4958-a440-f76d13f62f03','CREATE',NULL,'{\"id\": \"e8f4efb0-3de4-4958-a440-f76d13f62f03\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(44,'01c9ef87-7a6c-4f6e-ad42-669d596f2f7b','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-11-25T00:00:00.000Z\", \"cardLink\": \"test\", \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"e8f4efb0-3de4-4958-a440-f76d13f62f03\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}]}','{\"id\": \"V-001\", \"date\": \"2026-11-25T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(45,'01c9ef87-7a6c-4f6e-ad42-669d596f2f7b','bodyMeasurementVeterinarian','e8f4efb0-3de4-4958-a440-f76d13f62f03','DELETE','{\"id\": \"e8f4efb0-3de4-4958-a440-f76d13f62f03\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(46,'01c9ef87-7a6c-4f6e-ad42-669d596f2f7b','bodyMeasurementVeterinarian','fba18c42-6567-4895-b63c-71bf53f85e43','CREATE',NULL,'{\"id\": \"fba18c42-6567-4895-b63c-71bf53f85e43\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(47,'9ad26f59-248f-4e16-93ca-73c86c170f6e','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-11-25T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"fba18c42-6567-4895-b63c-71bf53f85e43\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}]}','{\"id\": \"V-001\", \"date\": \"2026-11-25T00:00:00.000Z\", \"cardLink\": \"teste\", \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(48,'9ad26f59-248f-4e16-93ca-73c86c170f6e','bodyMeasurementVeterinarian','fba18c42-6567-4895-b63c-71bf53f85e43','DELETE','{\"id\": \"fba18c42-6567-4895-b63c-71bf53f85e43\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(49,'9ad26f59-248f-4e16-93ca-73c86c170f6e','bodyMeasurementVeterinarian','1c8b8657-e25a-4930-bb3f-89c478bff439','CREATE',NULL,'{\"id\": \"1c8b8657-e25a-4930-bb3f-89c478bff439\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(50,'0cb3f461-4c9e-47c5-8a65-590fb5afe5b3','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-11-25T00:00:00.000Z\", \"cardLink\": \"teste\", \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"1c8b8657-e25a-4930-bb3f-89c478bff439\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}]}','{\"id\": \"V-001\", \"date\": \"2026-11-25T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(51,'0cb3f461-4c9e-47c5-8a65-590fb5afe5b3','bodyMeasurementVeterinarian','1c8b8657-e25a-4930-bb3f-89c478bff439','DELETE','{\"id\": \"1c8b8657-e25a-4930-bb3f-89c478bff439\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(52,'0cb3f461-4c9e-47c5-8a65-590fb5afe5b3','bodyMeasurementVeterinarian','ced5cfa0-158b-4c85-ac70-f4ce982623ea','CREATE',NULL,'{\"id\": \"ced5cfa0-158b-4c85-ac70-f4ce982623ea\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(53,'83ecd3f7-19df-4934-9f84-79d6fed00f52','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-11-25T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"ced5cfa0-158b-4c85-ac70-f4ce982623ea\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}]}','{\"id\": \"V-001\", \"date\": \"2026-11-11T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(54,'83ecd3f7-19df-4934-9f84-79d6fed00f52','bodyMeasurementVeterinarian','ced5cfa0-158b-4c85-ac70-f4ce982623ea','DELETE','{\"id\": \"ced5cfa0-158b-4c85-ac70-f4ce982623ea\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(55,'83ecd3f7-19df-4934-9f84-79d6fed00f52','bodyMeasurementVeterinarian','7f1c5f59-0d22-460e-8df8-3537eaf21835','CREATE',NULL,'{\"id\": \"7f1c5f59-0d22-460e-8df8-3537eaf21835\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(56,'917873a6-6f55-4171-9550-347ec9e60ae4','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-11-11T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"7f1c5f59-0d22-460e-8df8-3537eaf21835\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}]}','{\"id\": \"V-001\", \"date\": \"2026-11-11T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(57,'917873a6-6f55-4171-9550-347ec9e60ae4','bodyMeasurementVeterinarian','7f1c5f59-0d22-460e-8df8-3537eaf21835','DELETE','{\"id\": \"7f1c5f59-0d22-460e-8df8-3537eaf21835\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(58,'917873a6-6f55-4171-9550-347ec9e60ae4','bodyMeasurementVeterinarian','839d8192-6233-49bc-87a1-37f186fa21b8','CREATE',NULL,'{\"id\": \"839d8192-6233-49bc-87a1-37f186fa21b8\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(59,'0be3fdc9-8f27-490f-ac27-354e9265fd3c','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-11-11T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"839d8192-6233-49bc-87a1-37f186fa21b8\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}]}','{\"id\": \"V-001\", \"date\": \"2026-11-11T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(60,'0be3fdc9-8f27-490f-ac27-354e9265fd3c','bodyMeasurementVeterinarian','839d8192-6233-49bc-87a1-37f186fa21b8','DELETE','{\"id\": \"839d8192-6233-49bc-87a1-37f186fa21b8\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(61,'0be3fdc9-8f27-490f-ac27-354e9265fd3c','bodyMeasurementVeterinarian','664319d8-3890-4cc1-9584-529f56332aea','CREATE',NULL,'{\"id\": \"664319d8-3890-4cc1-9584-529f56332aea\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(62,'fe5ecf04-3306-414b-bf19-da23c8dddb85','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-11-11T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"664319d8-3890-4cc1-9584-529f56332aea\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}]}','{\"id\": \"V-001\", \"date\": \"2026-11-11T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(63,'fe5ecf04-3306-414b-bf19-da23c8dddb85','bodyMeasurementVeterinarian','664319d8-3890-4cc1-9584-529f56332aea','DELETE','{\"id\": \"664319d8-3890-4cc1-9584-529f56332aea\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(64,'fe5ecf04-3306-414b-bf19-da23c8dddb85','bodyMeasurementVeterinarian','d81db46c-ef79-4df2-b2d7-41b337b2cfc7','CREATE',NULL,'{\"id\": \"d81db46c-ef79-4df2-b2d7-41b337b2cfc7\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(65,'6d739878-1663-47e7-b7c1-6cfb5010f2a2','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-11-11T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"d81db46c-ef79-4df2-b2d7-41b337b2cfc7\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}]}','{\"id\": \"V-001\", \"date\": \"2026-11-02T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(66,'6d739878-1663-47e7-b7c1-6cfb5010f2a2','bodyMeasurementVeterinarian','d81db46c-ef79-4df2-b2d7-41b337b2cfc7','DELETE','{\"id\": \"d81db46c-ef79-4df2-b2d7-41b337b2cfc7\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(67,'6d739878-1663-47e7-b7c1-6cfb5010f2a2','bodyMeasurementVeterinarian','11ccb9e6-4ed9-4834-acee-c48d620b52a7','CREATE',NULL,'{\"id\": \"11ccb9e6-4ed9-4834-acee-c48d620b52a7\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(68,'7b5d3709-613f-4a80-b105-a5eb3f52961b','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-11-02T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"11ccb9e6-4ed9-4834-acee-c48d620b52a7\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}]}','{\"id\": \"V-001\", \"date\": \"2026-11-30T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(69,'7b5d3709-613f-4a80-b105-a5eb3f52961b','bodyMeasurementVeterinarian','11ccb9e6-4ed9-4834-acee-c48d620b52a7','DELETE','{\"id\": \"11ccb9e6-4ed9-4834-acee-c48d620b52a7\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(70,'7b5d3709-613f-4a80-b105-a5eb3f52961b','bodyMeasurementVeterinarian','6935d559-de2e-4453-9497-c03c92fc6625','CREATE',NULL,'{\"id\": \"6935d559-de2e-4453-9497-c03c92fc6625\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(71,'5eb2488a-2c86-4a7c-a120-45260e24087e','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-11-30T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"6935d559-de2e-4453-9497-c03c92fc6625\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}]}','{\"id\": \"V-001\", \"date\": \"2026-07-09T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(72,'5eb2488a-2c86-4a7c-a120-45260e24087e','bodyMeasurementVeterinarian','6935d559-de2e-4453-9497-c03c92fc6625','DELETE','{\"id\": \"6935d559-de2e-4453-9497-c03c92fc6625\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(73,'5eb2488a-2c86-4a7c-a120-45260e24087e','bodyMeasurementVeterinarian','2a1fbbcf-5b18-4a62-ba97-f2e370107b4c','CREATE',NULL,'{\"id\": \"2a1fbbcf-5b18-4a62-ba97-f2e370107b4c\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(74,'ad018eba-50bf-40b6-a22a-133a1183b8d7','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-07-09T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"2a1fbbcf-5b18-4a62-ba97-f2e370107b4c\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}]}','{\"id\": \"V-001\", \"date\": \"2026-07-09T15:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(75,'ad018eba-50bf-40b6-a22a-133a1183b8d7','bodyMeasurementVeterinarian','2a1fbbcf-5b18-4a62-ba97-f2e370107b4c','DELETE','{\"id\": \"2a1fbbcf-5b18-4a62-ba97-f2e370107b4c\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(76,'ad018eba-50bf-40b6-a22a-133a1183b8d7','bodyMeasurementVeterinarian','7332b6a6-d0e8-4cdc-bf32-89e79a9dabf9','CREATE',NULL,'{\"id\": \"7332b6a6-d0e8-4cdc-bf32-89e79a9dabf9\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(77,'4db34fb6-2c1e-43c0-8c72-76c78e1c4ba7','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-07-09T15:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"7332b6a6-d0e8-4cdc-bf32-89e79a9dabf9\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}]}','{\"id\": \"V-001\", \"date\": \"2026-07-09T15:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(78,'4db34fb6-2c1e-43c0-8c72-76c78e1c4ba7','bodyMeasurementVeterinarian','7332b6a6-d0e8-4cdc-bf32-89e79a9dabf9','DELETE','{\"id\": \"7332b6a6-d0e8-4cdc-bf32-89e79a9dabf9\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(79,'4db34fb6-2c1e-43c0-8c72-76c78e1c4ba7','bodyMeasurementVeterinarian','910fadd0-bf5a-4e24-a198-56a8e530f808','CREATE',NULL,'{\"id\": \"910fadd0-bf5a-4e24-a198-56a8e530f808\", \"value\": 0.29, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(80,'79b1a19b-539d-43a8-9cfe-717e7aa3e27c','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-07-09T15:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"910fadd0-bf5a-4e24-a198-56a8e530f808\", \"value\": 0.29, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}]}','{\"id\": \"V-001\", \"date\": \"2026-07-09T15:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(81,'79b1a19b-539d-43a8-9cfe-717e7aa3e27c','bodyMeasurementVeterinarian','910fadd0-bf5a-4e24-a198-56a8e530f808','DELETE','{\"id\": \"910fadd0-bf5a-4e24-a198-56a8e530f808\", \"value\": 0.29, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(82,'79b1a19b-539d-43a8-9cfe-717e7aa3e27c','bodyMeasurementVeterinarian','ad6a31da-86ae-4d7c-b924-6fa1b442e68e','CREATE',NULL,'{\"id\": \"ad6a31da-86ae-4d7c-b924-6fa1b442e68e\", \"value\": 0.29, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(83,'79b1a19b-539d-43a8-9cfe-717e7aa3e27c','bodyMeasurementVeterinarian','5ee41aa2-75ef-4076-8d1f-bec092574397','CREATE',NULL,'{\"id\": \"5ee41aa2-75ef-4076-8d1f-bec092574397\", \"value\": 123, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(84,'10e72f28-f728-403c-9f0b-77d71072919c','veterinarianVisit','asdasd','CREATE',NULL,'{\"id\": \"asdasd\", \"date\": \"1212-12-12T15:06:28.000Z\", \"cardLink\": \"dgdfgf\", \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(85,'10e72f28-f728-403c-9f0b-77d71072919c','bodyMeasurementVeterinarian','a028c0fa-f1ed-40b9-bfea-3fc8f47412b6','CREATE',NULL,'{\"id\": \"a028c0fa-f1ed-40b9-bfea-3fc8f47412b6\", \"value\": 324, \"veterinarianVisitId\": \"asdasd\", \"bodyMeasurementTypeId\": \"01test\"}'),(86,'ce659046-286e-46a7-8524-8ee18e223d1a','bodyMeasurementVeterinarian','a028c0fa-f1ed-40b9-bfea-3fc8f47412b6','DELETE','{\"id\": \"a028c0fa-f1ed-40b9-bfea-3fc8f47412b6\", \"value\": 324, \"veterinarianVisitId\": \"asdasd\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(87,'ce659046-286e-46a7-8524-8ee18e223d1a','veterinarianVisit','asdasd','DELETE','{\"id\": \"asdasd\", \"date\": \"1212-12-12T15:06:28.000Z\", \"cardLink\": \"dgdfgf\", \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"a028c0fa-f1ed-40b9-bfea-3fc8f47412b6\", \"value\": 324, \"veterinarianVisitId\": \"asdasd\", \"bodyMeasurementTypeId\": \"01test\"}]}',NULL),(88,'2c4957a6-1038-4a3e-9ae7-71d36675bbb6','bodyMeasurementVeterinarian','5ee41aa2-75ef-4076-8d1f-bec092574397','DELETE','{\"id\": \"5ee41aa2-75ef-4076-8d1f-bec092574397\", \"value\": 123, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(89,'2c4957a6-1038-4a3e-9ae7-71d36675bbb6','bodyMeasurementVeterinarian','ad6a31da-86ae-4d7c-b924-6fa1b442e68e','DELETE','{\"id\": \"ad6a31da-86ae-4d7c-b924-6fa1b442e68e\", \"value\": 0.29, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(90,'2c4957a6-1038-4a3e-9ae7-71d36675bbb6','veterinarianVisit','V-001','DELETE','{\"id\": \"V-001\", \"date\": \"2026-07-09T15:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"5ee41aa2-75ef-4076-8d1f-bec092574397\", \"value\": 123, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}, {\"id\": \"ad6a31da-86ae-4d7c-b924-6fa1b442e68e\", \"value\": 0.29, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}]}',NULL),(91,'3d9ce133-72d3-44f7-b65d-e9f4f84a74f7','veterinarianVisit','1','CREATE',NULL,'{\"id\": 1, \"date\": \"1212-12-12T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1}'),(92,'e39da10b-b4e1-446b-9641-8ca116816074','veterinarianVisit','2','CREATE',NULL,'{\"id\": 2, \"date\": \"1212-12-11T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1}'),(93,'d42b505f-05f1-4427-963f-4481ac42d0f5','veterinarianVisit','2','UPDATE','{\"id\": 2, \"date\": \"1212-12-11T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1, \"bodyMeasurement\": []}','{\"id\": 2, \"date\": \"1212-12-11T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1}'),(94,'d42b505f-05f1-4427-963f-4481ac42d0f5','bodyMeasurementVeterinarian','1','CREATE',NULL,'{\"id\": 1, \"value\": 0, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 1}'),(95,'d42b505f-05f1-4427-963f-4481ac42d0f5','bodyMeasurementVeterinarian','2','CREATE',NULL,'{\"id\": 2, \"value\": 0, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 2}'),(96,'f0dad485-34cb-492f-a4ca-fc5b8619bffe','veterinarianVisit','2','UPDATE','{\"id\": 2, \"date\": \"1212-12-11T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1, \"bodyMeasurement\": [{\"id\": 1, \"value\": 0, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 1}, {\"id\": 2, \"value\": 0, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 2}]}','{\"id\": 2, \"date\": \"1212-12-11T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1}'),(97,'f0dad485-34cb-492f-a4ca-fc5b8619bffe','bodyMeasurementVeterinarian','1','DELETE','{\"id\": 1, \"value\": 0, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 1}',NULL),(98,'f0dad485-34cb-492f-a4ca-fc5b8619bffe','bodyMeasurementVeterinarian','2','DELETE','{\"id\": 2, \"value\": 0, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 2}',NULL),(99,'f0dad485-34cb-492f-a4ca-fc5b8619bffe','bodyMeasurementVeterinarian','3','CREATE',NULL,'{\"id\": 3, \"value\": 11, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 1}'),(100,'f0dad485-34cb-492f-a4ca-fc5b8619bffe','bodyMeasurementVeterinarian','4','CREATE',NULL,'{\"id\": 4, \"value\": 12, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 2}'),(101,'5bfa634e-5d00-4806-a4ab-32b760084a87','veterinarianVisit','3','CREATE',NULL,'{\"id\": 3, \"date\": \"1223-12-12T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1}'),(102,'ecbad320-07ef-4236-8013-a14cb3d06acd','veterinarianVisit','3','DELETE','{\"id\": 3, \"date\": \"1223-12-12T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1, \"bodyMeasurement\": []}',NULL),(103,'37eca6db-12b1-4f2e-bee1-71878e36dcab','veterinarianVisit','2','UPDATE','{\"id\": 2, \"date\": \"1212-12-11T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1, \"bodyMeasurement\": [{\"id\": 3, \"value\": 11, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 1}, {\"id\": 4, \"value\": 12, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 2}]}','{\"id\": 2, \"date\": \"1212-12-11T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1}'),(104,'37eca6db-12b1-4f2e-bee1-71878e36dcab','bodyMeasurementVeterinarian','3','DELETE','{\"id\": 3, \"value\": 11, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 1}',NULL),(105,'37eca6db-12b1-4f2e-bee1-71878e36dcab','bodyMeasurementVeterinarian','4','DELETE','{\"id\": 4, \"value\": 12, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 2}',NULL),(106,'37eca6db-12b1-4f2e-bee1-71878e36dcab','bodyMeasurementVeterinarian','5','CREATE',NULL,'{\"id\": 5, \"value\": 11, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 1}'),(107,'7ffa13f7-8450-4b96-b70d-b0002c9b0b57','veterinarianVisit','4','CREATE',NULL,'{\"id\": 4, \"date\": \"1212-12-10T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1}'),(108,'42620b8d-d8a5-482c-95f6-2a65a433dd94','veterinarianVisit','4','DELETE','{\"id\": 4, \"date\": \"1212-12-10T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1, \"bodyMeasurement\": []}',NULL),(109,'2e0e9e73-d904-4181-9999-f6ee576fff01','veterinarianVisit','1','UPDATE','{\"id\": 1, \"date\": \"1212-12-12T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1, \"bodyMeasurement\": []}','{\"id\": 1, \"date\": \"1212-12-12T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 2}'),(110,'3cf196b8-a895-42f5-9692-fb464cdab99f','veterinarianVisit','5','CREATE',NULL,'{\"id\": 5, \"date\": \"1212-12-13T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 2}'),(111,'dec2ee50-55f2-4ae7-9159-7d98343ab431','veterinarianVisit','6','CREATE',NULL,'{\"id\": 6, \"date\": \"1212-12-12T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 2, \"veterinarianId\": 2}'),(112,'822ded34-7159-47a7-8dae-f49e3d66b276','sampleAllocationVeterinarian','1','CREATE',NULL,'{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 3, \"imageLink\": null, \"storageId\": 3, \"sampleTypeId\": 3, \"veterinarianVisitId\": 6}'),(113,'6c518919-b173-4332-8445-20e2eba6ae7a','sampleAllocationVeterinarian','1','UPDATE','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 3, \"imageLink\": null, \"storageId\": 3, \"sampleTypeId\": 3, \"veterinarianVisitId\": 6, \"sendSampleVeterinarian\": []}','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 3, \"imageLink\": null, \"storageId\": 3, \"sampleTypeId\": 3, \"veterinarianVisitId\": 6}'),(114,'6c518919-b173-4332-8445-20e2eba6ae7a','sendSampleVeterinarian','1','CREATE',NULL,'{\"id\": 1, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-03-14T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}'),(115,'6d0f07f3-204c-421e-8d9e-d8ef082be92e','sampleAllocationVeterinarian','1','UPDATE','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 3, \"imageLink\": null, \"storageId\": 3, \"sampleTypeId\": 3, \"veterinarianVisitId\": 6, \"sendSampleVeterinarian\": [{\"id\": 1, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-03-14T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}]}','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 3, \"imageLink\": null, \"storageId\": 3, \"sampleTypeId\": 3, \"veterinarianVisitId\": 6}'),(116,'6d0f07f3-204c-421e-8d9e-d8ef082be92e','sendSampleVeterinarian','1','DELETE','{\"id\": 1, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-03-14T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}',NULL),(117,'6d0f07f3-204c-421e-8d9e-d8ef082be92e','sendSampleVeterinarian','2','CREATE',NULL,'{\"id\": 2, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}'),(118,'79db068c-30ce-4147-a345-3923addc06ed','sampleAllocationVeterinarian','1','UPDATE','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 3, \"imageLink\": null, \"storageId\": 3, \"sampleTypeId\": 3, \"veterinarianVisitId\": 6, \"sendSampleVeterinarian\": [{\"id\": 2, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}]}','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 3, \"imageLink\": null, \"storageId\": 3, \"sampleTypeId\": 3, \"veterinarianVisitId\": 6}'),(119,'79db068c-30ce-4147-a345-3923addc06ed','sendSampleVeterinarian','2','DELETE','{\"id\": 2, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}',NULL),(120,'79db068c-30ce-4147-a345-3923addc06ed','sendSampleVeterinarian','3','CREATE',NULL,'{\"id\": 3, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-14T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}'),(121,'79db068c-30ce-4147-a345-3923addc06ed','sendSampleVeterinarian','4','CREATE',NULL,'{\"id\": 4, \"note\": null, \"quantity\": 9, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 2, \"storageId\": 3, \"sampleAllocationVeterinarianId\": 1}'),(122,'924cb362-6739-490c-abee-f4af0e57bf11','sampleAllocationVeterinarian','1','UPDATE','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 3, \"imageLink\": null, \"storageId\": 3, \"sampleTypeId\": 3, \"veterinarianVisitId\": 6, \"sendSampleVeterinarian\": [{\"id\": 3, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-14T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}, {\"id\": 4, \"note\": null, \"quantity\": 9, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 2, \"storageId\": 3, \"sampleAllocationVeterinarianId\": 1}]}','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 3, \"imageLink\": null, \"storageId\": 3, \"sampleTypeId\": 3, \"veterinarianVisitId\": 6}'),(123,'924cb362-6739-490c-abee-f4af0e57bf11','sendSampleVeterinarian','3','DELETE','{\"id\": 3, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-14T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}',NULL),(124,'924cb362-6739-490c-abee-f4af0e57bf11','sendSampleVeterinarian','4','DELETE','{\"id\": 4, \"note\": null, \"quantity\": 9, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 2, \"storageId\": 3, \"sampleAllocationVeterinarianId\": 1}',NULL),(125,'924cb362-6739-490c-abee-f4af0e57bf11','sendSampleVeterinarian','6','CREATE',NULL,'{\"id\": 6, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}'),(126,'924cb362-6739-490c-abee-f4af0e57bf11','sendSampleVeterinarian','7','CREATE',NULL,'{\"id\": 7, \"note\": null, \"quantity\": 9, \"sendDate\": \"1212-02-12T15:06:28.000Z\", \"statusId\": 2, \"storageId\": 3, \"sampleAllocationVeterinarianId\": 1}'),(127,'84451d22-3f72-401a-906b-7220742cdbe5','sampleAllocationVeterinarian','1','UPDATE','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 3, \"imageLink\": null, \"storageId\": 3, \"sampleTypeId\": 3, \"veterinarianVisitId\": 6, \"sendSampleVeterinarian\": [{\"id\": 6, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}, {\"id\": 7, \"note\": null, \"quantity\": 9, \"sendDate\": \"1212-02-12T15:06:28.000Z\", \"statusId\": 2, \"storageId\": 3, \"sampleAllocationVeterinarianId\": 1}]}','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 3, \"imageLink\": null, \"storageId\": 3, \"sampleTypeId\": 3, \"veterinarianVisitId\": 6}'),(128,'84451d22-3f72-401a-906b-7220742cdbe5','sendSampleVeterinarian','6','DELETE','{\"id\": 6, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}',NULL),(129,'84451d22-3f72-401a-906b-7220742cdbe5','sendSampleVeterinarian','7','DELETE','{\"id\": 7, \"note\": null, \"quantity\": 9, \"sendDate\": \"1212-02-12T15:06:28.000Z\", \"statusId\": 2, \"storageId\": 3, \"sampleAllocationVeterinarianId\": 1}',NULL),(130,'84451d22-3f72-401a-906b-7220742cdbe5','sendSampleVeterinarian','8','CREATE',NULL,'{\"id\": 8, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}'),(131,'23afec38-9709-463a-9189-d69ca703bd86','sampleAllocationVeterinarian','1','UPDATE','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 3, \"imageLink\": null, \"storageId\": 3, \"sampleTypeId\": 3, \"veterinarianVisitId\": 6, \"sendSampleVeterinarian\": [{\"id\": 8, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}]}','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 3, \"imageLink\": null, \"storageId\": 3, \"sampleTypeId\": 3, \"veterinarianVisitId\": 6}'),(132,'23afec38-9709-463a-9189-d69ca703bd86','sendSampleVeterinarian','8','DELETE','{\"id\": 8, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}',NULL),(133,'23afec38-9709-463a-9189-d69ca703bd86','sendSampleVeterinarian','9','CREATE',NULL,'{\"id\": 9, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}'),(134,'23afec38-9709-463a-9189-d69ca703bd86','sendSampleVeterinarian','10','CREATE',NULL,'{\"id\": 10, \"note\": null, \"quantity\": 1, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 1, \"storageId\": 2, \"sampleAllocationVeterinarianId\": 1}'),(135,'84f1ba3f-0c40-4610-b1bc-83b905d58e55','sampleAllocationVeterinarian','2','CREATE',NULL,'{\"id\": 2, \"note\": null, \"quantity\": 13, \"statusId\": 2, \"imageLink\": null, \"storageId\": 4, \"sampleTypeId\": 4, \"veterinarianVisitId\": 1}'),(136,'f181b4d2-6eed-4e4e-b4b5-f0575cc05dc1','sampleAllocationVeterinarian','2','UPDATE','{\"id\": 2, \"note\": null, \"quantity\": 13, \"statusId\": 2, \"imageLink\": null, \"storageId\": 4, \"sampleTypeId\": 4, \"veterinarianVisitId\": 1, \"sendSampleVeterinarian\": []}','{\"id\": 2, \"note\": null, \"quantity\": 13, \"statusId\": 2, \"imageLink\": null, \"storageId\": 4, \"sampleTypeId\": 4, \"veterinarianVisitId\": 6}'),(137,'95cbbcef-ce7e-4872-a645-71581baec396','sampleAllocationVeterinarian','2','UPDATE','{\"id\": 2, \"note\": null, \"quantity\": 13, \"statusId\": 2, \"imageLink\": null, \"storageId\": 4, \"sampleTypeId\": 4, \"veterinarianVisitId\": 6, \"sendSampleVeterinarian\": []}','{\"id\": 2, \"note\": null, \"quantity\": 13, \"statusId\": 2, \"imageLink\": null, \"storageId\": 4, \"sampleTypeId\": 4, \"veterinarianVisitId\": 1}'),(138,'f05ba225-619f-460e-9d31-f1bd43c5c6d3','sampleAllocationVeterinarian','1','UPDATE','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 3, \"imageLink\": null, \"storageId\": 3, \"sampleTypeId\": 3, \"veterinarianVisitId\": 6, \"sendSampleVeterinarian\": [{\"id\": 9, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}, {\"id\": 10, \"note\": null, \"quantity\": 1, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 1, \"storageId\": 2, \"sampleAllocationVeterinarianId\": 1}]}','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 3, \"imageLink\": null, \"storageId\": 3, \"sampleTypeId\": 3, \"veterinarianVisitId\": 6}'),(139,'f05ba225-619f-460e-9d31-f1bd43c5c6d3','sendSampleVeterinarian','9','DELETE','{\"id\": 9, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}',NULL),(140,'f05ba225-619f-460e-9d31-f1bd43c5c6d3','sendSampleVeterinarian','10','DELETE','{\"id\": 10, \"note\": null, \"quantity\": 1, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 1, \"storageId\": 2, \"sampleAllocationVeterinarianId\": 1}',NULL),(141,'f05ba225-619f-460e-9d31-f1bd43c5c6d3','sendSampleVeterinarian','11','CREATE',NULL,'{\"id\": 11, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}'),(142,'f05ba225-619f-460e-9d31-f1bd43c5c6d3','sendSampleVeterinarian','12','CREATE',NULL,'{\"id\": 12, \"note\": \"Observação sobre a amostra enviada\", \"quantity\": 1, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 1, \"storageId\": 2, \"sampleAllocationVeterinarianId\": 1}'),(143,'44b250ea-8992-4f4b-9ebd-bcf5f3194d66','sampleAllocationVeterinarian','1','UPDATE','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 3, \"imageLink\": null, \"storageId\": 3, \"sampleTypeId\": 3, \"veterinarianVisitId\": 6, \"sendSampleVeterinarian\": [{\"id\": 11, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}, {\"id\": 12, \"note\": \"Observação sobre a amostra enviada\", \"quantity\": 1, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 1, \"storageId\": 2, \"sampleAllocationVeterinarianId\": 1}]}','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 3, \"imageLink\": null, \"storageId\": 3, \"sampleTypeId\": 3, \"veterinarianVisitId\": 1}'),(144,'44b250ea-8992-4f4b-9ebd-bcf5f3194d66','sendSampleVeterinarian','11','DELETE','{\"id\": 11, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}',NULL),(145,'44b250ea-8992-4f4b-9ebd-bcf5f3194d66','sendSampleVeterinarian','12','DELETE','{\"id\": 12, \"note\": \"Observação sobre a amostra enviada\", \"quantity\": 1, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 1, \"storageId\": 2, \"sampleAllocationVeterinarianId\": 1}',NULL),(146,'44b250ea-8992-4f4b-9ebd-bcf5f3194d66','sendSampleVeterinarian','13','CREATE',NULL,'{\"id\": 13, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}'),(147,'44b250ea-8992-4f4b-9ebd-bcf5f3194d66','sendSampleVeterinarian','14','CREATE',NULL,'{\"id\": 14, \"note\": \"Observação sobre a amostra enviada\", \"quantity\": 1, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 1, \"storageId\": 2, \"sampleAllocationVeterinarianId\": 1}'),(148,'484beeea-4356-455a-9fc5-a32d251782a6','sampleAllocationVeterinarian','3','CREATE',NULL,'{\"id\": 3, \"note\": null, \"quantity\": 14, \"statusId\": 4, \"imageLink\": null, \"storageId\": 4, \"sampleTypeId\": 1, \"veterinarianVisitId\": 6}'),(149,'424463ca-6930-4e6e-9b60-3c372308ac14','veterinarianVisit','2','UPDATE','{\"id\": 2, \"date\": \"1212-12-11T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1, \"bodyMeasurement\": [{\"id\": 5, \"value\": 11, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 1}]}','{\"id\": 2, \"date\": \"1212-12-11T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1}'),(150,'424463ca-6930-4e6e-9b60-3c372308ac14','bodyMeasurementVeterinarian','5','DELETE','{\"id\": 5, \"value\": 11, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 1}',NULL),(151,'424463ca-6930-4e6e-9b60-3c372308ac14','bodyMeasurementVeterinarian','6','CREATE',NULL,'{\"id\": 6, \"value\": 11, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 1}'),(152,'424463ca-6930-4e6e-9b60-3c372308ac14','bodyMeasurementVeterinarian','7','CREATE',NULL,'{\"id\": 7, \"value\": 12, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 2}'),(153,'4e2b3f3a-b9fb-4210-b7b1-eb0a9c947334','sampleAllocationVeterinarian','1','UPDATE','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 3, \"imageLink\": null, \"storageId\": 3, \"sampleTypeId\": 3, \"veterinarianVisitId\": 1, \"sendSampleVeterinarian\": [{\"id\": 13, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}, {\"id\": 14, \"note\": \"Observação sobre a amostra enviada\", \"quantity\": 1, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 1, \"storageId\": 2, \"sampleAllocationVeterinarianId\": 1}]}','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 3, \"imageLink\": null, \"storageId\": 3, \"sampleTypeId\": 3, \"veterinarianVisitId\": 1}'),(154,'4e2b3f3a-b9fb-4210-b7b1-eb0a9c947334','sendSampleVeterinarian','13','DELETE','{\"id\": 13, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}',NULL),(155,'4e2b3f3a-b9fb-4210-b7b1-eb0a9c947334','sendSampleVeterinarian','14','DELETE','{\"id\": 14, \"note\": \"Observação sobre a amostra enviada\", \"quantity\": 1, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 1, \"storageId\": 2, \"sampleAllocationVeterinarianId\": 1}',NULL),(156,'4e2b3f3a-b9fb-4210-b7b1-eb0a9c947334','sendSampleVeterinarian','15','CREATE',NULL,'{\"id\": 15, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}'),(157,'4e2b3f3a-b9fb-4210-b7b1-eb0a9c947334','sendSampleVeterinarian','16','CREATE',NULL,'{\"id\": 16, \"note\": \"Observação sobre a amostra enviada\", \"quantity\": 2, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 1, \"storageId\": 2, \"sampleAllocationVeterinarianId\": 1}'),(158,'01bfd082-ae78-40ab-93c3-d276b6ae0857','sampleAllocationVeterinarian','1','UPDATE','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 3, \"imageLink\": null, \"storageId\": 3, \"sampleTypeId\": 3, \"veterinarianVisitId\": 1, \"sendSampleVeterinarian\": [{\"id\": 15, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}, {\"id\": 16, \"note\": \"Observação sobre a amostra enviada\", \"quantity\": 2, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 1, \"storageId\": 2, \"sampleAllocationVeterinarianId\": 1}]}','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 3, \"imageLink\": null, \"storageId\": 3, \"sampleTypeId\": 3, \"veterinarianVisitId\": 1}'),(159,'01bfd082-ae78-40ab-93c3-d276b6ae0857','sendSampleVeterinarian','15','DELETE','{\"id\": 15, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}',NULL),(160,'01bfd082-ae78-40ab-93c3-d276b6ae0857','sendSampleVeterinarian','16','DELETE','{\"id\": 16, \"note\": \"Observação sobre a amostra enviada\", \"quantity\": 2, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 1, \"storageId\": 2, \"sampleAllocationVeterinarianId\": 1}',NULL),(161,'01bfd082-ae78-40ab-93c3-d276b6ae0857','sendSampleVeterinarian','17','CREATE',NULL,'{\"id\": 17, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}'),(162,'01bfd082-ae78-40ab-93c3-d276b6ae0857','sendSampleVeterinarian','18','CREATE',NULL,'{\"id\": 18, \"note\": \"Observação sobre a amostra enviada\", \"quantity\": 2, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 1, \"storageId\": 2, \"sampleAllocationVeterinarianId\": 1}'),(163,'01bfd082-ae78-40ab-93c3-d276b6ae0857','sendSampleVeterinarian','19','CREATE',NULL,'{\"id\": 19, \"note\": null, \"quantity\": 1, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 2, \"storageId\": 5, \"sampleAllocationVeterinarianId\": 1}'),(164,'b765b84a-9bf2-4fea-a7ab-7a49bc9815e3','sampleAllocationVeterinarian','1','UPDATE','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 3, \"imageLink\": null, \"storageId\": 3, \"sampleTypeId\": 3, \"veterinarianVisitId\": 1, \"sendSampleVeterinarian\": [{\"id\": 17, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}, {\"id\": 18, \"note\": \"Observação sobre a amostra enviada\", \"quantity\": 2, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 1, \"storageId\": 2, \"sampleAllocationVeterinarianId\": 1}, {\"id\": 19, \"note\": null, \"quantity\": 1, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 2, \"storageId\": 5, \"sampleAllocationVeterinarianId\": 1}]}','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 3, \"imageLink\": null, \"storageId\": 3, \"sampleTypeId\": 3, \"veterinarianVisitId\": 1}'),(165,'b765b84a-9bf2-4fea-a7ab-7a49bc9815e3','sendSampleVeterinarian','17','DELETE','{\"id\": 17, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}',NULL),(166,'b765b84a-9bf2-4fea-a7ab-7a49bc9815e3','sendSampleVeterinarian','18','DELETE','{\"id\": 18, \"note\": \"Observação sobre a amostra enviada\", \"quantity\": 2, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 1, \"storageId\": 2, \"sampleAllocationVeterinarianId\": 1}',NULL),(167,'b765b84a-9bf2-4fea-a7ab-7a49bc9815e3','sendSampleVeterinarian','19','DELETE','{\"id\": 19, \"note\": null, \"quantity\": 1, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 2, \"storageId\": 5, \"sampleAllocationVeterinarianId\": 1}',NULL),(168,'b765b84a-9bf2-4fea-a7ab-7a49bc9815e3','sendSampleVeterinarian','20','CREATE',NULL,'{\"id\": 20, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}'),(169,'b765b84a-9bf2-4fea-a7ab-7a49bc9815e3','sendSampleVeterinarian','21','CREATE',NULL,'{\"id\": 21, \"note\": \"Observação sobre a amostra enviada\", \"quantity\": 2, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 1, \"storageId\": 2, \"sampleAllocationVeterinarianId\": 1}'),(170,'b765b84a-9bf2-4fea-a7ab-7a49bc9815e3','sendSampleVeterinarian','22','CREATE',NULL,'{\"id\": 22, \"note\": null, \"quantity\": 1, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 2, \"storageId\": 5, \"sampleAllocationVeterinarianId\": 1}'),(171,'57565f13-be70-4bf2-a7bb-f728a7b34fc6','sampleAllocationVeterinarian','1','UPDATE','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 3, \"imageLink\": null, \"storageId\": 3, \"sampleTypeId\": 3, \"veterinarianVisitId\": 1, \"sendSampleVeterinarian\": [{\"id\": 20, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}, {\"id\": 21, \"note\": \"Observação sobre a amostra enviada\", \"quantity\": 2, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 1, \"storageId\": 2, \"sampleAllocationVeterinarianId\": 1}, {\"id\": 22, \"note\": null, \"quantity\": 1, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 2, \"storageId\": 5, \"sampleAllocationVeterinarianId\": 1}]}','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 3, \"imageLink\": null, \"storageId\": 3, \"sampleTypeId\": 3, \"veterinarianVisitId\": 1}'),(172,'57565f13-be70-4bf2-a7bb-f728a7b34fc6','sendSampleVeterinarian','20','DELETE','{\"id\": 20, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}',NULL),(173,'57565f13-be70-4bf2-a7bb-f728a7b34fc6','sendSampleVeterinarian','21','DELETE','{\"id\": 21, \"note\": \"Observação sobre a amostra enviada\", \"quantity\": 2, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 1, \"storageId\": 2, \"sampleAllocationVeterinarianId\": 1}',NULL),(174,'57565f13-be70-4bf2-a7bb-f728a7b34fc6','sendSampleVeterinarian','22','DELETE','{\"id\": 22, \"note\": null, \"quantity\": 1, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 2, \"storageId\": 5, \"sampleAllocationVeterinarianId\": 1}',NULL),(175,'57565f13-be70-4bf2-a7bb-f728a7b34fc6','sendSampleVeterinarian','23','CREATE',NULL,'{\"id\": 23, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}'),(176,'57565f13-be70-4bf2-a7bb-f728a7b34fc6','sendSampleVeterinarian','24','CREATE',NULL,'{\"id\": 24, \"note\": null, \"quantity\": 1, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 2, \"storageId\": 5, \"sampleAllocationVeterinarianId\": 1}'),(177,'72bd7a96-9354-4923-a6a3-1b3339b13854','sampleAllocationVeterinarian','1','UPDATE','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 3, \"imageLink\": null, \"storageId\": 3, \"sampleTypeId\": 3, \"veterinarianVisitId\": 1, \"sendSampleVeterinarian\": [{\"id\": 23, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}, {\"id\": 24, \"note\": null, \"quantity\": 1, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 2, \"storageId\": 5, \"sampleAllocationVeterinarianId\": 1}]}','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 3, \"imageLink\": null, \"storageId\": 3, \"sampleTypeId\": 3, \"veterinarianVisitId\": 1}'),(178,'72bd7a96-9354-4923-a6a3-1b3339b13854','sendSampleVeterinarian','23','DELETE','{\"id\": 23, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}',NULL),(179,'72bd7a96-9354-4923-a6a3-1b3339b13854','sendSampleVeterinarian','24','DELETE','{\"id\": 24, \"note\": null, \"quantity\": 1, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 2, \"storageId\": 5, \"sampleAllocationVeterinarianId\": 1}',NULL),(180,'72bd7a96-9354-4923-a6a3-1b3339b13854','sendSampleVeterinarian','25','CREATE',NULL,'{\"id\": 25, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}'),(181,'72bd7a96-9354-4923-a6a3-1b3339b13854','sendSampleVeterinarian','26','CREATE',NULL,'{\"id\": 26, \"note\": null, \"quantity\": 2, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 2, \"storageId\": 5, \"sampleAllocationVeterinarianId\": 1}'),(182,'29b8b505-ee3b-4f45-b922-941f009401d3','sampleAllocationVeterinarian','1','UPDATE','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 3, \"imageLink\": null, \"storageId\": 3, \"sampleTypeId\": 3, \"veterinarianVisitId\": 1, \"sendSampleVeterinarian\": [{\"id\": 25, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}, {\"id\": 26, \"note\": null, \"quantity\": 2, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 2, \"storageId\": 5, \"sampleAllocationVeterinarianId\": 1}]}','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 3, \"imageLink\": null, \"storageId\": 3, \"sampleTypeId\": 3, \"veterinarianVisitId\": 1}'),(183,'29b8b505-ee3b-4f45-b922-941f009401d3','sendSampleVeterinarian','25','DELETE','{\"id\": 25, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}',NULL),(184,'29b8b505-ee3b-4f45-b922-941f009401d3','sendSampleVeterinarian','26','DELETE','{\"id\": 26, \"note\": null, \"quantity\": 2, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 2, \"storageId\": 5, \"sampleAllocationVeterinarianId\": 1}',NULL),(185,'29b8b505-ee3b-4f45-b922-941f009401d3','sendSampleVeterinarian','27','CREATE',NULL,'{\"id\": 27, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}'),(186,'29b8b505-ee3b-4f45-b922-941f009401d3','sendSampleVeterinarian','28','CREATE',NULL,'{\"id\": 28, \"note\": null, \"quantity\": 2, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 2, \"storageId\": 5, \"sampleAllocationVeterinarianId\": 1}'),(187,'29b8b505-ee3b-4f45-b922-941f009401d3','sendSampleVeterinarian','29','CREATE',NULL,'{\"id\": 29, \"note\": null, \"quantity\": 2, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 4, \"storageId\": 3, \"sampleAllocationVeterinarianId\": 1}'),(188,'49112fd8-0223-4349-a7bf-39fbf7aa1278','sampleAllocationVeterinarian','1','UPDATE','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 3, \"imageLink\": null, \"storageId\": 3, \"sampleTypeId\": 3, \"veterinarianVisitId\": 1, \"sendSampleVeterinarian\": [{\"id\": 27, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}, {\"id\": 29, \"note\": null, \"quantity\": 2, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 4, \"storageId\": 3, \"sampleAllocationVeterinarianId\": 1}, {\"id\": 28, \"note\": null, \"quantity\": 2, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 2, \"storageId\": 5, \"sampleAllocationVeterinarianId\": 1}]}','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 3, \"imageLink\": null, \"storageId\": 3, \"sampleTypeId\": 3, \"veterinarianVisitId\": 1}'),(189,'49112fd8-0223-4349-a7bf-39fbf7aa1278','sendSampleVeterinarian','27','DELETE','{\"id\": 27, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}',NULL),(190,'49112fd8-0223-4349-a7bf-39fbf7aa1278','sendSampleVeterinarian','29','DELETE','{\"id\": 29, \"note\": null, \"quantity\": 2, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 4, \"storageId\": 3, \"sampleAllocationVeterinarianId\": 1}',NULL),(191,'49112fd8-0223-4349-a7bf-39fbf7aa1278','sendSampleVeterinarian','28','DELETE','{\"id\": 28, \"note\": null, \"quantity\": 2, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 2, \"storageId\": 5, \"sampleAllocationVeterinarianId\": 1}',NULL),(192,'49112fd8-0223-4349-a7bf-39fbf7aa1278','sendSampleVeterinarian','30','CREATE',NULL,'{\"id\": 30, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}'),(193,'49112fd8-0223-4349-a7bf-39fbf7aa1278','sendSampleVeterinarian','31','CREATE',NULL,'{\"id\": 31, \"note\": null, \"quantity\": 1, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 2, \"storageId\": 5, \"sampleAllocationVeterinarianId\": 1}'),(194,'49112fd8-0223-4349-a7bf-39fbf7aa1278','sendSampleVeterinarian','32','CREATE',NULL,'{\"id\": 32, \"note\": null, \"quantity\": 1, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 4, \"storageId\": 3, \"sampleAllocationVeterinarianId\": 1}'),(195,'8c28ea4b-1aa1-4ab6-bb8c-1f82d2feb2a9','sampleAllocationVeterinarian','3','DELETE','{\"id\": 3, \"note\": null, \"quantity\": 14, \"statusId\": 4, \"imageLink\": null, \"storageId\": 4, \"sendSamples\": [], \"sampleTypeId\": 1, \"veterinarianVisitId\": 6, \"sendSampleVeterinarian\": []}',NULL),(196,'3899f44f-4516-4612-abfe-4c520c449879','sampleAllocationVeterinarian','2','UPDATE','{\"id\": 2, \"note\": null, \"quantity\": 13, \"statusId\": 2, \"imageLink\": null, \"storageId\": 4, \"sampleTypeId\": 4, \"veterinarianVisitId\": 1, \"sendSampleVeterinarian\": []}','{\"id\": 2, \"note\": null, \"quantity\": 13, \"statusId\": 2, \"imageLink\": null, \"storageId\": 4, \"sampleTypeId\": 4, \"veterinarianVisitId\": 1}'),(197,'d45f8bb4-4c0c-4186-ab0b-1de85d84b241','physicalExam','1','CREATE',NULL,'{\"fc\": 12, \"fr\": \"Ofegante\", \"id\": 1, \"tpc\": 12, \"score\": 9, \"weight\": 12, \"mucousId\": 2, \"tempRectal\": 12, \"generalNote\": null, \"hydrationId\": 1, \"physicalExamNote\": null, \"generalConditionId\": 1, \"bloodCollectionNote\": null, \"veterinarianVisitId\": 5}'),(198,'d819cf67-01a9-4652-9bc4-615887da1411','physicalExam','1','UPDATE',NULL,'{\"fc\": 12, \"fr\": \"Ofegante\", \"id\": 1, \"tpc\": 12, \"score\": 9, \"weight\": 12, \"mucousId\": 2, \"tempRectal\": 12, \"generalNote\": null, \"hydrationId\": 1, \"physicalExamNote\": null, \"generalConditionId\": 1, \"bloodCollectionNote\": null, \"veterinarianVisitId\": 5}'),(199,'b625e00a-3d8e-4735-815d-0c308d910dde','physicalExam','1','UPDATE',NULL,'{\"fc\": 12, \"fr\": \"Ofegante\", \"id\": 1, \"tpc\": 12, \"score\": 9, \"weight\": 12, \"mucousId\": 2, \"tempRectal\": 14, \"generalNote\": null, \"hydrationId\": 1, \"physicalExamNote\": null, \"generalConditionId\": 1, \"bloodCollectionNote\": null, \"veterinarianVisitId\": 5}'),(200,'aed71874-6a27-4a1f-93ec-9a3aca92a152','sampleAllocationVeterinarian','1','UPDATE','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 3, \"imageLink\": null, \"storageId\": 3, \"sampleTypeId\": 3, \"veterinarianVisitId\": 1, \"sendSampleVeterinarian\": [{\"id\": 30, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}, {\"id\": 32, \"note\": null, \"quantity\": 1, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 4, \"storageId\": 3, \"sampleAllocationVeterinarianId\": 1}, {\"id\": 31, \"note\": null, \"quantity\": 1, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 2, \"storageId\": 5, \"sampleAllocationVeterinarianId\": 1}]}','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 3, \"imageLink\": null, \"storageId\": 3, \"sampleTypeId\": 3, \"veterinarianVisitId\": 5}'),(201,'aed71874-6a27-4a1f-93ec-9a3aca92a152','sendSampleVeterinarian','30','DELETE','{\"id\": 30, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}',NULL),(202,'aed71874-6a27-4a1f-93ec-9a3aca92a152','sendSampleVeterinarian','32','DELETE','{\"id\": 32, \"note\": null, \"quantity\": 1, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 4, \"storageId\": 3, \"sampleAllocationVeterinarianId\": 1}',NULL),(203,'aed71874-6a27-4a1f-93ec-9a3aca92a152','sendSampleVeterinarian','31','DELETE','{\"id\": 31, \"note\": null, \"quantity\": 1, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 2, \"storageId\": 5, \"sampleAllocationVeterinarianId\": 1}',NULL),(204,'aed71874-6a27-4a1f-93ec-9a3aca92a152','sendSampleVeterinarian','33','CREATE',NULL,'{\"id\": 33, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}'),(205,'aed71874-6a27-4a1f-93ec-9a3aca92a152','sendSampleVeterinarian','34','CREATE',NULL,'{\"id\": 34, \"note\": null, \"quantity\": 1, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 4, \"storageId\": 3, \"sampleAllocationVeterinarianId\": 1}'),(206,'aed71874-6a27-4a1f-93ec-9a3aca92a152','sendSampleVeterinarian','35','CREATE',NULL,'{\"id\": 35, \"note\": null, \"quantity\": 1, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 2, \"storageId\": 5, \"sampleAllocationVeterinarianId\": 1}'),(207,'1521c2e9-fcb3-4342-83ab-510beb678ca7','veterinarianVisit','7','CREATE',NULL,'{\"id\": 7, \"date\": \"1212-12-14T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1}'),(208,'3af6bbda-d816-477a-b7d4-37edb63fbefb','veterinarianVisit','2','UPDATE','{\"id\": 2, \"date\": \"1212-12-11T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1, \"bodyMeasurement\": [{\"id\": 6, \"value\": 11, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 1}, {\"id\": 7, \"value\": 12, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 2}]}','{\"id\": 2, \"date\": \"1212-12-11T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1}'),(209,'3af6bbda-d816-477a-b7d4-37edb63fbefb','bodyMeasurementVeterinarian','6','DELETE','{\"id\": 6, \"value\": 11, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 1}',NULL),(210,'3af6bbda-d816-477a-b7d4-37edb63fbefb','bodyMeasurementVeterinarian','7','DELETE','{\"id\": 7, \"value\": 12, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 2}',NULL),(211,'3af6bbda-d816-477a-b7d4-37edb63fbefb','bodyMeasurementVeterinarian','8','CREATE',NULL,'{\"id\": 8, \"value\": 11, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 1}'),(212,'3af6bbda-d816-477a-b7d4-37edb63fbefb','bodyMeasurementVeterinarian','9','CREATE',NULL,'{\"id\": 9, \"value\": 12, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 2}'),(213,'4e473143-d12c-49e5-83fc-3930ed49340c','veterinarianVisit','2','UPDATE','{\"id\": 2, \"date\": \"1212-12-11T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1, \"bodyMeasurement\": [{\"id\": 8, \"value\": 11, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 1}, {\"id\": 9, \"value\": 12, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 2}]}','{\"id\": 2, \"date\": \"1212-12-11T15:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1}'),(214,'4e473143-d12c-49e5-83fc-3930ed49340c','bodyMeasurementVeterinarian','8','DELETE','{\"id\": 8, \"value\": 11, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 1}',NULL),(215,'4e473143-d12c-49e5-83fc-3930ed49340c','bodyMeasurementVeterinarian','9','DELETE','{\"id\": 9, \"value\": 12, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 2}',NULL),(216,'4e473143-d12c-49e5-83fc-3930ed49340c','bodyMeasurementVeterinarian','10','CREATE',NULL,'{\"id\": 10, \"value\": 11, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 1}'),(217,'4e473143-d12c-49e5-83fc-3930ed49340c','bodyMeasurementVeterinarian','11','CREATE',NULL,'{\"id\": 11, \"value\": 12, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 2}'),(218,'62e9517e-22d1-4d9a-a98c-2724d78f521a','veterinarianVisit','2','UPDATE','{\"id\": 2, \"date\": \"1212-12-11T15:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1, \"bodyMeasurement\": [{\"id\": 10, \"value\": 11, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 1}, {\"id\": 11, \"value\": 12, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 2}]}','{\"id\": 2, \"date\": \"1212-12-11T15:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1}'),(219,'62e9517e-22d1-4d9a-a98c-2724d78f521a','bodyMeasurementVeterinarian','10','DELETE','{\"id\": 10, \"value\": 11, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 1}',NULL),(220,'62e9517e-22d1-4d9a-a98c-2724d78f521a','bodyMeasurementVeterinarian','11','DELETE','{\"id\": 11, \"value\": 12, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 2}',NULL),(221,'62e9517e-22d1-4d9a-a98c-2724d78f521a','bodyMeasurementVeterinarian','12','CREATE',NULL,'{\"id\": 12, \"value\": 11, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 1}'),(222,'62e9517e-22d1-4d9a-a98c-2724d78f521a','bodyMeasurementVeterinarian','13','CREATE',NULL,'{\"id\": 13, \"value\": 12, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 2}'),(223,'10ad9873-d58e-4a20-b3eb-69522c3ba3dc','veterinarianVisit','8','CREATE',NULL,'{\"id\": 8, \"date\": \"1212-12-15T15:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 2}'),(224,'5e355148-6c95-49f0-b733-4eeafc8d018b','veterinarianVisit','2','UPDATE','{\"id\": 2, \"date\": \"1212-12-11T15:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1, \"bodyMeasurement\": [{\"id\": 12, \"value\": 11, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 1}, {\"id\": 13, \"value\": 12, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 2}]}','{\"id\": 2, \"date\": \"1212-12-11T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1}'),(225,'5e355148-6c95-49f0-b733-4eeafc8d018b','bodyMeasurementVeterinarian','12','DELETE','{\"id\": 12, \"value\": 11, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 1}',NULL),(226,'5e355148-6c95-49f0-b733-4eeafc8d018b','bodyMeasurementVeterinarian','13','DELETE','{\"id\": 13, \"value\": 12, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 2}',NULL),(227,'5e355148-6c95-49f0-b733-4eeafc8d018b','bodyMeasurementVeterinarian','14','CREATE',NULL,'{\"id\": 14, \"value\": 11, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 1}'),(228,'5e355148-6c95-49f0-b733-4eeafc8d018b','bodyMeasurementVeterinarian','15','CREATE',NULL,'{\"id\": 15, \"value\": 12, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 2}'),(229,'bcff59cd-cfab-47d8-89b6-e33840145f78','veterinarianVisit','6','UPDATE','{\"id\": 6, \"date\": \"1212-12-12T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 2, \"veterinarianId\": 2, \"bodyMeasurement\": []}','{\"id\": 6, \"date\": \"1212-12-12T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 2, \"veterinarianId\": 2}'),(230,'d891d1df-c2c6-4e8e-a5f2-6fc4beb9c12f','veterinarianVisit','1','UPDATE','{\"id\": 1, \"date\": \"1212-12-12T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 2, \"bodyMeasurement\": []}','{\"id\": 1, \"date\": \"1212-12-12T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 2}'),(231,'97718a79-a274-4755-bc50-770fc4d89bb6','veterinarianVisit','5','UPDATE','{\"id\": 5, \"date\": \"1212-12-13T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 2, \"bodyMeasurement\": []}','{\"id\": 5, \"date\": \"1212-12-13T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 2}'),(232,'da19214e-cb43-4ba9-b11f-859a13a3a34f','veterinarianVisit','7','UPDATE','{\"id\": 7, \"date\": \"1212-12-14T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1, \"bodyMeasurement\": []}','{\"id\": 7, \"date\": \"1212-12-14T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1}'),(233,'a40753db-672f-48e1-80fb-a1d65b00e6f6','veterinarianVisit','8','UPDATE','{\"id\": 8, \"date\": \"1212-12-15T15:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 2, \"bodyMeasurement\": []}','{\"id\": 8, \"date\": \"1212-12-15T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 2}'),(234,'aab4c0aa-478a-47e7-9a8f-74c25610e232','sampleAllocationVeterinarian','2','UPDATE','{\"id\": 2, \"note\": null, \"quantity\": 13, \"statusId\": 2, \"imageLink\": null, \"storageId\": 4, \"sampleTypeId\": 4, \"veterinarianVisitId\": 1, \"sendSampleVeterinarian\": []}','{\"id\": 2, \"note\": null, \"quantity\": 13, \"statusId\": 2, \"imageLink\": null, \"storageId\": 4, \"sampleTypeId\": 4, \"veterinarianVisitId\": 8}'),(235,'6b2ec761-b2d2-407e-8eb2-7412dd2eb9ce','veterinarianVisit','8','UPDATE','{\"id\": 8, \"date\": \"1212-12-15T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 2, \"bodyMeasurement\": []}','{\"id\": 8, \"date\": \"1212-12-15T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 2, \"veterinarianId\": 2}'),(236,'8e1d98fe-255e-4e0b-aa70-0190416700fe','veterinarianVisit','8','UPDATE','{\"id\": 8, \"date\": \"1212-12-15T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 2, \"veterinarianId\": 2, \"bodyMeasurement\": []}','{\"id\": 8, \"date\": \"1212-12-15T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 2}'),(237,'','physicalExam','1','UPDATE',NULL,'{\"fc\": 12, \"fr\": \"Ofegante\", \"id\": 1, \"tpc\": 12, \"score\": 9, \"weight\": 12, \"mucousId\": 2, \"tempRectal\": 14, \"generalNote\": null, \"hydrationId\": 1, \"physicalExamNote\": null, \"generalConditionId\": 1, \"bloodCollectionNote\": \"Observações...\", \"veterinarianVisitId\": 5}'),(238,'b7397488-dee7-4aed-bf42-af5306c7316f','bodyMeasurementVeterinarian','14','DELETE','{\"id\": 14, \"value\": 11, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 1}',NULL),(239,'b7397488-dee7-4aed-bf42-af5306c7316f','bodyMeasurementVeterinarian','15','DELETE','{\"id\": 15, \"value\": 12, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 2}',NULL),(240,'b7397488-dee7-4aed-bf42-af5306c7316f','veterinarianVisit','2','DELETE','{\"id\": 2, \"date\": \"1212-12-11T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1, \"bodyMeasurement\": [{\"id\": 14, \"value\": 11, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 1}, {\"id\": 15, \"value\": 12, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 2}]}',NULL),(241,'b607b948-58b6-4d75-97d1-603be2a62271','physicalExam','1','DELETE','{\"fc\": 12, \"fr\": \"Ofegante\", \"id\": 1, \"tpc\": 12, \"score\": 9, \"weight\": 12, \"mucousId\": 2, \"tempRectal\": 14, \"generalNote\": null, \"hydrationId\": 1, \"physicalExamNote\": null, \"generalConditionId\": 1, \"bloodCollectionNote\": \"Observações...\", \"veterinarianVisitId\": 5}',NULL),(242,'f107b9c8-a61e-4090-a3c2-08766951a0c5','physicalExam','2','CREATE',NULL,'{\"fc\": 123, \"fr\": \"Ofegante\", \"id\": 2, \"tpc\": 123, \"score\": 9, \"weight\": 123, \"mucousId\": 2, \"tempRectal\": 123, \"generalNote\": null, \"hydrationId\": 1, \"physicalExamNote\": null, \"generalConditionId\": 1, \"bloodCollectionNote\": null, \"veterinarianVisitId\": 8}'),(243,'4cc0917e-7046-44ba-a103-660cc560de49','vaccineApplication','1','CREATE',NULL,'{\"id\": 1, \"date\": \"1212-12-12T15:06:28.000Z\", \"vaccineId\": 1, \"liveAnimalId\": 1, \"vaccineTypeId\": 1, \"veterinarianVisitId\": null}'),(244,'9b16dc6c-b74a-4257-98c6-ea30075b335a','vaccineApplication','1','UPDATE','{\"id\": 1, \"date\": \"1212-12-12T15:06:28.000Z\", \"vaccineId\": 1, \"liveAnimalId\": 1, \"vaccineTypeId\": 1, \"veterinarianVisitId\": null}','{\"id\": 1, \"date\": \"1212-12-12T15:06:28.000Z\", \"vaccineId\": 1, \"liveAnimalId\": 1, \"vaccineTypeId\": 1, \"veterinarianVisitId\": null}'),(245,'2030562c-2ec7-42ea-b5bc-682399f59bee','vaccineApplication','1','UPDATE','{\"id\": 1, \"date\": \"1212-12-12T15:06:28.000Z\", \"vaccineId\": 1, \"liveAnimalId\": 1, \"vaccineTypeId\": 1, \"veterinarianVisitId\": null}','{\"id\": 1, \"date\": \"1212-12-12T15:06:28.000Z\", \"vaccineId\": 1, \"liveAnimalId\": 1, \"vaccineTypeId\": 1, \"veterinarianVisitId\": 1}'),(246,'e0e94d9d-f47d-4778-a063-b865e1c7a62e','vaccineApplication','1','UPDATE','{\"id\": 1, \"date\": \"1212-12-12T15:06:28.000Z\", \"vaccineId\": 1, \"liveAnimalId\": 1, \"vaccineTypeId\": 1, \"veterinarianVisitId\": 1}','{\"id\": 1, \"date\": \"1212-12-12T15:06:28.000Z\", \"vaccineId\": 1, \"liveAnimalId\": 1, \"vaccineTypeId\": 1, \"veterinarianVisitId\": null}'),(247,'68cd32a7-58a6-4ebb-97d9-4b65d66c823e','vaccineApplication','1','UPDATE','{\"id\": 1, \"date\": \"1212-12-12T15:06:28.000Z\", \"vaccineId\": 1, \"liveAnimalId\": 1, \"vaccineTypeId\": 1, \"veterinarianVisitId\": null}','{\"id\": 1, \"date\": \"1212-12-12T15:06:28.000Z\", \"vaccineId\": 1, \"liveAnimalId\": 1, \"vaccineTypeId\": 1, \"veterinarianVisitId\": 8}'),(248,'e16a0d06-1005-4f3c-b3ae-8d9211114e83','vaccineApplication','1','UPDATE','{\"id\": 1, \"date\": \"1212-12-12T15:06:28.000Z\", \"vaccineId\": 1, \"liveAnimalId\": 1, \"vaccineTypeId\": 1, \"veterinarianVisitId\": 8}','{\"id\": 1, \"date\": \"1212-12-12T15:06:28.000Z\", \"vaccineId\": 1, \"liveAnimalId\": 2, \"vaccineTypeId\": 1, \"veterinarianVisitId\": 6}'),(249,'eee3b1d7-4d8e-45dd-bc75-c8a0fb750608','vaccineApplication','2','CREATE',NULL,'{\"id\": 2, \"date\": \"1212-12-14T15:06:28.000Z\", \"vaccineId\": 2, \"liveAnimalId\": 1, \"vaccineTypeId\": 1, \"veterinarianVisitId\": null}'),(250,'c4b2a542-65a3-4d87-bdb6-48bb75f07076','sampleAllocationVeterinarian','2','UPDATE','{\"id\": 2, \"note\": null, \"quantity\": 13, \"statusId\": 2, \"imageLink\": null, \"storageId\": 4, \"sampleTypeId\": 4, \"veterinarianVisitId\": 8, \"sendSampleVeterinarian\": []}','{\"id\": 2, \"note\": null, \"quantity\": 13, \"statusId\": 2, \"imageLink\": null, \"storageId\": 4, \"sampleTypeId\": 4, \"veterinarianVisitId\": 8}'),(251,'c4b2a542-65a3-4d87-bdb6-48bb75f07076','sendSampleVeterinarian','36','CREATE',NULL,'{\"id\": 36, \"note\": null, \"quantity\": 12, \"sendDate\": \"1212-12-15T15:06:28.000Z\", \"statusId\": 2, \"storageId\": 3, \"sampleAllocationVeterinarianId\": 2}'),(252,'e6728ede-5bbf-4d63-9734-1fe04a050032','sampleAllocationVeterinarian','2','UPDATE','{\"id\": 2, \"note\": null, \"quantity\": 13, \"statusId\": 2, \"imageLink\": null, \"storageId\": 4, \"sampleTypeId\": 4, \"veterinarianVisitId\": 8, \"sendSampleVeterinarian\": [{\"id\": 36, \"note\": null, \"quantity\": 12, \"sendDate\": \"1212-12-15T15:06:28.000Z\", \"statusId\": 2, \"storageId\": 3, \"sampleAllocationVeterinarianId\": 2}]}','{\"id\": 2, \"note\": null, \"quantity\": 13, \"statusId\": 2, \"imageLink\": null, \"storageId\": 4, \"sampleTypeId\": 4, \"veterinarianVisitId\": 8}'),(253,'e6728ede-5bbf-4d63-9734-1fe04a050032','sendSampleVeterinarian','36','DELETE','{\"id\": 36, \"note\": null, \"quantity\": 12, \"sendDate\": \"1212-12-15T15:06:28.000Z\", \"statusId\": 2, \"storageId\": 3, \"sampleAllocationVeterinarianId\": 2}',NULL),(254,'20b93232-14ea-47a3-9177-a4b15e05b2cf','sampleAllocationVeterinarian','1','UPDATE','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 3, \"imageLink\": null, \"storageId\": 3, \"sampleTypeId\": 3, \"veterinarianVisitId\": 5, \"sendSampleVeterinarian\": [{\"id\": 33, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}, {\"id\": 34, \"note\": null, \"quantity\": 1, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 4, \"storageId\": 3, \"sampleAllocationVeterinarianId\": 1}, {\"id\": 35, \"note\": null, \"quantity\": 1, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 2, \"storageId\": 5, \"sampleAllocationVeterinarianId\": 1}]}','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 3, \"imageLink\": null, \"storageId\": 3, \"sampleTypeId\": 3, \"veterinarianVisitId\": 5}'),(255,'20b93232-14ea-47a3-9177-a4b15e05b2cf','sendSampleVeterinarian','33','DELETE','{\"id\": 33, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}',NULL),(256,'20b93232-14ea-47a3-9177-a4b15e05b2cf','sendSampleVeterinarian','34','DELETE','{\"id\": 34, \"note\": null, \"quantity\": 1, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 4, \"storageId\": 3, \"sampleAllocationVeterinarianId\": 1}',NULL),(257,'20b93232-14ea-47a3-9177-a4b15e05b2cf','sendSampleVeterinarian','35','DELETE','{\"id\": 35, \"note\": null, \"quantity\": 1, \"sendDate\": \"1212-12-12T15:06:28.000Z\", \"statusId\": 2, \"storageId\": 5, \"sampleAllocationVeterinarianId\": 1}',NULL),(258,'20b93232-14ea-47a3-9177-a4b15e05b2cf','sendSampleVeterinarian','37','CREATE',NULL,'{\"id\": 37, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-13T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}'),(259,'20b93232-14ea-47a3-9177-a4b15e05b2cf','sendSampleVeterinarian','38','CREATE',NULL,'{\"id\": 38, \"note\": null, \"quantity\": 1, \"sendDate\": \"1212-12-13T15:06:28.000Z\", \"statusId\": 4, \"storageId\": 3, \"sampleAllocationVeterinarianId\": 1}'),(260,'20b93232-14ea-47a3-9177-a4b15e05b2cf','sendSampleVeterinarian','39','CREATE',NULL,'{\"id\": 39, \"note\": null, \"quantity\": 1, \"sendDate\": \"1212-12-13T15:06:28.000Z\", \"statusId\": 2, \"storageId\": 5, \"sampleAllocationVeterinarianId\": 1}'),(261,'788364db-0417-490a-b904-99b35239c4ef','vaccineApplication','2','UPDATE','{\"id\": 2, \"date\": \"1212-12-14T15:06:28.000Z\", \"vaccineId\": 2, \"liveAnimalId\": 1, \"vaccineTypeId\": 1, \"veterinarianVisitId\": null}','{\"id\": 2, \"date\": \"1212-12-14T15:06:28.000Z\", \"vaccineId\": 2, \"liveAnimalId\": 1, \"vaccineTypeId\": 1, \"veterinarianVisitId\": 7}'),(262,'2d883305-d1e3-4df2-a9dc-f6f697489b44','veterinarianVisit','8','UPDATE','{\"id\": 8, \"date\": \"1212-12-15T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 2, \"bodyMeasurement\": []}','{\"id\": 8, \"date\": \"2025-12-15T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 2}'),(263,'424f10ad-09b9-4c08-9433-e176c201ec51','veterinarianVisit','7','UPDATE','{\"id\": 7, \"date\": \"1212-12-14T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1, \"bodyMeasurement\": []}','{\"id\": 7, \"date\": \"2025-12-14T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1}'),(264,'ec16caaf-4653-4790-adc0-d17da8460f39','veterinarianVisit','5','UPDATE','{\"id\": 5, \"date\": \"1212-12-13T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 2, \"bodyMeasurement\": []}','{\"id\": 5, \"date\": \"2025-12-13T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 2}'),(265,'9d13beb4-d355-430e-aef4-c25233d1567a','veterinarianVisit','1','UPDATE','{\"id\": 1, \"date\": \"1212-12-12T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 2, \"bodyMeasurement\": []}','{\"id\": 1, \"date\": \"2025-12-12T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 2}'),(266,'1deffba2-d7d0-4329-a4e6-eaa6db20a2e2','veterinarianVisit','6','UPDATE','{\"id\": 6, \"date\": \"1212-12-12T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 2, \"veterinarianId\": 2, \"bodyMeasurement\": []}','{\"id\": 6, \"date\": \"2025-12-12T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 2, \"veterinarianId\": 2}'),(267,'8316fb24-d8c3-426f-989a-d19698808463','vaccineApplication','2','UPDATE','{\"id\": 2, \"date\": \"1212-12-14T15:06:28.000Z\", \"vaccineId\": 2, \"liveAnimalId\": 1, \"vaccineTypeId\": 1, \"veterinarianVisitId\": 7}','{\"id\": 2, \"date\": \"2025-12-14T15:00:00.000Z\", \"vaccineId\": 2, \"liveAnimalId\": 1, \"vaccineTypeId\": 1, \"veterinarianVisitId\": 7}'),(268,'3ab85329-6cd3-4036-b5f5-972d3d29ba33','vaccineApplication','1','UPDATE','{\"id\": 1, \"date\": \"1212-12-12T15:06:28.000Z\", \"vaccineId\": 1, \"liveAnimalId\": 2, \"vaccineTypeId\": 1, \"veterinarianVisitId\": 6}','{\"id\": 1, \"date\": \"2025-12-12T15:00:00.000Z\", \"vaccineId\": 1, \"liveAnimalId\": 2, \"vaccineTypeId\": 1, \"veterinarianVisitId\": 6}'),(269,'3ace798d-261b-4c8f-84fb-b496cea1a7e0','veterinarianVisit','9','CREATE',NULL,'{\"id\": 9, \"date\": \"2025-09-16T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 2}'),(270,'0e96d9bc-c9bb-48c6-8645-fa2451bb0cb2','veterinarianVisit','9','UPDATE','{\"id\": 9, \"date\": \"2025-09-16T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 2, \"bodyMeasurement\": []}','{\"id\": 9, \"date\": \"2025-09-16T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 2}'),(271,'0e96d9bc-c9bb-48c6-8645-fa2451bb0cb2','bodyMeasurementVeterinarian','16','CREATE',NULL,'{\"id\": 16, \"value\": 123, \"veterinarianVisitId\": 9, \"bodyMeasurementTypeId\": 1}'),(272,'1a5859ec-06bb-4ed2-bf92-c7f70021efea','veterinarianVisit','7','UPDATE','{\"id\": 7, \"date\": \"2025-12-14T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1, \"bodyMeasurement\": []}','{\"id\": 7, \"date\": \"2025-12-14T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1}'),(273,'1a5859ec-06bb-4ed2-bf92-c7f70021efea','bodyMeasurementVeterinarian','17','CREATE',NULL,'{\"id\": 17, \"value\": 123, \"veterinarianVisitId\": 7, \"bodyMeasurementTypeId\": 1}'),(274,'1a5859ec-06bb-4ed2-bf92-c7f70021efea','bodyMeasurementVeterinarian','18','CREATE',NULL,'{\"id\": 18, \"value\": 123, \"veterinarianVisitId\": 7, \"bodyMeasurementTypeId\": 2}'),(275,'518c673e-bfe1-408d-a4b4-3ab1231ba3e0','veterinarianVisit','8','UPDATE','{\"id\": 8, \"date\": \"2025-12-15T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 2, \"bodyMeasurement\": []}','{\"id\": 8, \"date\": \"2025-12-15T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 2}'),(276,'518c673e-bfe1-408d-a4b4-3ab1231ba3e0','bodyMeasurementVeterinarian','19','CREATE',NULL,'{\"id\": 19, \"value\": 123, \"veterinarianVisitId\": 8, \"bodyMeasurementTypeId\": 1}'),(277,'518c673e-bfe1-408d-a4b4-3ab1231ba3e0','bodyMeasurementVeterinarian','20','CREATE',NULL,'{\"id\": 20, \"value\": 123, \"veterinarianVisitId\": 8, \"bodyMeasurementTypeId\": 2}'),(278,'8b0b88a5-749d-45ca-a54a-b2ad455c8800','veterinarianVisit','8','UPDATE','{\"id\": 8, \"date\": \"2025-12-15T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 2, \"bodyMeasurement\": [{\"id\": 19, \"value\": 123, \"veterinarianVisitId\": 8, \"bodyMeasurementTypeId\": 1}, {\"id\": 20, \"value\": 123, \"veterinarianVisitId\": 8, \"bodyMeasurementTypeId\": 2}]}','{\"id\": 8, \"date\": \"2025-12-15T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 2}'),(279,'8b0b88a5-749d-45ca-a54a-b2ad455c8800','bodyMeasurementVeterinarian','19','DELETE','{\"id\": 19, \"value\": 123, \"veterinarianVisitId\": 8, \"bodyMeasurementTypeId\": 1}',NULL),(280,'8b0b88a5-749d-45ca-a54a-b2ad455c8800','bodyMeasurementVeterinarian','20','DELETE','{\"id\": 20, \"value\": 123, \"veterinarianVisitId\": 8, \"bodyMeasurementTypeId\": 2}',NULL),(281,'0a5df749-a378-4965-80fc-652304c90909','sampleAllocationVeterinarian','5','CREATE',NULL,'{\"id\": 5, \"note\": null, \"quantity\": 13, \"statusId\": 2, \"imageLink\": null, \"storageId\": 3, \"sampleTypeId\": 1, \"veterinarianVisitId\": 7}'),(282,'0a5df749-a378-4965-80fc-652304c90909','sendSampleVeterinarian','40','CREATE',NULL,'{\"id\": 40, \"note\": null, \"quantity\": 12, \"sendDate\": \"2026-02-15T15:00:00.000Z\", \"statusId\": 2, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 5}'),(283,'1659610b-acb9-4429-9d84-eab1b9c8696e','vaccineApplication','3','CREATE',NULL,'{\"id\": 3, \"date\": \"2025-12-13T15:00:00.000Z\", \"vaccineId\": 1, \"liveAnimalId\": 1, \"vaccineTypeId\": 1, \"veterinarianVisitId\": 5}'),(284,'8c8795b2-219b-4c35-85eb-853409b30ed8','veterinarianVisit','10','CREATE',NULL,'{\"id\": 10, \"date\": \"2026-12-12T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 2}'),(285,'8c8795b2-219b-4c35-85eb-853409b30ed8','bodyMeasurementVeterinarian','21','CREATE',NULL,'{\"id\": 21, \"value\": 123, \"veterinarianVisitId\": 10, \"bodyMeasurementTypeId\": 1}'),(286,'8c8795b2-219b-4c35-85eb-853409b30ed8','bodyMeasurementVeterinarian','22','CREATE',NULL,'{\"id\": 22, \"value\": 123, \"veterinarianVisitId\": 10, \"bodyMeasurementTypeId\": 2}'),(287,'349fd84b-e570-4a98-8393-32f0d8bf58f8','veterinarianVisit','7','UPDATE','{\"id\": 7, \"date\": \"2025-12-14T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1, \"bodyMeasurement\": [{\"id\": 17, \"value\": 123, \"veterinarianVisitId\": 7, \"bodyMeasurementTypeId\": 1}, {\"id\": 18, \"value\": 123, \"veterinarianVisitId\": 7, \"bodyMeasurementTypeId\": 2}]}','{\"id\": 7, \"date\": \"2025-12-12T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1}'),(288,'349fd84b-e570-4a98-8393-32f0d8bf58f8','bodyMeasurementVeterinarian','17','DELETE','{\"id\": 17, \"value\": 123, \"veterinarianVisitId\": 7, \"bodyMeasurementTypeId\": 1}',NULL),(289,'349fd84b-e570-4a98-8393-32f0d8bf58f8','bodyMeasurementVeterinarian','18','DELETE','{\"id\": 18, \"value\": 123, \"veterinarianVisitId\": 7, \"bodyMeasurementTypeId\": 2}',NULL),(290,'349fd84b-e570-4a98-8393-32f0d8bf58f8','bodyMeasurementVeterinarian','23','CREATE',NULL,'{\"id\": 23, \"value\": 123, \"veterinarianVisitId\": 7, \"bodyMeasurementTypeId\": 1}'),(291,'349fd84b-e570-4a98-8393-32f0d8bf58f8','bodyMeasurementVeterinarian','24','CREATE',NULL,'{\"id\": 24, \"value\": 123, \"veterinarianVisitId\": 7, \"bodyMeasurementTypeId\": 2}'),(292,'cebdf072-4b50-4b63-bf06-9954f41cac42','sampleAllocationVeterinarian','7','CREATE',NULL,'{\"id\": 7, \"note\": null, \"quantity\": 12, \"statusId\": 2, \"imageLink\": null, \"storageId\": 4, \"sampleTypeId\": 1, \"veterinarianVisitId\": 5}'),(293,'cebdf072-4b50-4b63-bf06-9954f41cac42','sendSampleVeterinarian','41','CREATE',NULL,'{\"id\": 41, \"note\": null, \"quantity\": 11, \"sendDate\": \"2026-12-12T15:00:00.000Z\", \"statusId\": 2, \"storageId\": 3, \"sampleAllocationVeterinarianId\": 7}'),(294,'4def2d6b-48ad-4f6f-9f41-16553e74e19b','sendSampleVeterinarian','40','DELETE','{\"id\": 40, \"note\": null, \"quantity\": 12, \"sendDate\": \"2026-02-15T15:00:00.000Z\", \"statusId\": 2, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 5}',NULL),(295,'4def2d6b-48ad-4f6f-9f41-16553e74e19b','sampleAllocationVeterinarian','5','DELETE','{\"id\": 5, \"note\": null, \"quantity\": 13, \"statusId\": 2, \"imageLink\": null, \"storageId\": 3, \"sendSamples\": [{\"id\": 40, \"note\": null, \"quantity\": 12, \"sendDate\": \"2026-02-15T15:00:00.000Z\", \"statusId\": 2, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 5}], \"sampleTypeId\": 1, \"veterinarianVisitId\": 7, \"sendSampleVeterinarian\": [{\"id\": 40, \"note\": null, \"quantity\": 12, \"sendDate\": \"2026-02-15T15:00:00.000Z\", \"statusId\": 2, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 5}]}',NULL),(296,'c56a07d7-b8e9-4db4-a9df-157e615732f2','vaccineApplication','4','CREATE',NULL,'{\"id\": 4, \"date\": \"2024-12-12T15:00:00.000Z\", \"vaccineId\": 1, \"liveAnimalId\": 2, \"vaccineTypeId\": 1, \"veterinarianVisitId\": null}'),(297,'c4017a8d-f6e1-431f-a5bf-5cf08a8fa9ec','vaccineApplication','5','CREATE',NULL,'{\"id\": 5, \"date\": \"2025-12-13T15:00:00.000Z\", \"vaccineId\": 1, \"liveAnimalId\": 1, \"vaccineTypeId\": 1, \"veterinarianVisitId\": 5}'),(298,'b3057355-d0f2-4dc0-8276-281be910a1ed','physicalExam','2','UPDATE',NULL,'{\"fc\": 123, \"fr\": \"Ofegante\", \"id\": 2, \"tpc\": 123, \"score\": 9, \"weight\": 123, \"mucousId\": 2, \"tempRectal\": 123, \"generalNote\": null, \"hydrationId\": 1, \"physicalExamNote\": null, \"generalConditionId\": 1, \"bloodCollectionNote\": null, \"veterinarianVisitId\": 5}'),(299,'d5b4bf3a-e21e-4ff1-829d-54531a7d31c3','physicalExam','2','DELETE','{\"fc\": 123, \"fr\": \"Ofegante\", \"id\": 2, \"tpc\": 123, \"score\": 9, \"weight\": 123, \"mucousId\": 2, \"tempRectal\": 123, \"generalNote\": null, \"hydrationId\": 1, \"physicalExamNote\": null, \"generalConditionId\": 1, \"bloodCollectionNote\": null, \"veterinarianVisitId\": 5}',NULL),(300,'945d2b13-3a73-44e4-a566-d834d23ec28f','sampleAllocationVeterinarian','2','DELETE','{\"id\": 2, \"note\": null, \"quantity\": 13, \"statusId\": 2, \"imageLink\": null, \"storageId\": 4, \"sendSamples\": [], \"sampleTypeId\": 4, \"veterinarianVisitId\": 8, \"sendSampleVeterinarian\": []}',NULL),(301,'c7999747-932d-4de0-9332-f03dfc083b74','sendSampleVeterinarian','37','DELETE','{\"id\": 37, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-13T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}',NULL),(302,'c7999747-932d-4de0-9332-f03dfc083b74','sendSampleVeterinarian','38','DELETE','{\"id\": 38, \"note\": null, \"quantity\": 1, \"sendDate\": \"1212-12-13T15:06:28.000Z\", \"statusId\": 4, \"storageId\": 3, \"sampleAllocationVeterinarianId\": 1}',NULL),(303,'c7999747-932d-4de0-9332-f03dfc083b74','sendSampleVeterinarian','39','DELETE','{\"id\": 39, \"note\": null, \"quantity\": 1, \"sendDate\": \"1212-12-13T15:06:28.000Z\", \"statusId\": 2, \"storageId\": 5, \"sampleAllocationVeterinarianId\": 1}',NULL),(304,'c7999747-932d-4de0-9332-f03dfc083b74','sampleAllocationVeterinarian','1','DELETE','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 3, \"imageLink\": null, \"storageId\": 3, \"sendSamples\": [{\"id\": 37, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-13T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}, {\"id\": 38, \"note\": null, \"quantity\": 1, \"sendDate\": \"1212-12-13T15:06:28.000Z\", \"statusId\": 4, \"storageId\": 3, \"sampleAllocationVeterinarianId\": 1}, {\"id\": 39, \"note\": null, \"quantity\": 1, \"sendDate\": \"1212-12-13T15:06:28.000Z\", \"statusId\": 2, \"storageId\": 5, \"sampleAllocationVeterinarianId\": 1}], \"sampleTypeId\": 3, \"veterinarianVisitId\": 5, \"sendSampleVeterinarian\": [{\"id\": 37, \"note\": null, \"quantity\": 10, \"sendDate\": \"1212-12-13T15:06:28.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 1}, {\"id\": 38, \"note\": null, \"quantity\": 1, \"sendDate\": \"1212-12-13T15:06:28.000Z\", \"statusId\": 4, \"storageId\": 3, \"sampleAllocationVeterinarianId\": 1}, {\"id\": 39, \"note\": null, \"quantity\": 1, \"sendDate\": \"1212-12-13T15:06:28.000Z\", \"statusId\": 2, \"storageId\": 5, \"sampleAllocationVeterinarianId\": 1}]}',NULL),(305,'21180d19-b9dc-4650-b3b2-b369b9052d2d','sendSampleVeterinarian','41','DELETE','{\"id\": 41, \"note\": null, \"quantity\": 11, \"sendDate\": \"2026-12-12T15:00:00.000Z\", \"statusId\": 2, \"storageId\": 3, \"sampleAllocationVeterinarianId\": 7}',NULL),(306,'21180d19-b9dc-4650-b3b2-b369b9052d2d','sampleAllocationVeterinarian','7','DELETE','{\"id\": 7, \"note\": null, \"quantity\": 12, \"statusId\": 2, \"imageLink\": null, \"storageId\": 4, \"sendSamples\": [{\"id\": 41, \"note\": null, \"quantity\": 11, \"sendDate\": \"2026-12-12T15:00:00.000Z\", \"statusId\": 2, \"storageId\": 3, \"sampleAllocationVeterinarianId\": 7}], \"sampleTypeId\": 1, \"veterinarianVisitId\": 5, \"sendSampleVeterinarian\": [{\"id\": 41, \"note\": null, \"quantity\": 11, \"sendDate\": \"2026-12-12T15:00:00.000Z\", \"statusId\": 2, \"storageId\": 3, \"sampleAllocationVeterinarianId\": 7}]}',NULL),(307,'739f264f-6c20-4d74-bf01-969162223b52','vaccineApplication','2','DELETE','{\"id\": 2, \"date\": \"2025-12-14T15:00:00.000Z\", \"vaccineId\": 2, \"liveAnimalId\": 1, \"vaccineTypeId\": 1, \"veterinarianVisitId\": 7}',NULL),(308,'399cb2fb-743e-4840-bd28-29caa505a45a','vaccineApplication','3','DELETE','{\"id\": 3, \"date\": \"2025-12-13T15:00:00.000Z\", \"vaccineId\": 1, \"liveAnimalId\": 1, \"vaccineTypeId\": 1, \"veterinarianVisitId\": 5}',NULL),(309,'bea013b1-a55b-4043-93b2-c69fface0c7f','vaccineApplication','5','DELETE','{\"id\": 5, \"date\": \"2025-12-13T15:00:00.000Z\", \"vaccineId\": 1, \"liveAnimalId\": 1, \"vaccineTypeId\": 1, \"veterinarianVisitId\": 5}',NULL),(310,'26a566ab-b2cf-4e72-aaa1-5b7c83a21d9f','vaccineApplication','1','DELETE','{\"id\": 1, \"date\": \"2025-12-12T15:00:00.000Z\", \"vaccineId\": 1, \"liveAnimalId\": 2, \"vaccineTypeId\": 1, \"veterinarianVisitId\": 6}',NULL),(311,'8b78f7c2-1713-4fc9-855b-f8a7ac7dd485','bodyMeasurementVeterinarian','21','DELETE','{\"id\": 21, \"value\": 123, \"veterinarianVisitId\": 10, \"bodyMeasurementTypeId\": 1}',NULL),(312,'8b78f7c2-1713-4fc9-855b-f8a7ac7dd485','bodyMeasurementVeterinarian','22','DELETE','{\"id\": 22, \"value\": 123, \"veterinarianVisitId\": 10, \"bodyMeasurementTypeId\": 2}',NULL),(313,'8b78f7c2-1713-4fc9-855b-f8a7ac7dd485','veterinarianVisit','10','DELETE','{\"id\": 10, \"date\": \"2026-12-12T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 2, \"bodyMeasurement\": [{\"id\": 21, \"value\": 123, \"veterinarianVisitId\": 10, \"bodyMeasurementTypeId\": 1}, {\"id\": 22, \"value\": 123, \"veterinarianVisitId\": 10, \"bodyMeasurementTypeId\": 2}]}',NULL),(314,'44d0c36a-cc82-4573-a3b5-d5d1a485efd8','veterinarianVisit','8','DELETE','{\"id\": 8, \"date\": \"2025-12-15T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 2, \"bodyMeasurement\": []}',NULL),(315,'974a424f-fe1d-46f8-bc47-d1725f1e1af2','veterinarianVisit','5','DELETE','{\"id\": 5, \"date\": \"2025-12-13T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 2, \"bodyMeasurement\": []}',NULL),(316,'21be68f0-92d5-4a0e-a589-f697801159cd','veterinarianVisit','1','DELETE','{\"id\": 1, \"date\": \"2025-12-12T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 2, \"bodyMeasurement\": []}',NULL),(317,'663875c5-64fb-47da-b47e-72e34bb305a0','veterinarianVisit','6','DELETE','{\"id\": 6, \"date\": \"2025-12-12T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 2, \"veterinarianId\": 2, \"bodyMeasurement\": []}',NULL),(318,'872500c8-9db9-44e0-ab10-1c7f1d6a2cdd','bodyMeasurementVeterinarian','23','DELETE','{\"id\": 23, \"value\": 123, \"veterinarianVisitId\": 7, \"bodyMeasurementTypeId\": 1}',NULL),(319,'872500c8-9db9-44e0-ab10-1c7f1d6a2cdd','bodyMeasurementVeterinarian','24','DELETE','{\"id\": 24, \"value\": 123, \"veterinarianVisitId\": 7, \"bodyMeasurementTypeId\": 2}',NULL),(320,'872500c8-9db9-44e0-ab10-1c7f1d6a2cdd','veterinarianVisit','7','DELETE','{\"id\": 7, \"date\": \"2025-12-12T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1, \"bodyMeasurement\": [{\"id\": 23, \"value\": 123, \"veterinarianVisitId\": 7, \"bodyMeasurementTypeId\": 1}, {\"id\": 24, \"value\": 123, \"veterinarianVisitId\": 7, \"bodyMeasurementTypeId\": 2}]}',NULL),(321,'20813f0f-7908-4b5e-99a3-bcfa1a672863','bodyMeasurementVeterinarian','16','DELETE','{\"id\": 16, \"value\": 123, \"veterinarianVisitId\": 9, \"bodyMeasurementTypeId\": 1}',NULL),(322,'20813f0f-7908-4b5e-99a3-bcfa1a672863','veterinarianVisit','9','DELETE','{\"id\": 9, \"date\": \"2025-09-16T12:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 2, \"bodyMeasurement\": [{\"id\": 16, \"value\": 123, \"veterinarianVisitId\": 9, \"bodyMeasurementTypeId\": 1}]}',NULL),(323,'2df69237-f587-4295-b86f-c468e5d769ee','veterinarianVisit','11','CREATE',NULL,'{\"id\": 11, \"date\": \"2025-12-12T12:00:00.000Z\", \"note\": null, \"liveAnimalId\": 1, \"animalPicture\": null, \"veterinarianId\": 2}'),(324,'10d31eb8-c6ea-4cb4-bef0-23b218833bf1','examResult','1','CREATE',NULL,'{\"id\": 1, \"alt\": 123, \"hcm\": 123, \"vcm\": 123, \"chcm\": 123, \"urea\": 123, \"bandCells\": 123, \"basophils\": 123, \"monocytes\": 123, \"platelets\": 123, \"creatinine\": 123, \"hematocrit\": 123, \"hemoglobin\": 123, \"eosinophils\": 123, \"lymphocytes\": 123, \"erythrocytes\": 123, \"totalProtein\": 123, \"segmentedCells\": 123, \"whiteBloodCells\": 123, \"alkalinePhosphatase\": 123, \"basophilsPercentage\": 123, \"monocytesPercentage\": 123, \"veterinarianVisitId\": 11, \"eosinophilsPercentage\": 123, \"lymphocytesPercentage\": 123, \"segmentedCellsPercentage\": 123}'),(325,'6c69c0ea-204b-46d8-bb75-3d8771d2df96','examResult','2','CREATE',NULL,'{\"id\": 2, \"alt\": 123, \"hcm\": 123, \"vcm\": 123, \"chcm\": 123, \"urea\": 123, \"bandCells\": 123, \"basophils\": 123, \"monocytes\": 123, \"platelets\": 123, \"creatinine\": 123, \"hematocrit\": 123, \"hemoglobin\": 123, \"eosinophils\": 123, \"lymphocytes\": 123, \"erythrocytes\": 123, \"totalProtein\": 123, \"segmentedCells\": 123, \"whiteBloodCells\": 123, \"alkalinePhosphatase\": 123, \"basophilsPercentage\": 123, \"monocytesPercentage\": 123, \"veterinarianVisitId\": 11, \"eosinophilsPercentage\": 123, \"lymphocytesPercentage\": 123, \"segmentedCellsPercentage\": 123}'),(326,'285fe6f1-094f-4364-826d-637e9ac5ca8f','examResult','2','DELETE','{\"id\": 2, \"alt\": 123, \"hcm\": 123, \"vcm\": 123, \"chcm\": 123, \"urea\": 123, \"bandCells\": 123, \"basophils\": 123, \"monocytes\": 123, \"platelets\": 123, \"creatinine\": 123, \"hematocrit\": 123, \"hemoglobin\": 123, \"eosinophils\": 123, \"lymphocytes\": 123, \"erythrocytes\": 123, \"totalProtein\": 123, \"segmentedCells\": 123, \"whiteBloodCells\": 123, \"alkalinePhosphatase\": 123, \"basophilsPercentage\": 123, \"monocytesPercentage\": 123, \"veterinarianVisitId\": 11, \"eosinophilsPercentage\": 123, \"lymphocytesPercentage\": 123, \"segmentedCellsPercentage\": 123}',NULL),(327,'ba12f8f3-b3e9-4183-afe3-a0e7ee9b35b3','vaccineApplication','6','CREATE',NULL,'{\"id\": 6, \"date\": \"2025-12-12T15:00:00.000Z\", \"vaccineId\": 1, \"liveAnimalId\": 1, \"vaccineTypeId\": 1, \"veterinarianVisitId\": 11}'),(328,'026c710a-cbca-45c0-a042-ff4f94c2b2ac','vaccineApplication','6','UPDATE','{\"id\": 6, \"date\": \"2025-12-12T15:00:00.000Z\", \"vaccineId\": 1, \"liveAnimalId\": 1, \"vaccineTypeId\": 1, \"veterinarianVisitId\": 11}','{\"id\": 6, \"date\": \"2025-12-12T15:00:00.000Z\", \"vaccineId\": 1, \"liveAnimalId\": 2, \"vaccineTypeId\": 1, \"veterinarianVisitId\": null}'),(329,'e2a6bb41-fdd8-4d24-a7e9-3fcec458d12a','vaccineApplication','7','CREATE',NULL,'{\"id\": 7, \"date\": \"2025-12-12T15:00:00.000Z\", \"vaccineId\": 1, \"liveAnimalId\": 1, \"vaccineTypeId\": 1, \"veterinarianVisitId\": 11}'),(330,'12196afd-b11c-4e98-b924-dc033a183b2e','vaccineApplication','7','UPDATE','{\"id\": 7, \"date\": \"2025-12-12T15:00:00.000Z\", \"vaccineId\": 1, \"liveAnimalId\": 1, \"vaccineTypeId\": 1, \"veterinarianVisitId\": 11}','{\"id\": 7, \"date\": \"2025-12-12T15:00:00.000Z\", \"vaccineId\": 2, \"liveAnimalId\": 1, \"vaccineTypeId\": 1, \"veterinarianVisitId\": 11}'),(331,'41c72cee-a5ab-4398-876f-c9d19a726774','vaccineApplication','8','CREATE',NULL,'{\"id\": 8, \"date\": \"2025-12-12T15:00:00.000Z\", \"vaccineId\": 1, \"liveAnimalId\": 1, \"vaccineTypeId\": 1, \"veterinarianVisitId\": 11}'),(332,'0b6321ca-1dea-4411-a4a4-f57aa32779bf','sampleAllocationVeterinarian','8','CREATE',NULL,'{\"id\": 8, \"note\": null, \"quantity\": 12, \"statusId\": 2, \"imageLink\": null, \"storageId\": 4, \"sampleTypeId\": 3, \"veterinarianVisitId\": 11}'),(333,'0b6321ca-1dea-4411-a4a4-f57aa32779bf','sendSampleVeterinarian','42','CREATE',NULL,'{\"id\": 42, \"note\": null, \"quantity\": 3, \"sendDate\": \"2025-12-21T15:00:00.000Z\", \"statusId\": 3, \"storageId\": 1, \"sampleAllocationVeterinarianId\": 8}'),(334,'ac94ec39-6f9d-4525-8648-082a0f7c6335','sampleAllocationVeterinarian','9','CREATE',NULL,'{\"id\": 9, \"note\": null, \"quantity\": 1, \"statusId\": 4, \"imageLink\": null, \"storageId\": 5, \"sampleTypeId\": 5, \"veterinarianVisitId\": 11}'),(335,'af70a5a0-cb53-4e40-a756-fa7a8cf6e090','veterinarianVisit','12','CREATE',NULL,'{\"id\": 12, \"date\": \"2025-12-14T12:00:00.000Z\", \"note\": null, \"liveAnimalId\": 2, \"animalPicture\": null, \"veterinarianId\": 2}'),(336,'af70a5a0-cb53-4e40-a756-fa7a8cf6e090','bodyMeasurementVeterinarian','25','CREATE',NULL,'{\"id\": 25, \"value\": 123, \"veterinarianVisitId\": 12, \"bodyMeasurementTypeId\": 1}'),(337,'e0f297d9-d693-4833-88c6-df877cd8bc96','physicalExam','3','CREATE',NULL,'{\"fc\": 123, \"fr\": \"Ofegante\", \"id\": 3, \"tpc\": 123, \"score\": 2, \"weight\": 123, \"mucousId\": 2, \"tempRectal\": 123, \"generalNote\": null, \"hydrationId\": 1, \"physicalExamNote\": null, \"generalConditionId\": 1, \"bloodCollectionNote\": null, \"veterinarianVisitId\": 12}'),(338,'2c30f44c-43f4-4d85-a84c-cba18a5bdc6f','examResult','3','CREATE',NULL,'{\"id\": 3, \"alt\": 123, \"hcm\": 123, \"vcm\": 213, \"chcm\": 123, \"urea\": 123, \"bandCells\": 213, \"basophils\": 123, \"monocytes\": 123, \"platelets\": 123, \"creatinine\": 123, \"hematocrit\": 123, \"hemoglobin\": 123, \"eosinophils\": 123, \"lymphocytes\": 123, \"erythrocytes\": 123, \"totalProtein\": 123, \"segmentedCells\": 123, \"whiteBloodCells\": 123, \"alkalinePhosphatase\": 123, \"basophilsPercentage\": 123, \"monocytesPercentage\": 123, \"veterinarianVisitId\": 12, \"eosinophilsPercentage\": 123, \"lymphocytesPercentage\": 123, \"segmentedCellsPercentage\": 123}'),(339,'c19a3ceb-e2c9-489f-a841-6e2fdd9c915b','sorologyAnalysis','1','CREATE',NULL,'{\"id\": 1, \"result\": 123, \"resultTypeId\": 1, \"sorologyTestId\": 1, \"sorologyAgentId\": 1, \"interpretationId\": 2, \"cuttingPointValue\": \"1:50\", \"cuttingPointSymbol\": \"≥\", \"veterinarianVisitId\": 12}'),(340,'50e68a2c-6f5e-45ea-9db5-4e560b07dff7','ectoparasiteAnalysisVeterinarian','1','CREATE',NULL,'{\"id\": 1, \"note\": null, \"eggQuantity\": 1, \"maleQuantity\": 1, \"nymphQuantity\": 1, \"femaleQuantity\": 1, \"larvaeQuantity\": 1, \"ectoparasiteGenusId\": 1, \"veterinarianVisitId\": 12, \"ectoparasiteSpecieId\": 1, \"ectoparasiteSubSpecieId\": 1}'),(341,'08d9dc61-68a5-4773-885b-0cb1a864b979','stoolAnalysis','1','CREATE',NULL,'{\"id\": 1, \"note\": null, \"weight\": 1, \"veterinarianVisitId\": 12, \"processingTechnologyId\": 1}'),(342,'fa025591-f1df-4cb4-9470-cc451162a5d2','eggCystAnalysis','1','CREATE',NULL,'{\"id\": 1, \"note\": null, \"quantity\": 1, \"eggCystSpecieId\": 1, \"stoolAnalysisId\": 1}'),(343,'13779546-4be1-48d9-b4d9-437decaf22cb','molecularAnalysis','1','CREATE',NULL,'{\"id\": 1, \"note\": \"123\", \"eggCystSpecieId\": 1, \"stoolAnalysisId\": 1}'),(344,'61ed1753-3222-4b57-b3b9-1b2861e90450','vaccineApplication','4','DELETE','{\"id\": 4, \"date\": \"2024-12-12T15:00:00.000Z\", \"vaccineId\": 1, \"liveAnimalId\": 2, \"vaccineTypeId\": 1, \"veterinarianVisitId\": null}',NULL),(345,'e7e6e907-6603-4bc5-a977-50ab2505f010','stoolAnalysis','2','CREATE',NULL,'{\"id\": 2, \"note\": null, \"weight\": 123, \"veterinarianVisitId\": 11, \"processingTechnologyId\": 1}'),(346,'783e5dcf-4f89-4d22-9ff9-e382f06c901a','eggCystAnalysis','2','CREATE',NULL,'{\"id\": 2, \"note\": null, \"quantity\": 123, \"eggCystSpecieId\": 1, \"stoolAnalysisId\": 2}'),(347,'f21e1b91-33db-4ea0-8d57-464f5334f536','gpsTracking','1','CREATE',NULL,'{\"id\": 1, \"note\": null, \"endDate\": null, \"startDate\": \"2025-12-12T03:00:00.000Z\", \"livingArea\": 123, \"liveAnimalId\": 1, \"monitoredDays\": 123, \"locationPoints\": 123, \"trackingDeviceId\": 1, \"monitoringMethodId\": 1, \"rawSpreadsheetLink\": null, \"editedSpreadsheetLink\": null, \"rawSpreadsheetUpdateDate\": null, \"editedSpreadsheetUpdateDate\": null}'),(348,'ce7d7543-54de-4f72-9db9-0c1362f1b395','gpsTracking','1','UPDATE',NULL,'{\"id\": 1, \"note\": null, \"endDate\": null, \"startDate\": \"2025-12-12T03:00:00.000Z\", \"livingArea\": 123, \"liveAnimalId\": 1, \"monitoredDays\": 123, \"locationPoints\": 123, \"trackingDeviceId\": 1, \"monitoringMethodId\": 1, \"rawSpreadsheetLink\": \"https://tailwindcss.com/docs/responsive-design\", \"editedSpreadsheetLink\": null, \"rawSpreadsheetUpdateDate\": null, \"editedSpreadsheetUpdateDate\": null}'),(349,'57898072-992f-4571-bd6a-5ccbb16b81d9','veterinarianVisit','11','UPDATE','{\"id\": 11, \"date\": \"2025-12-12T12:00:00.000Z\", \"note\": null, \"liveAnimalId\": 1, \"animalPicture\": null, \"veterinarianId\": 2, \"bodyMeasurement\": []}','{\"id\": 11, \"date\": \"2025-12-12T12:00:00.000Z\", \"note\": null, \"liveAnimalId\": 1, \"animalPicture\": \"https://github.com/nicolasfouv/sistema-resgistro-analise-integrada\", \"veterinarianId\": 2}'),(350,'864e769a-27d8-4411-8740-22028d6a192e','tutorInterview','1','CREATE',NULL,'{\"id\": 1, \"date\": \"2026-12-12T00:00:00.000Z\", \"tutorId\": 1}'),(351,'316ffda5-dbf3-4a37-b6f3-6c527820d954','tutorInterview','1','UPDATE',NULL,'{\"id\": 1, \"date\": \"2026-12-12T00:00:00.000Z\", \"tutorId\": 1}'),(352,'dcd8b5c8-d00d-480a-97a7-872695cec3eb','tutorInterview','1','UPDATE',NULL,'{\"id\": 1, \"date\": \"2026-12-12T00:00:00.000Z\", \"tutorId\": 1}'),(353,'3174d9f0-afb0-4f14-831b-6f52715b2fb5','tutorInterview','1','UPDATE',NULL,'{\"id\": 1, \"date\": \"2026-12-12T00:00:00.000Z\", \"tutorId\": 1}'),(354,'b6bda64c-b15d-4377-a52b-650755d49e8b','tutorInterview','1','UPDATE',NULL,'{\"id\": 1, \"date\": \"2026-12-12T00:00:00.000Z\", \"tutorId\": 1}'),(361,'3c15b7d3-9d6b-4c8a-82c4-35c6f7bd7519','tutorInterview','1','UPDATE',NULL,'{\"id\": 1, \"date\": \"2026-12-12T00:00:00.000Z\", \"tutorId\": 1}'),(362,'a68a5751-b686-445f-bca3-13c66dbf3b65','tutorInterview','1','UPDATE',NULL,'{\"id\": 1, \"date\": \"2026-12-12T00:00:00.000Z\", \"tutorId\": 1}'),(365,'e09647fc-267c-4184-9445-8e23abe6e0e4','tutorInterview','1','DELETE','{\"id\": 1, \"date\": \"2026-12-12T00:00:00.000Z\", \"tutorId\": 1}',NULL),(366,'f4cfc609-6941-4ab3-bc67-41817741d4e1','tutorInterview','2','CREATE',NULL,'{\"id\": 2, \"date\": \"2026-12-12T00:00:00.000Z\", \"tutorId\": 1}'),(368,'f3094052-27ee-4e44-a976-fe079b248ff1','liveAnimal','3','CREATE',NULL,'{\"id\": 3, \"name\": \"Animal Teste 3\", \"active\": true, \"cardLink\": null, \"genderId\": 1, \"specieId\": 2, \"birthDate\": \"2024-04-01T12:00:00.000Z\", \"animalPicture\": null}'),(369,'238d1139-044b-492e-b639-1416ba8a1e40','liveAnimal','3','UPDATE','{\"id\": 3, \"name\": \"Animal Teste 3\", \"active\": true, \"cardLink\": null, \"genderId\": 1, \"specieId\": 2, \"birthDate\": \"2024-04-01T12:00:00.000Z\", \"animalPicture\": null}','{\"id\": 3, \"name\": \"Animal Teste 3\", \"active\": true, \"cardLink\": null, \"genderId\": 1, \"specieId\": 2, \"birthDate\": \"2024-04-02T12:00:00.000Z\", \"animalPicture\": null}'),(370,'c20c9c93-e17b-4ccf-a38a-80a4d61d8210','castration','1','CREATE',NULL,'{\"id\": 1, \"date\": \"2024-12-12T15:00:00.000Z\", \"note\": null, \"liveAnimalId\": 1, \"veterinarianVisitId\": null}'),(371,'3052ec0c-955c-4b16-8267-993e9de3c58a','castration','1','UPDATE','{\"id\": 1, \"date\": \"2024-12-12T15:00:00.000Z\", \"note\": null, \"liveAnimalId\": 1, \"veterinarianVisitId\": null}','{\"id\": 1, \"date\": \"2025-12-12T15:00:00.000Z\", \"note\": null, \"liveAnimalId\": 1, \"veterinarianVisitId\": 11}'),(372,'f5b3a3d1-b57b-4126-937a-4f85379165f0','castration','1','DELETE','{\"id\": 1, \"date\": \"2025-12-12T15:00:00.000Z\", \"note\": null, \"liveAnimalId\": 1, \"veterinarianVisitId\": 11}',NULL),(373,'fb5e9b14-757b-4a16-bb19-fee94ccf38e1','castration','2','CREATE',NULL,'{\"id\": 2, \"date\": \"2025-12-12T15:00:00.000Z\", \"note\": null, \"liveAnimalId\": 1, \"veterinarianVisitId\": 11}'),(374,'c9889762-f2ad-4ffe-8a51-515dbfbc0efe','liveAnimal','3','UPDATE','{\"id\": 3, \"name\": \"Animal Teste 3\", \"active\": true, \"cardLink\": null, \"genderId\": 1, \"specieId\": 2, \"birthDate\": \"2024-04-02T12:00:00.000Z\", \"animalPicture\": null}','{\"id\": 3, \"name\": \"Animal Teste 3\", \"active\": false, \"cardLink\": null, \"genderId\": 1, \"specieId\": 2, \"birthDate\": \"2024-04-02T12:00:00.000Z\", \"animalPicture\": null}'),(375,'7e88c471-4414-446b-939f-717776eab1dc','liveAnimal','3','UPDATE','{\"id\": 3, \"name\": \"Animal Teste 3\", \"active\": false, \"cardLink\": null, \"genderId\": 1, \"specieId\": 2, \"birthDate\": \"2024-04-02T12:00:00.000Z\", \"animalPicture\": null}','{\"id\": 3, \"name\": \"Animal Teste 3\", \"active\": true, \"cardLink\": null, \"genderId\": 1, \"specieId\": 2, \"birthDate\": \"2024-04-02T12:00:00.000Z\", \"animalPicture\": null}'),(376,'87f8a485-a7af-47a2-ac77-a80d8ff694aa','castration','3','CREATE',NULL,'{\"id\": 3, \"date\": \"2025-12-14T15:00:00.000Z\", \"note\": null, \"liveAnimalId\": 2, \"veterinarianVisitId\": 12}'),(377,'fa6f90c9-26a4-4011-872f-f1e7f1706c1d','castration','3','DELETE','{\"id\": 3, \"date\": \"2025-12-14T15:00:00.000Z\", \"note\": null, \"liveAnimalId\": 2, \"veterinarianVisitId\": 12}',NULL),(378,'2af6458d-f558-409a-9b0f-d8149e3d16fd','tutorInterview','2','DELETE','{\"id\": 2, \"date\": \"2026-12-12T00:00:00.000Z\", \"tutorId\": 1}',NULL),(379,'ba84e358-0a47-444b-97fe-4ada57f82b6a','tutorInterview','6','CREATE',NULL,'{\"id\": 6, \"date\": \"2026-12-12T00:00:00.000Z\", \"tutorId\": 1}'),(380,'1a996a49-5cb2-473e-ac8a-80bc7e158b83','tutorInterview','6','UPDATE',NULL,'{\"id\": 6, \"date\": \"2026-12-12T00:00:00.000Z\", \"tutorId\": 1}'),(381,'248e9268-9a55-4664-a13e-9e9200e94ffc','tutorInterview','6','UPDATE',NULL,'{\"id\": 6, \"date\": \"2026-12-12T00:00:00.000Z\", \"tutorId\": 1}'),(382,'477687e1-a187-45d5-8f73-fb2f764a8ca9','veterinarianVisit','12','UPDATE','{\"id\": 12, \"date\": \"2025-12-14T12:00:00.000Z\", \"note\": null, \"liveAnimalId\": 2, \"animalPicture\": null, \"veterinarianId\": 2, \"bodyMeasurement\": [{\"id\": 25, \"value\": 123, \"veterinarianVisitId\": 12, \"bodyMeasurementTypeId\": 1}]}','{\"id\": 12, \"date\": \"2025-12-14T12:00:00.000Z\", \"note\": null, \"liveAnimalId\": 2, \"animalPicture\": null, \"veterinarianId\": 2}'),(383,'477687e1-a187-45d5-8f73-fb2f764a8ca9','bodyMeasurementVeterinarian','25','DELETE','{\"id\": 25, \"value\": 123, \"veterinarianVisitId\": 12, \"bodyMeasurementTypeId\": 1}',NULL),(384,'477687e1-a187-45d5-8f73-fb2f764a8ca9','bodyMeasurementVeterinarian','26','CREATE',NULL,'{\"id\": 26, \"value\": 2, \"veterinarianVisitId\": 12, \"bodyMeasurementTypeId\": 1}'),(385,'83a0cad0-7708-4b42-a1e7-1861bcdb249a','deadAnimal','1','CREATE',NULL,'{\"id\": 1, \"code\": \"LEIMA 01\", \"note\": null, \"specieId\": 2, \"imageLink\": null, \"collectionDate\": \"2026-12-12T12:00:00.000Z\", \"deadAnimalGroupId\": 1, \"collectionLatitude\": 123, \"deadAnimalOriginId\": 2, \"deadAnimalStatusId\": 2, \"collectionLongitude\": 123, \"collectionResponsibleId\": 3}'),(386,'cb37dac7-ae9e-48fb-a74d-57ec348b1300','necropsy','1','CREATE',NULL,'{\"id\": 1, \"note\": null, \"ageId\": 2, \"weight\": 123, \"tutorId\": null, \"deadAnimalId\": 1, \"performedDate\": \"2026-12-13T12:00:00.000Z\", \"bodyConditionId\": 2, \"identifiedGenderId\": 1, \"clinicalConditionId\": 1, \"reproductiveConditionId\": 1}'),(387,'7a0b3490-6284-4bcd-8488-56066efd0121','necropsy','1','UPDATE','{\"id\": 1, \"note\": null, \"ageId\": 2, \"weight\": 123, \"tutorId\": null, \"deadAnimalId\": 1, \"performedDate\": \"2026-12-13T12:00:00.000Z\", \"bodyConditionId\": 2, \"identifiedGenderId\": 1, \"clinicalConditionId\": 1, \"bodyMeasurementNecropsy\": [], \"reproductiveConditionId\": 1}','{\"id\": 1, \"note\": null, \"ageId\": 2, \"weight\": 123, \"tutorId\": null, \"deadAnimalId\": 1, \"performedDate\": \"2026-12-13T12:00:00.000Z\", \"bodyConditionId\": 2, \"identifiedGenderId\": 1, \"clinicalConditionId\": 1, \"reproductiveConditionId\": 1}'),(388,'7fb46dd1-9432-4004-be8a-cc0696b58557','necropsy','1','UPDATE','{\"id\": 1, \"note\": null, \"ageId\": 2, \"weight\": 123, \"tutorId\": null, \"deadAnimalId\": 1, \"performedDate\": \"2026-12-13T12:00:00.000Z\", \"bodyConditionId\": 2, \"identifiedGenderId\": 1, \"clinicalConditionId\": 1, \"bodyMeasurementNecropsy\": [{\"id\": 1, \"value\": 3, \"necropsyId\": 1, \"bodyMeasurementTypeId\": 1}], \"reproductiveConditionId\": 1}','{\"id\": 1, \"note\": null, \"ageId\": 2, \"weight\": 123, \"tutorId\": null, \"deadAnimalId\": 1, \"performedDate\": \"2026-12-13T12:00:00.000Z\", \"bodyConditionId\": 2, \"identifiedGenderId\": 1, \"clinicalConditionId\": 1, \"reproductiveConditionId\": 1}'),(389,'ff04f677-2bae-4520-9f27-c8da99f042cd','necropsy','1','UPDATE','{\"id\": 1, \"note\": null, \"ageId\": 2, \"weight\": 123, \"tutorId\": null, \"deadAnimalId\": 1, \"performedDate\": \"2026-12-13T12:00:00.000Z\", \"bodyConditionId\": 2, \"identifiedGenderId\": 1, \"clinicalConditionId\": 1, \"bodyMeasurementNecropsy\": [{\"id\": 2, \"value\": 3, \"necropsyId\": 1, \"bodyMeasurementTypeId\": 1}], \"reproductiveConditionId\": 1}','{\"id\": 1, \"note\": null, \"ageId\": 2, \"weight\": 123, \"tutorId\": null, \"deadAnimalId\": 1, \"performedDate\": \"2026-12-13T12:00:00.000Z\", \"bodyConditionId\": 2, \"identifiedGenderId\": 1, \"clinicalConditionId\": 1, \"reproductiveConditionId\": 1}'),(390,'70260461-0eb4-434d-8dda-3ee9959b7ee9','necropsy','1','UPDATE','{\"id\": 1, \"note\": null, \"ageId\": 2, \"weight\": 123, \"tutorId\": null, \"deadAnimalId\": 1, \"performedDate\": \"2026-12-13T12:00:00.000Z\", \"bodyConditionId\": 2, \"identifiedGenderId\": 1, \"clinicalConditionId\": 1, \"bodyMeasurementNecropsy\": [{\"id\": 3, \"value\": 3, \"necropsyId\": 1, \"bodyMeasurementTypeId\": 1}], \"reproductiveConditionId\": 1}','{\"id\": 1, \"note\": null, \"ageId\": 2, \"weight\": 123, \"tutorId\": 1, \"deadAnimalId\": 1, \"performedDate\": \"2026-12-13T12:00:00.000Z\", \"bodyConditionId\": 2, \"identifiedGenderId\": 1, \"clinicalConditionId\": 1, \"reproductiveConditionId\": 1}'),(391,'aaa01eb9-06bf-4fb3-bb62-73b3ebc4028d','necropsy','1','UPDATE','{\"id\": 1, \"note\": null, \"ageId\": 2, \"weight\": 123, \"tutorId\": 1, \"deadAnimalId\": 1, \"performedDate\": \"2026-12-13T12:00:00.000Z\", \"bodyConditionId\": 2, \"identifiedGenderId\": 1, \"clinicalConditionId\": 1, \"bodyMeasurementNecropsy\": [{\"id\": 4, \"value\": 3, \"necropsyId\": 1, \"bodyMeasurementTypeId\": 1}], \"reproductiveConditionId\": 1}','{\"id\": 1, \"note\": null, \"ageId\": 2, \"weight\": 123, \"tutorId\": null, \"deadAnimalId\": 1, \"performedDate\": \"2026-12-13T12:00:00.000Z\", \"bodyConditionId\": 2, \"identifiedGenderId\": 1, \"clinicalConditionId\": 1, \"reproductiveConditionId\": 1}'),(392,'16209039-514e-4f37-886c-7e5588f26007','sampleAllocationNecropsy','1','CREATE',NULL,'{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 1, \"imageLink\": null, \"storageId\": 4, \"necropsyId\": 1, \"sampleTypeId\": 1}'),(393,'d9a2e6a1-95fb-4aa0-bdd4-b60dd9786f60','liveAnimal','1','UPDATE','{\"id\": 1, \"name\": \"Animal Teste 1\", \"active\": true, \"tutorId\": 1, \"cardLink\": null, \"genderId\": 1, \"specieId\": 1, \"birthDate\": \"2024-02-01T00:00:00.000Z\", \"animalPicture\": null}','{\"id\": 1, \"name\": \"Animal Teste 1\", \"active\": true, \"tutorId\": 1, \"cardLink\": null, \"genderId\": 1, \"specieId\": 1, \"birthDate\": \"2024-02-01T12:00:00.000Z\", \"animalPicture\": \"https://mail.google.com/mail/u/3/#inbox\"}'),(394,'fa779762-5723-49d4-8e61-2040fff456cb','tutorInterview','6','UPDATE',NULL,'{\"id\": 6, \"date\": \"2026-12-12T00:00:00.000Z\", \"tutorId\": 1}'),(395,'78ebca2d-400f-4bae-b110-aeba9b6ecade','tutorInterview','6','UPDATE',NULL,'{\"id\": 6, \"date\": \"2026-12-12T00:00:00.000Z\", \"tutorId\": 1}'),(396,'eaf4479c-80fb-4ff0-bf02-550d4c54c8f6','sampleAllocationNecropsy','1','UPDATE','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 1, \"imageLink\": null, \"storageId\": 4, \"necropsyId\": 1, \"sampleTypeId\": 1, \"sendSampleNecropsy\": []}','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 1, \"imageLink\": null, \"storageId\": 4, \"necropsyId\": 1, \"sampleTypeId\": 1}'),(397,'40dbdeed-8218-4f93-85f7-d304124ed304','sampleAllocationNecropsy','1','UPDATE','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 1, \"imageLink\": null, \"storageId\": 4, \"necropsyId\": 1, \"sampleTypeId\": 1, \"sendSampleNecropsy\": [{\"id\": 1, \"note\": null, \"quantity\": 12, \"sendDate\": \"2027-12-12T15:00:00.000Z\", \"statusId\": 1, \"storageId\": 3, \"sampleAllocationNecropsyId\": 1}]}','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 1, \"imageLink\": null, \"storageId\": 4, \"necropsyId\": 1, \"sampleTypeId\": 1}'),(398,'b0509cbc-4655-43a0-ab9c-a5534fc6cf72','sampleAllocationNecropsy','1','UPDATE','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 1, \"imageLink\": null, \"storageId\": 4, \"necropsyId\": 1, \"sampleTypeId\": 1, \"sendSampleNecropsy\": [{\"id\": 2, \"note\": \"1231231\", \"quantity\": 12, \"sendDate\": \"2027-12-12T15:00:00.000Z\", \"statusId\": 1, \"storageId\": 3, \"sampleAllocationNecropsyId\": 1}]}','{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 1, \"imageLink\": null, \"storageId\": 4, \"necropsyId\": 1, \"sampleTypeId\": 1}'),(399,'818ddbee-d2ac-4ed8-80cc-59f2ba9ffcbb','tutorInterview','6','DELETE','{\"id\": 6, \"date\": \"2026-12-12T00:00:00.000Z\", \"tutorId\": 1}',NULL),(400,'be143cd7-86d3-4064-ab5f-260996a3ff7d','tutorInterview','7','CREATE',NULL,'{\"id\": 7, \"date\": \"2026-12-12T00:00:00.000Z\", \"tutorId\": 1}'),(401,'b76711c3-5bbc-41ff-9703-22e844f4833a','tutorInterview','7','UPDATE',NULL,'{\"id\": 7, \"date\": \"2026-12-12T00:00:00.000Z\", \"tutorId\": 1}'),(402,'0729eff2-35a5-4704-a185-68095f3ce86c','tutorInterview','7','DELETE','{\"id\": 7, \"date\": \"2026-12-12T00:00:00.000Z\", \"tutorId\": 1}',NULL),(403,'6e7edb1b-9b0d-43da-a014-5eae968e074e','tutorInterview','8','CREATE',NULL,'{\"id\": 8, \"date\": \"2026-12-12T00:00:00.000Z\", \"tutorId\": 1}'),(404,'016aee72-ba42-4c71-9833-2d25358447fd','tutorInterview','8','UPDATE',NULL,'{\"id\": 8, \"date\": \"2026-12-12T00:00:00.000Z\", \"tutorId\": 1}'),(405,'9cf0c669-257a-4d18-8b63-577591b9c968','vaccine','3','CREATE',NULL,'{\"id\": 3, \"name\": \"Vacina 01\"}'),(406,'8f0f7545-499b-46cc-8b54-667efdb9d63a','specie','2','UPDATE','{\"id\": 2, \"name\": \"Espécie Teste 1\"}','{\"id\": 2, \"name\": \"Espécie 01\"}'),(407,'87aac496-06d4-4cb0-a9d2-7a7e04843bd9','specie','1','UPDATE','{\"id\": 1, \"name\": \"Espécie Teste 2\"}','{\"id\": 1, \"name\": \"Espécie 02\"}'),(408,'a3a7cf7b-9392-41ab-8bd5-14efb59292b6','veterinarian','2','UPDATE','{\"id\": 2, \"name\": \"Veterinário Teste 1\"}','{\"id\": 2, \"name\": \"Veterinário 01\"}'),(409,'f8c75d69-0e92-41a9-99da-0df4b9c0adcf','veterinarian','1','UPDATE','{\"id\": 1, \"name\": \"Veterinário Teste 2\"}','{\"id\": 1, \"name\": \"Veterinário 02\"}'),(410,'62ef141a-4fc1-4416-9dde-bade267227c5','processingTechnology','1','UPDATE','{\"id\": 1, \"name\": \"TectTeste1\"}','{\"id\": 1, \"name\": \"TecPro 01\"}'),(411,'2783b98c-4f48-455d-8ce9-49ab0a9dba16','eggCystSpecie','1','UPDATE','{\"id\": 1, \"name\": \"EspTeste1\"}','{\"id\": 1, \"name\": \"TecPro 02\"}'),(412,'be6a601b-2159-4650-888b-855b43d35424','monitoringMethod','1','UPDATE','{\"id\": 1, \"description\": \"MetodoRastreioTeste1\"}','{\"id\": 1, \"description\": \"MetodoRastreio 01\"}'),(413,'9835bcc5-a052-40c8-939f-74fb4f3919a9','bodyMeasurementTypeVeterinarian','1','UPDATE','{\"id\": 1, \"unit\": \"cm\", \"description\": \"Tipo Medida Corporal 1\"}','{\"id\": 1, \"unit\": \"cm\", \"description\": \"Tipo Medida Corporal 01\"}'),(414,'046d1565-4e2e-4c02-8c7a-ed0b9c799d82','monitoringMethod','1','UPDATE','{\"id\": 1, \"description\": \"MetodoRastreio 01\"}','{\"id\": 1, \"description\": \"Método 01\"}'),(415,'a2e8da81-429b-4e3f-bf7c-1676181f44d6','bodyMeasurementTypeVeterinarian','1','UPDATE','{\"id\": 1, \"unit\": \"cm\", \"description\": \"Tipo Medida Corporal 01\"}','{\"id\": 1, \"unit\": \"cm\", \"description\": \"Tipo 01\"}'),(416,'7f7aaae3-4570-4c20-81c7-e07dea94e9c6','bodyMeasurementTypeVeterinarian','2','UPDATE','{\"id\": 2, \"unit\": \"m\", \"description\": \"Tipo Medida Corporal 2\"}','{\"id\": 2, \"unit\": \"m\", \"description\": \"Tipo 02\"}'),(417,'5cfe26e2-b71c-4e8d-a4dc-0041b37e65a8','trackingDevice','1','UPDATE','{\"id\": 1, \"brand\": \"MarcaTeste1\", \"serialNumber\": \"NSerie1\"}','{\"id\": 1, \"brand\": \"Marca 01\", \"serialNumber\": \"NSerie 01\"}'),(418,'ad750b00-43f3-4fbd-9a6e-1f6dd8db2d83','ectoparasiteGenus','1','UPDATE','{\"id\": 1, \"name\": \"GenTeste\"}','{\"id\": 1, \"name\": \"Gen 01\"}'),(419,'db7ba675-da5b-4aea-ba92-403504917cc3','ectoparasiteSpecie','1','UPDATE','{\"id\": 1, \"name\": \"EspTeste\"}','{\"id\": 1, \"name\": \"Esp 01\"}');
/*!40000 ALTER TABLE `changelog` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `dispositivo_rastreio`
--

DROP TABLE IF EXISTS `dispositivo_rastreio`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `dispositivo_rastreio` (
  `id` int NOT NULL AUTO_INCREMENT,
  `marca` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `numero_serie` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dispositivo_rastreio`
--

LOCK TABLES `dispositivo_rastreio` WRITE;
/*!40000 ALTER TABLE `dispositivo_rastreio` DISABLE KEYS */;
INSERT INTO `dispositivo_rastreio` VALUES (1,'Marca 01','NSerie 01');
/*!40000 ALTER TABLE `dispositivo_rastreio` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entrevista_animal`
--

DROP TABLE IF EXISTS `entrevista_animal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entrevista_animal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_animal_vivo` int NOT NULL,
  `id_entrevista_tutor` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `entrevista_animal_id_entrevista_tutor_fkey` (`id_entrevista_tutor`),
  KEY `entrevista_animal_id_animal_vivo_fkey` (`id_animal_vivo`),
  CONSTRAINT `entrevista_animal_id_animal_vivo_fkey` FOREIGN KEY (`id_animal_vivo`) REFERENCES `animal_vivo` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `entrevista_animal_id_entrevista_tutor_fkey` FOREIGN KEY (`id_entrevista_tutor`) REFERENCES `entrevista_tutor` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entrevista_animal`
--

LOCK TABLES `entrevista_animal` WRITE;
/*!40000 ALTER TABLE `entrevista_animal` DISABLE KEYS */;
INSERT INTO `entrevista_animal` VALUES (2,1,NULL),(3,2,NULL),(9,3,NULL),(13,1,8),(14,2,8);
/*!40000 ALTER TABLE `entrevista_animal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `entrevista_tutor`
--

DROP TABLE IF EXISTS `entrevista_tutor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `entrevista_tutor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_tutor` int NOT NULL,
  `data` datetime NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `entrevista_tutor_id_tutor_key` (`id_tutor`),
  CONSTRAINT `entrevista_tutor_id_tutor_fkey` FOREIGN KEY (`id_tutor`) REFERENCES `tutor` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entrevista_tutor`
--

LOCK TABLES `entrevista_tutor` WRITE;
/*!40000 ALTER TABLE `entrevista_tutor` DISABLE KEYS */;
INSERT INTO `entrevista_tutor` VALUES (8,1,'2026-12-12 00:00:00.000');
/*!40000 ALTER TABLE `entrevista_tutor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enum_condicao_reprodutiva`
--

DROP TABLE IF EXISTS `enum_condicao_reprodutiva`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enum_condicao_reprodutiva` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enum_condicao_reprodutiva`
--

LOCK TABLES `enum_condicao_reprodutiva` WRITE;
/*!40000 ALTER TABLE `enum_condicao_reprodutiva` DISABLE KEYS */;
INSERT INTO `enum_condicao_reprodutiva` VALUES (1,'Pré-púbere');
/*!40000 ALTER TABLE `enum_condicao_reprodutiva` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enum_estado_clinico`
--

DROP TABLE IF EXISTS `enum_estado_clinico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enum_estado_clinico` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enum_estado_clinico`
--

LOCK TABLES `enum_estado_clinico` WRITE;
/*!40000 ALTER TABLE `enum_estado_clinico` DISABLE KEYS */;
INSERT INTO `enum_estado_clinico` VALUES (1,'Não se aplica'),(2,'Regular'),(3,'Bom'),(4,'Ruim');
/*!40000 ALTER TABLE `enum_estado_clinico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enum_estado_corporal`
--

DROP TABLE IF EXISTS `enum_estado_corporal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enum_estado_corporal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enum_estado_corporal`
--

LOCK TABLES `enum_estado_corporal` WRITE;
/*!40000 ALTER TABLE `enum_estado_corporal` DISABLE KEYS */;
INSERT INTO `enum_estado_corporal` VALUES (1,'Íntegro'),(2,'Danificado'),(3,'Decomposto');
/*!40000 ALTER TABLE `enum_estado_corporal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enum_estado_geral`
--

DROP TABLE IF EXISTS `enum_estado_geral`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enum_estado_geral` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enum_estado_geral`
--

LOCK TABLES `enum_estado_geral` WRITE;
/*!40000 ALTER TABLE `enum_estado_geral` DISABLE KEYS */;
/*!40000 ALTER TABLE `enum_estado_geral` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enum_estado_geral_exame_fisico`
--

DROP TABLE IF EXISTS `enum_estado_geral_exame_fisico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enum_estado_geral_exame_fisico` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enum_estado_geral_exame_fisico`
--

LOCK TABLES `enum_estado_geral_exame_fisico` WRITE;
/*!40000 ALTER TABLE `enum_estado_geral_exame_fisico` DISABLE KEYS */;
INSERT INTO `enum_estado_geral_exame_fisico` VALUES (1,'Bom'),(2,'Regular');
/*!40000 ALTER TABLE `enum_estado_geral_exame_fisico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enum_faixa_etaria`
--

DROP TABLE IF EXISTS `enum_faixa_etaria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enum_faixa_etaria` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enum_faixa_etaria`
--

LOCK TABLES `enum_faixa_etaria` WRITE;
/*!40000 ALTER TABLE `enum_faixa_etaria` DISABLE KEYS */;
INSERT INTO `enum_faixa_etaria` VALUES (1,'Jovem'),(2,'Adulto'),(3,'Idoso');
/*!40000 ALTER TABLE `enum_faixa_etaria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enum_genero`
--

DROP TABLE IF EXISTS `enum_genero`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enum_genero` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enum_genero`
--

LOCK TABLES `enum_genero` WRITE;
/*!40000 ALTER TABLE `enum_genero` DISABLE KEYS */;
INSERT INTO `enum_genero` VALUES (1,'Masculino'),(2,'Feminino'),(3,'Prefiro não dizer');
/*!40000 ALTER TABLE `enum_genero` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enum_genero_animal`
--

DROP TABLE IF EXISTS `enum_genero_animal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enum_genero_animal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enum_genero_animal`
--

LOCK TABLES `enum_genero_animal` WRITE;
/*!40000 ALTER TABLE `enum_genero_animal` DISABLE KEYS */;
INSERT INTO `enum_genero_animal` VALUES (1,'Fêmea'),(2,'Macho');
/*!40000 ALTER TABLE `enum_genero_animal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enum_hidratacao`
--

DROP TABLE IF EXISTS `enum_hidratacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enum_hidratacao` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enum_hidratacao`
--

LOCK TABLES `enum_hidratacao` WRITE;
/*!40000 ALTER TABLE `enum_hidratacao` DISABLE KEYS */;
INSERT INTO `enum_hidratacao` VALUES (1,'Normal');
/*!40000 ALTER TABLE `enum_hidratacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enum_interpretacao`
--

DROP TABLE IF EXISTS `enum_interpretacao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enum_interpretacao` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enum_interpretacao`
--

LOCK TABLES `enum_interpretacao` WRITE;
/*!40000 ALTER TABLE `enum_interpretacao` DISABLE KEYS */;
/*!40000 ALTER TABLE `enum_interpretacao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enum_interpretacao_analise_sorologica`
--

DROP TABLE IF EXISTS `enum_interpretacao_analise_sorologica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enum_interpretacao_analise_sorologica` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enum_interpretacao_analise_sorologica`
--

LOCK TABLES `enum_interpretacao_analise_sorologica` WRITE;
/*!40000 ALTER TABLE `enum_interpretacao_analise_sorologica` DISABLE KEYS */;
INSERT INTO `enum_interpretacao_analise_sorologica` VALUES (1,'Positivo'),(2,'Negativo');
/*!40000 ALTER TABLE `enum_interpretacao_analise_sorologica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enum_interpretacao_valor_exame`
--

DROP TABLE IF EXISTS `enum_interpretacao_valor_exame`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enum_interpretacao_valor_exame` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enum_interpretacao_valor_exame`
--

LOCK TABLES `enum_interpretacao_valor_exame` WRITE;
/*!40000 ALTER TABLE `enum_interpretacao_valor_exame` DISABLE KEYS */;
/*!40000 ALTER TABLE `enum_interpretacao_valor_exame` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enum_metodo_cpcr`
--

DROP TABLE IF EXISTS `enum_metodo_cpcr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enum_metodo_cpcr` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enum_metodo_cpcr`
--

LOCK TABLES `enum_metodo_cpcr` WRITE;
/*!40000 ALTER TABLE `enum_metodo_cpcr` DISABLE KEYS */;
/*!40000 ALTER TABLE `enum_metodo_cpcr` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enum_mucosa`
--

DROP TABLE IF EXISTS `enum_mucosa`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enum_mucosa` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enum_mucosa`
--

LOCK TABLES `enum_mucosa` WRITE;
/*!40000 ALTER TABLE `enum_mucosa` DISABLE KEYS */;
INSERT INTO `enum_mucosa` VALUES (1,'Normocorada'),(2,'Hiperêmica');
/*!40000 ALTER TABLE `enum_mucosa` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enum_nivel_acesso`
--

DROP TABLE IF EXISTS `enum_nivel_acesso`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enum_nivel_acesso` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `valor` int NOT NULL,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enum_nivel_acesso`
--

LOCK TABLES `enum_nivel_acesso` WRITE;
/*!40000 ALTER TABLE `enum_nivel_acesso` DISABLE KEYS */;
INSERT INTO `enum_nivel_acesso` VALUES ('edit',2,'Editar'),('edit_unrestricted',3,'Editar sem restrições'),('read',1,'Ler');
/*!40000 ALTER TABLE `enum_nivel_acesso` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enum_origem_animal_morto`
--

DROP TABLE IF EXISTS `enum_origem_animal_morto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enum_origem_animal_morto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enum_origem_animal_morto`
--

LOCK TABLES `enum_origem_animal_morto` WRITE;
/*!40000 ALTER TABLE `enum_origem_animal_morto` DISABLE KEYS */;
INSERT INTO `enum_origem_animal_morto` VALUES (1,'Canil'),(2,'Atropelamento');
/*!40000 ALTER TABLE `enum_origem_animal_morto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enum_status_alocacao_amostra_necropsia`
--

DROP TABLE IF EXISTS `enum_status_alocacao_amostra_necropsia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enum_status_alocacao_amostra_necropsia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enum_status_alocacao_amostra_necropsia`
--

LOCK TABLES `enum_status_alocacao_amostra_necropsia` WRITE;
/*!40000 ALTER TABLE `enum_status_alocacao_amostra_necropsia` DISABLE KEYS */;
INSERT INTO `enum_status_alocacao_amostra_necropsia` VALUES (1,'Status 1'),(2,'Status 2');
/*!40000 ALTER TABLE `enum_status_alocacao_amostra_necropsia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enum_status_alocacao_amostra_veterinario`
--

DROP TABLE IF EXISTS `enum_status_alocacao_amostra_veterinario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enum_status_alocacao_amostra_veterinario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enum_status_alocacao_amostra_veterinario`
--

LOCK TABLES `enum_status_alocacao_amostra_veterinario` WRITE;
/*!40000 ALTER TABLE `enum_status_alocacao_amostra_veterinario` DISABLE KEYS */;
INSERT INTO `enum_status_alocacao_amostra_veterinario` VALUES (1,'Processada'),(2,'Armazenada'),(3,'Aguardando processamento'),(4,'Descartada');
/*!40000 ALTER TABLE `enum_status_alocacao_amostra_veterinario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enum_status_animal_morto`
--

DROP TABLE IF EXISTS `enum_status_animal_morto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enum_status_animal_morto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enum_status_animal_morto`
--

LOCK TABLES `enum_status_animal_morto` WRITE;
/*!40000 ALTER TABLE `enum_status_animal_morto` DISABLE KEYS */;
INSERT INTO `enum_status_animal_morto` VALUES (1,'PEFBJ'),(2,'Necropsia feita'),(3,'Em análise');
/*!40000 ALTER TABLE `enum_status_animal_morto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enum_status_cpcr`
--

DROP TABLE IF EXISTS `enum_status_cpcr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enum_status_cpcr` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enum_status_cpcr`
--

LOCK TABLES `enum_status_cpcr` WRITE;
/*!40000 ALTER TABLE `enum_status_cpcr` DISABLE KEYS */;
/*!40000 ALTER TABLE `enum_status_cpcr` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enum_status_qpcr`
--

DROP TABLE IF EXISTS `enum_status_qpcr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enum_status_qpcr` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enum_status_qpcr`
--

LOCK TABLES `enum_status_qpcr` WRITE;
/*!40000 ALTER TABLE `enum_status_qpcr` DISABLE KEYS */;
/*!40000 ALTER TABLE `enum_status_qpcr` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enum_tipo_resultado_analise_sorologica`
--

DROP TABLE IF EXISTS `enum_tipo_resultado_analise_sorologica`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enum_tipo_resultado_analise_sorologica` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enum_tipo_resultado_analise_sorologica`
--

LOCK TABLES `enum_tipo_resultado_analise_sorologica` WRITE;
/*!40000 ALTER TABLE `enum_tipo_resultado_analise_sorologica` DISABLE KEYS */;
INSERT INTO `enum_tipo_resultado_analise_sorologica` VALUES (1,'D.O.'),(2,'Título');
/*!40000 ALTER TABLE `enum_tipo_resultado_analise_sorologica` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `enum_tipo_vacina`
--

DROP TABLE IF EXISTS `enum_tipo_vacina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enum_tipo_vacina` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enum_tipo_vacina`
--

LOCK TABLES `enum_tipo_vacina` WRITE;
/*!40000 ALTER TABLE `enum_tipo_vacina` DISABLE KEYS */;
INSERT INTO `enum_tipo_vacina` VALUES (1,'Reforço');
/*!40000 ALTER TABLE `enum_tipo_vacina` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `envio_amostra_necropsia`
--

DROP TABLE IF EXISTS `envio_amostra_necropsia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `envio_amostra_necropsia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_alocacao_amostra_necropsia` int NOT NULL,
  `id_armazenamento` int NOT NULL,
  `id_status` int NOT NULL,
  `quantidade` int NOT NULL,
  `data_envio` datetime NOT NULL,
  `observacao` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `envio_amostra_necropsia_id_alocacao_amostra_necropsia_id_arm_key` (`id_alocacao_amostra_necropsia`,`id_armazenamento`),
  KEY `envio_amostra_necropsia_id_armazenamento_fkey` (`id_armazenamento`),
  KEY `envio_amostra_necropsia_id_status_fkey` (`id_status`),
  CONSTRAINT `envio_amostra_necropsia_id_alocacao_amostra_necropsia_fkey` FOREIGN KEY (`id_alocacao_amostra_necropsia`) REFERENCES `alocacao_amostra_necropsia` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `envio_amostra_necropsia_id_armazenamento_fkey` FOREIGN KEY (`id_armazenamento`) REFERENCES `armazem` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `envio_amostra_necropsia_id_status_fkey` FOREIGN KEY (`id_status`) REFERENCES `enum_status_alocacao_amostra_necropsia` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `envio_amostra_necropsia`
--

LOCK TABLES `envio_amostra_necropsia` WRITE;
/*!40000 ALTER TABLE `envio_amostra_necropsia` DISABLE KEYS */;
INSERT INTO `envio_amostra_necropsia` VALUES (3,1,3,1,12,'2027-12-12 15:00:00.000',NULL);
/*!40000 ALTER TABLE `envio_amostra_necropsia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `envio_amostra_veterinario`
--

DROP TABLE IF EXISTS `envio_amostra_veterinario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `envio_amostra_veterinario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_alocacao_amostra_veterinario` int NOT NULL,
  `id_armazenamento` int NOT NULL,
  `id_status` int NOT NULL,
  `quantidade` int NOT NULL,
  `data_envio` datetime NOT NULL,
  `observacao` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `envio_amostra_veterinario_id_alocacao_amostra_veterinario_id_key` (`id_alocacao_amostra_veterinario`,`id_armazenamento`),
  KEY `envio_amostra_veterinario_id_armazenamento_fkey` (`id_armazenamento`),
  KEY `envio_amostra_veterinario_id_status_fkey` (`id_status`),
  CONSTRAINT `envio_amostra_veterinario_id_alocacao_amostra_veterinario_fkey` FOREIGN KEY (`id_alocacao_amostra_veterinario`) REFERENCES `alocacao_amostra_veterinario` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `envio_amostra_veterinario_id_armazenamento_fkey` FOREIGN KEY (`id_armazenamento`) REFERENCES `armazem` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `envio_amostra_veterinario_id_status_fkey` FOREIGN KEY (`id_status`) REFERENCES `enum_status_alocacao_amostra_veterinario` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `envio_amostra_veterinario`
--

LOCK TABLES `envio_amostra_veterinario` WRITE;
/*!40000 ALTER TABLE `envio_amostra_veterinario` DISABLE KEYS */;
INSERT INTO `envio_amostra_veterinario` VALUES (42,8,1,3,3,'2025-12-21 15:00:00.000',NULL);
/*!40000 ALTER TABLE `envio_amostra_veterinario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especie`
--

DROP TABLE IF EXISTS `especie`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especie` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especie`
--

LOCK TABLES `especie` WRITE;
/*!40000 ALTER TABLE `especie` DISABLE KEYS */;
INSERT INTO `especie` VALUES (1,'Espécie 02'),(2,'Espécie 01');
/*!40000 ALTER TABLE `especie` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especie_ectoparasito`
--

DROP TABLE IF EXISTS `especie_ectoparasito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especie_ectoparasito` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especie_ectoparasito`
--

LOCK TABLES `especie_ectoparasito` WRITE;
/*!40000 ALTER TABLE `especie_ectoparasito` DISABLE KEYS */;
INSERT INTO `especie_ectoparasito` VALUES (1,'Esp 01');
/*!40000 ALTER TABLE `especie_ectoparasito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especie_helminto`
--

DROP TABLE IF EXISTS `especie_helminto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especie_helminto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especie_helminto`
--

LOCK TABLES `especie_helminto` WRITE;
/*!40000 ALTER TABLE `especie_helminto` DISABLE KEYS */;
/*!40000 ALTER TABLE `especie_helminto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `especie_ovo_cisto`
--

DROP TABLE IF EXISTS `especie_ovo_cisto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `especie_ovo_cisto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especie_ovo_cisto`
--

LOCK TABLES `especie_ovo_cisto` WRITE;
/*!40000 ALTER TABLE `especie_ovo_cisto` DISABLE KEYS */;
INSERT INTO `especie_ovo_cisto` VALUES (1,'TecPro 02');
/*!40000 ALTER TABLE `especie_ovo_cisto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exame`
--

DROP TABLE IF EXISTS `exame`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exame` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_visita_veterinaria` int NOT NULL,
  `id_estado_geral` int NOT NULL,
  `id_interpretacao` int NOT NULL,
  `observacao` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `exame_id_visita_veterinaria_key` (`id_visita_veterinaria`),
  KEY `exame_id_estado_geral_fkey` (`id_estado_geral`),
  KEY `exame_id_interpretacao_fkey` (`id_interpretacao`),
  CONSTRAINT `exame_id_estado_geral_fkey` FOREIGN KEY (`id_estado_geral`) REFERENCES `enum_estado_geral` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `exame_id_interpretacao_fkey` FOREIGN KEY (`id_interpretacao`) REFERENCES `enum_interpretacao` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `exame_id_visita_veterinaria_fkey` FOREIGN KEY (`id_visita_veterinaria`) REFERENCES `visita_veterinaria` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exame`
--

LOCK TABLES `exame` WRITE;
/*!40000 ALTER TABLE `exame` DISABLE KEYS */;
/*!40000 ALTER TABLE `exame` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `exame_fisico`
--

DROP TABLE IF EXISTS `exame_fisico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `exame_fisico` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_visita_veterinaria` int NOT NULL,
  `id_estado_geral` int NOT NULL,
  `FR` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `FC` int NOT NULL,
  `temp_retal` double NOT NULL,
  `id_mucosa` int NOT NULL,
  `TPC` int NOT NULL,
  `id_hidratacao` int NOT NULL,
  `peso` double NOT NULL,
  `score` int NOT NULL,
  `observacao_coleta_sangue` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `observacao_exame_fisico` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `observacao_geral` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `exame_fisico_id_visita_veterinaria_key` (`id_visita_veterinaria`),
  KEY `exame_fisico_id_estado_geral_fkey` (`id_estado_geral`),
  KEY `exame_fisico_id_mucosa_fkey` (`id_mucosa`),
  KEY `exame_fisico_id_hidratacao_fkey` (`id_hidratacao`),
  CONSTRAINT `exame_fisico_id_estado_geral_fkey` FOREIGN KEY (`id_estado_geral`) REFERENCES `enum_estado_geral_exame_fisico` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `exame_fisico_id_hidratacao_fkey` FOREIGN KEY (`id_hidratacao`) REFERENCES `enum_hidratacao` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `exame_fisico_id_mucosa_fkey` FOREIGN KEY (`id_mucosa`) REFERENCES `enum_mucosa` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `exame_fisico_id_visita_veterinaria_fkey` FOREIGN KEY (`id_visita_veterinaria`) REFERENCES `visita_veterinaria` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exame_fisico`
--

LOCK TABLES `exame_fisico` WRITE;
/*!40000 ALTER TABLE `exame_fisico` DISABLE KEYS */;
INSERT INTO `exame_fisico` VALUES (3,12,1,'Ofegante',123,123,2,123,1,123,2,NULL,NULL,NULL);
/*!40000 ALTER TABLE `exame_fisico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `formulario`
--

DROP TABLE IF EXISTS `formulario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `formulario` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_sub_categoria` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `formulario_id_sub_categoria_fkey` (`id_sub_categoria`),
  CONSTRAINT `formulario_id_sub_categoria_fkey` FOREIGN KEY (`id_sub_categoria`) REFERENCES `sub_categoria` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `formulario`
--

LOCK TABLES `formulario` WRITE;
/*!40000 ALTER TABLE `formulario` DISABLE KEYS */;
INSERT INTO `formulario` VALUES ('amostras-am','Amostra','necropsias'),('amostras-av','Amostra','veterinario'),('analiseectoparasitos-am','Análise de Ectoparasitos','resultadoseanalises'),('analiseectoparasitos-av','Ectoparasitos','exameseanalises'),('analisefezes','Fezes','exameseanalises'),('analisehelmintos','Análise de Helmintos','resultadoseanalises'),('analisemolecular','Molecular','exameseanalises'),('analiseovocistos','Ovos/Cistos','exameseanalises'),('animal-am','Animal','animaisatropelados'),('animal-av','Animal','animais'),('cadastrobasico-am','Animais Mortos','geral'),('cadastrobasico-av','Animais Vivos','geral'),('castracao','Castração','animais'),('entrevista','Entrevista','entrevistas'),('examefisico','Exame Físico','veterinario'),('necropsia','Necrópsia','necropsias'),('rastreiogps','Rastreio de GPS','rastreiodegps'),('resultadoexame-am','QPCR e CPCR','resultadoseanalises'),('resultadoexame-av','Hemograma/Bioquímico','exameseanalises'),('resultadosorologico','Sorologia','exameseanalises'),('tutor','Tutor','entrevistas'),('vacina','Vacina','veterinario'),('visitaveterinaria','Visita Veterinária','veterinario');
/*!40000 ALTER TABLE `formulario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `funcao`
--

DROP TABLE IF EXISTS `funcao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `funcao` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `funcao`
--

LOCK TABLES `funcao` WRITE;
/*!40000 ALTER TABLE `funcao` DISABLE KEYS */;
INSERT INTO `funcao` VALUES ('0','owner'),('1','admin'),('2','common');
/*!40000 ALTER TABLE `funcao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `gene_alvo`
--

DROP TABLE IF EXISTS `gene_alvo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `gene_alvo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `gene_alvo`
--

LOCK TABLES `gene_alvo` WRITE;
/*!40000 ALTER TABLE `gene_alvo` DISABLE KEYS */;
/*!40000 ALTER TABLE `gene_alvo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `genero_ectoparasito`
--

DROP TABLE IF EXISTS `genero_ectoparasito`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `genero_ectoparasito` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genero_ectoparasito`
--

LOCK TABLES `genero_ectoparasito` WRITE;
/*!40000 ALTER TABLE `genero_ectoparasito` DISABLE KEYS */;
INSERT INTO `genero_ectoparasito` VALUES (1,'Gen 01');
/*!40000 ALTER TABLE `genero_ectoparasito` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grupo`
--

DROP TABLE IF EXISTS `grupo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grupo` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `grupo_nome_key` (`nome`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupo`
--

LOCK TABLES `grupo` WRITE;
/*!40000 ALTER TABLE `grupo` DISABLE KEYS */;
INSERT INTO `grupo` VALUES ('entr','Entrevistador'),('leg','Legista'),('pesqecto','Pesquisador de Ectoparasitos'),('pesqfez','Pesquisador de Fezes'),('pesqhelm','Pesquisador de Helmintos'),('pesqsor','Pesquisador de Sorológico'),('vet','Veterinário');
/*!40000 ALTER TABLE `grupo` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `grupo_animal_morto`
--

DROP TABLE IF EXISTS `grupo_animal_morto`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `grupo_animal_morto` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupo_animal_morto`
--

LOCK TABLES `grupo_animal_morto` WRITE;
/*!40000 ALTER TABLE `grupo_animal_morto` DISABLE KEYS */;
INSERT INTO `grupo_animal_morto` VALUES (1,'Doméstico'),(2,'Silvestre');
/*!40000 ALTER TABLE `grupo_animal_morto` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medida_corporal_necropsia`
--

DROP TABLE IF EXISTS `medida_corporal_necropsia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medida_corporal_necropsia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_necropsia` int NOT NULL,
  `id_tipo_medida_corporal` int NOT NULL,
  `valor` double NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `medida_corporal_necropsia_id_necropsia_id_tipo_medida_corpor_key` (`id_necropsia`,`id_tipo_medida_corporal`),
  KEY `medida_corporal_necropsia_id_tipo_medida_corporal_fkey` (`id_tipo_medida_corporal`),
  CONSTRAINT `medida_corporal_necropsia_id_necropsia_fkey` FOREIGN KEY (`id_necropsia`) REFERENCES `necropsia` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `medida_corporal_necropsia_id_tipo_medida_corporal_fkey` FOREIGN KEY (`id_tipo_medida_corporal`) REFERENCES `tipo_medida_corporal_necropsia` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medida_corporal_necropsia`
--

LOCK TABLES `medida_corporal_necropsia` WRITE;
/*!40000 ALTER TABLE `medida_corporal_necropsia` DISABLE KEYS */;
INSERT INTO `medida_corporal_necropsia` VALUES (5,1,1,3);
/*!40000 ALTER TABLE `medida_corporal_necropsia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `medida_corporal_veterinario`
--

DROP TABLE IF EXISTS `medida_corporal_veterinario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `medida_corporal_veterinario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_visita_veterinaria` int NOT NULL,
  `id_tipo_medida_corporal` int NOT NULL,
  `valor` double NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `medida_corporal_veterinario_id_visita_veterinaria_id_tipo_me_key` (`id_visita_veterinaria`,`id_tipo_medida_corporal`),
  KEY `medida_corporal_veterinario_id_tipo_medida_corporal_fkey` (`id_tipo_medida_corporal`),
  CONSTRAINT `medida_corporal_veterinario_id_tipo_medida_corporal_fkey` FOREIGN KEY (`id_tipo_medida_corporal`) REFERENCES `tipo_medida_corporal_veterinario` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `medida_corporal_veterinario_id_visita_veterinaria_fkey` FOREIGN KEY (`id_visita_veterinaria`) REFERENCES `visita_veterinaria` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medida_corporal_veterinario`
--

LOCK TABLES `medida_corporal_veterinario` WRITE;
/*!40000 ALTER TABLE `medida_corporal_veterinario` DISABLE KEYS */;
INSERT INTO `medida_corporal_veterinario` VALUES (26,12,1,2);
/*!40000 ALTER TABLE `medida_corporal_veterinario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `metodo_monitoramento`
--

DROP TABLE IF EXISTS `metodo_monitoramento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `metodo_monitoramento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metodo_monitoramento`
--

LOCK TABLES `metodo_monitoramento` WRITE;
/*!40000 ALTER TABLE `metodo_monitoramento` DISABLE KEYS */;
INSERT INTO `metodo_monitoramento` VALUES (1,'Método 01');
/*!40000 ALTER TABLE `metodo_monitoramento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `necropsia`
--

DROP TABLE IF EXISTS `necropsia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `necropsia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_animal_morto` int NOT NULL,
  `data_realizacao` datetime NOT NULL,
  `id_estado_corporal` int NOT NULL,
  `id_estado_clinico` int NOT NULL,
  `id_tutor` int DEFAULT NULL,
  `id_condicao_reprodutiva` int NOT NULL,
  `peso` double NOT NULL,
  `id_faixa_etaria` int NOT NULL,
  `observacao` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `id_genero_identificado` int NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `necropsia_id_animal_morto_key` (`id_animal_morto`),
  KEY `necropsia_id_estado_corporal_fkey` (`id_estado_corporal`),
  KEY `necropsia_id_estado_clinico_fkey` (`id_estado_clinico`),
  KEY `necropsia_id_tutor_fkey` (`id_tutor`),
  KEY `necropsia_id_condicao_reprodutiva_fkey` (`id_condicao_reprodutiva`),
  KEY `necropsia_id_faixa_etaria_fkey` (`id_faixa_etaria`),
  KEY `necropsia_id_genero_identificado_fkey` (`id_genero_identificado`),
  CONSTRAINT `necropsia_id_animal_morto_fkey` FOREIGN KEY (`id_animal_morto`) REFERENCES `animal_morto` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `necropsia_id_condicao_reprodutiva_fkey` FOREIGN KEY (`id_condicao_reprodutiva`) REFERENCES `enum_condicao_reprodutiva` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `necropsia_id_estado_clinico_fkey` FOREIGN KEY (`id_estado_clinico`) REFERENCES `enum_estado_clinico` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `necropsia_id_estado_corporal_fkey` FOREIGN KEY (`id_estado_corporal`) REFERENCES `enum_estado_corporal` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `necropsia_id_faixa_etaria_fkey` FOREIGN KEY (`id_faixa_etaria`) REFERENCES `enum_faixa_etaria` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `necropsia_id_genero_identificado_fkey` FOREIGN KEY (`id_genero_identificado`) REFERENCES `enum_genero_animal` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `necropsia_id_tutor_fkey` FOREIGN KEY (`id_tutor`) REFERENCES `tutor` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `necropsia`
--

LOCK TABLES `necropsia` WRITE;
/*!40000 ALTER TABLE `necropsia` DISABLE KEYS */;
INSERT INTO `necropsia` VALUES (1,1,'2026-12-13 12:00:00.000',2,1,NULL,1,123,2,NULL,1);
/*!40000 ALTER TABLE `necropsia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `opcao_resposta_animal`
--

DROP TABLE IF EXISTS `opcao_resposta_animal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opcao_resposta_animal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_pergunta_animal` int NOT NULL,
  `resposta_possivel` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `opcao_resposta_animal_id_pergunta_animal_fkey` (`id_pergunta_animal`),
  CONSTRAINT `opcao_resposta_animal_id_pergunta_animal_fkey` FOREIGN KEY (`id_pergunta_animal`) REFERENCES `pergunta_animal` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `opcao_resposta_animal`
--

LOCK TABLES `opcao_resposta_animal` WRITE;
/*!40000 ALTER TABLE `opcao_resposta_animal` DISABLE KEYS */;
/*!40000 ALTER TABLE `opcao_resposta_animal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `opcao_resposta_tutor`
--

DROP TABLE IF EXISTS `opcao_resposta_tutor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `opcao_resposta_tutor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_pergunta_tutor` int NOT NULL,
  `resposta_possivel` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `opcao_resposta_tutor_id_pergunta_tutor_fkey` (`id_pergunta_tutor`),
  CONSTRAINT `opcao_resposta_tutor_id_pergunta_tutor_fkey` FOREIGN KEY (`id_pergunta_tutor`) REFERENCES `pergunta_tutor` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `opcao_resposta_tutor`
--

LOCK TABLES `opcao_resposta_tutor` WRITE;
/*!40000 ALTER TABLE `opcao_resposta_tutor` DISABLE KEYS */;
INSERT INTO `opcao_resposta_tutor` VALUES (1,1,'Sim'),(2,1,'Não');
/*!40000 ALTER TABLE `opcao_resposta_tutor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pergunta_animal`
--

DROP TABLE IF EXISTS `pergunta_animal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pergunta_animal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pergunta` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pergunta_animal_pergunta_key` (`pergunta`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pergunta_animal`
--

LOCK TABLES `pergunta_animal` WRITE;
/*!40000 ALTER TABLE `pergunta_animal` DISABLE KEYS */;
INSERT INTO `pergunta_animal` VALUES (1,'Pergunta Animal Teste 1'),(2,'Pergunta Animal Teste 2'),(4,'Pergunta Animal Teste 3');
/*!40000 ALTER TABLE `pergunta_animal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pergunta_tutor`
--

DROP TABLE IF EXISTS `pergunta_tutor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pergunta_tutor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `pergunta` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `pergunta_tutor_pergunta_key` (`pergunta`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pergunta_tutor`
--

LOCK TABLES `pergunta_tutor` WRITE;
/*!40000 ALTER TABLE `pergunta_tutor` DISABLE KEYS */;
INSERT INTO `pergunta_tutor` VALUES (1,'Pergunta Teste 1'),(2,'Pergunta Teste 2');
/*!40000 ALTER TABLE `pergunta_tutor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `rastreio_gps`
--

DROP TABLE IF EXISTS `rastreio_gps`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `rastreio_gps` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_animal_vivo` int NOT NULL,
  `id_dispositivo_rastreio` int NOT NULL,
  `data_inicio` datetime NOT NULL,
  `data_fim` datetime DEFAULT NULL,
  `observacao` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `dias_monitorados` int NOT NULL,
  `pontos_localizacao` int NOT NULL,
  `area_vida` double NOT NULL,
  `id_metodo_monitoramento` int NOT NULL,
  `link_planilha_bruta` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `link_planilha_editada` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `data_atualizacao_planilha_bruta` datetime DEFAULT NULL,
  `data_atualizacao_planilha_editada` datetime DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `rastreio_gps_id_animal_vivo_key` (`id_animal_vivo`),
  KEY `rastreio_gps_id_dispositivo_rastreio_fkey` (`id_dispositivo_rastreio`),
  KEY `rastreio_gps_id_metodo_monitoramento_fkey` (`id_metodo_monitoramento`),
  CONSTRAINT `rastreio_gps_id_animal_vivo_fkey` FOREIGN KEY (`id_animal_vivo`) REFERENCES `animal_vivo` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `rastreio_gps_id_dispositivo_rastreio_fkey` FOREIGN KEY (`id_dispositivo_rastreio`) REFERENCES `dispositivo_rastreio` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `rastreio_gps_id_metodo_monitoramento_fkey` FOREIGN KEY (`id_metodo_monitoramento`) REFERENCES `metodo_monitoramento` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rastreio_gps`
--

LOCK TABLES `rastreio_gps` WRITE;
/*!40000 ALTER TABLE `rastreio_gps` DISABLE KEYS */;
INSERT INTO `rastreio_gps` VALUES (1,1,1,'2025-12-12 03:00:00.000',NULL,NULL,123,123,123,1,'https://tailwindcss.com/docs/responsive-design',NULL,NULL,NULL);
/*!40000 ALTER TABLE `rastreio_gps` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `responsavel_coleta`
--

DROP TABLE IF EXISTS `responsavel_coleta`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `responsavel_coleta` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `responsavel_coleta`
--

LOCK TABLES `responsavel_coleta` WRITE;
/*!40000 ALTER TABLE `responsavel_coleta` DISABLE KEYS */;
INSERT INTO `responsavel_coleta` VALUES (1,'Gabriel'),(2,'PEFBJ (Arthur)'),(3,'PEFBJ (Alessandro)');
/*!40000 ALTER TABLE `responsavel_coleta` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resposta_animal`
--

DROP TABLE IF EXISTS `resposta_animal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resposta_animal` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_entrevista_animal` int NOT NULL,
  `id_pergunta_animal` int NOT NULL,
  `texto` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantidade` int DEFAULT NULL,
  `id_opcao_resposta_animal` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `resposta_animal_id_entrevista_animal_fkey` (`id_entrevista_animal`),
  KEY `resposta_animal_id_pergunta_animal_fkey` (`id_pergunta_animal`),
  KEY `resposta_animal_id_opcao_resposta_animal_fkey` (`id_opcao_resposta_animal`),
  CONSTRAINT `resposta_animal_id_entrevista_animal_fkey` FOREIGN KEY (`id_entrevista_animal`) REFERENCES `entrevista_animal` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `resposta_animal_id_opcao_resposta_animal_fkey` FOREIGN KEY (`id_opcao_resposta_animal`) REFERENCES `opcao_resposta_animal` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `resposta_animal_id_pergunta_animal_fkey` FOREIGN KEY (`id_pergunta_animal`) REFERENCES `pergunta_animal` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=81 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resposta_animal`
--

LOCK TABLES `resposta_animal` WRITE;
/*!40000 ALTER TABLE `resposta_animal` DISABLE KEYS */;
INSERT INTO `resposta_animal` VALUES (75,13,1,NULL,NULL,NULL),(76,13,2,NULL,NULL,NULL),(77,13,4,NULL,NULL,NULL),(78,14,1,NULL,NULL,NULL),(79,14,2,NULL,NULL,NULL),(80,14,4,NULL,NULL,NULL);
/*!40000 ALTER TABLE `resposta_animal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resposta_tutor`
--

DROP TABLE IF EXISTS `resposta_tutor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resposta_tutor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_entrevista_tutor` int NOT NULL,
  `id_pergunta_tutor` int NOT NULL,
  `texto` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `quantidade` int DEFAULT NULL,
  `id_opcao_resposta_tutor` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `resposta_tutor_id_entrevista_tutor_fkey` (`id_entrevista_tutor`),
  KEY `resposta_tutor_id_pergunta_tutor_fkey` (`id_pergunta_tutor`),
  KEY `resposta_tutor_id_opcao_resposta_tutor_fkey` (`id_opcao_resposta_tutor`),
  CONSTRAINT `resposta_tutor_id_entrevista_tutor_fkey` FOREIGN KEY (`id_entrevista_tutor`) REFERENCES `entrevista_tutor` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `resposta_tutor_id_opcao_resposta_tutor_fkey` FOREIGN KEY (`id_opcao_resposta_tutor`) REFERENCES `opcao_resposta_tutor` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `resposta_tutor_id_pergunta_tutor_fkey` FOREIGN KEY (`id_pergunta_tutor`) REFERENCES `pergunta_tutor` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resposta_tutor`
--

LOCK TABLES `resposta_tutor` WRITE;
/*!40000 ALTER TABLE `resposta_tutor` DISABLE KEYS */;
INSERT INTO `resposta_tutor` VALUES (37,8,1,NULL,NULL,1),(38,8,2,NULL,NULL,NULL);
/*!40000 ALTER TABLE `resposta_tutor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resultado_cpcr`
--

DROP TABLE IF EXISTS `resultado_cpcr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resultado_cpcr` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_necropsia` int NOT NULL,
  `id_tipo_amostra` int NOT NULL,
  `data_realizacao` datetime NOT NULL,
  `id_tipo_extracao` int NOT NULL,
  `id_gene_alvo` int NOT NULL,
  `primer` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pb` int NOT NULL,
  `id_agente_suspeito` int NOT NULL,
  `id_metodo_cpcr` int NOT NULL,
  `id_resultado_cpcr` int NOT NULL,
  `controle` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `resultado_cpcr_id_necropsia_fkey` (`id_necropsia`),
  KEY `resultado_cpcr_id_tipo_extracao_fkey` (`id_tipo_extracao`),
  KEY `resultado_cpcr_id_gene_alvo_fkey` (`id_gene_alvo`),
  KEY `resultado_cpcr_id_agente_suspeito_fkey` (`id_agente_suspeito`),
  KEY `resultado_cpcr_id_metodo_cpcr_fkey` (`id_metodo_cpcr`),
  KEY `resultado_cpcr_id_resultado_cpcr_fkey` (`id_resultado_cpcr`),
  KEY `resultado_cpcr_id_tipo_amostra_fkey` (`id_tipo_amostra`),
  CONSTRAINT `resultado_cpcr_id_agente_suspeito_fkey` FOREIGN KEY (`id_agente_suspeito`) REFERENCES `agente_suspeito` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `resultado_cpcr_id_gene_alvo_fkey` FOREIGN KEY (`id_gene_alvo`) REFERENCES `gene_alvo` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `resultado_cpcr_id_metodo_cpcr_fkey` FOREIGN KEY (`id_metodo_cpcr`) REFERENCES `enum_metodo_cpcr` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `resultado_cpcr_id_necropsia_fkey` FOREIGN KEY (`id_necropsia`) REFERENCES `necropsia` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `resultado_cpcr_id_resultado_cpcr_fkey` FOREIGN KEY (`id_resultado_cpcr`) REFERENCES `enum_status_cpcr` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `resultado_cpcr_id_tipo_amostra_fkey` FOREIGN KEY (`id_tipo_amostra`) REFERENCES `tipo_amostra_cpcr` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `resultado_cpcr_id_tipo_extracao_fkey` FOREIGN KEY (`id_tipo_extracao`) REFERENCES `tipo_extracao` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resultado_cpcr`
--

LOCK TABLES `resultado_cpcr` WRITE;
/*!40000 ALTER TABLE `resultado_cpcr` DISABLE KEYS */;
/*!40000 ALTER TABLE `resultado_cpcr` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resultado_exame`
--

DROP TABLE IF EXISTS `resultado_exame`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resultado_exame` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_visita_veterinaria` int NOT NULL,
  `eritrocitos` double NOT NULL,
  `hemoglobina` double NOT NULL,
  `hematocrito` double NOT NULL,
  `vcm` double NOT NULL,
  `hcm` double NOT NULL,
  `chcm` double NOT NULL,
  `plaquetas` double NOT NULL,
  `leucocitos` double NOT NULL,
  `bastonetes` double NOT NULL,
  `segmentados` double NOT NULL,
  `segmentados_percentual` double NOT NULL,
  `linfocitos` double NOT NULL,
  `linfocitos_percentual` double NOT NULL,
  `monocitos` double NOT NULL,
  `monocitos_percentual` double NOT NULL,
  `eosinofilos` double NOT NULL,
  `eosinofilos_percentual` double NOT NULL,
  `basofilos` double NOT NULL,
  `basofilos_percentual` double NOT NULL,
  `alt` double NOT NULL,
  `creatinina` double NOT NULL,
  `fosfatase_alcalina` double NOT NULL,
  `proteina_total` double NOT NULL,
  `ureia` double NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `resultado_exame_id_visita_veterinaria_key` (`id_visita_veterinaria`),
  CONSTRAINT `resultado_exame_id_visita_veterinaria_fkey` FOREIGN KEY (`id_visita_veterinaria`) REFERENCES `visita_veterinaria` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resultado_exame`
--

LOCK TABLES `resultado_exame` WRITE;
/*!40000 ALTER TABLE `resultado_exame` DISABLE KEYS */;
INSERT INTO `resultado_exame` VALUES (1,11,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123),(3,12,123,123,123,213,123,123,123,123,213,123,123,123,123,123,123,123,123,123,123,123,123,123,123,123);
/*!40000 ALTER TABLE `resultado_exame` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `resultado_qpcr`
--

DROP TABLE IF EXISTS `resultado_qpcr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `resultado_qpcr` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_necropsia` int NOT NULL,
  `id_tipo_amostra` int NOT NULL,
  `data_realizacao` datetime NOT NULL,
  `id_gene_alvo` int NOT NULL,
  `id_agente_suspeito` int NOT NULL,
  `ct_medio` double NOT NULL,
  `copias_estimadas` double NOT NULL,
  `id_resultado_qpcr` int NOT NULL,
  `controle` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `resultado_qpcr_id_necropsia_fkey` (`id_necropsia`),
  KEY `resultado_qpcr_id_gene_alvo_fkey` (`id_gene_alvo`),
  KEY `resultado_qpcr_id_agente_suspeito_fkey` (`id_agente_suspeito`),
  KEY `resultado_qpcr_id_resultado_qpcr_fkey` (`id_resultado_qpcr`),
  KEY `resultado_qpcr_id_tipo_amostra_fkey` (`id_tipo_amostra`),
  CONSTRAINT `resultado_qpcr_id_agente_suspeito_fkey` FOREIGN KEY (`id_agente_suspeito`) REFERENCES `agente_suspeito` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `resultado_qpcr_id_gene_alvo_fkey` FOREIGN KEY (`id_gene_alvo`) REFERENCES `gene_alvo` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `resultado_qpcr_id_necropsia_fkey` FOREIGN KEY (`id_necropsia`) REFERENCES `necropsia` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `resultado_qpcr_id_resultado_qpcr_fkey` FOREIGN KEY (`id_resultado_qpcr`) REFERENCES `enum_status_qpcr` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `resultado_qpcr_id_tipo_amostra_fkey` FOREIGN KEY (`id_tipo_amostra`) REFERENCES `tipo_amostra_qpcr` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resultado_qpcr`
--

LOCK TABLES `resultado_qpcr` WRITE;
/*!40000 ALTER TABLE `resultado_qpcr` DISABLE KEYS */;
/*!40000 ALTER TABLE `resultado_qpcr` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `solicitante`
--

DROP TABLE IF EXISTS `solicitante`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `solicitante` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `senha` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `data` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `mensagem` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `solicitante_email_key` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `solicitante`
--

LOCK TABLES `solicitante` WRITE;
/*!40000 ALTER TABLE `solicitante` DISABLE KEYS */;
/*!40000 ALTER TABLE `solicitante` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sub_categoria`
--

DROP TABLE IF EXISTS `sub_categoria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `sub_categoria` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_categoria` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sub_categoria_nome_key` (`nome`),
  KEY `sub_categoria_id_categoria_fkey` (`id_categoria`),
  CONSTRAINT `sub_categoria_id_categoria_fkey` FOREIGN KEY (`id_categoria`) REFERENCES `categoria` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sub_categoria`
--

LOCK TABLES `sub_categoria` WRITE;
/*!40000 ALTER TABLE `sub_categoria` DISABLE KEYS */;
INSERT INTO `sub_categoria` VALUES ('animais','0_Animais','0_animaisvivos'),('animaisatropelados','0_Animais Atropelados','1_animaismortos'),('entrevistas','1_Entrevistas','0_animaisvivos'),('exameseanalises','4_Exames e Análises','0_animaisvivos'),('geral','0_Geral','2_cadastrosbasicos'),('necropsias','1_Necrópsias','1_animaismortos'),('rastreiodegps','2_Rastreio de GPS','0_animaisvivos'),('resultadoseanalises','2_Resultados e Análises','1_animaismortos'),('veterinario','3_Veterinário','0_animaisvivos');
/*!40000 ALTER TABLE `sub_categoria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tecnologia_processamento`
--

DROP TABLE IF EXISTS `tecnologia_processamento`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tecnologia_processamento` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tecnologia_processamento`
--

LOCK TABLES `tecnologia_processamento` WRITE;
/*!40000 ALTER TABLE `tecnologia_processamento` DISABLE KEYS */;
INSERT INTO `tecnologia_processamento` VALUES (1,'TecPro 01');
/*!40000 ALTER TABLE `tecnologia_processamento` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `teste_sorologico`
--

DROP TABLE IF EXISTS `teste_sorologico`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `teste_sorologico` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teste_sorologico`
--

LOCK TABLES `teste_sorologico` WRITE;
/*!40000 ALTER TABLE `teste_sorologico` DISABLE KEYS */;
INSERT INTO `teste_sorologico` VALUES (1,'ELISA'),(2,'IFA');
/*!40000 ALTER TABLE `teste_sorologico` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_amostra_cpcr`
--

DROP TABLE IF EXISTS `tipo_amostra_cpcr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_amostra_cpcr` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_amostra_cpcr`
--

LOCK TABLES `tipo_amostra_cpcr` WRITE;
/*!40000 ALTER TABLE `tipo_amostra_cpcr` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipo_amostra_cpcr` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_amostra_necropsia`
--

DROP TABLE IF EXISTS `tipo_amostra_necropsia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_amostra_necropsia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_amostra_necropsia`
--

LOCK TABLES `tipo_amostra_necropsia` WRITE;
/*!40000 ALTER TABLE `tipo_amostra_necropsia` DISABLE KEYS */;
INSERT INTO `tipo_amostra_necropsia` VALUES (1,'Tipo 1'),(2,'Tipo 2');
/*!40000 ALTER TABLE `tipo_amostra_necropsia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_amostra_qpcr`
--

DROP TABLE IF EXISTS `tipo_amostra_qpcr`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_amostra_qpcr` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_amostra_qpcr`
--

LOCK TABLES `tipo_amostra_qpcr` WRITE;
/*!40000 ALTER TABLE `tipo_amostra_qpcr` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipo_amostra_qpcr` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_amostra_veterinaria`
--

DROP TABLE IF EXISTS `tipo_amostra_veterinaria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_amostra_veterinaria` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_amostra_veterinaria`
--

LOCK TABLES `tipo_amostra_veterinaria` WRITE;
/*!40000 ALTER TABLE `tipo_amostra_veterinaria` DISABLE KEYS */;
INSERT INTO `tipo_amostra_veterinaria` VALUES (1,'Sangue'),(2,'Soro'),(3,'Medula'),(4,'Pelo'),(5,'Sangue (c/ e s/EDTA)'),(6,'Sangue (c/EDTA)'),(7,'Sangue (s/EDTA)');
/*!40000 ALTER TABLE `tipo_amostra_veterinaria` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_exame`
--

DROP TABLE IF EXISTS `tipo_exame`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_exame` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_exame`
--

LOCK TABLES `tipo_exame` WRITE;
/*!40000 ALTER TABLE `tipo_exame` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipo_exame` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_extracao`
--

DROP TABLE IF EXISTS `tipo_extracao`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_extracao` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_extracao`
--

LOCK TABLES `tipo_extracao` WRITE;
/*!40000 ALTER TABLE `tipo_extracao` DISABLE KEYS */;
/*!40000 ALTER TABLE `tipo_extracao` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_medida_corporal_necropsia`
--

DROP TABLE IF EXISTS `tipo_medida_corporal_necropsia`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_medida_corporal_necropsia` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unidade` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_medida_corporal_necropsia`
--

LOCK TABLES `tipo_medida_corporal_necropsia` WRITE;
/*!40000 ALTER TABLE `tipo_medida_corporal_necropsia` DISABLE KEYS */;
INSERT INTO `tipo_medida_corporal_necropsia` VALUES (1,'Medida Corporal 1','cm');
/*!40000 ALTER TABLE `tipo_medida_corporal_necropsia` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tipo_medida_corporal_veterinario`
--

DROP TABLE IF EXISTS `tipo_medida_corporal_veterinario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tipo_medida_corporal_veterinario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `descricao` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `unidade` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_medida_corporal_veterinario`
--

LOCK TABLES `tipo_medida_corporal_veterinario` WRITE;
/*!40000 ALTER TABLE `tipo_medida_corporal_veterinario` DISABLE KEYS */;
INSERT INTO `tipo_medida_corporal_veterinario` VALUES (1,'Tipo 01','cm'),(2,'Tipo 02','m');
/*!40000 ALTER TABLE `tipo_medida_corporal_veterinario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `token_redefinicao_senha`
--

DROP TABLE IF EXISTS `token_redefinicao_senha`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `token_redefinicao_senha` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_usuario` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `expira_em` datetime NOT NULL,
  `utilizado` tinyint(1) NOT NULL DEFAULT '0',
  `criado_em` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `token_redefinicao_senha_token_key` (`token`),
  KEY `token_redefinicao_senha_id_usuario_fkey` (`id_usuario`),
  CONSTRAINT `token_redefinicao_senha_id_usuario_fkey` FOREIGN KEY (`id_usuario`) REFERENCES `usuario` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `token_redefinicao_senha`
--

LOCK TABLES `token_redefinicao_senha` WRITE;
/*!40000 ALTER TABLE `token_redefinicao_senha` DISABLE KEYS */;
INSERT INTO `token_redefinicao_senha` VALUES ('1d1d6e68-d774-447d-a331-2fe853612d0e','84ca85ea-1347-4b64-9525-b59a12aaee56','12ccffb7-e800-4dce-bc9e-d161b7710278','2026-06-04 01:27:50.638',1,'2026-06-04 01:12:50.639'),('5373e90b-1d96-4029-aa51-2a225a1b22a6','84ca85ea-1347-4b64-9525-b59a12aaee56','a48fbd9e-17e6-4d15-b21c-0e7d09c0f9dc','2026-06-04 00:59:28.841',1,'2026-06-04 00:44:28.849'),('5fad46d2-2f86-46d7-87cb-6f7c763ee935','84ca85ea-1347-4b64-9525-b59a12aaee56','f3969b0d-b1e4-4e1e-b414-88ec44cec8d7','2026-06-04 01:11:09.370',1,'2026-06-04 00:56:09.371'),('5fcc1e8b-ffd5-4a7b-a13d-bfc7a9bc62b9','84ca85ea-1347-4b64-9525-b59a12aaee56','494288dd-0dda-4c2a-bd63-e5001449daba','2026-06-04 01:23:22.324',1,'2026-06-04 01:08:22.325'),('863772e7-8ef5-45a1-a58a-464acdfecb83','84ca85ea-1347-4b64-9525-b59a12aaee56','f6e61236-bb5d-45da-a88f-0df65c73a761','2026-06-04 01:29:49.282',1,'2026-06-04 01:14:49.282'),('e7752a5f-ffba-48ee-81fb-2c51bc99b011','84ca85ea-1347-4b64-9525-b59a12aaee56','018c6b2e-bdb4-46cd-ac18-ed2c25c4552b','2026-06-04 01:00:23.313',1,'2026-06-04 00:45:23.314');
/*!40000 ALTER TABLE `token_redefinicao_senha` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `tutor`
--

DROP TABLE IF EXISTS `tutor`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `tutor` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_genero` int NOT NULL,
  `data_nascimento` datetime NOT NULL,
  PRIMARY KEY (`id`),
  KEY `tutor_id_genero_fkey` (`id_genero`),
  CONSTRAINT `tutor_id_genero_fkey` FOREIGN KEY (`id_genero`) REFERENCES `enum_genero` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutor`
--

LOCK TABLES `tutor` WRITE;
/*!40000 ALTER TABLE `tutor` DISABLE KEYS */;
INSERT INTO `tutor` VALUES (1,'Tutor Teste 1',1,'1999-01-01 00:00:00.000');
/*!40000 ALTER TABLE `tutor` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `usuario`
--

DROP TABLE IF EXISTS `usuario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuario` (
  `id` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `senha` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_funcao` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '2',
  `userPic` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario_email_key` (`email`),
  KEY `usuario_id_funcao_fkey` (`id_funcao`),
  CONSTRAINT `usuario_id_funcao_fkey` FOREIGN KEY (`id_funcao`) REFERENCES `funcao` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuario`
--

LOCK TABLES `usuario` WRITE;
/*!40000 ALTER TABLE `usuario` DISABLE KEYS */;
INSERT INTO `usuario` VALUES ('09af1365-644c-4dd7-8a4b-f00b57024c95','Usuário Super Admin Exemplo','superadmin@exemplo.com','$2b$10$.OBvQt/OnVzFkMrrZ37/BeCrIiqsn93Ww04pxiwZKfCVyE4dHI/o2','0',NULL),('5d98ce9c-07fa-4046-b40e-54ff4c733590','Usuário Comum Exemplo','comum@exemplo.com','$2b$10$22PRwChwS218eAJNzkfrWOkwzqwSa3fantASuJoBCkKD7wzN/jqtq','2',NULL),('84ca85ea-1347-4b64-9525-b59a12aaee56','Usuário Admin Exemplo','admin@exemplo.com','$2b$10$wBU39Gj69jp2Jktjr6o2iuXzcNCn9EDdpkcQKq8Nms2UaMlUlXUpy','1',NULL);
/*!40000 ALTER TABLE `usuario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `vacina`
--

DROP TABLE IF EXISTS `vacina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `vacina` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacina`
--

LOCK TABLES `vacina` WRITE;
/*!40000 ALTER TABLE `vacina` DISABLE KEYS */;
INSERT INTO `vacina` VALUES (1,'Raiva'),(2,'V8'),(3,'Vacina 01');
/*!40000 ALTER TABLE `vacina` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `valor_exame`
--

DROP TABLE IF EXISTS `valor_exame`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `valor_exame` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_exame` int NOT NULL,
  `id_tipo_exame` int NOT NULL,
  `valor` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `id_interpretacao` int DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `valor_exame_id_exame_fkey` (`id_exame`),
  KEY `valor_exame_id_tipo_exame_fkey` (`id_tipo_exame`),
  KEY `valor_exame_id_interpretacao_fkey` (`id_interpretacao`),
  CONSTRAINT `valor_exame_id_exame_fkey` FOREIGN KEY (`id_exame`) REFERENCES `exame` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `valor_exame_id_interpretacao_fkey` FOREIGN KEY (`id_interpretacao`) REFERENCES `enum_interpretacao_valor_exame` (`id`) ON DELETE SET NULL ON UPDATE CASCADE,
  CONSTRAINT `valor_exame_id_tipo_exame_fkey` FOREIGN KEY (`id_tipo_exame`) REFERENCES `tipo_exame` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `valor_exame`
--

LOCK TABLES `valor_exame` WRITE;
/*!40000 ALTER TABLE `valor_exame` DISABLE KEYS */;
/*!40000 ALTER TABLE `valor_exame` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `veterinario`
--

DROP TABLE IF EXISTS `veterinario`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `veterinario` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `veterinario`
--

LOCK TABLES `veterinario` WRITE;
/*!40000 ALTER TABLE `veterinario` DISABLE KEYS */;
INSERT INTO `veterinario` VALUES (1,'Veterinário 02'),(2,'Veterinário 01');
/*!40000 ALTER TABLE `veterinario` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `visita_veterinaria`
--

DROP TABLE IF EXISTS `visita_veterinaria`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `visita_veterinaria` (
  `id` int NOT NULL AUTO_INCREMENT,
  `id_animal_vivo` int NOT NULL,
  `id_veterinario` int NOT NULL,
  `data` datetime NOT NULL,
  `foto_animal` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `observacao` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `visita_veterinaria_id_animal_vivo_id_veterinario_data_key` (`id_animal_vivo`,`id_veterinario`,`data`),
  KEY `visita_veterinaria_id_veterinario_fkey` (`id_veterinario`),
  CONSTRAINT `visita_veterinaria_id_animal_vivo_fkey` FOREIGN KEY (`id_animal_vivo`) REFERENCES `animal_vivo` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `visita_veterinaria_id_veterinario_fkey` FOREIGN KEY (`id_veterinario`) REFERENCES `veterinario` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visita_veterinaria`
--

LOCK TABLES `visita_veterinaria` WRITE;
/*!40000 ALTER TABLE `visita_veterinaria` DISABLE KEYS */;
INSERT INTO `visita_veterinaria` VALUES (11,1,2,'2025-12-12 12:00:00.000','https://github.com/nicolasfouv/sistema-resgistro-analise-integrada',NULL),(12,2,2,'2025-12-14 12:00:00.000',NULL,NULL);
/*!40000 ALTER TABLE `visita_veterinaria` ENABLE KEYS */;
UNLOCK TABLES;
SET @@SESSION.SQL_LOG_BIN = @MYSQLDUMP_TEMP_LOG_BIN;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-06-27 21:36:12
