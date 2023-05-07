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
CREATE DATABASE /*!32312 IF NOT EXISTS*/`failure-system` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;

USE `failure-system`;

/*Table structure for table `event` */

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
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='事件表';

/*Data for the table `event` */

insert  into `event`(`id`,`title`,`description`,`location`,`status`,`submit_time`,`handler_id`,`handler_time`,`manager_id`,`pipeline_id`,`level`) values (4,'阀门老化','阀门年久失修，需要更换','成都市新都区',1,'2023-05-04 20:06:09',1,'2023-05-04 20:06:00',1,1,1);

/*Table structure for table `personnel` */

CREATE TABLE `personnel` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `identity` int NOT NULL,
  `identityNo` varchar(18) NOT NULL,
  `telePhoneNo` varchar(20) NOT NULL,
  `email` varchar(50) DEFAULT NULL,
  `actor` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `personnel` */

insert  into `personnel`(`id`,`name`,`identity`,`identityNo`,`telePhoneNo`,`email`,`actor`) values (1,'张三',1,'123456789012345678','13800000001','zhangsan@example.com','https://example.com/avatar.png');

/*Table structure for table `pipeline` */

CREATE TABLE `pipeline` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '管道id，自增长',
  `name` varchar(50) NOT NULL COMMENT '管道名称',
  `description` varchar(255) DEFAULT NULL COMMENT '管道描述',
  `length` bigint NOT NULL COMMENT '管道长度',
  `start_location` decimal(10,6) NOT NULL COMMENT '管道起点位置',
  `end_location` decimal(10,6) NOT NULL COMMENT '管道终点位置',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

/*Data for the table `pipeline` */

insert  into `pipeline`(`id`,`name`,`description`,`length`,`start_location`,`end_location`) values (1,'一号管道','本项目的第一条管道',15280,'31.230400','121.473700');

/*Table structure for table `task` */

CREATE TABLE `task` (
  `id` int NOT NULL AUTO_INCREMENT COMMENT '任务ID',
  `event_id` int NOT NULL COMMENT '事件ID',
  `title` varchar(255) NOT NULL COMMENT '任务标题',
  `description` varchar(255) DEFAULT NULL COMMENT '任务描述',
  `handler_id` int NOT NULL COMMENT '处理人员ID',
  `handler_name` varchar(50) NOT NULL COMMENT '处理人员姓名',
  `handler_type` int NOT NULL COMMENT '处理人员类型，1表示巡线人员，2表示抢险人员',
  `status` int NOT NULL COMMENT '任务状态，1表示待处理，2表示处理中，3表示已完成',
  `start_time` datetime NOT NULL COMMENT '任务开始时间',
  `end_time` datetime DEFAULT NULL COMMENT '任务结束时间',
  `created_time` datetime NOT NULL COMMENT '创建时间',
  `updated_time` datetime NOT NULL COMMENT '更新时间',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci COMMENT='任务表';

/*Data for the table `task` */

insert  into `task`(`id`,`event_id`,`title`,`description`,`handler_id`,`handler_name`,`handler_type`,`status`,`start_time`,`end_time`,`created_time`,`updated_time`) values (1,1,'Task 1','This is task 1',1,'John Doe',1,1,'2023-05-01 09:00:00','2023-05-01 10:00:00','2023-05-01 08:00:00','2023-05-01 10:00:00'),(2,1,'Example Event','This is an example event',1,'John Doe',1,1,'2023-06-01 09:00:00','2023-06-01 17:00:00','2023-05-15 10:00:00','2023-05-20 14:30:00');

/*Table structure for table `user` */

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

insert  into `user`(`id`,`username`,`password`,`avatar`,`email`,`phone`,`role`) values (1,'zhaominghong','123456','http://localhost:8000/avatar/168310026314427a68c00379e1e81d72629b00.jpg','1330914560@qq.com','18398528630',3),(2,'zmh168','123456',NULL,NULL,NULL,2);

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
