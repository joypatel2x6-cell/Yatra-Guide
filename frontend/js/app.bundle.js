// ═══════════════════════════════════════════════════
//  YATRA GUIDE — app.bundle.js (Premium Redesign)
//  Single-file bundle: data + utils + views + app
// ═══════════════════════════════════════════════════

// ── THEME INITIALIZATION ─────────────────────────────
(function initTheme() {
    var savedTheme = localStorage.getItem('yg_theme') || 'dark';
    if (savedTheme === 'dark') {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
})();

function toggleTheme() {
    var isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem('yg_theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
}

function updateThemeIcon() {
    var btn = document.getElementById('themeToggleBtn');
    if (!btn) return;
    var isDark = document.documentElement.classList.contains('dark');
    btn.innerHTML = isDark
        ? '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9z"/></svg>'
        : '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M17.36 17.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M17.36 6.64l1.42-1.42"/></svg>';
}


// ── CITIES DATA ──────────────────────────────────────
var citiesData = [
    { id: "delhi", name: "New Delhi", state: "Delhi", lat: 28.6139, lng: 77.2090, score: 9.2, attractions: ["Red Fort", "Qutub Minar", "India Gate", "Humayun's Tomb", "Lotus Temple"], foods: ["Chole Bhature", "Butter Chicken", "Chaat", "Paranthas"], hotels: ["The Taj Mahal Hotel", "The Leela Palace", "ITC Maurya"], bestSeason: "Oct-Mar", emergency: { police: "100 / 011-23013707", fire: "101", ambulance: "102 / 108", national: "112", hospitals: ["AIIMS Delhi", "Safdarjung Hospital", "Max Super Speciality Hospital"], policeStations: ["Connaught Place Police Station", "Parliament Street Police Station", "Chanakyapuri Police Station"] } },
    { id: "mumbai", name: "Mumbai", state: "Maharashtra", lat: 19.0760, lng: 72.8777, score: 9.5, attractions: ["Gateway of India", "Marine Drive", "Elephanta Caves", "Colaba Causeway", "Sea Link"], foods: ["Vada Pav", "Pav Bhaji", "Bhel Puri", "Puran Poli"], hotels: ["The Taj Mahal Palace", "The Oberoi", "Trident"], bestSeason: "Nov-Feb", emergency: { police: "100 / 022-22620111", fire: "101", ambulance: "102 / 108", national: "112", hospitals: ["KEM Hospital", "Bombay Hospital", "Lilavati Hospital & Research Centre"], policeStations: ["Colaba Police Station", "Marine Drive Police Station", "Bandra Police Station"] } },
    { id: "bengaluru", name: "Bengaluru", state: "Karnataka", lat: 12.9716, lng: 77.5946, score: 8.8, attractions: ["Lalbagh", "Cubbon Park", "Bangalore Palace", "Vidhana Soudha", "Nandi Hills"], foods: ["Bisi Bele Bath", "Filter Coffee", "Masala Dosa", "Idli Dip"], hotels: ["The Leela Palace", "Taj West End", "ITC Gardenia"], bestSeason: "Sep-Feb", emergency: { police: "100 / 080-22211117", fire: "101", ambulance: "102 / 108", national: "112", hospitals: ["NIMHANS Hospital", "St. John's Medical College", "Manipal Hospital Hal Road"], policeStations: ["Cubbon Park Police Station", "Indiranagar Police Station", "Koramangala Police Station"] } },
    { id: "chennai", name: "Chennai", state: "Tamil Nadu", lat: 13.0827, lng: 80.2707, score: 8.5, attractions: ["Marina Beach", "Kapaleeshwarar Temple", "San Thome Basilica", "Fort St. George", "Mahabalipuram"], foods: ["Idli", "Chettinad Chicken", "Dosa", "Filter Kaapi"], hotels: ["ITC Grand Chola", "Taj Coromandel", "The Leela Palace"], bestSeason: "Nov-Feb", emergency: { police: "100 / 044-23452345", fire: "101", ambulance: "102 / 108", national: "112", hospitals: ["Rajiv Gandhi Govt General Hospital", "Apollo Hospitals Greams Road", "Fortis Malar Hospital"], policeStations: ["Thousand Lights Police Station", "Flower Bazaar Police Station", "Nungambakkam Police Station"] } },
    { id: "kolkata", name: "Kolkata", state: "West Bengal", lat: 22.5726, lng: 88.3639, score: 8.9, attractions: ["Victoria Memorial", "Howrah Bridge", "Dakshineswar Kali", "Indian Museum", "Park Street"], foods: ["Rasgulla", "Kathi Rolls", "Macher Jhol", "Mishti Doi"], hotels: ["Taj Bengal", "The Oberoi Grand", "ITC Royal Bengal"], bestSeason: "Oct-Mar", emergency: { police: "100 / 033-22143000", fire: "101", ambulance: "102 / 108", national: "112", hospitals: ["SSKM Hospital", "Medical College Kolkata", "AMRI Hospital Dhakuria"], policeStations: ["Bowbazar Police Station", "Park Street Police Station", "Shakespeare Sarani Police Station"] } },
    { id: "jaipur", name: "Jaipur", state: "Rajasthan", lat: 26.9124, lng: 75.7873, score: 9.6, attractions: ["Amber Fort", "Hawa Mahal", "City Palace", "Jantar Mantar", "Nahargarh Fort"], foods: ["Dal Baati Churma", "Laal Maas", "Ghevar", "Kachori"], hotels: ["Rambagh Palace", "The Oberoi Rajvilas", "Taj Jai Mahal"], bestSeason: "Nov-Feb", emergency: { police: "100 / 0141-2607550", fire: "101", ambulance: "102 / 108", national: "112", hospitals: ["Sawai Man Singh (SMS) Hospital", "Fortis Escorts Hospital", "Apex Super Speciality Hospital"], policeStations: ["Jhotwara Police Station", "Vidhyadhar Nagar Police Station", "Manak Chowk Police Station"] } },
    { id: "hyderabad", name: "Hyderabad", state: "Telangana", lat: 17.3850, lng: 78.4867, score: 9.0, attractions: ["Charminar", "Golconda Fort", "Ramoji Film City", "Hussain Sagar", "Salar Jung Museum"], foods: ["Hyderabadi Biryani", "Haleem", "Qubani Ka Meetha", "Irani Chai"], hotels: ["Taj Falaknuma Palace", "ITC Kakatiya", "Park Hyatt"], bestSeason: "Oct-Mar", emergency: { police: "100 / 040-27852333", fire: "101", ambulance: "102 / 108", national: "112", hospitals: ["Nizam's Institute of Medical Sciences", "Apollo Hospitals Jubilee Hills", "Care Hospitals Banjara Hills"], policeStations: ["Banjara Hills Police Station", "Charminar Police Station", "Begumpet Police Station"] } },
    { id: "ahmedabad", name: "Ahmedabad", state: "Gujarat", lat: 23.0225, lng: 72.5714, score: 8.4, attractions: ["Sabarmati Ashram", "Kankaria Lake", "Adalaj Stepwell", "Jama Masjid", "Auto World Museum"], foods: ["Dhokla", "Thepla", "Fafda Jalebi", "Khandvi"], hotels: ["ITC Narmada", "Taj Skyline", "Courtyard by Marriott"], bestSeason: "Nov-Feb", emergency: { police: "100 / 079-25630100", fire: "101", ambulance: "102 / 108", national: "112", hospitals: ["Civil Hospital Asarwa", "Apollo Hospitals Bhat", "Zydus Hospital Thaltej"], policeStations: ["Navrangpura Police Station", "Satellite Police Station", "Ellisbridge Police Station"] } },
    { id: "pune", name: "Pune", state: "Maharashtra", lat: 18.5204, lng: 73.8567, score: 8.6, attractions: ["Shaniwar Wada", "Aga Khan Palace", "Sinhagad Fort", "Dagdusheth Halwai", "Osho Ashram"], foods: ["Misal Pav", "Mastani", "Puran Poli", "Vada Pav"], hotels: ["JW Marriott", "The Ritz-Carlton", "Conrad Pune"], bestSeason: "Jul-Feb", emergency: { police: "100 / 020-26122203", fire: "101", ambulance: "102 / 108", national: "112", hospitals: ["Sassoon General Hospital", "Ruby Hall Clinic Sassoon Road", "Jehangir Hospital"], policeStations: ["Shivajinagar Police Station", "Deccan Gymkhana Police Station", "Koregaon Park Police Station"] } },
    { id: "kochi", name: "Kochi", state: "Kerala", lat: 9.9312, lng: 76.2673, score: 9.4, attractions: ["Fort Kochi", "Mattancherry Palace", "Chinese Fishing Nets", "Jew Town", "Marine Drive"], foods: ["Appam with Stew", "Karimeen Pollichathu", "Puttu", "Fish Moilee"], hotels: ["Taj Malabar Resort", "Brunton Boatyard", "Grand Hyatt Bolgatty"], bestSeason: "Oct-Mar", emergency: { police: "100 / 0484-2385000", fire: "101", ambulance: "102 / 108", national: "112", hospitals: ["Ernakulam General Hospital", "Aster Medcity Cheranalloor", "Amrita Institute of Medical Sciences"], policeStations: ["Central Police Station Kochi", "Fort Kochi Police Station", "Ernakulam Town North Police Station"] } },
    { id: "goa", name: "Panaji", state: "Goa", lat: 15.4909, lng: 73.8278, score: 9.8, attractions: ["Baga Beach", "Fort Aguada", "Basilica of Bom Jesus", "Dudhsagar Falls", "Anjuna Beach"], foods: ["Goan Fish Curry", "Pork Vindaloo", "Bebinca", "Feni"], hotels: ["Taj Exotica", "The Leela Goa", "W Goa"], bestSeason: "Nov-Feb", emergency: { police: "100 / 0832-2428400", fire: "101", ambulance: "102 / 108", national: "112", hospitals: ["Goa Medical College Bambolim", "Manipal Hospital Dona Paula", "Victor Hospital Margao"], policeStations: ["Panaji Police Station", "Calangute Police Station", "Margao Police Station"] } },
    { id: "guwahati", name: "Guwahati", state: "Assam", lat: 26.1445, lng: 91.7362, score: 8.3, attractions: ["Kamakhya Temple", "Umananda Island", "Assam State Zoo", "Brahmaputra River Cruise", "Pobitora"], foods: ["Assamese Thali", "Masor Tenga", "Khar", "Pitha"], hotels: ["Vivanta Guwahati", "Radisson Blu", "Novotel"], bestSeason: "Oct-Apr", emergency: { police: "100 / 0361-2460251", fire: "101", ambulance: "102 / 108", national: "112", hospitals: ["Gauhati Medical College Hospital (GMCH)", "Apollo Hospitals Christian Basti", "Nemcare Hospital Bhangagarh"], policeStations: ["Paltan Bazaar Police Station", "Dispur Police Station", "Jalukbari Police Station"] } },
    { id: "shimla", name: "Shimla", state: "Himachal Pradesh", lat: 31.1048, lng: 77.1734, score: 9.5, attractions: ["The Ridge", "Mall Road", "Jakhoo Temple", "Kufri", "Christ Church"], foods: ["Madra", "Dhaam", "Babru", "Siddu"], hotels: ["Wildflower Hall", "The Oberoi Cecil", "Taj Theog"], bestSeason: "Mar-Jun", emergency: { police: "100 / 0177-2812344", fire: "101", ambulance: "102 / 108", national: "112", hospitals: ["Indira Gandhi Medical College (IGMC)", "Deen Dayal Upadhyaya Hospital (Rippon)", "Kamla Nehru Hospital"], policeStations: ["East Sadar Police Station Shimla", "West Sadar Police Station Shimla", "Dhalli Police Station"] } },
    { id: "srinagar", name: "Srinagar", state: "Jammu & Kashmir", lat: 34.0837, lng: 74.7973, score: 9.7, attractions: ["Dal Lake", "Gulmarg", "Pahalgam", "Shankaracharya Temple", "Mughal Gardens"], foods: ["Rogan Josh", "Wazwan", "Kahwa", "Gushtaba"], hotels: ["Taj Dal View", "The Lalit Grand Palace", "Rah Bagh"], bestSeason: "Apr-Oct", emergency: { police: "100 / 0194-2452222", fire: "101", ambulance: "102 / 108", national: "112", hospitals: ["SMHS Hospital", "Sher-i-Kashmir Institute of Medical Sciences (SKIMS)", "Lalla Ded Hospital"], policeStations: ["Shergarhi Police Station", "Kothi Bagh Police Station", "Sadar Police Station Srinagar"] } },
    { id: "varanasi", name: "Varanasi", state: "Uttar Pradesh", lat: 25.3176, lng: 82.9739, score: 9.1, attractions: ["Kashi Vishwanath", "Dashashwamedh Ghat", "Sarnath", "Assi Ghat", "Ramnagar Fort"], foods: ["Kachori Sabzi", "Banarasi Paan", "Malaiyyo", "Baati Chokha"], hotels: ["Taj Ganges", "BrijRama Palace", "Ramada Plaza"], bestSeason: "Nov-Feb", emergency: { police: "100 / 0542-2348450", fire: "101", ambulance: "102 / 108", national: "112", hospitals: ["Sir Sunderlal Hospital (BHU)", "Heritage Hospitals Lanka", "Apex Multi Speciality Hospital"], policeStations: ["Lanka Police Station", "Dashashwamedh Police Station", "Cantonment Police Station"] } },
    { id: "agra", name: "Agra", state: "Uttar Pradesh", lat: 27.1767, lng: 78.0081, score: 9.6, attractions: ["Taj Mahal", "Agra Fort", "Fatehpur Sikri", "Itimad-ud-Daulah", "Mehtab Bagh"], foods: ["Petha", "Bedai Poori", "Dalmoth", "Chaat"], hotels: ["The Oberoi Amarvilas", "Taj Hotel & Convention Centre", "ITC Mughal"], bestSeason: "Oct-Mar", emergency: { police: "100 / 0562-2260233", fire: "101", ambulance: "102 / 108", national: "112", hospitals: ["SN Medical College Hospital", "District Hospital Agra", "Pushpanjali Hospital"], policeStations: ["Tajganj Police Station", "Hariparwat Police Station", "Sadar Police Station Agra"] } },
    { id: "amritsar", name: "Amritsar", state: "Punjab", lat: 31.6340, lng: 74.8723, score: 9.4, attractions: ["Golden Temple", "Jallianwala Bagh", "Wagah Border", "Akal Takht", "Gobindgarh Fort"], foods: ["Amritsari Kulcha", "Lassi", "Tandoori Chicken", "Makki Di Roti & Sarson Ka Saag"], hotels: ["Taj Swarna", "Hyatt Regency", "Radisson Blu"], bestSeason: "Oct-Mar", emergency: { police: "100 / 0183-2225054", fire: "101", ambulance: "102 / 108", national: "112", hospitals: ["Guru Nanak Dev Hospital", "Fortis Escorts Hospital", "SGRD Charitable Hospital"], policeStations: ["Kotwali Police Station", "Civil Lines Police Station", "Sadar Police Station Amritsar"] } },
    { id: "udaipur", name: "Udaipur", state: "Rajasthan", lat: 24.5854, lng: 73.7125, score: 9.5, attractions: ["Lake Pichola", "City Palace", "Jag Mandir", "Sajjangarh Monsoon Palace", "Saheliyon-ki-Bari"], foods: ["Dal Baati", "Kachori", "Mirchi Vada", "Gatte Ki Sabzi"], hotels: ["The Taj Lake Palace", "The Leela Palace Udaipur", "The Oberoi Udaivilas"], bestSeason: "Sep-Mar", emergency: { police: "100 / 0294-2413982", fire: "101", ambulance: "102 / 108", national: "112", hospitals: ["Maharana Bhupal Govt Hospital", "Geetanjali Medicity", "GBH American Hospital"], policeStations: ["Hathipole Police Station", "Ambamata Police Station", "Surajpole Police Station"] } },
    { id: "darjeeling", name: "Darjeeling", state: "West Bengal", lat: 27.0410, lng: 88.2627, score: 9.3, attractions: ["Tiger Hill", "Batasia Loop", "Darjeeling Himalayan Railway", "Happy Valley Tea Estate", "Peace Pagoda"], foods: ["Momos", "Darjeeling Tea", "Thukpa", "Alu Dum"], hotels: ["Windamere Hotel", "The Elgin Darjeeling", "Mayfair Darjeeling"], bestSeason: "Oct-May", emergency: { police: "100 / 0354-2252110", fire: "101", ambulance: "102 / 108", national: "112", hospitals: ["Darjeeling Sadar District Hospital", "Planters Hospital", "Marybiola Clinic"], policeStations: ["Darjeeling Sadar Police Station", "Jorebunglow Police Station", "Ghoom Police Station"] } },
    { id: "ooty", name: "Ooty", state: "Tamil Nadu", lat: 11.4102, lng: 76.6950, score: 9.1, attractions: ["Botanical Gardens", "Ooty Lake", "Doddabetta Peak", "Rose Garden", "Nilgiri Mountain Railway"], foods: ["Ooty Chocolates", "Ooty Varkey", "Tea", "Fresh Peaches"], hotels: ["Savoy - IHCL SeleQtions", "WelcomHeritage Regency Villas", "Sherlock Hotel"], bestSeason: "Oct-Jun", emergency: { police: "100 / 0423-2223807", fire: "101", ambulance: "102 / 108", national: "112", hospitals: ["Ooty Government Headquarter Hospital", "SM Hospital", "Santhosha Hospital"], policeStations: ["Ooty Town Police Station", "Ooty Rural Police Station", "B1 Police Station Ooty"] } },
    { id: "manali", name: "Manali", state: "Himachal Pradesh", lat: 32.2396, lng: 77.1887, score: 9.6, attractions: ["Solang Valley", "Rohtang Pass", "Hadimba Temple", "Jogini Waterfalls", "Old Manali"], foods: ["Siddu", "Trout Fish", "Patande", "Babru"], hotels: ["Span Resort & Spa", "Manu Allaya Resort", "Solang Valley Resort"], bestSeason: "Oct-Jun", emergency: { police: "100 / 01902-252326", fire: "101", ambulance: "102 / 108", national: "112", hospitals: ["Lady Willingdon Hospital", "Civil Hospital Manali", "Mission Hospital Manali"], policeStations: ["Manali Police Station", "Patlikuhal Police Station", "Bhuntar Police Station"] } },
    { id: "pondicherry", name: "Puducherry", state: "Puducherry", lat: 11.9416, lng: 79.8083, score: 9.2, attractions: ["Promenade Beach", "Auroville", "French Quarter", "Paradise Beach", "Sri Aurobindo Ashram"], foods: ["French Croissants", "Seafood Crepes", "Tandoori Specialties", "Baggettes"], hotels: ["Palais de Mahé - CGH Earth", "The Promenade", "Villa Shanti"], bestSeason: "Oct-Mar", emergency: { police: "100 / 0413-2231100", fire: "101", ambulance: "102 / 108", national: "112", hospitals: ["JIPMER Super Speciality Hospital", "Indira Gandhi Govt General Hospital", "PIMS Hospital"], policeStations: ["Grand Bazaar Police Station", "Orleanpet Police Station", "Reddiarpalayam Police Station"] } },
    { id: "rishikesh", name: "Rishikesh", state: "Uttarakhand", lat: 30.0869, lng: 78.2676, score: 9.4, attractions: ["Laxman Jhula", "Triveni Ghat", "Beatles Ashram", "Parmarth Niketan", "Ram Jhula"], foods: ["Aloo Puri", "Ayurvedic Herbal Tea", "Chole Kulche", "Lassi"], hotels: ["Taj Rishikesh Resort & Spa", "Ananda in the Himalayas", "Aloha on the Ganges"], bestSeason: "Sep-May", emergency: { police: "100 / 0135-2430041", fire: "101", ambulance: "102 / 108", national: "112", hospitals: ["AIIMS Rishikesh", "Government Hospital Rishikesh", "Nirmal Ashram Hospital"], policeStations: ["Rishikesh Police Station", "Muni Ki Reti Police Station", "Lakshman Jhula Police Station"] } },
    { id: "bhopal", name: "Bhopal", state: "Madhya Pradesh", lat: 23.2599, lng: 77.4126, score: 9.0, attractions: ["Upper Lake", "Van Vihar National Park", "Bhimbetka Rock Shelters", "Sanchi Stupa", "Taj-ul-Masajid"], foods: ["Poha Jalebi", "Bhopali Gosht Korma", "Biryani", "Mawa Bati"], hotels: ["Jehan Numa Palace", "Taj Lakefront Bhopal", "Radisson Bhopal"], bestSeason: "Oct-Mar", emergency: { police: "100 / 0755-2555555", fire: "101", ambulance: "102 / 108", national: "112", hospitals: ["Hamidia Hospital", "AIIMS Bhopal", "Bansal Hospital"], policeStations: ["Shyamla Hills Police Station", "MP Nagar Police Station", "Arera Colony Police Station"] } },
    { id: "raipur", name: "Raipur", state: "Chhattisgarh", lat: 21.2514, lng: 81.6296, score: 8.4, attractions: ["Swami Vivekanand Sarovar", "Nandan Van Zoo", "Purkhouti Muktangan", "Rajim", "Chhatregarh Fort"], foods: ["Chila", "Muttia", "Fara", "Bafauri"], hotels: ["Courtyard by Marriott Raipur", "Hyatt Raipur", "Sayaji Raipur"], bestSeason: "Oct-Mar", emergency: { police: "100 / 0771-4247100", fire: "101", ambulance: "102 / 108", national: "112", hospitals: ["Dr. BR Ambedkar Memorial Hospital", "AIIMS Raipur", "Ramkrishna CARE Hospitals"], policeStations: ["Civil Lines Police Station", "Telibandha Police Station", "Pandri Police Station"] } },
    { id: "bhubaneswar", name: "Bhubaneswar", state: "Odisha", lat: 20.2961, lng: 85.8245, score: 9.1, attractions: ["Lingaraj Temple", "Udayagiri Caves", "Nandankanan Zoo", "Dhauli Shanti Stupa", "Khandagiri Caves"], foods: ["Dalma", "Odisha Rasagola", "Chhena Poda", "Pakhala Bhata"], hotels: ["Mayfair Lagoon", "Trident Bhubaneswar", "Welcomhotel by ITC Hotels"], bestSeason: "Oct-Mar", emergency: { police: "100 / 0674-2530100", fire: "101", ambulance: "102 / 108", national: "112", hospitals: ["AIIMS Bhubaneswar", "Capital Hospital", "AMRI Hospital Bhubaneswar"], policeStations: ["Kharavela Nagar Police Station", "Capital Police Station", "Nayapalli Police Station"] } },
    { id: "ranchi", name: "Ranchi", state: "Jharkhand", lat: 23.3441, lng: 85.3096, score: 8.6, attractions: ["Dassam Falls", "Jonha Falls", "Jagannath Temple", "Ranchi Lake", "Rock Garden"], foods: ["Litti Chokha", "Dhuska", "Pitha", "Chilka Roti"], hotels: ["Radisson Blu Ranchi", "Le Lac Sarovar Portico", "Chanakya BNR Hotel"], bestSeason: "Sep-Mar", emergency: { police: "100 / 0651-2446708", fire: "101", ambulance: "102 / 108", national: "112", hospitals: ["Rajendra Institute of Medical Sciences (RIMS)", "Orchid Medical Centre", "Bhagwan Mahavir Medica Super Hospital"], policeStations: ["Lalpur Police Station", "Kotwali Police Station", "Sadar Police Station Ranchi"] } },
    { id: "patna", name: "Patna", state: "Bihar", lat: 25.5941, lng: 85.1376, score: 8.7, attractions: ["Golghar", "Patna Museum", "Sanjay Gandhi Zoological Park", "Takht Sri Patna Sahib", "Gandhi Ghat"], foods: ["Litti Chokha", "Sattu Paratha", "Khaja", "Anarsa"], hotels: ["Hotel Maurya Patna", "Lemon Tree Premier Patna", "Chanakya Hotel"], bestSeason: "Oct-Mar", emergency: { police: "100 / 0612-2201977", fire: "101", ambulance: "102 / 108", national: "112", hospitals: ["Patna Medical College Hospital (PMCH)", "AIIMS Patna", "Paras HMRI Hospital"], policeStations: ["Kotwali Police Station", "Gandhi Maidan Police Station", "Patliputra Police Station"] } },
    { id: "vizag", name: "Visakhapatnam", state: "Andhra Pradesh", lat: 17.6868, lng: 83.2185, score: 9.3, attractions: ["Araku Valley", "Rishikonda Beach", "Kailasagiri", "INS Kurusura Submarine Museum", "Yarada Beach"], foods: ["Bamboo Chicken", "Vizag Biryani", "Punugulu", "Royyala Vepudu (Prawn Fry)"], hotels: ["The Gateway Hotel Beach Road", "Novotel Visakhapatnam Varun Beach", "Radisson Blue Resort"], bestSeason: "Oct-Mar", emergency: { police: "100 / 0891-2785400", fire: "101", ambulance: "102 / 108", national: "112", hospitals: ["King George Hospital (KGH)", "Care Hospitals Ramnagar", "SevenHills Hospital"], policeStations: ["Three Town Police Station", "Dwaraka Police Station", "Maharanipeta Police Station"] } },
    { id: "shillong", name: "Shillong", state: "Meghalaya", lat: 25.5788, lng: 91.8833, score: 9.5, attractions: ["Elephant Falls", "Shillong Peak", "Umiam Lake", "Ward's Lake", "Don Bosco Museum"], foods: ["Jadoh", "Tungrymbai", "Dohneiiong", "Momos"], hotels: ["Ri Kynjai Resort", "Courtyard by Marriott Shillong", "The Heritage Club - Tripura Castle"], bestSeason: "Oct-Jun", emergency: { police: "100 / 0364-2222277", fire: "101", ambulance: "102 / 108", national: "112", hospitals: ["NEIGRIHMS Shillong", "Civil Hospital Shillong", "Nazareth Hospital"], policeStations: ["Shillong Sadar Police Station", "Laitumkhrah Police Station", "Madanrting Police Station"] } },
    { id: "itanagar", name: "Itanagar", state: "Arunachal Pradesh", lat: 27.0844, lng: 93.6053, score: 9.0, attractions: ["Ita Fort", "Ganga Lake (Gyakar Sinyi)", "Gompa Buddhist Temple", "Jawaharlal Nehru State Museum", "Polo Park"], foods: ["Thukpa", "Momos", "Pehak (Spicy Soya Chutney)", "Chhurpi"], hotels: ["Hotel Donyi Polo Ashok", "Winger Hotel Itanagar", "Hotel Pybss"], bestSeason: "Oct-Apr", emergency: { police: "100 / 0360-2212233", fire: "101", ambulance: "102 / 108", national: "112", hospitals: ["Ramakrishna Mission Hospital", "Tomo Riba Institute of Health & Medical Sciences (TRIHMS)", "Heema Hospital"], policeStations: ["Itanagar Police Station", "Naharlagun Police Station", "Nirjuli Police Station"] } },
    { id: "imphal", name: "Imphal", state: "Manipur", lat: 24.8170, lng: 93.9368, score: 9.2, attractions: ["Kangla Fort", "Loktak Lake", "Ima Keithel (Mother's Market)", "Shree Govindajee Temple", "War Cemetery"], foods: ["Eromba", "Chamthong", "Kangshoi", "Momos"], hotels: ["Classic Hotel Imphal", "Hotel Nirmala", "The Classic Grande"], bestSeason: "Oct-Apr", emergency: { police: "100 / 0385-2450199", fire: "101", ambulance: "102 / 108", national: "112", hospitals: ["JNIMS Hospital", "RIMS Imphal", "Shija Hospital"], policeStations: ["Imphal City Police Station", "Porompat Police Station", "Singjamei Police Station"] } },
    { id: "agartala", name: "Agartala", state: "Tripura", lat: 23.8315, lng: 91.2868, score: 8.8, attractions: ["Ujjayanta Palace", "Neermahal (Water Palace)", "Sepahijala Wildlife Sanctuary", "Unakoti Rock Carvings", "Heritage Park"], foods: ["Mui Borok Cuisine", "Chakhwi", "Gudok", "Wahan Mosdeng"], hotels: ["Ginger Agartala", "Hotel Welcome Palace", "Royal Guest House"], bestSeason: "Oct-Mar", emergency: { police: "100 / 0381-2323001", fire: "101", ambulance: "102 / 108", national: "112", hospitals: ["GBP Hospital Agartala", "ILS Hospital Agartala", "Agartala Government Medical College Hospital"], policeStations: ["West Agartala Police Station", "East Agartala Police Station", "Airport Police Station Agartala"] } },
    { id: "kohima", name: "Kohima", state: "Nagaland", lat: 25.6751, lng: 94.1086, score: 9.3, attractions: ["Kohima War Cemetery", "Kohima Cathedral", "Dzükou Valley", "Nagaland State Museum", "Kisama Heritage Village"], foods: ["Smoked Pork", "Axone (Fermented Soybean)", "Galho (Rice Stew)", "Bamboo Steamed Fish"], hotels: ["Hotel Japfü", "Vivor Hotel Kohima", "Razhu Pru"], bestSeason: "Oct-May", emergency: { police: "100 / 0370-2243012", fire: "101", ambulance: "102 / 108", national: "112", hospitals: ["Naga Hospital Kohima", "Eden Medical Centre", "Bethel Medical Centre"], policeStations: ["Kohima North Police Station", "Kohima South Police Station", "Tseminyu Police Station"] } },
    { id: "aizawl", name: "Aizawl", state: "Mizoram", lat: 23.7271, lng: 92.7176, score: 9.1, attractions: ["Durtlang Hills", "Solomon's Temple", "Mizoram State Museum", "Tam Dil Lake", "Reiek Heritage Village"], foods: ["Bai (Vegetable Stew)", "Sawhchiar", "Koat Pitha", "Mizo Vawksa Rep"], hotels: ["Hotel Regency", "Hotel Chief", "Chaltlang Dawrkawn Hotel"], bestSeason: "Oct-Mar", emergency: { police: "100 / 0389-2322522", fire: "101", ambulance: "102 / 108", national: "112", hospitals: ["Civil Hospital Aizawl", "Aizawl Hospital", "Synod Hospital Durtlang"], policeStations: ["Aizawl Police Station", "Bawngkawn Police Station", "Vaivakawn Police Station"] } },
    { id: "gandhinagar", name: "Gandhinagar", state: "Gujarat", lat: 23.2156, lng: 72.6369, score: 8.7, attractions: ["Akshardham Temple", "Indroda Nature Park", "Adalaj Stepwell", "Children's Park Sector 9", "Rani Sipri's Mosque"], foods: ["Dhokla", "Fafda Jalebi", "Thepla", "Gujarati Thali"], hotels: ["Fortune Inn Haveli", "Hotel Rajmahal", "Courtyard by Marriott Ahmedabad"], bestSeason: "Nov-Feb", emergency: { police: "100 / 079-23232414", fire: "101", ambulance: "102 / 108", national: "112", hospitals: ["Civil Hospital Gandhinagar", "Apollo Hospitals Gandhinagar", "Sola Civil Hospital"], policeStations: ["Gandhinagar Sector-7 Police Station", "Gandhinagar Sector-21 Police Station", "Kudasan Police Station"] } }
];

// ── CALCULATOR ──────────────────────────────────────
var VEHICLES = {
    bike: { icon: '🏍️', speed: 50, costPerKm: 2, name: 'Bike', baseFare: 0, comfort: 4 },
    car: { icon: '🚗', speed: 80, costPerKm: 6, name: 'Car', baseFare: 0, comfort: 8 },
    bus: { icon: '🚌', speed: 60, costPerKm: 1.5, name: 'Bus', baseFare: 0, comfort: 6 },
    train: { icon: '🚂', speed: 70, costPerKm: 1, name: 'Train', baseFare: 0, comfort: 7 },
    flight: { icon: '✈️', speed: 800, costPerKm: 5, name: 'Flight', baseFare: 2000, comfort: 9 }
};

function haversine(lat1, lng1, lat2, lng2) {
    var R = 6371, toR = function (d) { return d * Math.PI / 180; };
    var dLat = toR(lat2 - lat1), dLng = toR(lng2 - lng1);
    var a = Math.pow(Math.sin(dLat / 2), 2) + Math.cos(toR(lat1)) * Math.cos(toR(lat2)) * Math.pow(Math.sin(dLng / 2), 2);
    return Math.round(R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)));
}

function tripDetails(dist, vKey) {
    var v = VEHICLES[vKey];
    var hrs = dist / v.speed;
    var h = Math.floor(hrs), m = Math.round((hrs - h) * 60);
    var cost = Math.round(dist * v.costPerKm + v.baseFare);

    var score = v.comfort * 0.4;
    if (hrs < 3) score += 3;
    else if (hrs < 8) score += 2;
    else score += 1;

    if (cost < dist * 2) score += 3;
    else if (cost < dist * 5) score += 2;
    else score += 1;

    score = Math.min(9.9, Math.max(4.0, score)).toFixed(1);
    return { dist: dist, time: h + 'h ' + m + 'm', cost: cost, icon: v.icon, name: v.name, score: score, scorePercent: Math.round((score / 10) * 100) };
}

// ── LOCAL STORAGE ────────────────────────────────────
var HIST_KEY = 'yg_history', FAV_KEY = 'yg_favorites';
function getHistory() { return JSON.parse(localStorage.getItem(HIST_KEY) || '[]'); }
function getFavs() { return JSON.parse(localStorage.getItem(FAV_KEY) || '[]'); }

function pushHistory(rec) {
    var h = getHistory(); h.unshift(rec);
    if (h.length > 12) h.pop();
    localStorage.setItem(HIST_KEY, JSON.stringify(h));
}

function toggleFav(rec) {
    var f = getFavs();
    var i = -1;
    for (var k = 0; k < f.length; k++) {
        if (f[k].fromId === rec.fromId && f[k].toId === rec.toId) { i = k; break; }
    }
    if (i > -1) { f.splice(i, 1); } else { f.push(rec); }
    localStorage.setItem(FAV_KEY, JSON.stringify(f));
    return i === -1;
}

// ── USER SESSION (localStorage) ──────────────────────
var SESSION_KEY = 'yg_user';
function getUser() { return JSON.parse(localStorage.getItem(SESSION_KEY) || 'null'); }
function setUser(u) { localStorage.setItem(SESSION_KEY, JSON.stringify(u)); }
function clearUser() { localStorage.removeItem(SESSION_KEY); }

var USERS_KEY = 'yg_users';
function getUsers() { return JSON.parse(localStorage.getItem(USERS_KEY) || '[]'); }
function saveUser(u) {
    var users = getUsers();
    users.push(u);
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

// ── HELPERS ──
function cityOptions(cities, selectedId) {
    selectedId = selectedId || '';
    var html = '';
    for (var i = 0; i < cities.length; i++) {
        var sel = cities[i].id === selectedId ? 'selected' : '';
        html += '<option value="' + cities[i].id + '" ' + sel + '>' + cities[i].name + ', ' + cities[i].state + '</option>';
    }
    return html;
}

function viewHome() {
    var topCities = [
        { id: "delhi", name: "New Delhi", state: "Delhi", img: "https://images.unsplash.com/photo-1587474260584-136574528ed5?q=80&w=400&auto=format&fit=crop" },
        { id: "agra", name: "Agra", state: "Uttar Pradesh", img: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=400&auto=format&fit=crop" },
        { id: "jaipur", name: "Jaipur", state: "Rajasthan", img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=400&auto=format&fit=crop" }
    ];

    var popularDestinations = [
        { id: "goa", name: "Goa", state: "Goa", season: "Nov - Feb", img: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?q=80&w=600&auto=format&fit=crop" },
        { id: "srinagar", name: "Srinagar", state: "Jammu & Kashmir", season: "Apr - Oct", img: "https://images.unsplash.com/photo-1595815771614-ade9d652a65d?q=80&w=600&auto=format&fit=crop" },
        { id: "jaipur", name: "Jaipur", state: "Rajasthan", season: "Oct - Mar", img: "https://images.unsplash.com/photo-1477587458883-47145ed94245?q=80&w=600&auto=format&fit=crop" },
        { id: "kochi", name: "Kochi", state: "Kerala", season: "Sep - Mar", img: "https://images.unsplash.com/photo-1589308078059-be1415eab4c3?q=80&w=600&auto=format&fit=crop" },
        { id: "manali", name: "Manali", state: "Himachal Pradesh", season: "Oct - Jun", img: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?q=80&w=600&auto=format&fit=crop" },
        { id: "agra", name: "Agra", state: "Uttar Pradesh", season: "Nov - Feb", img: "https://images.unsplash.com/photo-1548013146-72479768bada?q=80&w=600&auto=format&fit=crop" }
    ];

    var cardsHTML = '';
    for (var i = 0; i < topCities.length; i++) {
        var c = topCities[i];
        cardsHTML += '<div class="custom-home-card" onclick="navigate(\'planner\')">' +
            '<img class="custom-home-card-img" src="' + c.img + '" alt="' + c.name + '">' +
            '<div class="custom-home-card-info">' +
            '<h5>' + c.name + '</h5>' +
            '<p>' + c.state + '</p>' +
            '</div></div>';
    }

    var destGridHTML = '';
    for (var j = 0; j < popularDestinations.length; j++) {
        var d = popularDestinations[j];
        destGridHTML += '<div class="custom-dest-card" onclick="navigate(\'explorer\', { city: \'' + d.id + '\' })">' +
            '<img class="custom-dest-img" src="' + d.img + '" alt="' + d.name + '">' +
            '<div class="custom-dest-info">' +
            '<h4>' + d.name + '</h4>' +
            '<p>' + d.state + ' • Best: ' + d.season + '</p>' +
            '</div></div>';
    }

    return '<div class="custom-home-container view-section active">' +
        '<!-- Animated Header Logo and Name -->' +
        '<div class="custom-brand-logo">' +
        '<div class="custom-brand-logo-icon">' +
        '<svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">' +
        '<circle cx="12" cy="12" r="10" stroke="#fff" stroke-width="2" stroke-dasharray="4 2"/>' +
        '<path d="M12 4 L14.5 10.5 L21 12 L14.5 13.5 L12 20 L9.5 13.5 L3 12 L9.5 10.5 Z" fill="#fff"/>' +
        '<circle cx="12" cy="12" r="2.5" fill="#fff" opacity="0.9"/>' +
        '</svg>' +
        '</div>' +
        '<div class="custom-brand-logo-words">' +
        '<div class="custom-brand-logo-text">Yatra <span>Guide</span></div>' +
        '<div class="custom-brand-logo-tagline">Your India Travel Companion</div>' +
        '</div>' +
        '</div>' +


        '<!-- Hero Section -->' +
        '<div class="custom-home-hero">' +
        '<div class="custom-home-left">' +
        '<h1 class="custom-home-title">Explore India<br>Outside The Book</h1>' +
        '<p class="custom-home-desc">To get the best of your adventure in India, you just need to leave and come where you explore diversity. We are waiting for you.</p>' +
        '<button class="custom-home-btn" onclick="navigate(\'planner\')">Explore</button>' +
        '<div class="custom-home-cards-section">' +
        '<div class="custom-home-cards">' +
        cardsHTML +
        '</div></div></div>' +
        '<div class="custom-home-right">' +
        '<img class="custom-home-illustration" src="assets/india_travel_hero.png" alt="Explore India">' +
        '</div></div>' +

        '<!-- Popular Destinations Section (Scroll-Reveal) -->' +
        '<section class="custom-home-section scroll-reveal">' +
        '<h2 class="custom-section-title">Popular Destinations</h2>' +
        '<p class="custom-section-subtitle">Handpicked locations with outstanding culture, sights, and local delicacies.</p>' +
        '<div class="custom-dest-grid">' +
        destGridHTML +
        '</div></section>' +

        '<!-- Why Choose Yatra Guide Section (Scroll-Reveal) -->' +
        '<section class="custom-home-section scroll-reveal">' +
        '<h2 class="custom-section-title">Why Choose Yatra Guide</h2>' +
        '<p class="custom-section-subtitle">Built with reliable local algorithms to solve real travel planning needs offline.</p>' +
        '<div class="custom-features-grid">' +
        '<div class="custom-feature-card">' +
        '<div class="custom-feature-icon">🗺️</div>' +
        '<div class="custom-feature-info">' +
        '<h4>Offline Route Planner</h4>' +
        '<p>Calculate accurate paths and coordinates between 15+ major cities using local Haversine equations without any internet connection.</p>' +
        '</div></div>' +
        '<div class="custom-feature-card">' +
        '<div class="custom-feature-icon">💰</div>' +
        '<div class="custom-feature-info">' +
        '<h4>Transit Cost Estimator</h4>' +
        '<p>Compare travel costs and times across 5 transit modes (Bike, Car, Bus, Train, Flight) simultaneously in real-time.</p>' +
        '</div></div>' +
        '<div class="custom-feature-card">' +
        '<div class="custom-feature-icon">🔒</div>' +
        '<div class="custom-feature-info">' +
        '<h4>Local Privacy First</h4>' +
        '<p>All your searched routes, history, and favorite itineraries are saved strictly in your browser. No remote tracking, ever.</p>' +
        '</div></div>' +
        '<div class="custom-feature-card">' +
        '<div class="custom-feature-icon">🚑</div>' +
        '<div class="custom-feature-info">' +
        '<h4>Emergency Directory</h4>' +
        '<p>Quick access to hospital, police station, and support helplines for every city, helping you stay prepared on your journeys.</p>' +
        '</div></div>' +
        '</div></section>' +

        '<!-- Traveller Reviews Section (Scroll-Reveal) -->' +
        '<section class="custom-home-section scroll-reveal">' +
        '<h2 class="custom-section-title">Traveller Reviews</h2>' +
        '<p class="custom-section-subtitle">Read what other adventurers say about their offline journeys with us.</p>' +
        '<div class="custom-reviews-grid">' +
        '<div class="custom-review-card">' +
        '<div><div class="custom-review-stars">★★★★★</div>' +
        '<p class="custom-review-text">"Yatra Guide was a lifesaver when my network died in Kashmir! The offline route estimator got us exactly where we needed to go."</p>' +
        '</div><div class="custom-review-author">— Amit S.</div></div>' +
        '<div class="custom-review-card">' +
        '<div><div class="custom-review-stars">★★★★★</div>' +
        '<p class="custom-review-text">"Being able to compare bus, train, and flight fares simultaneously saved us hours of planning and a lot of money."</p>' +
        '</div><div class="custom-review-author">— Priya K.</div></div>' +
        '<div class="custom-review-card">' +
        '<div><div class="custom-review-stars">★★★★½</div>' +
        '<p class="custom-review-text">"Highly recommend the offline itinerary generator. The emergency directory is a great peace-of-mind feature."</p>' +
        '</div><div class="custom-review-author">— Rahul M.</div></div>' +
        '</div></section>' +
        '</div>';
}

function viewPlanner(prefill) {
    prefill = prefill || {};
    var optsSrc = cityOptions(citiesData, prefill.src);
    var optsDst = cityOptions(citiesData, prefill.dst);

    if (prefill.v) selectedVehicle = prefill.v;

    return '<div class="view-section active dash-wrap">' +

        '<!-- Page Header -->' +
        '<div class="pg-header">' +
        '<div class="pg-icon pg-icon-dash">🗺️</div>' +
        '<div class="pg-header-text">' +
        '<span class="pg-badge pg-badge-dash">Route Planner</span>' +
        '<h2 class="pg-title">Dashboard</h2>' +
        '<p class="pg-subtitle">Plan your ideal journey with multi-modal cost breakdowns and AI travel scoring.</p>' +
        '</div>' +
        '</div>' +

        '<!-- Stat Cards Row -->' +
        '<div class="dash-stats-row">' +
        '<div class="dash-stat-card"><div class="dash-stat-dot dash-stat-dot-blue"></div><div class="dash-stat-label">Cities Covered</div><div class="dash-stat-value">15+</div><div class="dash-stat-sub">Major Indian cities</div></div>' +
        '<div class="dash-stat-card"><div class="dash-stat-dot dash-stat-dot-green"></div><div class="dash-stat-label">Transport Modes</div><div class="dash-stat-value">5</div><div class="dash-stat-sub">Bike · Car · Bus · Train · Flight</div></div>' +
        '<div class="dash-stat-card"><div class="dash-stat-dot dash-stat-dot-amber"></div><div class="dash-stat-label">Accuracy</div><div class="dash-stat-value">99%</div><div class="dash-stat-sub">Haversine formula</div></div>' +
        '<div class="dash-stat-card"><div class="dash-stat-dot dash-stat-dot-red"></div><div class="dash-stat-label">Works Offline</div><div class="dash-stat-value">100%</div><div class="dash-stat-sub">No internet needed</div></div>' +
        '</div>' +

        '<div class="dashboard-grid">' +
        '<div class="dash-panel">' +
        '<div class="form-group"><label>📍 Origin City</label><select id="dashSrc"><option value="">Select origin...</option>' + optsSrc + '</select></div>' +
        '<div class="form-group"><label>🎯 Destination City</label><select id="dashDst"><option value="">Select destination...</option>' + optsDst + '</select></div>' +
        '<div class="form-group" style="margin-bottom:0;">' +
        '<label style="font-size:0.88rem;color:var(--text-muted);margin-bottom:0.6rem;font-weight:600;display:block;text-transform:uppercase;letter-spacing:1px;">🚗 Travel Mode</label>' +
        '<div class="dash-vehicle-row" id="dashVehicles">' +
        '<button class="dash-v-pill v-btn ' + (selectedVehicle === 'bike'   ? 'selected' : '') + '" data-v="bike"><span class="v-icon">🏍️</span>Bike</button>' +
        '<button class="dash-v-pill v-btn ' + (selectedVehicle === 'car'    ? 'selected' : '') + '" data-v="car"><span class="v-icon">🚗</span>Car</button>' +
        '<button class="dash-v-pill v-btn ' + (selectedVehicle === 'bus'    ? 'selected' : '') + '" data-v="bus"><span class="v-icon">🚌</span>Bus</button>' +
        '<button class="dash-v-pill v-btn ' + (selectedVehicle === 'train'  ? 'selected' : '') + '" data-v="train"><span class="v-icon">🚂</span>Train</button>' +
        '<button class="dash-v-pill v-btn ' + (selectedVehicle === 'flight' ? 'selected' : '') + '" data-v="flight"><span class="v-icon">✈️</span>Flight</button>' +
        '</div>' +
        '</div>' +
        '<button class="dash-calc-btn btn" id="dashCalcBtn">Calculate Route →</button>' +
        '</div>' +

        '<div id="dashResults">' +
        '<div class="dash-panel" style="padding:4rem 2rem; text-align:center; color:var(--text-muted);">' +
        '<div style="font-size:3rem;margin-bottom:1rem;">🗺️</div>' +
        '<h3 style="margin-bottom:0.5rem; color:var(--text-main); font-family:Outfit,sans-serif;">Ready to calculate</h3>' +
        '<p>Select your cities and mode of transport to view detailed trip insights.</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
}

function viewCostCalculator() {
    var opts = cityOptions(citiesData);
    return '<div class="view-section active">' +
        '<div class="section-label">Cost Comparison</div>' +
        '<h2>Compare All Modes</h2>' +
        '<p>Calculate and compare time and cost for all available transport modes simultaneously.</p>' +
        '<div class="dashboard-grid" style="margin-top:2rem;">' +
        '<div class="glass-panel" style="padding: 2rem;">' +
        '<div class="form-group"><label>Source City</label><select id="costSource"><option value="">Select source...</option>' + opts + '</select></div>' +
        '<div class="form-group"><label>Destination City</label><select id="costDest"><option value="">Select destination...</option>' + opts + '</select></div>' +
        '<button class="btn" id="compareCostBtn" style="width: 100%; margin-top:1rem; padding:1rem;">Compare Costs</button>' +
        '</div>' +
        '<div class="glass-panel" style="padding: 2rem;">' +
        '<h3 style="margin-bottom:1.5rem;">Comparison Results</h3>' +
        '<div id="costComparisonContent">' +
        '<p style="color:var(--text-muted); text-align:center; padding:2rem 0;">Select cities and click "Compare Costs" to view details for all transport modes.</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
}

// ── City Explorer with Leaflet Map ─────────────────────
function viewExplorer() {
    return '<div class="view-section active">' +
        '<div class="explorer-header">' +
        '<div>' +
        '<div class="section-label">City Explorer</div>' +
        '<h2>Discover India</h2>' +
        '<p style="color:var(--text-muted); max-width:500px;">Click on any city marker to explore its attractions, cuisine, and plan a trip.</p>' +
        '</div>' +
        '<div class="map-layer-toggle" id="mapLayerToggle">' +
        '<button class="map-layer-btn active" id="layerStreet" onclick="setMapLayer(\'street\')">🗺️ Street</button>' +
        '<button class="map-layer-btn" id="layerSatellite" onclick="setMapLayer(\'satellite\')">🛰️ Satellite</button>' +
        '<button class="map-layer-btn" id="layerTerrain" onclick="setMapLayer(\'terrain\')">🏔️ Terrain</button>' +
        '</div>' +
        '</div>' +
        '<div class="map-explorer-grid">' +
        '<div class="map-container glass-panel" style="padding:0; overflow:hidden;">' +
        '<div id="leafletMap" style="width:100%; height:100%; min-height:500px; z-index:1;"></div>' +
        '</div>' +
        '<div class="map-info-panel glass-panel" id="mapCityInfo">' +
        '<div class="map-info-placeholder">' +
        '<div style="font-size:3rem; margin-bottom:1rem;">📍</div>' +
        '<h3>Select a City</h3>' +
        '<p style="color:var(--text-muted);">Click any marker on the map to view detailed information about that city.</p>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
}

function viewInsights() {
    return '<div class="view-section active">' +
        '<div class="section-label">Travel Insights</div>' +
        '<h2>Smart Travel Data</h2>' +
        '<p>Discover trends and top picks generated completely offline.</p>' +

        '<div class="insights-grid">' +
        '<div class="insight-card glass-panel">' +
        '<div class="insight-icon">💸</div>' +
        '<div>' +
        '<h3>Budget-Friendly Routes</h3>' +
        '<p style="color:var(--text-muted); font-size:0.9rem;">Bus and Train options remain the most economical across all states, averaging ₹1.2/km.</p>' +
        '</div>' +
        '</div>' +
        '<div class="insight-card glass-panel">' +
        '<div class="insight-icon">⏱️</div>' +
        '<div>' +
        '<h3>Fastest Corridors</h3>' +
        '<p style="color:var(--text-muted); font-size:0.9rem;">Flights between Delhi and Mumbai offer the highest time-savings ratio in our database.</p>' +
        '</div>' +
        '</div>' +
        '<div class="insight-card glass-panel">' +
        '<div class="insight-icon">🍛</div>' +
        '<div>' +
        '<h3>Culinary Capitals</h3>' +
        '<p style="color:var(--text-muted); font-size:0.9rem;">Hyderabad, Lucknow, and Kolkata rank highest for local food variety.</p>' +
        '</div>' +
        '</div>' +
        '<div class="insight-card glass-panel">' +
        '<div class="insight-icon">⭐</div>' +
        '<div>' +
        '<h3>Highest Rated</h3>' +
        '<p style="color:var(--text-muted); font-size:0.9rem;">Goa holds a 9.8 Travel Score for its mix of comfort, attractions, and relaxation.</p>' +
        '</div>' +
        '</div>' +
        '</div>' +

        '<h3 style="margin-top:3rem; margin-bottom:1rem;">Your Favourites</h3>' +
        '<div id="favList"></div>' +
        '</div>';
}

function viewContact() {
    return '<div class="view-section active">' +
        '<div class="section-label">Contact</div>' +
        '<h2>Get in Touch</h2>' +
        '<div class="contact-grid">' +
        '<div class="contact-info glass-panel" style="padding:2rem;">' +
        '<h3 style="margin-bottom:1.5rem;">We\'re here to help</h3>' +
        '<div style="margin-bottom:1.5rem; display:flex; gap:1rem; align-items:flex-start;"><div style="font-size:1.5rem; flex-shrink:0;">📧</div><div><strong>Email</strong><br><span style="color:var(--text-muted);font-size:0.9rem;">hello@yatraguide.in</span></div></div>' +
        '<div style="margin-bottom:1.5rem; display:flex; gap:1rem; align-items:flex-start;"><div style="font-size:1.5rem; flex-shrink:0;">📍</div><div><strong>Location</strong><br><span style="color:var(--text-muted);font-size:0.9rem;">India</span></div></div>' +
        '<div style="display:flex; gap:1rem; align-items:flex-start;"><div style="font-size:1.5rem; flex-shrink:0;">🕐</div><div><strong>Hours</strong><br><span style="color:var(--text-muted);font-size:0.9rem;">Mon-Sat, 9am-6pm IST</span></div></div>' +
        '</div>' +
        '<div class="contact-form glass-panel" style="padding:2rem;">' +
        '<div class="form-group"><label>Full Name</label><input type="text" id="c-name" placeholder="Your full name"></div>' +
        '<div class="form-group"><label>Email Address</label><input type="email" id="c-email" placeholder="you@email.com"></div>' +
        '<div class="form-group"><label>Message</label><textarea id="c-msg" placeholder="How can we help?"></textarea></div>' +
        '<button class="btn" style="width:100%;" id="contactSend">Send Message</button>' +
        '</div>' +
        '</div>' +
        '</div>';
}

// ── Auth View ───────────────────────────────────────
function viewAuth(mode) {
    var isLogin = mode !== 'signup';
    return '<div class="view-section active">' +
        '<div class="premium-auth-wrapper">' +
            '<div class="premium-auth-left">' +
                '<div class="premium-auth-left-bg"></div>' +
                '<div class="auth-branding">' +
                    '<div class="logo auth-stagger-1" style="display:flex; align-items:center; gap:0.5rem; margin-bottom: 2rem;">' +
                        '<svg viewBox="0 0 40 40" width="32" height="32">' +
                            '<defs>' +
                                '<linearGradient id="premiumGrad" x1="0%" y1="0%" x2="100%" y2="100%">' +
                                    '<stop offset="0%" stop-color="#fff" />' +
                                    '<stop offset="100%" stop-color="rgba(255,255,255,0.7)" />' +
                                '</linearGradient>' +
                            '</defs>' +
                            '<path d="M20 2C12.268 2 6 8.268 6 16C6 26.5 20 38 20 38C20 38 34 26.5 34 16C34 8.268 27.732 2 20 2ZM20 22C16.686 22 14 19.314 14 16C14 12.686 16.686 10 20 10C23.314 10 26 12.686 26 16C26 19.314 23.314 22 20 22Z" fill="url(#premiumGrad)"/>' +
                            '<circle cx="20" cy="16" r="4" fill="#fff"/>' +
                        '</svg>' +
                        '<span style="font-size: 1.25rem; font-weight: 700; color: #fff; letter-spacing:-0.5px;">Yatra Guide</span>' +
                    '</div>' +
                    '<h1 class="auth-stagger-2" style="color:#fff; margin-top: auto; font-size: 2.5rem; line-height: 1.2; font-weight:800; letter-spacing:-1px;">Your Journey<br>Starts Here.</h1>' +
                    '<p class="auth-stagger-3" style="color: rgba(255,255,255,0.8); margin-top: 1rem; line-height:1.6;">Plan routes, estimate costs, and get AI insights for your next adventure across India.</p>' +
                '</div>' +
                '<div class="auth-decoration auth-dec-1 auth-stagger-4">📍 15+ Cities</div>' +
                '<div class="auth-decoration auth-dec-2 auth-stagger-5">🧠 AI Insights</div>' +
            '</div>' +
            '<div class="premium-auth-right glass-panel">' +
                '<div class="auth-tabs" style="display:flex; border-bottom:1px solid var(--glass-border);">' +
                    '<button class="auth-tab ' + (isLogin ? 'active' : '') + '" onclick="navigate(\'login\')">Log In</button>' +
                    '<button class="auth-tab ' + (!isLogin ? 'active' : '') + '" onclick="navigate(\'signup\')">Sign Up</button>' +
                '</div>' +
                '<div class="auth-forms-wrapper" style="padding:3rem;">' +
                    '<div id="authErrorMsg" style="color: #ef4444; font-size: 0.88rem; margin-bottom: 1.5rem; text-align: center; display: none; font-weight: 500; padding: 0.75rem; background: rgba(239, 68, 68, 0.08); border-radius: 8px; border: 1px solid rgba(239, 68, 68, 0.2);"></div>' +
                    (isLogin ? 
                    '<div class="auth-form-panel active" id="panel-login">' +
                        '<div class="auth-header auth-stagger-1" style="margin-bottom:2rem;">' +
                            '<h2 style="font-size:1.8rem; margin-bottom:0.5rem;">Welcome Back</h2>' +
                            '<p style="color:var(--text-muted);">Enter your details to access your saved trips.</p>' +
                        '</div>' +
                        '<div class="premium-input-group auth-stagger-2">' +
                            '<input type="email" id="loginEmail" placeholder=" " required>' +
                            '<label>Email Address</label>' +
                        '</div>' +
                        '<div class="premium-input-group auth-stagger-3">' +
                            '<input type="password" id="loginPassword" placeholder=" " required>' +
                            '<label>Password</label>' +
                        '</div>' +
                        '<div class="auth-stagger-4" style="display:flex; justify-content: space-between; align-items:center; margin-bottom: 2rem; font-size: 0.85rem;">' +
                            '<label style="display:flex; align-items:center; gap:0.5rem; cursor:pointer; color:var(--text-muted);"><input type="checkbox" checked style="accent-color:var(--primary);"> Remember me</label>' +
                            '<a href="#" style="color: var(--primary); font-weight:600; text-decoration:none;">Forgot password?</a>' +
                        '</div>' +
                        '<button class="btn btn-lg premium-btn auth-stagger-5" id="loginBtn" style="width:100%; box-shadow:0 8px 20px rgba(79, 70, 229, 0.3);">Log In</button>' +
                        '<div class="auth-divider auth-stagger-6"><span>or continue with</span></div>' +
                        '<div class="social-login auth-stagger-7">' +
                            '<button class="btn-social" onclick="alert(\'Social login coming soon!\')">🌐 Google</button>' +
                            '<button class="btn-social" onclick="alert(\'Social login coming soon!\')">🍎 Apple</button>' +
                        '</div>' +
                    '</div>' :
                    '<div class="auth-form-panel active" id="panel-signup">' +
                        '<div class="auth-header auth-stagger-1" style="margin-bottom:2rem;">' +
                            '<h2 style="font-size:1.8rem; margin-bottom:0.5rem;">Create Account</h2>' +
                            '<p style="color:var(--text-muted);">Start planning your trips instantly.</p>' +
                        '</div>' +
                        '<div class="premium-input-group auth-stagger-2">' +
                            '<input type="text" id="signupName" placeholder=" " required>' +
                            '<label>Full Name</label>' +
                        '</div>' +
                        '<div class="premium-input-group auth-stagger-3">' +
                            '<input type="email" id="signupEmail" placeholder=" " required>' +
                            '<label>Email Address</label>' +
                        '</div>' +
                        '<div class="premium-input-group auth-stagger-4">' +
                            '<input type="password" id="signupPassword" placeholder=" " required>' +
                            '<label>Password (Min 4 chars)</label>' +
                        '</div>' +
                        '<div class="pw-strength auth-stagger-4"><div class="pw-strength-bar" id="pwStrengthBar"></div></div>' +
                        '<p id="pwStrengthLabel" class="auth-stagger-4" style="font-size:0.78rem; color:var(--text-muted); margin-top:0.3rem; margin-bottom:1.2rem; height:1em;"></p>' +
                        '<button class="btn btn-lg premium-btn auth-stagger-5" id="signupBtn" style="width:100%; margin-top: 1rem; box-shadow:0 8px 20px rgba(79, 70, 229, 0.3);">Create Account</button>' +
                        '<p class="auth-stagger-6" style="text-align:center; font-size:0.85rem; color:var(--text-muted); margin-top: 1.5rem;">By signing up, you agree to our Terms of Service.</p>' +
                    '</div>' ) +
                '</div>' +
            '</div>' +
        '</div>' +
        '</div>';
}

// ── Profile View ─────────────────────────────────────
function viewProfile() {
    var user = getUser();
    if (!user) return viewAuth('login');

    var favs = getFavs();
    var history = getHistory();

    // Saved Routes
    var favHTML = '';
    if (favs.length === 0) {
        favHTML = '<p style="color:var(--text-muted);">No saved routes yet. Start exploring!</p>';
    } else {
        for (var i = 0; i < favs.length; i++) {
            var r = favs[i];
            favHTML += '<div class="fav-item" style="display:flex; justify-content:space-between; align-items:center; padding:1rem 1.5rem; margin-bottom:1rem; background:var(--bg-2); border-radius:var(--radius-sm);">' +
                '<div style="display:flex; align-items:center; gap:0.75rem;">' +
                '<div style="width: 28px; height: 28px; border-radius: 6px; background: linear-gradient(135deg, var(--primary), var(--secondary)); display: flex; align-items: center; justify-content: center; flex-shrink:0;">' +
                '<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                '<rect x="3" y="8" width="18" height="12" rx="2" />' +
                '<path d="M8 8V5a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v3" />' +
                '<path d="M12 11l1 2h2l-1.5 1.2L14 16l-2-1.3-2 1.3.5-1.8-1.5-1.2h2z" fill="#fff" />' +
                '</svg>' +
                '</div>' +
                '<span style="font-weight:600;">' + r.fromName + ' → ' + r.toName + '</span>' +
                '</div>' +
                '<button class="btn btn-outline" style="padding:0.4rem 1rem;" onclick="navigate(\'planner\',{src:\'' + r.fromId + '\',dst:\'' + r.toId + '\',calc:true})">Load Route</button>' +
                '</div>';
        }
    }

    // Search History
    var histHTML = '';
    if (history.length === 0) {
        histHTML = '<p style="color:var(--text-muted);">No recent searches.</p>';
    } else {
        for (var j = 0; j < history.length; j++) {
            var h = history[j];
            histHTML += '<div class="fav-item">' +
                '<div><span style="font-weight:600;">' + h.fromName + ' → ' + h.toName + '</span><br><span style="font-size:0.8rem;color:var(--text-muted);">' + h.time + '</span></div>' +
                '</div>';
        }
    }

    return '<div class="view-section active">' +
        '<div class="section-label">Profile</div>' +
        '<h2>Your Profile</h2>' +
        '<div class="profile-grid">' +
        '<div class="glass-panel profile-card">' +
        '<div class="profile-avatar">' + user.name.charAt(0).toUpperCase() + '</div>' +
        '<h3>' + user.name + '</h3>' +
        '<p style="color:var(--text-muted);margin-bottom:1.5rem;">' + user.email + '</p>' +
        '<div class="profile-stats">' +
        '<div><strong>' + favs.length + '</strong><br><span style="color:var(--text-muted);font-size:0.85rem;">Saved</span></div>' +
        '<div><strong>' + history.length + '</strong><br><span style="color:var(--text-muted);font-size:0.85rem;">Searches</span></div>' +
        '<div><strong>' + citiesData.length + '</strong><br><span style="color:var(--text-muted);font-size:0.85rem;">Cities</span></div>' +
        '</div>' +
        '<button class="btn btn-outline" style="width:100%;margin-top:1.5rem;" onclick="logout()">Log Out</button>' +
        '</div>' +
        '<div>' +
        '<div class="glass-panel" style="padding:2rem;margin-bottom:2rem;">' +
        '<h3 style="margin-bottom:1rem;">⭐ Saved Routes</h3>' +
        favHTML +
        '</div>' +
        '<div class="glass-panel" style="padding:2rem;">' +
        '<h3 style="margin-bottom:1rem;">🕐 Recent Searches</h3>' +
        histHTML +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';
}


// ══════════════════════════════════════════════════════
// ── ABOUT VIEW ───────────────────────────────────────
// ══════════════════════════════════════════════════════
function viewAbout() {
    return '<div class="ab-page">' +

        '<!-- Hero Banner -->' +
        '<div class="ab-hero">' +
        '<div class="ab-hero-bg-orbs">' +
        '<div class="ab-orb ab-orb-1"></div>' +
        '<div class="ab-orb ab-orb-2"></div>' +
        '<div class="ab-orb ab-orb-3"></div>' +
        '</div>' +
        '<div class="ab-hero-content scroll-reveal">' +
        '<span class="ab-badge">✦ About Yatra Guide</span>' +
        '<h1 class="ab-hero-title">Built for <span class="ab-gradient-text">Every</span><br>Indian Traveller</h1>' +
        '<p class="ab-hero-sub">An offline-first travel companion that works even without the internet — giving every traveller in India the tools they deserve.</p>' +
        '<div class="ab-hero-stats">' +
        '<div class="ab-stat-pill"><strong>15+</strong> Cities</div>' +
        '<div class="ab-stat-pill"><strong>5</strong> Transport Modes</div>' +
        '<div class="ab-stat-pill"><strong>100%</strong> Offline</div>' +
        '<div class="ab-stat-pill"><strong>Zero</strong> Tracking</div>' +
        '</div>' +
        '</div>' +
        '</div>' +

        '<!-- Mission -->' +
        '<section class="ab-section scroll-reveal">' +
        '<div class="ab-section-inner ab-mission">' +
        '<div class="ab-mission-text">' +
        '<span class="ab-section-tag">🎯 Our Mission</span>' +
        '<h2>Travel without boundaries,<br><em>plan without limits</em></h2>' +
        '<p>Yatra Guide was born from a simple belief — powerful travel planning should never depend on a Wi-Fi signal. Using the <strong>Haversine formula</strong> and calibrated local cost models, we compute exact distances and multi-modal transport costs right inside your browser.</p>' +
        '<p>From the snow-capped peaks of Manali to the sun-drenched shores of Goa, we want every journey to start with confidence.</p>' +
        '</div>' +
        '<div class="ab-mission-visual">' +
        '<div class="ab-map-globe">' +
        '<svg viewBox="0 0 200 200" fill="none" xmlns="http://www.w3.org/2000/svg" class="ab-globe-svg">' +
        '<circle cx="100" cy="100" r="90" stroke="url(#g1)" stroke-width="2" stroke-dasharray="6 4" opacity="0.6"/>' +
        '<circle cx="100" cy="100" r="70" stroke="url(#g1)" stroke-width="1.5" stroke-dasharray="4 6" opacity="0.4"/>' +
        '<circle cx="100" cy="100" r="50" fill="url(#g2)" opacity="0.15"/>' +
        '<path d="M100 20 L111 55 L148 55 L118 76 L129 111 L100 90 L71 111 L82 76 L52 55 L89 55 Z" fill="url(#g1)" opacity="0.9"/>' +
        '<circle cx="100" cy="100" r="8" fill="#fff" opacity="0.9"/>' +
        '<defs>' +
        '<linearGradient id="g1" x1="0" y1="0" x2="200" y2="200" gradientUnits="userSpaceOnUse">' +
        '<stop stop-color="#8B2613"/><stop offset="0.5" stop-color="#F97316"/><stop offset="1" stop-color="#F59E0B"/>' +
        '</linearGradient>' +
        '<radialGradient id="g2" cx="50%" cy="50%" r="50%">' +
        '<stop stop-color="#F97316"/><stop offset="1" stop-color="#8B2613" stop-opacity="0"/>' +
        '</radialGradient>' +
        '</defs>' +
        '</svg>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</section>' +

        '<!-- Feature Cards -->' +
        '<section class="ab-section scroll-reveal">' +
        '<div class="ab-section-header">' +
        '<span class="ab-section-tag">✨ What We Offer</span>' +
        '<h2>Everything you need, nothing you don\'t</h2>' +
        '</div>' +
        '<div class="ab-features">' +
        '<div class="ab-feat-card ab-feat-1"><div class="ab-feat-icon">🗺️</div><h3>Offline Route Planner</h3><p>Accurate Haversine-based distances between 15+ major cities — no internet needed, ever.</p><div class="ab-feat-bar"></div></div>' +
        '<div class="ab-feat-card ab-feat-2"><div class="ab-feat-icon">💰</div><h3>Cost Estimator</h3><p>Compare Bike, Car, Bus, Train & Flight costs simultaneously with calibrated Indian averages.</p><div class="ab-feat-bar"></div></div>' +
        '<div class="ab-feat-card ab-feat-3"><div class="ab-feat-icon">🧠</div><h3>AI Travel Assistant</h3><p>Ask anything about India travel — our Gemini-powered AI gives instant expert answers.</p><div class="ab-feat-bar"></div></div>' +
        '<div class="ab-feat-card ab-feat-4"><div class="ab-feat-icon">🚨</div><h3>Emergency Directory</h3><p>Instant access to hospitals, police stations & helplines for every city — always ready.</p><div class="ab-feat-bar"></div></div>' +
        '<div class="ab-feat-card ab-feat-5"><div class="ab-feat-icon">🌦️</div><h3>Weather Intelligence</h3><p>Seasonal travel scores and monsoon/winter predictions computed locally in your browser.</p><div class="ab-feat-bar"></div></div>' +
        '<div class="ab-feat-card ab-feat-6"><div class="ab-feat-icon">🔒</div><h3>Privacy First</h3><p>All your routes, history and saved trips stay in your browser. Zero telemetry, zero ads.</p><div class="ab-feat-bar"></div></div>' +
        '</div>' +
        '</section>' +

        '<!-- How It Works Timeline -->' +
        '<section class="ab-section scroll-reveal">' +
        '<div class="ab-section-header">' +
        '<span class="ab-section-tag">⚙️ How It Works</span>' +
        '<h2>Smart tech, simple experience</h2>' +
        '</div>' +
        '<div class="ab-timeline">' +
        '<div class="ab-tl-item"><div class="ab-tl-dot">1</div><div class="ab-tl-content"><h4>Pick Your Cities</h4><p>Select any two of 15+ Indian cities from our route planner dashboard.</p></div></div>' +
        '<div class="ab-tl-item"><div class="ab-tl-dot">2</div><div class="ab-tl-content"><h4>Haversine Calculation</h4><p>We compute the great-circle distance using the Haversine formula — accurate to within 1%.</p></div></div>' +
        '<div class="ab-tl-item"><div class="ab-tl-dot">3</div><div class="ab-tl-content"><h4>Multi-Mode Cost Breakdown</h4><p>Each transport mode applies its own cost-per-km and speed factor.</p></div></div>' +
        '<div class="ab-tl-item"><div class="ab-tl-dot">4</div><div class="ab-tl-content"><h4>AI Score & Recommendation</h4><p>A composite travel score factors in weather, price trends, and travel time — all offline.</p></div></div>' +
        '</div>' +
        '</section>' +

        '<!-- Footer CTA -->' +
        '<section class="ab-footer-cta scroll-reveal">' +
        '<div class="ab-cta-inner">' +
        '<div class="ab-cta-orb"></div>' +
        '<span class="ab-section-tag">🇮🇳 Made for India</span>' +
        '<h2>Built with <span class="ab-heart">❤️</span> for every traveller</h2>' +
        '<p>No external APIs. No tracking. Everything runs in your browser.<br>Open source, forever free.</p>' +
        '<div class="ab-cta-btns">' +
        '<button class="ab-cta-btn-primary" onclick="navigate(\'explorer\')">Explore Cities</button>' +
        '<button class="ab-cta-btn-ghost" onclick="navigate(\'planner\')">Plan a Trip</button>' +
        '</div>' +
        '<p class="ab-copy">© 2026 Yatra Guide</p>' +
        '</div>' +
        '</section>' +

        '</div>';
}

// ══════════════════════════════════════════════════════

// ── FEEDBACK VIEW ────────────────────────────────────
// ══════════════════════════════════════════════════════
var FB_KEY = 'yg_feedback';
function getFeedbackList() { return JSON.parse(localStorage.getItem(FB_KEY) || '[]'); }
function saveFeedbackEntry(entry) { var l = getFeedbackList(); l.unshift(entry); localStorage.setItem(FB_KEY, JSON.stringify(l)); }
function starsHTML(count) { var s = ''; for (var i = 1; i <= 5; i++) s += '<span style="color:#f59e0b;">' + (i <= count ? '★' : '☆') + '</span>'; return s; }
function getInitials(n) { return n.split(' ').map(function(w){return w[0];}).join('').toUpperCase().slice(0,2); }
function timeAgo(d) {
    var diff = Date.now() - new Date(d).getTime(), m = Math.floor(diff/60000);
    if (m < 1) return 'Just now'; if (m < 60) return m + 'm ago';
    var h = Math.floor(m/60); if (h < 24) return h + 'h ago'; return Math.floor(h/24) + 'd ago';
}
var AVATAR_COLORS = ['linear-gradient(135deg,#6366f1,#8b5cf6)','linear-gradient(135deg,#ec4899,#f43f5e)','linear-gradient(135deg,#14b8a6,#06b6d4)','linear-gradient(135deg,#f59e0b,#ef4444)','linear-gradient(135deg,#22c55e,#10b981)','linear-gradient(135deg,#3b82f6,#6366f1)'];

function viewFeedback() {
    var feedbacks = getFeedbackList();
    var avgRating = feedbacks.length > 0 ? (feedbacks.reduce(function(s,f){return s+f.rating;},0) / feedbacks.length).toFixed(1) : '—';
    var cards = '';
    for (var i = 0; i < feedbacks.length; i++) {
        var f = feedbacks[i], color = AVATAR_COLORS[i % AVATAR_COLORS.length];
        cards += '<div class="fb-review-card">' +
            '<div class="fb-avatar" style="background:' + color + ';">' + getInitials(f.name) + '</div>' +
            '<div class="fb-review-body">' +
            '<div class="fb-review-top"><span class="fb-review-name">' + f.name + '</span><span class="fb-review-time">' + timeAgo(f.date) + '</span></div>' +
            '<div class="fb-review-stars">' + starsHTML(f.rating) + '</div>' +
            '<p class="fb-review-text">' + f.comment + '</p>' +
            '</div></div>';
    }
    return '<div class="view-section active fb-wrap" style="padding-bottom:6rem;">' +

        '<!-- Page Header -->' +
        '<div class="pg-header">' +
        '<div class="pg-icon pg-icon-fb">💬</div>' +
        '<div class="pg-header-text">' +
        '<span class="pg-badge pg-badge-fb">Community</span>' +
        '<h2 class="pg-title">Traveller Feedback</h2>' +
        '<p class="pg-subtitle">Share your Yatra Guide experience and help fellow travellers discover India.</p>' +
        '</div>' +
        '</div>' +

        '<!-- Stats Row -->' +
        '<div class="fb-stats-row">' +
        '<div class="fb-stat-card"><div class="fb-stat-num fb-stat-num-amber">' + avgRating + '</div><div class="fb-stat-lbl">⭐ Average Rating</div></div>' +
        '<div class="fb-stat-card"><div class="fb-stat-num">' + feedbacks.length + '</div><div class="fb-stat-lbl">💬 Total Reviews</div></div>' +
        '<div class="fb-stat-card"><div class="fb-stat-num" style="background:linear-gradient(135deg,#6D28D9,#7C3AED);-webkit-background-clip:text;background-clip:text;-webkit-text-fill-color:transparent;">100%</div><div class="fb-stat-lbl">🔒 Anonymous & Safe</div></div>' +
        '</div>' +

        '<!-- Content Grid -->' +
        '<div class="fb-grid">' +

        '<!-- Form Panel -->' +
        '<div class="fb-form-panel">' +
        '<h3 class="fb-panel-title">✍️ Leave a Review</h3>' +
        '<form id="feedbackForm">' +
        '<div class="form-group"><label for="fbName">Your Name</label><input type="text" id="fbName" placeholder="e.g., Aarav Patel" required></div>' +
        '<div class="form-group"><label>Your Rating</label>' +
        '<input type="hidden" id="fbRating" value="5">' +
        '<div id="starPicker" style="font-size:2rem;display:flex;gap:0.25rem;cursor:pointer;margin-top:0.4rem;">' +
        '<span class="fb-star" data-value="1" style="color:#f59e0b;">★</span>' +
        '<span class="fb-star" data-value="2" style="color:#f59e0b;">★</span>' +
        '<span class="fb-star" data-value="3" style="color:#f59e0b;">★</span>' +
        '<span class="fb-star" data-value="4" style="color:#f59e0b;">★</span>' +
        '<span class="fb-star" data-value="5" style="color:#f59e0b;">★</span>' +
        '</div></div>' +
        '<div class="form-group"><label for="fbComments">Your Experience</label><textarea id="fbComments" rows="4" placeholder="What did you love about your trip?" required></textarea></div>' +
        '<button type="submit" class="fb-submit-btn">Submit Review →</button>' +
        '</form>' +
        '<div id="fbSuccess" class="fb-success-box">' +
        '<div style="font-size:2.5rem;margin-bottom:0.75rem;">🎉</div>' +
        '<strong>Thank you for your review!</strong>' +
        '<p style="color:var(--text-muted);margin-top:0.25rem;font-size:0.9rem;">Your experience has been posted below.</p>' +
        '</div>' +
        '</div>' +

        '<!-- Reviews Panel -->' +
        '<div class="fb-reviews-panel">' +
        '<h3 class="fb-panel-title">💬 All Reviews</h3>' +
        '<div id="feedbackListContainer" style="display:flex;flex-direction:column;gap:0;">' +
        (cards || '<div style="text-align:center;padding:3rem 1rem;color:var(--text-muted);"><div style="font-size:2.5rem;margin-bottom:1rem;">🌟</div><p>No reviews yet. Be the first to share!</p></div>') +
        '</div>' +
        '</div>' +

        '</div></div>';
}

function setupFeedback() {
    var starPicker = document.getElementById('starPicker');
    var ratingInput = document.getElementById('fbRating');
    var currentRating = 5;
    if (starPicker) {
        var stars = starPicker.querySelectorAll('.fb-star');
        stars.forEach(function(star) {
            star.addEventListener('mouseenter', function() {
                var val = parseInt(star.dataset.value);
                stars.forEach(function(s) { var sv = parseInt(s.dataset.value); s.textContent = sv <= val ? '★' : '☆'; s.style.color = sv <= val ? '#f59e0b' : 'var(--text-muted)'; s.style.transform = sv <= val ? 'scale(1.2)' : 'scale(1)'; });
            });
            star.addEventListener('click', function() {
                currentRating = parseInt(star.dataset.value);
                ratingInput.value = currentRating;
                stars.forEach(function(s) { var sv = parseInt(s.dataset.value); s.textContent = sv <= currentRating ? '★' : '☆'; s.style.color = sv <= currentRating ? '#f59e0b' : 'var(--text-muted)'; });
            });
        });
        starPicker.addEventListener('mouseleave', function() {
            stars.forEach(function(s) { var sv = parseInt(s.dataset.value); s.textContent = sv <= currentRating ? '★' : '☆'; s.style.transform = 'scale(1)'; s.style.color = sv <= currentRating ? '#f59e0b' : 'var(--text-muted)'; });
        });
    }
    var form = document.getElementById('feedbackForm');
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            var name = document.getElementById('fbName').value.trim();
            var comment = document.getElementById('fbComments').value.trim();
            var rating = parseInt(ratingInput.value);
            if (!name || !comment) return;
            saveFeedbackEntry({ name: name, comment: comment, rating: rating, date: new Date().toISOString() });
            form.style.display = 'none';
            document.getElementById('fbSuccess').style.display = 'block';
            var cont = document.getElementById('feedbackListContainer');
            var color = AVATAR_COLORS[Math.floor(Math.random() * AVATAR_COLORS.length)];
            var card = document.createElement('div');
            card.className = 'fb-review-card';
            card.style.cssText = 'animation:fadeIn 0.4s ease-out forwards;';
            card.innerHTML = '<div class="fb-avatar" style="background:' + color + ';">' + getInitials(name) + '</div>' +
                '<div class="fb-review-body">' +
                '<div class="fb-review-top"><span class="fb-review-name">' + name + '</span><span class="fb-review-time">Just now</span></div>' +
                '<div class="fb-review-stars">' + starsHTML(rating) + '</div>' +
                '<p class="fb-review-text">' + comment + '</p>' +
                '</div>';
            cont.insertBefore(card, cont.firstChild);
        });
    }
}

// ══════════════════════════════════════════════════════
// ── SAVED TRIPS VIEW ─────────────────────────────────
// ══════════════════════════════════════════════════════
function viewSavedTrips() {
    var favs = getFavs();
    var cards = '';
    if (favs.length === 0) {
        cards = '<div class="glass-panel" style="padding:2rem;grid-column:1/-1;text-align:center;"><p style="color:var(--text-muted);">No saved trips yet. Go to the Dashboard to plan and save a route!</p></div>';
    } else {
        for (var i = 0; i < favs.length; i++) {
            var f = favs[i];
            cards += '<div class="glass-panel" style="padding:1.5rem; display:flex; flex-direction:column; justify-content:space-between; min-height:220px; gap:0.5rem;">' +
                '<div>' +
                '<div style="display:flex; align-items:center; gap:0.75rem; margin-bottom:0.5rem;">' +
                '<div style="width: 32px; height: 32px; border-radius: 8px; background: linear-gradient(135deg, var(--primary), var(--secondary)); display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 10px rgba(37,99,235,0.15); flex-shrink:0;">' +
                '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
                '<rect x="3" y="8" width="18" height="12" rx="2" />' +
                '<path d="M8 8V5a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v3" />' +
                '<path d="M12 11l1 2h2l-1.5 1.2L14 16l-2-1.3-2 1.3.5-1.8-1.5-1.2h2z" fill="#fff" />' +
                '</svg>' +
                '</div>' +
                '<h3 style="color:var(--primary); margin:0; font-size:1.15rem;">' + f.fromName + ' ➔ ' + f.toName + '</h3>' +
                '</div>' +
                (f.distance ? 
                '<div style="font-size:0.9rem; display:flex; gap:0.75rem; color:var(--text-main); flex-wrap:wrap; margin-bottom:0.5rem;">' +
                '<span><strong style="color:var(--secondary);">Distance:</strong> ' + f.distance + ' km</span>' +
                '<span><strong style="color:var(--secondary);">Mode:</strong> ' + f.vehicle + '</span>' +
                '<span><strong style="color:var(--secondary);">Time:</strong> ' + f.duration + '</span>' +
                '</div>' : '') +
                '</div>' +
                '<div>' +
                '<button class="btn btn-outline btn-remove-fav" data-from="' + f.fromId + '" data-to="' + f.toId + '" style="width:100%;margin-top:0.5rem;">Remove</button>' +
                '<button class="btn" style="width:100%;margin-top:0.5rem;" onclick="navigate(\'planner\',{src:\'' + f.fromId + '\',dst:\'' + f.toId + '\',calc:true})">Load Route</button>' +
                '</div>' +
                '</div>';
        }
    }
    return '<div class="view-section active" style="padding-bottom:6rem;">' +
        '<div style="display:flex; align-items:center; gap: 1rem; margin-bottom: 2rem; flex-wrap: wrap;">' +
        '<div style="width: 50px; height: 50px; border-radius: 14px; background: linear-gradient(135deg, var(--primary), var(--secondary)); display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 25px rgba(37,99,235,0.25); flex-shrink:0;">' +
        '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">' +
        '<rect x="3" y="8" width="18" height="12" rx="2" />' +
        '<path d="M8 8V5a3 3 0 0 1 3-3h2a3 3 0 0 1 3 3v3" />' +
        '<path d="M12 11l1 2h2l-1.5 1.2L14 16l-2-1.3-2 1.3.5-1.8-1.5-1.2h2z" fill="#fff" />' +
        '</svg>' +
        '</div>' +
        '<div>' +
        '<h2 style="margin: 0; font-size: 2rem;">Your Saved Trips</h2>' +
        '<p style="color:var(--text-muted); margin: 0;">Manage your favorite routes here.</p>' +
        '</div>' +
        '</div>' +
        '<div class="city-grid" id="savedTripsContainer">' + cards + '</div></div>';
}

function setupSavedTrips() {
    document.querySelectorAll('.btn-remove-fav').forEach(function(btn) {
        btn.addEventListener('click', function() {
            var fromId = this.dataset.from, toId = this.dataset.to;
            var favs = getFavs().filter(function(f) { return !(f.fromId === fromId && f.toId === toId); });
            localStorage.setItem(FAV_KEY, JSON.stringify(favs));
            navigate('saved');
        });
    });
}

// ══════════════════════════════════════════════════════
// ── EMERGENCY DIRECTORY VIEW ─────────────────────────
// ══════════════════════════════════════════════════════
function viewEmergency() {
    var opts = cityOptions(citiesData);
    return '<div class="view-section active em-wrap" style="padding-bottom:6rem; animation: fadeIn 0.4s ease-out;">' +

        '<!-- Page Header -->' +
        '<div class="pg-header">' +
        '<div class="pg-icon pg-icon-em">🚨</div>' +
        '<div class="pg-header-text">' +
        '<span class="pg-badge pg-badge-em">Emergency</span>' +
        '<h2 class="pg-title">Emergency Directory</h2>' +
        '<p class="pg-subtitle">Instant access to local emergency services and helplines — available 24/7, fully offline.</p>' +
        '</div>' +
        '</div>' +

        '<!-- Alert Banner -->' +
        '<div class="em-alert-banner">' +
        '<span>⚠️</span>' +
        '<p><strong>For life-threatening emergencies</strong>, call <strong>112</strong> (National Emergency) immediately. This directory provides city-specific contacts.</p>' +
        '</div>' +

        '<!-- City Selector -->' +
        '<div class="em-city-panel">' +
        '<div>' +
        '<label for="emCitySelect">📍 Select City / State</label>' +
        '<select id="emCitySelect" style="min-width:280px;"><option value="">Choose a city...</option>' + opts + '</select>' +
        '</div>' +
        '<div style="margin-left:auto;text-align:right;">' +
        '<div style="font-size:0.78rem;color:var(--text-muted);font-weight:500;text-transform:uppercase;letter-spacing:1px;">Quick Dial</div>' +
        '<div style="font-size:1.8rem;font-weight:900;font-family:Outfit,sans-serif;color:#DC2626;line-height:1;">112</div>' +
        '<div style="font-size:0.75rem;color:var(--text-muted);">National Emergency</div>' +
        '</div>' +
        '</div>' +

        '<div id="emDetails">' +
        '<div class="em-empty-state">' +
        '<div class="em-empty-icon">🏙️</div>' +
        '<h3>No City Selected</h3>' +
        '<p>Please select a city to retrieve localized emergency helpline numbers and stations.</p>' +
        '</div>' +
        '</div>' +

        '<!-- Simulated Call Overlay -->' +
        '<div id="simCallOverlay" style="display:none; position:fixed; inset:0; background:rgba(15,23,42,0.92); z-index:99999; align-items:center; justify-content:center; animation:fadeIn 0.3s ease-out;">' +
        '<div style="background:var(--card-bg); padding:3rem; border-radius:28px; text-align:center; max-width:360px; width:90%; border:1px solid rgba(220,38,38,0.3); box-shadow:0 30px 60px rgba(0,0,0,0.6);">' +
        '<div style="width:90px; height:90px; border-radius:50%; background:rgba(220,38,38,0.1); border:2px solid #DC2626; display:flex; align-items:center; justify-content:center; margin:0 auto 2rem; animation:pulse 1.5s infinite;">' +
        '<svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#DC2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
        '<path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>' +
        '</svg>' +
        '</div>' +
        '<h3 style="color:var(--text-main); font-size:1.5rem; margin-bottom:0.5rem; font-family:Outfit,Poppins,sans-serif;">Emergency Call</h3>' +
        '<div id="simCallNumber" style="font-size:2.5rem; font-weight:900; color:#DC2626; margin-bottom:0.5rem; font-family:Outfit,Poppins,sans-serif;">112</div>' +
        '<p style="color:var(--text-muted); font-size:0.9rem; margin-bottom:2rem;">Dialing local service responder...</p>' +
        '<button class="btn" onclick="hangUpCall()" style="background:linear-gradient(135deg,#DC2626,#EF4444); border:none; width:100%; font-size:1rem; padding:1rem; border-radius:14px; box-shadow:0 8px 20px rgba(220,38,38,0.4); color:#fff; font-family:Outfit,sans-serif; font-weight:700;">📵 End Call</button>' +
        '</div>' +
        '</div>' +

        '</div>';
}


function setupEmergency() {
    var select = document.getElementById('emCitySelect');
    if (!select) return;

    select.addEventListener('change', function() {
        var cityId = this.value;
        var detailsContainer = document.getElementById('emDetails');
        if (!cityId) {
            detailsContainer.innerHTML =
                '<div class="em-empty-state">' +
                '<div class="em-empty-icon">🏙️</div>' +
                '<h3>No City Selected</h3>' +
                '<p>Please select a city to retrieve localized emergency helpline numbers and stations.</p>' +
                '</div>';
            return;
        }

        var city = citiesData.find(function(c) { return c.id === cityId; });
        var em = city.emergency;

        var hospitalsList = '';
        for (var h = 0; h < em.hospitals.length; h++) {
            hospitalsList += '<li class="em-list-item">🏥 ' + em.hospitals[h] + '</li>';
        }
        var policeList = '';
        for (var p = 0; p < em.policeStations.length; p++) {
            policeList += '<li class="em-list-item">👮 ' + em.policeStations[p] + '</li>';
        }

        detailsContainer.innerHTML =
            '<div style="animation:fadeIn 0.4s ease-out;">' +
            '<div class="em-grid">' +
            '<div class="em-card em-card-nat">' +
            '<div class="em-card-emoji">🚨</div>' +
            '<div class="em-card-label">National Emergency</div>' +
            '<div class="em-card-number">' + em.national + '</div>' +
            '<button class="em-call-btn em-btn-red btn-call" data-number="' + em.national + '">📞 Call Helpline</button>' +
            '</div>' +
            '<div class="em-card em-card-pol">' +
            '<div class="em-card-emoji">👮</div>' +
            '<div class="em-card-label">Police Station</div>' +
            '<div class="em-card-number">' + em.police.split(' /')[0] + '</div>' +
            '<div class="em-card-sub">' + (em.police.split('/ ')[1] || 'Station Direct') + '</div>' +
            '<button class="em-call-btn em-btn-blue btn-call" data-number="' + em.police + '">📞 Call Police</button>' +
            '</div>' +
            '<div class="em-card em-card-amb">' +
            '<div class="em-card-emoji">🚑</div>' +
            '<div class="em-card-label">Ambulance / Medical</div>' +
            '<div class="em-card-number">' + em.ambulance.split(' /')[0] + '</div>' +
            '<button class="em-call-btn em-btn-amber btn-call" data-number="' + em.ambulance + '">📞 Call Ambulance</button>' +
            '</div>' +
            '<div class="em-card em-card-fir">' +
            '<div class="em-card-emoji">🔥</div>' +
            '<div class="em-card-label">Fire Control</div>' +
            '<div class="em-card-number">' + em.fire + '</div>' +
            '<button class="em-call-btn em-btn-orange btn-call" data-number="' + em.fire + '">📞 Call Fire</button>' +
            '</div>' +
            '</div>' +
            '<div class="em-details-grid">' +
            '<div class="em-detail-panel">' +
            '<h3><span>🏥</span> Famous Hospitals</h3>' +
            '<ul class="em-list">' + hospitalsList + '</ul>' +
            '</div>' +
            '<div class="em-detail-panel">' +
            '<h3><span>👮</span> Police Stations</h3>' +
            '<ul class="em-list">' + policeList + '</ul>' +
            '</div>' +
            '</div>' +
            '</div>';

        detailsContainer.querySelectorAll('.btn-call').forEach(function(btn) {
            btn.addEventListener('click', function() {
                triggerSimulatedCall(this.dataset.number);
            });
        });
    });
}


var simCallTimeout;
function triggerSimulatedCall(number) {
    var overlay = document.getElementById('simCallOverlay');
    var numEl = document.getElementById('simCallNumber');
    if (!overlay || !numEl) return;

    numEl.textContent = number;
    overlay.style.display = 'flex';

    if (simCallTimeout) clearTimeout(simCallTimeout);
    simCallTimeout = setTimeout(function() {
        overlay.style.display = 'none';
    }, 3000);
}

function hangUpCall() {
    var overlay = document.getElementById('simCallOverlay');
    if (overlay) overlay.style.display = 'none';
    if (simCallTimeout) clearTimeout(simCallTimeout);
}

// ══════════════════════════════════════════════════════
// ── AI HUB VIEW ──────────────────────────────────────
// ══════════════════════════════════════════════════════
var weatherPatterns = {
    delhi:{monsoon:[6,7,8,9],winter:[11,12,1,2],extremeHeat:[4,5,6],avgTemp:{winter:14,summer:42,monsoon:34}},
    mumbai:{monsoon:[6,7,8,9],winter:[11,12,1,2],extremeHeat:[3,4,5],avgTemp:{winter:25,summer:35,monsoon:29}},
    bengaluru:{monsoon:[6,7,8,9,10],winter:[11,12,1],extremeHeat:[3,4,5],avgTemp:{winter:20,summer:34,monsoon:24}},
    chennai:{monsoon:[10,11,12],winter:[12,1,2],extremeHeat:[4,5,6],avgTemp:{winter:24,summer:40,monsoon:28}},
    kolkata:{monsoon:[6,7,8,9],winter:[11,12,1,2],extremeHeat:[4,5,6],avgTemp:{winter:16,summer:38,monsoon:31}},
    jaipur:{monsoon:[7,8,9],winter:[11,12,1,2],extremeHeat:[4,5,6],avgTemp:{winter:12,summer:44,monsoon:32}},
    hyderabad:{monsoon:[6,7,8,9],winter:[11,12,1,2],extremeHeat:[3,4,5],avgTemp:{winter:18,summer:40,monsoon:28}},
    goa:{monsoon:[6,7,8,9],winter:[11,12,1,2],extremeHeat:[4,5],avgTemp:{winter:24,summer:34,monsoon:27}},
    shimla:{monsoon:[7,8,9],winter:[11,12,1,2,3],extremeHeat:[],avgTemp:{winter:2,summer:25,monsoon:18}},
    srinagar:{monsoon:[7,8],winter:[11,12,1,2,3],extremeHeat:[],avgTemp:{winter:-2,summer:30,monsoon:22}},
    varanasi:{monsoon:[7,8,9],winter:[11,12,1,2],extremeHeat:[4,5,6],avgTemp:{winter:12,summer:44,monsoon:32}},
    kochi:{monsoon:[6,7,8,9],winter:[12,1,2],extremeHeat:[3,4,5],avgTemp:{winter:26,summer:33,monsoon:26}},
    pune:{monsoon:[6,7,8,9],winter:[11,12,1,2],extremeHeat:[3,4,5],avgTemp:{winter:18,summer:38,monsoon:26}},
    ahmedabad:{monsoon:[7,8,9],winter:[11,12,1,2],extremeHeat:[4,5,6],avgTemp:{winter:16,summer:44,monsoon:30}},
    guwahati:{monsoon:[6,7,8,9],winter:[11,12,1,2],extremeHeat:[4,5],avgTemp:{winter:14,summer:34,monsoon:28}},
    agra:{monsoon:[6,7,8,9],winter:[11,12,1,2],extremeHeat:[4,5,6],avgTemp:{winter:14,summer:43,monsoon:33}},
    amritsar:{monsoon:[7,8,9],winter:[11,12,1,2],extremeHeat:[5,6],avgTemp:{winter:10,summer:41,monsoon:32}},
    udaipur:{monsoon:[7,8,9],winter:[11,12,1,2],extremeHeat:[4,5],avgTemp:{winter:16,summer:39,monsoon:31}},
    darjeeling:{monsoon:[6,7,8,9],winter:[11,12,1,2,3],extremeHeat:[],avgTemp:{winter:5,summer:20,monsoon:16}},
    ooty:{monsoon:[6,7,8,9,10],winter:[12,1,2],extremeHeat:[],avgTemp:{winter:12,summer:22,monsoon:17}},
    manali:{monsoon:[7,8,9],winter:[11,12,1,2,3],extremeHeat:[],avgTemp:{winter:2,summer:25,monsoon:18}},
    pondicherry:{monsoon:[10,11,12],winter:[12,1,2],extremeHeat:[4,5],avgTemp:{winter:24,summer:36,monsoon:28}},
    rishikesh:{monsoon:[7,8,9],winter:[11,12,1,2],extremeHeat:[4,5,6],avgTemp:{winter:12,summer:38,monsoon:30}},
    bhopal:{monsoon:[6,7,8,9],winter:[11,12,1,2],extremeHeat:[4,5,6],avgTemp:{winter:15,summer:40,monsoon:30}},
    raipur:{monsoon:[6,7,8,9],winter:[11,12,1,2],extremeHeat:[4,5],avgTemp:{winter:18,summer:42,monsoon:32}},
    bhubaneswar:{monsoon:[6,7,8,9,10],winter:[12,1,2],extremeHeat:[4,5],avgTemp:{winter:20,summer:38,monsoon:30}},
    ranchi:{monsoon:[6,7,8,9],winter:[11,12,1,2],extremeHeat:[4,5],avgTemp:{winter:14,summer:37,monsoon:28}},
    patna:{monsoon:[6,7,8,9],winter:[11,12,1,2],extremeHeat:[4,5,6],avgTemp:{winter:12,summer:41,monsoon:31}},
    vizag:{monsoon:[6,7,8,9,10],winter:[12,1,2],extremeHeat:[4,5],avgTemp:{winter:22,summer:34,monsoon:29}},
    shillong:{monsoon:[5,6,7,8,9],winter:[11,12,1,2],extremeHeat:[],avgTemp:{winter:8,summer:24,monsoon:19}},
    itanagar:{monsoon:[5,6,7,8,9],winter:[11,12,1,2],extremeHeat:[],avgTemp:{winter:10,summer:28,monsoon:22}},
    imphal:{monsoon:[5,6,7,8,9],winter:[11,12,1,2],extremeHeat:[],avgTemp:{winter:8,summer:28,monsoon:23}},
    agartala:{monsoon:[5,6,7,8,9,10],winter:[12,1,2],extremeHeat:[4,5],avgTemp:{winter:16,summer:34,monsoon:28}},
    kohima:{monsoon:[5,6,7,8,9],winter:[11,12,1,2],extremeHeat:[],avgTemp:{winter:6,summer:25,monsoon:20}},
    aizawl:{monsoon:[5,6,7,8,9],winter:[11,12,1,2],extremeHeat:[],avgTemp:{winter:12,summer:27,monsoon:22}},
    gandhinagar:{monsoon:[7,8,9],winter:[11,12,1,2],extremeHeat:[4,5,6],avgTemp:{winter:16,summer:43,monsoon:30}}
};

var itinTemplates = {
    cultural:[{time:'8:00 AM',act:'Visit the main historical monument',icon:'🏛️'},{time:'10:30 AM',act:'Explore the local museum or gallery',icon:'🖼️'},{time:'1:00 PM',act:'Traditional lunch at a local dhaba',icon:'🍛'},{time:'3:00 PM',act:'Walking tour of the old city quarter',icon:'🚶'},{time:'5:00 PM',act:'Visit a local temple or religious site',icon:'🛕'},{time:'7:30 PM',act:'Evening Aarti or cultural show',icon:'🪔'},{time:'9:00 PM',act:'Dinner featuring regional cuisine',icon:'🍽️'}],
    adventure:[{time:'6:00 AM',act:'Sunrise trek or nature walk',icon:'🌅'},{time:'9:00 AM',act:'Breakfast at a hilltop cafe',icon:'☕'},{time:'11:00 AM',act:'Adventure sport or kayaking',icon:'🛶'},{time:'1:30 PM',act:'Picnic lunch at a scenic viewpoint',icon:'🧺'},{time:'3:30 PM',act:'Visit a waterfall or natural reserve',icon:'🌊'},{time:'6:00 PM',act:'Sunset photography session',icon:'📸'},{time:'8:00 PM',act:'Bonfire dinner under the stars',icon:'🔥'}],
    relaxation:[{time:'9:00 AM',act:'Late breakfast at your hotel',icon:'🥐'},{time:'11:00 AM',act:'Spa or Ayurvedic massage session',icon:'💆'},{time:'1:00 PM',act:'Lunch at a waterfront restaurant',icon:'🍜'},{time:'3:00 PM',act:'Leisurely boat ride or beach walk',icon:'🚤'},{time:'5:00 PM',act:'Shopping for local handicrafts',icon:'🛍️'},{time:'7:00 PM',act:'Yoga or meditation session',icon:'🧘'},{time:'8:30 PM',act:'Fine dining with local flavours',icon:'🥘'}]
};

function predictWeatherRisk(cityId, month) {
    var p = weatherPatterns[cityId] || weatherPatterns['delhi'];
    var m = month + 1;
    var isMonsoon = p.monsoon.indexOf(m) > -1, isHeat = p.extremeHeat.indexOf(m) > -1, isWinter = p.winter.indexOf(m) > -1;
    var rain = isMonsoon ? 60 + Math.floor(Math.random()*30) : 5 + Math.floor(Math.random()*20);
    var heat = isHeat ? 70 + Math.floor(Math.random()*25) : isWinter ? 0 : 20 + Math.floor(Math.random()*20);
    var score = 100; if (isMonsoon) score -= 35; if (isHeat) score -= 30; if (isWinter && !isHeat) score += 10;
    score = Math.max(20, Math.min(100, score + Math.floor(Math.random()*10) - 5));
    var season = isWinter ? 'winter' : isMonsoon ? 'monsoon' : 'summer';
    var temp = p.avgTemp[season] || 28;
    return { rain:rain, heat:heat, score:score, temp:temp, isMonsoon:isMonsoon, isHeat:isHeat, isWinter:isWinter };
}

function predictPricing(city, month) {
    var p = weatherPatterns[city.id] || weatherPatterns['delhi'];
    var m = month + 1, isPeak = p.winter.indexOf(m) > -1, isOff = p.monsoon.indexOf(m) > -1;
    var bH = 3000 + Math.floor(Math.random()*2000), bF = 4000 + Math.floor(Math.random()*3000);
    var hM = isPeak ? 1.6 : isOff ? 0.7 : 1.0, fM = isPeak ? 1.8 : isOff ? 0.6 : 1.0;
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var forecast = [];
    for (var i = 0; i < 6; i++) {
        var fm = (month + i) % 12, fmn = fm + 1;
        var fPk = p.winter.indexOf(fmn) > -1, fOf = p.monsoon.indexOf(fmn) > -1;
        var hMul = fPk ? 1.5+Math.random()*0.3 : fOf ? 0.6+Math.random()*0.2 : 0.9+Math.random()*0.3;
        var fMul2 = fPk ? 1.6+Math.random()*0.4 : fOf ? 0.5+Math.random()*0.2 : 0.8+Math.random()*0.3;
        forecast.push({month:months[fm], hotel:Math.round(bH*hMul), flight:Math.round(bF*fMul2)});
    }
    var cheapest = forecast.reduce(function(prev,curr){return (prev.hotel+prev.flight)<(curr.hotel+curr.flight)?prev:curr;});
    return {curH:Math.round(bH*hM),curF:Math.round(bF*fM),forecast:forecast,cheapest:cheapest,isPeak:isPeak,isOff:isOff};
}

function viewAIHub() {
    var opts = cityOptions(citiesData);
    return '<div class="view-section active" style="padding-bottom:6rem;">' +

        '<!-- Page Header -->' +
        '<div class="pg-header">' +
        '<div class="pg-icon pg-icon-ai">🤖</div>' +
        '<div class="pg-header-text">' +
        '<span class="pg-badge pg-badge-ai">AI-Powered</span>' +
        '<h2 class="pg-title">Intelligent Travel Assistant</h2>' +
        '<p class="pg-subtitle">Real-time weather prediction, smart itinerary generation, and dynamic pricing — computed locally.</p>' +
        '</div>' +
        '</div>' +

        '<!-- Weather Panel -->' +
        '<div class="ai-panel">' +
        '<div class="ai-panel-header">' +
        '<div class="ai-panel-icon ai-panel-icon-weather">🌦️</div>' +
        '<div class="ai-panel-meta"><h3>AI Weather &amp; Travel Score Predictor</h3><p>Predicts monsoon risk, heat index, and optimal travel windows.</p></div>' +
        '</div>' +
        '<div class="ai-controls ai-controls-3">' +
        '<div class="form-group" style="margin-bottom:0;"><label>Destination</label><select id="aiWeatherCity"><option value="">Choose city…</option>' + opts + '</select></div>' +
        '<div class="form-group" style="margin-bottom:0;"><label>Travel Month</label><select id="aiWeatherMonth"><option value="0">January</option><option value="1">February</option><option value="2">March</option><option value="3">April</option><option value="4">May</option><option value="5" selected>June</option><option value="6">July</option><option value="7">August</option><option value="8">September</option><option value="9">October</option><option value="10">November</option><option value="11">December</option></select></div>' +
        '<button class="ai-run-btn ai-btn-purple" id="btnRunWeather">⚡ Predict</button>' +
        '</div>' +
        '<div id="weatherResult" style="margin-top:1.5rem;"></div>' +
        '</div>' +

        '<!-- Itinerary Panel -->' +
        '<div class="ai-panel">' +
        '<div class="ai-panel-header">' +
        '<div class="ai-panel-icon ai-panel-icon-itin">🤖</div>' +
        '<div class="ai-panel-meta"><h3>Smart Itinerary Generator</h3><p>Generates a personalized day-by-day travel plan based on your style.</p></div>' +
        '</div>' +
        '<div class="ai-controls ai-controls-4">' +
        '<div class="form-group" style="margin-bottom:0;"><label>City</label><select id="aiItinCity"><option value="">Choose city…</option>' + opts + '</select></div>' +
        '<div class="form-group" style="margin-bottom:0;"><label>Style</label><select id="aiItinStyle"><option value="cultural">🏛️ Cultural</option><option value="adventure">⛰️ Adventure</option><option value="relaxation">🧘 Relaxation</option></select></div>' +
        '<div class="form-group" style="margin-bottom:0;"><label>Days</label><select id="aiItinDays"><option value="1">1</option><option value="2">2</option><option value="3" selected>3</option><option value="5">5</option></select></div>' +
        '<button class="ai-run-btn ai-btn-pink" id="btnGenItinerary">Generate</button></div>' +
        '<div id="itineraryResult" style="margin-top:1.5rem;"></div></div>' +

        '<div class="ai-panel">' +
        '<div class="ai-panel-header">' +
        '<div class="ai-panel-icon ai-panel-icon-price">📊</div>' +
        '<div class="ai-panel-meta"><h3>Dynamic Pricing Predictor</h3><p>Forecasts hotel & flight prices for the next 6 months.</p></div>' +
        '</div>' +
        '<div class="ai-controls ai-controls-2">' +
        '<div class="form-group" style="margin-bottom:0;"><label>Destination</label><select id="aiPriceCity"><option value="">Choose city…</option>' + opts + '</select></div>' +
        '<button class="ai-run-btn ai-btn-green" id="btnRunPricing">Forecast</button></div>' +
        '<div id="pricingResult" style="margin-top:1.5rem;"></div></div>' +
        '</div>';
}

function setupAIHub() {
    var monthNames = ['January','February','March','April','May','June','July','August','September','October','November','December'];
    // Weather
    var bw = document.getElementById('btnRunWeather');
    if (bw) bw.addEventListener('click', function() {
        var cid = document.getElementById('aiWeatherCity').value, mo = parseInt(document.getElementById('aiWeatherMonth').value);
        if (!cid) { alert('Please select a city.'); return; }
        var city = citiesData.find(function(c){return c.id===cid;});
        bw.textContent = 'Analyzing…'; bw.disabled = true;
        setTimeout(function() {
            var pr = predictWeatherRisk(cid, mo);
            var sc = pr.score >= 70 ? '#22c55e' : pr.score >= 45 ? '#f59e0b' : '#ef4444';
            var advice = pr.score >= 70 ? monthNames[mo]+' is an <strong>excellent</strong> time to visit '+city.name+'. Pack light and enjoy!'
                : pr.score >= 45 ? monthNames[mo]+' is <strong>average</strong> for '+city.name+'. '+(pr.isMonsoon?'Carry rain gear.':'Stay hydrated.')
                : monthNames[mo]+' is <strong>not ideal</strong> for '+city.name+'. '+(pr.isMonsoon?'Heavy monsoon expected.':'Extreme heat advisory.')+' Consider visiting during '+city.bestSeason+'.';
            document.getElementById('weatherResult').innerHTML = '<div style="animation:fadeIn 0.4s ease-out;"><div style="display:grid;grid-template-columns:repeat(4,1fr);gap:1rem;margin-bottom:1.5rem;">'+
                '<div class="glass-panel" style="padding:1.2rem;text-align:center;"><div style="font-size:2rem;font-weight:800;font-family:Poppins;color:'+sc+';">'+pr.score+'</div><div style="font-size:0.8rem;color:var(--text-muted);">Travel Score</div></div>'+
                '<div class="glass-panel" style="padding:1.2rem;text-align:center;"><div style="font-size:2rem;font-weight:800;font-family:Poppins;color:#3b82f6;">'+pr.rain+'%</div><div style="font-size:0.8rem;color:var(--text-muted);">Rain Chance</div></div>'+
                '<div class="glass-panel" style="padding:1.2rem;text-align:center;"><div style="font-size:2rem;font-weight:800;font-family:Poppins;color:#f59e0b;">'+pr.temp+'°C</div><div style="font-size:0.8rem;color:var(--text-muted);">Avg Temp</div></div>'+
                '<div class="glass-panel" style="padding:1.2rem;text-align:center;"><div style="font-size:2rem;font-weight:800;font-family:Poppins;color:#ef4444;">'+pr.heat+'%</div><div style="font-size:0.8rem;color:var(--text-muted);">Heat Risk</div></div></div>'+
                '<div style="padding:1rem;border-left:4px solid '+sc+';background:'+sc+'11;border-radius:8px;"><strong style="color:'+sc+';">AI Recommendation:</strong> <span style="color:var(--text-muted);">'+advice+'</span></div></div>';
            bw.textContent = 'Predict'; bw.disabled = false;
        }, 700);
    });
    // Itinerary
    var bi = document.getElementById('btnGenItinerary');
    if (bi) bi.addEventListener('click', function() {
        var cid = document.getElementById('aiItinCity').value, style = document.getElementById('aiItinStyle').value, days = parseInt(document.getElementById('aiItinDays').value);
        if (!cid) { alert('Please select a city.'); return; }
        var city = citiesData.find(function(c){return c.id===cid;});
        bi.textContent = 'Generating…'; bi.disabled = true;
        setTimeout(function() {
            var tmpl = itinTemplates[style] || itinTemplates.cultural;
            var styleLabel = style === 'cultural' ? '🏛️ Cultural' : style === 'adventure' ? '⛰️ Adventure' : '🧘 Relaxation';
            var html = '<div style="animation:fadeIn 0.4s ease-out;"><div style="margin-bottom:1rem;padding:1rem;background:rgba(236,72,153,0.08);border-radius:8px;border-left:4px solid #ec4899;"><strong style="color:#ec4899;">'+styleLabel+' Itinerary for '+city.name+'</strong> <span style="color:var(--text-muted);font-size:0.85rem;">— '+days+' day'+(days>1?'s':'')+'</span></div>';
            for (var d = 1; d <= days; d++) {
                html += '<div style="margin-bottom:1.5rem;"><h4 style="color:var(--primary);margin-bottom:0.75rem;">Day '+d+'</h4><div style="display:flex;flex-direction:column;gap:0.5rem;border-left:2px solid var(--glass-border);padding-left:1rem;margin-left:0.5rem;">';
                for (var a = 0; a < tmpl.length; a++) {
                    var act = tmpl[a].act;
                    if (d === 1 && city.attractions.length > 0) act = act.replace('main historical monument', city.attractions[0]);
                    if (act.indexOf('regional cuisine') > -1 && city.foods.length > 0) act = act.replace('regional cuisine', city.foods.slice(0,2).join(' & '));
                    html += '<div style="display:flex;gap:0.75rem;align-items:center;padding:0.5rem 0;"><span style="font-size:1.3rem;">'+tmpl[a].icon+'</span><div><strong style="font-size:0.85rem;color:var(--primary);">'+tmpl[a].time+'</strong> <span style="color:var(--text-muted);font-size:0.9rem;">— '+act+'</span></div></div>';
                }
                html += '</div></div>';
            }
            html += '</div>';
            document.getElementById('itineraryResult').innerHTML = html;
            bi.textContent = 'Generate'; bi.disabled = false;
        }, 1000);
    });
    // Pricing
    var bp = document.getElementById('btnRunPricing');
    if (bp) bp.addEventListener('click', function() {
        var cid = document.getElementById('aiPriceCity').value;
        if (!cid) { alert('Please select a city.'); return; }
        var city = citiesData.find(function(c){return c.id===cid;});
        bp.textContent = 'Computing…'; bp.disabled = true;
        setTimeout(function() {
            var pricing = predictPricing(city, new Date().getMonth());
            var maxP = Math.max.apply(null, pricing.forecast.map(function(f){return f.hotel+f.flight;}));
            var bars = '';
            for (var i = 0; i < pricing.forecast.length; i++) {
                var f = pricing.forecast[i], total = f.hotel + f.flight, pct = Math.round((total/maxP)*100);
                var isCheap = f.month === pricing.cheapest.month;
                bars += '<div style="display:flex;flex-direction:column;align-items:center;gap:0.25rem;flex:1;"><div style="font-size:0.7rem;color:var(--text-muted);font-weight:600;">₹'+(total/1000).toFixed(1)+'k</div><div style="width:100%;max-width:50px;height:'+pct+'px;background:'+(isCheap?'#22c55e':'var(--primary)')+';border-radius:6px 6px 0 0;position:relative;">'+(isCheap?'<div style="position:absolute;top:-20px;left:50%;transform:translateX(-50%);font-size:0.9rem;">💰</div>':'')+'</div><div style="font-size:0.75rem;font-weight:600;color:'+(isCheap?'#22c55e':'var(--text-muted)')+';">'+f.month+'</div></div>';
            }
            var savings = (pricing.curH + pricing.curF) - (pricing.cheapest.hotel + pricing.cheapest.flight);
            var insight = pricing.isPeak ? 'It\'s currently <strong>peak season</strong>. Best to book in <strong>'+pricing.cheapest.month+'</strong> to save up to ₹'+savings.toLocaleString()+'.'
                : pricing.isOff ? 'It\'s currently <strong>off-season</strong> — great deals available! Book now.' : 'Prices are moderate. Cheapest window is <strong>'+pricing.cheapest.month+'</strong>.';
            document.getElementById('pricingResult').innerHTML = '<div style="animation:fadeIn 0.4s ease-out;"><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1rem;margin-bottom:1.5rem;">'+
                '<div class="glass-panel" style="padding:1.2rem;text-align:center;"><div style="font-size:1.6rem;font-weight:800;font-family:Poppins;color:var(--primary);">₹'+pricing.curH.toLocaleString()+'</div><div style="font-size:0.8rem;color:var(--text-muted);">Hotel/Night (Now)</div></div>'+
                '<div class="glass-panel" style="padding:1.2rem;text-align:center;"><div style="font-size:1.6rem;font-weight:800;font-family:Poppins;color:var(--secondary);">₹'+pricing.curF.toLocaleString()+'</div><div style="font-size:0.8rem;color:var(--text-muted);">Flight (Now)</div></div>'+
                '<div class="glass-panel" style="padding:1.2rem;text-align:center;"><div style="font-size:1.6rem;font-weight:800;font-family:Poppins;color:#22c55e;">₹'+(pricing.cheapest.hotel+pricing.cheapest.flight).toLocaleString()+'</div><div style="font-size:0.8rem;color:var(--text-muted);">Best in '+pricing.cheapest.month+'</div></div></div>'+
                '<div style="padding:1.5rem;background:var(--bg-2);border-radius:var(--radius-sm);margin-bottom:1.5rem;"><h4 style="margin-bottom:1rem;font-size:0.95rem;color:var(--text-muted);">6-Month Price Forecast (Hotel + Flight)</h4><div style="display:flex;align-items:flex-end;gap:0.75rem;height:120px;padding-top:1rem;">'+bars+'</div></div>'+
                '<div style="padding:1rem;border-left:4px solid #22c55e;background:rgba(34,197,94,0.08);border-radius:8px;"><strong style="color:#22c55e;">💡 AI Insight:</strong> <span style="color:var(--text-muted);">'+insight+'</span></div></div>';
            bp.textContent = 'Forecast'; bp.disabled = false;
        }, 900);
    });
}


// ══════════════════════════════════════════════════════
// ── NAVIGATION & APP ──────────────────────────────────
// ══════════════════════════════════════════════════════
var container = document.getElementById('app-container');
var currentRoute = 'home';
var selectedVehicle = 'car';

function navigate(route, params) {
    params = params || {};
    var user = getUser();
    if (user && (route === 'login' || route === 'signup')) {
        route = 'profile';
    }
    currentRoute = route;
    container.innerHTML = '';

    document.querySelectorAll('.nav-center a').forEach(function (a) {
        a.classList.toggle('active', a.getAttribute('data-route') === route);
    });

    updateNavUser(user);
    updateThemeIcon();

    switch (route) {
        case 'home': container.innerHTML = viewHome(); setupHome(); break;
        case 'planner': container.innerHTML = viewPlanner(params); setupPlanner(); if (params.calc) document.getElementById('dashCalcBtn').click(); break;
        case 'explorer': container.innerHTML = viewExplorer(); setupExplorer(params); break;
        case 'saved': container.innerHTML = viewSavedTrips(); setupSavedTrips(); break;
        case 'aihub': container.innerHTML = viewAIHub(); setupAIHub(); break;
        case 'emergency': container.innerHTML = viewEmergency(); setupEmergency(); break;
        case 'about': container.innerHTML = viewAbout(); setupAbout(); break;
        case 'feedback': container.innerHTML = viewFeedback(); setupFeedback(); break;
        case 'contact': container.innerHTML = viewContact(); setupContact(); break;
        case 'login': container.innerHTML = viewAuth('login'); setupAuth('login'); break;
        case 'signup': container.innerHTML = viewAuth('signup'); setupAuth('signup'); break;
        case 'profile': container.innerHTML = viewProfile(); break;
        default: container.innerHTML = viewHome(); setupHome();
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function updateNavUser(user) {
    var actions = document.querySelector('.nav-actions');
    if (!actions) return;
    var themeBtn = '<button class="theme-toggle" id="themeToggleBtn" onclick="toggleTheme()"></button>';

    if (user) {
        actions.innerHTML = themeBtn +
            '<button class="btn-ghost profile-nav-btn" onclick="navigate(\'profile\')">' +
            '<span class="profile-avatar-sm">' + user.name.charAt(0).toUpperCase() + '</span>' +
            '<span>' + user.name.split(' ')[0] + '</span>' +
            '</button>' +
            '<button class="btn-ghost" onclick="logout()">Log Out</button>';
    } else {
        actions.innerHTML = themeBtn +
            '<button class="btn-ghost" onclick="navigate(\'login\')">Log In</button>' +
            '<button class="btn" style="padding:0.5rem 1rem;font-size:0.85rem;" onclick="navigate(\'signup\')">Sign Up</button>';
    }
    updateThemeIcon();
}

function logout() {
    clearUser();
    updateNavUser(null);
    navigate('home');
}


// ══════════════════════════════════════════════════════
// ── SETUP LOGIC ──────────────────────────────────────
// ══════════════════════════════════════════════════════

function setupHome() {
    var vs = document.getElementById('homeVehicles');
    if (vs) {
        vs.addEventListener('click', function (e) {
            var btn = e.target.closest('.v-btn');
            if (!btn) return;
            selectedVehicle = btn.dataset.v;
            vs.querySelectorAll('.v-btn').forEach(function (b) { b.classList.remove('selected'); });
            btn.classList.add('selected');
        });
    }

    var btn = document.getElementById('homeSearchBtn');
    if (btn) {
        btn.addEventListener('click', function () {
            var src = document.getElementById('homeSrc').value;
            var dst = document.getElementById('homeDst').value;
            if (!src || !dst || src === dst) { alert('Please select two different cities.'); return; }
            navigate('planner', { src: src, dst: dst, v: selectedVehicle, calc: true });
        });
    }

    // Scroll reveal observer initialization
    var reveals = document.querySelectorAll('.scroll-reveal');
    if (typeof IntersectionObserver !== 'undefined' && reveals.length > 0) {
        var obs = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target); // only reveal once
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        reveals.forEach(function(el) { obs.observe(el); });
    } else {
        // Fallback for older browsers
        reveals.forEach(function(el) { el.classList.add('visible'); });
    }
}

function setupAbout() {
    var reveals = document.querySelectorAll('.scroll-reveal');
    if (typeof IntersectionObserver !== 'undefined' && reveals.length > 0) {
        var obs = new IntersectionObserver(function(entries) {
            entries.forEach(function(entry) {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
        reveals.forEach(function(el) { obs.observe(el); });
    } else {
        reveals.forEach(function(el) { el.classList.add('visible'); });
    }
}

function setupPlanner() {
    var vs = document.getElementById('dashVehicles');
    if (vs) {
        vs.addEventListener('click', function (e) {
            var btn = e.target.closest('.v-btn');
            if (!btn) return;
            selectedVehicle = btn.dataset.v;
            vs.querySelectorAll('.v-btn').forEach(function (b) { b.classList.remove('selected'); });
            btn.classList.add('selected');
        });
    }

    var btn = document.getElementById('dashCalcBtn');
    if (btn) {
        btn.addEventListener('click', function () {
            var srcId = document.getElementById('dashSrc').value;
            var dstId = document.getElementById('dashDst').value;
            if (!srcId || !dstId || srcId === dstId) { alert('Please select two different cities.'); return; }

            var src = citiesData.find(function (c) { return c.id === srcId; });
            var dst = citiesData.find(function (c) { return c.id === dstId; });
            var dist = haversine(src.lat, src.lng, dst.lat, dst.lng);
            var t = tripDetails(dist, selectedVehicle);

            var circ = 2 * Math.PI * 45;
            var offset = circ - (t.scorePercent / 100) * circ;

            // Calculate detailed metrics for breakdown
            var comfortScore = VEHICLES[selectedVehicle].comfort;
            var comfortPercent = comfortScore * 10;
            var comfortDesc = comfortScore >= 8 ? 'Premium comfort level with excellent seating, air conditioning, and a relaxing environment.' :
                              comfortScore >= 6 ? 'Standard comfort level with pleasant atmosphere and decent space.' :
                              'Basic comfort level focusing on budget travel and fast mobility.';

            var durationValue = dist / VEHICLES[selectedVehicle].speed;
            var durationPercent = durationValue < 3 ? 100 : durationValue < 8 ? 70 : 40;
            var durationText = durationValue < 3 ? 'Excellent (Fast)' : durationValue < 8 ? 'Good (Moderate)' : 'Fair (Long)';
            var durationDesc = durationValue < 3 ? 'Ultra-fast travel duration. Minimum travel fatigue and optimal travel window.' :
                               durationValue < 8 ? 'Moderate travel duration. Standard travel fatigue, suitable for direct transit.' :
                               'Long travel duration. High travel fatigue, recommend scheduling intermediate rest stops.';

            var costPerKm = VEHICLES[selectedVehicle].costPerKm;
            var costPercent = costPerKm <= 1.5 ? 100 : costPerKm <= 5.0 ? 70 : 40;
            var costText = costPerKm <= 1.5 ? 'Excellent Budget' : costPerKm <= 5.0 ? 'Standard Cost' : 'Premium Cost';
            var costDesc = costPerKm <= 1.5 ? 'Extremely cost-effective mode of travel. Saves maximum budget.' :
                           costPerKm <= 5.0 ? 'Balanced price point. Standard fare charges apply.' :
                           'Higher cost factor. Premium pricing for fast arrival or private travel convenience.';

            var scoreColor = t.score >= 8.5 ? '#22c55e' : t.score >= 6.5 ? '#f59e0b' : '#ef4444';
            var scoreBgGlow = t.score >= 8.5 ? 'rgba(34, 197, 94, 0.15)' : t.score >= 6.5 ? 'rgba(245, 158, 11, 0.15)' : 'rgba(239, 68, 68, 0.15)';
            
            var results = document.getElementById('dashResults');
            results.innerHTML =
                '<div class="stats-row">' +
                '<div class="stat-card glass-panel"><span class="icon" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));">📏</span><div class="stat-label">Distance</div><div class="stat-value" style="font-family: \'Outfit\', sans-serif;">' + t.dist + ' km</div></div>' +
                '<div class="stat-card glass-panel"><span class="icon" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));">⏱️</span><div class="stat-label">Est. Time (' + t.name + ')</div><div class="stat-value" style="font-family: \'Outfit\', sans-serif;">' + t.time + '</div></div>' +
                '<div class="stat-card glass-panel"><span class="icon" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.1));">₹</span><div class="stat-label">Est. Cost</div><div class="stat-value" style="font-family: \'Outfit\', sans-serif;">₹' + t.cost.toLocaleString() + '</div></div>' +
                '</div>' +

                '<div class="travel-score-card glass-panel" style="background: linear-gradient(145deg, ' + scoreBgGlow + ', transparent); border: 1px solid ' + scoreColor + '40; position: relative; overflow: hidden; padding: 2rem; display: flex; align-items: center; justify-content: space-between; gap: 2rem; border-radius: 20px; box-shadow: 0 10px 30px ' + scoreBgGlow + ';">' +
                '<div style="position: absolute; top: -50%; right: -20%; width: 250px; height: 250px; background: radial-gradient(circle, ' + scoreColor + '30 0%, transparent 70%); border-radius: 50%; pointer-events: none;"></div>' +
                '<div class="score-info" style="flex: 1; z-index: 1;">' +
                '<h3 style="font-family: \'Outfit\', sans-serif; font-size: 1.8rem; font-weight: 800; color: ' + scoreColor + '; margin-bottom: 0.5rem; display: flex; align-items: center; gap: 0.5rem;"><span style="font-size: 2.2rem; filter: drop-shadow(0 0 10px ' + scoreColor + '80);">✨</span> AI Route Overview</h3>' +
                '<p style="color: var(--text-muted); font-size: 1.05rem; line-height: 1.6;">This route scores a <strong style="color: ' + scoreColor + ';">' + t.score + '</strong> based on <strong>' + t.name + '</strong> comfort levels, cost-efficiency, and estimated travel duration.</p>' +
                '</div>' +
                '<div style="position:relative; width:130px; height:130px; flex-shrink: 0; z-index: 1; filter: drop-shadow(0 0 20px ' + scoreColor + '50);">' +
                '<svg viewBox="0 0 100 100" class="circular-chart" style="width: 100%; height: 100%;">' +
                '<circle cx="50" cy="50" r="45" fill="none" stroke="' + scoreColor + '20" stroke-width="8"/>' +
                '<circle cx="50" cy="50" r="45" fill="none" stroke="' + scoreColor + '" stroke-width="8" stroke-linecap="round" stroke-dasharray="' + circ + '" stroke-dashoffset="' + offset + '" style="transition: stroke-dashoffset 1.5s cubic-bezier(0.4, 0, 0.2, 1); transform: rotate(-90deg); transform-origin: 50% 50%;"/>' +
                '<text x="50" y="60" fill="' + scoreColor + '" font-family="\'Outfit\', sans-serif" font-weight="900" font-size="32" text-anchor="middle">' + t.score + '</text>' +
                '</svg>' +
                '</div>' +
                '</div>' +

                '<div class="glass-panel score-breakdown-card" style="margin-bottom: 2rem; padding: 2rem;">' +
                '<h4 style="margin-bottom: 1.5rem; color: var(--text-main); font-size: 1.15rem; display: flex; align-items: center; gap: 0.5rem; font-family: Poppins, sans-serif; font-weight: 700;">' +
                '<span>📊</span> AI Score Breakdown & Details' +
                '</h4>' +
                '<div style="display: flex; flex-direction: column; gap: 1.5rem;">' +
                '<div>' +
                '<div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; font-size: 0.9rem;">' +
                '<span style="font-weight: 600; color: var(--text-main);">🛋️ Comfort & Convenience</span>' +
                '<span style="font-weight: 700; color: var(--primary);">' + comfortScore + '/10</span>' +
                '</div>' +
                '<div class="progress-bar-small"><div class="progress-bar-small-fill" style="width: ' + comfortPercent + '%; background: var(--primary);"></div></div>' +
                '<p style="margin: 0.4rem 0 0 0; font-size: 0.85rem; color: var(--text-muted);">' + comfortDesc + '</p>' +
                '</div>' +
                '<div>' +
                '<div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; font-size: 0.9rem;">' +
                '<span style="font-weight: 600; color: var(--text-main);">⏱️ Travel Time Efficiency</span>' +
                '<span style="font-weight: 700; color: var(--secondary);">' + durationText + '</span>' +
                '</div>' +
                '<div class="progress-bar-small"><div class="progress-bar-small-fill" style="width: ' + durationPercent + '%; background: var(--secondary);"></div></div>' +
                '<p style="margin: 0.4rem 0 0 0; font-size: 0.85rem; color: var(--text-muted);">' + durationDesc + '</p>' +
                '</div>' +
                '<div>' +
                '<div style="display: flex; justify-content: space-between; margin-bottom: 0.4rem; font-size: 0.9rem;">' +
                '<span style="font-weight: 600; color: var(--text-main);">💰 Cost-to-Distance Value</span>' +
                '<span style="font-weight: 700; color: var(--success);">' + costText + '</span>' +
                '</div>' +
                '<div class="progress-bar-small"><div class="progress-bar-small-fill" style="width: ' + costPercent + '%; background: var(--success);"></div></div>' +
                '<p style="margin: 0.4rem 0 0 0; font-size: 0.85rem; color: var(--text-muted);">' + costDesc + '</p>' +
                '</div>' +
                '</div>' +
                '</div>' +

                '<button class="btn btn-outline" id="dashFavBtn" style="width:100%;">⭐ Save Route to Favorites</button>';

            document.getElementById('dashFavBtn').addEventListener('click', function () {
                var added = toggleFav({
                    fromId: srcId,
                    toId: dstId,
                    fromName: src.name,
                    toName: dst.name,
                    distance: t.dist,
                    vehicle: t.name,
                    duration: t.time,
                    time: new Date().toLocaleString()
                });
                this.innerHTML = added ? '✅ Saved!' : '⭐ Save Route to Favorites';
            });

            pushHistory({ fromId: srcId, toId: dstId, fromName: src.name, toName: dst.name, time: new Date().toLocaleString() });
        });
    }
}

function setupCostCalculator() {
    var btn = document.getElementById('compareCostBtn');
    if (!btn) return;

    btn.addEventListener('click', function () {
        var srcId = document.getElementById('costSource').value;
        var destId = document.getElementById('costDest').value;

        if (!srcId || !destId || srcId === destId) {
            alert("Please select distinct source and destination cities.");
            return;
        }

        var src = citiesData.find(function (c) { return c.id === srcId; });
        var dest = citiesData.find(function (c) { return c.id === destId; });
        var dist = haversine(src.lat, src.lng, dest.lat, dest.lng);

        var vehicles = ['bike', 'car', 'bus', 'train', 'flight'];
        var html = '';

        for (var i = 0; i < vehicles.length; i++) {
            var trip = tripDetails(dist, vehicles[i]);
            html += '<div class="glass-panel" style="padding:1rem 1.5rem; margin-bottom:1rem; display:flex; justify-content:space-between; align-items:center;">' +
                '<div style="display:flex; flex-direction:column;">' +
                '<strong style="font-size:1.1rem; color:var(--text-main);">' + trip.icon + ' ' + trip.name + '</strong>' +
                '<span style="font-size:0.85rem; color:var(--text-muted);">' + trip.time + ' &bull; Comfort: ' + Math.round(trip.score) + '/10</span>' +
                '</div>' +
                '<div style="font-size:1.2rem; font-weight:700; color:var(--primary);">₹' + trip.cost.toLocaleString() + '</div>' +
                '</div>';
        }

        document.getElementById('costComparisonContent').innerHTML = html;
    });
}

function setupExplorer(params) {
    var mapEl = document.getElementById('leafletMap');
    if (!mapEl) return;

    // Tile layer definitions
    var tileLayers = {
        street: {
            dark:  'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png',
            light: 'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png',
            attr:  '\u00a9 OpenStreetMap contributors \u00a9 CARTO',
            subdomains: 'abcd'
        },
        satellite: {
            url:  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
            attr: '\u00a9 Esri, Maxar, Earthstar Geographics'
        },
        terrain: {
            // Esri World Topo — same CDN as satellite, very fast global delivery
            url:  'https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}',
            attr: '\u00a9 Esri, HERE, Garmin, FAO, NOAA, USGS'
        }
    };

    // Wait slightly for DOM to settle
    setTimeout(function() {
        var isDark = document.documentElement.classList.contains('dark');
        var currentLayer = null;
        var map = L.map('leafletMap', {
            center: [22.5, 79],
            zoom: 4.5,
            minZoom: 4,
            maxZoom: 18,
            preferCanvas: true,   // faster canvas rendering for many markers
            keepBuffer: 4,        // pre-load 4 extra tile rows/cols while panning
            zoomAnimation: true
        });

        // Expose setMapLayer globally so onclick buttons can call it
        window._explorerMap = map;
        window._explorerCurrentLayer = null;

        // Shared tile options for fast loading
        var fastTileOpts = {
            maxZoom: 18,
            maxNativeZoom: 18,
            updateWhenIdle: false,      // load tiles while panning, not just after stop
            updateWhenZooming: false,   // suppress tile requests mid-zoom
            keepBuffer: 4,
            crossOrigin: true
        };

        function applyLayer(mode) {
            if (window._explorerCurrentLayer) {
                map.removeLayer(window._explorerCurrentLayer);
            }
            var url, attr, opts;
            if (mode === 'satellite') {
                url  = tileLayers.satellite.url;
                attr = tileLayers.satellite.attr;
                opts = Object.assign({}, fastTileOpts, { attribution: attr });
            } else if (mode === 'terrain') {
                url  = tileLayers.terrain.url;
                attr = tileLayers.terrain.attr;
                opts = Object.assign({}, fastTileOpts, { attribution: attr });
            } else {
                url  = isDark ? tileLayers.street.dark : tileLayers.street.light;
                attr = tileLayers.street.attr;
                opts = Object.assign({}, fastTileOpts, {
                    attribution: attr,
                    subdomains: tileLayers.street.subdomains
                });
            }
            window._explorerCurrentLayer = L.tileLayer(url, opts).addTo(map);

            // Update button active states
            ['layerStreet','layerSatellite','layerTerrain'].forEach(function(id) {
                var btn = document.getElementById(id);
                if (btn) btn.classList.remove('active');
            });
            var activeId = mode === 'satellite' ? 'layerSatellite' : mode === 'terrain' ? 'layerTerrain' : 'layerStreet';
            var activeBtn = document.getElementById(activeId);
            if (activeBtn) activeBtn.classList.add('active');
        }

        // Expose globally for onclick handlers
        window.setMapLayer = applyLayer;

        // Apply default street layer
        applyLayer('street');

        // Add India states GeoJSON if available
        if (typeof indiaStatesGeoJSON !== 'undefined') {
            L.geoJSON(indiaStatesGeoJSON, {
                style: {
                    color: 'var(--primary)',
                    weight: 1.5,
                    opacity: 0.6,
                    fillOpacity: 0.05
                }
            }).addTo(map);
        }

        // Custom marker icon
        var customIcon = L.divIcon({
            className: 'custom-leaflet-marker',
            html: '<div style="background:var(--primary); width:14px; height:14px; border-radius:50%; border:2px solid #fff; box-shadow:0 0 10px var(--primary);"></div>',
            iconSize: [14, 14],
            iconAnchor: [7, 7]
        });

        // Satellite mode uses a brighter marker so it shows on dark imagery
        function getIcon(mode) {
            var color = (mode === 'satellite') ? '#facc15' : 'var(--primary)';
            return L.divIcon({
                className: 'custom-leaflet-marker',
                html: '<div style="background:' + color + '; width:14px; height:14px; border-radius:50%; border:2px solid #fff; box-shadow:0 0 10px ' + color + ';"></div>',
                iconSize: [14, 14],
                iconAnchor: [7, 7]
            });
        }

        // Store all markers to update their icon on layer switch
        var allMarkers = [];

        // Add markers for all cities
        citiesData.forEach(function(city) {
            var marker = L.marker([city.lat, city.lng], {icon: customIcon}).addTo(map);
            marker.cityId = city.id;
            allMarkers.push(marker);
            marker.bindTooltip(city.name, {
                permanent: false,
                direction: 'top',
                className: 'city-tooltip',
                offset: [0, -10]
            });

            marker.on('click', function() {
                map.flyTo([city.lat, city.lng], 7, { duration: 1.5 });
                
                var attrTags = city.attractions.map(function(a){ return '<span class="city-tag">' + a + '</span>'; }).join('');
                var foodTags = city.foods.map(function(f){ return '<span class="city-tag">' + f + '</span>'; }).join('');
                var hotelTags = city.hotels ? city.hotels.map(function(h){ return '<span class="city-tag" style="background:var(--accent); color:#fff;">' + h + '</span>'; }).join('') : '';

                var panel = document.getElementById('mapCityInfo');
                panel.innerHTML =
                    '<div class="map-city-detail" style="animation: fadeIn 0.3s ease-out;">' +
                    '<div class="map-city-header">' +
                    '<h3>' + city.name + '</h3>' +
                    '<span class="map-city-score">⭐ ' + city.score + '</span>' +
                    '</div>' +
                    '<p style="color:var(--text-muted);margin-bottom:1.5rem;">' + city.state + ' • Best: ' + city.bestSeason + '</p>' +
                    '<div style="margin-bottom:1.5rem;">' +
                    '<strong style="display:block;margin-bottom:0.5rem;">🏛️ Attractions</strong>' +
                    '<div class="city-tags">' + attrTags + '</div>' +
                    '</div>' +
                    '<div style="margin-bottom:1.5rem;">' +
                    '<strong style="display:block;margin-bottom:0.5rem;">🍽️ Famous Food</strong>' +
                    '<div class="city-tags">' + foodTags + '</div>' +
                    '</div>' +
                    '<div style="margin-bottom:1.5rem;">' +
                    '<strong style="display:block;margin-bottom:0.5rem;">🏨 Top Hotels</strong>' +
                    '<div class="city-tags">' + hotelTags + '</div>' +
                    '</div>' +
                    '<button class="btn" style="width:100%; margin-top: auto;" onclick="navigate(\'planner\',{src:\'' + city.id + '\'})">Plan a Trip from ' + city.name + '</button>' +
                    '</div>';
            });
        });

        // Update marker icons when layer changes to improve visibility
        var origSetMapLayer = window.setMapLayer;
        window.setMapLayer = function(mode) {
            origSetMapLayer(mode);
            var icon = getIcon(mode);
            allMarkers.forEach(function(m) { m.setIcon(icon); });
        };
        
        // Force Leaflet to re-calculate layout
        setTimeout(function(){ map.invalidateSize(); }, 200);

        if (params && params.city) {
            setTimeout(function() {
                var marker = allMarkers.find(function(m) { return m.cityId === params.city; });
                if (marker) {
                    marker.fire('click');
                }
            }, 600);
        }
    }, 100);
}

function setupInsights() {
    var list = document.getElementById('favList');
    if (!list) return;
    var f = getFavs();
    if (!f.length) {
        list.innerHTML = '<p style="color:var(--text-muted);">No favorites saved yet. Head to the Dashboard to save some!</p>';
        return;
    }
    var html = '';
    for (var i = 0; i < f.length; i++) {
        var r = f[i];
        html += '<div class="fav-item">' +
            '<div style="font-weight:600;">' + r.fromName + ' → ' + r.toName + '</div>' +
            '<button class="btn btn-outline" style="padding:0.4rem 1rem;" onclick="navigate(\'planner\',{src:\'' + r.fromId + '\',dst:\'' + r.toId + '\',calc:true})">Load Route</button>' +
            '</div>';
    }
    list.innerHTML = html;
}

function setupContact() {
    var sendBtn = document.getElementById('contactSend');
    if (sendBtn) {
        sendBtn.addEventListener('click', function () {
            var e = document.getElementById('c-email').value.trim();
            if (!e) { alert('Please enter your email.'); return; }
            alert('Message sent! We\'ll reply to ' + e + ' soon.');
        });
    }
}

function setupAuth(mode) {
    // Inline error helper
    function showError(inputId, msg) {
        var el = document.getElementById(inputId);
        if (!el) return;
        el.style.borderColor = '#ef4444';
        el.style.boxShadow = '0 0 0 4px rgba(239, 68, 68, 0.1)';
        if (msg) {
            var errEl = document.getElementById('authErrorMsg');
            if (errEl) {
                errEl.textContent = msg;
                errEl.style.display = 'block';
            }
        }
        setTimeout(function() {
            el.style.borderColor = '';
            el.style.boxShadow = '';
        }, 2500);
    }

    if (mode === 'login') {
        var loginEl = document.getElementById('loginEmail');
        var pwEl = document.getElementById('loginPassword');

        // Enter key support
        [loginEl, pwEl].forEach(function(inp) {
            if (inp) inp.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') document.getElementById('loginBtn') && document.getElementById('loginBtn').click();
            });
        });

        var btn = document.getElementById('loginBtn');
        if (btn) {
            [loginEl, pwEl].forEach(function(inp) {
                if (inp) inp.addEventListener('input', function() {
                    var errEl = document.getElementById('authErrorMsg');
                    if (errEl) errEl.style.display = 'none';
                });
            });

            btn.addEventListener('click', function () {
                var email = loginEl ? loginEl.value.trim() : '';
                var pw = pwEl ? pwEl.value : '';
                
                var errEl = document.getElementById('authErrorMsg');
                if (errEl) errEl.style.display = 'none';

                if (!email) { showError('loginEmail', 'Enter email'); return; }
                if (!pw) { showError('loginPassword', 'Enter password'); return; }

                // Loading state
                btn.disabled = true;
                btn.innerHTML = '<span style="animation:spin 0.8s linear infinite; display:inline-block; margin-right:0.5rem;">⏳</span> Logging in...';

                setTimeout(function() {
                    btn.disabled = false;
                    btn.innerHTML = 'Log In';
                    
                    var users = getUsers();
                    var found = users.find(function(u) { return u.email.toLowerCase() === email.toLowerCase(); });
                    if (!found) {
                        showError('loginEmail');
                        if (errEl) {
                            errEl.textContent = 'No account found with this email. Please sign up first!';
                            errEl.style.display = 'block';
                        }
                        return;
                    }
                    if (found.password !== pw) {
                        showError('loginPassword');
                        if (errEl) {
                            errEl.textContent = 'Incorrect password. Please try again.';
                            errEl.style.display = 'block';
                        }
                        return;
                    }

                    setUser({ name: found.name, email: found.email });
                    navigate('profile');
                }, 700);
            });
        }
    } else {
        // Password strength meter
        var pwInput = document.getElementById('signupPassword');
        var bar = document.getElementById('pwStrengthBar');
        var label = document.getElementById('pwStrengthLabel');
        if (pwInput && bar) {
            pwInput.addEventListener('input', function() {
                var v = pwInput.value;
                var score = 0;
                if (v.length >= 4) score++;
                if (v.length >= 8) score++;
                if (/[A-Z]/.test(v)) score++;
                if (/[0-9]/.test(v)) score++;
                if (/[^A-Za-z0-9]/.test(v)) score++;
                var pct = [0, 20, 40, 60, 80, 100][score];
                var colors = ['', '#ef4444', '#f97316', '#eab308', '#22c55e', '#16a34a'];
                var labels = ['', 'Too weak', 'Weak', 'Fair', 'Strong', 'Very strong'];
                bar.style.width = pct + '%';
                bar.style.background = colors[score] || '';
                if (label) label.textContent = score > 0 ? labels[score] : '';
                if (label) label.style.color = colors[score] || 'var(--text-muted)';
            });
        }

        // Enter key support
        ['signupName', 'signupEmail', 'signupPassword'].forEach(function(id) {
            var el = document.getElementById(id);
            if (el) el.addEventListener('keydown', function(e) {
                if (e.key === 'Enter') document.getElementById('signupBtn') && document.getElementById('signupBtn').click();
            });
        });

        var btn2 = document.getElementById('signupBtn');
        if (btn2) {
            ['signupName', 'signupEmail', 'signupPassword'].forEach(function(id) {
                var el = document.getElementById(id);
                if (el) el.addEventListener('input', function() {
                    var errEl = document.getElementById('authErrorMsg');
                    if (errEl) errEl.style.display = 'none';
                });
            });

            btn2.addEventListener('click', function () {
                var name = document.getElementById('signupName').value.trim();
                var email = document.getElementById('signupEmail').value.trim();
                var pw = document.getElementById('signupPassword').value;
                
                var errEl = document.getElementById('authErrorMsg');
                if (errEl) errEl.style.display = 'none';

                if (!name) { showError('signupName', 'Please enter your full name.'); return; }
                if (!email || !email.includes('@')) { showError('signupEmail', 'Please enter a valid email address.'); return; }
                if (!pw || pw.length < 4) { showError('signupPassword', 'Password must be at least 4 characters long.'); return; }

                btn2.disabled = true;
                btn2.innerHTML = '<span style="animation:spin 0.8s linear infinite; display:inline-block; margin-right:0.5rem;">⏳</span> Creating account...';

                setTimeout(function() {
                    btn2.disabled = false;
                    btn2.innerHTML = 'Create Account';
                    
                    var users = getUsers();
                    var found = users.find(function(u) { return u.email.toLowerCase() === email.toLowerCase(); });
                    if (found) {
                        showError('signupEmail', 'This email address is already registered!');
                        return;
                    }

                    var newUser = { name: name, email: email, password: pw };
                    saveUser(newUser);
                    setUser({ name: name, email: email });
                    navigate('profile');
                }, 900);
            });
        }
    }
}


// ══════════════════════════════════════════════════════
// ── INIT ─────────────────────────────────────────────
// ══════════════════════════════════════════════════════
function init() {
    document.body.classList.add('first-load');
    setTimeout(function() {
        var splash = document.getElementById('splash-screen');
        if (splash) splash.remove();
        document.body.classList.remove('first-load');
    }, 3500);

    document.querySelectorAll('.nav-center a').forEach(function (a) {
        a.addEventListener('click', function (e) {
            e.preventDefault();
            var link = e.target.closest('a');
            if (!link) return;
            navigate(link.getAttribute('data-route'));
        });
    });

    var hamburger = document.getElementById('hamburger');
    if (hamburger) {
        hamburger.addEventListener('click', function () {
            var nav = document.getElementById('nav-links');
            if (nav) nav.classList.toggle('active');
        });
    }

    updateThemeIcon();
    navigate('home');
}

init();

// ── CUSTOM CURSOR EFFECT ─────────────────────────────
(function initCustomCursor() {
    var dot = document.getElementById('custom-cursor-dot');
    var ring1 = document.getElementById('custom-cursor-ring-1');
    var ring2 = document.getElementById('custom-cursor-ring-2');
    if (!dot || !ring1 || !ring2) return;

    var mouseX = 0, mouseY = 0;
    var r1X = 0, r1Y = 0;
    var r2X = 0, r2Y = 0;

    window.addEventListener('mousemove', function(e) {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        dot.style.left = mouseX + 'px';
        dot.style.top = mouseY + 'px';
    });

    function animateRings() {
        // Interpolate Ring 1 (faster trailing)
        var ease1 = 0.18;
        r1X += (mouseX - r1X) * ease1;
        r1Y += (mouseY - r1Y) * ease1;
        ring1.style.left = r1X + 'px';
        ring1.style.top = r1Y + 'px';

        // Interpolate Ring 2 (slower trailing)
        var ease2 = 0.08;
        r2X += (mouseX - r2X) * ease2;
        r2Y += (mouseY - r2Y) * ease2;
        ring2.style.left = r2X + 'px';
        ring2.style.top = r2Y + 'px';
        
        requestAnimationFrame(animateRings);
    }
    animateRings();

    function addCursorHoverListeners() {
        var interactives = document.querySelectorAll('a, button, [role="button"], select, input, textarea, .logo, .dest-card, .v-btn, .hamburger, .btn-social');
        interactives.forEach(function(el) {
            if (el.dataset.cursorBound) return;
            el.dataset.cursorBound = 'true';

            el.addEventListener('mouseenter', function() {
                document.body.classList.add('cursor-hover');
            });
            el.addEventListener('mouseleave', function() {
                document.body.classList.remove('cursor-hover');
            });
        });
    }

    addCursorHoverListeners();
    var observer = new MutationObserver(addCursorHoverListeners);
    observer.observe(document.body, { childList: true, subtree: true });

    var els = [dot, ring1, ring2];
    document.addEventListener('mouseleave', function() {
        els.forEach(function(el) { el.style.opacity = '0'; });
    });
    document.addEventListener('mouseenter', function() {
        els.forEach(function(el) { el.style.opacity = '1'; });
    });
})();
