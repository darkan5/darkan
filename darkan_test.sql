-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Feb 17, 2019 at 07:35 PM
-- Server version: 5.5.59-0+deb8u1-log
-- PHP Version: 5.6.33-0+deb8u1

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `darkan_test`
--

-- --------------------------------------------------------

--
-- Table structure for table `api_tokens`
--

CREATE TABLE `api_tokens` (
  `id` int(10) UNSIGNED NOT NULL,
  `api_key_id` int(10) UNSIGNED NOT NULL,
  `token` varchar(32) COLLATE utf8_unicode_ci NOT NULL,
  `hashed_api_key` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `aplication_admin_api_to_aplication_api`
--

CREATE TABLE `aplication_admin_api_to_aplication_api` (
  `id` int(10) UNSIGNED NOT NULL,
  `admin_api_key_id` int(10) UNSIGNED NOT NULL,
  `api_key_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `aplication_admin_api_to_aplication_api`
--

INSERT INTO `aplication_admin_api_to_aplication_api` (`id`, `admin_api_key_id`, `api_key_id`) VALUES
(1, 1, 2);

-- --------------------------------------------------------

--
-- Table structure for table `aplication_api`
--

CREATE TABLE `aplication_api` (
  `id` int(10) UNSIGNED NOT NULL,
  `api_key` varchar(128) COLLATE utf8_unicode_ci NOT NULL,
  `php_controller` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `role_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `plans` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '{}'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `aplication_api`
--

INSERT INTO `aplication_api` (`id`, `api_key`, `php_controller`, `role_id`, `name`, `plans`) VALUES
(1, 'vOWSylmOWzdnddP3wv5Lp0g1ZngKRSpt8Uy8la1a', '', 1, '', '{}'),
(2, 'vOWSylmOWzdnddP3wv5Lp0g1ZngKRSpt8Uy8la2a', '', 2, '', '{}');

-- --------------------------------------------------------

--
-- Table structure for table `aplication_api_roles`
--

CREATE TABLE `aplication_api_roles` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `aplication_api_roles`
--

INSERT INTO `aplication_api_roles` (`id`, `name`) VALUES
(1, 'admin'),
(2, 'user'),
(3, 'none');

-- --------------------------------------------------------

--
-- Table structure for table `banners_categories`
--

CREATE TABLE `banners_categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `owner_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `banners_domain`
--

CREATE TABLE `banners_domain` (
  `id_banner_domain` int(10) UNSIGNED NOT NULL,
  `banner_id` int(10) UNSIGNED NOT NULL,
  `domain` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `banners_projects`
--

CREATE TABLE `banners_projects` (
  `id_banner` int(10) UNSIGNED NOT NULL,
  `project_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
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
  `isold` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `banners_projects`
--

INSERT INTO `banners_projects` (`id_banner`, `project_id`, `user_id`, `path`, `iframe`, `name`, `summary`, `date_create`, `date_expiry`, `modified`, `view_count`, `max_view_count`, `dimensions`, `active`, `views`, `ord`, `thumb`, `price`, `size_project`, `size_source`, `last_visit`, `status`, `available`, `questions`, `zoom`, `share`, `fullscreen`, `reset_progress`, `primary`, `index_file`, `show_title`, `requirements`, `questiondata`, `isold`) VALUES
(15, 23, 33, '5acc6352ba238d0d4a265c8707648815', 'https://darkan.eu/content/5acc6352ba238d0d4a265c8707648815', 'fcgvbcbcb', '', '2017-04-12 12:42:15', '2017-04-12 12:42:15', '2017-04-12 12:42:15', 1, 1, '1', 1, 2, 0, 'https://darkan.eu/storage/app/publications/5acc6352ba238d0d4a265c8707648815/thumb/thumb.png', 0, 10562904, 0, '2017-04-12 12:42:15', 0, 0, '', 0, 0, 1, 0, 0, '', 1, '{\"pages\":true,\"score\":true,\"scoreRequired\":\"20\",\"scoreMax\":30}', '[{\"actionkey\":\"399e2a8e09546bf181ba201ffb5208f7-2-1\",\"type\":\"quiz\",\"width\":400,\"height\":200,\"attempts\":\"1\",\"answers\":{\"#0\":{\"text\":\"Odpowied\\u017a 1\",\"goodAnswer\":true,\"left\":50,\"top\":30,\"choosen\":false},\"#1\":{\"text\":\"Odpowied\\u017a 2\",\"goodAnswer\":false,\"left\":50,\"top\":65,\"choosen\":false}},\"scoreSuccess\":\"10\",\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0.7)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"399e2a8e09546bf181ba201ffb5208f7-1-2\",\"type\":\"quiz\",\"width\":400,\"height\":200,\"attempts\":\"1\",\"answers\":{\"#0\":{\"text\":\"Odpowied\\u017a 1\",\"goodAnswer\":true,\"left\":50,\"top\":30,\"choosen\":false},\"#1\":{\"text\":\"Odpowied\\u017a 2\",\"goodAnswer\":false,\"left\":50,\"top\":65,\"choosen\":false}},\"scoreSuccess\":\"10\",\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0.7)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"399e2a8e09546bf181ba201ffb5208f7-1-3\",\"type\":\"quiz-selectone\",\"width\":700,\"height\":150,\"attempts\":\"1\",\"answers\":{\"#0\":{\"text\":\"Prawda\",\"goodAnswer\":true,\"left\":50,\"top\":50,\"choosen\":false},\"#1\":{\"text\":\"Fa\\u0142sz\",\"goodAnswer\":false,\"left\":400,\"top\":50,\"choosen\":false}},\"scoreSuccess\":\"10\",\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0.7)\",\"border-radius\":\"10px\",\"color\":\"#000\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#000\",\"border\":\"none\"}}}]', 0),
(20, 96, 3, '06aa353d758feea7714418077b0c20e6', 'https://darkan.eu/content/06aa353d758feea7714418077b0c20e6', 'Bezpieczeństwo transakcji w internecie ', 'Prezentacja poświęcona bezpieczeństwu i dobrym praktykom związanym z transakcjami elektronicznymi.', '2018-11-27 08:17:29', '2018-11-27 08:17:29', '2018-11-27 08:17:29', 1, 1, '1', 1, 65, 12, 'https://darkan.eu/storage/app/publications/06aa353d758feea7714418077b0c20e6/thumb/thumb.png', 0, 20033254, 0, '2018-11-27 08:17:29', 0, 0, '', 0, 0, 1, 0, 0, '', 1, '{\"pages\":true,\"score\":false,\"scoreRequired\":0,\"scoreMax\":0}', '[{\"actionkey\":\"743944b42841d5970fb91a33c2ca6f1b-11-66\",\"type\":\"quiz\",\"width\":119,\"height\":60,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"Prawda\",\"goodAnswer\":true,\"left\":23,\"top\":2,\"choosen\":false},\"#1\":{\"text\":\"Fa\\u0142sz\",\"goodAnswer\":false,\"left\":24,\"top\":35,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgb(255, 255, 255)\",\"border-radius\":\"10px\",\"color\":\"rgb(0, 0, 0)\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"743944b42841d5970fb91a33c2ca6f1b-10-66\",\"type\":\"quiz\",\"width\":119,\"height\":60,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"Prawda\",\"goodAnswer\":true,\"left\":23,\"top\":2,\"choosen\":false},\"#1\":{\"text\":\"Fa\\u0142sz\",\"goodAnswer\":false,\"left\":24,\"top\":35,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgb(255, 255, 255)\",\"border-radius\":\"10px\",\"color\":\"rgb(0, 0, 0)\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"743944b42841d5970fb91a33c2ca6f1b-6-66\",\"type\":\"quiz\",\"width\":117,\"height\":63,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"Prawda\",\"goodAnswer\":false,\"left\":23,\"top\":2,\"choosen\":false},\"#1\":{\"text\":\"Fa\\u0142sz\",\"goodAnswer\":true,\"left\":24,\"top\":35,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgb(255, 255, 255)\",\"border-radius\":\"10px\",\"color\":\"rgb(0, 0, 0)\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"743944b42841d5970fb91a33c2ca6f1b-17-66\",\"type\":\"quiz\",\"width\":119,\"height\":60,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"Prawda\",\"goodAnswer\":true,\"left\":23,\"top\":2,\"choosen\":false},\"#1\":{\"text\":\"Fa\\u0142sz\",\"goodAnswer\":false,\"left\":24,\"top\":35,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgb(255, 255, 255)\",\"border-radius\":\"10px\",\"color\":\"rgb(0, 0, 0)\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"743944b42841d5970fb91a33c2ca6f1b-16-66\",\"type\":\"quiz\",\"width\":119,\"height\":60,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"Prawda\",\"goodAnswer\":false,\"left\":23,\"top\":2,\"choosen\":false},\"#1\":{\"text\":\"Fa\\u0142sz\",\"goodAnswer\":true,\"left\":24,\"top\":35,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgb(255, 255, 255)\",\"border-radius\":\"10px\",\"color\":\"rgb(0, 0, 0)\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"743944b42841d5970fb91a33c2ca6f1b-15-66\",\"type\":\"quiz\",\"width\":119,\"height\":60,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"Prawda\",\"goodAnswer\":true,\"left\":23,\"top\":2,\"choosen\":false},\"#1\":{\"text\":\"Fa\\u0142sz\",\"goodAnswer\":false,\"left\":24,\"top\":35,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgb(255, 255, 255)\",\"border-radius\":\"10px\",\"color\":\"rgb(0, 0, 0)\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"743944b42841d5970fb91a33c2ca6f1b-11-67\",\"type\":\"quiz-dnd\",\"width\":150,\"height\":50,\"attempts\":\"\",\"answers\":{\"743944b42841d5970fb91a33c2ca6f1b-9-67\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":true,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"743944b42841d5970fb91a33c2ca6f1b-4-67\",\"743944b42841d5970fb91a33c2ca6f1b-7-67\",\"743944b42841d5970fb91a33c2ca6f1b-6-67\"],\"userSelection\":[]}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"component-inner\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":0}},\"reportName\":\"\",\"contents\":\"<div style=\\\"text-align:center\\\"><span style=\\\"font-size:18px\\\">Potwierd\\u017a<\\/span><\\/div>\"}]', 0),
(21, 98, 3, 'a5f9cf76179beda80c16288222c009f5', 'https://darkan.eu/content/a5f9cf76179beda80c16288222c009f5', 'Drogowskazy sprzedaży.', 'Prezentacja przedstarająca zarówno podstawowe zasady marketingowe jak i dobre praktyki.', '2018-11-27 08:15:22', '2018-11-27 08:15:22', '2018-11-27 08:15:22', 1, 1, '1', 1, 18, 12, 'https://darkan.eu/storage/app/publications/a5f9cf76179beda80c16288222c009f5/thumb/thumb.png', 0, 13689441, 0, '2018-11-27 08:15:22', 0, 0, '', 0, 0, 1, 0, 0, '', 1, '{\"pages\":true,\"score\":false,\"scoreRequired\":0,\"scoreMax\":0}', '[{\"actionkey\":\"743944b42841d5970fb91a33c2ca6f1b-35-21\",\"type\":\"quiz-dnd\",\"width\":150,\"height\":50,\"attempts\":\"\",\"answers\":{\"743944b42841d5970fb91a33c2ca6f1b-34-21\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"743944b42841d5970fb91a33c2ca6f1b-24-21\",\"743944b42841d5970fb91a33c2ca6f1b-29-21\",\"743944b42841d5970fb91a33c2ca6f1b-23-21\",\"743944b42841d5970fb91a33c2ca6f1b-28-21\"],\"userSelection\":[]},\"743944b42841d5970fb91a33c2ca6f1b-33-21\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"743944b42841d5970fb91a33c2ca6f1b-30-21\",\"743944b42841d5970fb91a33c2ca6f1b-27-21\",\"743944b42841d5970fb91a33c2ca6f1b-26-21\",\"743944b42841d5970fb91a33c2ca6f1b-25-21\"],\"userSelection\":[]}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"component-inner\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":0}},\"reportName\":\"\",\"contents\":\"<div style=\\\"text-align:center\\\"><span style=\\\"font-size:18px\\\">Potwierd\\u017a<\\/span><\\/div>\"},{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-10-22\",\"type\":\"quiz\",\"width\":490,\"height\":139,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"Segmentacja rynku\",\"goodAnswer\":false,\"left\":50,\"top\":17,\"choosen\":false},\"#1\":{\"text\":\"Rynek docelowy\",\"goodAnswer\":true,\"left\":51,\"top\":56,\"choosen\":false},\"#2\":{\"text\":\"Pozycjonowanie\",\"goodAnswer\":false,\"left\":50,\"top\":93,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgb(255, 255, 255)\",\"border-radius\":\"10px\",\"color\":\"rgb(0, 0, 0)\"},\"quiz-submit-button\":{\"background\":\"rgb(255, 255, 255)\",\"color\":\"rgb(0, 0, 0)\",\"border\":\"none\"},\"component-inner\":{\"border-color\":\"rgb(242, 89, 68)\",\"border-style\":\"solid\",\"border-top-width\":\"0px\",\"border-left-width\":\"0px\",\"border-right-width\":\"0px\",\"border-bottom-width\":\"0px\",\"border-top-right-radius\":\"15px\",\"border-top-left-radius\":\"15px\",\"border-bottom-right-radius\":\"15px\",\"border-bottom-left-radius\":\"15px\"}},\"reportName\":\"\"},{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-9-22\",\"type\":\"quiz\",\"width\":278,\"height\":139,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"Prawda\",\"goodAnswer\":true,\"left\":58,\"top\":43,\"choosen\":false},\"#1\":{\"text\":\"Fa\\u0142sz\",\"goodAnswer\":false,\"left\":57,\"top\":80,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgb(255, 255, 255)\",\"border-radius\":\"10px\",\"color\":\"rgb(0, 0, 0)\"},\"quiz-submit-button\":{\"background\":\"rgb(255, 255, 255)\",\"color\":\"rgb(0, 0, 0)\",\"border\":\"none\"},\"component-inner\":{\"border-color\":\"rgb(242, 89, 68)\",\"border-style\":\"solid\",\"border-top-width\":\"0px\",\"border-left-width\":\"0px\",\"border-right-width\":\"0px\",\"border-bottom-width\":\"0px\",\"border-top-right-radius\":\"15px\",\"border-top-left-radius\":\"15px\",\"border-bottom-right-radius\":\"15px\",\"border-bottom-left-radius\":\"15px\"}},\"reportName\":\"\"}]', 0),
(22, 101, 3, '69517c5a3e7a3d93ea28d8920dec542b', 'https://darkan.eu/content/69517c5a3e7a3d93ea28d8920dec542b', 'Zasoby ludzkie', 'Prezentacja przedstawiająca terminy i zagadnienia związane z zarządzaniem zasobami ludzkimi.', '2018-11-27 08:13:28', '2018-11-27 08:13:28', '2018-11-27 08:13:28', 1, 1, '1', 1, 18, 12, 'https://darkan.eu/storage/app/publications/69517c5a3e7a3d93ea28d8920dec542b/thumb/thumb.png', 0, 14651960, 0, '2018-11-27 08:13:28', 0, 0, '', 0, 0, 1, 0, 0, '', 1, '{\"pages\":true,\"score\":false,\"scoreRequired\":0,\"scoreMax\":0}', '[{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-21-35\",\"type\":\"quiz\",\"width\":688,\"height\":78,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"Model Michigan\",\"goodAnswer\":true,\"left\":180,\"top\":29,\"choosen\":false},\"#1\":{\"text\":\"Model Harvard\",\"goodAnswer\":false,\"left\":441,\"top\":30,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0.7)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-16-35\",\"type\":\"quiz\",\"width\":688,\"height\":78,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"Prawda\",\"goodAnswer\":true,\"left\":202,\"top\":31,\"choosen\":false},\"#1\":{\"text\":\"Fa\\u0142sz\",\"goodAnswer\":false,\"left\":446,\"top\":32,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0.7)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-8-36\",\"type\":\"quiz-dnd\",\"width\":150,\"height\":50,\"attempts\":\"\",\"answers\":{\"9c414f98f84ad6129c6363d1ca1e42d8-6-36\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"9c414f98f84ad6129c6363d1ca1e42d8-3-36\"],\"userSelection\":[]},\"9c414f98f84ad6129c6363d1ca1e42d8-7-36\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"9c414f98f84ad6129c6363d1ca1e42d8-4-36\"],\"userSelection\":[]}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"component-inner\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":0}},\"reportName\":\"\",\"contents\":\"<div style=\\\"text-align:center\\\"><span style=\\\"font-size:18px\\\">Potwierd\\u017a<\\/span><\\/div>\"},{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-8-37\",\"type\":\"quiz-dnd\",\"width\":150,\"height\":50,\"attempts\":\"\",\"answers\":{\"9c414f98f84ad6129c6363d1ca1e42d8-20-37\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"9c414f98f84ad6129c6363d1ca1e42d8-14-37\",\"9c414f98f84ad6129c6363d1ca1e42d8-13-37\",\"9c414f98f84ad6129c6363d1ca1e42d8-7-37\",\"9c414f98f84ad6129c6363d1ca1e42d8-6-37\"],\"userSelection\":[]},\"9c414f98f84ad6129c6363d1ca1e42d8-19-37\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"9c414f98f84ad6129c6363d1ca1e42d8-15-37\",\"9c414f98f84ad6129c6363d1ca1e42d8-18-37\",\"9c414f98f84ad6129c6363d1ca1e42d8-17-37\",\"9c414f98f84ad6129c6363d1ca1e42d8-16-37\"],\"userSelection\":[]}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"component-inner\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":0}},\"reportName\":\"\",\"contents\":\"<div style=\\\"text-align:center\\\"><span style=\\\"font-size:18px\\\">Potwierd\\u017a<\\/span><\\/div>\"}]', 0),
(23, 99, 3, '24271f559cb4a25d2a21f4e6048ed465', 'https://darkan.eu/content/24271f559cb4a25d2a21f4e6048ed465', 'Jakość opieki i bezpieczeństwo pacjenta', 'Szkolenie związane ze zwiększeniem poziomu jakości opieki i bezpieczeństwa pacjentów placówek medycznych.', '2018-11-27 08:14:20', '2018-11-27 08:14:20', '2018-11-27 08:14:20', 1, 1, '1', 1, 15, 12, 'https://darkan.eu/storage/app/publications/24271f559cb4a25d2a21f4e6048ed465/thumb/thumb.png', 0, 14545558, 0, '2018-11-27 08:14:20', 0, 0, '', 0, 0, 1, 0, 0, '', 1, '{\"pages\":true,\"score\":false,\"scoreRequired\":0,\"scoreMax\":0}', '[{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-2-22\",\"type\":\"quiz\",\"width\":650,\"height\":227,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"Diagnostyk\\u0119 schorze\\u0144 na wczesnym etapie.\",\"goodAnswer\":true,\"left\":47,\"top\":79,\"choosen\":false},\"#1\":{\"text\":\"Oszcz\\u0119dno\\u015b\\u0107 czasu przy stosowaniu inwazyjnych metod post\\u0119powania medycznego.\",\"goodAnswer\":false,\"left\":47,\"top\":120,\"choosen\":false},\"#2\":{\"text\":\"Popraw\\u0119 skuteczno\\u015bci leczenia.\",\"goodAnswer\":true,\"left\":48,\"top\":154,\"choosen\":false},\"#3\":{\"text\":\"Kr\\u00f3tszy czas przetarg\\u00f3w na \\u015brodki medyczne.\",\"goodAnswer\":false,\"left\":48,\"top\":194,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0)\",\"border-radius\":\"10px\",\"color\":\"rgb(0, 0, 0)\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-12-22\",\"type\":\"quiz\",\"width\":648,\"height\":227,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"12%\",\"goodAnswer\":false,\"left\":47,\"top\":79,\"choosen\":false},\"#1\":{\"text\":\"56%\",\"goodAnswer\":false,\"left\":47,\"top\":120,\"choosen\":false},\"#2\":{\"text\":\"3,2%\",\"goodAnswer\":false,\"left\":45,\"top\":155,\"choosen\":false},\"#3\":{\"text\":\"7,24%\",\"goodAnswer\":true,\"left\":45,\"top\":192,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0)\",\"border-radius\":\"10px\",\"color\":\"rgb(0, 0, 0)\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-13-22\",\"type\":\"quiz\",\"width\":650,\"height\":230,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"12%\",\"goodAnswer\":false,\"left\":47,\"top\":79,\"choosen\":false},\"#1\":{\"text\":\"93%\",\"goodAnswer\":false,\"left\":47,\"top\":109,\"choosen\":false},\"#2\":{\"text\":\"57%\",\"goodAnswer\":true,\"left\":45,\"top\":143,\"choosen\":false},\"#3\":{\"text\":\"35%\",\"goodAnswer\":false,\"left\":45,\"top\":177,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0)\",\"border-radius\":\"10px\",\"color\":\"rgb(0, 0, 0)\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-2-27\",\"type\":\"quiz\",\"width\":492,\"height\":225,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"braku czasu,\",\"goodAnswer\":false,\"left\":47,\"top\":79,\"choosen\":false},\"#1\":{\"text\":\"wysokich koszt\\u00f3w,\",\"goodAnswer\":false,\"left\":47,\"top\":120,\"choosen\":false},\"#2\":{\"text\":\"niskiej jako\\u015bci,\",\"goodAnswer\":true,\"left\":45,\"top\":155,\"choosen\":false},\"#3\":{\"text\":\"braku \\u015brodk\\u00f3w finansowych\",\"goodAnswer\":false,\"left\":45,\"top\":192,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0)\",\"border-radius\":\"10px\",\"color\":\"rgb(0, 0, 0)\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-12-27\",\"type\":\"quiz\",\"width\":648,\"height\":227,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"akredytacji,\",\"goodAnswer\":false,\"left\":44,\"top\":79,\"choosen\":false},\"#1\":{\"text\":\"finansowania,\",\"goodAnswer\":false,\"left\":44,\"top\":120,\"choosen\":false},\"#2\":{\"text\":\"uznania,\",\"goodAnswer\":false,\"left\":45,\"top\":155,\"choosen\":false},\"#3\":{\"text\":\"licencjonowania.\",\"goodAnswer\":true,\"left\":45,\"top\":192,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0)\",\"border-radius\":\"10px\",\"color\":\"rgb(0, 0, 0)\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-13-27\",\"type\":\"quiz\",\"width\":648,\"height\":227,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"wyposa\\u017cenia ambulans\\u00f3w,\",\"goodAnswer\":false,\"left\":45,\"top\":79,\"choosen\":false},\"#1\":{\"text\":\"SOR-\\u00f3w,\",\"goodAnswer\":false,\"left\":46,\"top\":118,\"choosen\":false},\"#2\":{\"text\":\"laboratori\\u00f3w diagnostycznych i mikrobiologicznych,\",\"goodAnswer\":false,\"left\":45,\"top\":155,\"choosen\":false},\"#3\":{\"text\":\"oddzia\\u0142\\u00f3w onkologii.\",\"goodAnswer\":false,\"left\":45,\"top\":192,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0)\",\"border-radius\":\"10px\",\"color\":\"rgb(0, 0, 0)\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"}]', 0),
(24, 100, 3, '9a36fd08b539f4092436b6ab411a48e0', 'https://darkan.eu/content/9a36fd08b539f4092436b6ab411a48e0', 'Style życia w Polsce', 'Prezentacja przedstawiająca style życia na terenie Polski, przekrój i cechy charakterystyczne głwónych stylów.', '2018-11-27 08:10:08', '2018-11-27 08:10:08', '2018-11-27 08:10:08', 1, 1, '1', 1, 16, 12, 'https://darkan.eu/storage/app/publications/9a36fd08b539f4092436b6ab411a48e0/thumb/thumb.png', 0, 17811037, 0, '2018-11-27 08:10:08', 0, 0, '', 0, 0, 1, 0, 0, '', 1, '{\"pages\":true,\"score\":false,\"scoreRequired\":0,\"scoreMax\":0}', '[{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-13-23\",\"type\":\"quiz\",\"width\":803,\"height\":61,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"W\\u0119\\u017csza i szersza \",\"goodAnswer\":true,\"left\":50,\"top\":30,\"choosen\":false},\"#1\":{\"text\":\"Prosta i z\\u0142o\\u017cona\",\"goodAnswer\":false,\"left\":307,\"top\":28,\"choosen\":false},\"#2\":{\"text\":\"Og\\u00f3lna i szczeg\\u00f3\\u0142owa\",\"goodAnswer\":false,\"left\":559,\"top\":26,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0.7)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-14-23\",\"type\":\"quiz\",\"width\":803,\"height\":70,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"Styl inteligencki\",\"goodAnswer\":false,\"left\":51,\"top\":30,\"choosen\":false},\"#1\":{\"text\":\"Styl singl\\u00f3w\",\"goodAnswer\":true,\"left\":312,\"top\":27,\"choosen\":false},\"#2\":{\"text\":\"Styl Mieszcza\\u0144ski\",\"goodAnswer\":false,\"left\":561,\"top\":25,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0.7)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-37-25\",\"type\":\"quiz-dnd\",\"width\":150,\"height\":50,\"attempts\":\"\",\"answers\":{\"9c414f98f84ad6129c6363d1ca1e42d8-20-25\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"9c414f98f84ad6129c6363d1ca1e42d8-18-25\"],\"userSelection\":[]},\"9c414f98f84ad6129c6363d1ca1e42d8-23-25\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"9c414f98f84ad6129c6363d1ca1e42d8-25-25\"],\"userSelection\":[]},\"9c414f98f84ad6129c6363d1ca1e42d8-19-25\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"9c414f98f84ad6129c6363d1ca1e42d8-24-25\"],\"userSelection\":[]}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"component-inner\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":0}},\"reportName\":\"\",\"contents\":\"<div style=\\\"text-align:center\\\"><span style=\\\"font-size:18px\\\">Potwierd\\u017a<\\/span><\\/div>\"}]', 0),
(25, 102, 3, '55bce107093eaa4e2cb5badde5efeb06', 'https://darkan.eu/content/55bce107093eaa4e2cb5badde5efeb06', 'Darkan Prezentacja', 'Prezentacja opisująca możliwości, zastosowania i funkcjonalności Darkan.', '2018-01-07 11:59:53', '2018-01-07 11:59:53', '2018-01-07 11:59:53', 1, 1, '1', 1, 19, 5, 'https://darkan.eu/storage/app/publications/55bce107093eaa4e2cb5badde5efeb06/thumb/thumb.png', 0, 17815537, 0, '2018-01-07 11:59:53', 0, 0, '', 0, 0, 1, 0, 0, '', 1, '{\"pages\":true,\"score\":false,\"scoreRequired\":\"2\",\"scoreMax\":2}', '[{\"actionkey\":\"100e592df996dc55f46683401ada3fcc-6-4\",\"type\":\"quiz\",\"width\":224,\"height\":200,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"Odpowied\\u017a 1\",\"goodAnswer\":true,\"left\":50,\"top\":30,\"choosen\":false},\"#1\":{\"text\":\"Odpowied\\u017a 2\",\"goodAnswer\":false,\"left\":50,\"top\":65,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0.7)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"743944b42841d5970fb91a33c2ca6f1b-9-7\",\"type\":\"quiz-selectone\",\"width\":553,\"height\":208,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"TAK\",\"goodAnswer\":true,\"left\":157,\"top\":46,\"choosen\":false},\"#1\":{\"text\":\"NIE\",\"goodAnswer\":false,\"left\":157,\"top\":119,\"choosen\":false}},\"scoreSuccess\":\"1\",\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0.7)\",\"border-radius\":\"10px\",\"color\":\"#000\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#000\",\"border\":\"none\"}}},{\"actionkey\":\"743944b42841d5970fb91a33c2ca6f1b-4-8\",\"type\":\"quiz-dnd\",\"width\":150,\"height\":50,\"attempts\":\"\",\"answers\":{\"743944b42841d5970fb91a33c2ca6f1b-8-8\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":true,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"743944b42841d5970fb91a33c2ca6f1b-9-8\"],\"userSelection\":[]}},\"scoreSuccess\":\"1\",\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"component-inner\":{\"background\":\"#FF0000\",\"color\":\"#fff\",\"border\":\"0px\"}},\"reportName\":\"\",\"contents\":\"\\n\\t    \\t\\t<div style=\\\"text-align:center\\\"><span style=\\\"font-size:18px\\\">Zatwierd\\u017a<\\/span><\\/div>\\n\\t    \\t\"}]', 0),
(26, 105, 3, '327edfbe5ceec70a6668bb0f6c099455', 'https://darkan.eu/content/327edfbe5ceec70a6668bb0f6c099455', 'Security of banking transactions', 'Presentation devoted to security and good practices related to electronic transaction.', '2018-01-07 12:11:45', '2018-01-07 12:11:45', '2018-01-07 12:11:45', 1, 1, '1', 1, 235, 6, 'https://darkan.eu/storage/app/publications/327edfbe5ceec70a6668bb0f6c099455/thumb/thumb.png', 0, 19192879, 0, '2018-01-07 12:11:45', 0, 0, '', 0, 0, 1, 0, 0, '', 1, '{\"pages\":true,\"score\":false,\"scoreRequired\":0,\"scoreMax\":0}', '[{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-44-41\",\"type\":\"quiz\",\"width\":119,\"height\":60,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"True\",\"goodAnswer\":true,\"left\":23,\"top\":2,\"choosen\":false},\"#1\":{\"text\":\"False\",\"goodAnswer\":false,\"left\":24,\"top\":35,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgb(63, 76, 107)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-35-41\",\"type\":\"quiz\",\"width\":129,\"height\":60,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"True\",\"goodAnswer\":true,\"left\":23,\"top\":2,\"choosen\":false},\"#1\":{\"text\":\"False\",\"goodAnswer\":false,\"left\":24,\"top\":35,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgb(63, 76, 107)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-34-41\",\"type\":\"quiz\",\"width\":131,\"height\":60,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"True\",\"goodAnswer\":true,\"left\":23,\"top\":2,\"choosen\":false},\"#1\":{\"text\":\"False\",\"goodAnswer\":false,\"left\":24,\"top\":35,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgb(63, 76, 107)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-33-41\",\"type\":\"quiz\",\"width\":119,\"height\":60,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"True\",\"goodAnswer\":true,\"left\":23,\"top\":2,\"choosen\":false},\"#1\":{\"text\":\"False\",\"goodAnswer\":false,\"left\":24,\"top\":35,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgb(63, 76, 107)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-32-41\",\"type\":\"quiz\",\"width\":119,\"height\":60,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"True\",\"goodAnswer\":false,\"left\":23,\"top\":2,\"choosen\":false},\"#1\":{\"text\":\"False\",\"goodAnswer\":true,\"left\":24,\"top\":35,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgb(63, 76, 107)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-8-41\",\"type\":\"quiz\",\"width\":116,\"height\":64,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"True\",\"goodAnswer\":false,\"left\":23,\"top\":2,\"choosen\":false},\"#1\":{\"text\":\"False\",\"goodAnswer\":true,\"left\":24,\"top\":35,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgb(63, 76, 107)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-29-40\",\"type\":\"quiz-dnd\",\"width\":150,\"height\":50,\"attempts\":\"3\",\"answers\":{\"9c414f98f84ad6129c6363d1ca1e42d8-23-40\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"9c414f98f84ad6129c6363d1ca1e42d8-37-40\",\"9c414f98f84ad6129c6363d1ca1e42d8-43-40\",\"9c414f98f84ad6129c6363d1ca1e42d8-40-40\",\"9c414f98f84ad6129c6363d1ca1e42d8-38-40\",\"9c414f98f84ad6129c6363d1ca1e42d8-39-40\"],\"userSelection\":[]},\"9c414f98f84ad6129c6363d1ca1e42d8-21-40\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"9c414f98f84ad6129c6363d1ca1e42d8-35-40\",\"9c414f98f84ad6129c6363d1ca1e42d8-36-40\",\"9c414f98f84ad6129c6363d1ca1e42d8-41-40\",\"9c414f98f84ad6129c6363d1ca1e42d8-42-40\"],\"userSelection\":[]}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"component-inner\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":0}},\"reportName\":\"\",\"contents\":\"<div style=\\\"text-align:center\\\"><span style=\\\"font-size:18px\\\">Potwierd\\u017a<\\/span><\\/div>\"}]', 0),
(27, 104, 3, '88367277c6dd775ac6cda034b8f88e5e', 'https://darkan.eu/content/88367277c6dd775ac6cda034b8f88e5e', 'Sale signpost', 'Presentation showing both basic marketing principles and good practices.', '2018-01-07 12:13:53', '2018-01-07 12:13:53', '2018-01-07 12:13:53', 1, 1, '1', 1, 264, 7, 'https://darkan.eu/storage/app/publications/88367277c6dd775ac6cda034b8f88e5e/thumb/thumb.png', 0, 13995021, 0, '2018-01-07 12:13:53', 0, 0, '', 0, 0, 1, 0, 0, '', 1, '{\"pages\":true,\"score\":false,\"scoreRequired\":0,\"scoreMax\":0}', '[{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-21-5\",\"type\":\"quiz-dnd\",\"width\":150,\"height\":50,\"attempts\":\"\",\"answers\":{\"9c414f98f84ad6129c6363d1ca1e42d8-20-5\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"9c414f98f84ad6129c6363d1ca1e42d8-12-5\",\"9c414f98f84ad6129c6363d1ca1e42d8-17-5\",\"9c414f98f84ad6129c6363d1ca1e42d8-11-5\",\"9c414f98f84ad6129c6363d1ca1e42d8-18-5\"],\"userSelection\":[]},\"9c414f98f84ad6129c6363d1ca1e42d8-19-5\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"9c414f98f84ad6129c6363d1ca1e42d8-16-5\",\"9c414f98f84ad6129c6363d1ca1e42d8-15-5\",\"9c414f98f84ad6129c6363d1ca1e42d8-13-5\",\"9c414f98f84ad6129c6363d1ca1e42d8-14-5\"],\"userSelection\":[]}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"component-inner\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":0}},\"reportName\":\"\",\"contents\":\"<div style=\\\"text-align:center\\\"><span style=\\\"font-size:18px\\\">Potwierd\\u017a<\\/span><\\/div>\"},{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-10-10\",\"type\":\"quiz\",\"width\":490,\"height\":139,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"Market segmentation\",\"goodAnswer\":false,\"left\":50,\"top\":17,\"choosen\":false},\"#1\":{\"text\":\"Target market\",\"goodAnswer\":true,\"left\":51,\"top\":56,\"choosen\":false},\"#2\":{\"text\":\"Positioning\",\"goodAnswer\":false,\"left\":50,\"top\":93,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgb(10, 97, 135)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"},\"component-inner\":{\"border-color\":\"rgb(242, 89, 68)\",\"border-style\":\"solid\",\"border-top-width\":\"3px\",\"border-left-width\":\"3px\",\"border-right-width\":\"3px\",\"border-bottom-width\":\"3px\",\"border-top-right-radius\":\"15px\",\"border-top-left-radius\":\"15px\",\"border-bottom-right-radius\":\"15px\",\"border-bottom-left-radius\":\"15px\"}},\"reportName\":\"\"},{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-9-10\",\"type\":\"quiz\",\"width\":278,\"height\":139,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"True\",\"goodAnswer\":true,\"left\":50,\"top\":30,\"choosen\":false},\"#1\":{\"text\":\"False\",\"goodAnswer\":false,\"left\":50,\"top\":65,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgb(10, 97, 135)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"},\"component-inner\":{\"border-color\":\"rgb(242, 89, 68)\",\"border-style\":\"solid\",\"border-top-width\":\"3px\",\"border-left-width\":\"3px\",\"border-right-width\":\"3px\",\"border-bottom-width\":\"3px\",\"border-top-right-radius\":\"15px\",\"border-top-left-radius\":\"15px\",\"border-bottom-right-radius\":\"15px\",\"border-bottom-left-radius\":\"15px\"}},\"reportName\":\"\"}]', 0),
(28, 107, 3, '361621f02826adf9785466123b253835', 'https://darkan.eu/content/361621f02826adf9785466123b253835', 'Human resources', 'Presentation describing terms and issues related to human resources management.', '2018-01-07 12:14:57', '2018-01-07 12:14:57', '2018-01-07 12:14:57', 1, 1, '1', 1, 364, 8, 'https://darkan.eu/storage/app/publications/361621f02826adf9785466123b253835/thumb/thumb.png', 0, 14950754, 0, '2018-01-07 12:14:57', 0, 0, '', 0, 0, 1, 0, 0, '', 1, '{\"pages\":true,\"score\":false,\"scoreRequired\":0,\"scoreMax\":0}', '[{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-21-21\",\"type\":\"quiz\",\"width\":688,\"height\":78,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"Michigan model\",\"goodAnswer\":true,\"left\":50,\"top\":30,\"choosen\":false},\"#1\":{\"text\":\"Harvard model\",\"goodAnswer\":false,\"left\":326,\"top\":29,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0.7)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-16-21\",\"type\":\"quiz\",\"width\":688,\"height\":78,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"True\",\"goodAnswer\":true,\"left\":50,\"top\":30,\"choosen\":false},\"#1\":{\"text\":\"False\",\"goodAnswer\":false,\"left\":301,\"top\":27,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0.7)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-8-22\",\"type\":\"quiz-dnd\",\"width\":150,\"height\":50,\"attempts\":\"\",\"answers\":{\"9c414f98f84ad6129c6363d1ca1e42d8-6-22\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"9c414f98f84ad6129c6363d1ca1e42d8-3-22\"],\"userSelection\":[]},\"9c414f98f84ad6129c6363d1ca1e42d8-7-22\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"9c414f98f84ad6129c6363d1ca1e42d8-4-22\"],\"userSelection\":[]}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"component-inner\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":0}},\"reportName\":\"\",\"contents\":\"<div style=\\\"text-align:center\\\"><span style=\\\"font-size:18px\\\">Potwierd\\u017a<\\/span><\\/div>\"},{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-8-23\",\"type\":\"quiz-dnd\",\"width\":150,\"height\":50,\"attempts\":\"\",\"answers\":{\"9c414f98f84ad6129c6363d1ca1e42d8-20-23\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"9c414f98f84ad6129c6363d1ca1e42d8-14-23\",\"9c414f98f84ad6129c6363d1ca1e42d8-13-23\",\"9c414f98f84ad6129c6363d1ca1e42d8-7-23\",\"9c414f98f84ad6129c6363d1ca1e42d8-6-23\"],\"userSelection\":[]},\"9c414f98f84ad6129c6363d1ca1e42d8-19-23\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"9c414f98f84ad6129c6363d1ca1e42d8-15-23\",\"9c414f98f84ad6129c6363d1ca1e42d8-18-23\",\"9c414f98f84ad6129c6363d1ca1e42d8-17-23\",\"9c414f98f84ad6129c6363d1ca1e42d8-16-23\"],\"userSelection\":[]}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"component-inner\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":0}},\"reportName\":\"\",\"contents\":\"<div style=\\\"text-align:center\\\"><span style=\\\"font-size:18px\\\">Potwierd\\u017a<\\/span><\\/div>\"}]', 0),
(29, 106, 3, 'd2143003fe0e45cc69d9113bc9a6c460', 'https://darkan.eu/content/d2143003fe0e45cc69d9113bc9a6c460', 'Quality of care and patient safety', 'Training related to increasing the quality of care and safety of patients in medical facilities.', '2018-01-07 12:18:10', '2018-01-07 12:16:46', '2018-01-07 12:16:46', 1, 1, '1', 1, 252, 9, 'https://darkan.eu/storage/app/publications/d2143003fe0e45cc69d9113bc9a6c460/thumb/thumb.png', 0, 16121023, 0, '2018-01-07 12:16:46', 0, 0, '', 0, 0, 1, 0, 0, '', 1, '{\"pages\":true,\"score\":false,\"scoreRequired\":0,\"scoreMax\":0}', '[{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-2-6\",\"type\":\"quiz\",\"width\":648,\"height\":227,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"Diagnostyk\\u0119 schorze\\u0144 na wczesnym etapie.\",\"goodAnswer\":true,\"left\":47,\"top\":79,\"choosen\":false},\"#1\":{\"text\":\"Oszcz\\u0119dno\\u015b\\u0107 czasu przy stosowaniu inwazyjnych metod post\\u0119powania medycznego.\",\"goodAnswer\":false,\"left\":47,\"top\":120,\"choosen\":false},\"#2\":{\"text\":\"Popraw\\u0119 skuteczno\\u015bci leczenia.\",\"goodAnswer\":true,\"left\":45,\"top\":155,\"choosen\":false},\"#3\":{\"text\":\"Kr\\u00f3tszy czas przetarg\\u00f3w na \\u015brodki medyczne.\",\"goodAnswer\":false,\"left\":45,\"top\":192,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0)\",\"border-radius\":\"10px\",\"color\":\"rgb(0, 0, 0)\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-12-6\",\"type\":\"quiz\",\"width\":648,\"height\":227,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"12%\",\"goodAnswer\":false,\"left\":47,\"top\":79,\"choosen\":false},\"#1\":{\"text\":\"56%\",\"goodAnswer\":false,\"left\":47,\"top\":120,\"choosen\":false},\"#2\":{\"text\":\"3,2%\",\"goodAnswer\":false,\"left\":45,\"top\":155,\"choosen\":false},\"#3\":{\"text\":\"7,24%\",\"goodAnswer\":true,\"left\":45,\"top\":192,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0)\",\"border-radius\":\"10px\",\"color\":\"rgb(0, 0, 0)\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-13-6\",\"type\":\"quiz\",\"width\":648,\"height\":227,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"12%\",\"goodAnswer\":false,\"left\":47,\"top\":79,\"choosen\":false},\"#1\":{\"text\":\"93%\",\"goodAnswer\":false,\"left\":47,\"top\":109,\"choosen\":false},\"#2\":{\"text\":\"57%\",\"goodAnswer\":true,\"left\":45,\"top\":143,\"choosen\":false},\"#3\":{\"text\":\"35%\",\"goodAnswer\":false,\"left\":45,\"top\":177,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0)\",\"border-radius\":\"10px\",\"color\":\"rgb(0, 0, 0)\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-2-13\",\"type\":\"quiz\",\"width\":648,\"height\":227,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\" lack of time,\",\"goodAnswer\":false,\"left\":47,\"top\":79,\"choosen\":false},\"#1\":{\"text\":\"high cost,\",\"goodAnswer\":false,\"left\":47,\"top\":120,\"choosen\":false},\"#2\":{\"text\":\"low quality,\",\"goodAnswer\":true,\"left\":45,\"top\":155,\"choosen\":false},\"#3\":{\"text\":\"lack of funds\",\"goodAnswer\":false,\"left\":45,\"top\":192,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0)\",\"border-radius\":\"10px\",\"color\":\"rgb(0, 0, 0)\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-12-13\",\"type\":\"quiz\",\"width\":648,\"height\":227,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"akredytacji,\",\"goodAnswer\":false,\"left\":47,\"top\":79,\"choosen\":false},\"#1\":{\"text\":\"finansowania,\",\"goodAnswer\":false,\"left\":47,\"top\":120,\"choosen\":false},\"#2\":{\"text\":\"uznania,\",\"goodAnswer\":false,\"left\":45,\"top\":155,\"choosen\":false},\"#3\":{\"text\":\"licencjonowania.\",\"goodAnswer\":true,\"left\":45,\"top\":192,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0)\",\"border-radius\":\"10px\",\"color\":\"rgb(0, 0, 0)\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-13-13\",\"type\":\"quiz\",\"width\":648,\"height\":227,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"wyposa\\u017cenia ambulans\\u00f3w,\",\"goodAnswer\":false,\"left\":47,\"top\":79,\"choosen\":false},\"#1\":{\"text\":\"SOR-\\u00f3w,\",\"goodAnswer\":false,\"left\":47,\"top\":120,\"choosen\":false},\"#2\":{\"text\":\"laboratori\\u00f3w diagnostycznych i mikrobiologicznych,\",\"goodAnswer\":true,\"left\":45,\"top\":155,\"choosen\":false},\"#3\":{\"text\":\"oddzia\\u0142\\u00f3w onkologii.\",\"goodAnswer\":false,\"left\":45,\"top\":192,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0)\",\"border-radius\":\"10px\",\"color\":\"rgb(0, 0, 0)\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"}]', 0);
INSERT INTO `banners_projects` (`id_banner`, `project_id`, `user_id`, `path`, `iframe`, `name`, `summary`, `date_create`, `date_expiry`, `modified`, `view_count`, `max_view_count`, `dimensions`, `active`, `views`, `ord`, `thumb`, `price`, `size_project`, `size_source`, `last_visit`, `status`, `available`, `questions`, `zoom`, `share`, `fullscreen`, `reset_progress`, `primary`, `index_file`, `show_title`, `requirements`, `questiondata`, `isold`) VALUES
(30, 108, 3, '7d6617e79282c6da354080ede2538f62', 'https://darkan.eu/content/7d6617e79282c6da354080ede2538f62', 'Lifestyles in Poland', 'Presentation showing lifestyles in Poland - cross-section and characteristics of various styles.', '2018-01-07 12:20:23', '2018-01-07 12:20:23', '2018-01-07 12:20:23', 1, 1, '1', 1, 269, 10, 'https://darkan.eu/storage/app/publications/7d6617e79282c6da354080ede2538f62/thumb/thumb.png', 0, 19995927, 0, '2018-01-07 12:20:23', 0, 0, '', 0, 0, 1, 0, 0, '', 1, '{\"pages\":true,\"score\":false,\"scoreRequired\":0,\"scoreMax\":0}', '[{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-13-10\",\"type\":\"quiz\",\"width\":803,\"height\":61,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"Narrower and wider\",\"goodAnswer\":true,\"left\":50,\"top\":30,\"choosen\":false},\"#1\":{\"text\":\"Simple and complex\",\"goodAnswer\":false,\"left\":307,\"top\":28,\"choosen\":false},\"#2\":{\"text\":\"General and detailed\",\"goodAnswer\":false,\"left\":559,\"top\":26,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0.7)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-14-10\",\"type\":\"quiz\",\"width\":803,\"height\":70,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"Intellectual style\",\"goodAnswer\":false,\"left\":50,\"top\":30,\"choosen\":false},\"#1\":{\"text\":\"Singles style\",\"goodAnswer\":true,\"left\":301,\"top\":28,\"choosen\":false},\"#2\":{\"text\":\"The style of the townspeople\",\"goodAnswer\":false,\"left\":550,\"top\":25,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0.7)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-37-12\",\"type\":\"quiz-dnd\",\"width\":150,\"height\":50,\"attempts\":\"\",\"answers\":{\"9c414f98f84ad6129c6363d1ca1e42d8-20-12\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"9c414f98f84ad6129c6363d1ca1e42d8-18-12\"],\"userSelection\":[]},\"9c414f98f84ad6129c6363d1ca1e42d8-23-12\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"9c414f98f84ad6129c6363d1ca1e42d8-25-12\"],\"userSelection\":[]},\"9c414f98f84ad6129c6363d1ca1e42d8-19-12\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"9c414f98f84ad6129c6363d1ca1e42d8-24-12\"],\"userSelection\":[]}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"component-inner\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":0}},\"reportName\":\"\",\"contents\":\"<div style=\\\"text-align:center\\\"><span style=\\\"font-size:18px\\\">Potwierd\\u017a<\\/span><\\/div>\"}]', 0),
(31, 103, 3, '1ca6ce504ef8e9b3d3e0db1922e82ccb', 'https://darkan.eu/content/1ca6ce504ef8e9b3d3e0db1922e82ccb', 'Darkan Presentation', 'Presentation describing the possibilities, uses and functionalities of Darkan.', '2018-01-07 12:21:58', '2018-01-07 12:21:58', '2018-01-07 12:21:58', 1, 1, '1', 1, 224, 11, 'https://darkan.eu/storage/app/publications/1ca6ce504ef8e9b3d3e0db1922e82ccb/thumb/thumb.png', 0, 17489094, 0, '2018-01-07 12:21:58', 0, 0, '', 0, 0, 1, 0, 0, '', 1, '{\"pages\":true,\"score\":false,\"scoreRequired\":0,\"scoreMax\":0}', '[{\"actionkey\":\"743944b42841d5970fb91a33c2ca6f1b-9-7\",\"type\":\"quiz-selectone\",\"width\":553,\"height\":208,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"YES\",\"goodAnswer\":true,\"left\":157,\"top\":46,\"choosen\":false},\"#1\":{\"text\":\"NO\",\"goodAnswer\":false,\"left\":157,\"top\":119,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0.7)\",\"border-radius\":\"10px\",\"color\":\"#000\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#000\",\"border\":\"none\"}}},{\"actionkey\":\"743944b42841d5970fb91a33c2ca6f1b-4-8\",\"type\":\"quiz-dnd\",\"width\":150,\"height\":50,\"attempts\":\"\",\"answers\":{\"743944b42841d5970fb91a33c2ca6f1b-8-8\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":true,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"743944b42841d5970fb91a33c2ca6f1b-9-8\"],\"userSelection\":[]}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"component-inner\":{\"background\":\"#FF0000\",\"color\":\"#fff\",\"border\":\"0px\"}},\"reportName\":\"\",\"contents\":\"\\n\\t    \\t\\t\\n\\t    \\t\\t<div style=\\\"text-align:center\\\"><span style=\\\"font-size:18px\\\">Submit<\\/span><\\/div>\\n\\t    \\t\\n\\t    \\t\"}]', 0),
(38, 141, 103, 'de3fc277a3dc6cd946f34e5b98deef4a', 'https://darkan.eu/content/de3fc277a3dc6cd946f34e5b98deef4a', 'Rebel', '', '2018-05-24 14:59:30', '2018-05-24 14:59:30', '2018-05-24 14:59:30', 1, 1, '1', 1, 4, 0, 'https://darkan.eu/storage/app/publications/de3fc277a3dc6cd946f34e5b98deef4a/thumb/thumb.png', 0, 11258097, 0, '2018-05-24 14:59:30', 0, 0, '', 0, 0, 1, 0, 0, '', 1, '{\"pages\":true,\"score\":false,\"scoreRequired\":0,\"scoreMax\":0}', '[]', 0),
(40, 162, 112, 'e4e6b95c5f67eead6a84dd1bc163b51c', 'https://darkan.eu/content/e4e6b95c5f67eead6a84dd1bc163b51c', 'Rozwiązania chmurowe', '', '2018-06-16 10:55:08', '2018-06-16 10:55:08', '2018-06-16 10:55:08', 1, 1, '1', 1, 2, 1, 'https://darkan.eu/storage/app/publications/e4e6b95c5f67eead6a84dd1bc163b51c/thumb/thumb.png', 0, 31962411, 0, '2018-06-16 10:55:08', 0, 0, '', 0, 0, 1, 0, 0, '', 1, '{\"pages\":true,\"score\":false,\"scoreRequired\":0,\"scoreMax\":0}', '[]', 0),
(41, 165, 29, 'bfa965e4ccc07f22127d0ee68f852154', 'https://darkan.eu/content/bfa965e4ccc07f22127d0ee68f852154', 'WIB', '', '2018-07-18 14:56:58', '2018-07-18 14:56:58', '2018-07-18 14:56:58', 1, 1, '1', 1, 54, 5, 'https://darkan.eu/storage/app/publications/bfa965e4ccc07f22127d0ee68f852154/thumb/thumb.png', 0, 46296270, 0, '2018-07-18 14:56:58', 0, 0, '', 0, 0, 1, 0, 0, '', 1, '{\"pages\":true,\"score\":false,\"scoreRequired\":0,\"scoreMax\":0}', '[{\"actionkey\":\"e7b24ec3b1aa58845f3150644d6a5c88-29-27\",\"type\":\"quiz\",\"width\":411,\"height\":178,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"Rudy metali\",\"goodAnswer\":true,\"left\":50,\"top\":30,\"choosen\":false},\"#1\":{\"text\":\"Pieni\\u0105dze\",\"goodAnswer\":false,\"left\":50,\"top\":65,\"choosen\":false},\"#2\":{\"text\":\"\\u017bywno\\u015b\\u0107\",\"goodAnswer\":true,\"left\":50,\"top\":95,\"choosen\":false},\"#3\":{\"text\":\"Bro\\u0144 i narz\\u0119dzia\",\"goodAnswer\":true,\"left\":50,\"top\":125,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0.7)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"e7b24ec3b1aa58845f3150644d6a5c88-29-30\",\"type\":\"quiz\",\"width\":411,\"height\":178,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"Konstantyn VI\",\"goodAnswer\":false,\"left\":50,\"top\":30,\"choosen\":false},\"#1\":{\"text\":\"Hadrian I\",\"goodAnswer\":false,\"left\":50,\"top\":65,\"choosen\":false},\"#2\":{\"text\":\"Ludwik I Pobo\\u017cny\",\"goodAnswer\":false,\"left\":50,\"top\":95,\"choosen\":false},\"#3\":{\"text\":\"Karol Wielki\",\"goodAnswer\":true,\"left\":50,\"top\":125,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0.7)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"e7b24ec3b1aa58845f3150644d6a5c88-29-29\",\"type\":\"quiz\",\"width\":411,\"height\":201,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"Pieni\\u0105dze by\\u0142y wykonywane z miedzi i br\\u0105zu.\",\"goodAnswer\":false,\"left\":50,\"top\":30,\"choosen\":false},\"#1\":{\"text\":\"Pieni\\u0105dze wyst\\u0119powa\\u0142y w postaci metalowej.\",\"goodAnswer\":false,\"left\":50,\"top\":65,\"choosen\":false},\"#2\":{\"text\":\"Pieni\\u0105dze by\\u0142y wykonywane ze z\\u0142ota i srebra.\",\"goodAnswer\":true,\"left\":50,\"top\":95,\"choosen\":false},\"#3\":{\"text\":\"Pieni\\u0105dze by\\u0142y wykonywane ze z\\u0142ota i platyny.\",\"goodAnswer\":false,\"left\":50,\"top\":125,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0.7)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"e7b24ec3b1aa58845f3150644d6a5c88-29-31\",\"type\":\"quiz\",\"width\":411,\"height\":178,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"PayPal\",\"goodAnswer\":true,\"left\":50,\"top\":30,\"choosen\":false},\"#1\":{\"text\":\"EasyCash\",\"goodAnswer\":false,\"left\":50,\"top\":65,\"choosen\":false},\"#2\":{\"text\":\"TransferGo\",\"goodAnswer\":true,\"left\":50,\"top\":95,\"choosen\":false},\"#3\":{\"text\":\"Fast Pay\",\"goodAnswer\":false,\"left\":50,\"top\":125,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0.7)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"e7b24ec3b1aa58845f3150644d6a5c88-55-32\",\"type\":\"quiz-dnd\",\"width\":150,\"height\":50,\"attempts\":\"\",\"answers\":{\"e7b24ec3b1aa58845f3150644d6a5c88-27-32\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"e7b24ec3b1aa58845f3150644d6a5c88-54-32\"],\"userSelection\":[]},\"e7b24ec3b1aa58845f3150644d6a5c88-31-32\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"e7b24ec3b1aa58845f3150644d6a5c88-56-32\"],\"userSelection\":[]},\"e7b24ec3b1aa58845f3150644d6a5c88-49-32\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"e7b24ec3b1aa58845f3150644d6a5c88-57-32\"],\"userSelection\":[]},\"e7b24ec3b1aa58845f3150644d6a5c88-34-32\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"e7b24ec3b1aa58845f3150644d6a5c88-58-32\"],\"userSelection\":[]},\"e7b24ec3b1aa58845f3150644d6a5c88-37-32\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"e7b24ec3b1aa58845f3150644d6a5c88-59-32\"],\"userSelection\":[]},\"e7b24ec3b1aa58845f3150644d6a5c88-45-32\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"e7b24ec3b1aa58845f3150644d6a5c88-60-32\"],\"userSelection\":[]}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"component-inner\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":0}},\"reportName\":\"\",\"contents\":\"<div style=\\\"text-align:center\\\"><span style=\\\"font-size:18px\\\">Potwierd\\u017a<\\/span><\\/div>\"},{\"actionkey\":\"e7b24ec3b1aa58845f3150644d6a5c88-29-34\",\"type\":\"quiz\",\"width\":411,\"height\":199,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"P\\u0142atno\\u015bci w internecie.\",\"goodAnswer\":true,\"left\":50,\"top\":30,\"choosen\":false},\"#1\":{\"text\":\"Wp\\u0142aty \\u015brodk\\u00f3w na konto.\",\"goodAnswer\":false,\"left\":50,\"top\":65,\"choosen\":false},\"#2\":{\"text\":\"Wyp\\u0142aty pieni\\u0119dzy z bankomat\\u00f3w.\",\"goodAnswer\":true,\"left\":50,\"top\":95,\"choosen\":false},\"#3\":{\"text\":\"Przewalutowanie \\u015brodk\\u00f3w znajduj\\u0105cych si\\u0119 na koncie\",\"goodAnswer\":false,\"left\":50,\"top\":125,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0.7)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"e7b24ec3b1aa58845f3150644d6a5c88-29-33\",\"type\":\"quiz\",\"width\":411,\"height\":200,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"Systemem przelew\\u00f3w natychmiastowych.\",\"goodAnswer\":false,\"left\":50,\"top\":30,\"choosen\":false},\"#1\":{\"text\":\"Protoko\\u0142em szyfruj\\u0105cym przelewy internetowe.\",\"goodAnswer\":false,\"left\":50,\"top\":65,\"choosen\":false},\"#2\":{\"text\":\"Systemem wymiany walutowej.\",\"goodAnswer\":false,\"left\":50,\"top\":95,\"choosen\":false},\"#3\":{\"text\":\"Elektronicznym systemem rozlicze\\u0144 mi\\u0119dzybankowych w z\\u0142otych.\",\"goodAnswer\":true,\"left\":50,\"top\":125,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0.7)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"e7b24ec3b1aa58845f3150644d6a5c88-29-35\",\"type\":\"quiz\",\"width\":411,\"height\":178,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"PIN\",\"goodAnswer\":true,\"left\":50,\"top\":30,\"choosen\":false},\"#1\":{\"text\":\"SMS kod\",\"goodAnswer\":true,\"left\":50,\"top\":65,\"choosen\":false},\"#2\":{\"text\":\"Odpowied\\u017a tokena\",\"goodAnswer\":true,\"left\":50,\"top\":95,\"choosen\":false},\"#3\":{\"text\":\"Login\",\"goodAnswer\":true,\"left\":50,\"top\":125,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0.7)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"e7b24ec3b1aa58845f3150644d6a5c88-39-36\",\"type\":\"quiz-dnd\",\"width\":150,\"height\":50,\"attempts\":\"\",\"answers\":{\"e7b24ec3b1aa58845f3150644d6a5c88-31-36\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"e7b24ec3b1aa58845f3150644d6a5c88-35-36\",\"e7b24ec3b1aa58845f3150644d6a5c88-36-36\",\"e7b24ec3b1aa58845f3150644d6a5c88-37-36\"],\"userSelection\":[]},\"e7b24ec3b1aa58845f3150644d6a5c88-32-36\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"e7b24ec3b1aa58845f3150644d6a5c88-37-36\",\"e7b24ec3b1aa58845f3150644d6a5c88-35-36\"],\"userSelection\":[]},\"e7b24ec3b1aa58845f3150644d6a5c88-33-36\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"e7b24ec3b1aa58845f3150644d6a5c88-38-36\"],\"userSelection\":[]},\"e7b24ec3b1aa58845f3150644d6a5c88-40-36\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"e7b24ec3b1aa58845f3150644d6a5c88-36-36\",\"e7b24ec3b1aa58845f3150644d6a5c88-37-36\"],\"userSelection\":[]}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"component-inner\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":0}},\"reportName\":\"\",\"contents\":\"<div style=\\\"text-align:center\\\"><span style=\\\"font-size:18px\\\">Potwierd\\u017a<\\/span><\\/div>\"},{\"actionkey\":\"e7b24ec3b1aa58845f3150644d6a5c88-29-37\",\"type\":\"quiz\",\"width\":411,\"height\":218,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"Zg\\u0142osi\\u0107 si\\u0119 na policj\\u0119.\",\"goodAnswer\":false,\"left\":50,\"top\":30,\"choosen\":false},\"#1\":{\"text\":\"Uda\\u0107 si\\u0119 do plac\\u00f3wki banku i zastrzec kart\\u0119.\",\"goodAnswer\":false,\"left\":50,\"top\":65,\"choosen\":false},\"#2\":{\"text\":\"Zmieni\\u0107 kod PIN w obs\\u0142udze internetowej konta.\",\"goodAnswer\":false,\"left\":50,\"top\":95,\"choosen\":false},\"#3\":{\"text\":\"Zastrzec kart\\u0119, dzwoni\\u0105c na numer Mi\\u0119dzybankowego Systemu Zastrzegania Kart P\\u0142atniczych.\",\"goodAnswer\":true,\"left\":50,\"top\":125,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0.7)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"e7b24ec3b1aa58845f3150644d6a5c88-55-38\",\"type\":\"quiz-dnd\",\"width\":150,\"height\":50,\"attempts\":\"\",\"answers\":{\"e7b24ec3b1aa58845f3150644d6a5c88-54-38\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"e7b24ec3b1aa58845f3150644d6a5c88-70-38\",\"e7b24ec3b1aa58845f3150644d6a5c88-74-38\",\"e7b24ec3b1aa58845f3150644d6a5c88-69-38\"],\"userSelection\":[]},\"e7b24ec3b1aa58845f3150644d6a5c88-61-38\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"e7b24ec3b1aa58845f3150644d6a5c88-70-38\",\"e7b24ec3b1aa58845f3150644d6a5c88-69-38\",\"e7b24ec3b1aa58845f3150644d6a5c88-74-38\"],\"userSelection\":[]},\"e7b24ec3b1aa58845f3150644d6a5c88-62-38\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"e7b24ec3b1aa58845f3150644d6a5c88-70-38\",\"e7b24ec3b1aa58845f3150644d6a5c88-69-38\",\"e7b24ec3b1aa58845f3150644d6a5c88-74-38\"],\"userSelection\":[]},\"e7b24ec3b1aa58845f3150644d6a5c88-64-38\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"e7b24ec3b1aa58845f3150644d6a5c88-71-38\",\"e7b24ec3b1aa58845f3150644d6a5c88-73-38\",\"e7b24ec3b1aa58845f3150644d6a5c88-72-38\"],\"userSelection\":[]},\"e7b24ec3b1aa58845f3150644d6a5c88-65-38\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"e7b24ec3b1aa58845f3150644d6a5c88-71-38\",\"e7b24ec3b1aa58845f3150644d6a5c88-73-38\",\"e7b24ec3b1aa58845f3150644d6a5c88-72-38\"],\"userSelection\":[]},\"e7b24ec3b1aa58845f3150644d6a5c88-66-38\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"e7b24ec3b1aa58845f3150644d6a5c88-72-38\",\"e7b24ec3b1aa58845f3150644d6a5c88-71-38\",\"e7b24ec3b1aa58845f3150644d6a5c88-73-38\"],\"userSelection\":[]}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"component-inner\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":0}},\"reportName\":\"\",\"contents\":\"<div style=\\\"text-align:center\\\"><span style=\\\"font-size:18px\\\">Potwierd\\u017a<\\/span><\\/div>\"},{\"actionkey\":\"e7b24ec3b1aa58845f3150644d6a5c88-29-39\",\"type\":\"quiz\",\"width\":411,\"height\":218,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"Posiadacza karty.\",\"goodAnswer\":true,\"left\":50,\"top\":30,\"choosen\":false},\"#1\":{\"text\":\"Bank.\",\"goodAnswer\":true,\"left\":50,\"top\":65,\"choosen\":false},\"#2\":{\"text\":\"Sprzedawc\\u0119.\",\"goodAnswer\":true,\"left\":50,\"top\":95,\"choosen\":false},\"#3\":{\"text\":\"Urz\\u0105d Ochrony Konkurencji i Konsument\\u00f3w (UOKiK).\",\"goodAnswer\":false,\"left\":50,\"top\":125,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0.7)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"e7b24ec3b1aa58845f3150644d6a5c88-29-40\",\"type\":\"quiz\",\"width\":411,\"height\":178,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"1918\",\"goodAnswer\":false,\"left\":50,\"top\":30,\"choosen\":false},\"#1\":{\"text\":\"1944\",\"goodAnswer\":true,\"left\":50,\"top\":65,\"choosen\":false},\"#2\":{\"text\":\"1968\",\"goodAnswer\":false,\"left\":50,\"top\":95,\"choosen\":false},\"#3\":{\"text\":\"1989\",\"goodAnswer\":false,\"left\":50,\"top\":125,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0.7)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"e7b24ec3b1aa58845f3150644d6a5c88-29-41\",\"type\":\"quiz\",\"width\":411,\"height\":237,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"Skraca czas obs\\u0142ugi klienta.\",\"goodAnswer\":true,\"left\":50,\"top\":30,\"choosen\":false},\"#1\":{\"text\":\"Jest dro\\u017cszy w obs\\u0142udze ni\\u017c u\\u017cywanie got\\u00f3wki.\",\"goodAnswer\":false,\"left\":50,\"top\":65,\"choosen\":false},\"#2\":{\"text\":\"Jego popularno\\u015b\\u0107 utrzymuje si\\u0119 w Polsce od 2008 roku na zbli\\u017conym poziomie.\",\"goodAnswer\":false,\"left\":50,\"top\":95,\"choosen\":false},\"#3\":{\"text\":\"Jest bezpieczny, poniewa\\u017c ka\\u017cda operacja pozostawia po sobie \\u015blad elektroniczny.\",\"goodAnswer\":true,\"left\":50,\"top\":142,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0.7)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"e7b24ec3b1aa58845f3150644d6a5c88-39-42\",\"type\":\"quiz-dnd\",\"width\":150,\"height\":50,\"attempts\":\"\",\"answers\":{\"e7b24ec3b1aa58845f3150644d6a5c88-45-42\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"e7b24ec3b1aa58845f3150644d6a5c88-49-42\"],\"userSelection\":[]},\"e7b24ec3b1aa58845f3150644d6a5c88-46-42\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"e7b24ec3b1aa58845f3150644d6a5c88-47-42\"],\"userSelection\":[]},\"e7b24ec3b1aa58845f3150644d6a5c88-44-42\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"e7b24ec3b1aa58845f3150644d6a5c88-48-42\"],\"userSelection\":[]}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"component-inner\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":0}},\"reportName\":\"\",\"contents\":\"<div style=\\\"text-align:center\\\"><span style=\\\"font-size:18px\\\">Potwierd\\u017a<\\/span><\\/div>\"}]', 0),
(42, 172, 29, 'f594041e5c84af0eaa4dbfc96c6eb262', 'https://darkan.eu/content/f594041e5c84af0eaa4dbfc96c6eb262', 'samsung', '', '2018-06-28 13:01:32', '2018-06-28 13:01:32', '2018-06-28 13:01:32', 1, 1, '1', 1, 12, 5, 'https://darkan.eu/storage/app/publications/f594041e5c84af0eaa4dbfc96c6eb262/thumb/thumb.png', 0, 11717532, 0, '2018-06-28 13:01:32', 0, 0, '', 0, 0, 1, 0, 0, '', 1, '{\"pages\":true,\"score\":false,\"scoreRequired\":0,\"scoreMax\":0}', '[]', 0),
(43, 173, 29, '1602c0bfc822b90e747d816ae8871e20', 'https://darkan.eu/content/1602c0bfc822b90e747d816ae8871e20', 'Orange Rozmowa', '', '2018-06-28 12:59:50', '2018-06-28 12:59:50', '2018-06-28 12:59:50', 1, 1, '1', 1, 15, 4, 'https://darkan.eu/storage/app/publications/1602c0bfc822b90e747d816ae8871e20/thumb/thumb.png', 0, 13065866, 0, '2018-06-28 12:59:50', 0, 0, '', 0, 0, 1, 0, 0, '', 1, '{\"pages\":true,\"score\":false,\"scoreRequired\":0,\"scoreMax\":\"16\"}', '[]', 0),
(44, 169, 29, '04eb5bb51260eb3bfdafc6f9a5bb3966', 'https://darkan.eu/content/04eb5bb51260eb3bfdafc6f9a5bb3966', 'Darkan Orange', '', '2018-06-28 12:58:52', '2018-06-28 12:58:52', '2018-06-28 12:58:52', 1, 1, '1', 1, 2, 4, 'https://darkan.eu/storage/app/publications/04eb5bb51260eb3bfdafc6f9a5bb3966/thumb/thumb.png', 0, 19658076, 0, '2018-06-28 12:58:52', 0, 0, '', 0, 0, 1, 0, 0, '', 1, '{\"pages\":true,\"score\":false,\"scoreRequired\":\"2\",\"scoreMax\":2}', '[{\"actionkey\":\"743944b42841d5970fb91a33c2ca6f1b-9-7\",\"type\":\"quiz-selectone\",\"width\":553,\"height\":208,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"TAK\",\"goodAnswer\":true,\"left\":157,\"top\":46,\"choosen\":false},\"#1\":{\"text\":\"NIE\",\"goodAnswer\":false,\"left\":157,\"top\":119,\"choosen\":false}},\"scoreSuccess\":\"1\",\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0.7)\",\"border-radius\":\"10px\",\"color\":\"#000\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#000\",\"border\":\"none\"}}},{\"actionkey\":\"743944b42841d5970fb91a33c2ca6f1b-4-8\",\"type\":\"quiz-dnd\",\"width\":150,\"height\":50,\"attempts\":\"\",\"answers\":{\"743944b42841d5970fb91a33c2ca6f1b-8-8\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":true,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"743944b42841d5970fb91a33c2ca6f1b-9-8\"],\"userSelection\":[]}},\"scoreSuccess\":\"1\",\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"component-inner\":{\"background\":\"#FF0000\",\"color\":\"#fff\",\"border\":\"0px\"}},\"reportName\":\"\",\"contents\":\"\\n\\t    \\t\\t<div style=\\\"text-align:center\\\"><span style=\\\"font-size:18px\\\">Zatwierd\\u017a<\\/span><\\/div>\\n\\t    \\t\"}]', 0),
(45, 175, 29, '594bc0f23a248751c7db5624d37f6688', 'https://darkan.eu/content/594bc0f23a248751c7db5624d37f6688', 'Orange - mój Orange', '', '2018-06-28 13:00:26', '2018-06-28 13:00:26', '2018-06-28 13:00:26', 1, 1, '1', 1, 0, 4, 'https://darkan.eu/storage/app/publications/594bc0f23a248751c7db5624d37f6688/thumb/thumb.png', 0, 12305892, 0, '2018-06-28 13:00:26', 0, 0, '', 0, 0, 1, 0, 0, '', 1, '{\"pages\":true,\"score\":false,\"scoreRequired\":0,\"scoreMax\":0}', '[]', 0),
(46, 169, 29, 'c3a516a0521a60906891452e813f6bf5', 'https://darkan.eu/content/c3a516a0521a60906891452e813f6bf5', 'Darkan Orange', '', '2018-09-27 09:11:44', '2018-09-27 09:11:44', '2018-09-27 09:11:44', 1, 1, '1', 1, 2, 5, 'https://darkan.eu/storage/app/publications/c3a516a0521a60906891452e813f6bf5/thumb/thumb.png', 0, 19659494, 0, '2018-09-27 09:11:44', 0, 0, '', 0, 0, 1, 0, 0, '', 1, '{\"pages\":true,\"score\":false,\"scoreRequired\":\"2\",\"scoreMax\":2}', '[{\"actionkey\":\"743944b42841d5970fb91a33c2ca6f1b-9-7\",\"type\":\"quiz-selectone\",\"width\":553,\"height\":208,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"TAK\",\"goodAnswer\":true,\"left\":157,\"top\":46,\"choosen\":false},\"#1\":{\"text\":\"NIE\",\"goodAnswer\":false,\"left\":157,\"top\":119,\"choosen\":false}},\"scoreSuccess\":\"1\",\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0.7)\",\"border-radius\":\"10px\",\"color\":\"#000\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#000\",\"border\":\"none\"}}},{\"actionkey\":\"743944b42841d5970fb91a33c2ca6f1b-4-8\",\"type\":\"quiz-dnd\",\"width\":150,\"height\":50,\"attempts\":\"\",\"answers\":{\"743944b42841d5970fb91a33c2ca6f1b-8-8\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":true,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"743944b42841d5970fb91a33c2ca6f1b-9-8\"],\"userSelection\":[]}},\"scoreSuccess\":\"1\",\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"component-inner\":{\"background\":\"#FF0000\",\"color\":\"#fff\",\"border\":\"0px\"}},\"reportName\":\"\",\"contents\":\"\\n\\t    \\t\\t<div style=\\\"text-align:center\\\"><span style=\\\"font-size:18px\\\">Zatwierd\\u017a<\\/span><\\/div>\\n\\t    \\t\"}]', 0),
(47, 166, 29, '990249f631310d80b82a8a9039656bef', 'https://darkan.eu/content/990249f631310d80b82a8a9039656bef', 'nowy', '', '2018-10-14 19:01:09', '2018-10-14 19:01:09', '2018-10-14 19:01:09', 1, 1, '1', 1, 3, 6, 'https://darkan.eu/storage/app/publications/990249f631310d80b82a8a9039656bef/thumb/thumb.png', 0, 55347012, 0, '2018-10-14 19:01:09', 0, 0, '', 0, 0, 1, 0, 0, '', 1, '{\"pages\":true,\"score\":false,\"scoreRequired\":0,\"scoreMax\":0}', '[{\"actionkey\":\"ff82b34b52049937fb82ce2c50129e8a-2-22\",\"type\":\"quiz\",\"width\":342,\"height\":240,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"Odpowied\\u017a 1\",\"goodAnswer\":true,\"left\":50,\"top\":30,\"choosen\":false},\"#1\":{\"text\":\"Odpowied\\u017a 2\",\"goodAnswer\":false,\"left\":50,\"top\":65,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0.7)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"ff82b34b52049937fb82ce2c50129e8a-1-22\",\"type\":\"quiz\",\"width\":327,\"height\":250,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"Odpowied\\u017a 1\",\"goodAnswer\":true,\"left\":50,\"top\":30,\"choosen\":false},\"#1\":{\"text\":\"Odpowied\\u017a 2\",\"goodAnswer\":false,\"left\":50,\"top\":65,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0.7)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"ff82b34b52049937fb82ce2c50129e8a-1-23\",\"type\":\"quiz-dnd\",\"width\":150,\"height\":50,\"attempts\":\"\",\"answers\":{\"ff82b34b52049937fb82ce2c50129e8a-2-23\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"ff82b34b52049937fb82ce2c50129e8a-3-23\"],\"userSelection\":[]}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"component-inner\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":0}},\"reportName\":\"\",\"contents\":\"<div style=\\\"text-align:center\\\"><span style=\\\"font-size:18px\\\">Potwierd\\u017a<\\/span><\\/div>\"}]', 0),
(48, 297, 29, '8a3a85bbe7c0dd327f68296e31926215', 'https://darkan.eu/content/8a3a85bbe7c0dd327f68296e31926215', 'LEKI', '', '2018-10-17 18:07:22', '2018-10-17 18:07:22', '2018-10-17 18:07:22', 1, 1, '1', 1, 2, 7, 'https://darkan.eu/storage/app/publications/8a3a85bbe7c0dd327f68296e31926215/thumb/thumb.png', 0, 12309149, 0, '2018-10-17 18:07:22', 0, 0, '', 0, 0, 1, 0, 0, '', 1, '{\"pages\":true,\"score\":false,\"scoreRequired\":0,\"scoreMax\":0}', '[]', 0),
(49, 297, 29, '4a3662cf59313b4dce395c3e58abbc13', 'https://darkan.eu/content/4a3662cf59313b4dce395c3e58abbc13', 'LEKI', '', '2018-10-17 18:22:34', '2018-10-17 18:22:34', '2018-10-17 18:22:34', 1, 1, '1', 1, 1, 8, 'https://darkan.eu/storage/app/publications/4a3662cf59313b4dce395c3e58abbc13/thumb/thumb.png', 0, 12055028, 0, '2018-10-17 18:22:34', 0, 0, '', 0, 0, 1, 0, 0, '', 1, '{\"pages\":true,\"score\":false,\"scoreRequired\":0,\"scoreMax\":0}', '[]', 0),
(50, 297, 29, '20dbff23c3a2e80ac9535fcb8cbbe06e', 'https://darkan.eu/content/20dbff23c3a2e80ac9535fcb8cbbe06e', 'LEKI test', '', '2018-10-17 18:25:30', '2018-10-17 18:25:30', '2018-10-17 18:25:30', 1, 1, '1', 1, 1, 9, 'https://darkan.eu/storage/app/publications/20dbff23c3a2e80ac9535fcb8cbbe06e/thumb/thumb.png', 0, 12056568, 0, '2018-10-17 18:25:30', 0, 0, '', 0, 0, 1, 0, 0, '', 1, '{\"pages\":true,\"score\":false,\"scoreRequired\":0,\"scoreMax\":0}', '[]', 0),
(51, 297, 29, '3e2b48610f015277b31b6e762dd9b0f1', 'https://darkan.eu/content/3e2b48610f015277b31b6e762dd9b0f1', 'LEKI test2', '', '2018-10-18 09:15:14', '2018-10-18 09:15:14', '2018-10-18 09:15:14', 1, 1, '1', 1, 3, 10, 'https://darkan.eu/storage/app/publications/3e2b48610f015277b31b6e762dd9b0f1/thumb/thumb.png', 0, 12058983, 0, '2018-10-18 09:15:14', 0, 0, '', 0, 0, 1, 0, 0, '', 1, '{\"pages\":true,\"score\":false,\"scoreRequired\":0,\"scoreMax\":0}', '[]', 0),
(52, 297, 113, 'eb2f1822f3d66d48ba76f9dda7cf022a', 'https://darkan.eu/content/eb2f1822f3d66d48ba76f9dda7cf022a', 'OFERTA HANDLOWA', '', '2018-10-24 20:05:46', '2018-10-24 20:05:46', '2018-10-24 20:05:46', 1, 1, '1', 1, 2, 0, 'https://darkan.eu/storage/app/publications/eb2f1822f3d66d48ba76f9dda7cf022a/thumb/thumb.png', 0, 11993285, 0, '2018-10-24 20:05:46', 0, 0, '', 0, 0, 1, 0, 0, '', 1, '{\"pages\":true,\"score\":false,\"scoreRequired\":0,\"scoreMax\":0}', '[]', 0),
(53, 333, 113, 'f9a614e8bd4ca60908e05ac1b524ae60', 'https://darkan.eu/content/f9a614e8bd4ca60908e05ac1b524ae60', 'Cyberbezpieczeństwo', '', '2018-12-06 11:52:48', '2018-12-06 11:52:48', '2018-12-06 11:52:48', 1, 1, '1', 1, 9, 2, 'https://darkan.eu/storage/app/publications/f9a614e8bd4ca60908e05ac1b524ae60/thumb/thumb.png', 0, 41466358, 0, '2018-12-06 11:52:48', 0, 0, '', 0, 0, 1, 0, 0, '', 1, '{\"pages\":true,\"score\":false,\"scoreRequired\":0,\"scoreMax\":0}', '[{\"actionkey\":\"2d24a6e1dcfe580abd5456d81fff2dc3-27-12\",\"type\":\"quiz\",\"width\":411,\"height\":225,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"\",\"goodAnswer\":false,\"left\":34,\"top\":17,\"choosen\":false},\"#1\":{\"text\":\"\",\"goodAnswer\":true,\"left\":33,\"top\":76,\"choosen\":false},\"#2\":{\"text\":\"\",\"goodAnswer\":false,\"left\":33,\"top\":132,\"choosen\":false},\"#3\":{\"text\":\"\",\"goodAnswer\":false,\"left\":31,\"top\":173,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"2d24a6e1dcfe580abd5456d81fff2dc3-25-12\",\"type\":\"quiz\",\"width\":410,\"height\":209,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"\",\"goodAnswer\":false,\"left\":33,\"top\":15,\"choosen\":false},\"#1\":{\"text\":\"\",\"goodAnswer\":false,\"left\":33,\"top\":55,\"choosen\":false},\"#2\":{\"text\":\"\",\"goodAnswer\":true,\"left\":33,\"top\":113,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"2d24a6e1dcfe580abd5456d81fff2dc3-23-12\",\"type\":\"quiz\",\"width\":411,\"height\":225,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"\",\"goodAnswer\":false,\"left\":36,\"top\":10,\"choosen\":false},\"#1\":{\"text\":\"\",\"goodAnswer\":false,\"left\":36,\"top\":46,\"choosen\":false},\"#2\":{\"text\":\"\",\"goodAnswer\":true,\"left\":35,\"top\":99,\"choosen\":false},\"#3\":{\"text\":\"\",\"goodAnswer\":false,\"left\":35,\"top\":176,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"2d24a6e1dcfe580abd5456d81fff2dc3-21-12\",\"type\":\"quiz\",\"width\":410,\"height\":209,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"\",\"goodAnswer\":false,\"left\":33,\"top\":14,\"choosen\":false},\"#1\":{\"text\":\"\",\"goodAnswer\":false,\"left\":34,\"top\":58,\"choosen\":false},\"#2\":{\"text\":\"\",\"goodAnswer\":false,\"left\":33,\"top\":105,\"choosen\":false},\"#3\":{\"text\":\"\",\"goodAnswer\":true,\"left\":33,\"top\":147,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"2d24a6e1dcfe580abd5456d81fff2dc3-19-12\",\"type\":\"quiz\",\"width\":411,\"height\":215,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"\",\"goodAnswer\":true,\"left\":34,\"top\":14,\"choosen\":false},\"#1\":{\"text\":\"\",\"goodAnswer\":false,\"left\":34,\"top\":56,\"choosen\":false},\"#2\":{\"text\":\"\",\"goodAnswer\":false,\"left\":34,\"top\":102,\"choosen\":false},\"#3\":{\"text\":\"\",\"goodAnswer\":false,\"left\":35,\"top\":147,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"2d24a6e1dcfe580abd5456d81fff2dc3-22-19\",\"type\":\"quiz\",\"width\":644,\"height\":216,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"\",\"goodAnswer\":false,\"left\":34,\"top\":17,\"choosen\":false},\"#1\":{\"text\":\"\",\"goodAnswer\":true,\"left\":33,\"top\":54,\"choosen\":false},\"#2\":{\"text\":\"\",\"goodAnswer\":false,\"left\":34,\"top\":92,\"choosen\":false},\"#3\":{\"text\":\"\",\"goodAnswer\":false,\"left\":33,\"top\":152,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"2d24a6e1dcfe580abd5456d81fff2dc3-20-19\",\"type\":\"quiz\",\"width\":410,\"height\":209,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"\",\"goodAnswer\":true,\"left\":33,\"top\":14,\"choosen\":false},\"#1\":{\"text\":\"\",\"goodAnswer\":true,\"left\":33,\"top\":48,\"choosen\":false},\"#2\":{\"text\":\"\",\"goodAnswer\":true,\"left\":33,\"top\":102,\"choosen\":false},\"#3\":{\"text\":\"\",\"goodAnswer\":false,\"left\":35,\"top\":140,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"2d24a6e1dcfe580abd5456d81fff2dc3-18-19\",\"type\":\"quiz\",\"width\":411,\"height\":215,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"\",\"goodAnswer\":true,\"left\":34,\"top\":17,\"choosen\":false},\"#1\":{\"text\":\"\",\"goodAnswer\":true,\"left\":33,\"top\":52,\"choosen\":false},\"#2\":{\"text\":\"\",\"goodAnswer\":true,\"left\":33,\"top\":85,\"choosen\":false},\"#3\":{\"text\":\"\",\"goodAnswer\":false,\"left\":34,\"top\":138,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"2d24a6e1dcfe580abd5456d81fff2dc3-26-24\",\"type\":\"quiz\",\"width\":411,\"height\":215,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"\",\"goodAnswer\":true,\"left\":34,\"top\":17,\"choosen\":false},\"#1\":{\"text\":\"\",\"goodAnswer\":false,\"left\":33,\"top\":76,\"choosen\":false},\"#2\":{\"text\":\"\",\"goodAnswer\":false,\"left\":34,\"top\":133,\"choosen\":false},\"#3\":{\"text\":\"\",\"goodAnswer\":false,\"left\":33,\"top\":194,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"2d24a6e1dcfe580abd5456d81fff2dc3-24-24\",\"type\":\"quiz\",\"width\":410,\"height\":209,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"\",\"goodAnswer\":true,\"left\":33,\"top\":14,\"choosen\":false},\"#1\":{\"text\":\"\",\"goodAnswer\":true,\"left\":33,\"top\":70,\"choosen\":false},\"#2\":{\"text\":\"\",\"goodAnswer\":false,\"left\":34,\"top\":126,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"2d24a6e1dcfe580abd5456d81fff2dc3-22-24\",\"type\":\"quiz\",\"width\":411,\"height\":215,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"\",\"goodAnswer\":false,\"left\":34,\"top\":17,\"choosen\":false},\"#1\":{\"text\":\"\",\"goodAnswer\":true,\"left\":33,\"top\":57,\"choosen\":false},\"#2\":{\"text\":\"\",\"goodAnswer\":false,\"left\":33,\"top\":98,\"choosen\":false},\"#3\":{\"text\":\"\",\"goodAnswer\":false,\"left\":34,\"top\":135,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"2d24a6e1dcfe580abd5456d81fff2dc3-20-24\",\"type\":\"quiz\",\"width\":410,\"height\":209,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"\",\"goodAnswer\":false,\"left\":33,\"top\":14,\"choosen\":false},\"#1\":{\"text\":\"\",\"goodAnswer\":true,\"left\":33,\"top\":53,\"choosen\":false},\"#2\":{\"text\":\"\",\"goodAnswer\":false,\"left\":32,\"top\":112,\"choosen\":false},\"#3\":{\"text\":\"\",\"goodAnswer\":false,\"left\":35,\"top\":171,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"2d24a6e1dcfe580abd5456d81fff2dc3-18-24\",\"type\":\"quiz\",\"width\":411,\"height\":215,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"\",\"goodAnswer\":false,\"left\":34,\"top\":17,\"choosen\":false},\"#1\":{\"text\":\"\",\"goodAnswer\":true,\"left\":33,\"top\":56,\"choosen\":false},\"#2\":{\"text\":\"\",\"goodAnswer\":false,\"left\":33,\"top\":114,\"choosen\":false},\"#3\":{\"text\":\"\",\"goodAnswer\":false,\"left\":33,\"top\":173,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"2d24a6e1dcfe580abd5456d81fff2dc3-20-28\",\"type\":\"quiz\",\"width\":410,\"height\":209,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"\",\"goodAnswer\":false,\"left\":176,\"top\":16,\"choosen\":false},\"#1\":{\"text\":\"\",\"goodAnswer\":true,\"left\":176,\"top\":55,\"choosen\":false},\"#2\":{\"text\":\"\",\"goodAnswer\":false,\"left\":175,\"top\":96,\"choosen\":false},\"#3\":{\"text\":\"\",\"goodAnswer\":false,\"left\":173,\"top\":135,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"2d24a6e1dcfe580abd5456d81fff2dc3-18-28\",\"type\":\"quiz\",\"width\":411,\"height\":215,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"\",\"goodAnswer\":false,\"left\":186,\"top\":26,\"choosen\":false},\"#1\":{\"text\":\"\",\"goodAnswer\":false,\"left\":187,\"top\":63,\"choosen\":false},\"#2\":{\"text\":\"\",\"goodAnswer\":true,\"left\":186,\"top\":105,\"choosen\":false},\"#3\":{\"text\":\"\",\"goodAnswer\":false,\"left\":186,\"top\":143,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"}]', 0);
INSERT INTO `banners_projects` (`id_banner`, `project_id`, `user_id`, `path`, `iframe`, `name`, `summary`, `date_create`, `date_expiry`, `modified`, `view_count`, `max_view_count`, `dimensions`, `active`, `views`, `ord`, `thumb`, `price`, `size_project`, `size_source`, `last_visit`, `status`, `available`, `questions`, `zoom`, `share`, `fullscreen`, `reset_progress`, `primary`, `index_file`, `show_title`, `requirements`, `questiondata`, `isold`) VALUES
(55, 329, 125, '0937998b867e48065489d7d7f2b9cee6', 'https://darkan.eu/content/0937998b867e48065489d7d7f2b9cee6', 'Bezpieczeństwo transakcji ', '', '2018-12-10 14:57:46', '2018-12-10 14:57:46', '2018-12-10 14:57:46', 1, 1, '1', 1, 25, 1, 'https://darkan.eu/storage/app/publications/0937998b867e48065489d7d7f2b9cee6/thumb/thumb.png', 0, 20379905, 0, '2018-12-10 14:57:46', 0, 0, '', 0, 0, 1, 0, 0, '', 1, '{\"pages\":true,\"score\":false,\"scoreRequired\":0,\"scoreMax\":0}', '[{\"actionkey\":\"743944b42841d5970fb91a33c2ca6f1b-11-65\",\"type\":\"quiz\",\"width\":119,\"height\":60,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"Prawda\",\"goodAnswer\":true,\"left\":23,\"top\":2,\"choosen\":false},\"#1\":{\"text\":\"Fa\\u0142sz\",\"goodAnswer\":false,\"left\":24,\"top\":35,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgb(255, 255, 255)\",\"border-radius\":\"10px\",\"color\":\"rgb(0, 0, 0)\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"743944b42841d5970fb91a33c2ca6f1b-10-65\",\"type\":\"quiz\",\"width\":119,\"height\":60,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"Prawda\",\"goodAnswer\":true,\"left\":23,\"top\":2,\"choosen\":false},\"#1\":{\"text\":\"Fa\\u0142sz\",\"goodAnswer\":false,\"left\":24,\"top\":35,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgb(255, 255, 255)\",\"border-radius\":\"10px\",\"color\":\"rgb(0, 0, 0)\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"743944b42841d5970fb91a33c2ca6f1b-6-65\",\"type\":\"quiz\",\"width\":117,\"height\":63,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"Prawda\",\"goodAnswer\":false,\"left\":23,\"top\":2,\"choosen\":false},\"#1\":{\"text\":\"Fa\\u0142sz\",\"goodAnswer\":true,\"left\":24,\"top\":35,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgb(255, 255, 255)\",\"border-radius\":\"10px\",\"color\":\"rgb(0, 0, 0)\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"743944b42841d5970fb91a33c2ca6f1b-17-65\",\"type\":\"quiz\",\"width\":119,\"height\":60,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"Prawda\",\"goodAnswer\":true,\"left\":23,\"top\":2,\"choosen\":false},\"#1\":{\"text\":\"Fa\\u0142sz\",\"goodAnswer\":false,\"left\":24,\"top\":35,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgb(255, 255, 255)\",\"border-radius\":\"10px\",\"color\":\"rgb(0, 0, 0)\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"743944b42841d5970fb91a33c2ca6f1b-16-65\",\"type\":\"quiz\",\"width\":119,\"height\":60,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"Prawda\",\"goodAnswer\":false,\"left\":23,\"top\":2,\"choosen\":false},\"#1\":{\"text\":\"Fa\\u0142sz\",\"goodAnswer\":true,\"left\":24,\"top\":35,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgb(255, 255, 255)\",\"border-radius\":\"10px\",\"color\":\"rgb(0, 0, 0)\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"743944b42841d5970fb91a33c2ca6f1b-15-65\",\"type\":\"quiz\",\"width\":119,\"height\":60,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"Prawda\",\"goodAnswer\":true,\"left\":23,\"top\":2,\"choosen\":false},\"#1\":{\"text\":\"Fa\\u0142sz\",\"goodAnswer\":false,\"left\":24,\"top\":35,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgb(255, 255, 255)\",\"border-radius\":\"10px\",\"color\":\"rgb(0, 0, 0)\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"743944b42841d5970fb91a33c2ca6f1b-11-66\",\"type\":\"quiz-dnd\",\"width\":150,\"height\":50,\"attempts\":\"\",\"answers\":{\"743944b42841d5970fb91a33c2ca6f1b-9-66\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":true,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"743944b42841d5970fb91a33c2ca6f1b-4-66\",\"743944b42841d5970fb91a33c2ca6f1b-7-66\",\"743944b42841d5970fb91a33c2ca6f1b-6-66\"],\"userSelection\":[]}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"component-inner\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":0}},\"reportName\":\"\",\"contents\":\"<div style=\\\"text-align:center\\\"><span style=\\\"font-size:18px\\\">Potwierd\\u017a<\\/span><\\/div>\"}]', 0),
(56, 354, 125, 'c1db56a3e9cddf7ad5005f7b810e71ab', 'https://darkan.eu/content/c1db56a3e9cddf7ad5005f7b810e71ab', 'Oferta handlowa', 'Katalog produktów dla branży medycznej.', '2018-12-17 10:16:40', '2018-12-17 10:16:40', '2018-12-17 10:16:40', 1, 1, '1', 1, 2, 0, 'https://darkan.eu/storage/app/publications/c1db56a3e9cddf7ad5005f7b810e71ab/thumb/thumb.png', 0, 11993255, 0, '2018-12-17 10:16:40', 0, 0, '', 0, 0, 1, 0, 0, '', 1, '{\"pages\":true,\"score\":false,\"scoreRequired\":0,\"scoreMax\":0}', '[]', 0),
(57, 353, 125, '7ff42ce23b286f0025c2492bcccd923c', 'https://darkan.eu/content/7ff42ce23b286f0025c2492bcccd923c', 'Zarządzanie zasobami ludzkimi.', 'Szkolenie z zakresu zarządzania zasobami ludzkimi.', '2019-02-05 12:08:50', '2019-02-05 12:08:50', '2019-02-05 12:08:50', 1, 1, '1', 1, 0, 2, 'https://darkan.eu/storage/app/publications/7ff42ce23b286f0025c2492bcccd923c/thumb/thumb.png', 0, 14652114, 0, '2019-02-05 12:08:50', 0, 0, '', 0, 0, 1, 0, 0, '', 1, '{\"pages\":true,\"score\":false,\"scoreRequired\":0,\"scoreMax\":0}', '[{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-21-21\",\"type\":\"quiz\",\"width\":688,\"height\":78,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"Model Michigan\",\"goodAnswer\":true,\"left\":180,\"top\":29,\"choosen\":false},\"#1\":{\"text\":\"Model Harvard\",\"goodAnswer\":false,\"left\":441,\"top\":30,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0.7)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-16-21\",\"type\":\"quiz\",\"width\":688,\"height\":78,\"attempts\":\"\",\"answers\":{\"#0\":{\"text\":\"Prawda\",\"goodAnswer\":true,\"left\":202,\"top\":31,\"choosen\":false},\"#1\":{\"text\":\"Fa\\u0142sz\",\"goodAnswer\":false,\"left\":446,\"top\":32,\"choosen\":false}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"quiz-body\":{\"background\":\"rgba(0, 0, 0, 0.7)\",\"border-radius\":\"10px\",\"color\":\"#fff\"},\"quiz-submit-button\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":\"none\"}},\"reportName\":\"\"},{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-8-22\",\"type\":\"quiz-dnd\",\"width\":150,\"height\":50,\"attempts\":\"\",\"answers\":{\"9c414f98f84ad6129c6363d1ca1e42d8-6-22\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"9c414f98f84ad6129c6363d1ca1e42d8-3-22\"],\"userSelection\":[]},\"9c414f98f84ad6129c6363d1ca1e42d8-7-22\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"9c414f98f84ad6129c6363d1ca1e42d8-4-22\"],\"userSelection\":[]}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"component-inner\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":0}},\"reportName\":\"\",\"contents\":\"<div style=\\\"text-align:center\\\"><span style=\\\"font-size:18px\\\">Potwierd\\u017a<\\/span><\\/div>\"},{\"actionkey\":\"9c414f98f84ad6129c6363d1ca1e42d8-8-23\",\"type\":\"quiz-dnd\",\"width\":150,\"height\":50,\"attempts\":\"\",\"answers\":{\"9c414f98f84ad6129c6363d1ca1e42d8-20-23\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"9c414f98f84ad6129c6363d1ca1e42d8-14-23\",\"9c414f98f84ad6129c6363d1ca1e42d8-13-23\",\"9c414f98f84ad6129c6363d1ca1e42d8-7-23\",\"9c414f98f84ad6129c6363d1ca1e42d8-6-23\"],\"userSelection\":[]},\"9c414f98f84ad6129c6363d1ca1e42d8-19-23\":{\"opts\":{\"autoArrangeAnswers\":true,\"dropandhide\":false,\"enoughAnswers\":0,\"forceGoodSequence\":false,\"maxAnswers\":0,\"onlygoodanswers\":false,\"revertType\":\"revertOnlyBad\"},\"pa\":[\"9c414f98f84ad6129c6363d1ca1e42d8-15-23\",\"9c414f98f84ad6129c6363d1ca1e42d8-18-23\",\"9c414f98f84ad6129c6363d1ca1e42d8-17-23\",\"9c414f98f84ad6129c6363d1ca1e42d8-16-23\"],\"userSelection\":[]}},\"scoreSuccess\":0,\"scoreFail\":0,\"scoreBadAnswer\":0,\"styles\":{\"component-inner\":{\"background\":\"#5082A5\",\"color\":\"#fff\",\"border\":0}},\"reportName\":\"\",\"contents\":\"<div style=\\\"text-align:center\\\"><span style=\\\"font-size:18px\\\">Potwierd\\u017a<\\/span><\\/div>\"}]', 0);

-- --------------------------------------------------------

--
-- Table structure for table `banners_projects_external`
--

CREATE TABLE `banners_projects_external` (
  `id_banner` int(10) UNSIGNED NOT NULL,
  `project_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `path` text COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `summary` text COLLATE utf8_unicode_ci,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `banners_shared`
--

CREATE TABLE `banners_shared` (
  `id_shared` int(10) UNSIGNED NOT NULL,
  `banner_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `banners_to_categories`
--

CREATE TABLE `banners_to_categories` (
  `id` int(10) UNSIGNED NOT NULL,
  `course_id` int(10) UNSIGNED NOT NULL,
  `category_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `clients_addresses`
--

CREATE TABLE `clients_addresses` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `city_id` int(10) UNSIGNED NOT NULL,
  `zip_code_id` int(10) UNSIGNED NOT NULL,
  `address` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `clients_cities`
--

CREATE TABLE `clients_cities` (
  `id` int(10) UNSIGNED NOT NULL,
  `city` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `clients_zip_codes`
--

CREATE TABLE `clients_zip_codes` (
  `id` int(10) UNSIGNED NOT NULL,
  `zip` varchar(10) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cron_emails_types`
--

CREATE TABLE `cron_emails_types` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `cron_emails_types`
--

INSERT INTO `cron_emails_types` (`id`, `name`) VALUES
(1, 'registred_after_15_minutes'),
(2, 'registred_after_7_days'),
(3, 'pan_ending_for_7_days'),
(4, 'pan_ending_for_1_day'),
(5, 'registred_after_3_days'),
(6, 'registred_after_14_days');

-- --------------------------------------------------------

--
-- Table structure for table `cron_email_type_to_plan_user`
--

CREATE TABLE `cron_email_type_to_plan_user` (
  `id` int(10) UNSIGNED NOT NULL,
  `plan_user_id` int(10) UNSIGNED NOT NULL,
  `cron_email_type_id` int(10) UNSIGNED NOT NULL,
  `email_sended` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cron_email_type_to_user`
--

CREATE TABLE `cron_email_type_to_user` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `cron_email_type_id` int(10) UNSIGNED NOT NULL,
  `email_sended` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `currencies`
--

CREATE TABLE `currencies` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(10) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `currencies`
--

INSERT INTO `currencies` (`id`, `name`) VALUES
(1, 'PLN'),
(2, 'EUR'),
(3, 'USD'),
(4, 'GBP');

-- --------------------------------------------------------

--
-- Table structure for table `editors`
--

CREATE TABLE `editors` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `order` int(11) NOT NULL DEFAULT '0',
  `develop` tinyint(4) NOT NULL DEFAULT '0',
  `active` tinyint(4) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `editors`
--

INSERT INTO `editors` (`id`, `name`, `description`, `order`, `develop`, `active`) VALUES
(1, 'Empty project', 'Empty project', 0, 0, 1),
(2, 'Pdf project', 'Pdf project', 0, 0, 1),
(3, 'Img project', 'Img project', 0, 0, 1),
(4, 'Darkan easy', 'Darkan easy', 0, 0, 1),
(5, 'Darkan standard', 'Darkan standard', 0, 0, 1),
(6, 'Darkan profesional', 'Darkan profesional', 0, 0, 1),
(7, 'Darkan enterprise', 'Darkan enterprise', 0, 0, 1),
(8, 'Ppt to Darkan', 'Ppt to Darkan', 0, 0, 1);

-- --------------------------------------------------------

--
-- Table structure for table `forms_of_payment`
--

CREATE TABLE `forms_of_payment` (
  `id` int(10) UNSIGNED NOT NULL,
  `method` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `display_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `forms_of_payment`
--

INSERT INTO `forms_of_payment` (`id`, `method`, `name`, `display_name`) VALUES
(1, -1, 'all', 'Wszystkie'),
(2, 145, 'credit_card', 'Karta płatnicza (cykliczność)');

-- --------------------------------------------------------

--
-- Table structure for table `groups`
--

CREATE TABLE `groups` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_owner` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `status` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `groups`
--

INSERT INTO `groups` (`id`, `id_owner`, `name`, `status`) VALUES
(1, 29, 'nazwa', 0),
(2, 29, 'bul', 0),
(3, 29, 'cos', 0),
(4, 29, 'inna', 0),
(5, 33, 'dfgdfg', 0),
(6, 125, 'nowa', 0);

-- --------------------------------------------------------

--
-- Table structure for table `group_banner`
--

CREATE TABLE `group_banner` (
  `id_group` int(10) UNSIGNED NOT NULL,
  `id_banner` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `group_user`
--

CREATE TABLE `group_user` (
  `id_group` int(10) UNSIGNED NOT NULL,
  `id_user` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `group_user`
--

INSERT INTO `group_user` (`id_group`, `id_user`) VALUES
(1, 29),
(2, 29),
(3, 29),
(1, 39),
(3, 39),
(5, 44),
(6, 125);

-- --------------------------------------------------------

--
-- Table structure for table `lms_group_content`
--

CREATE TABLE `lms_group_content` (
  `group_id` int(10) UNSIGNED NOT NULL,
  `content_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `lms_group_content`
--

INSERT INTO `lms_group_content` (`group_id`, `content_id`) VALUES
(5, 15),
(3, 46);

-- --------------------------------------------------------

--
-- Table structure for table `lms_info`
--

CREATE TABLE `lms_info` (
  `user_id` int(10) UNSIGNED NOT NULL,
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
  `skin` int(10) UNSIGNED NOT NULL DEFAULT '1',
  `paypal_mail` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `redirect_url` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `custom_view` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `mail_template` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `portal_bought_mail_template` varchar(120) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `terms_link` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `force_lang` varchar(2) COLLATE utf8_unicode_ci NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `lms_info`
--

INSERT INTO `lms_info` (`user_id`, `state`, `login`, `savemail`, `passwd`, `price`, `currency`, `expiration`, `max_accounts`, `business`, `paid`, `topmenuon`, `footeron`, `skin`, `paypal_mail`, `redirect_url`, `custom_view`, `mail_template`, `portal_bought_mail_template`, `terms_link`, `force_lang`) VALUES
(29, 0, 1, 0, '', 0, 'EUR', '2017-04-09 17:21:20', 20, 0, 0, 0, 0, 1, '', '', '', '', '', '', ''),
(33, 0, 1, 0, '', 0, 'EUR', '2017-04-12 10:53:56', 20, 0, 0, 1, 1, 1, '', '', '', '', '', '', ''),
(54, 0, 1, 0, '', 0, 'EUR', '2018-01-07 20:27:29', 20, 0, 0, 0, 0, 1, '', '', '', '', '', '', ''),
(112, 0, 1, 0, '', 0, 'EUR', '2018-06-16 08:58:04', 20, 0, 0, 1, 1, 1, '', '', '', '', '', '', ''),
(121, 1, 0, 0, '', 0, 'EUR', '2018-07-09 14:05:37', 20, 0, 0, 1, 1, 1, '', '', '', '', '', '', ''),
(113, 0, 0, 0, '', 0, 'EUR', '2018-07-31 18:35:00', 20, 0, 0, 0, 0, 2, '', '', '', '', '', '', ''),
(125, 0, 0, 0, '', 0, 'EUR', '2018-08-01 08:24:53', 20, 0, 0, 1, 1, 1, '', '', '', '', '', '', '');

-- --------------------------------------------------------

--
-- Table structure for table `lms_invitation_requests`
--

CREATE TABLE `lms_invitation_requests` (
  `id` int(10) UNSIGNED NOT NULL,
  `owner_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `mails_sent` int(11) NOT NULL,
  `hash` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lms_scorm_data`
--

CREATE TABLE `lms_scorm_data` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `content_id` int(10) UNSIGNED NOT NULL,
  `status` varchar(25) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'incompleted',
  `suspend_data` text COLLATE utf8_unicode_ci NOT NULL,
  `lesson_location` int(11) NOT NULL DEFAULT '0',
  `point_status` text COLLATE utf8_unicode_ci NOT NULL,
  `questionsarray` text COLLATE utf8_unicode_ci NOT NULL,
  `page_time` text COLLATE utf8_unicode_ci NOT NULL,
  `pages` text COLLATE utf8_unicode_ci NOT NULL,
  `needs` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `answers` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lms_scorm_data_guest`
--

CREATE TABLE `lms_scorm_data_guest` (
  `hash` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `content_id` int(10) UNSIGNED NOT NULL,
  `status` varchar(25) COLLATE utf8_unicode_ci NOT NULL DEFAULT 'incompleted',
  `suspend_data` text COLLATE utf8_unicode_ci NOT NULL,
  `lesson_location` int(11) NOT NULL DEFAULT '0',
  `point_status` text COLLATE utf8_unicode_ci NOT NULL,
  `questionsarray` text COLLATE utf8_unicode_ci NOT NULL,
  `page_time` text COLLATE utf8_unicode_ci NOT NULL,
  `pages` text COLLATE utf8_unicode_ci NOT NULL,
  `needs` varchar(200) COLLATE utf8_unicode_ci NOT NULL,
  `answers` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `lms_user_portal`
--

CREATE TABLE `lms_user_portal` (
  `id` int(10) UNSIGNED NOT NULL,
  `portal_admin` int(10) UNSIGNED NOT NULL,
  `user` int(10) UNSIGNED NOT NULL,
  `active_actual` int(11) NOT NULL DEFAULT '1',
  `active_future` int(11) NOT NULL DEFAULT '1',
  `user_name` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `limit_exceeded` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `lms_user_portal`
--

INSERT INTO `lms_user_portal` (`id`, `portal_admin`, `user`, `active_actual`, `active_future`, `user_name`, `limit_exceeded`) VALUES
(1, 29, 29, 1, 1, '', 0),
(2, 29, 39, 1, 1, '', 0),
(3, 33, 44, 1, 1, '', 0),
(4, 3, 3, 1, 1, '', 0),
(5, 3, 29, 1, 1, '', 0),
(6, 54, 54, 1, 1, '', 0),
(7, 3, 54, 1, 1, '', 0),
(8, 103, 103, 1, 1, '', 0),
(9, 112, 112, 1, 1, '', 0),
(10, 3, 6, 1, 1, '', 0),
(11, 3, 125, 1, 1, '', 0),
(12, 3, 113, 1, 1, '', 0),
(13, 29, 133, 1, 1, '', 0),
(14, 113, 113, 1, 1, '', 0),
(15, 29, 125, 1, 1, '', 0),
(16, 125, 125, 1, 1, '', 0),
(17, 125, 3, 1, 1, '', 0),
(18, 125, 4, 1, 1, '', 0),
(19, 125, 9, 1, 1, '', 0),
(20, 125, 10, 1, 1, '', 0);

-- --------------------------------------------------------

--
-- Table structure for table `lms_user_portal_paid`
--

CREATE TABLE `lms_user_portal_paid` (
  `id` int(10) UNSIGNED NOT NULL,
  `user` int(10) UNSIGNED NOT NULL,
  `portal_admin` int(10) UNSIGNED NOT NULL,
  `paid` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mailing_groups`
--

CREATE TABLE `mailing_groups` (
  `id` int(10) UNSIGNED NOT NULL,
  `id_owner` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `mailing_groups`
--

INSERT INTO `mailing_groups` (`id`, `id_owner`, `name`) VALUES
(1, 29, 'nazwa');

-- --------------------------------------------------------

--
-- Table structure for table `mailing_group_user`
--

CREATE TABLE `mailing_group_user` (
  `id_group` int(10) UNSIGNED NOT NULL,
  `id_user` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `mailing_users`
--

CREATE TABLE `mailing_users` (
  `id` int(10) UNSIGNED NOT NULL,
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `name` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `owner_id` int(10) UNSIGNED NOT NULL,
  `create_date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `data` text COLLATE utf8_unicode_ci NOT NULL,
  `fb_link` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `migrations`
--

CREATE TABLE `migrations` (
  `id` int(10) UNSIGNED NOT NULL,
  `migration` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `batch` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `migrations`
--

INSERT INTO `migrations` (`id`, `migration`, `batch`) VALUES
(78, '2014_10_12_000000_create_users_table', 1),
(79, '2014_10_12_100000_create_password_resets_table', 1),
(80, '2015_12_07_082902_create_payment_table', 1),
(81, '2016_10_04_093523_entrust_setup_tables', 1),
(82, '2017_01_17_082902_create_cron_emails_table', 1),
(83, '2017_01_18_082902_create_app_table', 1),
(84, '2017_01_27_082902_create_lms_table', 1),
(85, '2017_01_28_082902_create_api_table', 1),
(86, '2017_01_30_082902_create_others_table', 1),
(87, '2017_02_01_082902_create_insert_values_table', 1),
(88, '2017_02_07_082902_create_lms_payment_table', 1),
(89, '2017_04_10_001652_create_sessions_table', 2);

-- --------------------------------------------------------

--
-- Table structure for table `on_off_states`
--

CREATE TABLE `on_off_states` (
  `id` int(10) UNSIGNED NOT NULL,
  `state` int(11) NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `on_off_states`
--

INSERT INTO `on_off_states` (`id`, `state`, `name`) VALUES
(1, 0, 'Wyłączone'),
(2, 1, 'Włączone');

-- --------------------------------------------------------

--
-- Table structure for table `password_resets`
--

CREATE TABLE `password_resets` (
  `email` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `token` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `password_resets`
--

INSERT INTO `password_resets` (`email`, `token`, `created_at`) VALUES
('huberthc@gmail.com', '7e7b6bf0f84264d6c5f42126f7e69f5d2bac7b3c52dabe83b5e894e151a714e4', '2017-09-12 06:44:11'),
('karol.gancarz@gmail.com', '836bcc3a033b98680a494f30eefc1f018c62807c356c0dc05acf3cc9c8a664db', '2018-06-27 10:11:14'),
('tstdarkan@gmail.com', '6ddc3b6780f162e835bd1b6865fc35eb7f3359c824bb4ef77f9493be136abeaf', '2018-10-26 08:54:09');

-- --------------------------------------------------------

--
-- Table structure for table `payments`
--

CREATE TABLE `payments` (
  `id` int(10) UNSIGNED NOT NULL,
  `invoice_id` int(11) NOT NULL,
  `year` int(11) NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
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
  `txn_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT ''
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `payments`
--

INSERT INTO `payments` (`id`, `invoice_id`, `year`, `user_id`, `product`, `payment_status`, `payment_result`, `payment_data`, `created`, `modified`, `hash`, `invoice_data`, `price`, `created_at`, `updated_at`, `currency`, `locale`, `txn_id`) VALUES
(1, 12345, 2017, 49, 'Standard for 12 months', 'started', 'created', 'plan_10', '2017-11-14 07:22:43', '2017-11-14 08:22:43', 'created', 'created', '1299.00', '2017-11-14 06:22:43', '2017-11-14 06:22:43', 'PLN', 'en', 'PAY-605803011E5242321LIFJTQY'),
(2, 12345, 2017, 73, 'Standard for 12 months', 'started', 'created', 'plan_10', '2017-11-14 14:55:15', '2017-11-14 15:55:15', 'created', 'created', '360.00', '2017-11-14 13:55:15', '2017-11-14 13:55:15', 'USD', 'en', 'PAY-6E9095193L702115XLIFQHUY'),
(3, 12345, 2017, 49, 'Standard for 12 months', 'started', 'created', 'plan_10', '2017-11-15 13:18:12', '2017-11-15 14:18:11', 'created', 'created', '1440.00', '2017-11-15 12:18:11', '2017-11-15 12:18:11', 'PLN', 'en', 'PAY-87206231K7374261ELIGD5EY'),
(4, 12345, 2017, 49, 'Standard for 1 month', 'started', 'created', 'plan_4', '2017-11-15 13:18:37', '2017-11-15 14:18:37', 'created', 'created', '140.00', '2017-11-15 12:18:37', '2017-11-15 12:18:37', 'PLN', 'en', 'PAY-7DE41935KL652860NLIGD5LI'),
(5, 12345, 2017, 76, 'Standard for 12 months', 'started', 'created', 'plan_10', '2017-11-17 12:07:24', '2017-11-17 13:07:24', 'created', 'created', '1440.00', '2017-11-17 11:07:24', '2017-11-17 11:07:24', 'PLN', 'en', 'PAY-6DD95317FK531152ULIHNB7A'),
(6, 12345, 2017, 78, 'Standard for 12 months', 'finished', 'approved', 'plan_10', '2017-11-21 20:36:44', '2017-11-21 21:36:44', 'created', 'created', '1440.00', '2017-11-21 19:36:44', '2017-11-21 19:47:15', 'PLN', 'en', 'PAY-1M164736C7432381MLIKI4XA'),
(7, 12345, 2017, 78, 'Standard for 12 months', 'started', 'created', 'plan_10', '2017-11-21 20:56:00', '2017-11-21 21:56:00', 'created', 'created', '1440.00', '2017-11-21 19:56:00', '2017-11-21 19:56:00', 'PLN', 'en', 'PAY-80866094UK979925PLIKJFYA'),
(8, 12345, 2017, 78, 'Standard for 12 months', 'finished', 'approved', 'plan_10', '2017-11-21 22:41:34', '2017-11-21 23:41:34', 'created', 'created', '1440.00', '2017-11-21 21:41:34', '2017-11-21 21:42:01', 'PLN', 'en', 'PAY-47T25406MX9511512LIKKXHI'),
(9, 12345, 2017, 78, 'Standard for 12 months', 'finished', 'approved', 'plan_10', '2017-11-21 22:46:35', '2017-11-21 23:46:35', 'created', 'created', '1440.00', '2017-11-21 21:46:35', '2017-11-21 21:46:56', 'PLN', 'en', 'PAY-3CT89936EV336000PLIKKZSY'),
(10, 12345, 2017, 78, 'Standard for 12 months', 'finished', 'approved', 'plan_10', '2017-11-21 22:54:25', '2017-11-21 23:54:25', 'created', 'created', '1440.00', '2017-11-21 21:54:25', '2017-11-21 21:54:41', 'PLN', 'en', 'PAY-6SV58033N84121406LIKK5II'),
(11, 12345, 2017, 79, 'Standard for 12 months', 'finished', 'approved', 'plan_10', '2017-11-21 23:00:21', '2017-11-22 00:00:21', 'created', 'created', '1440.00', '2017-11-21 22:00:21', '2017-11-21 22:00:59', 'PLN', 'en', 'PAY-2K7184051V0388232LIKLABI'),
(12, 12345, 2017, 79, 'Standard for 12 months', 'finished', 'approved', 'plan_10', '2017-11-21 23:04:24', '2017-11-22 00:04:24', 'created', 'created', '1440.00', '2017-11-21 22:04:24', '2017-11-21 22:04:39', 'PLN', 'en', 'PAY-86B9186793055502HLIKLB6A'),
(13, 12345, 2017, 79, 'Standard for 1 month', 'finished', 'approved', 'plan_4', '2017-11-21 23:04:58', '2017-11-22 00:04:58', 'created', 'created', '140.00', '2017-11-21 22:04:58', '2017-11-21 22:05:47', 'PLN', 'en', 'PAY-0DG5212222517283SLIKLCGQ'),
(14, 12345, 2017, 29, 'Professional for 12 months', 'started', 'created', 'plan_10', '2017-11-22 08:02:48', '2017-11-22 09:02:48', 'created', 'created', '1440.00', '2017-11-22 07:02:48', '2017-11-22 07:02:48', 'PLN', 'en', 'PAY-4YL68013LE638864SLIKS6KA'),
(15, 12345, 2017, 80, 'Professional for 12 months', 'started', 'created', 'plan_10', '2017-11-22 16:34:00', '2017-11-22 17:34:00', 'created', 'created', '1440.00', '2017-11-22 15:34:00', '2017-11-22 15:34:00', 'PLN', 'en', 'PAY-2ME926477S614940NLIK2N6A'),
(16, 12345, 2017, 80, 'Standard for 1 month', 'started', 'created', 'plan_4', '2017-11-22 16:34:38', '2017-11-22 17:34:38', 'created', 'created', '140.00', '2017-11-22 15:34:38', '2017-11-22 15:34:38', 'PLN', 'en', 'PAY-8UR76522VD631653SLIK2OHQ'),
(17, 12345, 2017, 80, 'Professional for 1 month', 'started', 'created', 'plan_4', '2017-11-22 16:35:15', '2017-11-22 17:35:15', 'created', 'created', '140.00', '2017-11-22 15:35:15', '2017-11-22 15:35:15', 'PLN', 'en', 'PAY-7VJ964767L0791408LIK2OQY'),
(18, 12345, 2017, 80, 'Professional for 12 months', 'started', 'created', 'plan_10', '2017-11-22 16:35:45', '2017-11-22 17:35:45', 'created', 'created', '1440.00', '2017-11-22 15:35:45', '2017-11-22 15:35:45', 'PLN', 'en', 'PAY-4N785857G40148712LIK2OYI'),
(19, 12345, 2017, 80, 'Standard for 12 months', 'finished', 'approved', 'plan_10', '2017-11-22 16:35:57', '2017-11-22 17:35:57', 'created', 'created', '1440.00', '2017-11-22 15:35:57', '2017-11-22 15:36:52', 'PLN', 'en', 'PAY-0B813497W1134363MLIK2O3I'),
(20, 12345, 2017, 80, 'Standard for 1 month', 'finished', 'approved', 'plan_4', '2017-11-22 16:37:36', '2017-11-22 17:37:36', 'created', 'created', '140.00', '2017-11-22 15:37:36', '2017-11-22 15:37:53', 'PLN', 'en', 'PAY-8SR98127CD844881KLIK2PUA'),
(21, 12345, 2017, 29, 'Professional for 1 month', 'started', 'created', 'plan_4', '2017-11-28 09:50:39', '2017-11-28 10:50:38', 'created', 'created', '140.00', '2017-11-28 08:50:38', '2017-11-28 08:50:38', 'PLN', 'en', 'PAY-2LG96035RS2529255LIOTC3Q'),
(22, 12345, 2017, 81, 'Standard for 12 months', 'started', 'created', 'plan_10', '2017-11-28 15:17:31', '2017-11-28 16:17:31', 'created', 'created', '1440.00', '2017-11-28 14:17:31', '2017-11-28 14:17:31', 'PLN', 'en', 'PAY-4AU025607T051654WLIOX4CY'),
(23, 12345, 2017, 81, 'Professional for 12 months', 'started', 'created', 'plan_10', '2017-11-28 15:18:26', '2017-11-28 16:18:26', 'created', 'created', '1440.00', '2017-11-28 14:18:26', '2017-11-28 14:18:26', 'PLN', 'en', 'PAY-3YC62264EX238812MLIOX4QQ'),
(24, 12345, 2017, 81, 'Professional for 1 month', 'started', 'created', 'plan_4', '2017-11-28 15:19:36', '2017-11-28 16:19:36', 'created', 'created', '140.00', '2017-11-28 14:19:36', '2017-11-28 14:19:36', 'PLN', 'en', 'PAY-80F87163PC103580NLIOX5CA'),
(25, 12345, 2017, 81, 'Professional for 12 months', 'started', 'created', 'plan_10', '2017-11-28 15:21:40', '2017-11-28 16:21:40', 'created', 'created', '1440.00', '2017-11-28 14:21:40', '2017-11-28 14:21:40', 'PLN', 'en', 'PAY-4UY57855MV107134VLIOX6BA'),
(26, 12345, 2017, 81, 'Professional for 12 months', 'finished', 'approved', 'plan_10', '2017-11-28 15:38:13', '2017-11-28 16:38:13', 'created', 'created', '1440.00', '2017-11-28 14:38:13', '2017-11-28 14:38:53', 'PLN', 'en', 'PAY-6VM77270315240305LIOYFZI'),
(27, 12345, 2017, 29, 'Professional for 12 months', 'finished', 'approved', 'plan_10', '2017-11-28 15:55:14', '2017-11-28 16:55:14', 'created', 'created', '1440.00', '2017-11-28 14:55:14', '2017-11-28 14:56:10', 'PLN', 'en', 'PAY-8G459453HM275274SLIOYNYI'),
(28, 12345, 2017, 82, 'Standard for 1 month', 'finished', 'approved', 'plan_4', '2017-11-28 17:28:22', '2017-11-28 18:28:22', 'created', 'created', '140.00', '2017-11-28 16:28:22', '2017-11-28 16:29:08', 'PLN', 'en', 'PAY-7HK84455212400543LIOZZNQ'),
(29, 12345, 2017, 82, 'Professional for 12 months', 'started', 'created', 'plan_10', '2017-11-28 17:32:46', '2017-11-28 18:32:46', 'created', 'created', '1440.00', '2017-11-28 16:32:46', '2017-11-28 16:32:46', 'PLN', 'en', 'PAY-3UD024397S169330WLIOZ3PQ'),
(30, 12345, 2017, 85, 'Professional for 12 months', 'finished', 'approved', 'plan_11', '2017-11-28 20:12:14', '2017-11-28 21:12:14', 'created', 'created', '3000.00', '2017-11-28 19:12:14', '2017-11-28 19:12:45', 'PLN', 'en', 'PAY-48V54475RU127852SLIO4GHQ'),
(31, 12345, 2017, 85, 'Standard for 1 month', 'finished', 'approved', 'plan_4', '2017-11-28 20:15:15', '2017-11-28 21:15:15', 'created', 'created', '140.00', '2017-11-28 19:15:15', '2017-11-28 19:15:56', 'PLN', 'en', 'PAY-1F475306EC240084GLIO4HUY'),
(32, 12345, 2017, 29, 'Standard for 1 month', 'started', 'created', 'plan_4', '2017-11-29 08:07:43', '2017-11-29 09:07:43', 'created', 'created', '140.00', '2017-11-29 07:07:43', '2017-11-29 07:07:43', 'PLN', 'en', 'PAY-7KN74401JR429441SLIPGVTY'),
(33, 12345, 2017, 29, 'Standard for 12 months', 'started', 'created', 'plan_10', '2017-11-29 08:08:14', '2017-11-29 09:08:14', 'created', 'created', '1440.00', '2017-11-29 07:08:14', '2017-11-29 07:08:14', 'PLN', 'en', 'PAY-6N3251276Y533701GLIPGV3Q'),
(34, 12345, 2017, 29, 'Professional for 1 month', 'started', 'created', 'plan_5', '2017-11-29 08:08:36', '2017-11-29 09:08:36', 'created', 'created', '300.00', '2017-11-29 07:08:36', '2017-11-29 07:08:36', 'PLN', 'en', 'PAY-5PA376513A978153NLIPGWBA'),
(35, 12345, 2017, 29, 'Standard for 1 month', 'started', 'created', 'plan_4', '2017-11-29 08:09:43', '2017-11-29 09:09:43', 'created', 'created', '150.00', '2017-11-29 07:09:43', '2017-11-29 07:09:43', 'PLN', 'en', 'PAY-2CR952013L579190SLIPGWRY'),
(36, 12345, 2017, 29, 'Standard for 12 months', 'started', 'created', 'plan_10', '2017-11-29 08:15:20', '2017-11-29 09:15:20', 'created', 'created', '360.00', '2017-11-29 07:15:20', '2017-11-29 07:15:20', 'EUR', 'en', 'PAY-3AF97746C32289932LIPGZGA'),
(37, 12345, 2017, 29, 'Standard for 12 months', 'started', 'created', 'plan_10', '2017-11-29 08:17:18', '2017-11-29 09:17:18', 'created', 'created', '500.00', '2017-11-29 07:17:18', '2017-11-29 07:17:18', 'USD', 'en', 'PAY-13T98993RJ864320KLIPG2DQ'),
(38, 12345, 2017, 29, 'Professional for 12 months', 'started', 'created', 'plan_11', '2017-11-29 08:22:55', '2017-11-29 09:22:55', 'created', 'created', '1080.00', '2017-11-29 07:22:55', '2017-11-29 07:22:55', 'USD', 'en', 'PAY-579149426Y562424FLIPG4XY'),
(39, 12345, 2017, 29, 'Standard for 12 months', 'started', 'created', 'plan_10', '2017-11-30 18:09:24', '2017-11-30 19:09:24', 'created', 'created', '1440.00', '2017-11-30 17:09:24', '2017-11-30 17:09:24', 'PLN', 'en', 'PAY-5T1353881A650040JLIQESUY'),
(40, 12345, 2017, 88, 'Standard for 1 month', 'finished', 'approved', 'plan_4', '2017-12-08 05:37:45', '2017-12-08 06:37:45', 'created', 'created', '140.00', '2017-12-08 04:37:45', '2017-12-08 04:41:33', 'PLN', 'en', 'PAY-5RN44172HR708481KLIVCKKA'),
(41, 12345, 2018, 89, 'Standard for 12 months', 'started', 'created', 'plan_10', '2018-01-12 12:14:50', '2018-01-12 13:14:50', 'created', 'created', '1440.00', '2018-01-12 11:14:50', '2018-01-12 11:14:50', 'PLN', 'en', 'PAY-35C49054DU8520942LJMKNOQ'),
(42, 12345, 2018, 49, 'Standard for 12 months', 'started', 'created', 'plan_10', '2018-01-15 08:18:21', '2018-01-15 09:18:21', 'created', 'created', '1440.00', '2018-01-15 07:18:21', '2018-01-15 07:18:21', 'PLN', 'en', 'PAY-8J205378JB816652PLJOGHTI'),
(43, 12345, 2018, 123, 'Standard for 12 months', 'started', 'created', 'plan_10', '2018-07-22 08:40:20', '2018-07-22 10:40:20', 'created', 'created', '1440.00', '2018-07-22 08:40:20', '2018-07-22 08:40:20', 'PLN', 'en', 'PAY-3KR576718L6925727LNKEF5A'),
(44, 12345, 2018, 124, 'Standard for 12 months', 'started', 'created', 'plan_10', '2018-07-22 08:42:13', '2018-07-22 10:42:13', 'created', 'created', '1440.00', '2018-07-22 08:42:13', '2018-07-22 08:42:13', 'PLN', 'en', 'PAY-0PK26888AR9477202LNKEGZA');

-- --------------------------------------------------------

--
-- Table structure for table `permissions`
--

CREATE TABLE `permissions` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `display_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `permission_role`
--

CREATE TABLE `permission_role` (
  `permission_id` int(10) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `plans`
--

CREATE TABLE `plans` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `version_id` int(10) UNSIGNED NOT NULL DEFAULT '1',
  `period` int(11) NOT NULL DEFAULT '1',
  `form_of_payment_id` int(10) UNSIGNED NOT NULL DEFAULT '1',
  `plans_period_type_id` int(10) UNSIGNED NOT NULL DEFAULT '3',
  `limit` int(11) NOT NULL DEFAULT '1',
  `active` tinyint(4) NOT NULL DEFAULT '1',
  `start_date` datetime NOT NULL,
  `expiration_date` datetime NOT NULL,
  `for_admin_only` tinyint(4) NOT NULL DEFAULT '0',
  `limit_enabled` tinyint(4) NOT NULL DEFAULT '0',
  `date_enabled` tinyint(4) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `plans`
--

INSERT INTO `plans` (`id`, `name`, `description`, `version_id`, `period`, `form_of_payment_id`, `plans_period_type_id`, `limit`, `active`, `start_date`, `expiration_date`, `for_admin_only`, `limit_enabled`, `date_enabled`, `created_at`, `updated_at`) VALUES
(1, 'Demo 1', 'Demo for 2 weeks', 1, 2, 1, 2, 1, 1, '2016-09-18 11:16:04', '2016-09-18 11:16:05', 1, 0, 0, NULL, NULL),
(2, 'Demo 2', 'Demo for 1 month', 1, 1, 1, 3, 1, 1, '2016-09-18 11:16:04', '2016-09-18 11:16:05', 1, 0, 0, NULL, NULL),
(3, 'Demo 2', 'Demo for 2 months', 1, 2, 1, 3, 1, 1, '2016-09-18 11:16:04', '2016-09-18 11:16:05', 1, 0, 0, NULL, NULL),
(4, 'Standard', 'Standard for 1 month', 1, 1, 1, 3, 1, 1, '2016-09-18 11:16:04', '2016-09-18 11:16:05', 0, 0, 0, NULL, NULL),
(5, 'Professional', 'Professional for 1 month', 1, 1, 1, 3, 1, 1, '2016-09-18 11:16:04', '2016-09-18 11:16:05', 0, 0, 0, NULL, NULL),
(6, 'Elearning', 'Elearning for 1 month', 1, 1, 1, 3, 1, 1, '2016-09-18 11:16:04', '2016-09-18 11:16:05', 0, 0, 0, NULL, NULL),
(7, 'Standard', 'Standard for 6 months', 1, 6, 1, 3, 1, 1, '2016-09-18 11:16:04', '2016-09-18 11:16:05', 0, 0, 0, NULL, NULL),
(8, 'Professional', 'Professional for 6 months', 1, 6, 1, 3, 1, 1, '2016-09-18 11:16:04', '2016-09-18 11:16:05', 0, 0, 0, NULL, NULL),
(9, 'Elearning', 'Elearning for 6 months', 1, 6, 1, 3, 1, 1, '2016-09-18 11:16:04', '2016-09-18 11:16:05', 0, 0, 0, NULL, NULL),
(10, 'Standard', 'Standard for 12 months', 1, 12, 1, 3, 1, 1, '2016-09-18 11:16:04', '2016-09-18 11:16:05', 0, 0, 0, NULL, NULL),
(11, 'Professional', 'Professional for 12 months', 1, 12, 1, 3, 1, 1, '2016-09-18 11:16:04', '2016-09-18 11:16:05', 0, 0, 0, NULL, NULL),
(12, 'Elearning', 'Elearning for 12 months', 1, 12, 1, 3, 1, 1, '2016-09-18 11:16:04', '2016-09-18 11:16:05', 0, 0, 0, NULL, NULL),
(13, 'For creator', 'For creator', 1, 5, 1, 4, 1, 1, '2016-09-18 11:16:04', '2016-09-18 11:16:05', 1, 0, 0, NULL, NULL),
(14, 'For distributor 5 years', 'For distributor 5 years', 1, 5, 1, 4, 1, 1, '2016-09-18 11:16:04', '2016-09-18 11:16:05', 1, 0, 0, NULL, NULL),
(15, 'For distributor 5 years', 'For distributor 5 years', 1, 5, 1, 4, 1, 1, '2016-09-18 11:16:04', '2016-09-18 11:16:05', 1, 0, 0, NULL, NULL),
(16, 'Api Standard', 'Api Standard for 12 months', 1, 12, 1, 3, 1, 1, '2016-09-18 11:16:04', '2016-09-18 11:16:05', 1, 0, 0, NULL, NULL),
(17, 'Api Professional', 'Api Professional for 12 months', 1, 12, 1, 3, 1, 1, '2016-09-18 11:16:04', '2016-09-18 11:16:05', 1, 0, 0, NULL, NULL),
(18, 'Api Elearning', 'Api Elearning for 12 months', 1, 12, 1, 3, 1, 1, '2016-09-18 11:16:04', '2016-09-18 11:16:05', 1, 0, 0, NULL, NULL),
(19, 'Test Drive', 'Test Drive', 1, 5, 1, 4, 1, 1, '2016-09-18 11:16:04', '2016-09-18 11:16:05', 1, 0, 0, NULL, NULL),
(20, 'Trial', 'Demo version for 2 weeks', 1, 2, 1, 2, 0, 1, '2017-11-21 15:25:03', '2057-11-21 15:25:03', 0, 0, 0, '2017-11-28 13:37:11', '2017-11-28 19:11:41');

-- --------------------------------------------------------

--
-- Table structure for table `plans_costs`
--

CREATE TABLE `plans_costs` (
  `id` int(10) UNSIGNED NOT NULL,
  `version_id` int(10) UNSIGNED NOT NULL DEFAULT '1',
  `plan_id` int(10) UNSIGNED NOT NULL,
  `currency_id` int(10) UNSIGNED NOT NULL,
  `cost` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `plans_costs`
--

INSERT INTO `plans_costs` (`id`, `version_id`, `plan_id`, `currency_id`, `cost`) VALUES
(1, 1, 1, 1, 0.00),
(2, 1, 2, 1, 0.00),
(3, 1, 3, 1, 0.00),
(4, 1, 4, 1, 140.00),
(5, 1, 5, 1, 300.00),
(6, 1, 6, 1, 399.00),
(7, 1, 7, 1, 499.00),
(8, 1, 8, 1, 729.00),
(9, 1, 9, 1, 1099.00),
(10, 1, 10, 1, 1440.00),
(11, 1, 11, 1, 3000.00),
(12, 1, 12, 1, 1399.00),
(14, 1, 4, 4, 50.00),
(15, 1, 10, 4, 360.00),
(16, 1, 5, 4, 60.00),
(17, 1, 11, 4, 600.00),
(18, 1, 4, 3, 50.00),
(19, 1, 10, 3, 540.00),
(20, 1, 4, 2, 40.00),
(21, 1, 10, 2, 360.00),
(22, 1, 5, 2, 80.00),
(23, 1, 11, 2, 720.00),
(24, 1, 5, 3, 100.00),
(25, 1, 11, 3, 1080.00),
(26, 1, 20, 4, 0.00),
(27, 1, 20, 3, 0.00),
(28, 1, 20, 2, 0.00),
(29, 1, 20, 1, 0.00);

-- --------------------------------------------------------

--
-- Table structure for table `plans_options`
--

CREATE TABLE `plans_options` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `version_id` int(10) UNSIGNED NOT NULL DEFAULT '1',
  `options` text COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `plans_options`
--

INSERT INTO `plans_options` (`id`, `name`, `description`, `version_id`, `options`) VALUES
(1, 'default', 'default', 1, '{}'),
(2, 'demo', 'demo', 1, '{\r\n			  \"createProjects\": true,\r\n			  \"haveProjects\": true,\r\n			  \"publish\": true,\r\n			  \"publishOnPrimary\": true,\r\n			  \"hasOwnChannel\": true,\r\n			  \"exportscorm\": true,\r\n			  \"exporthtml5\": true,\r\n			  \"exportpdf\": true,\r\n			  \"importpdf\": true,\r\n			  \"importpsd\": true,\r\n			  \"publishfacebook\": true,\r\n			  \"mailing\": true,\r\n			  \"versioning\": true,\r\n			  \"adminPanel\": true,\r\n			  \"projects\": 2,\r\n			  \"banners\": 2,\r\n			  \"diskspace\": 1,\r\n			  \"lms_users\": 2,\r\n			  \"mailing_daily\": 100,\r\n			  \"mailing_users\": 2,\r\n			  \"publishfacebook\": true\r\n			}'),
(3, 'standard', 'standard', 1, '{\n			  \"createProjects\": true,\n			  \"haveProjects\": true,\n			  \"publish\": true,\n			  \"publishOnPrimary\": true,\n			  \"hasOwnChannel\": true,\n			  \"exportscorm\": true,\n			  \"exporthtml5\": true,\n			  \"exportpdf\": true,\n			  \"importpdf\": true,\n			  \"importpsd\": true,\n			  \"publishfacebook\": true,\n			  \"mailing\": true,\n			  \"versioning\": true,\n			  \"adminPanel\": true,\n			  \"projects\": 25,\n			  \"banners\": 25,\n			  \"diskspace\": 2,\n			  \"lms_users\": 400,\n			  \"mailing_daily\": 400,\n			  \"mailing_users\": 400\n			}'),
(4, 'profesional', 'profesional', 1, '{\n			  \"createProjects\": true,\n			  \"haveProjects\": true,\n			  \"publish\": true,\n			  \"publishOnPrimary\": true,\n			  \"hasOwnChannel\": true,\n			  \"exportscorm\": true,\n			  \"exporthtml5\": true,\n			  \"exportpdf\": true,\n			  \"importpdf\": true,\n			  \"importpsd\": true,\n			  \"publishfacebook\": true,\n			  \"mailing\": true,\n			  \"versioning\": true,\n			  \"adminPanel\": true,\n			  \"projects\": 100,\n			  \"banners\": 100,\n			  \"diskspace\": 6,\n			  \"lms_users\": 600,\n			  \"mailing_daily\": 600,\n			  \"mailing_users\": 600\n			}'),
(5, 'elearning', 'elearning', 1, '{\n			  \"createProjects\": true,\n			  \"haveProjects\": true,\n			  \"publish\": true,\n			  \"publishOnPrimary\": true,\n			  \"hasOwnChannel\": true,\n			  \"exportscorm\": true,\n			  \"exporthtml5\": true,\n			  \"exportpdf\": true,\n			  \"importpdf\": true,\n			  \"importpsd\": false,\n			  \"publishfacebook\": true,\n			  \"mailing\": false,\n			  \"versioning\": false,\n			  \"adminPanel\": true,\n			  \"projects\": 100,\n			  \"banners\": 100,\n			  \"diskspace\": 6,\n			  \"lms_users\": 1000,\n			  \"mailing_daily\": 1000,\n			  \"mailing_users\": 1000\n			}'),
(6, 'all', 'all', 1, '{\n			  \"createProjects\": true,\n			  \"haveProjects\": true,\n			  \"publish\": true,\n			  \"publishOnPrimary\": true,\n			  \"hasOwnChannel\": true,\n			  \"exportscorm\": true,\n			  \"exporthtml5\": true,\n			  \"exportpdf\": true,\n			  \"importpdf\": true,\n			  \"importpsd\": true,\n			  \"publishfacebook\": true,\n			  \"mailing\": true,\n			  \"versioning\": true,\n			  \"adminPanel\": true,\n			  \"projects\": 100000,\n			  \"banners\": 100000,\n			  \"diskspace\": 10,\n			  \"lms_users\": 100000,\n			  \"mailing_daily\": 100000,\n			  \"mailing_users\": 100000\n			}'),
(7, 'api standard', 'standard', 1, '{\n			  \"createProjects\": true,\n			  \"haveProjects\": true,\n			  \"publish\": true,\n			  \"publishOnPrimary\": true,\n			  \"hasOwnChannel\": true,\n			  \"exportscorm\": true,\n			  \"exporthtml5\": true,\n			  \"exportpdf\": true,\n			  \"importpdf\": true,\n			  \"importpsd\": true,\n			  \"publishfacebook\": true,\n			  \"mailing\": true,\n			  \"versioning\": true,\n			  \"adminPanel\": true,\n			  \"projects\": 100,\n			  \"banners\": 100,\n			  \"diskspace\": 10,\n			  \"lms_users\": 1000,\n			  \"mailing_daily\": 1000,\n			  \"mailing_users\": 1000,\n			  \"createUsers\": true,\n			  \"usersLimit\": 100\n			}'),
(8, 'api profesional', 'profesional', 1, '{\n			  \"createProjects\": true,\n			  \"haveProjects\": true,\n			  \"publish\": true,\n			  \"publishOnPrimary\": true,\n			  \"hasOwnChannel\": true,\n			  \"exportscorm\": true,\n			  \"exporthtml5\": true,\n			  \"exportpdf\": true,\n			  \"importpdf\": true,\n			  \"importpsd\": true,\n			  \"publishfacebook\": true,\n			  \"mailing\": true,\n			  \"versioning\": true,\n			  \"adminPanel\": true,\n			  \"projects\": 100,\n			  \"banners\": 100,\n			  \"diskspace\": 10,\n			  \"lms_users\": 1000,\n			  \"mailing_daily\": 1000,\n			  \"mailing_users\": 1000,\n			  \"createUsers\": true,\n			  \"usersLimit\": 100\n			}'),
(9, 'api elearning', 'elearning', 1, '{\n			  \"createProjects\": true,\n			  \"haveProjects\": true,\n			  \"publish\": true,\n			  \"publishOnPrimary\": true,\n			  \"hasOwnChannel\": true,\n			  \"exportscorm\": true,\n			  \"exporthtml5\": true,\n			  \"exportpdf\": true,\n			  \"importpdf\": true,\n			  \"importpsd\": true,\n			  \"publishfacebook\": true,\n			  \"mailing\": true,\n			  \"versioning\": true,\n			  \"adminPanel\": true,\n			  \"projects\": 100,\n			  \"banners\": 100,\n			  \"diskspace\": 10,\n			  \"lms_users\": 1000,\n			  \"mailing_daily\": 1000,\n			  \"mailing_users\": 1000,\n			  \"createUsers\": true,\n			  \"usersLimit\": 100\n			}');

-- --------------------------------------------------------

--
-- Table structure for table `plans_period_types`
--

CREATE TABLE `plans_period_types` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `plans_period_types`
--

INSERT INTO `plans_period_types` (`id`, `name`) VALUES
(1, 'days'),
(2, 'weeks'),
(3, 'months'),
(4, 'years');

-- --------------------------------------------------------

--
-- Table structure for table `plans_to_plans_costs`
--

CREATE TABLE `plans_to_plans_costs` (
  `id` int(10) UNSIGNED NOT NULL,
  `plan_id` int(10) UNSIGNED NOT NULL,
  `plan_cost_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `plans_to_plans_options`
--

CREATE TABLE `plans_to_plans_options` (
  `id` int(10) UNSIGNED NOT NULL,
  `plan_id` int(10) UNSIGNED NOT NULL,
  `plan_option_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `plans_to_plans_options`
--

INSERT INTO `plans_to_plans_options` (`id`, `plan_id`, `plan_option_id`) VALUES
(1, 1, 2),
(2, 2, 2),
(3, 3, 2),
(4, 4, 3),
(5, 5, 4),
(6, 6, 5),
(7, 7, 3),
(8, 8, 4),
(9, 9, 5),
(10, 10, 3),
(11, 11, 4),
(12, 12, 5),
(13, 13, 6),
(14, 14, 6),
(15, 15, 6),
(16, 16, 7),
(17, 17, 8),
(18, 18, 9),
(19, 20, 2);

-- --------------------------------------------------------

--
-- Table structure for table `plans_to_price_list`
--

CREATE TABLE `plans_to_price_list` (
  `id` int(10) UNSIGNED NOT NULL,
  `version_id` int(10) UNSIGNED NOT NULL,
  `price_type_id` int(10) UNSIGNED NOT NULL,
  `price_period_id` int(10) UNSIGNED NOT NULL,
  `plan_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `plans_to_price_list`
--

INSERT INTO `plans_to_price_list` (`id`, `version_id`, `price_type_id`, `price_period_id`, `plan_id`) VALUES
(1, 1, 1, 1, 4),
(2, 1, 1, 2, 5),
(3, 1, 1, 3, 6),
(4, 1, 2, 1, 7),
(5, 1, 2, 2, 8),
(6, 1, 2, 3, 9),
(7, 1, 3, 1, 10),
(8, 1, 3, 2, 11),
(9, 1, 3, 3, 12);

-- --------------------------------------------------------

--
-- Table structure for table `plans_users`
--

CREATE TABLE `plans_users` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `paying_user_id` int(10) UNSIGNED NOT NULL,
  `created_by_user_id` int(10) UNSIGNED NOT NULL,
  `plan_id` int(10) UNSIGNED NOT NULL,
  `promo_code_id` int(10) UNSIGNED NOT NULL,
  `currency_id` int(10) UNSIGNED NOT NULL,
  `plan_cost_to_pay` decimal(10,2) NOT NULL,
  `plan_cost_to_pay_with_rabat` decimal(10,2) NOT NULL,
  `plan_options` text COLLATE utf8_unicode_ci NOT NULL,
  `start_date` datetime NOT NULL,
  `expiration_date` datetime NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '0',
  `paid` tinyint(4) NOT NULL DEFAULT '0',
  `session_id` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `client_address_id` int(10) UNSIGNED DEFAULT NULL,
  `transaction_id` int(10) UNSIGNED DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `plans_users`
--

INSERT INTO `plans_users` (`id`, `user_id`, `paying_user_id`, `created_by_user_id`, `plan_id`, `promo_code_id`, `currency_id`, `plan_cost_to_pay`, `plan_cost_to_pay_with_rabat`, `plan_options`, `start_date`, `expiration_date`, `active`, `paid`, `session_id`, `client_address_id`, `transaction_id`, `created_at`, `updated_at`) VALUES
(1, 3, 2, 2, 13, 1, 1, 0.00, 0.00, '{\n			  \"createProjects\": true,\n			  \"haveProjects\": true,\n			  \"publish\": true,\n			  \"publishOnPrimary\": true,\n			  \"hasOwnChannel\": true,\n			  \"exportscorm\": true,\n			  \"exporthtml5\": true,\n			  \"exportpdf\": true,\n			  \"importpdf\": true,\n			  \"importpsd\": true,\n			  \"publishfacebook\": true,\n			  \"mailing\": true,\n			  \"versioning\": true,\n			  \"adminPanel\": true,\n			  \"projects\": 100000,\n			  \"banners\": 100000,\n			  \"diskspace\": 10,\n			  \"lms_users\": 100000,\n			  \"mailing_daily\": 100000,\n			  \"mailing_users\": 100000\n			}', '2016-09-18 11:16:04', '2035-09-18 11:16:05', 1, 1, NULL, NULL, NULL, NULL, NULL),
(2, 4, 2, 2, 13, 1, 1, 0.00, 0.00, '{\n			  \"createProjects\": true,\n			  \"haveProjects\": true,\n			  \"publish\": true,\n			  \"publishOnPrimary\": true,\n			  \"hasOwnChannel\": true,\n			  \"exportscorm\": true,\n			  \"exporthtml5\": true,\n			  \"exportpdf\": true,\n			  \"importpdf\": true,\n			  \"importpsd\": true,\n			  \"publishfacebook\": true,\n			  \"mailing\": true,\n			  \"versioning\": true,\n			  \"adminPanel\": true,\n			  \"projects\": 100000,\n			  \"banners\": 100000,\n			  \"diskspace\": 10,\n			  \"lms_users\": 100000,\n			  \"mailing_daily\": 100000,\n			  \"mailing_users\": 100000\n			}', '2016-09-18 11:16:04', '2035-09-18 11:16:05', 1, 1, NULL, NULL, NULL, NULL, NULL),
(3, 5, 2, 2, 13, 1, 1, 0.00, 0.00, '{\n			  \"createProjects\": true,\n			  \"haveProjects\": true,\n			  \"publish\": true,\n			  \"publishOnPrimary\": true,\n			  \"hasOwnChannel\": true,\n			  \"exportscorm\": true,\n			  \"exporthtml5\": true,\n			  \"exportpdf\": true,\n			  \"importpdf\": true,\n			  \"importpsd\": true,\n			  \"publishfacebook\": true,\n			  \"mailing\": true,\n			  \"versioning\": true,\n			  \"adminPanel\": true,\n			  \"projects\": 100000,\n			  \"banners\": 100000,\n			  \"diskspace\": 10,\n			  \"lms_users\": 100000,\n			  \"mailing_daily\": 100000,\n			  \"mailing_users\": 100000\n			}', '2016-09-18 11:16:04', '2035-09-18 11:16:05', 1, 1, NULL, NULL, NULL, NULL, NULL),
(4, 6, 2, 2, 19, 1, 1, 0.00, 0.00, '{\n			  \"createProjects\": true,\n			  \"haveProjects\": true,\n			  \"publish\": true,\n			  \"publishOnPrimary\": true,\n			  \"hasOwnChannel\": true,\n			  \"exportscorm\": true,\n			  \"exporthtml5\": true,\n			  \"exportpdf\": true,\n			  \"importpdf\": true,\n			  \"importpsd\": true,\n			  \"publishfacebook\": true,\n			  \"mailing\": true,\n			  \"versioning\": true,\n			  \"adminPanel\": true,\n			  \"projects\": 10,\n			  \"banners\": 10,\n			  \"diskspace\": 1,\n			  \"lms_users\": 10,\n			  \"mailing_daily\": 40,\n			  \"mailing_users\": 10\n			}', '2016-09-18 11:16:04', '2035-09-18 11:16:05', 1, 1, NULL, NULL, NULL, NULL, NULL),
(5, 7, 2, 2, 16, 1, 1, 0.00, 0.00, '{\n			  \"createProjects\": true,\n			  \"haveProjects\": true,\n			  \"publish\": true,\n			  \"publishOnPrimary\": true,\n			  \"hasOwnChannel\": true,\n			  \"exportscorm\": true,\n			  \"exporthtml5\": true,\n			  \"exportpdf\": true,\n			  \"importpdf\": true,\n			  \"importpsd\": true,\n			  \"publishfacebook\": true,\n			  \"mailing\": true,\n			  \"versioning\": true,\n			  \"adminPanel\": true,\n			  \"projects\": 100000,\n			  \"banners\": 100000,\n			  \"diskspace\": 10,\n			  \"lms_users\": 100000,\n			  \"mailing_daily\": 100000,\n			  \"mailing_users\": 100000\n			}', '2016-09-18 11:16:04', '2035-09-18 11:16:05', 1, 1, NULL, NULL, NULL, NULL, NULL),
(6, 28, 2, 2, 12, 1, 1, 0.00, 0.00, '{\n			  \"createProjects\": true,\n			  \"haveProjects\": true,\n			  \"publish\": true,\n			  \"publishOnPrimary\": true,\n			  \"hasOwnChannel\": true,\n			  \"exportscorm\": true,\n			  \"exporthtml5\": true,\n			  \"exportpdf\": true,\n			  \"importpdf\": true,\n			  \"importpsd\": false,\n			  \"publishfacebook\": true,\n			  \"mailing\": false,\n			  \"versioning\": false,\n			  \"adminPanel\": true,\n			  \"projects\": 100,\n			  \"banners\": 100,\n			  \"diskspace\": 6,\n			  \"lms_users\": 1000,\n			  \"mailing_daily\": 1000,\n			  \"mailing_users\": 1000\n			}', '2016-09-18 11:16:04', '2035-09-18 11:16:05', 1, 1, NULL, NULL, NULL, NULL, NULL),
(7, 29, 2, 2, 12, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":25555,\"banners\":25555,\"diskspace\":22222,\"lms_users\":400,\"mailing_daily\":400,\"mailing_users\":400}', '2016-09-18 11:16:04', '2035-09-18 11:16:05', 1, 1, NULL, NULL, NULL, NULL, '2018-06-26 06:40:41'),
(11, 33, 2, 2, 12, 1, 1, 0.00, 0.00, '{\n			  \"createProjects\": true,\n			  \"haveProjects\": true,\n			  \"publish\": true,\n			  \"publishOnPrimary\": true,\n			  \"hasOwnChannel\": true,\n			  \"exportscorm\": true,\n			  \"exporthtml5\": true,\n			  \"exportpdf\": true,\n			  \"importpdf\": true,\n			  \"importpsd\": false,\n			  \"publishfacebook\": true,\n			  \"mailing\": false,\n			  \"versioning\": false,\n			  \"adminPanel\": true,\n			  \"projects\": 100,\n			  \"banners\": 100,\n			  \"diskspace\": 6,\n			  \"lms_users\": 1000,\n			  \"mailing_daily\": 1000,\n			  \"mailing_users\": 1000\n			}', '2016-09-18 11:16:04', '2035-09-18 11:16:05', 1, 1, NULL, NULL, NULL, NULL, NULL),
(12, 34, 34, 34, 3, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2017-03-29 23:06:32', '2017-05-29 23:06:32', 1, 0, 'XB6vX0KAb4tdtcOlA2ysN1Qg7Dj7Ra4ARtnvPv7E', NULL, NULL, '2017-03-29 21:06:32', '2017-03-29 21:06:32'),
(13, 35, 35, 35, 3, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2017-03-29 23:07:34', '2017-05-29 23:07:34', 1, 0, 'sdEJNIzNrybU3z9cQw39yK4sds5BzeN4T5DEAK3M', NULL, NULL, '2017-03-29 21:07:34', '2017-03-29 21:07:34'),
(14, 36, 36, 36, 3, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2017-03-29 23:08:32', '2017-05-29 23:08:32', 1, 0, 'S5xtz4h7ClJ4gazL6frvELhAJRrzxDD1sKiBZzqH', NULL, NULL, '2017-03-29 21:08:32', '2017-03-29 21:08:32'),
(16, 38, 38, 38, 3, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2017-04-06 20:37:12', '2017-06-06 20:37:12', 1, 0, 'HuzdYjRfgqFeCPdPF5xLHJYI3wBl5A5SyDGINBDg', NULL, NULL, '2017-04-06 18:37:12', '2017-04-06 18:37:12'),
(17, 40, 40, 29, 14, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":100000,\"banners\":100000,\"diskspace\":10,\"lms_users\":100000,\"mailing_daily\":100000,\"mailing_users\":100000}', '2017-04-10 16:50:00', '2022-04-10 16:50:00', 1, 0, 'juNUl8JKPzS4KQSQKgmB7DAupVxcIU7mv3DL9aSV', NULL, NULL, '2017-04-10 14:50:00', '2017-04-10 14:50:00'),
(18, 42, 42, 42, 3, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2017-04-10 16:52:40', '2017-06-10 16:52:40', 1, 0, 'FnGTEVF4SqhYy0xXhTIj3V0hzyLubxk2gIbJy02g', NULL, NULL, '2017-04-10 14:52:40', '2017-04-10 14:52:40'),
(20, 45, 45, 45, 3, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2017-04-14 12:00:19', '2017-06-14 12:00:19', 1, 0, '5kSKAsK0KIyL7p8psy907njqgn2bC4DKbiE9JDjO', NULL, NULL, '2017-04-14 10:00:19', '2017-04-14 10:00:19'),
(21, 46, 46, 46, 3, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2017-06-10 21:48:40', '2017-08-10 21:48:40', 1, 0, 'wh6sN4De5H0Y48kT1faitnPHmCxf9jywo5irMRxq', NULL, NULL, '2017-06-10 19:48:40', '2017-06-10 19:48:40'),
(22, 47, 47, 47, 3, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2017-06-29 22:31:45', '2017-08-29 22:31:45', 1, 0, 'hIdpUbYHFwondw3ZbeNdMgMob6Rirj4xsgbX7vr4', NULL, NULL, '2017-06-29 20:31:45', '2017-06-29 20:31:45'),
(23, 48, 48, 48, 3, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2017-08-28 05:14:38', '2017-10-28 05:14:38', 1, 0, 'QkyZTUmD3Px1Yialp657xVB5aoIKuFjLyarKw7WR', NULL, NULL, '2017-08-28 03:14:38', '2017-08-28 03:14:38'),
(24, 49, 49, 49, 3, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2017-09-16 01:50:56', '2017-11-16 01:50:56', 1, 0, 'kPbDNyXDrilZ19bnXvkqaotU4gSA7kCYOJYGUfpV', NULL, NULL, '2017-09-15 23:50:56', '2017-09-15 23:50:56'),
(25, 50, 50, 50, 3, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2017-09-16 16:47:37', '2017-11-16 16:47:37', 1, 0, '5Ki3tMxx80yxPQLBWDxD1DI7XFc42zt0Aqk6xRc8', NULL, NULL, '2017-09-16 14:47:37', '2017-09-16 14:47:37'),
(26, 51, 51, 29, 14, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":100000,\"banners\":100000,\"diskspace\":10,\"lms_users\":100000,\"mailing_daily\":100000,\"mailing_users\":100000}', '2017-10-09 16:25:06', '2022-10-09 16:25:06', 1, 0, 'zLXZ2ieGmwJYyGyUsqJfODUC7C3paiEJjEoivNTx', NULL, NULL, '2017-10-09 14:25:06', '2017-10-09 14:25:06'),
(30, 55, 55, 55, 3, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2017-10-12 09:09:22', '2017-12-12 09:09:22', 1, 0, 'QMnpQeRye0XRxuOHY00Erm8Mef0pS0Ufn2RHop6w', NULL, NULL, '2017-10-12 07:09:22', '2017-10-12 07:09:22'),
(31, 56, 56, 56, 3, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2017-10-12 09:14:13', '2017-12-12 09:14:13', 1, 0, 'pKldqNcB2JGWFPM3riTzUHe14BoQTuUrVEESF3Pb', NULL, NULL, '2017-10-12 07:14:13', '2017-10-12 07:14:13'),
(33, 58, 58, 58, 3, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2017-10-12 09:55:42', '2017-12-12 09:55:42', 1, 0, 'hqBjGRkX0dfRD1YsPQI9TDTWlsTw2TTE3aCnY1BZ', NULL, NULL, '2017-10-12 07:55:42', '2017-10-12 07:55:42'),
(34, 59, 59, 59, 3, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2017-10-12 10:58:39', '2017-12-12 10:58:39', 1, 0, 'LADblR6h6OfO9LHmrv9nqlZfIDhrifJi4P7hBEVo', NULL, NULL, '2017-10-12 08:58:39', '2017-10-12 08:58:39'),
(37, 62, 62, 62, 1, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2017-10-25 23:13:01', '2017-11-08 23:13:01', 1, 0, '9XrbNMMgYjTAtL0VmdylYfvJGkhCfFQi2H9U9i4r', NULL, NULL, '2017-10-25 21:13:01', '2017-10-25 21:13:01'),
(42, 67, 67, 67, 1, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2017-10-27 15:42:22', '2017-11-10 15:42:22', 1, 0, 'DjKacKsGEimg9azolesYAOMJvL55ob2iMNx65k7s', NULL, NULL, '2017-10-27 13:42:22', '2017-10-27 13:42:22'),
(45, 70, 70, 70, 1, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2017-10-28 00:13:19', '2017-11-11 00:13:19', 1, 0, 'pVrQCSGIAGFrA6eDURtIdRvFPx3BFu4z3KmivNRU', NULL, NULL, '2017-10-27 22:13:19', '2017-10-27 22:13:19'),
(47, 72, 72, 72, 1, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2017-11-03 11:54:24', '2017-11-17 11:54:24', 1, 0, 'AuGGndsx0O4VYLjEeewANhtb3KLqUKsnC6Zf8dxI', NULL, NULL, '2017-11-03 09:54:24', '2017-11-03 09:54:24'),
(48, 73, 73, 73, 1, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2017-11-14 15:54:37', '2017-11-28 15:54:37', 1, 0, '0JpgBPAazjjt0ePIqZXd2NzlsJ6e1ZY8mlgJgyE9', NULL, NULL, '2017-11-14 13:54:37', '2017-11-14 13:54:37'),
(49, 76, 76, 76, 1, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2017-11-17 13:06:25', '2017-12-01 13:06:25', 1, 0, '6hlXirG67ToBct15eH07J88wzVhfY1KlIqxoLE3C', NULL, NULL, '2017-11-17 11:06:25', '2017-11-17 11:06:25'),
(50, 78, 78, 78, 1, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2017-11-21 21:35:29', '2017-12-05 21:35:29', 1, 0, 'qXhoWiaaDq30myEvloGtfaTUQjbx9i1Nmq7fb9jJ', NULL, NULL, '2017-11-21 19:35:29', '2017-11-21 19:35:29'),
(51, 78, 78, 2, 10, 1, 3, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":25,\"banners\":25,\"diskspace\":2,\"lms_users\":400,\"mailing_daily\":400,\"mailing_users\":400}', '2017-11-21 21:47:15', '2017-12-03 21:47:15', 1, 1, '1', NULL, NULL, '2017-11-21 19:47:15', '2017-11-21 19:47:15'),
(52, 78, 78, 2, 10, 1, 3, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":25,\"banners\":25,\"diskspace\":2,\"lms_users\":400,\"mailing_daily\":400,\"mailing_users\":400}', '2017-11-21 23:42:01', '2017-12-03 23:42:01', 1, 1, '1', NULL, NULL, '2017-11-21 21:42:01', '2017-11-21 21:42:01'),
(53, 78, 78, 2, 10, 1, 3, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":25,\"banners\":25,\"diskspace\":2,\"lms_users\":400,\"mailing_daily\":400,\"mailing_users\":400}', '2017-11-21 23:46:56', '2017-12-03 23:46:56', 1, 1, '1', NULL, NULL, '2017-11-21 21:46:56', '2017-11-21 21:46:56'),
(54, 78, 78, 2, 10, 1, 3, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":25,\"banners\":25,\"diskspace\":2,\"lms_users\":400,\"mailing_daily\":400,\"mailing_users\":400}', '2017-11-21 23:54:41', '2017-12-03 23:54:41', 1, 1, '1', NULL, NULL, '2017-11-21 21:54:41', '2017-11-21 21:54:41'),
(55, 79, 79, 79, 1, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2017-11-22 00:00:09', '2017-12-06 00:00:09', 1, 0, '94MigABvb6yUNoOqlAGNbHRxxugdStqjS4sBKENk', NULL, NULL, '2017-11-21 22:00:09', '2017-11-21 22:00:09'),
(56, 79, 79, 2, 10, 1, 3, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":25,\"banners\":25,\"diskspace\":2,\"lms_users\":400,\"mailing_daily\":400,\"mailing_users\":400}', '2017-11-22 00:00:59', '2017-12-04 00:00:59', 1, 1, '1', NULL, NULL, '2017-11-21 22:00:59', '2017-11-21 22:00:59'),
(57, 79, 79, 2, 10, 1, 3, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":25,\"banners\":25,\"diskspace\":2,\"lms_users\":400,\"mailing_daily\":400,\"mailing_users\":400}', '2017-11-22 00:04:39', '2018-11-22 00:04:39', 1, 1, '1', NULL, NULL, '2017-11-21 22:04:39', '2017-11-21 22:04:39'),
(58, 79, 79, 2, 4, 1, 3, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":25,\"banners\":25,\"diskspace\":2,\"lms_users\":400,\"mailing_daily\":400,\"mailing_users\":400}', '2017-11-22 00:05:47', '2017-12-22 00:05:47', 1, 1, '1', NULL, NULL, '2017-11-21 22:05:47', '2017-11-21 22:05:47'),
(59, 80, 80, 80, 1, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2017-11-22 17:33:39', '2017-12-06 17:33:39', 1, 0, 'Y7q38SJCw5ZXYGxD6Ohp687wjSnaIoWx4sGjga77', NULL, NULL, '2017-11-22 15:33:39', '2017-11-22 15:33:39'),
(60, 80, 80, 2, 10, 1, 3, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":25,\"banners\":25,\"diskspace\":2,\"lms_users\":400,\"mailing_daily\":400,\"mailing_users\":400}', '2017-11-22 17:36:52', '2018-11-22 17:36:52', 1, 1, '1', NULL, NULL, '2017-11-22 15:36:52', '2017-11-22 15:36:52'),
(61, 80, 80, 2, 4, 1, 3, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":25,\"banners\":25,\"diskspace\":2,\"lms_users\":400,\"mailing_daily\":400,\"mailing_users\":400}', '2017-11-22 17:37:53', '2017-12-22 17:37:53', 1, 1, '1', NULL, NULL, '2017-11-22 15:37:53', '2017-11-22 15:37:53'),
(62, 81, 81, 81, 1, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2017-11-28 16:16:43', '2017-12-12 16:16:43', 1, 0, '8xPi1RKWXJPjOGQGvM3Du2q6l3M4hwPakNKnACyG', NULL, NULL, '2017-11-28 14:16:43', '2017-11-28 14:16:43'),
(63, 81, 81, 2, 10, 1, 3, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":25,\"banners\":25,\"diskspace\":2,\"lms_users\":400,\"mailing_daily\":400,\"mailing_users\":400}', '2017-11-28 16:38:53', '2018-11-28 16:38:53', 1, 1, '1', NULL, NULL, '2017-11-28 14:38:53', '2017-11-28 14:38:53'),
(65, 82, 82, 82, 1, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2017-11-28 18:27:45', '2017-12-12 18:27:45', 1, 0, 'qRy914zqAApmwQrkBhlTVCapQk0kVQj7iegesWsR', NULL, NULL, '2017-11-28 16:27:45', '2017-11-28 16:27:45'),
(66, 82, 82, 2, 4, 1, 3, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":25,\"banners\":25,\"diskspace\":2,\"lms_users\":400,\"mailing_daily\":400,\"mailing_users\":400}', '2017-11-28 18:29:08', '2017-12-28 18:29:08', 1, 1, '1', NULL, NULL, '2017-11-28 16:29:08', '2017-11-28 16:29:08'),
(67, 83, 83, 83, 20, 1, 1, 0.00, 0.00, '{}', '2017-11-28 20:56:55', '2017-11-29 20:56:55', 1, 0, 'A7j5l3ieeSnITycsGNW9nJvImKQMmAN82lLHvB7Z', NULL, NULL, '2017-11-28 18:56:55', '2017-11-28 18:56:55'),
(68, 84, 84, 84, 20, 1, 1, 0.00, 0.00, '{}', '2017-11-28 21:08:42', '2017-12-05 21:08:42', 1, 0, 'Ye0jCB65c9Ym60bSBmx2seebYAPqsZAgM2nTileD', NULL, NULL, '2017-11-28 19:08:42', '2017-11-28 19:08:42'),
(69, 85, 85, 85, 20, 1, 1, 0.00, 0.00, '{}', '2017-11-28 21:11:48', '2017-12-12 21:11:48', 0, 0, 'nw0xczhYZXB9jjPIbmYbkSAwlUxXccicelsTopWY', NULL, NULL, '2017-11-28 19:11:48', '2017-11-28 19:12:45'),
(70, 85, 85, 2, 11, 1, 3, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":100,\"banners\":100,\"diskspace\":6,\"lms_users\":600,\"mailing_daily\":600,\"mailing_users\":600}', '2017-11-28 21:12:45', '2018-11-28 21:12:45', 1, 1, '1', NULL, NULL, '2017-11-28 19:12:45', '2017-11-28 19:12:45'),
(71, 85, 85, 2, 4, 1, 3, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":25,\"banners\":25,\"diskspace\":2,\"lms_users\":400,\"mailing_daily\":400,\"mailing_users\":400}', '2018-11-28 21:12:46', '2018-12-28 21:12:46', 1, 1, '1', NULL, NULL, '2017-11-28 19:15:56', '2017-11-28 19:15:56'),
(72, 85, 85, 29, 6, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":false,\"publishfacebook\":true,\"mailing\":false,\"versioning\":false,\"adminPanel\":true,\"projects\":100,\"banners\":100,\"diskspace\":6,\"lms_users\":1000,\"mailing_daily\":1000,\"mailing_users\":1000}', '2018-12-28 21:12:47', '2019-01-28 21:12:47', 1, 1, '1', NULL, NULL, '2017-11-28 19:22:02', '2017-11-28 19:22:02'),
(74, 87, 87, 87, 20, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":100,\"banners\":100,\"diskspace\":6,\"lms_users\":600,\"mailing_daily\":600,\"mailing_users\":600}', '2017-12-08 06:22:52', '2017-12-22 06:22:52', 1, 0, 'vajj72CvDUWmHEy5bRqp3CaoyeS4IdGvBk21nmN3', NULL, NULL, '2017-12-08 04:22:52', '2017-12-08 04:22:52'),
(75, 88, 88, 88, 20, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2017-12-08 06:37:04', '2017-12-22 06:37:04', 0, 0, 'TgVQYKFJY1zxih82MSImrBaDblUggrh4d4Gy7niU', NULL, NULL, '2017-12-08 04:37:04', '2017-12-08 04:41:33'),
(76, 88, 88, 2, 4, 1, 3, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":25,\"banners\":25,\"diskspace\":2,\"lms_users\":400,\"mailing_daily\":400,\"mailing_users\":400}', '2017-12-08 06:41:33', '2018-01-08 06:41:33', 1, 1, '1', NULL, NULL, '2017-12-08 04:41:33', '2017-12-08 04:41:33'),
(78, 54, 54, 54, 12, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":false,\"publishfacebook\":true,\"mailing\":false,\"versioning\":false,\"adminPanel\":true,\"projects\":100,\"banners\":100,\"diskspace\":6,\"lms_users\":1000,\"mailing_daily\":1000,\"mailing_users\":1000}', '2018-01-03 21:20:34', '2019-01-03 21:20:34', 1, 1, '1', NULL, NULL, '2018-01-07 19:20:52', '2018-01-07 19:20:52'),
(81, 91, 91, 91, 5, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":100,\"banners\":100,\"diskspace\":6,\"lms_users\":600,\"mailing_daily\":600,\"mailing_users\":600}', '2018-01-17 16:00:14', '2018-02-17 16:00:14', 1, 1, '1', NULL, NULL, '2018-01-17 14:39:40', '2018-01-17 14:39:40'),
(86, 96, 96, 29, 6, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":false,\"publishfacebook\":true,\"mailing\":false,\"versioning\":false,\"adminPanel\":true,\"projects\":100,\"banners\":100,\"diskspace\":6,\"lms_users\":1000,\"mailing_daily\":1000,\"mailing_users\":1000}', '2018-01-22 12:09:12', '2018-02-22 12:09:12', 1, 1, '1', NULL, NULL, '2018-01-22 10:09:18', '2018-01-22 10:09:18'),
(88, 97, 97, 29, 6, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":false,\"publishfacebook\":true,\"mailing\":false,\"versioning\":false,\"adminPanel\":true,\"projects\":100,\"banners\":100,\"diskspace\":6,\"lms_users\":1000,\"mailing_daily\":1000,\"mailing_users\":1000}', '2018-01-26 09:59:39', '2018-02-26 09:59:39', 1, 1, '1', NULL, NULL, '2018-01-26 07:59:45', '2018-01-26 07:59:45'),
(90, 98, 98, 29, 6, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":false,\"publishfacebook\":true,\"mailing\":false,\"versioning\":false,\"adminPanel\":true,\"projects\":100,\"banners\":100,\"diskspace\":6,\"lms_users\":1000,\"mailing_daily\":1000,\"mailing_users\":1000}', '2018-02-12 09:00:24', '2018-03-12 09:00:24', 1, 1, '1', NULL, NULL, '2018-02-12 07:00:31', '2018-02-12 07:00:31'),
(91, 99, 99, 99, 20, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2018-02-14 18:57:39', '2018-02-28 18:57:39', 1, 0, 'TuY6dBf8aIbi2VCEVnSVnPmn7Lma7cTE8NhFk9Ht', NULL, NULL, '2018-02-14 16:57:39', '2018-02-14 16:57:39'),
(93, 100, 100, 29, 6, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":false,\"publishfacebook\":true,\"mailing\":false,\"versioning\":false,\"adminPanel\":true,\"projects\":100,\"banners\":100,\"diskspace\":6,\"lms_users\":1000,\"mailing_daily\":1000,\"mailing_users\":1000}', '2018-02-19 12:12:02', '2018-03-19 12:12:02', 1, 1, '1', NULL, NULL, '2018-02-19 10:12:11', '2018-02-19 10:12:11'),
(94, 101, 101, 101, 20, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2018-02-20 06:52:20', '2018-03-06 06:52:20', 1, 0, 'Q6ZxDdR8L1WX5CCxq3H2BL0g0gQM1i61lY2J9jqc', NULL, NULL, '2018-02-20 04:52:20', '2018-02-20 04:52:20'),
(95, 102, 102, 102, 20, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2018-04-11 07:49:12', '2018-04-25 07:49:12', 1, 0, 'Fv9tsOWjVm16wPJQOV6ICWpTEKEE86j4hlrXQ9op', NULL, NULL, '2018-04-11 05:49:12', '2018-04-11 05:49:12'),
(99, 104, 104, 104, 20, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2018-06-11 14:55:29', '2018-06-25 14:55:29', 1, 0, 'TlxDKTmIVVlq8QBWl038jPs7TakRQ3PS55RW3p1s', NULL, NULL, '2018-06-11 12:55:29', '2018-06-11 12:55:29'),
(100, 105, 105, 105, 5, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":222,\"banners\":222,\"diskspace\":1111,\"lms_users\":2222,\"mailing_daily\":100,\"mailing_users\":2222}', '2018-06-13 12:45:23', '2018-06-27 12:45:23', 1, 0, 'GAMYknfraUN7XJ3zUuPIuBLVvESD2fojlaKs6Ofm', NULL, NULL, '2018-06-13 10:45:23', '2018-06-15 09:23:27'),
(101, 106, 106, 106, 5, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2222,\"banners\":22222,\"diskspace\":1111,\"lms_users\":22222,\"mailing_daily\":1000,\"mailing_users\":22222}', '2018-06-13 12:46:47', '2018-08-09 12:46:47', 1, 0, 'GAMYknfraUN7XJ3zUuPIuBLVvESD2fojlaKs6Ofm', NULL, NULL, '2018-06-13 10:46:47', '2018-06-13 12:03:30'),
(102, 107, 107, 107, 5, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2222,\"banners\":22222,\"diskspace\":1111,\"lms_users\":22222,\"mailing_daily\":1000,\"mailing_users\":22222}', '2018-06-13 12:47:33', '2018-06-27 12:47:33', 1, 0, 'GAMYknfraUN7XJ3zUuPIuBLVvESD2fojlaKs6Ofm', NULL, NULL, '2018-06-13 10:47:33', '2018-06-13 12:07:20'),
(103, 108, 108, 108, 20, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2018-06-16 08:36:28', '2018-06-30 08:36:28', 1, 0, 'SjdFqV9oElbHEft5Kaub213Gnzois0eLWhYrxN3F', NULL, NULL, '2018-06-16 06:36:28', '2018-06-16 06:36:28'),
(104, 109, 109, 109, 20, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2018-06-16 08:36:58', '2018-06-30 08:36:58', 1, 0, 'SjdFqV9oElbHEft5Kaub213Gnzois0eLWhYrxN3F', NULL, NULL, '2018-06-16 06:36:58', '2018-06-16 06:36:58'),
(105, 110, 110, 110, 20, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2018-06-16 08:37:37', '2018-06-30 08:37:37', 1, 0, 'SjdFqV9oElbHEft5Kaub213Gnzois0eLWhYrxN3F', NULL, NULL, '2018-06-16 06:37:37', '2018-06-16 06:37:37'),
(106, 111, 111, 111, 20, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2018-06-16 08:38:03', '2018-06-30 08:38:03', 1, 0, 'SjdFqV9oElbHEft5Kaub213Gnzois0eLWhYrxN3F', NULL, NULL, '2018-06-16 06:38:03', '2018-06-16 06:38:03'),
(107, 112, 112, 112, 20, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2018-06-16 08:38:49', '2018-06-30 08:38:49', 1, 0, 'SjdFqV9oElbHEft5Kaub213Gnzois0eLWhYrxN3F', NULL, NULL, '2018-06-16 06:38:49', '2018-06-16 06:38:49'),
(109, 32, 32, 32, 11, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":100,\"banners\":100,\"diskspace\":6,\"lms_users\":600,\"mailing_daily\":600,\"mailing_users\":600}', '2018-06-25 15:57:30', '2019-06-25 15:57:30', 1, 1, '1', NULL, NULL, '2018-06-25 13:57:59', '2018-06-25 13:57:59'),
(110, 103, 103, 29, 11, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":100,\"banners\":100,\"diskspace\":6,\"lms_users\":600,\"mailing_daily\":600,\"mailing_users\":600}', '2018-06-25 15:58:43', '2019-06-25 15:58:43', 1, 1, '1', NULL, NULL, '2018-06-25 13:58:51', '2018-06-25 13:58:51'),
(111, 114, 114, 114, 20, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2018-06-25 17:24:07', '2018-07-09 17:24:07', 1, 0, 'R13FkehdpFVplNL7tDw96PXP1mIwWgFCgyVNQnPU', NULL, NULL, '2018-06-25 15:24:07', '2018-06-25 15:24:07'),
(112, 1, 1, 29, 12, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":false,\"publishfacebook\":true,\"mailing\":false,\"versioning\":false,\"adminPanel\":true,\"projects\":100,\"banners\":100,\"diskspace\":6,\"lms_users\":1000,\"mailing_daily\":1000,\"mailing_users\":1000}', '2018-06-26 08:40:58', '2019-06-26 08:40:58', 1, 1, '1', NULL, NULL, '2018-06-26 06:41:27', '2018-06-26 06:41:27'),
(113, 115, 115, 115, 20, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2018-06-27 09:33:34', '2018-07-11 09:33:34', 1, 0, 'sk1WkGwP96jOxeZcqwjDs6MKBCqy6gzrXDuqo0u1', NULL, NULL, '2018-06-27 07:33:34', '2018-06-27 07:33:34'),
(114, 116, 116, 116, 20, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2018-07-04 10:55:27', '2018-07-18 10:55:27', 1, 0, 'H5tsGF50LvIMrivUzhf8Ff0Xq1FGogwkrRdXjcMP', NULL, NULL, '2018-07-04 08:55:27', '2018-07-04 08:55:27'),
(115, 117, 117, 117, 8, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":100,\"banners\":100,\"diskspace\":1000,\"lms_users\":100,\"mailing_daily\":100,\"mailing_users\":100}', '2018-07-04 11:16:23', '2018-07-18 11:16:23', 1, 0, 'daGhrf8javdzimFz4oIW2xk5pvppmtVCY0FXLChU', NULL, NULL, '2018-07-04 09:16:23', '2018-07-04 09:45:45'),
(116, 118, 118, 118, 8, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":100,\"banners\":100,\"diskspace\":1000,\"lms_users\":100,\"mailing_daily\":100,\"mailing_users\":100}', '2018-07-04 11:20:10', '2018-07-18 11:20:10', 1, 0, 'daGhrf8javdzimFz4oIW2xk5pvppmtVCY0FXLChU', NULL, NULL, '2018-07-04 09:20:10', '2018-07-04 09:46:19'),
(117, 119, 119, 119, 8, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":100,\"banners\":100,\"diskspace\":1000,\"lms_users\":100,\"mailing_daily\":100,\"mailing_users\":100}', '2018-07-04 11:20:40', '2018-07-18 11:20:40', 1, 0, 'daGhrf8javdzimFz4oIW2xk5pvppmtVCY0FXLChU', NULL, NULL, '2018-07-04 09:20:40', '2018-07-04 09:46:25'),
(118, 120, 120, 120, 8, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":100,\"banners\":100,\"diskspace\":1000,\"lms_users\":100,\"mailing_daily\":100,\"mailing_users\":100}', '2018-07-04 11:21:10', '2018-07-18 11:21:10', 1, 0, 'daGhrf8javdzimFz4oIW2xk5pvppmtVCY0FXLChU', NULL, NULL, '2018-07-04 09:21:10', '2018-07-04 09:46:32'),
(119, 121, 121, 121, 8, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":100,\"banners\":100,\"diskspace\":1000,\"lms_users\":100,\"mailing_daily\":100,\"mailing_users\":100}', '2018-07-04 11:22:56', '2018-07-18 11:22:56', 1, 0, 'daGhrf8javdzimFz4oIW2xk5pvppmtVCY0FXLChU', NULL, NULL, '2018-07-04 09:22:56', '2018-07-04 09:43:41');
INSERT INTO `plans_users` (`id`, `user_id`, `paying_user_id`, `created_by_user_id`, `plan_id`, `promo_code_id`, `currency_id`, `plan_cost_to_pay`, `plan_cost_to_pay_with_rabat`, `plan_options`, `start_date`, `expiration_date`, `active`, `paid`, `session_id`, `client_address_id`, `transaction_id`, `created_at`, `updated_at`) VALUES
(120, 122, 122, 122, 8, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":100,\"banners\":100,\"diskspace\":1000,\"lms_users\":100,\"mailing_daily\":100,\"mailing_users\":100}', '2018-07-04 18:11:34', '2018-07-18 18:11:34', 1, 0, 'RSyln8wz8daSJtK7CXq9WOdPnBEWlZYNNxkgOw2G', NULL, NULL, '2018-07-04 16:11:34', '2018-07-04 16:12:32'),
(122, 124, 124, 124, 20, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2018-07-22 10:41:49', '2018-08-05 10:41:49', 1, 0, 'foZLlfuxMdZFZsrP1sBq9yR7Od0DejRMALUnffWi', NULL, NULL, '2018-07-22 08:41:49', '2018-07-22 08:41:49'),
(123, 125, 125, 125, 11, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":250,\"banners\":200,\"diskspace\":8,\"lms_users\":200,\"mailing_daily\":100,\"mailing_users\":200}', '2018-07-30 21:45:01', '2019-03-30 21:45:01', 1, 0, 'BlUNTcsDt9zHo55gKEzXDeuTJjxIipmtzj7gqPCl', NULL, NULL, '2018-07-30 19:45:01', '2018-08-14 11:16:36'),
(124, 113, 113, 29, 11, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":100,\"banners\":100,\"diskspace\":6,\"lms_users\":600,\"mailing_daily\":600,\"mailing_users\":600}', '2018-07-31 20:28:50', '2019-07-31 20:28:50', 1, 1, '1', NULL, NULL, '2018-07-31 18:29:03', '2018-07-31 18:29:03'),
(125, 126, 126, 126, 20, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2018-08-09 04:52:56', '2018-08-23 04:52:56', 1, 0, 'r1tVthFN1Vd8O6pjE38ot04PU1ehX9WDIig7qaQO', NULL, NULL, '2018-08-09 02:52:56', '2018-08-09 02:52:56'),
(126, 127, 127, 127, 20, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2018-09-06 15:39:20', '2018-09-20 15:39:20', 1, 0, 'U4HSwnVXn5QHJ8yZfdbaTe3k1qsDqDb7hRrZG3cB', NULL, NULL, '2018-09-06 13:39:20', '2018-09-06 13:39:20'),
(127, 128, 128, 128, 20, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2018-09-08 10:58:18', '2018-09-22 10:58:18', 1, 0, 'jPRUcEHBDZu3pQrr5Wi6dvrUaIG04aWR4jile1cz', NULL, NULL, '2018-09-08 08:58:18', '2018-09-08 08:58:18'),
(128, 129, 129, 129, 20, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2018-09-12 12:27:19', '2018-09-26 12:27:19', 1, 0, 'sZxaNNYlFfeB03zMSnvLdJs5AT4eQEchYUEATcJJ', NULL, NULL, '2018-09-12 10:27:19', '2018-09-12 10:27:19'),
(129, 130, 130, 130, 20, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2018-09-12 12:30:40', '2018-09-26 12:30:40', 1, 0, 'dPfQMd84qdqcNRJ2fNQS4gDOhM3eKMyheS3niNq4', NULL, NULL, '2018-09-12 10:30:40', '2018-09-12 10:30:40'),
(130, 131, 131, 131, 20, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2018-09-12 12:31:22', '2018-09-26 12:31:22', 1, 0, 'dPfQMd84qdqcNRJ2fNQS4gDOhM3eKMyheS3niNq4', NULL, NULL, '2018-09-12 10:31:22', '2018-09-12 10:31:22'),
(131, 132, 132, 132, 20, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2018-09-21 11:07:04', '2018-10-05 11:07:04', 1, 0, '0uDyBwSnOoEj0fwIXuYxucvFpsuPPPy9cAWOQFOB', NULL, NULL, '2018-09-21 09:07:04', '2018-09-21 09:07:04'),
(132, 134, 134, 134, 20, 1, 1, 0.00, 0.00, '{\"createProjects\":true,\"haveProjects\":true,\"publish\":true,\"publishOnPrimary\":true,\"hasOwnChannel\":true,\"exportscorm\":true,\"exporthtml5\":true,\"exportpdf\":true,\"importpdf\":true,\"importpsd\":true,\"publishfacebook\":true,\"mailing\":true,\"versioning\":true,\"adminPanel\":true,\"projects\":2,\"banners\":2,\"diskspace\":1,\"lms_users\":2,\"mailing_daily\":100,\"mailing_users\":2}', '2018-10-26 10:20:34', '2018-11-09 10:20:34', 1, 0, 'maoFfDNMEKh0XUsWiJBLqjz913ZZEVOFBbykKLOc', NULL, NULL, '2018-10-26 08:20:34', '2018-10-26 08:20:34');

-- --------------------------------------------------------

--
-- Table structure for table `plans_users_to_sales_coupons`
--

CREATE TABLE `plans_users_to_sales_coupons` (
  `id` int(10) UNSIGNED NOT NULL,
  `plan_user_id` int(10) UNSIGNED NOT NULL,
  `sales_coupon_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `plans_versions`
--

CREATE TABLE `plans_versions` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `version` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '1.0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `plans_versions`
--

INSERT INTO `plans_versions` (`id`, `name`, `description`, `version`, `created_at`, `updated_at`) VALUES
(1, 'Plan 1.0', 'Plan 1.0 - pierwsza wersja', '1.0', NULL, NULL),
(2, 'Plan 2.0', 'Plan 2.0 - pierwsza wersja', '2.0', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `plan_options_costs`
--

CREATE TABLE `plan_options_costs` (
  `id` int(10) UNSIGNED NOT NULL,
  `version_id` int(10) UNSIGNED NOT NULL DEFAULT '1',
  `price_plan_option_id` int(10) UNSIGNED NOT NULL,
  `currency_id` int(10) UNSIGNED NOT NULL,
  `cost` decimal(10,2) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `plan_options_costs`
--

INSERT INTO `plan_options_costs` (`id`, `version_id`, `price_plan_option_id`, `currency_id`, `cost`) VALUES
(1, 1, 1, 1, 10.00),
(2, 1, 2, 1, 10.00),
(3, 1, 3, 1, 10.00),
(4, 1, 4, 1, 10.00),
(5, 1, 5, 1, 10.00),
(6, 1, 6, 1, 10.00),
(7, 1, 7, 1, 10.00),
(8, 1, 8, 1, 10.00),
(9, 1, 9, 1, 10.00),
(10, 1, 10, 1, 10.00),
(11, 1, 11, 1, 10.00),
(12, 1, 12, 1, 10.00),
(13, 1, 13, 1, 10.00),
(14, 1, 14, 1, 10.00),
(15, 1, 15, 1, 1.00),
(16, 1, 16, 1, 1.00),
(17, 1, 17, 1, 1.00),
(18, 1, 18, 1, 1.00),
(19, 1, 19, 1, 1.00),
(20, 1, 20, 1, 1.00);

-- --------------------------------------------------------

--
-- Table structure for table `portal_skins`
--

CREATE TABLE `portal_skins` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `css_file` varchar(100) COLLATE utf8_unicode_ci NOT NULL,
  `public` int(11) NOT NULL DEFAULT '1'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `portal_skins`
--

INSERT INTO `portal_skins` (`id`, `name`, `css_file`, `public`) VALUES
(1, 'default', 'default.css', 1),
(2, 'red', 'red.css', 1),
(3, 'pamrow', 'pamrow.css', 0);

-- --------------------------------------------------------

--
-- Table structure for table `price_functionality`
--

CREATE TABLE `price_functionality` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `price_functionality`
--

INSERT INTO `price_functionality` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Miejsce na dysku', '1 month', NULL, NULL),
(2, '6 months', '6 months', NULL, NULL),
(3, '12 months', '12 months', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `price_option_types`
--

CREATE TABLE `price_option_types` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `price_option_types`
--

INSERT INTO `price_option_types` (`id`, `name`) VALUES
(1, 'boolean'),
(2, 'numeric');

-- --------------------------------------------------------

--
-- Table structure for table `price_periods`
--

CREATE TABLE `price_periods` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `price_periods`
--

INSERT INTO `price_periods` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, '1 month', '1 month', NULL, NULL),
(2, '6 months', '6 months', NULL, NULL),
(3, '12 months', '12 months', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `price_plan_options`
--

CREATE TABLE `price_plan_options` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `value` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `price_option_type_id` int(10) UNSIGNED NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `version_id` int(10) UNSIGNED NOT NULL DEFAULT '1',
  `show` tinyint(4) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `price_plan_options`
--

INSERT INTO `price_plan_options` (`id`, `name`, `value`, `price_option_type_id`, `description`, `version_id`, `show`) VALUES
(1, 'createProjects', 'true', 1, '', 1, 1),
(2, 'haveProjects', 'true', 1, '', 1, 1),
(3, 'publish', 'true', 1, '', 1, 1),
(4, 'publishOnPrimary', 'true', 1, '', 1, 1),
(5, 'hasOwnChannel', 'true', 1, '', 1, 1),
(6, 'exportscorm', 'true', 1, '', 1, 1),
(7, 'exporthtml5', 'true', 1, '', 1, 1),
(8, 'exportpdf', 'true', 1, '', 1, 1),
(9, 'importpdf', 'true', 1, '', 1, 1),
(10, 'importpsd', 'true', 1, '', 1, 1),
(11, 'publishfacebook', 'true', 1, '', 1, 1),
(12, 'mailing', 'true', 1, '', 1, 1),
(13, 'versioning', 'true', 1, '', 1, 1),
(14, 'adminPanel', 'true', 1, '', 1, 1),
(15, 'projects', '100', 2, '', 1, 1),
(16, 'banners', '100', 2, '', 1, 1),
(17, 'diskspace', '10000000', 2, '', 1, 0),
(18, 'lms_users', '1000', 2, '', 1, 1),
(19, 'mailing_daily', '1000', 2, '', 1, 1),
(20, 'mailing_users', '1000', 2, '', 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `price_types`
--

CREATE TABLE `price_types` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `price_types`
--

INSERT INTO `price_types` (`id`, `name`, `description`, `created_at`, `updated_at`) VALUES
(1, 'Standard', 'Standard', NULL, NULL),
(2, 'Professional', 'Professional', NULL, NULL),
(3, 'Elearning', 'Elearning', NULL, NULL),
(4, 'Enterprise', 'Enterprise', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE `projects` (
  `project_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
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
  `editor_id` int(10) UNSIGNED NOT NULL DEFAULT '5'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`project_id`, `user_id`, `date`, `name`, `skin`, `dimentions`, `version`, `date_modification`, `size`, `template`, `last_visit`, `status`, `external`, `editor_id`) VALUES
(21, 42, '2017-04-10 21:53:33', 'new', 'sk00', '860x500', '2.0.0', '2017-04-10 21:53:33', 362196, 0, '2017-04-11 07:28:51', 0, 0, 5),
(23, 33, '2017-04-12 12:40:25', 'asdasd', 'sk01', '860x500', '2.0.0', '2017-04-12 12:40:25', 285817, 0, '2017-07-23 18:38:41', 2, 0, 5),
(56, 29, '2017-10-08 18:46:56', 'nowy', 'sk00', '860x500', '2.0.0', '2017-10-08 18:46:56', 1298038, 0, '2017-12-17 13:08:51', 0, 0, 5),
(58, 58, '2017-10-12 09:58:16', 'nowy', 'sk00', '860x500', '2.0.0', '2017-10-12 09:58:16', 20784, 0, '2017-10-12 11:58:27', 0, 0, 5),
(59, 58, '2017-10-12 09:58:31', 'nowy2', 'sk00', '860x500', '2.0.0', '2017-10-12 09:58:31', 64826, 0, '2017-10-12 12:12:57', 0, 0, 5),
(68, 29, '2017-11-20 10:02:06', 'nowy4', 'sk00', '860x500', '2.0.0', '2017-11-20 10:02:06', 0, 0, '2017-11-20 10:02:06', 0, 0, 5),
(69, 29, '2017-11-20 10:18:37', 'start23', 'sk00', '860x500', '2.0.0', '2017-11-20 10:18:37', 0, 0, '2017-11-20 10:18:37', 0, 0, 5),
(70, 29, '2017-11-20 12:23:44', 'nowy_projekt', 'sk00', '860x500', '2.0.0', '2017-11-20 12:23:44', 0, 0, '2017-11-20 12:23:44', 0, 0, 5),
(71, 29, '2017-11-20 13:12:45', 'starter', 'sk00', '860x500', '2.0.0', '2017-11-20 13:12:45', 64826, 0, '2017-11-20 15:20:29', 0, 0, 5),
(72, 59, '2017-11-28 09:51:44', 'video turtoriale ', 'sk00', '860x500', '2.0.0', '2017-11-28 09:51:44', 11992030, 0, '2017-12-22 14:15:30', 0, 0, 5),
(73, 82, '2017-11-28 18:34:35', 'darkan', 'sk00', '860x500', '2.0.0', '2017-11-28 18:34:35', 123546, 0, '2017-11-28 21:09:35', 0, 0, 5),
(75, 29, '2017-11-30 17:07:11', 'new', 'sk00', '860x500', '2.0.0', '2017-11-30 17:07:11', 1139159, 0, '2018-06-10 22:31:22', 0, 0, 5),
(76, 87, '2017-12-08 06:23:22', 'start', 'sk00', '860x500', '2.0.0', '2017-12-08 06:23:22', 696234, 0, '2017-12-08 08:23:44', 0, 0, 5),
(77, 3, '0000-00-00 00:00:00', 'Medicine', 'sk00', '860x500', '2.0.0', '0000-00-00 00:00:00', 13794915, 0, '2017-12-28 22:18:54', 0, 0, 5),
(78, 3, '0000-00-00 00:00:00', 'health care- blue', 'sk00', '860x500', '2.0.0', '0000-00-00 00:00:00', 12785965, 0, '2018-11-18 12:42:29', 0, 0, 5),
(79, 29, '2017-12-08 07:08:42', 'nowy', 'sk00', '860x500', '2.0.0', '2017-12-08 07:08:42', 426096, 0, '2018-06-28 17:22:42', 0, 0, 5),
(80, 29, '2017-12-08 07:10:24', 'nowy', 'sk00', '860x500', '2.0.0', '2017-12-08 07:10:24', 3039284, 0, '2019-01-28 18:47:47', 0, 0, 5),
(81, 29, '2017-12-19 12:53:26', 'test', 'sk00', '860x500', '2.0.0', '2017-12-19 12:53:26', 306350, 0, '2018-09-23 12:13:51', 0, 0, 5),
(82, 3, '0000-00-00 00:00:00', '1', 'sk00', '860x500', '2.0.0', '0000-00-00 00:00:00', 19263339, 1, '2018-11-18 12:35:52', 0, 0, 5),
(83, 3, '0000-00-00 00:00:00', '2', 'sk00', '860x500', '2.0.0', '0000-00-00 00:00:00', 2466205, 1, '2018-11-18 12:36:26', 0, 0, 5),
(84, 3, '0000-00-00 00:00:00', '3', 'sk00', '860x500', '2.0.0', '0000-00-00 00:00:00', 15038274, 1, '2018-11-18 12:36:29', 0, 0, 5),
(85, 3, '0000-00-00 00:00:00', '4', 'sk00', '860x500', '2.0.0', '0000-00-00 00:00:00', 5909212, 1, '2018-11-18 12:36:32', 0, 0, 5),
(86, 3, '0000-00-00 00:00:00', '5', 'sk00', '860x500', '2.0.0', '0000-00-00 00:00:00', 5941404, 1, '2018-11-18 12:36:34', 0, 0, 5),
(87, 3, '0000-00-00 00:00:00', '6', 'sk00', '860x500', '2.0.0', '0000-00-00 00:00:00', 5328916, 1, '2018-11-18 12:36:35', 0, 0, 5),
(88, 3, '0000-00-00 00:00:00', '7', 'sk00', '860x500', '2.0.0', '0000-00-00 00:00:00', 3090649, 1, '2018-11-18 12:36:36', 0, 0, 5),
(89, 3, '0000-00-00 00:00:00', '8', 'sk00', '860x500', '2.0.0', '0000-00-00 00:00:00', 1926853, 1, '2018-11-18 12:36:52', 0, 0, 5),
(91, 3, '0000-00-00 00:00:00', '10', 'sk00', '860x500', '2.0.0', '0000-00-00 00:00:00', 2917382, 1, '2018-11-18 12:35:57', 0, 0, 5),
(93, 3, '0000-00-00 00:00:00', '12', 'sk00', '860x500', '2.0.0', '0000-00-00 00:00:00', 8855414, 1, '2018-11-18 12:36:05', 0, 0, 5),
(94, 3, '0000-00-00 00:00:00', '13', 'sk00', '860x500', '2.0.0', '0000-00-00 00:00:00', 11224042, 1, '2018-11-18 12:36:08', 0, 0, 5),
(95, 3, '0000-00-00 00:00:00', '14', 'sk00', '860x500', '2.0.0', '0000-00-00 00:00:00', 37682452, 1, '2018-11-18 12:36:10', 0, 0, 5),
(96, 3, '0000-00-00 00:00:00', 'Bezpieczeństwo transakcji w internecie', 'sk00', '860x500', '2.0.0', '0000-00-00 00:00:00', 33942748, 0, '2019-02-04 12:49:16', 0, 0, 5),
(97, 29, '2018-01-06 16:25:25', 'www', 'sk00', '860x500', '2.0.0', '2018-01-06 16:25:25', 511359, 0, '2018-06-11 15:40:01', 0, 0, 5),
(98, 3, '0000-00-00 00:00:00', 'Drogowskazy sprzedaży', 'sk00', '860x500', '2.0.0', '0000-00-00 00:00:00', 4883800, 0, '2018-11-27 10:15:45', 0, 0, 5),
(99, 3, '0000-00-00 00:00:00', 'Jakość opieki i bezpieczeństwo pacjenta', 'sk00', '860x500', '2.0.0', '0000-00-00 00:00:00', 5494491, 0, '2018-11-27 10:14:41', 0, 0, 5),
(100, 3, '0000-00-00 00:00:00', 'Style życia w Polsce', 'sk00', '860x500', '2.0.0', '0000-00-00 00:00:00', 19205314, 0, '2018-11-27 10:10:37', 0, 0, 5),
(101, 3, '0000-00-00 00:00:00', 'Zasoby ludzkie', 'sk00', '860x500', '2.0.0', '0000-00-00 00:00:00', 5128755, 0, '2018-11-27 10:13:35', 0, 0, 5),
(102, 3, '0000-00-00 00:00:00', 'Darkan-prezentacja', 'sk00', '860x500', '2.0.0', '0000-00-00 00:00:00', 9649009, 0, '2018-01-07 14:03:09', 0, 0, 5),
(103, 3, '0000-00-00 00:00:00', 'Darkan- presentation', 'sk00', '860x500', '2.0.0', '0000-00-00 00:00:00', 9487048, 0, '2018-01-07 14:49:00', 0, 0, 5),
(104, 3, '0000-00-00 00:00:00', 'Sale signposts ', 'sk00', '860x500', '2.0.0', '0000-00-00 00:00:00', 10663819, 0, '2018-01-07 14:14:37', 0, 0, 5),
(105, 3, '0000-00-00 00:00:00', 'Security of banking transactions', 'sk00', '860x500', '2.0.0', '0000-00-00 00:00:00', 22943512, 0, '2018-01-07 14:13:24', 0, 0, 5),
(106, 3, '0000-00-00 00:00:00', 'Quality of care and patient safety in health care', 'sk00', '860x500', '2.0.0', '0000-00-00 00:00:00', 8727665, 0, '2018-01-07 14:19:57', 0, 0, 5),
(107, 3, '0000-00-00 00:00:00', 'Human resources ', 'sk00', '860x500', '2.0.0', '0000-00-00 00:00:00', 6034281, 0, '2018-01-07 14:15:51', 0, 0, 5),
(108, 3, '0000-00-00 00:00:00', 'Lifestyles in Poland', 'sk00', '860x500', '2.0.0', '0000-00-00 00:00:00', 12158003, 0, '2018-01-07 14:21:28', 0, 0, 5),
(109, 6, '2018-01-07 17:57:45', 'Nowy projekt', 'sk00', '860x500', '2.0.0', '2018-01-07 17:57:45', 1987034, 0, '2019-01-18 20:52:13', 0, 0, 5),
(110, 3, '2018-01-11 18:00:09', 'nazwa', 'sk00', '860x500', '2.0.0', '2018-01-11 18:00:09', 1069844, 0, '2018-01-11 21:50:13', 0, 0, 5),
(111, 29, '2018-01-15 09:02:38', 'Testowy nowy projekt', 'sk00', '860x500', '2.0.0', '2018-01-15 09:02:38', 840247, 0, '2018-06-18 19:00:17', 0, 0, 5),
(112, 91, '2018-01-17 21:21:35', 'Test1', 'sk00', '860x500', '2.0.0', '2018-01-17 21:21:35', 23466, 0, '2018-01-22 18:27:40', 0, 0, 5),
(113, 6, '2018-01-19 11:45:08', 'Nowy projekt', 'sk00', '860x500', '2.0.0', '2018-01-19 11:45:08', 64827, 0, '2018-09-04 19:17:09', 0, 0, 5),
(114, 6, '2018-01-21 19:40:13', 'ala', 'sk00', '860x500', '2.0.0', '2018-01-21 19:40:13', 269528, 0, '2018-01-21 22:04:42', 0, 0, 5),
(116, 29, '2018-02-05 11:50:09', 'video', 'sk00', '860x500', '2.0.0', '2018-02-05 11:50:09', 21818595, 0, '2018-08-31 00:49:55', 0, 0, 5),
(121, 54, '2018-02-12 09:22:39', 'Darkan', 'sk00', '860x500', '2.0.0', '2018-02-12 09:22:39', 10700774, 0, '2018-08-01 13:04:54', 0, 0, 5),
(122, 101, '2018-02-20 06:55:26', 'nowy', 'sk00', '860x500', '2.0.0', '2018-02-20 06:55:26', 64827, 0, '2018-09-12 17:11:46', 0, 0, 5),
(123, 54, '0000-00-00 00:00:00', 'Prezentacja Dawid- kopia', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 4863376, 0, '0000-00-00 00:00:00', 0, 0, 5),
(124, 54, '0000-00-00 00:00:00', 'Prezentacja Dawid- kopia', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 4863376, 0, '0000-00-00 00:00:00', 0, 0, 5),
(125, 100, '2018-02-20 10:10:02', 'test', 'sk00', '860x500', '2.0.0', '2018-02-20 10:10:02', 5375028, 0, '2018-07-05 12:29:57', 0, 0, 5),
(128, 3, '2018-04-08 11:32:02', 'nowy', 'sk00', '860x500', '2.0.0', '2018-04-08 11:32:02', 131373, 0, '2018-11-18 18:53:01', 0, 0, 5),
(129, 102, '2018-04-11 07:50:31', 'nowy', 'sk00', '860x500', '2.0.0', '2018-04-11 07:50:31', 64830, 0, '2018-04-11 10:09:58', 0, 0, 5),
(130, 29, '2018-04-23 07:22:20', 'oragne', 'sk00', '860x500', '2.0.0', '2018-04-23 07:22:20', 14224709, 0, '2018-11-28 18:50:35', 0, 0, 5),
(132, 29, '2018-05-10 04:53:31', 'Cyber bezpieczeństwo', 'sk00', '860x500', '2.0.0', '2018-05-10 04:53:31', 2498903, 0, '2018-11-29 11:23:34', 0, 0, 5),
(133, 29, '2018-05-12 09:21:55', 'prezentacja', 'sk00', '860x500', '2.0.0', '2018-05-12 09:21:55', 8074860, 0, '2018-12-05 13:42:11', 0, 0, 5),
(134, 29, '0000-00-00 00:00:00', 'Darkan-prezentacja', 'sk00', '860x500', '2.0.0', '0000-00-00 00:00:00', 19991391, 0, '2018-11-28 18:49:58', 0, 0, 5),
(135, 29, '0000-00-00 00:00:00', 'pitchdeck long- waw.ac', 'sk00', '860x500', '2.0.0', '0000-00-00 00:00:00', 12218677, 0, '2018-06-16 10:35:14', 0, 0, 5),
(136, 6, '2018-05-12 15:52:48', 'test123', 'sk00', '860x500', '2.0.0', '2018-05-12 15:52:48', 699710, 0, '2018-08-23 00:42:19', 0, 0, 5),
(137, 29, '0000-00-00 00:00:00', 'prezentacja- copy', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 8074783, 0, '0000-00-00 00:00:00', 0, 0, 5),
(138, 29, '0000-00-00 00:00:00', 'prezentacja- copy', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 8074783, 0, '0000-00-00 00:00:00', 0, 0, 5),
(139, 29, '2018-05-12 16:34:37', 'edulab-prezentacja', 'sk00', '860x500', '2.0.0', '2018-05-12 16:34:37', 10930765, 0, '2018-05-23 19:28:21', 0, 0, 5),
(140, 103, '2018-05-24 09:57:24', 'Orange', 'sk00', '860x500', '2.0.0', '2018-05-24 09:57:24', 22621977, 0, '2018-08-08 11:37:05', 0, 0, 5),
(141, 103, '2018-05-24 14:50:41', 'Rebel', 'sk00', '860x500', '2.0.0', '2018-05-24 14:50:41', 40825791, 0, '2018-07-24 15:06:21', 0, 0, 5),
(142, 29, '2018-06-10 19:15:48', 'Obieg pieniądza', 'sk00', '860x500', '2.0.0', '2018-06-10 19:15:48', 14840707, 0, '2018-06-10 21:54:33', 0, 0, 5),
(143, 104, '2018-06-11 23:41:34', 'Nowy projekt', 'sk00', '860x500', '2.0.0', '2018-06-11 23:41:34', 711455, 0, '2018-06-12 01:45:31', 0, 0, 5),
(144, 105, '0000-00-00 00:00:00', 'Darkan-prezentacja', 'sk00', '860x500', '2.0.0', '0000-00-00 00:00:00', 19237113, 0, '2018-06-18 18:50:38', 0, 0, 5),
(145, 107, '0000-00-00 00:00:00', 'Darkan-prezentacja- kopia', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 19067736, 0, '0000-00-00 00:00:00', 0, 0, 5),
(146, 107, '2018-06-13 12:54:19', 'Darkan-prezentacja', 'sk00', '860x500', '2.0.0', '2018-06-13 12:54:19', 64827, 0, '2018-06-13 15:35:23', 0, 0, 5),
(147, 106, '0000-00-00 00:00:00', 'Darkan-prezentacja- kopia', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 19067736, 0, '0000-00-00 00:00:00', 0, 0, 5),
(148, 106, '0000-00-00 00:00:00', 'Darkan-prezentacja- kopia', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 19067736, 0, '0000-00-00 00:00:00', 0, 0, 5),
(150, 106, '2018-06-13 14:03:51', 'dwwq', 'sk00', '860x500', '2.0.0', '2018-06-13 14:03:51', 0, 0, '2018-06-13 14:03:51', 0, 0, 5),
(151, 107, '2018-06-13 14:07:34', 'vxvxvx', 'sk00', '860x500', '2.0.0', '2018-06-13 14:07:34', 0, 0, '2018-06-13 14:07:34', 0, 0, 5),
(152, 105, '0000-00-00 00:00:00', 'nowy- kopia', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 2348742, 0, '0000-00-00 00:00:00', 0, 0, 5),
(153, 105, '0000-00-00 00:00:00', 'nowy- kopia', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 2348742, 0, '0000-00-00 00:00:00', 0, 0, 5),
(154, 105, '2018-06-15 11:24:12', 'Nowy projekt', 'sk00', '860x500', '2.0.0', '2018-06-15 11:24:12', 23466, 0, '2018-06-15 14:16:13', 0, 0, 5),
(155, 105, '0000-00-00 00:00:00', 'Darkan-prezentacja- kopia', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 19237113, 0, '0000-00-00 00:00:00', 0, 0, 5),
(156, 105, '0000-00-00 00:00:00', 'Darkan-prezentacja- kopia', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 19237113, 0, '0000-00-00 00:00:00', 0, 0, 5),
(157, 105, '0000-00-00 00:00:00', 'Darkan-prezentacja- kopia', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 19237113, 0, '0000-00-00 00:00:00', 0, 0, 5),
(158, 105, '0000-00-00 00:00:00', 'nowy- kopia', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 2348742, 0, '0000-00-00 00:00:00', 0, 0, 5),
(159, 29, '2018-06-15 16:06:08', 'nowy', 'sk00', '860x500', '2.0.0', '2018-06-15 16:06:08', 501412, 0, '2019-01-28 15:09:49', 0, 0, 5),
(160, 105, '0000-00-00 00:00:00', 'Testowy nowy projekt- kopia', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 840247, 0, '2018-06-15 20:47:49', 0, 0, 5),
(161, 29, '2018-06-16 04:36:21', 'prezentacja-ssgw', 'sk00', '860x500', '2.0.0', '2018-06-16 04:36:21', 30358685, 1, '2018-08-27 13:36:24', 0, 0, 5),
(162, 112, '0000-00-00 00:00:00', 'prezentacja-ssgw', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 69456171, 0, '2018-06-17 02:01:05', 0, 0, 5),
(163, 112, '0000-00-00 00:00:00', 'pitchdeck long- waw.ac', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 12218677, 0, '2018-06-16 12:55:41', 0, 0, 5),
(164, 113, '2018-06-17 12:59:13', 'Pieniążki', 'sk00', '860x500', '2.0.0', '2018-06-17 12:59:13', 1123293, 1, '2018-11-28 18:53:57', 0, 0, 5),
(165, 29, '2018-06-17 13:19:37', 'WIB', 'sk00', '860x500', '2.0.0', '2018-06-17 13:19:37', 434327948, 0, '2018-11-23 13:32:36', 0, 0, 5),
(166, 29, '0000-00-00 00:00:00', 'WIB- kopia', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 174102208, 0, '2018-11-23 21:46:40', 0, 0, 5),
(167, 103, '0000-00-00 00:00:00', 'Orange', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 118202133, 0, '2019-01-28 15:24:09', 0, 0, 5),
(168, 103, '2018-06-25 16:02:25', 'Orange typografia', 'sk00', '860x500', '2.0.0', '2018-06-25 16:02:25', 375483, 0, '2018-07-04 11:35:07', 0, 0, 5),
(169, 103, '0000-00-00 00:00:00', 'Darkan - Orange', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 13663314, 0, '2019-02-07 18:06:57', 0, 0, 5),
(170, 29, '2018-06-26 08:40:58', 'test', 'sk00', '860x500', '2.0.0', '2018-06-26 08:40:58', 0, 0, '2018-06-26 08:40:58', 0, 0, 5),
(171, 1, '2018-06-26 08:42:25', 'test1', 'sk00', '860x500', '2.0.0', '2018-06-26 08:42:25', 0, 0, '2018-06-26 08:42:25', 0, 0, 5),
(172, 29, '2018-06-26 09:59:03', 'Orange - Telefony', 'sk00', '860x500', '2.0.0', '2018-06-26 09:59:03', 3673834, 0, '2018-07-04 18:14:38', 0, 0, 5),
(173, 103, '0000-00-00 00:00:00', 'Orange Rozmowa', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 29691936, 0, '2018-07-04 11:35:09', 0, 0, 5),
(174, 103, '0000-00-00 00:00:00', 'Orange typografia- kopia', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 375483, 0, '2018-06-27 14:47:37', 0, 0, 5),
(175, 103, '0000-00-00 00:00:00', 'Orange - Mój Orange', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 8675212, 0, '2018-07-04 11:35:01', 0, 0, 5),
(176, 29, '0000-00-00 00:00:00', 'Orange - Mój Orange-  v1', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 8675212, 0, '2018-07-04 11:41:50', 0, 0, 5),
(177, 29, '0000-00-00 00:00:00', 'Orange - Telefony- v1', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 3673834, 0, '0000-00-00 00:00:00', 0, 0, 5),
(178, 29, '0000-00-00 00:00:00', 'Orange typografia- kopia', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 375483, 0, '0000-00-00 00:00:00', 0, 0, 5),
(179, 29, '0000-00-00 00:00:00', 'Orange typografia- v1', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 375483, 0, '2018-07-25 17:46:54', 0, 0, 5),
(180, 29, '0000-00-00 00:00:00', 'Orange info - v1', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 29691936, 0, '0000-00-00 00:00:00', 0, 0, 5),
(181, 29, '0000-00-00 00:00:00', 'Darkan - Orange- v1', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 13735171, 0, '2019-01-28 21:33:45', 0, 0, 5),
(182, 121, '0000-00-00 00:00:00', 'Darkan - Orange- v1- kopia', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 13637674, 0, '0000-00-00 00:00:00', 0, 0, 5),
(183, 121, '0000-00-00 00:00:00', 'Orange - Mój Orange-  v1- kopia', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 3938148, 0, '2018-08-08 18:15:31', 0, 0, 5),
(185, 29, '0000-00-00 00:00:00', 'Orange - Telefony- v1', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 2267695, 0, '2018-08-08 01:18:38', 0, 0, 5),
(186, 54, '2018-07-05 08:16:10', 'CVT', 'sk00', '860x500', '2.0.0', '2018-07-05 08:16:10', 20598825, 1, '2018-08-01 11:01:59', 0, 0, 5),
(208, 121, '2018-07-09 16:07:21', 'Projekt testowy 1', 'sk00', '860x500', '2.0.0', '2018-07-09 16:07:21', 17442856, 1, '2018-08-08 18:15:33', 0, 0, 5),
(214, 54, '2018-07-11 10:58:42', 'Projekt testowy', 'sk00', '860x500', '2.0.0', '2018-07-11 10:58:42', 64908, 0, '2018-07-16 11:03:56', 0, 0, 5),
(216, 54, '2018-07-16 08:55:03', 'testowy', 'sk00', '860x500', '2.0.0', '2018-07-16 08:55:03', 66333, 0, '2018-07-19 10:49:45', 0, 0, 5),
(223, 54, '2018-07-19 08:50:06', 'Prezentacja ćwiczenia Drag and Drop', 'sk00', '860x500', '2.0.0', '2018-07-19 08:50:06', 1214463, 0, '2018-08-01 13:09:02', 0, 0, 5),
(224, 54, '2018-07-19 11:06:44', 'Triggery - prezentacja i zastosowanie ', 'sk00', '860x500', '2.0.0', '2018-07-19 11:06:44', 5113034, 0, '2018-08-01 13:09:08', 0, 0, 5),
(225, 54, '2018-07-29 23:21:53', 'nowy1', 'sk00', '860x500', '2.0.0', '2018-07-29 23:21:53', 0, 0, '2018-07-29 23:21:53', 0, 0, 5),
(229, 54, '2018-07-30 00:19:11', 'Nowy projekt1', 'sk00', '860x500', '2.0.0', '2018-07-30 00:19:11', 0, 0, '2018-07-30 00:19:11', 0, 0, 5),
(232, 125, '2018-08-01 09:01:51', 'Zastosowanie Triggerów ', 'sk00', '860x500', '2.0.0', '2018-08-01 09:01:51', 64827, 0, '2018-08-01 13:35:38', 0, 0, 5),
(234, 125, '0000-00-00 00:00:00', 'Prezentacja ćwiczenia Drag and Drop', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 1214463, 0, '2018-08-01 15:06:30', 0, 0, 5),
(235, 125, '0000-00-00 00:00:00', 'Triggery - prezentacja i zastosowanie', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 5113034, 0, '2018-08-01 15:06:22', 0, 0, 5),
(236, 125, '0000-00-00 00:00:00', 'Prezentacja ćwiczenia Drag and Drop', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 2813426, 0, '2018-11-13 16:40:49', 0, 0, 5),
(237, 125, '0000-00-00 00:00:00', 'Triggery - prezentacja i zastosowanie', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 7324619, 0, '2018-08-08 15:54:01', 0, 0, 5),
(239, 113, '2018-08-01 16:37:10', 'dupa', 'sk00', '860x500', '2.0.0', '2018-08-01 16:37:10', 23466, 0, '2018-08-01 18:38:33', 0, 0, 5),
(241, 113, '2018-08-01 17:02:08', 'Projekt 2', 'sk00', '860x500', '2.0.0', '2018-08-01 17:02:08', 0, 0, '2018-08-01 17:02:08', 0, 0, 5),
(243, 113, '2018-08-06 22:26:15', 'pola tekstowe zielone', 'sk00', '860x500', '2.0.0', '2018-08-06 22:26:15', 4750837, 0, '2018-08-13 16:05:20', 0, 0, 5),
(244, 113, '2018-08-06 22:29:35', 'Nowy projekt', 'sk00', '860x500', '2.0.0', '2018-08-06 22:29:35', 1836284, 0, '2018-11-16 22:06:11', 0, 0, 5),
(253, 125, '2018-08-07 23:28:32', 'Film cz. 10', 'sk00', '860x500', '2.0.0', '2018-08-07 23:28:32', 1774456, 0, '2018-08-14 14:49:43', 0, 0, 5),
(254, 125, '2018-08-09 20:40:00', 'Film cz.  8', 'sk00', '860x500', '2.0.0', '2018-08-09 20:40:00', 410695, 0, '2018-08-10 02:23:39', 0, 0, 5),
(255, 125, '2018-08-10 00:23:52', 'Film cz. 9', 'sk00', '860x500', '2.0.0', '2018-08-10 00:23:52', 208382, 0, '2018-08-14 11:40:39', 0, 0, 5),
(259, 113, '2018-08-10 17:12:12', 'Scenariusz', 'sk00', '860x500', '2.0.0', '2018-08-10 17:12:12', 2391337, 0, '2018-09-22 00:06:03', 0, 0, 5),
(261, 113, '2018-08-12 12:38:23', 'Projekt testowy do filmów', 'sk00', '860x500', '2.0.0', '2018-08-12 12:38:23', 10868524, 0, '2018-10-30 12:09:24', 0, 0, 5),
(263, 125, '2018-08-14 13:57:17', 'Część 12 tło', 'sk00', '860x500', '2.0.0', '2018-08-14 13:57:17', 1113764, 0, '2018-08-15 10:47:14', 0, 0, 5),
(265, 125, '2018-08-15 09:19:46', 'Część 11 Szablony i template', 'sk00', '860x500', '2.0.0', '2018-08-15 09:19:46', 257800, 0, '2018-08-15 15:26:06', 0, 0, 5),
(266, 113, '2018-08-15 10:36:57', 'testowy', 'sk00', '860x500', '2.0.0', '2018-08-15 10:36:57', 3699046, 0, '2018-12-19 12:19:52', 0, 0, 5),
(278, 125, '2018-08-16 08:24:13', 'Pojedynczy wybór, wielokrotny wybór, wybierz opcje', 'sk00', '860x500', '2.0.0', '2018-08-16 08:24:13', 237000, 0, '2018-10-07 12:55:49', 0, 0, 5),
(279, 125, '2018-08-16 12:13:01', ' Ćwiczenie wpisz dobrą odpowiedź', 'sk00', '860x500', '2.0.0', '2018-08-16 12:13:01', 199947, 0, '2018-08-16 17:33:15', 0, 0, 5),
(280, 125, '2018-08-16 15:34:56', 'Ćwiczenie wybierz właściwą odpowiedź z listy', 'sk00', '860x500', '2.0.0', '2018-08-16 15:34:56', 184972, 0, '2018-08-20 11:33:49', 0, 0, 5),
(281, 125, '2018-08-20 09:34:15', 'Ćwiczenie wypełnij luki', 'sk00', '860x500', '2.0.0', '2018-08-20 09:34:15', 317610, 0, '2018-10-03 13:46:50', 0, 0, 5),
(282, 29, '2018-08-23 09:01:28', 'nowy', 'sk00', '860x500', '2.0.0', '2018-08-23 09:01:28', 361199, 0, '2018-09-09 14:55:00', 0, 0, 5),
(283, 125, '2018-08-27 09:25:27', 'Ćwiczenie', 'sk00', '860x500', '2.0.0', '2018-08-27 09:25:27', 2632262, 0, '2018-10-29 15:09:16', 0, 0, 5),
(284, 125, '2018-08-27 11:59:04', 'Ćwiczenie znajdź słowa', 'sk00', '860x500', '2.0.0', '2018-08-27 11:59:04', 128195, 0, '2018-08-27 21:16:23', 0, 0, 5),
(285, 125, '2018-08-29 19:37:40', 'Nowy projekt', 'sk00', '860x500', '2.0.0', '2018-08-29 19:37:40', 1074712, 0, '2018-12-18 20:00:26', 0, 0, 5),
(286, 29, '2018-08-30 13:50:02', 'nowy1', 'sk00', '860x500', '2.0.0', '2018-08-30 13:50:02', 0, 0, '2018-08-30 13:50:02', 0, 0, 5),
(287, 29, '2018-08-30 13:50:43', 'pick one', 'sk00', '860x500', '2.0.0', '2018-08-30 13:50:43', 67834, 0, '2018-10-24 22:00:15', 0, 0, 5),
(288, 125, '2018-09-06 13:42:42', 'Film 14', 'sk00', '860x500', '2.0.0', '2018-09-06 13:42:42', 126339, 0, '2018-11-22 12:11:14', 0, 0, 5),
(289, 125, '2018-09-12 13:42:56', 'Drag and Drop cz1.', 'sk00', '860x500', '2.0.0', '2018-09-12 13:42:56', 346720, 0, '2018-10-19 12:29:34', 0, 0, 5),
(290, 29, '2018-09-13 08:52:11', 'nazwa', 'sk00', '860x500', '2.0.0', '2018-09-13 08:52:11', 968611, 0, '2019-01-31 17:04:58', 0, 0, 5),
(292, 113, '2018-09-25 08:57:27', 'Zmienne projektowe', 'sk00', '860x500', '2.0.0', '2018-09-25 08:57:27', 286727, 0, '2018-10-24 16:38:38', 0, 0, 5),
(293, 113, '2018-09-25 10:19:04', 'Triggery', 'sk00', '860x500', '2.0.0', '2018-09-25 10:19:04', 412328, 0, '2018-10-24 21:26:41', 0, 0, 5),
(297, 113, '2018-09-27 09:32:04', 'Oferta handlowa', 'sk00', '860x500', '2.0.0', '2018-09-27 09:32:04', 5497836, 1, '2018-12-17 10:15:10', 0, 0, 5),
(298, 125, '2018-09-27 16:57:22', 'www', 'sk00', '860x500', '2.0.0', '2018-09-27 16:57:22', 123253, 0, '2018-09-27 19:28:51', 0, 0, 5),
(299, 29, '2018-09-28 09:58:10', 'startowy', 'sk00', '860x500', '2.0.0', '2018-09-28 09:58:10', 129345, 0, '2018-09-28 13:04:17', 0, 0, 5),
(301, 125, '2018-10-03 13:15:24', 'Film 19', 'sk00', '860x500', '2.0.0', '2018-10-03 13:15:24', 1685457, 0, '2019-01-02 23:57:46', 0, 0, 5),
(303, 29, '2018-10-17 12:38:57', 'Nowy projekt', 'sk00', '860x500', '2.0.0', '2018-10-17 12:38:57', 222093, 0, '2019-01-27 17:11:22', 0, 0, 5),
(304, 125, '2018-10-19 10:30:10', 'Film 20', 'sk00', '860x500', '2.0.0', '2018-10-19 10:30:10', 122260, 0, '2018-12-18 20:04:57', 0, 0, 5),
(305, 125, '2018-10-19 12:12:19', 'Film 31', 'sk00', '860x500', '2.0.0', '2018-10-19 12:12:19', 286836, 0, '2018-10-24 14:00:16', 0, 0, 5),
(306, 29, '2018-10-19 19:20:26', 'triggery', 'sk00', '860x500', '2.0.0', '2018-10-19 19:20:26', 387414, 0, '2018-10-19 21:27:40', 0, 0, 5),
(307, 113, '2018-10-23 14:32:16', 'Punktacja', 'sk00', '860x500', '2.0.0', '2018-10-23 14:32:16', 1207106, 0, '2019-02-09 16:06:15', 0, 0, 5),
(309, 113, '2018-10-24 13:04:14', 'DARKAN', 'sk00', '860x500', '2.0.0', '2018-10-24 13:04:14', 64827, 0, '2018-10-24 23:27:07', 0, 0, 5),
(310, 113, '0000-00-00 00:00:00', 'Darkan-prezentacja- kopia xxx', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 19976090, 0, '2018-10-24 15:40:48', 0, 0, 5),
(311, 113, '0000-00-00 00:00:00', 'Darkan-prezentacja- kopia', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 7246057, 0, '2018-10-29 15:07:47', 0, 0, 5),
(313, 125, '2018-10-24 13:50:35', 'Zmienne', 'sk00', '860x500', '2.0.0', '2018-10-24 13:50:35', 307706, 0, '2018-10-24 20:40:12', 0, 0, 5),
(314, 125, '2018-10-24 18:54:28', 'Triggery informacje podstawowe', 'sk00', '860x500', '2.0.0', '2018-10-24 18:54:28', 195826, 0, '2018-10-29 14:20:43', 0, 0, 5),
(316, 125, '0000-00-00 00:00:00', 'Film 33 Punktacja', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 481043, 0, '2019-02-09 17:10:03', 0, 0, 5),
(318, 125, '2018-10-29 13:22:24', 'Film 22 Linia czasu Rozwinięcie', 'sk00', '860x500', '2.0.0', '2018-10-29 13:22:24', 192122, 0, '2018-12-08 16:41:47', 0, 0, 5),
(319, 125, '0000-00-00 00:00:00', 'Punktacja- kopia', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 480513, 0, '2019-02-09 15:32:40', 0, 0, 5),
(320, 113, '2018-10-30 09:00:10', 'Nowy projekt', 'sk00', '860x500', '2.0.0', '2018-10-30 09:00:10', 1675035, 0, '2018-11-28 18:52:46', 0, 0, 5),
(322, 125, '0000-00-00 00:00:00', 'Projekt testowy do filmów- kopia', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 10868524, 0, '2018-10-30 14:29:10', 0, 0, 5),
(323, 125, '2018-10-30 12:29:33', 'Film 32', 'sk00', '860x500', '2.0.0', '2018-10-30 12:29:33', 293388, 0, '2018-12-05 11:56:05', 0, 0, 5),
(324, 113, '2018-11-17 11:51:32', 'Szablony', 'sk00', '860x500', '2.0.0', '2018-11-17 11:51:32', 6185439, 0, '2018-11-18 18:51:36', 0, 0, 5),
(325, 3, '0000-00-00 00:00:00', 'Zasoby ludzkie- kopia', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 5125635, 0, '2019-01-07 12:13:04', 0, 0, 5),
(326, 3, '0000-00-00 00:00:00', 'Drogowskazy sprzedaży- kopia', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 4793603, 0, '2018-11-27 10:14:54', 0, 0, 5),
(327, 3, '0000-00-00 00:00:00', 'Style życia w Polsce- kopia', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 9237146, 0, '2018-11-27 09:38:06', 0, 0, 5),
(328, 3, '0000-00-00 00:00:00', 'Jakość opieki i bezpieczeństwo pacjenta- kopia', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 5490854, 0, '2018-11-27 10:13:54', 0, 0, 5),
(329, 3, '0000-00-00 00:00:00', 'Bezpieczeństwo transakcji w internecie- kopia', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 10782365, 0, '2019-02-04 14:34:18', 0, 0, 5),
(332, 125, '2018-11-22 11:34:04', 'Film 6 Lewy pasek omówienie', 'sk00', '860x500', '2.0.0', '2018-11-22 11:34:04', 64827, 0, '2018-11-23 11:26:29', 0, 0, 5),
(333, 113, '2018-11-23 13:48:41', 'Cyberbezpieczenstwo', 'sk00', '860x500', '2.0.0', '2018-11-23 13:48:41', 166030672, 0, '2018-12-19 17:44:32', 0, 0, 5),
(334, 3, '0000-00-00 00:00:00', 'Style życia w Polsce- kopia', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 11328205, 0, '0000-00-00 00:00:00', 0, 0, 5),
(335, 3, '0000-00-00 00:00:00', 'Zasoby ludzkie- kopia', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 5634537, 0, '0000-00-00 00:00:00', 0, 0, 5),
(336, 3, '0000-00-00 00:00:00', 'Jakość opieki i bezpieczeństwo pacjenta- kopia', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 8596127, 0, '0000-00-00 00:00:00', 0, 0, 5),
(337, 3, '0000-00-00 00:00:00', 'Drogowskazy sprzedaży- kopia', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 10808864, 0, '0000-00-00 00:00:00', 0, 0, 5),
(338, 3, '0000-00-00 00:00:00', 'Bezpieczeństwo transakcji w internecie- kopia', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 45119859, 0, '0000-00-00 00:00:00', 0, 0, 5),
(339, 113, '2018-11-27 08:00:38', 'Ćwiczenie', 'sk00', '860x500', '2.0.0', '2018-11-27 08:00:38', 149329, 0, '2019-02-04 14:25:10', 0, 0, 5),
(341, 125, '2018-11-28 12:05:07', 'Film 11', 'sk00', '860x500', '2.0.0', '2018-11-28 12:05:07', 23466, 0, '2018-11-28 14:05:36', 0, 0, 5),
(342, 125, '2018-11-28 12:06:03', 'Film 11', 'sk00', '860x500', '2.0.0', '2018-11-28 12:06:03', 23466, 0, '2018-11-28 14:06:33', 0, 0, 5),
(343, 125, '2018-11-28 12:08:31', 'Projekt testowy', 'sk00', '860x500', '2.0.0', '2018-11-28 12:08:31', 630173, 0, '2018-12-10 19:38:10', 0, 0, 5),
(344, 125, '2018-11-28 12:49:32', 'Film 12', 'sk00', '860x500', '2.0.0', '2018-11-28 12:49:32', 541928, 0, '2018-11-28 15:03:07', 0, 0, 5),
(345, 29, '2018-11-29 08:45:42', 'nowa', 'sk00', '860x500', '2.0.0', '2018-11-29 08:45:42', 219847, 0, '2018-11-29 13:02:42', 0, 0, 5),
(346, 113, '2018-11-29 11:28:35', 'Licznik czasu', 'sk00', '860x500', '2.0.0', '2018-11-29 11:28:35', 325872, 0, '2018-12-11 13:31:48', 0, 0, 5),
(347, 113, '2018-11-29 12:42:24', 'LICZNIK', 'sk00', '860x500', '2.0.0', '2018-11-29 12:42:24', 163381, 0, '2018-12-05 20:51:19', 0, 0, 5),
(348, 113, '0000-00-00 00:00:00', 'Cyberbezpieczenstwo- kopia', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 168992135, 0, '0000-00-00 00:00:00', 0, 0, 5),
(349, 125, '0000-00-00 00:00:00', 'Film 39', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 304407, 0, '2018-12-10 14:56:38', 0, 0, 5),
(350, 125, '2018-12-10 13:00:38', 'Dodawanie szablonów', 'sk00', '860x500', '2.0.0', '2018-12-10 13:00:38', 64827, 0, '2018-12-10 19:38:31', 0, 0, 5),
(351, 125, '2018-12-11 11:32:03', 'Film 41', 'sk00', '860x500', '2.0.0', '2018-12-11 11:32:03', 1780974, 0, '2018-12-12 14:21:58', 0, 0, 5),
(352, 29, '2018-12-14 16:00:28', 'starter', 'sk00', '860x500', '2.0.0', '2018-12-14 16:00:28', 1186595, 0, '2018-12-14 18:08:26', 0, 0, 5),
(353, 125, '0000-00-00 00:00:00', 'Zarządzenie zasobami ludzkimi', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 5129048, 0, '2019-02-05 14:09:20', 0, 0, 5),
(354, 125, '0000-00-00 00:00:00', 'Oferta handlowa', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 5494665, 0, '2019-01-27 17:55:11', 0, 0, 5),
(355, 125, '2018-12-18 18:00:49', 'Film 13', 'sk00', '860x500', '2.0.0', '2018-12-18 18:00:49', 331114, 0, '2018-12-20 22:41:09', 0, 0, 5),
(356, 125, '2018-12-18 18:02:00', 'Film 18', 'sk00', '860x500', '2.0.0', '2018-12-18 18:02:00', 223792, 0, '2018-12-20 15:05:30', 0, 0, 5),
(357, 125, '2018-12-18 18:05:09', 'Propaganda 1', 'sk00', '860x500', '2.0.0', '2018-12-18 18:05:09', 0, 0, '2018-12-18 18:05:09', 0, 0, 5),
(358, 125, '2018-12-18 18:05:29', 'Propaganda 2', 'sk00', '860x500', '2.0.0', '2018-12-18 18:05:29', 0, 0, '2018-12-18 18:05:29', 0, 0, 5),
(359, 125, '2018-12-18 18:05:48', 'Propaganda 3', 'sk00', '860x500', '2.0.0', '2018-12-18 18:05:48', 0, 0, '2018-12-18 18:05:48', 0, 0, 5),
(360, 113, '0000-00-00 00:00:00', 'Wyniki', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 846947, 0, '2018-12-19 17:42:44', 0, 0, 5),
(362, 125, '0000-00-00 00:00:00', 'Bezpieczeństwo transakcji w internecie', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 20160042, 0, '2019-02-13 21:11:13', 0, 0, 5),
(364, 125, '0000-00-00 00:00:00', 'Zasoby ludzkie', 'sk01', '860x500', '2.0.0', '0000-00-00 00:00:00', 5125636, 0, '2019-02-09 17:19:16', 0, 0, 5),
(365, 113, '2019-01-24 22:09:32', 'SZPITAL', 'sk00', '860x500', '2.0.0', '2019-01-24 22:09:32', 3063357, 0, '2019-02-07 18:06:57', 0, 0, 5),
(366, 29, '2019-01-30 22:03:12', 'test-krzyzowka', 'sk00', '860x500', '2.0.0', '2019-01-30 22:03:12', 1115087, 0, '2019-01-31 23:36:05', 0, 0, 5),
(367, 125, '2019-02-04 11:11:00', 'Film 34', 'sk00', '860x500', '2.0.0', '2019-02-04 11:11:00', 313545, 0, '2019-02-09 15:10:44', 0, 0, 5);

-- --------------------------------------------------------

--
-- Table structure for table `projects_deleted`
--

CREATE TABLE `projects_deleted` (
  `id` int(10) UNSIGNED NOT NULL,
  `project_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `external` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `projects_demos`
--

CREATE TABLE `projects_demos` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `project_id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `dimentions` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `skin` varchar(255) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `size` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `project_version`
--

CREATE TABLE `project_version` (
  `id` int(10) UNSIGNED NOT NULL,
  `project_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `date` datetime NOT NULL,
  `dir` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `description` varchar(1000) COLLATE utf8_unicode_ci NOT NULL DEFAULT '',
  `size` int(11) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `project_version`
--

INSERT INTO `project_version` (`id`, `project_id`, `user_id`, `date`, `dir`, `description`, `size`) VALUES
(1, 77, 3, '2017-12-17 13:34:51', '2017_12_17_13_34_51', '', 6215140),
(2, 96, 3, '2018-01-06 17:56:33', '2018_01_06_17_56_34', '', 21669906),
(3, 162, 112, '2018-06-16 08:47:40', '2018_06_16_08_47_40', '', 12039042),
(4, 162, 112, '2018-06-16 10:27:21', '2018_06_16_10_27_24', '', 12860422),
(5, 162, 112, '2018-06-16 10:47:38', '2018_06_16_10_47_38', '', 20009571),
(22, 165, 103, '2018-06-20 08:32:36', '2018_06_20_08_32_36', '', 67831859),
(23, 165, 103, '2018-06-20 09:44:06', '2018_06_20_09_44_27', '', 75284892),
(24, 165, 103, '2018-06-20 11:42:29', '2018_06_20_11_42_30', '', 105574939),
(25, 169, 29, '2018-06-25 17:25:55', '2018_06_25_17_25_57', '', 11513934),
(26, 165, 29, '2018-06-26 09:10:58', '2018_06_26_09_10_46', '', 103087363),
(27, 173, 103, '2018-06-27 08:19:39', '2018_06_27_08_19_39', '', 13834094),
(28, 165, 29, '2018-06-27 08:20:40', '2018_06_27_08_20_43', '', 105559545),
(29, 165, 103, '2018-06-27 13:03:52', '2018_06_27_13_03_55', '', 105633779),
(30, 175, 103, '2018-06-27 15:39:31', '2018_06_27_15_39_30', '', 1977300),
(31, 175, 103, '2018-06-27 15:58:02', '2018_06_27_15_58_02', '', 3056662),
(32, 175, 29, '2018-06-28 05:25:51', '2018_06_28_05_25_57', '', 2753428),
(33, 172, 29, '2018-06-28 06:14:44', '2018_06_28_06_14_51', '', 1406139),
(34, 169, 29, '2018-06-28 12:44:37', '2018_06_28_12_44_37', '', 11512192),
(35, 169, 29, '2018-06-28 15:12:27', '2018_06_28_15_12_30', '', 11436962),
(36, 166, 29, '2018-07-14 22:45:12', '2018_07_14_23_45_13', '', 48362146),
(37, 165, 29, '2018-07-18 13:51:44', '2018_07_18_13_51_48', '', 110203300),
(38, 237, 125, '2018-08-01 13:12:10', '2018_08_01_13_12_11', '', 3756171),
(39, 236, 125, '2018-08-01 15:50:34', '2018_08_01_15_50_36', '', 616725),
(40, 236, 125, '2018-08-24 14:22:17', '2018_08_24_14_22_19', '', 675853),
(41, 166, 29, '2018-08-27 10:51:17', '2018_08_27_10_51_17', '', 48464600),
(42, 82, 3, '2018-11-18 09:55:24', '2018_11_18_09_55_28', '', 10203774),
(43, 95, 3, '2018-11-18 09:59:53', '2018_11_18_09_59_56', '', 17488647),
(44, 88, 3, '2018-11-18 10:02:27', '2018_11_18_10_02_30', '', 1857196),
(45, 87, 3, '2018-11-18 10:04:11', '2018_11_18_10_04_15', '', 2483359),
(46, 85, 3, '2018-11-18 10:05:19', '2018_11_18_10_05_22', '', 2566962),
(47, 84, 3, '2018-11-18 10:07:03', '2018_11_18_10_07_06', '', 7365205),
(48, 94, 3, '2018-11-18 10:08:50', '2018_11_18_10_08_54', '', 5079272),
(49, 89, 3, '2018-11-18 10:11:14', '2018_11_18_10_11_17', '', 938780),
(50, 86, 3, '2018-11-18 10:19:43', '2018_11_18_10_19_46', '', 2657539),
(51, 93, 3, '2018-11-18 10:34:38', '2018_11_18_10_34_42', '', 4177788),
(52, 100, 3, '2018-11-27 07:32:25', '2018_11_27_07_32_25', '', 9949994),
(53, 333, 113, '2018-12-05 17:52:45', '2018_12_05_17_52_46', '', 52874298),
(54, 333, 113, '2018-12-06 11:38:23', '2018_12_06_11_38_27', '', 54010216),
(56, 362, 125, '2019-02-05 10:44:04', '2019_02_05_10_44_05', '', 9100681);

-- --------------------------------------------------------

--
-- Table structure for table `promo_codes`
--

CREATE TABLE `promo_codes` (
  `id` int(10) UNSIGNED NOT NULL,
  `code` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `limit` int(11) NOT NULL DEFAULT '1',
  `rabat` int(11) NOT NULL DEFAULT '10',
  `start_date` datetime NOT NULL,
  `expiration_date` datetime NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '1',
  `limit_enabled` tinyint(4) NOT NULL DEFAULT '1',
  `date_enabled` tinyint(4) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `promo_codes`
--

INSERT INTO `promo_codes` (`id`, `code`, `limit`, `rabat`, `start_date`, `expiration_date`, `active`, `limit_enabled`, `date_enabled`, `created_at`, `updated_at`) VALUES
(1, '*', 1, 0, '2016-09-18 11:16:04', '2016-09-18 11:16:05', 1, 1, 1, NULL, NULL),
(2, 'darkan', 100, 0, '2017-04-11 21:47:31', '2017-04-21 21:47:34', 1, 1, 1, '2017-04-10 19:47:49', '2017-04-10 19:47:49');

-- --------------------------------------------------------

--
-- Table structure for table `promo_codes_to_users`
--

CREATE TABLE `promo_codes_to_users` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `promo_code_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `reselers_to_distributors`
--

CREATE TABLE `reselers_to_distributors` (
  `id` int(10) UNSIGNED NOT NULL,
  `reseler_id` int(10) UNSIGNED NOT NULL,
  `distributor_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `reselers_to_distributors`
--

INSERT INTO `reselers_to_distributors` (`id`, `reseler_id`, `distributor_id`) VALUES
(1, 41, 40);

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `display_name` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci DEFAULT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '1',
  `order` int(11) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`id`, `name`, `display_name`, `description`, `active`, `order`, `created_at`, `updated_at`) VALUES
(1, 'owner', 'Project Owner', 'User is the owner of a given project', 1, 0, NULL, NULL),
(2, 'admin', 'User Administrator', 'User is allowed to manage and edit other users', 1, 0, NULL, NULL),
(3, 'user', 'User', 'User is allowed to visit page', 1, 0, NULL, NULL),
(4, 'creator', 'Creator', '', 1, 0, NULL, NULL),
(5, 'affiliate', 'Affiliate', '', 1, 0, NULL, NULL),
(6, 'distributor', 'Distributor', '', 1, 0, NULL, NULL),
(7, 'partner', 'Partner', '', 1, 0, NULL, NULL),
(8, 'superadmin', 'Superadmin', '', 1, 0, NULL, NULL),
(9, 'reseler', 'Reseler', '', 1, 0, NULL, NULL),
(10, 'registered', 'Registered', '', 1, 0, NULL, NULL),
(11, 'lms', 'lms', 'Lms user', 1, 0, NULL, NULL),
(12, 'api', 'api', 'Api admin user', 1, 0, NULL, NULL),
(13, 'testdrive', 'Test Drive', 'Test Drive user', 1, 0, NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `role_user`
--

CREATE TABLE `role_user` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `role_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `role_user`
--

INSERT INTO `role_user` (`user_id`, `role_id`) VALUES
(1, 2),
(2, 2),
(29, 2),
(9, 3),
(10, 3),
(11, 3),
(12, 3),
(13, 3),
(14, 3),
(15, 3),
(16, 3),
(17, 3),
(18, 3),
(19, 3),
(20, 3),
(21, 3),
(22, 3),
(23, 3),
(24, 3),
(25, 3),
(26, 3),
(27, 3),
(28, 3),
(32, 3),
(33, 3),
(42, 3),
(45, 3),
(54, 3),
(55, 3),
(58, 3),
(62, 3),
(70, 3),
(72, 3),
(91, 3),
(96, 3),
(97, 3),
(98, 3),
(100, 3),
(101, 3),
(102, 3),
(103, 3),
(108, 3),
(109, 3),
(110, 3),
(111, 3),
(112, 3),
(113, 3),
(114, 3),
(115, 3),
(116, 3),
(117, 3),
(118, 3),
(119, 3),
(120, 3),
(121, 3),
(122, 3),
(124, 3),
(125, 3),
(129, 3),
(130, 3),
(131, 3),
(3, 4),
(4, 4),
(5, 4),
(104, 4),
(105, 4),
(106, 4),
(107, 4),
(40, 6),
(51, 6),
(41, 9),
(34, 10),
(35, 10),
(36, 10),
(38, 10),
(46, 10),
(47, 10),
(48, 10),
(49, 10),
(50, 10),
(56, 10),
(59, 10),
(67, 10),
(73, 10),
(74, 10),
(75, 10),
(76, 10),
(77, 10),
(78, 10),
(79, 10),
(80, 10),
(81, 10),
(82, 10),
(83, 10),
(84, 10),
(85, 10),
(87, 10),
(88, 10),
(99, 10),
(126, 10),
(127, 10),
(128, 10),
(132, 10),
(134, 10),
(39, 11),
(44, 11),
(133, 11),
(7, 12),
(8, 12),
(6, 13);

-- --------------------------------------------------------

--
-- Table structure for table `sales_coupons`
--

CREATE TABLE `sales_coupons` (
  `id` int(10) UNSIGNED NOT NULL,
  `code` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `sales_coupon_group_id` int(10) UNSIGNED NOT NULL,
  `plan_id` int(10) UNSIGNED NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `cost` decimal(10,2) NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '1',
  `downloaded` tinyint(4) NOT NULL DEFAULT '0',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sales_coupons`
--

INSERT INTO `sales_coupons` (`id`, `code`, `sales_coupon_group_id`, `plan_id`, `description`, `cost`, `active`, `downloaded`, `created_at`, `updated_at`) VALUES
(1, 'darkan_58af1f83bc547', 1, 1, '', 150.00, 1, 1, '2017-02-23 16:44:35', '2017-02-23 16:44:55'),
(2, 'darkan_58af1f83c7aeb', 1, 1, '', 150.00, 1, 1, '2017-02-23 16:44:35', '2017-02-23 16:44:55'),
(3, 'uyuyg58e6896469e6b', 1, 1, '', 0.00, 1, 0, '2017-04-06 18:31:00', '2017-04-06 18:31:00'),
(4, 'uyuyg58e689647ada3', 1, 1, '', 0.00, 1, 0, '2017-04-06 18:31:00', '2017-04-06 18:31:00'),
(5, 'uyuyg58e68964812f5', 1, 1, '', 0.00, 1, 0, '2017-04-06 18:31:00', '2017-04-06 18:31:00');

-- --------------------------------------------------------

--
-- Table structure for table `sales_coupons_groups`
--

CREATE TABLE `sales_coupons_groups` (
  `id` int(10) UNSIGNED NOT NULL,
  `name` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `description` varchar(255) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sales_coupons_groups`
--

INSERT INTO `sales_coupons_groups` (`id`, `name`, `description`) VALUES
(1, 'darkan', '');

-- --------------------------------------------------------

--
-- Table structure for table `scorm`
--

CREATE TABLE `scorm` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `course_id` int(10) UNSIGNED NOT NULL,
  `lesson_location` varchar(10) COLLATE utf8_unicode_ci NOT NULL,
  `lesson_status` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `session_time` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `total_time` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `score_raw` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `score_min` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `score_max` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `suspend_data` text COLLATE utf8_unicode_ci NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `scorm_data`
--

CREATE TABLE `scorm_data` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `course_id` int(10) UNSIGNED NOT NULL,
  `create_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `modify_date` datetime NOT NULL DEFAULT '0000-00-00 00:00:00',
  `data` text COLLATE utf8_unicode_ci NOT NULL,
  `course_status` varchar(20) COLLATE utf8_unicode_ci NOT NULL,
  `user_score` varchar(200) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `lesson_location` varchar(50) COLLATE utf8_unicode_ci NOT NULL DEFAULT '1',
  `page_time` varchar(256) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `mailing_login` varchar(256) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `score_max` double NOT NULL DEFAULT '0',
  `score_min` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `success_status` varchar(256) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0',
  `session_time` varchar(100) COLLATE utf8_unicode_ci NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `scorm_data`
--

INSERT INTO `scorm_data` (`id`, `user_id`, `course_id`, `create_date`, `modify_date`, `data`, `course_status`, `user_score`, `lesson_location`, `page_time`, `mailing_login`, `score_max`, `score_min`, `success_status`, `session_time`) VALUES
(11, 44, 15, '2017-04-12 13:45:04', '2017-04-12 13:45:23', '{\"uc\":[\"399e2a8e09546bf181ba201ffb5208f7\"],\"o\":[\"0,2,1,1\",\"0,1,2,1\",\"0,1,3,2\"],\"p\":[1,2,3],\"q\":{\"0,2,1\":{\"#0\":{\"c\":true},\"#1\":{\"c\":false}},\"0,1,2\":{\"#0\":{\"c\":true},\"#1\":{\"c\":false}},\"0,1,3\":{\"#0\":{\"choosen\":false},\"#1\":{\"choosen\":true}}},\"a\":{\"0,2,1\":\"1\",\"0,1,2\":\"1\",\"0,1,3\":\"1\"},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":\"20\"},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":30},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":\"67\"},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"3\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":3},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":null},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":2},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":3},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":1}],\"p\":[]},\"s\":{}}', 'passed', '20', '0', '{\"0\":5,\"1\":3,\"2\":3}', '0', 0, '0', '0', '0'),
(16, 3, 20, '2018-01-07 10:43:58', '2018-12-10 14:15:36', '{\"uc\":[\"743944b42841d5970fb91a33c2ca6f1b\",\"100e592df996dc55f46683401ada3fcc\"],\"o\":[\"0,10,66,1\"],\"p\":[57,58,59,60,61,62,63,64,65,66],\"q\":{\"0,11,66\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,10,66\":{\"#0\":{\"c\":true},\"#1\":{\"c\":false}},\"0,6,66\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,17,66\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,16,66\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,15,66\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,11,67\":{\"743944b42841d5970fb91a33c2ca6f1b-9-67\":[]}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"10\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":10},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":16},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":\"[2]\"},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":3},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":7},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":6}],\"p\":[{\"varhash\":\"7ae0e120f53d2bf180408e796e346925\",\"pvarname\":\"\",\"pvarvalue\":\"\"}]},\"s\":{}}', 'passed', '0', '8', '{\"0\":38,\"1\":12,\"2\":8,\"3\":15,\"4\":7,\"5\":266,\"6\":180,\"7\":7,\"8\":7,\"9\":14,\"10\":0,\"11\":0}', '0', 0, '0', '0', '0'),
(17, 3, 21, '2018-01-07 11:48:02', '2018-01-07 20:57:36', '{\"uc\":[\"9c414f98f84ad6129c6363d1ca1e42d8\"],\"o\":[],\"p\":[1,6,2,4,3,9,7,8,5],\"q\":{\"0,21,5\":{\"9c414f98f84ad6129c6363d1ca1e42d8-20-5\":[],\"9c414f98f84ad6129c6363d1ca1e42d8-19-5\":[]},\"0,10,10\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false}},\"0,9,10\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"9\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":11},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":23},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":\"[]\"},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":4},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":3},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":1}],\"p\":[]},\"s\":{}}', 'incomplete', '0', '8', '{\"0\":2,\"1\":16,\"2\":18,\"3\":7,\"4\":8,\"5\":8,\"6\":5,\"7\":4,\"8\":1,\"9\":0,\"10\":0}', '0', 0, '0', '0', '0'),
(18, 3, 22, '2018-01-07 11:50:08', '2018-01-07 12:26:39', '{\"uc\":[\"9c414f98f84ad6129c6363d1ca1e42d8\",\"100e592df996dc55f46683401ada3fcc\"],\"o\":[],\"p\":[2,5],\"q\":{\"0,21,21\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,16,21\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,8,22\":{\"9c414f98f84ad6129c6363d1ca1e42d8-6-22\":[],\"9c414f98f84ad6129c6363d1ca1e42d8-7-22\":[]},\"0,8,23\":{\"9c414f98f84ad6129c6363d1ca1e42d8-20-23\":[],\"9c414f98f84ad6129c6363d1ca1e42d8-19-23\":[]}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"2\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":13},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":5},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":null},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":3},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":4},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[]},\"s\":{}}', 'incomplete', '0', '1', '{\"0\":4,\"1\":6,\"2\":0,\"3\":0,\"4\":0,\"5\":0,\"6\":0,\"7\":0,\"8\":0,\"9\":0,\"10\":0,\"11\":0,\"12\":0}', '0', 0, '0', '0', '0'),
(19, 3, 23, '2018-01-07 11:53:35', '2018-01-07 12:27:44', '{\"uc\":[\"9c414f98f84ad6129c6363d1ca1e42d8\"],\"o\":[],\"p\":[1],\"q\":{\"0,2,6\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,12,6\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,13,6\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,2,13\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,12,13\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,13,13\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"1\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":12},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":19},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":null},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":3},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":6},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[]},\"s\":{}}', 'incomplete', '0', '0', '{\"0\":17,\"1\":0,\"2\":0,\"3\":0,\"4\":0,\"5\":0,\"6\":0,\"7\":0,\"8\":0,\"9\":0,\"10\":0,\"11\":0}', '0', 0, '0', '0', '0'),
(20, 3, 24, '2018-01-07 11:55:57', '2018-01-07 12:28:08', '{\"uc\":[\"9c414f98f84ad6129c6363d1ca1e42d8\",\"100e592df996dc55f46683401ada3fcc\"],\"o\":[],\"p\":[1],\"q\":{\"0,13,10\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false}},\"0,14,10\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false}},\"0,17,11\":{},\"0,37,12\":{\"9c414f98f84ad6129c6363d1ca1e42d8-20-12\":[],\"9c414f98f84ad6129c6363d1ca1e42d8-23-12\":[],\"9c414f98f84ad6129c6363d1ca1e42d8-19-12\":[]}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"1\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":12},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":4},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":null},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":3},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[]},\"s\":{}}', 'incomplete', '0', '0', '{\"0\":4,\"1\":0,\"2\":0,\"3\":0,\"4\":0,\"5\":0,\"6\":0,\"7\":0,\"8\":0,\"9\":0,\"10\":0,\"11\":0}', '0', 0, '0', '0', '0'),
(21, 3, 25, '2018-01-07 11:59:20', '2018-01-07 12:37:23', '{\"uc\":[\"100e592df996dc55f46683401ada3fcc\",\"743944b42841d5970fb91a33c2ca6f1b\",\"4660dd8e7fc437d901cf6c34bff8674f\"],\"o\":[],\"p\":[2],\"q\":{\"0,6,4\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"1,9,7\":{\"#0\":{\"choosen\":false},\"#1\":{\"choosen\":false}},\"1,4,8\":{\"743944b42841d5970fb91a33c2ca6f1b-8-8\":[]}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":2},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"1\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":9},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":12},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":null},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":2},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":3},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[{\"varhash\":\"76e903963302fa772d147b9ebba05687\",\"pvarname\":\"cwiczenie\",\"pvarvalue\":\"0\"},{\"varhash\":\"406eb52423ce5f9eb9d5889c952adc54\",\"pvarname\":\"a\",\"pvarvalue\":\"0\"}]},\"s\":{}}', 'incomplete', '0', '0', '{\"0\":6,\"1\":0,\"2\":0,\"3\":0,\"4\":0,\"5\":0,\"6\":0,\"7\":0,\"8\":0}', '0', 0, '0', '0', '0'),
(22, 3, 26, '2018-01-07 12:12:36', '2018-01-11 18:01:40', '{\"uc\":[\"9c414f98f84ad6129c6363d1ca1e42d8\",\"100e592df996dc55f46683401ada3fcc\"],\"o\":[],\"p\":[5,46],\"q\":{\"0,44,41\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,35,41\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,34,41\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,33,41\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,32,41\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,8,41\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,29,40\":{\"9c414f98f84ad6129c6363d1ca1e42d8-23-40\":[],\"9c414f98f84ad6129c6363d1ca1e42d8-21-40\":[]}},\"a\":{\"0,29,40\":\"3\"},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"2\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":10},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":7},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":null},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":4},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":7},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[{\"varhash\":\"7ae0e120f53d2bf180408e796e346925\",\"pvarname\":\"\",\"pvarvalue\":\"\"}]},\"s\":{}}', 'incomplete', '0', '1', '{\"0\":53,\"1\":3,\"2\":0,\"3\":0,\"4\":0,\"5\":0,\"6\":0,\"7\":0,\"8\":0,\"9\":0}', '0', 0, '0', '0', '0'),
(23, 3, 27, '2018-01-07 12:13:58', '2018-01-07 12:40:02', '{\"uc\":[\"9c414f98f84ad6129c6363d1ca1e42d8\"],\"o\":[],\"p\":[1],\"q\":{\"0,21,5\":{\"9c414f98f84ad6129c6363d1ca1e42d8-20-5\":[],\"9c414f98f84ad6129c6363d1ca1e42d8-19-5\":[]},\"0,10,10\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false}},\"0,9,10\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"1\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":11},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":6},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":null},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":2},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":3},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[]},\"s\":{}}', 'incomplete', '0', '0', '{\"0\":179,\"1\":0,\"2\":0,\"3\":0,\"4\":0,\"5\":0,\"6\":0,\"7\":0,\"8\":0,\"9\":0,\"10\":0}', '0', 0, '0', '0', '0'),
(24, 3, 28, '2018-01-07 12:15:09', '2018-01-07 12:42:48', '{\"uc\":[\"9c414f98f84ad6129c6363d1ca1e42d8\",\"100e592df996dc55f46683401ada3fcc\"],\"o\":[],\"p\":[2],\"q\":{\"0,21,21\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,16,21\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,8,22\":{\"9c414f98f84ad6129c6363d1ca1e42d8-6-22\":[],\"9c414f98f84ad6129c6363d1ca1e42d8-7-22\":[]},\"0,8,23\":{\"9c414f98f84ad6129c6363d1ca1e42d8-20-23\":[],\"9c414f98f84ad6129c6363d1ca1e42d8-19-23\":[]}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"1\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":13},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":5},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":null},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":4},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[]},\"s\":{}}', 'incomplete', '0', '0', '{\"0\":0,\"1\":0,\"2\":0,\"3\":0,\"4\":0,\"5\":0,\"6\":0,\"7\":0,\"8\":0,\"9\":0,\"10\":0,\"11\":0,\"12\":0}', '0', 0, '0', '0', '0'),
(25, 3, 29, '2018-01-07 12:17:08', '2018-01-07 12:42:53', '{\"uc\":[\"9c414f98f84ad6129c6363d1ca1e42d8\"],\"o\":[],\"p\":[1],\"q\":{\"0,2,6\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,12,6\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,13,6\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,2,13\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,12,13\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,13,13\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"1\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":12},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":19},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":null},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":3},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":6},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[]},\"s\":{}}', 'incomplete', '0', '0', '{\"0\":1515324201,\"1\":0,\"2\":0,\"3\":0,\"4\":0,\"5\":0,\"6\":0,\"7\":0,\"8\":0,\"9\":0,\"10\":0,\"11\":0}', '0', 0, '0', '0', '0'),
(26, 3, 30, '2018-01-07 12:20:30', '2018-01-07 12:56:00', '{\"uc\":[\"9c414f98f84ad6129c6363d1ca1e42d8\"],\"o\":[],\"p\":[1],\"q\":{\"0,13,10\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false}},\"0,14,10\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false}},\"0,17,11\":{},\"0,37,12\":{\"9c414f98f84ad6129c6363d1ca1e42d8-20-12\":[],\"9c414f98f84ad6129c6363d1ca1e42d8-23-12\":[],\"9c414f98f84ad6129c6363d1ca1e42d8-19-12\":[]}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"1\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":12},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":4},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":null},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":3},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[]},\"s\":{}}', 'incomplete', '0', '0', '{\"0\":956,\"1\":0,\"2\":0,\"3\":0,\"4\":0,\"5\":0,\"6\":0,\"7\":0,\"8\":0,\"9\":0,\"10\":0,\"11\":0}', '0', 0, '0', '0', '0'),
(27, 3, 31, '2018-01-07 12:22:09', '2018-01-07 20:57:37', '{\"uc\":[\"100e592df996dc55f46683401ada3fcc\",\"743944b42841d5970fb91a33c2ca6f1b\",\"4660dd8e7fc437d901cf6c34bff8674f\"],\"o\":[\"0,13,6,1\",\"1,4,8,1\",\"0,2,10,1\"],\"p\":[2,3,4,5,6,8,9,10],\"q\":{\"1,4,8\":{\"743944b42841d5970fb91a33c2ca6f1b-8-8\":[\"743944b42841d5970fb91a33c2ca6f1b-9-8\"]}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"8\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":8},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":3},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":\"[1]\"},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[{\"varhash\":\"76e903963302fa772d147b9ebba05687\",\"pvarname\":\"cwiczenie\",\"pvarvalue\":\"1\"}]},\"s\":{}}', 'passed', '0', '7', '{\"0\":8,\"1\":7,\"2\":15,\"3\":5,\"4\":10,\"5\":9,\"6\":8,\"7\":4}', '0', 0, '0', '0', '0'),
(28, 29, 20, '2018-01-07 18:16:16', '2018-12-10 14:16:41', '{\"uc\":[\"743944b42841d5970fb91a33c2ca6f1b\",\"100e592df996dc55f46683401ada3fcc\"],\"o\":[],\"p\":[57,58,59,60,61],\"q\":{\"0,11,66\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,10,66\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,6,66\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,17,66\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,16,66\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,15,66\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,11,67\":{\"743944b42841d5970fb91a33c2ca6f1b-9-67\":[]}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"5\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":10},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":37},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":\"[1]\"},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":13},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":7},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[{\"varhash\":\"7ae0e120f53d2bf180408e796e346925\",\"pvarname\":\"\",\"pvarvalue\":\"\"}]},\"s\":{}}', 'passed', '0', '4', '{\"0\":37,\"1\":9,\"2\":7,\"3\":8,\"4\":144,\"5\":255,\"6\":179,\"7\":5,\"8\":5,\"9\":1,\"10\":0,\"11\":0}', '0', 0, '0', '0', '0'),
(29, 29, 23, '2018-01-07 18:17:35', '2018-01-07 18:17:39', '{\"uc\":[\"9c414f98f84ad6129c6363d1ca1e42d8\"],\"o\":[],\"p\":[1],\"q\":{\"0,2,6\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,12,6\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,13,6\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,2,13\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,12,13\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,13,13\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"1\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":12},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":19},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":null},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":3},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":6},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[]},\"s\":{}}', 'incomplete', '0', '0', '{\"0\":3,\"1\":0,\"2\":0,\"3\":0,\"4\":0,\"5\":0,\"6\":0,\"7\":0,\"8\":0,\"9\":0,\"10\":0,\"11\":0}', '0', 0, '0', '0', '0'),
(30, 29, 31, '2018-01-07 20:39:56', '2018-01-07 20:41:02', '{\"uc\":[\"100e592df996dc55f46683401ada3fcc\",\"743944b42841d5970fb91a33c2ca6f1b\",\"4660dd8e7fc437d901cf6c34bff8674f\"],\"o\":[\"0,13,6,1\",\"1,4,8,1\"],\"p\":[2,3,4,5,6,8,9,10],\"q\":{\"1,4,8\":{\"743944b42841d5970fb91a33c2ca6f1b-8-8\":[\"743944b42841d5970fb91a33c2ca6f1b-9-8\"]}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"7\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":8},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":14},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":\"[1]\"},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":5},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[{\"varhash\":\"76e903963302fa772d147b9ebba05687\",\"pvarname\":\"cwiczenie\",\"pvarvalue\":\"1\"}]},\"s\":{}}', 'passed', '0', '6', '{\"0\":8,\"1\":7,\"2\":15,\"3\":5,\"4\":10,\"5\":9,\"6\":8,\"7\":0}', '0', 0, '0', '0', '0'),
(31, 29, 21, '2018-01-07 20:41:20', '2018-12-19 10:52:38', '{\"uc\":[\"743944b42841d5970fb91a33c2ca6f1b\",\"9c414f98f84ad6129c6363d1ca1e42d8\"],\"o\":[],\"p\":[13,14,15,16],\"q\":{\"0,35,21\":{\"743944b42841d5970fb91a33c2ca6f1b-34-21\":[],\"743944b42841d5970fb91a33c2ca6f1b-33-21\":[]},\"1,10,22\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false}},\"1,9,22\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"4\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":11},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":7},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":null},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":3},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":3},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[]},\"s\":{}}', 'incomplete', '0', '3', '{\"0\":6,\"1\":20,\"2\":21,\"3\":27,\"4\":8,\"5\":8,\"6\":5,\"7\":4,\"8\":0,\"9\":0,\"10\":0}', '0', 0, '0', '0', '0'),
(35, 54, 24, '2018-02-12 09:31:27', '2018-02-12 10:07:44', '{\"uc\":[\"9c414f98f84ad6129c6363d1ca1e42d8\",\"100e592df996dc55f46683401ada3fcc\"],\"o\":[],\"p\":[1,5,2,3,4,6,8,9,10],\"q\":{\"0,13,10\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false}},\"0,14,10\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false}},\"0,17,11\":{},\"0,37,12\":{\"9c414f98f84ad6129c6363d1ca1e42d8-20-12\":[],\"9c414f98f84ad6129c6363d1ca1e42d8-23-12\":[],\"9c414f98f84ad6129c6363d1ca1e42d8-19-12\":[]}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"8\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":12},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":6},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":null},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":2},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":3},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[]},\"s\":{}}', 'incomplete', '0', '7', '{\"0\":4,\"1\":12,\"2\":15,\"3\":1,\"4\":2,\"5\":2,\"6\":1,\"7\":317,\"8\":3,\"9\":0,\"10\":0,\"11\":0}', '0', 0, '0', '0', '0'),
(38, 103, 38, '2018-05-24 14:59:48', '2018-05-24 15:01:47', '{\"uc\":[\"e7b24ec3b1aa58845f3150644d6a5c88\"],\"o\":[],\"p\":[1],\"q\":{},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"1\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":4},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":null},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[]},\"s\":{}}', 'passed', '0', '0', '{\"0\":15}', '0', 0, '0', '0', '0');
INSERT INTO `scorm_data` (`id`, `user_id`, `course_id`, `create_date`, `modify_date`, `data`, `course_status`, `user_score`, `lesson_location`, `page_time`, `mailing_login`, `score_max`, `score_min`, `success_status`, `session_time`) VALUES
(39, 112, 40, '2018-06-16 10:54:10', '2018-06-16 10:56:46', '{\"uc\":[\"ff82b34b52049937fb82ce2c50129e8a\",\"9c414f98f84ad6129c6363d1ca1e42d8\",\"e590551c9cc0f1dc3fd33dceb14adea8\",\"4660dd8e7fc437d901cf6c34bff8674f\",\"100e592df996dc55f46683401ada3fcc\"],\"o\":[],\"p\":[4,7],\"q\":{},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"2\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":14},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":2},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":null},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[{\"varhash\":\"59ba0879c2b522a0ecb646bac2181132\",\"pvarname\":\"todoist\",\"pvarvalue\":\"0\"},{\"varhash\":\"6918a531d080cd95fc7bd51daf3289b5\",\"pvarname\":\"photopea\",\"pvarvalue\":\"0\"},{\"varhash\":\"f830594b77c991d3803c88c8de167d3b\",\"pvarname\":\"biteable\",\"pvarvalue\":\"0\"},{\"varhash\":\"4208694fda360930020b2fe892a57f8b\",\"pvarname\":\"trello\",\"pvarvalue\":\"0\"},{\"varhash\":\"8b8c71ee4700dd7d5ee2c014bde9220d\",\"pvarname\":\"google apps\",\"pvarvalue\":\"0\"},{\"varhash\":\"c5be4f19dc20e77fd95d9a027317a544\",\"pvarname\":\"lucidchart\",\"pvarvalue\":\"0\"}]},\"s\":{}}', 'incomplete', '0', '1', '{\"0\":40,\"1\":9,\"2\":0,\"3\":0,\"4\":0,\"5\":0,\"6\":0,\"7\":0,\"8\":0,\"9\":0,\"10\":0,\"11\":0,\"12\":0,\"13\":0}', '0', 0, '0', '0', '0'),
(41, 29, 42, '2018-06-26 10:09:44', '2018-07-14 23:37:46', '{\"uc\":[\"ff82b34b52049937fb82ce2c50129e8a\"],\"o\":[],\"p\":[3,1,2,4,5,6],\"q\":{},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"6\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":4},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":\"[2]\"},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[{\"varhash\":\"52ba8edc4c24368c80e1223ccb2a0976\",\"pvarname\":\"telefon\",\"pvarvalue\":\"Huawei P20 lite Dual SIM\"},{\"varhash\":\"37afa414e3e2d73d07d8bcf1ce564915\",\"pvarname\":\"dodatkowy_internet\",\"pvarvalue\":\"Advence\"}]},\"s\":{}}', 'passed', '0', '5', '{\"0\":8,\"1\":13,\"2\":1,\"3\":5,\"4\":8,\"5\":81}', '0', 0, '0', '0', '0'),
(43, 29, 44, '2018-06-27 09:24:19', '2018-06-27 09:24:59', '{\"uc\":[\"e7b24ec3b1aa58845f3150644d6a5c88\",\"100e592df996dc55f46683401ada3fcc\",\"743944b42841d5970fb91a33c2ca6f1b\",\"4660dd8e7fc437d901cf6c34bff8674f\"],\"o\":[],\"p\":[2],\"q\":{\"2,9,7\":{\"#0\":{\"choosen\":false},\"#1\":{\"choosen\":false}},\"2,4,8\":{\"743944b42841d5970fb91a33c2ca6f1b-8-8\":[]}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":2},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"1\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":13},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":13},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":null},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":2},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":2},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[{\"varhash\":\"76e903963302fa772d147b9ebba05687\",\"pvarname\":\"cwiczenie\",\"pvarvalue\":\"0\"},{\"varhash\":\"406eb52423ce5f9eb9d5889c952adc54\",\"pvarname\":\"a\",\"pvarvalue\":\"0\"}]},\"s\":{}}', 'incomplete', '0', '0', '{\"0\":35,\"1\":0,\"2\":0,\"3\":0,\"4\":0,\"5\":0,\"6\":0,\"7\":0,\"8\":0,\"9\":0,\"10\":0,\"11\":0,\"12\":0}', '0', 0, '0', '0', '0'),
(44, 54, 20, '2018-07-03 13:35:20', '2018-07-25 11:51:12', '{\"uc\":[\"9c414f98f84ad6129c6363d1ca1e42d8\",\"100e592df996dc55f46683401ada3fcc\"],\"o\":[],\"p\":[5,46,12,14,29,34,37,41,40,45],\"q\":{\"0,44,41\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,35,41\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,34,41\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,33,41\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,32,41\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,8,41\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,29,40\":{\"9c414f98f84ad6129c6363d1ca1e42d8-23-40\":[\"9c414f98f84ad6129c6363d1ca1e42d8-37-40\"],\"9c414f98f84ad6129c6363d1ca1e42d8-21-40\":[\"9c414f98f84ad6129c6363d1ca1e42d8-35-40\"]}},\"a\":{\"0,29,40\":2},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"2\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":10},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":7},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":\"[pole tekstowe 1]\"},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":4},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":7},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[{\"varhash\":\"7ae0e120f53d2bf180408e796e346925\",\"pvarname\":\"\",\"pvarvalue\":\"\"}]},\"s\":{}}', 'passed', '0', '0', '{\"0\":150,\"1\":37,\"2\":2,\"3\":2,\"4\":2,\"5\":5,\"6\":5,\"7\":2,\"8\":30,\"9\":3}', '0', 0, '0', '0', '0'),
(45, 54, 21, '2018-07-05 10:37:24', '2018-07-11 08:55:00', '{\"uc\":[\"9c414f98f84ad6129c6363d1ca1e42d8\"],\"o\":[],\"p\":[1,6,2,4,3,9,7],\"q\":{\"0,21,5\":{\"9c414f98f84ad6129c6363d1ca1e42d8-20-5\":[],\"9c414f98f84ad6129c6363d1ca1e42d8-19-5\":[]},\"0,10,10\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false}},\"0,9,10\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"7\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":11},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":9},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":\"[]\"},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":2},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":3},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[]},\"s\":{}}', 'incomplete', '0', '6', '{\"0\":23,\"1\":17,\"2\":13,\"3\":21,\"4\":49,\"5\":1,\"6\":4,\"7\":0,\"8\":0,\"9\":0,\"10\":0}', '0', 0, '0', '0', '0'),
(46, 54, 25, '2018-07-20 17:28:02', '2018-07-29 23:05:04', '{\"uc\":[\"100e592df996dc55f46683401ada3fcc\",\"743944b42841d5970fb91a33c2ca6f1b\",\"4660dd8e7fc437d901cf6c34bff8674f\"],\"o\":[\"0,6,4,1\"],\"p\":[2,3,4,5],\"q\":{\"0,6,4\":{\"#0\":{\"c\":true},\"#1\":{\"c\":false}},\"1,9,7\":{\"#0\":{\"choosen\":false},\"#1\":{\"choosen\":false}},\"1,4,8\":{\"743944b42841d5970fb91a33c2ca6f1b-8-8\":[]}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":2},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"2\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":9},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":16},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":null},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":2},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":3},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[{\"varhash\":\"76e903963302fa772d147b9ebba05687\",\"pvarname\":\"cwiczenie\",\"pvarvalue\":\"0\"},{\"varhash\":\"406eb52423ce5f9eb9d5889c952adc54\",\"pvarname\":\"a\",\"pvarvalue\":\"0\"}]},\"s\":{}}', 'incomplete', '0', '1', '{\"0\":53,\"1\":8,\"2\":10,\"3\":0,\"4\":0,\"5\":0,\"6\":0,\"7\":0,\"8\":0}', '0', 0, '0', '0', '0'),
(47, 6, 20, '2018-07-25 14:00:19', '2018-07-25 14:11:29', '{\"uc\":[\"9c414f98f84ad6129c6363d1ca1e42d8\",\"100e592df996dc55f46683401ada3fcc\"],\"o\":[],\"p\":[5,46,12,14,29,34,37,41,40,45],\"q\":{\"0,44,41\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,35,41\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,34,41\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,33,41\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,32,41\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,8,41\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,29,40\":{\"9c414f98f84ad6129c6363d1ca1e42d8-23-40\":[],\"9c414f98f84ad6129c6363d1ca1e42d8-21-40\":[]}},\"a\":{\"0,29,40\":\"3\"},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"10\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":10},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":2},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":\"[bezpieczne strony]\"},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":7},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[{\"varhash\":\"7ae0e120f53d2bf180408e796e346925\",\"pvarname\":\"\",\"pvarvalue\":\"\"}]},\"s\":{}}', 'passed', '0', '9', '{\"0\":25,\"1\":15,\"2\":7,\"3\":49,\"4\":11,\"5\":13,\"6\":5,\"7\":3,\"8\":4,\"9\":312}', '0', 0, '0', '0', '0'),
(48, 6, 25, '2018-07-25 14:01:35', '2018-07-25 14:11:30', '{\"uc\":[\"100e592df996dc55f46683401ada3fcc\",\"743944b42841d5970fb91a33c2ca6f1b\",\"4660dd8e7fc437d901cf6c34bff8674f\"],\"o\":[\"0,13,3,1\"],\"p\":[2,3,4,5,6,7,8],\"q\":{\"0,6,4\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"1,9,7\":{\"#0\":{\"choosen\":false},\"#1\":{\"choosen\":false}},\"1,4,8\":{\"743944b42841d5970fb91a33c2ca6f1b-8-8\":[]}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":2},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"7\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":9},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":6},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":null},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":3},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":1}],\"p\":[{\"varhash\":\"76e903963302fa772d147b9ebba05687\",\"pvarname\":\"cwiczenie\",\"pvarvalue\":\"0\"},{\"varhash\":\"406eb52423ce5f9eb9d5889c952adc54\",\"pvarname\":\"a\",\"pvarvalue\":\"0\"}]},\"s\":{}}', 'incomplete', '0', '6', '{\"0\":13,\"1\":16,\"2\":12,\"3\":9,\"4\":9,\"5\":3,\"6\":312,\"7\":0,\"8\":0}', '0', 0, '0', '0', '0'),
(49, 6, 23, '2018-07-25 14:04:41', '2018-07-25 14:11:31', '{\"uc\":[\"9c414f98f84ad6129c6363d1ca1e42d8\"],\"o\":[],\"p\":[1,2,4,5,6,7,8,15],\"q\":{\"0,2,6\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,12,6\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,13,6\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,2,13\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,12,13\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,13,13\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"8\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":12},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":21},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":\"[popup]\"},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":9},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":6},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[]},\"s\":{}}', 'incomplete', '0', '7', '{\"0\":2,\"1\":3,\"2\":4,\"3\":9,\"4\":15,\"5\":1,\"6\":13,\"7\":5,\"8\":0,\"9\":0,\"10\":0,\"11\":0}', '0', 0, '0', '0', '0'),
(50, 54, 22, '2018-07-29 23:05:43', '2018-07-29 23:06:09', '{\"uc\":[\"9c414f98f84ad6129c6363d1ca1e42d8\",\"100e592df996dc55f46683401ada3fcc\"],\"o\":[],\"p\":[2,5,4],\"q\":{\"0,21,21\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,16,21\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,8,22\":{\"9c414f98f84ad6129c6363d1ca1e42d8-6-22\":[],\"9c414f98f84ad6129c6363d1ca1e42d8-7-22\":[]},\"0,8,23\":{\"9c414f98f84ad6129c6363d1ca1e42d8-20-23\":[],\"9c414f98f84ad6129c6363d1ca1e42d8-19-23\":[]}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"3\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":13},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":15},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":\"[popup 2]\"},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":4},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":4},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[]},\"s\":{}}', 'incomplete', '0', '2', '{\"0\":3,\"1\":3,\"2\":12,\"3\":0,\"4\":0,\"5\":0,\"6\":0,\"7\":0,\"8\":0,\"9\":0,\"10\":0,\"11\":0,\"12\":0}', '0', 0, '0', '0', '0'),
(51, 125, 20, '2018-08-01 15:58:34', '2019-02-13 19:15:37', '{\"uc\":[\"743944b42841d5970fb91a33c2ca6f1b\",\"100e592df996dc55f46683401ada3fcc\"],\"o\":[\"0,10,66,1\"],\"p\":[57,58,59,60,61,62,63,64,65,66,67,68],\"q\":{\"0,11,66\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,10,66\":{\"#0\":{\"c\":true},\"#1\":{\"c\":false}},\"0,6,66\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,17,66\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,16,66\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,15,66\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,11,67\":{\"743944b42841d5970fb91a33c2ca6f1b-9-67\":[]}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"5\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":10},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":37},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":\"[12]\"},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":13},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":7},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[{\"varhash\":\"7ae0e120f53d2bf180408e796e346925\",\"pvarname\":\"\",\"pvarvalue\":\"\"}]},\"s\":{}}', 'passed', '0', '4', '{\"0\":75,\"1\":93,\"2\":160,\"3\":50,\"4\":50,\"5\":314,\"6\":195,\"7\":17,\"8\":107,\"9\":16,\"10\":0,\"11\":16}', '0', 0, '0', '0', '0'),
(52, 113, 20, '2018-08-07 21:59:29', '2018-10-27 09:48:29', '{\"uc\":[\"9c414f98f84ad6129c6363d1ca1e42d8\",\"100e592df996dc55f46683401ada3fcc\"],\"o\":[],\"p\":[5,46,12,14,29,34,37,41,40,45],\"q\":{\"0,44,41\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,35,41\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,34,41\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,33,41\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,32,41\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,8,41\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,29,40\":{\"9c414f98f84ad6129c6363d1ca1e42d8-23-40\":[],\"9c414f98f84ad6129c6363d1ca1e42d8-21-40\":[\"9c414f98f84ad6129c6363d1ca1e42d8-42-40\"]}},\"a\":{\"0,29,40\":2},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"3\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":10},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":8},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":\"[pole tekstowe 1]\"},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":2},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":7},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[{\"varhash\":\"7ae0e120f53d2bf180408e796e346925\",\"pvarname\":\"\",\"pvarvalue\":\"\"}]},\"s\":{}}', 'passed', '0', '2', '{\"0\":38,\"1\":33,\"2\":60,\"3\":1,\"4\":9,\"5\":30,\"6\":22,\"7\":9,\"8\":14,\"9\":3}', '0', 0, '0', '0', '0'),
(53, 29, 46, '2018-09-27 09:11:58', '2018-10-14 18:55:03', '{\"uc\":[\"e7b24ec3b1aa58845f3150644d6a5c88\",\"100e592df996dc55f46683401ada3fcc\",\"743944b42841d5970fb91a33c2ca6f1b\",\"4660dd8e7fc437d901cf6c34bff8674f\"],\"o\":[],\"p\":[2,22,23,24,25,3],\"q\":{\"2,9,7\":{\"#0\":{\"choosen\":false},\"#1\":{\"choosen\":false}},\"2,4,8\":{\"743944b42841d5970fb91a33c2ca6f1b-8-8\":[]}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":2},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"6\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":13},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":17},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":null},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":2},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":2},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[{\"varhash\":\"e48539be7427444573f06cada5953492\",\"pvarname\":\"najechanie_chmurki\",\"pvarvalue\":\"najechane\"}]},\"s\":{}}', 'incomplete', '0', '5', '{\"0\":17,\"1\":0,\"2\":0,\"3\":0,\"4\":1,\"5\":1,\"6\":0,\"7\":0,\"8\":0,\"9\":0,\"10\":0,\"11\":0,\"12\":0}', '0', 0, '0', '0', '0'),
(55, 29, 43, '2018-10-14 18:08:40', '2018-10-14 18:09:15', '{\"uc\":[\"e7b24ec3b1aa58845f3150644d6a5c88\",\"ff82b34b52049937fb82ce2c50129e8a\"],\"o\":[],\"p\":[2,5,6,7,8,9,10,11],\"q\":{},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":\"6\"},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":\"16\"},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":\"38\"},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"8\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":9},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":9},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":null},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[]},\"s\":{}}', 'incomplete', '6', '7', '{\"0\":1,\"1\":1,\"2\":1,\"3\":1,\"4\":1,\"5\":3,\"6\":2,\"7\":12,\"8\":0}', '0', 0, '0', '0', '0'),
(56, 29, 47, '2018-10-14 19:01:31', '2018-10-14 19:12:30', '{\"uc\":[\"ff82b34b52049937fb82ce2c50129e8a\",\"e7b24ec3b1aa58845f3150644d6a5c88\"],\"o\":[],\"p\":[1,4,5,6,7,9,8,10],\"q\":{\"0,2,22\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,1,22\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,1,23\":{\"ff82b34b52049937fb82ce2c50129e8a-2-23\":[]}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"8\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":21},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":14},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":null},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":2},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":3},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[{\"varhash\":\"f9211d0896dfd8f5e629044177855c78\",\"pvarname\":\"nazwa\",\"pvarvalue\":\"0\"}]},\"s\":{}}', 'incomplete', '0', '7', '{\"0\":6,\"1\":0,\"2\":0,\"3\":10,\"4\":0,\"5\":0,\"6\":0,\"7\":561,\"8\":0,\"9\":0,\"10\":0,\"11\":0,\"12\":0,\"13\":0,\"14\":0,\"15\":0,\"16\":0,\"17\":0,\"18\":0,\"19\":0,\"20\":0}', '0', 0, '0', '0', '0'),
(57, 29, 41, '2018-10-17 12:34:25', '2018-11-21 19:01:48', '{\"uc\":[\"e7b24ec3b1aa58845f3150644d6a5c88\",\"ff82b34b52049937fb82ce2c50129e8a\"],\"o\":[],\"p\":[43,45,4,5,6,7,9,8,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,30,29,31,32,34,33,35,36,37,38,39,40,41,42,46],\"q\":{\"0,29,27\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,29,30\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,29,29\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,29,31\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,55,32\":{\"e7b24ec3b1aa58845f3150644d6a5c88-27-32\":[],\"e7b24ec3b1aa58845f3150644d6a5c88-31-32\":[],\"e7b24ec3b1aa58845f3150644d6a5c88-49-32\":[],\"e7b24ec3b1aa58845f3150644d6a5c88-34-32\":[],\"e7b24ec3b1aa58845f3150644d6a5c88-37-32\":[],\"e7b24ec3b1aa58845f3150644d6a5c88-45-32\":[]},\"0,29,34\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,29,33\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,29,35\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,39,36\":{\"e7b24ec3b1aa58845f3150644d6a5c88-31-36\":[],\"e7b24ec3b1aa58845f3150644d6a5c88-32-36\":[],\"e7b24ec3b1aa58845f3150644d6a5c88-33-36\":[],\"e7b24ec3b1aa58845f3150644d6a5c88-40-36\":[]},\"0,29,37\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,55,38\":{\"e7b24ec3b1aa58845f3150644d6a5c88-54-38\":[],\"e7b24ec3b1aa58845f3150644d6a5c88-61-38\":[],\"e7b24ec3b1aa58845f3150644d6a5c88-62-38\":[],\"e7b24ec3b1aa58845f3150644d6a5c88-64-38\":[],\"e7b24ec3b1aa58845f3150644d6a5c88-65-38\":[],\"e7b24ec3b1aa58845f3150644d6a5c88-66-38\":[]},\"0,29,39\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,29,40\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,29,41\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,39,42\":{\"e7b24ec3b1aa58845f3150644d6a5c88-45-42\":[],\"e7b24ec3b1aa58845f3150644d6a5c88-46-42\":[],\"e7b24ec3b1aa58845f3150644d6a5c88-44-42\":[]}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"4\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":41},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":6},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":null},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":3},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":15},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[]},\"s\":{}}', 'passed', '0', '3', '{\"0\":4,\"1\":2,\"2\":12,\"3\":960,\"4\":0,\"5\":0,\"6\":0,\"7\":0,\"8\":0,\"9\":0,\"10\":0,\"11\":0,\"12\":0,\"13\":0,\"14\":0,\"15\":0,\"16\":0,\"17\":0,\"18\":0,\"19\":0,\"20\":0,\"21\":0,\"22\":0,\"23\":0,\"24\":0,\"25\":0,\"26\":0,\"27\":0,\"28\":0,\"29\":0,\"30\":0,\"31\":0,\"32\":0,\"33\":0,\"34\":0,\"35\":0,\"36\":0,\"37', '0', 0, '0', '0', '0'),
(58, 29, 48, '2018-10-17 18:08:26', '2018-10-17 18:08:53', '{\"uc\":[\"ff82b34b52049937fb82ce2c50129e8a\",\"2d24a6e1dcfe580abd5456d81fff2dc3\"],\"o\":[],\"p\":[2,3,6],\"q\":{},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"1\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":5},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":7},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":\"[1]\"},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":3},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[]},\"s\":{}}', 'incomplete', '0', '0', '{\"0\":1539792523,\"1\":11,\"2\":2,\"3\":0,\"4\":0}', '0', 0, '0', '0', '0'),
(59, 29, 49, '2018-10-17 18:22:46', '2018-10-17 18:23:12', '{\"uc\":[\"ff82b34b52049937fb82ce2c50129e8a\",\"2d24a6e1dcfe580abd5456d81fff2dc3\"],\"o\":[],\"p\":[2,3,6,4,5],\"q\":{},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"4\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":5},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":17},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":null},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":7},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[{\"varhash\":\"d195bf2cb3e8755339500bac3933be7f\",\"pvarname\":\"leki1\",\"pvarvalue\":\"0\"},{\"varhash\":\"9b67c0e83559cf6b5551ba27cd03cace\",\"pvarname\":\"leki2\",\"pvarvalue\":\"0\"},{\"varhash\":\"fb30034a423293c62356396794781746\",\"pvarname\":\"leki3\",\"pvarvalue\":\"0\"},{\"varhash\":\"954d4193a5f0d3b2af0cb344b65b4a4b\",\"pvarname\":\"suplementy1\",\"pvarvalue\":\"0\"},{\"varhash\":\"d23109dbd216ad305f2f109b351aeb65\",\"pvarname\":\"suplementy2\",\"pvarvalue\":\"0\"},{\"varhash\":\"e3a202ef7d37c2ebfef9b5f1a6a6dc0e\",\"pvarname\":\"medyczne1\",\"pvarvalue\":\"0\"},{\"varhash\":\"f8ade3b3cf58d4db834659514e34b386\",\"pvarname\":\"medyczne2\",\"pvarvalue\":\"0\"},{\"varhash\":\"8a771a6c91730e5c0aeaf08f7c1a3c86\",\"pvarname\":\"medyczne3\",\"pvarvalue\":\"0\"}]},\"s\":{}}', 'passed', '0', '3', '{\"0\":2,\"1\":3,\"2\":2,\"3\":11,\"4\":8}', '0', 0, '0', '0', '0');
INSERT INTO `scorm_data` (`id`, `user_id`, `course_id`, `create_date`, `modify_date`, `data`, `course_status`, `user_score`, `lesson_location`, `page_time`, `mailing_login`, `score_max`, `score_min`, `success_status`, `session_time`) VALUES
(60, 29, 50, '2018-10-17 18:25:37', '2018-10-17 18:26:19', '{\"uc\":[\"ff82b34b52049937fb82ce2c50129e8a\",\"2d24a6e1dcfe580abd5456d81fff2dc3\"],\"o\":[],\"p\":[2,3,6,4,5],\"q\":{},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"5\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":5},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":20},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":\"[3]\"},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":4},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[{\"varhash\":\"d195bf2cb3e8755339500bac3933be7f\",\"pvarname\":\"leki1\",\"pvarvalue\":\"2\"},{\"varhash\":\"9b67c0e83559cf6b5551ba27cd03cace\",\"pvarname\":\"leki2\",\"pvarvalue\":\"1\"},{\"varhash\":\"fb30034a423293c62356396794781746\",\"pvarname\":\"leki3\",\"pvarvalue\":\"0\"},{\"varhash\":\"954d4193a5f0d3b2af0cb344b65b4a4b\",\"pvarname\":\"suplementy1\",\"pvarvalue\":\"0\"},{\"varhash\":\"d23109dbd216ad305f2f109b351aeb65\",\"pvarname\":\"suplementy2\",\"pvarvalue\":\"0\"},{\"varhash\":\"e3a202ef7d37c2ebfef9b5f1a6a6dc0e\",\"pvarname\":\"medyczne1\",\"pvarvalue\":\"1\"},{\"varhash\":\"f8ade3b3cf58d4db834659514e34b386\",\"pvarname\":\"medyczne2\",\"pvarvalue\":\"0\"},{\"varhash\":\"8a771a6c91730e5c0aeaf08f7c1a3c86\",\"pvarname\":\"medyczne3\",\"pvarvalue\":\"1\"},{\"varhash\":\"e6811271c75856800148d0ed87e5ae71\",\"pvarname\":\"leki\",\"pvarvalue\":\"1\"},{\"varhash\":\"9f21332934dc281711e862f57cbe134c\",\"pvarname\":\"suplementy\",\"pvarvalue\":\"0\"},{\"varhash\":\"4f85ec8ab13f4076ec5d6ed9f31a7705\",\"pvarname\":\"medyczne\",\"pvarvalue\":\"1\"}]},\"s\":{}}', 'passed', '0', '4', '{\"0\":5,\"1\":8,\"2\":10,\"3\":6,\"4\":10}', '0', 0, '0', '0', '0'),
(61, 29, 51, '2018-10-18 09:15:53', '2018-10-23 19:35:07', '{\"uc\":[\"ff82b34b52049937fb82ce2c50129e8a\",\"2d24a6e1dcfe580abd5456d81fff2dc3\"],\"o\":[],\"p\":[2,3,6,4,5],\"q\":{},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"5\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":5},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":20},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":\"[3]\"},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":4},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[{\"varhash\":\"d195bf2cb3e8755339500bac3933be7f\",\"pvarname\":\"Lek Nazwa handlowa 1  - informacje\",\"pvarvalue\":\"3\"},{\"varhash\":\"9b67c0e83559cf6b5551ba27cd03cace\",\"pvarname\":\"Lek Nazwa handlowa 2  - informacje\",\"pvarvalue\":\"2\"},{\"varhash\":\"fb30034a423293c62356396794781746\",\"pvarname\":\"Lek Nazwa handlowa 3  - informacje\",\"pvarvalue\":\"0\"},{\"varhash\":\"954d4193a5f0d3b2af0cb344b65b4a4b\",\"pvarname\":\"Suplementy Nazwa handlowa 1  - informacje\",\"pvarvalue\":3},{\"varhash\":\"d23109dbd216ad305f2f109b351aeb65\",\"pvarname\":\"Suplementy Nazwa handlowa 2  - informacje\",\"pvarvalue\":\"3\"},{\"varhash\":\"e3a202ef7d37c2ebfef9b5f1a6a6dc0e\",\"pvarname\":\"Wyroby Nazwa handlowa 1  - informacje\",\"pvarvalue\":\"2\"},{\"varhash\":\"f8ade3b3cf58d4db834659514e34b386\",\"pvarname\":\"Wyroby Nazwa handlowa 2  - informacje\",\"pvarvalue\":\"2\"},{\"varhash\":\"8a771a6c91730e5c0aeaf08f7c1a3c86\",\"pvarname\":\"Wyroby Nazwa handlowa 3  - informacje\",\"pvarvalue\":\"3\"},{\"varhash\":\"e6811271c75856800148d0ed87e5ae71\",\"pvarname\":\"Leki - dodatkowe informacje\",\"pvarvalue\":\"1\"},{\"varhash\":\"9f21332934dc281711e862f57cbe134c\",\"pvarname\":\"Suplementy - dodatkowe informacje\",\"pvarvalue\":\"3\"},{\"varhash\":\"4f85ec8ab13f4076ec5d6ed9f31a7705\",\"pvarname\":\"Wyroby medyczne - dodatkowe informacje\",\"pvarvalue\":\"2\"},{\"varhash\":\"6b65db4439bc061f663c041edc8ff687\",\"pvarname\":\"Leki - przejście do oferty\",\"pvarvalue\":\"0\"},{\"varhash\":\"cc3a0e18aa98bda53748e3bc8ac773b5\",\"pvarname\":\"Suplementy - przejście do oferty\",\"pvarvalue\":\"1\"},{\"varhash\":\"9110a5512d8ded9b2d1b554983445dfc\",\"pvarname\":\"Wyroby medyczne - przejście do oferty\",\"pvarvalue\":1}]},\"s\":{}}', 'passed', '0', '4', '{\"0\":14,\"1\":37,\"2\":41,\"3\":41,\"4\":35}', '0', 0, '0', '0', '0'),
(62, 113, 52, '2018-10-24 20:06:24', '2018-10-24 21:38:06', '{\"uc\":[\"ff82b34b52049937fb82ce2c50129e8a\",\"2d24a6e1dcfe580abd5456d81fff2dc3\"],\"o\":[],\"p\":[2,3,6],\"q\":{},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"3\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":5},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":21},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":null},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":5},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[{\"varhash\":\"d195bf2cb3e8755339500bac3933be7f\",\"pvarname\":\"Lek Nazwa handlowa 1  - informacje\",\"pvarvalue\":\"0\"},{\"varhash\":\"9b67c0e83559cf6b5551ba27cd03cace\",\"pvarname\":\"Lek Nazwa handlowa 2  - informacje\",\"pvarvalue\":\"0\"},{\"varhash\":\"fb30034a423293c62356396794781746\",\"pvarname\":\"Lek Nazwa handlowa 3  - informacje\",\"pvarvalue\":\"0\"},{\"varhash\":\"954d4193a5f0d3b2af0cb344b65b4a4b\",\"pvarname\":\"Suplementy Nazwa handlowa 1  - informacje\",\"pvarvalue\":\"0\"},{\"varhash\":\"d23109dbd216ad305f2f109b351aeb65\",\"pvarname\":\"Suplementy Nazwa handlowa 2  - informacje\",\"pvarvalue\":\"0\"},{\"varhash\":\"e3a202ef7d37c2ebfef9b5f1a6a6dc0e\",\"pvarname\":\"Wyroby Nazwa handlowa 1  - informacje\",\"pvarvalue\":\"0\"},{\"varhash\":\"f8ade3b3cf58d4db834659514e34b386\",\"pvarname\":\"Wyroby Nazwa handlowa 2  - informacje\",\"pvarvalue\":\"0\"},{\"varhash\":\"8a771a6c91730e5c0aeaf08f7c1a3c86\",\"pvarname\":\"Wyroby Nazwa handlowa 3  - informacje\",\"pvarvalue\":\"0\"},{\"varhash\":\"e6811271c75856800148d0ed87e5ae71\",\"pvarname\":\"Leki - dodatkowe informacje\",\"pvarvalue\":\"0\"},{\"varhash\":\"9f21332934dc281711e862f57cbe134c\",\"pvarname\":\"Suplementy - dodatkowe informacje\",\"pvarvalue\":\"0\"},{\"varhash\":\"4f85ec8ab13f4076ec5d6ed9f31a7705\",\"pvarname\":\"Wyroby medyczne - dodatkowe informacje\",\"pvarvalue\":\"0\"},{\"varhash\":\"6b65db4439bc061f663c041edc8ff687\",\"pvarname\":\"Leki - przejście do oferty\",\"pvarvalue\":\"0\"},{\"varhash\":\"cc3a0e18aa98bda53748e3bc8ac773b5\",\"pvarname\":\"Suplementy - przejście do oferty\",\"pvarvalue\":\"0\"},{\"varhash\":\"9110a5512d8ded9b2d1b554983445dfc\",\"pvarname\":\"Wyroby medyczne - przejście do oferty\",\"pvarvalue\":\"0\"}]},\"s\":{}}', 'incomplete', '0', '2', '{\"0\":7,\"1\":5,\"2\":8,\"3\":0,\"4\":0}', '0', 0, '0', '0', '0'),
(63, 113, 25, '2018-10-27 09:39:47', '2018-10-27 09:39:53', '{\"uc\":[\"100e592df996dc55f46683401ada3fcc\",\"743944b42841d5970fb91a33c2ca6f1b\",\"4660dd8e7fc437d901cf6c34bff8674f\"],\"o\":[],\"p\":[2,3],\"q\":{\"0,6,4\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"1,9,7\":{\"#0\":{\"choosen\":false},\"#1\":{\"choosen\":false}},\"1,4,8\":{\"743944b42841d5970fb91a33c2ca6f1b-8-8\":[]}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":2},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"2\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":9},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":16},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":null},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":2},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":3},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[{\"varhash\":\"76e903963302fa772d147b9ebba05687\",\"pvarname\":\"cwiczenie\",\"pvarvalue\":\"0\"},{\"varhash\":\"406eb52423ce5f9eb9d5889c952adc54\",\"pvarname\":\"a\",\"pvarvalue\":\"0\"}]},\"s\":{}}', 'incomplete', '0', '1', '{\"0\":3,\"1\":1,\"2\":0,\"3\":0,\"4\":0,\"5\":0,\"6\":0,\"7\":0,\"8\":0}', '0', 0, '0', '0', '0'),
(64, 113, 21, '2018-10-27 09:40:02', '2018-10-27 09:40:58', '{\"uc\":[\"9c414f98f84ad6129c6363d1ca1e42d8\"],\"o\":[\"0,9,10,1\"],\"p\":[1,6,2,4,3,9,7,8,5,10],\"q\":{\"0,21,5\":{\"9c414f98f84ad6129c6363d1ca1e42d8-20-5\":[],\"9c414f98f84ad6129c6363d1ca1e42d8-19-5\":[]},\"0,10,10\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":true}},\"0,9,10\":{\"#0\":{\"c\":true},\"#1\":{\"c\":false}}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"10\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":11},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":10},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":\"[przenoszone elementy,kontenery ]\"},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":3},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":2}],\"p\":[]},\"s\":{}}', 'incomplete', '0', '9', '{\"0\":4,\"1\":3,\"2\":4,\"3\":5,\"4\":2,\"5\":2,\"6\":5,\"7\":6,\"8\":11,\"9\":9,\"10\":0}', '0', 0, '0', '0', '0'),
(65, 113, 24, '2018-10-27 09:41:45', '2018-10-27 09:43:08', '{\"uc\":[\"9c414f98f84ad6129c6363d1ca1e42d8\",\"100e592df996dc55f46683401ada3fcc\"],\"o\":[\"0,37,12,1\"],\"p\":[1,2,3,4,6,8,9,10,11,12,13],\"q\":{\"0,13,10\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false}},\"0,14,10\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false}},\"0,17,11\":{},\"0,37,12\":{\"9c414f98f84ad6129c6363d1ca1e42d8-20-12\":[\"9c414f98f84ad6129c6363d1ca1e42d8-18-12\"],\"9c414f98f84ad6129c6363d1ca1e42d8-23-12\":[\"9c414f98f84ad6129c6363d1ca1e42d8-25-12\"],\"9c414f98f84ad6129c6363d1ca1e42d8-19-12\":[\"9c414f98f84ad6129c6363d1ca1e42d8-24-12\"]}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"12\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":12},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":4},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":null},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":2},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":3},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[]},\"s\":{}}', 'incomplete', '0', '11', '{\"0\":5,\"1\":0,\"2\":5,\"3\":4,\"4\":3,\"5\":6,\"6\":4,\"7\":3,\"8\":1,\"9\":7,\"10\":28,\"11\":9}', '0', 0, '0', '0', '0'),
(66, 113, 23, '2018-10-27 09:45:15', '2018-10-27 09:47:11', '{\"uc\":[\"9c414f98f84ad6129c6363d1ca1e42d8\"],\"o\":[],\"p\":[1,2,4,5,6,7,8,15,10,11,13,16],\"q\":{\"0,2,6\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,12,6\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,13,6\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,2,13\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,12,13\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,13,13\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"12\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":12},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":15},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":\"[ok 1,text window]\"},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":2},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":6},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[]},\"s\":{}}', 'passed', '0', '11', '{\"0\":1,\"1\":4,\"2\":6,\"3\":2,\"4\":3,\"5\":1,\"6\":17,\"7\":6,\"8\":3,\"9\":6,\"10\":6,\"11\":5}', '0', 0, '0', '0', '0'),
(67, 125, 42, '2018-11-12 09:25:25', '2018-11-12 09:25:38', '{\"uc\":[\"ff82b34b52049937fb82ce2c50129e8a\"],\"o\":[],\"p\":[3,1,5,6],\"q\":{},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"6\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":6},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":4},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":\"[1]\"},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[{\"varhash\":\"52ba8edc4c24368c80e1223ccb2a0976\",\"pvarname\":\"telefon\",\"pvarvalue\":\"Huawei P20 lite Dual SIM\"},{\"varhash\":\"37afa414e3e2d73d07d8bcf1ce564915\",\"pvarname\":\"dodatkowy_internet\",\"pvarvalue\":\"Advence\"}]},\"s\":{}}', 'incomplete', '0', '5', '{\"0\":3,\"1\":1,\"2\":0,\"3\":0,\"4\":3,\"5\":2}', '0', 0, '0', '0', '0'),
(68, 113, 53, '2018-12-06 11:49:09', '2018-12-06 20:16:26', '{\"uc\":[\"2d24a6e1dcfe580abd5456d81fff2dc3\"],\"o\":[],\"p\":[38,17,18,2,6,7,8,9,10,11,12,13,14,15,20,19,21,22,25,26,23,24,27,28,29,30,31,32,33,36,37,39],\"q\":{\"0,27,12\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,25,12\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false}},\"0,23,12\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,21,12\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,19,12\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,22,19\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,20,19\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,18,19\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,26,24\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,24,24\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false}},\"0,22,24\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,20,24\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,18,24\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,20,28\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"0,18,28\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"30\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":32},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":7},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":\"[KOMPUTERT]\"},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":2},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":15},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[]},\"s\":{}}', 'passed', '0', '29', '{\"0\":11,\"1\":16,\"2\":17,\"3\":15,\"4\":465,\"5\":11,\"6\":1,\"7\":4,\"8\":1,\"9\":0,\"10\":0,\"11\":4,\"12\":1,\"13\":10,\"14\":3,\"15\":1,\"16\":5,\"17\":7,\"18\":5,\"19\":7,\"20\":5,\"21\":1,\"22\":1,\"23\":1,\"24\":2,\"25\":192,\"26\":3,\"27\":15,\"28\":8,\"29\":14,\"30\":13,\"31\":2}', '0', 0, '0', '0', '0'),
(70, 125, 55, '2018-12-10 14:58:17', '2019-01-28 19:16:35', '{\"uc\":[\"743944b42841d5970fb91a33c2ca6f1b\",\"100e592df996dc55f46683401ada3fcc\",\"3385f68c99d0659868010463fafd6b67\"],\"o\":[\"0,11,65,1\",\"0,10,65,1\",\"0,6,65,1\",\"0,17,65,1\",\"0,16,65,1\",\"0,15,65,1\"],\"p\":[5,57,56,58,60,61,59,62,64,65,66,67],\"q\":{\"0,11,65\":{\"#0\":{\"c\":true},\"#1\":{\"c\":false}},\"0,10,65\":{\"#0\":{\"c\":true},\"#1\":{\"c\":false}},\"0,6,65\":{\"#0\":{\"c\":false},\"#1\":{\"c\":true}},\"0,17,65\":{\"#0\":{\"c\":true},\"#1\":{\"c\":false}},\"0,16,65\":{\"#0\":{\"c\":false},\"#1\":{\"c\":true}},\"0,15,65\":{\"#0\":{\"c\":true},\"#1\":{\"c\":false}},\"0,11,66\":{\"743944b42841d5970fb91a33c2ca6f1b-9-66\":[\"743944b42841d5970fb91a33c2ca6f1b-4-66\",\"743944b42841d5970fb91a33c2ca6f1b-6-66\",\"743944b42841d5970fb91a33c2ca6f1b-7-66\",\"743944b42841d5970fb91a33c2ca6f1b-5-66\",\"743944b42841d5970fb91a33c2ca6f1b-8-66\"]}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"1\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":12},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":4},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":\"[1]\"},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":6},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":7},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[{\"varhash\":\"7ae0e120f53d2bf180408e796e346925\",\"pvarname\":\"\",\"pvarvalue\":\"\"}]},\"s\":{}}', 'passed', '0', '0', '{\"0\":171,\"1\":17,\"2\":10,\"3\":23,\"4\":64,\"5\":3120,\"6\":20,\"7\":26,\"8\":21,\"9\":62,\"10\":1650,\"11\":4}', '0', 0, '0', '0', '0'),
(71, 125, 21, '2018-12-12 12:35:59', '2018-12-12 12:47:04', '{\"uc\":[\"743944b42841d5970fb91a33c2ca6f1b\",\"9c414f98f84ad6129c6363d1ca1e42d8\"],\"o\":[],\"p\":[13,14,15],\"q\":{\"0,35,21\":{\"743944b42841d5970fb91a33c2ca6f1b-34-21\":[],\"743944b42841d5970fb91a33c2ca6f1b-33-21\":[]},\"1,10,22\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false}},\"1,9,22\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"3\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":11},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":4},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":null},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":3},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[]},\"s\":{}}', 'incomplete', '0', '2', '{\"0\":23,\"1\":12,\"2\":48,\"3\":0,\"4\":0,\"5\":0,\"6\":0,\"7\":0,\"8\":0,\"9\":0,\"10\":0}', '0', 0, '0', '0', '0'),
(72, 125, 22, '2018-12-12 13:00:02', '2018-12-12 13:16:23', '{\"uc\":[\"9c414f98f84ad6129c6363d1ca1e42d8\",\"743944b42841d5970fb91a33c2ca6f1b\",\"100e592df996dc55f46683401ada3fcc\"],\"o\":[],\"p\":[26,27,28],\"q\":{\"0,21,35\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,16,35\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,8,36\":{\"9c414f98f84ad6129c6363d1ca1e42d8-6-36\":[],\"9c414f98f84ad6129c6363d1ca1e42d8-7-36\":[]},\"0,8,37\":{\"9c414f98f84ad6129c6363d1ca1e42d8-20-37\":[],\"9c414f98f84ad6129c6363d1ca1e42d8-19-37\":[]}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"2\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":13},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":4},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":\"[popup 3]\"},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":3},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":4},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[]},\"s\":{}}', 'incomplete', '0', '1', '{\"0\":5,\"1\":83,\"2\":48,\"3\":0,\"4\":0,\"5\":0,\"6\":0,\"7\":0,\"8\":0,\"9\":0,\"10\":0,\"11\":0,\"12\":0}', '0', 0, '0', '0', '0'),
(73, 125, 23, '2018-12-12 13:16:35', '2018-12-12 13:24:13', '{\"uc\":[\"743944b42841d5970fb91a33c2ca6f1b\",\"9c414f98f84ad6129c6363d1ca1e42d8\"],\"o\":[],\"p\":[18,19],\"q\":{\"1,2,22\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"1,12,22\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"1,13,22\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"1,2,27\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"1,12,27\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}},\"1,13,27\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false},\"#3\":{\"c\":false}}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"2\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":11},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":13},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":null},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":4},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":6},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[]},\"s\":{}}', 'incomplete', '0', '1', '{\"0\":15,\"1\":26,\"2\":0,\"3\":0,\"4\":0,\"5\":0,\"6\":0,\"7\":0,\"8\":0,\"9\":0,\"10\":0}', '0', 0, '0', '0', '0'),
(74, 125, 24, '2018-12-12 13:24:20', '2019-02-13 19:15:34', '{\"uc\":[\"743944b42841d5970fb91a33c2ca6f1b\",\"9c414f98f84ad6129c6363d1ca1e42d8\",\"100e592df996dc55f46683401ada3fcc\"],\"o\":[],\"p\":[15,16,17],\"q\":{\"1,13,23\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false}},\"1,14,23\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false}},\"1,17,24\":{},\"1,37,25\":{\"9c414f98f84ad6129c6363d1ca1e42d8-20-25\":[],\"9c414f98f84ad6129c6363d1ca1e42d8-23-25\":[],\"9c414f98f84ad6129c6363d1ca1e42d8-19-25\":[]}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"3\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":12},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":23},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":\"[funkcje stylu zycia zolty]\"},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":7},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":3},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[]},\"s\":{}}', 'incomplete', '0', '2', '{\"0\":82,\"1\":307,\"2\":5,\"3\":0,\"4\":0,\"5\":0,\"6\":0,\"7\":0,\"8\":0,\"9\":0,\"10\":0,\"11\":0}', '0', 0, '0', '0', '0'),
(75, 125, 25, '2018-12-15 22:09:48', '2018-12-15 22:11:55', '{\"uc\":[\"100e592df996dc55f46683401ada3fcc\",\"743944b42841d5970fb91a33c2ca6f1b\",\"4660dd8e7fc437d901cf6c34bff8674f\"],\"o\":[\"0,11,3,1\",\"0,9,3,1\",\"0,6,4,1\"],\"p\":[2,3,4,5,6,7,8,9,10],\"q\":{\"0,6,4\":{\"#0\":{\"c\":true},\"#1\":{\"c\":false}},\"1,9,7\":{\"#0\":{\"choosen\":false},\"#1\":{\"choosen\":true}},\"1,4,8\":{\"743944b42841d5970fb91a33c2ca6f1b-8-8\":[]}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":2},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"9\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":9},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":2},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":\"[4]\"},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":3},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[{\"varhash\":\"76e903963302fa772d147b9ebba05687\",\"pvarname\":\"cwiczenie\",\"pvarvalue\":\"0\"},{\"varhash\":\"406eb52423ce5f9eb9d5889c952adc54\",\"pvarname\":\"a\",\"pvarvalue\":\"0\"}]},\"s\":{}}', 'passed', '0', '8', '{\"0\":12,\"1\":16,\"2\":26,\"3\":14,\"4\":10,\"5\":7,\"6\":20,\"7\":4,\"8\":11}', '0', 0, '0', '0', '0'),
(76, 3, 55, '2018-12-17 09:17:59', '2018-12-17 09:22:43', '{\"uc\":[\"743944b42841d5970fb91a33c2ca6f1b\",\"100e592df996dc55f46683401ada3fcc\",\"3385f68c99d0659868010463fafd6b67\"],\"o\":[\"0,11,65,1\",\"0,10,65,1\",\"0,6,65,1\",\"0,17,65,1\",\"0,15,65,1\",\"0,11,66,1\"],\"p\":[5,57,56,58,60,61,59,62,64,65,66,67],\"q\":{\"0,11,65\":{\"#0\":{\"c\":true},\"#1\":{\"c\":false}},\"0,10,65\":{\"#0\":{\"c\":true},\"#1\":{\"c\":false}},\"0,6,65\":{\"#0\":{\"c\":false},\"#1\":{\"c\":true}},\"0,17,65\":{\"#0\":{\"c\":true},\"#1\":{\"c\":false}},\"0,16,65\":{\"#0\":{\"c\":true},\"#1\":{\"c\":false}},\"0,15,65\":{\"#0\":{\"c\":true},\"#1\":{\"c\":false}},\"0,11,66\":{\"743944b42841d5970fb91a33c2ca6f1b-9-66\":[\"743944b42841d5970fb91a33c2ca6f1b-7-66\",\"743944b42841d5970fb91a33c2ca6f1b-6-66\",\"743944b42841d5970fb91a33c2ca6f1b-4-66\"]}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"12\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":12},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":3},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":\"[1]\"},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":6},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":7},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[{\"varhash\":\"7ae0e120f53d2bf180408e796e346925\",\"pvarname\":\"\",\"pvarvalue\":\"\"}]},\"s\":{}}', 'passed', '0', '11', '{\"0\":33,\"1\":3,\"2\":5,\"3\":26,\"4\":20,\"5\":15,\"6\":54,\"7\":21,\"8\":21,\"9\":34,\"10\":18,\"11\":4}', '0', 0, '0', '0', '0');
INSERT INTO `scorm_data` (`id`, `user_id`, `course_id`, `create_date`, `modify_date`, `data`, `course_status`, `user_score`, `lesson_location`, `page_time`, `mailing_login`, `score_max`, `score_min`, `success_status`, `session_time`) VALUES
(77, 4, 55, '2018-12-17 09:24:20', '2018-12-17 09:38:49', '{\"uc\":[\"743944b42841d5970fb91a33c2ca6f1b\",\"100e592df996dc55f46683401ada3fcc\",\"3385f68c99d0659868010463fafd6b67\"],\"o\":[\"0,10,65,1\",\"0,6,65,1\"],\"p\":[5,57,56,58,60,61,59,62,64,65,66,67],\"q\":{\"0,11,65\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,10,65\":{\"#0\":{\"c\":true},\"#1\":{\"c\":false}},\"0,6,65\":{\"#0\":{\"c\":false},\"#1\":{\"c\":true}},\"0,17,65\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,16,65\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,15,65\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,11,66\":{\"743944b42841d5970fb91a33c2ca6f1b-9-66\":[\"743944b42841d5970fb91a33c2ca6f1b-6-66\"]}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"12\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":12},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":3},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":\"[1]\"},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":1},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":2},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":7},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[{\"varhash\":\"7ae0e120f53d2bf180408e796e346925\",\"pvarname\":\"\",\"pvarvalue\":\"\"}]},\"s\":{}}', 'passed', '0', '11', '{\"0\":17,\"1\":75,\"2\":105,\"3\":83,\"4\":132,\"5\":284,\"6\":69,\"7\":53,\"8\":31,\"9\":7,\"10\":5,\"11\":2}', '0', 0, '0', '0', '0'),
(78, 9, 55, '2018-12-17 09:41:31', '2018-12-17 09:51:22', '{\"uc\":[\"743944b42841d5970fb91a33c2ca6f1b\",\"100e592df996dc55f46683401ada3fcc\",\"3385f68c99d0659868010463fafd6b67\"],\"o\":[],\"p\":[5,57,56,58,60,61,59,62,64,65,66],\"q\":{\"0,11,65\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,10,65\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,6,65\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,17,65\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,16,65\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,15,65\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,11,66\":{\"743944b42841d5970fb91a33c2ca6f1b-9-66\":[]}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"11\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":12},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":12},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":null},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":3},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":7},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":1}],\"p\":[{\"varhash\":\"7ae0e120f53d2bf180408e796e346925\",\"pvarname\":\"\",\"pvarvalue\":\"\"}]},\"s\":{}}', 'incomplete', '0', '10', '{\"0\":79,\"1\":344,\"2\":55,\"3\":95,\"4\":3,\"5\":2,\"6\":1,\"7\":2,\"8\":1,\"9\":2,\"10\":2,\"11\":0}', '0', 0, '0', '0', '0'),
(79, 10, 55, '2018-12-17 09:52:48', '2018-12-17 09:56:10', '{\"uc\":[\"743944b42841d5970fb91a33c2ca6f1b\",\"100e592df996dc55f46683401ada3fcc\",\"3385f68c99d0659868010463fafd6b67\"],\"o\":[],\"p\":[5,57,56,58,60,61],\"q\":{\"0,11,65\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,10,65\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,6,65\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,17,65\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,16,65\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,15,65\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false}},\"0,11,66\":{\"743944b42841d5970fb91a33c2ca6f1b-9-66\":[]}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"6\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":12},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":23},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":\"[12]\"},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":13},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":7},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[{\"varhash\":\"7ae0e120f53d2bf180408e796e346925\",\"pvarname\":\"\",\"pvarvalue\":\"\"}]},\"s\":{}}', 'incomplete', '0', '5', '{\"0\":2,\"1\":11,\"2\":8,\"3\":11,\"4\":42,\"5\":69,\"6\":0,\"7\":0,\"8\":0,\"9\":0,\"10\":0,\"11\":0}', '0', 0, '0', '0', '0'),
(80, 125, 56, '2018-12-17 10:21:04', '2019-01-07 12:02:47', '{\"uc\":[\"ff82b34b52049937fb82ce2c50129e8a\",\"2d24a6e1dcfe580abd5456d81fff2dc3\"],\"o\":[],\"p\":[2,3,6,4,5],\"q\":{},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"1\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":5},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":7},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":\"[1]\"},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":3},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[{\"varhash\":\"d195bf2cb3e8755339500bac3933be7f\",\"pvarname\":\"Lek Nazwa handlowa 1  - informacje\",\"pvarvalue\":\"0\"},{\"varhash\":\"9b67c0e83559cf6b5551ba27cd03cace\",\"pvarname\":\"Lek Nazwa handlowa 2  - informacje\",\"pvarvalue\":\"0\"},{\"varhash\":\"fb30034a423293c62356396794781746\",\"pvarname\":\"Lek Nazwa handlowa 3  - informacje\",\"pvarvalue\":\"0\"},{\"varhash\":\"954d4193a5f0d3b2af0cb344b65b4a4b\",\"pvarname\":\"Suplementy Nazwa handlowa 1  - informacje\",\"pvarvalue\":\"1\"},{\"varhash\":\"d23109dbd216ad305f2f109b351aeb65\",\"pvarname\":\"Suplementy Nazwa handlowa 2  - informacje\",\"pvarvalue\":\"0\"},{\"varhash\":\"e3a202ef7d37c2ebfef9b5f1a6a6dc0e\",\"pvarname\":\"Wyroby Nazwa handlowa 1  - informacje\",\"pvarvalue\":\"1\"},{\"varhash\":\"f8ade3b3cf58d4db834659514e34b386\",\"pvarname\":\"Wyroby Nazwa handlowa 2  - informacje\",\"pvarvalue\":\"0\"},{\"varhash\":\"8a771a6c91730e5c0aeaf08f7c1a3c86\",\"pvarname\":\"Wyroby Nazwa handlowa 3  - informacje\",\"pvarvalue\":\"1\"},{\"varhash\":\"e6811271c75856800148d0ed87e5ae71\",\"pvarname\":\"Leki - dodatkowe informacje\",\"pvarvalue\":\"0\"},{\"varhash\":\"9f21332934dc281711e862f57cbe134c\",\"pvarname\":\"Suplementy - dodatkowe informacje\",\"pvarvalue\":\"0\"},{\"varhash\":\"4f85ec8ab13f4076ec5d6ed9f31a7705\",\"pvarname\":\"Wyroby medyczne - dodatkowe informacje\",\"pvarvalue\":\"0\"},{\"varhash\":\"6b65db4439bc061f663c041edc8ff687\",\"pvarname\":\"Leki - przejście do oferty\",\"pvarvalue\":\"0\"},{\"varhash\":\"cc3a0e18aa98bda53748e3bc8ac773b5\",\"pvarname\":\"Suplementy - przejście do oferty\",\"pvarvalue\":\"1\"},{\"varhash\":\"9110a5512d8ded9b2d1b554983445dfc\",\"pvarname\":\"Wyroby medyczne - przejście do oferty\",\"pvarvalue\":\"0\"}]},\"s\":{}}', 'passed', '0', '0', '{\"0\":696,\"1\":5,\"2\":0,\"3\":13,\"4\":1424}', '0', 0, '0', '0', '0'),
(81, 29, 24, '2018-12-19 10:51:50', '2018-12-19 10:52:12', '{\"uc\":[\"743944b42841d5970fb91a33c2ca6f1b\",\"9c414f98f84ad6129c6363d1ca1e42d8\",\"100e592df996dc55f46683401ada3fcc\"],\"o\":[],\"p\":[15,16,17],\"q\":{\"1,13,23\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false}},\"1,14,23\":{\"#0\":{\"c\":false},\"#1\":{\"c\":false},\"#2\":{\"c\":false}},\"1,17,24\":{},\"1,37,25\":{\"9c414f98f84ad6129c6363d1ca1e42d8-20-25\":[],\"9c414f98f84ad6129c6363d1ca1e42d8-23-25\":[],\"9c414f98f84ad6129c6363d1ca1e42d8-19-25\":[]}},\"a\":{},\"t\":{},\"v\":{\"s\":[{\"varhash\":\"00000000000000000000000000000000\",\"pvarname\":\"_score\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000001\",\"pvarname\":\"_maxscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000002\",\"pvarname\":\"_percentscore\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000003\",\"pvarname\":\"_diamonds\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000004\",\"pvarname\":\"_slide_number\",\"pvarvalue\":\"3\"},{\"varhash\":\"00000000000000000000000000000005\",\"pvarname\":\"_all_slide_numbers\",\"pvarvalue\":12},{\"varhash\":\"00000000000000000000000000000006\",\"pvarname\":\"_time_spent_on_screen\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000007\",\"pvarname\":\"_time_spent_on_course\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000008\",\"pvarname\":\"_components_in_line_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000009\",\"pvarname\":\"_components_in_page_count\",\"pvarvalue\":23},{\"varhash\":\"00000000000000000000000000000010\",\"pvarname\":\"_current_lines\",\"pvarvalue\":\"[ punkt widzenia niebieski]\"},{\"varhash\":\"00000000000000000000000000000011\",\"pvarname\":\"_lines_in_page_count\",\"pvarvalue\":7},{\"varhash\":\"00000000000000000000000000000012\",\"pvarname\":\"_passed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000013\",\"pvarname\":\"_failed_qiuz_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000014\",\"pvarname\":\"_qiuz_count\",\"pvarvalue\":3},{\"varhash\":\"00000000000000000000000000000015\",\"pvarname\":\"_passed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000016\",\"pvarname\":\"_failed_qiuz_on_stage_count\",\"pvarvalue\":0},{\"varhash\":\"00000000000000000000000000000017\",\"pvarname\":\"_qiuz_on_stage_count\",\"pvarvalue\":0}],\"p\":[]},\"s\":{}}', 'incomplete', '0', '2', '{\"0\":4,\"1\":11,\"2\":7,\"3\":0,\"4\":0,\"5\":0,\"6\":0,\"7\":0,\"8\":0,\"9\":0,\"10\":0,\"11\":0}', '0', 0, '0', '0', '0');

-- --------------------------------------------------------

--
-- Table structure for table `scorm_data_guest`
--

CREATE TABLE `scorm_data_guest` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` varchar(50) COLLATE utf8_unicode_ci NOT NULL,
  `course_id` int(10) UNSIGNED NOT NULL,
  `create_date` datetime NOT NULL,
  `modify_date` datetime NOT NULL,
  `data` text COLLATE utf8_unicode_ci NOT NULL,
  `course_status` varchar(20) COLLATE utf8_unicode_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `scorm_data_guest`
--

INSERT INTO `scorm_data_guest` (`id`, `user_id`, `course_id`, `create_date`, `modify_date`, `data`, `course_status`) VALUES
(1, '5a51f2b44100d', 20, '2018-01-07 11:13:08', '0000-00-00 00:00:00', '', 'incomplete'),
(2, '5a52320ecc4a4', 30, '2018-01-07 15:43:26', '0000-00-00 00:00:00', '', 'incomplete'),
(4, '5a5c4aeb09135', 22, '2018-01-15 07:32:11', '0000-00-00 00:00:00', '', 'incomplete'),
(5, 'eyJpdiI6IlhSVDI5ZnNHU1hlK012bnRtcjIrYlE9PSIsInZhbH', 20, '2018-01-15 07:34:44', '0000-00-00 00:00:00', '', 'incomplete'),
(6, '5a5c5fc6e59c9', 24, '2018-01-15 09:01:10', '0000-00-00 00:00:00', '', 'incomplete'),
(7, '5a5f3d0ca80a5', 25, '2018-01-17 13:09:49', '0000-00-00 00:00:00', '', 'incomplete'),
(8, '5a5fae1f672e2', 24, '2018-01-17 21:12:15', '0000-00-00 00:00:00', '', 'incomplete'),
(9, '5a5fae1f672e2', 25, '2018-01-17 21:14:29', '0000-00-00 00:00:00', '', 'incomplete'),
(10, '5a5fbe970d74f', 22, '2018-01-17 22:22:31', '0000-00-00 00:00:00', '', 'incomplete'),
(11, '5a5fbe970d74f', 20, '2018-01-17 22:23:23', '0000-00-00 00:00:00', '', 'incomplete'),
(12, '5a5fce23be161', 23, '2018-01-17 23:28:51', '0000-00-00 00:00:00', '', 'incomplete'),
(13, '5a604b2569501', 20, '2018-01-18 08:22:13', '0000-00-00 00:00:00', '', 'incomplete'),
(14, '5a604b2569501', 23, '2018-01-18 08:22:59', '0000-00-00 00:00:00', '', 'incomplete'),
(15, '5a60ddbc1e140', 20, '2018-01-18 18:47:40', '0000-00-00 00:00:00', '', 'incomplete'),
(16, '5a60ddbc1e140', 22, '2018-01-18 18:48:04', '0000-00-00 00:00:00', '', 'incomplete'),
(17, '5a60ddbc1e140', 24, '2018-01-18 18:48:30', '0000-00-00 00:00:00', '', 'incomplete'),
(18, '5a61c52aeac69', 21, '2018-01-19 11:15:07', '0000-00-00 00:00:00', '', 'incomplete'),
(19, '5a61c52dca78d', 25, '2018-01-19 11:15:09', '0000-00-00 00:00:00', '', 'incomplete'),
(20, '5a61c52aeac69', 25, '2018-01-19 11:15:23', '0000-00-00 00:00:00', '', 'incomplete'),
(21, '5a61c52dca78d', 20, '2018-01-19 11:17:04', '0000-00-00 00:00:00', '', 'incomplete'),
(22, '5a61c52aeac69', 22, '2018-01-19 11:44:16', '0000-00-00 00:00:00', '', 'incomplete'),
(23, '5a6af6d8c9390', 27, '2018-01-26 10:37:28', '0000-00-00 00:00:00', '', 'incomplete'),
(46, '5a982f5f8583f', 25, '2018-03-01 17:50:39', '0000-00-00 00:00:00', '', 'incomplete'),
(47, '5a7d767c918ce', 21, '2018-03-10 15:37:05', '0000-00-00 00:00:00', '', 'incomplete'),
(50, '5b06b81103121', 38, '2018-05-24 15:03:13', '0000-00-00 00:00:00', '', 'incomplete'),
(51, '5b2340576bd16', 20, '2018-06-15 06:28:07', '0000-00-00 00:00:00', '', 'incomplete'),
(52, '5b2b6331cfcfb', 41, '2018-06-21 10:34:58', '0000-00-00 00:00:00', '', 'incomplete'),
(53, '5b246c1768f02', 41, '2018-06-21 12:54:33', '0000-00-00 00:00:00', '', 'incomplete'),
(54, '5b2b9ca7eeb64', 41, '2018-06-21 14:40:08', '0000-00-00 00:00:00', '', 'incomplete'),
(55, '5b31f4f25bf28', 42, '2018-06-26 10:10:26', '0000-00-00 00:00:00', '', 'incomplete'),
(56, '5b2b9ca7eeb64', 42, '2018-06-26 14:18:48', '0000-00-00 00:00:00', '', 'incomplete'),
(57, '5b3339db790e5', 43, '2018-06-27 09:16:43', '0000-00-00 00:00:00', '', 'incomplete'),
(58, '5b2b9ca7eeb64', 43, '2018-06-27 09:22:56', '0000-00-00 00:00:00', '', 'incomplete'),
(59, '5b335b8609333', 44, '2018-06-27 11:40:22', '0000-00-00 00:00:00', '', 'incomplete'),
(60, 'eyJpdiI6IitqODI5QjdiclNhQnFORTFoTWNoSVE9PSIsInZhbH', 41, '2018-06-28 10:10:47', '0000-00-00 00:00:00', '', 'incomplete'),
(61, 'eyJpdiI6IitqODI5QjdiclNhQnFORTFoTWNoSVE9PSIsInZhbH', 41, '2018-06-28 10:11:20', '0000-00-00 00:00:00', '', 'incomplete'),
(62, '5b34996b98c29', 41, '2018-06-28 10:16:43', '0000-00-00 00:00:00', '', 'incomplete'),
(63, '5b349d065e5f8', 20, '2018-06-28 10:32:06', '0000-00-00 00:00:00', '', 'incomplete'),
(64, '5b360d9c09e61', 41, '2018-06-29 12:44:44', '0000-00-00 00:00:00', '', 'incomplete'),
(65, '5b360e9cabc1f', 41, '2018-06-29 12:49:00', '0000-00-00 00:00:00', '', 'incomplete'),
(66, '5b4f3cf20cacb', 41, '2018-07-18 15:13:22', '0000-00-00 00:00:00', '', 'incomplete'),
(67, '5b519d43d6442', 41, '2018-07-20 10:28:52', '0000-00-00 00:00:00', '', 'incomplete'),
(68, '5b72a2be8d6c4', 41, '2018-08-14 11:37:02', '0000-00-00 00:00:00', '', 'incomplete'),
(69, '5b8e9cc67c276', 21, '2018-09-04 16:55:02', '0000-00-00 00:00:00', '', 'incomplete'),
(70, '5b8e9cc67c276', 20, '2018-09-20 09:14:49', '0000-00-00 00:00:00', '', 'incomplete'),
(71, '5b8e9cc67c276', 23, '2018-09-20 09:15:28', '0000-00-00 00:00:00', '', 'incomplete'),
(72, '5bad06d96c9ac', 41, '2018-09-27 18:35:37', '0000-00-00 00:00:00', '', 'incomplete'),
(73, '5bad071a949cd', 41, '2018-09-27 18:36:42', '0000-00-00 00:00:00', '', 'incomplete'),
(74, '5bad07607fc2e', 41, '2018-09-27 18:37:52', '0000-00-00 00:00:00', '', 'incomplete'),
(75, '5bad092262677', 41, '2018-09-27 18:45:22', '0000-00-00 00:00:00', '', 'incomplete'),
(76, '5bc50afaf3ee9', 41, '2018-10-15 23:47:39', '0000-00-00 00:00:00', '', 'incomplete'),
(77, '5bca127bb2e69', 22, '2018-10-19 19:20:59', '0000-00-00 00:00:00', '', 'incomplete'),
(78, '5bd2f04c3f7f7', 22, '2018-10-26 12:45:32', '0000-00-00 00:00:00', '', 'incomplete'),
(79, '5bd2f04c3f7f7', 23, '2018-10-26 12:45:58', '0000-00-00 00:00:00', '', 'incomplete'),
(80, '5bed4a5c18ec8', 21, '2018-11-15 11:28:44', '0000-00-00 00:00:00', '', 'incomplete'),
(81, '5bed4a5c18ec8', 20, '2018-11-15 11:28:56', '0000-00-00 00:00:00', '', 'incomplete'),
(82, '5bed4a5c18ec8', 25, '2018-11-16 03:55:43', '0000-00-00 00:00:00', '', 'incomplete'),
(83, '5bfcf0ce7ee15', 21, '2018-11-27 08:22:54', '0000-00-00 00:00:00', '', 'incomplete'),
(84, '5bfcf0ce7ee15', 20, '2018-11-27 08:26:12', '0000-00-00 00:00:00', '', 'incomplete'),
(85, '5c091676cf86d', 53, '2018-12-06 13:30:47', '0000-00-00 00:00:00', '', 'incomplete'),
(86, '5c0ac585b9c54', 23, '2018-12-07 20:09:57', '0000-00-00 00:00:00', '', 'incomplete'),
(87, '5c0ac585b9c54', 20, '2018-12-07 20:11:29', '0000-00-00 00:00:00', '', 'incomplete'),
(88, '5c0ac585b9c54', 25, '2018-12-07 20:12:35', '0000-00-00 00:00:00', '', 'incomplete'),
(89, '5c0e671dda982', 20, '2018-12-10 14:16:14', '0000-00-00 00:00:00', '', 'incomplete'),
(90, '5c1223ff48634', 20, '2018-12-13 10:18:55', '0000-00-00 00:00:00', '', 'incomplete'),
(91, '5c1223ff48634', 22, '2018-12-13 10:23:50', '0000-00-00 00:00:00', '', 'incomplete'),
(92, '5c1223ff48634', 23, '2018-12-13 10:30:27', '0000-00-00 00:00:00', '', 'incomplete'),
(93, '5c1223ff48634', 24, '2018-12-13 10:32:49', '0000-00-00 00:00:00', '', 'incomplete'),
(94, '5c1223ff48634', 21, '2018-12-13 10:51:19', '0000-00-00 00:00:00', '', 'incomplete'),
(95, '5c1268606b920', 53, '2018-12-13 15:10:40', '0000-00-00 00:00:00', '', 'incomplete'),
(96, '5c18c4281cc4f', 20, '2018-12-18 10:55:52', '0000-00-00 00:00:00', '', 'incomplete'),
(97, '5c18c4281cc4f', 22, '2018-12-18 11:09:58', '0000-00-00 00:00:00', '', 'incomplete'),
(98, '5c1268606b920', 20, '2018-12-19 14:32:55', '0000-00-00 00:00:00', '', 'incomplete'),
(99, 'eyJpdiI6IjZJUktFSzhKMExEYWVyVEoraUdBdnc9PSIsInZhbH', 41, '2019-01-09 10:37:30', '0000-00-00 00:00:00', '', 'incomplete'),
(100, 'eyJpdiI6IjZJUktFSzhKMExEYWVyVEoraUdBdnc9PSIsInZhbH', 53, '2019-01-09 10:39:36', '0000-00-00 00:00:00', '', 'incomplete'),
(101, '5c35c162e8178', 41, '2019-01-09 10:39:46', '0000-00-00 00:00:00', '', 'incomplete'),
(102, '5c18c4281cc4f', 55, '2019-01-09 18:10:00', '0000-00-00 00:00:00', '', 'incomplete'),
(103, '5c4f351e1cb86', 55, '2019-01-28 18:00:14', '0000-00-00 00:00:00', '', 'incomplete'),
(104, '5c645fdf52720', 20, '2019-02-13 19:20:15', '0000-00-00 00:00:00', '', 'incomplete'),
(105, '5c657f979ffaa', 24, '2019-02-14 15:47:51', '0000-00-00 00:00:00', '', 'incomplete');

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `user_id` int(11) DEFAULT NULL,
  `ip_address` varchar(45) COLLATE utf8_unicode_ci DEFAULT NULL,
  `user_agent` text COLLATE utf8_unicode_ci,
  `payload` text COLLATE utf8_unicode_ci NOT NULL,
  `last_activity` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('0KFIB4XdC7pkedICUUVbCMwpRd3IB7ostdfM1bSs', NULL, '216.244.66.197', 'Mozilla/5.0 (compatible; DotBot/1.1; http://www.opensiteexplorer.org/dotbot, help@moz.com)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiWmpBSVZPNUhkSnQ3V0dnRmhxT0ZkcjBWUkZzNDlMdnVYU3V1S0tKVSI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJXQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiV2FzaGluZ3RvbiI7czo4OiJjaXR5TmFtZSI7czo3OiJTZWF0dGxlIjtzOjc6InppcENvZGUiO3M6MDoiIjtzOjc6Imlzb0NvZGUiO3M6MDoiIjtzOjEwOiJwb3N0YWxDb2RlIjtzOjA6IiI7czo4OiJsYXRpdHVkZSI7ZDo0Ny40ODkxMDAwMDAwMDAwMDE7czo5OiJsb25naXR1ZGUiO2Q6LTEyMi4yOTA4O3M6OToibWV0cm9Db2RlIjtzOjM6IjgxOSI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiMjE2LjI0NC42Ni4xOTciO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo2OToiaHR0cHM6Ly9kYXJrYW4uZXUvY29udGVudC8zMjdlZGZiZTVjZWVjNzBhNjY2OGJiMGY2YzA5OTQ1NT9kYXJrYW5fcD0wIjt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAzMTcyNzA7czoxOiJjIjtpOjE1NTAzMTcyNzA7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550317274),
('10PRXIm1SNH098r6QMz7B6j3yPu28B7ipSf0AUmC', NULL, '77.75.79.32', 'Mozilla/5.0 (compatible; SeznamBot/3.2; +http://napoveda.seznam.cz/en/seznambot-intro/)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoid013RXZvZ1M4VUdOS1Yxdk5yRzlkeGJUek9zR01YMU5FdVk5UUg5cyI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjE0OiJDemVjaCBSZXB1YmxpYyI7czoxMToiY291bnRyeUNvZGUiO3M6MjoiQ1oiO3M6MTA6InJlZ2lvbkNvZGUiO3M6MDoiIjtzOjEwOiJyZWdpb25OYW1lIjtzOjA6IiI7czo4OiJjaXR5TmFtZSI7czowOiIiO3M6NzoiemlwQ29kZSI7czowOiIiO3M6NzoiaXNvQ29kZSI7czowOiIiO3M6MTA6InBvc3RhbENvZGUiO3M6MDoiIjtzOjg6ImxhdGl0dWRlIjtkOjQ5Ljc1O3M6OToibG9uZ2l0dWRlIjtkOjE1LjU7czo5OiJtZXRyb0NvZGUiO3M6MDoiIjtzOjg6ImFyZWFDb2RlIjtzOjA6IiI7czozOiJpc3AiO3M6MDoiIjtzOjI6ImlwIjtzOjExOiI3Ny43NS43OS4zMiI7czo2OiJkcml2ZXIiO3M6Mzg6IlN0ZXZlYmF1bWFuXExvY2F0aW9uXERyaXZlcnNcRnJlZUdlb0lwIjtzOjU6ImVycm9yIjtiOjA7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjI5OiJodHRwczovL2Jsb2cuZGFya2FuLmV1Lz9wPTI5MyI7fXM6OToiX3NmMl9tZXRhIjthOjM6e3M6MToidSI7aToxNTUwNDA4NjA4O3M6MToiYyI7aToxNTUwNDA4NjA4O3M6MToibCI7czoxOiIwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1550408612),
('16G3LZLYqKFrqHGyzhxadzxk69umX345VhmyJ6YA', NULL, '157.55.39.59', 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiOGg2ZlY5NXBSdnhCN0hCSzk1RE82ZWs5dHFJNzVLMUUyYXVoZGJYeSI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJXQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiV2FzaGluZ3RvbiI7czo4OiJjaXR5TmFtZSI7czo3OiJSZWRtb25kIjtzOjc6InppcENvZGUiO3M6MDoiIjtzOjc6Imlzb0NvZGUiO3M6MDoiIjtzOjEwOiJwb3N0YWxDb2RlIjtzOjA6IiI7czo4OiJsYXRpdHVkZSI7ZDo0Ny42ODAxMDAwMDAwMDAwMDM7czo5OiJsb25naXR1ZGUiO2Q6LTEyMi4xMjA2O3M6OToibWV0cm9Db2RlIjtzOjM6IjgxOSI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxMjoiMTU3LjU1LjM5LjU5IjtzOjY6ImRyaXZlciI7czozODoiU3RldmViYXVtYW5cTG9jYXRpb25cRHJpdmVyc1xGcmVlR2VvSXAiO3M6NToiZXJyb3IiO2I6MDt9czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjg6Imh0dHBzOi8vYmxvZy5kYXJrYW4uZXUvP3A9NzAiO31zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDQxNTE4NztzOjE6ImMiO2k6MTU1MDQxNTE4NztzOjE6ImwiO3M6MToiMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1550415191),
('18flGqN1tPJJ8NQC6LrWgejGrH9uXmLtq79xsjxI', NULL, '87.250.224.61', 'Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiYzdRWXBlNEZDcjd0bnlUZU90OXZQQWNwSVFqd2ZFbHRZcDgwMVlRTSI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjE4OiJSdXNzaWFuIEZlZGVyYXRpb24iO3M6MTE6ImNvdW50cnlDb2RlIjtzOjI6IlJVIjtzOjEwOiJyZWdpb25Db2RlIjtzOjA6IiI7czoxMDoicmVnaW9uTmFtZSI7czowOiIiO3M6ODoiY2l0eU5hbWUiO3M6MDoiIjtzOjc6InppcENvZGUiO3M6MDoiIjtzOjc6Imlzb0NvZGUiO3M6MDoiIjtzOjEwOiJwb3N0YWxDb2RlIjtzOjA6IiI7czo4OiJsYXRpdHVkZSI7ZDo2MDtzOjk6ImxvbmdpdHVkZSI7ZDoxMDA7czo5OiJtZXRyb0NvZGUiO3M6MDoiIjtzOjg6ImFyZWFDb2RlIjtzOjA6IiI7czozOiJpc3AiO3M6MDoiIjtzOjI6ImlwIjtzOjEzOiI4Ny4yNTAuMjI0LjYxIjtzOjY6ImRyaXZlciI7czozODoiU3RldmViYXVtYW5cTG9jYXRpb25cRHJpdmVyc1xGcmVlR2VvSXAiO3M6NToiZXJyb3IiO2I6MDt9czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTc6Imh0dHBzOi8vZGFya2FuLmV1Ijt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAyNzU3OTc7czoxOiJjIjtpOjE1NTAyNzU3OTc7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550275811),
('1w2TymuNRP0VmyCMuubqNhPEsXxKPJl6b3r8rj9Q', NULL, '176.119.32.159', 'WordPress/4.0; https://blog.darkan.eu', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiazdIYUY3dUZ6V0l2Vml6clRtTW9oRTQ0NW8yeHBESUs5V21IWWhjNyI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAzMTc0MzY7czoxOiJjIjtpOjE1NTAzMTc0MzY7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550317437),
('21qElFd11K11g7Aw8jUdClfmRbayuawYWyVhcaTL', NULL, '216.244.66.197', 'Mozilla/5.0 (compatible; DotBot/1.1; http://www.opensiteexplorer.org/dotbot, help@moz.com)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoic0M1Y3o0WDVxY05Fclp1aWZZeGFiNFBPQVFGNHZQbWdOSGR3MUZNTiI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJXQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiV2FzaGluZ3RvbiI7czo4OiJjaXR5TmFtZSI7czo3OiJTZWF0dGxlIjtzOjc6InppcENvZGUiO3M6MDoiIjtzOjc6Imlzb0NvZGUiO3M6MDoiIjtzOjEwOiJwb3N0YWxDb2RlIjtzOjA6IiI7czo4OiJsYXRpdHVkZSI7ZDo0Ny40ODkxMDAwMDAwMDAwMDE7czo5OiJsb25naXR1ZGUiO2Q6LTEyMi4yOTA4O3M6OToibWV0cm9Db2RlIjtzOjM6IjgxOSI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiMjE2LjI0NC42Ni4xOTciO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo2OToiaHR0cHM6Ly9kYXJrYW4uZXUvY29udGVudC9kMjE0MzAwM2ZlMGU0NWNjNjlkOTExM2JjOWE2YzQ2MD9kYXJrYW5fcD0wIjt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTA0MDAyNDQ7czoxOiJjIjtpOjE1NTA0MDAyNDQ7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550400265),
('22kmnN0MLqMnnQkQdVTs3Tjc21vm4PeVsNQXgCCl', NULL, '157.55.39.246', 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiRlk0RGNFbXRKV2JRSkQwMFQ5RFBDWGV1RUpwZUxhTUowQlE5dlVLcSI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJXQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiV2FzaGluZ3RvbiI7czo4OiJjaXR5TmFtZSI7czo3OiJSZWRtb25kIjtzOjc6InppcENvZGUiO3M6MDoiIjtzOjc6Imlzb0NvZGUiO3M6MDoiIjtzOjEwOiJwb3N0YWxDb2RlIjtzOjA6IiI7czo4OiJsYXRpdHVkZSI7ZDo0Ny42ODAxMDAwMDAwMDAwMDM7czo5OiJsb25naXR1ZGUiO2Q6LTEyMi4xMjA2O3M6OToibWV0cm9Db2RlIjtzOjM6IjgxOSI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxMzoiMTU3LjU1LjM5LjI0NiI7czo2OiJkcml2ZXIiO3M6Mzg6IlN0ZXZlYmF1bWFuXExvY2F0aW9uXERyaXZlcnNcRnJlZUdlb0lwIjtzOjU6ImVycm9yIjtiOjA7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjE3OiJodHRwczovL2Rhcmthbi5ldSI7fXM6OToiX3NmMl9tZXRhIjthOjM6e3M6MToidSI7aToxNTUwMzU5NDI3O3M6MToiYyI7aToxNTUwMzU5NDI3O3M6MToibCI7czoxOiIwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1550359431),
('2eApfR6k4qlbTBFJjjX2F1uAPYt8Nfk9dLrikrrs', NULL, '46.229.168.138', 'Mozilla/5.0 (compatible; SemrushBot/3~bl; +http://www.semrush.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiM0dTU2ptbzB6eHo3eHhaeGJLSTYwZFBTaU1JenFBMUk5dXRmd0hkMSI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czowOiIiO3M6MTA6InJlZ2lvbk5hbWUiO3M6MDoiIjtzOjg6ImNpdHlOYW1lIjtzOjA6IiI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6Mzg7czo5OiJsb25naXR1ZGUiO2Q6LTk3O3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiNDYuMjI5LjE2OC4xMzgiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czoyOToiaHR0cHM6Ly9ibG9nLmRhcmthbi5ldS8/cD0yNDYiO31zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDI0NDUwMTtzOjE6ImMiO2k6MTU1MDI0NDUwMTtzOjE6ImwiO3M6MToiMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1550244503),
('2ReprHqdo2EEedFmuzNrBCB63WjmgsChUddk28YD', NULL, '40.77.167.49', 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiMHpwTWU5SXA0OXpqckVuY3pkZjVwM3RQT0FseDEwUjFXVExGdGJsTiI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czowOiIiO3M6MTA6InJlZ2lvbk5hbWUiO3M6MDoiIjtzOjg6ImNpdHlOYW1lIjtzOjA6IiI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6Mzg7czo5OiJsb25naXR1ZGUiO2Q6LTk3O3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxMjoiNDAuNzcuMTY3LjQ5IjtzOjY6ImRyaXZlciI7czozODoiU3RldmViYXVtYW5cTG9jYXRpb25cRHJpdmVyc1xGcmVlR2VvSXAiO3M6NToiZXJyb3IiO2I6MDt9czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjk6Imh0dHBzOi8vYmxvZy5kYXJrYW4uZXUvP3A9Mjg4Ijt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAyODExNjI7czoxOiJjIjtpOjE1NTAyODExNjI7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550281164),
('39ngVZQHQq3NJhFL66P5BKDJkdbob47nF8w2MFVO', NULL, '46.229.168.147', 'Mozilla/5.0 (compatible; SemrushBot/3~bl; +http://www.semrush.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoic0FTWnJIbTJTOHZpT2hVY05DOU11ZWZ2RmZWbDVkWmJ6ODMxak5pUSI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czowOiIiO3M6MTA6InJlZ2lvbk5hbWUiO3M6MDoiIjtzOjg6ImNpdHlOYW1lIjtzOjA6IiI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6Mzg7czo5OiJsb25naXR1ZGUiO2Q6LTk3O3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiNDYuMjI5LjE2OC4xNDciO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czoyNzoiaHR0cHM6Ly9kYXJrYW4uZXUvYWZmaWxpYXRlIjt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAzNTg4Mzk7czoxOiJjIjtpOjE1NTAzNTg4Mzk7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550358843),
('4mi6zOrRvkhXVSjY7tPgXIGkpbXKeGNFym08DDNL', NULL, '46.229.168.150', 'Mozilla/5.0 (compatible; SemrushBot/3~bl; +http://www.semrush.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiRUFSOVhFbUpUM0ZybTEwSlAyWkdib0dhWVY0T3ZneWpWYlV4Y2hSTCI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czowOiIiO3M6MTA6InJlZ2lvbk5hbWUiO3M6MDoiIjtzOjg6ImNpdHlOYW1lIjtzOjA6IiI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6Mzg7czo5OiJsb25naXR1ZGUiO2Q6LTk3O3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiNDYuMjI5LjE2OC4xNTAiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czoyOToiaHR0cHM6Ly9ibG9nLmRhcmthbi5ldS8/cD0yMjIiO31zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDI0OTkzNTtzOjE6ImMiO2k6MTU1MDI0OTkzNTtzOjE6ImwiO3M6MToiMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1550249937),
('4U085wFYLLqduO7OpvqmYKGB0UG0QFc64BaU48lM', NULL, '46.229.168.134', 'Mozilla/5.0 (compatible; SemrushBot/3~bl; +http://www.semrush.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiV2VnZVE0a1V3V1dFSmNpNXp4dnVPa3NNN3lIOTNnM3ZiYlNoeUhucCI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czowOiIiO3M6MTA6InJlZ2lvbk5hbWUiO3M6MDoiIjtzOjg6ImNpdHlOYW1lIjtzOjA6IiI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6Mzg7czo5OiJsb25naXR1ZGUiO2Q6LTk3O3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiNDYuMjI5LjE2OC4xMzQiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czoxNzoiaHR0cHM6Ly9kYXJrYW4uZXUiO31zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDM2Mjc1ODtzOjE6ImMiO2k6MTU1MDM2Mjc1ODtzOjE6ImwiO3M6MToiMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1550362761),
('5XiCPHqNOKvQRbHhGlGpt91xfXV8HE1nknhPxk6J', NULL, '207.46.13.32', 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiamg2Mks4Z1VudG5EdURFRUxLSzR6NzFOdWNPRWJidU43RzBhY3hleSI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJXQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiV2FzaGluZ3RvbiI7czo4OiJjaXR5TmFtZSI7czo3OiJSZWRtb25kIjtzOjc6InppcENvZGUiO3M6MDoiIjtzOjc6Imlzb0NvZGUiO3M6MDoiIjtzOjEwOiJwb3N0YWxDb2RlIjtzOjA6IiI7czo4OiJsYXRpdHVkZSI7ZDo0Ny42ODAxMDAwMDAwMDAwMDM7czo5OiJsb25naXR1ZGUiO2Q6LTEyMi4xMjA2O3M6OToibWV0cm9Db2RlIjtzOjM6IjgxOSI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxMjoiMjA3LjQ2LjEzLjMyIjtzOjY6ImRyaXZlciI7czozODoiU3RldmViYXVtYW5cTG9jYXRpb25cRHJpdmVyc1xGcmVlR2VvSXAiO3M6NToiZXJyb3IiO2I6MDt9czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vYmxvZy5kYXJrYW4uZXUiO31zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDQyMTYxMztzOjE6ImMiO2k6MTU1MDQyMTYxMztzOjE6ImwiO3M6MToiMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1550421616),
('61v23SVEa9sKKEkjjqUMZyK1gVIvxsf84JjQnRXy', NULL, '46.229.168.143', 'Mozilla/5.0 (compatible; SemrushBot/3~bl; +http://www.semrush.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiY29pbUp3RUtnVldOVHllZWpZS2FjMnpOUVM3aWVVUEdXYXVoVVlxeiI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJDQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiQ2FsaWZvcm5pYSI7czo4OiJjaXR5TmFtZSI7czoxMzoiTW91bnRhaW4gVmlldyI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6MzcuNDE5MTk5OTk5OTk5OTk2O3M6OToibG9uZ2l0dWRlIjtkOi0xMjIuMDU3NDtzOjk6Im1ldHJvQ29kZSI7czozOiI4MDciO3M6ODoiYXJlYUNvZGUiO3M6MDoiIjtzOjM6ImlzcCI7czowOiIiO3M6MjoiaXAiO3M6MTA6IjY2LjEwMi4wLjAiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo0MDoiaHR0cHM6Ly9ibG9nLmRhcmthbi5ldS8/bGFuZz1lbiZtPTIwMTQxMCI7fXM6OToiX3NmMl9tZXRhIjthOjM6e3M6MToidSI7aToxNTUwMjYyMDQ2O3M6MToiYyI7aToxNTUwMjYyMDQ2O3M6MToibCI7czoxOiIwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1550262048),
('6zflM7YMjSPwoTyTInWlAzKr4IL1LRzT5rAaKZ8b', NULL, '216.244.66.197', 'Mozilla/5.0 (compatible; DotBot/1.1; http://www.opensiteexplorer.org/dotbot, help@moz.com)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoib3VYanFFa01UNGdpZm5PVWdtRVpnbjdZV05aN2hhRjVjVmhCS3dzTCI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJXQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiV2FzaGluZ3RvbiI7czo4OiJjaXR5TmFtZSI7czo3OiJTZWF0dGxlIjtzOjc6InppcENvZGUiO3M6MDoiIjtzOjc6Imlzb0NvZGUiO3M6MDoiIjtzOjEwOiJwb3N0YWxDb2RlIjtzOjA6IiI7czo4OiJsYXRpdHVkZSI7ZDo0Ny40ODkxMDAwMDAwMDAwMDE7czo5OiJsb25naXR1ZGUiO2Q6LTEyMi4yOTA4O3M6OToibWV0cm9Db2RlIjtzOjM6IjgxOSI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiMjE2LjI0NC42Ni4xOTciO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo2OToiaHR0cHM6Ly9kYXJrYW4uZXUvY29udGVudC84ODM2NzI3N2M2ZGQ3NzVhYzZjZGEwMzRiOGY4OGU1ZT9kYXJrYW5fcD0yIjt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAyODY3Mjg7czoxOiJjIjtpOjE1NTAyODY3Mjg7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550286731),
('A0z5AwqYX71n34GNhJUYy3wnKAfCsnczujaGkIEE', NULL, '216.244.66.197', 'Mozilla/5.0 (compatible; DotBot/1.1; http://www.opensiteexplorer.org/dotbot, help@moz.com)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiUkhmUmlnNFdOZ0dsMVpCOWJ2VlptVllpVHBCcVJiOXFlV3hQMDRneiI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJXQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiV2FzaGluZ3RvbiI7czo4OiJjaXR5TmFtZSI7czo3OiJTZWF0dGxlIjtzOjc6InppcENvZGUiO3M6MDoiIjtzOjc6Imlzb0NvZGUiO3M6MDoiIjtzOjEwOiJwb3N0YWxDb2RlIjtzOjA6IiI7czo4OiJsYXRpdHVkZSI7ZDo0Ny40ODkxMDAwMDAwMDAwMDE7czo5OiJsb25naXR1ZGUiO2Q6LTEyMi4yOTA4O3M6OToibWV0cm9Db2RlIjtzOjM6IjgxOSI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiMjE2LjI0NC42Ni4xOTciO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo2OToiaHR0cHM6Ly9kYXJrYW4uZXUvY29udGVudC83ZDY2MTdlNzkyODJjNmRhMzU0MDgwZWRlMjUzOGY2Mj9kYXJrYW5fcD02Ijt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAzMDYzNjU7czoxOiJjIjtpOjE1NTAzMDYzNjU7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550306368),
('atogXpYzZJ6VrMyyzoOGRKssisS0KRgBdmu3v9k3', NULL, '46.229.168.150', 'Mozilla/5.0 (compatible; SemrushBot/3~bl; +http://www.semrush.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiVjNua21pOVVEV1g0bkV5bWlwWk9PcjZ5ODFBZndma2dpZmtGbnN4QyI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czowOiIiO3M6MTA6InJlZ2lvbk5hbWUiO3M6MDoiIjtzOjg6ImNpdHlOYW1lIjtzOjA6IiI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6Mzg7czo5OiJsb25naXR1ZGUiO2Q6LTk3O3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiNDYuMjI5LjE2OC4xNTAiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czozNjoiaHR0cHM6Ly9kYXJrYW4uZXUvdGVybXNhbmRjb25kaXRpb25zIjt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAzNzk5ODM7czoxOiJjIjtpOjE1NTAzNzk5ODM7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550379986),
('b3CjpRI5KI6NWxZBe6gblQoJWgjqluzHpUPQ5pyU', NULL, '46.166.137.210', 'Mozilla/5.0 (compatible; Uptimebot/1.0; +http://www.uptime.com/uptimebot)', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiYlpTdHVjSlg1dEpLcEJWV2VOZzVDNDZPNndUYjNHMG9oQWlCUjI3diI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjExOiJOZXRoZXJsYW5kcyI7czoxMToiY291bnRyeUNvZGUiO3M6MjoiTkwiO3M6MTA6InJlZ2lvbkNvZGUiO3M6MDoiIjtzOjEwOiJyZWdpb25OYW1lIjtzOjA6IiI7czo4OiJjaXR5TmFtZSI7czowOiIiO3M6NzoiemlwQ29kZSI7czowOiIiO3M6NzoiaXNvQ29kZSI7czowOiIiO3M6MTA6InBvc3RhbENvZGUiO3M6MDoiIjtzOjg6ImxhdGl0dWRlIjtkOjUyLjU7czo5OiJsb25naXR1ZGUiO2Q6NS43NTtzOjk6Im1ldHJvQ29kZSI7czowOiIiO3M6ODoiYXJlYUNvZGUiO3M6MDoiIjtzOjM6ImlzcCI7czowOiIiO3M6MjoiaXAiO3M6MTQ6IjQ2LjE2Ni4xMzcuMjEwIjtzOjY6ImRyaXZlciI7czozODoiU3RldmViYXVtYW5cTG9jYXRpb25cRHJpdmVyc1xGcmVlR2VvSXAiO3M6NToiZXJyb3IiO2I6MDt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAzOTU1Nzg7czoxOiJjIjtpOjE1NTAzOTU1Nzg7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550395581),
('bbpsQ7d9SP3iwvu3o7LvPLdHuaoK9EOCsRne08Cc', NULL, '52.53.201.78', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiVVp2NEpmUk4xRWU1Ukowd3oybHk0N2pnNlE4ZGNCN0lZSzlwUExSTiI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJERSI7czoxMDoicmVnaW9uTmFtZSI7czo4OiJEZWxhd2FyZSI7czo4OiJjaXR5TmFtZSI7czoxMDoiV2lsbWluZ3RvbiI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6MzkuNTY0NTAwMDAwMDAwMDAyO3M6OToibG9uZ2l0dWRlIjtkOi03NS41OTY5OTk5OTk5OTk5OTQ7czo5OiJtZXRyb0NvZGUiO3M6MzoiNTA0IjtzOjg6ImFyZWFDb2RlIjtzOjA6IiI7czozOiJpc3AiO3M6MDoiIjtzOjI6ImlwIjtzOjEyOiI1Mi41My4yMDEuNzgiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czoyMToiaHR0cHM6Ly93d3cuZGFya2FuLmV1Ijt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAzNzY3MDE7czoxOiJjIjtpOjE1NTAzNzY3MDE7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550376703),
('bDgqfQ469shEcEqpizryWnxwvVe9QW7CHSZl3kvz', NULL, '216.244.66.197', 'Mozilla/5.0 (compatible; DotBot/1.1; http://www.opensiteexplorer.org/dotbot, help@moz.com)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiUXg2SEFvRVNQY3loWGhNRkowM3hNd3FzRlVpS1dISzZ2WDI3RHRTdCI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJXQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiV2FzaGluZ3RvbiI7czo4OiJjaXR5TmFtZSI7czo3OiJTZWF0dGxlIjtzOjc6InppcENvZGUiO3M6MDoiIjtzOjc6Imlzb0NvZGUiO3M6MDoiIjtzOjEwOiJwb3N0YWxDb2RlIjtzOjA6IiI7czo4OiJsYXRpdHVkZSI7ZDo0Ny40ODkxMDAwMDAwMDAwMDE7czo5OiJsb25naXR1ZGUiO2Q6LTEyMi4yOTA4O3M6OToibWV0cm9Db2RlIjtzOjM6IjgxOSI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiMjE2LjI0NC42Ni4xOTciO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo2OToiaHR0cHM6Ly9kYXJrYW4uZXUvY29udGVudC9kMjE0MzAwM2ZlMGU0NWNjNjlkOTExM2JjOWE2YzQ2MD9kYXJrYW5fcD00Ijt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAzMDY0MjM7czoxOiJjIjtpOjE1NTAzMDY0MjM7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550306426),
('bHwvhyg7gzXDR0nnedQS8cR3wJSphVA4W7PNgrfG', NULL, '46.229.168.149', 'Mozilla/5.0 (compatible; SemrushBot/3~bl; +http://www.semrush.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiM0ZxeG1Ec2ZpbWlrank2NmRPYW4yZkpONXpqdVJyY21sOXdJa1BaRSI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czowOiIiO3M6MTA6InJlZ2lvbk5hbWUiO3M6MDoiIjtzOjg6ImNpdHlOYW1lIjtzOjA6IiI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6Mzg7czo5OiJsb25naXR1ZGUiO2Q6LTk3O3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiNDYuMjI5LjE2OC4xNDkiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czoxNzoiaHR0cHM6Ly9kYXJrYW4uZXUiO31zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDQwNTg5OTtzOjE6ImMiO2k6MTU1MDQwNTg5OTtzOjE6ImwiO3M6MToiMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1550405902),
('c3htzbxS1SkWSlxYQPvQ1Y02QqtNTMgWanm01I3q', NULL, '5.254.40.3', 'Mozilla/5.0 (Windows NT 10.0; WOW64; rv:42.0) Gecko/20100101 Firefox/42.0', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiQ0wwTVNOSEZHZEhSU1ptTU5Fb2FQUmFaSEp6dHFtblJRRmVpcDZTeSI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjc6IlJvbWFuaWEiO3M6MTE6ImNvdW50cnlDb2RlIjtzOjI6IlJPIjtzOjEwOiJyZWdpb25Db2RlIjtzOjI6IjE3IjtzOjEwOiJyZWdpb25OYW1lIjtzOjQ6IkRvbGoiO3M6ODoiY2l0eU5hbWUiO3M6NzoiQ3JhaW92YSI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6NDQuMzE2Njk5OTk5OTk5OTk3O3M6OToibG9uZ2l0dWRlIjtkOjIzLjgwMDAwMDAwMDAwMDAwMTtzOjk6Im1ldHJvQ29kZSI7czowOiIiO3M6ODoiYXJlYUNvZGUiO3M6MDoiIjtzOjM6ImlzcCI7czowOiIiO3M6MjoiaXAiO3M6MTA6IjUuMjU0LjQwLjMiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDQwMDQ5MztzOjE6ImMiO2k6MTU1MDQwMDQ5MztzOjE6ImwiO3M6MToiMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1550400503),
('CjzpTCiAkCJ9mne1QmKna6qKXnJtEldLfgPO3CCn', NULL, '216.244.66.197', 'Mozilla/5.0 (compatible; DotBot/1.1; http://www.opensiteexplorer.org/dotbot, help@moz.com)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiR3ZnVjFQdlBqeVlObEpMeFJsTDdiQmhRMDQ5UmtVNnY1VXB3Z1F2SCI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJXQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiV2FzaGluZ3RvbiI7czo4OiJjaXR5TmFtZSI7czo3OiJTZWF0dGxlIjtzOjc6InppcENvZGUiO3M6MDoiIjtzOjc6Imlzb0NvZGUiO3M6MDoiIjtzOjEwOiJwb3N0YWxDb2RlIjtzOjA6IiI7czo4OiJsYXRpdHVkZSI7ZDo0Ny40ODkxMDAwMDAwMDAwMDE7czo5OiJsb25naXR1ZGUiO2Q6LTEyMi4yOTA4O3M6OToibWV0cm9Db2RlIjtzOjM6IjgxOSI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiMjE2LjI0NC42Ni4xOTciO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo2OToiaHR0cHM6Ly9kYXJrYW4uZXUvY29udGVudC84ODM2NzI3N2M2ZGQ3NzVhYzZjZGEwMzRiOGY4OGU1ZT9kYXJrYW5fcD05Ijt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAyNTQ2Njc7czoxOiJjIjtpOjE1NTAyNTQ2Njc7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550254672),
('CSbk02TS9NHs9gdW1o9AvMGaBwHKdtdarMS1Xnwx', NULL, '94.72.123.135', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiNkpydkFsSnpHeDdQZzJRcWRLblpkU0toN0xSNVBCc2hQMktuN3VDdiI7czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTc6Imh0dHBzOi8vZGFya2FuLmV1Ijt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTA0MjgzMzc7czoxOiJjIjtpOjE1NTA0MjgzMzc7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550428341),
('d1LzoD5IpAPMOV2hocjgOULga7VOWH7A3KpfeTc7', NULL, '216.244.66.197', 'Mozilla/5.0 (compatible; DotBot/1.1; http://www.opensiteexplorer.org/dotbot, help@moz.com)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiUFd4ME92TVZKamVzdVNqQndMRWNYQ2MxNlFrR2RYbTY0TnVTOHc5ZiI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJXQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiV2FzaGluZ3RvbiI7czo4OiJjaXR5TmFtZSI7czo3OiJTZWF0dGxlIjtzOjc6InppcENvZGUiO3M6MDoiIjtzOjc6Imlzb0NvZGUiO3M6MDoiIjtzOjEwOiJwb3N0YWxDb2RlIjtzOjA6IiI7czo4OiJsYXRpdHVkZSI7ZDo0Ny40ODkxMDAwMDAwMDAwMDE7czo5OiJsb25naXR1ZGUiO2Q6LTEyMi4yOTA4O3M6OToibWV0cm9Db2RlIjtzOjM6IjgxOSI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiMjE2LjI0NC42Ni4xOTciO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo2OToiaHR0cHM6Ly9kYXJrYW4uZXUvY29udGVudC8xY2E2Y2U1MDRlZjhlOWIzZDNlMGRiMTkyMmU4MmNjYj9kYXJrYW5fcD00Ijt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAzMDM4NDg7czoxOiJjIjtpOjE1NTAzMDM4NDg7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550303852),
('DAPVG2syZdPDuxO8H2z7cPxIdWoJ8DcUBwANblNb', NULL, '46.229.168.135', 'Mozilla/5.0 (compatible; SemrushBot/3~bl; +http://www.semrush.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiT2NScHRlQTg4TXZsakFycmZnaWJtVUNSVHE0b2RFb1QyaHlabnlmTCI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czowOiIiO3M6MTA6InJlZ2lvbk5hbWUiO3M6MDoiIjtzOjg6ImNpdHlOYW1lIjtzOjA6IiI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6Mzg7czo5OiJsb25naXR1ZGUiO2Q6LTk3O3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiNDYuMjI5LjE2OC4xMzUiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czoxNzoiaHR0cHM6Ly9kYXJrYW4uZXUiO31zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDI0OTkzODtzOjE6ImMiO2k6MTU1MDI0OTkzODtzOjE6ImwiO3M6MToiMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1550249940),
('eAUjjT1dXf5AJ7pOkxuUZQ3CHjMRaEXDQu56ZBje', NULL, '216.244.66.197', 'Mozilla/5.0 (compatible; DotBot/1.1; http://www.opensiteexplorer.org/dotbot, help@moz.com)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiM0YwWUpGdmJ3aDFGa1RiY3lyY1lvTXhHU3ZyeEQyRGUza2NlR3czRiI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJXQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiV2FzaGluZ3RvbiI7czo4OiJjaXR5TmFtZSI7czo3OiJTZWF0dGxlIjtzOjc6InppcENvZGUiO3M6MDoiIjtzOjc6Imlzb0NvZGUiO3M6MDoiIjtzOjEwOiJwb3N0YWxDb2RlIjtzOjA6IiI7czo4OiJsYXRpdHVkZSI7ZDo0Ny40ODkxMDAwMDAwMDAwMDE7czo5OiJsb25naXR1ZGUiO2Q6LTEyMi4yOTA4O3M6OToibWV0cm9Db2RlIjtzOjM6IjgxOSI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiMjE2LjI0NC42Ni4xOTciO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo2OToiaHR0cHM6Ly9kYXJrYW4uZXUvY29udGVudC8xY2E2Y2U1MDRlZjhlOWIzZDNlMGRiMTkyMmU4MmNjYj9kYXJrYW5fcD0zIjt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAzMTcxODc7czoxOiJjIjtpOjE1NTAzMTcxODc7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550317190),
('ER5D4v8VRIrgo03PQGAyWbDdpHwQP3QHMsejJTIL', NULL, '176.119.32.159', 'WordPress/4.0; https://blog.darkan.eu', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiM0xVWE1EVWlDZzV0cUhHNjFOQWx5YzdzalNnNHFVdmwxNjFvaDUzMSI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAzMzQ4MDY7czoxOiJjIjtpOjE1NTAzMzQ4MDY7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550334806),
('eVVre3JPG0COxxNKcyqLNSG6BXOEr0nR9dsXm8sx', NULL, '77.75.76.162', 'Mozilla/5.0 (compatible; SeznamBot/3.2; +http://napoveda.seznam.cz/en/seznambot-intro/)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiaUV3TU92cUhxTjhxend6Q3VMME1jUm9vSUs5RFMyVDlZRHNJbnpIRCI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjE0OiJDemVjaCBSZXB1YmxpYyI7czoxMToiY291bnRyeUNvZGUiO3M6MjoiQ1oiO3M6MTA6InJlZ2lvbkNvZGUiO3M6MDoiIjtzOjEwOiJyZWdpb25OYW1lIjtzOjA6IiI7czo4OiJjaXR5TmFtZSI7czowOiIiO3M6NzoiemlwQ29kZSI7czowOiIiO3M6NzoiaXNvQ29kZSI7czowOiIiO3M6MTA6InBvc3RhbENvZGUiO3M6MDoiIjtzOjg6ImxhdGl0dWRlIjtkOjQ5Ljc1O3M6OToibG9uZ2l0dWRlIjtkOjE1LjU7czo5OiJtZXRyb0NvZGUiO3M6MDoiIjtzOjg6ImFyZWFDb2RlIjtzOjA6IiI7czozOiJpc3AiO3M6MDoiIjtzOjI6ImlwIjtzOjEyOiI3Ny43NS43Ni4xNjIiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czoyOToiaHR0cHM6Ly9ibG9nLmRhcmthbi5ldS8/cD00MzEiO31zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDQwNDQzNDtzOjE6ImMiO2k6MTU1MDQwNDQzNDtzOjE6ImwiO3M6MToiMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1550404437),
('ezXyCqfFl84rykvWJlJrPlHL1mIWxq218JMtFdmw', NULL, '46.229.168.148', 'Mozilla/5.0 (compatible; SemrushBot/3~bl; +http://www.semrush.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoidGk1cmdibXJlMUtOVGdTNVFzS3BWbU9aRFQxcDFjTEZpT2JXM0YzdCI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czowOiIiO3M6MTA6InJlZ2lvbk5hbWUiO3M6MDoiIjtzOjg6ImNpdHlOYW1lIjtzOjA6IiI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6Mzg7czo5OiJsb25naXR1ZGUiO2Q6LTk3O3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiNDYuMjI5LjE2OC4xNDgiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czozNToiaHR0cHM6Ly9ibG9nLmRhcmthbi5ldS8/cGFnZV9pZD0zNTQiO31zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDI1NjUxMjtzOjE6ImMiO2k6MTU1MDI1NjUxMjtzOjE6ImwiO3M6MToiMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1550256514),
('f0ltN1gQaWfJPm6iVIdvnJu0Ac5Pbt38LTuyoY77', NULL, '13.57.233.99', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiWjJkYWs5MzhNZ2FSZTdWT2NpT2hHdHZ5SDZHZmlUQ3RWb1RURDJuUiI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJDVCI7czoxMDoicmVnaW9uTmFtZSI7czoxMToiQ29ubmVjdGljdXQiO3M6ODoiY2l0eU5hbWUiO3M6NzoiTm9yd2FsayI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6NDEuMTI3MDk5OTk5OTk5OTk5O3M6OToibG9uZ2l0dWRlIjtkOi03My40NDE1OTk5OTk5OTk5OTQ7czo5OiJtZXRyb0NvZGUiO3M6MzoiNTAxIjtzOjg6ImFyZWFDb2RlIjtzOjA6IiI7czozOiJpc3AiO3M6MDoiIjtzOjI6ImlwIjtzOjEyOiIxMy41Ny4yMzMuOTkiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czoyMToiaHR0cHM6Ly93d3cuZGFya2FuLmV1Ijt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAyNzg4NTM7czoxOiJjIjtpOjE1NTAyNzg4NTM7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550278857),
('FOA6OXE3R4qm82AyQlN0ZSJRljCXsCdro62PU7Du', NULL, '49.247.207.12', 'Mozilla/5.0 zgrab/0.x', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiRWE1WEFHSTZlNnFYeW8yUFA1RGdUbnhCRG9xbDVZUXRFRjBYdjc3bCI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjE4OiJLb3JlYSwgUmVwdWJsaWMgb2YiO3M6MTE6ImNvdW50cnlDb2RlIjtzOjI6IktSIjtzOjEwOiJyZWdpb25Db2RlIjtzOjA6IiI7czoxMDoicmVnaW9uTmFtZSI7czowOiIiO3M6ODoiY2l0eU5hbWUiO3M6MDoiIjtzOjc6InppcENvZGUiO3M6MDoiIjtzOjc6Imlzb0NvZGUiO3M6MDoiIjtzOjEwOiJwb3N0YWxDb2RlIjtzOjA6IiI7czo4OiJsYXRpdHVkZSI7ZDozNy41NztzOjk6ImxvbmdpdHVkZSI7ZDoxMjYuOTg7czo5OiJtZXRyb0NvZGUiO3M6MDoiIjtzOjg6ImFyZWFDb2RlIjtzOjA6IiI7czozOiJpc3AiO3M6MDoiIjtzOjI6ImlwIjtzOjEzOiI0OS4yNDcuMjA3LjEyIjtzOjY6ImRyaXZlciI7czozODoiU3RldmViYXVtYW5cTG9jYXRpb25cRHJpdmVyc1xGcmVlR2VvSXAiO3M6NToiZXJyb3IiO2I6MDt9czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTc2LjExOS42My4xMjQiO31zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDMxNzQ5MjtzOjE6ImMiO2k6MTU1MDMxNzQ5MjtzOjE6ImwiO3M6MToiMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1550317494),
('fQhwTSI70WnwOwueXieNsbIZpCqVVkiL5b0MOQkb', NULL, '46.229.168.131', 'Mozilla/5.0 (compatible; SemrushBot/3~bl; +http://www.semrush.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiYVlDaTBtZ3NYOWdROWRTaWNnQXpOS1RlcllLSmgweWxIYkhwVzV5NCI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czowOiIiO3M6MTA6InJlZ2lvbk5hbWUiO3M6MDoiIjtzOjg6ImNpdHlOYW1lIjtzOjA6IiI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6Mzg7czo5OiJsb25naXR1ZGUiO2Q6LTk3O3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiNDYuMjI5LjE2OC4xMzEiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czozMDoiaHR0cHM6Ly9ibG9nLmRhcmthbi5ldS8/Y2F0PTEyIjt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAyNDk5NjY7czoxOiJjIjtpOjE1NTAyNDk5NjY7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550249969),
('Frs4RaJJ0Pnna63udMZ9PDNsXs9puDeal9r3oFlA', NULL, '176.119.32.159', 'WordPress/4.0; https://blog.darkan.eu', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUnJiN2RzYnU0S2tmN2pGVVM4dENja1RwaU9WTEFGQnlwYzlVcVY1aiI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAzMTAxMTg7czoxOiJjIjtpOjE1NTAzMTAxMTg7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550310118),
('GHTFSl9lZQ1ZPhrF9BmztpygH3frep2z3uCxhdCD', NULL, '46.229.168.141', 'Mozilla/5.0 (compatible; SemrushBot/3~bl; +http://www.semrush.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoidXJYM2NwWFU2QXp4SUJzTFVNc1NZNmxPclVyTXlWcmdJTWcwQ1pMMiI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czowOiIiO3M6MTA6InJlZ2lvbk5hbWUiO3M6MDoiIjtzOjg6ImNpdHlOYW1lIjtzOjA6IiI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6Mzg7czo5OiJsb25naXR1ZGUiO2Q6LTk3O3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiNDYuMjI5LjE2OC4xNDEiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czoxNzoiaHR0cHM6Ly9kYXJrYW4uZXUiO31zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDI0OTk3MTtzOjE6ImMiO2k6MTU1MDI0OTk3MTtzOjE6ImwiO3M6MToiMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1550249973),
('gMC1HtEDje569c1NlfWibmSHibipWLDJzOkdUi0n', NULL, '66.249.76.126', 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoicERuMFhFWmU0Yk9DTmhOVk5pdDlrUVdpcDQ3TDBmQ1VaSmZaZE9lWSI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJDQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiQ2FsaWZvcm5pYSI7czo4OiJjaXR5TmFtZSI7czoxMzoiTW91bnRhaW4gVmlldyI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6MzcuNDE5MTk5OTk5OTk5OTk2O3M6OToibG9uZ2l0dWRlIjtkOi0xMjIuMDU3NDtzOjk6Im1ldHJvQ29kZSI7czozOiI4MDciO3M6ODoiYXJlYUNvZGUiO3M6MDoiIjtzOjM6ImlzcCI7czowOiIiO3M6MjoiaXAiO3M6MTM6IjY2LjI0OS43Ni4xMjYiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo2NjoiaHR0cHM6Ly9ibG9nLmRhcmthbi5ldS93cC1jb250ZW50L3RoZW1lcy9yYWRpYXRlL3N0eWxlLmNzcz92ZXI9NC4wIjt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTA0MTYzNTA7czoxOiJjIjtpOjE1NTA0MTYzNTA7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550416352),
('gyYUPcP8j3B2YXpXEqqc9NGYnCeaa5SYhmDETCeu', NULL, '209.17.96.26', 'Mozilla/5.0 (compatible; Nimbostratus-Bot/v1.3.2; http://cloudsystemnetworks.com)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoicEZ4QVBHS3JRM004N2VvRUZySmNVM2ZQRUROTTBjaERmV0djdmg3aiI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czowOiIiO3M6MTA6InJlZ2lvbk5hbWUiO3M6MDoiIjtzOjg6ImNpdHlOYW1lIjtzOjA6IiI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6Mzg7czo5OiJsb25naXR1ZGUiO2Q6LTk3O3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxMjoiMjA5LjE3Ljk2LjI2IjtzOjY6ImRyaXZlciI7czozODoiU3RldmViYXVtYW5cTG9jYXRpb25cRHJpdmVyc1xGcmVlR2VvSXAiO3M6NToiZXJyb3IiO2I6MDt9czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjE6Imh0dHBzOi8vd3d3LmRhcmthbi5ldSI7fXM6OToiX3NmMl9tZXRhIjthOjM6e3M6MToidSI7aToxNTUwMjU1NjAwO3M6MToiYyI7aToxNTUwMjU1NjAwO3M6MToibCI7czoxOiIwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1550255603),
('h2Y4QezGCEM5X8ZRE74fBkhDBChFIKd42bw3eunz', NULL, '66.249.76.85', 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.96 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiRjN0dDJLSUpCVHlRYU5TVmVmUTRpMFFiUEgwdEo2WVc1RGN2WEk2dyI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czowOiIiO3M6MTA6InJlZ2lvbk5hbWUiO3M6MDoiIjtzOjg6ImNpdHlOYW1lIjtzOjA6IiI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO3M6NzoiMzcuNzUxMCI7czo5OiJsb25naXR1ZGUiO3M6ODoiLTk3LjgyMjAiO3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxMjoiNjYuMjQ5Ljc2Ljg1IjtzOjY6ImRyaXZlciI7czozNToiU3RldmViYXVtYW5cTG9jYXRpb25cRHJpdmVyc1xJcEluZm8iO3M6NToiZXJyb3IiO2I6MDt9czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTc6Imh0dHBzOi8vZGFya2FuLmV1Ijt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAzODU0OTE7czoxOiJjIjtpOjE1NTAzODU0OTE7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550385510),
('H6GJzoN19n2Mo2PGS9nSuyESpdmOE2gP9fE1Rskg', NULL, '46.229.168.144', 'Mozilla/5.0 (compatible; SemrushBot/3~bl; +http://www.semrush.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiNVI5cmx4a3VyVnZNRGhNQTVZZDUxV05rM2I1MDhzdXlTQ1lKdEtqQSI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czowOiIiO3M6MTA6InJlZ2lvbk5hbWUiO3M6MDoiIjtzOjg6ImNpdHlOYW1lIjtzOjA6IiI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6Mzg7czo5OiJsb25naXR1ZGUiO2Q6LTk3O3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiNDYuMjI5LjE2OC4xNDQiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czoyOToiaHR0cHM6Ly9ibG9nLmRhcmthbi5ldS8/cD0xNzgiO31zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDMyMDM4MDtzOjE6ImMiO2k6MTU1MDMyMDM4MDtzOjE6ImwiO3M6MToiMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1550320383),
('H71kmIb2KpsTw1MgZ7zLvxknuBCbrrOHqLrS5H32', NULL, '157.55.39.152', 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiY2I5RTA0T0FwaHJZd1MzRTI2Nnk1UFkzUzczekFPNFAydVk4d2tyRSI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJXQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiV2FzaGluZ3RvbiI7czo4OiJjaXR5TmFtZSI7czo3OiJSZWRtb25kIjtzOjc6InppcENvZGUiO3M6MDoiIjtzOjc6Imlzb0NvZGUiO3M6MDoiIjtzOjEwOiJwb3N0YWxDb2RlIjtzOjA6IiI7czo4OiJsYXRpdHVkZSI7ZDo0Ny42ODAxMDAwMDAwMDAwMDM7czo5OiJsb25naXR1ZGUiO2Q6LTEyMi4xMjA2O3M6OToibWV0cm9Db2RlIjtzOjM6IjgxOSI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxMzoiMTU3LjU1LjM5LjE1MiI7czo2OiJkcml2ZXIiO3M6Mzg6IlN0ZXZlYmF1bWFuXExvY2F0aW9uXERyaXZlcnNcRnJlZUdlb0lwIjtzOjU6ImVycm9yIjtiOjA7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjIyOiJodHRwczovL2Jsb2cuZGFya2FuLmV1Ijt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAyNDMxNzg7czoxOiJjIjtpOjE1NTAyNDMxNzg7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550243181),
('HfsPF7LFS2ziyBdgOnYH8JQkwyCTCoIGcSLIxABr', NULL, '46.229.168.145', 'Mozilla/5.0 (compatible; SemrushBot/3~bl; +http://www.semrush.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoicTVsa3ZHaFZxZU5ZcUY1TmRTM2tRZlF0MmRucnozQjhqd2wyaFA1dCI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czowOiIiO3M6MTA6InJlZ2lvbk5hbWUiO3M6MDoiIjtzOjg6ImNpdHlOYW1lIjtzOjA6IiI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6Mzg7czo5OiJsb25naXR1ZGUiO2Q6LTk3O3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiNDYuMjI5LjE2OC4xNDUiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo2OToiaHR0cHM6Ly9kYXJrYW4uZXUvY29udGVudC84ODM2NzI3N2M2ZGQ3NzVhYzZjZGEwMzRiOGY4OGU1ZT9kYXJrYW5fcD04Ijt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTA0MDMyODQ7czoxOiJjIjtpOjE1NTA0MDMyODQ7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550403288),
('HM1HMxc4zXCJecTWhHYK8lO6vu4rphRP5x3faEmh', NULL, '46.229.168.141', 'Mozilla/5.0 (compatible; SemrushBot/3~bl; +http://www.semrush.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiMVhLa3B4djMxcHBEZ0dTYzlPVlhObGN3MVd2REREb1V3dndmM29FUiI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czoyMjoiaHR0cHM6Ly9kYXJrYW4uZXUvaG9tZSI7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjIyOiJodHRwczovL2Rhcmthbi5ldS9ob21lIjt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAyNzQ2Mzg7czoxOiJjIjtpOjE1NTAyNzQ2Mzg7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550274641),
('hR6x2WlTCykMCO03EuBZRGgbRjWwsdRqEnGFcAOY', NULL, '46.229.168.131', 'Mozilla/5.0 (compatible; SemrushBot/3~bl; +http://www.semrush.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiY1RIQmVaTFo4NTZYWHhsZ2ZuRDFEekhucGZPNmlsWlFLR090NjVaTSI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czowOiIiO3M6MTA6InJlZ2lvbk5hbWUiO3M6MDoiIjtzOjg6ImNpdHlOYW1lIjtzOjA6IiI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6Mzg7czo5OiJsb25naXR1ZGUiO2Q6LTk3O3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiNDYuMjI5LjE2OC4xMzEiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czoxNzoiaHR0cHM6Ly9kYXJrYW4uZXUiO31zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDI2NDA0MztzOjE6ImMiO2k6MTU1MDI2NDA0MztzOjE6ImwiO3M6MToiMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1550264046),
('HRB1R0huGH4KYLuwr3BPB1uEudrzsnNv2NjXE0wF', NULL, '46.229.168.151', 'Mozilla/5.0 (compatible; SemrushBot/3~bl; +http://www.semrush.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiemNLaGJNc2pYbW9WdGtSWFZETndyR3NRcU15Y1RIZmdLdVNYSkFIMSI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czowOiIiO3M6MTA6InJlZ2lvbk5hbWUiO3M6MDoiIjtzOjg6ImNpdHlOYW1lIjtzOjA6IiI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6Mzg7czo5OiJsb25naXR1ZGUiO2Q6LTk3O3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiNDYuMjI5LjE2OC4xNTEiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czoyOToiaHR0cHM6Ly9ibG9nLmRhcmthbi5ldS8/cD0yMjkiO31zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDM2Mjc1MjtzOjE6ImMiO2k6MTU1MDM2Mjc1MjtzOjE6ImwiO3M6MToiMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1550362755),
('I3oKBQrJ6JjmP6ivabeXkqszc4LsqZniagyJCW75', NULL, '176.119.32.159', 'WordPress/4.0; https://blog.darkan.eu', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSk52M1NsWUlqd2RFQ2pPclRNcENQVDRWcno0ZmplcDFjMnFFVEg0NyI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAyNDU5Njk7czoxOiJjIjtpOjE1NTAyNDU5Njk7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550245970);
INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('iBjG5U3qcM3RnJ5vW5povENLwykdUIb8Fe2t281o', NULL, '46.229.168.139', 'Mozilla/5.0 (compatible; SemrushBot/3~bl; +http://www.semrush.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiTzhkZ0hWeFplVFVzcHBybzR2SjJwRHRDdWJpWG5YRjZGaHI5cHNZYyI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czowOiIiO3M6MTA6InJlZ2lvbk5hbWUiO3M6MDoiIjtzOjg6ImNpdHlOYW1lIjtzOjA6IiI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6Mzg7czo5OiJsb25naXR1ZGUiO2Q6LTk3O3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiNDYuMjI5LjE2OC4xMzkiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czoyNToiaHR0cHM6Ly9kYXJrYW4uZXUvYWJvdXR1cyI7fXM6OToiX3NmMl9tZXRhIjthOjM6e3M6MToidSI7aToxNTUwNDE0MzA2O3M6MToiYyI7aToxNTUwNDE0MzA2O3M6MToibCI7czoxOiIwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1550414310),
('IpvgJ6C1Ui87HgZf2WV2qrCrafbHr6TmU6NLOqNN', NULL, '157.55.39.246', 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiM3FEWWFzcWhPYkZrTEs5dENFdXltRDFkUGIweVNIV2dXZFpVTjFVUyI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJXQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiV2FzaGluZ3RvbiI7czo4OiJjaXR5TmFtZSI7czo3OiJSZWRtb25kIjtzOjc6InppcENvZGUiO3M6MDoiIjtzOjc6Imlzb0NvZGUiO3M6MDoiIjtzOjEwOiJwb3N0YWxDb2RlIjtzOjA6IiI7czo4OiJsYXRpdHVkZSI7ZDo0Ny42ODAxMDAwMDAwMDAwMDM7czo5OiJsb25naXR1ZGUiO2Q6LTEyMi4xMjA2O3M6OToibWV0cm9Db2RlIjtzOjM6IjgxOSI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxMzoiMTU3LjU1LjM5LjI0NiI7czo2OiJkcml2ZXIiO3M6Mzg6IlN0ZXZlYmF1bWFuXExvY2F0aW9uXERyaXZlcnNcRnJlZUdlb0lwIjtzOjU6ImVycm9yIjtiOjA7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjI4OiJodHRwczovL2Jsb2cuZGFya2FuLmV1Lz9wPTkwIjt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAzNzA2MTY7czoxOiJjIjtpOjE1NTAzNzA2MTY7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550370620),
('iQfbLNr6HVqqabpp9pP2pbPhR3MnfJO6CaEO030f', NULL, '178.255.215.85', 'Mozilla/5.0 (compatible; Exabot/3.0; +http://www.exabot.com/go/robot)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoid1V1ejY3ZGI1bVIzc1dJWnRScnIzdUNjNnlhc3B1d0h0Q3h5TEVnaCI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjY6IkZyYW5jZSI7czoxMToiY291bnRyeUNvZGUiO3M6MjoiRlIiO3M6MTA6InJlZ2lvbkNvZGUiO3M6MDoiIjtzOjEwOiJyZWdpb25OYW1lIjtzOjA6IiI7czo4OiJjaXR5TmFtZSI7czowOiIiO3M6NzoiemlwQ29kZSI7czowOiIiO3M6NzoiaXNvQ29kZSI7czowOiIiO3M6MTA6InBvc3RhbENvZGUiO3M6MDoiIjtzOjg6ImxhdGl0dWRlIjtkOjQ4Ljg1OTk5OTk5OTk5OTk5OTtzOjk6ImxvbmdpdHVkZSI7ZDoyLjM1MDAwMDAwMDAwMDAwMDE7czo5OiJtZXRyb0NvZGUiO3M6MDoiIjtzOjg6ImFyZWFDb2RlIjtzOjA6IiI7czozOiJpc3AiO3M6MDoiIjtzOjI6ImlwIjtzOjE0OiIxNzguMjU1LjIxNS44NSI7czo2OiJkcml2ZXIiO3M6Mzg6IlN0ZXZlYmF1bWFuXExvY2F0aW9uXERyaXZlcnNcRnJlZUdlb0lwIjtzOjU6ImVycm9yIjtiOjA7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjE3OiJodHRwczovL2Rhcmthbi5ldSI7fXM6OToiX3NmMl9tZXRhIjthOjM6e3M6MToidSI7aToxNTUwMjk4MDIxO3M6MToiYyI7aToxNTUwMjk4MDIxO3M6MToibCI7czoxOiIwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1550298024),
('Ir21H3Z4LBaqmshlRqXF7RLP1TyQWMRLHMDIdQvD', NULL, '46.229.168.147', 'Mozilla/5.0 (compatible; SemrushBot/3~bl; +http://www.semrush.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoidWhraWJzRGhjRkdOUzRNTjZ1dExqVFVoampwSU9CV0RJdVdlV1hTMyI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czowOiIiO3M6MTA6InJlZ2lvbk5hbWUiO3M6ODoiVmlyZ2luaWEiO3M6ODoiY2l0eU5hbWUiO3M6NzoiQXNoYnVybiI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czo1OiIyMDE0NyI7czo4OiJsYXRpdHVkZSI7czo3OiIzOS4wMTgwIjtzOjk6ImxvbmdpdHVkZSI7czo4OiItNzcuNTM5MCI7czo5OiJtZXRyb0NvZGUiO3M6MDoiIjtzOjg6ImFyZWFDb2RlIjtzOjA6IiI7czozOiJpc3AiO3M6MDoiIjtzOjI6ImlwIjtzOjE0OiI0Ni4yMjkuMTY4LjE0NyI7czo2OiJkcml2ZXIiO3M6MzU6IlN0ZXZlYmF1bWFuXExvY2F0aW9uXERyaXZlcnNcSXBJbmZvIjtzOjU6ImVycm9yIjtiOjA7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjI3OiJodHRwczovL2Rhcmthbi5ldS9hZmZpbGlhdGUiO31zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDM1ODgyNDtzOjE6ImMiO2k6MTU1MDM1ODgyNDtzOjE6ImwiO3M6MToiMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1550358844),
('iwFXqxvOUd3bvY20Wgg7p2qnBy7Ll4EPnn2H0kLW', NULL, '207.46.13.40', 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiYUdOSnlvc3hnUXlYdVU1VERrUW43c2s3ejJwSlBId0dmdUtiVnR0QiI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJXQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiV2FzaGluZ3RvbiI7czo4OiJjaXR5TmFtZSI7czo3OiJSZWRtb25kIjtzOjc6InppcENvZGUiO3M6MDoiIjtzOjc6Imlzb0NvZGUiO3M6MDoiIjtzOjEwOiJwb3N0YWxDb2RlIjtzOjA6IiI7czo4OiJsYXRpdHVkZSI7ZDo0Ny42ODAxMDAwMDAwMDAwMDM7czo5OiJsb25naXR1ZGUiO2Q6LTEyMi4xMjA2O3M6OToibWV0cm9Db2RlIjtzOjM6IjgxOSI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxMjoiMjA3LjQ2LjEzLjQwIjtzOjY6ImRyaXZlciI7czozODoiU3RldmViYXVtYW5cTG9jYXRpb25cRHJpdmVyc1xGcmVlR2VvSXAiO3M6NToiZXJyb3IiO2I6MDt9czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6Mjk6Imh0dHBzOi8vYmxvZy5kYXJrYW4uZXUvP3A9Mjc3Ijt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAzMDAyOTA7czoxOiJjIjtpOjE1NTAzMDAyOTA7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550300292),
('J5isyDqFpUHS8P5U4wCYwaDkm8CF2e8NCeUb5XP5', NULL, '46.229.168.140', 'Mozilla/5.0 (compatible; SemrushBot/3~bl; +http://www.semrush.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiVGM1Y3NBOThYQXVBaWRGNnNNU05aZ3RjWTVvMVhwNGxNWUhqWHhndSI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czowOiIiO3M6MTA6InJlZ2lvbk5hbWUiO3M6MDoiIjtzOjg6ImNpdHlOYW1lIjtzOjA6IiI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6Mzg7czo5OiJsb25naXR1ZGUiO2Q6LTk3O3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiNDYuMjI5LjE2OC4xNDAiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czoyODoiaHR0cHM6Ly9ibG9nLmRhcmthbi5ldS8/cD04MCI7fXM6OToiX3NmMl9tZXRhIjthOjM6e3M6MToidSI7aToxNTUwNDA1ODkzO3M6MToiYyI7aToxNTUwNDA1ODkzO3M6MToibCI7czoxOiIwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1550405896),
('JAc6GQEOa76zXheyDT7YNXUT8WdAEjxvlqbY6OJl', NULL, '176.119.32.159', 'WordPress/4.0; https://blog.darkan.eu', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiYmJjbmFQOVU5dWJGZnU4aVF1TlliTjhZV3RBTmIyalYxNklFb2pwRSI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAzMzI1ODA7czoxOiJjIjtpOjE1NTAzMzI1ODA7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550332580),
('jBvx6zGt6DYYFn8SX1MgVhp9jNW4Ex4Ahubd1tRn', NULL, '66.249.76.81', 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiaHFCbGx2Z25Gb3oyUUs2M1RrT0JNYmZsUmZ2dEl6Z1F0Y1VxZVNleSI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJDQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiQ2FsaWZvcm5pYSI7czo4OiJjaXR5TmFtZSI7czoxMzoiTW91bnRhaW4gVmlldyI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6MzcuNDE5MTk5OTk5OTk5OTk2O3M6OToibG9uZ2l0dWRlIjtkOi0xMjIuMDU3NDtzOjk6Im1ldHJvQ29kZSI7czozOiI4MDciO3M6ODoiYXJlYUNvZGUiO3M6MDoiIjtzOjM6ImlzcCI7czowOiIiO3M6MjoiaXAiO3M6MTI6IjY2LjI0OS43Ni44MSI7czo2OiJkcml2ZXIiO3M6Mzg6IlN0ZXZlYmF1bWFuXExvY2F0aW9uXERyaXZlcnNcRnJlZUdlb0lwIjtzOjU6ImVycm9yIjtiOjA7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjE3OiJodHRwczovL2Rhcmthbi5ldSI7fXM6OToiX3NmMl9tZXRhIjthOjM6e3M6MToidSI7aToxNTUwMzUyODk1O3M6MToiYyI7aToxNTUwMzUyODk1O3M6MToibCI7czoxOiIwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1550352900),
('jfAEGTvPK5Ld6ikG8N2wWaRSz3BAECC3BjhKEC04', NULL, '157.55.39.144', 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiM2NBMFlJbzFHS2ZLSUFBOXpHWVZRWW5Ld3VNZ0NDQVlMWE1VaXdRQiI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJXQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiV2FzaGluZ3RvbiI7czo4OiJjaXR5TmFtZSI7czo3OiJSZWRtb25kIjtzOjc6InppcENvZGUiO3M6MDoiIjtzOjc6Imlzb0NvZGUiO3M6MDoiIjtzOjEwOiJwb3N0YWxDb2RlIjtzOjA6IiI7czo4OiJsYXRpdHVkZSI7ZDo0Ny42ODAxMDAwMDAwMDAwMDM7czo5OiJsb25naXR1ZGUiO2Q6LTEyMi4xMjA2O3M6OToibWV0cm9Db2RlIjtzOjM6IjgxOSI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxMzoiMTU3LjU1LjM5LjE0NCI7czo2OiJkcml2ZXIiO3M6Mzg6IlN0ZXZlYmF1bWFuXExvY2F0aW9uXERyaXZlcnNcRnJlZUdlb0lwIjtzOjU6ImVycm9yIjtiOjA7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjE3OiJodHRwczovL2Rhcmthbi5ldSI7fXM6OToiX3NmMl9tZXRhIjthOjM6e3M6MToidSI7aToxNTUwMzg0MzYxO3M6MToiYyI7aToxNTUwMzg0MzYxO3M6MToibCI7czoxOiIwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1550384364),
('JqdTDySIM1zLkCmooRdUnWD9mCwhE1tcQstJRzrK', NULL, '94.72.123.135', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiM2d3Y2huQjFtYVhUUlhadDhxVFBmMGhxcFJKUngyalNXMHFIZUFESCI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjY6IlBvbGFuZCI7czoxMToiY291bnRyeUNvZGUiO3M6MjoiUEwiO3M6MTA6InJlZ2lvbkNvZGUiO3M6MDoiIjtzOjEwOiJyZWdpb25OYW1lIjtzOjA6IiI7czo4OiJjaXR5TmFtZSI7czowOiIiO3M6NzoiemlwQ29kZSI7czowOiIiO3M6NzoiaXNvQ29kZSI7czowOiIiO3M6MTA6InBvc3RhbENvZGUiO3M6MDoiIjtzOjg6ImxhdGl0dWRlIjtkOjUyO3M6OToibG9uZ2l0dWRlIjtkOjIwO3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxMzoiOTQuNzIuMTIzLjEzNSI7czo2OiJkcml2ZXIiO3M6Mzg6IlN0ZXZlYmF1bWFuXExvY2F0aW9uXERyaXZlcnNcRnJlZUdlb0lwIjtzOjU6ImVycm9yIjtiOjA7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjE3OiJodHRwczovL2Rhcmthbi5ldSI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fXM6OToiX3NmMl9tZXRhIjthOjM6e3M6MToidSI7aToxNTUwMzM4MzExO3M6MToiYyI7aToxNTUwMzM4MjkwO3M6MToibCI7czoxOiIwIjt9fQ==', 1550338311),
('k88ur8ytYhWaB32WNWNtAdRxyyKqPzSOI0Qr4lEe', NULL, '66.249.76.83', 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiMm03Tk9ySG5nQ1FDMXpxdElybXBFcnNTT3VzYTB2N3lBbEJYaTlWZSI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJDQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiQ2FsaWZvcm5pYSI7czo4OiJjaXR5TmFtZSI7czoxMzoiTW91bnRhaW4gVmlldyI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6MzcuNDE5MTk5OTk5OTk5OTk2O3M6OToibG9uZ2l0dWRlIjtkOi0xMjIuMDU3NDtzOjk6Im1ldHJvQ29kZSI7czozOiI4MDciO3M6ODoiYXJlYUNvZGUiO3M6MDoiIjtzOjM6ImlzcCI7czowOiIiO3M6MjoiaXAiO3M6MTM6IjY2LjI0OS43Ni4xMjQiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czoxNzoiaHR0cHM6Ly9kYXJrYW4uZXUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDQwNDEzMztzOjE6ImMiO2k6MTU1MDQwNDEyODtzOjE6ImwiO3M6MToiMCI7fX0=', 1550404134),
('KAmxnIgP3jki4ugWtyVEH9WvnRSgYWu82cqWiJD0', NULL, '54.36.150.46', 'Mozilla/5.0 (compatible; AhrefsBot/6.1; +http://ahrefs.com/robot/)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiT1NzUmpUYnozTVY0MlNKN3JZVDNYa3RnSzR2N2VUY1JzRWtxYVNzUSI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJDQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiQ2FsaWZvcm5pYSI7czo4OiJjaXR5TmFtZSI7czoxMzoiTW91bnRhaW4gVmlldyI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6MzcuNDE5MTk5OTk5OTk5OTk2O3M6OToibG9uZ2l0dWRlIjtkOi0xMjIuMDU3NDtzOjk6Im1ldHJvQ29kZSI7czozOiI4MDciO3M6ODoiYXJlYUNvZGUiO3M6MDoiIjtzOjM6ImlzcCI7czowOiIiO3M6MjoiaXAiO3M6MTA6IjY2LjEwMi4wLjAiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo0MToiaHR0cHM6Ly9ibG9nLmRhcmthbi5ldS8/ZmVlZD1yc3MyJmxhbmc9cGwiO31zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDQxMzYzODtzOjE6ImMiO2k6MTU1MDQxMzYzODtzOjE6ImwiO3M6MToiMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1550413640),
('kaSlwgGJDG4I7F1wylHUrb9O887n5VUvkQKmqeHF', NULL, '66.249.76.83', 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.96 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiSFBYMjlxMWQ3R1ltOWs2SDIxOW5PR0JkVVE2clZ0RzRtWDhEU0syRyI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czowOiIiO3M6MTA6InJlZ2lvbk5hbWUiO3M6MDoiIjtzOjg6ImNpdHlOYW1lIjtzOjA6IiI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO3M6NzoiMzcuNzUxMCI7czo5OiJsb25naXR1ZGUiO3M6ODoiLTk3LjgyMjAiO3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxMjoiNjYuMjQ5Ljc2LjgzIjtzOjY6ImRyaXZlciI7czozNToiU3RldmViYXVtYW5cTG9jYXRpb25cRHJpdmVyc1xJcEluZm8iO3M6NToiZXJyb3IiO2I6MDt9czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTc6Imh0dHBzOi8vZGFya2FuLmV1Ijt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAzODU1MTE7czoxOiJjIjtpOjE1NTAzODU1MTE7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550385513),
('kHyLARKKmdvQ6nQ7GDHE1TnxvRuv1ys1yMaQGEFE', NULL, '46.229.168.135', 'Mozilla/5.0 (compatible; SemrushBot/3~bl; +http://www.semrush.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiUGE5NU90SGhpUEk4Rk5mQ1RZbWdMYjNqVWhMR1VWWGtPdTUxN2hDQSI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czowOiIiO3M6MTA6InJlZ2lvbk5hbWUiO3M6MDoiIjtzOjg6ImNpdHlOYW1lIjtzOjA6IiI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6Mzg7czo5OiJsb25naXR1ZGUiO2Q6LTk3O3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiNDYuMjI5LjE2OC4xMzUiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo2OToiaHR0cHM6Ly9kYXJrYW4uZXUvY29udGVudC84ODM2NzI3N2M2ZGQ3NzVhYzZjZGEwMzRiOGY4OGU1ZT9kYXJrYW5fcD02Ijt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAyODU2NzU7czoxOiJjIjtpOjE1NTAyODU2NzU7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550285678),
('klJhzm3stcyRGu07GMbqT1xTcvSkSKetsvS6rxvY', NULL, '87.250.224.61', 'Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiZkM3cmJVaFNqWUNSYzFGNkZwVHRSZWxSYnVCSnlUTEhhMnBhbkhqMCI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjE4OiJSdXNzaWFuIEZlZGVyYXRpb24iO3M6MTE6ImNvdW50cnlDb2RlIjtzOjI6IlJVIjtzOjEwOiJyZWdpb25Db2RlIjtzOjA6IiI7czoxMDoicmVnaW9uTmFtZSI7czowOiIiO3M6ODoiY2l0eU5hbWUiO3M6MDoiIjtzOjc6InppcENvZGUiO3M6MDoiIjtzOjc6Imlzb0NvZGUiO3M6MDoiIjtzOjEwOiJwb3N0YWxDb2RlIjtzOjA6IiI7czo4OiJsYXRpdHVkZSI7ZDo2MDtzOjk6ImxvbmdpdHVkZSI7ZDoxMDA7czo5OiJtZXRyb0NvZGUiO3M6MDoiIjtzOjg6ImFyZWFDb2RlIjtzOjA6IiI7czozOiJpc3AiO3M6MDoiIjtzOjI6ImlwIjtzOjEzOiI4Ny4yNTAuMjI0LjYxIjtzOjY6ImRyaXZlciI7czozODoiU3RldmViYXVtYW5cTG9jYXRpb25cRHJpdmVyc1xGcmVlR2VvSXAiO3M6NToiZXJyb3IiO2I6MDt9czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MTc6Imh0dHBzOi8vZGFya2FuLmV1Ijt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAzODQ2NDc7czoxOiJjIjtpOjE1NTAzODQ2NDc7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550384650),
('kx691U5LdaE3YbwzeSbE1HyOM1Ezn95zy1Yp12tE', NULL, '46.229.168.131', 'Mozilla/5.0 (compatible; SemrushBot/3~bl; +http://www.semrush.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiVEJUV3JlVndiYmdJczZtbmNiYWtsSUo5bWpUT21vM1J6WDFid20zRCI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czowOiIiO3M6MTA6InJlZ2lvbk5hbWUiO3M6MDoiIjtzOjg6ImNpdHlOYW1lIjtzOjA6IiI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6Mzg7czo5OiJsb25naXR1ZGUiO2Q6LTk3O3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiNDYuMjI5LjE2OC4xMzEiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czozMDoiaHR0cHM6Ly9kYXJrYW4uZXUvYWJvdXRwcm9kdWN0Ijt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTA0Mjc5MzQ7czoxOiJjIjtpOjE1NTA0Mjc5MzQ7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550427940),
('lap77Do0l8Bl3sQoAsHsIeXJgrGc8tPJyq3cwFkV', NULL, '109.201.154.138', 'Mozilla/5.0 (compatible; Uptimebot/1.0; +http://www.uptime.com/uptimebot)', 'YTo0OntzOjY6Il90b2tlbiI7czo0MDoiTjVMSm13UnZqOUZaR2lGOTZKRDU5NlFmWHpoOUw2ZVB2SlNFVVE5USI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjExOiJOZXRoZXJsYW5kcyI7czoxMToiY291bnRyeUNvZGUiO3M6MjoiTkwiO3M6MTA6InJlZ2lvbkNvZGUiO3M6MDoiIjtzOjEwOiJyZWdpb25OYW1lIjtzOjA6IiI7czo4OiJjaXR5TmFtZSI7czowOiIiO3M6NzoiemlwQ29kZSI7czowOiIiO3M6NzoiaXNvQ29kZSI7czowOiIiO3M6MTA6InBvc3RhbENvZGUiO3M6MDoiIjtzOjg6ImxhdGl0dWRlIjtkOjUyLjU7czo5OiJsb25naXR1ZGUiO2Q6NS43NTtzOjk6Im1ldHJvQ29kZSI7czowOiIiO3M6ODoiYXJlYUNvZGUiO3M6MDoiIjtzOjM6ImlzcCI7czowOiIiO3M6MjoiaXAiO3M6MTU6IjEwOS4yMDEuMTU0LjEzOCI7czo2OiJkcml2ZXIiO3M6Mzg6IlN0ZXZlYmF1bWFuXExvY2F0aW9uXERyaXZlcnNcRnJlZUdlb0lwIjtzOjU6ImVycm9yIjtiOjA7fXM6OToiX3NmMl9tZXRhIjthOjM6e3M6MToidSI7aToxNTUwMjUzMjY3O3M6MToiYyI7aToxNTUwMjUzMjY3O3M6MToibCI7czoxOiIwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1550253271),
('Lzoj6ePERoBWdHGKFgeDQ6L4RixXFv4pClpDU5zm', NULL, '216.244.66.197', 'Mozilla/5.0 (compatible; DotBot/1.1; http://www.opensiteexplorer.org/dotbot, help@moz.com)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiM0Q5SzdNMzVzMEhzR09oQW56SUttaFVMRlZCZFd2ODZPR0RoZDVHVSI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJXQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiV2FzaGluZ3RvbiI7czo4OiJjaXR5TmFtZSI7czo3OiJTZWF0dGxlIjtzOjc6InppcENvZGUiO3M6MDoiIjtzOjc6Imlzb0NvZGUiO3M6MDoiIjtzOjEwOiJwb3N0YWxDb2RlIjtzOjA6IiI7czo4OiJsYXRpdHVkZSI7ZDo0Ny40ODkxMDAwMDAwMDAwMDE7czo5OiJsb25naXR1ZGUiO2Q6LTEyMi4yOTA4O3M6OToibWV0cm9Db2RlIjtzOjM6IjgxOSI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiMjE2LjI0NC42Ni4xOTciO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo2OToiaHR0cHM6Ly9kYXJrYW4uZXUvY29udGVudC8zMjdlZGZiZTVjZWVjNzBhNjY2OGJiMGY2YzA5OTQ1NT9kYXJrYW5fcD05Ijt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAzODYyNjE7czoxOiJjIjtpOjE1NTAzODYyNjE7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550386266),
('m27jEVjp7u1hg1QluNXxRQw9B0IfZassi0EBmN8w', NULL, '216.244.66.197', 'Mozilla/5.0 (compatible; DotBot/1.1; http://www.opensiteexplorer.org/dotbot, help@moz.com)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiYWtVVFJDaUpqenBWbVNYZGRGdDM0NE80b1NhSjA5YzFUR2hjdkM5WCI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJXQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiV2FzaGluZ3RvbiI7czo4OiJjaXR5TmFtZSI7czo3OiJTZWF0dGxlIjtzOjc6InppcENvZGUiO3M6MDoiIjtzOjc6Imlzb0NvZGUiO3M6MDoiIjtzOjEwOiJwb3N0YWxDb2RlIjtzOjA6IiI7czo4OiJsYXRpdHVkZSI7ZDo0Ny40ODkxMDAwMDAwMDAwMDE7czo5OiJsb25naXR1ZGUiO2Q6LTEyMi4yOTA4O3M6OToibWV0cm9Db2RlIjtzOjM6IjgxOSI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiMjE2LjI0NC42Ni4xOTciO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo2OToiaHR0cHM6Ly9kYXJrYW4uZXUvY29udGVudC84ODM2NzI3N2M2ZGQ3NzVhYzZjZGEwMzRiOGY4OGU1ZT9kYXJrYW5fcD0xIjt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAzNzQwMTE7czoxOiJjIjtpOjE1NTAzNzQwMTE7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550374018),
('MC6KxymQ6d5pzVRh6WDMphsq01n9b5gVEpAtqXiB', NULL, '46.229.168.139', 'Mozilla/5.0 (compatible; SemrushBot/3~bl; +http://www.semrush.com/bot.html)', 'YTo2OntzOjY6Il90b2tlbiI7czo0MDoic01YVDBEQjNTQXNTZmplN3BtR2lmb1VoRXo1cE54ZTRLRzFQZGJLYyI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czowOiIiO3M6MTA6InJlZ2lvbk5hbWUiO3M6MDoiIjtzOjg6ImNpdHlOYW1lIjtzOjA6IiI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6Mzg7czo5OiJsb25naXR1ZGUiO2Q6LTk3O3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiNDYuMjI5LjE2OC4xMzkiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjU6InN0YXRlIjtzOjQwOiJjcmU3c3BGTjFVbHFDdWZadlJRNnpYTjhSVDNuWjFmd0NOQUVXSjBMIjtzOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czozMjoiaHR0cHM6Ly9kYXJrYW4uZXUvbG9naW4vbGlua2VkaW4iO31zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDM5MzY0ODtzOjE6ImMiO2k6MTU1MDM5MzY0ODtzOjE6ImwiO3M6MToiMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1550393651),
('mgmKxpyA0p3VHXb6oo9Ut23attzWHfKFsUnNpKSf', NULL, '46.229.168.141', 'Mozilla/5.0 (compatible; SemrushBot/3~bl; +http://www.semrush.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoicWR3enFQMkVkVXhGbGhtbGxseUQxYXZFMnFYeDVwREFwdm1EN0p1aSI7czozOiJ1cmwiO2E6MTp7czo4OiJpbnRlbmRlZCI7czoyMjoiaHR0cHM6Ly9kYXJrYW4uZXUvaG9tZSI7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjIyOiJodHRwczovL2Rhcmthbi5ldS9ob21lIjt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAyNzQ2NDU7czoxOiJjIjtpOjE1NTAyNzQ2NDU7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550274647),
('MIaA1IHmxdIYvaWnZ6rTxUPRa3R1ks0Lck8QHa7e', NULL, '46.229.168.136', 'Mozilla/5.0 (compatible; SemrushBot/3~bl; +http://www.semrush.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoibzlOQnFXY1ZvMDhDdzMwM3hjdEt1T2N2NWhZNGdmR3c4b25ySlU2USI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czowOiIiO3M6MTA6InJlZ2lvbk5hbWUiO3M6MDoiIjtzOjg6ImNpdHlOYW1lIjtzOjA6IiI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6Mzg7czo5OiJsb25naXR1ZGUiO2Q6LTk3O3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiNDYuMjI5LjE2OC4xMzYiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czozNToiaHR0cHM6Ly9ibG9nLmRhcmthbi5ldS8/cGFnZV9pZD0zNzciO31zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDMyODc2MTtzOjE6ImMiO2k6MTU1MDMyODc2MTtzOjE6ImwiO3M6MToiMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1550328764),
('MYDlkV5JW9vJ2s4K9AVlGCLKDjyWYjslEnjmQmad', NULL, '46.229.168.134', 'Mozilla/5.0 (compatible; SemrushBot/3~bl; +http://www.semrush.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoibmszdXlRZ3lFYW1ndUNyM05iaXBIOGliWWtPRE5vNVJtVFhwbFZKSyI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czowOiIiO3M6MTA6InJlZ2lvbk5hbWUiO3M6MDoiIjtzOjg6ImNpdHlOYW1lIjtzOjA6IiI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6Mzg7czo5OiJsb25naXR1ZGUiO2Q6LTk3O3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiNDYuMjI5LjE2OC4xMzQiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czoxNzoiaHR0cHM6Ly9kYXJrYW4uZXUiO31zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDMwODg2MjtzOjE6ImMiO2k6MTU1MDMwODg2MjtzOjE6ImwiO3M6MToiMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1550308865),
('n97hgYtnTy2nHm9ueRz2nPVZuFa6TwVJsGGGSHMa', NULL, '157.55.39.246', 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiZmpDQXMwWVRWcjcybVpONnRKV3FPTjd5RzhUUFNyRUpMZUNSM3VEdiI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJXQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiV2FzaGluZ3RvbiI7czo4OiJjaXR5TmFtZSI7czo3OiJSZWRtb25kIjtzOjc6InppcENvZGUiO3M6MDoiIjtzOjc6Imlzb0NvZGUiO3M6MDoiIjtzOjEwOiJwb3N0YWxDb2RlIjtzOjA6IiI7czo4OiJsYXRpdHVkZSI7ZDo0Ny42ODAxMDAwMDAwMDAwMDM7czo5OiJsb25naXR1ZGUiO2Q6LTEyMi4xMjA2O3M6OToibWV0cm9Db2RlIjtzOjM6IjgxOSI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxMzoiMTU3LjU1LjM5LjI0NiI7czo2OiJkcml2ZXIiO3M6Mzg6IlN0ZXZlYmF1bWFuXExvY2F0aW9uXERyaXZlcnNcRnJlZUdlb0lwIjtzOjU6ImVycm9yIjtiOjA7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjE3OiJodHRwczovL2Rhcmthbi5ldSI7fXM6OToiX3NmMl9tZXRhIjthOjM6e3M6MToidSI7aToxNTUwMzAxODA5O3M6MToiYyI7aToxNTUwMzAxODA5O3M6MToibCI7czoxOiIwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1550301811),
('NhNSITLDK55oRfQTifPty0qpRBg7ByEzHEcOgSZR', NULL, '87.250.224.100', 'Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiNGk5QUlYV3RxemxDQ3ZqZFI5bjcyY29FdXpEN0JhdXpHc3NJZkZFSyI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjE4OiJSdXNzaWFuIEZlZGVyYXRpb24iO3M6MTE6ImNvdW50cnlDb2RlIjtzOjI6IlJVIjtzOjEwOiJyZWdpb25Db2RlIjtzOjA6IiI7czoxMDoicmVnaW9uTmFtZSI7czowOiIiO3M6ODoiY2l0eU5hbWUiO3M6MDoiIjtzOjc6InppcENvZGUiO3M6MDoiIjtzOjc6Imlzb0NvZGUiO3M6MDoiIjtzOjEwOiJwb3N0YWxDb2RlIjtzOjA6IiI7czo4OiJsYXRpdHVkZSI7ZDo2MDtzOjk6ImxvbmdpdHVkZSI7ZDoxMDA7czo5OiJtZXRyb0NvZGUiO3M6MDoiIjtzOjg6ImFyZWFDb2RlIjtzOjA6IiI7czozOiJpc3AiO3M6MDoiIjtzOjI6ImlwIjtzOjE0OiI4Ny4yNTAuMjI0LjEwMCI7czo2OiJkcml2ZXIiO3M6Mzg6IlN0ZXZlYmF1bWFuXExvY2F0aW9uXERyaXZlcnNcRnJlZUdlb0lwIjtzOjU6ImVycm9yIjtiOjA7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjIxOiJodHRwczovL3d3dy5kYXJrYW4uZXUiO31zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDI4NTM0NDtzOjE6ImMiO2k6MTU1MDI4NTM0NDtzOjE6ImwiO3M6MToiMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1550285347),
('NmriAF9ZxlbbNzwHmtEnBhk6WIEDoFJ2XJpTrHzU', NULL, '157.55.39.246', 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiZ3ZkYjdqZ2N5RE42Tk42T3JDRHplWWhZVkJKOEJnNXNtUzhWMHBrciI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJXQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiV2FzaGluZ3RvbiI7czo4OiJjaXR5TmFtZSI7czo3OiJSZWRtb25kIjtzOjc6InppcENvZGUiO3M6MDoiIjtzOjc6Imlzb0NvZGUiO3M6MDoiIjtzOjEwOiJwb3N0YWxDb2RlIjtzOjA6IiI7czo4OiJsYXRpdHVkZSI7ZDo0Ny42ODAxMDAwMDAwMDAwMDM7czo5OiJsb25naXR1ZGUiO2Q6LTEyMi4xMjA2O3M6OToibWV0cm9Db2RlIjtzOjM6IjgxOSI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxMzoiMTU3LjU1LjM5LjI0NiI7czo2OiJkcml2ZXIiO3M6Mzg6IlN0ZXZlYmF1bWFuXExvY2F0aW9uXERyaXZlcnNcRnJlZUdlb0lwIjtzOjU6ImVycm9yIjtiOjA7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjIzOiJodHRwczovL2Rhcmthbi5ldS9sb2dpbiI7fXM6OToiX3NmMl9tZXRhIjthOjM6e3M6MToidSI7aToxNTUwMjkxNjgxO3M6MToiYyI7aToxNTUwMjkxNjgxO3M6MToibCI7czoxOiIwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1550291683),
('NZjZf03VVVGcVWU1Rfyb3gQjHlMf0xIjv5GskMr3', NULL, '141.8.142.175', 'Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiOFBFOFFjR3ZPM25ubmZKajl3bkhJcXRDOWE2bzZ5U0dwSXVhR0FJTiI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjE4OiJSdXNzaWFuIEZlZGVyYXRpb24iO3M6MTE6ImNvdW50cnlDb2RlIjtzOjI6IlJVIjtzOjEwOiJyZWdpb25Db2RlIjtzOjA6IiI7czoxMDoicmVnaW9uTmFtZSI7czowOiIiO3M6ODoiY2l0eU5hbWUiO3M6MDoiIjtzOjc6InppcENvZGUiO3M6MDoiIjtzOjc6Imlzb0NvZGUiO3M6MDoiIjtzOjEwOiJwb3N0YWxDb2RlIjtzOjA6IiI7czo4OiJsYXRpdHVkZSI7czo3OiI1NS43Mzg2IjtzOjk6ImxvbmdpdHVkZSI7czo3OiIzNy42MDY4IjtzOjk6Im1ldHJvQ29kZSI7czowOiIiO3M6ODoiYXJlYUNvZGUiO3M6MDoiIjtzOjM6ImlzcCI7czowOiIiO3M6MjoiaXAiO3M6MTM6IjE0MS44LjE0Mi4xNzUiO3M6NjoiZHJpdmVyIjtzOjM1OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXElwSW5mbyI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czoxNzoiaHR0cHM6Ly9kYXJrYW4uZXUiO31zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDI4NTM0NTtzOjE6ImMiO2k6MTU1MDI4NTM0NTtzOjE6ImwiO3M6MToiMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1550285348),
('oEWWDAW6lgBxsTnFM5DlkKByNfIHSO6MZDU4PV2J', NULL, '216.244.66.197', 'Mozilla/5.0 (compatible; DotBot/1.1; http://www.opensiteexplorer.org/dotbot, help@moz.com)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoic0dyWGFWTFZvU2puWmxETGI0czg3S2RKOWxOTDd0akRuOWRtY2dVNyI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJXQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiV2FzaGluZ3RvbiI7czo4OiJjaXR5TmFtZSI7czo3OiJTZWF0dGxlIjtzOjc6InppcENvZGUiO3M6MDoiIjtzOjc6Imlzb0NvZGUiO3M6MDoiIjtzOjEwOiJwb3N0YWxDb2RlIjtzOjA6IiI7czo4OiJsYXRpdHVkZSI7ZDo0Ny40ODkxMDAwMDAwMDAwMDE7czo5OiJsb25naXR1ZGUiO2Q6LTEyMi4yOTA4O3M6OToibWV0cm9Db2RlIjtzOjM6IjgxOSI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiMjE2LjI0NC42Ni4xOTciO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo2OToiaHR0cHM6Ly9kYXJrYW4uZXUvY29udGVudC8zMjdlZGZiZTVjZWVjNzBhNjY2OGJiMGY2YzA5OTQ1NT9kYXJrYW5fcD0yIjt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAzMjU5MjU7czoxOiJjIjtpOjE1NTAzMjU5MjU7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550325929),
('oT8YVw2CX5aHVtpdchuMg7JBdwi4dYbAKw4GuFxX', NULL, '46.229.168.131', 'Mozilla/5.0 (compatible; SemrushBot/3~bl; +http://www.semrush.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiY1RQWEg2UnpOVGxycFQ1a3dMaTRFcmQwY3djcmhRRzBOS3NDVElLZCI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czowOiIiO3M6MTA6InJlZ2lvbk5hbWUiO3M6MDoiIjtzOjg6ImNpdHlOYW1lIjtzOjA6IiI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6Mzg7czo5OiJsb25naXR1ZGUiO2Q6LTk3O3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiNDYuMjI5LjE2OC4xMzEiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czoxNzoiaHR0cHM6Ly9kYXJrYW4uZXUiO31zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDI1NjUxODtzOjE6ImMiO2k6MTU1MDI1NjUxODtzOjE6ImwiO3M6MToiMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1550256521),
('p4ZQnYvpqIY8CCfirzxmk20SuosxfhaYRfJ0DqtK', NULL, '77.75.78.165', 'Mozilla/5.0 (compatible; SeznamBot/3.2; +http://napoveda.seznam.cz/en/seznambot-intro/)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoibGs0SnVuQ0ZVejRORW9Kdzc3UWlmQWtSNHMwdDJYVVZOQnN1M2R6ZCI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjE0OiJDemVjaCBSZXB1YmxpYyI7czoxMToiY291bnRyeUNvZGUiO3M6MjoiQ1oiO3M6MTA6InJlZ2lvbkNvZGUiO3M6MDoiIjtzOjEwOiJyZWdpb25OYW1lIjtzOjA6IiI7czo4OiJjaXR5TmFtZSI7czowOiIiO3M6NzoiemlwQ29kZSI7czowOiIiO3M6NzoiaXNvQ29kZSI7czowOiIiO3M6MTA6InBvc3RhbENvZGUiO3M6MDoiIjtzOjg6ImxhdGl0dWRlIjtkOjQ5Ljc1O3M6OToibG9uZ2l0dWRlIjtkOjE1LjU7czo5OiJtZXRyb0NvZGUiO3M6MDoiIjtzOjg6ImFyZWFDb2RlIjtzOjA6IiI7czozOiJpc3AiO3M6MDoiIjtzOjI6ImlwIjtzOjEyOiI3Ny43NS43OC4xNjUiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czoyOToiaHR0cHM6Ly9ibG9nLmRhcmthbi5ldS8/cD00MzYiO31zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDQxMjYxNTtzOjE6ImMiO2k6MTU1MDQxMjYxNTtzOjE6ImwiO3M6MToiMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1550412618),
('pd8g4a2gDXb7qN3f8zQ2iiQ8Wt9yrmZQC4XoJrIj', NULL, '216.244.66.197', 'Mozilla/5.0 (compatible; DotBot/1.1; http://www.opensiteexplorer.org/dotbot, help@moz.com)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiamNDRmo4WTY4cHV5WTVjVnBEVkNuRnRqY3lia24wSkY2NkNYZVNGbSI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJXQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiV2FzaGluZ3RvbiI7czo4OiJjaXR5TmFtZSI7czo3OiJTZWF0dGxlIjtzOjc6InppcENvZGUiO3M6MDoiIjtzOjc6Imlzb0NvZGUiO3M6MDoiIjtzOjEwOiJwb3N0YWxDb2RlIjtzOjA6IiI7czo4OiJsYXRpdHVkZSI7ZDo0Ny40ODkxMDAwMDAwMDAwMDE7czo5OiJsb25naXR1ZGUiO2Q6LTEyMi4yOTA4O3M6OToibWV0cm9Db2RlIjtzOjM6IjgxOSI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiMjE2LjI0NC42Ni4xOTciO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo2OToiaHR0cHM6Ly9kYXJrYW4uZXUvY29udGVudC8xY2E2Y2U1MDRlZjhlOWIzZDNlMGRiMTkyMmU4MmNjYj9kYXJrYW5fcD0wIjt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAzOTc5MDg7czoxOiJjIjtpOjE1NTAzOTc5MDg7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550397915),
('PoF4Y5SxX8ZhOfBuZxEZ1i6KxgK0TySyj7ph8Qvq', NULL, '77.75.76.167', 'Mozilla/5.0 (compatible; SeznamBot/3.2; +http://napoveda.seznam.cz/en/seznambot-intro/)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiQ3NjOHJkVlJ4TVpWWmpRY0t5QmpBbkRsRTE3MlljN2x6MWRGeHNQbSI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjE0OiJDemVjaCBSZXB1YmxpYyI7czoxMToiY291bnRyeUNvZGUiO3M6MjoiQ1oiO3M6MTA6InJlZ2lvbkNvZGUiO3M6MDoiIjtzOjEwOiJyZWdpb25OYW1lIjtzOjA6IiI7czo4OiJjaXR5TmFtZSI7czowOiIiO3M6NzoiemlwQ29kZSI7czowOiIiO3M6NzoiaXNvQ29kZSI7czowOiIiO3M6MTA6InBvc3RhbENvZGUiO3M6MDoiIjtzOjg6ImxhdGl0dWRlIjtkOjQ5Ljc1O3M6OToibG9uZ2l0dWRlIjtkOjE1LjU7czo5OiJtZXRyb0NvZGUiO3M6MDoiIjtzOjg6ImFyZWFDb2RlIjtzOjA6IiI7czozOiJpc3AiO3M6MDoiIjtzOjI6ImlwIjtzOjEyOiI3Ny43NS43Ni4xNjciO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czoyOToiaHR0cHM6Ly9ibG9nLmRhcmthbi5ldS8/cD0yMjIiO31zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDM5NzE3NjtzOjE6ImMiO2k6MTU1MDM5NzE3NjtzOjE6ImwiO3M6MToiMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1550397181),
('pPBpalxNUCHTwlkbaPnRfUbVgqkxWrat0E3fqTFB', NULL, '87.250.224.92', 'Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoicHNpWTc3WlZmMFRjeWUxN1gxc0MyYk5XVm1qVGJTd1lDY3VES3gwcyI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjE4OiJSdXNzaWFuIEZlZGVyYXRpb24iO3M6MTE6ImNvdW50cnlDb2RlIjtzOjI6IlJVIjtzOjEwOiJyZWdpb25Db2RlIjtzOjA6IiI7czoxMDoicmVnaW9uTmFtZSI7czowOiIiO3M6ODoiY2l0eU5hbWUiO3M6MDoiIjtzOjc6InppcENvZGUiO3M6MDoiIjtzOjc6Imlzb0NvZGUiO3M6MDoiIjtzOjEwOiJwb3N0YWxDb2RlIjtzOjA6IiI7czo4OiJsYXRpdHVkZSI7ZDo2MDtzOjk6ImxvbmdpdHVkZSI7ZDoxMDA7czo5OiJtZXRyb0NvZGUiO3M6MDoiIjtzOjg6ImFyZWFDb2RlIjtzOjA6IiI7czozOiJpc3AiO3M6MDoiIjtzOjI6ImlwIjtzOjEzOiI4Ny4yNTAuMjI0LjkyIjtzOjY6ImRyaXZlciI7czozODoiU3RldmViYXVtYW5cTG9jYXRpb25cRHJpdmVyc1xGcmVlR2VvSXAiO3M6NToiZXJyb3IiO2I6MDt9czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vYmxvZy5kYXJrYW4uZXUiO31zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDM4NDYzOTtzOjE6ImMiO2k6MTU1MDM4NDYzOTtzOjE6ImwiO3M6MToiMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1550384641),
('pQbhs413HLimsOeyXsmLYtKHCP0NiiiUIfUy7694', NULL, '66.249.76.83', 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.96 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiWmdyYWsxdUlZTWNKd2JiRFE2NVplZXoyRDVJTGNqcXd3Mmltam9NVSI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJDQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiQ2FsaWZvcm5pYSI7czo4OiJjaXR5TmFtZSI7czoxMzoiTW91bnRhaW4gVmlldyI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6MzcuNDE5MTk5OTk5OTk5OTk2O3M6OToibG9uZ2l0dWRlIjtkOi0xMjIuMDU3NDtzOjk6Im1ldHJvQ29kZSI7czozOiI4MDciO3M6ODoiYXJlYUNvZGUiO3M6MDoiIjtzOjM6ImlzcCI7czowOiIiO3M6MjoiaXAiO3M6MTM6IjY2LjI0OS43Ni4xMjUiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czoxNzoiaHR0cHM6Ly9kYXJrYW4uZXUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDM2NDk3ODtzOjE6ImMiO2k6MTU1MDM2NDk3MjtzOjE6ImwiO3M6MToiMCI7fX0=', 1550364978),
('QDjBQ4X6aAJFksV5zUgWnYfi1OMzgUFfRBFMi37Q', NULL, '176.119.32.159', 'WordPress/4.0; https://blog.darkan.eu', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiV2xtZkE4YkNaRGpXaGQxWHNieTZOaHJQWkJCVUpYM05FT09JdFo3OSI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAzMDQzODY7czoxOiJjIjtpOjE1NTAzMDQzODY7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550304387),
('QHeO0wuJRYgZ5vdJAFld1GcxXCdcGSFH02Lu1i9S', NULL, '157.55.39.208', 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiakFoN1MyY2h3U29Xc2JPWWh1cDZIR0haMU4xNjZIZzFHY0pHZERRQyI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJXQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiV2FzaGluZ3RvbiI7czo4OiJjaXR5TmFtZSI7czo3OiJSZWRtb25kIjtzOjc6InppcENvZGUiO3M6MDoiIjtzOjc6Imlzb0NvZGUiO3M6MDoiIjtzOjEwOiJwb3N0YWxDb2RlIjtzOjA6IiI7czo4OiJsYXRpdHVkZSI7ZDo0Ny42ODAxMDAwMDAwMDAwMDM7czo5OiJsb25naXR1ZGUiO2Q6LTEyMi4xMjA2O3M6OToibWV0cm9Db2RlIjtzOjM6IjgxOSI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxMzoiMTU3LjU1LjM5LjIwOCI7czo2OiJkcml2ZXIiO3M6Mzg6IlN0ZXZlYmF1bWFuXExvY2F0aW9uXERyaXZlcnNcRnJlZUdlb0lwIjtzOjU6ImVycm9yIjtiOjA7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjIyOiJodHRwczovL2Jsb2cuZGFya2FuLmV1Ijt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAzNjU5NDI7czoxOiJjIjtpOjE1NTAzNjU5NDI7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550365945),
('qIrJOeZRBuAtCyAtx1zE2wfaN7F6STNxf7fNi2Zy', NULL, '157.55.39.141', 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoidG5ndUVIYldBRVBVNVJ2QTJIeDJhNjBpYUFGams1UG1zbnRqMTY1TyI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJXQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiV2FzaGluZ3RvbiI7czo4OiJjaXR5TmFtZSI7czo3OiJSZWRtb25kIjtzOjc6InppcENvZGUiO3M6MDoiIjtzOjc6Imlzb0NvZGUiO3M6MDoiIjtzOjEwOiJwb3N0YWxDb2RlIjtzOjA6IiI7czo4OiJsYXRpdHVkZSI7ZDo0Ny42ODAxMDAwMDAwMDAwMDM7czo5OiJsb25naXR1ZGUiO2Q6LTEyMi4xMjA2O3M6OToibWV0cm9Db2RlIjtzOjM6IjgxOSI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxMzoiMTU3LjU1LjM5LjE0MSI7czo2OiJkcml2ZXIiO3M6Mzg6IlN0ZXZlYmF1bWFuXExvY2F0aW9uXERyaXZlcnNcRnJlZUdlb0lwIjtzOjU6ImVycm9yIjtiOjA7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjI4OiJodHRwczovL2Jsb2cuZGFya2FuLmV1Lz9wPTcwIjt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAzMTY2NTA7czoxOiJjIjtpOjE1NTAzMTY2NTA7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550316652),
('RCHYCBUlnrrZwkSevAgpSsnK1L7vaTsFlOKx8M8P', NULL, '46.229.168.136', 'Mozilla/5.0 (compatible; SemrushBot/3~bl; +http://www.semrush.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiY2U5aGhrOTJ5NUJFQUVOYnNSM0cyZmQ2Rm45VXZteXFKcHFoYzNTdiI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czowOiIiO3M6MTA6InJlZ2lvbk5hbWUiO3M6MDoiIjtzOjg6ImNpdHlOYW1lIjtzOjA6IiI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6Mzg7czo5OiJsb25naXR1ZGUiO2Q6LTk3O3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiNDYuMjI5LjE2OC4xMzYiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czozMToiaHR0cHM6Ly9kYXJrYW4uZXUvZG9jdW1lbnRhdGlvbiI7fXM6OToiX3NmMl9tZXRhIjthOjM6e3M6MToidSI7aToxNTUwMjg3MDQ0O3M6MToiYyI7aToxNTUwMjg3MDQ0O3M6MToibCI7czoxOiIwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1550287049),
('rGnzmDDycTQaZZyK3E27pJHYUWZfttVpBipwEe36', NULL, '178.255.215.85', 'Mozilla/5.0 (compatible; Exabot/3.0; +http://www.exabot.com/go/robot)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiSUlLaFh1VWNyT0hlZ2IwN3JZekRyTHdGTWtETzA0S2I5NWJUaW5NdiI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjY6IkZyYW5jZSI7czoxMToiY291bnRyeUNvZGUiO3M6MjoiRlIiO3M6MTA6InJlZ2lvbkNvZGUiO3M6MDoiIjtzOjEwOiJyZWdpb25OYW1lIjtzOjA6IiI7czo4OiJjaXR5TmFtZSI7czowOiIiO3M6NzoiemlwQ29kZSI7czowOiIiO3M6NzoiaXNvQ29kZSI7czowOiIiO3M6MTA6InBvc3RhbENvZGUiO3M6MDoiIjtzOjg6ImxhdGl0dWRlIjtkOjQ4Ljg1OTk5OTk5OTk5OTk5OTtzOjk6ImxvbmdpdHVkZSI7ZDoyLjM1MDAwMDAwMDAwMDAwMDE7czo5OiJtZXRyb0NvZGUiO3M6MDoiIjtzOjg6ImFyZWFDb2RlIjtzOjA6IiI7czozOiJpc3AiO3M6MDoiIjtzOjI6ImlwIjtzOjE0OiIxNzguMjU1LjIxNS44NSI7czo2OiJkcml2ZXIiO3M6Mzg6IlN0ZXZlYmF1bWFuXExvY2F0aW9uXERyaXZlcnNcRnJlZUdlb0lwIjtzOjU6ImVycm9yIjtiOjA7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjI5OiJodHRwczovL2Jsb2cuZGFya2FuLmV1Lz9wPTQwNiI7fXM6OToiX3NmMl9tZXRhIjthOjM6e3M6MToidSI7aToxNTUwMjk3Njc1O3M6MToiYyI7aToxNTUwMjk3Njc1O3M6MToibCI7czoxOiIwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1550297677),
('RI4xQeFTqDsVRBmHQlMCg9Gcdp4oZnslvorSmBe0', NULL, '46.229.168.140', 'Mozilla/5.0 (compatible; SemrushBot/3~bl; +http://www.semrush.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoicDhwYUtwY0daaG9WaVdFZ281RTNqRUlRRW9HQUx4SkVCazlSTFBaNyI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czowOiIiO3M6MTA6InJlZ2lvbk5hbWUiO3M6MDoiIjtzOjg6ImNpdHlOYW1lIjtzOjA6IiI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6Mzg7czo5OiJsb25naXR1ZGUiO2Q6LTk3O3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiNDYuMjI5LjE2OC4xNDAiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czoxNzoiaHR0cHM6Ly9kYXJrYW4uZXUiO31zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDMyODc2OTtzOjE6ImMiO2k6MTU1MDMyODc2OTtzOjE6ImwiO3M6MToiMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1550328772),
('RPxOOf69eETWdHZxILykCf99awvKKF7gtYCTXbgr', NULL, '162.244.80.248', '0', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiemtSV1B1c0V6TkIxeW51ellJRzgwdnpFNnMxamNvM0VRak5UWWtGUSI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czowOiIiO3M6MTA6InJlZ2lvbk5hbWUiO3M6MDoiIjtzOjg6ImNpdHlOYW1lIjtzOjA6IiI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6Mzg7czo5OiJsb25naXR1ZGUiO2Q6LTk3O3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiMTYyLjI0NC44MC4yNDgiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czoxNzoiaHR0cHM6Ly9kYXJrYW4uZXUiO31zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDM1NzE3NztzOjE6ImMiO2k6MTU1MDM1NzE3NztzOjE6ImwiO3M6MToiMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1550357182),
('RXlb7uzeiorgmqVbMb0CZWNUhnOADZfCB0whCdw1', NULL, '46.229.168.136', 'Mozilla/5.0 (compatible; SemrushBot/3~bl; +http://www.semrush.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiWGtZTnhTODJjRnVLb1daNDRlb0I5eThnNkxSdFVWMTU5MEtMQ1JMSCI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czowOiIiO3M6MTA6InJlZ2lvbk5hbWUiO3M6MDoiIjtzOjg6ImNpdHlOYW1lIjtzOjA6IiI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6Mzg7czo5OiJsb25naXR1ZGUiO2Q6LTk3O3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiNDYuMjI5LjE2OC4xMzYiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czoxNzoiaHR0cHM6Ly9kYXJrYW4uZXUiO31zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDI0NDUwNztzOjE6ImMiO2k6MTU1MDI0NDUwNztzOjE6ImwiO3M6MToiMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1550244510),
('RYGoItQKSRkauXIN5QDYR8XsOePkVJ2t8E1OYhmt', NULL, '216.244.66.197', 'Mozilla/5.0 (compatible; DotBot/1.1; http://www.opensiteexplorer.org/dotbot, help@moz.com)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiUks4UFJoa3N3d3E5M2hwNkVkNVZqTFFLVTB0VW1ycmQxOWlTdzNHViI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJXQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiV2FzaGluZ3RvbiI7czo4OiJjaXR5TmFtZSI7czo3OiJTZWF0dGxlIjtzOjc6InppcENvZGUiO3M6MDoiIjtzOjc6Imlzb0NvZGUiO3M6MDoiIjtzOjEwOiJwb3N0YWxDb2RlIjtzOjA6IiI7czo4OiJsYXRpdHVkZSI7ZDo0Ny40ODkxMDAwMDAwMDAwMDE7czo5OiJsb25naXR1ZGUiO2Q6LTEyMi4yOTA4O3M6OToibWV0cm9Db2RlIjtzOjM6IjgxOSI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiMjE2LjI0NC42Ni4xOTciO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo2OToiaHR0cHM6Ly9kYXJrYW4uZXUvY29udGVudC9kMjE0MzAwM2ZlMGU0NWNjNjlkOTExM2JjOWE2YzQ2MD9kYXJrYW5fcD03Ijt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAyODM4OTA7czoxOiJjIjtpOjE1NTAyODM4OTA7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550283893);
INSERT INTO `sessions` (`id`, `user_id`, `ip_address`, `user_agent`, `payload`, `last_activity`) VALUES
('s1KnMwEp2Qr8AcH7bTJmGQUSPn2BSXDt4oq5fBDQ', NULL, '216.244.66.197', 'Mozilla/5.0 (compatible; DotBot/1.1; http://www.opensiteexplorer.org/dotbot, help@moz.com)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiSVVpM3pORk1sNjFUYnIxRU1JU084dVZFNXpOR2pNNXc3T3owZ2x0MSI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJXQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiV2FzaGluZ3RvbiI7czo4OiJjaXR5TmFtZSI7czo3OiJTZWF0dGxlIjtzOjc6InppcENvZGUiO3M6MDoiIjtzOjc6Imlzb0NvZGUiO3M6MDoiIjtzOjEwOiJwb3N0YWxDb2RlIjtzOjA6IiI7czo4OiJsYXRpdHVkZSI7ZDo0Ny40ODkxMDAwMDAwMDAwMDE7czo5OiJsb25naXR1ZGUiO2Q6LTEyMi4yOTA4O3M6OToibWV0cm9Db2RlIjtzOjM6IjgxOSI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiMjE2LjI0NC42Ni4xOTciO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo2OToiaHR0cHM6Ly9kYXJrYW4uZXUvY29udGVudC8zNjE2MjFmMDI4MjZhZGY5Nzg1NDY2MTIzYjI1MzgzNT9kYXJrYW5fcD03Ijt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAzNjM1MDc7czoxOiJjIjtpOjE1NTAzNjM1MDc7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550363512),
('sdE7bFltUPL3ePBGvDNHNJOYAmwLtWSBlYgpPXgN', NULL, '157.55.39.141', 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiUzVOd014WmVvdks3ZUtMMFFIR1hMU0JLRUdNelFWY0xUbktKZVFibSI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJXQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiV2FzaGluZ3RvbiI7czo4OiJjaXR5TmFtZSI7czo3OiJSZWRtb25kIjtzOjc6InppcENvZGUiO3M6MDoiIjtzOjc6Imlzb0NvZGUiO3M6MDoiIjtzOjEwOiJwb3N0YWxDb2RlIjtzOjA6IiI7czo4OiJsYXRpdHVkZSI7ZDo0Ny42ODAxMDAwMDAwMDAwMDM7czo5OiJsb25naXR1ZGUiO2Q6LTEyMi4xMjA2O3M6OToibWV0cm9Db2RlIjtzOjM6IjgxOSI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxMzoiMTU3LjU1LjM5LjE0MSI7czo2OiJkcml2ZXIiO3M6Mzg6IlN0ZXZlYmF1bWFuXExvY2F0aW9uXERyaXZlcnNcRnJlZUdlb0lwIjtzOjU6ImVycm9yIjtiOjA7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjI4OiJodHRwczovL2Jsb2cuZGFya2FuLmV1Lz9wPTkwIjt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAzMTgyMTE7czoxOiJjIjtpOjE1NTAzMTgyMTE7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550318213),
('ThyE8DuzVbzvXpRmCc5jjqGQEDEE0SmmyK6vQFED', NULL, '216.244.66.197', 'Mozilla/5.0 (compatible; DotBot/1.1; http://www.opensiteexplorer.org/dotbot, help@moz.com)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiMG9ONUJZUUwwd1VrRW1CS244Z201S1FNcHBvQUh2ZVd5a2owQ05tOCI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJXQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiV2FzaGluZ3RvbiI7czo4OiJjaXR5TmFtZSI7czo3OiJTZWF0dGxlIjtzOjc6InppcENvZGUiO3M6MDoiIjtzOjc6Imlzb0NvZGUiO3M6MDoiIjtzOjEwOiJwb3N0YWxDb2RlIjtzOjA6IiI7czo4OiJsYXRpdHVkZSI7ZDo0Ny40ODkxMDAwMDAwMDAwMDE7czo5OiJsb25naXR1ZGUiO2Q6LTEyMi4yOTA4O3M6OToibWV0cm9Db2RlIjtzOjM6IjgxOSI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiMjE2LjI0NC42Ni4xOTciO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo2OToiaHR0cHM6Ly9kYXJrYW4uZXUvY29udGVudC8zMjdlZGZiZTVjZWVjNzBhNjY2OGJiMGY2YzA5OTQ1NT9kYXJrYW5fcD00Ijt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAzOTE4Mzg7czoxOiJjIjtpOjE1NTAzOTE4Mzg7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550391842),
('tj92qhfh2oFAvwaIj5PnvhBfMydd7SjFgqOlHI5l', NULL, '46.229.168.151', 'Mozilla/5.0 (compatible; SemrushBot/3~bl; +http://www.semrush.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiejFrZUhRckJpajJPSEVhWlBmQkZycERNcnNlRkdMZmthMWNJZ01uVyI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czowOiIiO3M6MTA6InJlZ2lvbk5hbWUiO3M6MDoiIjtzOjg6ImNpdHlOYW1lIjtzOjA6IiI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6Mzg7czo5OiJsb25naXR1ZGUiO2Q6LTk3O3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiNDYuMjI5LjE2OC4xNTEiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czoyOToiaHR0cHM6Ly9ibG9nLmRhcmthbi5ldS8/cD0yMjQiO31zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDMwODg1ODtzOjE6ImMiO2k6MTU1MDMwODg1ODtzOjE6ImwiO3M6MToiMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1550308861),
('U0oIcYxNPK29fVKRQhWNoOeNF2xCezObcdBmUlUG', NULL, '66.249.76.126', 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiOVl5eGlZNEJqcUEzR2dmRXNMczB4WVdBc2VET0xBOEhZZmt1ZDQzaCI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJDQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiQ2FsaWZvcm5pYSI7czo4OiJjaXR5TmFtZSI7czoxMzoiTW91bnRhaW4gVmlldyI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6MzcuNDE5MTk5OTk5OTk5OTk2O3M6OToibG9uZ2l0dWRlIjtkOi0xMjIuMDU3NDtzOjk6Im1ldHJvQ29kZSI7czozOiI4MDciO3M6ODoiYXJlYUNvZGUiO3M6MDoiIjtzOjM6ImlzcCI7czowOiIiO3M6MjoiaXAiO3M6MTM6IjY2LjI0OS43Ni4xMjYiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo4OToiaHR0cHM6Ly9ibG9nLmRhcmthbi5ldS93cC1jb250ZW50L3BsdWdpbnMvY29udGFjdC1mb3JtLTcvaW5jbHVkZXMvanMvc2NyaXB0cy5qcz92ZXI9NC4wLjEiO31zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDQxNjM1MjtzOjE6ImMiO2k6MTU1MDQxNjM1MjtzOjE6ImwiO3M6MToiMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1550416354),
('u26uvZxAZJFAMWdpwASYrLDXprW1RoGb923lrriJ', NULL, '104.131.144.242', 'Mozilla/5.0 zgrab/0.x', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiV2pVaVFUMExhNzBaRDlyeVAyZUQ4OGhoZGNwM1hpRTE4eUxWVkNiQSI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czowOiIiO3M6MTA6InJlZ2lvbk5hbWUiO3M6MDoiIjtzOjg6ImNpdHlOYW1lIjtzOjA6IiI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6Mzg7czo5OiJsb25naXR1ZGUiO2Q6LTk3O3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNToiMTA0LjEzMS4xNDQuMjQyIjtzOjY6ImRyaXZlciI7czozODoiU3RldmViYXVtYW5cTG9jYXRpb25cRHJpdmVyc1xGcmVlR2VvSXAiO3M6NToiZXJyb3IiO2I6MDt9czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vMTc2LjExOS42My4xMjQiO31zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDM4MDg2ODtzOjE6ImMiO2k6MTU1MDM4MDg2ODtzOjE6ImwiO3M6MToiMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1550380872),
('unpaZRO5GSvTOKuGs2UjX7nthpAss3QEf5ffpup7', NULL, '66.249.76.83', 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.96 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiSVlNRWJXMWhJVlF0N1E3cWM0T25lY2VHeThPSWNZZjFGN1lnTkVwYiI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJDQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiQ2FsaWZvcm5pYSI7czo4OiJjaXR5TmFtZSI7czoxMzoiTW91bnRhaW4gVmlldyI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6MzcuNDE5MTk5OTk5OTk5OTk2O3M6OToibG9uZ2l0dWRlIjtkOi0xMjIuMDU3NDtzOjk6Im1ldHJvQ29kZSI7czozOiI4MDciO3M6ODoiYXJlYUNvZGUiO3M6MDoiIjtzOjM6ImlzcCI7czowOiIiO3M6MjoiaXAiO3M6MTI6IjY2LjI0OS43Ni44MyI7czo2OiJkcml2ZXIiO3M6Mzg6IlN0ZXZlYmF1bWFuXExvY2F0aW9uXERyaXZlcnNcRnJlZUdlb0lwIjtzOjU6ImVycm9yIjtiOjA7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjE3OiJodHRwczovL2Rhcmthbi5ldSI7fXM6OToiX3NmMl9tZXRhIjthOjM6e3M6MToidSI7aToxNTUwMzg4NDk0O3M6MToiYyI7aToxNTUwMzg4NDk0O3M6MToibCI7czoxOiIwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1550388498),
('VrDWta1zX2vuX4FgN9kDhyBrY39ftygmoFD6P8vT', NULL, '176.119.32.159', 'WordPress/4.0; https://blog.darkan.eu', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiQ091VlNlblpLN3dBV1hTS1ZoWXBNVG1STFJ2QmszVzE1NjR4VUcxQSI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAyNDY0MzI7czoxOiJjIjtpOjE1NTAyNDY0MzI7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550246434),
('wT2Su6zNvFNH5ZWB85J9WayNzvPsuJJzUWF3fihu', NULL, '66.249.76.81', 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.96 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoidXlEalNLM3Ewa0U5cVRydTdQQ0dvUnZpdWRZb3pGUnh2RTZPVzh0dSI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJDQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiQ2FsaWZvcm5pYSI7czo4OiJjaXR5TmFtZSI7czoxMzoiTW91bnRhaW4gVmlldyI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6MzcuNDE5MTk5OTk5OTk5OTk2O3M6OToibG9uZ2l0dWRlIjtkOi0xMjIuMDU3NDtzOjk6Im1ldHJvQ29kZSI7czozOiI4MDciO3M6ODoiYXJlYUNvZGUiO3M6MDoiIjtzOjM6ImlzcCI7czowOiIiO3M6MjoiaXAiO3M6MTM6IjY2LjI0OS43Ni4xNDYiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czoxNzoiaHR0cHM6Ly9kYXJrYW4uZXUiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX1zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDM4MDY2NztzOjE6ImMiO2k6MTU1MDM4MDY2MztzOjE6ImwiO3M6MToiMCI7fX0=', 1550380667),
('WWtkaaWHsYM1MVuNfkg2iP5TR0PBkVS1EMJd0nwU', NULL, '40.77.167.63', 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiVEhqTmlBaGVMNFZ6ZmxhMGV1M2tpN2FxaWFjdWFFT3FhWlZnbHNWSiI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czowOiIiO3M6MTA6InJlZ2lvbk5hbWUiO3M6MDoiIjtzOjg6ImNpdHlOYW1lIjtzOjA6IiI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6Mzg7czo5OiJsb25naXR1ZGUiO2Q6LTk3O3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxMjoiNDAuNzcuMTY3LjYzIjtzOjY6ImRyaXZlciI7czozODoiU3RldmViYXVtYW5cTG9jYXRpb25cRHJpdmVyc1xGcmVlR2VvSXAiO3M6NToiZXJyb3IiO2I6MDt9czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vYmxvZy5kYXJrYW4uZXUiO31zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDI4NDQzMjtzOjE6ImMiO2k6MTU1MDI4NDQzMjtzOjE6ImwiO3M6MToiMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1550284434),
('wxUCa6rNc1vAAWwgXvxJv9NpV3BYb72KajLYZbFu', NULL, '46.229.168.150', 'Mozilla/5.0 (compatible; SemrushBot/3~bl; +http://www.semrush.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiY2FqUjRFR2o1TTQ0TnRRWEZrMkg3bFZRZVIxTDJ4dmV6RjFpTmtXUiI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czowOiIiO3M6MTA6InJlZ2lvbk5hbWUiO3M6MDoiIjtzOjg6ImNpdHlOYW1lIjtzOjA6IiI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6Mzg7czo5OiJsb25naXR1ZGUiO2Q6LTk3O3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiNDYuMjI5LjE2OC4xNTAiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czozMToiaHR0cHM6Ly9kYXJrYW4uZXUvY2hhbmdlbGFuZy9wbCI7fXM6OToiX3NmMl9tZXRhIjthOjM6e3M6MToidSI7aToxNTUwMjY0MDMzO3M6MToiYyI7aToxNTUwMjY0MDMzO3M6MToibCI7czoxOiIwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1550264035),
('xC9DTst7prTlZkJIu4DwwfPGGMV9DruZEYSNOnJm', NULL, '46.229.168.144', 'Mozilla/5.0 (compatible; SemrushBot/3~bl; +http://www.semrush.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoibHduVUQ2dDNGUHJuRjFTamZlYlFGaDUzNXpPaW9WVVlvNkhkSWVIQSI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czowOiIiO3M6MTA6InJlZ2lvbk5hbWUiO3M6MDoiIjtzOjg6ImNpdHlOYW1lIjtzOjA6IiI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6Mzg7czo5OiJsb25naXR1ZGUiO2Q6LTk3O3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiNDYuMjI5LjE2OC4xNDQiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czoyOToiaHR0cHM6Ly9ibG9nLmRhcmthbi5ldS8/cD0xNzgiO31zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDMyMDM5MDtzOjE6ImMiO2k6MTU1MDMyMDM5MDtzOjE6ImwiO3M6MToiMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1550320394),
('xf8Y9sy3OmS2pOsF06bltoRu8CPKnpwg5bAhCeci', NULL, '66.249.76.124', 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoialNVdkZyempydWE3RnpiWDNuTnlNQTFER3hUblBGdGJZN0lRVk84WCI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJDQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiQ2FsaWZvcm5pYSI7czo4OiJjaXR5TmFtZSI7czoxMzoiTW91bnRhaW4gVmlldyI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6MzcuNDE5MTk5OTk5OTk5OTk2O3M6OToibG9uZ2l0dWRlIjtkOi0xMjIuMDU3NDtzOjk6Im1ldHJvQ29kZSI7czozOiI4MDciO3M6ODoiYXJlYUNvZGUiO3M6MDoiIjtzOjM6ImlzcCI7czowOiIiO3M6MjoiaXAiO3M6MTM6IjY2LjI0OS43Ni4xMjQiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo3NjoiaHR0cHM6Ly9ibG9nLmRhcmthbi5ldS93cC1pbmNsdWRlcy9qcy9qcXVlcnkvanF1ZXJ5LW1pZ3JhdGUubWluLmpzP3Zlcj0xLjIuMSI7fXM6OToiX3NmMl9tZXRhIjthOjM6e3M6MToidSI7aToxNTUwMzQ2NzIxO3M6MToiYyI7aToxNTUwMzQ2NzIxO3M6MToibCI7czoxOiIwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1550346724),
('xM7jLCkzm56E2YeVJEtmRvYkL3XFM4YYYy5eogEe', NULL, '87.250.224.92', 'Mozilla/5.0 (compatible; YandexBot/3.0; +http://yandex.com/bots)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiUGtCaHlQM1Y2Y1o0WFY5b2NuNUpZU3M1QnVoaUhPWHJzQmpUQ0VIUCI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjE4OiJSdXNzaWFuIEZlZGVyYXRpb24iO3M6MTE6ImNvdW50cnlDb2RlIjtzOjI6IlJVIjtzOjEwOiJyZWdpb25Db2RlIjtzOjA6IiI7czoxMDoicmVnaW9uTmFtZSI7czowOiIiO3M6ODoiY2l0eU5hbWUiO3M6MDoiIjtzOjc6InppcENvZGUiO3M6MDoiIjtzOjc6Imlzb0NvZGUiO3M6MDoiIjtzOjEwOiJwb3N0YWxDb2RlIjtzOjA6IiI7czo4OiJsYXRpdHVkZSI7ZDo2MDtzOjk6ImxvbmdpdHVkZSI7ZDoxMDA7czo5OiJtZXRyb0NvZGUiO3M6MDoiIjtzOjg6ImFyZWFDb2RlIjtzOjA6IiI7czozOiJpc3AiO3M6MDoiIjtzOjI6ImlwIjtzOjEzOiI4Ny4yNTAuMjI0LjkyIjtzOjY6ImRyaXZlciI7czozODoiU3RldmViYXVtYW5cTG9jYXRpb25cRHJpdmVyc1xGcmVlR2VvSXAiO3M6NToiZXJyb3IiO2I6MDt9czo5OiJfcHJldmlvdXMiO2E6MTp7czozOiJ1cmwiO3M6MjI6Imh0dHBzOi8vYmxvZy5kYXJrYW4uZXUiO31zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDI3NTc4NDtzOjE6ImMiO2k6MTU1MDI3NTc4NDtzOjE6ImwiO3M6MToiMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1550275787),
('Xv2h6TC4sKBGMwCPhlavqFve4xEtfXtvvqXqNNOV', NULL, '198.27.66.169', 'Mozilla/5.0 (Windows; U; Windows NT 5.1; en-US) AppleWebKit/533.4 (KHTML, like Gecko) Chrome/5.0.375.99 Safari/533.4', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiNkRES3FPaHFLS3REZUJ5Unhrc2F1WmNXVTNrekI5cFdlR2o4bkM5WiI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjY6IkNhbmFkYSI7czoxMToiY291bnRyeUNvZGUiO3M6MjoiQ0EiO3M6MTA6InJlZ2lvbkNvZGUiO3M6MjoiUUMiO3M6MTA6InJlZ2lvbk5hbWUiO3M6NzoiUXXDqWJlYyI7czo4OiJjaXR5TmFtZSI7czo5OiJNb250csOpYWwiO3M6NzoiemlwQ29kZSI7czowOiIiO3M6NzoiaXNvQ29kZSI7czowOiIiO3M6MTA6InBvc3RhbENvZGUiO3M6MDoiIjtzOjg6ImxhdGl0dWRlIjtkOjQ1LjUwNzgwMDAwMDAwMDAwMztzOjk6ImxvbmdpdHVkZSI7ZDotNzMuNTgwMzk5OTk5OTk5OTk3O3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxMzoiMTk4LjI3LjY2LjE2OSI7czo2OiJkcml2ZXIiO3M6Mzg6IlN0ZXZlYmF1bWFuXExvY2F0aW9uXERyaXZlcnNcRnJlZUdlb0lwIjtzOjU6ImVycm9yIjtiOjA7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjQwOiJodHRwOi8vc2hvcC5kYXJrYW4uZXUvanMvbWFnZS9jb29raWVzLmpzIjt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAyNDU4NTc7czoxOiJjIjtpOjE1NTAyNDU4NTc7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550245859),
('YcRqhhczV081n1ddx2p9nggXE4N6fSJEqiZjkX61', NULL, '176.119.32.159', 'WordPress/4.0; https://blog.darkan.eu', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiSXN3ZUtRSUlQTWpPVHRsVWFxbUZ6Zm5rbFpDV3pWNjFVMzdhYWVvRSI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAyNjQ4NjI7czoxOiJjIjtpOjE1NTAyNjQ4NjI7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550264862),
('yjihVS3cLuFO3RQlOZolT5FwELt1aQM0YggppqrC', NULL, '46.229.168.149', 'Mozilla/5.0 (compatible; SemrushBot/3~bl; +http://www.semrush.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiOVAzaG81dGdQb3REWndZZTNSY1RBV0lZSkNkOGYwdjVDbkZ2S2t5RSI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czowOiIiO3M6MTA6InJlZ2lvbk5hbWUiO3M6MDoiIjtzOjg6ImNpdHlOYW1lIjtzOjA6IiI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6Mzg7czo5OiJsb25naXR1ZGUiO2Q6LTk3O3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxNDoiNDYuMjI5LjE2OC4xNDkiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czoxNzoiaHR0cHM6Ly9kYXJrYW4uZXUiO31zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDI2MjA1NTtzOjE6ImMiO2k6MTU1MDI2MjA1NTtzOjE6ImwiO3M6MToiMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1550262059),
('yt0KkhE0TZu6ugt2p2u2XQTHdmOvQuTR3CmYQajX', NULL, '176.119.32.159', 'WordPress/4.0; https://blog.darkan.eu', 'YTozOntzOjY6Il90b2tlbiI7czo0MDoiUEdWT2NPb2M3YmU4QVF2eUMwcEcwMHdzQnI4ZXVER3VWbmd6cmo2dSI7czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTAzNzMzODU7czoxOiJjIjtpOjE1NTAzNzMzODU7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550373387),
('yyUWLJvFnLdIddAO627u466ot1O3ofcYPcw3aFkL', NULL, '157.55.39.218', 'Mozilla/5.0 (compatible; bingbot/2.0; +http://www.bing.com/bingbot.htm)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoibjVSWHZvRXpicmJjcVRhQkljcmoyQU04QUpDQzN4Y01oMlZHSFN6dyI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJXQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiV2FzaGluZ3RvbiI7czo4OiJjaXR5TmFtZSI7czo3OiJSZWRtb25kIjtzOjc6InppcENvZGUiO3M6MDoiIjtzOjc6Imlzb0NvZGUiO3M6MDoiIjtzOjEwOiJwb3N0YWxDb2RlIjtzOjA6IiI7czo4OiJsYXRpdHVkZSI7ZDo0Ny42ODAxMDAwMDAwMDAwMDM7czo5OiJsb25naXR1ZGUiO2Q6LTEyMi4xMjA2O3M6OToibWV0cm9Db2RlIjtzOjM6IjgxOSI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxMzoiMTU3LjU1LjM5LjIxOCI7czo2OiJkcml2ZXIiO3M6Mzg6IlN0ZXZlYmF1bWFuXExvY2F0aW9uXERyaXZlcnNcRnJlZUdlb0lwIjtzOjU6ImVycm9yIjtiOjA7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjIzOiJodHRwczovL2Rhcmthbi5ldS9sb2dpbiI7fXM6OToiX3NmMl9tZXRhIjthOjM6e3M6MToidSI7aToxNTUwMjY5MzQwO3M6MToiYyI7aToxNTUwMjY5MzQwO3M6MToibCI7czoxOiIwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1550269347),
('z9okafvlKUmqIcy2JFxRyTzt5WmdBpz8OX8p3ePQ', NULL, '66.249.76.83', 'Mozilla/5.0 (Linux; Android 6.0.1; Nexus 5X Build/MMB29P) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/41.0.2272.96 Mobile Safari/537.36 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiYjQzZ2FyOThSN3Boczdwb1JwaExFemxKTm5EN3YxV0ZZcUhzdFVnNCI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJDQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiQ2FsaWZvcm5pYSI7czo4OiJjaXR5TmFtZSI7czoxMzoiTW91bnRhaW4gVmlldyI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6MzcuNDE5MTk5OTk5OTk5OTk2O3M6OToibG9uZ2l0dWRlIjtkOi0xMjIuMDU3NDtzOjk6Im1ldHJvQ29kZSI7czozOiI4MDciO3M6ODoiYXJlYUNvZGUiO3M6MDoiIjtzOjM6ImlzcCI7czowOiIiO3M6MjoiaXAiO3M6MTI6IjY2LjI0OS43Ni44MyI7czo2OiJkcml2ZXIiO3M6Mzg6IlN0ZXZlYmF1bWFuXExvY2F0aW9uXERyaXZlcnNcRnJlZUdlb0lwIjtzOjU6ImVycm9yIjtiOjA7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjE3OiJodHRwczovL2Rhcmthbi5ldSI7fXM6OToiX3NmMl9tZXRhIjthOjM6e3M6MToidSI7aToxNTUwNDI3MDYzO3M6MToiYyI7aToxNTUwNDI3MDYzO3M6MToibCI7czoxOiIwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1550427067),
('ZI5K99YqefqQYu9QLAHkDVKH8PSCs0cS7zGckDEr', NULL, '77.75.76.167', 'Mozilla/5.0 (compatible; SeznamBot/3.2; +http://napoveda.seznam.cz/en/seznambot-intro/)', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiTWM0aEExakJLbkdCRW1mRmVXaW95d3NsYUJIWTl4Mmg1T3ZNVklHRSI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjE0OiJDemVjaCBSZXB1YmxpYyI7czoxMToiY291bnRyeUNvZGUiO3M6MjoiQ1oiO3M6MTA6InJlZ2lvbkNvZGUiO3M6MDoiIjtzOjEwOiJyZWdpb25OYW1lIjtzOjA6IiI7czo4OiJjaXR5TmFtZSI7czowOiIiO3M6NzoiemlwQ29kZSI7czowOiIiO3M6NzoiaXNvQ29kZSI7czowOiIiO3M6MTA6InBvc3RhbENvZGUiO3M6MDoiIjtzOjg6ImxhdGl0dWRlIjtkOjQ5Ljc1O3M6OToibG9uZ2l0dWRlIjtkOjE1LjU7czo5OiJtZXRyb0NvZGUiO3M6MDoiIjtzOjg6ImFyZWFDb2RlIjtzOjA6IiI7czozOiJpc3AiO3M6MDoiIjtzOjI6ImlwIjtzOjEyOiI3Ny43NS43Ni4xNjciO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czoyNjoiaHR0cHM6Ly9kYXJrYW4uZXUvZXhhbXBsZXMiO31zOjk6Il9zZjJfbWV0YSI7YTozOntzOjE6InUiO2k6MTU1MDM5NzE0OTtzOjE6ImMiO2k6MTU1MDM5NzE0OTtzOjE6ImwiO3M6MToiMCI7fXM6NjoiX2ZsYXNoIjthOjI6e3M6Mzoib2xkIjthOjA6e31zOjM6Im5ldyI7YTowOnt9fX0=', 1550397156),
('zo2B8B4t3NddOhJvAHhku7mCOe9XaJ4u4mG1VKly', NULL, '66.249.64.121', 'Mozilla/5.0 AppleWebKit/537.36 (KHTML, like Gecko; compatible; Googlebot/2.1; +http://www.google.com/bot.html) Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiS1FWNTlSa2JkOE8yZkdIOTlZdDNkWVAxQU1iV3VuaGhiZElRYkN6WCI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjEzOiJVbml0ZWQgU3RhdGVzIjtzOjExOiJjb3VudHJ5Q29kZSI7czoyOiJVUyI7czoxMDoicmVnaW9uQ29kZSI7czoyOiJDQSI7czoxMDoicmVnaW9uTmFtZSI7czoxMDoiQ2FsaWZvcm5pYSI7czo4OiJjaXR5TmFtZSI7czoxMzoiTW91bnRhaW4gVmlldyI7czo3OiJ6aXBDb2RlIjtzOjA6IiI7czo3OiJpc29Db2RlIjtzOjA6IiI7czoxMDoicG9zdGFsQ29kZSI7czowOiIiO3M6ODoibGF0aXR1ZGUiO2Q6MzcuMzg2MDAwMDAwMDAwMDAzO3M6OToibG9uZ2l0dWRlIjtkOi0xMjIuMDgzODtzOjk6Im1ldHJvQ29kZSI7czozOiI4MDciO3M6ODoiYXJlYUNvZGUiO3M6MDoiIjtzOjM6ImlzcCI7czowOiIiO3M6MjoiaXAiO3M6MTM6IjY2LjI0OS42NC4xMjEiO3M6NjoiZHJpdmVyIjtzOjM4OiJTdGV2ZWJhdW1hblxMb2NhdGlvblxEcml2ZXJzXEZyZWVHZW9JcCI7czo1OiJlcnJvciI7YjowO31zOjk6Il9wcmV2aW91cyI7YToxOntzOjM6InVybCI7czo4NzoiaHR0cHM6Ly9ibG9nLmRhcmthbi5ldS93cC1jb250ZW50L3RoZW1lcy9yYWRpYXRlL2pzL3NraXAtbGluay1mb2N1cy1maXguanM/dmVyPTIwMTMwMTE1Ijt9czo5OiJfc2YyX21ldGEiO2E6Mzp7czoxOiJ1IjtpOjE1NTA0MTYzNzA7czoxOiJjIjtpOjE1NTA0MTYzNzA7czoxOiJsIjtzOjE6IjAiO31zOjY6Il9mbGFzaCI7YToyOntzOjM6Im9sZCI7YTowOnt9czozOiJuZXciO2E6MDp7fX19', 1550416373),
('ZZ5sCDsD8b0k9TeB0pb2KZ6v00mV7wNVdaAQKMFO', NULL, '94.72.123.135', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.109 Safari/537.36', 'YTo1OntzOjY6Il90b2tlbiI7czo0MDoiaGlMbEVPYW45WndKS3hSQmZadU1ZQjdldG1uYlNpQ1lRREZJZW90ZyI7czo4OiJsb2NhdGlvbiI7TzozNzoiU3RldmViYXVtYW5cTG9jYXRpb25cT2JqZWN0c1xMb2NhdGlvbiI6MTY6e3M6MTE6ImNvdW50cnlOYW1lIjtzOjY6IlBvbGFuZCI7czoxMToiY291bnRyeUNvZGUiO3M6MjoiUEwiO3M6MTA6InJlZ2lvbkNvZGUiO3M6MDoiIjtzOjEwOiJyZWdpb25OYW1lIjtzOjA6IiI7czo4OiJjaXR5TmFtZSI7czowOiIiO3M6NzoiemlwQ29kZSI7czowOiIiO3M6NzoiaXNvQ29kZSI7czowOiIiO3M6MTA6InBvc3RhbENvZGUiO3M6MDoiIjtzOjg6ImxhdGl0dWRlIjtkOjUyO3M6OToibG9uZ2l0dWRlIjtkOjIwO3M6OToibWV0cm9Db2RlIjtzOjA6IiI7czo4OiJhcmVhQ29kZSI7czowOiIiO3M6MzoiaXNwIjtzOjA6IiI7czoyOiJpcCI7czoxMzoiOTQuNzIuMTIzLjEzNSI7czo2OiJkcml2ZXIiO3M6Mzg6IlN0ZXZlYmF1bWFuXExvY2F0aW9uXERyaXZlcnNcRnJlZUdlb0lwIjtzOjU6ImVycm9yIjtiOjA7fXM6OToiX3ByZXZpb3VzIjthOjE6e3M6MzoidXJsIjtzOjE3OiJodHRwczovL2Rhcmthbi5ldSI7fXM6OToiX3NmMl9tZXRhIjthOjM6e3M6MToidSI7aToxNTUwMzA0NDQ1O3M6MToiYyI7aToxNTUwMzA0NDQ1O3M6MToibCI7czoxOiIwIjt9czo2OiJfZmxhc2giO2E6Mjp7czozOiJvbGQiO2E6MDp7fXM6MzoibmV3IjthOjA6e319fQ==', 1550304449);

-- --------------------------------------------------------

--
-- Table structure for table `share`
--

CREATE TABLE `share` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `project_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `share`
--

INSERT INTO `share` (`id`, `user_id`, `project_id`) VALUES
(3, 100, 121),
(5, 29, 140),
(6, 29, 140),
(7, 29, 140),
(8, 29, 140),
(9, 29, 140),
(10, 29, 140),
(11, 29, 140),
(12, 29, 140),
(13, 29, 140),
(14, 29, 140),
(15, 29, 140),
(16, 29, 140),
(17, 29, 140),
(18, 29, 140),
(19, 29, 140),
(20, 29, 140),
(21, 29, 140),
(22, 29, 140),
(23, 29, 140),
(24, 29, 140),
(25, 29, 140),
(26, 29, 140),
(27, 29, 140),
(28, 29, 140),
(30, 29, 140),
(31, 29, 140),
(32, 29, 140),
(33, 29, 140),
(53, 107, 144),
(54, 105, 80),
(55, 32, 111),
(56, 105, 111),
(60, 103, 165),
(61, 105, 116),
(62, 29, 167),
(64, 29, 168),
(66, 29, 173),
(68, 29, 169),
(70, 29, 175),
(71, 117, 181),
(72, 117, 176),
(73, 117, 177),
(74, 117, 179),
(75, 117, 180),
(76, 118, 181),
(77, 118, 176),
(78, 118, 177),
(79, 118, 180),
(80, 118, 179),
(81, 118, 179),
(82, 119, 181),
(83, 119, 176),
(84, 119, 177),
(85, 119, 179),
(86, 120, 181),
(87, 120, 176),
(88, 120, 177),
(89, 119, 180),
(90, 120, 180),
(91, 120, 179),
(97, 122, 181),
(98, 122, 180),
(99, 122, 179),
(100, 122, 185),
(101, 117, 185),
(102, 118, 185),
(103, 119, 185),
(104, 120, 185),
(105, 125, 287),
(106, 125, 261),
(107, 29, 297),
(108, 113, 134),
(109, 125, 292),
(110, 125, 307),
(111, 3, 324),
(112, 29, 333),
(113, 29, 333),
(116, 125, 346),
(121, 59, 353),
(122, 116, 181);

-- --------------------------------------------------------

--
-- Table structure for table `share_noexists`
--

CREATE TABLE `share_noexists` (
  `id` int(10) UNSIGNED NOT NULL,
  `mail` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `project_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `share_noexists`
--

INSERT INTO `share_noexists` (`id`, `mail`, `project_id`) VALUES
(1, 'bartlomiejpietrzak@wp.pl', 116),
(2, 'karolgancarz@gmail.com', 168),
(3, 'karolgancarz@gmail.com', 169);

-- --------------------------------------------------------

--
-- Table structure for table `share_user_template`
--

CREATE TABLE `share_user_template` (
  `id` int(10) UNSIGNED NOT NULL,
  `owner_id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `template_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `testdrive`
--

CREATE TABLE `testdrive` (
  `email` varchar(150) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `id` int(10) UNSIGNED NOT NULL,
  `merchant_id` int(11) NOT NULL,
  `pos_id` int(11) NOT NULL,
  `session_id` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `amount` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `currency` varchar(3) COLLATE utf8_unicode_ci NOT NULL,
  `order_id` int(11) NOT NULL,
  `statement` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `sign` varchar(255) COLLATE utf8_unicode_ci NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(10) UNSIGNED NOT NULL,
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
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `name`, `email`, `password`, `provider_id`, `lang`, `active`, `photo`, `subdomain`, `subdomain_name`, `hash`, `download_project`, `folders_layout`, `folders_structure`, `visible`, `version`, `api_id`, `remember_token`, `created_at`, `updated_at`) VALUES
(1, 'Owner', 'owner@rapsody.com.pl', '$2y$10$Go9qSiLAOVdSlTmtBfR.nuJt6JWcU7CQvKq9KfLV0WL/clYxupu5q', '', 'pl', 0, 'default', 'owner', 'owner', '', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"test1\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":1,\"version\":\"2.0.0\",\"date\":\"2018-06-26 08:42:25\",\"last_visit\":\"2018-06-26 08:42:25\",\"date_modification\":\"2018-06-26 08:42:25\",\"project_id\":171,\"folder\":0,\"pType\":\"userProjects\"}],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, 'dD2qRAelJ0RJN0zP1fABIohYMCM8SHXOUOwoSUG5dEnPVHpiD1qsXUlIWq8w', '2017-02-23 16:38:55', '2018-06-26 06:42:30'),
(2, 'Admin', 'admin@rapsody.com.pl', '$2y$10$Go9qSiLAOVdSlTmtBfR.nuJt6JWcU7CQvKq9KfLV0WL/clYxupu5q', '', 'pl', 0, 'default', 'admin', 'admin', '', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, 'Oe67asuxao9Dfhn3tWit04fsSrrTcM6UBeijPuE7kXgySpG5mPilxRaMRkMg', '2017-02-23 16:38:55', '2018-06-26 06:40:45'),
(3, 'Template User', 'template@rapsody.com.pl', '$2y$10$9M6cp.LmaY6SnuWCZyhLh.dTMXld7FInwyubApm9pOinzIcJ2Nt/a', '', 'pl', 0, 'default', 'template', 'template', '', 0, 1, '{\"lastFolderID\":5,\"lastVisitedFolderID\":4,\"objs\":[{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Medicine\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":3,\"version\":\"2.0.0\",\"project_id\":77,\"folder\":0,\"pType\":\"userProjects\",\"size\":13794915},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"health care- blue\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":3,\"version\":\"2.0.0\",\"project_id\":78,\"folder\":0,\"pType\":\"userProjects\",\"size\":12785965},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"1\",\"skin\":\"sk00\",\"status\":0,\"template\":1,\"user_id\":3,\"version\":\"2.0.0\",\"project_id\":82,\"folder\":2,\"pType\":\"userProjects\",\"size\":19263339},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"2\",\"skin\":\"sk00\",\"status\":0,\"template\":1,\"user_id\":3,\"version\":\"2.0.0\",\"project_id\":83,\"folder\":2,\"pType\":\"userProjects\",\"size\":2466205},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"3\",\"skin\":\"sk00\",\"status\":0,\"template\":1,\"user_id\":3,\"version\":\"2.0.0\",\"project_id\":84,\"folder\":2,\"pType\":\"userProjects\",\"size\":15038274},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"4\",\"skin\":\"sk00\",\"status\":0,\"template\":1,\"user_id\":3,\"version\":\"2.0.0\",\"project_id\":85,\"folder\":2,\"pType\":\"userProjects\",\"size\":5909212},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"5\",\"skin\":\"sk00\",\"status\":0,\"template\":1,\"user_id\":3,\"version\":\"2.0.0\",\"project_id\":86,\"folder\":2,\"pType\":\"userProjects\",\"size\":5941404},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"6\",\"skin\":\"sk00\",\"status\":0,\"template\":1,\"user_id\":3,\"version\":\"2.0.0\",\"project_id\":87,\"folder\":2,\"pType\":\"userProjects\",\"size\":5328916},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"7\",\"skin\":\"sk00\",\"status\":0,\"template\":1,\"user_id\":3,\"version\":\"2.0.0\",\"project_id\":88,\"folder\":2,\"pType\":\"userProjects\",\"size\":3090649},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"8\",\"skin\":\"sk00\",\"status\":0,\"template\":1,\"user_id\":3,\"version\":\"2.0.0\",\"project_id\":89,\"folder\":2,\"pType\":\"userProjects\",\"size\":1926853},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"10\",\"skin\":\"sk00\",\"status\":0,\"template\":1,\"user_id\":3,\"version\":\"2.0.0\",\"project_id\":91,\"folder\":2,\"pType\":\"userProjects\",\"size\":2917382},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"12\",\"skin\":\"sk00\",\"status\":0,\"template\":1,\"user_id\":3,\"version\":\"2.0.0\",\"project_id\":93,\"folder\":2,\"pType\":\"userProjects\",\"size\":8855414},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"13\",\"skin\":\"sk00\",\"status\":0,\"template\":1,\"user_id\":3,\"version\":\"2.0.0\",\"project_id\":94,\"folder\":2,\"pType\":\"userProjects\",\"size\":11224042},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"14\",\"skin\":\"sk00\",\"status\":0,\"template\":1,\"user_id\":3,\"version\":\"2.0.0\",\"project_id\":95,\"folder\":2,\"pType\":\"userProjects\",\"size\":37682452},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Bezpiecze\\u0144stwo transakcji w internecie\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":3,\"version\":\"2.0.0\",\"project_id\":96,\"folder\":4,\"pType\":\"userSharedProjects\",\"size\":33942748},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Drogowskazy sprzeda\\u017cy\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":3,\"version\":\"2.0.0\",\"project_id\":98,\"folder\":4,\"pType\":\"userProjects\",\"size\":4883800},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Jako\\u015b\\u0107 opieki i bezpiecze\\u0144stwo pacjenta\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":3,\"version\":\"2.0.0\",\"project_id\":99,\"folder\":4,\"pType\":\"userProjects\",\"size\":5494491},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Style \\u017cycia w Polsce\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":3,\"version\":\"2.0.0\",\"project_id\":100,\"folder\":4,\"pType\":\"userProjects\",\"size\":19205314},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Zasoby ludzkie\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":3,\"version\":\"2.0.0\",\"project_id\":101,\"folder\":4,\"pType\":\"userProjects\",\"size\":5128755},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Darkan-prezentacja\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":3,\"version\":\"2.0.0\",\"project_id\":102,\"folder\":4,\"pType\":\"userProjects\",\"size\":9649009},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Darkan- presentation\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":3,\"version\":\"2.0.0\",\"project_id\":103,\"folder\":5,\"pType\":\"userProjects\",\"size\":9487048},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Sale signposts \",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":3,\"version\":\"2.0.0\",\"project_id\":104,\"folder\":5,\"pType\":\"userProjects\",\"size\":10663819},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Security of banking transactions\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":3,\"version\":\"2.0.0\",\"project_id\":105,\"folder\":5,\"pType\":\"userProjects\",\"size\":22943512},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Quality of care and patient safety in health care\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":3,\"version\":\"2.0.0\",\"project_id\":106,\"folder\":5,\"pType\":\"userProjects\",\"size\":8727665},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Human resources \",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":3,\"version\":\"2.0.0\",\"project_id\":107,\"folder\":5,\"pType\":\"userProjects\",\"size\":6034281},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Lifestyles in Poland\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":3,\"version\":\"2.0.0\",\"project_id\":108,\"folder\":5,\"pType\":\"userProjects\",\"size\":12158003},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"nazwa\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":3,\"version\":\"2.0.0\",\"date\":\"2018-01-11 18:00:09\",\"last_visit\":\"2018-01-11 18:00:09\",\"date_modification\":\"2018-01-11 18:00:09\",\"project_id\":110,\"folder\":0,\"pType\":\"userProjects\",\"size\":1069844},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"nowy\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":3,\"version\":\"2.0.0\",\"date\":\"2018-04-08 11:32:02\",\"last_visit\":\"2018-04-08 11:32:02\",\"date_modification\":\"2018-04-08 11:32:02\",\"project_id\":128,\"folder\":4,\"pType\":\"userProjects\",\"size\":131373},{\"project_id\":324,\"user_id\":113,\"date\":\"2018-11-17 11:51:32\",\"name\":\"Szablony\",\"skin\":\"sk00\",\"dimentions\":\"860x500\",\"version\":\"2.0.0\",\"date_modification\":\"2018-11-17 11:51:32\",\"size\":\"6185439\",\"template\":0,\"last_visit\":\"2018-11-18 11:51:21\",\"status\":\"0\",\"external\":\"0\",\"editor_id\":\"5\",\"folder\":0,\"pType\":\"sharedToUserProjects\",\"fromuser\":\"magblasik@gmail.com\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Zasoby ludzkie- kopia\",\"size\":5125635,\"status\":0,\"user_id\":3,\"version\":\"2.0.0\",\"project_id\":325,\"folder\":4,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Drogowskazy sprzeda\\u017cy- kopia\",\"size\":4793603,\"status\":0,\"user_id\":3,\"version\":\"2.0.0\",\"project_id\":326,\"folder\":4,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Style \\u017cycia w Polsce- kopia\",\"size\":9237146,\"status\":0,\"user_id\":3,\"version\":\"2.0.0\",\"project_id\":327,\"folder\":4,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Jako\\u015b\\u0107 opieki i bezpiecze\\u0144stwo pacjenta- kopia\",\"size\":5490854,\"status\":0,\"user_id\":3,\"version\":\"2.0.0\",\"project_id\":328,\"folder\":4,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Bezpiecze\\u0144stwo transakcji w internecie- kopia\",\"size\":10782365,\"status\":0,\"user_id\":3,\"version\":\"2.0.0\",\"project_id\":329,\"folder\":4,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Style \\u017cycia w Polsce- kopia\",\"size\":\"11328205\",\"status\":0,\"user_id\":3,\"version\":\"2.0.0\",\"project_id\":334,\"folder\":4,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Zasoby ludzkie- kopia\",\"size\":\"5634537\",\"status\":0,\"user_id\":3,\"version\":\"2.0.0\",\"project_id\":335,\"folder\":4,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Jako\\u015b\\u0107 opieki i bezpiecze\\u0144stwo pacjenta- kopia\",\"size\":\"8596127\",\"status\":0,\"user_id\":3,\"version\":\"2.0.0\",\"project_id\":336,\"folder\":4,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Drogowskazy sprzeda\\u017cy- kopia\",\"size\":\"10808864\",\"status\":0,\"user_id\":3,\"version\":\"2.0.0\",\"project_id\":337,\"folder\":4,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Bezpiecze\\u0144stwo transakcji w internecie- kopia\",\"size\":\"45119859\",\"status\":0,\"user_id\":3,\"version\":\"2.0.0\",\"project_id\":338,\"folder\":4,\"pType\":\"userProjects\"}],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0},{\"folder\":0,\"folderID\":1,\"name\":\"start\",\"pType\":\"folder\"},{\"folder\":0,\"folderID\":2,\"name\":\"template\",\"pType\":\"folder\"},{\"folder\":0,\"folderID\":3,\"name\":\"examples\",\"pType\":\"folder\"},{\"folder\":3,\"folderID\":4,\"name\":\"pl\",\"pType\":\"folder\"},{\"folder\":3,\"folderID\":5,\"name\":\"en\",\"pType\":\"folder\"}]}', 1, '2.0.0', 1, 'emsl9IinHgxrfr70DZMlvvDAintmFXHOLq7efwvwJbrZtbkskSb0yMkA4Y0J', '2017-02-23 16:38:55', '2019-02-04 10:48:24'),
(4, 'Examples User', 'examples@rapsody.com.pl', '$2y$10$m8wHNRCCG9Y/bL0iRqwhDefBcKlU4/EmGynGWt37qGoE5isxY9vAq', '', 'pl', 0, 'default', 'examples', 'examples', '', 0, 1, NULL, 1, '2.0.0', 1, NULL, '2017-02-23 16:38:55', '2017-02-23 16:38:55'),
(5, 'Distribution User', 'distribution@rapsody.com.pl', '$2y$10$m8wHNRCCG9Y/bL0iRqwhDefBcKlU4/EmGynGWt37qGoE5isxY9vAq', '', 'pl', 0, 'default', 'distribution', 'distribution', '', 0, 1, NULL, 1, '2.0.0', 1, NULL, '2017-02-23 16:38:55', '2017-02-23 16:38:55'),
(6, 'Test Drive', 'testdrive@rapsody.com.pl', '$2y$10$m8wHNRCCG9Y/bL0iRqwhDefBcKlU4/EmGynGWt37qGoE5isxY9vAq', '', 'en', 0, 'default', 'testdrive', 'testdrive', '', 0, 1, '{\"lastFolderID\":1,\"lastVisitedFolderID\":0,\"objs\":[{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Nowy projekt\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":6,\"version\":\"2.0.0\",\"date\":\"2018-01-07 17:57:45\",\"last_visit\":\"2018-01-07 17:57:45\",\"date_modification\":\"2018-01-07 17:57:45\",\"project_id\":109,\"folder\":0,\"pType\":\"userProjects\",\"size\":1987034},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Nowy projekt\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":6,\"version\":\"2.0.0\",\"date\":\"2018-01-19 11:45:08\",\"last_visit\":\"2018-01-19 11:45:08\",\"date_modification\":\"2018-01-19 11:45:08\",\"project_id\":113,\"folder\":0,\"pType\":\"userProjects\",\"size\":64827},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"ala\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":6,\"version\":\"2.0.0\",\"date\":\"2018-01-21 19:40:13\",\"last_visit\":\"2018-01-21 19:40:13\",\"date_modification\":\"2018-01-21 19:40:13\",\"project_id\":114,\"folder\":0,\"pType\":\"userProjects\",\"size\":269528},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"test123\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":6,\"version\":\"2.0.0\",\"date\":\"2018-05-12 15:52:48\",\"last_visit\":\"2018-05-12 15:52:48\",\"date_modification\":\"2018-05-12 15:52:48\",\"project_id\":136,\"folder\":0,\"pType\":\"userProjects\",\"size\":699710}],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0},{\"folder\":0,\"folderID\":1,\"name\":\"Nowy folder\",\"pType\":\"folder\"}]}', 1, '2.0.0', 1, 'Ub8vb6zqaY8zjymobH07jx8OHzZHEbiwt3IK6CCsLMWYqhIPi9oZ4Fhq1qRp', '2017-02-23 16:38:55', '2019-01-18 16:44:21'),
(7, 'Api demo admin', 'apidemoadmin@rapsody.com.pl', '$2y$10$m8wHNRCCG9Y/bL0iRqwhDefBcKlU4/EmGynGWt37qGoE5isxY9vAq', '', 'pl', 0, 'default', 'demo', 'demo', '', 0, 1, NULL, 1, '2.0.0', 1, NULL, '2017-02-23 16:38:55', '2017-02-23 16:38:55'),
(8, 'Api demo user', 'apidemouser@rapsody.com.pl', '$2y$10$m8wHNRCCG9Y/bL0iRqwhDefBcKlU4/EmGynGWt37qGoE5isxY9vAq', '', 'pl', 0, 'default', 'apidemouser', 'apidemouser', '', 0, 1, NULL, 1, '2.0.0', 1, NULL, '2017-02-23 16:38:55', '2017-02-23 16:38:55'),
(9, 'Test1', 'test1@rapsody.com.pl', '$2y$10$z4BzPlGMRfAmw/h1X83xk.L7TLLtjQV2sDvOKKKiZiIDv8bbNU9XS', '', 'pl', 0, 'default', 'test1', 'test1', '', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 0, '2.0.0', 1, NULL, '2017-02-23 16:38:55', '2018-04-23 10:03:53'),
(10, 'Test2', 'test2@rapsody.com.pl', '$2y$10$dew5BdIixhZZqTWZLdjsnemEwZTVMdC9de2DKGi5xoCyME9PIydfa', '', 'pl', 0, 'default', 'test2', 'test2', '', 0, 1, NULL, 0, '2.0.0', 1, NULL, '2017-02-23 16:38:55', '2017-02-23 16:38:55'),
(11, 'Test3', 'test3@rapsody.com.pl', '$2y$10$p3i5mjI7z4iRHk4VbhQUQuhwObcALHE2vB1XMhz2wjK7T3AX.e/by', '', 'pl', 0, 'default', 'test3', 'test3', '', 0, 1, NULL, 0, '2.0.0', 1, NULL, '2017-02-23 16:38:55', '2017-02-23 16:38:55'),
(12, 'Test4', 'test4@rapsody.com.pl', '$2y$10$3Ky2j11VdeWGbG3BT1OCY.F83fpOJ/iC.gjqIMq7gvSnScxFY9sC6', '', 'pl', 0, 'default', 'test4', 'test4', '', 0, 1, NULL, 0, '2.0.0', 1, NULL, '2017-02-23 16:38:56', '2017-02-23 16:38:56'),
(13, 'Test5', 'test5@rapsody.com.pl', '$2y$10$wkm8GvDj8WFMRIoVdoNfyumiaYzqmG/weFta.rrwh3IcAvU13zDM2', '', 'pl', 0, 'default', 'test5', 'test5', '', 0, 1, NULL, 0, '2.0.0', 1, NULL, '2017-02-23 16:38:56', '2017-02-23 16:38:56'),
(14, 'Test6', 'test6@rapsody.com.pl', '$2y$10$DIn/az7moxa.d/bX4a0YOuDm07/A32vdQV1QGGMXXV2VWquDVZciy', '', 'pl', 0, 'default', 'test6', 'test6', '', 0, 1, NULL, 0, '2.0.0', 1, NULL, '2017-02-23 16:38:56', '2017-02-23 16:38:56'),
(15, 'Test7', 'test7@rapsody.com.pl', '$2y$10$6kbsKCOLfq4SSVLIB8gisOD39pQS3eabtFHQ6HWFKEDawLWQ7b1r.', '', 'pl', 0, 'default', 'test7', 'test7', '', 0, 1, NULL, 0, '2.0.0', 1, NULL, '2017-02-23 16:38:56', '2017-02-23 16:38:56'),
(16, 'Test8', 'test8@rapsody.com.pl', '$2y$10$70eggTWuHT7su1JNivbW2eRhfrDUUN4GOxZJKrToqZARkrHJd3Gwq', '', 'pl', 0, 'default', 'test8', 'test8', '', 0, 1, NULL, 0, '2.0.0', 1, NULL, '2017-02-23 16:38:56', '2017-02-23 16:38:56'),
(17, 'Test9', 'test9@rapsody.com.pl', '$2y$10$Od8LcDa7V7y6wFZOZuMqu.VLmmp2gfDVH3JGPBZ67n0yX8hJh6wha', '', 'pl', 0, 'default', 'test9', 'test9', '', 0, 1, NULL, 0, '2.0.0', 1, NULL, '2017-02-23 16:38:56', '2017-02-23 16:38:56'),
(18, 'Test10', 'test10@rapsody.com.pl', '$2y$10$ctoxzUigmTdt9mdRtb1UROLGMy/eLcOK8096DbMu53uX4BXBVIoXq', '', 'pl', 0, 'default', 'test10', 'test10', '', 0, 1, NULL, 0, '2.0.0', 1, NULL, '2017-02-23 16:38:56', '2017-02-23 16:38:56'),
(19, 'Test11', 'test11@rapsody.com.pl', '$2y$10$xsyBs618IevetR89pMnhtecLWTCzgIe7DYPrIvdgdrg/JbcrHPKTK', '', 'pl', 0, 'default', 'test11', 'test11', '', 0, 1, NULL, 0, '2.0.0', 1, NULL, '2017-02-23 16:38:56', '2017-02-23 16:38:56'),
(20, 'Test12', 'test12@rapsody.com.pl', '$2y$10$0c4/DQuvlS1z2vT1wyOGRO5NEDBIcA26VZmwWUpJdE1l/tp6REkkK', '', 'pl', 0, 'default', 'test12', 'test12', '', 0, 1, NULL, 0, '2.0.0', 1, NULL, '2017-02-23 16:38:56', '2017-02-23 16:38:56'),
(21, 'Test13', 'test13@rapsody.com.pl', '$2y$10$IxbcDb0p3g0IaBsoN6mGP.HS9t.Zgl6Ye0tU/tCyhog6DHPvtb/b6', '', 'pl', 0, 'default', 'test13', 'test13', '', 0, 1, NULL, 0, '2.0.0', 1, NULL, '2017-02-23 16:38:56', '2017-02-23 16:38:56'),
(22, 'Test14', 'test14@rapsody.com.pl', '$2y$10$XJxpnKBdUEQcadV/XdJfnuiRk.U9RCmErKtydLxI.9Jm5Ra5YlLmS', '', 'pl', 0, 'default', 'test14', 'test14', '', 0, 1, NULL, 0, '2.0.0', 1, NULL, '2017-02-23 16:38:56', '2017-02-23 16:38:56'),
(23, 'Test15', 'test15@rapsody.com.pl', '$2y$10$BokA8uzqDeiyXkMVc0BfbO8gIt0SRcN9KI1bBbi1wHfdUN1HRuK12', '', 'pl', 0, 'default', 'test15', 'test15', '', 0, 1, NULL, 0, '2.0.0', 1, NULL, '2017-02-23 16:38:56', '2017-02-23 16:38:56'),
(24, 'Test16', 'test16@rapsody.com.pl', '$2y$10$EtlG26GiF9iO0v.na0Wx.ODkxVGKQ6DU.8aCmlmRN5lcgBHsfVMWu', '', 'pl', 0, 'default', 'test16', 'test16', '', 0, 1, NULL, 0, '2.0.0', 1, NULL, '2017-02-23 16:38:56', '2017-02-23 16:38:56'),
(25, 'Test17', 'test17@rapsody.com.pl', '$2y$10$75FCnaxpBnFZMG44qRdK3OQzSgW8J06V6wY/E8puOZNJ.5BZwyOu2', '', 'pl', 0, 'default', 'test17', 'test17', '', 0, 1, NULL, 0, '2.0.0', 1, NULL, '2017-02-23 16:38:56', '2017-02-23 16:38:56'),
(26, 'Test18', 'test18@rapsody.com.pl', '$2y$10$/gWYQjKen/HtyE.H1nYeO.vCl1sTtJz.e22AwwlYkieUR5zHQK3fa', '', 'pl', 0, 'default', 'test18', 'test18', '', 0, 1, NULL, 0, '2.0.0', 1, NULL, '2017-02-23 16:38:57', '2017-02-23 16:38:57'),
(27, 'Test19', 'test19@rapsody.com.pl', '$2y$10$joYRoVrLWt4qL2EFzznr7OQc0qyvDNe5FrKd5TzyT2l0uhwcpEq.y', '', 'pl', 0, 'default', 'test19', 'test19', '', 0, 1, NULL, 0, '2.0.0', 1, NULL, '2017-02-23 16:38:57', '2017-02-23 16:38:57'),
(28, 'Test20', 'test20@rapsody.com.pl', '$2y$10$qtkQJAfnC/LUID8M67SCBOtZRfMPQcASJcy.57gi1ArpqnAhA.FA6', '', 'pl', 0, 'default', 'test20', 'test20', '', 0, 1, NULL, 0, '2.0.0', 1, NULL, '2017-02-23 16:38:57', '2017-02-23 16:38:57'),
(29, 'Tomasz Wiśniewski', 't.wisniewski@rapsody.com.pl', '$2y$10$Go9qSiLAOVdSlTmtBfR.nuJt6JWcU7CQvKq9KfLV0WL/clYxupu5q', '', 'pl', 0, 'https://darkan.eu/storage/app/projects/29/avatar/avatar.png', 'twisniewski', 'sggw', '', 0, 1, '{\"lastFolderID\":5,\"lastVisitedFolderID\":0,\"objs\":[{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"nowy\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2017-10-08 18:46:56\",\"last_visit\":\"2017-10-08 18:46:56\",\"date_modification\":\"2017-10-08 18:46:56\",\"project_id\":56,\"folder\":3,\"pType\":\"userProjects\",\"size\":1298038},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"nowy4\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2017-11-20 10:02:06\",\"last_visit\":\"2017-11-20 10:02:06\",\"date_modification\":\"2017-11-20 10:02:06\",\"project_id\":68,\"folder\":3,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"start23\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2017-11-20 10:18:37\",\"last_visit\":\"2017-11-20 10:18:37\",\"date_modification\":\"2017-11-20 10:18:37\",\"project_id\":69,\"folder\":3,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"nowy_projekt\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2017-11-20 12:23:44\",\"last_visit\":\"2017-11-20 12:23:44\",\"date_modification\":\"2017-11-20 12:23:44\",\"project_id\":70,\"folder\":3,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"starter\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2017-11-20 13:12:45\",\"last_visit\":\"2017-11-20 13:12:45\",\"date_modification\":\"2017-11-20 13:12:45\",\"project_id\":71,\"folder\":3,\"pType\":\"userProjects\",\"size\":64826},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"new\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2017-11-30 17:07:11\",\"last_visit\":\"2017-11-30 17:07:11\",\"date_modification\":\"2017-11-30 17:07:11\",\"project_id\":75,\"folder\":5,\"pType\":\"userProjects\",\"size\":1139159},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"nowy\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2017-12-08 07:08:42\",\"last_visit\":\"2017-12-08 07:08:42\",\"date_modification\":\"2017-12-08 07:08:42\",\"project_id\":79,\"folder\":5,\"pType\":\"userProjects\",\"size\":426096},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"nowy\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2017-12-08 07:10:24\",\"last_visit\":\"2017-12-08 07:10:24\",\"date_modification\":\"2017-12-08 07:10:24\",\"project_id\":80,\"folder\":0,\"pType\":\"userSharedProjects\",\"size\":3039284},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"test\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2017-12-19 12:53:26\",\"last_visit\":\"2017-12-19 12:53:26\",\"date_modification\":\"2017-12-19 12:53:26\",\"project_id\":81,\"folder\":0,\"pType\":\"userProjects\",\"size\":306350},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"www\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2018-01-06 16:25:25\",\"last_visit\":\"2018-01-06 16:25:25\",\"date_modification\":\"2018-01-06 16:25:25\",\"project_id\":97,\"folder\":5,\"pType\":\"userProjects\",\"size\":511359},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Testowy nowy projekt\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2018-01-15 09:02:38\",\"last_visit\":\"2018-01-15 09:02:38\",\"date_modification\":\"2018-01-15 09:02:38\",\"project_id\":111,\"folder\":0,\"pType\":\"userSharedProjects\",\"size\":840247},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"video\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2018-02-05 11:50:09\",\"last_visit\":\"2018-02-05 11:50:09\",\"date_modification\":\"2018-02-05 11:50:09\",\"project_id\":116,\"folder\":0,\"pType\":\"userSharedProjects\",\"size\":21818595},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"oragne\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2018-04-23 07:22:20\",\"last_visit\":\"2018-04-23 07:22:20\",\"date_modification\":\"2018-04-23 07:22:20\",\"project_id\":130,\"folder\":2,\"pType\":\"userProjects\",\"size\":14224709},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Cyber bezpiecze\\u0144stwo\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2018-05-10 04:53:31\",\"last_visit\":\"2018-05-10 04:53:31\",\"date_modification\":\"2018-05-10 04:53:31\",\"project_id\":132,\"folder\":2,\"pType\":\"userProjects\",\"size\":2498903},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"prezentacja\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2018-05-12 09:21:55\",\"last_visit\":\"2018-05-12 09:21:55\",\"date_modification\":\"2018-05-12 09:21:55\",\"project_id\":133,\"folder\":2,\"pType\":\"userProjects\",\"size\":8074860},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Darkan-prezentacja\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"project_id\":134,\"folder\":2,\"pType\":\"userSharedProjects\",\"size\":19991391},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"pitchdeck long- waw.ac\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"project_id\":135,\"folder\":2,\"pType\":\"userProjects\",\"size\":12218677},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"edulab-prezentacja\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2018-05-12 16:34:37\",\"last_visit\":\"2018-05-12 16:34:37\",\"date_modification\":\"2018-05-12 16:34:37\",\"project_id\":139,\"folder\":2,\"pType\":\"userProjects\",\"size\":10930765},{\"project_id\":140,\"user_id\":103,\"date\":\"2018-05-24 09:57:24\",\"name\":\"Orange\",\"skin\":\"sk00\",\"dimentions\":\"860x500\",\"version\":\"2.0.0\",\"date_modification\":\"2018-05-24 09:57:24\",\"size\":\"0\",\"template\":0,\"last_visit\":\"2018-05-24 13:05:34\",\"status\":\"0\",\"external\":\"0\",\"editor_id\":\"5\",\"folder\":0,\"pType\":\"sharedToUserProjects\",\"fromuser\":\"tomaszchmielik@gmail.com\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Obieg pieni\\u0105dza\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2018-06-10 19:15:48\",\"last_visit\":\"2018-06-10 19:15:48\",\"date_modification\":\"2018-06-10 19:15:48\",\"project_id\":142,\"folder\":2,\"pType\":\"userProjects\",\"size\":14840707},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"nowy\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2018-06-15 16:06:08\",\"last_visit\":\"2018-06-15 16:06:08\",\"date_modification\":\"2018-06-15 16:06:08\",\"project_id\":159,\"folder\":0,\"pType\":\"userProjects\",\"size\":501412},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"prezentacja-ssgw\",\"skin\":\"sk00\",\"status\":0,\"template\":1,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2018-06-16 04:36:21\",\"last_visit\":\"2018-06-16 04:36:21\",\"date_modification\":\"2018-06-16 04:36:21\",\"project_id\":161,\"folder\":0,\"pType\":\"userProjects\",\"size\":30358685},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"WIB\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2018-06-17 13:19:37\",\"last_visit\":\"2018-06-17 13:19:37\",\"date_modification\":\"2018-06-17 13:19:37\",\"project_id\":165,\"folder\":0,\"pType\":\"userSharedProjects\",\"size\":434327948},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"WIB- kopia\",\"size\":174102208,\"status\":0,\"user_id\":29,\"version\":\"2.0.0\",\"project_id\":166,\"folder\":0,\"pType\":\"userProjects\"},{\"project_id\":167,\"user_id\":103,\"date\":\"0000-00-00 00:00:00\",\"name\":\"Orange\",\"skin\":\"sk01\",\"dimentions\":\"860x500\",\"version\":\"2.0.0\",\"date_modification\":\"0000-00-00 00:00:00\",\"size\":\"118203548\",\"template\":0,\"last_visit\":\"2018-06-25 18:02:58\",\"status\":\"0\",\"external\":\"0\",\"editor_id\":\"5\",\"folder\":0,\"pType\":\"sharedToUserProjects\",\"fromuser\":\"tomaszchmielik@gmail.com\"},{\"project_id\":168,\"user_id\":103,\"date\":\"2018-06-25 16:02:25\",\"name\":\"Orange typografia\",\"skin\":\"sk00\",\"dimentions\":\"860x500\",\"version\":\"2.0.0\",\"date_modification\":\"2018-06-25 16:02:25\",\"size\":\"1588130\",\"template\":0,\"last_visit\":\"2018-06-25 18:06:00\",\"status\":\"0\",\"external\":\"0\",\"editor_id\":\"5\",\"folder\":0,\"pType\":\"sharedToUserProjects\",\"fromuser\":\"tomaszchmielik@gmail.com\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"test\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2018-06-26 08:40:58\",\"last_visit\":\"2018-06-26 08:40:58\",\"date_modification\":\"2018-06-26 08:40:58\",\"project_id\":170,\"folder\":0,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Orange - Telefony\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2018-06-26 09:59:03\",\"last_visit\":\"2018-06-26 09:59:03\",\"date_modification\":\"2018-06-26 09:59:03\",\"project_id\":172,\"folder\":0,\"pType\":\"userProjects\",\"size\":3673834},{\"project_id\":173,\"user_id\":103,\"date\":\"0000-00-00 00:00:00\",\"name\":\"Orange typografia- kopia\",\"skin\":\"sk01\",\"dimentions\":\"860x500\",\"version\":\"2.0.0\",\"date_modification\":\"0000-00-00 00:00:00\",\"size\":\"29603059\",\"template\":0,\"last_visit\":\"2018-06-27 10:19:52\",\"status\":\"0\",\"external\":\"0\",\"editor_id\":\"5\",\"folder\":0,\"pType\":\"sharedToUserProjects\",\"fromuser\":\"tomaszchmielik@gmail.com\"},{\"project_id\":169,\"user_id\":103,\"date\":\"0000-00-00 00:00:00\",\"name\":\"Darkan - Orange\",\"skin\":\"sk01\",\"dimentions\":\"860x500\",\"version\":\"2.0.0\",\"date_modification\":\"0000-00-00 00:00:00\",\"size\":\"13680510\",\"template\":0,\"last_visit\":\"2018-06-25 20:21:59\",\"status\":\"0\",\"external\":\"0\",\"editor_id\":\"5\",\"folder\":0,\"pType\":\"sharedToUserProjects\",\"fromuser\":\"tomaszchmielik@gmail.com\"},{\"project_id\":175,\"user_id\":103,\"date\":\"0000-00-00 00:00:00\",\"name\":\"Orange - M\\u00f3j Orange\",\"skin\":\"sk01\",\"dimentions\":\"860x500\",\"version\":\"2.0.0\",\"date_modification\":\"0000-00-00 00:00:00\",\"size\":\"9022121\",\"template\":0,\"last_visit\":\"2018-06-27 17:58:09\",\"status\":\"0\",\"external\":\"0\",\"editor_id\":\"5\",\"folder\":0,\"pType\":\"sharedToUserProjects\",\"fromuser\":\"tomaszchmielik@gmail.com\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Orange typografia- kopia\",\"size\":\"375483\",\"status\":0,\"user_id\":29,\"version\":\"2.0.0\",\"project_id\":178,\"folder\":0,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Orange typografia- v1\",\"size\":375483,\"status\":0,\"user_id\":29,\"version\":\"2.0.0\",\"project_id\":179,\"folder\":0,\"pType\":\"userSharedProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Orange info - v1\",\"size\":\"29691936\",\"status\":0,\"user_id\":29,\"version\":\"2.0.0\",\"project_id\":180,\"folder\":0,\"pType\":\"userSharedProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Darkan - Orange- v1\",\"size\":13735171,\"status\":0,\"user_id\":29,\"version\":\"2.0.0\",\"project_id\":181,\"folder\":0,\"pType\":\"userSharedProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Orange - Telefony- v1\",\"size\":2267695,\"status\":0,\"user_id\":29,\"version\":\"2.0.0\",\"project_id\":185,\"folder\":0,\"pType\":\"userSharedProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"nowy\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2018-08-23 09:01:28\",\"last_visit\":\"2018-08-23 09:01:28\",\"date_modification\":\"2018-08-23 09:01:28\",\"project_id\":282,\"folder\":0,\"pType\":\"userProjects\",\"size\":361199},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"nowy1\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2018-08-30 13:50:02\",\"last_visit\":\"2018-08-30 13:50:02\",\"date_modification\":\"2018-08-30 13:50:02\",\"project_id\":286,\"folder\":0,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"pick one\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2018-08-30 13:50:43\",\"last_visit\":\"2018-08-30 13:50:43\",\"date_modification\":\"2018-08-30 13:50:43\",\"project_id\":287,\"folder\":0,\"pType\":\"userSharedProjects\",\"size\":67834},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"nazwa\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2018-09-13 08:52:11\",\"last_visit\":\"2018-09-13 08:52:11\",\"date_modification\":\"2018-09-13 08:52:11\",\"project_id\":290,\"folder\":0,\"pType\":\"userProjects\",\"size\":968611},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"startowy\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2018-09-28 09:58:10\",\"last_visit\":\"2018-09-28 09:58:10\",\"date_modification\":\"2018-09-28 09:58:10\",\"project_id\":299,\"folder\":0,\"pType\":\"userProjects\",\"size\":129345},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Nowy projekt\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2018-10-17 12:38:57\",\"last_visit\":\"2018-10-17 12:38:57\",\"date_modification\":\"2018-10-17 12:38:57\",\"project_id\":303,\"folder\":0,\"pType\":\"userProjects\",\"size\":222093},{\"project_id\":297,\"user_id\":113,\"date\":\"2018-09-27 09:32:04\",\"name\":\"Propaganda\",\"skin\":\"sk00\",\"dimentions\":\"860x500\",\"version\":\"2.0.0\",\"date_modification\":\"2018-09-27 09:32:04\",\"size\":\"6728612\",\"template\":0,\"last_visit\":\"2018-10-17 17:25:15\",\"status\":\"0\",\"external\":\"0\",\"editor_id\":\"5\",\"folder\":0,\"pType\":\"sharedToUserProjects\",\"fromuser\":\"magblasik@gmail.com\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"triggery\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2018-10-19 19:20:26\",\"last_visit\":\"2018-10-19 19:20:26\",\"date_modification\":\"2018-10-19 19:20:26\",\"project_id\":306,\"folder\":0,\"pType\":\"userProjects\",\"size\":387414},{\"project_id\":333,\"user_id\":113,\"date\":\"2018-11-23 13:48:41\",\"name\":\"WIB\",\"skin\":\"sk00\",\"dimentions\":\"860x500\",\"version\":\"2.0.0\",\"date_modification\":\"2018-11-23 13:48:41\",\"size\":\"25159316\",\"template\":0,\"last_visit\":\"2018-11-24 12:41:46\",\"status\":\"0\",\"external\":\"0\",\"editor_id\":\"5\",\"folder\":0,\"pType\":\"sharedToUserProjects\",\"fromuser\":\"magblasik@gmail.com\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"nowa\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2018-11-29 08:45:42\",\"last_visit\":\"2018-11-29 08:45:42\",\"date_modification\":\"2018-11-29 08:45:42\",\"project_id\":345,\"folder\":2,\"pType\":\"userProjects\",\"size\":219847},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"starter\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2018-12-14 16:00:28\",\"last_visit\":\"2018-12-14 16:00:28\",\"date_modification\":\"2018-12-14 16:00:28\",\"project_id\":352,\"folder\":0,\"pType\":\"userProjects\",\"size\":1186595},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"test-krzyzowka\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":29,\"version\":\"2.0.0\",\"date\":\"2019-01-30 22:03:12\",\"last_visit\":\"2019-01-30 22:03:12\",\"date_modification\":\"2019-01-30 22:03:12\",\"project_id\":366,\"folder\":0,\"pType\":\"userProjects\",\"size\":1115087}],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0},{\"folder\":0,\"folderID\":2,\"name\":\"h55\",\"pType\":\"folder\"},{\"folder\":0,\"folderID\":3,\"name\":\"nowy\",\"pType\":\"folder\"},{\"folder\":0,\"folderID\":5,\"name\":\"trash\",\"pType\":\"folder\"}]}', 1, '2.0.0', 1, 'OVxSTf0n9So8qJyYzBUVxTVMzVGexkel2IUksWnXTS6JjrQykCCZL4scXs9x', '2017-02-23 16:38:57', '2019-02-04 10:27:23'),
(32, 'Tomasz Chmielik', 't.chmielik@rapsody.com.pl', '$2y$10$S5YGkeFqdQa8lKQM0Xe/8uYh8VvJxx8yjMOOuRWlya24MTDvLiq1.', '', 'pl', 0, 'default', 'tchmielik', 'tchmielik', '', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[{\"project_id\":111,\"user_id\":29,\"date\":\"2018-01-15 09:02:38\",\"name\":\"Testowy nowy projekt\",\"skin\":\"sk00\",\"dimentions\":\"860x500\",\"version\":\"2.0.0\",\"date_modification\":\"2018-01-15 09:02:38\",\"size\":\"840247\",\"template\":0,\"last_visit\":\"2018-06-18 19:00:17\",\"status\":\"0\",\"external\":\"0\",\"editor_id\":\"5\",\"folder\":0,\"pType\":\"sharedToUserProjects\",\"fromuser\":\"t.wisniewski@rapsody.com.pl\"}],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, 'HE4LEODPR6cD0KSfAuOemM1VGu42PO3UFqdH2D2TqY3XC4HqtM2xR93UWcp2', '2017-02-23 16:38:57', '2018-06-25 13:45:07'),
(33, 'Jarosław Kutyna', 'j.kutyna@rapsody.com.pl ', '$2y$10$PFpyJAB82V/4Q0GT4./mTuir5YN0wr0YmMyrghTcRj70i86KHR79e', '', 'pl', 0, 'default', 'jkutyna', 'jkutyna', '', 0, 1, NULL, 1, '2.0.0', 1, 'XIQmlS7dbg1uaRlljnAMLyQRHAxu48TYyIAlc6wXWaiG5WDW6TYYhCWkgT66', '2017-02-23 16:38:57', '2017-07-23 14:39:42'),
(34, 'Hubert Biszkont', 'huberthc+1232132@gmail.com', '$2y$10$C0T1u883GZdumPA9M.uuYe36IoPmxXB4/0zqZ8ifw6otqv/e76S3i', '', 'pl;', 1, 'https://darkan.eu/storage/app/projects/34/avatar/avatar.png', 'huberthc+1232132', 'huberthc+1232132', '2aedb679f401f532003480053c1e2f24', 0, 1, NULL, 1, '2.0.0', 1, '5kZLqHA1FHZ6QC1oJEO0h5dMYZGLPzloZbISLQvYXmzmOxe7A9RmWLiyEQRu', '2017-03-29 21:06:32', '2017-03-29 21:07:22'),
(35, 'Hubert Biszkont', 'huberthc+32131@gmail.com', '$2y$10$i5/jI.50JP0JoftbewMpNuEUgIQkjAnQoKv8piixzoFbVM25bJDP6', '', 'pl;', 1, 'https://darkan.eu/storage/app/projects/35/avatar/avatar.png', 'huberthc+32131', 'huberthc+32131', 'ca4e20bd126f39438d0e8bcfffece5aa', 0, 1, NULL, 1, '2.0.0', 1, 'oM7mVU7szHki6vUcyPfXYnfggqMdaeqQFPE7ovQfdVOkC265ggRtnjF3oKum', '2017-03-29 21:07:34', '2017-03-29 21:08:13'),
(36, 'Hubert Biszkont', 'huberthc+asdczx@gmail.com', '$2y$10$YOkYYWJffZgU2BW7PNdFQOByQNkv2ZKwSLaxZo1m3SPdPDozUVPGO', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/36/avatar/avatar.png', 'huberthc+asdczx', 'huberthc+asdczx', '2951138622e96a74f19f3c9f195fe342', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, NULL, '2017-03-29 21:08:32', '2017-03-29 21:08:52'),
(38, 'ssdcsd', 'dfdsfsdfsdf@asfsa.pl', '$2y$10$UdYwgOTu/8sOAYLVx1iHKe2SPkLqf7QWRoL9Ze8fmWvkIAomLuY9i', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/38/avatar/avatar.png', 'dfdsfsdfsdf', 'dfdsfsdfsdf', '4fc292fbb0127794f240f4a1cf48259f', 0, 1, NULL, 1, '2.0.0', 1, NULL, '2017-04-06 18:37:12', '2017-04-06 18:37:12'),
(39, 'j4r2c5wo.m11@20email.eu', 'j4r2c5wo.m11@20email.eu', '$2y$10$gk53dvQGMj0i5.Y1nS/6l.Ue2D8Rayf7I/i.GXA6Pa4qfG7QdErLq', '', 'en', 1, 'https://darkan.eu/storage/app/projects/39/avatar/avatar.png', 'j4r2c5wom11', 'j4r2c5wom11', 'e07544fccb3e976a032091c482dab855', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, 'SxjyKX6cOKlNBvvKFwwflFLT6OiOT1lfdnTuTtI3G8Mo1mgTeyph4f6N5GLy', '2017-04-10 09:05:27', '2017-04-10 10:53:24'),
(40, 'new', 'new@darkan.me', '$2y$10$RlGsGQO24enKP8oONGmAxek9OfkQ7DTP1jhb84R1T0XwSURv/t6Jy', '', 'en', 1, 'https://darkan.eu/storage/app/projects/40/avatar/avatar.png', 'new', 'new', '431a61901c437ad6a5f2bd40d40296fe', 0, 1, NULL, 1, '2.0.0', 1, '1LfVCbGSgglN4T8oEaVCtoJwWg21Iv8xjkoKFMZvMcRuG6I6Mo0cJLX5DDp1', '2017-04-10 14:50:00', '2017-04-11 17:54:59'),
(41, 'new1', 'res@darkan.me', '$2y$10$Lz8L0jFrOcfRfplN4OPSYuZinB09PjevpLpGZ2cpzzwlIOkRqiZMG', '', 'en', 1, 'https://darkan.eu/storage/app/projects/41/avatar/avatar.png', 'res', 'res', '006087db71a6fbd5bdb087953ef570be', 0, 1, NULL, 1, '2.0.0', 1, NULL, '2017-04-10 14:51:31', '2017-04-10 14:51:31'),
(42, 'start', 'new3@darkan.me', '$2y$10$a4oXiatgcDnXGyjihI.iyO/qE0v..YXTickvw1qVA5myeYb9YO0fq', '', 'en', 1, 'https://darkan.eu/storage/app/projects/42/avatar/avatar.png', 'new3', 'new3', '2c1027a07fd25630d01011d10b8058f2', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"new\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":42,\"version\":\"2.0.0\",\"date\":\"2017-04-10 21:53:33\",\"last_visit\":\"2017-04-10 21:53:33\",\"date_modification\":\"2017-04-10 21:53:33\",\"project_id\":21,\"folder\":0,\"pType\":\"userProjects\",\"size\":362196}],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, NULL, '2017-04-10 14:52:40', '2017-04-10 19:53:33'),
(44, 'asdsad', 'asasdasd@nieistniejeddd.pl', '$2y$10$7Ugpd4ehEd82DSHG3yJsre9D2qgKnlDuvEMAhIoCBDHw0bwh2Czaa', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/44/avatar/avatar.png', 'asasdasd', 'asasdasd', '52ea10640c961787432b24450a8e05e0', 0, 1, NULL, 1, '2.0.0', 1, 'pUAUELO3Uu1uDw8j8coSK1MXUADunWNzllPFd5MfTnn4ytx2qNk58vaueqOS', '2017-04-12 10:39:43', '2017-04-12 11:42:29'),
(45, 'ir035tn5.ugj@20minute.email', 'ir035tn5.ugj@20minute.email', '$2y$10$w5dnRJQj1vccG2lns.JBeu5f.JVVqhqNEGy0bDzDbFQCa5W/YzNWK', '', 'en', 1, 'https://darkan.eu/storage/app/projects/45/avatar/avatar.png', 'ir035tn5ugj', 'ir035tn5ugj', '307a0c8e00d6db81ca3c2213fd672bf0', 0, 1, NULL, 1, '2.0.0', 1, NULL, '2017-04-14 10:00:19', '2017-04-14 10:00:19'),
(46, 'LarryFob', '0dayscene@mail.ru', '$2y$10$GX0prsWHZ0DEpzKbS6xnkOpHwCLKSLVjtorssuGpN5/f.R.JNzf16', '', 'pl', 1, 'http://darkan.eu/storage/app/projects/46/avatar/avatar.png', '0dayscene', '0dayscene', 'c20a60c1f9db181ac58ce8356b4a9cae', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, NULL, '2017-06-10 19:48:40', '2017-07-23 14:33:29'),
(47, 'JackieNarne', 'zerokmusik@mail.ru', '$2y$10$/1sv1r.DoM3Wab0ISwKk/OJ8el9oHieT0noVLUzDv/LNk5aWGZE1m', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/47/avatar/avatar.png', 'zerokmusik', 'zerokmusik', 'a66df0eee3225ece4d15fd87518606f4', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, NULL, '2017-06-29 20:31:45', '2017-07-23 14:32:04'),
(48, 'Jamestut', 'springstillmp3@mail.ru', '$2y$10$akU0LiSZdS0v8YTiXRIktena1S3Y/v1QhcpSjRq8hekn6C4h21.Ei', '', 'pl', 1, 'http://darkan.eu/storage/app/projects/48/avatar/avatar.png', 'springstillmp3', 'springstillmp3', 'df205ead9795136afdae456a2c5c51e5', 0, 1, NULL, 1, '2.0.0', 1, NULL, '2017-08-28 03:14:35', '2017-08-28 03:14:37'),
(49, 'Szym Bym', 'szymonchodzko@gmail.com', '$2y$10$mj8SNe7HPIRZ/nSbtEOlD.FiNJm0rmFwAJb/Cm0pTCBRwiNiVqVaC', '', 'pl', 1, 'http://darkan.eu/storage/app/projects/49/avatar/avatar.png', 'szymonchodzko', 'szymonchodzko', '41b9305682ba8eefa0bd005421c22bdd', 0, 1, NULL, 1, '2.0.0', 1, 'riq6n7YDhh3wI2G7FppynYKlCwtlMSUH6nWyl7b1jamDVAjGGcFbFnVu7xum', '2017-09-15 23:50:56', '2018-01-15 07:17:08'),
(50, 'Aleksandra Chodźko', 'olachodzko@gmail.com', '$2y$10$DwosYLT4BIXMUd5Q8GZm6.awFztLa51hEvDwYTtgxdCnpnjVLllJa', '', 'pl', 1, 'http://darkan.eu/storage/app/projects/50/avatar/avatar.png', 'olachodzko', 'olachodzko', 'd01be422a819b705a8d91557fd027b4a', 0, 1, NULL, 1, '2.0.0', 1, NULL, '2017-09-16 14:47:37', '2017-09-16 14:47:37'),
(51, 'Darkan', 'office@darkan.me', '$2y$10$vRFzj8Inl56oMcr8e/elve1A2nVAWAYBLnCn8/oRu/Guag7OIyCta', '', 'en', 1, 'https://darkan.eu/storage/app/projects/51/avatar/avatar.png', 'office', 'office', 'a24a68640f3960d2ba02d25f571ab597', 0, 1, NULL, 1, '2.0.0', 1, NULL, '2017-10-09 14:25:05', '2017-10-09 14:25:05'),
(54, 'jarek', 'j.wieczorkowski@rapsody.com.pl', '$2y$10$R.PdovsL68jLSqypOncVZOUZkFLREGMpszWUs7opbeyqOnaOZClRK', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/54/avatar/avatar.png', 'jwieczorkowski', 'jwieczorkowski', 'f1346d2740446584ec6152e36d00753f', 0, 1, '{\"lastFolderID\":16,\"lastVisitedFolderID\":12,\"objs\":[{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Darkan\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":54,\"version\":\"2.0.0\",\"date\":\"2018-02-12 09:22:39\",\"last_visit\":\"2018-02-12 09:22:39\",\"date_modification\":\"2018-02-12 09:22:39\",\"project_id\":121,\"folder\":10,\"pType\":\"userSharedProjects\",\"size\":10700774},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"CVT\",\"skin\":\"sk00\",\"status\":0,\"template\":1,\"user_id\":54,\"version\":\"2.0.0\",\"date\":\"2018-07-05 08:16:10\",\"last_visit\":\"2018-07-05 08:16:10\",\"date_modification\":\"2018-07-05 08:16:10\",\"project_id\":186,\"folder\":0,\"pType\":\"userProjects\",\"size\":20598825},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Projekt testowy\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":54,\"version\":\"2.0.0\",\"date\":\"2018-07-11 10:58:42\",\"last_visit\":\"2018-07-11 10:58:42\",\"date_modification\":\"2018-07-11 10:58:42\",\"project_id\":214,\"folder\":0,\"pType\":\"userProjects\",\"size\":64908},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"testowy\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":54,\"version\":\"2.0.0\",\"date\":\"2018-07-16 08:55:03\",\"last_visit\":\"2018-07-16 08:55:03\",\"date_modification\":\"2018-07-16 08:55:03\",\"project_id\":216,\"folder\":0,\"pType\":\"userProjects\",\"size\":66333},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Prezentacja \\u0107wiczenia Drag and Drop\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":54,\"version\":\"2.0.0\",\"date\":\"2018-07-19 08:50:06\",\"last_visit\":\"2018-07-19 08:50:06\",\"date_modification\":\"2018-07-19 08:50:06\",\"project_id\":223,\"folder\":12,\"pType\":\"userSharedProjects\",\"size\":1214463},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Triggery - prezentacja i zastosowanie \",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":54,\"version\":\"2.0.0\",\"date\":\"2018-07-19 11:06:44\",\"last_visit\":\"2018-07-19 11:06:44\",\"date_modification\":\"2018-07-19 11:06:44\",\"project_id\":224,\"folder\":12,\"pType\":\"userSharedProjects\",\"size\":5113034},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"nowy1\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":54,\"version\":\"2.0.0\",\"date\":\"2018-07-29 23:21:53\",\"last_visit\":\"2018-07-29 23:21:53\",\"date_modification\":\"2018-07-29 23:21:53\",\"project_id\":225,\"folder\":13,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Nowy projekt1\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":54,\"version\":\"2.0.0\",\"date\":\"2018-07-30 00:19:11\",\"last_visit\":\"2018-07-30 00:19:11\",\"date_modification\":\"2018-07-30 00:19:11\",\"project_id\":229,\"folder\":0,\"pType\":\"userProjects\"}],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0},{\"folder\":0,\"folderID\":10,\"name\":\"Testowy\",\"pType\":\"folder\"},{\"folder\":0,\"folderID\":12,\"name\":\"\\u0106wiczenia do Turtoriali\",\"pType\":\"folder\"},{\"folder\":0,\"folderID\":13,\"name\":\"nowy1\",\"pType\":\"folder\"}]}', 1, '2.0.0', 1, 'wuWpm7xyio76WyhNkuZUATQqGlPafENUWJfQsyQD5Nk5yM8aas51Xa90W33g', '2017-10-09 19:44:32', '2018-08-01 11:07:19'),
(55, 'Tomasz Wiśniewski', 'dyaezktx.khj@20minute.email', '$2y$10$reLWdN0jcea/k.v5vGw9Ie9dXLIZDcmJumLJSAFVFb9kxI7E6m3Xy', '', 'en', 1, 'https://darkan.eu/storage/app/projects/55/avatar/avatar.png', 'dyaezktxkhj', 'dyaezktxkhj', 'ffa6a6efef9d898275cf52923fdd076c', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, NULL, '2017-10-12 07:09:22', '2018-06-25 14:35:45'),
(56, 'nowy', 'rsahbsnc.00g@20email.eu', '$2y$10$9tmFZKKoL8Vb8gaobo/jXuOWi9kRot/lOFSdv/Gz83C.l8iCDJn8W', '', 'en', 1, 'https://darkan.eu/storage/app/projects/56/avatar/avatar.png', 'rsahbsnc00g', 'rsahbsnc00g', '002b8d8e0a3e5cfb204922eddf8ee9ac', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, 'QIGT22Pj4CJK2lTuggurjzie7ihGhqW0Shj8e2FJcpwmOQFJzF7sL9I95Mdo', '2017-10-12 07:14:13', '2017-10-12 07:54:04'),
(58, 'rr1nuqnl.wsf@20minute.email', 'rr1nuqnl.wsf@20minute.email', '$2y$10$y/uYpRnkh0GiohqouBgdUOwrSCq9tpO9gb7AnArxGCEdwIaymrIgG', '', 'en', 1, 'https://darkan.eu/storage/app/projects/58/avatar/avatar.png', 'rr1nuqnlwsf', 'rr1nuqnlwsf', '07b7140855720bb940762120aafd714b', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"nowy\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":58,\"version\":\"2.0.0\",\"date\":\"2017-10-12 09:58:16\",\"last_visit\":\"2017-10-12 09:58:16\",\"date_modification\":\"2017-10-12 09:58:16\",\"project_id\":58,\"folder\":0,\"pType\":\"userProjects\",\"size\":20784},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"nowy2\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":58,\"version\":\"2.0.0\",\"date\":\"2017-10-12 09:58:31\",\"last_visit\":\"2017-10-12 09:58:31\",\"date_modification\":\"2017-10-12 09:58:31\",\"project_id\":59,\"folder\":0,\"pType\":\"userProjects\",\"size\":64826}],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, 'pBz7S3aG4KT6LVO1aMr8hDS2ncV7Yi73dQo3atLaUVipRoKqIylHixbUL8Dq', '2017-10-12 07:55:42', '2017-10-12 08:57:43');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `provider_id`, `lang`, `active`, `photo`, `subdomain`, `subdomain_name`, `hash`, `download_project`, `folders_layout`, `folders_structure`, `visible`, `version`, `api_id`, `remember_token`, `created_at`, `updated_at`) VALUES
(59, 'jarek wieczorkowski', 'zwierzak69@gmail.com', '$2y$10$IXO98hyXN3oWyfVpckIfdujkWWJCEgVoKCJ56lIKX/ak4DKFskh46', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/59/avatar/avatar.png', 'zwierzak69', 'zwierzak69', 'b9f87ccab79635611236d3c6a671c95b', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"video turtoriale \",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":59,\"version\":\"2.0.0\",\"date\":\"2017-11-28 09:51:44\",\"last_visit\":\"2017-11-28 09:51:44\",\"date_modification\":\"2017-11-28 09:51:44\",\"project_id\":72,\"folder\":0,\"pType\":\"userProjects\",\"size\":11992030}],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, 'QvsWNCZH4M10lK5bneignW6tntOfIRvGDHuDUFpvs9qdP5vkUwF7Tzn4eq64', '2017-10-12 08:58:39', '2017-12-28 16:28:13'),
(62, 'Mirek Golik', 'xsuejrnp7jym@10minut.xyz', '$2y$10$AqfCy57jSrVrO4ji.lR2Q.6QXPM1Bb1mZdc8ZqHRCIATt55VItEKW', '', 'pl', 1, 'https://graph.facebook.com/v2.8/100785970690765/picture?type=normal', 'xsuejrnp7jym', 'xsuejrnp7jym', 'a739cae38319447187150b56ef2b982f', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, '2M8BxZLxvpecdl9QZjAryJ3iZJhb4lLy19ZXXw4JzUAotzsLGPgWqcg2ZQcX', '2017-10-25 21:13:01', '2017-10-25 21:13:02'),
(67, 'ty4r3yyi.3to@20mm.eu', 'ty4r3yyi.3to@20mm.eu', '$2y$10$3kJXIBbFlq1SOUpGWxHJuuM5Eod4RWjosoHKONBHF5embgfeirSae', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/67/avatar/avatar.png', 'ty4r3yyi3to', 'ty4r3yyi3to', 'a56954c8b69f107f1a16b677f8d162a2', 0, 1, NULL, 1, '2.0.0', 1, NULL, '2017-10-27 13:42:22', '2017-10-27 13:42:22'),
(70, 'Hubert Biszkont', 'huberthc@gmail.com', '$2y$10$yuS8xfXS.P6d79rs0HhmCOKayxb57Bbn24p52Y7mN4epq8OLdS.tW', '', 'pl', 1, 'https://media.licdn.com/mpr/mprx/0_iaXmsSyqgK_5i-FpoaO8Ro9q4AG5QPQpoxyhx4Zzg8wXi_zrfaKa-aJq0Fmn5leS5othtp9NzKhk8cq7fg3ttMcZKKhL8Bljfg3SMZGvUlzWETET_2BiJ22krLVzdB62QO5COEq4fXs', 'huberthc', 'huberthc', '5013a1251492953e23b16dbb39f9126b', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, 'KitxFsEH7NPQgDHxKWlY2eero857eSasELsHDsADo9kNTmil0rF1s8xvJVYG', '2017-10-27 22:13:19', '2017-10-27 22:13:22'),
(72, 'Bartek Pietrzak', 'b.pietrzak@euro-forum.com.pl', '$2y$10$/0yNHBuNOu94vqMAQx8utOogyn//8dtLR.ESAr3D6qS9ciQa22ULW', '', 'pl', 1, 'https://lh6.googleusercontent.com/-nE_rGm3qr-c/AAAAAAAAAAI/AAAAAAAAAA0/luRSwkeOKfg/photo.jpg?sz=50', 'bpietrzak', 'bpietrzak', '8974e1c338959cb2c603172059e2ad02', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, '084OE6LUflSPschoVqucYKp4j6rxTPV3k1xknxpTe41rOfWULM3K1yGlGV2V', '2017-11-03 09:54:21', '2017-11-03 09:54:30'),
(73, 'Tomas', 'psav3p0i.q41@20minute.email', '$2y$10$4unsabqSw9K6IbFb6sJIV.y8pkR1clhAJbli0GGnZe6SLDXINku8W', '', 'en', 1, 'https://darkan.eu/storage/app/projects/73/avatar/avatar.png', 'psav3p0iq41', 'psav3p0iq41', 'b090fd4513a4b476fe71d95bbf6601cc', 0, 1, NULL, 1, '2.0.0', 1, NULL, '2017-11-14 13:54:36', '2017-11-14 13:54:36'),
(74, 'xuphqn4m.rbf@20email.eu', 'xuphqn4m.rbf@20email.eu', '$2y$10$eGsOuYQ2Se4fkOxNvpecR.8/DZbP8BxDnrO4oRf7fGcs8ka96hrs2', '', 'pl', 1, 'default', 'xuphqn4mrbf', 'xuphqn4mrbf', '97440963893a808398aa25e6d644bc28', 0, 1, NULL, 1, '2.0.0', 1, NULL, '2017-11-17 11:01:33', '2017-11-17 11:01:33'),
(75, 'p53xy33b.vzn@20minute.email', 'p53xy33b.vzn@20minute.email', '$2y$10$uHZE8lEGHhAHr.aN5teUEuFbxR1tRJ3Pdu3asqzsJD2A/FXeC1ATe', '', 'pl', 1, 'default', 'p53xy33bvzn', 'p53xy33bvzn', '8d56516ad771695d412844a40b2ebf6c', 0, 1, NULL, 1, '2.0.0', 1, NULL, '2017-11-17 11:04:22', '2017-11-17 11:04:22'),
(76, '5tchve2o.doq@20minute.email', '5tchve2o.doq@20minute.email', '$2y$10$tPNdaYYUgkzOSe9RtE08QezWWLyHRQ/meytHxJH9dviUbyZokt9SG', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/76/avatar/avatar.png', '5tchve2odoq', '5tchve2odoq', 'eaf9cc50221c8a1f90086e2ef3b23c7b', 0, 1, NULL, 1, '2.0.0', 1, NULL, '2017-11-17 11:06:24', '2017-11-17 11:06:24'),
(77, 'diynczbh.t4c@20mail.eu', 'diynczbh.t4c@20mail.eu', '$2y$10$vikRjzYTV734lQwMs/JDbeNH4OLyc8NvTBDRbT.qbdhEFKMQzoc.S', '', 'en', 1, 'default', 'diynczbht4c', 'diynczbht4c', '01bb900b9401363bdb2e8cacbbf563c4', 0, 1, NULL, 1, '2.0.0', 1, NULL, '2017-11-18 15:54:37', '2017-11-18 15:54:37'),
(78, 'JanKOwal22', 'bi4sxdll.kmm@20mail.eu', '$2y$10$NpuMUGCc9zH6nQUaXCx94.NReXgMLXlX2TV4lF0e1JNIO0lpnTlUi', '', 'en', 1, 'https://darkan.eu/storage/app/projects/78/avatar/avatar.png', 'bi4sxdllkmm', 'bi4sxdllkmm', '67905f5db05a367d0d24d982b111bad7', 0, 1, NULL, 1, '2.0.0', 1, '6MLKxzBNUsDxpW1u9wqWiF0s4bNdhTsEF5Q1AesmOqIztSHKjjeD3RF7Alvk', '2017-11-21 19:35:27', '2017-11-21 21:58:45'),
(79, 'Januszek', 'wb4owern.cp5@20mail.eu', '$2y$10$1ILwl6jNJL7mk2/hP.oJsen7Ktkq3ddV6IrlZIi8sxz8F9kEdF0NK', '', 'en', 1, 'https://darkan.eu/storage/app/projects/79/avatar/avatar.png', 'wb4owerncp5', 'wb4owerncp5', 'c691b7877f90306702636bd8099a0029', 0, 1, NULL, 1, '2.0.0', 1, NULL, '2017-11-21 22:00:09', '2017-11-21 22:00:09'),
(80, '5xulhsc2.byv@20email.eu', '5xulhsc2.byv@20email.eu', '$2y$10$QuJJCTVacXVbRthqp1OV5uRFn/o6WTpYHq2432T87D1/MOES6kMQK', '', 'en', 1, 'https://darkan.eu/storage/app/projects/80/avatar/avatar.png', '5xulhsc2byv', '5xulhsc2byv', 'b98b2ebf8ae5b9ad8ba9134dc0c06405', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, NULL, '2017-11-22 15:33:39', '2017-11-22 15:38:26'),
(81, 'test testere', 't2n33s0c.xjx@20email.eu', '$2y$10$OQrVXltOVzefm4IXk14ho.hrXo9q9nlQG9r4klBgoleQLvUu7tQve', '', 'en', 1, 'https://darkan.eu/storage/app/projects/81/avatar/avatar.png', 't2n33s0cxjx', 't2n33s0cxjx', 'c9ff9cc64807ec61ca5e4cd6b86efc01', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, 'xbUPTfROxGO0NBDz2KNOQcxNseMiUR9RK7dXAgclnXDE0Ss5yBK54umKw5gP', '2017-11-28 14:16:43', '2017-11-28 18:53:59'),
(82, '521gb4ag.y4s@20email.eu', '521gb4ag.y4s@20email.eu', '$2y$10$qRBqlACHcZiB.ERUL06JWOBOJPJKzHpkBWW9Dhj45MUks5wJfzoUu', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/82/avatar/avatar.png', '521gb4agy4s', '521gb4agy4s', '1b177389144e4697406477ddca6fd072', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"darkan\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":82,\"version\":\"2.0.0\",\"date\":\"2017-11-28 18:34:35\",\"last_visit\":\"2017-11-28 18:34:35\",\"date_modification\":\"2017-11-28 18:34:35\",\"project_id\":73,\"folder\":0,\"pType\":\"userProjects\",\"size\":123546}],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, 'jJTZx4B9ueQEXr42hMGORVqAUFhh4n2ozGQ09vBrWyks5ay0yGtNaCfT8m4I', '2017-11-28 16:27:45', '2017-11-28 19:08:22'),
(83, 'lrixv4sp.xuu@20minute.email', 'lrixv4sp.xuu@20minute.email', '$2y$10$/wjC.Z9YjDW7/wl07/GyL.RXZ5qP6/iV9iUzZbxTBK9mX5SaYv3QW', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/83/avatar/avatar.png', 'lrixv4spxuu', 'lrixv4spxuu', 'fba0caab2bebab4537fd575d55288b71', 0, 1, NULL, 1, '2.0.0', 1, NULL, '2017-11-28 18:56:54', '2017-11-28 18:56:55'),
(84, '44qfvg1v.ypc@20minute.email', '44qfvg1v.ypc@20minute.email', '$2y$10$Biqq5qhwhyDHQ1uiUKfX/uBx.cFiFAPom3BwbqZkRYuHCkJO/NGR6', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/84/avatar/avatar.png', '44qfvg1vypc', '44qfvg1vypc', '3388cbc53241ff693adb0f1f6810952e', 0, 1, NULL, 1, '2.0.0', 1, 'MiLo3mddwfg7VMN8Z8Sdx8vpGhNU9KXZTM5Rs4YhF3BPuCnZXjfRMemdomcC', '2017-11-28 19:08:42', '2017-11-28 19:09:20'),
(85, 's03uy510.wey@20minute.email', 's03uy510.wey@20minute.email', '$2y$10$gyhAoWK1OufmilznnhB8mORsChZuqj4kVzJf2pnWWRWTv4RRwgyUy', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/85/avatar/avatar.png', 's03uy510wey', 's03uy510wey', '76348849ff2b59d4a6965fcce413c63d', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, 'CRFgt8xob9ggylS1f7DswGNRBjNpR81e5ARC0XTXRdkYX2myC8vQ49W9nTx4', '2017-11-28 19:11:48', '2017-11-28 19:18:46'),
(87, 'jxkyy3aw.ovp@20email.eu', 'jxkyy3aw.ovp@20email.eu', '$2y$10$vdTjfHZc5TjgkGhxGMLuI.rujTIWecBnu90ocIUnv2bH8NI6D5Y5S', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/87/avatar/avatar.png', 'jxkyy3awovp', 'jxkyy3awovp', 'fa108dd0f9033dc070068306c98177cf', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"start\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":87,\"version\":\"2.0.0\",\"date\":\"2017-12-08 06:23:22\",\"last_visit\":\"2017-12-08 06:23:22\",\"date_modification\":\"2017-12-08 06:23:22\",\"project_id\":76,\"folder\":0,\"pType\":\"userProjects\",\"size\":696234}],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, 'Au0iZpJw3EXc7n8J3bgR5hHIfTBtCxWiPkwVxvXMVxyQQdn7RBTUP6kgVrFo', '2017-12-08 04:22:52', '2017-12-08 04:24:27'),
(88, '3p4pq0dz.2ct@20email.eu', '3p4pq0dz.2ct@20email.eu', '$2y$10$KEOhqRcweLIdRXxRSvkukOcXcCmPQN5yRb/hjsl7hH3/wHAJIxwa2', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/88/avatar/avatar.png', '3p4pq0dz2ct', '3p4pq0dz2ct', 'ed9f229f0b16d1b9b588785a92a35453', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, 'VMRwMaVekNK1c8a4ZHOKbeSOQKU9XhLq94RWB6IvjLBAA045Jb3WNNJ3EH6s', '2017-12-08 04:37:03', '2017-12-08 04:46:30'),
(91, 'map83pl', 'map83pl@gmail.com', '$2y$10$PtZcYkHAWmmjqpwmK5tFRukTmNaeNrn9pWbs/l5T.Of/kjH7vgD8.', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/91/avatar/avatar.png', 'map83pl', 'map83pl', '327bd1608548edc3201af75b76643b9e', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Test1\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":91,\"version\":\"2.0.0\",\"date\":\"2018-01-17 21:21:35\",\"last_visit\":\"2018-01-17 21:21:35\",\"date_modification\":\"2018-01-17 21:21:35\",\"project_id\":112,\"folder\":0,\"pType\":\"userProjects\",\"size\":23466}],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, 'gFKLwwphuX1v9tRoSEMPslBo3FUQOi3BgCbhEXI47CJKCedUJhr6fbYli8o7', '2018-01-17 14:37:34', '2018-01-17 19:21:36'),
(96, 'Kamil Nowek', 'Nowek.kamil@gmail.com', '$2y$10$myeL.WEqB9nDppc4R4M8ruoLj/E5n4SPfVFi68Esp2c.CeHYCHUVm', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/96/avatar/avatar.png', 'Nowekkamil', 'Nowekkamil', '88827ad5596f21eb15f97340c5a3f030', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, 'XARGWckoOnok8sf4S9bHlPgDhSRU1MjkdZfZvuYu9OuXHO63Im4mRdtPmudx', '2018-01-22 09:51:10', '2018-01-22 10:08:26'),
(97, ' Aleksandra Gutowicz', 'ola@youround.pl', '$2y$10$iz8sQwjgahH7qUdQ0LHB3ulhsqT8I3XLdFl3.7YBRUujc7watmxpm', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/97/avatar/avatar.png', 'ola', 'ola', '250154f1417226fd6ea1ba1b328a225b', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, 'tyBjgn3HBnKKb4DRHZCv2V3uhHTBKwQdkkJSDydaufA7v6fe1uDvwKseGCic', '2018-01-26 07:56:18', '2018-01-26 08:01:04'),
(98, 'Mirosław Schön', 'miroslaw_schon@o2.pl', '$2y$10$IZi/YAGVsZDcTeuj5cft/uT.Ebi0uDMLUYVkKsNceVZ0U3doemoyi', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/98/avatar/avatar.png', 'miroslawschon', 'miroslawschon', '99382fdf6e5ac3beeea3ddb8f31feaa0', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, 'JLz05WWERNekQzUmDv2EvvK427X5txfSpaf9y7WfzHWBgUAEV5ysRxfmGmx8', '2018-02-12 06:59:36', '2018-02-12 07:04:54'),
(99, 'Jamestut', 'spectrocoin2@mail.ru', '$2y$10$IO9swPOlXuVMQGOHidEu0ukrQHPagZ3ipM6lJEA6l2dvYvouNMLd2', '', 'en', 1, 'https://darkan.eu/storage/app/projects/99/avatar/avatar.png', 'spectrocoin2', 'spectrocoin2', '7b710446e7457295b39e114890fc3fc3', 0, 1, NULL, 1, '2.0.0', 1, NULL, '2018-02-14 16:57:38', '2018-02-14 16:57:39'),
(100, 'Dawid Łasiński', 'panbelfer@gmail.com', '$2y$10$RzaLRJLCLM6hqVuZ3h2.BeTz1a4Z.z1T7HPopLC3WZbGK4/jSny4S', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/100/avatar/avatar.png', 'panbelfer', 'panbelfer', '5711c3cc06be961c371dc149e2de8c2e', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[{\"project_id\":115,\"user_id\":54,\"date\":\"2018-02-05 10:11:11\",\"name\":\"Prezentacja Dawid\",\"skin\":\"sk00\",\"dimentions\":\"860x500\",\"version\":\"2.0.0\",\"date_modification\":\"2018-02-05 10:11:11\",\"size\":\"4863376\",\"template\":0,\"last_visit\":\"2018-02-05 20:58:34\",\"status\":\"0\",\"external\":\"0\",\"editor_id\":\"5\",\"folder\":0,\"pType\":\"sharedToUserProjects\",\"fromuser\":\"j.wieczorkowski@rapsody.com.pl\"},{\"project_id\":121,\"user_id\":54,\"date\":\"2018-02-12 09:22:39\",\"name\":\"Darkan fb promo \",\"skin\":\"sk00\",\"dimentions\":\"860x500\",\"version\":\"2.0.0\",\"date_modification\":\"2018-02-12 09:22:39\",\"size\":\"1441030\",\"template\":0,\"last_visit\":\"2018-02-12 11:26:20\",\"status\":\"0\",\"external\":\"0\",\"editor_id\":\"5\",\"folder\":0,\"pType\":\"sharedToUserProjects\",\"fromuser\":\"j.wieczorkowski@rapsody.com.pl\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"test\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":100,\"version\":\"2.0.0\",\"date\":\"2018-02-20 10:10:02\",\"last_visit\":\"2018-02-20 10:10:02\",\"date_modification\":\"2018-02-20 10:10:02\",\"project_id\":125,\"folder\":0,\"pType\":\"userSharedProjects\",\"size\":5375028}],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, '5Dc5HuVE7D1728fSQx0gMAmoxqI4AQ4rEGlp8irvGNfKhYBEeeJ5elsGg6Oo', '2018-02-19 10:11:09', '2018-02-20 08:44:53'),
(101, 'testowy', 'testowy@rapsody.com.pl', '$2y$10$4HBOY0oVo7GFq26PXDZ0Ru.P.6abdDN9DLoMP2dJmRtmL7VuFhlAq', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/101/avatar/avatar.png', 'testowy', 'testowy', 'f1bf8e68b8bcb81e37d4d96d147ff5e1', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"nowy\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":101,\"version\":\"2.0.0\",\"date\":\"2018-02-20 06:55:26\",\"last_visit\":\"2018-02-20 06:55:26\",\"date_modification\":\"2018-02-20 06:55:26\",\"project_id\":122,\"folder\":0,\"pType\":\"userProjects\",\"size\":64827}],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, NULL, '2018-02-20 04:52:19', '2018-02-20 04:55:26'),
(102, 'orange@test.pl', 'orange@test.pl', '$2y$10$HH5v5PiWxoaL33.Btcyty.bBRrhcAJ7yTF46WkrpdjOlie/Mx4pfm', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/102/avatar/avatar.png', 'orange', 'orange', '4ec6dd70777a588da348dc9668053ff8', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"nowy\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":102,\"version\":\"2.0.0\",\"date\":\"2018-04-11 07:50:31\",\"last_visit\":\"2018-04-11 07:50:31\",\"date_modification\":\"2018-04-11 07:50:31\",\"project_id\":129,\"folder\":0,\"pType\":\"userProjects\",\"size\":64830}],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, 'scMUijkJrYGOpqPbrEyvY6LQgwVdPDBLsQD4JErEIdXv3pS0KKh5Q3p8Uk9n', '2018-04-11 05:49:11', '2018-07-04 09:49:29'),
(103, 'Tomasz Chmielik', 'tomaszchmielik@gmail.com', '$2y$10$3K4U6RH1RKw1OYmOIMB7lua6dYFztuyS6xll2IiXoko28ZHeznpNG', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/103/avatar/avatar.png', 'tomaszchmielik', 'tomaszchmielik', 'a4deabc053e325b21744106222e8ad89', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Orange\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":103,\"version\":\"2.0.0\",\"date\":\"2018-05-24 09:57:24\",\"last_visit\":\"2018-05-24 09:57:24\",\"date_modification\":\"2018-05-24 09:57:24\",\"project_id\":140,\"folder\":0,\"pType\":\"userSharedProjects\",\"size\":22621977},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Rebel\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":103,\"version\":\"2.0.0\",\"date\":\"2018-05-24 14:50:41\",\"last_visit\":\"2018-05-24 14:50:41\",\"date_modification\":\"2018-05-24 14:50:41\",\"project_id\":141,\"folder\":0,\"pType\":\"userProjects\",\"size\":40825791},{\"project_id\":165,\"user_id\":29,\"date\":\"2018-06-17 13:19:37\",\"name\":\"WIB\",\"skin\":\"sk00\",\"dimentions\":\"860x500\",\"version\":\"2.0.0\",\"date_modification\":\"2018-06-17 13:19:37\",\"size\":\"1675228\",\"template\":0,\"last_visit\":\"2018-06-17 17:56:57\",\"status\":\"0\",\"external\":\"0\",\"editor_id\":\"5\",\"folder\":0,\"pType\":\"sharedToUserProjects\",\"fromuser\":\"t.wisniewski@rapsody.com.pl\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Orange\",\"size\":118202133,\"status\":0,\"user_id\":103,\"version\":\"2.0.0\",\"project_id\":167,\"folder\":0,\"pType\":\"userSharedProjects\"},{\"project_id\":168,\"user_id\":103,\"date\":\"2018-06-25 16:02:25\",\"name\":\"Orange typografia\",\"skin\":\"sk00\",\"dimentions\":\"860x500\",\"version\":\"2.0.0\",\"date_modification\":\"2018-06-25 16:02:25\",\"size\":375483,\"template\":0,\"last_visit\":\"2018-06-25 16:02:25\",\"status\":\"0\",\"external\":\"0\",\"editor_id\":\"5\",\"folder\":0,\"pType\":\"userSharedProjects\",\"fromuser\":\"tomaszchmielik@gmail.com\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Darkan - Orange\",\"size\":13663314,\"status\":0,\"user_id\":103,\"version\":\"2.0.0\",\"project_id\":169,\"folder\":0,\"pType\":\"userSharedProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Orange Rozmowa\",\"size\":29691936,\"status\":0,\"user_id\":103,\"version\":\"2.0.0\",\"project_id\":173,\"folder\":0,\"pType\":\"userSharedProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Orange typografia- kopia\",\"size\":\"375483\",\"status\":0,\"user_id\":103,\"version\":\"2.0.0\",\"project_id\":174,\"folder\":0,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Orange - Mój Orange\",\"size\":8675212,\"status\":0,\"user_id\":103,\"version\":\"2.0.0\",\"project_id\":175,\"folder\":0,\"pType\":\"userSharedProjects\"}],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, '2SvPcB9aUksLZdnKuJthhge7KQ8dvqh1RqgCQsrUvdieiMM9KazsEWs2a7lT', '2018-05-22 20:46:40', '2018-07-24 05:16:27'),
(104, 'Mateusz Małczak', 'm.malczak@darkan.eu', '$2y$10$crCZX096iRT0uSohHvjQJOTKNH7zSTQ9.Se0HEYFG/p2ujh9c7u4C', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/104/avatar/avatar.png', 'mmalczak', 'mmalczak', '2a63b6f0b08cd9995dd8e77bb536f9a5', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Nowy projekt\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":104,\"version\":\"2.0.0\",\"date\":\"2018-06-11 23:41:34\",\"last_visit\":\"2018-06-11 23:41:34\",\"date_modification\":\"2018-06-11 23:41:34\",\"project_id\":143,\"folder\":0,\"pType\":\"userProjects\",\"size\":711455}],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, NULL, '2018-06-11 12:55:25', '2018-06-11 21:41:34'),
(105, 'Test 1', 'test1@test.com', '$2y$10$rY7K2bul9qVmlggCMkGVMOd0ZQFlVPMvgkR32resQ4q2w844OXvYO', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/105/avatar/avatar.png', 'test110', 'test110', '6671d1573368d670aef5cdafe37c440e', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[{\"project_id\":\"144\",\"date\":\"0000-00-00 00:00:00\",\"name\":\"Darkan-prezentacja\",\"date_modification\":\"0000-00-00 00:00:00\",\"size\":19237113,\"last_visit\":\"0000-00-00 00:00:00\",\"version\":\"2.0.0\",\"pType\":\"userSharedProjects\",\"folder\":0},{\"project_id\":80,\"user_id\":29,\"date\":\"2017-12-08 07:10:24\",\"name\":\"nowy\",\"skin\":\"sk00\",\"dimentions\":\"860x500\",\"version\":\"2.0.0\",\"date_modification\":\"2017-12-08 07:10:24\",\"size\":\"2348742\",\"template\":0,\"last_visit\":\"2018-03-28 21:58:18\",\"status\":\"0\",\"external\":\"0\",\"editor_id\":\"5\",\"folder\":0,\"pType\":\"sharedToUserProjects\",\"fromuser\":\"t.wisniewski@rapsody.com.pl\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Nowy projekt\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":105,\"version\":\"2.0.0\",\"date\":\"2018-06-15 11:24:12\",\"last_visit\":\"2018-06-15 11:24:12\",\"date_modification\":\"2018-06-15 11:24:12\",\"project_id\":154,\"folder\":0,\"pType\":\"userProjects\",\"size\":23466},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Darkan-prezentacja- kopia\",\"size\":\"19237113\",\"status\":0,\"user_id\":105,\"version\":\"2.0.0\",\"project_id\":157,\"folder\":0,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"nowy- kopia\",\"size\":\"2348742\",\"status\":0,\"user_id\":105,\"version\":\"2.0.0\",\"project_id\":158,\"folder\":0,\"pType\":\"userProjects\"},{\"project_id\":111,\"user_id\":29,\"date\":\"2018-01-15 09:02:38\",\"name\":\"Testowy nowy projekt\",\"skin\":\"sk00\",\"dimentions\":\"860x500\",\"version\":\"2.0.0\",\"date_modification\":\"2018-01-15 09:02:38\",\"size\":\"840247\",\"template\":0,\"last_visit\":\"2018-06-10 21:55:01\",\"status\":\"0\",\"external\":\"0\",\"editor_id\":\"5\",\"folder\":0,\"pType\":\"sharedToUserProjects\",\"fromuser\":\"t.wisniewski@rapsody.com.pl\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Testowy nowy projekt- kopia\",\"size\":840247,\"status\":0,\"user_id\":105,\"version\":\"2.0.0\",\"project_id\":160,\"folder\":0,\"pType\":\"userProjects\"},{\"project_id\":116,\"user_id\":29,\"date\":\"2018-02-05 11:50:09\",\"name\":\"video\",\"skin\":\"sk00\",\"dimentions\":\"860x500\",\"version\":\"2.0.0\",\"date_modification\":\"2018-02-05 11:50:09\",\"size\":\"21813581\",\"template\":0,\"last_visit\":\"2018-02-12 09:31:30\",\"status\":\"0\",\"external\":\"0\",\"editor_id\":\"5\",\"folder\":0,\"pType\":\"sharedToUserProjects\",\"fromuser\":\"t.wisniewski@rapsody.com.pl\"}],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, 'q9KMkXFJTrqcNNbPKRADQ5FTDxFWGUsXayjJ1pCeTl7JQixXLjFveyRQ7gPG', '2018-06-13 10:45:23', '2018-06-18 15:01:30'),
(106, 'Test 2', 'test2@test.com', '$2y$10$2H4WBYUFIJ8J5e1wXgvV..eYShU0k5gdeeFlyiDlrsu4N2566rHqG', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/106/avatar/avatar.png', 'test21', 'test21', '0f50be045db2426942fda5a383d13451', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"dwwq\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":106,\"version\":\"2.0.0\",\"date\":\"2018-06-13 14:03:51\",\"last_visit\":\"2018-06-13 14:03:51\",\"date_modification\":\"2018-06-13 14:03:51\",\"project_id\":150,\"folder\":0,\"pType\":\"userProjects\"}],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, 'GlPTKANe8tC4Cn5rQW5SgZ4xwpKaRloz9H1KrrdxwSVkvNCYpPvBINA12XlU', '2018-06-13 10:46:46', '2018-06-13 12:03:51'),
(107, 'Test 3', 'test3@test.com', '$2y$10$2hcMomcfTC8vqoDQkX7iWu7hvOz5rQFzP6ONU7Qqaccex26fs.wKS', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/107/avatar/avatar.png', 'test31', 'test31', '24163f336a47d29b00a61776a67894fa', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Darkan-prezentacja\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":107,\"version\":\"2.0.0\",\"date\":\"2018-06-13 12:54:19\",\"last_visit\":\"2018-06-13 12:54:19\",\"date_modification\":\"2018-06-13 12:54:19\",\"project_id\":146,\"folder\":0,\"pType\":\"userProjects\",\"size\":64827},{\"project_id\":144,\"user_id\":105,\"date\":\"0000-00-00 00:00:00\",\"name\":\"Darkan-prezentacja\",\"skin\":\"sk00\",\"dimentions\":\"860x500\",\"version\":\"2.0.0\",\"date_modification\":\"0000-00-00 00:00:00\",\"size\":\"19082588\",\"template\":0,\"last_visit\":\"2018-06-13 15:33:47\",\"status\":\"0\",\"external\":\"0\",\"editor_id\":\"5\",\"folder\":0,\"pType\":\"sharedToUserProjects\",\"fromuser\":\"test1@test.com\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"vxvxvx\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":107,\"version\":\"2.0.0\",\"date\":\"2018-06-13 14:07:34\",\"last_visit\":\"2018-06-13 14:07:34\",\"date_modification\":\"2018-06-13 14:07:34\",\"project_id\":151,\"folder\":0,\"pType\":\"userProjects\"}],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, 'XYsbeojmS5SkiX4YKlFMABm7CxKI1Nva5coJsCygfkpSg7VvNHU0LKoXqYdN', '2018-06-13 10:47:33', '2018-06-13 12:07:41'),
(108, 'Test 4', 'test4@test.com', '$2y$10$7qdmirv0QooyKLDQ3TErl.yfmG8aHgDL9aAqjjVKdizXkO/3G2zSK', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/108/avatar/avatar.png', 'test41', 'test41', '397a9ab26714d9ac0bdff6ef4761ca18', 0, 1, NULL, 1, '2.0.0', 1, NULL, '2018-06-16 06:36:28', '2018-06-16 06:36:28'),
(109, 'Test 5', 'test5@test.com', '$2y$10$ycgnuiETaGEGYYnpGOnJYesPdRnJkoVLSClC4XjQa7azxnTQxbnrm', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/109/avatar/avatar.png', 'test51', 'test51', 'b31c40009c26abd77c36d38111d609e9', 0, 1, NULL, 1, '2.0.0', 1, NULL, '2018-06-16 06:36:58', '2018-06-16 06:36:58'),
(110, 'Test 6', 'test6@test.com', '$2y$10$8JEzInT/SZlIkRmzJs9yH.85g/0PY/O43cj0invk7bTks18WCtRp6', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/110/avatar/avatar.png', 'test61', 'test61', '7f1dcb8a05ab697c1ad63e340a817364', 0, 1, NULL, 1, '2.0.0', 1, NULL, '2018-06-16 06:37:37', '2018-06-16 06:37:37'),
(111, 'Test 7', 'test7@test.com', '$2y$10$M1Sf20fZtrWqFUGlN4lALe5xnizFDoHO2YpcDQnoRr6P8Zr0Ef986', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/111/avatar/avatar.png', 'test71', 'test71', 'ffb5094240a79b9a2a608296938f74bd', 0, 1, NULL, 1, '2.0.0', 1, NULL, '2018-06-16 06:38:03', '2018-06-16 06:38:03'),
(112, 'sggw', 'sggw@darkan.eu', '$2y$10$S1.NnW5A1NTZiQQHlMCED.IUrRTnaEi/qETT9nAvOfOwsxjSP34Ei', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/112/avatar/avatar.png', 'sggw', 'sggw', 'ebb26c757dd068a3c8ab0a75f80c6c99', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"prezentacja-ssgw\",\"size\":69456171,\"status\":0,\"user_id\":112,\"version\":\"2.0.0\",\"project_id\":162,\"folder\":0,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"pitchdeck long- waw.ac\",\"size\":\"12218677\",\"status\":0,\"user_id\":112,\"version\":\"2.0.0\",\"project_id\":163,\"folder\":0,\"pType\":\"userProjects\"}],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, 'HMO6GMJww1IgmgFAl0UtAm7DJtMpo4dBxc0WAjcgjV8PA87H6JgHTVfJptsK', '2018-06-16 06:38:49', '2018-06-16 08:35:27'),
(113, 'Magda B', 'magblasik@gmail.com', '$2y$10$DkdfjgJpD3KX2OWl56ukA.90rY/yqzFzyuCAOVEOUoxtXvPsmZeq2', '', 'pl', 1, 'https://lh6.googleusercontent.com/-S9GBK9Uw7kI/AAAAAAAAAAI/AAAAAAAAAAA/wxzQWTjVOVU/photo.jpg?sz=50', 'nazwa', 'magblasik', 'ff93be7349984fe19640337683bb7bb6', 0, 1, '{\"lastFolderID\":6,\"lastVisitedFolderID\":1,\"objs\":[{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Pieniążki\",\"skin\":\"sk00\",\"status\":0,\"template\":1,\"user_id\":113,\"version\":\"2.0.0\",\"date\":\"2018-06-17 12:59:13\",\"last_visit\":\"2018-06-17 12:59:13\",\"date_modification\":\"2018-06-17 12:59:13\",\"project_id\":164,\"folder\":1,\"pType\":\"userProjects\",\"size\":1123293},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"dupa\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":113,\"version\":\"2.0.0\",\"date\":\"2018-08-01 16:37:10\",\"last_visit\":\"2018-08-01 16:37:10\",\"date_modification\":\"2018-08-01 16:37:10\",\"project_id\":239,\"folder\":0,\"pType\":\"userProjects\",\"size\":23466},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Projekt 2\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":113,\"version\":\"2.0.0\",\"date\":\"2018-08-01 17:02:08\",\"last_visit\":\"2018-08-01 17:02:08\",\"date_modification\":\"2018-08-01 17:02:08\",\"project_id\":241,\"folder\":0,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"pola tekstowe zielone\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":113,\"version\":\"2.0.0\",\"date\":\"2018-08-06 22:26:15\",\"last_visit\":\"2018-08-06 22:26:15\",\"date_modification\":\"2018-08-06 22:26:15\",\"project_id\":243,\"folder\":1,\"pType\":\"userProjects\",\"size\":4750837},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Nowy projekt\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":113,\"version\":\"2.0.0\",\"date\":\"2018-08-06 22:29:35\",\"last_visit\":\"2018-08-06 22:29:35\",\"date_modification\":\"2018-08-06 22:29:35\",\"project_id\":244,\"folder\":1,\"pType\":\"userProjects\",\"size\":1836284},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Scenariusz\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":113,\"version\":\"2.0.0\",\"date\":\"2018-08-10 17:12:12\",\"last_visit\":\"2018-08-10 17:12:12\",\"date_modification\":\"2018-08-10 17:12:12\",\"project_id\":259,\"folder\":1,\"pType\":\"userProjects\",\"size\":2391337},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Projekt testowy do filmów\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":113,\"version\":\"2.0.0\",\"date\":\"2018-08-12 12:38:23\",\"last_visit\":\"2018-08-12 12:38:23\",\"date_modification\":\"2018-08-12 12:38:23\",\"project_id\":261,\"folder\":1,\"pType\":\"userSharedProjects\",\"size\":10868524},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"testowy\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":113,\"version\":\"2.0.0\",\"date\":\"2018-08-15 10:36:57\",\"last_visit\":\"2018-08-15 10:36:57\",\"date_modification\":\"2018-08-15 10:36:57\",\"project_id\":266,\"folder\":1,\"pType\":\"userProjects\",\"size\":3699046},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Zmienne projektowe\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":113,\"version\":\"2.0.0\",\"date\":\"2018-09-25 08:57:27\",\"last_visit\":\"2018-09-25 08:57:27\",\"date_modification\":\"2018-09-25 08:57:27\",\"project_id\":292,\"folder\":1,\"pType\":\"userSharedProjects\",\"size\":286727},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Triggery\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":113,\"version\":\"2.0.0\",\"date\":\"2018-09-25 10:19:04\",\"last_visit\":\"2018-09-25 10:19:04\",\"date_modification\":\"2018-09-25 10:19:04\",\"project_id\":293,\"folder\":1,\"pType\":\"userProjects\",\"size\":412328},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Oferta handlowa\",\"skin\":\"sk00\",\"status\":0,\"template\":1,\"user_id\":113,\"version\":\"2.0.0\",\"date\":\"2018-09-27 09:32:04\",\"last_visit\":\"2018-09-27 09:32:04\",\"date_modification\":\"2018-09-27 09:32:04\",\"project_id\":297,\"folder\":1,\"pType\":\"userSharedProjects\",\"size\":5497836},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Punktacja\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":113,\"version\":\"2.0.0\",\"date\":\"2018-10-23 14:32:16\",\"last_visit\":\"2018-10-23 14:32:16\",\"date_modification\":\"2018-10-23 14:32:16\",\"project_id\":307,\"folder\":1,\"pType\":\"userSharedProjects\",\"size\":1207106},{\"project_id\":134,\"user_id\":29,\"date\":\"0000-00-00 00:00:00\",\"name\":\"Darkan-prezentacja\",\"skin\":\"sk00\",\"dimentions\":\"860x500\",\"version\":\"2.0.0\",\"date_modification\":\"0000-00-00 00:00:00\",\"size\":\"20081177\",\"template\":0,\"last_visit\":\"2018-10-24 13:03:04\",\"status\":\"0\",\"external\":\"0\",\"editor_id\":\"5\",\"folder\":0,\"pType\":\"sharedToUserProjects\",\"fromuser\":\"t.wisniewski@rapsody.com.pl\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"DARKAN\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":113,\"version\":\"2.0.0\",\"date\":\"2018-10-24 13:04:14\",\"last_visit\":\"2018-10-24 13:04:14\",\"date_modification\":\"2018-10-24 13:04:14\",\"project_id\":309,\"folder\":1,\"pType\":\"userProjects\",\"size\":64827},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Darkan-prezentacja- kopia\",\"size\":7246057,\"status\":0,\"user_id\":113,\"version\":\"2.0.0\",\"project_id\":311,\"folder\":0,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Nowy projekt\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":113,\"version\":\"2.0.0\",\"date\":\"2018-10-30 09:00:10\",\"last_visit\":\"2018-10-30 09:00:10\",\"date_modification\":\"2018-10-30 09:00:10\",\"project_id\":320,\"folder\":1,\"pType\":\"userProjects\",\"size\":1675035},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Szablony\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":113,\"version\":\"2.0.0\",\"date\":\"2018-11-17 11:51:32\",\"last_visit\":\"2018-11-17 11:51:32\",\"date_modification\":\"2018-11-17 11:51:32\",\"project_id\":324,\"folder\":1,\"pType\":\"userSharedProjects\",\"size\":6185439},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Cyberbezpieczenstwo\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":113,\"version\":\"2.0.0\",\"date\":\"2018-11-23 13:48:41\",\"last_visit\":\"2018-11-23 13:48:41\",\"date_modification\":\"2018-11-23 13:48:41\",\"project_id\":333,\"folder\":1,\"pType\":\"userSharedProjects\",\"size\":166030672},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Ćwiczenie\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":113,\"version\":\"2.0.0\",\"date\":\"2018-11-27 08:00:38\",\"last_visit\":\"2018-11-27 08:00:38\",\"date_modification\":\"2018-11-27 08:00:38\",\"project_id\":339,\"folder\":1,\"pType\":\"userProjects\",\"size\":149329},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Licznik czasu\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":113,\"version\":\"2.0.0\",\"date\":\"2018-11-29 11:28:35\",\"last_visit\":\"2018-11-29 11:28:35\",\"date_modification\":\"2018-11-29 11:28:35\",\"project_id\":346,\"folder\":1,\"pType\":\"userSharedProjects\",\"size\":325872},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"LICZNIK\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":113,\"version\":\"2.0.0\",\"date\":\"2018-11-29 12:42:24\",\"last_visit\":\"2018-11-29 12:42:24\",\"date_modification\":\"2018-11-29 12:42:24\",\"project_id\":347,\"folder\":1,\"pType\":\"userProjects\",\"size\":163381},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Cyberbezpieczenstwo- kopia\",\"size\":\"168992135\",\"status\":0,\"user_id\":113,\"version\":\"2.0.0\",\"project_id\":348,\"folder\":1,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Wyniki\",\"size\":846947,\"status\":0,\"user_id\":113,\"version\":\"2.0.0\",\"project_id\":360,\"folder\":1,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"SZPITAL\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":113,\"version\":\"2.0.0\",\"date\":\"2019-01-24 22:09:32\",\"last_visit\":\"2019-01-24 22:09:32\",\"date_modification\":\"2019-01-24 22:09:32\",\"project_id\":365,\"folder\":1,\"pType\":\"userProjects\",\"size\":3063357}],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0},{\"folder\":0,\"folderID\":1,\"name\":\"Projekt\",\"pType\":\"folder\"},{\"folder\":0,\"folderID\":6,\"name\":\"Projekty 2\",\"pType\":\"folder\"}]}', 1, '2.0.0', 1, 'yvrOEQO0varxDaCL68FMOGXo0HWjKWyc3hXSWYTIJygdCyvjZySyJbneMQuA', '2018-06-17 10:58:30', '2019-02-09 11:26:25'),
(114, 'Karol Gancarz', 'karol.gancarz@gmail.com', '$2y$10$SrEDwtjEQEFOF7po8XFdiO10oFPNmg/V8LGcvH075HpIBuOj7zsCe', '', 'pl', 1, 'https://lh4.googleusercontent.com/-QA9QXOIxfGc/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq1_1aFML4jItRQW-_CL_wygoTiULw/mo/photo.jpg?sz=50', 'karolgancarz', 'karolgancarz', '8e24324a846f35042cbfff94f41890bc', 0, 1, NULL, 1, '2.0.0', 1, 'zj4izdywCINslm7RMA3B5PxcbUIx9aRqBjp3hvjtlxnLhEygDNuucihXgZWl', '2018-06-25 15:24:07', '2018-06-25 15:24:10'),
(115, 'Tomasz Chmielik', 'tomasz.chmielik@rebel.pl', '$2y$10$4gJJpBUQDjdZ/EYD7DrD/OG0/kSAM3xCCwezXCWG4.Kkgl0J8bGRi', '', 'pl', 1, 'https://lh5.googleusercontent.com/-OPot9E14wJE/AAAAAAAAAAI/AAAAAAAAAAA/AB6qoq1Gxvrips5EL5pQ9GID7MaIoXzOkw/mo/photo.jpg?sz=50', 'tomaszchmielik1', 'tomaszchmielik1', '7589202e528e6c3e5263b2bf643bcb5c', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, 'Mtq9GyskbX55rMpwOf2I059EXjIhl4CUm136Z0kHhNOn2IiIaR9W8e1Ny1gY', '2018-06-27 07:33:33', '2018-06-27 07:33:42'),
(116, 'Darkan', 'darkanmac@gmail.com', '$2y$10$tB327jv9Q7D6EAeJD58spOO4CVK1srPg0N1kAgw14T6EJxJqcThQG', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/116/avatar/avatar.png', 'darkanmac', 'darkanmac', '9e1d70f5b8e5de5ebaf84af320d39326', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, 'NU1YWzIR9xMfFpxbARdhvVqVYuTKRtUekQYaX4FN5Xevm786XaZH8tj2TVeq', '2018-07-04 08:55:27', '2018-08-20 08:01:31'),
(117, 'test1', 'test1@orange.pl', '$2y$10$JpODZUvoPoviJYPPtrNGseJ3Gko2MflT4S4WcF9O1dOnVBrXYnc.C', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/117/avatar/avatar.png', 'test111', 'test111', 'ee4e16760bdefb58938f8febb6ed20fb', 0, 1, NULL, 1, '2.0.0', 1, NULL, '2018-07-04 09:16:22', '2018-07-04 09:16:22'),
(118, 'test1', 'test2@orange.pl', '$2y$10$NBIMaxx9H8fa/h.xjnGQkey2I.CJ.GlxkQQsSwxQS9pnMO7v86ljq', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/118/avatar/avatar.png', 'test22', 'test22', '20660e7662ca3e677de6b417c64a678c', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[{\"project_id\":\"181\",\"user_id\":\"29\",\"date\":\"0000-00-00 00:00:00\",\"name\":\"Darkan - Orange- v1\",\"skin\":\"sk01\",\"dimentions\":\"860x500\",\"version\":\"2.0.0\",\"date_modification\":\"0000-00-00 00:00:00\",\"size\":\"13700652\",\"template\":\"0\",\"last_visit\":\"2018-07-15 01:26:22\",\"status\":\"0\",\"external\":\"0\",\"editor_id\":\"5\",\"fromuser\":\"t.wisniewski@rapsody.com.pl\",\"pType\":\"sharedToUserProjects\",\"folder\":0},{\"project_id\":\"176\",\"user_id\":\"29\",\"date\":\"0000-00-00 00:00:00\",\"name\":\"Orange - M\\u00f3j Orange-  v1\",\"skin\":\"sk01\",\"dimentions\":\"860x500\",\"version\":\"2.0.0\",\"date_modification\":\"0000-00-00 00:00:00\",\"size\":\"8675212\",\"template\":\"0\",\"last_visit\":\"2018-07-04 11:41:50\",\"status\":\"0\",\"external\":\"0\",\"editor_id\":\"5\",\"fromuser\":\"t.wisniewski@rapsody.com.pl\",\"pType\":\"sharedToUserProjects\",\"folder\":0},{\"project_id\":\"177\",\"user_id\":\"29\",\"date\":\"0000-00-00 00:00:00\",\"name\":\"Orange - Telefony- v1\",\"skin\":\"sk01\",\"dimentions\":\"860x500\",\"version\":\"2.0.0\",\"date_modification\":\"0000-00-00 00:00:00\",\"size\":\"3673834\",\"template\":\"0\",\"last_visit\":\"0000-00-00 00:00:00\",\"status\":\"0\",\"external\":\"0\",\"editor_id\":\"5\",\"fromuser\":\"t.wisniewski@rapsody.com.pl\",\"pType\":\"sharedToUserProjects\",\"folder\":0},{\"project_id\":\"180\",\"user_id\":\"29\",\"date\":\"0000-00-00 00:00:00\",\"name\":\"Orange info - v1\",\"skin\":\"sk01\",\"dimentions\":\"860x500\",\"version\":\"2.0.0\",\"date_modification\":\"0000-00-00 00:00:00\",\"size\":\"29691936\",\"template\":\"0\",\"last_visit\":\"0000-00-00 00:00:00\",\"status\":\"0\",\"external\":\"0\",\"editor_id\":\"5\",\"fromuser\":\"t.wisniewski@rapsody.com.pl\",\"pType\":\"sharedToUserProjects\",\"folder\":0},{\"project_id\":\"179\",\"user_id\":\"29\",\"date\":\"0000-00-00 00:00:00\",\"name\":\"Orange typografia- v1\",\"skin\":\"sk01\",\"dimentions\":\"860x500\",\"version\":\"2.0.0\",\"date_modification\":\"0000-00-00 00:00:00\",\"size\":\"375483\",\"template\":\"0\",\"last_visit\":\"0000-00-00 00:00:00\",\"status\":\"0\",\"external\":\"0\",\"editor_id\":\"5\",\"fromuser\":\"t.wisniewski@rapsody.com.pl\",\"pType\":\"sharedToUserProjects\",\"folder\":0},{\"project_id\":\"179\",\"user_id\":\"29\",\"date\":\"0000-00-00 00:00:00\",\"name\":\"Orange typografia- v1\",\"skin\":\"sk01\",\"dimentions\":\"860x500\",\"version\":\"2.0.0\",\"date_modification\":\"0000-00-00 00:00:00\",\"size\":\"375483\",\"template\":\"0\",\"last_visit\":\"0000-00-00 00:00:00\",\"status\":\"0\",\"external\":\"0\",\"editor_id\":\"5\",\"fromuser\":\"t.wisniewski@rapsody.com.pl\",\"pType\":\"sharedToUserProjects\",\"folder\":0},{\"project_id\":\"185\",\"user_id\":\"29\",\"date\":\"0000-00-00 00:00:00\",\"name\":\"Orange - Telefony- v1\",\"skin\":\"sk01\",\"dimentions\":\"860x500\",\"version\":\"2.0.0\",\"date_modification\":\"0000-00-00 00:00:00\",\"size\":\"3673834\",\"template\":\"0\",\"last_visit\":\"0000-00-00 00:00:00\",\"status\":\"0\",\"external\":\"0\",\"editor_id\":\"5\",\"fromuser\":\"t.wisniewski@rapsody.com.pl\",\"pType\":\"sharedToUserProjects\",\"folder\":0}],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, 'qDOLrZk6yKcxq5zEzyKj60CM9fDLNwqx48ZWTSxlg7eQQ2rIbP9LvfwErelI', '2018-07-04 09:20:10', '2018-07-25 13:44:28'),
(119, 'test3', 'test3@orange.pl', '$2y$10$s/HTOYyd8p35HClAuuMLpOjeZjdKfiI6dZ8R8ibAtKP/Xa4dCvYYK', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/119/avatar/avatar.png', 'test32', 'test32', '06626e2e74131749ce41bca4e862949a', 0, 1, NULL, 1, '2.0.0', 1, NULL, '2018-07-04 09:20:39', '2018-07-04 09:20:40'),
(120, 'test4', 'test4@orange.pl', '$2y$10$SqDOAU2FJ33lAv50kpddkOdjjUi0D65e9VrGKPwBIx5nkX15KSaTS', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/120/avatar/avatar.png', 'test42', 'test42', 'bde1184f9b50e0ea935b4968ac7505e9', 0, 1, NULL, 1, '2.0.0', 1, NULL, '2018-07-04 09:21:10', '2018-07-04 09:21:10'),
(121, 'test5', 'test5@orange.pl', '$2y$10$6kFJjnXoOA6xGQmYEgq3k.73CLaDlHVJXD9S3NtMwEeF5ZuXO9jbu', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/121/avatar/avatar.png', 'test52', 'test52', '38216e0047e73c8f23be99fc466729f4', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Orange - Mój Orange-  v1- kopia\",\"size\":3938148,\"status\":0,\"user_id\":121,\"version\":\"2.0.0\",\"project_id\":183,\"folder\":0,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Projekt testowy 1\",\"skin\":\"sk00\",\"status\":0,\"template\":1,\"user_id\":121,\"version\":\"2.0.0\",\"date\":\"2018-07-09 16:07:21\",\"last_visit\":\"2018-07-09 16:07:21\",\"date_modification\":\"2018-07-09 16:07:21\",\"project_id\":208,\"folder\":0,\"pType\":\"userProjects\",\"size\":17442856}],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, NULL, '2018-07-04 09:22:56', '2018-08-08 14:14:23'),
(122, 'test', 'test@orange.pl', '$2y$10$Vix0MGY1faYemyCBgMrOqeiKrnR54lbYJQMMvzl2oF0S36gV4.WCS', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/122/avatar/avatar.png', 'test', 'test', '1c15caaf89f4c4916d8581b049a1a5b7', 0, 1, NULL, 1, '2.0.0', 1, NULL, '2018-07-04 16:11:33', '2018-07-04 16:11:33'),
(124, 'Sugestowo pl', 'sugestowo@gmail.com', '$2y$10$O8vQDCefTwkdvhy/KO3mK.HganJ5OioOA1qbmiFpgw5kmnaClxTZi', '', 'pl', 1, 'https://lh5.googleusercontent.com/-Wx-1Zc7EZus/AAAAAAAAAAI/AAAAAAAAAAA/AAnnY7pDOApOg3Z7ItcwTeElEcCiexIkCw/mo/photo.jpg?sz=50', 'sugestowo', 'sugestowo', 'b18fd90041f07c448628259f3dfdd1e5', 0, 1, NULL, 1, '2.0.0', 1, 'QuOe2hyRKOqb42LBiiSXQx4Lw7J7hs5iam6i6aFBFqrV0jEAr1wyiP7ZwNig', '2018-07-22 08:41:49', '2018-07-22 08:43:05');
INSERT INTO `users` (`id`, `name`, `email`, `password`, `provider_id`, `lang`, `active`, `photo`, `subdomain`, `subdomain_name`, `hash`, `download_project`, `folders_layout`, `folders_structure`, `visible`, `version`, `api_id`, `remember_token`, `created_at`, `updated_at`) VALUES
(125, 'Konto testowe', 'test@darkan.eu', '$2y$10$13L6FlsvQo/MB.KnnTkDE.dBfBIqlIzoF/Xa/HQ8RO587JguuuP3m', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/125/avatar/avatar.png', 'testowe', 'test', '023f376c09439915cdaf2ce5be233393', 0, 1, '{\"lastFolderID\":22,\"lastVisitedFolderID\":0,\"objs\":[{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Prezentacja \\u0107wiczenia Drag and Drop\",\"size\":2813426,\"status\":0,\"user_id\":125,\"version\":\"2.0.0\",\"project_id\":236,\"folder\":15,\"pType\":\"userProjects\",\"template\":0},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Triggery - prezentacja i zastosowanie\",\"size\":7324619,\"status\":0,\"user_id\":125,\"version\":\"2.0.0\",\"project_id\":237,\"folder\":1,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Film cz. 10\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":125,\"version\":\"2.0.0\",\"date\":\"2018-08-07 23:28:32\",\"last_visit\":\"2018-08-07 23:28:32\",\"date_modification\":\"2018-08-07 23:28:32\",\"project_id\":253,\"folder\":11,\"pType\":\"userProjects\",\"size\":1774456},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Film cz.  8\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":125,\"version\":\"2.0.0\",\"date\":\"2018-08-09 20:40:00\",\"last_visit\":\"2018-08-09 20:40:00\",\"date_modification\":\"2018-08-09 20:40:00\",\"project_id\":254,\"folder\":11,\"pType\":\"userProjects\",\"size\":410695},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Film cz. 9\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":125,\"version\":\"2.0.0\",\"date\":\"2018-08-10 00:23:52\",\"last_visit\":\"2018-08-10 00:23:52\",\"date_modification\":\"2018-08-10 00:23:52\",\"project_id\":255,\"folder\":11,\"pType\":\"userProjects\",\"size\":208382},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Cz\\u0119\\u015b\\u0107 12 t\\u0142o\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":125,\"version\":\"2.0.0\",\"date\":\"2018-08-14 13:57:17\",\"last_visit\":\"2018-08-14 13:57:17\",\"date_modification\":\"2018-08-14 13:57:17\",\"project_id\":263,\"folder\":11,\"pType\":\"userProjects\",\"size\":1113764},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Cz\\u0119\\u015b\\u0107 11 Szablony i template\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":125,\"version\":\"2.0.0\",\"date\":\"2018-08-15 09:19:46\",\"last_visit\":\"2018-08-15 09:19:46\",\"date_modification\":\"2018-08-15 09:19:46\",\"project_id\":265,\"folder\":11,\"pType\":\"userProjects\",\"size\":257800},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Pojedynczy wyb\\u00f3r, wielokrotny wyb\\u00f3r, wybierz opcje\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":125,\"version\":\"2.0.0\",\"date\":\"2018-08-16 08:24:13\",\"last_visit\":\"2018-08-16 08:24:13\",\"date_modification\":\"2018-08-16 08:24:13\",\"project_id\":278,\"folder\":15,\"pType\":\"userProjects\",\"size\":237000},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\" \\u0106wiczenie wpisz dobr\\u0105 odpowied\\u017a\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":125,\"version\":\"2.0.0\",\"date\":\"2018-08-16 12:13:01\",\"last_visit\":\"2018-08-16 12:13:01\",\"date_modification\":\"2018-08-16 12:13:01\",\"project_id\":279,\"folder\":15,\"pType\":\"userProjects\",\"size\":199947},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"\\u0106wiczenie wybierz w\\u0142a\\u015bciw\\u0105 odpowied\\u017a z listy\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":125,\"version\":\"2.0.0\",\"date\":\"2018-08-16 15:34:56\",\"last_visit\":\"2018-08-16 15:34:56\",\"date_modification\":\"2018-08-16 15:34:56\",\"project_id\":280,\"folder\":15,\"pType\":\"userProjects\",\"size\":184972},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"\\u0106wiczenie wype\\u0142nij luki\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":125,\"version\":\"2.0.0\",\"date\":\"2018-08-20 09:34:15\",\"last_visit\":\"2018-08-20 09:34:15\",\"date_modification\":\"2018-08-20 09:34:15\",\"project_id\":281,\"folder\":15,\"pType\":\"userProjects\",\"size\":317610},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"\\u0106wiczenie\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":125,\"version\":\"2.0.0\",\"date\":\"2018-08-27 09:25:27\",\"last_visit\":\"2018-08-27 09:25:27\",\"date_modification\":\"2018-08-27 09:25:27\",\"project_id\":283,\"folder\":15,\"pType\":\"userProjects\",\"size\":2632262},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"\\u0106wiczenie znajd\\u017a s\\u0142owa\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":125,\"version\":\"2.0.0\",\"date\":\"2018-08-27 11:59:04\",\"last_visit\":\"2018-08-27 11:59:04\",\"date_modification\":\"2018-08-27 11:59:04\",\"project_id\":284,\"folder\":15,\"pType\":\"userProjects\",\"size\":128195},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Nowy projekt\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":125,\"version\":\"2.0.0\",\"date\":\"2018-08-29 19:37:40\",\"last_visit\":\"2018-08-29 19:37:40\",\"date_modification\":\"2018-08-29 19:37:40\",\"project_id\":285,\"folder\":15,\"pType\":\"userProjects\",\"size\":1074712},{\"project_id\":287,\"user_id\":29,\"date\":\"2018-08-30 13:50:43\",\"name\":\"pick one\",\"skin\":\"sk00\",\"dimentions\":\"860x500\",\"version\":\"2.0.0\",\"date_modification\":\"2018-08-30 13:50:43\",\"size\":\"67834\",\"template\":0,\"last_visit\":\"2018-08-30 18:18:15\",\"status\":\"0\",\"external\":\"0\",\"editor_id\":\"5\",\"folder\":15,\"pType\":\"sharedToUserProjects\",\"fromuser\":\"t.wisniewski@rapsody.com.pl\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Film 14\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":125,\"version\":\"2.0.0\",\"date\":\"2018-09-06 13:42:42\",\"last_visit\":\"2018-09-06 13:42:42\",\"date_modification\":\"2018-09-06 13:42:42\",\"project_id\":288,\"folder\":15,\"pType\":\"userProjects\",\"size\":126339},{\"project_id\":261,\"user_id\":113,\"date\":\"2018-08-12 12:38:23\",\"name\":\"Projekt testowy do film\\u00f3w\",\"skin\":\"sk00\",\"dimentions\":\"860x500\",\"version\":\"2.0.0\",\"date_modification\":\"2018-08-12 12:38:23\",\"size\":\"7451200\",\"template\":0,\"last_visit\":\"2018-09-11 18:15:29\",\"status\":\"0\",\"external\":\"0\",\"editor_id\":\"5\",\"folder\":15,\"pType\":\"sharedToUserProjects\",\"fromuser\":\"magblasik@gmail.com\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Drag and Drop cz1.\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":125,\"version\":\"2.0.0\",\"date\":\"2018-09-12 13:42:56\",\"last_visit\":\"2018-09-12 13:42:56\",\"date_modification\":\"2018-09-12 13:42:56\",\"project_id\":289,\"folder\":15,\"pType\":\"userProjects\",\"size\":346720},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"www\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":125,\"version\":\"2.0.0\",\"date\":\"2018-09-27 16:57:22\",\"last_visit\":\"2018-09-27 16:57:22\",\"date_modification\":\"2018-09-27 16:57:22\",\"project_id\":298,\"folder\":15,\"pType\":\"userProjects\",\"size\":123253},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Film 19\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":125,\"version\":\"2.0.0\",\"date\":\"2018-10-03 13:15:24\",\"last_visit\":\"2018-10-03 13:15:24\",\"date_modification\":\"2018-10-03 13:15:24\",\"project_id\":301,\"folder\":15,\"pType\":\"userProjects\",\"size\":1685457},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Film 20\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":125,\"version\":\"2.0.0\",\"date\":\"2018-10-19 10:30:10\",\"last_visit\":\"2018-10-19 10:30:10\",\"date_modification\":\"2018-10-19 10:30:10\",\"project_id\":304,\"folder\":15,\"pType\":\"userProjects\",\"size\":122260},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Film 31\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":125,\"version\":\"2.0.0\",\"date\":\"2018-10-19 12:12:19\",\"last_visit\":\"2018-10-19 12:12:19\",\"date_modification\":\"2018-10-19 12:12:19\",\"project_id\":305,\"folder\":15,\"pType\":\"userProjects\",\"size\":286836},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Zmienne\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":125,\"version\":\"2.0.0\",\"date\":\"2018-10-24 13:50:35\",\"last_visit\":\"2018-10-24 13:50:35\",\"date_modification\":\"2018-10-24 13:50:35\",\"project_id\":313,\"folder\":15,\"pType\":\"userProjects\",\"size\":307706},{\"project_id\":292,\"user_id\":113,\"date\":\"2018-09-25 08:57:27\",\"name\":\"Zmienne projektowe\",\"skin\":\"sk00\",\"dimentions\":\"860x500\",\"version\":\"2.0.0\",\"date_modification\":\"2018-09-25 08:57:27\",\"size\":\"305933\",\"template\":0,\"last_visit\":\"2018-10-24 15:57:06\",\"status\":\"0\",\"external\":\"0\",\"editor_id\":\"5\",\"folder\":15,\"pType\":\"sharedToUserProjects\",\"fromuser\":\"magblasik@gmail.com\"},{\"project_id\":307,\"user_id\":113,\"date\":\"2018-10-23 14:32:16\",\"name\":\"Punktacja\",\"skin\":\"sk00\",\"dimentions\":\"860x500\",\"version\":\"2.0.0\",\"date_modification\":\"2018-10-23 14:32:16\",\"size\":\"482693\",\"template\":0,\"last_visit\":\"2018-10-24 18:47:17\",\"status\":\"0\",\"external\":\"0\",\"editor_id\":\"5\",\"folder\":15,\"pType\":\"sharedToUserProjects\",\"fromuser\":\"magblasik@gmail.com\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Triggery informacje podstawowe\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":125,\"version\":\"2.0.0\",\"date\":\"2018-10-24 18:54:28\",\"last_visit\":\"2018-10-24 18:54:28\",\"date_modification\":\"2018-10-24 18:54:28\",\"project_id\":314,\"folder\":15,\"pType\":\"userProjects\",\"size\":195826},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Film 33 Punktacja\",\"size\":481043,\"status\":0,\"user_id\":125,\"version\":\"2.0.0\",\"project_id\":316,\"folder\":15,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Film 22 Linia czasu Rozwini\\u0119cie\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":125,\"version\":\"2.0.0\",\"date\":\"2018-10-29 13:22:24\",\"last_visit\":\"2018-10-29 13:22:24\",\"date_modification\":\"2018-10-29 13:22:24\",\"project_id\":318,\"folder\":15,\"pType\":\"userProjects\",\"size\":192122},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Punktacja- kopia\",\"size\":480513,\"status\":0,\"user_id\":125,\"version\":\"2.0.0\",\"project_id\":319,\"folder\":15,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Projekt testowy do film\\u00f3w- kopia\",\"size\":10868524,\"status\":0,\"user_id\":125,\"version\":\"2.0.0\",\"project_id\":322,\"folder\":15,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Film 32\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":125,\"version\":\"2.0.0\",\"date\":\"2018-10-30 12:29:33\",\"last_visit\":\"2018-10-30 12:29:33\",\"date_modification\":\"2018-10-30 12:29:33\",\"project_id\":323,\"folder\":15,\"pType\":\"userProjects\",\"size\":293388},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Film 6 Lewy pasek om\\u00f3wienie\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":125,\"version\":\"2.0.0\",\"date\":\"2018-11-22 11:34:04\",\"last_visit\":\"2018-11-22 11:34:04\",\"date_modification\":\"2018-11-22 11:34:04\",\"project_id\":332,\"folder\":15,\"pType\":\"userProjects\",\"size\":64827},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Film 11\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":125,\"version\":\"2.0.0\",\"date\":\"2018-11-28 12:05:07\",\"last_visit\":\"2018-11-28 12:05:07\",\"date_modification\":\"2018-11-28 12:05:07\",\"project_id\":341,\"folder\":15,\"pType\":\"userProjects\",\"size\":23466},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Film 11\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":125,\"version\":\"2.0.0\",\"date\":\"2018-11-28 12:06:03\",\"last_visit\":\"2018-11-28 12:06:03\",\"date_modification\":\"2018-11-28 12:06:03\",\"project_id\":342,\"folder\":15,\"pType\":\"userProjects\",\"size\":23466},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Projekt testowy\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":125,\"version\":\"2.0.0\",\"date\":\"2018-11-28 12:08:31\",\"last_visit\":\"2018-11-28 12:08:31\",\"date_modification\":\"2018-11-28 12:08:31\",\"project_id\":343,\"folder\":15,\"pType\":\"userProjects\",\"size\":630173},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Film 12\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":125,\"version\":\"2.0.0\",\"date\":\"2018-11-28 12:49:32\",\"last_visit\":\"2018-11-28 12:49:32\",\"date_modification\":\"2018-11-28 12:49:32\",\"project_id\":344,\"folder\":15,\"pType\":\"userProjects\",\"size\":541928},{\"project_id\":346,\"user_id\":113,\"date\":\"2018-11-29 11:28:35\",\"name\":\"Licznik czasu\",\"skin\":\"sk00\",\"dimentions\":\"860x500\",\"version\":\"2.0.0\",\"date_modification\":\"2018-11-29 11:28:35\",\"size\":\"323072\",\"template\":0,\"last_visit\":\"2018-11-30 13:03:40\",\"status\":\"0\",\"external\":\"0\",\"editor_id\":\"5\",\"folder\":15,\"pType\":\"sharedToUserProjects\",\"fromuser\":\"magblasik@gmail.com\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Film 39\",\"size\":304407,\"status\":0,\"user_id\":125,\"version\":\"2.0.0\",\"project_id\":349,\"folder\":15,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Dodawanie szablon\\u00f3w\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":125,\"version\":\"2.0.0\",\"date\":\"2018-12-10 13:00:38\",\"last_visit\":\"2018-12-10 13:00:38\",\"date_modification\":\"2018-12-10 13:00:38\",\"project_id\":350,\"folder\":15,\"pType\":\"userProjects\",\"size\":64827},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Film 41\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":125,\"version\":\"2.0.0\",\"date\":\"2018-12-11 11:32:03\",\"last_visit\":\"2018-12-11 11:32:03\",\"date_modification\":\"2018-12-11 11:32:03\",\"project_id\":351,\"folder\":15,\"pType\":\"userProjects\",\"size\":1780974},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Zarz\\u0105dzenie zasobami ludzkimi\",\"size\":5129048,\"status\":0,\"user_id\":125,\"version\":\"2.0.0\",\"project_id\":353,\"folder\":11,\"pType\":\"userSharedProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Oferta handlowa\",\"size\":5494665,\"status\":0,\"user_id\":125,\"version\":\"2.0.0\",\"project_id\":354,\"folder\":22,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Film 13\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":125,\"version\":\"2.0.0\",\"date\":\"2018-12-18 18:00:49\",\"last_visit\":\"2018-12-18 18:00:49\",\"date_modification\":\"2018-12-18 18:00:49\",\"project_id\":355,\"folder\":15,\"pType\":\"userProjects\",\"size\":331114},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Film 18\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":125,\"version\":\"2.0.0\",\"date\":\"2018-12-18 18:02:00\",\"last_visit\":\"2018-12-18 18:02:00\",\"date_modification\":\"2018-12-18 18:02:00\",\"project_id\":356,\"folder\":15,\"pType\":\"userProjects\",\"size\":223792},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Propaganda 1\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":125,\"version\":\"2.0.0\",\"date\":\"2018-12-18 18:05:09\",\"last_visit\":\"2018-12-18 18:05:09\",\"date_modification\":\"2018-12-18 18:05:09\",\"project_id\":357,\"folder\":15,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Propaganda 2\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":125,\"version\":\"2.0.0\",\"date\":\"2018-12-18 18:05:29\",\"last_visit\":\"2018-12-18 18:05:29\",\"date_modification\":\"2018-12-18 18:05:29\",\"project_id\":358,\"folder\":15,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Propaganda 3\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":125,\"version\":\"2.0.0\",\"date\":\"2018-12-18 18:05:48\",\"last_visit\":\"2018-12-18 18:05:48\",\"date_modification\":\"2018-12-18 18:05:48\",\"project_id\":359,\"folder\":15,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Bezpiecze\\u0144stwo transakcji w internecie\",\"size\":20160042,\"status\":0,\"user_id\":125,\"version\":\"2.0.0\",\"project_id\":362,\"folder\":0,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Zasoby ludzkie\",\"size\":5125636,\"status\":0,\"user_id\":125,\"version\":\"2.0.0\",\"project_id\":364,\"folder\":0,\"pType\":\"userProjects\"},{\"dimentions\":\"860x500\",\"external\":0,\"name\":\"Film 34\",\"skin\":\"sk00\",\"status\":0,\"template\":0,\"user_id\":125,\"version\":\"2.0.0\",\"date\":\"2019-02-04 11:11:00\",\"last_visit\":\"2019-02-04 11:11:00\",\"date_modification\":\"2019-02-04 11:11:00\",\"project_id\":367,\"folder\":15,\"pType\":\"userProjects\",\"size\":313545}],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0},{\"folder\":0,\"folderID\":1,\"name\":\"Triggery\",\"pType\":\"folder\"},{\"folder\":0,\"folderID\":11,\"name\":\"Film\",\"pType\":\"folder\"},{\"folder\":0,\"folderID\":15,\"name\":\"Prezentacje \\u0107wicze\\u0144\",\"pType\":\"folder\"},{\"folder\":0,\"folderID\":21,\"name\":\"Bezpiecze\\u0144stwo\",\"pType\":\"folder\"},{\"folder\":0,\"folderID\":22,\"name\":\"Oferta\",\"pType\":\"folder\"}]}', 1, '2.0.0', 1, 'KRdD1Fdp5bPqYbeG1OwU5jdhavnoGxWr4EpzGrYOASkZMrYhx4b3Qc1uS9r1', '2018-07-30 19:45:00', '2019-02-13 17:11:17'),
(126, 'Terryvox', 'czerwonylas@op.pl', '$2y$10$j18vlKxv5Z0jLSvL8AT12uiLn6SEYXpxDP0wYocKYGl4DbMYJ2BuS', '', 'en', 1, 'https://darkan.eu/storage/app/projects/126/avatar/avatar.png', 'czerwonylas', 'czerwonylas', 'b42fac726a8ca670e4f844f7229a17b8', 0, 1, NULL, 1, '2.0.0', 1, NULL, '2018-08-09 02:52:55', '2018-08-09 02:52:56'),
(127, 'tekwwk', 'zvfidu@cialisy.info', '$2y$10$JqaGYmAF/hxYq40AJYTezOpxAliunfbZ/K5ZjHDEwzLPVYcjjKZaq', '', 'en', 1, 'https://darkan.eu/storage/app/projects/127/avatar/avatar.png', 'zvfidu', 'zvfidu', 'cb869aa160153b962792bd665bcfdba2', 0, 1, NULL, 1, '2.0.0', 1, NULL, '2018-09-06 13:39:19', '2018-09-06 13:39:19'),
(128, 'vogiid', 'uqnguf@canadianonline.email', '$2y$10$UU.DV3YWQ82cDLKsAEvhN.wqHkLBfWw17MOYgEweecAucf.1z4VbO', '', 'en', 1, 'https://darkan.eu/storage/app/projects/128/avatar/avatar.png', 'uqnguf', 'uqnguf', 'd06f6bf773ef01f5d1da275650f8580d', 0, 1, NULL, 1, '2.0.0', 1, NULL, '2018-09-08 08:58:17', '2018-09-08 08:58:18'),
(129, 'Hubert Cytawa', 'euroforum@logowanie.com', '$2y$10$GaIBXPQbJ/vxw2oUNdc2keSb7EuPa1qF72gBayDgyn8y8GUcZUYZm', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/129/avatar/avatar.png', 'euroforum', 'euroforum', 'f292ad1acca4fdfa27dfd3e8ff71dc70', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, 'TDRaOLbV6pQ1DeoEMOtt3IPxNbkOi0lgkV9vExR2h8H53u0qEsrBcf50Qhm8', '2018-09-12 10:27:18', '2018-09-12 10:32:12'),
(130, 'Tomasz Wiśniewski', 'tw@przetarg.pl', '$2y$10$uzkb7BXkR9.JXPZiqTWqqu75oNp4UNzK6RWcjy5uvNKMj22e1Bloq', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/130/avatar/avatar.png', 'tw', 'tw', '65e7af764b371b9dafc20c4f93cea9ac', 0, 1, '{\"lastFolderID\":0,\"lastVisitedFolderID\":0,\"objs\":[],\"folders\":[{\"pType\":\"folder\",\"name\":\"DARKAN_MAIN_PROJECTS_FOLDER_NAME\",\"folder\":-1,\"folderID\":0}]}', 1, '2.0.0', 1, NULL, '2018-09-12 10:30:37', '2018-09-12 10:32:25'),
(131, 'Marek Wincentowicz', 'mw@dostep.pl', '$2y$10$lpPxA1Fu57FxvYbdPfTbsu1U0PVUp/Ji3In91y4bJ48F41A1Y4pVq', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/131/avatar/avatar.png', 'mw', 'mw', '7201715ec31a8496f3ac455ea4e9301a', 0, 1, NULL, 1, '2.0.0', 1, NULL, '2018-09-12 10:31:21', '2018-09-12 10:31:21'),
(132, 'Test Testowy ', 'testdarkan@gmail.com', '$2y$10$DEE7OrQsbrrkVQbQdUgbMe6BRL0rMwrrCwnFoNGHvzOZXl1ISYMYS', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/132/avatar/avatar.png', 'testdarkan', 'testdarkan', 'beef222be132b2d26faa8f9f2ff4cb1f', 0, 1, NULL, 1, '2.0.0', 1, NULL, '2018-09-21 09:07:03', '2018-09-21 09:07:03'),
(133, 'nowy', 'test@test1.pl', '$2y$10$ebXF7WMbZuThK1..R43x5.QGGLz96nepiMVgZGmXt8LVO35JxeHZO', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/133/avatar/avatar.png', 'test24', 'test24', '52298d5d55a9a1d7c0ea93b431b0423a', 0, 1, NULL, 1, '2.0.0', 1, NULL, '2018-10-23 09:27:23', '2018-10-23 09:27:25'),
(134, 'tst', 'tstdarkan@gmail.com', '$2y$10$AnnxDn9l.zOlPKEE57/sfOE.EX6plWNGl4NBq/aSssOm.EY8V1hSK', '', 'pl', 1, 'https://darkan.eu/storage/app/projects/134/avatar/avatar.png', 'tstdarkan', 'tstdarkan', '83db7b26f6daec7490cb970deadce1f0', 0, 1, NULL, 1, '2.0.0', 1, 'XHKYz7X3z5qyfNaEtzHcn4I7Wxpd010qshjiUVbfmClVPskfIQfo88UiHXcY', '2018-10-26 08:20:32', '2018-10-26 08:26:49');

-- --------------------------------------------------------

--
-- Table structure for table `users_to_aplications_api`
--

CREATE TABLE `users_to_aplications_api` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `aplication_api_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users_to_aplications_api`
--

INSERT INTO `users_to_aplications_api` (`id`, `user_id`, `aplication_api_id`) VALUES
(1, 7, 1),
(2, 8, 2);

-- --------------------------------------------------------

--
-- Table structure for table `users_to_distributors`
--

CREATE TABLE `users_to_distributors` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `distributor_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users_to_distributors_rabats`
--

CREATE TABLE `users_to_distributors_rabats` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `rabat` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `currency_id` int(10) UNSIGNED NOT NULL,
  `start_date` datetime NOT NULL,
  `expiration_date` datetime NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users_to_distributors_rabats`
--

INSERT INTO `users_to_distributors_rabats` (`id`, `user_id`, `rabat`, `amount`, `currency_id`, `start_date`, `expiration_date`, `active`, `created_at`, `updated_at`) VALUES
(1, 40, 20, 300, 1, '2017-10-09 16:21:44', '2017-10-31 16:22:01', 1, '2017-10-09 14:22:44', '2017-10-09 14:22:44');

-- --------------------------------------------------------

--
-- Table structure for table `users_to_promo_codes`
--

CREATE TABLE `users_to_promo_codes` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `promo_code_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users_to_reselers`
--

CREATE TABLE `users_to_reselers` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `reseler_id` int(10) UNSIGNED NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `users_to_reselers`
--

INSERT INTO `users_to_reselers` (`id`, `user_id`, `reseler_id`) VALUES
(1, 42, 41),
(2, 45, 41);

-- --------------------------------------------------------

--
-- Table structure for table `users_to_reselers_rabats`
--

CREATE TABLE `users_to_reselers_rabats` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `rabat` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `currency_id` int(10) UNSIGNED NOT NULL,
  `start_date` datetime NOT NULL,
  `expiration_date` datetime NOT NULL,
  `active` tinyint(4) NOT NULL DEFAULT '1',
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

-- --------------------------------------------------------

--
-- Table structure for table `user_login`
--

CREATE TABLE `user_login` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
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
  `updated_at` timestamp NULL DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `user_login`
--

INSERT INTO `user_login` (`id`, `user_id`, `date_login`, `date_logout`, `browser`, `ip`, `countryName`, `countryCode`, `regionCode`, `regionName`, `cityName`, `latitude`, `longitude`, `driver`, `created_at`, `updated_at`) VALUES
(1, 44, '2017-04-12 13:42:44', '2017-04-12 13:42:44', 'Mozilla/5.0 (Windows NT 6.3; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.54 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2017-04-12 11:42:44', '2017-04-12 11:42:44'),
(2, 29, '2017-04-19 07:18:01', '2017-04-19 07:18:01', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.68 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2017-04-19 05:18:01', '2017-04-19 05:18:01'),
(10, 62, '2017-10-25 23:13:02', '2017-10-25 23:13:02', 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2017-10-25 21:13:02', '2017-10-25 21:13:02'),
(12, 29, '2017-10-26 21:02:07', '2017-10-26 21:02:07', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.62 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2017-10-26 19:02:07', '2017-10-26 19:02:07'),
(15, 54, '2017-10-27 09:51:46', '2017-10-27 09:51:46', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2017-10-27 07:51:46', '2017-10-27 07:51:46'),
(17, 29, '2017-10-27 15:38:21', '2017-10-27 15:38:21', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.62 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2017-10-27 13:38:21', '2017-10-27 13:38:21'),
(21, 70, '2017-10-28 00:13:21', '2017-10-28 00:13:21', 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2017-10-27 22:13:21', '2017-10-27 22:13:21'),
(22, 29, '2017-10-29 10:32:37', '2017-10-29 10:32:37', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2017-10-29 08:32:37', '2017-10-29 08:32:37'),
(26, 29, '2017-10-29 16:17:44', '2017-10-29 16:17:44', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2017-10-29 14:17:44', '2017-10-29 14:17:44'),
(27, 29, '2017-10-29 20:28:40', '2017-10-29 20:28:40', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2017-10-29 18:28:40', '2017-10-29 18:28:40'),
(28, 29, '2017-10-30 20:01:38', '2017-10-30 20:01:38', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2017-10-30 18:01:38', '2017-10-30 18:01:38'),
(29, 72, '2017-11-03 11:54:29', '2017-11-03 11:54:29', 'Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.91 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2017-11-03 09:54:29', '2017-11-03 09:54:29'),
(30, 29, '2017-11-03 14:27:16', '2017-11-03 14:27:16', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.75 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2017-11-03 12:27:16', '2017-11-03 12:27:16'),
(31, 29, '2017-11-10 11:37:32', '2017-11-10 11:37:32', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2017-11-10 09:37:32', '2017-11-10 09:37:32'),
(33, 29, '2017-11-20 13:07:48', '2017-11-20 13:07:48', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2017-11-20 11:07:48', '2017-11-20 11:07:48'),
(34, 29, '2017-11-20 13:09:51', '2017-11-20 13:09:51', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.13; rv:57.0) Gecko/20100101 Firefox/57.0', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2017-11-20 11:09:51', '2017-11-20 11:09:51'),
(35, 54, '2017-11-22 16:31:21', '2017-11-22 16:31:21', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2017-11-22 14:31:21', '2017-11-22 14:31:21'),
(36, 29, '2017-12-02 15:06:09', '2017-12-02 15:06:09', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2017-12-02 13:06:09', '2017-12-02 13:06:09'),
(39, 29, '2017-12-02 15:07:59', '2017-12-02 15:07:59', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2017-12-02 13:07:59', '2017-12-02 13:07:59'),
(41, 29, '2017-12-02 15:08:41', '2017-12-02 15:08:41', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.94 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2017-12-02 13:08:41', '2017-12-02 13:08:41'),
(43, 29, '2017-12-10 12:50:15', '2017-12-10 12:50:15', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2017-12-10 10:50:15', '2017-12-10 10:50:15'),
(44, 54, '2017-12-28 18:28:45', '2017-12-28 18:28:45', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2017-12-28 16:28:45', '2017-12-28 16:28:45'),
(45, 54, '2017-12-28 18:29:56', '2017-12-28 18:29:56', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36', '66.102.0.0', 'United States', 'US', '', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\IpInfo', '2017-12-28 16:29:56', '2017-12-28 16:29:56'),
(46, 54, '2017-12-29 14:17:10', '2017-12-29 14:17:10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2017-12-29 12:17:10', '2017-12-29 12:17:10'),
(48, 29, '2017-12-31 10:04:37', '2017-12-31 10:04:37', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2017-12-31 08:04:37', '2017-12-31 08:04:37'),
(49, 29, '2018-01-01 11:38:31', '2018-01-01 11:38:31', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.39 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-01-01 09:38:31', '2018-01-01 09:38:31'),
(51, 29, '2018-01-06 17:46:50', '2018-01-06 17:46:50', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.108 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-01-06 15:46:50', '2018-01-06 15:46:50'),
(52, 29, '2018-01-07 18:03:51', '2018-01-07 18:03:51', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-01-07 16:03:51', '2018-01-07 16:03:51'),
(54, 29, '2018-01-07 21:21:54', '2018-01-07 21:21:54', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-01-07 19:21:54', '2018-01-07 19:21:54'),
(55, 29, '2018-01-08 10:56:04', '2018-01-08 10:56:04', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36', '66.102.0.0', 'United States', 'US', '', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\IpInfo', '2018-01-08 08:56:04', '2018-01-08 08:56:04'),
(57, 29, '2018-01-08 17:59:32', '2018-01-08 17:59:32', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-01-08 15:59:32', '2018-01-08 15:59:32'),
(58, 54, '2018-01-08 18:55:06', '2018-01-08 18:55:06', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.84 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-01-08 16:55:06', '2018-01-08 16:55:06'),
(59, 29, '2018-01-09 19:01:33', '2018-01-09 19:01:34', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-01-09 17:01:34', '2018-01-09 17:01:34'),
(62, 29, '2018-01-12 14:46:06', '2018-01-12 14:46:06', 'Mozilla/5.0 (iPhone; CPU iPhone OS 11_2_1 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) CriOS/63.0.3239.73 Mobile/15C153 Safari/604.1', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-01-12 12:46:06', '2018-01-12 12:46:06'),
(63, 29, '2018-01-13 18:17:06', '2018-01-13 18:17:06', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_2) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-01-13 16:17:06', '2018-01-13 16:17:06'),
(64, 54, '2018-01-15 08:29:47', '2018-01-15 08:29:47', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-01-15 06:29:47', '2018-01-15 06:29:47'),
(65, 29, '2018-01-15 08:33:08', '2018-01-15 08:33:08', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-01-15 06:33:08', '2018-01-15 06:33:08'),
(67, 29, '2018-01-30 06:50:06', '2018-01-30 06:50:06', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36', '66.102.0.0', 'United States', 'US', '', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\IpInfo', '2018-01-30 04:50:06', '2018-01-30 04:50:06'),
(68, 29, '2018-01-30 06:50:24', '2018-01-30 06:50:24', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36', '66.102.0.0', 'United States', 'US', '', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\IpInfo', '2018-01-30 04:50:24', '2018-01-30 04:50:24'),
(70, 29, '2018-01-30 06:51:25', '2018-01-30 06:51:25', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36', '66.102.0.0', 'United States', 'US', '', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\IpInfo', '2018-01-30 04:51:25', '2018-01-30 04:51:25'),
(71, 29, '2018-01-30 06:51:54', '2018-01-30 06:51:54', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36', '66.102.0.0', 'United States', 'US', '', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\IpInfo', '2018-01-30 04:51:54', '2018-01-30 04:51:54'),
(72, 29, '2018-01-30 06:51:59', '2018-01-30 06:51:59', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36', '66.102.0.0', 'United States', 'US', '', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\IpInfo', '2018-01-30 04:51:59', '2018-01-30 04:51:59'),
(73, 29, '2018-01-30 06:52:35', '2018-01-30 06:52:35', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-01-30 04:52:35', '2018-01-30 04:52:35'),
(74, 29, '2018-01-30 06:53:07', '2018-01-30 06:53:07', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/604.5.6 (KHTML, like Gecko) Version/11.0.3 Safari/604.5.6', '66.102.0.0', 'United States', 'US', '', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\IpInfo', '2018-01-30 04:53:07', '2018-01-30 04:53:07'),
(75, 29, '2018-01-30 07:05:35', '2018-01-30 07:05:35', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36', '66.102.0.0', 'United States', 'US', '', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\IpInfo', '2018-01-30 05:05:35', '2018-01-30 05:05:35'),
(76, 29, '2018-01-30 07:06:38', '2018-01-30 07:06:38', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36', '66.102.0.0', 'United States', 'US', '', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\IpInfo', '2018-01-30 05:06:38', '2018-01-30 05:06:38'),
(78, 29, '2018-01-30 07:07:41', '2018-01-30 07:07:41', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36', '66.102.0.0', 'United States', 'US', '', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\IpInfo', '2018-01-30 05:07:41', '2018-01-30 05:07:41'),
(82, 29, '2018-01-30 07:14:36', '2018-01-30 07:14:36', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36', '66.102.0.0', 'United States', 'US', '', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\IpInfo', '2018-01-30 05:14:36', '2018-01-30 05:14:36'),
(83, 29, '2018-01-30 07:15:08', '2018-01-30 07:15:08', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36', '66.102.0.0', 'United States', 'US', '', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\IpInfo', '2018-01-30 05:15:08', '2018-01-30 05:15:08'),
(84, 29, '2018-01-30 07:16:03', '2018-01-30 07:16:03', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-01-30 05:16:03', '2018-01-30 05:16:03'),
(85, 29, '2018-01-30 07:16:13', '2018-01-30 07:16:13', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-01-30 05:16:13', '2018-01-30 05:16:13'),
(86, 29, '2018-01-30 07:16:17', '2018-01-30 07:16:17', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36', '66.102.0.0', 'United States', 'US', '', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\IpInfo', '2018-01-30 05:16:17', '2018-01-30 05:16:17'),
(87, 29, '2018-01-30 07:23:04', '2018-01-30 07:23:04', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-01-30 05:23:04', '2018-01-30 05:23:04'),
(88, 29, '2018-01-30 08:31:21', '2018-01-30 08:31:21', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/63.0.3239.132 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-01-30 06:31:21', '2018-01-30 06:31:21'),
(93, 29, '2018-02-12 07:30:47', '2018-02-12 07:30:47', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/64.0.3282.140 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-02-12 05:30:47', '2018-02-12 05:30:47'),
(95, 29, '2018-05-10 04:51:38', '2018-05-10 04:51:38', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/66.0.3359.139 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-05-10 02:51:38', '2018-05-10 02:51:38'),
(96, 29, '2018-05-20 00:34:05', '2018-05-20 00:34:05', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/62.0.3202.89 Safari/537.36 Firework.cloud', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-05-19 22:34:05', '2018-05-19 22:34:05'),
(98, 113, '2018-06-17 12:58:35', '2018-06-17 12:58:35', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-06-17 10:58:35', '2018-06-17 10:58:35'),
(99, 103, '2018-06-18 15:08:34', '2018-06-18 15:08:34', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-06-18 13:08:34', '2018-06-18 13:08:34'),
(100, 103, '2018-06-19 08:13:13', '2018-06-19 08:13:13', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-06-19 06:13:13', '2018-06-19 06:13:13'),
(101, 29, '2018-06-20 05:59:33', '2018-06-20 05:59:33', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-06-20 03:59:33', '2018-06-20 03:59:33'),
(102, 103, '2018-06-20 07:49:47', '2018-06-20 07:49:47', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-06-20 05:49:47', '2018-06-20 05:49:47'),
(103, 29, '2018-06-21 10:07:24', '2018-06-21 10:07:24', 'Mozilla/5.0 (iPhone; CPU iPhone OS 12_0 like Mac OS X) AppleWebKit/604.1.34 (KHTML, like Gecko) CriOS/67.0.3396.69 Mobile/16A5308e Safari/604.1', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-06-21 08:07:24', '2018-06-21 08:07:24'),
(104, 113, '2018-06-23 11:19:39', '2018-06-23 11:19:39', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-06-23 09:19:39', '2018-06-23 09:19:39'),
(105, 29, '2018-06-25 15:41:50', '2018-06-25 15:41:50', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-06-25 13:41:50', '2018-06-25 13:41:50'),
(106, 103, '2018-06-25 15:59:59', '2018-06-25 15:59:59', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-06-25 13:59:59', '2018-06-25 13:59:59'),
(107, 29, '2018-06-25 16:36:22', '2018-06-25 16:36:22', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-06-25 14:36:22', '2018-06-25 14:36:22'),
(108, 114, '2018-06-25 17:24:11', '2018-06-25 17:24:11', 'Mozilla/5.0 (Linux; Android 7.0; PRA-LX1 Build/HUAWEIPRA-LX1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Mobile Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-06-25 15:24:11', '2018-06-25 15:24:11'),
(109, 29, '2018-06-27 09:07:21', '2018-06-27 09:07:21', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-06-27 07:07:21', '2018-06-27 07:07:21'),
(110, 115, '2018-06-27 09:33:37', '2018-06-27 09:33:37', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-06-27 07:33:37', '2018-06-27 07:33:37'),
(111, 103, '2018-06-27 09:34:11', '2018-06-27 09:34:11', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-06-27 07:34:11', '2018-06-27 07:34:11'),
(112, 54, '2018-07-03 10:24:50', '2018-07-03 10:24:50', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-07-03 08:24:50', '2018-07-03 08:24:50'),
(113, 54, '2018-07-05 08:22:56', '2018-07-05 08:22:56', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-07-05 06:22:56', '2018-07-05 06:22:56'),
(114, 54, '2018-07-05 08:58:24', '2018-07-05 08:58:24', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-07-05 06:58:24', '2018-07-05 06:58:24'),
(115, 54, '2018-07-05 09:01:29', '2018-07-05 09:01:29', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-07-05 07:01:29', '2018-07-05 07:01:29'),
(116, 103, '2018-07-06 07:05:48', '2018-07-06 07:05:48', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-07-06 05:05:48', '2018-07-06 05:05:48'),
(117, 54, '2018-07-11 08:10:00', '2018-07-11 08:10:00', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-07-11 06:10:00', '2018-07-11 06:10:00'),
(119, 124, '2018-07-22 10:41:52', '2018-07-22 10:41:52', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-07-22 08:41:52', '2018-07-22 08:41:52'),
(120, 113, '2018-07-30 12:39:18', '2018-07-30 12:39:18', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-07-30 10:39:18', '2018-07-30 10:39:18'),
(121, 113, '2018-07-31 19:52:31', '2018-07-31 19:52:31', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-07-31 17:52:31', '2018-07-31 17:52:31'),
(122, 54, '2018-07-31 20:27:38', '2018-07-31 20:27:38', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-07-31 18:27:38', '2018-07-31 18:27:38'),
(123, 113, '2018-07-31 20:29:19', '2018-07-31 20:29:19', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-07-31 18:29:19', '2018-07-31 18:29:19'),
(124, 113, '2018-07-31 21:18:10', '2018-07-31 21:18:10', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-07-31 19:18:10', '2018-07-31 19:18:10'),
(125, 113, '2018-07-31 21:21:34', '2018-07-31 21:21:34', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-07-31 19:21:34', '2018-07-31 19:21:34'),
(126, 113, '2018-07-31 21:35:42', '2018-07-31 21:35:42', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-07-31 19:35:42', '2018-07-31 19:35:42'),
(127, 113, '2018-07-31 21:35:43', '2018-07-31 21:35:43', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.75 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-07-31 19:35:43', '2018-07-31 19:35:43'),
(128, 29, '2018-08-02 06:38:32', '2018-08-02 06:38:32', 'Mozilla/5.0 (Linux; Android 8.0.0; SM-N950F Build/R16NW) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.87 Mobile Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-08-02 04:38:32', '2018-08-02 04:38:32'),
(129, 113, '2018-08-06 22:21:00', '2018-08-06 22:21:00', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.84 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-08-06 20:21:00', '2018-08-06 20:21:00'),
(130, 113, '2018-08-07 18:53:41', '2018-08-07 18:53:41', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-08-07 16:53:41', '2018-08-07 16:53:41'),
(131, 113, '2018-08-08 22:02:52', '2018-08-08 22:02:52', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36', '66.102.0.0', 'United States', 'US', '', 'California', 'Mountain View', '37.4192', '-122.0570', 'Stevebauman\\Location\\Drivers\\IpInfo', '2018-08-08 20:02:52', '2018-08-08 20:02:52'),
(132, 113, '2018-08-12 08:21:44', '2018-08-12 08:21:44', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-08-12 06:21:44', '2018-08-12 06:21:44'),
(133, 113, '2018-08-15 10:36:05', '2018-08-15 10:36:05', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_13_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/67.0.3396.99 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-08-15 08:36:05', '2018-08-15 08:36:05'),
(134, 116, '2018-08-20 10:01:01', '2018-08-20 10:01:01', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/68.0.3440.106 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-08-20 08:01:01', '2018-08-20 08:01:01'),
(135, 113, '2018-09-16 15:51:22', '2018-09-16 15:51:22', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.81 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-09-16 13:51:22', '2018-09-16 13:51:22'),
(136, 29, '2018-09-18 15:11:12', '2018-09-18 15:11:12', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-09-18 13:11:12', '2018-09-18 13:11:12'),
(137, 29, '2018-09-27 09:09:40', '2018-09-27 09:09:40', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-09-27 07:09:40', '2018-09-27 07:09:40'),
(138, 113, '2018-09-27 17:13:25', '2018-09-27 17:13:25', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36', '66.102.0.0', 'United States', 'US', '', '', '', '37.7510', '-97.8220', 'Stevebauman\\Location\\Drivers\\IpInfo', '2018-09-27 15:13:25', '2018-09-27 15:13:25'),
(139, 113, '2018-10-17 13:59:51', '2018-10-17 13:59:51', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-10-17 11:59:51', '2018-10-17 11:59:51'),
(140, 113, '2018-10-19 19:31:07', '2018-10-19 19:31:07', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-10-19 17:31:07', '2018-10-19 17:31:07'),
(141, 113, '2018-10-23 14:05:48', '2018-10-23 14:05:48', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-10-23 12:05:48', '2018-10-23 12:05:48'),
(142, 113, '2018-10-23 19:33:13', '2018-10-23 19:33:13', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-10-23 17:33:13', '2018-10-23 17:33:13'),
(143, 29, '2018-10-23 19:33:42', '2018-10-23 19:33:42', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-10-23 17:33:42', '2018-10-23 17:33:42'),
(144, 113, '2018-10-24 19:21:48', '2018-10-24 19:21:48', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-10-24 17:21:48', '2018-10-24 17:21:48'),
(145, 113, '2018-10-24 20:01:08', '2018-10-24 20:01:08', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/69.0.3497.100 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-10-24 18:01:08', '2018-10-24 18:01:08'),
(146, 113, '2018-10-26 10:27:41', '2018-10-26 10:27:41', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.67 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-10-26 08:27:41', '2018-10-26 08:27:41'),
(147, 113, '2018-10-30 08:59:42', '2018-10-30 08:59:42', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.67 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-10-30 06:59:42', '2018-10-30 06:59:42'),
(148, 113, '2018-11-16 17:01:45', '2018-11-16 17:01:45', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-11-16 15:01:45', '2018-11-16 15:01:45'),
(149, 113, '2018-11-17 18:18:43', '2018-11-17 18:18:43', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.67 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-11-17 16:18:43', '2018-11-17 16:18:43'),
(150, 29, '2018-11-21 18:45:18', '2018-11-21 18:45:18', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-11-21 16:45:18', '2018-11-21 16:45:18'),
(151, 113, '2018-11-22 09:05:55', '2018-11-22 09:05:55', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-11-22 07:05:55', '2018-11-22 07:05:55'),
(152, 113, '2018-11-22 13:57:05', '2018-11-22 13:57:05', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-11-22 11:57:05', '2018-11-22 11:57:05'),
(153, 113, '2018-11-23 12:17:20', '2018-11-23 12:17:20', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36', '66.102.0.0', 'United States', 'US', '', '', '', '37.7510', '-97.8220', 'Stevebauman\\Location\\Drivers\\IpInfo', '2018-11-23 10:17:20', '2018-11-23 10:17:20'),
(154, 113, '2018-11-23 13:48:19', '2018-11-23 13:48:19', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-11-23 11:48:19', '2018-11-23 11:48:19'),
(155, 113, '2018-11-28 16:50:19', '2018-11-28 16:50:19', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-11-28 14:50:19', '2018-11-28 14:50:19'),
(156, 113, '2018-11-28 16:50:21', '2018-11-28 16:50:21', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-11-28 14:50:21', '2018-11-28 14:50:21'),
(157, 113, '2018-11-29 11:28:07', '2018-11-29 11:28:07', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-11-29 09:28:07', '2018-11-29 09:28:07'),
(158, 113, '2018-12-17 10:13:35', '2018-12-17 10:13:35', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-12-17 08:13:35', '2018-12-17 08:13:35'),
(159, 113, '2018-12-19 10:11:32', '2018-12-19 10:11:32', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-12-19 08:11:32', '2018-12-19 08:11:32'),
(160, 113, '2018-12-19 10:11:35', '2018-12-19 10:11:35', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.102 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-12-19 08:11:35', '2018-12-19 08:11:35'),
(161, 113, '2018-12-19 14:05:39', '2018-12-19 14:05:39', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-12-19 12:05:39', '2018-12-19 12:05:39'),
(162, 113, '2018-12-19 14:05:40', '2018-12-19 14:05:40', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/70.0.3538.110 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2018-12-19 12:05:40', '2018-12-19 12:05:40'),
(163, 113, '2019-01-24 22:09:14', '2019-01-24 22:09:14', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2019-01-24 20:09:14', '2019-01-24 20:09:14'),
(164, 29, '2019-01-27 14:33:19', '2019-01-27 14:33:19', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_3) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/12.0.3 Safari/605.1.15', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2019-01-27 12:33:19', '2019-01-27 12:33:19'),
(165, 113, '2019-01-28 20:07:21', '2019-01-28 20:07:21', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2019-01-28 18:07:21', '2019-01-28 18:07:21'),
(166, 113, '2019-01-30 09:01:09', '2019-01-30 09:01:09', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', '66.102.0.0', 'United States', 'US', '', '', '', '37.7510', '-97.8220', 'Stevebauman\\Location\\Drivers\\IpInfo', '2019-01-30 07:01:09', '2019-01-30 07:01:09'),
(167, 113, '2019-01-30 09:48:01', '2019-01-30 09:48:01', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2019-01-30 07:48:01', '2019-01-30 07:48:01'),
(168, 113, '2019-02-04 12:24:38', '2019-02-04 12:24:38', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2019-02-04 10:24:38', '2019-02-04 10:24:38'),
(169, 113, '2019-02-04 12:24:40', '2019-02-04 12:24:40', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2019-02-04 10:24:40', '2019-02-04 10:24:40'),
(170, 113, '2019-02-04 12:24:43', '2019-02-04 12:24:43', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2019-02-04 10:24:43', '2019-02-04 10:24:43'),
(171, 113, '2019-02-09 13:25:20', '2019-02-09 13:25:20', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.98 Safari/537.36', '66.102.0.0', 'United States', 'US', 'CA', 'California', 'Mountain View', '37.4192', '-122.0574', 'Stevebauman\\Location\\Drivers\\FreeGeoIp', '2019-02-09 11:25:20', '2019-02-09 11:25:20');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `api_tokens`
--
ALTER TABLE `api_tokens`
  ADD PRIMARY KEY (`id`),
  ADD KEY `api_tokens_api_key_id_foreign` (`api_key_id`);

--
-- Indexes for table `aplication_admin_api_to_aplication_api`
--
ALTER TABLE `aplication_admin_api_to_aplication_api`
  ADD PRIMARY KEY (`id`),
  ADD KEY `aplication_admin_api_to_aplication_api_admin_api_key_id_foreign` (`admin_api_key_id`),
  ADD KEY `aplication_admin_api_to_aplication_api_api_key_id_foreign` (`api_key_id`);

--
-- Indexes for table `aplication_api`
--
ALTER TABLE `aplication_api`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `aplication_api_api_key_unique` (`api_key`),
  ADD KEY `aplication_api_role_id_foreign` (`role_id`);

--
-- Indexes for table `aplication_api_roles`
--
ALTER TABLE `aplication_api_roles`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `banners_categories`
--
ALTER TABLE `banners_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `banners_categories_owner_id_foreign` (`owner_id`);

--
-- Indexes for table `banners_domain`
--
ALTER TABLE `banners_domain`
  ADD PRIMARY KEY (`id_banner_domain`),
  ADD KEY `banners_domain_banner_id_foreign` (`banner_id`);

--
-- Indexes for table `banners_projects`
--
ALTER TABLE `banners_projects`
  ADD PRIMARY KEY (`id_banner`),
  ADD KEY `banners_projects_user_id_foreign` (`user_id`),
  ADD KEY `banners_projects_project_id_foreign` (`project_id`);

--
-- Indexes for table `banners_projects_external`
--
ALTER TABLE `banners_projects_external`
  ADD PRIMARY KEY (`id_banner`),
  ADD KEY `banners_projects_external_user_id_foreign` (`user_id`),
  ADD KEY `banners_projects_external_project_id_foreign` (`project_id`);

--
-- Indexes for table `banners_shared`
--
ALTER TABLE `banners_shared`
  ADD PRIMARY KEY (`id_shared`),
  ADD KEY `banners_shared_banner_id_foreign` (`banner_id`),
  ADD KEY `banners_shared_user_id_foreign` (`user_id`);

--
-- Indexes for table `banners_to_categories`
--
ALTER TABLE `banners_to_categories`
  ADD PRIMARY KEY (`id`),
  ADD KEY `banners_to_categories_course_id_foreign` (`course_id`),
  ADD KEY `banners_to_categories_category_id_foreign` (`category_id`);

--
-- Indexes for table `clients_addresses`
--
ALTER TABLE `clients_addresses`
  ADD PRIMARY KEY (`id`),
  ADD KEY `clients_addresses_user_id_foreign` (`user_id`),
  ADD KEY `clients_addresses_city_id_foreign` (`city_id`),
  ADD KEY `clients_addresses_zip_code_id_foreign` (`zip_code_id`);

--
-- Indexes for table `clients_cities`
--
ALTER TABLE `clients_cities`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `clients_zip_codes`
--
ALTER TABLE `clients_zip_codes`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cron_emails_types`
--
ALTER TABLE `cron_emails_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `cron_email_type_to_plan_user`
--
ALTER TABLE `cron_email_type_to_plan_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cron_email_type_to_plan_user_plan_user_id_foreign` (`plan_user_id`),
  ADD KEY `cron_email_type_to_plan_user_cron_email_type_id_foreign` (`cron_email_type_id`);

--
-- Indexes for table `cron_email_type_to_user`
--
ALTER TABLE `cron_email_type_to_user`
  ADD PRIMARY KEY (`id`),
  ADD KEY `cron_email_type_to_user_user_id_foreign` (`user_id`),
  ADD KEY `cron_email_type_to_user_cron_email_type_id_foreign` (`cron_email_type_id`);

--
-- Indexes for table `currencies`
--
ALTER TABLE `currencies`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `editors`
--
ALTER TABLE `editors`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `forms_of_payment`
--
ALTER TABLE `forms_of_payment`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `groups`
--
ALTER TABLE `groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `groups_id_owner_foreign` (`id_owner`);

--
-- Indexes for table `group_banner`
--
ALTER TABLE `group_banner`
  ADD PRIMARY KEY (`id_group`,`id_banner`),
  ADD KEY `group_banner_id_banner_foreign` (`id_banner`);

--
-- Indexes for table `group_user`
--
ALTER TABLE `group_user`
  ADD PRIMARY KEY (`id_group`,`id_user`),
  ADD KEY `group_user_id_user_foreign` (`id_user`);

--
-- Indexes for table `lms_group_content`
--
ALTER TABLE `lms_group_content`
  ADD PRIMARY KEY (`group_id`,`content_id`),
  ADD KEY `lms_group_content_content_id_foreign` (`content_id`);

--
-- Indexes for table `lms_info`
--
ALTER TABLE `lms_info`
  ADD KEY `lms_info_user_id_foreign` (`user_id`),
  ADD KEY `lms_info_skin_foreign` (`skin`);

--
-- Indexes for table `lms_invitation_requests`
--
ALTER TABLE `lms_invitation_requests`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lms_invitation_requests_owner_id_foreign` (`owner_id`),
  ADD KEY `lms_invitation_requests_user_id_foreign` (`user_id`);

--
-- Indexes for table `lms_scorm_data`
--
ALTER TABLE `lms_scorm_data`
  ADD PRIMARY KEY (`user_id`,`content_id`),
  ADD KEY `lms_scorm_data_content_id_foreign` (`content_id`);

--
-- Indexes for table `lms_scorm_data_guest`
--
ALTER TABLE `lms_scorm_data_guest`
  ADD PRIMARY KEY (`hash`),
  ADD KEY `lms_scorm_data_guest_content_id_foreign` (`content_id`);

--
-- Indexes for table `lms_user_portal`
--
ALTER TABLE `lms_user_portal`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lms_user_portal_portal_admin_foreign` (`portal_admin`),
  ADD KEY `lms_user_portal_user_foreign` (`user`);

--
-- Indexes for table `lms_user_portal_paid`
--
ALTER TABLE `lms_user_portal_paid`
  ADD PRIMARY KEY (`id`),
  ADD KEY `lms_user_portal_paid_portal_admin_foreign` (`portal_admin`),
  ADD KEY `lms_user_portal_paid_user_foreign` (`user`);

--
-- Indexes for table `mailing_groups`
--
ALTER TABLE `mailing_groups`
  ADD PRIMARY KEY (`id`),
  ADD KEY `mailing_groups_id_owner_foreign` (`id_owner`);

--
-- Indexes for table `mailing_group_user`
--
ALTER TABLE `mailing_group_user`
  ADD PRIMARY KEY (`id_group`,`id_user`),
  ADD KEY `mailing_group_user_id_user_foreign` (`id_user`);

--
-- Indexes for table `mailing_users`
--
ALTER TABLE `mailing_users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `mailing_users_email_unique` (`email`);

--
-- Indexes for table `migrations`
--
ALTER TABLE `migrations`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `on_off_states`
--
ALTER TABLE `on_off_states`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `password_resets`
--
ALTER TABLE `password_resets`
  ADD KEY `password_resets_email_index` (`email`),
  ADD KEY `password_resets_token_index` (`token`);

--
-- Indexes for table `payments`
--
ALTER TABLE `payments`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `permissions`
--
ALTER TABLE `permissions`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `permissions_name_unique` (`name`);

--
-- Indexes for table `permission_role`
--
ALTER TABLE `permission_role`
  ADD PRIMARY KEY (`permission_id`,`role_id`),
  ADD KEY `permission_role_role_id_foreign` (`role_id`);

--
-- Indexes for table `plans`
--
ALTER TABLE `plans`
  ADD PRIMARY KEY (`id`),
  ADD KEY `plans_form_of_payment_id_foreign` (`form_of_payment_id`),
  ADD KEY `plans_plans_period_type_id_foreign` (`plans_period_type_id`),
  ADD KEY `plans_version_id_foreign` (`version_id`);

--
-- Indexes for table `plans_costs`
--
ALTER TABLE `plans_costs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `plans_costs_plan_id_foreign` (`plan_id`),
  ADD KEY `plans_costs_currency_id_foreign` (`currency_id`),
  ADD KEY `plans_costs_version_id_foreign` (`version_id`);

--
-- Indexes for table `plans_options`
--
ALTER TABLE `plans_options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `plans_options_version_id_foreign` (`version_id`);

--
-- Indexes for table `plans_period_types`
--
ALTER TABLE `plans_period_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `plans_to_plans_costs`
--
ALTER TABLE `plans_to_plans_costs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `plans_to_plans_costs_plan_id_foreign` (`plan_id`),
  ADD KEY `plans_to_plans_costs_plan_cost_id_foreign` (`plan_cost_id`);

--
-- Indexes for table `plans_to_plans_options`
--
ALTER TABLE `plans_to_plans_options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `plans_to_plans_options_plan_id_foreign` (`plan_id`),
  ADD KEY `plans_to_plans_options_plan_option_id_foreign` (`plan_option_id`);

--
-- Indexes for table `plans_to_price_list`
--
ALTER TABLE `plans_to_price_list`
  ADD PRIMARY KEY (`id`),
  ADD KEY `plans_to_price_list_version_id_foreign` (`version_id`),
  ADD KEY `plans_to_price_list_price_type_id_foreign` (`price_type_id`),
  ADD KEY `plans_to_price_list_price_period_id_foreign` (`price_period_id`),
  ADD KEY `plans_to_price_list_plan_id_foreign` (`plan_id`);

--
-- Indexes for table `plans_users`
--
ALTER TABLE `plans_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `plans_users_user_id_foreign` (`user_id`),
  ADD KEY `plans_users_paying_user_id_foreign` (`paying_user_id`),
  ADD KEY `plans_users_created_by_user_id_foreign` (`created_by_user_id`),
  ADD KEY `plans_users_plan_id_foreign` (`plan_id`),
  ADD KEY `plans_users_promo_code_id_foreign` (`promo_code_id`),
  ADD KEY `plans_users_currency_id_foreign` (`currency_id`),
  ADD KEY `plans_users_transaction_id_foreign` (`transaction_id`);

--
-- Indexes for table `plans_users_to_sales_coupons`
--
ALTER TABLE `plans_users_to_sales_coupons`
  ADD PRIMARY KEY (`id`),
  ADD KEY `plans_users_to_sales_coupons_plan_user_id_foreign` (`plan_user_id`),
  ADD KEY `plans_users_to_sales_coupons_sales_coupon_id_foreign` (`sales_coupon_id`);

--
-- Indexes for table `plans_versions`
--
ALTER TABLE `plans_versions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `plan_options_costs`
--
ALTER TABLE `plan_options_costs`
  ADD PRIMARY KEY (`id`),
  ADD KEY `plan_options_costs_price_plan_option_id_foreign` (`price_plan_option_id`),
  ADD KEY `plan_options_costs_currency_id_foreign` (`currency_id`),
  ADD KEY `plan_options_costs_version_id_foreign` (`version_id`);

--
-- Indexes for table `portal_skins`
--
ALTER TABLE `portal_skins`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `price_functionality`
--
ALTER TABLE `price_functionality`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `price_option_types`
--
ALTER TABLE `price_option_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `price_periods`
--
ALTER TABLE `price_periods`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `price_plan_options`
--
ALTER TABLE `price_plan_options`
  ADD PRIMARY KEY (`id`),
  ADD KEY `price_plan_options_version_id_foreign` (`version_id`),
  ADD KEY `price_plan_options_price_option_type_id_foreign` (`price_option_type_id`);

--
-- Indexes for table `price_types`
--
ALTER TABLE `price_types`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `projects`
--
ALTER TABLE `projects`
  ADD PRIMARY KEY (`project_id`),
  ADD KEY `projects_user_id_foreign` (`user_id`),
  ADD KEY `projects_editor_id_foreign` (`editor_id`);

--
-- Indexes for table `projects_deleted`
--
ALTER TABLE `projects_deleted`
  ADD PRIMARY KEY (`id`),
  ADD KEY `projects_deleted_project_id_foreign` (`project_id`),
  ADD KEY `projects_deleted_user_id_foreign` (`user_id`);

--
-- Indexes for table `projects_demos`
--
ALTER TABLE `projects_demos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `projects_demos_project_id_foreign` (`project_id`),
  ADD KEY `projects_demos_user_id_foreign` (`user_id`);

--
-- Indexes for table `project_version`
--
ALTER TABLE `project_version`
  ADD PRIMARY KEY (`id`),
  ADD KEY `project_version_project_id_foreign` (`project_id`),
  ADD KEY `project_version_user_id_foreign` (`user_id`);

--
-- Indexes for table `promo_codes`
--
ALTER TABLE `promo_codes`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `promo_codes_code_unique` (`code`);

--
-- Indexes for table `promo_codes_to_users`
--
ALTER TABLE `promo_codes_to_users`
  ADD PRIMARY KEY (`id`),
  ADD KEY `promo_codes_to_users_user_id_foreign` (`user_id`),
  ADD KEY `promo_codes_to_users_promo_code_id_foreign` (`promo_code_id`);

--
-- Indexes for table `reselers_to_distributors`
--
ALTER TABLE `reselers_to_distributors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `reselers_to_distributors_reseler_id_foreign` (`reseler_id`),
  ADD KEY `reselers_to_distributors_distributor_id_foreign` (`distributor_id`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `roles_name_unique` (`name`);

--
-- Indexes for table `role_user`
--
ALTER TABLE `role_user`
  ADD PRIMARY KEY (`user_id`,`role_id`),
  ADD KEY `role_user_role_id_foreign` (`role_id`);

--
-- Indexes for table `sales_coupons`
--
ALTER TABLE `sales_coupons`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `sales_coupons_code_unique` (`code`),
  ADD KEY `sales_coupons_sales_coupon_group_id_foreign` (`sales_coupon_group_id`),
  ADD KEY `sales_coupons_plan_id_foreign` (`plan_id`);

--
-- Indexes for table `sales_coupons_groups`
--
ALTER TABLE `sales_coupons_groups`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `scorm`
--
ALTER TABLE `scorm`
  ADD PRIMARY KEY (`id`),
  ADD KEY `scorm_user_id_foreign` (`user_id`),
  ADD KEY `scorm_course_id_foreign` (`course_id`);

--
-- Indexes for table `scorm_data`
--
ALTER TABLE `scorm_data`
  ADD PRIMARY KEY (`id`),
  ADD KEY `scorm_data_user_id_foreign` (`user_id`),
  ADD KEY `scorm_data_course_id_foreign` (`course_id`);

--
-- Indexes for table `scorm_data_guest`
--
ALTER TABLE `scorm_data_guest`
  ADD PRIMARY KEY (`id`),
  ADD KEY `scorm_data_guest_course_id_foreign` (`course_id`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD UNIQUE KEY `sessions_id_unique` (`id`);

--
-- Indexes for table `share`
--
ALTER TABLE `share`
  ADD PRIMARY KEY (`id`),
  ADD KEY `share_user_id_foreign` (`user_id`),
  ADD KEY `share_project_id_foreign` (`project_id`);

--
-- Indexes for table `share_noexists`
--
ALTER TABLE `share_noexists`
  ADD PRIMARY KEY (`id`),
  ADD KEY `share_noexists_project_id_foreign` (`project_id`);

--
-- Indexes for table `share_user_template`
--
ALTER TABLE `share_user_template`
  ADD PRIMARY KEY (`id`),
  ADD KEY `share_user_template_owner_id_foreign` (`owner_id`),
  ADD KEY `share_user_template_user_id_foreign` (`user_id`),
  ADD KEY `share_user_template_template_id_foreign` (`template_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `users_email_unique` (`email`);

--
-- Indexes for table `users_to_aplications_api`
--
ALTER TABLE `users_to_aplications_api`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_to_aplications_api_user_id_foreign` (`user_id`),
  ADD KEY `users_to_aplications_api_aplication_api_id_foreign` (`aplication_api_id`);

--
-- Indexes for table `users_to_distributors`
--
ALTER TABLE `users_to_distributors`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_to_distributors_user_id_foreign` (`user_id`),
  ADD KEY `users_to_distributors_distributor_id_foreign` (`distributor_id`);

--
-- Indexes for table `users_to_distributors_rabats`
--
ALTER TABLE `users_to_distributors_rabats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_to_distributors_rabats_user_id_foreign` (`user_id`),
  ADD KEY `users_to_distributors_rabats_currency_id_foreign` (`currency_id`);

--
-- Indexes for table `users_to_promo_codes`
--
ALTER TABLE `users_to_promo_codes`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_to_promo_codes_user_id_foreign` (`user_id`),
  ADD KEY `users_to_promo_codes_promo_code_id_foreign` (`promo_code_id`);

--
-- Indexes for table `users_to_reselers`
--
ALTER TABLE `users_to_reselers`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_to_reselers_user_id_foreign` (`user_id`),
  ADD KEY `users_to_reselers_reseler_id_foreign` (`reseler_id`);

--
-- Indexes for table `users_to_reselers_rabats`
--
ALTER TABLE `users_to_reselers_rabats`
  ADD PRIMARY KEY (`id`),
  ADD KEY `users_to_reselers_rabats_user_id_foreign` (`user_id`),
  ADD KEY `users_to_reselers_rabats_currency_id_foreign` (`currency_id`);

--
-- Indexes for table `user_login`
--
ALTER TABLE `user_login`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_login_user_id_foreign` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `api_tokens`
--
ALTER TABLE `api_tokens`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `aplication_admin_api_to_aplication_api`
--
ALTER TABLE `aplication_admin_api_to_aplication_api`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `aplication_api`
--
ALTER TABLE `aplication_api`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `aplication_api_roles`
--
ALTER TABLE `aplication_api_roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `banners_categories`
--
ALTER TABLE `banners_categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `banners_domain`
--
ALTER TABLE `banners_domain`
  MODIFY `id_banner_domain` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `banners_projects`
--
ALTER TABLE `banners_projects`
  MODIFY `id_banner` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=58;

--
-- AUTO_INCREMENT for table `banners_projects_external`
--
ALTER TABLE `banners_projects_external`
  MODIFY `id_banner` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `banners_shared`
--
ALTER TABLE `banners_shared`
  MODIFY `id_shared` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `banners_to_categories`
--
ALTER TABLE `banners_to_categories`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `clients_addresses`
--
ALTER TABLE `clients_addresses`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `clients_cities`
--
ALTER TABLE `clients_cities`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `clients_zip_codes`
--
ALTER TABLE `clients_zip_codes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cron_emails_types`
--
ALTER TABLE `cron_emails_types`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `cron_email_type_to_plan_user`
--
ALTER TABLE `cron_email_type_to_plan_user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cron_email_type_to_user`
--
ALTER TABLE `cron_email_type_to_user`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `currencies`
--
ALTER TABLE `currencies`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `editors`
--
ALTER TABLE `editors`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `forms_of_payment`
--
ALTER TABLE `forms_of_payment`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `groups`
--
ALTER TABLE `groups`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `lms_invitation_requests`
--
ALTER TABLE `lms_invitation_requests`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `lms_user_portal`
--
ALTER TABLE `lms_user_portal`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `lms_user_portal_paid`
--
ALTER TABLE `lms_user_portal_paid`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `mailing_groups`
--
ALTER TABLE `mailing_groups`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `mailing_users`
--
ALTER TABLE `mailing_users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `migrations`
--
ALTER TABLE `migrations`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=90;

--
-- AUTO_INCREMENT for table `on_off_states`
--
ALTER TABLE `on_off_states`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `payments`
--
ALTER TABLE `payments`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;

--
-- AUTO_INCREMENT for table `permissions`
--
ALTER TABLE `permissions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `plans`
--
ALTER TABLE `plans`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `plans_costs`
--
ALTER TABLE `plans_costs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `plans_options`
--
ALTER TABLE `plans_options`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `plans_period_types`
--
ALTER TABLE `plans_period_types`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `plans_to_plans_costs`
--
ALTER TABLE `plans_to_plans_costs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `plans_to_plans_options`
--
ALTER TABLE `plans_to_plans_options`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- AUTO_INCREMENT for table `plans_to_price_list`
--
ALTER TABLE `plans_to_price_list`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `plans_users`
--
ALTER TABLE `plans_users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=133;

--
-- AUTO_INCREMENT for table `plans_users_to_sales_coupons`
--
ALTER TABLE `plans_users_to_sales_coupons`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `plans_versions`
--
ALTER TABLE `plans_versions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `plan_options_costs`
--
ALTER TABLE `plan_options_costs`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `portal_skins`
--
ALTER TABLE `portal_skins`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `price_functionality`
--
ALTER TABLE `price_functionality`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `price_option_types`
--
ALTER TABLE `price_option_types`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `price_periods`
--
ALTER TABLE `price_periods`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `price_plan_options`
--
ALTER TABLE `price_plan_options`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=21;

--
-- AUTO_INCREMENT for table `price_types`
--
ALTER TABLE `price_types`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `projects`
--
ALTER TABLE `projects`
  MODIFY `project_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=369;

--
-- AUTO_INCREMENT for table `projects_deleted`
--
ALTER TABLE `projects_deleted`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `projects_demos`
--
ALTER TABLE `projects_demos`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `project_version`
--
ALTER TABLE `project_version`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `promo_codes`
--
ALTER TABLE `promo_codes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `promo_codes_to_users`
--
ALTER TABLE `promo_codes_to_users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `reselers_to_distributors`
--
ALTER TABLE `reselers_to_distributors`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- AUTO_INCREMENT for table `sales_coupons`
--
ALTER TABLE `sales_coupons`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `sales_coupons_groups`
--
ALTER TABLE `sales_coupons_groups`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `scorm`
--
ALTER TABLE `scorm`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `scorm_data`
--
ALTER TABLE `scorm_data`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=82;

--
-- AUTO_INCREMENT for table `scorm_data_guest`
--
ALTER TABLE `scorm_data_guest`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=106;

--
-- AUTO_INCREMENT for table `share`
--
ALTER TABLE `share`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=125;

--
-- AUTO_INCREMENT for table `share_noexists`
--
ALTER TABLE `share_noexists`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `share_user_template`
--
ALTER TABLE `share_user_template`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=135;

--
-- AUTO_INCREMENT for table `users_to_aplications_api`
--
ALTER TABLE `users_to_aplications_api`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users_to_distributors`
--
ALTER TABLE `users_to_distributors`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users_to_distributors_rabats`
--
ALTER TABLE `users_to_distributors_rabats`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `users_to_promo_codes`
--
ALTER TABLE `users_to_promo_codes`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `users_to_reselers`
--
ALTER TABLE `users_to_reselers`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users_to_reselers_rabats`
--
ALTER TABLE `users_to_reselers_rabats`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `user_login`
--
ALTER TABLE `user_login`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=172;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `api_tokens`
--
ALTER TABLE `api_tokens`
  ADD CONSTRAINT `api_tokens_api_key_id_foreign` FOREIGN KEY (`api_key_id`) REFERENCES `aplication_api` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `aplication_admin_api_to_aplication_api`
--
ALTER TABLE `aplication_admin_api_to_aplication_api`
  ADD CONSTRAINT `aplication_admin_api_to_aplication_api_admin_api_key_id_foreign` FOREIGN KEY (`admin_api_key_id`) REFERENCES `aplication_api` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `aplication_admin_api_to_aplication_api_api_key_id_foreign` FOREIGN KEY (`api_key_id`) REFERENCES `aplication_api` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `aplication_api`
--
ALTER TABLE `aplication_api`
  ADD CONSTRAINT `aplication_api_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `aplication_api_roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `banners_categories`
--
ALTER TABLE `banners_categories`
  ADD CONSTRAINT `banners_categories_owner_id_foreign` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `banners_domain`
--
ALTER TABLE `banners_domain`
  ADD CONSTRAINT `banners_domain_banner_id_foreign` FOREIGN KEY (`banner_id`) REFERENCES `banners_projects` (`id_banner`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `banners_projects`
--
ALTER TABLE `banners_projects`
  ADD CONSTRAINT `banners_projects_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `banners_projects_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `banners_projects_external`
--
ALTER TABLE `banners_projects_external`
  ADD CONSTRAINT `banners_projects_external_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `banners_projects_external_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `banners_shared`
--
ALTER TABLE `banners_shared`
  ADD CONSTRAINT `banners_shared_banner_id_foreign` FOREIGN KEY (`banner_id`) REFERENCES `banners_projects` (`id_banner`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `banners_shared_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `banners_to_categories`
--
ALTER TABLE `banners_to_categories`
  ADD CONSTRAINT `banners_to_categories_category_id_foreign` FOREIGN KEY (`category_id`) REFERENCES `banners_categories` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `banners_to_categories_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `banners_projects` (`id_banner`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `clients_addresses`
--
ALTER TABLE `clients_addresses`
  ADD CONSTRAINT `clients_addresses_city_id_foreign` FOREIGN KEY (`city_id`) REFERENCES `clients_cities` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `clients_addresses_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `clients_addresses_zip_code_id_foreign` FOREIGN KEY (`zip_code_id`) REFERENCES `clients_zip_codes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cron_email_type_to_plan_user`
--
ALTER TABLE `cron_email_type_to_plan_user`
  ADD CONSTRAINT `cron_email_type_to_plan_user_cron_email_type_id_foreign` FOREIGN KEY (`cron_email_type_id`) REFERENCES `cron_emails_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cron_email_type_to_plan_user_plan_user_id_foreign` FOREIGN KEY (`plan_user_id`) REFERENCES `plans_users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `cron_email_type_to_user`
--
ALTER TABLE `cron_email_type_to_user`
  ADD CONSTRAINT `cron_email_type_to_user_cron_email_type_id_foreign` FOREIGN KEY (`cron_email_type_id`) REFERENCES `cron_emails_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `cron_email_type_to_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `groups`
--
ALTER TABLE `groups`
  ADD CONSTRAINT `groups_id_owner_foreign` FOREIGN KEY (`id_owner`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `group_banner`
--
ALTER TABLE `group_banner`
  ADD CONSTRAINT `group_banner_id_banner_foreign` FOREIGN KEY (`id_banner`) REFERENCES `banners_projects` (`id_banner`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `group_banner_id_group_foreign` FOREIGN KEY (`id_group`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `group_user`
--
ALTER TABLE `group_user`
  ADD CONSTRAINT `group_user_id_group_foreign` FOREIGN KEY (`id_group`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `group_user_id_user_foreign` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `lms_group_content`
--
ALTER TABLE `lms_group_content`
  ADD CONSTRAINT `lms_group_content_content_id_foreign` FOREIGN KEY (`content_id`) REFERENCES `banners_projects` (`id_banner`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `lms_group_content_group_id_foreign` FOREIGN KEY (`group_id`) REFERENCES `groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `lms_info`
--
ALTER TABLE `lms_info`
  ADD CONSTRAINT `lms_info_skin_foreign` FOREIGN KEY (`skin`) REFERENCES `portal_skins` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `lms_info_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `lms_invitation_requests`
--
ALTER TABLE `lms_invitation_requests`
  ADD CONSTRAINT `lms_invitation_requests_owner_id_foreign` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `lms_invitation_requests_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `lms_scorm_data`
--
ALTER TABLE `lms_scorm_data`
  ADD CONSTRAINT `lms_scorm_data_content_id_foreign` FOREIGN KEY (`content_id`) REFERENCES `banners_projects` (`id_banner`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `lms_scorm_data_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `lms_scorm_data_guest`
--
ALTER TABLE `lms_scorm_data_guest`
  ADD CONSTRAINT `lms_scorm_data_guest_content_id_foreign` FOREIGN KEY (`content_id`) REFERENCES `banners_projects` (`id_banner`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `lms_user_portal`
--
ALTER TABLE `lms_user_portal`
  ADD CONSTRAINT `lms_user_portal_portal_admin_foreign` FOREIGN KEY (`portal_admin`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `lms_user_portal_user_foreign` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `lms_user_portal_paid`
--
ALTER TABLE `lms_user_portal_paid`
  ADD CONSTRAINT `lms_user_portal_paid_portal_admin_foreign` FOREIGN KEY (`portal_admin`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `lms_user_portal_paid_user_foreign` FOREIGN KEY (`user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `mailing_groups`
--
ALTER TABLE `mailing_groups`
  ADD CONSTRAINT `mailing_groups_id_owner_foreign` FOREIGN KEY (`id_owner`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `mailing_group_user`
--
ALTER TABLE `mailing_group_user`
  ADD CONSTRAINT `mailing_group_user_id_group_foreign` FOREIGN KEY (`id_group`) REFERENCES `mailing_groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `mailing_group_user_id_user_foreign` FOREIGN KEY (`id_user`) REFERENCES `mailing_users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `permission_role`
--
ALTER TABLE `permission_role`
  ADD CONSTRAINT `permission_role_permission_id_foreign` FOREIGN KEY (`permission_id`) REFERENCES `permissions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `permission_role_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `plans`
--
ALTER TABLE `plans`
  ADD CONSTRAINT `plans_form_of_payment_id_foreign` FOREIGN KEY (`form_of_payment_id`) REFERENCES `forms_of_payment` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `plans_plans_period_type_id_foreign` FOREIGN KEY (`plans_period_type_id`) REFERENCES `plans_period_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `plans_version_id_foreign` FOREIGN KEY (`version_id`) REFERENCES `plans_versions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `plans_costs`
--
ALTER TABLE `plans_costs`
  ADD CONSTRAINT `plans_costs_currency_id_foreign` FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `plans_costs_plan_id_foreign` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `plans_costs_version_id_foreign` FOREIGN KEY (`version_id`) REFERENCES `plans_versions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `plans_options`
--
ALTER TABLE `plans_options`
  ADD CONSTRAINT `plans_options_version_id_foreign` FOREIGN KEY (`version_id`) REFERENCES `plans_versions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `plans_to_plans_costs`
--
ALTER TABLE `plans_to_plans_costs`
  ADD CONSTRAINT `plans_to_plans_costs_plan_cost_id_foreign` FOREIGN KEY (`plan_cost_id`) REFERENCES `plans_costs` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `plans_to_plans_costs_plan_id_foreign` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `plans_to_plans_options`
--
ALTER TABLE `plans_to_plans_options`
  ADD CONSTRAINT `plans_to_plans_options_plan_id_foreign` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `plans_to_plans_options_plan_option_id_foreign` FOREIGN KEY (`plan_option_id`) REFERENCES `plans_options` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `plans_to_price_list`
--
ALTER TABLE `plans_to_price_list`
  ADD CONSTRAINT `plans_to_price_list_plan_id_foreign` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `plans_to_price_list_price_period_id_foreign` FOREIGN KEY (`price_period_id`) REFERENCES `price_periods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `plans_to_price_list_price_type_id_foreign` FOREIGN KEY (`price_type_id`) REFERENCES `price_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `plans_to_price_list_version_id_foreign` FOREIGN KEY (`version_id`) REFERENCES `plans_versions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `plans_users`
--
ALTER TABLE `plans_users`
  ADD CONSTRAINT `plans_users_created_by_user_id_foreign` FOREIGN KEY (`created_by_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `plans_users_currency_id_foreign` FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `plans_users_paying_user_id_foreign` FOREIGN KEY (`paying_user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `plans_users_plan_id_foreign` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `plans_users_promo_code_id_foreign` FOREIGN KEY (`promo_code_id`) REFERENCES `promo_codes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `plans_users_transaction_id_foreign` FOREIGN KEY (`transaction_id`) REFERENCES `transactions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `plans_users_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `plans_users_to_sales_coupons`
--
ALTER TABLE `plans_users_to_sales_coupons`
  ADD CONSTRAINT `plans_users_to_sales_coupons_plan_user_id_foreign` FOREIGN KEY (`plan_user_id`) REFERENCES `plans_users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `plans_users_to_sales_coupons_sales_coupon_id_foreign` FOREIGN KEY (`sales_coupon_id`) REFERENCES `sales_coupons` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `plan_options_costs`
--
ALTER TABLE `plan_options_costs`
  ADD CONSTRAINT `plan_options_costs_currency_id_foreign` FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `plan_options_costs_price_plan_option_id_foreign` FOREIGN KEY (`price_plan_option_id`) REFERENCES `price_plan_options` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `plan_options_costs_version_id_foreign` FOREIGN KEY (`version_id`) REFERENCES `plans_versions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `price_plan_options`
--
ALTER TABLE `price_plan_options`
  ADD CONSTRAINT `price_plan_options_price_option_type_id_foreign` FOREIGN KEY (`price_option_type_id`) REFERENCES `price_option_types` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `price_plan_options_version_id_foreign` FOREIGN KEY (`version_id`) REFERENCES `plans_versions` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `projects`
--
ALTER TABLE `projects`
  ADD CONSTRAINT `projects_editor_id_foreign` FOREIGN KEY (`editor_id`) REFERENCES `editors` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `projects_deleted`
--
ALTER TABLE `projects_deleted`
  ADD CONSTRAINT `projects_deleted_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_deleted_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `projects_demos`
--
ALTER TABLE `projects_demos`
  ADD CONSTRAINT `projects_demos_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `projects_demos_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `project_version`
--
ALTER TABLE `project_version`
  ADD CONSTRAINT `project_version_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `project_version_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `promo_codes_to_users`
--
ALTER TABLE `promo_codes_to_users`
  ADD CONSTRAINT `promo_codes_to_users_promo_code_id_foreign` FOREIGN KEY (`promo_code_id`) REFERENCES `promo_codes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `promo_codes_to_users_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `reselers_to_distributors`
--
ALTER TABLE `reselers_to_distributors`
  ADD CONSTRAINT `reselers_to_distributors_distributor_id_foreign` FOREIGN KEY (`distributor_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `reselers_to_distributors_reseler_id_foreign` FOREIGN KEY (`reseler_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `role_user`
--
ALTER TABLE `role_user`
  ADD CONSTRAINT `role_user_role_id_foreign` FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `role_user_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `sales_coupons`
--
ALTER TABLE `sales_coupons`
  ADD CONSTRAINT `sales_coupons_plan_id_foreign` FOREIGN KEY (`plan_id`) REFERENCES `plans` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `sales_coupons_sales_coupon_group_id_foreign` FOREIGN KEY (`sales_coupon_group_id`) REFERENCES `sales_coupons_groups` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `scorm`
--
ALTER TABLE `scorm`
  ADD CONSTRAINT `scorm_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `banners_projects` (`id_banner`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `scorm_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `scorm_data`
--
ALTER TABLE `scorm_data`
  ADD CONSTRAINT `scorm_data_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `banners_projects` (`id_banner`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `scorm_data_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `scorm_data_guest`
--
ALTER TABLE `scorm_data_guest`
  ADD CONSTRAINT `scorm_data_guest_course_id_foreign` FOREIGN KEY (`course_id`) REFERENCES `banners_projects` (`id_banner`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `share`
--
ALTER TABLE `share`
  ADD CONSTRAINT `share_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `share_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `share_noexists`
--
ALTER TABLE `share_noexists`
  ADD CONSTRAINT `share_noexists_project_id_foreign` FOREIGN KEY (`project_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `share_user_template`
--
ALTER TABLE `share_user_template`
  ADD CONSTRAINT `share_user_template_owner_id_foreign` FOREIGN KEY (`owner_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `share_user_template_template_id_foreign` FOREIGN KEY (`template_id`) REFERENCES `projects` (`project_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `share_user_template_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users_to_aplications_api`
--
ALTER TABLE `users_to_aplications_api`
  ADD CONSTRAINT `users_to_aplications_api_aplication_api_id_foreign` FOREIGN KEY (`aplication_api_id`) REFERENCES `aplication_api` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_to_aplications_api_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users_to_distributors`
--
ALTER TABLE `users_to_distributors`
  ADD CONSTRAINT `users_to_distributors_distributor_id_foreign` FOREIGN KEY (`distributor_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_to_distributors_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users_to_distributors_rabats`
--
ALTER TABLE `users_to_distributors_rabats`
  ADD CONSTRAINT `users_to_distributors_rabats_currency_id_foreign` FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_to_distributors_rabats_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users_to_promo_codes`
--
ALTER TABLE `users_to_promo_codes`
  ADD CONSTRAINT `users_to_promo_codes_promo_code_id_foreign` FOREIGN KEY (`promo_code_id`) REFERENCES `promo_codes` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_to_promo_codes_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users_to_reselers`
--
ALTER TABLE `users_to_reselers`
  ADD CONSTRAINT `users_to_reselers_reseler_id_foreign` FOREIGN KEY (`reseler_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_to_reselers_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `users_to_reselers_rabats`
--
ALTER TABLE `users_to_reselers_rabats`
  ADD CONSTRAINT `users_to_reselers_rabats_currency_id_foreign` FOREIGN KEY (`currency_id`) REFERENCES `currencies` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `users_to_reselers_rabats_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_login`
--
ALTER TABLE `user_login`
  ADD CONSTRAINT `user_login_user_id_foreign` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
