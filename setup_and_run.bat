```batch
@echo off
setlocal enabledelayedexpansion

:: Check for Git
where git >nul 2>nul
if %errorlevel% neq 0 (
    echo Git is not installed. Installing Git...

    :: Download Git installer
    powershell -Command "(New-Object Net.WebClient).DownloadFile('https://github.com/git-for-windows/git/releases/download/v2.33.0.windows.2/Git-2.33.0.2-64-bit.exe', 'git-installer.exe')"

    :: Install Git
    start /wait git-installer.exe /VERYSILENT /NORESTART

    :: Delete installer
    del git-installer.exe

    :: Add Git to PATH
    setx PATH "%PATH%;C:\Program Files\Git\cmd" /M

    echo Git has been successfully installed.
) else (
    echo Git is already installed.
)

:: Check for Node.js
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo Node.js is not installed. Installing Node.js...

    :: Download Node.js installer
    powershell -Command "(New-Object Net.WebClient).DownloadFile('https://nodejs.org/dist/v14.17.6/node-v14.17.6-x64.msi', 'node-installer.msi')"

    :: Install Node.js
    start /wait msiexec /i node-installer.msi /qn

    :: Delete installer
    del node-installer.msi

    echo Node.js has been successfully installed.

    :: Refresh environment variables in current session
    refreshenv
) else (
    echo Node.js is already installed.
)

:: Clone repository
set "repo_url=https://github.com/asvspb/pobeda-tickets.git"
set "project_folder=pobeda-tickets"

if not exist "%project_folder%" (
    echo Cloning repository...
    git clone %repo_url% %project_folder%
) else (
    echo Project folder already exists. Skipping cloning.
)

:: Change to project folder
cd %project_folder%

:: Install dependencies
echo Installing dependencies...
call npm install

:: Start server
echo Starting server...
start cmd /k npm start

echo Server is running. Open your browser and navigate to http://localhost:7777

endlocal
```