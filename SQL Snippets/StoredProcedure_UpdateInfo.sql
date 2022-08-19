DROP PROCEDURE IF EXISTS updateInfo;
DELIMITER //  
CREATE PROCEDURE updateInfo (
    IN _info VARCHAR(5000)
)  
BEGIN  
    UPDATE mailInfo
    SET info = _info;
END // 



insert into mailInfo(info)
values('Du modtager denne mail fordi du har anmodet om adgang til ZBC Data's elevVpn Du kan downloade VPNklienten her')