<?php
    // Connection data string
	DEFINE('HOST','localhost');
	DEFINE('DBNAME','HR');
	DEFINE('USERNAME','HR');
	DEFINE('PASSWD','Educacio123!');
	$conn = null;

    // Set MySQLi to throw exceptions
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    try {
        $conn = new mysqli(HOST, USERNAME, PASSWD, DBNAME);  // CONNECTION PHASE
                                                     // EXECUTION PHASE
        $conn->close(); 						    // DISCONNECTION PHASE
    }
    catch (mysqli_sql_exception $e) {
        echo "Error connecting to MySQL: " . $e->getMessage();
    }
?>

//  EXECUTION PHASE
<?php

    try {
        $query = 'SELECT last_name, first_name FROM employees';
        $table = $conn->query($query); 	// query the database
        foreach ($table as $row) {  			// fetch the database
            foreach ($row as $column) {
                echo $column . ' '; 
		}
	 }
    }
    catch (mysqli_sql_exception $e) {
        echo "Error executing MySQL: " . $e->getMessage();
    }

?>

// EXECUTION PHASE
<?php
    
    try {
        $query = 'SELECT last_name, first_name FROM employees';
        $table = $conn->query($query); 	// query the database
        foreach ($table as $row) {  			// fetch the database
            foreach ($row as $column) {
                echo $column . ' '; 
		}
	 }
    }
    catch (mysqli_sql_exception $e) {
        echo "Error executing MySQL: " . $e->getMessage();
    }
 
?>

