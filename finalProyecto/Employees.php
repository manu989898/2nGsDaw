<?php
spl_autoload_register(function ($classe) {
    if (file_exists(str_replace('\\', '/', $classe) . '.php'))
        require_once(str_replace('\\', '/', $classe) . '.php');
});


use Config\Database;
use Models\Employee;
use Models\Customer;


$employees = Employee::all();
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
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="global.css">
    <title>Document</title>
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
    </style>
</head>

<body>
    <div class="login">
        <h2>Benvingut, <?php echo htmlspecialchars($_SESSION['username']); ?></h2>

        <a href="logout.php">Tancar Sessió</a>
    </div>
    <div class="menu">

        <h1>Employees</h1>
        <a href="Employees.php">Employees</a>
        <a href="employeeNew.php">Add Employee</a>
        <a href="ModEmployee.php">Mod Employee</a>
        <a href="DestroyEmployee.php">Destroy Employee</a>
        <a href="Customers.php">Customers</a>

    </div>

    <table>
        <tr>
            <th>Employee ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Hire Date</th>
            <th>Job ID</th>
            <th>Salary</th>
            <th>Commission PCT</th>
            <th>Manager ID</th>
            <th>Department ID</th>
        </tr>

        <?php
        foreach ($employees as $employee) {
            echo '<tr>';
            echo '<td>' . $employee->getEmployeeId() . '</td>';
            echo '<td>' . $employee->getFirstName() . '</td>';
            echo '<td>' . $employee->getLastName() . '</td>';
            echo '<td>' . $employee->getEmail() . '</td>';
            echo '<td>' . $employee->getPhoneNumber() . '</td>';
            echo '<td>' . $employee->getHireDate() . '</td>';
            echo '<td>' . $employee->getJobId() . '</td>';
            echo '<td>' . $employee->getSalary() . '</td>';
            echo '<td>' . $employee->getCommissionPct() . '</td>';
            echo '<td>' . $employee->getManagerId() . '</td>';
            echo '<td>' . $employee->getDepartmentId() . '</td>';
            echo '</tr>';
        }

        ?>

    </table>

</body>

</html>