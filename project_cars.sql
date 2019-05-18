-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Czas generowania: 18 Maj 2019, 12:08
-- Wersja serwera: 10.1.37-MariaDB
-- Wersja PHP: 7.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Baza danych: `project_cars`
--
CREATE DATABASE IF NOT EXISTS `project_cars` DEFAULT CHARACTER SET utf8 COLLATE utf8_bin;
USE `project_cars`;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `t_cars`
--

DROP TABLE IF EXISTS `t_cars`;
CREATE TABLE IF NOT EXISTS `t_cars` (
  `car_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` varchar(50) COLLATE utf8_bin NOT NULL,
  `img` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `cost_per_day` int(11) NOT NULL,
  PRIMARY KEY (`car_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `t_reservations`
--

DROP TABLE IF EXISTS `t_reservations`;
CREATE TABLE IF NOT EXISTS `t_reservations` (
  `user_id` int(10) UNSIGNED NOT NULL,
  `car_id` int(10) UNSIGNED NOT NULL,
  `date_from` date NOT NULL,
  `date_to` date NOT NULL,
  PRIMARY KEY (`user_id`,`car_id`,`date_from`,`date_to`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

-- --------------------------------------------------------

--
-- Struktura tabeli dla tabeli `t_users`
--

DROP TABLE IF EXISTS `t_users`;
CREATE TABLE IF NOT EXISTS `t_users` (
  `user_id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT,
  `fb_user_id` bigint(10) UNSIGNED NOT NULL,
  `admin_flag` tinyint(1) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- Ograniczenia dla zrzutów tabel
--

--
-- Ograniczenia dla tabeli `t_reservations`
--
ALTER TABLE `t_reservations`
  ADD CONSTRAINT `ct_t_reservations_car_id_fk` FOREIGN KEY (`car_id`) REFERENCES `t_cars` (`car_id`),
  ADD CONSTRAINT `ct_t_reservations_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `t_users` (`user_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
