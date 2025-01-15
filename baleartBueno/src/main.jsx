import ReactDOM from "react-dom";
import { AuthProvider } from "./context/AuthContext.jsx"; // Ajusta la ruta según tu estructura
import App from "./App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
    <AuthProvider>
      
        <App />
 
    </AuthProvider>
);
