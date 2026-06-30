# Datadog AI Observability Platform

Full-stack monitoring dashboard with Reporting Module, Integration Module, and all frontend pages.

## Quick Start

```bash
pip install -r requirements.txt
python app.py
# Open http://localhost:5000
```

Login credentials: any username / password (demo mode)

## Project Structure

```
DATADOG_UPDATED/
├── app.py               ← Main Flask server (all routes)
├── reports.db           ← SQLite database (monitoring data)
├── requirements.txt     ← Python dependencies
├── run.sh / run.bat     ← Quick-start scripts
└── frontend/
    ├── login.html       ← Login page (entry point)
    ├── index.html       ← Main dashboard (Overview)
    ├── shared-dashboard.css / .js  ← Shared sidebar & auth
    ├── datadog-integration/  ← Integration Module (live CPU/mem)
    ├── reports/              ← Reporting Module (PDF & Excel export)
    ├── metrics/
    ├── apm/
    ├── infrastructure/
    ├── log-analytics/
    ├── realtime-monitoring/
    ├── alert-management/
    ├── monitors/
    ├── dashboards/
    ├── integrations/
    ├── ai-observability/
    └── settings/
```

## API Endpoints

| Endpoint | Description |
|---|---|
| `GET /api/metrics` | Live CPU & memory (Integration Module) |
| `GET /api/report/<daily\|weekly\|monthly>` | Report data (Reporting Module) |
| `GET /export/pdf/<type>` | Download PDF report |
| `GET /export/excel/<type>` | Download Excel report |

## Dependencies

- flask, flask-cors, PyJWT
- psutil (live metrics)
- reportlab (PDF export)
- openpyxl (Excel export)
