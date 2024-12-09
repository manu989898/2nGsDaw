export default function Header({handleToggleDarkMode, darkMode}){
    return (
        <div className="header">
        <h1><span style={{color:"#308d46"}}>React</span> Notes</h1>
         {/*this is our toggle button using this button we can change the background theme for our application*/}
        <button onClick={()=>handleToggleDarkMode((previousDarkMode)=>!previousDarkMode)} className="save">{darkMode?"Light Mode":"Dark Mode"}</button>
        </div>
    )
}