-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 20, 2024 at 11:25 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `vacation_project`
--
CREATE DATABASE IF NOT EXISTS `vacation_project` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
USE `vacation_project`;

-- --------------------------------------------------------

--
-- Table structure for table `contacts`
--

CREATE TABLE `contacts` (
  `name` varchar(40) NOT NULL,
  `email` varchar(50) NOT NULL,
  `message` varchar(400) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `contacts`
--

INSERT INTO `contacts` (`name`, `email`, `message`) VALUES
('yona', 'yona@yawoo.com', 'please send me information about the vacation in Monacco');

-- --------------------------------------------------------

--
-- Table structure for table `follows`
--

CREATE TABLE `follows` (
  `userID` int(11) NOT NULL,
  `vacationID` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `follows`
--

INSERT INTO `follows` (`userID`, `vacationID`) VALUES
(1, 2),
(3, 5),
(3, 3),
(2, 2),
(2, 1),
(2, 9),
(15, 4),
(15, 9),
(15, 1),
(15, 7),
(16, 4),
(16, 1),
(18, 12),
(18, 13),
(18, 10),
(19, 4),
(21, 1),
(17, 4);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userID` int(11) NOT NULL,
  `firstname` varchar(40) NOT NULL,
  `lastname` varchar(40) NOT NULL,
  `username` varchar(50) NOT NULL,
  `password` varchar(200) NOT NULL,
  `role` enum('Admin','User') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userID`, `firstname`, `lastname`, `username`, `password`, `role`) VALUES
(16, 'yona', 'Crespine', 'yoyo@gmail.com', 'bcd3962df9ab2f3d9668279bafac5888f64f30419b4467c648586d000598b0033de999b82894ee22fbf1fe571a406a4bc273b122c8b7e913f1d2f55cfa8d644c', 'User'),
(17, 'noa', 'Levy', 'noalevy@gmail.com', 'a2b4116ee11a2cffc4fed65289909a8bcc3e1255595ab59a7e23ae32cbccad6c9af63ad2e2b0400f77a2db3cdc3e10c383ffb6fa41cf527c1fb657ba7b64a283', 'User'),
(18, 'arie', 'crespine', 'arie@gmail.com', '568616746e4cf1ab19eac90caab902a022635a50c0f37204e736a9fb9723bb1b8319c6165a017b74f7ea0f4d036416c374acc8709a06cd55663eec5b044ba9a0', 'User'),
(19, 'aharon', 'Levy', 'aharonlevy@gmail.com', 'cd08b826be961ca291afe69274168126b1e52842f22c6443943a83ccb044cfc531f297e45e14f782de1fdd72f1e28ae3cac52e4dd2b7633de662dc796a9a092c', 'User'),
(20, 'moche', 'muchon', 'moche@gmail.com', '41d8b55f7a5396e0baca7dabf011e2299a31f67842397ceecb1418d782e880e03e1b65151c3aa127137b93b85800efea608aa5bebb7b0db7b33a260e36bf79e6', 'Admin'),
(21, 'david', 'benhamou', 'davidben@gmail.com', 'd7a29cd7d6a236c3c8c4f4598df02f06c27ee3f04223d4c1ef197540b3fd8f1b068267bf60dcde09e7cf95ac6bcbdf3426e6890f24a41a06c31295ce883e230c', 'User');

-- --------------------------------------------------------

--
-- Table structure for table `vacations`
--

CREATE TABLE `vacations` (
  `vacationID` int(11) NOT NULL,
  `destination` varchar(50) NOT NULL,
  `description` varchar(400) NOT NULL,
  `placesToVisit` varchar(400) NOT NULL,
  `arrivalDate` date NOT NULL,
  `departureDate` date NOT NULL,
  `price` int(11) NOT NULL,
  `imageName` varchar(100) NOT NULL,
  `follow` varchar(40) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `vacations`
--

INSERT INTO `vacations` (`vacationID`, `destination`, `description`, `placesToVisit`, `arrivalDate`, `departureDate`, `price`, `imageName`, `follow`) VALUES
(1, 'Tokyo,Japan', 'Immerse yourself in the vibrant culture of Tokyo, experience the hustle and bustle of Shibuya Crossing, and savor authentic Japanese sushi.', 'Shibuya Crossing, Tokyo Disneyland, Tsukiji Fish Market', '2024-06-17', '2024-06-22', 2300, 'tokyo.jpg', ''),
(2, 'Paris, France', 'Explore the romantic streets of Paris, visit iconic landmarks like the Eiffel Tower and Louvre Museum, and indulge in delicious French cuisine.', 'Eiffel Tower, Louvre Museum, Notre Dame Cathedral', '2024-07-10', '2024-07-17', 3000, 'paris.jpg', ''),
(3, 'Rome, Italy', 'Discover the ancient history of Rome as you explore the Colosseum and Roman Forum, and indulge in mouthwatering Italian gelato.', 'Colosseum, Roman Forum, Trevi Fountain', '2024-08-06', '2024-08-22', 2800, 'roma.jpg', ''),
(4, 'Cape Town, South Africa', ' Experience the breathtaking beauty of Cape Town\'s landscapes, from Table Mountain to the stunning beaches, and sample delicious South African wines.', 'Table Mountain, Robben Island, Kirstenbosch National Botanical Garden', '2024-06-11', '2024-07-01', 3100, 'capTown.jpg', ''),
(5, 'New York City, USA', 'Dive into the energetic atmosphere of New York City, explore world-famous attractions like Times Square and Central Park, and dine at diverse restaurants.', 'Times Square, Central Park, Statue of Liberty', '2024-12-11', '2024-12-20', 2600, 'newYork.jpg', ''),
(6, ' Barcelona, Spain', 'Experience the vibrant street life of Barcelona, marvel at the architecture of Antoni Gaudí, and indulge in delicious tapas.', 'Sagrada Família, Park Güell, Gothic Quarter', '2024-08-15', '2024-08-22', 2600, 'barcelona.jpg', ''),
(7, ' Sydney, Australia', 'Discover the iconic landmarks of Sydney, from the Sydney Opera House to Bondi Beach, and enjoy outdoor activities in the harbor city.', 'Sydney Opera House, Bondi Beach, Sydney Harbour Bridge', '2024-05-29', '2024-06-03', 1800, 'sidney.jpg', ''),
(8, 'Dubai, United Arab Emirates', 'Experience the luxury and opulence of Dubai, visit the world\'s tallest building, and enjoy desert safaris and shopping extravaganzas.', 'Burj Khalifa, Dubai Mall, Palm Jumeirah', '2024-12-25', '2025-01-01', 3000, 'dubai2.jpg', ''),
(9, 'Santorini, Greece', ' Experience the stunning beauty of Santorini\'s white-washed buildings against the backdrop of the Aegean Sea, explore charming villages, and indulge in delicious Greek cuisine.', 'Oia, Fira, Red Beach', '2024-06-11', '2024-06-21', 3600, 'santorini.jpg', ''),
(10, 'Rio de Janeiro, Brazil', 'Soak up the sun on the famous beaches of Rio de Janeiro, experience the energy of Carnival, and admire the breathtaking views from Sugarloaf Mountain.', 'Copacabana Beach, Christ the Redeemer, Lapa Steps', '2024-09-06', '2024-09-12', 1900, 'rioDeJaneiro.jpg', ''),
(11, 'Edinburgh, Scotland', 'Explore the historic charm of Edinburgh\'s cobblestone streets, visit medieval castles and royal palaces, and immerse yourself in the city\'s rich cultural heritage.', 'Edinburgh Castle, Royal Mile, Arthur\'s Seat', '2024-09-26', '2024-10-01', 2100, 'edinburgh.jpg', ''),
(12, 'Marrakech, Morocco', 'Immerse yourself in the vibrant colors and exotic scents of Marrakech\'s bustling souks, explore the maze-like streets of the medina, and relax in luxurious riads.', 'Jardin Majorelle, Djemaa el Fna, Bahia Palace', '2024-06-20', '2024-06-25', 2000, 'marrakech.jpg', ''),
(13, 'Tel Aviv, Israel', ' Explore the vibrant city life of Tel Aviv, relax on beautiful Mediterranean beaches, and immerse yourself in the rich history and culture of Israel.', 'Old Jaffa, Tel Aviv Promenade, Carmel Market', '2024-09-10', '2024-09-14', 1990, 'telAviv.jpg', '');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `follows`
--
ALTER TABLE `follows`
  ADD KEY `userID` (`userID`),
  ADD KEY `vacationID` (`vacationID`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userID`);

--
-- Indexes for table `vacations`
--
ALTER TABLE `vacations`
  ADD PRIMARY KEY (`vacationID`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;

--
-- AUTO_INCREMENT for table `vacations`
--
ALTER TABLE `vacations`
  MODIFY `vacationID` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
