<?
$name = $_POST['ui_name'];
$email = $_POST['ui_email'];
$messageSite = $_POST['ui_message'];

$to = "send@alexlenk.ru";

$subject = 'Сообщение c AlexLenk.ru';

$message = '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="ru" xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
  <title>' . $subject . '</title>
</head>
<body>
  <p><b>Имя:</b> ' . $name . '</p>
  <p><b>E-mail:</b> ' . $email . '</p>
  <p><b>Сообщение:</b></p>
  <p> ' . $messageSite . '</p>
</body>
</html>';


$headers = "Content-type: text/html; charset=utf-8 \r\n";
$headers .= "From: Сообщение с AlexLenk.ru  <noreply@alexlenk.ru>\r\n";


// Server side validation
function isValid()
{
  // This is the most basic validation for demo purpose. Replace this with your own server side validation
  if ($_POST['ui_name'] != "" && $_POST['ui_email'] != "" && $_POST['ui_message'] != "") {
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
  $recaptcha_secret = '6LfXZCEaAAAAAFWCEzxAWi76OlC-P05by3kqUsnC'; // Insert your secret key here
  $recaptcha_response = $_POST['recaptcha_response'];

  // Make and decode POST request
  $recaptcha = file_get_contents($recaptcha_url . '?secret=' . $recaptcha_secret . '&response=' . $recaptcha_response);
  $recaptcha = json_decode($recaptcha);

  // Take action based on the score returned
  if ($recaptcha->success == true && $recaptcha->score >= 0.5 && $recaptcha->action == 'contact') {
    // This is a human. Insert the message into database OR send a mail
    $success_output = "Ваше сообщение успешно отправлено";
    mail($to, $subject, $message, $headers);

  } else {
    // Score less than 0.5 indicates suspicious activity. Return an error
    $error_output = "Что-то пошло не так. Пожалуйста, повторите попытку позже";
  }
} else {
  // Server side validation failed
  $error_output = "Пожалуйста, заполните все обязательные поля";
}

$output = array(
  'error' => $error_output,
  'success' => $success_output
);

// Output needs to be in JSON format
echo json_encode($output);


/*
$recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
$recaptcha_secret = '6LfXZCEaAAAAAFWCEzxAWi76OlC-P05by3kqUsnC';
$recaptcha_response = $_POST['recaptcha_response'];
$recaptcha = file_get_contents($recaptcha_url . '?secret=' . $recaptcha_secret . '&response=' . $recaptcha_response);
$recaptcha = json_decode($recaptcha);
if ($recaptcha->score >= 0.6) {
  if (mail($to, $subject, $message, $headers)) {
    echo 'Ваше сообщение успешно отправлено (ответ сервера)!';
  } else {
    echo 'Возникла ошибка при отработке функции mail на сервере (ответ сервера)!';
  }
} else {
  echo 'Возникла ошибка при отработке функции mail на сервере (ответ сервера)!';
}



// Проверяем была ли отправлена форма
/*if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['recaptcha_response'])) {

  // Создаем POST запрос
  $recaptcha_url = 'https://www.google.com/recaptcha/api/siteverify';
  $recaptcha_secret = '6LfXZCEaAAAAAFWCEzxAWi76OlC-P05by3kqUsnC';
  $recaptcha_response = $_POST['recaptcha_response'];

  // Отправляем POST запрос и декодируем результаты ответа
  $recaptcha = file_get_contents($recaptcha_url . '?secret=' . $recaptcha_secret . '&response=' . $recaptcha_response);
  $recaptcha = json_decode($recaptcha);

  // Принимаем меры в зависимости от полученного результата
  if ($recaptcha->score >= 0.5) {
    // Проверка пройдена - отправляем сообщение.
    mail($to, $subject, $message, $headers);
    echo 'Проверка пройдена - отправляем сообщение.';
  } else {
    // Проверка не пройдена. Показываем ошибку.
    echo 'Возникла ошибка при отработке функции mail на сервере (ответ сервера)!';
  }
}*/
