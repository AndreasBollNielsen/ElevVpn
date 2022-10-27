use elevvpn;
DROP PROCEDURE IF EXISTS updateInfo;
DELIMITER //  
CREATE PROCEDURE updateInfo (
    IN _info VARCHAR(5000),
    IN _link VARCHAR(500)
)  
BEGIN  
    UPDATE mailInfo
    SET info = _info, link = _link;
END // 


use elevvpn;
insert into mailInfo(info)
values('Du modtager denne mail fordi du har anmodet om adgang til ZBC Data');