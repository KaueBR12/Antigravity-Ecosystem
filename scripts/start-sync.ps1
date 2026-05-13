Write-Host "Iniciando motor de sincronização a cada 10 minutos..." -ForegroundColor Cyan
Write-Host "Pressione Ctrl+C para parar."

$interval = 600 # 10 minutos em segundos

while ($true) {
    Write-Host "[$(Get-Date)] Executando sincronização..." -ForegroundColor Yellow
    node scripts/sync.js
    Write-Host "[$(Get-Date)] Sincronização concluída. Próxima em 10 minutos." -ForegroundColor Green
    Start-Sleep -Seconds $interval
}
