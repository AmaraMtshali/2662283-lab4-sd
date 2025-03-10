// fetch("https://restcountries.com/v3.1/name/deutschland")
//     .then(response =>{
//         if(!response.ok){
//             throw new Error("Country not found.")
//         }
//         console.log(response.json())
//         return response.json();

//     })

document.getElementById("press").addEventListener("click", function() {
    const countryName = document.getElementById("country_name").value.trim(); 

    if (countryName) {
        
        const url = `https://restcountries.com/v3.1/name/${countryName}`;

  
        fetch(url)
            .then(response => {
                if (!response.ok) {
                    throw new Error("Country not found.");
                }
                return response.json();  
            })
            .then(data => {
                
                const country = data[0]; 

            
                const capElement = document.getElementById("cap_id");
                const popElement = document.getElementById("pop_id");
                const regElement = document.getElementById("reg_id");
                const flagElement = document.querySelector("img");

                
                capElement.innerHTML = `Capital: ${country.capital ? country.capital[0] : "N/A"}`;
                popElement.innerHTML = `Population: ${country.population.toLocaleString()}`;
                regElement.innerHTML = `Region: ${country.region}`;
                flagElement.src = country.flag.svg;  

               
            //     const borders = country.borders;
            //     const borderingCountriesElement = document.getElementById("bordering-countries");

            //     if (borders && borders.length > 0) {
            //         borderingCountriesElement.innerHTML = `<h3>Bordering Countries:</h3>`;
            //         borders.forEach(border => {
                        
            //             fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            //                 .then(response => response.json())
            //                 .then(borderData => {
            //                     const borderName = borderData[0].name.common;
            //                     borderingCountriesElement.innerHTML += `<p>${borderName}</p>`;
            //                 });
            //         });
            //     } else {
            //         borderingCountriesElement.innerHTML = `<h3>No bordering countries</h3>`;
            //     }
            // })
            .catch(error => {
                
                console.error(error);
                alert(error.message);
            });
    } else {
        alert("Please enter a country name.");
    }
});
