DROP PROCEDURE IF EXISTS updateInfo;
DELIMITER //  
CREATE PROCEDURE updateInfo (
    IN _info VARCHAR(5000)
)  
BEGIN  
    UPDATE mailinfo
    SET info = _info;
END // 



