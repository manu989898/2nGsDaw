<?php
spl_autoload_register(function($classe) {
    if (file_exists(str_replace('\\','/',$classe) . '.php'))
        require_once(str_replace('\\','/',$classe) . '.php');
});

use Config\Database;
use Models\Employee;

$employee = null;
$error = "";

// Verifica si se ha enviado el ID en el formulario inicial
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['search_id'])) {
    $employee_id = $_POST['search_id'];
    // Intenta cargar el empleado con el ID proporcionado
    $employee = Employee::find($employee_id);

    if (!$employee) {
        $error = "No se encontró ningún empleado con el ID proporcionado.";
    }
}

// Si se envía el formulario de actualización
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['employee_id'])) {
    $employee_id = $_POST['employee_id'];
    $first_name = $_POST['first_name'];
    $last_name = $_POST['last_name'];
    $email = $_POST['email'];
    $phone_number = $_POST['phone_number'];
    $hire_date = $_POST['hire_date'];
    $job_id = $_POST['job_id'];
    $salary = $_POST['salary'];
    $commission_pct = $_POST['commission_pct'];
    $manager_id = $_POST['manager_id'];
    $department_id = $_POST['department_id'];

    // Crear o actualizar el empleado con los valores del formulario
    $employee = new Employee(
        $employee_id,
        $first_name,
        $last_name,
        $email,
        $phone_number,
        $hire_date,
        $job_id,
        $salary,
        $commission_pct,
        $manager_id,
        $department_id
    );

    $employee->save(); // Guarda los cambios en la base de datos
    echo "Datos guardados correctamente.";
}
?>

<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Modificar Empleado</title>
    <style>
        body { background-color: #f3f3f3; font-family: Arial, sans-serif; margin: 0; padding: 0; }
        h1 { background-color: #333; color: white; text-align: center; padding: 10px 0; margin: 0; }
        .menu { background-color: #333; overflow: hidden; }
        .menu a { float: left; display: block; color: white; text-align: center; padding: 14px 20px; text-decoration: none; }
        .menu a:hover { background-color: #ddd; color: black; }
        form { margin: 20px; padding: 20px; border: 1px solid #333; background-color: white; width: 50%; margin-left: 25%; }
        input[type=text], input[type=email] { width: 100%; padding: 12px 20px; margin: 8px 0; box-sizing: border-box; }
        input[type=submit] { background-color: #333; color: white; padding: 14px 20px; margin: 8px 0; border: none; cursor: pointer; width: 100%; }
    </style>
</head>
<body>
<div class="menu">
    <h1>Modificar Empleado</h1>
    <a href="Employees.php">Employees</a>
    <a href="employeeNew.php">Add Employee</a>
    <a href="Customers.php">Customers</a>
</div>

<?php if (!$employee): ?>
    <!-- Formulario para ingresar el ID del empleado -->
    <form method="POST" action="">
        <label for="search_id">Ingrese el ID del Empleado:</label><br>
        <input type="text" id="search_id" name="search_id" required><br>
        <input type="submit" value="Buscar Empleado">
    </form>
    <?php if ($error): ?>
        <p style="color: red; text-align: center;"><?php echo $error; ?></p>
    <?php endif; ?>
<?php else: ?>
    <!-- Formulario para editar el empleado -->
    <form method="POST" action="">
        <label for="employee_id">Employee ID:</label><br>
        <input type="text" id="employee_id" name="employee_id" value="<?php echo $employee->getEmployeeId(); ?>" readonly><br>

        <label for="first_name">First Name:</label><br>
        <input type="text" id="first_name" name="first_name" value="<?php echo $employee->getFirstName(); ?>" required><br>

        <label for="last_name">Last Name:</label><br>
        <input type="text" id="last_name" name="last_name" value="<?php echo $employee->getLastName(); ?>" required><br>

        <label for="email">Email:</label><br>
        <input type="email" id="email" name="email" value="<?php echo $employee->getEmail(); ?>" required><br>

        <label for="phone_number">Phone Number:</label><br>
        <input type="text" id="phone_number" name="phone_number" value="<?php echo $employee->getPhoneNumber(); ?>" required><br>

        <label for="hire_date">Hire Date:</label><br>
        <input type="text" id="hire_date" name="hire_date" value="<?php echo $employee->getHireDate(); ?>" required><br>

        <label for="job_id">Job ID:</label><br>
        <input type="text" id="job_id" name="job_id" value="<?php echo $employee->getJobId(); ?>" required><br>

        <label for="salary">Salary:</label><br>
        <input type="text" id="salary" name="salary" value="<?php echo $employee->getSalary(); ?>" required><br>

        <label for="commission_pct">Commission Percentage:</label><br>
        <input type="text" id="commission_pct" name="commission_pct" value="<?php echo $employee->getCommissionPct(); ?>" required><br>

        <label for="manager_id">Manager ID:</label><br>
        <input type="text" id="manager_id" name="manager_id" value="<?php echo $employee->getManagerId(); ?>" required><br>

        <label for="department_id">Department ID:</label><br>
        <input type="text" id="department_id" name="department_id" value="<?php echo $employee->getDepartmentId(); ?>" required><br>

        <input type="submit" value="Guardar Cambios">
    </form>
<?php endif; ?>
</body>
</html>
