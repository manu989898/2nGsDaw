

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
        /*some style for the form*/ 
        form {
            margin: 20px;
            padding: 20px;
            border: 1px solid #333;
            background-color: white;
            width: 50%;
            margin-left: 25%;
        }

        input[type=text] {
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
    </style>
</head>
<h1>Customers</h1>
<body>
    <div class="menu">
    <a href="hola.php">Customers</a>
    <a href="index.php">Employees</a>
    <a href="CustomersNew.php">Add Customer</a>
    <a href="jobs.php">Jobs</a>
    <a href="locations.php">Locations</a>
    <a href="warehouses.php">Warehouses</a>
    <a href="categories.php">Categories</a>
    <a href="customers.php">Customers</a>
    <a href="products.php">Products</a>
    <a href="orders.php">Orders</a>
    </div>
   
    <form method="POST" action="">
			<label>ID Empleat:</label><br>
			<input type="number" name="employee_id" required><br><br>
			
			<label>Nom:</label><br>
			<input type="text" name="first_name" required><br><br>
			
			<label>Llinatge:</label><br>
			<input type="text" name="last_name" required><br><br>
			
			<label>Email:</label><br>
			<input type="email" name="email" required><br><br>
			
			<label>Número de Telèfon:</label><br>
			<input type="text" name="phone_number"><br><br>
			
			<label>Data de Contractació:</label><br>
			<input type="date" name="hire_date" required><br><br>
			
			<label>ID de Treball:</label><br>
			<input type="text" name="job_id" required><br><br>
			
			<label>Salari:</label><br>
			<input type="number" name="salary" step="0.01" required><br><br>
			
			<label>Comissió:</label><br>
			<input type="number" name="commission_pct" step="0.01"><br><br>
			
			<label>ID del Gerent:</label><br>
			<input type="number" name="manager_id"><br><br>
			
			<label>ID del Departament:</label><br>
			<input type="number" name="department_id"><br><br>
			
			<input type="submit" value="Afegir Empleat">
		</form>

<?php

       

    require_once 'models/Customer.php';
    require_once 'models/Database.php';


    try {
		// Si el formulari ha estat enviat
		if ($_SERVER["REQUEST_METHOD"] == "POST") {
			// Obtenir els valors del formulari
			$employee_id    = $_POST['employee_id'];
			$first_name     = $_POST['first_name'];
			$last_name      = $_POST['last_name'];
			$email          = $_POST['email'];
			$phone_number   = $_POST['phone_number'];
			$hire_date      = $_POST['hire_date'];
			$job_id         = $_POST['job_id'];
			$salary         = $_POST['salary'];
			$commission_pct = $_POST['commission_pct'];
			$manager_id     = $_POST['manager_id'];
			$department_id  = $_POST['department_id'];
			
			// Crear una nova instància d'Employee amb els valors del formulari
			$employee = new Employee( $employee_id, 
									$first_name,
									$last_name,
									convertToNull($email),
									convertToNull($phone_number),
									convertToNull($hire_date),
									$job_id, 
									convertToNull($salary), 
									convertToNull($commission_pct), 
									convertToNull($manager_id),
									convertToNull($department_id) );

			// Guardar l'empleat a la base de dades
			$employee->save();  // INSERT / UPDATE
		}
	} catch(\Exception $e) {
		echo "S'ha produït el següent error:" . "<br>" . $e->getMessage();
	}

?>
    
</body>
</html>

    