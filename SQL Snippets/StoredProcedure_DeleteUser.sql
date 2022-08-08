DROP PROCEDURE IF EXISTS deleteUser;
DELIMITER //  
CREATE PROCEDURE deleteUser (
    IN _id INT
)  
BEGIN  
    DELETE FROM users
    WHERE users.id = _id;
END // 

call deleteUser(1);
