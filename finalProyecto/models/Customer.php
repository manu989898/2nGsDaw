<?php

namespace models;
use config\Database;

class Customer extends Model {
    // Definir la taula associada a la classe
    protected static $table = 'customers';
	public function getCustomerId() {
        return $this->customer_id;
    }
    public function getCustFirstName() {
        return $this->cust_first_name;
    }
    public function getCustLastName() {
        return $this->cust_last_name;
    }
    public function getCustStreetAddress() {
        return $this->cust_street_address;
    }
    public function getCustPostalCode() {
        return $this->cust_postal_code;
    }
    public function getCustCity() {
        return $this->cust_city;
    }
    public function getCustState() {
        return $this->cust_state;
    }
    public function getCustCountry() {
        return $this->cust_country;
    }
    public function getPhoneNumbers() {
        return $this->phone_numbers;
    }
    public function getNlsLanguage() {
        return $this->nls_language;
    }
    public function getNlsTerritory() {
        return $this->nls_territory;
    }
    public function getCreditLimit() {
        return $this->credit_limit;
    }
    public function getCustEmail() {
        return $this->cust_email;
    }
    public function getAccountMgrId() {
        return $this->account_mgr_id;
    }
    public function getCustGeoLocation() {
        return $this->cust_geo_location;
    }
    public function getDateOfBirth() {
        return $this->date_of_birth;
    }
    public function getMaritalStatus() {
        return $this->marital_status;
    }
    public function getGender() {
        return $this->gender;
    }
    public function getIncomeLevel() {
        return $this->income_level;
    }
	
    // Constructor opcional
    public function __construct(    
        public $customer_id,
        public $cust_first_name,
        public $cust_last_name,
        public $cust_street_address,
        public $cust_postal_code, 
        public $cust_city,
        public $cust_state,
        public $cust_country,
        public $phone_numbers,
        public $nls_language,
        public $nls_territory, 
        public $credit_limit,
        public $cust_email,
        public $account_mgr_id,
        public $cust_geo_location,
        public $date_of_birth,
        public $marital_status,
        public $gender,
        public $income_level,   
        ) { }

    // Mètode per guardar l'empleat a la base de dades
    public function save() {
        
        try{
        // Connectar a la base de dades
			$db = new Database();
			$db->connectDB('./config/config.db');
            mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

            //$db->conn->autocommit(false);
			//$db->conn->begin_transaction();

			// Obtenir el nom de la taula de la classe filla
			$table = static::$table; 

        // Connectar a la base de dades
		if (isset($this->customer_id)) {
            $sql = "INSERT INTO  $table (customer_id, 
            cust_first_name, cust_last_name, cust_street_address, 
            cust_postal_code, cust_city, cust_state, 
            cust_country, phone_numbers, nls_language, nls_territory, 
            credit_limit, cust_email, account_mgr_id, cust_geo_location, 
            date_of_birth, marital_status, gender, income_level) 
                    VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)	
                    ON DUPLICATE KEY UPDATE
                    cust_first_name = VALUES (cust_first_name),
                    cust_last_name = VALUES (cust_last_name),
                    cust_street_address = VALUES (cust_street_address),		
                    cust_postal_code = VALUES (cust_postal_code),
                    cust_city = VALUES (cust_city),
                    cust_state = VALUES (cust_state),
                    cust_country = VALUES (cust_country),
                    phone_numbers = VALUES (phone_numbers),
                    nls_language = VALUES (nls_language),
                    nls_territory = VALUES (nls_territory),
                    credit_limit = VALUES (credit_limit),
                    cust_email = VALUES (cust_email),
                    account_mgr_id = VALUES (account_mgr_id),
                    cust_geo_location = VALUES (cust_geo_location),
                    date_of_birth = VALUES (date_of_birth),
                    marital_status = VALUES (marital_status),
                    gender = VALUES (gender),
                    income_level = VALUES (income_level)";

                    $stmt = $db->conn->prepare($sql);
                    
                    $stmt->bind_param( "issssssssssdsisssss", 
                                        $this->customer_id, 
                                        $this->cust_first_name, 
                                        $this->cust_last_name, 
                                        $this->cust_street_address, 
                                        $this->cust_postal_code, 
                                        $this->cust_city, 
                                        $this->cust_state, 
                                        $this->cust_country, 
                                        $this->phone_numbers, 
                                        $this->nls_language, 
                                        $this->nls_territory, 
                                        $this->credit_limit, 
                                        $this->cust_email, 
                                        $this->account_mgr_id, 
                                        $this->cust_geo_location, 
                                        $this->date_of_birth, 
                                        $this->marital_status,
                                        $this->gender,
                                        $this->income_level
                                    );

                    // Executar la consulta
                    $stmt->execute();
                } else {
                    throw new \Exception ("ID empleat no informat.");
                }
                $db->conn->commit();
            } catch (\mysqli_sql_exception $e) {
                echo "hola ha fallado" . $e->getMessage();
                if ($db->conn)
                    $db->conn->rollback(); 
                throw new \mysqli_sql_exception($e->getMessage());
            } finally {
                
                if ($db->conn)
                    // Tancar la connexió
                    $db->closeDB();         				 
            }
        }
        public static function find($id) {
            // Crear una instancia de la base de datos
            $db = new Database();
            $db->connectDB('./config/config.db'); // Ruta a la base de datos, ajústala si es necesario
            
            // Preparar la consulta para evitar inyección SQL
            $stmt = $db->conn->prepare("SELECT * FROM customers WHERE customer_id = ?");
            $stmt->bind_param("i", $id); // Suponiendo que `customer_id` es un número entero
            $stmt->execute();
            
            // Obtener el resultado de la consulta
            $result = $stmt->get_result();
            if ($result->num_rows === 0) {
                return null; // Retorna null si no se encuentra el cliente
            }
            
            // Convertir el resultado en un array asociativo
            $data = $result->fetch_assoc();
            
            // Crear una instancia de Customer con los datos obtenidos
            $customer = new Customer(
                $data['CUSTOMER_ID'],
                $data['CUST_FIRST_NAME'],
                $data['CUST_LAST_NAME'],
                $data['CUST_STREET_ADDRESS'],
                $data['CUST_POSTAL_CODE'],
                $data['CUST_CITY'],
                $data['CUST_STATE'],
                $data['CUST_COUNTRY'],
                $data['PHONE_NUMBERS'],
                $data['NLS_LANGUAGE'],
                $data['NLS_TERRITORY'],
                $data['CREDIT_LIMIT'],
                $data['CUST_EMAIL'],
                $data['ACCOUNT_MGR_ID'],
                $data['CUST_GEO_LOCATION'],
                $data['DATE_OF_BIRTH'],
                $data['MARITAL_STATUS'],
                $data['GENDER'],
                $data['INCOME_LEVEL']
            );
            
            // Cerrar la conexión y liberar recursos
            $stmt->close();
            $db->closeDB();
            
            return $customer;
        }
        public function destroy() {
            error_reporting(E_ALL);
            try {
                // Connectar a la base de dades
                $db = new Database();
                $db->connectDB('./config/config.db');
                //$db->conn->autocommit(false);
                //$db->conn->begin_transaction();
    
                // Obtenir el nom de la taula de la classe filla
                $table = static::$table; 
    
                if (isset($this->customer_id)) {
                    $sql = "SELECT * FROM $table WHERE customer_id = $this->customer_id";
                    $result = $db->conn->query($sql);
    
                    // Comprovar si hi ha resultats
                    if ($result->num_rows == 1) {
                        $sql = "DELETE FROM $table 
                                WHERE customer_id = ?";
                        $stmt = $db->conn->prepare($sql);
                        // Vincular els valors
                        $stmt->bind_param( "i", $this->customer_id );
                        // Executar la consulta
                        $stmt->execute();
                    } else {
                        throw new \Exception ("L'empleat no existeix.");
                    }
                } else {
                    throw new \Exception ("ID empleat no informat.");
                }
                $db->conn->commit();
            } catch (\mysqli_sql_exception $e) {
                if ($db->conn)
                    $db->conn->rollback(); 
                throw new \mysqli_sql_exception($e->getMessage());
            } finally {
                if ($db->conn)
                    // Tancar la connexió
                    $db->closeDB();         				 
            }
        }
}

?>
