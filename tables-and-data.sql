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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `agente_sorologico`
--

LOCK TABLES `agente_sorologico` WRITE;
/*!40000 ALTER TABLE `agente_sorologico` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alocacao_amostra_necropsia`
--

LOCK TABLES `alocacao_amostra_necropsia` WRITE;
/*!40000 ALTER TABLE `alocacao_amostra_necropsia` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `alocacao_amostra_veterinario`
--

LOCK TABLES `alocacao_amostra_veterinario` WRITE;
/*!40000 ALTER TABLE `alocacao_amostra_veterinario` DISABLE KEYS */;
INSERT INTO `alocacao_amostra_veterinario` VALUES (1,6,3,3,3,NULL,NULL,12);
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
  KEY `analise_ectoparasito_necropsia_id_necropsia_fkey` (`id_necropsia`),
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
  KEY `analise_ectoparasito_veterinario_id_visita_veterinaria_fkey` (`id_visita_veterinaria`),
  KEY `analise_ectoparasito_veterinario_id_genero_ectoparasito_fkey` (`id_genero_ectoparasito`),
  KEY `analise_ectoparasito_veterinario_id_especie_ectoparasito_fkey` (`id_especie_ectoparasito`),
  KEY `analise_ectoparasito_veterinario_id_subespecie_ectoparasito_fkey` (`id_subespecie_ectoparasito`),
  CONSTRAINT `analise_ectoparasito_veterinario_id_especie_ectoparasito_fkey` FOREIGN KEY (`id_especie_ectoparasito`) REFERENCES `especie_ectoparasito` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `analise_ectoparasito_veterinario_id_genero_ectoparasito_fkey` FOREIGN KEY (`id_genero_ectoparasito`) REFERENCES `genero_ectoparasito` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `analise_ectoparasito_veterinario_id_subespecie_ectoparasito_fkey` FOREIGN KEY (`id_subespecie_ectoparasito`) REFERENCES `especie_ectoparasito` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `analise_ectoparasito_veterinario_id_visita_veterinaria_fkey` FOREIGN KEY (`id_visita_veterinaria`) REFERENCES `visita_veterinaria` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `analise_ectoparasito_veterinario`
--

LOCK TABLES `analise_ectoparasito_veterinario` WRITE;
/*!40000 ALTER TABLE `analise_ectoparasito_veterinario` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `analise_fezes`
--

LOCK TABLES `analise_fezes` WRITE;
/*!40000 ALTER TABLE `analise_fezes` DISABLE KEYS */;
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
  KEY `analise_molecular_id_analise_fezes_fkey` (`id_analise_fezes`),
  KEY `analise_molecular_id_especie_ovo_cisto_fkey` (`id_especie_ovo_cisto`),
  CONSTRAINT `analise_molecular_id_analise_fezes_fkey` FOREIGN KEY (`id_analise_fezes`) REFERENCES `analise_fezes` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `analise_molecular_id_especie_ovo_cisto_fkey` FOREIGN KEY (`id_especie_ovo_cisto`) REFERENCES `especie_ovo_cisto` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `analise_molecular`
--

LOCK TABLES `analise_molecular` WRITE;
/*!40000 ALTER TABLE `analise_molecular` DISABLE KEYS */;
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
  KEY `analise_ovo_cisto_id_analise_fezes_fkey` (`id_analise_fezes`),
  KEY `analise_ovo_cisto_id_especie_ovo_cisto_fkey` (`id_especie_ovo_cisto`),
  CONSTRAINT `analise_ovo_cisto_id_analise_fezes_fkey` FOREIGN KEY (`id_analise_fezes`) REFERENCES `analise_fezes` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `analise_ovo_cisto_id_especie_ovo_cisto_fkey` FOREIGN KEY (`id_especie_ovo_cisto`) REFERENCES `especie_ovo_cisto` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `analise_ovo_cisto`
--

LOCK TABLES `analise_ovo_cisto` WRITE;
/*!40000 ALTER TABLE `analise_ovo_cisto` DISABLE KEYS */;
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
  `id_amostra` int NOT NULL,
  `id_teste_sorologico` int NOT NULL,
  `id_agente_sorologico` int NOT NULL,
  `ponto_corte` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  `resultado` double NOT NULL,
  `id_interpretacao` int NOT NULL,
  PRIMARY KEY (`id`),
  KEY `analise_sorologica_id_visita_veterinaria_fkey` (`id_visita_veterinaria`),
  KEY `analise_sorologica_id_amostra_fkey` (`id_amostra`),
  KEY `analise_sorologica_id_teste_sorologico_fkey` (`id_teste_sorologico`),
  KEY `analise_sorologica_id_agente_sorologico_fkey` (`id_agente_sorologico`),
  KEY `analise_sorologica_id_interpretacao_fkey` (`id_interpretacao`),
  CONSTRAINT `analise_sorologica_id_agente_sorologico_fkey` FOREIGN KEY (`id_agente_sorologico`) REFERENCES `agente_sorologico` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `analise_sorologica_id_amostra_fkey` FOREIGN KEY (`id_amostra`) REFERENCES `alocacao_amostra_veterinario` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `analise_sorologica_id_interpretacao_fkey` FOREIGN KEY (`id_interpretacao`) REFERENCES `enum_interpretacao_analise_sorologica` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `analise_sorologica_id_teste_sorologico_fkey` FOREIGN KEY (`id_teste_sorologico`) REFERENCES `teste_sorologico` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `analise_sorologica_id_visita_veterinaria_fkey` FOREIGN KEY (`id_visita_veterinaria`) REFERENCES `visita_veterinaria` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `analise_sorologica`
--

LOCK TABLES `analise_sorologica` WRITE;
/*!40000 ALTER TABLE `analise_sorologica` DISABLE KEYS */;
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
  PRIMARY KEY (`id`),
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animal_morto`
--

LOCK TABLES `animal_morto` WRITE;
/*!40000 ALTER TABLE `animal_morto` DISABLE KEYS */;
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
  PRIMARY KEY (`id`),
  KEY `animal_vivo_id_especie_fkey` (`id_especie`),
  KEY `animal_vivo_id_genero_fkey` (`id_genero`),
  CONSTRAINT `animal_vivo_id_especie_fkey` FOREIGN KEY (`id_especie`) REFERENCES `especie` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `animal_vivo_id_genero_fkey` FOREIGN KEY (`id_genero`) REFERENCES `enum_genero_animal` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `animal_vivo`
--

LOCK TABLES `animal_vivo` WRITE;
/*!40000 ALTER TABLE `animal_vivo` DISABLE KEYS */;
INSERT INTO `animal_vivo` VALUES (1,1,'Animal Teste 1',1,'2024-02-01 00:00:00.000',1),(2,1,'Animal Teste 2',2,'2025-10-01 00:00:00.000',1);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aplicacao_vacina`
--

LOCK TABLES `aplicacao_vacina` WRITE;
/*!40000 ALTER TABLE `aplicacao_vacina` DISABLE KEYS */;
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
INSERT INTO `auditlog` VALUES ('01c9ef87-7a6c-4f6e-ad42-669d596f2f7b','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 23:04:33.263','SUBMIT','visitaveterinaria'),('05cf41fb-536b-4d42-94f4-089ca006e73f','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 22:17:28.307','SUBMIT','visitaveterinaria'),('074f6095-c982-456f-8664-c896930c252c','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 20:37:36.643','SUBMIT','visitaveterinaria'),('081839b7-b425-4675-bcfa-b67ce0e7eda6','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 23:00:53.287','SUBMIT','visitaveterinaria'),('086119fd-1cb2-44a8-8bc6-d98a66db35b7','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 22:38:19.361','SUBMIT','visitaveterinaria'),('0be3fdc9-8f27-490f-ac27-354e9265fd3c','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 23:08:32.733','SUBMIT','visitaveterinaria'),('0cb3f461-4c9e-47c5-8a65-590fb5afe5b3','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 23:06:38.557','SUBMIT','visitaveterinaria'),('10e72f28-f728-403c-9f0b-77d71072919c','5d98ce9c-07fa-4046-b40e-54ff4c733590','2026-03-16 18:33:31.904','SUBMIT','visitaveterinaria'),('2077eeba-af7a-493c-afd8-c16e357c7695','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 23:03:29.452','SUBMIT','visitaveterinaria'),('2506dc55-334f-4720-82db-441e698b70c1','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 23:01:01.434','SUBMIT','visitaveterinaria'),('28cfb68c-6d1d-4a3d-aa17-f69aa66b0090','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-06 12:56:35.192','SUBMIT','visitaveterinaria'),('2af5a155-73d1-46cf-9fe3-4a1901825305','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 20:49:32.475','SUBMIT','visitaveterinaria'),('2c4957a6-1038-4a3e-9ae7-71d36675bbb6','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-16 19:02:55.514','SUBMIT','visitaveterinaria'),('2e0e9e73-d904-4181-9999-f6ee576fff01','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-19 21:29:56.433','SUBMIT','visitaveterinaria'),('30c2e078-f77a-478c-91bd-3b8f5575b2bf','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 23:03:23.710','SUBMIT','visitaveterinaria'),('37eca6db-12b1-4f2e-bee1-71878e36dcab','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-17 22:33:10.581','SUBMIT','visitaveterinaria'),('3cf196b8-a895-42f5-9692-fb464cdab99f','5d98ce9c-07fa-4046-b40e-54ff4c733590','2026-03-20 20:24:35.982','SUBMIT','visitaveterinaria'),('3d9ce133-72d3-44f7-b65d-e9f4f84a74f7','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-16 20:41:43.390','SUBMIT','visitaveterinaria'),('40bf7da6-d1c7-4719-a076-e411fa4e2927','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 22:39:32.713','SUBMIT','visitaveterinaria'),('42620b8d-d8a5-482c-95f6-2a65a433dd94','5d98ce9c-07fa-4046-b40e-54ff4c733590','2026-03-17 22:54:12.624','SUBMIT','visitaveterinaria'),('4a568606-72ec-40f3-a19b-27f90475539f','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 23:04:18.636','SUBMIT','visitaveterinaria'),('4db34fb6-2c1e-43c0-8c72-76c78e1c4ba7','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 23:16:33.373','SUBMIT','visitaveterinaria'),('544bdbcb-e2c5-4dd7-8ffb-99860cd1d08b','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 20:33:22.040','SUBMIT','visitaveterinaria'),('580e797d-1f4a-4e34-b615-549ccdffcfdb','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 22:39:31.249','SUBMIT','visitaveterinaria'),('5bfa634e-5d00-4806-a4ab-32b760084a87','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-17 22:32:54.979','SUBMIT','visitaveterinaria'),('5eb2488a-2c86-4a7c-a120-45260e24087e','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 23:09:47.986','SUBMIT','visitaveterinaria'),('5fba3d3d-fdf4-4afd-8c50-4739da1f2e8d','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 22:34:06.913','SUBMIT','visitaveterinaria'),('6c51c92d-942e-479c-89b7-ccd7229f1ca6','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-06 12:23:06.746','SUBMIT','visitaveterinaria'),('6d739878-1663-47e7-b7c1-6cfb5010f2a2','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 23:08:47.959','SUBMIT','visitaveterinaria'),('6e91608f-f828-4e76-b6b6-188aa0cdfeb4','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 22:30:42.786','SUBMIT','visitaveterinaria'),('79b1a19b-539d-43a8-9cfe-717e7aa3e27c','09af1365-644c-4dd7-8a4b-f00b57024c95','2026-03-13 13:41:11.678','SUBMIT','visitaveterinaria'),('7b5d3709-613f-4a80-b105-a5eb3f52961b','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 23:08:55.252','SUBMIT','visitaveterinaria'),('7f9ebe55-b877-4903-8217-0a5369b39c13','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 22:39:48.460','SUBMIT','visitaveterinaria'),('7ffa13f7-8450-4b96-b70d-b0002c9b0b57','5d98ce9c-07fa-4046-b40e-54ff4c733590','2026-03-17 22:53:58.008','SUBMIT','visitaveterinaria'),('817352e6-6b83-4df2-8824-f1659381345e','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 22:40:15.244','SUBMIT','visitaveterinaria'),('81a15b07-40ec-4b97-b24f-37b03eb899a3','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 22:38:37.853','SUBMIT','visitaveterinaria'),('822ded34-7159-47a7-8dae-f49e3d66b276','5d98ce9c-07fa-4046-b40e-54ff4c733590','2026-03-25 20:53:37.690','SUBMIT','amostras-av'),('83ecd3f7-19df-4934-9f84-79d6fed00f52','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 23:08:22.244','SUBMIT','visitaveterinaria'),('917873a6-6f55-4171-9550-347ec9e60ae4','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 23:08:25.630','SUBMIT','visitaveterinaria'),('9ad26f59-248f-4e16-93ca-73c86c170f6e','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 23:06:30.723','SUBMIT','visitaveterinaria'),('ad018eba-50bf-40b6-a22a-133a1183b8d7','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 23:13:10.416','SUBMIT','visitaveterinaria'),('ce659046-286e-46a7-8524-8ee18e223d1a','5d98ce9c-07fa-4046-b40e-54ff4c733590','2026-03-16 18:33:48.192','SUBMIT','visitaveterinaria'),('d42b505f-05f1-4427-963f-4481ac42d0f5','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-16 20:59:28.040','SUBMIT','visitaveterinaria'),('dec2ee50-55f2-4ae7-9159-7d98343ab431','5d98ce9c-07fa-4046-b40e-54ff4c733590','2026-03-25 20:53:17.384','SUBMIT','visitaveterinaria'),('e39da10b-b4e1-446b-9641-8ca116816074','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-16 20:51:42.530','SUBMIT','visitaveterinaria'),('ecbad320-07ef-4236-8013-a14cb3d06acd','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-17 22:33:01.873','SUBMIT','visitaveterinaria'),('efd54900-7fc8-468e-a174-3466b12ce50b','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 22:17:21.297','SUBMIT','visitaveterinaria'),('f0dad485-34cb-492f-a4ca-fc5b8619bffe','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-16 20:59:40.346','SUBMIT','visitaveterinaria'),('fe5ecf04-3306-414b-bf19-da23c8dddb85','84ca85ea-1347-4b64-9525-b59a12aaee56','2026-03-09 23:08:38.260','SUBMIT','visitaveterinaria');
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
INSERT INTO `autorizacao_grupo` VALUES ('001','entr','analiseectoparasitos-am','read'),('002','entr','analiseectoparasitos-av','read'),('003','entr','analisefezes','read'),('004','entr','analisehelmintos','read'),('005','entr','analisemolecular','read'),('006','entr','analiseovocistos','read'),('007','entr','animal-am','read'),('008','entr','animal-av','edit'),('009','entr','entrevista','edit'),('010','entr','especiesanimaisvivosmortos','edit'),('011','entr','necropsia','read'),('012','entr','rastreiogps','edit'),('013','entr','resultadoexame-am','read'),('014','entr','resultadoexame-av','read'),('015','entr','resultadosorologico','read'),('016','entr','tutor','edit'),('017','entr','vacina','read'),('018','entr','visitaveterinaria','read'),('101','leg','analiseectoparasitos-am','read'),('102','leg','analiseectoparasitos-av','read'),('103','leg','analisefezes','read'),('104','leg','analisehelmintos','edit'),('105','leg','analisemolecular','read'),('106','leg','analiseovocistos','read'),('107','leg','animal-am','edit'),('108','leg','animal-av','read'),('109','leg','entrevista','read'),('110','leg','especiesanimaisvivosmortos','edit'),('111','leg','necropsia','edit'),('112','leg','rastreiogps','read'),('113','leg','resultadoexame-am','read'),('114','leg','resultadoexame-av','read'),('115','leg','resultadosorologico','read'),('116','leg','tutor','read'),('117','leg','vacina','read'),('118','leg','visitaveterinaria','read'),('201','pesqecto','analiseectoparasitos-am','edit'),('202','pesqecto','analiseectoparasitos-av','edit'),('203','pesqecto','analisefezes','read'),('204','pesqecto','analisehelmintos','read'),('205','pesqecto','analisemolecular','read'),('206','pesqecto','analiseovocistos','read'),('207','pesqecto','animal-am','read'),('208','pesqecto','animal-av','read'),('209','pesqecto','entrevista','read'),('210','pesqecto','especiesanimaisvivosmortos','read'),('211','pesqecto','necropsia','read'),('212','pesqecto','rastreiogps','read'),('213','pesqecto','resultadoexame-am','read'),('214','pesqecto','resultadoexame-av','read'),('215','pesqecto','resultadosorologico','read'),('216','pesqecto','tutor','read'),('217','pesqecto','vacina','read'),('218','pesqecto','visitaveterinaria','read'),('301','pesqfez','analiseectoparasitos-am','read'),('302','pesqfez','analiseectoparasitos-av','read'),('303','pesqfez','analisefezes','edit'),('304','pesqfez','analisehelmintos','read'),('305','pesqfez','analisemolecular','edit'),('306','pesqfez','analiseovocistos','edit'),('307','pesqfez','animal-am','read'),('308','pesqfez','animal-av','read'),('309','pesqfez','entrevista','read'),('310','pesqfez','especiesanimaisvivosmortos','read'),('311','pesqfez','necropsia','read'),('312','pesqfez','rastreiogps','read'),('313','pesqfez','resultadoexame-am','read'),('314','pesqfez','resultadoexame-av','read'),('315','pesqfez','resultadosorologico','read'),('316','pesqfez','tutor','read'),('317','pesqfez','vacina','read'),('318','pesqfez','visitaveterinaria','read'),('401','pesqhelm','analiseectoparasitos-am','read'),('402','pesqhelm','analiseectoparasitos-av','read'),('403','pesqhelm','analisefezes','edit'),('404','pesqhelm','analisehelmintos','edit'),('405','pesqhelm','analisemolecular','read'),('406','pesqhelm','analiseovocistos','edit'),('407','pesqhelm','animal-am','read'),('408','pesqhelm','animal-av','read'),('409','pesqhelm','entrevista','read'),('410','pesqhelm','especiesanimaisvivosmortos','read'),('411','pesqhelm','necropsia','read'),('412','pesqhelm','rastreiogps','read'),('413','pesqhelm','resultadoexame-am','read'),('414','pesqhelm','resultadoexame-av','read'),('415','pesqhelm','resultadosorologico','read'),('416','pesqhelm','tutor','read'),('417','pesqhelm','vacina','read'),('418','pesqhelm','visitaveterinaria','read'),('501','pesqsor','analiseectoparasitos-am','read'),('502','pesqsor','analiseectoparasitos-av','read'),('503','pesqsor','analisefezes','read'),('504','pesqsor','analisehelmintos','read'),('505','pesqsor','analisemolecular','read'),('506','pesqsor','analiseovocistos','read'),('507','pesqsor','animal-am','read'),('508','pesqsor','animal-av','read'),('509','pesqsor','entrevista','read'),('510','pesqsor','especiesanimaisvivosmortos','read'),('511','pesqsor','necropsia','read'),('512','pesqsor','rastreiogps','read'),('513','pesqsor','resultadoexame-am','edit'),('514','pesqsor','resultadoexame-av','edit'),('515','pesqsor','resultadosorologico','edit'),('516','pesqsor','tutor','read'),('517','pesqsor','vacina','read'),('518','pesqsor','visitaveterinaria','read'),('601','vet','analiseectoparasitos-am','read'),('602','vet','analiseectoparasitos-av','read'),('603','vet','analisefezes','edit'),('604','vet','analisehelmintos','read'),('605','vet','analisemolecular','edit'),('606','vet','analiseovocistos','edit'),('607','vet','animal-am','read'),('608','vet','animal-av','edit'),('609','vet','entrevista','read'),('610','vet','especiesanimaisvivosmortos','edit'),('611','vet','necropsia','read'),('612','vet','rastreiogps','read'),('613','vet','resultadoexame-am','read'),('614','vet','resultadoexame-av','read'),('615','vet','resultadosorologico','read'),('616','vet','tutor','edit'),('617','vet','vacina','edit'),('618','vet','visitaveterinaria','edit');
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
INSERT INTO `autorizacao_usuario` VALUES ('3e934db2-c1f8-47da-9daa-18a21f290925','b5b7be60-4ded-4937-bad8-af5dbb611bdb','visitaveterinaria','read'),('8630fb4f-6a49-4f60-80b0-985fb814d43b','5d98ce9c-07fa-4046-b40e-54ff4c733590','amostras-av','edit'),('ee45f928-2819-4e9c-9058-318b5a658052','5d98ce9c-07fa-4046-b40e-54ff4c733590','visitaveterinaria','edit');
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
  `id_visita_veterinaria` int NOT NULL,
  `data` datetime NOT NULL,
  `observacao` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `castracao_id_animal_vivo_key` (`id_animal_vivo`),
  UNIQUE KEY `castracao_id_visita_veterinaria_key` (`id_visita_veterinaria`),
  CONSTRAINT `castracao_id_animal_vivo_fkey` FOREIGN KEY (`id_animal_vivo`) REFERENCES `animal_vivo` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `castracao_id_visita_veterinaria_fkey` FOREIGN KEY (`id_visita_veterinaria`) REFERENCES `visita_veterinaria` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `castracao`
--

LOCK TABLES `castracao` WRITE;
/*!40000 ALTER TABLE `castracao` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=113 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `changelog`
--

LOCK TABLES `changelog` WRITE;
/*!40000 ALTER TABLE `changelog` DISABLE KEYS */;
INSERT INTO `changelog` VALUES (1,'6c51c92d-942e-479c-89b7-ccd7229f1ca6','veterinarianVisit','31170777-e96a-46ab-b9ad-1a64cdea3125','CREATE',NULL,'{\"id\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"date\": \"2026-03-05T00:00:00.000Z\", \"cardLink\": \"https://translate.google.com/?hl=pt-BR&tab=wT&sl=en&tl=pt&op=translate\", \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(2,'6c51c92d-942e-479c-89b7-ccd7229f1ca6','bodyMeasurementVeterinarian','1037fc15-8b1a-472b-a5b4-b7dbe2fc3932','CREATE',NULL,'{\"id\": \"1037fc15-8b1a-472b-a5b4-b7dbe2fc3932\", \"value\": 13, \"veterinarianVisitId\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"bodyMeasurementTypeId\": \"01test\"}'),(3,'28cfb68c-6d1d-4a3d-aa17-f69aa66b0090','veterinarianVisit','31170777-e96a-46ab-b9ad-1a64cdea3125','UPDATE','{\"id\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"date\": \"2026-03-05T00:00:00.000Z\", \"cardLink\": \"https://translate.google.com/?hl=pt-BR&tab=wT&sl=en&tl=pt&op=translate\", \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"1037fc15-8b1a-472b-a5b4-b7dbe2fc3932\", \"value\": 13, \"veterinarianVisitId\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"bodyMeasurementTypeId\": \"01test\"}]}','{\"id\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"date\": \"2026-04-03T00:00:00.000Z\", \"cardLink\": \"https://translate.google.com/?hl=pt-BR&tab=wT&sl=en&tl=pt&op=translate\", \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(4,'28cfb68c-6d1d-4a3d-aa17-f69aa66b0090','bodyMeasurementVeterinarian','1037fc15-8b1a-472b-a5b4-b7dbe2fc3932','DELETE','{\"id\": \"1037fc15-8b1a-472b-a5b4-b7dbe2fc3932\", \"value\": 13, \"veterinarianVisitId\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(5,'28cfb68c-6d1d-4a3d-aa17-f69aa66b0090','bodyMeasurementVeterinarian','c8dd7376-951a-4bac-beee-567717fef7e2','CREATE',NULL,'{\"id\": \"c8dd7376-951a-4bac-beee-567717fef7e2\", \"value\": 13, \"veterinarianVisitId\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"bodyMeasurementTypeId\": \"01test\"}'),(6,'28cfb68c-6d1d-4a3d-aa17-f69aa66b0090','bodyMeasurementVeterinarian','b30f79cd-20f2-4fd1-b437-884ce85adbeb','CREATE',NULL,'{\"id\": \"b30f79cd-20f2-4fd1-b437-884ce85adbeb\", \"value\": 0, \"veterinarianVisitId\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"bodyMeasurementTypeId\": \"01test\"}'),(7,'28cfb68c-6d1d-4a3d-aa17-f69aa66b0090','bodyMeasurementVeterinarian','7168dc5f-d499-494d-b1df-34337137a6fb','CREATE',NULL,'{\"id\": \"7168dc5f-d499-494d-b1df-34337137a6fb\", \"value\": 0, \"veterinarianVisitId\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"bodyMeasurementTypeId\": \"01test\"}'),(8,'28cfb68c-6d1d-4a3d-aa17-f69aa66b0090','bodyMeasurementVeterinarian','81a8fa3c-2723-4bae-a07c-bf1f007f0aba','CREATE',NULL,'{\"id\": \"81a8fa3c-2723-4bae-a07c-bf1f007f0aba\", \"value\": 0, \"veterinarianVisitId\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"bodyMeasurementTypeId\": \"01test\"}'),(9,'28cfb68c-6d1d-4a3d-aa17-f69aa66b0090','bodyMeasurementVeterinarian','d20c12c9-a495-4a15-bf75-ede046627313','CREATE',NULL,'{\"id\": \"d20c12c9-a495-4a15-bf75-ede046627313\", \"value\": 0, \"veterinarianVisitId\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"bodyMeasurementTypeId\": \"01test\"}'),(10,'544bdbcb-e2c5-4dd7-8ffb-99860cd1d08b','veterinarianVisit','V-001','CREATE',NULL,'{\"id\": \"V-001\", \"date\": \"2025-03-12T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(11,'074f6095-c982-456f-8664-c896930c252c','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2025-03-12T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": []}','{\"id\": \"V-001\", \"date\": \"2025-11-03T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(12,'2af5a155-73d1-46cf-9fe3-4a1901825305','bodyMeasurementVeterinarian','7168dc5f-d499-494d-b1df-34337137a6fb','DELETE','{\"id\": \"7168dc5f-d499-494d-b1df-34337137a6fb\", \"value\": 0, \"veterinarianVisitId\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(13,'2af5a155-73d1-46cf-9fe3-4a1901825305','bodyMeasurementVeterinarian','81a8fa3c-2723-4bae-a07c-bf1f007f0aba','DELETE','{\"id\": \"81a8fa3c-2723-4bae-a07c-bf1f007f0aba\", \"value\": 0, \"veterinarianVisitId\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(14,'2af5a155-73d1-46cf-9fe3-4a1901825305','bodyMeasurementVeterinarian','b30f79cd-20f2-4fd1-b437-884ce85adbeb','DELETE','{\"id\": \"b30f79cd-20f2-4fd1-b437-884ce85adbeb\", \"value\": 0, \"veterinarianVisitId\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(15,'2af5a155-73d1-46cf-9fe3-4a1901825305','bodyMeasurementVeterinarian','c8dd7376-951a-4bac-beee-567717fef7e2','DELETE','{\"id\": \"c8dd7376-951a-4bac-beee-567717fef7e2\", \"value\": 13, \"veterinarianVisitId\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(16,'2af5a155-73d1-46cf-9fe3-4a1901825305','bodyMeasurementVeterinarian','d20c12c9-a495-4a15-bf75-ede046627313','DELETE','{\"id\": \"d20c12c9-a495-4a15-bf75-ede046627313\", \"value\": 0, \"veterinarianVisitId\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(17,'2af5a155-73d1-46cf-9fe3-4a1901825305','veterinarianVisit','31170777-e96a-46ab-b9ad-1a64cdea3125','DELETE','{\"id\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"date\": \"2026-04-03T00:00:00.000Z\", \"cardLink\": \"https://translate.google.com/?hl=pt-BR&tab=wT&sl=en&tl=pt&op=translate\", \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"7168dc5f-d499-494d-b1df-34337137a6fb\", \"value\": 0, \"veterinarianVisitId\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"bodyMeasurementTypeId\": \"01test\"}, {\"id\": \"81a8fa3c-2723-4bae-a07c-bf1f007f0aba\", \"value\": 0, \"veterinarianVisitId\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"bodyMeasurementTypeId\": \"01test\"}, {\"id\": \"b30f79cd-20f2-4fd1-b437-884ce85adbeb\", \"value\": 0, \"veterinarianVisitId\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"bodyMeasurementTypeId\": \"01test\"}, {\"id\": \"c8dd7376-951a-4bac-beee-567717fef7e2\", \"value\": 13, \"veterinarianVisitId\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"bodyMeasurementTypeId\": \"01test\"}, {\"id\": \"d20c12c9-a495-4a15-bf75-ede046627313\", \"value\": 0, \"veterinarianVisitId\": \"31170777-e96a-46ab-b9ad-1a64cdea3125\", \"bodyMeasurementTypeId\": \"01test\"}]}',NULL),(18,'efd54900-7fc8-468e-a174-3466b12ce50b','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2025-11-03T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": []}','{\"id\": \"V-001\", \"date\": \"2025-02-11T00:00:00.000Z\", \"cardLink\": \"Teste\", \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(19,'05cf41fb-536b-4d42-94f4-089ca006e73f','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2025-02-11T00:00:00.000Z\", \"cardLink\": \"Teste\", \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": []}','{\"id\": \"V-001\", \"date\": \"2025-10-02T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(20,'6e91608f-f828-4e76-b6b6-188aa0cdfeb4','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2025-10-02T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": []}','{\"id\": \"V-001\", \"date\": \"2025-01-10T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(21,'6e91608f-f828-4e76-b6b6-188aa0cdfeb4','bodyMeasurementVeterinarian','54481e28-3b81-4d1d-9a01-557faf6c961a','CREATE',NULL,'{\"id\": \"54481e28-3b81-4d1d-9a01-557faf6c961a\", \"value\": 0, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(22,'5fba3d3d-fdf4-4afd-8c50-4739da1f2e8d','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2025-01-10T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"54481e28-3b81-4d1d-9a01-557faf6c961a\", \"value\": 0, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}]}','{\"id\": \"V-001\", \"date\": \"2025-09-01T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(23,'5fba3d3d-fdf4-4afd-8c50-4739da1f2e8d','bodyMeasurementVeterinarian','54481e28-3b81-4d1d-9a01-557faf6c961a','DELETE','{\"id\": \"54481e28-3b81-4d1d-9a01-557faf6c961a\", \"value\": 0, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(24,'5fba3d3d-fdf4-4afd-8c50-4739da1f2e8d','bodyMeasurementVeterinarian','15af529f-a32e-469f-ba16-7974a5e8757a','CREATE',NULL,'{\"id\": \"15af529f-a32e-469f-ba16-7974a5e8757a\", \"value\": -0.03, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(25,'086119fd-1cb2-44a8-8bc6-d98a66db35b7','bodyMeasurementVeterinarian','15af529f-a32e-469f-ba16-7974a5e8757a','DELETE','{\"id\": \"15af529f-a32e-469f-ba16-7974a5e8757a\", \"value\": -0.03, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(26,'086119fd-1cb2-44a8-8bc6-d98a66db35b7','veterinarianVisit','V-001','DELETE','{\"id\": \"V-001\", \"date\": \"2025-09-01T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"15af529f-a32e-469f-ba16-7974a5e8757a\", \"value\": -0.03, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}]}',NULL),(27,'81a15b07-40ec-4b97-b24f-37b03eb899a3','veterinarianVisit','V-001','CREATE',NULL,'{\"id\": \"V-001\", \"date\": \"2026-03-12T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(28,'580e797d-1f4a-4e34-b615-549ccdffcfdb','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-03-12T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": []}','{\"id\": \"V-001\", \"date\": \"2026-02-28T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(29,'40bf7da6-d1c7-4719-a076-e411fa4e2927','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-02-28T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": []}','{\"id\": \"V-001\", \"date\": \"2026-02-28T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(30,'7f9ebe55-b877-4903-8217-0a5369b39c13','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-02-28T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": []}','{\"id\": \"V-001\", \"date\": \"2026-02-28T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(31,'817352e6-6b83-4df2-8824-f1659381345e','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-02-28T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": []}','{\"id\": \"V-001\", \"date\": \"2026-11-25T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(32,'081839b7-b425-4675-bcfa-b67ce0e7eda6','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-11-25T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": []}','{\"id\": \"V-001\", \"date\": \"2026-11-11T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(33,'2506dc55-334f-4720-82db-441e698b70c1','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-11-11T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": []}','{\"id\": \"V-001\", \"date\": \"2026-11-25T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(34,'2506dc55-334f-4720-82db-441e698b70c1','bodyMeasurementVeterinarian','0f6f76ae-3aed-49b6-a8c8-ecf2d07e7b69','CREATE',NULL,'{\"id\": \"0f6f76ae-3aed-49b6-a8c8-ecf2d07e7b69\", \"value\": 0, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(35,'30c2e078-f77a-478c-91bd-3b8f5575b2bf','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-11-25T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"0f6f76ae-3aed-49b6-a8c8-ecf2d07e7b69\", \"value\": 0, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}]}','{\"id\": \"V-001\", \"date\": \"2026-11-25T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(36,'30c2e078-f77a-478c-91bd-3b8f5575b2bf','bodyMeasurementVeterinarian','0f6f76ae-3aed-49b6-a8c8-ecf2d07e7b69','DELETE','{\"id\": \"0f6f76ae-3aed-49b6-a8c8-ecf2d07e7b69\", \"value\": 0, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(37,'30c2e078-f77a-478c-91bd-3b8f5575b2bf','bodyMeasurementVeterinarian','64b5ee84-0704-4a93-be12-f3196d5ab58e','CREATE',NULL,'{\"id\": \"64b5ee84-0704-4a93-be12-f3196d5ab58e\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(38,'2077eeba-af7a-493c-afd8-c16e357c7695','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-11-25T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"64b5ee84-0704-4a93-be12-f3196d5ab58e\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}]}','{\"id\": \"V-001\", \"date\": \"2026-11-11T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(39,'2077eeba-af7a-493c-afd8-c16e357c7695','bodyMeasurementVeterinarian','64b5ee84-0704-4a93-be12-f3196d5ab58e','DELETE','{\"id\": \"64b5ee84-0704-4a93-be12-f3196d5ab58e\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(40,'2077eeba-af7a-493c-afd8-c16e357c7695','bodyMeasurementVeterinarian','3a52a851-a637-41ef-a8d8-130f52968511','CREATE',NULL,'{\"id\": \"3a52a851-a637-41ef-a8d8-130f52968511\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(41,'4a568606-72ec-40f3-a19b-27f90475539f','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-11-11T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"3a52a851-a637-41ef-a8d8-130f52968511\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}]}','{\"id\": \"V-001\", \"date\": \"2026-11-25T00:00:00.000Z\", \"cardLink\": \"test\", \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(42,'4a568606-72ec-40f3-a19b-27f90475539f','bodyMeasurementVeterinarian','3a52a851-a637-41ef-a8d8-130f52968511','DELETE','{\"id\": \"3a52a851-a637-41ef-a8d8-130f52968511\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(43,'4a568606-72ec-40f3-a19b-27f90475539f','bodyMeasurementVeterinarian','e8f4efb0-3de4-4958-a440-f76d13f62f03','CREATE',NULL,'{\"id\": \"e8f4efb0-3de4-4958-a440-f76d13f62f03\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(44,'01c9ef87-7a6c-4f6e-ad42-669d596f2f7b','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-11-25T00:00:00.000Z\", \"cardLink\": \"test\", \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"e8f4efb0-3de4-4958-a440-f76d13f62f03\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}]}','{\"id\": \"V-001\", \"date\": \"2026-11-25T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(45,'01c9ef87-7a6c-4f6e-ad42-669d596f2f7b','bodyMeasurementVeterinarian','e8f4efb0-3de4-4958-a440-f76d13f62f03','DELETE','{\"id\": \"e8f4efb0-3de4-4958-a440-f76d13f62f03\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(46,'01c9ef87-7a6c-4f6e-ad42-669d596f2f7b','bodyMeasurementVeterinarian','fba18c42-6567-4895-b63c-71bf53f85e43','CREATE',NULL,'{\"id\": \"fba18c42-6567-4895-b63c-71bf53f85e43\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(47,'9ad26f59-248f-4e16-93ca-73c86c170f6e','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-11-25T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"fba18c42-6567-4895-b63c-71bf53f85e43\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}]}','{\"id\": \"V-001\", \"date\": \"2026-11-25T00:00:00.000Z\", \"cardLink\": \"teste\", \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(48,'9ad26f59-248f-4e16-93ca-73c86c170f6e','bodyMeasurementVeterinarian','fba18c42-6567-4895-b63c-71bf53f85e43','DELETE','{\"id\": \"fba18c42-6567-4895-b63c-71bf53f85e43\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(49,'9ad26f59-248f-4e16-93ca-73c86c170f6e','bodyMeasurementVeterinarian','1c8b8657-e25a-4930-bb3f-89c478bff439','CREATE',NULL,'{\"id\": \"1c8b8657-e25a-4930-bb3f-89c478bff439\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(50,'0cb3f461-4c9e-47c5-8a65-590fb5afe5b3','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-11-25T00:00:00.000Z\", \"cardLink\": \"teste\", \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"1c8b8657-e25a-4930-bb3f-89c478bff439\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}]}','{\"id\": \"V-001\", \"date\": \"2026-11-25T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(51,'0cb3f461-4c9e-47c5-8a65-590fb5afe5b3','bodyMeasurementVeterinarian','1c8b8657-e25a-4930-bb3f-89c478bff439','DELETE','{\"id\": \"1c8b8657-e25a-4930-bb3f-89c478bff439\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(52,'0cb3f461-4c9e-47c5-8a65-590fb5afe5b3','bodyMeasurementVeterinarian','ced5cfa0-158b-4c85-ac70-f4ce982623ea','CREATE',NULL,'{\"id\": \"ced5cfa0-158b-4c85-ac70-f4ce982623ea\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(53,'83ecd3f7-19df-4934-9f84-79d6fed00f52','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-11-25T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"ced5cfa0-158b-4c85-ac70-f4ce982623ea\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}]}','{\"id\": \"V-001\", \"date\": \"2026-11-11T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(54,'83ecd3f7-19df-4934-9f84-79d6fed00f52','bodyMeasurementVeterinarian','ced5cfa0-158b-4c85-ac70-f4ce982623ea','DELETE','{\"id\": \"ced5cfa0-158b-4c85-ac70-f4ce982623ea\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(55,'83ecd3f7-19df-4934-9f84-79d6fed00f52','bodyMeasurementVeterinarian','7f1c5f59-0d22-460e-8df8-3537eaf21835','CREATE',NULL,'{\"id\": \"7f1c5f59-0d22-460e-8df8-3537eaf21835\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(56,'917873a6-6f55-4171-9550-347ec9e60ae4','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-11-11T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"7f1c5f59-0d22-460e-8df8-3537eaf21835\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}]}','{\"id\": \"V-001\", \"date\": \"2026-11-11T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(57,'917873a6-6f55-4171-9550-347ec9e60ae4','bodyMeasurementVeterinarian','7f1c5f59-0d22-460e-8df8-3537eaf21835','DELETE','{\"id\": \"7f1c5f59-0d22-460e-8df8-3537eaf21835\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(58,'917873a6-6f55-4171-9550-347ec9e60ae4','bodyMeasurementVeterinarian','839d8192-6233-49bc-87a1-37f186fa21b8','CREATE',NULL,'{\"id\": \"839d8192-6233-49bc-87a1-37f186fa21b8\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(59,'0be3fdc9-8f27-490f-ac27-354e9265fd3c','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-11-11T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"839d8192-6233-49bc-87a1-37f186fa21b8\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}]}','{\"id\": \"V-001\", \"date\": \"2026-11-11T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(60,'0be3fdc9-8f27-490f-ac27-354e9265fd3c','bodyMeasurementVeterinarian','839d8192-6233-49bc-87a1-37f186fa21b8','DELETE','{\"id\": \"839d8192-6233-49bc-87a1-37f186fa21b8\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(61,'0be3fdc9-8f27-490f-ac27-354e9265fd3c','bodyMeasurementVeterinarian','664319d8-3890-4cc1-9584-529f56332aea','CREATE',NULL,'{\"id\": \"664319d8-3890-4cc1-9584-529f56332aea\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(62,'fe5ecf04-3306-414b-bf19-da23c8dddb85','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-11-11T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"664319d8-3890-4cc1-9584-529f56332aea\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}]}','{\"id\": \"V-001\", \"date\": \"2026-11-11T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(63,'fe5ecf04-3306-414b-bf19-da23c8dddb85','bodyMeasurementVeterinarian','664319d8-3890-4cc1-9584-529f56332aea','DELETE','{\"id\": \"664319d8-3890-4cc1-9584-529f56332aea\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(64,'fe5ecf04-3306-414b-bf19-da23c8dddb85','bodyMeasurementVeterinarian','d81db46c-ef79-4df2-b2d7-41b337b2cfc7','CREATE',NULL,'{\"id\": \"d81db46c-ef79-4df2-b2d7-41b337b2cfc7\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(65,'6d739878-1663-47e7-b7c1-6cfb5010f2a2','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-11-11T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"d81db46c-ef79-4df2-b2d7-41b337b2cfc7\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}]}','{\"id\": \"V-001\", \"date\": \"2026-11-02T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(66,'6d739878-1663-47e7-b7c1-6cfb5010f2a2','bodyMeasurementVeterinarian','d81db46c-ef79-4df2-b2d7-41b337b2cfc7','DELETE','{\"id\": \"d81db46c-ef79-4df2-b2d7-41b337b2cfc7\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(67,'6d739878-1663-47e7-b7c1-6cfb5010f2a2','bodyMeasurementVeterinarian','11ccb9e6-4ed9-4834-acee-c48d620b52a7','CREATE',NULL,'{\"id\": \"11ccb9e6-4ed9-4834-acee-c48d620b52a7\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(68,'7b5d3709-613f-4a80-b105-a5eb3f52961b','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-11-02T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"11ccb9e6-4ed9-4834-acee-c48d620b52a7\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}]}','{\"id\": \"V-001\", \"date\": \"2026-11-30T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(69,'7b5d3709-613f-4a80-b105-a5eb3f52961b','bodyMeasurementVeterinarian','11ccb9e6-4ed9-4834-acee-c48d620b52a7','DELETE','{\"id\": \"11ccb9e6-4ed9-4834-acee-c48d620b52a7\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(70,'7b5d3709-613f-4a80-b105-a5eb3f52961b','bodyMeasurementVeterinarian','6935d559-de2e-4453-9497-c03c92fc6625','CREATE',NULL,'{\"id\": \"6935d559-de2e-4453-9497-c03c92fc6625\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(71,'5eb2488a-2c86-4a7c-a120-45260e24087e','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-11-30T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"6935d559-de2e-4453-9497-c03c92fc6625\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}]}','{\"id\": \"V-001\", \"date\": \"2026-07-09T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(72,'5eb2488a-2c86-4a7c-a120-45260e24087e','bodyMeasurementVeterinarian','6935d559-de2e-4453-9497-c03c92fc6625','DELETE','{\"id\": \"6935d559-de2e-4453-9497-c03c92fc6625\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(73,'5eb2488a-2c86-4a7c-a120-45260e24087e','bodyMeasurementVeterinarian','2a1fbbcf-5b18-4a62-ba97-f2e370107b4c','CREATE',NULL,'{\"id\": \"2a1fbbcf-5b18-4a62-ba97-f2e370107b4c\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(74,'ad018eba-50bf-40b6-a22a-133a1183b8d7','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-07-09T00:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"2a1fbbcf-5b18-4a62-ba97-f2e370107b4c\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}]}','{\"id\": \"V-001\", \"date\": \"2026-07-09T15:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(75,'ad018eba-50bf-40b6-a22a-133a1183b8d7','bodyMeasurementVeterinarian','2a1fbbcf-5b18-4a62-ba97-f2e370107b4c','DELETE','{\"id\": \"2a1fbbcf-5b18-4a62-ba97-f2e370107b4c\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(76,'ad018eba-50bf-40b6-a22a-133a1183b8d7','bodyMeasurementVeterinarian','7332b6a6-d0e8-4cdc-bf32-89e79a9dabf9','CREATE',NULL,'{\"id\": \"7332b6a6-d0e8-4cdc-bf32-89e79a9dabf9\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(77,'4db34fb6-2c1e-43c0-8c72-76c78e1c4ba7','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-07-09T15:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"7332b6a6-d0e8-4cdc-bf32-89e79a9dabf9\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}]}','{\"id\": \"V-001\", \"date\": \"2026-07-09T15:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(78,'4db34fb6-2c1e-43c0-8c72-76c78e1c4ba7','bodyMeasurementVeterinarian','7332b6a6-d0e8-4cdc-bf32-89e79a9dabf9','DELETE','{\"id\": \"7332b6a6-d0e8-4cdc-bf32-89e79a9dabf9\", \"value\": 0.24, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(79,'4db34fb6-2c1e-43c0-8c72-76c78e1c4ba7','bodyMeasurementVeterinarian','910fadd0-bf5a-4e24-a198-56a8e530f808','CREATE',NULL,'{\"id\": \"910fadd0-bf5a-4e24-a198-56a8e530f808\", \"value\": 0.29, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(80,'79b1a19b-539d-43a8-9cfe-717e7aa3e27c','veterinarianVisit','V-001','UPDATE','{\"id\": \"V-001\", \"date\": \"2026-07-09T15:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"910fadd0-bf5a-4e24-a198-56a8e530f808\", \"value\": 0.29, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}]}','{\"id\": \"V-001\", \"date\": \"2026-07-09T15:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(81,'79b1a19b-539d-43a8-9cfe-717e7aa3e27c','bodyMeasurementVeterinarian','910fadd0-bf5a-4e24-a198-56a8e530f808','DELETE','{\"id\": \"910fadd0-bf5a-4e24-a198-56a8e530f808\", \"value\": 0.29, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(82,'79b1a19b-539d-43a8-9cfe-717e7aa3e27c','bodyMeasurementVeterinarian','ad6a31da-86ae-4d7c-b924-6fa1b442e68e','CREATE',NULL,'{\"id\": \"ad6a31da-86ae-4d7c-b924-6fa1b442e68e\", \"value\": 0.29, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(83,'79b1a19b-539d-43a8-9cfe-717e7aa3e27c','bodyMeasurementVeterinarian','5ee41aa2-75ef-4076-8d1f-bec092574397','CREATE',NULL,'{\"id\": \"5ee41aa2-75ef-4076-8d1f-bec092574397\", \"value\": 123, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}'),(84,'10e72f28-f728-403c-9f0b-77d71072919c','veterinarianVisit','asdasd','CREATE',NULL,'{\"id\": \"asdasd\", \"date\": \"1212-12-12T15:06:28.000Z\", \"cardLink\": \"dgdfgf\", \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\"}'),(85,'10e72f28-f728-403c-9f0b-77d71072919c','bodyMeasurementVeterinarian','a028c0fa-f1ed-40b9-bfea-3fc8f47412b6','CREATE',NULL,'{\"id\": \"a028c0fa-f1ed-40b9-bfea-3fc8f47412b6\", \"value\": 324, \"veterinarianVisitId\": \"asdasd\", \"bodyMeasurementTypeId\": \"01test\"}'),(86,'ce659046-286e-46a7-8524-8ee18e223d1a','bodyMeasurementVeterinarian','a028c0fa-f1ed-40b9-bfea-3fc8f47412b6','DELETE','{\"id\": \"a028c0fa-f1ed-40b9-bfea-3fc8f47412b6\", \"value\": 324, \"veterinarianVisitId\": \"asdasd\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(87,'ce659046-286e-46a7-8524-8ee18e223d1a','veterinarianVisit','asdasd','DELETE','{\"id\": \"asdasd\", \"date\": \"1212-12-12T15:06:28.000Z\", \"cardLink\": \"dgdfgf\", \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"a028c0fa-f1ed-40b9-bfea-3fc8f47412b6\", \"value\": 324, \"veterinarianVisitId\": \"asdasd\", \"bodyMeasurementTypeId\": \"01test\"}]}',NULL),(88,'2c4957a6-1038-4a3e-9ae7-71d36675bbb6','bodyMeasurementVeterinarian','5ee41aa2-75ef-4076-8d1f-bec092574397','DELETE','{\"id\": \"5ee41aa2-75ef-4076-8d1f-bec092574397\", \"value\": 123, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(89,'2c4957a6-1038-4a3e-9ae7-71d36675bbb6','bodyMeasurementVeterinarian','ad6a31da-86ae-4d7c-b924-6fa1b442e68e','DELETE','{\"id\": \"ad6a31da-86ae-4d7c-b924-6fa1b442e68e\", \"value\": 0.29, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}',NULL),(90,'2c4957a6-1038-4a3e-9ae7-71d36675bbb6','veterinarianVisit','V-001','DELETE','{\"id\": \"V-001\", \"date\": \"2026-07-09T15:00:00.000Z\", \"cardLink\": null, \"liveAnimalId\": \"test001\", \"veterinarianId\": \"idtest\", \"bodyMeasurement\": [{\"id\": \"5ee41aa2-75ef-4076-8d1f-bec092574397\", \"value\": 123, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}, {\"id\": \"ad6a31da-86ae-4d7c-b924-6fa1b442e68e\", \"value\": 0.29, \"veterinarianVisitId\": \"V-001\", \"bodyMeasurementTypeId\": \"01test\"}]}',NULL),(91,'3d9ce133-72d3-44f7-b65d-e9f4f84a74f7','veterinarianVisit','1','CREATE',NULL,'{\"id\": 1, \"date\": \"1212-12-12T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1}'),(92,'e39da10b-b4e1-446b-9641-8ca116816074','veterinarianVisit','2','CREATE',NULL,'{\"id\": 2, \"date\": \"1212-12-11T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1}'),(93,'d42b505f-05f1-4427-963f-4481ac42d0f5','veterinarianVisit','2','UPDATE','{\"id\": 2, \"date\": \"1212-12-11T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1, \"bodyMeasurement\": []}','{\"id\": 2, \"date\": \"1212-12-11T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1}'),(94,'d42b505f-05f1-4427-963f-4481ac42d0f5','bodyMeasurementVeterinarian','1','CREATE',NULL,'{\"id\": 1, \"value\": 0, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 1}'),(95,'d42b505f-05f1-4427-963f-4481ac42d0f5','bodyMeasurementVeterinarian','2','CREATE',NULL,'{\"id\": 2, \"value\": 0, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 2}'),(96,'f0dad485-34cb-492f-a4ca-fc5b8619bffe','veterinarianVisit','2','UPDATE','{\"id\": 2, \"date\": \"1212-12-11T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1, \"bodyMeasurement\": [{\"id\": 1, \"value\": 0, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 1}, {\"id\": 2, \"value\": 0, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 2}]}','{\"id\": 2, \"date\": \"1212-12-11T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1}'),(97,'f0dad485-34cb-492f-a4ca-fc5b8619bffe','bodyMeasurementVeterinarian','1','DELETE','{\"id\": 1, \"value\": 0, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 1}',NULL),(98,'f0dad485-34cb-492f-a4ca-fc5b8619bffe','bodyMeasurementVeterinarian','2','DELETE','{\"id\": 2, \"value\": 0, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 2}',NULL),(99,'f0dad485-34cb-492f-a4ca-fc5b8619bffe','bodyMeasurementVeterinarian','3','CREATE',NULL,'{\"id\": 3, \"value\": 11, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 1}'),(100,'f0dad485-34cb-492f-a4ca-fc5b8619bffe','bodyMeasurementVeterinarian','4','CREATE',NULL,'{\"id\": 4, \"value\": 12, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 2}'),(101,'5bfa634e-5d00-4806-a4ab-32b760084a87','veterinarianVisit','3','CREATE',NULL,'{\"id\": 3, \"date\": \"1223-12-12T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1}'),(102,'ecbad320-07ef-4236-8013-a14cb3d06acd','veterinarianVisit','3','DELETE','{\"id\": 3, \"date\": \"1223-12-12T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1, \"bodyMeasurement\": []}',NULL),(103,'37eca6db-12b1-4f2e-bee1-71878e36dcab','veterinarianVisit','2','UPDATE','{\"id\": 2, \"date\": \"1212-12-11T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1, \"bodyMeasurement\": [{\"id\": 3, \"value\": 11, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 1}, {\"id\": 4, \"value\": 12, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 2}]}','{\"id\": 2, \"date\": \"1212-12-11T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1}'),(104,'37eca6db-12b1-4f2e-bee1-71878e36dcab','bodyMeasurementVeterinarian','3','DELETE','{\"id\": 3, \"value\": 11, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 1}',NULL),(105,'37eca6db-12b1-4f2e-bee1-71878e36dcab','bodyMeasurementVeterinarian','4','DELETE','{\"id\": 4, \"value\": 12, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 2}',NULL),(106,'37eca6db-12b1-4f2e-bee1-71878e36dcab','bodyMeasurementVeterinarian','5','CREATE',NULL,'{\"id\": 5, \"value\": 11, \"veterinarianVisitId\": 2, \"bodyMeasurementTypeId\": 1}'),(107,'7ffa13f7-8450-4b96-b70d-b0002c9b0b57','veterinarianVisit','4','CREATE',NULL,'{\"id\": 4, \"date\": \"1212-12-10T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1}'),(108,'42620b8d-d8a5-482c-95f6-2a65a433dd94','veterinarianVisit','4','DELETE','{\"id\": 4, \"date\": \"1212-12-10T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1, \"bodyMeasurement\": []}',NULL),(109,'2e0e9e73-d904-4181-9999-f6ee576fff01','veterinarianVisit','1','UPDATE','{\"id\": 1, \"date\": \"1212-12-12T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 1, \"bodyMeasurement\": []}','{\"id\": 1, \"date\": \"1212-12-12T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 2}'),(110,'3cf196b8-a895-42f5-9692-fb464cdab99f','veterinarianVisit','5','CREATE',NULL,'{\"id\": 5, \"date\": \"1212-12-13T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 1, \"veterinarianId\": 2}'),(111,'dec2ee50-55f2-4ae7-9159-7d98343ab431','veterinarianVisit','6','CREATE',NULL,'{\"id\": 6, \"date\": \"1212-12-12T15:06:28.000Z\", \"cardLink\": null, \"liveAnimalId\": 2, \"veterinarianId\": 2}'),(112,'822ded34-7159-47a7-8dae-f49e3d66b276','sampleAllocationVeterinarian','1','CREATE',NULL,'{\"id\": 1, \"note\": null, \"quantity\": 12, \"statusId\": 3, \"imageLink\": null, \"storageId\": 3, \"sampleTypeId\": 3, \"veterinarianVisitId\": 6}');
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
  `observacao` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `dispositivo_rastreio`
--

LOCK TABLES `dispositivo_rastreio` WRITE;
/*!40000 ALTER TABLE `dispositivo_rastreio` DISABLE KEYS */;
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `entrevista_animal_id_animal_vivo_key` (`id_animal_vivo`),
  CONSTRAINT `entrevista_animal_id_animal_vivo_fkey` FOREIGN KEY (`id_animal_vivo`) REFERENCES `animal_vivo` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entrevista_animal`
--

LOCK TABLES `entrevista_animal` WRITE;
/*!40000 ALTER TABLE `entrevista_animal` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `entrevista_tutor`
--

LOCK TABLES `entrevista_tutor` WRITE;
/*!40000 ALTER TABLE `entrevista_tutor` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enum_condicao_reprodutiva`
--

LOCK TABLES `enum_condicao_reprodutiva` WRITE;
/*!40000 ALTER TABLE `enum_condicao_reprodutiva` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enum_estado_clinico`
--

LOCK TABLES `enum_estado_clinico` WRITE;
/*!40000 ALTER TABLE `enum_estado_clinico` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enum_estado_corporal`
--

LOCK TABLES `enum_estado_corporal` WRITE;
/*!40000 ALTER TABLE `enum_estado_corporal` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enum_estado_geral_exame_fisico`
--

LOCK TABLES `enum_estado_geral_exame_fisico` WRITE;
/*!40000 ALTER TABLE `enum_estado_geral_exame_fisico` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enum_faixa_etaria`
--

LOCK TABLES `enum_faixa_etaria` WRITE;
/*!40000 ALTER TABLE `enum_faixa_etaria` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enum_genero`
--

LOCK TABLES `enum_genero` WRITE;
/*!40000 ALTER TABLE `enum_genero` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enum_hidratacao`
--

LOCK TABLES `enum_hidratacao` WRITE;
/*!40000 ALTER TABLE `enum_hidratacao` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enum_interpretacao_analise_sorologica`
--

LOCK TABLES `enum_interpretacao_analise_sorologica` WRITE;
/*!40000 ALTER TABLE `enum_interpretacao_analise_sorologica` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enum_mucosa`
--

LOCK TABLES `enum_mucosa` WRITE;
/*!40000 ALTER TABLE `enum_mucosa` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enum_origem_animal_morto`
--

LOCK TABLES `enum_origem_animal_morto` WRITE;
/*!40000 ALTER TABLE `enum_origem_animal_morto` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enum_status_alocacao_amostra_necropsia`
--

LOCK TABLES `enum_status_alocacao_amostra_necropsia` WRITE;
/*!40000 ALTER TABLE `enum_status_alocacao_amostra_necropsia` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enum_status_animal_morto`
--

LOCK TABLES `enum_status_animal_morto` WRITE;
/*!40000 ALTER TABLE `enum_status_animal_morto` DISABLE KEYS */;
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
-- Table structure for table `enum_tipo_vacina`
--

DROP TABLE IF EXISTS `enum_tipo_vacina`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `enum_tipo_vacina` (
  `id` int NOT NULL AUTO_INCREMENT,
  `nome` varchar(191) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `enum_tipo_vacina`
--

LOCK TABLES `enum_tipo_vacina` WRITE;
/*!40000 ALTER TABLE `enum_tipo_vacina` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `envio_amostra_necropsia`
--

LOCK TABLES `envio_amostra_necropsia` WRITE;
/*!40000 ALTER TABLE `envio_amostra_necropsia` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `envio_amostra_veterinario`
--

LOCK TABLES `envio_amostra_veterinario` WRITE;
/*!40000 ALTER TABLE `envio_amostra_veterinario` DISABLE KEYS */;
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
INSERT INTO `especie` VALUES (1,'Espécie Teste 2'),(2,'Espécie Teste 1');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especie_ectoparasito`
--

LOCK TABLES `especie_ectoparasito` WRITE;
/*!40000 ALTER TABLE `especie_ectoparasito` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `especie_ovo_cisto`
--

LOCK TABLES `especie_ovo_cisto` WRITE;
/*!40000 ALTER TABLE `especie_ovo_cisto` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `exame_fisico`
--

LOCK TABLES `exame_fisico` WRITE;
/*!40000 ALTER TABLE `exame_fisico` DISABLE KEYS */;
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
INSERT INTO `formulario` VALUES ('amostras-am','Amostra','necropsias'),('amostras-av','Amostra','veterinario'),('analiseectoparasitos-am','Análise de Ectoparasitos','resultadoseanalises'),('analiseectoparasitos-av','Análise de Ectoparasitos','exameseanalises'),('analisefezes','Análise de Fezes','exameseanalises'),('analisehelmintos','Análise de Helmintos','resultadoseanalises'),('analisemolecular','Análise Molecular','exameseanalises'),('analiseovocistos','Análise de Ovos/Cistos','exameseanalises'),('animal-am','Animal','animaisatropelados'),('animal-av','Animal','animais'),('entrevista','Entrevista','entrevistas'),('especiesanimaisvivosmortos','Espécies de Animais Vivos/Mortos','geral'),('necropsia','Necropsia','necropsias'),('rastreiogps','Rastreio de GPS','rastreiodegps'),('resultadoexame-am','Resultado de Exames','resultadoseanalises'),('resultadoexame-av','Resultado de Exames','exameseanalises'),('resultadosorologico','Resultado Sorológico','exameseanalises'),('tutor','Tutor','animais'),('vacina','Vacina','veterinario'),('visitaveterinaria','Visita Veterinária','veterinario');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `genero_ectoparasito`
--

LOCK TABLES `genero_ectoparasito` WRITE;
/*!40000 ALTER TABLE `genero_ectoparasito` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `grupo_animal_morto`
--

LOCK TABLES `grupo_animal_morto` WRITE;
/*!40000 ALTER TABLE `grupo_animal_morto` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medida_corporal_necropsia`
--

LOCK TABLES `medida_corporal_necropsia` WRITE;
/*!40000 ALTER TABLE `medida_corporal_necropsia` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `medida_corporal_veterinario`
--

LOCK TABLES `medida_corporal_veterinario` WRITE;
/*!40000 ALTER TABLE `medida_corporal_veterinario` DISABLE KEYS */;
INSERT INTO `medida_corporal_veterinario` VALUES (5,2,1,11);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `metodo_monitoramento`
--

LOCK TABLES `metodo_monitoramento` WRITE;
/*!40000 ALTER TABLE `metodo_monitoramento` DISABLE KEYS */;
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `necropsia_id_animal_morto_key` (`id_animal_morto`),
  KEY `necropsia_id_estado_corporal_fkey` (`id_estado_corporal`),
  KEY `necropsia_id_estado_clinico_fkey` (`id_estado_clinico`),
  KEY `necropsia_id_tutor_fkey` (`id_tutor`),
  KEY `necropsia_id_condicao_reprodutiva_fkey` (`id_condicao_reprodutiva`),
  KEY `necropsia_id_faixa_etaria_fkey` (`id_faixa_etaria`),
  CONSTRAINT `necropsia_id_animal_morto_fkey` FOREIGN KEY (`id_animal_morto`) REFERENCES `animal_morto` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `necropsia_id_condicao_reprodutiva_fkey` FOREIGN KEY (`id_condicao_reprodutiva`) REFERENCES `enum_condicao_reprodutiva` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `necropsia_id_estado_clinico_fkey` FOREIGN KEY (`id_estado_clinico`) REFERENCES `enum_estado_clinico` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `necropsia_id_estado_corporal_fkey` FOREIGN KEY (`id_estado_corporal`) REFERENCES `enum_estado_corporal` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `necropsia_id_faixa_etaria_fkey` FOREIGN KEY (`id_faixa_etaria`) REFERENCES `enum_faixa_etaria` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `necropsia_id_tutor_fkey` FOREIGN KEY (`id_tutor`) REFERENCES `tutor` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `necropsia`
--

LOCK TABLES `necropsia` WRITE;
/*!40000 ALTER TABLE `necropsia` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `opcao_resposta_tutor`
--

LOCK TABLES `opcao_resposta_tutor` WRITE;
/*!40000 ALTER TABLE `opcao_resposta_tutor` DISABLE KEYS */;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pergunta_animal`
--

LOCK TABLES `pergunta_animal` WRITE;
/*!40000 ALTER TABLE `pergunta_animal` DISABLE KEYS */;
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
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pergunta_tutor`
--

LOCK TABLES `pergunta_tutor` WRITE;
/*!40000 ALTER TABLE `pergunta_tutor` DISABLE KEYS */;
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
  PRIMARY KEY (`id`),
  UNIQUE KEY `rastreio_gps_id_animal_vivo_key` (`id_animal_vivo`),
  KEY `rastreio_gps_id_dispositivo_rastreio_fkey` (`id_dispositivo_rastreio`),
  KEY `rastreio_gps_id_metodo_monitoramento_fkey` (`id_metodo_monitoramento`),
  CONSTRAINT `rastreio_gps_id_animal_vivo_fkey` FOREIGN KEY (`id_animal_vivo`) REFERENCES `animal_vivo` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `rastreio_gps_id_dispositivo_rastreio_fkey` FOREIGN KEY (`id_dispositivo_rastreio`) REFERENCES `dispositivo_rastreio` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `rastreio_gps_id_metodo_monitoramento_fkey` FOREIGN KEY (`id_metodo_monitoramento`) REFERENCES `metodo_monitoramento` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `rastreio_gps`
--

LOCK TABLES `rastreio_gps` WRITE;
/*!40000 ALTER TABLE `rastreio_gps` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `responsavel_coleta`
--

LOCK TABLES `responsavel_coleta` WRITE;
/*!40000 ALTER TABLE `responsavel_coleta` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resposta_animal`
--

LOCK TABLES `resposta_animal` WRITE;
/*!40000 ALTER TABLE `resposta_animal` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `resposta_tutor`
--

LOCK TABLES `resposta_tutor` WRITE;
/*!40000 ALTER TABLE `resposta_tutor` DISABLE KEYS */;
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
INSERT INTO `solicitante` VALUES ('f54867de-0cde-48a3-9ed7-84567bfd39ac','Tester','tester@srf.com','123456','2026-03-21 18:22:04.022',NULL);
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
INSERT INTO `sub_categoria` VALUES ('animais','Animais','0_animaisvivos'),('animaisatropelados','Animais Atropelados','1_animaismortos'),('entrevistas','Entrevistas','0_animaisvivos'),('exameseanalises','Exames e Análises','0_animaisvivos'),('geral','Geral','2_cadastrosbasicos'),('necropsias','Necrópsias','1_animaismortos'),('rastreiodegps','Rastreio de GPS','0_animaisvivos'),('resultadoseanalises','Resultados e Análises','1_animaismortos'),('veterinario','Veterinário','0_animaisvivos');
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tecnologia_processamento`
--

LOCK TABLES `tecnologia_processamento` WRITE;
/*!40000 ALTER TABLE `tecnologia_processamento` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `teste_sorologico`
--

LOCK TABLES `teste_sorologico` WRITE;
/*!40000 ALTER TABLE `teste_sorologico` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_amostra_necropsia`
--

LOCK TABLES `tipo_amostra_necropsia` WRITE;
/*!40000 ALTER TABLE `tipo_amostra_necropsia` DISABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tipo_medida_corporal_necropsia`
--

LOCK TABLES `tipo_medida_corporal_necropsia` WRITE;
/*!40000 ALTER TABLE `tipo_medida_corporal_necropsia` DISABLE KEYS */;
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
INSERT INTO `tipo_medida_corporal_veterinario` VALUES (1,'Tipo Medida Corporal 1','cm'),(2,'Tipo Medida Corporal 2','m');
/*!40000 ALTER TABLE `tipo_medida_corporal_veterinario` ENABLE KEYS */;
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `tutor`
--

LOCK TABLES `tutor` WRITE;
/*!40000 ALTER TABLE `tutor` DISABLE KEYS */;
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
INSERT INTO `usuario` VALUES ('09af1365-644c-4dd7-8a4b-f00b57024c95','Usuário Super Admin Exemplo','superadmin@exemplo.com','$2b$10$.OBvQt/OnVzFkMrrZ37/BeCrIiqsn93Ww04pxiwZKfCVyE4dHI/o2','0',NULL),('5d98ce9c-07fa-4046-b40e-54ff4c733590','Usuário Comum Exemplo 2','comum2@exemplo.com','$2b$10$22PRwChwS218eAJNzkfrWOkwzqwSa3fantASuJoBCkKD7wzN/jqtq','2',NULL),('84ca85ea-1347-4b64-9525-b59a12aaee56','Usuário Admin Exemplo','admin@exemplo.com','$2b$10$ejUBCtU3ZKXHC0ODvfqrpuR01ThBe5BASvxQGintbqNSyE/.iXnvm','1',NULL),('b5b7be60-4ded-4937-bad8-af5dbb611bdb','Usuário Comum Exemplo','comum@exemplo.com','$2b$10$0IO/gwsOSMDlafhTmPE6SuT7.HiAhbrwD96edrh2SPFyfVgv1Ydu2','2',NULL);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `vacina`
--

LOCK TABLES `vacina` WRITE;
/*!40000 ALTER TABLE `vacina` DISABLE KEYS */;
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
INSERT INTO `veterinario` VALUES (1,'Veterinário Teste 2'),(2,'Veterinário Teste 1');
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
  `link_carteirinha` varchar(191) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `visita_veterinaria_id_animal_vivo_id_veterinario_data_key` (`id_animal_vivo`,`id_veterinario`,`data`),
  KEY `visita_veterinaria_id_veterinario_fkey` (`id_veterinario`),
  CONSTRAINT `visita_veterinaria_id_animal_vivo_fkey` FOREIGN KEY (`id_animal_vivo`) REFERENCES `animal_vivo` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `visita_veterinaria_id_veterinario_fkey` FOREIGN KEY (`id_veterinario`) REFERENCES `veterinario` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `visita_veterinaria`
--

LOCK TABLES `visita_veterinaria` WRITE;
/*!40000 ALTER TABLE `visita_veterinaria` DISABLE KEYS */;
INSERT INTO `visita_veterinaria` VALUES (1,1,2,'1212-12-12 15:06:28.000',NULL),(2,1,1,'1212-12-11 15:06:28.000',NULL),(5,1,2,'1212-12-13 15:06:28.000',NULL),(6,2,2,'1212-12-12 15:06:28.000',NULL);
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

-- Dump completed on 2026-03-25 17:56:50
