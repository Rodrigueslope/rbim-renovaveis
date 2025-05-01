// Script específico para a página Dashboard
document.addEventListener('DOMContentLoaded', function() {
    // Dados de exemplo para simulação (serão substituídos por dados reais da API)
    const mockData = {
        temperature: 28.5,
        feels_like: 30.2,
        humidity: 65,
        pressure: 1012,
        weather_desc: 'Céu limpo',
        wind_speed: 4.2,
        wind_direction: 180,
        radiation: 850,
        uv_index: 7,
        locations: {
            'fortaleza': {
                temperature: 28.5,
                feels_like: 30.2,
                humidity: 65,
                pressure: 1012,
                weather_desc: 'Céu limpo',
                wind_speed: 4.2,
                wind_direction: 180,
                radiation: 850,
                uv_index: 7
            },
            'saopaulo': {
                temperature: 22.3,
                feels_like: 23.1,
                humidity: 72,
                pressure: 1015,
                weather_desc: 'Parcialmente nublado',
                wind_speed: 3.1,
                wind_direction: 135,
                radiation: 720,
                uv_index: 5
            },
            'riodejaneiro': {
                temperature: 26.8,
                feels_like: 28.5,
                humidity: 70,
                pressure: 1010,
                weather_desc: 'Parcialmente nublado',
                wind_speed: 3.8,
                wind_direction: 160,
                radiation: 780,
                uv_index: 6
            },
            'brasilia': {
                temperature: 25.2,
                feels_like: 25.8,
                humidity: 45,
                pressure: 1008,
                weather_desc: 'Céu limpo',
                wind_speed: 5.2,
                wind_direction: 220,
                radiation: 900,
                uv_index: 8
            },
            'salvador': {
                temperature: 27.9,
                feels_like: 29.5,
                humidity: 75,
                pressure: 1011,
                weather_desc: 'Parcialmente nublado',
                wind_speed: 4.5,
                wind_direction: 150,
                radiation: 820,
                uv_index: 7
            }
        }
    };

    // Elementos do DOM
    const locationSelect = document.getElementById('location');
    const updateDataBtn = document.getElementById('update-data');
    const lastUpdateTime = document.getElementById('last-update-time');
    
    // Elementos de dados climáticos
    const currentTemp = document.getElementById('current-temp');
    const feelsLike = document.getElementById('feels-like');
    const humidity = document.getElementById('humidity');
    const pressure = document.getElementById('pressure');
    const weatherDesc = document.getElementById('weather-desc');
    const windSpeed = document.getElementById('wind-speed');
    const windDirection = document.getElementById('wind-direction');
    const radiationValue = document.getElementById('radiation-value');
    const uvValue = document.getElementById('uv-value');
    const uvCategory = document.getElementById('uv-category');
    
    // Elementos de simulação
    const energyType = document.getElementById('energy-type');
    const capacity = document.getElementById('capacity');
    const investment = document.getElementById('investment');
    const simulateBtn = document.getElementById('simulate-btn');
    const annualProduction = document.getElementById('annual-production');
    const annualSavings = document.getElementById('annual-savings');
    const paybackTime = document.getElementById('payback-time');
    const co2Reduction = document.getElementById('co2-reduction');

    // Inicializar dados
    updateDashboardData('fortaleza');
    updateLastUpdateTime();
    initializeCharts();

    // Event listeners
    if (updateDataBtn) {
        updateDataBtn.addEventListener('click', function() {
            const selectedLocation = locationSelect.value;
            updateDashboardData(selectedLocation);
            updateLastUpdateTime();
            updateCharts(selectedLocation);
        });
    }

    if (simulateBtn) {
        simulateBtn.addEventListener('click', function() {
            simulateViability();
        });
    }

    // Função para atualizar os dados do dashboard
    function updateDashboardData(location) {
        const data = mockData.locations[location];
        
        // Atualizar elementos de dados climáticos
        if (currentTemp) currentTemp.textContent = data.temperature.toFixed(1);
        if (feelsLike) feelsLike.textContent = data.feels_like.toFixed(1);
        if (humidity) humidity.textContent = data.humidity;
        if (pressure) pressure.textContent = data.pressure;
        if (weatherDesc) weatherDesc.textContent = data.weather_desc;
        if (windSpeed) windSpeed.textContent = data.wind_speed.toFixed(1);
        if (windDirection) windDirection.textContent = data.wind_direction;
        if (radiationValue) radiationValue.textContent = data.radiation;
        if (uvValue) uvValue.textContent = data.uv_index;
        
        // Atualizar categoria UV
        if (uvCategory) {
            let category, color;
            if (data.uv_index <= 2) {
                category = 'Baixo';
                color = '#4caf50';
            } else if (data.uv_index <= 5) {
                category = 'Moderado';
                color = '#ff9800';
            } else if (data.uv_index <= 7) {
                category = 'Alto';
                color = '#f44336';
            } else if (data.uv_index <= 10) {
                category = 'Muito Alto';
                color = '#9c27b0';
            } else {
                category = 'Extremo';
                color = '#000000';
            }
            
            uvCategory.textContent = category;
            uvCategory.style.backgroundColor = color;
        }
    }

    // Função para atualizar a hora da última atualização
    function updateLastUpdateTime() {
        if (lastUpdateTime) {
            const now = new Date();
            const hours = now.getHours().toString().padStart(2, '0');
            const minutes = now.getMinutes().toString().padStart(2, '0');
            lastUpdateTime.textContent = `${hours}:${minutes}`;
        }
    }

    // Função para simular viabilidade
    function simulateViability() {
        const type = energyType.value;
        const capacityValue = parseFloat(capacity.value);
        const investmentValue = parseFloat(investment.value);
        
        // Fatores de simulação baseados no tipo de energia
        let productionFactor, savingsFactor, co2Factor;
        
        switch(type) {
            case 'solar':
                productionFactor = 1500; // kWh/kW/ano
                savingsFactor = 0.65; // R$/kWh
                co2Factor = 0.5; // ton CO2/MWh
                break;
            case 'wind':
                productionFactor = 2200; // kWh/kW/ano
                savingsFactor = 0.55; // R$/kWh
                co2Factor = 0.45; // ton CO2/MWh
                break;
            case 'hybrid':
                productionFactor = 1850; // kWh/kW/ano
                savingsFactor = 0.60; // R$/kWh
                co2Factor = 0.48; // ton CO2/MWh
                break;
        }
        
        // Cálculos
        const production = capacityValue * productionFactor;
        const savings = production * savingsFactor;
        const payback = investmentValue / savings;
        const co2 = (production / 1000) * co2Factor;
        
        // Atualizar resultados
        annualProduction.textContent = formatNumber(production);
        annualSavings.textContent = formatNumber(savings, 2);
        paybackTime.textContent = payback.toFixed(1);
        co2Reduction.textContent = formatNumber(co2, 1);
        
        // Atualizar gráfico de viabilidade
        updateViabilityChart(type, capacityValue, investmentValue, payback);
    }

    // Inicializar gráficos
    function initializeCharts() {
        // Gráfico de Velocidade do Vento
        const windCtx = document.getElementById('windChart');
        if (windCtx) {
            window.windChart = new Chart(windCtx, {
                type: 'line',
                data: {
                    labels: ['00:00', '03:00', '06:00', '09:00', '12:00', '15:00', '18:00', '21:00'],
                    datasets: [{
                        label: 'Velocidade do Vento (m/s)',
                        data: [3.2, 2.8, 2.5, 3.5, 4.2, 4.8, 4.0, 3.5],
                        borderColor: '#03a9f4',
                        backgroundColor: 'rgba(3, 169, 244, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'm/s'
                            }
                        }
                    }
                }
            });
        }
        
        // Gráfico de Radiação Solar
        const radiationCtx = document.getElementById('radiationChart');
        if (radiationCtx) {
            window.radiationChart = new Chart(radiationCtx, {
                type: 'line',
                data: {
                    labels: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
                    datasets: [{
                        label: 'Radiação Solar (W/m²)',
                        data: [150, 450, 750, 950, 850, 550, 200],
                        borderColor: '#ff9800',
                        backgroundColor: 'rgba(255, 152, 0, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            title: {
                                display: true,
                                text: 'W/m²'
                            }
                        }
                    }
                }
            });
        }
        
        // Gráfico de Índice UV
        const uvCtx = document.getElementById('uvChart');
        if (uvCtx) {
            window.uvChart = new Chart(uvCtx, {
                type: 'bar',
                data: {
                    labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
                    datasets: [{
                        label: 'Índice UV Médio',
                        data: [9, 10, 8, 7, 5, 4, 4, 5, 7, 8, 9, 10],
                        backgroundColor: [
                            '#f44336', '#f44336', '#f44336', '#f44336',
                            '#ff9800', '#ff9800', '#ff9800', '#ff9800',
                            '#f44336', '#f44336', '#f44336', '#f44336'
                        ],
                        borderWidth: 1
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 12
                        }
                    }
                }
            });
        }
        
        // Gráfico de Previsão UV
        const uvForecastCtx = document.getElementById('uvForecastChart');
        if (uvForecastCtx) {
            window.uvForecastChart = new Chart(uvForecastCtx, {
                type: 'line',
                data: {
                    labels: ['06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00'],
                    datasets: [{
                        label: 'Índice UV',
                        data: [1, 3, 6, 8, 7, 4, 1],
                        borderColor: '#9c27b0',
                        backgroundColor: 'rgba(156, 39, 176, 0.1)',
                        borderWidth: 2,
                        tension: 0.3,
                        fill: true
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            display: false
                        }
                    },
                    scales: {
                        y: {
                            beginAtZero: true,
                            max: 12
                        }
                    }
                }
            });
        }
        
        // Gráfico de Viabilidade
        const viabilityCtx = document.getElementById('viabilityChart');
        if (viabilityCtx) {
            window.viabilityChart = new Chart(viabilityCtx, {
                type: 'line',
                data: {
                    labels: Array.from({length: 25}, (_, i) => i + 1),
                    datasets: [{
                        label: 'Retorno Acumulado (R$)',
                        data: calculateReturnData(100, 500000, 'solar'),
                        borderColor: '#4caf50',
                        backgroundColor: 'rgba(76, 175, 80, 0.1)',
                        borderWidth: 2,
                        tension: 0.1,
                        fill: true
                    },
                    {
                        label: 'Investimento Inicial',
                        data: Array(25).fill(500000),
                        borderColor: '#f44336',
                        borderWidth: 2,
                        borderDash: [5, 5],
                        fill: false,
                        pointRadius: 0
                    }]
                },
                options: {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                        tooltip: {
                            callbacks: {
                                label: function(context) {
                                    return context.dataset.label + ': R$ ' + formatNumber(context.raw, 2);
                                }
                            }
                        }
                    },
                    scales: {
                        x: {
                            title: {
                                display: true,
                                text: 'Anos'
                            }
                        },
                        y: {
                            title: {
                                display: true,
                                text: 'Valor (R$)'
                            },
                            ticks: {
                                callback: function(value) {
                                    return 'R$ ' + formatNumber(value, 0);
                                }
                            }
                        }
                    }
                }
            });
        }
        
        // Gráfico de Comparação de Tecnologias
        const comparisonCtx = document.getElementById('comparisonChart');
        if (comparisonCtx) {
   
(Content truncated due to size limit. Use line ranges to read in chunks)