function fetchData() {
    fetch('/api/data') // Replace with your target URL
    .then(response => {
        // Check if the request was successful (status code 200-299)
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parse the response as JSON (or other formats like text, blob, etc.)
        return response.json();
    })
    .then(data => {
        // Process the retrieved data
        console.log('Data received:', data);
    })
    .catch(error => {
        // Handle any errors that occurred during the fetch operation
        console.error('Fetch error:', error);
    });
}

fetchData()