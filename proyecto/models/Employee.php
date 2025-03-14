<?php

namespace models;

use config\Database;

class Employee extends Model {
    // Definir la taula associada a la classe
    protected static $table = 'employees';
	public function getEmployeeId() {
		return $this->employee_id;
	}
	public function getFirstName() {
		return $this->first_name;
	}
	public function getLastName() {
		return $this->last_name;
	}
	public function getEmail() {
		return $this->email;
	}
	public function getPhoneNumber() {
		return $this->phone_number;
	}
	public function getHireDate() {
		return $this->hire_date;
	}
	public function getJobId() {
		return $this->job_id;
	}
	public function getSalary() {
		return $this->salary;
	}
	public function getCommissionPct() {
		return $this->commission_pct;
	}
	public function getManagerId() {
		return $this->manager_id;
	}
	public function getDepartmentId() {
		return $this->department_id;
	}
	
    // Constructor opcional
    public function __construct(    
        private $employee_id,
        private $first_name,
        private $last_name,
        private $email,
        private $phone_number,
        private $hire_date,
        private $job_id,
        private $salary,
        private $commission_pct,
        private $manager_id,
        private $department_id ) { }

    // Mètode per guardar l'empleat a la base de dades
	public function save() {
		mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
		try {
			// Connectar a la base de dades
			$db = new Database();
			$db->connectDB('./config/config.db');
			//$db->conn->autocommit(false);
			//$db->conn->begin_transaction();

			// Obtenir el nom de la taula de la classe filla
			$table = static::$table; 

			// Connectar a la base de dades
			if (isset($this->employee_id)) {
				// Preparar l'INSERT / UPDATE
				$sql = "INSERT INTO $table (employee_id, first_name, last_name, email, phone_number, hire_date, job_id, salary, commission_pct, manager_id, department_id) 
						VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
						ON DUPLICATE KEY UPDATE
							first_name     = VALUES (first_name),
							last_name      = VALUES (last_name),
							email          = VALUES (email),
							phone_number   = VALUES (phone_number),
							hire_date      = VALUES (hire_date),
							job_id         = VALUES (job_id),
							salary         = VALUES (salary),
							commission_pct = VALUES (commission_pct),
							manager_id     = VALUES (manager_id),
							department_id  = VALUES (department_id)";
				$stmt = $db->conn->prepare($sql);
				// Vincular els valors
				$stmt->bind_param( "issssssddii", 
										$this->employee_id, 
										$this->first_name, 
										$this->last_name, 
										$this->email, 
										$this->phone_number, 
										$this->hire_date, 
										$this->job_id, 
										$this->salary, 
										$this->commission_pct, 
										$this->manager_id, 
										$this->department_id
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

			if (isset($this->employee_id)) {
				$sql = "SELECT * FROM $table WHERE employee_id = $this->employee_id";
				$result = $db->conn->query($sql);

				// Comprovar si hi ha resultats
				if ($result->num_rows == 1) {
					$sql = "DELETE FROM $table 
							WHERE employee_id = ?";
					$stmt = $db->conn->prepare($sql);
					// Vincular els valors
					$stmt->bind_param( "i", $this->employee_id );
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

	public static function find($id) {
		// Crear una instancia de la base de datos
		$db = new Database();
		$db->connectDB('./config/config.db'); // Ajusta la ruta según tu configuración
		
		// Preparar la consulta para evitar inyección SQL
		$stmt = $db->conn->prepare("SELECT * FROM employees WHERE employee_id = ?");
		$stmt->bind_param("i", $id); // Suponiendo que `employee_id` es un número entero
		$stmt->execute();
		
		// Obtener el resultado de la consulta
		$result = $stmt->get_result();
		if ($result->num_rows === 0) {
			$stmt->close();
			$db->closeDB();
			return null; // Retorna null si no se encuentra el empleado
		}
		
		// Convertir el resultado en un array asociativo
		$data = $result->fetch_assoc();
		
		
		
		// Usar nombres de columnas en mayúsculas, si es necesario
		$employee = new Employee(
			$data['EMPLOYEE_ID'] ?? $data['employee_id'],
			$data['FIRST_NAME'] ?? $data['first_name'],
			$data['LAST_NAME'] ?? $data['last_name'],
			$data['EMAIL'] ?? $data['email'],
			$data['PHONE_NUMBER'] ?? $data['phone_number'],
			$data['HIRE_DATE'] ?? $data['hire_date'],
			$data['JOB_ID'] ?? $data['job_id'],
			$data['SALARY'] ?? $data['salary'],
			array_key_exists('COMMISSION_PCT', $data) ? $data['COMMISSION_PCT'] : (array_key_exists('commission_pct', $data) ? $data['commission_pct'] : null),
			$data['MANAGER_ID'] ?? $data['manager_id'],
			$data['DEPARTMENT_ID'] ?? $data['department_id']
	
		);
		
		// Cerrar la conexión y liberar recursos
		$stmt->close();
		$db->closeDB();
		
		return $employee;
	}
	
}
?>
