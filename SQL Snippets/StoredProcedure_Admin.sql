
use elevvpn;
DROP PROCEDURE IF EXISTS AdminLogin;
DELIMITER //  
CREATE PROCEDURE AdminLogin (
     IN _username varchar(100),
    IN _password varchar(100)
)  
BEGIN  
    select * from adminuser WHERE userName = _username;
END // 