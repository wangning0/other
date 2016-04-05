#mysql学习笔记
* DML(数据操作语言)
	* SELECT 从数据库表中获取数据
	* UPDATE 更新数据库表中的数据
	* DELETE 从数据库表中删除数据
	* INSERT INTO 向数据库表中插入数据
* DDL(数据定义语言)
	* CREATE DATABASE 
	* ALTER DATABASE 修改数据库
	* CREATE TABLE 
	* ALTER TABEL 改变数据库表
	* DROP TABEL
	* CREATE INDEX
	* DROP INDEX
	
* SELECT 列名称 FROM 表名称

* SELECT DISTINCT 列名称 FROM 表名称(返回唯一不同的值)

* SELECT 列名称 FROM 表名称 WHERE 列 运算符 值

* 可以在WHERE字句中的运算符
    * =
    * <> 不等于
    * `>`
    * <
    * <=
    * `>=`
    * BETWEEN  在某个范围内
    * LIKE 搜索某种模式
* 在WHERE语句中 文本值需要用单引号环绕，如果是数值，不要用引号
* AND OR运算符可在WHERE字句中把两个或多个条件结合起来
* ORDER BY语句用于对结果集进行排序

        SELECT Company, OrderNumber FROM Orders ORDER BY Company
       
* INSERT INTO 表名称 VALUES (值1，值2，...)
* INSERT INTO table_name (列1, 列2,...) VALUES (值1, 值2,....)
* UPDATE 表名称 SET 列名称 = 新值 WHERE 列名称 = 某值  用于修改表中的数据
* DELETE 语句 用于删除表中的行

        DELETE FROM 表名称 WHERE 列名称 = 值
        删除所有行 
        DELETE FROM table_name
        DELETE * FROM table_name

* SQL TOP子句，用于规定要反悔的记录的数目，在`mysql`中，用`LIMIT`

        SELETE column_name
        FROM table_name
        LIMIT number
* SQL LIKE 操作符

        SELECT column_name(s)
        FROM table_name
        WHERE column_name LIKE pattern
        
        SELECT column_name(s)
        FROM table_name
        WHERE column_name NOT LIKE pattern
        
* '%'用于定义通配符(模式中缺少的字母)
* SQL 通配符 可以替代一个或多个字符
    
    * % 替代一个或多个字符
    * _ 一个字符
    * [charlist] 字符列中的任何单一字符
    * [^charlist] or [!charlist]不在字符列中的任何单一字符
  
* SQL IN 操作符 允许我们在 WHERE 子句中规定多个值

        SELECT column_name(s)
        FROM table_name
        WHERE column_name IN (value1,value2,...)
        
        SELECT * FROM Persons
        WHERE LastName IN ('Adams','Carter')
* SQL BETWEEN 操作符  在 WHERE 子句中使用，作用是选取介于两个值之间的数据范围。 前闭后开，不同的数据库的处理方式不同* 

        SELECT column_name(s)
        FROM table_name
        WHERE column_name
        BETWEEN value1 AND value2
        
        
        SELECT * FROM Persons
        WHERE LastName
        NOT BETWEEN 'Adams' AND 'Carter'
        
* SQL Alias（别名）可以为列名称和表名称指定别名（Alias）。

        //表的语法
        SELECT column_name(s)
        FROM table_name
        AS alias_name
        //列的 SQL Alias 语法
        SELECT column_name AS alias_name
        FROM table_name
        
        SELECT po.OrderID, p.LastName, p.FirstName
        FROM Persons AS p, Product_Orders AS po
        WHERE p.LastName='Adams' AND p.FirstName='John'
        
        SELECT LastName AS Family, FirstName AS Name
        FROM Persons

* 引用两个表 

        SELECT Persons.LastName, Persons.FirstName, Orders.OrderNo
        FROM Persons, Orders
        WHERE Persons.Id_P = Orders.Id_P  
* SQL JOIN - 使用 Join

        SELECT Persons.LastName, Persons.FirstName, Orders.OrderNo
        FROM Persons
        INNER JOIN Orders
        ON Persons.Id_P = Orders.Id_P
        ORDER BY Persons.LastName
        
* 不同的 SQL JOIN

        JOIN: 如果表中有至少一个匹配，则返回行
        LEFT JOIN: 即使右表中没有匹配，也从左表返回所有的行
        RIGHT JOIN: 即使左表中没有匹配，也从右表返回所有的行
        FULL JOIN: 只要其中一个表中存在匹配，就返回行
        
* SQL UNION 操作符 用于合并两个或多个 SELECT 语句的结果集，但是注意的是内部的SELECT语句必须拥有相同数量的列，列也必须拥有相似的数据类型.默认的，UNION操作符选取不同的值，如果允许重复的值，使用UNION ALL

* CREATE DATABASE my_db

* decimal(size,d) 容纳带有小数的数字
* numeric(size,d) size 规定数字的最大位数，d规定小数点右侧的最大位数
* SQL 约束  约束用于限制加入表的数据的类型。

* SQL NOT NULL 约束 强制列不接受NULL值
* SQL UNIQUE 约束 唯一标识数据库表中的每条记录。

        在已经创建表后要改变约束
        
        alter table Persons
        add unique (Id_P)
        
        撤销unique约束
        
        alter table Persons
        drop index Id_P
* SQL PRIMARY KEY 约束 唯一标识数据库表中的每条记录,主键必须包含唯一的值。主键列不能包含 NULL 值。每个表都应该有一个主键，并且每个表只能有一个主键。

        多个列组成的主键
        CREATE TABLE Persons
        (
        Id_P int NOT NULL,
        LastName varchar(255) NOT NULL,
        FirstName varchar(255),
        Address varchar(255),
        City varchar(255),
        CONSTRAINT pk_PersonID PRIMARY KEY (Id_P,LastName)
        )
                

* SQL FOREIGN KEY 约束 一个表中的 FOREIGN KEY 指向另一个表中的 PRIMARY KEY。

        CREATE TABLE Orders
        (
        Id_O int NOT NULL,
        OrderNo int NOT NULL,
        Id_P int,
        PRIMARY KEY (Id_O),
        FOREIGN KEY (Id_P) REFERENCES Persons(Id_P)
        )
* SQL CHECK 约束 CHECK 约束用于限制列中的值的范围。如果对单个列定义 CHECK 约束，那么该列只允许特定的值，如果对一个表定义 CHECK 约束，那么此约束会在特定的列中对值进行限制。

        CREATE TABLE Persons
        (
        Id_P int NOT NULL,
        LastName varchar(255) NOT NULL,
        FirstName varchar(255),
        Address varchar(255),
        City varchar(255),
        CHECK (Id_P>0)
        )
        
        CREATE TABLE Persons
        (
        Id_P int NOT NULL,
        LastName varchar(255) NOT NULL,
        FirstName varchar(255),
        Address varchar(255),
        City varchar(255),
        CONSTRAINT chk_Person CHECK (Id_P>0 AND City='Sandnes')
        )
        
* SQL DEFAULT 约束 用于向列中插入默认值。如果没有规定其他的值，那么会将默认值添加到所有的新记录。

        CREATE TABLE Persons
        (
        Id_P int NOT NULL,
        LastName varchar(255) NOT NULL,
        FirstName varchar(255),
        Address varchar(255),
        City varchar(255) DEFAULT 'Sandnes'
        )
        
        已存在的情况下，修改数据库
        ALTER TABLE Persons
        ALTER City SET DEFAULT 'SANDNES'
        
        ALTER TABLE Persons
        ALTER City DROP DEFAULT    