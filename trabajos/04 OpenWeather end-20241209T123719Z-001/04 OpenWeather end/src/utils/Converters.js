export function KelvinToCelcius(kelvins, decimals, stringify){
    var celsius = kelvins - 273.15;

    if(decimals) celsius = celsius.toFixed(decimals);
    
    if(stringify) return celsius.toString() + " ºC";
    else return celsius;
}