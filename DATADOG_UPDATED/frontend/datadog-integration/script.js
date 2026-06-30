// Function creating small trend lines with correct padding configuration
function generateMiniChart(canvasId, lineColor) {
    const ctx = document.getElementById(canvasId).getContext('2d');
    return new Chart(ctx, {
        type: 'line',
        data: {
            labels: Array(15).fill(''),
            datasets: [{
                data: Array(15).fill(0).map(() => Math.floor(Math.random() * 25) + 40),
                borderColor: lineColor,
                borderWidth: 1.5,
                pointRadius: 0,
                fill: false,
                tension: 0.35
            }]
        },
        options: {
            plugins: { legend: { display: false } },
            scales: { x: { display: false }, y: { display: false } },
            responsive: true,
            maintainAspectRatio: false,
            layout: { padding: { top: 2, bottom: 2 } }
        }
    });
}

// Initializing trend charts matching image line shapes
const cpuChart = generateMiniChart('cpuChart', '#3b82f6');
const memChart = generateMiniChart('memChart', '#a855f7');
const diskChart = generateMiniChart('diskChart', '#f59e0b');
const netInChart = generateMiniChart('netInChart', '#10b981');
const netOutChart = generateMiniChart('netOutChart', '#6366f1');

// Mock Logs dataset layout matching image 100%
const logData = [
    { time: "10:30:42", service: "user-service", status: "ERROR", msg: "Failed to fetch user details", bg: "bg-red-100 text-red-700" },
    { time: "10:30:41", service: "order-service", status: "WARN", msg: "High response time detected", bg: "bg-amber-100 text-amber-700" },
    { time: "10:30:40", service: "payment-service", status: "ERROR", msg: "Payment gateway timeout", bg: "bg-red-100 text-red-700" },
    { time: "10:30:39", service: "inventory-service", status: "INFO", msg: "Stock updated successfully", bg: "bg-blue-100 text-blue-700" },
    { time: "10:30:38", service: "notification-service", status: "INFO", msg: "Email sent successfully", bg: "bg-blue-100 text-blue-700" }
];

function renderLogs() {
    const container = document.getElementById('log-stream');
    container.innerHTML = logData.map(log => `
        <div class="flex items-center text-[10px] border-b border-slate-100 pb-1 pt-1 space-x-2">
            <span class="text-slate-400 font-mono shrink-0">${log.time}</span>
            <span class="text-slate-600 font-medium truncate w-24">${log.service}</span>
            <span class="px-1 py-0.5 rounded text-[8px] font-bold tracking-wide shrink-0 ${log.bg}">${log.status}</span>
            <span class="text-slate-500 truncate flex-1 text-left">${log.msg}</span>
        </div>
    `).join('');
}

// Periodic background fetching syncing logic
async function fetchMetrics() {
    try {
        const res = await fetch('/api/metrics');
        const data = await res.json();

        document.getElementById('cpu-txt').innerHTML = `${data.cpu}% <span class="text-[10px] font-normal text-slate-400">Avg</span>`;
        document.getElementById('mem-txt').innerHTML = `${data.memory}% <span class="text-[10px] font-normal text-slate-400">Avg</span>`;

        cpuChart.data.datasets[0].data.push(data.cpu);
        cpuChart.data.datasets[0].data.shift();
        cpuChart.update();

        memChart.data.datasets[0].data.push(data.memory);
        memChart.data.datasets[0].data.shift();
        memChart.update();
    } catch (e) {
        console.warn("Realtime sync pause.", e);
    }
}

renderLogs();
setInterval(fetchMetrics, 2000);
