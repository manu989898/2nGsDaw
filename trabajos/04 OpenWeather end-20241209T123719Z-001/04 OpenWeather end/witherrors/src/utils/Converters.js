export function KelvinToCelcius(kelvin, decimals, stringify){
    var celsius = kelvin - 273.15;
    var formattedCelsius = "";
    
    if(decimals) formattedCelsius = celsius.toFixed(1);
    if(stringify) return formattedCelsius.toString() + " ºC";
    else return formattedCelsius;
}