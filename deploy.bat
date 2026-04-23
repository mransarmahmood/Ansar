@echo off
REM Deploy the React app to /Ansar/ on XAMPP (Windows).

pushd "%~dp0react-app"

echo --^> Regenerating legacy-page JSX from pages/*.html ...
call node scripts\port-pages.mjs >nul
call node scripts\port-home.mjs >nul 2>&1
call node scripts\update-stats.mjs >nul 2>&1

echo --^> Building React bundle ...
call npm run build || (popd & exit /b 1)

echo --^> Deploying to %~dp0 ...
xcopy /Y dist\index.html "%~dp0index.html" >nul
xcopy /Y /E /I dist\assets "%~dp0assets" >nul

popd
echo Deployed. Visit http://localhost/Ansar/
