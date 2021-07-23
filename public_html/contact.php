<?
// Файлы phpmailer
require 'phpmailer/PHPMailer.php';
require 'phpmailer/SMTP.php';
require 'phpmailer/Exception.php';

// Переменные, которые отправляет пользователь
$name = $_POST['name'];
$email = $_POST['email'];
$text = $_POST['message'];

// Формирование самого письма
$title = "Письмо с сайта AlexLenk.ru";
$body = "
<h2>Письмо с сайта AlexLenk.ru со страницы контакты</h2>
<b>Имя:</b> $name<br>
<b>Почта:</b> $email<br><br>
<b>Сообщение:</b><br>$text
";

// Настройки PHPMailer
$mail = new PHPMailer\PHPMailer\PHPMailer();


// Отображение результата
//echo json_encode(["result" => $result, "resultfile" => $rfile, "status" => $status]);





// Server side validation
function isValid() {
  // This is the most basic validation for demo purpose. Replace this with your own server side validation
  if ($_POST['name'] != "" && $_POST['email'] != "" && $_POST['message'] != "") {
    return true;
  } else {
    return false;
  }
}

$error_output = '';
$success_output = '';

if (isValid()) {
  // Build POST request to get the reCAPTCHA v3 score from Google
  $recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
  $recaptcha_secret = '6LfXZCEaAAAAAO3QtLWSrG5ofpC1IMwBJqo0TCNg'; // Insert your secret key here
  $recaptcha_response = $_POST['recaptcha_response'];

  // Make and decode POST request
  $recaptcha = file_get_contents($recaptcha_url . '?secret=' . $recaptcha_secret . '&response=' . $recaptcha_response);
  $recaptcha = json_decode($recaptcha);


  try {
    $mail->isSMTP();
    $mail->CharSet = "UTF-8";
    $mail->SMTPAuth = true;
    //$mail->SMTPDebug = 2;
    $mail->Debugoutput = function ($str, $level) {
      $GLOBALS['status'][] = $str;
    };

    // Настройки вашей почты
    $mail->Host = 'smtp.beget.com'; // SMTP сервера вашей почты
    $mail->Username = 'send@alexlenk.ru'; // Логин на почте
    $mail->Password = 'tzU%Jcc3'; // Пароль на почте
    $mail->SMTPSecure = 'ssl';
    $mail->Port = 465;
    $mail->setFrom('send@alexlenk.ru', 'send@alexlenk.ru'); // Адрес самой почты и имя отправителя

    // Получатель письма
    $mail->addAddress('send@alexlenk.ru'); // Ещё один, если нужен

// Отправка сообщения
    $mail->isHTML(true);
    $mail->Subject = $title;
    $mail->Body = $body;

// Проверяем отравленность сообщения
    if ($mail->send()) {
      $result = "success";
    } else {
      $result = "error";
    }

  } catch (Exception $e) {
    $result = "error";
    $status = "Сообщение не было отправлено. Причина ошибки: {$mail->ErrorInfo}";
  }

  // Take action based on the score returned
  if ($recaptcha->success == true && $recaptcha->score >= 0.5 && $recaptcha->action == 'contact') {
    // This is a human. Insert the message into database OR send a mail
    $success_output = "Your message sent successfully";
  } else {
    // Score less than 0.5 indicates suspicious activity. Return an error
    $error_output = "Something went wrong. Please try again later";
  }
} else {
  // Server side validation failed
  $error_output = "Please fill all the required fields";
}

$output = array(
  'error' => $error_output,
  'success' => $success_output
);

// Output needs to be in JSON format
echo json_encode($output);
