// Event listener for the submit button
document.getElementById("press").addEventListener("click", function() {
    const countryName = document.getElementById("country_name").value.trim();

    if (countryName) {
        // Construct the API URL for fetching country data
        const url = `https://restcountries.com/v3.1/name/${countryName}`;

        // Fetch data from the API
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Country not found.");
                }
                return response.json();
            })
            .then(data => {
                const country = data[0]; 
                
                /
                displayBorderingCountries(country);
            })
            .catch(error => {
                
                alert(error.message);
            });
    } else {
        alert("Please enter a country name.");
    }
});


function displayCountryInfo(country) {
    
    const capital = country.capital ? country.capital[0] : "N/A";
    document.getElementById("cap_id").textContent = `Capital: ${capital}`;

    
    document.getElementById("pop_id").textContent = `Population: ${country.population.toLocaleString()}`;

  
    document.getElementById("reg_id").textContent = `Region: ${country.region}`;

    
    const flagImage = document.getElementById("flag_img");
    flagImage.src = country.flags.svg;
    flagImage.alt = `${country.name.common} Flag`;
}


function displayBorderingCountries(country) {
    const borderingCountriesElement = document.getElementById("bordering-countries");
    const borders = country.borders;

    if (borders && borders.length > 0) {
        borderingCountriesElement.innerHTML = `<h3>Bordering Countries:</h3>`;
        borders.forEach(border => {
            
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
                .then(response => response.json())
                .then(borderData => {
                    const borderCountry = borderData[0];
                    const borderName = borderCountry.name.common;
                    const borderFlag = borderCountry.flags.svg;

                   
                    borderingCountriesElement.innerHTML += `<p>${borderName}</p>`;
                    borderingCountriesElement.innerHTML += `<img src="${borderFlag}" alt="Flag of ${borderName}" width="50">`;
                });
        });
    } else {
        borderingCountriesElement.innerHTML = `<h3>No bordering countries</h3>`;
    }
}
