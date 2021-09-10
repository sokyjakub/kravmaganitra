<?php

if( empty($_POST['name'])      ||
    empty($_POST['email'])     ||
    empty($_POST['phone'])     ||
    empty($_POST['message'])   ||

    !filter_var($_POST['email'],FILTER_VALIDATE_EMAIL))
    {
   		echo "Žiadne argumenty neboli prevedené!";
   		return false;
    }

$name = strip_tags(htmlspecialchars($_POST['name']));
$email = strip_tags(htmlspecialchars($_POST['email']));
$phone = strip_tags(htmlspecialchars($_POST['phone']));
$message = strip_tags(htmlspecialchars($_POST['message']));

$to = 'info@kravmaga-nitra.sk';

$email_subject = "REGISTRÁCIA - Krav Maga Nitra";

$email_body = "<html>
	<body>
	<b>REGISTRAČNÉ ÚDAJE</b>
	<br>
	<p>
	   <b>Meno a priezvisko:</b> $name<br>
       <b>E-mail:</b> $email</p><br>
	   <b>Telefónne číslo:</b> $phone
    </p>
	<p>
	   <b>Správa:</b><br>
	   $message
	</p>
	</body>
	</html>";

$email_headers = "MIME-Version: 1.0" . "\r\n";
$email_headers .= "Content-type:text/html;charset=UTF-8" . "\r\n";

// moze aj nemusi asi ??
$email_headers .= 'From: <info@kravmaga-nitra.sk>';

mail($to, $email_subject, $email_body, $email_headers);

return true; 
        
?>