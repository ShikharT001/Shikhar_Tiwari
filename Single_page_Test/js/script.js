// Date Fetching
const subtitle = document.getElementById("subtitle");
subtitle.textContent = `Data last updated on: ${new Date().toLocaleString()}`;

// Chart 
const ctx = document.getElementById("chartCanvas").getContext("2d");

let chartData = {
  Completed: 0,
  Pending: 0
};

const updateChart = () => {
  const chart = new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: Object.keys(chartData),
      datasets: [{
        data: Object.values(chartData),
        backgroundColor: ["#02BBC2", "#A1A2A3"]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true
    }
  });

  return chart;
};

let chart = updateChart();

// Loading Data
const loadData = async () => {
  try {
    // Fetching Json data
    const response = await fetch('./card_data.json');
    const data = await response.json();

    const gridData = data.gridData;

    // Clearing the grid
    const flexGrid = document.getElementById("flex-grid");
    flexGrid.innerHTML = '';

    // Chart Reseting
    chartData = { Completed: 0, Pending: 0 };

    gridData.forEach(item => {
      const card = document.createElement("div");
      card.className = "card col-lg-4 col-md-6 col-12"; // Bootstrap grid classes for responsiveness
      card.innerHTML = `
        <img src="${item.image || 'https://via.placeholder.com/150'}" alt="${item.title}">
        <h5>${item.title}</h5>
        <p>${item.description}</p>
      `;
      flexGrid.appendChild(card);

      // Status updation
      if (item.status === "Completed") {
        chartData.Completed += 1;
      } else if (item.status === "Pending") {
        chartData.Pending += 1;
      }
    });

    if (chart) chart.destroy(); 
    chart = updateChart();

  } catch (error) {
    console.error("Error: ", error);
  }
};

loadData();
