<?php

$allowed = array('image/png', 'image/jpeg');

if (isset($_GET['img'])) {
	$url = $_GET['img'];
	$ch = curl_init($url);
	curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
	curl_setopt($ch, CURLOPT_BINARYTRANSFER, true);
	$result = curl_exec($ch);
	$contentType = curl_getinfo($ch, CURLINFO_CONTENT_TYPE);

	if (in_array($contentType, $allowed)) {
		header('Content-type: ' . $contentType);
		echo $result;
	}
}

?>
