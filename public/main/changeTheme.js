var btn = document.querySelector(".change-theme");
var link = document.querySelector(".theme-link");

btn.addEventListener("click", function () { ChangeTheme(); });

function ChangeTheme()
{
    let lightTheme = "styles/light.css";
    let darkTheme = "styles/dark.css";

    var currTheme = link.getAttribute("href");
    var theme = "";

    if(currTheme == lightTheme)
    {
   	 currTheme = darkTheme;
   	 theme = "dark";
    }
    else
    {    
   	 currTheme = lightTheme;
   	 theme = "light";
    }
    
    link.setAttribute("href", currTheme);

    // Сохраняет в сессии тему
    // Save(theme);
}