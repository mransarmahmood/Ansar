@echo off
REM Deploy the React app to /Ansar/ on XAMPP (Windows).

pushd "%~dp0react-app"

echo --^> Regenerating legacy-page JSX from pages/*.html ...
REM Home.jsx is manually authored — it pulls CMS data from src/data/*.json.
REM Only the 27 content pages in pages/ get ported.
call node scripts\port-pages.mjs >nul

echo --^> Syncing CMS data ...
xcopy /Y "%~dp0data\content\*.json" "src\data\" >nul 2>&1

echo --^> Applying stat overrides ...
pushd "%~dp0"
call node react-app\scripts\update-stats.mjs >nul 2>&1
xcopy /Y "data\content\*.json" "react-app\src\data\" >nul 2>&1
popd

echo --^> Building React bundle ...
call npm run build || (popd & exit /b 1)

echo --^> Deploying to %~dp0 ...
xcopy /Y dist\index.html "%~dp0index.html" >nul
xcopy /Y /E /I dist\assets "%~dp0assets" >nul

popd
echo Deployed. Visit http://localhost/Ansar/
