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
        echo '<td style="width:100px;">' . $employee->getEmployeeId() . '</td>';
        echo '<td style="width:100px;">' . $employee->getFirstName() . '</td>';
        echo '<td style="width:100px;">' . $employee->getLastName() . '</td>';
        echo '<td style="width:100px;">' . $employee->getEmail() . '</td>';
        echo '<td style="width:100px;">' . $employee->getPhoneNumber() . '</td>';
        echo '<td style="width:100px;">' . $employee->getHireDate() . '</td>';
        echo '<td style="width:100px;">' . $employee->getJobId() . '</td>';
        echo '<td style="width:100px;">' . $employee->getSalary() . '</td>';
        echo '<td style="width:100px;">' . $employee->getCommissionPct() . '</td>';
        echo '<td style="width:100px;">' . $employee->getManagerId() . '</td>';
        echo '<td style="width:100px;">' . $employee->getDepartmentId() . '</td>';
        echo '</tr>';
    }
    echo '</table>';
   
?>
