<?php
// Permitir solicitudes desde cualquier origen
header('Access-Control-Allow-Origin: *');

// Especifica la URL de la API de 4chan desde donde se recuperarán los foros
$url = 'https://a.4cdn.org/boards.json';

// Utiliza cURL para hacer la solicitud a la API de 4chan
$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

// Opcional: Añade más opciones a cURL si es necesario, como ajustes de timeout

$response = curl_exec($ch);
curl_close($ch);

// Devuelve la respuesta al cliente
echo $response;
?>
