<?php
spl_autoload_register(function ($classe) {
    if (file_exists(str_replace('\\', '/', $classe) . '.php'))
        require_once(str_replace('\\', '/', $classe) . '.php');
});

use Config\Database;
use Models\Customer;

$customer = null;
$error = "";

// Verifica si se ha enviado el ID en el formulario inicial
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['search_id'])) {
    $customer_id = $_POST['search_id'];
    // Intenta cargar el cliente con el ID proporcionado
    $customer = Customer::find($customer_id);

    if (!$customer) {
        $error = "No se encontró ningún cliente con el ID proporcionado.";
    }
}

// Si se envía el formulario de actualización
if ($_SERVER["REQUEST_METHOD"] == "POST" && isset($_POST['customer_id'])) {
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

    // Crear o actualizar el cliente con los valores del formulario
    $customer = new Customer(
        $customer_id,
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
        $income_level
    );

    $customer->save(); // Guarda los cambios en la base de datos
    echo "Datos guardados correctamente.";
}
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
<html lang="ca">

<head>
    <meta charset="UTF-8">
    <title>Modificar Cliente</title>
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

        form {
            margin: 20px;
            padding: 20px;
            border: 1px solid #333;
            background-color: white;
            width: 50%;
            margin-left: 25%;
        }

        input[type=text],
        input[type=email] {
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
        <h1>Modificar Client</h1>
        <a href="Customers.php">Customers</a>
        <a href="CustomersNew.php">Add Customer</a>
        <a href="DestroyCustomer.php">Destroy Customer</a>
        <a href="Employees.php">Employees</a>
    </div>

    <?php if (!$customer): ?>
        <!-- Formulario para ingresar el ID del cliente -->
        <form method="POST" action="">
            <label for="search_id">Ingrese el ID del Cliente:</label><br>
            <input type="text" id="search_id" name="search_id" required><br>
            <input type="submit" value="Buscar Cliente">
        </form>
        <?php if ($error): ?>
            <p style="color: red; text-align: center;"><?php echo $error; ?></p>
        <?php endif; ?>
    <?php else: ?>
        <!-- Formulario para editar el cliente -->
        <form method="POST" action="">
            <label for="customer_id">Customer ID:</label><br>
            <input type="text" id="customer_id" name="customer_id" value="<?php echo $customer->getCustomerId(); ?>" readonly><br>

            <label for="cust_first_name">First Name:</label><br>
            <input type="text" id="cust_first_name" name="cust_first_name" value="<?php echo $customer->getCustFirstName(); ?>" required><br>

            <label for="cust_last_name">Last Name:</label><br>
            <input type="text" id="cust_last_name" name="cust_last_name" value="<?php echo $customer->getCustLastName(); ?>" required><br>

            <label for="cust_street_address">Street Address:</label><br>
            <input type="text" id="cust_street_address" name="cust_street_address" value="<?php echo $customer->getCustStreetAddress(); ?>" required><br>

            <label for="cust_postal_code">Postal Code:</label><br>
            <input type="text" id="cust_postal_code" name="cust_postal_code" value="<?php echo $customer->getCustPostalCode(); ?>" required><br>

            <label for="cust_city">City:</label><br>
            <input type="text" id="cust_city" name="cust_city" value="<?php echo $customer->getCustCity(); ?>" required><br>

            <label for="cust_state">State:</label><br>
            <input type="text" id="cust_state" name="cust_state" value="<?php echo $customer->getCustState(); ?>" required><br>

            <label for="cust_country">Country:</label><br>
            <input type="text" id="cust_country" name="cust_country" value="<?php echo $customer->getCustCountry(); ?>" required><br>

            <label for="phone_numbers">Phone Numbers:</label><br>
            <input type="text" id="phone_numbers" name="phone_numbers" value="<?php echo $customer->getPhoneNumbers(); ?>" required><br>

            <label for="nls_language">NLS Language:</label><br>
            <input type="text" id="nls_language" name="nls_language" value="<?php echo $customer->getNlsLanguage(); ?>" required><br>

            <label for="nls_territory">NLS Territory:</label><br>
            <input type="text" id="nls_territory" name="nls_territory" value="<?php echo $customer->getNlsTerritory(); ?>" required><br>

            <label for="credit_limit">Credit Limit:</label><br>
            <input type="text" id="credit_limit" name="credit_limit" value="<?php echo $customer->getCreditLimit(); ?>" required><br>

            <label for="cust_email">Email:</label><br>
            <input type="email" id="cust_email" name="cust_email" value="<?php echo $customer->getCustEmail(); ?>" required><br>

            <label for="account_mgr_id">Account Manager ID:</label><br>
            <input type="text" id="account_mgr_id" name="account_mgr_id" value="<?php echo $customer->getAccountMgrId(); ?>" required><br>

            <label for="cust_geo_location">Geo Location:</label><br>
            <input type="text" id="cust_geo_location" name="cust_geo_location" value="<?php echo $customer->getCustGeoLocation(); ?>" required><br>

            <label for="date_of_birth">Date of Birth:</label><br>
            <input type="text" id="date_of_birth" name="date_of_birth" value="<?php echo $customer->getDateOfBirth(); ?>" required><br>

            <label for="marital_status">Marital Status:</label><br>
            <input type="text" id="marital_status" name="marital_status" value="<?php echo $customer->getMaritalStatus(); ?>" required><br>

            <label for="gender">Gender:</label><br>
            <input type="text" id="gender" name="gender" value="<?php echo $customer->getGender(); ?>" required><br>

            <label for="income_level">Income Level:</label><br>
            <input type="text" id="income_level" name="income_level" value="<?php echo $customer->getIncomeLevel(); ?>" required><br>

            <input type="submit" value="Guardar Cambios">
        </form>
    <?php endif; ?>
</body>

</html>