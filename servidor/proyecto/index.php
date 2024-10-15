<?php

    // Incloure l'arxiu de configuració i carregar la classe 'Database'
    require_once __DIR__ . '/config/Database.php';
    require_once __DIR__ . '/models/Model.php';
    require_once __DIR__ . '/models/Employee.php';

    use Config\Database;
    use Models\Employee;
    
  
    $employees = Employee::all();
    
    echo '<pre>';
    print_r($employees);  // en comptes d'un foreach
    echo '</pre>';
    
    //crear taula per mostrar les dades
    echo '<table border="1">';
    echo '<tr>';
    echo '<th>Employee ID</th>';
    echo '<th>First Name</th>';
    echo '<th>Last Name</th>';
    echo '<th>Email</th>';
    echo '<th>Phone Number</th>';
    echo '<th>Hire Date</th>';
    echo '<th>Job ID</th>';
    echo '<th>Salary</th>';
    echo '<th>Commission PCT</th>';
    echo '<th>Manager ID</th>';
    echo '<th>Department ID</th>';
    echo '</tr>';
    foreach ($employees as $employee) {
        //td with styles widht 100px
        echo '<tr>';
        echo '<td style="height:100px;">' . $employee['employee_id'] . '</td>';
        echo '<td style="height:100px;">' . $employee['first_name'] . '</td>';
        echo '<td style="height:100px;">' . $employee['last_name'] . '</td>';
        echo '<td style="height:100px;">' . $employee['email'] . '</td>';
        echo '<td style="height:100px;">' . $employee['phone_number'] . '</td>';
        echo '<td style="height:100px;">' . $employee['hire_date'] . '</td>';
        echo '<td style="height:100px;">' . $employee['job_id'] . '</td>';
        echo '<td style="height:100px;">' . $employee['salary'] . '</td>';
        echo '<td style="height:100px;">' . $employee['commission_pct'] . '</td>';
        echo '<td style="height:100px;">' . $employee['manager_id'] . '</td>';
        echo '<td style="height:100px;">' . $employee['department_id'] . '</td>';
        echo '</tr>';
    }
    echo '</table>';
   
?>
