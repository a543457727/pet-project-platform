/*
 Navicat Premium Data Transfer

 Source Server         : 本地服务器
 Source Server Type    : MySQL
 Source Server Version : 80022
 Source Host           : localhost:3306
 Source Schema         : mytest_pet

 Target Server Type    : MySQL
 Target Server Version : 80022
 File Encoding         : 65001

 Date: 24/02/2021 18:01:53
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for pet_admin
-- ----------------------------
DROP TABLE IF EXISTS `pet_admin`;
CREATE TABLE `pet_admin`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `username` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(64) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `realName` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 40 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pet_admin
-- ----------------------------
INSERT INTO `pet_admin` VALUES (39, 'admin', 'e10adc3949ba59abbe56e057f20f883e', '2021-02-18 09:51:28', '2021-02-18 09:51:28', '邓绍龙');

-- ----------------------------
-- Table structure for pet_category
-- ----------------------------
DROP TABLE IF EXISTS `pet_category`;
CREATE TABLE `pet_category`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `status` int(0) NULL DEFAULT 1,
  `shopId` int(0) NOT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE,
  INDEX `shopId`(`shopId`) USING BTREE,
  CONSTRAINT `pet_category_ibfk_1` FOREIGN KEY (`shopId`) REFERENCES `pet_shop` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 34 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pet_category
-- ----------------------------
INSERT INTO `pet_category` VALUES (32, '猫/狗医疗保健', 1, 1, '2021-02-18 16:40:10', '2021-02-19 14:27:29');
INSERT INTO `pet_category` VALUES (33, '猫/狗营养保健', 1, 1, '2021-02-18 16:40:12', '2021-02-20 17:47:11');

-- ----------------------------
-- Table structure for pet_categoryitem
-- ----------------------------
DROP TABLE IF EXISTS `pet_categoryitem`;
CREATE TABLE `pet_categoryitem`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `pictureUrl` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `shopId` int(0) NOT NULL,
  `categoryId` int(0) NOT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `status` int(0) NOT NULL DEFAULT 1,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `shopId`(`shopId`) USING BTREE,
  INDEX `categoryId`(`categoryId`) USING BTREE,
  CONSTRAINT `pet_categoryitem_ibfk_1` FOREIGN KEY (`shopId`) REFERENCES `pet_shop` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `pet_categoryitem_ibfk_2` FOREIGN KEY (`categoryId`) REFERENCES `pet_category` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pet_categoryitem
-- ----------------------------
INSERT INTO `pet_categoryitem` VALUES (13, '根号的骨头', 'http://127.0.0.1:8888/uploads/1613810091664.jpg', 1, 33, '2021-02-18 17:01:39', '2021-02-20 16:34:52', 1);
INSERT INTO `pet_categoryitem` VALUES (15, '派派的背包', 'http://127.0.0.1:8888/uploads/1613810086167.jpg', 1, 32, '2021-02-19 14:34:55', '2021-02-20 16:34:46', 1);
INSERT INTO `pet_categoryitem` VALUES (18, '点点的小黑鼻', 'http://127.0.0.1:8888/uploads/1613810081508.jpg', 1, 33, '2021-02-19 16:04:54', '2021-02-20 16:34:42', 1);
INSERT INTO `pet_categoryitem` VALUES (19, '招财的小纹理', 'http://127.0.0.1:8888/uploads/1613810074041.jpg', 1, 33, '2021-02-19 16:05:09', '2021-02-20 16:34:34', 1);
INSERT INTO `pet_categoryitem` VALUES (20, '小白一点都不白', 'http://127.0.0.1:8888/uploads/1613810068557.jpg', 1, 32, '2021-02-19 16:05:18', '2021-02-20 16:34:29', 1);
INSERT INTO `pet_categoryitem` VALUES (21, '123', 'http://127.0.0.1:8888/uploads/1613810059896.jpg', 1, 33, '2021-02-20 15:54:33', '2021-02-20 16:34:20', 1);
INSERT INTO `pet_categoryitem` VALUES (22, '1234444', 'http://127.0.0.1:8888/uploads/1613810003830.jpg', 1, 33, '2021-02-20 16:16:57', '2021-02-20 16:33:24', 1);
INSERT INTO `pet_categoryitem` VALUES (23, '撒法', 'http://127.0.0.1:8888/uploads/1613809296482.jpg', 1, 32, '2021-02-20 16:21:37', '2021-02-20 16:33:17', 1);

-- ----------------------------
-- Table structure for pet_goods
-- ----------------------------
DROP TABLE IF EXISTS `pet_goods`;
CREATE TABLE `pet_goods`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `shopId` int(0) NOT NULL,
  `flag` int(0) NOT NULL DEFAULT 1,
  `categoryItemId` int(0) NOT NULL,
  `price` double NOT NULL,
  `desc` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `stock` int(0) NOT NULL DEFAULT 0,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `shopId`(`shopId`) USING BTREE,
  INDEX `categoryItemId`(`categoryItemId`) USING BTREE,
  CONSTRAINT `pet_goods_ibfk_1` FOREIGN KEY (`shopId`) REFERENCES `pet_shop` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE,
  CONSTRAINT `pet_goods_ibfk_2` FOREIGN KEY (`categoryItemId`) REFERENCES `pet_categoryitem` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 25 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pet_goods
-- ----------------------------
INSERT INTO `pet_goods` VALUES (4, '猫咪健胃宝2', 1, 1, 15, 100.1, '我是一个小可爱', 100, '2021-02-19 17:05:08', '2021-02-19 17:14:24');
INSERT INTO `pet_goods` VALUES (5, '猫草', 1, 1, 13, 15, '这是一个能让猫咪上瘾的玩意', 10, '2021-02-20 10:05:31', '2021-02-20 10:05:31');
INSERT INTO `pet_goods` VALUES (6, '11', 1, 1, 13, 11, '1', 1, '2021-02-20 10:10:01', '2021-02-20 10:10:01');
INSERT INTO `pet_goods` VALUES (7, '123', 1, 0, 13, 10, '111', 10, '2021-02-20 10:10:36', '2021-02-20 11:57:24');
INSERT INTO `pet_goods` VALUES (8, '2', 1, 0, 13, 2, '2', 2, '2021-02-20 10:10:56', '2021-02-20 11:57:23');
INSERT INTO `pet_goods` VALUES (9, '222', 1, 0, 13, 2, '1', 2, '2021-02-20 10:12:09', '2021-02-21 15:17:27');
INSERT INTO `pet_goods` VALUES (21, '1112312312312', 1, 1, 13, 123, '11', 11, '2021-02-20 18:13:02', '2021-02-21 15:05:32');
INSERT INTO `pet_goods` VALUES (22, '我在学习', 1, 1, 13, 11, '2123', 11, '2021-02-21 15:21:16', '2021-02-21 15:21:16');
INSERT INTO `pet_goods` VALUES (23, '1', 1, 1, 13, 1, '1', 1, '2021-02-21 16:09:16', '2021-02-21 16:09:16');
INSERT INTO `pet_goods` VALUES (24, '11问问', 1, 1, 13, 399, '1', 20, '2021-02-21 16:11:01', '2021-02-21 16:11:01');

-- ----------------------------
-- Table structure for pet_goodsimg
-- ----------------------------
DROP TABLE IF EXISTS `pet_goodsimg`;
CREATE TABLE `pet_goodsimg`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `goodId` int(0) NOT NULL,
  `smallImg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `middleImg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `largeImg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `artworkImg` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `goodId`(`goodId`) USING BTREE,
  CONSTRAINT `pet_goodsimg_ibfk_1` FOREIGN KEY (`goodId`) REFERENCES `pet_goods` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pet_goodsimg
-- ----------------------------
INSERT INTO `pet_goodsimg` VALUES (15, 24, 'http://127.0.0.1:8888/uploads/goods/1613896147404-small.png', 'http://127.0.0.1:8888/uploads/goods/1613896147404-middle.png', 'http://127.0.0.1:8888/uploads/goods/1613896147404-large.png', '2021-02-21 16:29:10', '2021-02-21 16:29:10', 'http://127.0.0.1:8888/uploads/goods/1613896147404.png');
INSERT INTO `pet_goodsimg` VALUES (16, 24, 'http://127.0.0.1:8888/uploads/goods/1613896149324-small.png', 'http://127.0.0.1:8888/uploads/goods/1613896149324-middle.png', 'http://127.0.0.1:8888/uploads/goods/1613896149324-large.png', '2021-02-21 16:29:10', '2021-02-21 16:29:10', 'http://127.0.0.1:8888/uploads/goods/1613896149324.png');

-- ----------------------------
-- Table structure for pet_server
-- ----------------------------
DROP TABLE IF EXISTS `pet_server`;
CREATE TABLE `pet_server`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `status` int(0) NULL DEFAULT 1,
  `shopId` int(0) NOT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE,
  INDEX `pet_server_ibfk_1`(`shopId`) USING BTREE,
  CONSTRAINT `pet_server_ibfk_1` FOREIGN KEY (`shopId`) REFERENCES `pet_shop` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 26 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pet_server
-- ----------------------------
INSERT INTO `pet_server` VALUES (22, 'test', 1, 1, '2021-02-18 14:11:06', '2021-02-18 14:11:06');
INSERT INTO `pet_server` VALUES (23, '11', 1, 1, '2021-02-18 15:34:37', '2021-02-18 15:34:37');
INSERT INTO `pet_server` VALUES (24, '22', 1, 1, '2021-02-18 15:35:13', '2021-02-18 15:35:13');
INSERT INTO `pet_server` VALUES (25, '441', 1, 1, '2021-02-18 15:37:36', '2021-02-18 15:42:03');

-- ----------------------------
-- Table structure for pet_shop
-- ----------------------------
DROP TABLE IF EXISTS `pet_shop`;
CREATE TABLE `pet_shop`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `userId` int(0) NOT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `status` int(0) NULL DEFAULT 1 COMMENT '1为启用，0为停用，-1则为禁用',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  INDEX `userId`(`userId`) USING BTREE,
  CONSTRAINT `pet_shop_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `pet_admin` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE = InnoDB AUTO_INCREMENT = 18 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pet_shop
-- ----------------------------
INSERT INTO `pet_shop` VALUES (1, '旺旺小店铺', 39, '2021-02-18 11:32:23', '2021-02-22 14:10:54', 1, 'http://127.0.0.1:8888/uploads/shop/1613973976279.jpg');
INSERT INTO `pet_shop` VALUES (2, '嘿嘿你猜是什么', 39, '2021-02-22 10:05:55', '2021-02-22 10:53:36', 1, '1');
INSERT INTO `pet_shop` VALUES (10, '测试锕', 39, '2021-02-22 11:07:28', '2021-02-22 11:07:28', 1, 'http://127.0.0.1:8888/uploads/shop/1613963100168.jpg');
INSERT INTO `pet_shop` VALUES (11, '6666', 39, '2021-02-22 11:08:04', '2021-02-22 11:08:04', 1, 'http://127.0.0.1:8888/uploads/shop/1613963100168.jpg');
INSERT INTO `pet_shop` VALUES (12, '666', 39, '2021-02-22 11:09:14', '2021-02-22 11:09:14', 1, 'http://127.0.0.1:8888/uploads/shop/1613963342641.jpg');
INSERT INTO `pet_shop` VALUES (13, '7777', 39, '2021-02-22 11:09:28', '2021-02-22 14:14:04', 1, 'http://127.0.0.1:8888/uploads/shop/1613963367773.jpg');
INSERT INTO `pet_shop` VALUES (14, '123', 39, '2021-02-22 11:10:15', '2021-02-22 14:13:47', 0, 'http://127.0.0.1:8888/uploads/shop/1613963413866.jpg');

-- ----------------------------
-- Table structure for pet_user
-- ----------------------------
DROP TABLE IF EXISTS `pet_user`;
CREATE TABLE `pet_user`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `uid` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `username` varchar(200) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `phone` char(11) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `address` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `realName` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `nick` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `username`(`username`) USING BTREE,
  UNIQUE INDEX `password`(`password`) USING BTREE,
  UNIQUE INDEX `phone`(`phone`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 24 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pet_user
-- ----------------------------
INSERT INTO `pet_user` VALUES (15, '99663', NULL, '9966332', '13055212013', 'test', '1233', '白驹过隙', '2021-02-24 11:12:37', '2021-02-24 11:12:37', '123123');
INSERT INTO `pet_user` VALUES (23, 'oyFvY5VK51ayj6mygq4q6abpA708', NULL, '666', '123456', '1321', '123', '邓', '2021-02-24 12:05:18', '2021-02-24 12:05:18', 'https://thirdwx.qlogo.cn/mmopen/vi_32/GEXOh75VLbQgcWkFtoUVM5YD74hrtHAhjU2oK3nMUDdokKIiaQfsGsUFLLwcyhKmZnQSfTBfuYQlYwns0bP7S2w/132');

-- ----------------------------
-- Table structure for pet_variety
-- ----------------------------
DROP TABLE IF EXISTS `pet_variety`;
CREATE TABLE `pet_variety`  (
  `id` int(0) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `smallWeight` int(0) NULL DEFAULT NULL,
  `bigWeight` int(0) NULL DEFAULT NULL,
  `shopId` int(0) NOT NULL,
  `createAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0),
  `updateAt` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE INDEX `name`(`name`) USING BTREE,
  INDEX `shopId`(`shopId`) USING BTREE
) ENGINE = InnoDB AUTO_INCREMENT = 17 CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of pet_variety
-- ----------------------------
INSERT INTO `pet_variety` VALUES (14, '猫咪1', 1, 2, 1, '2021-02-18 14:53:20', '2021-02-18 16:11:34');
INSERT INTO `pet_variety` VALUES (15, '1', 1, 1, 1, '2021-02-18 14:53:38', '2021-02-18 14:53:38');
INSERT INTO `pet_variety` VALUES (16, '3', 3, 3, 1, '2021-02-18 16:09:03', '2021-02-18 16:09:03');

-- ----------------------------
-- View structure for goods_img_views
-- ----------------------------
DROP VIEW IF EXISTS `goods_img_views`;
CREATE ALGORITHM = UNDEFINED SQL SECURITY DEFINER VIEW `goods_img_views` AS select `pet_goods`.`id` AS `id`,`pet_goods`.`name` AS `name`,`pet_goods`.`shopId` AS `shopId`,`pet_goods`.`flag` AS `flag`,`pet_goods`.`categoryItemId` AS `categoryItemId`,`pet_goods`.`price` AS `price`,`pet_goods`.`desc` AS `desc`,`pet_goods`.`stock` AS `stock`,`pet_goods`.`createAt` AS `createAt`,`pet_goods`.`updateAt` AS `updateAt`,`pet_goodsimg`.`artworkImg` AS `artworkImg`,`pet_goodsimg`.`largeImg` AS `largeImg`,`pet_goodsimg`.`middleImg` AS `middleImg`,`pet_goodsimg`.`smallImg` AS `smallImg`,`pet_goodsimg`.`id` AS `pid` from (`pet_goods` left join `pet_goodsimg` on((`pet_goods`.`id` = `pet_goodsimg`.`goodId`)));

SET FOREIGN_KEY_CHECKS = 1;
