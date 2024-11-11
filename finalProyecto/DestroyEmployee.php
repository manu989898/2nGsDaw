<?php
spl_autoload_register(function ($class) {
    $file = str_replace('\\', '/', $class) . '.php';
    if (file_exists($file)) {
        require_once $file;
    }
});

use Models\Employee;

$message = '';
$employee = null;

// Verificar si se ha enviado el formulario para buscar un empleado
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['find'])) {
    $id = $_POST['id'];
    if (!empty($id)) {
        // Llamar al método estático find para buscar el empleado por ID
        $employee = Employee::find($id);
        
        if (!$employee) {
            $message = "Empleado no encontrado con ID $id.";
        }
    } else {
        $message = "Por favor, ingrese un ID.";
    }
}

// Verificar si se ha enviado el formulario para eliminar un empleado
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['delete'])) {
    $id = $_POST['id'];
    if (!empty($id)) {
        // Buscar el empleado antes de intentar eliminarlo
        $employee = Employee::find($id);
        
        if ($employee) {
            // Llamar a destroy en la instancia del empleado encontrado
            if ($employee->destroy()) {
                $message = "Empleado eliminado exitosamente.";
                $employee = null; // Limpiar los datos después de eliminar
            } else {
             $message = "Eliminado correctamente";
            }
        } else {
            $message = "Empleado no encontrado con ID $id.";
        }
    } else {
        $message = "Por favor, ingrese un ID para eliminar.";
    }
}
session_start(); // si ja existeix sessió, associa la sessió a l'actual
ob_start();  // necessari per a la redirecció de 'header()': resetea el buffer de salida

// Comprova si l'usuari ha iniciat la sessió
if (!isset($_SESSION['username'])) {  // si està definida amb un valor no null -> true
    // Si no es troba una sessió, cal treure l'usuari fora
    header("Location: login.php");  // redirigeix a 'login'
    exit();  // garanteix que no s'executi més codi
}

ob_end_flush();  // necessari per a la redirecció de 'header()': envia la sortida enmagatzemada en el buffer
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Buscar y Eliminar Empleado</title>
    <style>
        body {
            background-color: #f3f3f3;
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
        }

        h1 {
            background-color: #333;
            color: white;
            text-align: center;
            padding: 10px 0;
            margin: 0;
        }

        .menu {
            background-color: #333;
            overflow: hidden;
        }

        .menu a {
            float: left;
            display: block;
            color: white;
            text-align: center;
            padding: 14px 20px;
            text-decoration: none;
        }

        .menu a:hover {
            background-color: #ddd;
            color: black;
        }

        form {
            margin: 20px;
            padding: 20px;
            border: 1px solid #333;
            background-color: white;
            width: 50%;
            margin-left: 25%;
        }

        input[type=text],
        input[type=email] {
            width: 100%;
            padding: 12px 20px;
            margin: 8px 0;
            box-sizing: border-box;
        }

        input[type=submit] {
            background-color: #333;
            color: white;
            padding: 14px 20px;
            margin: 8px 0;
            border: none;
            cursor: pointer;
            width: 100%;
        }

        .login {
            background-color: #333;
            color: white;
            text-align: right;
            padding: 10px 20px;

        }

        .login a {
            color: white;
            text-decoration: none;
        }
        .container {
            margin: 20px;
            padding: 20px;
            border: 1px solid #333;
            background-color: white;
            width: 50%;
            margin-left: 25%;
        }
    </style>
    
</head>
<body>
    <div class="login">
        <h2>Benvingut, <?php echo htmlspecialchars($_SESSION['username']); ?></h2>
        
        <a href="logout.php">Tancar Sessió</a>
    </div>
    <div class="menu">

<h1>Buscar Empleado</h1>
    <a href="Employees.php">Employees</a>
        <a href="employeeNew.php">Add Employee</a>
        <a href="ModEmployee.php">Mod Employee</a>
        <a href="Customers.php">Customers</a>
    </div>
    <form method="post" action="">
        <label for="id">ID del Empleado:</label>
        <input type="text" name="id" id="id" value="<?php echo isset($_POST['id']) ? htmlspecialchars($_POST['id']) : ''; ?>">
        <button type="submit" name="find">Buscar</button>
        <button type="submit" name="delete">Eliminar</button>
    </form>

    <?php if ($message): ?>
        <div class="container">
        <p><?php echo htmlspecialchars($message); ?></p>
        </div>
    <?php endif; ?>

    <?php if ($employee): ?>
        <div class="container">
        <h2>Datos del Empleado</h2>
        <p>ID: <?php echo htmlspecialchars($employee->getEmployeeId()); ?></p>
        <p>Nombre: <?php echo htmlspecialchars($employee->getFirstName()); ?></p>
        <p>Correo: <?php echo htmlspecialchars($employee->getEmail()); ?></p>
        </div>
      
    <?php endif; ?>
</body>
</html>
