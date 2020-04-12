SETLOCAL EnableExtensions DisableDelayedExpansion
set "BasePath=C:\Users\d.ghiotto\Desktop\Davide\projects\zeuscode-dynamic-shirt\"

REM mklink /D "absolute-destination" "absolute-source"
mklink /D  "%BasePath%functions\src\models" "%BasePath%models"

PAUSE
endlocal

