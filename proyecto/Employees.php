<?php

    // Incloure l'arxiu de configuració i carregar la classe 'Database'
    require_once __DIR__ . '/config/Database.php';
    require_once __DIR__ . '/models/Model.php';
    require_once __DIR__ . '/models/Employee.php';

    use Config\Database;
    use Models\Employee;
    use Models\Customer;
    
  
    $employees = Employee::all();
    
    
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
        table {
            width: 100%;
            border-collapse: collapse;
        }
        th, td {
            border: 1px solid black;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
        }
    </style>
</head>
<body>
    <div class="menu">
  
    <h1>Employees</h1>
    <a href="Customers.php">Customers</a>
    <a href="Employees.php">Employees</a>
    <a href="employeeNew.php">Add Employee</a>
    <a href="jobs.php">Jobs</a>
    <a href="locations.php">Locations</a>
    <a href="warehouses.php">Warehouses</a>
    <a href="categories.php">Categories</a>
    <a href="customers.php">Customers</a>
    <a href="products.php">Products</a>
    <a href="orders.php">Orders</a>
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