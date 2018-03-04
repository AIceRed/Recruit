-- phpMyAdmin SQL Dump
-- version 4.7.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: 2018-03-04 07:53:26
-- 服务器版本： 5.7.19
-- PHP Version: 5.6.31

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `recruit`
--

-- --------------------------------------------------------

--
-- 表的结构 `administrator`
--

DROP TABLE IF EXISTS `administrator`;
CREATE TABLE IF NOT EXISTS `administrator` (
  `id` int(11) NOT NULL,
  `account` varchar(50) COLLATE utf8_bin NOT NULL,
  `password` varchar(30) COLLATE utf8_bin NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `administrator`
--

INSERT INTO `administrator` (`id`, `account`, `password`) VALUES
(3, 'admin', '123');

-- --------------------------------------------------------

--
-- 表的结构 `candidate`
--

DROP TABLE IF EXISTS `candidate`;
CREATE TABLE IF NOT EXISTS `candidate` (
  `id` int(11) DEFAULT NULL,
  `account` varchar(50) COLLATE utf8_bin NOT NULL,
  `password` varchar(30) COLLATE utf8_bin NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `candidate`
--

INSERT INTO `candidate` (`id`, `account`, `password`) VALUES
(1, '1', '1'),
(1, '123', '1');

-- --------------------------------------------------------

--
-- 表的结构 `interviewer`
--

DROP TABLE IF EXISTS `interviewer`;
CREATE TABLE IF NOT EXISTS `interviewer` (
  `id` int(11) NOT NULL,
  `account` varchar(50) COLLATE utf8_bin NOT NULL,
  `password` varchar(30) COLLATE utf8_bin NOT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `interviewer`
--

INSERT INTO `interviewer` (`id`, `account`, `password`) VALUES
(2, '2', '2'),
(2, '3', '3');

-- --------------------------------------------------------

--
-- 表的结构 `profile`
--

DROP TABLE IF EXISTS `profile`;
CREATE TABLE IF NOT EXISTS `profile` (
  `account` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `address` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `introduce` varchar(2000) COLLATE utf8_bin DEFAULT NULL,
  `type` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `num` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `post` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `tel` varchar(20) COLLATE utf8_bin DEFAULT NULL
) ENGINE=MyISAM DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `profile`
--

INSERT INTO `profile` (`account`, `name`, `address`, `introduce`, `type`, `num`, `post`, `tel`) VALUES
('2', '招聘网', '无', '无', '不详', '200', '123@163.com', '138-3333-2133'),
('3', '招聘', '无', '无', '不详', '200', '123@qq.com', '123123');

-- --------------------------------------------------------

--
-- 表的结构 `recruit`
--

DROP TABLE IF EXISTS `recruit`;
CREATE TABLE IF NOT EXISTS `recruit` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `account` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `name` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `position` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `experiencetime` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `salary` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `data` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `welfare` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `positionmessage` varchar(2000) COLLATE utf8_bin DEFAULT NULL,
  `tel` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `postbox` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=10 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `recruit`
--

INSERT INTO `recruit` (`id`, `account`, `name`, `position`, `experiencetime`, `salary`, `data`, `welfare`, `positionmessage`, `tel`, `postbox`) VALUES
(4, '2', '招聘网', '前端开发', '无', '3000', '2月10日', '无', '无', '138-3333-2133', '123@qq.com'),
(7, '2', '招聘网', '后台', '无', '1000-3000', '2月26日', '无', '无', '138-3333-2133', '111.@163.com'),
(6, '3', '招聘', '前端', '无', '1000-3000', '2月10日', '无', '无', '138-3333-2133', '111.@163.com'),
(8, '2', '招聘', 'web前端开发', '无', '3000-5000', '3月2日', '无', '无', '13303331232', '123@qq.com'),
(9, '2', '招聘', 'web前端开发', '无', '3000-5000', '3月2日', '无', '无', '13303331232', '123@qq.com');

-- --------------------------------------------------------

--
-- 表的结构 `resumes`
--

DROP TABLE IF EXISTS `resumes`;
CREATE TABLE IF NOT EXISTS `resumes` (
  `account` varchar(50) COLLATE utf8_bin NOT NULL,
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `sex` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `level` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `birthday` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `postbox` varchar(50) COLLATE utf8_bin DEFAULT NULL,
  `salary` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `position` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `time` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `experiencetime` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `data1` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `data2` varchar(10) COLLATE utf8_bin DEFAULT NULL,
  `school` varchar(30) COLLATE utf8_bin DEFAULT NULL,
  `major` varchar(40) COLLATE utf8_bin DEFAULT NULL,
  `record` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `experience` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `skill` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `diploma` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `accessorname` varchar(20) COLLATE utf8_bin DEFAULT NULL,
  `accessorintroduce` varchar(200) COLLATE utf8_bin DEFAULT NULL,
  `accessororiginal` longblob,
  PRIMARY KEY (`id`)
) ENGINE=MyISAM AUTO_INCREMENT=2 DEFAULT CHARSET=utf8 COLLATE=utf8_bin;

--
-- 转存表中的数据 `resumes`
--

INSERT INTO `resumes` (`account`, `id`, `name`, `sex`, `level`, `birthday`, `postbox`, `salary`, `position`, `time`, `experiencetime`, `data1`, `data2`, `school`, `major`, `record`, `experience`, `skill`, `diploma`, `accessorname`, `accessorintroduce`, `accessororiginal`) VALUES
('1', 1, '贾启圣', '男', 'B', '1995-11', '2628279941@qq.com', '1000-3000', '前端开发', '随时', '无', '2015-06', '2015-06', '大连理工大学城市学院', '计算机科学与技术', '本科', '暂无', '暂无', '暂无', NULL, NULL, NULL);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
