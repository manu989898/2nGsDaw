<?php

namespace models;

use config\Database;

class Employee extends Model {
    // Definir la taula associada a la classe
    protected static $table = 'employees';
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
    public function getPhoneNumber() {
        return $this->phone_number;
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
        public $phone_number,
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
        // Carregar la configuració de la base de dades
        $config = Database::loadConfig('C:/temp/config.db');
		$db = new Database(
			$config['DB_HOST'], 
			$config['DB_PORT'], 
			$config['DB_DATABASE'], 
			$config['DB_USERNAME'], 
			$config['DB_PASSWORD']
		);

		// Connectar a la base de dades
		$db->connectDB();

		// Obtenir el nom de la taula de la classe filla
		$table = static::$table; 

        // Connectar a la base de dades
		if (isset($this->employee_id)) {
			$sql = "SELECT * FROM $table WHERE customer_id = $this->customer_id";
			$result = $db->conn->query($sql);

			// Comprovar si hi ha resultats
			if ($result->num_rows == 1) {
				$sql = "UPDATE $table 
					   SET customer_id = ?,
                       cust_first_name = ?,
                           cust_last_name = ?,
          				   cust_street_address = ?,
                           cust_postal_code = ?,
                           cust_city = ?,
                           cust_state = ?,
                           cust_country = ?,
                           phone_number = ?,
                           nls_language = ?,
                           nls_territory = ?,
                           credit_limit = ?,
                           cust_email = ?,
                           account_mgr_id = ?,
                           cust_geo_location = ?,
                           date_of_birth = ?,
                           marital_status = ?,
                           gender = ?,
                            income_level = ?
						WHERE customer_id = ?";
				$stmt = $db->conn->prepare($sql);
				// Vincular els valors
				$stmt->bind_param( "issssssssssdsisssss
                ", 
                                        $this->customer_id,
										$this->cust_first_name, 
                                        $this->cust_last_name, 
                                        $this->cust_street_address, 
                                        $this->cust_postal_code, 
                                        $this->cust_city, 
                                        $this->cust_state, 
                                        $this->cust_country, 
                                        $this->phone_number, 
                                        $this->nls_language, 
                                        $this->nls_territory, 
                                        $this->credit_limit, 
                                        $this->cust_email, 
                                        $this->account_mgr_id, 
                                        $this->cust_geo_location, 
                                        $this->date_of_birth, 
                                        $this->marital_status, 
                                        $this->gender,
                                        $this->income_level,
                                    
								 );
				// Executar la consulta
				if ($stmt->execute()) {
					echo "L'empleat s'ha modificat correctament.";
				} else {
					echo "Error modificant customer: " . $stmt->error;
				}

			} else {
				// Preparar la consulta d'INSERT
				$sql = "INSERT INTO  $table (customer_id, cust_first_name, cust_last_name, cust_street_address, cust_postal_code, cust_city, cust_state, cust_country, phone_number, nls_language, nls_territory, credit_limit, cust_email, account_mgr_id, cust_geo_location, date_of_birth, marital, gender, income_level) 
						VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";

				$stmt = $db->conn->prepare($sql);
				// Vincular els valors
				$stmt->bind_param( "issssssssssdsisssss", 
										$this->customer_id, 
                                        $this->cust_first_name, 
                                        $this->cust_last_name, 
                                        $this->cust_street_address, 
                                        $this->cust_postal_code, 
                                        $this->cust_city, 
                                        $this->cust_state, 
                                        $this->cust_country, 
                                        $this->phone_number, 
                                        $this->nls_language, 
                                        $this->nls_territory, 
                                        $this->credit_limit, 
                                        $this->cust_email, 
                                        $this->account_mgr_id, 
                                        $this->cust_geo_location, 
                                        $this->date_of_birth, 
                                        $this->marital_status,
                                        $this->gender,
                                        $this->income_level,
								 );

				// Executar la consulta
				if ($stmt->execute()) {
					echo "L'empleat s'ha afegit correctament.";
				} else {
					echo "Error en afegir el customer: " . $stmt->error;
				}
			}
		} else {
			echo "Error, ID no informat";
		}

        // Tancar la connexió
        $db->closeDB();
    }
}

?>
