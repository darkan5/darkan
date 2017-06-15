-- MySQL dump 10.16  Distrib 10.1.21-MariaDB, for osx10.6 (i386)
--
-- Host: localhost    Database: localhost
-- ------------------------------------------------------
-- Server version	10.1.21-MariaDB

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `api_tokens`
--

DROP TABLE IF EXISTS `api_tokens`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `api_tokens` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `api_key_id` int(10) unsigned NOT NULL,
  `token` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `hashed_api_key` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `api_tokens_api_key_id_foreign` (`api_key_id`),
  CONSTRAINT `api_tokens_api_key_id_foreign` FOREIGN KEY (`api_key_id`) REFERENCES `aplication_api` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `api_tokens`
--

LOCK TABLES `api_tokens` WRITE;
/*!40000 ALTER TABLE `api_tokens` DISABLE KEYS */;
/*!40000 ALTER TABLE `api_tokens` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aplication_admin_api_to_aplication_api`
--

DROP TABLE IF EXISTS `aplication_admin_api_to_aplication_api`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aplication_admin_api_to_aplication_api` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `admin_api_key_id` int(10) unsigned NOT NULL,
  `api_key_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `aplication_admin_api_to_aplication_api_admin_api_key_id_foreign` (`admin_api_key_id`),
  KEY `aplication_admin_api_to_aplication_api_api_key_id_foreign` (`api_key_id`),
  CONSTRAINT `aplication_admin_api_to_aplication_api_admin_api_key_id_foreign` FOREIGN KEY (`admin_api_key_id`) REFERENCES `aplication_api` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `aplication_admin_api_to_aplication_api_api_key_id_foreign` FOREIGN KEY (`api_key_id`) REFERENCES `aplication_api` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aplication_admin_api_to_aplication_api`
--

LOCK TABLES `aplication_admin_api_to_aplication_api` WRITE;
/*!40000 ALTER TABLE `aplication_admin_api_to_aplication_api` DISABLE KEYS */;
INSERT INTO `aplication_admin_api_to_aplication_api` VALUES (1,1,2);
/*!40000 ALTER TABLE `aplication_admin_api_to_aplication_api` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aplication_api`
--

DROP TABLE IF EXISTS `aplication_api`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aplication_api` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `api_key` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `php_controller` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `role_id` int(10) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `plans` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '{}',
  PRIMARY KEY (`id`),
  UNIQUE KEY `aplication_api_api_key_unique` (`api_key`),
  KEY `aplication_api_role_id_foreign` (`role_id`),
  CONSTRAINT `aplication_api_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `aplication_api_roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aplication_api`
--

LOCK TABLES `aplication_api` WRITE;
/*!40000 ALTER TABLE `aplication_api` DISABLE KEYS */;
INSERT INTO `aplication_api` VALUES (1,'vOWSylmOWzdnddP3wv5Lp0g1ZngKRSpt8Uy8la1a','',1,'','{}'),(2,'vOWSylmOWzdnddP3wv5Lp0g1ZngKRSpt8Uy8la2a','',2,'','{}');
/*!40000 ALTER TABLE `aplication_api` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `aplication_api_roles`
--

DROP TABLE IF EXISTS `aplication_api_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `aplication_api_roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `aplication_api_roles`
--

LOCK TABLES `aplication_api_roles` WRITE;
/*!40000 ALTER TABLE `aplication_api_roles` DISABLE KEYS */;
INSERT INTO `aplication_api_roles` VALUES (1,'admin'),(2,'user'),(3,'none');
/*!40000 ALTER TABLE `aplication_api_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banners_categories`
--

DROP TABLE IF EXISTS `banners_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `banners_categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `owner_id` int(10) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `banners_categories_owner_id_foreign` (`owner_id`),
  CONSTRAINT `banners_categories_owner_id_foreign` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banners_categories`
--

LOCK TABLES `banners_categories` WRITE;
/*!40000 ALTER TABLE `banners_categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `banners_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banners_domain`
--

DROP TABLE IF EXISTS `banners_domain`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `banners_domain` (
  `id_banner_domain` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `banner_id` int(10) unsigned NOT NULL,
  `domain` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id_banner_domain`),
  KEY `banners_domain_banner_id_foreign` (`banner_id`),
  CONSTRAINT `banners_domain_banner_id_foreign` FOREIGN KEY (`banner_id`) REFERENCES `banners_projects` (`id_banner`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banners_domain`
--

LOCK TABLES `banners_domain` WRITE;
/*!40000 ALTER TABLE `banners_domain` DISABLE KEYS */;
/*!40000 ALTER TABLE `banners_domain` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banners_projects`
--

DROP TABLE IF EXISTS `banners_projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `banners_projects` (
  `id_banner` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `path` text COLLATE utf8_unicode_ci NOT NULL,
  `iframe` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `summary` text COLLATE utf8_unicode_ci,
  `date_create` datetime NOT NULL,
  `date_expiry` datetime NOT NULL,
  `modified` datetime NOT NULL,
  `view_count` int(11) NOT NULL DEFAULT '1',
  `max_view_count` int(11) NOT NULL DEFAULT '1',
  `dimensions` varchar(15) COLLATE utf8_unicode_ci NOT NULL DEFAULT '1',
  `active` int(11) NOT NULL DEFAULT '1',
  `views` int(11) NOT NULL DEFAULT '0',
  `ord` int(11) NOT NULL DEFAULT '0',
  `thumb` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'none',
  `price` double NOT NULL DEFAULT '0',
  `size_project` int(11) NOT NULL DEFAULT '0',
  `size_source` int(11) NOT NULL DEFAULT '0',
  `last_visit` datetime NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `available` int(11) NOT NULL DEFAULT '0',
  `questions` text COLLATE utf8_unicode_ci NOT NULL,
  `zoom` int(11) NOT NULL DEFAULT '1',
  `share` int(11) NOT NULL DEFAULT '1',
  `fullscreen` int(11) NOT NULL DEFAULT '1',
  `reset_progress` int(11) NOT NULL DEFAULT '1',
  `primary` int(11) NOT NULL DEFAULT '0',
  `index_file` varchar(150) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `show_title` int(11) NOT NULL DEFAULT '1',
  `requirements` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `questiondata` text COLLATE utf8_unicode_ci NOT NULL,
  `isold` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id_banner`),
  KEY `banners_projects_user_id_foreign` (`user_id`),
  KEY `banners_projects_project_id_foreign` (`project_id`),
  CONSTRAINT `banners_projects_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `banners_projects_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=35 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banners_projects`
--

LOCK TABLES `banners_projects` WRITE;
/*!40000 ALTER TABLE `banners_projects` DISABLE KEYS */;
INSERT INTO `banners_projects` VALUES (15,23,33,'5acc6352ba238d0d4a265c8707648815','https://darkan.eu/content/5acc6352ba238d0d4a265c8707648815','fcgvbcbcb','','2017-04-12 12:42:15','2017-04-12 12:42:15','2017-04-12 12:42:15',1,1,'1',1,2,0,'https://darkan.eu/storage/app/publications/5acc6352ba238d0d4a265c8707648815/thumb/thumb.png',0,10562904,0,'2017-04-12 12:42:15',0,0,'',0,0,1,0,0,'',1,'{\"pages\":true,\"score\":true,\"scoreRequired\":\"20\",\"scoreMax\":30}','[{\"actionkey\":\"399e2a8e09546bf181ba201ffb5208f7-2-1\",\"type\":\"quiz\",\"width\":400,\"height\":200,\"attempts\":\"1\",\"answers\":{\"#0\":{\"text\":\"Odpowied\\u017a 1\",\"goodAnswer\":true,\"left\":50,\"top\":30,\"choosen\":false},\"#1\":{\"text\":\"Odpowied\\u017a 2\",\"goodAnswer\":false,\"left\":50,\"top\":65,\"choosen\":false}},\"scoreSuccess\":\"10\",\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0.7)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"399e2a8e09546bf181ba201ffb5208f7-1-2\",\"type\":\"quiz\",\"width\":400,\"height\":200,\"attempts\":\"1\",\"answers\":{\"#0\":{\"text\":\"Odpowied\\u017a 1\",\"goodAnswer\":true,\"left\":50,\"top\":30,\"choosen\":false},\"#1\":{\"text\":\"Odpowied\\u017a 2\",\"goodAnswer\":false,\"left\":50,\"top\":65,\"choosen\":false}},\"scoreSuccess\":\"10\",\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0.7)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"399e2a8e09546bf181ba201ffb5208f7-1-3\",\"type\":\"quiz-selectone\",\"width\":700,\"height\":150,\"attempts\":\"1\",\"answers\":{\"#0\":{\"text\":\"Prawda\",\"goodAnswer\":true,\"left\":50,\"top\":50,\"choosen\":false},\"#1\":{\"text\":\"Fa\\u0142sz\",\"goodAnswer\":false,\"left\":400,\"top\":50,\"choosen\":false}},\"scoreSuccess\":\"10\",\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0.7)\",\"border-radius\":\"10px\",\"color\":\"#000\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#000\",\"border\":\"none\"}}}]',0),(27,60,29,'f0e9f25f617327d557c6c550d47ad2c9','http://darkan.local/content/f0e9f25f617327d557c6c550d47ad2c9','dasd','','2017-05-23 12:47:05','2017-05-23 12:47:05','2017-05-23 12:47:05',1,1,'1',1,2,2,'http://darkan.local/storage/app/publications/f0e9f25f617327d557c6c550d47ad2c9/thumb/thumb.png',0,9331886,0,'2017-05-23 12:47:05',0,0,'',0,0,1,0,0,'',1,'{\"pages\":true,\"score\":false,\"scoreRequired\":0,\"scoreMax\":0}','[]',0),(28,59,29,'d0fe3f100feedc1378dd69a517fc889f','http://darkan.local/content/d0fe3f100feedc1378dd69a517fc889f','nazwa','','2017-05-23 18:05:10','2017-05-23 18:05:10','2017-05-23 18:05:10',1,1,'1',1,0,1,'http://darkan.local/storage/app/publications/d0fe3f100feedc1378dd69a517fc889f/thumb/thumb.png',0,9368488,0,'2017-05-23 18:05:10',0,0,'',0,0,1,0,0,'',1,'{\"pages\":true,\"score\":false,\"scoreRequired\":0,\"scoreMax\":0}','[]',0),(29,69,29,'ca7eea313cc3f2a5538109277c079054','http://darkan.local/content/ca7eea313cc3f2a5538109277c079054','darkan','','2017-05-23 18:17:44','2017-05-23 18:17:44','2017-05-23 18:17:44',1,1,'1',1,1,2,'http://darkan.local/storage/app/publications/ca7eea313cc3f2a5538109277c079054/thumb/thumb.png',0,9362203,0,'2017-05-23 18:17:44',0,0,'',0,0,1,0,0,'',1,'{\"pages\":true,\"score\":false,\"scoreRequired\":0,\"scoreMax\":0}','[]',0),(30,73,29,'a9045ded099f94f416fafbf178425a27','http://darkan.local/content/a9045ded099f94f416fafbf178425a27','nazwa','','2017-05-24 11:11:05','2017-05-24 11:11:05','2017-05-24 11:11:05',1,1,'1',1,0,3,'http://darkan.local/storage/app/publications/a9045ded099f94f416fafbf178425a27/thumb/thumb.png',0,9406725,0,'2017-05-24 11:11:05',0,0,'',0,0,1,0,0,'',1,'{\"pages\":true,\"score\":false,\"scoreRequired\":0,\"scoreMax\":0}','[]',0),(31,73,29,'cf36acbb9ec64c1482e45403fa9582ce','http://darkan.local/content/cf36acbb9ec64c1482e45403fa9582ce','nazwa','','2017-05-24 12:09:58','2017-05-24 12:09:58','2017-05-24 12:09:58',1,1,'1',1,0,4,'http://darkan.local/storage/app/publications/cf36acbb9ec64c1482e45403fa9582ce/thumb/thumb.png',0,9407151,0,'2017-05-24 12:09:58',0,0,'',0,0,1,0,0,'',1,'{\"pages\":true,\"score\":false,\"scoreRequired\":0,\"scoreMax\":0}','[]',0),(32,74,29,'8b5a9cbd6a507b1eac836727900245e3','http://darkan.local/content/8b5a9cbd6a507b1eac836727900245e3','r32r','3r3r3r','2017-06-03 15:07:55','2017-06-03 15:07:55','2017-06-03 15:07:55',1,1,'1',1,1,5,'http://darkan.local/storage/app/publications/8b5a9cbd6a507b1eac836727900245e3/thumb/thumb.png',0,9355982,0,'2017-06-03 15:07:55',0,0,'',0,0,1,0,0,'',1,'{\"pages\":true,\"score\":false,\"scoreRequired\":0,\"scoreMax\":0}','[]',0),(33,74,29,'46056e3f5c2a80df7cb860c5494c2231','http://darkan.local/content/46056e3f5c2a80df7cb860c5494c2231','r32rscsc','3r3r3r','2017-06-03 15:08:51','2017-06-03 15:08:51','2017-06-03 15:08:51',1,1,'1',1,1,6,'http://darkan.local/storage/app/publications/46056e3f5c2a80df7cb860c5494c2231/thumb/thumb.png',0,9365917,0,'2017-06-03 15:08:51',0,0,'',0,0,1,0,0,'',1,'{\"pages\":true,\"score\":false,\"scoreRequired\":0,\"scoreMax\":0}','[{\"actionkey\":\"ff82b34b52049937fb82ce2c50129e8a-2-1\",\"type\":\"quiz\",\"width\":400,\"height\":200,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"Odpowied\\u017a 1\",\"goodAnswer\":true,\"left\":50,\"top\":30,\"choosen\":false},\"#1\":{\"text\":\"Odpowied\\u017a 2\",\"goodAnswer\":false,\"left\":50,\"top\":65,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0.7)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"}]',0),(34,74,29,'92f6404c88164a7b17680d8199b34abc','http://darkan.local/content/92f6404c88164a7b17680d8199b34abc','normalnie','normalnie','2017-06-03 15:11:37','2017-06-03 15:11:37','2017-06-03 15:11:37',1,1,'1',1,2,7,'http://darkan.local/storage/app/publications/92f6404c88164a7b17680d8199b34abc/thumb/thumb.png',0,9373384,0,'2017-06-03 15:11:37',0,0,'',0,0,1,0,0,'',1,'{\"pages\":true,\"score\":false,\"scoreRequired\":0,\"scoreMax\":0}','[{\"actionkey\":\"ff82b34b52049937fb82ce2c50129e8a-2-1\",\"type\":\"quiz\",\"width\":400,\"height\":200,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"Odpowied\\u017a 1\",\"goodAnswer\":true,\"left\":50,\"top\":30,\"choosen\":false},\"#1\":{\"text\":\"Odpowied\\u017a 2\",\"goodAnswer\":false,\"left\":50,\"top\":65,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0.7)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"}]',0);
/*!40000 ALTER TABLE `banners_projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banners_projects_external`
--

DROP TABLE IF EXISTS `banners_projects_external`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `banners_projects_external` (
  `id_banner` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `path` text COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `summary` text COLLATE utf8_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id_banner`),
  KEY `banners_projects_external_user_id_foreign` (`user_id`),
  KEY `banners_projects_external_project_id_foreign` (`project_id`),
  CONSTRAINT `banners_projects_external_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `banners_projects_external_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banners_projects_external`
--

LOCK TABLES `banners_projects_external` WRITE;
/*!40000 ALTER TABLE `banners_projects_external` DISABLE KEYS */;
/*!40000 ALTER TABLE `banners_projects_external` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banners_shared`
--

DROP TABLE IF EXISTS `banners_shared`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `banners_shared` (
  `id_shared` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `banner_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id_shared`),
  KEY `banners_shared_banner_id_foreign` (`banner_id`),
  KEY `banners_shared_user_id_foreign` (`user_id`),
  CONSTRAINT `banners_shared_banner_id_foreign` FOREIGN KEY (`banner_id`) REFERENCES `banners_projects` (`id_banner`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `banners_shared_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banners_shared`
--

LOCK TABLES `banners_shared` WRITE;
/*!40000 ALTER TABLE `banners_shared` DISABLE KEYS */;
/*!40000 ALTER TABLE `banners_shared` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `banners_to_categories`
--

DROP TABLE IF EXISTS `banners_to_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `banners_to_categories` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `course_id` int(10) unsigned NOT NULL,
  `category_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `banners_to_categories_course_id_foreign` (`course_id`),
  KEY `banners_to_categories_category_id_foreign` (`category_id`),
  CONSTRAINT `banners_to_categories_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `banners_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `banners_to_categories_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `banners_projects` (`id_banner`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `banners_to_categories`
--

LOCK TABLES `banners_to_categories` WRITE;
/*!40000 ALTER TABLE `banners_to_categories` DISABLE KEYS */;
/*!40000 ALTER TABLE `banners_to_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients_addresses`
--

DROP TABLE IF EXISTS `clients_addresses`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clients_addresses` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `city_id` int(10) unsigned NOT NULL,
  `zip_code_id` int(10) unsigned NOT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `clients_addresses_user_id_foreign` (`user_id`),
  KEY `clients_addresses_city_id_foreign` (`city_id`),
  KEY `clients_addresses_zip_code_id_foreign` (`zip_code_id`),
  CONSTRAINT `clients_addresses_city_id_foreign` FOREIGN KEY (`city_id`) REFERENCES `clients_cities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `clients_addresses_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `clients_addresses_zip_code_id_foreign` FOREIGN KEY (`zip_code_id`) REFERENCES `clients_zip_codes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients_addresses`
--

LOCK TABLES `clients_addresses` WRITE;
/*!40000 ALTER TABLE `clients_addresses` DISABLE KEYS */;
/*!40000 ALTER TABLE `clients_addresses` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients_cities`
--

DROP TABLE IF EXISTS `clients_cities`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clients_cities` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `city` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients_cities`
--

LOCK TABLES `clients_cities` WRITE;
/*!40000 ALTER TABLE `clients_cities` DISABLE KEYS */;
/*!40000 ALTER TABLE `clients_cities` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `clients_zip_codes`
--

DROP TABLE IF EXISTS `clients_zip_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `clients_zip_codes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `zip` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `clients_zip_codes`
--

LOCK TABLES `clients_zip_codes` WRITE;
/*!40000 ALTER TABLE `clients_zip_codes` DISABLE KEYS */;
/*!40000 ALTER TABLE `clients_zip_codes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cron_email_type_to_plan_user`
--

DROP TABLE IF EXISTS `cron_email_type_to_plan_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cron_email_type_to_plan_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `plan_user_id` int(10) unsigned NOT NULL,
  `cron_email_type_id` int(10) unsigned NOT NULL,
  `email_sended` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `cron_email_type_to_plan_user_plan_user_id_foreign` (`plan_user_id`),
  KEY `cron_email_type_to_plan_user_cron_email_type_id_foreign` (`cron_email_type_id`),
  CONSTRAINT `cron_email_type_to_plan_user_cron_email_type_id_foreign` FOREIGN KEY (`cron_email_type_id`) REFERENCES `cron_emails_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cron_email_type_to_plan_user_plan_user_id_foreign` FOREIGN KEY (`plan_user_id`) REFERENCES `plans_users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cron_email_type_to_plan_user`
--

LOCK TABLES `cron_email_type_to_plan_user` WRITE;
/*!40000 ALTER TABLE `cron_email_type_to_plan_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `cron_email_type_to_plan_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cron_email_type_to_user`
--

DROP TABLE IF EXISTS `cron_email_type_to_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cron_email_type_to_user` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `cron_email_type_id` int(10) unsigned NOT NULL,
  `email_sended` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `cron_email_type_to_user_user_id_foreign` (`user_id`),
  KEY `cron_email_type_to_user_cron_email_type_id_foreign` (`cron_email_type_id`),
  CONSTRAINT `cron_email_type_to_user_cron_email_type_id_foreign` FOREIGN KEY (`cron_email_type_id`) REFERENCES `cron_emails_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `cron_email_type_to_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cron_email_type_to_user`
--

LOCK TABLES `cron_email_type_to_user` WRITE;
/*!40000 ALTER TABLE `cron_email_type_to_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `cron_email_type_to_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `cron_emails_types`
--

DROP TABLE IF EXISTS `cron_emails_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `cron_emails_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `cron_emails_types`
--

LOCK TABLES `cron_emails_types` WRITE;
/*!40000 ALTER TABLE `cron_emails_types` DISABLE KEYS */;
INSERT INTO `cron_emails_types` VALUES (1,'registred_after_15_minutes'),(2,'registred_after_7_days'),(3,'pan_ending_for_7_days'),(4,'pan_ending_for_1_day'),(5,'registred_after_3_days'),(6,'registred_after_14_days');
/*!40000 ALTER TABLE `cron_emails_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `currencies`
--

DROP TABLE IF EXISTS `currencies`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `currencies` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `currencies`
--

LOCK TABLES `currencies` WRITE;
/*!40000 ALTER TABLE `currencies` DISABLE KEYS */;
INSERT INTO `currencies` VALUES (1,'PLN'),(2,'EUR'),(3,'USD');
/*!40000 ALTER TABLE `currencies` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `editors`
--

DROP TABLE IF EXISTS `editors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `editors` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `order` int(11) NOT NULL DEFAULT '0',
  `develop` tinyint(4) NOT NULL DEFAULT '0',
  `active` tinyint(4) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `editors`
--

LOCK TABLES `editors` WRITE;
/*!40000 ALTER TABLE `editors` DISABLE KEYS */;
INSERT INTO `editors` VALUES (1,'Empty project','Empty project',0,0,1),(2,'Pdf project','Pdf project',0,0,1),(3,'Img project','Img project',0,0,1),(4,'Darkan easy','Darkan easy',0,0,1),(5,'Darkan standard','Darkan standard',0,0,1),(6,'Darkan profesional','Darkan profesional',0,0,1),(7,'Darkan enterprise','Darkan enterprise',0,0,1),(8,'Ppt to Darkan','Ppt to Darkan',0,0,1);
/*!40000 ALTER TABLE `editors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `forms_of_payment`
--

DROP TABLE IF EXISTS `forms_of_payment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `forms_of_payment` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `method` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `display_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `forms_of_payment`
--

LOCK TABLES `forms_of_payment` WRITE;
/*!40000 ALTER TABLE `forms_of_payment` DISABLE KEYS */;
INSERT INTO `forms_of_payment` VALUES (1,-1,'all','Wszystkie'),(2,145,'credit_card','Karta płatnicza (cykliczność)');
/*!40000 ALTER TABLE `forms_of_payment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_banner`
--

DROP TABLE IF EXISTS `group_banner`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `group_banner` (
  `id_group` int(10) unsigned NOT NULL,
  `id_banner` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id_group`,`id_banner`),
  KEY `group_banner_id_banner_foreign` (`id_banner`),
  CONSTRAINT `group_banner_id_banner_foreign` FOREIGN KEY (`id_banner`) REFERENCES `banners_projects` (`id_banner`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `group_banner_id_group_foreign` FOREIGN KEY (`id_group`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_banner`
--

LOCK TABLES `group_banner` WRITE;
/*!40000 ALTER TABLE `group_banner` DISABLE KEYS */;
/*!40000 ALTER TABLE `group_banner` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `group_user`
--

DROP TABLE IF EXISTS `group_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `group_user` (
  `id_group` int(10) unsigned NOT NULL,
  `id_user` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id_group`,`id_user`),
  KEY `group_user_id_user_foreign` (`id_user`),
  CONSTRAINT `group_user_id_group_foreign` FOREIGN KEY (`id_group`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `group_user_id_user_foreign` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `group_user`
--

LOCK TABLES `group_user` WRITE;
/*!40000 ALTER TABLE `group_user` DISABLE KEYS */;
INSERT INTO `group_user` VALUES (1,29),(1,39),(2,29),(3,29),(3,39),(5,44);
/*!40000 ALTER TABLE `group_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `groups`
--

DROP TABLE IF EXISTS `groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_owner` int(10) unsigned NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `groups_id_owner_foreign` (`id_owner`),
  CONSTRAINT `groups_id_owner_foreign` FOREIGN KEY (`id_owner`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `groups`
--

LOCK TABLES `groups` WRITE;
/*!40000 ALTER TABLE `groups` DISABLE KEYS */;
INSERT INTO `groups` VALUES (1,29,'nazwa',0),(2,29,'bul',0),(3,29,'cos',0),(4,29,'inna',0),(5,33,'dfgdfg',0);
/*!40000 ALTER TABLE `groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lms_group_content`
--

DROP TABLE IF EXISTS `lms_group_content`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lms_group_content` (
  `group_id` int(10) unsigned NOT NULL,
  `content_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`group_id`,`content_id`),
  KEY `lms_group_content_content_id_foreign` (`content_id`),
  CONSTRAINT `lms_group_content_content_id_foreign` FOREIGN KEY (`content_id`) REFERENCES `banners_projects` (`id_banner`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `lms_group_content_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lms_group_content`
--

LOCK TABLES `lms_group_content` WRITE;
/*!40000 ALTER TABLE `lms_group_content` DISABLE KEYS */;
INSERT INTO `lms_group_content` VALUES (5,15);
/*!40000 ALTER TABLE `lms_group_content` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lms_info`
--

DROP TABLE IF EXISTS `lms_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lms_info` (
  `user_id` int(10) unsigned NOT NULL,
  `state` int(11) NOT NULL DEFAULT '0',
  `login` int(11) NOT NULL DEFAULT '0',
  `savemail` int(11) NOT NULL DEFAULT '0',
  `passwd` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `price` int(11) NOT NULL DEFAULT '0',
  `currency` varchar(5) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'EUR',
  `expiration` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `max_accounts` int(11) NOT NULL DEFAULT '20',
  `business` int(11) NOT NULL DEFAULT '0',
  `paid` int(11) NOT NULL DEFAULT '0',
  `topmenuon` int(11) NOT NULL DEFAULT '1',
  `footeron` int(11) NOT NULL DEFAULT '1',
  `skin` int(10) unsigned NOT NULL DEFAULT '1',
  `paypal_mail` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `redirect_url` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `custom_view` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `mail_template` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `portal_bought_mail_template` varchar(120) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `terms_link` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `force_lang` varchar(2) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  KEY `lms_info_user_id_foreign` (`user_id`),
  KEY `lms_info_skin_foreign` (`skin`),
  CONSTRAINT `lms_info_skin_foreign` FOREIGN KEY (`skin`) REFERENCES `portal_skins` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `lms_info_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lms_info`
--

LOCK TABLES `lms_info` WRITE;
/*!40000 ALTER TABLE `lms_info` DISABLE KEYS */;
INSERT INTO `lms_info` VALUES (29,0,0,0,'',0,'EUR','2017-04-09 17:21:20',20,0,0,1,1,2,'','','','','','',''),(33,0,1,0,'',0,'EUR','2017-04-12 10:53:56',20,0,0,1,1,1,'','','','','','','');
/*!40000 ALTER TABLE `lms_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lms_invitation_requests`
--

DROP TABLE IF EXISTS `lms_invitation_requests`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lms_invitation_requests` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `owner_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `mails_sent` int(11) NOT NULL,
  `hash` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `lms_invitation_requests_owner_id_foreign` (`owner_id`),
  KEY `lms_invitation_requests_user_id_foreign` (`user_id`),
  CONSTRAINT `lms_invitation_requests_owner_id_foreign` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `lms_invitation_requests_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lms_invitation_requests`
--

LOCK TABLES `lms_invitation_requests` WRITE;
/*!40000 ALTER TABLE `lms_invitation_requests` DISABLE KEYS */;
/*!40000 ALTER TABLE `lms_invitation_requests` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lms_scorm_data`
--

DROP TABLE IF EXISTS `lms_scorm_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lms_scorm_data` (
  `user_id` int(10) unsigned NOT NULL,
  `content_id` int(10) unsigned NOT NULL,
  `status` varchar(25) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'incompleted',
  `suspend_data` text COLLATE utf8_unicode_ci NOT NULL,
  `lesson_location` int(11) NOT NULL DEFAULT '0',
  `point_status` text COLLATE utf8_unicode_ci NOT NULL,
  `questionsarray` text COLLATE utf8_unicode_ci NOT NULL,
  `page_time` text COLLATE utf8_unicode_ci NOT NULL,
  `pages` text COLLATE utf8_unicode_ci NOT NULL,
  `needs` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `answers` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`user_id`,`content_id`),
  KEY `lms_scorm_data_content_id_foreign` (`content_id`),
  CONSTRAINT `lms_scorm_data_content_id_foreign` FOREIGN KEY (`content_id`) REFERENCES `banners_projects` (`id_banner`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `lms_scorm_data_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lms_scorm_data`
--

LOCK TABLES `lms_scorm_data` WRITE;
/*!40000 ALTER TABLE `lms_scorm_data` DISABLE KEYS */;
/*!40000 ALTER TABLE `lms_scorm_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lms_scorm_data_guest`
--

DROP TABLE IF EXISTS `lms_scorm_data_guest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lms_scorm_data_guest` (
  `hash` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `content_id` int(10) unsigned NOT NULL,
  `status` varchar(25) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'incompleted',
  `suspend_data` text COLLATE utf8_unicode_ci NOT NULL,
  `lesson_location` int(11) NOT NULL DEFAULT '0',
  `point_status` text COLLATE utf8_unicode_ci NOT NULL,
  `questionsarray` text COLLATE utf8_unicode_ci NOT NULL,
  `page_time` text COLLATE utf8_unicode_ci NOT NULL,
  `pages` text COLLATE utf8_unicode_ci NOT NULL,
  `needs` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `answers` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`hash`),
  KEY `lms_scorm_data_guest_content_id_foreign` (`content_id`),
  CONSTRAINT `lms_scorm_data_guest_content_id_foreign` FOREIGN KEY (`content_id`) REFERENCES `banners_projects` (`id_banner`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lms_scorm_data_guest`
--

LOCK TABLES `lms_scorm_data_guest` WRITE;
/*!40000 ALTER TABLE `lms_scorm_data_guest` DISABLE KEYS */;
/*!40000 ALTER TABLE `lms_scorm_data_guest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lms_user_portal`
--

DROP TABLE IF EXISTS `lms_user_portal`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lms_user_portal` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `portal_admin` int(10) unsigned NOT NULL,
  `user` int(10) unsigned NOT NULL,
  `active_actual` int(11) NOT NULL DEFAULT '1',
  `active_future` int(11) NOT NULL DEFAULT '1',
  `user_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `limit_exceeded` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `lms_user_portal_portal_admin_foreign` (`portal_admin`),
  KEY `lms_user_portal_user_foreign` (`user`),
  CONSTRAINT `lms_user_portal_portal_admin_foreign` FOREIGN KEY (`portal_admin`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `lms_user_portal_user_foreign` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lms_user_portal`
--

LOCK TABLES `lms_user_portal` WRITE;
/*!40000 ALTER TABLE `lms_user_portal` DISABLE KEYS */;
INSERT INTO `lms_user_portal` VALUES (1,29,29,1,1,'',0),(2,29,39,1,1,'',0),(3,33,44,1,1,'',0);
/*!40000 ALTER TABLE `lms_user_portal` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `lms_user_portal_paid`
--

DROP TABLE IF EXISTS `lms_user_portal_paid`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `lms_user_portal_paid` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user` int(10) unsigned NOT NULL,
  `portal_admin` int(10) unsigned NOT NULL,
  `paid` int(11) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `lms_user_portal_paid_portal_admin_foreign` (`portal_admin`),
  KEY `lms_user_portal_paid_user_foreign` (`user`),
  CONSTRAINT `lms_user_portal_paid_portal_admin_foreign` FOREIGN KEY (`portal_admin`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `lms_user_portal_paid_user_foreign` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `lms_user_portal_paid`
--

LOCK TABLES `lms_user_portal_paid` WRITE;
/*!40000 ALTER TABLE `lms_user_portal_paid` DISABLE KEYS */;
/*!40000 ALTER TABLE `lms_user_portal_paid` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mailing_group_user`
--

DROP TABLE IF EXISTS `mailing_group_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mailing_group_user` (
  `id_group` int(10) unsigned NOT NULL,
  `id_user` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id_group`,`id_user`),
  KEY `mailing_group_user_id_user_foreign` (`id_user`),
  CONSTRAINT `mailing_group_user_id_group_foreign` FOREIGN KEY (`id_group`) REFERENCES `mailing_groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `mailing_group_user_id_user_foreign` FOREIGN KEY (`id_user`) REFERENCES `mailing_users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mailing_group_user`
--

LOCK TABLES `mailing_group_user` WRITE;
/*!40000 ALTER TABLE `mailing_group_user` DISABLE KEYS */;
/*!40000 ALTER TABLE `mailing_group_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mailing_groups`
--

DROP TABLE IF EXISTS `mailing_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mailing_groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `id_owner` int(10) unsigned NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `mailing_groups_id_owner_foreign` (`id_owner`),
  CONSTRAINT `mailing_groups_id_owner_foreign` FOREIGN KEY (`id_owner`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mailing_groups`
--

LOCK TABLES `mailing_groups` WRITE;
/*!40000 ALTER TABLE `mailing_groups` DISABLE KEYS */;
INSERT INTO `mailing_groups` VALUES (1,29,'nazwa');
/*!40000 ALTER TABLE `mailing_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `mailing_users`
--

DROP TABLE IF EXISTS `mailing_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `mailing_users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `owner_id` int(10) unsigned NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data` text COLLATE utf8_unicode_ci NOT NULL,
  `fb_link` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`),
  UNIQUE KEY `mailing_users_email_unique` (`email`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `mailing_users`
--

LOCK TABLES `mailing_users` WRITE;
/*!40000 ALTER TABLE `mailing_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `mailing_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `migrations`
--

DROP TABLE IF EXISTS `migrations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `migrations` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=90 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `migrations`
--

LOCK TABLES `migrations` WRITE;
/*!40000 ALTER TABLE `migrations` DISABLE KEYS */;
INSERT INTO `migrations` VALUES (78,'2014_10_12_000000_create_users_table',1),(79,'2014_10_12_100000_create_password_resets_table',1),(80,'2015_12_07_082902_create_payment_table',1),(81,'2016_10_04_093523_entrust_setup_tables',1),(82,'2017_01_17_082902_create_cron_emails_table',1),(83,'2017_01_18_082902_create_app_table',1),(84,'2017_01_27_082902_create_lms_table',1),(85,'2017_01_28_082902_create_api_table',1),(86,'2017_01_30_082902_create_others_table',1),(87,'2017_02_01_082902_create_insert_values_table',1),(88,'2017_02_07_082902_create_lms_payment_table',1),(89,'2017_04_10_001652_create_sessions_table',2);
/*!40000 ALTER TABLE `migrations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `on_off_states`
--

DROP TABLE IF EXISTS `on_off_states`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `on_off_states` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `state` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `on_off_states`
--

LOCK TABLES `on_off_states` WRITE;
/*!40000 ALTER TABLE `on_off_states` DISABLE KEYS */;
INSERT INTO `on_off_states` VALUES (1,0,'Wyłączone'),(2,1,'Włączone');
/*!40000 ALTER TABLE `on_off_states` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `password_resets`
--

DROP TABLE IF EXISTS `password_resets`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  KEY `password_resets_email_index` (`email`),
  KEY `password_resets_token_index` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `password_resets`
--

LOCK TABLES `password_resets` WRITE;
/*!40000 ALTER TABLE `password_resets` DISABLE KEYS */;
/*!40000 ALTER TABLE `password_resets` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `payments` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `invoice_id` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `product` varchar(60) COLLATE utf8_unicode_ci NOT NULL,
  `payment_status` varchar(20) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'started',
  `payment_result` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `payment_data` text COLLATE utf8_unicode_ci NOT NULL,
  `created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `modified` datetime NOT NULL,
  `hash` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `invoice_data` text COLLATE utf8_unicode_ci NOT NULL,
  `price` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  `currency` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `locale` varchar(10) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `txn_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permission_role`
--

DROP TABLE IF EXISTS `permission_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permission_role` (
  `permission_id` int(10) unsigned NOT NULL,
  `role_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`permission_id`,`role_id`),
  KEY `permission_role_role_id_foreign` (`role_id`),
  CONSTRAINT `permission_role_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `permission_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permission_role`
--

LOCK TABLES `permission_role` WRITE;
/*!40000 ALTER TABLE `permission_role` DISABLE KEYS */;
/*!40000 ALTER TABLE `permission_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `permissions`
--

DROP TABLE IF EXISTS `permissions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `permissions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `display_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `permissions_name_unique` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `permissions`
--

LOCK TABLES `permissions` WRITE;
/*!40000 ALTER TABLE `permissions` DISABLE KEYS */;
/*!40000 ALTER TABLE `permissions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plan_options_costs`
--

DROP TABLE IF EXISTS `plan_options_costs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plan_options_costs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `version_id` int(10) unsigned NOT NULL DEFAULT '1',
  `price_plan_option_id` int(10) unsigned NOT NULL,
  `currency_id` int(10) unsigned NOT NULL,
  `cost` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `plan_options_costs_price_plan_option_id_foreign` (`price_plan_option_id`),
  KEY `plan_options_costs_currency_id_foreign` (`currency_id`),
  KEY `plan_options_costs_version_id_foreign` (`version_id`),
  CONSTRAINT `plan_options_costs_currency_id_foreign` FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `plan_options_costs_price_plan_option_id_foreign` FOREIGN KEY (`price_plan_option_id`) REFERENCES `price_plan_options` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `plan_options_costs_version_id_foreign` FOREIGN KEY (`version_id`) REFERENCES `plans_versions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plan_options_costs`
--

LOCK TABLES `plan_options_costs` WRITE;
/*!40000 ALTER TABLE `plan_options_costs` DISABLE KEYS */;
INSERT INTO `plan_options_costs` VALUES (1,1,1,1,10.00),(2,1,2,1,10.00),(3,1,3,1,10.00),(4,1,4,1,10.00),(5,1,5,1,10.00),(6,1,6,1,10.00),(7,1,7,1,10.00),(8,1,8,1,10.00),(9,1,9,1,10.00),(10,1,10,1,10.00),(11,1,11,1,10.00),(12,1,12,1,10.00),(13,1,13,1,10.00),(14,1,14,1,10.00),(15,1,15,1,1.00),(16,1,16,1,1.00),(17,1,17,1,1.00),(18,1,18,1,1.00),(19,1,19,1,1.00),(20,1,20,1,1.00);
/*!40000 ALTER TABLE `plan_options_costs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plans`
--

DROP TABLE IF EXISTS `plans`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plans` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `version_id` int(10) unsigned NOT NULL DEFAULT '1',
  `period` int(11) NOT NULL DEFAULT '1',
  `form_of_payment_id` int(10) unsigned NOT NULL DEFAULT '1',
  `plans_period_type_id` int(10) unsigned NOT NULL DEFAULT '3',
  `limit` int(11) NOT NULL DEFAULT '1',
  `active` tinyint(4) NOT NULL DEFAULT '1',
  `start_date` datetime NOT NULL,
  `expiration_date` datetime NOT NULL,
  `for_admin_only` tinyint(4) NOT NULL DEFAULT '0',
  `limit_enabled` tinyint(4) NOT NULL DEFAULT '0',
  `date_enabled` tinyint(4) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `plans_form_of_payment_id_foreign` (`form_of_payment_id`),
  KEY `plans_plans_period_type_id_foreign` (`plans_period_type_id`),
  KEY `plans_version_id_foreign` (`version_id`),
  CONSTRAINT `plans_form_of_payment_id_foreign` FOREIGN KEY (`form_of_payment_id`) REFERENCES `forms_of_payment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `plans_plans_period_type_id_foreign` FOREIGN KEY (`plans_period_type_id`) REFERENCES `plans_period_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `plans_version_id_foreign` FOREIGN KEY (`version_id`) REFERENCES `plans_versions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=20 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plans`
--

LOCK TABLES `plans` WRITE;
/*!40000 ALTER TABLE `plans` DISABLE KEYS */;
INSERT INTO `plans` VALUES (1,'Demo 1','Demo for 2 weeks',1,2,1,2,1,1,'2016-09-18 11:16:04','2016-09-18 11:16:05',1,0,0,NULL,NULL),(2,'Demo 2','Demo for 1 month',1,1,1,3,1,1,'2016-09-18 11:16:04','2016-09-18 11:16:05',1,0,0,NULL,NULL),(3,'Demo 2','Demo for 2 months',1,2,1,3,1,1,'2016-09-18 11:16:04','2016-09-18 11:16:05',1,0,0,NULL,NULL),(4,'Standard','Standard for 1 month',1,1,1,3,1,1,'2016-09-18 11:16:04','2016-09-18 11:16:05',0,0,0,NULL,NULL),(5,'Professional','Professional for 1 month',1,1,1,3,1,1,'2016-09-18 11:16:04','2016-09-18 11:16:05',0,0,0,NULL,NULL),(6,'Elearning','Elearning for 1 month',1,1,1,3,1,1,'2016-09-18 11:16:04','2016-09-18 11:16:05',0,0,0,NULL,NULL),(7,'Standard','Standard for 6 months',1,6,1,3,1,1,'2016-09-18 11:16:04','2016-09-18 11:16:05',0,0,0,NULL,NULL),(8,'Professional','Professional for 6 months',1,6,1,3,1,1,'2016-09-18 11:16:04','2016-09-18 11:16:05',0,0,0,NULL,NULL),(9,'Elearning','Elearning for 6 months',1,6,1,3,1,1,'2016-09-18 11:16:04','2016-09-18 11:16:05',0,0,0,NULL,NULL),(10,'Standard','Standard for 12 months',1,12,1,3,1,1,'2016-09-18 11:16:04','2016-09-18 11:16:05',0,0,0,NULL,NULL),(11,'Professional','Professional for 12 months',1,12,1,3,1,1,'2016-09-18 11:16:04','2016-09-18 11:16:05',0,0,0,NULL,NULL),(12,'Elearning','Elearning for 12 months',1,12,1,3,1,1,'2016-09-18 11:16:04','2016-09-18 11:16:05',0,0,0,NULL,NULL),(13,'For creator','For creator',1,5,1,4,1,1,'2016-09-18 11:16:04','2016-09-18 11:16:05',1,0,0,NULL,NULL),(14,'For distributor 5 years','For distributor 5 years',1,5,1,4,1,1,'2016-09-18 11:16:04','2016-09-18 11:16:05',1,0,0,NULL,NULL),(15,'For distributor 5 years','For distributor 5 years',1,5,1,4,1,1,'2016-09-18 11:16:04','2016-09-18 11:16:05',1,0,0,NULL,NULL),(16,'Api Standard','Api Standard for 12 months',1,12,1,3,1,1,'2016-09-18 11:16:04','2016-09-18 11:16:05',1,0,0,NULL,NULL),(17,'Api Professional','Api Professional for 12 months',1,12,1,3,1,1,'2016-09-18 11:16:04','2016-09-18 11:16:05',1,0,0,NULL,NULL),(18,'Api Elearning','Api Elearning for 12 months',1,12,1,3,1,1,'2016-09-18 11:16:04','2016-09-18 11:16:05',1,0,0,NULL,NULL),(19,'Test Drive','Test Drive',1,5,1,4,1,1,'2016-09-18 11:16:04','2016-09-18 11:16:05',1,0,0,NULL,NULL);
/*!40000 ALTER TABLE `plans` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plans_costs`
--

DROP TABLE IF EXISTS `plans_costs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plans_costs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `version_id` int(10) unsigned NOT NULL DEFAULT '1',
  `plan_id` int(10) unsigned NOT NULL,
  `currency_id` int(10) unsigned NOT NULL,
  `cost` decimal(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `plans_costs_plan_id_foreign` (`plan_id`),
  KEY `plans_costs_currency_id_foreign` (`currency_id`),
  KEY `plans_costs_version_id_foreign` (`version_id`),
  CONSTRAINT `plans_costs_currency_id_foreign` FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `plans_costs_plan_id_foreign` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `plans_costs_version_id_foreign` FOREIGN KEY (`version_id`) REFERENCES `plans_versions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plans_costs`
--

LOCK TABLES `plans_costs` WRITE;
/*!40000 ALTER TABLE `plans_costs` DISABLE KEYS */;
INSERT INTO `plans_costs` VALUES (1,1,1,1,0.00),(2,1,2,1,0.00),(3,1,3,1,0.00),(4,1,4,1,199.00),(5,1,5,1,329.00),(6,1,6,1,399.00),(7,1,7,1,499.00),(8,1,8,1,729.00),(9,1,9,1,1099.00),(10,1,10,1,1299.00),(11,1,11,1,1329.00),(12,1,12,1,1399.00),(13,1,4,1,222.00);
/*!40000 ALTER TABLE `plans_costs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plans_options`
--

DROP TABLE IF EXISTS `plans_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plans_options` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `version_id` int(10) unsigned NOT NULL DEFAULT '1',
  `options` text COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `plans_options_version_id_foreign` (`version_id`),
  CONSTRAINT `plans_options_version_id_foreign` FOREIGN KEY (`version_id`) REFERENCES `plans_versions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plans_options`
--

LOCK TABLES `plans_options` WRITE;
/*!40000 ALTER TABLE `plans_options` DISABLE KEYS */;
INSERT INTO `plans_options` VALUES (1,'default','default',1,'{}'),(2,'demo','demo',1,'{\n			  \"createProjects\": true,\n			  \"haveProjects\": true,\n			  \"publish\": true,\n			  \"publishOnPrimary\": true,\n			  \"hasOwnChannel\": true,\n			  \"exportscorm\": true,\n			  \"exporthtml5\": true,\n			  \"exportpdf\": true,\n			  \"importpdf\": true,\n			  \"importpsd\": true,\n			  \"publishfacebook\": true,\n			  \"mailing\": true,\n			  \"versioning\": true,\n			  \"adminPanel\": true,\n			  \"projects\": 2,\n			  \"banners\": 2,\n			  \"diskspace\": 1,\n			  \"lms_users\": 2,\n			  \"mailing_daily\": 100,\n			  \"mailing_users\": 2,\n			  \"publishfacebook\": true\n			}'),(3,'standard','standard',1,'{\n			  \"createProjects\": true,\n			  \"haveProjects\": true,\n			  \"publish\": true,\n			  \"publishOnPrimary\": true,\n			  \"hasOwnChannel\": true,\n			  \"exportscorm\": true,\n			  \"exporthtml5\": true,\n			  \"exportpdf\": true,\n			  \"importpdf\": true,\n			  \"importpsd\": true,\n			  \"publishfacebook\": true,\n			  \"mailing\": true,\n			  \"versioning\": true,\n			  \"adminPanel\": true,\n			  \"projects\": 25,\n			  \"banners\": 25,\n			  \"diskspace\": 2,\n			  \"lms_users\": 400,\n			  \"mailing_daily\": 400,\n			  \"mailing_users\": 400\n			}'),(4,'profesional','profesional',1,'{\n			  \"createProjects\": true,\n			  \"haveProjects\": true,\n			  \"publish\": true,\n			  \"publishOnPrimary\": true,\n			  \"hasOwnChannel\": true,\n			  \"exportscorm\": true,\n			  \"exporthtml5\": true,\n			  \"exportpdf\": true,\n			  \"importpdf\": true,\n			  \"importpsd\": true,\n			  \"publishfacebook\": true,\n			  \"mailing\": true,\n			  \"versioning\": true,\n			  \"adminPanel\": true,\n			  \"projects\": 100,\n			  \"banners\": 100,\n			  \"diskspace\": 6,\n			  \"lms_users\": 600,\n			  \"mailing_daily\": 600,\n			  \"mailing_users\": 600\n			}'),(5,'elearning','elearning',1,'{\n			  \"createProjects\": true,\n			  \"haveProjects\": true,\n			  \"publish\": true,\n			  \"publishOnPrimary\": true,\n			  \"hasOwnChannel\": true,\n			  \"exportscorm\": true,\n			  \"exporthtml5\": true,\n			  \"exportpdf\": true,\n			  \"importpdf\": true,\n			  \"importpsd\": false,\n			  \"publishfacebook\": true,\n			  \"mailing\": false,\n			  \"versioning\": false,\n			  \"adminPanel\": true,\n			  \"projects\": 100,\n			  \"banners\": 100,\n			  \"diskspace\": 6,\n			  \"lms_users\": 1000,\n			  \"mailing_daily\": 1000,\n			  \"mailing_users\": 1000\n			}'),(6,'all','all',1,'{\n			  \"createProjects\": true,\n			  \"haveProjects\": true,\n			  \"publish\": true,\n			  \"publishOnPrimary\": true,\n			  \"hasOwnChannel\": true,\n			  \"exportscorm\": true,\n			  \"exporthtml5\": true,\n			  \"exportpdf\": true,\n			  \"importpdf\": true,\n			  \"importpsd\": true,\n			  \"publishfacebook\": true,\n			  \"mailing\": true,\n			  \"versioning\": true,\n			  \"adminPanel\": true,\n			  \"projects\": 100000,\n			  \"banners\": 100000,\n			  \"diskspace\": 10,\n			  \"lms_users\": 100000,\n			  \"mailing_daily\": 100000,\n			  \"mailing_users\": 100000\n			}'),(7,'api standard','standard',1,'{\n			  \"createProjects\": true,\n			  \"haveProjects\": true,\n			  \"publish\": true,\n			  \"publishOnPrimary\": true,\n			  \"hasOwnChannel\": true,\n			  \"exportscorm\": true,\n			  \"exporthtml5\": true,\n			  \"exportpdf\": true,\n			  \"importpdf\": true,\n			  \"importpsd\": true,\n			  \"publishfacebook\": true,\n			  \"mailing\": true,\n			  \"versioning\": true,\n			  \"adminPanel\": true,\n			  \"projects\": 100,\n			  \"banners\": 100,\n			  \"diskspace\": 10,\n			  \"lms_users\": 1000,\n			  \"mailing_daily\": 1000,\n			  \"mailing_users\": 1000,\n			  \"createUsers\": true,\n			  \"usersLimit\": 100\n			}'),(8,'api profesional','profesional',1,'{\n			  \"createProjects\": true,\n			  \"haveProjects\": true,\n			  \"publish\": true,\n			  \"publishOnPrimary\": true,\n			  \"hasOwnChannel\": true,\n			  \"exportscorm\": true,\n			  \"exporthtml5\": true,\n			  \"exportpdf\": true,\n			  \"importpdf\": true,\n			  \"importpsd\": true,\n			  \"publishfacebook\": true,\n			  \"mailing\": true,\n			  \"versioning\": true,\n			  \"adminPanel\": true,\n			  \"projects\": 100,\n			  \"banners\": 100,\n			  \"diskspace\": 10,\n			  \"lms_users\": 1000,\n			  \"mailing_daily\": 1000,\n			  \"mailing_users\": 1000,\n			  \"createUsers\": true,\n			  \"usersLimit\": 100\n			}'),(9,'api elearning','elearning',1,'{\n			  \"createProjects\": true,\n			  \"haveProjects\": true,\n			  \"publish\": true,\n			  \"publishOnPrimary\": true,\n			  \"hasOwnChannel\": true,\n			  \"exportscorm\": true,\n			  \"exporthtml5\": true,\n			  \"exportpdf\": true,\n			  \"importpdf\": true,\n			  \"importpsd\": true,\n			  \"publishfacebook\": true,\n			  \"mailing\": true,\n			  \"versioning\": true,\n			  \"adminPanel\": true,\n			  \"projects\": 100,\n			  \"banners\": 100,\n			  \"diskspace\": 10,\n			  \"lms_users\": 1000,\n			  \"mailing_daily\": 1000,\n			  \"mailing_users\": 1000,\n			  \"createUsers\": true,\n			  \"usersLimit\": 100\n			}');
/*!40000 ALTER TABLE `plans_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plans_period_types`
--

DROP TABLE IF EXISTS `plans_period_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plans_period_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plans_period_types`
--

LOCK TABLES `plans_period_types` WRITE;
/*!40000 ALTER TABLE `plans_period_types` DISABLE KEYS */;
INSERT INTO `plans_period_types` VALUES (1,'days'),(2,'weeks'),(3,'months'),(4,'years');
/*!40000 ALTER TABLE `plans_period_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plans_to_plans_costs`
--

DROP TABLE IF EXISTS `plans_to_plans_costs`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plans_to_plans_costs` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `plan_id` int(10) unsigned NOT NULL,
  `plan_cost_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `plans_to_plans_costs_plan_id_foreign` (`plan_id`),
  KEY `plans_to_plans_costs_plan_cost_id_foreign` (`plan_cost_id`),
  CONSTRAINT `plans_to_plans_costs_plan_cost_id_foreign` FOREIGN KEY (`plan_cost_id`) REFERENCES `plans_costs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `plans_to_plans_costs_plan_id_foreign` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plans_to_plans_costs`
--

LOCK TABLES `plans_to_plans_costs` WRITE;
/*!40000 ALTER TABLE `plans_to_plans_costs` DISABLE KEYS */;
/*!40000 ALTER TABLE `plans_to_plans_costs` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plans_to_plans_options`
--

DROP TABLE IF EXISTS `plans_to_plans_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plans_to_plans_options` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `plan_id` int(10) unsigned NOT NULL,
  `plan_option_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `plans_to_plans_options_plan_id_foreign` (`plan_id`),
  KEY `plans_to_plans_options_plan_option_id_foreign` (`plan_option_id`),
  CONSTRAINT `plans_to_plans_options_plan_id_foreign` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `plans_to_plans_options_plan_option_id_foreign` FOREIGN KEY (`plan_option_id`) REFERENCES `plans_options` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plans_to_plans_options`
--

LOCK TABLES `plans_to_plans_options` WRITE;
/*!40000 ALTER TABLE `plans_to_plans_options` DISABLE KEYS */;
INSERT INTO `plans_to_plans_options` VALUES (1,1,2),(2,2,2),(3,3,2),(4,4,3),(5,5,4),(6,6,5),(7,7,3),(8,8,4),(9,9,5),(10,10,3),(11,11,4),(12,12,5),(13,13,6),(14,14,6),(15,15,6),(16,16,7),(17,17,8),(18,18,9);
/*!40000 ALTER TABLE `plans_to_plans_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plans_to_price_list`
--

DROP TABLE IF EXISTS `plans_to_price_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plans_to_price_list` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `version_id` int(10) unsigned NOT NULL,
  `price_type_id` int(10) unsigned NOT NULL,
  `price_period_id` int(10) unsigned NOT NULL,
  `plan_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `plans_to_price_list_version_id_foreign` (`version_id`),
  KEY `plans_to_price_list_price_type_id_foreign` (`price_type_id`),
  KEY `plans_to_price_list_price_period_id_foreign` (`price_period_id`),
  KEY `plans_to_price_list_plan_id_foreign` (`plan_id`),
  CONSTRAINT `plans_to_price_list_plan_id_foreign` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `plans_to_price_list_price_period_id_foreign` FOREIGN KEY (`price_period_id`) REFERENCES `price_periods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `plans_to_price_list_price_type_id_foreign` FOREIGN KEY (`price_type_id`) REFERENCES `price_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `plans_to_price_list_version_id_foreign` FOREIGN KEY (`version_id`) REFERENCES `plans_versions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plans_to_price_list`
--

LOCK TABLES `plans_to_price_list` WRITE;
/*!40000 ALTER TABLE `plans_to_price_list` DISABLE KEYS */;
INSERT INTO `plans_to_price_list` VALUES (1,1,1,1,4),(2,1,1,2,5),(3,1,1,3,6),(4,1,2,1,7),(5,1,2,2,8),(6,1,2,3,9),(7,1,3,1,10),(8,1,3,2,11),(9,1,3,3,12);
/*!40000 ALTER TABLE `plans_to_price_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plans_users`
--

DROP TABLE IF EXISTS `plans_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plans_users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `paying_user_id` int(10) unsigned NOT NULL,
  `created_by_user_id` int(10) unsigned NOT NULL,
  `plan_id` int(10) unsigned NOT NULL,
  `promo_code_id` int(10) unsigned NOT NULL,
  `currency_id` int(10) unsigned NOT NULL,
  `plan_cost_to_pay` decimal(10,2) NOT NULL,
  `plan_cost_to_pay_with_rabat` decimal(10,2) NOT NULL,
  `plan_options` text COLLATE utf8_unicode_ci NOT NULL,
  `start_date` datetime NOT NULL,
  `expiration_date` datetime NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '0',
  `paid` tinyint(4) NOT NULL DEFAULT '0',
  `session_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `client_address_id` int(10) unsigned DEFAULT NULL,
  `transaction_id` int(10) unsigned DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `plans_users_user_id_foreign` (`user_id`),
  KEY `plans_users_paying_user_id_foreign` (`paying_user_id`),
  KEY `plans_users_created_by_user_id_foreign` (`created_by_user_id`),
  KEY `plans_users_plan_id_foreign` (`plan_id`),
  KEY `plans_users_promo_code_id_foreign` (`promo_code_id`),
  KEY `plans_users_currency_id_foreign` (`currency_id`),
  KEY `plans_users_transaction_id_foreign` (`transaction_id`),
  CONSTRAINT `plans_users_created_by_user_id_foreign` FOREIGN KEY (`created_by_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `plans_users_currency_id_foreign` FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `plans_users_paying_user_id_foreign` FOREIGN KEY (`paying_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `plans_users_plan_id_foreign` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `plans_users_promo_code_id_foreign` FOREIGN KEY (`promo_code_id`) REFERENCES `promo_codes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `plans_users_transaction_id_foreign` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `plans_users_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plans_users`
--

LOCK TABLES `plans_users` WRITE;
/*!40000 ALTER TABLE `plans_users` DISABLE KEYS */;
INSERT INTO `plans_users` VALUES (1,3,2,2,13,1,1,0.00,0.00,'{\n			  \"createProjects\": true,\n			  \"haveProjects\": true,\n			  \"publish\": true,\n			  \"publishOnPrimary\": true,\n			  \"hasOwnChannel\": true,\n			  \"exportscorm\": true,\n			  \"exporthtml5\": true,\n			  \"exportpdf\": true,\n			  \"importpdf\": true,\n			  \"importpsd\": true,\n			  \"publishfacebook\": true,\n			  \"mailing\": true,\n			  \"versioning\": true,\n			  \"adminPanel\": true,\n			  \"projects\": 100000,\n			  \"banners\": 100000,\n			  \"diskspace\": 10,\n			  \"lms_users\": 100000,\n			  \"mailing_daily\": 100000,\n			  \"mailing_users\": 100000\n			}','2016-09-18 11:16:04','2035-09-18 11:16:05',1,1,NULL,NULL,NULL,NULL,NULL),(2,4,2,2,13,1,1,0.00,0.00,'{\n			  \"createProjects\": true,\n			  \"haveProjects\": true,\n			  \"publish\": true,\n			  \"publishOnPrimary\": true,\n			  \"hasOwnChannel\": true,\n			  \"exportscorm\": true,\n			  \"exporthtml5\": true,\n			  \"exportpdf\": true,\n			  \"importpdf\": true,\n			  \"importpsd\": true,\n			  \"publishfacebook\": true,\n			  \"mailing\": true,\n			  \"versioning\": true,\n			  \"adminPanel\": true,\n			  \"projects\": 100000,\n			  \"banners\": 100000,\n			  \"diskspace\": 10,\n			  \"lms_users\": 100000,\n			  \"mailing_daily\": 100000,\n			  \"mailing_users\": 100000\n			}','2016-09-18 11:16:04','2035-09-18 11:16:05',1,1,NULL,NULL,NULL,NULL,NULL),(3,5,2,2,13,1,1,0.00,0.00,'{\n			  \"createProjects\": true,\n			  \"haveProjects\": true,\n			  \"publish\": true,\n			  \"publishOnPrimary\": true,\n			  \"hasOwnChannel\": true,\n			  \"exportscorm\": true,\n			  \"exporthtml5\": true,\n			  \"exportpdf\": true,\n			  \"importpdf\": true,\n			  \"importpsd\": true,\n			  \"publishfacebook\": true,\n			  \"mailing\": true,\n			  \"versioning\": true,\n			  \"adminPanel\": true,\n			  \"projects\": 100000,\n			  \"banners\": 100000,\n			  \"diskspace\": 10,\n			  \"lms_users\": 100000,\n			  \"mailing_daily\": 100000,\n			  \"mailing_users\": 100000\n			}','2016-09-18 11:16:04','2035-09-18 11:16:05',1,1,NULL,NULL,NULL,NULL,NULL),(4,6,2,2,19,1,1,0.00,0.00,'{\n			  \"createProjects\": true,\n			  \"haveProjects\": true,\n			  \"publish\": true,\n			  \"publishOnPrimary\": true,\n			  \"hasOwnChannel\": true,\n			  \"exportscorm\": true,\n			  \"exporthtml5\": true,\n			  \"exportpdf\": true,\n			  \"importpdf\": true,\n			  \"importpsd\": true,\n			  \"publishfacebook\": true,\n			  \"mailing\": true,\n			  \"versioning\": true,\n			  \"adminPanel\": true,\n			  \"projects\": 10,\n			  \"banners\": 10,\n			  \"diskspace\": 1,\n			  \"lms_users\": 10,\n			  \"mailing_daily\": 40,\n			  \"mailing_users\": 10\n			}','2016-09-18 11:16:04','2035-09-18 11:16:05',1,1,NULL,NULL,NULL,NULL,NULL),(5,7,2,2,16,1,1,0.00,0.00,'{\n			  \"createProjects\": true,\n			  \"haveProjects\": true,\n			  \"publish\": true,\n			  \"publishOnPrimary\": true,\n			  \"hasOwnChannel\": true,\n			  \"exportscorm\": true,\n			  \"exporthtml5\": true,\n			  \"exportpdf\": true,\n			  \"importpdf\": true,\n			  \"importpsd\": true,\n			  \"publishfacebook\": true,\n			  \"mailing\": true,\n			  \"versioning\": true,\n			  \"adminPanel\": true,\n			  \"projects\": 100000,\n			  \"banners\": 100000,\n			  \"diskspace\": 10,\n			  \"lms_users\": 100000,\n			  \"mailing_daily\": 100000,\n			  \"mailing_users\": 100000\n			}','2016-09-18 11:16:04','2035-09-18 11:16:05',1,1,NULL,NULL,NULL,NULL,NULL),(6,28,2,2,12,1,1,0.00,0.00,'{\n			  \"createProjects\": true,\n			  \"haveProjects\": true,\n			  \"publish\": true,\n			  \"publishOnPrimary\": true,\n			  \"hasOwnChannel\": true,\n			  \"exportscorm\": true,\n			  \"exporthtml5\": true,\n			  \"exportpdf\": true,\n			  \"importpdf\": true,\n			  \"importpsd\": false,\n			  \"publishfacebook\": true,\n			  \"mailing\": false,\n			  \"versioning\": false,\n			  \"adminPanel\": true,\n			  \"projects\": 100,\n			  \"banners\": 100,\n			  \"diskspace\": 6,\n			  \"lms_users\": 1000,\n			  \"mailing_daily\": 1000,\n			  \"mailing_users\": 1000\n			}','2016-09-18 11:16:04','2035-09-18 11:16:05',1,1,NULL,NULL,NULL,NULL,NULL),(7,29,2,2,12,1,1,0.00,0.00,'{\n			  \"createProjects\": true,\n			  \"haveProjects\": true,\n			  \"publish\": true,\n			  \"publishOnPrimary\": true,\n			  \"hasOwnChannel\": true,\n			  \"exportscorm\": true,\n			  \"exporthtml5\": true,\n			  \"exportpdf\": true,\n			  \"importpdf\": true,\n			  \"importpsd\": false,\n			  \"publishfacebook\": true,\n			  \"mailing\": false,\n			  \"versioning\": false,\n			  \"adminPanel\": true,\n			  \"projects\": 100,\n			  \"banners\": 100,\n			  \"diskspace\": 6,\n			  \"lms_users\": 1000,\n			  \"mailing_daily\": 1000,\n			  \"mailing_users\": 1000\n			}','2016-09-18 11:16:04','2035-09-18 11:16:05',1,1,NULL,NULL,NULL,NULL,NULL),(8,30,2,2,12,1,1,0.00,0.00,'{\n			  \"createProjects\": true,\n			  \"haveProjects\": true,\n			  \"publish\": true,\n			  \"publishOnPrimary\": true,\n			  \"hasOwnChannel\": true,\n			  \"exportscorm\": true,\n			  \"exporthtml5\": true,\n			  \"exportpdf\": true,\n			  \"importpdf\": true,\n			  \"importpsd\": false,\n			  \"publishfacebook\": true,\n			  \"mailing\": false,\n			  \"versioning\": false,\n			  \"adminPanel\": true,\n			  \"projects\": 100,\n			  \"banners\": 100,\n			  \"diskspace\": 6,\n			  \"lms_users\": 1000,\n			  \"mailing_daily\": 1000,\n			  \"mailing_users\": 1000\n			}','2016-09-18 11:16:04','2035-09-18 11:16:05',1,1,NULL,NULL,NULL,NULL,NULL),(9,31,2,2,12,1,1,0.00,0.00,'{\n			  \"createProjects\": true,\n			  \"haveProjects\": true,\n			  \"publish\": true,\n			  \"publishOnPrimary\": true,\n			  \"hasOwnChannel\": true,\n			  \"exportscorm\": true,\n			  \"exporthtml5\": true,\n			  \"exportpdf\": true,\n			  \"importpdf\": true,\n			  \"importpsd\": false,\n			  \"publishfacebook\": true,\n			  \"mailing\": false,\n			  \"versioning\": false,\n			  \"adminPanel\": true,\n			  \"projects\": 100,\n			  \"banners\": 100,\n			  \"diskspace\": 6,\n			  \"lms_users\": 1000,\n			  \"mailing_daily\": 1000,\n			  \"mailing_users\": 1000\n			}','2016-09-18 11:16:04','2035-09-18 11:16:05',1,1,NULL,NULL,NULL,NULL,NULL),(10,32,2,2,12,1,1,0.00,0.00,'{\n			  \"createProjects\": true,\n			  \"haveProjects\": true,\n			  \"publish\": true,\n			  \"publishOnPrimary\": true,\n			  \"hasOwnChannel\": true,\n			  \"exportscorm\": true,\n			  \"exporthtml5\": true,\n			  \"exportpdf\": true,\n			  \"importpdf\": true,\n			  \"importpsd\": false,\n			  \"publishfacebook\": true,\n			  \"mailing\": false,\n			  \"versioning\": false,\n			  \"adminPanel\": true,\n			  \"projects\": 100,\n			  \"banners\": 100,\n			  \"diskspace\": 6,\n			  \"lms_users\": 1000,\n			  \"mailing_daily\": 1000,\n			  \"mailing_users\": 1000\n			}','2016-09-18 11:16:04','2035-09-18 11:16:05',1,1,NULL,NULL,NULL,NULL,NULL),(11,33,2,2,12,1,1,0.00,0.00,'{\n			  \"createProjects\": true,\n			  \"haveProjects\": true,\n			  \"publish\": true,\n			  \"publishOnPrimary\": true,\n			  \"hasOwnChannel\": true,\n			  \"exportscorm\": true,\n			  \"exporthtml5\": true,\n			  \"exportpdf\": true,\n			  \"importpdf\": true,\n			  \"importpsd\": false,\n			  \"publishfacebook\": true,\n			  \"mailing\": false,\n			  \"versioning\": false,\n			  \"adminPanel\": true,\n			  \"projects\": 100,\n			  \"banners\": 100,\n			  \"diskspace\": 6,\n			  \"lms_users\": 1000,\n			  \"mailing_daily\": 1000,\n			  \"mailing_users\": 1000\n			}','2016-09-18 11:16:04','2035-09-18 11:16:05',1,1,NULL,NULL,NULL,NULL,NULL),(12,34,34,34,3,1,1,0.00,0.00,'{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}','2017-03-29 23:06:32','2017-05-29 23:06:32',1,0,'XB6vX0KAb4tdtcOlA2ysN1Qg7Dj7Ra4ARtnvPv7E',NULL,NULL,'2017-03-29 21:06:32','2017-03-29 21:06:32'),(13,35,35,35,3,1,1,0.00,0.00,'{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}','2017-03-29 23:07:34','2017-05-29 23:07:34',1,0,'sdEJNIzNrybU3z9cQw39yK4sds5BzeN4T5DEAK3M',NULL,NULL,'2017-03-29 21:07:34','2017-03-29 21:07:34'),(14,36,36,36,3,1,1,0.00,0.00,'{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}','2017-03-29 23:08:32','2017-05-29 23:08:32',1,0,'S5xtz4h7ClJ4gazL6frvELhAJRrzxDD1sKiBZzqH',NULL,NULL,'2017-03-29 21:08:32','2017-03-29 21:08:32'),(15,37,37,37,3,1,1,0.00,0.00,'{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}','2017-03-31 05:52:17','2017-05-31 05:52:17',1,0,'7HYcagh6FbDgNUTELsWufWI1XYukbOFLElVoSC2t',NULL,NULL,'2017-03-31 03:52:17','2017-03-31 03:52:17'),(16,38,38,38,3,1,1,0.00,0.00,'{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}','2017-04-06 20:37:12','2017-06-06 20:37:12',1,0,'HuzdYjRfgqFeCPdPF5xLHJYI3wBl5A5SyDGINBDg',NULL,NULL,'2017-04-06 18:37:12','2017-04-06 18:37:12'),(17,40,40,29,14,1,1,0.00,0.00,'{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":100000,\"banners\":100000,\"diskspace\":10,\"lms_users\":100000,\"mailing_daily\":100000,\"mailing_users\":100000}','2017-04-10 16:50:00','2022-04-10 16:50:00',1,0,'juNUl8JKPzS4KQSQKgmB7DAupVxcIU7mv3DL9aSV',NULL,NULL,'2017-04-10 14:50:00','2017-04-10 14:50:00'),(18,42,42,42,3,1,1,0.00,0.00,'{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}','2017-04-10 16:52:40','2017-06-10 16:52:40',1,0,'FnGTEVF4SqhYy0xXhTIj3V0hzyLubxk2gIbJy02g',NULL,NULL,'2017-04-10 14:52:40','2017-04-10 14:52:40'),(19,43,43,43,3,1,1,0.00,0.00,'{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}','2017-04-11 18:07:47','2017-06-11 18:07:47',1,0,'XgQhZGTrIeBtWW1hQR05jsMeQFPuOKGJI0iLMU4q',NULL,NULL,'2017-04-11 16:07:47','2017-04-11 16:07:47'),(20,45,45,45,3,1,1,0.00,0.00,'{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}','2017-04-14 12:00:19','2017-06-14 12:00:19',1,0,'5kSKAsK0KIyL7p8psy907njqgn2bC4DKbiE9JDjO',NULL,NULL,'2017-04-14 10:00:19','2017-04-14 10:00:19'),(21,46,46,46,3,1,1,0.00,0.00,'{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}','2017-05-14 16:40:40','2017-07-14 16:40:40',1,0,'jGSvgtUeyKTSn4CiswMOxASFKy5AySCrH31rTod2',NULL,NULL,'2017-05-14 14:40:40','2017-05-14 14:40:40');
/*!40000 ALTER TABLE `plans_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plans_users_to_sales_coupons`
--

DROP TABLE IF EXISTS `plans_users_to_sales_coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plans_users_to_sales_coupons` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `plan_user_id` int(10) unsigned NOT NULL,
  `sales_coupon_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `plans_users_to_sales_coupons_plan_user_id_foreign` (`plan_user_id`),
  KEY `plans_users_to_sales_coupons_sales_coupon_id_foreign` (`sales_coupon_id`),
  CONSTRAINT `plans_users_to_sales_coupons_plan_user_id_foreign` FOREIGN KEY (`plan_user_id`) REFERENCES `plans_users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `plans_users_to_sales_coupons_sales_coupon_id_foreign` FOREIGN KEY (`sales_coupon_id`) REFERENCES `sales_coupons` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plans_users_to_sales_coupons`
--

LOCK TABLES `plans_users_to_sales_coupons` WRITE;
/*!40000 ALTER TABLE `plans_users_to_sales_coupons` DISABLE KEYS */;
/*!40000 ALTER TABLE `plans_users_to_sales_coupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `plans_versions`
--

DROP TABLE IF EXISTS `plans_versions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `plans_versions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `version` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '1.0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `plans_versions`
--

LOCK TABLES `plans_versions` WRITE;
/*!40000 ALTER TABLE `plans_versions` DISABLE KEYS */;
INSERT INTO `plans_versions` VALUES (1,'Plan 1.0','Plan 1.0 - pierwsza wersja','1.0',NULL,NULL),(2,'Plan 2.0','Plan 2.0 - pierwsza wersja','2.0',NULL,NULL);
/*!40000 ALTER TABLE `plans_versions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `portal_skins`
--

DROP TABLE IF EXISTS `portal_skins`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `portal_skins` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `css_file` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `public` int(11) NOT NULL DEFAULT '1',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `portal_skins`
--

LOCK TABLES `portal_skins` WRITE;
/*!40000 ALTER TABLE `portal_skins` DISABLE KEYS */;
INSERT INTO `portal_skins` VALUES (1,'default','default.css',1),(2,'red','red.css',1),(3,'pamrow','pamrow.css',0);
/*!40000 ALTER TABLE `portal_skins` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `price_functionality`
--

DROP TABLE IF EXISTS `price_functionality`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `price_functionality` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `price_functionality`
--

LOCK TABLES `price_functionality` WRITE;
/*!40000 ALTER TABLE `price_functionality` DISABLE KEYS */;
INSERT INTO `price_functionality` VALUES (1,'Miejsce na dysku','1 month',NULL,NULL),(2,'6 months','6 months',NULL,NULL),(3,'12 months','12 months',NULL,NULL);
/*!40000 ALTER TABLE `price_functionality` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `price_option_types`
--

DROP TABLE IF EXISTS `price_option_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `price_option_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `price_option_types`
--

LOCK TABLES `price_option_types` WRITE;
/*!40000 ALTER TABLE `price_option_types` DISABLE KEYS */;
INSERT INTO `price_option_types` VALUES (1,'boolean'),(2,'numeric');
/*!40000 ALTER TABLE `price_option_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `price_periods`
--

DROP TABLE IF EXISTS `price_periods`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `price_periods` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `price_periods`
--

LOCK TABLES `price_periods` WRITE;
/*!40000 ALTER TABLE `price_periods` DISABLE KEYS */;
INSERT INTO `price_periods` VALUES (1,'1 month','1 month',NULL,NULL),(2,'6 months','6 months',NULL,NULL),(3,'12 months','12 months',NULL,NULL);
/*!40000 ALTER TABLE `price_periods` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `price_plan_options`
--

DROP TABLE IF EXISTS `price_plan_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `price_plan_options` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `value` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `price_option_type_id` int(10) unsigned NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `version_id` int(10) unsigned NOT NULL DEFAULT '1',
  `show` tinyint(4) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `price_plan_options_version_id_foreign` (`version_id`),
  KEY `price_plan_options_price_option_type_id_foreign` (`price_option_type_id`),
  CONSTRAINT `price_plan_options_price_option_type_id_foreign` FOREIGN KEY (`price_option_type_id`) REFERENCES `price_option_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `price_plan_options_version_id_foreign` FOREIGN KEY (`version_id`) REFERENCES `plans_versions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `price_plan_options`
--

LOCK TABLES `price_plan_options` WRITE;
/*!40000 ALTER TABLE `price_plan_options` DISABLE KEYS */;
INSERT INTO `price_plan_options` VALUES (1,'createProjects','true',1,'',1,1),(2,'haveProjects','true',1,'',1,1),(3,'publish','true',1,'',1,1),(4,'publishOnPrimary','true',1,'',1,1),(5,'hasOwnChannel','true',1,'',1,1),(6,'exportscorm','true',1,'',1,1),(7,'exporthtml5','true',1,'',1,1),(8,'exportpdf','true',1,'',1,1),(9,'importpdf','true',1,'',1,1),(10,'importpsd','true',1,'',1,1),(11,'publishfacebook','true',1,'',1,1),(12,'mailing','true',1,'',1,1),(13,'versioning','true',1,'',1,1),(14,'adminPanel','true',1,'',1,1),(15,'projects','100',2,'',1,1),(16,'banners','100',2,'',1,1),(17,'diskspace','10000000',2,'',1,0),(18,'lms_users','1000',2,'',1,1),(19,'mailing_daily','1000',2,'',1,1),(20,'mailing_users','1000',2,'',1,1);
/*!40000 ALTER TABLE `price_plan_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `price_types`
--

DROP TABLE IF EXISTS `price_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `price_types` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `price_types`
--

LOCK TABLES `price_types` WRITE;
/*!40000 ALTER TABLE `price_types` DISABLE KEYS */;
INSERT INTO `price_types` VALUES (1,'Standard','Standard',NULL,NULL),(2,'Professional','Professional',NULL,NULL),(3,'Elearning','Elearning',NULL,NULL),(4,'Enterprise','Enterprise',NULL,NULL);
/*!40000 ALTER TABLE `price_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `project_version`
--

DROP TABLE IF EXISTS `project_version`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `project_version` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `date` datetime NOT NULL,
  `dir` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `description` varchar(1000) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `size` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `project_version_project_id_foreign` (`project_id`),
  KEY `project_version_user_id_foreign` (`user_id`),
  CONSTRAINT `project_version_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `project_version_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `project_version`
--

LOCK TABLES `project_version` WRITE;
/*!40000 ALTER TABLE `project_version` DISABLE KEYS */;
/*!40000 ALTER TABLE `project_version` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects`
--

DROP TABLE IF EXISTS `projects`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projects` (
  `project_id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `date` datetime NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `skin` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'sk01',
  `dimentions` varchar(15) COLLATE utf8_unicode_ci NOT NULL DEFAULT '860x500',
  `version` varchar(8) COLLATE utf8_unicode_ci NOT NULL DEFAULT '2.0.0',
  `date_modification` datetime NOT NULL,
  `size` int(11) NOT NULL DEFAULT '0',
  `template` int(11) NOT NULL DEFAULT '0',
  `last_visit` datetime NOT NULL,
  `status` int(11) NOT NULL DEFAULT '0',
  `external` int(11) NOT NULL DEFAULT '0',
  `editor_id` int(10) unsigned NOT NULL DEFAULT '5',
  PRIMARY KEY (`project_id`),
  KEY `projects_user_id_foreign` (`user_id`),
  KEY `projects_editor_id_foreign` (`editor_id`),
  CONSTRAINT `projects_editor_id_foreign` FOREIGN KEY (`editor_id`) REFERENCES `editors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `projects_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=75 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects`
--

LOCK TABLES `projects` WRITE;
/*!40000 ALTER TABLE `projects` DISABLE KEYS */;
INSERT INTO `projects` VALUES (21,42,'2017-04-10 21:53:33','new','sk00','860x500','2.0.0','2017-04-10 21:53:33',362196,0,'2017-04-11 07:28:51',0,0,5),(23,33,'2017-04-12 12:40:25','asdasd','sk01','860x500','2.0.0','2017-04-12 12:40:25',285817,0,'2017-05-02 18:12:54',0,0,5),(33,46,'2017-05-14 16:41:58','nowy','sk00','860x500','2.0.0','2017-05-14 16:41:58',0,0,'2017-05-14 16:41:58',0,0,5),(50,6,'2017-05-15 14:45:58','23','sk00','860x500','2.0.0','2017-05-15 14:45:58',5053,0,'2017-05-15 16:46:11',0,0,5),(51,29,'2017-05-22 20:20:23','Nowy projekt','sk00','860x500','2.0.0','2017-05-22 20:20:23',0,0,'2017-05-22 20:20:23',0,0,5),(52,29,'2017-05-22 20:20:30','Nowy projekt','sk00','860x500','2.0.0','2017-05-22 20:20:30',0,0,'2017-05-22 20:20:30',0,0,5),(59,29,'2017-05-23 12:25:53','track','sk00','860x500','2.0.0','2017-05-23 12:25:53',82222,0,'2017-05-23 18:05:31',0,0,5),(60,29,'2017-05-23 12:45:03','starter','sk00','860x500','2.0.0','2017-05-23 12:45:03',60961,0,'2017-05-23 15:33:34',0,0,5),(61,29,'2017-05-23 13:54:28','try','sk00','860x500','2.0.0','2017-05-23 13:54:28',81357,0,'2017-05-23 19:31:18',0,0,5),(64,29,'2017-05-23 17:43:11','testowy1','sk00','860x500','2.0.0','2017-05-23 17:43:11',0,0,'2017-05-23 17:51:58',0,0,5),(65,29,'2017-05-23 17:52:31','info','sk00','860x500','2.0.0','2017-05-23 17:52:31',0,0,'2017-05-23 17:52:38',0,0,5),(66,29,'2017-05-23 17:53:40','hmm','sk00','860x500','2.0.0','2017-05-23 17:53:40',62871,0,'2017-05-24 07:19:56',0,0,5),(67,29,'2017-05-23 18:05:39','start1','sk00','860x500','2.0.0','2017-05-23 18:05:39',5053,0,'2017-05-23 20:18:47',0,0,5),(68,29,'2017-05-23 18:10:15','try','sk00','860x500','2.0.0','2017-05-23 18:10:15',882,0,'2017-05-23 18:10:58',0,0,5),(69,29,'2017-05-23 18:11:22','work','sk00','860x500','2.0.0','2017-05-23 18:11:22',80905,0,'2017-05-23 20:41:24',0,0,5),(70,29,'2017-05-23 18:28:30','start','sk00','860x500','2.0.0','2017-05-23 18:28:30',58955,0,'2017-05-23 20:31:15',0,0,5),(71,29,'2017-05-23 18:31:21','kolejka','sk00','860x500','2.0.0','2017-05-23 18:31:21',79694,0,'2017-05-23 20:34:25',0,0,5),(72,29,'2017-05-23 18:34:36','nowy startowy','sk00','860x500','2.0.0','2017-05-23 18:34:36',86065,0,'2017-06-03 16:23:07',0,0,5),(73,29,'2017-05-23 18:45:15','nowy2','sk00','860x500','2.0.0','2017-05-23 18:45:15',222811,0,'2017-06-06 10:22:16',0,0,5),(74,29,'2017-06-03 14:39:21','sergsg','sk00','860x500','2.0.0','2017-06-03 14:39:21',88100,0,'2017-06-05 10:20:09',0,0,5);
/*!40000 ALTER TABLE `projects` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects_deleted`
--

DROP TABLE IF EXISTS `projects_deleted`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projects_deleted` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `project_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `external` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `projects_deleted_project_id_foreign` (`project_id`),
  KEY `projects_deleted_user_id_foreign` (`user_id`),
  CONSTRAINT `projects_deleted_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `projects_deleted_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects_deleted`
--

LOCK TABLES `projects_deleted` WRITE;
/*!40000 ALTER TABLE `projects_deleted` DISABLE KEYS */;
/*!40000 ALTER TABLE `projects_deleted` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `projects_demos`
--

DROP TABLE IF EXISTS `projects_demos`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `projects_demos` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `project_id` int(10) unsigned NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `dimentions` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `skin` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `size` int(11) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `projects_demos_project_id_foreign` (`project_id`),
  KEY `projects_demos_user_id_foreign` (`user_id`),
  CONSTRAINT `projects_demos_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `projects_demos_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `projects_demos`
--

LOCK TABLES `projects_demos` WRITE;
/*!40000 ALTER TABLE `projects_demos` DISABLE KEYS */;
/*!40000 ALTER TABLE `projects_demos` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promo_codes`
--

DROP TABLE IF EXISTS `promo_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `promo_codes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `limit` int(11) NOT NULL DEFAULT '1',
  `rabat` int(11) NOT NULL DEFAULT '10',
  `start_date` datetime NOT NULL,
  `expiration_date` datetime NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '1',
  `limit_enabled` tinyint(4) NOT NULL DEFAULT '1',
  `date_enabled` tinyint(4) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `promo_codes_code_unique` (`code`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promo_codes`
--

LOCK TABLES `promo_codes` WRITE;
/*!40000 ALTER TABLE `promo_codes` DISABLE KEYS */;
INSERT INTO `promo_codes` VALUES (1,'*',1,0,'2016-09-18 11:16:04','2016-09-18 11:16:05',1,1,1,NULL,NULL),(2,'darkan',100,0,'2017-04-11 21:47:31','2017-04-21 21:47:34',1,1,1,'2017-04-10 19:47:49','2017-04-10 19:47:49');
/*!40000 ALTER TABLE `promo_codes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `promo_codes_to_users`
--

DROP TABLE IF EXISTS `promo_codes_to_users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `promo_codes_to_users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `promo_code_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `promo_codes_to_users_user_id_foreign` (`user_id`),
  KEY `promo_codes_to_users_promo_code_id_foreign` (`promo_code_id`),
  CONSTRAINT `promo_codes_to_users_promo_code_id_foreign` FOREIGN KEY (`promo_code_id`) REFERENCES `promo_codes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `promo_codes_to_users_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `promo_codes_to_users`
--

LOCK TABLES `promo_codes_to_users` WRITE;
/*!40000 ALTER TABLE `promo_codes_to_users` DISABLE KEYS */;
/*!40000 ALTER TABLE `promo_codes_to_users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `reselers_to_distributors`
--

DROP TABLE IF EXISTS `reselers_to_distributors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `reselers_to_distributors` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `reseler_id` int(10) unsigned NOT NULL,
  `distributor_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `reselers_to_distributors_reseler_id_foreign` (`reseler_id`),
  KEY `reselers_to_distributors_distributor_id_foreign` (`distributor_id`),
  CONSTRAINT `reselers_to_distributors_distributor_id_foreign` FOREIGN KEY (`distributor_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `reselers_to_distributors_reseler_id_foreign` FOREIGN KEY (`reseler_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `reselers_to_distributors`
--

LOCK TABLES `reselers_to_distributors` WRITE;
/*!40000 ALTER TABLE `reselers_to_distributors` DISABLE KEYS */;
INSERT INTO `reselers_to_distributors` VALUES (1,41,40);
/*!40000 ALTER TABLE `reselers_to_distributors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `role_user`
--

DROP TABLE IF EXISTS `role_user`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `role_user` (
  `user_id` int(10) unsigned NOT NULL,
  `role_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`user_id`,`role_id`),
  KEY `role_user_role_id_foreign` (`role_id`),
  CONSTRAINT `role_user_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `role_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `role_user`
--

LOCK TABLES `role_user` WRITE;
/*!40000 ALTER TABLE `role_user` DISABLE KEYS */;
INSERT INTO `role_user` VALUES (1,1),(2,2),(3,4),(4,4),(5,4),(6,13),(7,12),(8,12),(9,3),(10,3),(11,3),(12,3),(13,3),(14,3),(15,3),(16,3),(17,3),(18,3),(19,3),(20,3),(21,3),(22,3),(23,3),(24,3),(25,3),(26,3),(27,3),(28,3),(29,2),(30,3),(31,3),(32,3),(33,3),(34,10),(35,10),(36,10),(37,10),(38,10),(39,11),(40,6),(41,9),(42,3),(43,10),(44,11),(45,3),(46,3);
/*!40000 ALTER TABLE `role_user` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `roles`
--

DROP TABLE IF EXISTS `roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `roles` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `display_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '1',
  `order` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `roles_name_unique` (`name`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `roles`
--

LOCK TABLES `roles` WRITE;
/*!40000 ALTER TABLE `roles` DISABLE KEYS */;
INSERT INTO `roles` VALUES (1,'owner','Project Owner','User is the owner of a given project',1,0,NULL,NULL),(2,'admin','User Administrator','User is allowed to manage and edit other users',1,0,NULL,NULL),(3,'user','User','User is allowed to visit page',1,0,NULL,NULL),(4,'creator','Creator','',1,0,NULL,NULL),(5,'affiliate','Affiliate','',1,0,NULL,NULL),(6,'distributor','Distributor','',1,0,NULL,NULL),(7,'partner','Partner','',1,0,NULL,NULL),(8,'superadmin','Superadmin','',1,0,NULL,NULL),(9,'reseler','Reseler','',1,0,NULL,NULL),(10,'registered','Registered','',1,0,NULL,NULL),(11,'lms','lms','Lms user',1,0,NULL,NULL),(12,'api','api','Api admin user',1,0,NULL,NULL),(13,'testdrive','Test Drive','Test Drive user',1,0,NULL,NULL);
/*!40000 ALTER TABLE `roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales_coupons`
--

DROP TABLE IF EXISTS `sales_coupons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sales_coupons` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `code` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `sales_coupon_group_id` int(10) unsigned NOT NULL,
  `plan_id` int(10) unsigned NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `cost` decimal(10,2) NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '1',
  `downloaded` tinyint(4) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `sales_coupons_code_unique` (`code`),
  KEY `sales_coupons_sales_coupon_group_id_foreign` (`sales_coupon_group_id`),
  KEY `sales_coupons_plan_id_foreign` (`plan_id`),
  CONSTRAINT `sales_coupons_plan_id_foreign` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `sales_coupons_sales_coupon_group_id_foreign` FOREIGN KEY (`sales_coupon_group_id`) REFERENCES `sales_coupons_groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales_coupons`
--

LOCK TABLES `sales_coupons` WRITE;
/*!40000 ALTER TABLE `sales_coupons` DISABLE KEYS */;
INSERT INTO `sales_coupons` VALUES (1,'darkan_58af1f83bc547',1,1,'',150.00,1,1,'2017-02-23 16:44:35','2017-02-23 16:44:55'),(2,'darkan_58af1f83c7aeb',1,1,'',150.00,1,1,'2017-02-23 16:44:35','2017-02-23 16:44:55'),(3,'uyuyg58e6896469e6b',1,1,'',0.00,1,0,'2017-04-06 18:31:00','2017-04-06 18:31:00'),(4,'uyuyg58e689647ada3',1,1,'',0.00,1,0,'2017-04-06 18:31:00','2017-04-06 18:31:00'),(5,'uyuyg58e68964812f5',1,1,'',0.00,1,0,'2017-04-06 18:31:00','2017-04-06 18:31:00');
/*!40000 ALTER TABLE `sales_coupons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sales_coupons_groups`
--

DROP TABLE IF EXISTS `sales_coupons_groups`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sales_coupons_groups` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sales_coupons_groups`
--

LOCK TABLES `sales_coupons_groups` WRITE;
/*!40000 ALTER TABLE `sales_coupons_groups` DISABLE KEYS */;
INSERT INTO `sales_coupons_groups` VALUES (1,'darkan','');
/*!40000 ALTER TABLE `sales_coupons_groups` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scorm`
--

DROP TABLE IF EXISTS `scorm`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scorm` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `course_id` int(10) unsigned NOT NULL,
  `lesson_location` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `lesson_status` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `session_time` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `total_time` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `score_raw` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `score_min` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `score_max` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `suspend_data` text COLLATE utf8_unicode_ci NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `scorm_user_id_foreign` (`user_id`),
  KEY `scorm_course_id_foreign` (`course_id`),
  CONSTRAINT `scorm_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `banners_projects` (`id_banner`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `scorm_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scorm`
--

LOCK TABLES `scorm` WRITE;
/*!40000 ALTER TABLE `scorm` DISABLE KEYS */;
/*!40000 ALTER TABLE `scorm` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scorm_data`
--

DROP TABLE IF EXISTS `scorm_data`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scorm_data` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `course_id` int(10) unsigned NOT NULL,
  `create_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `modify_date` datetime DEFAULT '1970-01-02 00:00:00',
  `data` text COLLATE utf8_unicode_ci NOT NULL,
  `course_status` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `user_score` varchar(200) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `lesson_location` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '1',
  `page_time` varchar(256) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `mailing_login` varchar(256) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `score_max` double NOT NULL DEFAULT '0',
  `score_min` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `success_status` varchar(256) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `session_time` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`),
  KEY `scorm_data_user_id_foreign` (`user_id`),
  KEY `scorm_data_course_id_foreign` (`course_id`),
  CONSTRAINT `scorm_data_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `banners_projects` (`id_banner`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `scorm_data_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scorm_data`
--

LOCK TABLES `scorm_data` WRITE;
/*!40000 ALTER TABLE `scorm_data` DISABLE KEYS */;
INSERT INTO `scorm_data` VALUES (11,44,15,'2017-04-12 13:45:04','2017-04-12 13:45:23','{\"uc\":[\"399e2a8e09546bf181ba201ffb5208f7\"],\"o\":[\"0,2,1,1\",\"0,1,2,1\",\"0,1,3,2\"],\"p\":[1,2,3],\"q\":{\"0,2,1\":{\"#0\":{\"c\":true},\"#1\":{\"c\":false}},\"0,1,2\":{\"#0\":{\"c\":true},\"#1\":{\"c\":false}},\"0,1,3\":{\"#0\":{\"choosen\":false},\"#1\":{\"choosen\":true}}},\"a\":{\"0,2,1\":\"1\",\"0,1,2\":\"1\",\"0,1,3\":\"1\"},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":\"20\"},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":30},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":\"67\"},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"3\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":3},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":null},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":2},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":3},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":1}],\"p\":[]},\"s\":{}}','passed','20','0','{\"0\":5,\"1\":3,\"2\":3}','0',0,'0','0','0'),(18,29,27,'2017-05-23 12:47:23','2017-05-23 13:00:22','{\"uc\":[\"ff82b34b52049937fb82ce2c50129e8a\"],\"o\":[],\"p\":[1],\"q\":{},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"1\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":null},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[]},\"s\":{}}','passed','0','0','{\"0\":120}','0',0,'0','0','0'),(19,29,29,'2017-05-23 18:18:07','2017-05-23 18:52:34','{\"uc\":[\"ff82b34b52049937fb82ce2c50129e8a\"],\"o\":[],\"p\":[1],\"q\":{},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"1\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":null},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[]},\"s\":{}}','passed','0','0','{\"0\":10}','0',0,'0','0','0'),(20,29,32,'2017-06-03 15:08:22','2017-06-03 15:08:23','{\"uc\":[\"ff82b34b52049937fb82ce2c50129e8a\"],\"o\":[],\"p\":[1],\"q\":{},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":null},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[]},\"s\":{}}','passed','0','0','{\"0\":0}','0',0,'0','0','0'),(21,29,33,'2017-06-03 15:09:30','2017-06-03 15:09:31','{\"uc\":[\"ff82b34b52049937fb82ce2c50129e8a\"],\"o\":[],\"p\":[1],\"q\":{\"0,2,1\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":null},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[]},\"s\":{}}','passed','0','0','{\"0\":0}','0',0,'0','0','0'),(22,29,34,'2017-06-03 15:11:52','2017-06-03 15:12:15','{\"uc\":[\"ff82b34b52049937fb82ce2c50129e8a\"],\"o\":[],\"p\":[1],\"q\":{\"0,2,1\":{\"#0\":{\"c\":false},\"#1\":{\"c\":true}}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"1\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":2},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":null},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":1}],\"p\":[]},\"s\":{}}','passed','0','0','{\"0\":7}','0',0,'0','0','0');
/*!40000 ALTER TABLE `scorm_data` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scorm_data_guest`
--

DROP TABLE IF EXISTS `scorm_data_guest`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `scorm_data_guest` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `course_id` int(10) unsigned NOT NULL,
  `create_date` datetime NOT NULL,
  `modify_date` datetime NOT NULL,
  `data` text COLLATE utf8_unicode_ci NOT NULL,
  `course_status` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `scorm_data_guest_course_id_foreign` (`course_id`),
  CONSTRAINT `scorm_data_guest_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `banners_projects` (`id_banner`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scorm_data_guest`
--

LOCK TABLES `scorm_data_guest` WRITE;
/*!40000 ALTER TABLE `scorm_data_guest` DISABLE KEYS */;
/*!40000 ALTER TABLE `scorm_data_guest` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `sessions`
--

DROP TABLE IF EXISTS `sessions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8_unicode_ci,
  `payload` text COLLATE utf8_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL,
  UNIQUE KEY `sessions_id_unique` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `sessions`
--

LOCK TABLES `sessions` WRITE;
/*!40000 ALTER TABLE `sessions` DISABLE KEYS */;
INSERT INTO `sessions` VALUES ('gTJENvIHyaEh1QFFnrbOWVtZOiA9dHNqgWlBIJds',29,'127.0.0.1','Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3121.0 Safari/537.36','YTo5OntzOjY6Il90b2tlbiI7czo0MDoiamc0eVo4SHBSTWYyU1BEWjBUUFhOZHIxTllOcGdqek1jV0ZTTE5QTCI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czowOiIiO3M6MTA6InJlZ2lvbk5hbWUiO3M6MTA6IkNhbGlmb3JuaWEiO3M6ODoiY2l0eU5hbWUiO3M6MTM6Ik1vdW50YWluIFZpZXciO3M6NzoiemlwQ29kZSI7czowOiIiO3M6NzoiaXNvQ29kZSI7czowOiIiO3M6MTA6InBvc3RhbENvZGUiO3M6NToiOTQwNDMiO3M6ODoibGF0aXR1ZGUiO3M6NzoiMzcuNDE5MiI7czo5OiJsb25naXR1ZGUiO3M6OToiLTEyMi4wNTc0IjtzOjk6Im1ldHJvQ29kZSI7czowOiIiO3M6ODoiYXJlYUNvZGUiO3M6MDoiIjtzOjM6ImlzcCI7czowOiIiO3M6MjoiaXAiO3M6MTA6IjY2LjEwMi4wLjAiO3M6NjoiZHJpdmVyIjtzOjM1OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXElwSW5mbyI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czozMzoiaHR0cDovL2Rhcmthbi5sb2NhbC9lZGl0b3IvaW1hZ2VzIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319czo1MDoibG9naW5fd2ViXzU5YmEzNmFkZGMyYjJmOTQwMTU4MGYwMTRjN2Y1OGVhNGUzMDk4OWQiO2k6Mjk7czo3OiJoYXNQbGFuIjtiOjE7czo5OiJsb2dpbmFzaWQiO2k6Mjk7czo3OiJpc0FkbWluIjtiOjA7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE0OTY3MzAxMTI7czoxOiJjIjtpOjE0OTY3MjkxMjc7czoxOiJsIjtzOjE6IjAiO319',1496730112);
/*!40000 ALTER TABLE `sessions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `share`
--

DROP TABLE IF EXISTS `share`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `share` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `project_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `share_user_id_foreign` (`user_id`),
  KEY `share_project_id_foreign` (`project_id`),
  CONSTRAINT `share_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `share_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `share`
--

LOCK TABLES `share` WRITE;
/*!40000 ALTER TABLE `share` DISABLE KEYS */;
/*!40000 ALTER TABLE `share` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `share_noexists`
--

DROP TABLE IF EXISTS `share_noexists`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `share_noexists` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `mail` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `project_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `share_noexists_project_id_foreign` (`project_id`),
  CONSTRAINT `share_noexists_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `share_noexists`
--

LOCK TABLES `share_noexists` WRITE;
/*!40000 ALTER TABLE `share_noexists` DISABLE KEYS */;
/*!40000 ALTER TABLE `share_noexists` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `share_user_template`
--

DROP TABLE IF EXISTS `share_user_template`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `share_user_template` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `owner_id` int(10) unsigned NOT NULL,
  `user_id` int(10) unsigned NOT NULL,
  `template_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `share_user_template_owner_id_foreign` (`owner_id`),
  KEY `share_user_template_user_id_foreign` (`user_id`),
  KEY `share_user_template_template_id_foreign` (`template_id`),
  CONSTRAINT `share_user_template_owner_id_foreign` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `share_user_template_template_id_foreign` FOREIGN KEY (`template_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `share_user_template_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `share_user_template`
--

LOCK TABLES `share_user_template` WRITE;
/*!40000 ALTER TABLE `share_user_template` DISABLE KEYS */;
/*!40000 ALTER TABLE `share_user_template` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `testdrive`
--

DROP TABLE IF EXISTS `testdrive`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `testdrive` (
  `email` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `testdrive`
--

LOCK TABLES `testdrive` WRITE;
/*!40000 ALTER TABLE `testdrive` DISABLE KEYS */;
/*!40000 ALTER TABLE `testdrive` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `transactions`
--

DROP TABLE IF EXISTS `transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `transactions` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `merchant_id` int(11) NOT NULL,
  `pos_id` int(11) NOT NULL,
  `session_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `amount` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `currency` varchar(3) COLLATE utf8_unicode_ci NOT NULL,
  `order_id` int(11) NOT NULL,
  `statement` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `sign` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `transactions`
--

LOCK TABLES `transactions` WRITE;
/*!40000 ALTER TABLE `transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `transactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `user_login`
--

DROP TABLE IF EXISTS `user_login`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `user_login` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `date_login` datetime NOT NULL,
  `date_logout` datetime NOT NULL,
  `browser` varchar(500) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `ip` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `countryName` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `countryCode` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `regionCode` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `regionName` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `cityName` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `latitude` text COLLATE utf8_unicode_ci NOT NULL,
  `longitude` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `driver` varchar(500) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user_login_user_id_foreign` (`user_id`),
  CONSTRAINT `user_login_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `user_login`
--

LOCK TABLES `user_login` WRITE;
/*!40000 ALTER TABLE `user_login` DISABLE KEYS */;
INSERT INTO `user_login` VALUES (1,44,'2017-04-12 13:42:44','2017-04-12 13:42:44','Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.54 Safari/537.36','66.102.0.0','United States','US','CA','California','Mountain View','37.4192','-122.0574','Stevebauman\\Location\\Drivers\\FreeGeoIp','2017-04-12 11:42:44','2017-04-12 11:42:44'),(2,29,'2017-04-19 07:18:01','2017-04-19 07:18:01','Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.68 Safari/537.36','66.102.0.0','United States','US','CA','California','Mountain View','37.4192','-122.0574','Stevebauman\\Location\\Drivers\\FreeGeoIp','2017-04-19 05:18:01','2017-04-19 05:18:01');
/*!40000 ALTER TABLE `user_login` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `password` varchar(64) COLLATE utf8_unicode_ci NOT NULL,
  `provider_id` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `lang` varchar(3) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'pl',
  `active` int(11) NOT NULL DEFAULT '0',
  `photo` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'default',
  `subdomain` varchar(25) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `subdomain_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `hash` varchar(40) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `download_project` int(11) NOT NULL DEFAULT '0',
  `folders_layout` int(11) NOT NULL DEFAULT '1',
  `folders_structure` text COLLATE utf8_unicode_ci,
  `visible` tinyint(4) NOT NULL DEFAULT '1',
  `version` varchar(10) COLLATE utf8_unicode_ci NOT NULL DEFAULT '2.0.0',
  `api_id` int(11) NOT NULL DEFAULT '1',
  `remember_token` varchar(100) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `users_email_unique` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=47 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (1,'Owner','owner@rapsody.com.pl','$2y$10$m8wHNRCCG9Y/bL0iRqwhDefBcKlU4/EmGynGWt37qGoE5isxY9vAq','','pl',0,'default','owner','owner','',0,1,NULL,1,'2.0.0',1,NULL,'2017-02-23 16:38:55','2017-02-23 16:38:55'),(2,'Admin','admin@rapsody.com.pl','$2y$10$m8wHNRCCG9Y/bL0iRqwhDefBcKlU4/EmGynGWt37qGoE5isxY9vAq','','pl',0,'default','admin','admin','',0,1,'{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}',1,'2.0.0',1,'2zgvZB6DXhnW3mSgkHFsi41RSvTVBD1NIIFAgJR8NBXRB7KHddUS5rLNVy3t','2017-02-23 16:38:55','2017-04-11 11:45:53'),(3,'Template User','template@rapsody.com.pl','$2y$10$m8wHNRCCG9Y/bL0iRqwhDefBcKlU4/EmGynGWt37qGoE5isxY9vAq','','pl',0,'default','template','template','',0,1,NULL,1,'2.0.0',1,NULL,'2017-02-23 16:38:55','2017-02-23 16:38:55'),(4,'Examples User','examples@rapsody.com.pl','$2y$10$m8wHNRCCG9Y/bL0iRqwhDefBcKlU4/EmGynGWt37qGoE5isxY9vAq','','pl',0,'default','examples','examples','',0,1,NULL,1,'2.0.0',1,NULL,'2017-02-23 16:38:55','2017-02-23 16:38:55'),(5,'Distribution User','distribution@rapsody.com.pl','$2y$10$m8wHNRCCG9Y/bL0iRqwhDefBcKlU4/EmGynGWt37qGoE5isxY9vAq','','pl',0,'default','distribution','distribution','',0,1,NULL,1,'2.0.0',1,NULL,'2017-02-23 16:38:55','2017-02-23 16:38:55'),(6,'Test Drive','testdrive@rapsody.com.pl','$2y$10$m8wHNRCCG9Y/bL0iRqwhDefBcKlU4/EmGynGWt37qGoE5isxY9vAq','','pl',0,'default','testdrive','testdrive','',0,1,'{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"23\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":6,\"version\":\"2.0.0\",\"date\":\"2017-05-15 14:45:58\",\"last_visit\":\"2017-05-15 14:45:58\",\"date_modification\":\"2017-05-15 14:45:58\",\"project_id\":50,\"folder\":0,\"pType\":\"userProjects\",\"size\":5053}],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}',1,'2.0.0',1,'O4cLXegCQ4sUuPT9JsPR5JOlzxfBuoUGQLHWahZWYm2oIadosvWorjjUvhL4','2017-02-23 16:38:55','2017-05-15 12:46:20'),(7,'Api demo admin','apidemoadmin@rapsody.com.pl','$2y$10$m8wHNRCCG9Y/bL0iRqwhDefBcKlU4/EmGynGWt37qGoE5isxY9vAq','','pl',0,'default','demo','demo','',0,1,NULL,1,'2.0.0',1,NULL,'2017-02-23 16:38:55','2017-02-23 16:38:55'),(8,'Api demo user','apidemouser@rapsody.com.pl','$2y$10$m8wHNRCCG9Y/bL0iRqwhDefBcKlU4/EmGynGWt37qGoE5isxY9vAq','','pl',0,'default','apidemouser','apidemouser','',0,1,NULL,1,'2.0.0',1,NULL,'2017-02-23 16:38:55','2017-02-23 16:38:55'),(9,'Test1','test1@rapsody.com.pl','$2y$10$z4BzPlGMRfAmw/h1X83xk.L7TLLtjQV2sDvOKKKiZiIDv8bbNU9XS','','pl',0,'default','test1','test1','',0,1,NULL,0,'2.0.0',1,NULL,'2017-02-23 16:38:55','2017-02-23 16:38:55'),(10,'Test2','test2@rapsody.com.pl','$2y$10$dew5BdIixhZZqTWZLdjsnemEwZTVMdC9de2DKGi5xoCyME9PIydfa','','pl',0,'default','test2','test2','',0,1,NULL,0,'2.0.0',1,NULL,'2017-02-23 16:38:55','2017-02-23 16:38:55'),(11,'Test3','test3@rapsody.com.pl','$2y$10$p3i5mjI7z4iRHk4VbhQUQuhwObcALHE2vB1XMhz2wjK7T3AX.e/by','','pl',0,'default','test3','test3','',0,1,NULL,0,'2.0.0',1,NULL,'2017-02-23 16:38:55','2017-02-23 16:38:55'),(12,'Test4','test4@rapsody.com.pl','$2y$10$3Ky2j11VdeWGbG3BT1OCY.F83fpOJ/iC.gjqIMq7gvSnScxFY9sC6','','pl',0,'default','test4','test4','',0,1,NULL,0,'2.0.0',1,NULL,'2017-02-23 16:38:56','2017-02-23 16:38:56'),(13,'Test5','test5@rapsody.com.pl','$2y$10$wkm8GvDj8WFMRIoVdoNfyumiaYzqmG/weFta.rrwh3IcAvU13zDM2','','pl',0,'default','test5','test5','',0,1,NULL,0,'2.0.0',1,NULL,'2017-02-23 16:38:56','2017-02-23 16:38:56'),(14,'Test6','test6@rapsody.com.pl','$2y$10$DIn/az7moxa.d/bX4a0YOuDm07/A32vdQV1QGGMXXV2VWquDVZciy','','pl',0,'default','test6','test6','',0,1,NULL,0,'2.0.0',1,NULL,'2017-02-23 16:38:56','2017-02-23 16:38:56'),(15,'Test7','test7@rapsody.com.pl','$2y$10$6kbsKCOLfq4SSVLIB8gisOD39pQS3eabtFHQ6HWFKEDawLWQ7b1r.','','pl',0,'default','test7','test7','',0,1,NULL,0,'2.0.0',1,NULL,'2017-02-23 16:38:56','2017-02-23 16:38:56'),(16,'Test8','test8@rapsody.com.pl','$2y$10$70eggTWuHT7su1JNivbW2eRhfrDUUN4GOxZJKrToqZARkrHJd3Gwq','','pl',0,'default','test8','test8','',0,1,NULL,0,'2.0.0',1,NULL,'2017-02-23 16:38:56','2017-02-23 16:38:56'),(17,'Test9','test9@rapsody.com.pl','$2y$10$Od8LcDa7V7y6wFZOZuMqu.VLmmp2gfDVH3JGPBZ67n0yX8hJh6wha','','pl',0,'default','test9','test9','',0,1,NULL,0,'2.0.0',1,NULL,'2017-02-23 16:38:56','2017-02-23 16:38:56'),(18,'Test10','test10@rapsody.com.pl','$2y$10$ctoxzUigmTdt9mdRtb1UROLGMy/eLcOK8096DbMu53uX4BXBVIoXq','','pl',0,'default','test10','test10','',0,1,NULL,0,'2.0.0',1,NULL,'2017-02-23 16:38:56','2017-02-23 16:38:56'),(19,'Test11','test11@rapsody.com.pl','$2y$10$xsyBs618IevetR89pMnhtecLWTCzgIe7DYPrIvdgdrg/JbcrHPKTK','','pl',0,'default','test11','test11','',0,1,NULL,0,'2.0.0',1,NULL,'2017-02-23 16:38:56','2017-02-23 16:38:56'),(20,'Test12','test12@rapsody.com.pl','$2y$10$0c4/DQuvlS1z2vT1wyOGRO5NEDBIcA26VZmwWUpJdE1l/tp6REkkK','','pl',0,'default','test12','test12','',0,1,NULL,0,'2.0.0',1,NULL,'2017-02-23 16:38:56','2017-02-23 16:38:56'),(21,'Test13','test13@rapsody.com.pl','$2y$10$IxbcDb0p3g0IaBsoN6mGP.HS9t.Zgl6Ye0tU/tCyhog6DHPvtb/b6','','pl',0,'default','test13','test13','',0,1,NULL,0,'2.0.0',1,NULL,'2017-02-23 16:38:56','2017-02-23 16:38:56'),(22,'Test14','test14@rapsody.com.pl','$2y$10$XJxpnKBdUEQcadV/XdJfnuiRk.U9RCmErKtydLxI.9Jm5Ra5YlLmS','','pl',0,'default','test14','test14','',0,1,NULL,0,'2.0.0',1,NULL,'2017-02-23 16:38:56','2017-02-23 16:38:56'),(23,'Test15','test15@rapsody.com.pl','$2y$10$BokA8uzqDeiyXkMVc0BfbO8gIt0SRcN9KI1bBbi1wHfdUN1HRuK12','','pl',0,'default','test15','test15','',0,1,NULL,0,'2.0.0',1,NULL,'2017-02-23 16:38:56','2017-02-23 16:38:56'),(24,'Test16','test16@rapsody.com.pl','$2y$10$EtlG26GiF9iO0v.na0Wx.ODkxVGKQ6DU.8aCmlmRN5lcgBHsfVMWu','','pl',0,'default','test16','test16','',0,1,NULL,0,'2.0.0',1,NULL,'2017-02-23 16:38:56','2017-02-23 16:38:56'),(25,'Test17','test17@rapsody.com.pl','$2y$10$75FCnaxpBnFZMG44qRdK3OQzSgW8J06V6wY/E8puOZNJ.5BZwyOu2','','pl',0,'default','test17','test17','',0,1,NULL,0,'2.0.0',1,NULL,'2017-02-23 16:38:56','2017-02-23 16:38:56'),(26,'Test18','test18@rapsody.com.pl','$2y$10$/gWYQjKen/HtyE.H1nYeO.vCl1sTtJz.e22AwwlYkieUR5zHQK3fa','','pl',0,'default','test18','test18','',0,1,NULL,0,'2.0.0',1,NULL,'2017-02-23 16:38:57','2017-02-23 16:38:57'),(27,'Test19','test19@rapsody.com.pl','$2y$10$joYRoVrLWt4qL2EFzznr7OQc0qyvDNe5FrKd5TzyT2l0uhwcpEq.y','','pl',0,'default','test19','test19','',0,1,NULL,0,'2.0.0',1,NULL,'2017-02-23 16:38:57','2017-02-23 16:38:57'),(28,'Test20','test20@rapsody.com.pl','$2y$10$qtkQJAfnC/LUID8M67SCBOtZRfMPQcASJcy.57gi1ArpqnAhA.FA6','','pl',0,'default','test20','test20','',0,1,NULL,0,'2.0.0',1,NULL,'2017-02-23 16:38:57','2017-02-23 16:38:57'),(29,'Tomasz Wiśniewski','t.wisniewski@rapsody.com.pl','$2y$10$Go9qSiLAOVdSlTmtBfR.nuJt6JWcU7CQvKq9KfLV0WL/clYxupu5q','','pl',0,'https://darkan.eu/storage/app/projects/29/avatar/avatar.png','twisniewski','twisniewski','',0,1,'{\"lastFolderID\":4,\"lastVisitedFolderID\":0,\"objs\":[{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Nowy projekt\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2017-05-22 20:20:23\",\"last_visit\":\"2017-05-22 20:20:23\",\"date_modification\":\"2017-05-22 20:20:23\",\"project_id\":51,\"folder\":3,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Nowy projekt\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2017-05-22 20:20:30\",\"last_visit\":\"2017-05-22 20:20:30\",\"date_modification\":\"2017-05-22 20:20:30\",\"project_id\":52,\"folder\":3,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"track\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2017-05-23 12:25:53\",\"last_visit\":\"2017-05-23 12:25:53\",\"date_modification\":\"2017-05-23 12:25:53\",\"project_id\":59,\"folder\":4,\"pType\":\"userProjects\",\"size\":82222},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"starter\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2017-05-23 12:45:03\",\"last_visit\":\"2017-05-23 12:45:03\",\"date_modification\":\"2017-05-23 12:45:03\",\"project_id\":60,\"folder\":4,\"pType\":\"userProjects\",\"size\":60961},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"try\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2017-05-23 13:54:28\",\"last_visit\":\"2017-05-23 13:54:28\",\"date_modification\":\"2017-05-23 13:54:28\",\"project_id\":61,\"folder\":4,\"pType\":\"userProjects\",\"size\":81357},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"testowy1\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2017-05-23 17:43:11\",\"last_visit\":\"2017-05-23 17:43:11\",\"date_modification\":\"2017-05-23 17:43:11\",\"project_id\":64,\"folder\":4,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"info\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2017-05-23 17:52:31\",\"last_visit\":\"2017-05-23 17:52:31\",\"date_modification\":\"2017-05-23 17:52:31\",\"project_id\":65,\"folder\":4,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"hmm\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2017-05-23 17:53:40\",\"last_visit\":\"2017-05-23 17:53:40\",\"date_modification\":\"2017-05-23 17:53:40\",\"project_id\":66,\"folder\":4,\"pType\":\"userProjects\",\"size\":62871},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"start1\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2017-05-23 18:05:39\",\"last_visit\":\"2017-05-23 18:05:39\",\"date_modification\":\"2017-05-23 18:05:39\",\"project_id\":67,\"folder\":4,\"pType\":\"userProjects\",\"size\":5053},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"try\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2017-05-23 18:10:15\",\"last_visit\":\"2017-05-23 18:10:15\",\"date_modification\":\"2017-05-23 18:10:15\",\"project_id\":68,\"folder\":4,\"pType\":\"userProjects\",\"size\":882},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"work\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2017-05-23 18:11:22\",\"last_visit\":\"2017-05-23 18:11:22\",\"date_modification\":\"2017-05-23 18:11:22\",\"project_id\":69,\"folder\":4,\"pType\":\"userProjects\",\"size\":80905},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"start\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2017-05-23 18:28:30\",\"last_visit\":\"2017-05-23 18:28:30\",\"date_modification\":\"2017-05-23 18:28:30\",\"project_id\":70,\"folder\":4,\"pType\":\"userProjects\",\"size\":58955},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"kolejka\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2017-05-23 18:31:21\",\"last_visit\":\"2017-05-23 18:31:21\",\"date_modification\":\"2017-05-23 18:31:21\",\"project_id\":71,\"folder\":4,\"pType\":\"userProjects\",\"size\":79694},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"nowy startowy\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2017-05-23 18:34:36\",\"last_visit\":\"2017-05-23 18:34:36\",\"date_modification\":\"2017-05-23 18:34:36\",\"project_id\":72,\"folder\":0,\"pType\":\"userProjects\",\"size\":86065},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"nowy2\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2017-05-23 18:45:15\",\"last_visit\":\"2017-05-23 18:45:15\",\"date_modification\":\"2017-05-23 18:45:15\",\"project_id\":73,\"folder\":0,\"pType\":\"userProjects\",\"size\":222811},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"sergsg\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2017-06-03 14:39:21\",\"last_visit\":\"2017-06-03 14:39:21\",\"date_modification\":\"2017-06-03 14:39:21\",\"project_id\":74,\"folder\":0,\"pType\":\"userProjects\",\"size\":88100}],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0},{\"folder\":0,\"folderID\":3,\"name\":\"new\",\"pType\":\"folder\"},{\"folder\":0,\"folderID\":4,\"name\":\"track\",\"pType\":\"folder\"}]}',1,'2.0.0',1,'6J2YFjaX6ThMdhSEq8COWh80bLCSdVWNbDxUjFOaIE7oq13KRpuFB6mmWTtA','2017-02-23 16:38:57','2017-06-03 12:39:21'),(30,'Jarosław Wieczorkowski','j.wieczorkowski@rapsody.com','$2y$10$wxAbU4ZzBt.zPotx.Dfgmec5I2VgikGkjyjpoXjCGfKsXhJbU1YFq','','pl',0,'default','jwieczorkowski','jwieczorkowski','',0,1,NULL,1,'2.0.0',1,NULL,'2017-02-23 16:38:57','2017-02-23 16:38:57'),(31,'Hubert Biszkont','huberthc@gmail.com','$2y$10$ExPLGVXh.dMWp0tG6Mf4TOzC3Qd5ZjpIMiFmR2GyOU.ZnHluQKtkO','','pl',0,'default','huberthc','huberthc','',0,1,NULL,1,'2.0.0',1,NULL,'2017-02-23 16:38:57','2017-02-23 16:38:57'),(32,'Tomasz Chmielik','t.chmielik@rapsody.com.pl','$2y$10$S5YGkeFqdQa8lKQM0Xe/8uYh8VvJxx8yjMOOuRWlya24MTDvLiq1.','','pl',0,'default','tchmielik','tchmielik','',0,1,NULL,1,'2.0.0',1,NULL,'2017-02-23 16:38:57','2017-02-23 16:38:57'),(33,'Jarosław Kutyna','j.kutyna@rapsody.com.pl ','$2y$10$PFpyJAB82V/4Q0GT4./mTuir5YN0wr0YmMyrghTcRj70i86KHR79e','','pl',0,'default','jkutyna','jkutyna','',0,1,NULL,1,'2.0.0',1,NULL,'2017-02-23 16:38:57','2017-02-23 16:38:57'),(34,'Hubert Biszkont','huberthc+1232132@gmail.com','$2y$10$C0T1u883GZdumPA9M.uuYe36IoPmxXB4/0zqZ8ifw6otqv/e76S3i','','pl;',1,'https://darkan.eu/storage/app/projects/34/avatar/avatar.png','huberthc+1232132','huberthc+1232132','2aedb679f401f532003480053c1e2f24',0,1,NULL,1,'2.0.0',1,'5kZLqHA1FHZ6QC1oJEO0h5dMYZGLPzloZbISLQvYXmzmOxe7A9RmWLiyEQRu','2017-03-29 21:06:32','2017-03-29 21:07:22'),(35,'Hubert Biszkont','huberthc+32131@gmail.com','$2y$10$i5/jI.50JP0JoftbewMpNuEUgIQkjAnQoKv8piixzoFbVM25bJDP6','','pl;',1,'https://darkan.eu/storage/app/projects/35/avatar/avatar.png','huberthc+32131','huberthc+32131','ca4e20bd126f39438d0e8bcfffece5aa',0,1,NULL,1,'2.0.0',1,'oM7mVU7szHki6vUcyPfXYnfggqMdaeqQFPE7ovQfdVOkC265ggRtnjF3oKum','2017-03-29 21:07:34','2017-03-29 21:08:13'),(36,'Hubert Biszkont','huberthc+asdczx@gmail.com','$2y$10$YOkYYWJffZgU2BW7PNdFQOByQNkv2ZKwSLaxZo1m3SPdPDozUVPGO','','pl',1,'https://darkan.eu/storage/app/projects/36/avatar/avatar.png','huberthc+asdczx','huberthc+asdczx','2951138622e96a74f19f3c9f195fe342',0,1,'{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}',1,'2.0.0',1,NULL,'2017-03-29 21:08:32','2017-03-29 21:08:52'),(37,'Tomasz Wiśniewski','darkanmac@gmail.com','$2y$10$uELS/ePbkJV3/637AQ9Fq.o61aIXuHwXwWlVY.0HQIKe6H6gVWvjq','','en',1,'https://darkan.eu/storage/app/projects/37/avatar/avatar.png','darkanmac','darkanmac','73626fa2d30fcfe73b0e62da7d8ba8d2',0,1,NULL,1,'2.0.0',1,'ndBHo2aJNkPf1FwbPev3DN8j6gCJ0j1jJHeo6fYDMHL4CRFEQGLLl8CmPO5g','2017-03-31 03:52:16','2017-03-31 03:53:05'),(38,'ssdcsd','dfdsfsdfsdf@asfsa.pl','$2y$10$UdYwgOTu/8sOAYLVx1iHKe2SPkLqf7QWRoL9Ze8fmWvkIAomLuY9i','','pl',1,'https://darkan.eu/storage/app/projects/38/avatar/avatar.png','dfdsfsdfsdf','dfdsfsdfsdf','4fc292fbb0127794f240f4a1cf48259f',0,1,NULL,1,'2.0.0',1,NULL,'2017-04-06 18:37:12','2017-04-06 18:37:12'),(39,'j4r2c5wo.m11@20email.eu','j4r2c5wo.m11@20email.eu','$2y$10$gk53dvQGMj0i5.Y1nS/6l.Ue2D8Rayf7I/i.GXA6Pa4qfG7QdErLq','','en',1,'https://darkan.eu/storage/app/projects/39/avatar/avatar.png','j4r2c5wom11','j4r2c5wom11','e07544fccb3e976a032091c482dab855',0,1,'{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}',1,'2.0.0',1,'SxjyKX6cOKlNBvvKFwwflFLT6OiOT1lfdnTuTtI3G8Mo1mgTeyph4f6N5GLy','2017-04-10 09:05:27','2017-04-10 10:53:24'),(40,'new','new@darkan.me','$2y$10$RlGsGQO24enKP8oONGmAxek9OfkQ7DTP1jhb84R1T0XwSURv/t6Jy','','en',1,'https://darkan.eu/storage/app/projects/40/avatar/avatar.png','new','new','431a61901c437ad6a5f2bd40d40296fe',0,1,NULL,1,'2.0.0',1,'1LfVCbGSgglN4T8oEaVCtoJwWg21Iv8xjkoKFMZvMcRuG6I6Mo0cJLX5DDp1','2017-04-10 14:50:00','2017-04-11 17:54:59'),(41,'new1','res@darkan.me','$2y$10$Lz8L0jFrOcfRfplN4OPSYuZinB09PjevpLpGZ2cpzzwlIOkRqiZMG','','en',1,'https://darkan.eu/storage/app/projects/41/avatar/avatar.png','res','res','006087db71a6fbd5bdb087953ef570be',0,1,NULL,1,'2.0.0',1,NULL,'2017-04-10 14:51:31','2017-04-10 14:51:31'),(42,'start','new3@darkan.me','$2y$10$a4oXiatgcDnXGyjihI.iyO/qE0v..YXTickvw1qVA5myeYb9YO0fq','','en',1,'https://darkan.eu/storage/app/projects/42/avatar/avatar.png','new3','new3','2c1027a07fd25630d01011d10b8058f2',0,1,'{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"new\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":42,\"version\":\"2.0.0\",\"date\":\"2017-04-10 21:53:33\",\"last_visit\":\"2017-04-10 21:53:33\",\"date_modification\":\"2017-04-10 21:53:33\",\"project_id\":21,\"folder\":0,\"pType\":\"userProjects\",\"size\":362196}],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}',1,'2.0.0',1,NULL,'2017-04-10 14:52:40','2017-04-10 19:53:33'),(43,'Jarosław Wieczorkowski','j.wieczorkowski@rapsody.com.pl','$2y$10$kbwTENsSpGwUqbCOqLCwne8j7qLO4YwDyLVJ/kUmy3W2CZfO/ep1i','','pl',1,'https://darkan.eu/storage/app/projects/43/avatar/avatar.png','jwieczorkowski1','jwieczorkowski1','94f1c91b6cb5a0725b572317b04008ef',0,1,'{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}',1,'2.0.0',1,'DOvLtkvmDhnN2sORbzcwgGeHzT137HBTK12XPNhkULjU7di8XYB6UTcIV9Kj','2017-04-11 16:07:46','2017-04-11 16:09:13'),(44,'asdsad','asasdasd@nieistniejeddd.pl','$2y$10$7Ugpd4ehEd82DSHG3yJsre9D2qgKnlDuvEMAhIoCBDHw0bwh2Czaa','','pl',1,'https://darkan.eu/storage/app/projects/44/avatar/avatar.png','asasdasd','asasdasd','52ea10640c961787432b24450a8e05e0',0,1,NULL,1,'2.0.0',1,'pUAUELO3Uu1uDw8j8coSK1MXUADunWNzllPFd5MfTnn4ytx2qNk58vaueqOS','2017-04-12 10:39:43','2017-04-12 11:42:29'),(45,'ir035tn5.ugj@20minute.email','ir035tn5.ugj@20minute.email','$2y$10$w5dnRJQj1vccG2lns.JBeu5f.JVVqhqNEGy0bDzDbFQCa5W/YzNWK','','en',1,'https://darkan.eu/storage/app/projects/45/avatar/avatar.png','ir035tn5ugj','ir035tn5ugj','307a0c8e00d6db81ca3c2213fd672bf0',0,1,NULL,1,'2.0.0',1,NULL,'2017-04-14 10:00:19','2017-04-14 10:00:19'),(46,'trick','trick@trick.pl','$2y$10$iVv/i5r3CkSO1TwGON24tuwu26fu.dujErVtkBaALFsQ0ZFVDXXoa','','pl',1,'http://darkan.local/storage/app/projects/46/avatar/avatar.png','trick','trick','fcfcaa03240238255522aedc1eb04d94',0,1,'{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"nowy\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":46,\"version\":\"2.0.0\",\"date\":\"2017-05-14 16:41:58\",\"last_visit\":\"2017-05-14 16:41:58\",\"date_modification\":\"2017-05-14 16:41:58\",\"project_id\":33,\"folder\":0,\"pType\":\"userProjects\"}],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}',1,'2.0.0',1,'t5Bbv7UP3RgcfvSc5P4Fkhosbv4FFZ0dyerDyhbrTebxTC5ZoNRTBZ1R3SqP','2017-05-14 14:40:40','2017-05-14 14:42:31');
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_to_aplications_api`
--

DROP TABLE IF EXISTS `users_to_aplications_api`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_to_aplications_api` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `aplication_api_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_to_aplications_api_user_id_foreign` (`user_id`),
  KEY `users_to_aplications_api_aplication_api_id_foreign` (`aplication_api_id`),
  CONSTRAINT `users_to_aplications_api_aplication_api_id_foreign` FOREIGN KEY (`aplication_api_id`) REFERENCES `aplication_api` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_to_aplications_api_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_to_aplications_api`
--

LOCK TABLES `users_to_aplications_api` WRITE;
/*!40000 ALTER TABLE `users_to_aplications_api` DISABLE KEYS */;
INSERT INTO `users_to_aplications_api` VALUES (1,7,1),(2,8,2);
/*!40000 ALTER TABLE `users_to_aplications_api` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_to_distributors`
--

DROP TABLE IF EXISTS `users_to_distributors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_to_distributors` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `distributor_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_to_distributors_user_id_foreign` (`user_id`),
  KEY `users_to_distributors_distributor_id_foreign` (`distributor_id`),
  CONSTRAINT `users_to_distributors_distributor_id_foreign` FOREIGN KEY (`distributor_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_to_distributors_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_to_distributors`
--

LOCK TABLES `users_to_distributors` WRITE;
/*!40000 ALTER TABLE `users_to_distributors` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_to_distributors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_to_distributors_rabats`
--

DROP TABLE IF EXISTS `users_to_distributors_rabats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_to_distributors_rabats` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `rabat` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `currency_id` int(10) unsigned NOT NULL,
  `start_date` datetime NOT NULL,
  `expiration_date` datetime NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `users_to_distributors_rabats_user_id_foreign` (`user_id`),
  KEY `users_to_distributors_rabats_currency_id_foreign` (`currency_id`),
  CONSTRAINT `users_to_distributors_rabats_currency_id_foreign` FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_to_distributors_rabats_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_to_distributors_rabats`
--

LOCK TABLES `users_to_distributors_rabats` WRITE;
/*!40000 ALTER TABLE `users_to_distributors_rabats` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_to_distributors_rabats` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_to_promo_codes`
--

DROP TABLE IF EXISTS `users_to_promo_codes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_to_promo_codes` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `promo_code_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_to_promo_codes_user_id_foreign` (`user_id`),
  KEY `users_to_promo_codes_promo_code_id_foreign` (`promo_code_id`),
  CONSTRAINT `users_to_promo_codes_promo_code_id_foreign` FOREIGN KEY (`promo_code_id`) REFERENCES `promo_codes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_to_promo_codes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_to_promo_codes`
--

LOCK TABLES `users_to_promo_codes` WRITE;
/*!40000 ALTER TABLE `users_to_promo_codes` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_to_promo_codes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_to_reselers`
--

DROP TABLE IF EXISTS `users_to_reselers`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_to_reselers` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `reseler_id` int(10) unsigned NOT NULL,
  PRIMARY KEY (`id`),
  KEY `users_to_reselers_user_id_foreign` (`user_id`),
  KEY `users_to_reselers_reseler_id_foreign` (`reseler_id`),
  CONSTRAINT `users_to_reselers_reseler_id_foreign` FOREIGN KEY (`reseler_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_to_reselers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_to_reselers`
--

LOCK TABLES `users_to_reselers` WRITE;
/*!40000 ALTER TABLE `users_to_reselers` DISABLE KEYS */;
INSERT INTO `users_to_reselers` VALUES (1,42,41),(2,45,41);
/*!40000 ALTER TABLE `users_to_reselers` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_to_reselers_rabats`
--

DROP TABLE IF EXISTS `users_to_reselers_rabats`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `users_to_reselers_rabats` (
  `id` int(10) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(10) unsigned NOT NULL,
  `rabat` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `currency_id` int(10) unsigned NOT NULL,
  `start_date` datetime NOT NULL,
  `expiration_date` datetime NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `users_to_reselers_rabats_user_id_foreign` (`user_id`),
  KEY `users_to_reselers_rabats_currency_id_foreign` (`currency_id`),
  CONSTRAINT `users_to_reselers_rabats_currency_id_foreign` FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `users_to_reselers_rabats_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_to_reselers_rabats`
--

LOCK TABLES `users_to_reselers_rabats` WRITE;
/*!40000 ALTER TABLE `users_to_reselers_rabats` DISABLE KEYS */;
/*!40000 ALTER TABLE `users_to_reselers_rabats` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2017-06-15 17:29:27
