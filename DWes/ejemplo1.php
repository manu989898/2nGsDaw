<!DOCTYPE html>
<html>

<body>

  <?php
  // un ejemplo de web en php que muestra un mensaje en pantalla y la fecha actual del servidor
  echo "Hola Mundo!";
  echo "<br>";
  echo "La fecha de hoy es: " . date("Y/m/d") . "<br>";
  echo "" . date("") . "<br>";
  echo "<br>";
  // un ejemplo de sumas en php
  echo "Suma de 2 + 3 = " . (2 + 3) . "<br>";
  echo "<br>";

  ?>

  <form action="ejemplo1.php" method="post">
    Nombre:<br>
    <input type="text" name="nombre" value="">
    <br>
    Apellido:<br>
    <input type="text" name="apellido" value="">
    <br><br>
    <input type="submit" value="Enviar">
  </form>

  <!-- Ejemplo de una tabla con loop en php -->
  <?php


  echo "<br>";
  echo "<table border='1'>";
  for ($i = 1; $i <= 10; $i++) {
    echo "<tr>";
    for ($j = 1; $j <= 10; $j++) {
      echo "<td>" . $i * $j . "</td>";
    }
    echo "</tr>";
  }
  echo "</table>";
  echo "<br>";
  ?>

  <!-- Ejemplo de un loop for en php -->
  <?php
  echo "<br>";
  echo "Create a script to construct the following pattern, using a nested for loop.";
  echo "<br>";
  echo "<br>";
  $n = 5;

  for ($i = 1; $i <= $n; $i++) {
    for ($j = 1; $j <= $i; $j++) {
      echo ' * ';
    }
    echo "<br>";
  }
  for ($i = $n; $i >= 1; $i--) {
    for ($j = 1; $j <= $i; $j++) {
      echo ' * ';
    }
    echo "<br>";
    ;
  }
  ?>

  <!-- Ejemplo de un array en php -->
  <?php
  $array = array(1, 2, 3, 4, 5);

  // unset se usa para eliminar un elemento de un array
  unset($array[3]);

  print_r($array);
  echo "<br>";
  echo "posicion numero 3 = " . $array[3];
  echo "<br>";
  ?>

  <!-- Ejemplo de una funcion en php -->
  <?php
  function sumar($a, $b)
  {
    return $a + $b;
  }
  echo "<br>";
  echo "Suma de 2 + 3 = " . sumar(2, 3) . "<br>";
  echo "<br>";
  ?>

  <!-- Ejemplo de FACTORIAL CON RECURSION en php -->
  <?php
  function factorial($n)
  {
    if ($n == 0) {
      return 1;
    } else {
      if ($n > 1){
        echo "".$n ."*"; 
      }else{
        echo "".$n ."="; 
      }
      return $n * factorial($n - 1);
    }
  }
  echo "".factorial(4);
  ?>

  <!-- Ejemplo de FACTORIAL CON LOOP en php -->
  <?php
  echo "<br>";
  echo "<br>";
  $i = 4;
  function factorial2($n){
    $result = 1;
    for($i = 4; $i >= 1; $i--){
      if($i >1){
        echo "".$i ."*"; 
        $result = $result * $i;
      }else{
        echo "".$i ."=" . $result; 
      }
    }
  }
  factorial2(4);
  ?>
</body>

</html>