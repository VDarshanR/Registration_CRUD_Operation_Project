-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Sep 27, 2023 at 06:25 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `darshan`
--

-- --------------------------------------------------------

--
-- Table structure for table `user_record`
--

CREATE TABLE `user_record` (
  `UserId` bigint(255) NOT NULL,
  `UserName` varchar(255) NOT NULL,
  `UserEmail` varchar(255) NOT NULL,
  `UserPhoneNumber` bigint(255) NOT NULL,
  `UserPassword` varchar(255) NOT NULL,
  `UserConfirmPassword` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_record`
--

INSERT INTO `user_record` (`UserId`, `UserName`, `UserEmail`, `UserPhoneNumber`, `UserPassword`, `UserConfirmPassword`) VALUES
(204, 'Darshan', 'darshanv1@gmail.com', 9089098765, 'Dars1@', 'Dars1@'),
(205, 'Rajeshwari', 'raji@gmail.com', 8908907654, 'Raji1@', 'Raji1@'),
(206, 'Vishwanatha', 'vish@gmail.com', 9089009809, 'Vish1@', 'Vish1@'),
(207, 'Dboss', 'dboss@gmail.com', 6786788908, 'Dboss1@', 'Dboss1@'),
(208, 'Dhoni', 'dhoni@gmail.com', 7980983212, 'Dhon1@', 'Dhon1@'),
(209, 'Johncena', 'john@gmail.com', 9123456740, 'Cena1@', 'Cena1@'),
(210, 'Messi', 'messi@gmail.com', 7894325436, 'Mess1@', 'Mess1@'),
(211, 'Sunnyleone', 'sunny@gmail.com', 9549875431, 'Sunn1@', 'Sunn1@'),
(212, 'Family', 'family@gmail.com', 8907651234, 'Fami1@', 'Fami1@'),
(213, 'Friends', 'Friends@gmail.com', 7890765412, 'Frie1@', 'Frie1@');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `user_record`
--
ALTER TABLE `user_record`
  ADD PRIMARY KEY (`UserId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `user_record`
--
ALTER TABLE `user_record`
  MODIFY `UserId` bigint(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=219;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
