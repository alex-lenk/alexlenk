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

/*
if (mail($to, $subject, $message, $headers)) {
  echo 'Ваше сообщение успешно отправлено (ответ сервера)!';
} else {
  echo 'Возникла ошибка при отработке функции mail на сервере (ответ сервера)!';
}*/


// Проверяем была ли отправлена форма
if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_POST['recaptcha_response'])) {

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
}
