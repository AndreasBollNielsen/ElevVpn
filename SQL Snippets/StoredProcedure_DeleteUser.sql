DROP PROCEDURE IF EXISTS deleteUser;
DELIMITER //  
CREATE PROCEDURE deleteUser (
    IN _id INT
)  
BEGIN  
    DELETE FROM users
    WHERE users.id = _id;
END // 


select * from users where id = 0


insert into users( email,hasVpn,isSticky)
VALUES('andr687w@zbc.dk',0,0);