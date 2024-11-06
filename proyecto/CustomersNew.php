<?php
	spl_autoload_register(function($classe) {
		if (file_exists(str_replace('\\','/',$classe) . '.php'))
			require_once(str_replace('\\','/',$classe) . '.php');
	});

	function convertToNull($value) {
		return $value === '' ? null : $value;
	}

	use Config\Database;
	use Models\Customer;

    try {
		// Si el formulari ha estat enviat
		if ($_SERVER["REQUEST_METHOD"] == "POST") {
			// Obtenir els valors del formulari
			$customer_id = $_POST['customer_id'];
            $cust_first_name = $_POST['cust_first_name'];
            $cust_last_name = $_POST['cust_last_name'];
            $cust_street_address = $_POST['cust_street_address'];
            $cust_city = $_POST['cust_city'];
            $cust_state = $_POST['cust_state'];
            $cust_postal_code = $_POST['cust_postal_code'];
            $cust_country = $_POST['cust_country'];
            $phone_numbers = $_POST['phone_numbers'];
            $nls_language = $_POST['nls_language'];
            $nls_territory = $_POST['nls_territory'];
            $credit_limit = $_POST['credit_limit'];
            $cust_email = $_POST['cust_email'];
            $account_mgr_id = $_POST['account_mgr_id'];
            $cust_geo_location = $_POST['cust_geo_location'];
            $date_of_birth = $_POST['date_of_birth'];
            $marital_status = $_POST['marital_status'];
            $gender = $_POST['gender'];
            $income_level = $_POST['income_level'];

            // Crear una nova instància d'Employee amb els valors del formulari
            $customer = new Customer( $customer_id,
            $cust_first_name,
            $cust_last_name,
            $cust_street_address,
            $cust_city,
            $cust_state,
            $cust_postal_code,
            $cust_country,
            $phone_numbers,
            $nls_language,
            $nls_territory,
            $credit_limit,
            $cust_email,
            $account_mgr_id,
            $cust_geo_location,
            $date_of_birth,
            $marital_status,
            $gender,
            $income_level );


            // Guardar l'empleat a la base de dades
            $customer->save();  // INSERT / UPDATE
        }
    } catch (\mysqli_sql_exception $e) {
        echo "S'ha produït el següent error:" . "<br>" . $e->getMessage();
    }
?>


<!DOCTYPE html>
<html lang="ca">
	<head>
		<meta charset="UTF-8">
		<title>Formulari d'Empleat</title>
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
		input[type=email] {
			width: 100%;
			padding: 12px 20px;
			margin: 8px 0;
			box-sizing: border-box;
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
	<body>
	<div class="menu">
  

  <h1>Afegir un Nou Empleat</h1>
  <a href="Customers.php">Customers</a>
    <a href="ModCustomer.php">Mod Customer</a>
    <a href="Employees.php">Employees</a>
  </div>
       

		<form method="POST" action="">
            <label for="customer_id">Customer ID:</label><br>
            <input type="text" id="customer_id" name="customer_id" required><br>
            <label for="cust_first_name">First Name:</label><br>
            <input type="text" id="cust_first_name" name="cust_first_name" required><br>
            <label for="cust_last_name">Last Name:</label><br>
            <input type="text" id="cust_last_name" name="cust_last_name" required><br>
            <label for="cust_street_address">Street Address:</label><br>
            <input type="text" id="cust_street_address" name="cust_street_address" required><br>
            <label for="cust_postal_code">Postal Code:</label><br>
            <input type="text" id="cust_postal_code" name="cust_postal_code" required><br>
            <label for="cust_city">City:</label><br>
            <input type="text" id="cust_city" name="cust_city" required><br>
            <label for="cust_state">State:</label><br>
            <input type="text" id="cust_state" name="cust_state" required><br>
            <label for="cust_country">Country:</label><br>
            <input type="text" id="cust_country" name="cust_country" required><br>
            <label for="phone_numbers">Phone Numbers:</label><br>
            <input type="text" id="phone_numbers" name="phone_numbers" required><br>
            <label for="nls_language">NLS Language:</label><br>
            <input type="text" id="nls_language" name="nls_language" required><br>
            <label for="nls_territory">NLS Territory:</label><br>
            <input type="text" id="nls_territory" name="nls_territory" required><br>
            <label for="credit_limit">Credit Limit:</label><br>
            <input type="text" id="credit_limit" name="credit_limit" required><br>
            <label for="cust_email">Email:</label><br>
            <input type="email" id="cust_email" name="cust_email" required><br>
            <label for="account_mgr_id">Account Manager ID:</label><br>
            <input type="text" id="account_mgr_id" name="account_mgr_id" required><br>
            <label for="cust_geo_location">Geo Location:</label><br>
            <input type="text" id="cust_geo_location" name="cust_geo_location" required><br>
            <label for="date_of_birth">Date of Birth:</label><br>
            <input type="text" id="date_of_birth" name="date_of_birth" required><br>
            <label for="marital_status">Marital Status:</label><br>
            <input type="text" id="marital_status" name="marital_status" required><br>
            <label for="gender">Gender:</label><br>
            <input type="text" id="gender" name="gender" required><br>
            <label for="income_level">Income Level:</label><br>
            <input type="text" id="income_level" name="income_level" required><br>

            <input type="submit" value="Submit">
			
		</form>
	</body>
</html>