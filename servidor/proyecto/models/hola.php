
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <h1>HR & OE Management</h1>
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
        require_once __DIR__ . '/config/Database.php';
        require_once __DIR__ . '/models/Model.php';
        require_once __DIR__ . '/models/Employee.php';
    
        use Config\Database;
        use Models\Employee;
       

        echo 'hola';
        $employees = Employee::all();
       
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
</body>
</html>