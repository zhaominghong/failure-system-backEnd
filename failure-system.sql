/*
SQLyog Ultimate v12.08 (64 bit)
MySQL - 8.0.26 : Database - failure-system
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
USE `failure-system`;

/*Table structure for table `audit` */

DROP TABLE IF EXISTS `audit`;

CREATE TABLE `audit` (
  `id` int NOT NULL AUTO_INCREMENT,
  `event_id` int NOT NULL,
  `audit_option` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`id`),
  KEY `event_id` (`event_id`),
  CONSTRAINT `audit_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `event` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `audit` */

insert  into `audit`(`id`,`event_id`,`audit_option`) values (1,5,'无异议');

/*Table structure for table `event` */

DROP TABLE IF EXISTS `event`;

CREATE TABLE `event` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '事件id，自增长',
  `title` varchar(50) NOT NULL COMMENT '事件标题',
  `description` varchar(255) DEFAULT NULL COMMENT '事件描述',
  `location` varchar(50) DEFAULT NULL COMMENT '事件位置',
  `status` int NOT NULL COMMENT '事件状态，0为未处理，1为已处理，2为已完成',
  `submit_time` datetime NOT NULL COMMENT '事件提交时间',
  `handler_id` int DEFAULT NULL COMMENT '事件处理人员id，若未处理则为null',
  `handler_time` datetime DEFAULT NULL COMMENT '事件处理时间，若未处理则为null',
  `manager_id` int DEFAULT NULL COMMENT '事件管理人员id，若未指派则为null',
  `pipeline_id` int NOT NULL COMMENT '事件所属管道id',
  `level` int NOT NULL COMMENT '事件级别，1为一般，2为重要，3为紧急',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=32 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='事件表';

/*Data for the table `event` */

insert  into `event`(`id`,`title`,`description`,`location`,`status`,`submit_time`,`handler_id`,`handler_time`,`manager_id`,`pipeline_id`,`level`) values (5,'test','大大的test','[30.629164,104.061154]',1,'2023-05-16 17:05:48',1,'2023-05-16 00:00:00',1,1,1),(6,'一号管道','一号管道','[30.629155,104.060263]',1,'2023-05-17 09:13:27',1,'2023-06-30 00:00:00',1,1,2),(9,'燃气管道失效事件1','失效事件描述1','[31.224361,121.469170]',0,'2023-05-16 10:15:30',NULL,'2023-05-15 18:30:00',NULL,2,2),(10,'燃气管道失效事件2','失效事件描述2','[40.712776,-74.005974]',1,'2023-05-17 14:20:45',NULL,'2023-05-16 11:45:00',NULL,3,3),(11,'燃气管道失效事件3','失效事件描述3','[34.052235,-118.243683]',2,'2023-05-12 19:35:10',NULL,'2023-05-12 18:00:00',NULL,1,1),(12,'燃气管道失效事件4','失效事件描述4','[51.5074,-0.1278]',0,'2023-05-14 08:50:25',NULL,'2023-05-13 19:15:00',NULL,4,2),(13,'燃气管道失效事件5','失效事件描述5','[37.7749,-122.4194]',1,'2023-05-18 16:05:40',NULL,'2023-05-17 21:30:00',NULL,5,3),(14,'燃气管道失效事件6','失效事件描述6','[39.9042,116.4074]',2,'2023-05-13 11:20:55',NULL,'2023-05-12 22:45:00',NULL,3,1),(15,'燃气管道失效事件7','失效事件描述7','[51.5072,-0.1276]',0,'2023-05-15 09:36:10',NULL,'2023-05-14 21:00:00',NULL,2,2),(16,'燃气管道失效事件8','失效事件描述8','[34.0522,-118.2437]',1,'2023-05-17 13:51:25',NULL,'2023-05-16 19:15:00',NULL,4,3),(17,'燃气管道失效事件9','失效事件描述9','[40.7128,-74.0060]',2,'2023-05-12 08:06:40',NULL,'2023-05-11 18:30:00',NULL,1,1),(18,'燃气管道失效事件10','失效事件描述10','[37.7749,-122.4194]',0,'2023-05-16 17:21:55',NULL,'2023-05-15 21:45:00',NULL,5,2),(19,'燃气管道失效事件11','失效事件描述11','[39.9042,116.4074]',1,'2023-05-18 12:37:10',NULL,'2023-05-17 00:00:00',NULL,3,3),(20,'燃气管道失效事件12','失效事件描述12','[31.2244,121.4692]',2,'2023-05-13 09:52:25',NULL,'2023-05-12 14:15:00',NULL,2,1),(21,'燃气管道失效事件13','失效事件描述13','[34.0522,-118.2437]',0,'2023-05-15 16:07:40',NULL,'2023-05-14 22:30:00',NULL,4,2),(22,'燃气管道失效事件14','失效事件描述14','[51.5074,-0.1278]',1,'2023-05-17 08:22:55',NULL,'2023-05-16 16:45:00',NULL,1,3),(23,'燃气管道失效事件15','失效事件描述15','[37.7749,-122.4194]',2,'2023-05-12 15:38:10',NULL,'2023-05-12 08:00:00',NULL,5,1),(24,'燃气管道失效事件16','失效事件描述16','[31.2244,121.4692]',0,'2023-05-14 12:53:25',NULL,'2023-05-13 22:15:00',NULL,3,2),(25,'燃气管道失效事件17','失效事件描述17','[34.0522,-118.2437]',1,'2023-05-16 10:08:40',NULL,'2023-05-15 18:30:00',NULL,2,3),(26,'燃气管道失效事件18','失效事件描述18','[40.7128,-74.0060]',2,'2023-05-13 07:23:55',NULL,'2023-05-12 21:45:00',NULL,4,1),(27,'燃气管道失效事件19','失效事件描述19','[37.7749,-122.4194]',0,'2023-05-15 15:39:10',NULL,'2023-05-14 19:00:00',NULL,1,2),(28,'燃气管道失效事件20','失效事件描述20','[39.9042,116.4074]',1,'2023-05-17 10:54:25',NULL,'2023-05-16 15:15:00',NULL,3,3),(29,'燃气管道失效事件21','失效事件描述21','[31.2244,121.4692]',2,'2023-05-12 08:09:40',NULL,'2023-05-11 17:30:00',NULL,2,1),(30,'燃气管道失效事件22','失效事件描述22','[34.0522,-118.2437]',0,'2023-05-14 11:14:55',NULL,'2023-05-13 20:45:00',NULL,4,2),(31,'二号管道燃气泄漏','燃气发生小规模泄漏，需及时进行阀门段控制，避免发生大规模事故','[30.629502,104.060678]',1,'2023-05-18 19:18:03',5,'2023-05-18 00:00:00',5,2,2);

/*Table structure for table `personnel` */

DROP TABLE IF EXISTS `personnel`;

CREATE TABLE `personnel` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `identity` int NOT NULL,
  `identityNo` varchar(18) NOT NULL,
  `telePhoneNo` varchar(20) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `actor` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=48 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `personnel` */

insert  into `personnel`(`id`,`name`,`identity`,`identityNo`,`telePhoneNo`,`email`,`actor`) values (1,'王五',2,'123456789012345678','13800000001','zhangsan@example.com','https://example.com/avatar.png'),(5,'刘老根',2,'778856789012345678','13800000001','zhangsan@example.com',NULL),(6,'飞猪',1,'123456789012345678','13800000001','zhangsan@example.com',NULL),(28,'张三',1,'123456789012345678','13800000001','zhangsan@example.com',NULL),(29,'李四',2,'123456789012345678','13800000001','zhangsan@example.com',NULL),(30,'张三',1,'123456789012345000','13800000001','zhangsan@example.com',NULL),(31,'李四',2,'987654321098765000','13900000002','lisi@example.com',NULL),(32,'王五',1,'234567890123456000','13800000003','wangwu@example.com',NULL),(33,'赵六',2,'567890123456789000','13900000004','zhaoliu@example.com',NULL),(34,'陈七',1,'345678901234567000','13800000005','chenqi@example.com',NULL),(35,'刘八',2,'890123456789012000','13900000006','liuba@example.com',NULL),(36,'孙九',1,'456789012345678000','13800000007','sunjiu@example.com',NULL),(37,'赵十',2,'901234567890123000','13900000008','zhaoshi@example.com',NULL),(38,'钱十一',1,'567890123456789000','13800000009','qianyiyi@example.com',NULL),(39,'孙十二',2,'12345678901234500','13900000010','sunshier@example.com',NULL),(40,'赵十三',1,'678901234567890000','13800000011','zhaoshisan@example.com',NULL),(41,'钱十四',2,'345678901234567000','13900000012','qiansisi@example.com',NULL),(42,'孙十五',1,'901234567890123000','13800000013','sunshiwu@example.com',NULL),(43,'赵十六',2,'123456789012345000','13900000014','zhaoshiliu@example.com',NULL),(44,'钱十七',1,'567890123456789000','13800000015','qianqiqi@example.com',NULL),(45,'孙十八',2,'234567890123456000','13900000016','sunshiba@example.com',NULL),(46,'赵十九',1,'890123456789012000','13800000017','zhaoshijiu@example.com',NULL),(47,'钱二十',2,'345678901234567000','13900000018','qianershier@example.com',NULL);

/*Table structure for table `pipeline` */

DROP TABLE IF EXISTS `pipeline`;

CREATE TABLE `pipeline` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '管道id，自增长',
  `name` varchar(50) NOT NULL COMMENT '管道名称',
  `description` varchar(255) DEFAULT NULL COMMENT '管道描述',
  `length` bigint NOT NULL COMMENT '管道长度',
  `start_location_x` decimal(10,6) DEFAULT NULL COMMENT '管道起点经度',
  `start_location_y` decimal(10,6) NOT NULL COMMENT '管道起点纬度',
  `end_location_x` decimal(10,6) DEFAULT NULL COMMENT '管道终点经度',
  `end_location_y` decimal(10,6) NOT NULL COMMENT '管道终点纬度',
  `paths` text CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL COMMENT '管道路径坐标点数组',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `pipeline` */

insert  into `pipeline`(`id`,`name`,`description`,`length`,`start_location_x`,`start_location_y`,`end_location_x`,`end_location_y`,`paths`) values (1,'一号管道','本项目的第一条管道',15280,'104.059813','30.629205','104.059807','30.629210','[[[104.059813,30.629205],[104.060285,30.629201],[104.060317,30.628744],[104.060317,30.628471],[104.060333,30.627954],[104.060328,30.627714],[104.060339,30.627428],[104.060344,30.62723],[104.061057,30.627234],[104.061073,30.627867],[104.061036,30.628693],[104.061116,30.628758],[104.061159,30.629071],[104.061181,30.629215],[104.061272,30.629293],[104.061283,30.62951],[104.060811,30.62951],[104.060478,30.629505],[104.059802,30.629478],[104.059807,30.62921]],[[104.059993,30.628744],[104.060309,30.628748]],[[104.059976,30.628471],[104.060309,30.628467]],[[104.059987,30.628227],[104.06032,30.628227]],[[104.060019,30.627941],[104.060331,30.627964]],[[104.060062,30.62771],[104.060325,30.627714]],[[104.060035,30.627507],[104.060347,30.627534]],[[104.060035,30.627391],[104.060331,30.627433]],[[104.060373,30.629044],[104.061119,30.629058]],[[104.060593,30.629224],[104.061178,30.629224]]]'),(2,'二号管道','第二条管道',20008,'104.062334','30.633623','104.062914','30.632404','[[[104.062334,30.633623],[104.062248,30.633493],[104.062248,30.633346],[104.062248,30.633217],[104.062227,30.63294],[104.06227,30.632736],[104.062377,30.63257],[104.062484,30.632496],[104.062592,30.63246],[104.062785,30.632423],[104.063107,30.632423],[104.063386,30.632515],[104.063557,30.632663],[104.0636,30.632884],[104.063622,30.633143],[104.063622,30.633309],[104.0636,30.633475],[104.063514,30.633586],[104.063407,30.63366],[104.0633,30.633697],[104.063128,30.633715],[104.062956,30.633715],[104.062742,30.633715],[104.062527,30.633733]],[[104.06257,30.633715],[104.06272,30.633789],[104.063686,30.633789],[104.06345,30.633641]],[[104.06375,30.633752],[104.063836,30.633087],[104.0636,30.633087]],[[104.063815,30.633069],[104.06375,30.632681],[104.063643,30.632441],[104.063514,30.632552]],[[104.063493,30.63257],[104.063622,30.63246],[104.063235,30.632293],[104.062914,30.632293],[104.062914,30.632404]]]'),(3,'第三条管道','第三条管道',18792,'104.054910','30.631804','104.056369','30.627317','[[[104.05491,30.631804],[104.054738,30.630936],[104.054631,30.630142],[104.054416,30.630105],[104.05433,30.629459],[104.054223,30.629071],[104.054674,30.628961],[104.054545,30.628444],[104.054416,30.628148],[104.053815,30.628222],[104.053537,30.628241],[104.053064,30.628277],[104.052743,30.628333],[104.052099,30.628425],[104.051691,30.628554],[104.051498,30.628573],[104.051756,30.629182],[104.052142,30.629718],[104.052485,30.629681],[104.052485,30.629275],[104.052335,30.628813],[104.052764,30.628684],[104.052828,30.628739],[104.053107,30.628702],[104.053258,30.629164],[104.053472,30.630161],[104.053901,30.630105],[104.054094,30.630087],[104.054438,30.63005],[104.05433,30.629515],[104.054245,30.629145],[104.054245,30.629071],[104.054609,30.628998],[104.05506,30.628961],[104.055382,30.628905],[104.055575,30.628868],[104.055596,30.628591],[104.055554,30.628185],[104.055489,30.627908],[104.055897,30.627779],[104.05609,30.627724],[104.056305,30.627539],[104.056369,30.627317]]]');

/*Table structure for table `task` */

DROP TABLE IF EXISTS `task`;

CREATE TABLE `task` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '任务ID',
  `event_id` int NOT NULL COMMENT '事件ID',
  `title` varchar(255) NOT NULL COMMENT '任务标题',
  `description` varchar(255) DEFAULT NULL COMMENT '任务描述',
  `handler_id` int NOT NULL COMMENT '处理人员ID',
  `level` int NOT NULL COMMENT '任务等级',
  `status` int NOT NULL COMMENT '任务状态，1表示待处理，2表示处理中，3表示已完成',
  `created_time` datetime NOT NULL COMMENT '创建时间',
  `updated_time` datetime NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='任务表';

/*Data for the table `task` */

insert  into `task`(`id`,`event_id`,`title`,`description`,`handler_id`,`level`,`status`,`created_time`,`updated_time`) values (1,4,'Task 1','This is task 1',1,1,1,'2023-05-01 08:00:00','2023-05-01 10:00:00'),(4,9,'失效任务一','失效任务一',5,2,2,'2023-05-18 16:08:33','2023-05-18 16:08:33'),(5,10,'失效任务二','失效任务二',28,1,2,'2023-05-18 16:08:52','2023-05-18 16:08:52'),(6,11,'失效任务三','失效任务三',38,3,1,'2023-05-18 16:09:10','2023-05-18 16:09:10'),(7,28,'阀门老化','管道管件阀门老化，急需更换',37,3,0,'2023-05-18 16:09:47','2023-05-18 16:09:47'),(8,12,'日常维护','日常维护',35,1,3,'2023-05-18 16:10:23','2023-05-18 16:10:23');

/*Table structure for table `user` */

DROP TABLE IF EXISTS `user`;

CREATE TABLE `user` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '用户id，自增长',
  `username` varchar(20) NOT NULL COMMENT '用户名',
  `password` varchar(20) NOT NULL COMMENT '密码',
  `avatar` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL COMMENT '头像存放地址',
  `email` varchar(50) DEFAULT NULL COMMENT '邮箱',
  `phone` varchar(20) DEFAULT NULL COMMENT '电话号码',
  `role` int NOT NULL COMMENT '用户角色，1为管道巡线人员，2为抢险人员，3为管理员',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='用户表';

/*Data for the table `user` */

insert  into `user`(`id`,`username`,`password`,`avatar`,`email`,`phone`,`role`) values (1,'zhaominghong','123456','http://localhost:8000/avatar/1684314512250903d2a93a13300f22f9a2d800.jpg','1330914560@qq.com','19980829351',3),(2,'zmh168','123456',NULL,NULL,NULL,2);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
