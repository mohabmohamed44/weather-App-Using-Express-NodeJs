let date = new Date();
let newDate = date.toDateString();

let baseURL = `http://api.openweathermap.org/data/2.5/weather?zip=`;
let apiKey = `,&appid=e767cbd2b1c85194baf3c502daa73f91&units=metric`;

const server = "http://127.0.0.1:8080/";

const generateData = () => { 
    const zip = document.getElementById("zip").value;
    const feelings = document.getElementById("feelings").value;

    getWeatherData(zip).then((data) => {
      if (data) {
        const {
          main: { temp },
          name: city,
          weather: [{ description }],
        } = data;

        const info = {
          newDate,
          city,
          temp: Math.round(temp),
          description,
          feelings,
        };

        postData(server + "add", info);
        updatingUI();
        document.getElementById('entry').style.opacity = 1;
      }
    });
};

document.getElementById("generate").addEventListener("click", generateData);

const getWeatherData = async (zip) => {
    try {
      const res = await fetch(baseURL + zip + apiKey);
      const data = await res.json();

      if (data.cod != 200) {
        document.getElementById("error").innerHTML = data.message;
        setTimeout(() => document.getElementById("error").innerHTML = '', 2000);
        throw `${data.message}`;
      }
      return data;
    } catch (error) {
      console.log(error);
    }
};

const postData = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        return newData;
    } catch (error) {
        console.log("error", error);
    }
};

const updatingUI = async () => {
    const res = await fetch(server + "all");
    try {
      const savedData = await res.json();

      document.getElementById("date").innerHTML = savedData.newDate;
      document.getElementById("city").innerHTML = savedData.city;
      document.getElementById("temp").innerHTML = savedData.temp + '&degC';
      document.getElementById("description").innerHTML = savedData.description;
      document.getElementById("content").innerHTML = savedData.feelings;
    } catch (error) {
      console.log(error);
    }
};
