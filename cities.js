let citiesList = {
  AndhraPradesh: [
    // "Visakhapatnam",
    "Vijayawada",
    "Guntur",
    "Nellore",
    // "Kurnool",
    "Tirupati",
    "Rajahmundry",
    "Anantapur",
  ],
  ArunachalPradesh: ["Itanagar", "Tawang"],
  Assam: [
    "Guwahati",
    "Dibrugarh",
    "Silchar",
    "Jorhat",
    "Tezpur",
    // "Nagaon"
  ],
  Bihar: ["Patna", "Gaya", "Bhagalpur", "Muzaffarpur", "Purnia", "Darbhanga"],
  Chhattisgarh: [
    "Raipur",
    "Bilaspur",
    "Korba",
    "Durg",
    "Bhilai",
    // "Rajnandgaon",
  ],
  Goa: [
    "Panaji",
    //  "Margao",
    "Vasco da Gama",
    // "Mapusa",
    "Ponda",
  ],
  Gujarat: [
    // "Ahmedabad",
    "Surat",
    "Vadodara",
    "Rajkot",
    "Bhavnagar",
    "Jamnagar",
    "Junagadh",
    "Gandhinagar",
  ],
  Haryana: [
    // "Gurugram",
    "Faridabad",
    "Panipat",
    "Ambala",
    "Hisar",
    "Karnal",
    "Rohtak",
  ],
  HimachalPradesh: [
    "Shimla",
    "Manali",
    // "Dharamshala",
    "Mandi",
    "Solan",
    "Una",
  ],
  Jharkhand: [
    "Ranchi",
    "Jamshedpur",
    "Dhanbad",
    "Bokaro",
    // "Hazaribagh",
    "Deoghar",
  ],
  Karnataka: [
    "Bangalore",
    "Mysore",
    "Mangalore",
    // "Hubballi",
    // "Belagavi",
    // "Davangere",
    // "Shivamogga",
  ],
  Kerala: [
    "Thiruvananthapuram",
    // "Kochi",
    "Kozhikode",
    // "Thrissur",
    // "Kannur",
    "Palakkad",
  ],
  MadhyaPradesh: ["Bhopal", "Indore", "Gwalior", "Jabalpur", "Ujjain", "Sagar"],
  Maharashtra: [
    "Mumbai",
    "Pune",
    "Nagpur",
    // "Nashik",
    "Aurangabad",
    "Solapur",
    "Amravati",
    "Kolhapur",
  ],
  Manipur: ["Imphal", "Bishnupur", "Thoubal"],
  Meghalaya: ["Shillong", "Tura"],
  Mizoram: ["Aizawl", "Lunglei"],
  Nagaland: ["Kohima", "Dimapur", "Mokokchung"],
  Odisha: [
    "Bhubaneshwar",
    "Cuttack",
    // "Rourkela",
    "Puri",
    "Sambalpur",
    "Balasore",
  ],
  Punjab: [
    "Chandigarh",
    "Amritsar",
    "Ludhiana",
    "Jalandhar",
    "Patiala",
    // "Bathinda",
  ],
  Rajasthan: [
    "Jaipur",
    "Udaipur",
    "Jodhpur",
    "Kota",
    "Bikaner",
    "Ajmer",
    "Alwar",
  ],
  Sikkim: ["Gangtok"],
  TamilNadu: [
    "Chennai",
    "Coimbatore",
    "Madurai",
    // "Tiruchirappalli",
    "Salem",
    "Tirunelveli",
  ],
  Telangana: [
    "Hyderabad",
    "Warangal",
    // "Narsampet",
    "Karimnagar",
    "Nizamabad",
    "Khammam",
  ],
  Tripura: ["Agartala"],
  UttarPradesh: [
    "Lucknow",
    "Kanpur",
    "Varanasi",
    "Agra",
    "Meerut",
    "Allahabad",
    "Ghaziabad",
  ],
  Uttarakhand: [
    // "Dehradun",
    "Haridwar",
    "Rishikesh",
    "Haldwani",
    // "Nainital",
    "Roorkee",
  ],
  WestBengal: [
    "Kolkata",
    // "Siliguri",
    "Durgapur",
    "Asansol",
    "Howrah",
    "Kharagpur",
  ],
};

let datalist = document.querySelector("#popularCities");

for (let state in citiesList) {
  citiesList[state].forEach((city) => {
    let option = document.createElement("option");
    option.value = city;
    option.innerText = state;
    datalist.append(option);
  });
}
