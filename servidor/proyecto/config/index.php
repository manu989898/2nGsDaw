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
    <h1>peret</h1>
    <h3>Employees</h3>
    <a href="./models/hola.php">Employees prueba</a>
    <a href="departments.php">Departments</a>
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
    <h1>Customers</h1>
    <table>
        <tr>
            <th>Customer ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Street</th>
            <th>City</th>
            <th>State</th>
            <th>Postal Code</th>
            <th>Country</th>
            <th>Sales Rep Employee ID</th>
            <th>Credit Limit</th>
        </tr>
        <?php
            
            foreach ($customers as $customer) {
                echo '<tr>';
                echo '<td>' . $customer->getCustomerId() . '</td>';
                echo '<td>' . $customer->getFirstName() . '</td>';
                echo '<td>' . $customer->getLastName() . '</td>';
                echo '<td>' . $customer->getEmail() . '</td>';
                echo '<td>' . $customer->getPhoneNumber() . '</td>';
                echo '<td>' . $customer->getStreet() . '</td>';
                echo '<td>' . $customer->getCity() . '</td>';
                echo '<td>' . $customer->getState() . '</td>';
                echo '<td>' . $customer->getPostalCode() . '</td>';
                echo '<td>' . $customer->getCountry() . '</td>';
                echo '<td>' . $customer->getSalesRepEmployeeId() . '</td>';
                echo '<td>' . $customer->getCreditLimit() . '</td>';
                echo '</tr>';
            }
        ?>
    </table>
</body>
</html>