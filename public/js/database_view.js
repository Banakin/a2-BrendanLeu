function populateDatabase(data) {
    table = document.getElementById("db_table") // Get table
    table.innerHTML = "" // Clear table

    // Create title block
    title = document.createElement("tr")
    for (const key in data[0]) {
        title_value = document.createElement("th")
        title_value.innerText = key
        title.appendChild(title_value)
    }
    table.appendChild(title)

    // Create data point blocks
    data.forEach(element => {
        datapoint = document.createElement("tr")
        // Go through each key/object pair
        for (const key in element) {
            if (element.hasOwnProperty(key)) {
                const value = element[key];

                cell_value = document.createElement("td")
                cell_value.innerText = value
                datapoint.appendChild(cell_value)
            }
        }
        table.appendChild(datapoint)
    });
}

function fetchData() {
    fetch('/api/data')
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        console.log('Data received:', data);
        populateDatabase(data);
    })
    .catch(error => {
        console.error('Fetch error:', error);
    });
}

fetchData()