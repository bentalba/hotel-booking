@echo off
REM Simple launcher for Windows: compiles and runs the console app
cd /d "%~dp0"
mvn -q -DskipTests exec:java
