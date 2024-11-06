<?php

    // Incloure l'arxiu de configuració i carregar la classe 'Database'
    require_once __DIR__ . '/config/Database.php';
    require_once __DIR__ . '/models/Model.php';
    require_once __DIR__ . '/models/Customer.php';

    use Config\Database;
    use Models\Employee;
    use Models\Customer;
    
  
    $customers = Customer::all();
    
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
         
      
    </style>
</head>

<h1>Customers</h1>
<body>
    <div class="menu">
    <a href="Customers.php">Customers</a>
    <a href="CustomersNew.php">Add Customer</a>
    <a href="ModCustomer.php">Mod Customer</a>
    <a href="Employees.php">Employees</a>
    
    </div>

    
    <table>
       
        <tr>
            <th>Customer ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Street Address</th>
            <th>City</th>
            <th>State</th>
            <th>Postal Code</th>
            <th>Country</th>
            <th>Phone Number</th>
            <th>NLS Language</th>
            <th>NLS Territory</th>
            <th>Credit Limit</th>
            <th>Email</th>
            <th>Account Manager ID</th>
            <th>Geo Location</th>
            <th>Date of Birth</th>
            <th>Marital Status</th>
            <th>gender</th>
            <th>Income Level</th>
        
            
            
        </tr>
        <?php
        try {
            //Crear un Customer
          
            $customer = new Customer( 13,
                                    "Tomeu",
                                    "Vives",
                                    "C Ses Illes Balears 12",
                                    "07190",
                                    "Illes Balears",
                                    "IA",
                                    "ES",
                                    "123456789",
                                    "ES",
                                    "SP",
                                    1000.00,
                                    "mcr@gmail.com",
                                    145,
                                    "[-86.13631, 40.485424, null]",
                                    "2024-01-01",
                                    "married",
                                    "F",
                                    "1000-2000" );
            // Guardar l'empleat a la base de dades
            $customer->save();  // INSERT / UPDATE
          
        
        } catch(\mysqli_sql_exception $e) {
            
            echo "S'ha produït el següent error:" . "<br>" . $e->getMessage();
        }
            foreach ($customers as $customer) {
                echo '<tr>';
                echo '<td>'. $customer->getCustomerId() . '</td>';
                echo '<td>'. $customer->getCustFirstName() . '</td>';
                echo '<td>'. $customer->getCustLastName() . '</td>';
                echo '<td>'. $customer->getCustStreetAddress() . '</td>';
                echo '<td>'. $customer->getCustCity() . '</td>';
                echo '<td>'. $customer->getCustState() . '</td>';
                echo '<td>'. $customer->getCustPostalCode() . '</td>';
                echo '<td>'. $customer->getCustCountry() . '</td>';
                echo '<td>'. $customer->getPhoneNumbers() . '</td>';
                echo '<td>'. $customer->getNlsLanguage() . '</td>';
                echo '<td>'. $customer->getNlsTerritory() . '</td>';
                echo '<td>'. $customer->getCreditLimit() . '</td>';
                echo '<td>'. $customer->getCustEmail() . '</td>';
                echo '<td>'. $customer->getAccountMgrId() . '</td>';
                echo '<td>'. $customer->getCustGeoLocation() . '</td>';
                echo '<td>'. $customer->getDateOfBirth() . '</td>';
                echo '<td>'. $customer->getMaritalStatus() . '</td>';
                echo '<td>'. $customer->getGender() . '</td>';
                echo '<td>'. $customer->getIncomeLevel() . '</td>';
                echo '</tr>';
            }
            
            
            ?>
    </table>
    
</body>
</html>