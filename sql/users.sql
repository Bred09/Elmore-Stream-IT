-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Апр 13 2022 г., 05:44
-- Версия сервера: 10.4.22-MariaDB
-- Версия PHP: 8.1.2

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `esi`
--

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` int(255) NOT NULL,
  `role` varchar(100) NOT NULL DEFAULT 'user',
  `avatar` varchar(255) NOT NULL DEFAULT '/media/img/default_avatar.svg',
  `login` varchar(255) NOT NULL,
  `password` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `role`, `avatar`, `login`, `password`) VALUES
(1, 'gumball', '/media/avatars/gumball.jpg', 'Gumball12557', '123123'),
(2, 'character', '/media/img/default_avatar.svg', 'Matt', '123123'),
(3, 'character', '/media/img/default_avatar.svg', 'GUMBALL&DARWIN', '123123'),
(4, 'character', '/media/img/default_avatar.svg', 'TOBI55RULES', '123123'),
(5, 'character', '/media/img/default_avatar.svg', '50PENNIES', '123123'),
(6, 'character', '/media/img/default_avatar.svg', 'LEGGYCUTEFISH01', '123123'),
(7, 'character', '/media/img/default_avatar.svg', 'BENOULELOU59', '123123'),
(8, 'character', '/media/avatars/jamie.jpg', 'Jamie', '123123'),
(9, 'character', '/media/avatars/carrie.jpg', 'Carrie', '123123'),
(10, 'admin', '/media/img/default_avatar.svg', 'Bob', '123123'),
(11, 'anais', '/media/img/default_avatar.svg', 'Anais', '123123'),
(12, 'darwin', '/media/img/default_avatar.svg', 'Darwin', '123123');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `users`
--
ALTER TABLE `users`
  MODIFY `id` int(255) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
