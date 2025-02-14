-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3306
-- Tiempo de generación: 14-02-2025 a las 15:51:00
-- Versión del servidor: 9.2.0
-- Versión de PHP: 8.2.18

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `zafiro_azul`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria_producto`
--

DROP TABLE IF EXISTS `categoria_producto`;
CREATE TABLE IF NOT EXISTS `categoria_producto` (
  `ID_CATEGORIA` int NOT NULL AUTO_INCREMENT,
  `NOMBRE_CATEGORIA` varchar(50) NOT NULL,
  `DESCRIPCION_CATEGORIA` varchar(256) NOT NULL,
  PRIMARY KEY (`ID_CATEGORIA`)
) ENGINE=MyISAM AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `categoria_producto`
--

INSERT INTO `categoria_producto` (`ID_CATEGORIA`, `NOMBRE_CATEGORIA`, `DESCRIPCION_CATEGORIA`) VALUES
(1, 'categorias naturales', 'Disfruta de lo mejor de la naturaleza en cada producto.'),
(2, 'productos procesados', 'Calidad y sabor en productos listos para disfrutar.'),
(3, 'productos dulces', 'Endulza tu vida con nuestras opciones irresistibles'),
(4, 'vinagres y otros', 'Descubre sabores únicos para tu cocina.');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `detalle_pedido`
--

DROP TABLE IF EXISTS `detalle_pedido`;
CREATE TABLE IF NOT EXISTS `detalle_pedido` (
  `ID_DETALLE` int NOT NULL AUTO_INCREMENT,
  `ID_PEDIDO` int NOT NULL,
  `ID_VARIANTE` int NOT NULL,
  `CANTIDAD_VARIANTE` int NOT NULL,
  `PRECIO_UNITARIO` decimal(10,2) NOT NULL,
  `SUBTOTAL` decimal(10,2) NOT NULL,
  PRIMARY KEY (`ID_DETALLE`),
  KEY `FK_R8` (`ID_PEDIDO`),
  KEY `FK_R9` (`ID_VARIANTE`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `detalle_pedido`
--

INSERT INTO `detalle_pedido` (`ID_DETALLE`, `ID_PEDIDO`, `ID_VARIANTE`, `CANTIDAD_VARIANTE`, `PRECIO_UNITARIO`, `SUBTOTAL`) VALUES
(1, 5, 2, 500, 67830.00, 135660.00),
(2, 4, 1, 500, 1403.00, 1403.00),
(3, 3, 5, 500, 8340.00, 25020.00),
(4, 2, 6, 125, 2502.00, 15012.00),
(5, 1, 1, 500, 4865.00, 4865.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_pedido`
--

DROP TABLE IF EXISTS `estado_pedido`;
CREATE TABLE IF NOT EXISTS `estado_pedido` (
  `ID_ESTADO` int NOT NULL AUTO_INCREMENT,
  `NOMBRE_ESTADO` varchar(50) NOT NULL,
  PRIMARY KEY (`ID_ESTADO`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `estado_pedido`
--

INSERT INTO `estado_pedido` (`ID_ESTADO`, `NOMBRE_ESTADO`) VALUES
(1, 'En progreso'),
(2, 'entregado'),
(3, 'En camino'),
(4, 'cancelado'),
(5, 'despachado');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `pedido`
--

DROP TABLE IF EXISTS `pedido`;
CREATE TABLE IF NOT EXISTS `pedido` (
  `ID_PEDIDO` int NOT NULL AUTO_INCREMENT,
  `ID_USUARIO` int DEFAULT NULL,
  `ID_USUARIO_TEMP` int DEFAULT NULL,
  `ID_ESTADO` int NOT NULL,
  `FECHA_PEDIDO` datetime NOT NULL,
  `TOTAL_PEDIDO` decimal(10,2) NOT NULL,
  PRIMARY KEY (`ID_PEDIDO`),
  KEY `FK_R1` (`ID_USUARIO`),
  KEY `FK_R2` (`ID_USUARIO_TEMP`),
  KEY `FK_R3` (`ID_ESTADO`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `pedido`
--

INSERT INTO `pedido` (`ID_PEDIDO`, `ID_USUARIO`, `ID_USUARIO_TEMP`, `ID_ESTADO`, `FECHA_PEDIDO`, `TOTAL_PEDIDO`) VALUES
(5, NULL, 2, 0, '2024-02-08 00:00:00', 134500.00),
(4, NULL, 1, 0, '2024-02-05 00:00:00', 0.00),
(3, 2, NULL, 0, '2024-02-10 00:00:00', 89000.00),
(2, 5, NULL, 0, '2024-01-25 00:00:00', 220000.00),
(1, 3, NULL, 0, '2024-02-01 00:00:00', 150000.00);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto`
--

DROP TABLE IF EXISTS `producto`;
CREATE TABLE IF NOT EXISTS `producto` (
  `ID_PRODUCTO` int NOT NULL AUTO_INCREMENT,
  `NOMBRE_PRODUCTO` varchar(50) NOT NULL,
  `IMAGEN_PRODUCTO` varchar(50) NOT NULL,
  PRIMARY KEY (`ID_PRODUCTO`)
) ENGINE=MyISAM AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `producto`
--

INSERT INTO `producto` (`ID_PRODUCTO`, `NOMBRE_PRODUCTO`, `IMAGEN_PRODUCTO`) VALUES
(7, 'Canela en Astilla', 'https://i.pinimg.com/236x/a7/de/c4/a7dec46aca07b2e'),
(6, 'Ajo en Polvo', 'https://i.pinimg.com/236x/a7/de/c4/a7dec46aca07b2e'),
(8, 'Color Amarillo', 'https://i.pinimg.com/236x/a7/de/c4/a7dec46aca07b2e'),
(9, 'Comino en Molido', 'https://i.pinimg.com/236x/a7/de/c4/a7dec46aca07b2e'),
(10, 'Cúrcuma en Polvo', 'https://i.pinimg.com/236x/a7/de/c4/a7dec46aca07b2e');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `producto_categoria_producto_intermedia`
--

DROP TABLE IF EXISTS `producto_categoria_producto_intermedia`;
CREATE TABLE IF NOT EXISTS `producto_categoria_producto_intermedia` (
  `ID_PRODUCTO` int NOT NULL,
  `ID_CATEGORIA` int NOT NULL,
  PRIMARY KEY (`ID_PRODUCTO`,`ID_CATEGORIA`),
  KEY `FK_R6` (`ID_CATEGORIA`)
) ENGINE=MyISAM DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `producto_categoria_producto_intermedia`
--

INSERT INTO `producto_categoria_producto_intermedia` (`ID_PRODUCTO`, `ID_CATEGORIA`) VALUES
(6, 2),
(7, 1),
(8, 2),
(9, 2),
(10, 2);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

DROP TABLE IF EXISTS `usuario`;
CREATE TABLE IF NOT EXISTS `usuario` (
  `ID_USUARIO` int NOT NULL AUTO_INCREMENT,
  `NOMBRE_USUARIO` varchar(100) NOT NULL,
  `TELEFONO_USUARIO` varchar(20) NOT NULL,
  `CORREO_USUARIO` varchar(50) NOT NULL,
  `DIRECCION_USUARIO` varchar(200) DEFAULT NULL,
  `PASSWORD_HASH` varchar(256) NOT NULL,
  `PASSWORD_SALT` varchar(256) NOT NULL,
  PRIMARY KEY (`ID_USUARIO`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`ID_USUARIO`, `NOMBRE_USUARIO`, `TELEFONO_USUARIO`, `CORREO_USUARIO`, `DIRECCION_USUARIO`, `PASSWORD_HASH`, `PASSWORD_SALT`) VALUES
(1, 'Juan Pérez', '3104567890', 'juan.perez@email.com', 'Calle 123 #45-67, Bogotá', '5f4dcc3b5aa765d61d8327deb882cf99', 'abc123'),
(2, 'María González', '3209876543', 'maria.gonzalez@email.com', 'Carrera 50 #10-20, Medellín', 'e99a18c428cb38d5f260853678922e03', 'def456'),
(3, 'Carlos Ramírez', '3001234567', 'carlos.ramirez@email.com', 'Avenida Siempre Viva 742, Cali', 'd8578edf8458ce06fbc5bb76a58c5ca4', 'ghi789'),
(4, 'Laura Fernández', '3155556666', 'laura.fernandez@email.com', 'Diagonal 80 #30-40, Barranquilla', '25d55ad283aa400af464c76d713c07ad', 'jkl321'),
(5, 'Andrés Herrera', '3112233445', 'andres.herrera@email.com', 'Transversal 60 #12-34, Cartagena', '827ccb0eea8a706c4c34a16891f84e7b', 'mno987');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario_temporal`
--

DROP TABLE IF EXISTS `usuario_temporal`;
CREATE TABLE IF NOT EXISTS `usuario_temporal` (
  `ID_USUARIO_TEMP` int NOT NULL AUTO_INCREMENT,
  `NOMBRE_USUARIO_TEMP` varchar(150) NOT NULL,
  `CORREO_USUARIO_TEMP` varchar(100) NOT NULL,
  `TELEFONO_USUARIO_TEMP` varchar(20) NOT NULL,
  `DIRECCION_USUARIO_TEMP` varchar(256) NOT NULL,
  PRIMARY KEY (`ID_USUARIO_TEMP`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `usuario_temporal`
--

INSERT INTO `usuario_temporal` (`ID_USUARIO_TEMP`, `NOMBRE_USUARIO_TEMP`, `CORREO_USUARIO_TEMP`, `TELEFONO_USUARIO_TEMP`, `DIRECCION_USUARIO_TEMP`) VALUES
(1, 'Juan Pérez', 'juan.perez@email.com', '3104567890', 'Calle 123 #45-67, Bogotá'),
(2, 'María González', 'maria.gonzalez@email.com', '3209876543', 'Carrera 50 #10-20, Medellín'),
(3, 'Carlos Ramírez', 'carlos.ramirez@email.com', '3001234567', 'Avenida Siempre Viva 742, Cali'),
(4, 'Laura Fernández', 'laura.fernandez@email.com', '3155556666', 'Diagonal 80 #30-40, Barranquilla'),
(5, 'Andrés Herrera', 'andres.herrera@email.com', '3112233445', 'Transversal 60 #12-34, Cartagena');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `variante_producto`
--

DROP TABLE IF EXISTS `variante_producto`;
CREATE TABLE IF NOT EXISTS `variante_producto` (
  `ID_VARIANTE` int NOT NULL AUTO_INCREMENT,
  `ID_PRODUCTO` int DEFAULT NULL,
  `TAMANO_VARIANTE` varchar(10) NOT NULL,
  `PRECIO_VARIANTE` decimal(10,0) NOT NULL,
  `STOCK_VARIANTE` int NOT NULL,
  PRIMARY KEY (`ID_VARIANTE`),
  KEY `FK_R4` (`ID_PRODUCTO`)
) ENGINE=MyISAM AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Volcado de datos para la tabla `variante_producto`
--

INSERT INTO `variante_producto` (`ID_VARIANTE`, `ID_PRODUCTO`, `TAMANO_VARIANTE`, `PRECIO_VARIANTE`, `STOCK_VARIANTE`) VALUES
(1, 6, '500g', 8340, 10),
(2, 6, '125g', 2502, 10),
(3, 6, '10g', 1403, 10),
(4, 7, '500g', 67830, 25),
(5, 8, '500g', 4865, 35);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
