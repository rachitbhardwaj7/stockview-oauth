@echo off
REM StockView - Google OAuth App Setup Script for Windows
REM Run this file to set up the project

echo.
echo ==========================================
echo   StockView - Google OAuth Setup
echo ==========================================
echo.

REM Check if Node.js is installed
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo [ERROR] Node.js is not installed!
    echo Please install Node.js from: https://nodejs.org
    pause
    exit /b 1
)

echo [✓] Node.js found: 
node --version

echo.
echo [1/3] Installing dependencies...
call npm install
if %errorlevel% neq 0 (
    echo [ERROR] Failed to install dependencies
    pause
    exit /b 1
)

echo.
echo [✓] Dependencies installed successfully!

REM Check if .env exists
if not exist .env (
    echo.
    echo [2/3] Creating .env file from template...
    copy .env.example .env
    echo [✓] .env file created - EDIT THIS FILE with your Google credentials!
    echo.
    echo DO THIS NEXT:
    echo 1. Open .env file with Notepad
    echo 2. Add your Google OAuth Client ID
    echo 3. Add your Google OAuth Client Secret
    echo.
    pause
) else (
    echo.
    echo [2/3] .env file already exists
)

echo.
echo [3/3] Ready to start!
echo.
echo To run the app, use:
echo   npm start
echo.
echo Then open: http://localhost:3000
echo.
echo For setup help, read: GOOGLE_OAUTH_SETUP.md
echo.

pause
