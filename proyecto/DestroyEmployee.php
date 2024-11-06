<?php
spl_autoload_register(function($classe) {
    if (file_exists(str_replace('\\','/',$classe) . '.php'))
        require_once(str_replace('\\','/',$classe) . '.php');
});

use Models\Employee;

$message = "";
$error = "";

// Verifica si se ha enviado el formulario para buscar y eliminar al empleado
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['employee_id'])) {
    $employee_id = $_POST['employee_id'];
    
    // Intenta cargar el empleado con el ID proporcionado
    $employee = Employee::find($employee_id);

    if ($employee) {
        // Si el empleado existe, intenta eliminarlo
        try {
            $employee->destroy();
            $message = "Empleado con ID $employee_id eliminado correctamente.";
        } catch (Exception $e) {
            $error = "Error al eliminar el empleado: " . $e->getMessage();
        }
    } else {
        $error = "No se encontró ningún empleado con el ID proporcionado.";
    }
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Eliminar Empleado</title>
    <style>
        body { background-color: #f3f3f3; font-family: Arial, sans-serif; margin: 0; padding: 0; }
        h1 { background-color: #333; color: white; text-align: center; padding: 10px 0; margin: 0; }
        .menu { background-color: #333; overflow: hidden; }
        .menu a { float: left; display: block; color: white; text-align: center; padding: 14px 20px; text-decoration: none; }
        .menu a:hover { background-color: #ddd; color: black; }
        form { margin: 20px; padding: 20px; border: 1px solid #333; background-color: white; width: 50%; margin-left: 25%; }
        input[type=text], input[type=submit] { width: 100%; padding: 12px 20px; margin: 8px 0; box-sizing: border-box; }
        input[type=submit] { background-color: #333; color: white; border: none; cursor: pointer; }
        .message { text-align: center; color: green; }
        .error { text-align: center; color: red; }
    </style>
</head>
<body>
<div class="menu">
    <h1>Eliminar Empleado</h1>
    <a href="Employees.php">Empleados</a>
    <a href="employeeNew.php">Agregar Empleado</a>
    <!-- Añade más enlaces si es necesario -->
</div>

<!-- Formulario para ingresar el ID del empleado a eliminar -->
<form method="POST" action="">
    <label for="employee_id">Ingrese el ID del Empleado a Eliminar:</label><br>
    <input type="text" id="employee_id" name="employee_id" required><br>
    <input type="submit" value="Eliminar Empleado">
</form>

<?php if ($message): ?>
    <p class="message"><?php echo $message; ?></p>
<?php elseif ($error): ?>
    <p class="error"><?php echo $error; ?></p>
<?php endif; ?>

</body>
</html>
