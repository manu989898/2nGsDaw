
<?php
    /* EJERCICIO 4.1
    Crea un mètode estàtic 'loadConfig()' que faci el següent:
    Llegir l'arxiu 'c:\temp\config.db' i torna un array associatiu amb les variables que s'hi mostren:
    */ 

    class Config {
        public static function loadConfig() {
            $archivo = 'c:\temp\config.db';
            
            if (file_exists($archivo)) {   
                $linias = file($archivo, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
                $config = array();
               
                foreach ($linias as $linia) {
                    //Quitar espacios en la linea
                    $linia = trim($linia); 
                    // separar las lineas por el igual
                    $parts = explode('=', $linia);
                    // Guardamos las dos partes como clave y contenido
                    $config[$parts[0]] = $parts[1];
                }
                return $config;
                
            } else {
                die("El fitxer de configuració no existeix.");
            }
        }
    }
?>
