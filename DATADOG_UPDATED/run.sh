#!/bin/bash
echo "Installing dependencies..."
pip install -r requirements.txt --quiet
echo "Starting Datadog Monitoring Platform..."
python app.py
