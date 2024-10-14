<?php
	// Include config file
	require_once "config.php";
	$conn = null;
	$p_ID = $p_last_name = $p_first_name = "";
    $adress = "";
	$p_marital_status = ""; // Inicializamos la variable
	$p_gender = ""; // Inicializamos la variable
	$text_err = "Please enter a text.";
	
	try {
		if($_SERVER["REQUEST_METHOD"] == "POST"){
			$p_ID = trim($_POST["id"]);
			$p_last_name = trim($_POST["last_name"]);
			$p_first_name = trim($_POST["first_name"]);
            $adress = $_POST["adress"];
			$p_marital_status = isset($_POST["marital_status"]) ? trim($_POST["marital_status"]) : '';
			$p_gender = isset($_POST["gender"]) ? trim($_POST["gender"]) : '';
			/* Attempt to connect to MySQL database */
			$conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
			mysqli_autocommit($conn, true);
			
			// Attempt select query execution
			$query = "INSERT INTO customers ( customer_id, cust_first_name, cust_last_name, cust_street_address, marital_status, gender  )
					  VALUES( " . $p_ID . ", '" . $p_first_name ."','" . $p_last_name ."','" . $adress . "','" . $p_marital_status. "'," .$p_gender  .")";
			//PRUEBAS
			echo $query;	  
			$table = mysqli_query($conn, $query);
			// mysqli_commit($conn);
		
		}
	} catch (mysqli_sql_exception $e) {
		echo  "</p> ERROR:" . $e->getMessage() . "</p>";
	} catch (Exception $e) {
		echo "</p>" . $e->getMessage() . "</p>";
	} catch (Error $e) {
		echo "</p>" . $e->getMessage() . "</p>";
	} finally {
		try {
			mysqli_close($conn);
		} catch (Exception $e) {
			// Nothing to do
		} catch (Error $e) {
			// Nothing to do
		}
	}
?>

<!DOCTYPE html>
<html>
<head>
	<meta charset="UTF-8">
	<link rel="stylesheet" href="estils.css">
	<title>Human Resource</title>
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
	<script src="https://code.jquery.com/jquery-3.5.1.min.js"></script>
	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/js/bootstrap.min.js"></script>
	<style>
		.wrapper {
			width: 600px;
			margin: 0 auto;
		}
		table tr td:last-child {
			width: 120px;
		}
	</style>
	<script>
		$(document).ready(function () {
			$('[data-toggle="tooltip"]').tooltip();
		});
	</script>
</head>
<body>
	<div id="header">
		<h1>HR & OE Management</h1>
	</div>
	<div id="content">
		<div id="menu">
			<ul>
				<li><a href="index.php">Home</a></li>
				<li>
					<ul> HR
						<li><a href="employees.php">Employees</a></li>
						<li><a href="departments.php">Departments</a></li>
						<li><a href="jobs.php">Jobs</a></li>
						<li><a href="locations.php">Locations</a></li>
					</ul>
				</li>
				<li>
					<ul> OE
						<li><a href="warehouses.php">Warehouses</a></li>
						<li><a href="categories.php">Categories</a></li>
						<li><a href="customers.php">Customers</a></li>
						<li><a href="products.php">Products</a></li>
						<li><a href="orders.php">Orders</a></li>
					</ul>
				</li>
			</ul>
		</div>

		<div id="section">
			<h3>Employees</h3>

			<form action="<?php echo htmlspecialchars($_SERVER["PHP_SELF"]); ?>" method="post">
				<div class="form-group">
					<label>ID</label>
					<input type="text" name="id" class="form-control" value="<?php echo $p_ID; ?>">
					<span class="invalid-feedback"><?php echo $text_err;?></span>
				</div>

				<div class="form-group">
					<label>First Name</label>
					<input type="text" name="first_name" class="form-control" value="<?php echo $p_first_name; ?>">
					<span class="invalid-feedback"><?php echo $text_err;?></span>
				</div>

				<div class="form-group">
					<label>Last Name</label>
					<input type="text" name="last_name" class="form-control" value="<?php echo $p_last_name; ?>">
					<span class="invalid-feedback"><?php echo $text_err;?></span>
				</div>

                <!-- Dirección (Adress) -->
                <div class="form-group">
					<label>Adress</label>
					<input type="text" name="adress" class="form-control" value="<?php echo $adress; ?>">
					<span class="invalid-feedback"><?php echo $text_err;?></span>
				</div>

				<!-- Estado Civil (Marital Status) -->
				<div class="form-group">
					<label>Marital Status</label>
					<select name="marital_status" class="form-control">
						<option value="single" <?php echo ($p_marital_status == "single") ? "selected" : ""; ?>>Single</option>
						<option value="married" <?php echo ($p_marital_status == "married") ? "selected" : ""; ?>>Married</option>
					</select>
					<span class="invalid-feedback"><?php echo $text_err;?></span>
				</div>
				<!-- Género (Gender) -->
				<div class="form-group">
					<label>Gender</label>
					<select name="gender" class="form-control">
						<option value="m" <?php echo ($p_gender == "m") ? "selected" : ""; ?>>Male</option>
						<option value="f" <?php echo ($p_gender == "f") ? "selected" : ""; ?>>Female</option>
					</select>
					<span class="invalid-feedback"><?php echo $text_err;?></span>
				</div>


				<input type="submit" class="btn btn-primary" value="Submit">
				<a href="customers.php" class="btn btn-secondary ml-2">Cancel</a>
			</form>
		</div>
	</div>

	<div id="footer">
		<p>(c) IES Emili Darder - 2022</p>
	</div>
</body>
</html>
