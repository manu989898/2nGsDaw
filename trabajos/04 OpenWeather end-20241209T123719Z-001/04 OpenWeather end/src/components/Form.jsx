import {useState} from "react"

 export default function Form({getLocation}){
    const [search, setSearch] = useState("");

    const onSubmit = (e) => {
        e.preventDefault();
        if(search=="" || !search) return;
        getLocation(search);
    }

    return(
        <div className="containet">
            <form onSubmit={onSubmit}>
            <div className="input-group mb-3 mx-auto">
                <input
                    type="text"
                    className="form-control"
                    placeholder="City"
                    onChange={(e) => setSearch(e.target.value)}
                />
                <button
                    className="btn btn-primary input-group-text"
                    type="submit">Search</button></div>
            </form>
        </div>
    )
 }