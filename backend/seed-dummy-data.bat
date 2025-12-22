@echo off
echo ====================================
echo  EE Department Dummy Data Seeder
echo ====================================
echo.

set API=http://localhost:1337/api

echo Adding People (Faculty)...

curl -X POST "%API%/peoples" -H "Content-Type: application/json" -d "{\"data\":{\"Name\":\"Dr. Rajesh Kumar\",\"Designation\":\"Professor and Head\",\"Role\":\"Department Leadership\",\"Email\":\"rajesh.kumar@iitdh.ac.in\",\"Domain\":\"Power Systems, Smart Grids\"}}"

curl -X POST "%API%/peoples" -H "Content-Type: application/json" -d "{\"data\":{\"Name\":\"Dr. Priya Sharma\",\"Designation\":\"Associate Professor\",\"Role\":\"Faculty Members\",\"Email\":\"priya.sharma@iitdh.ac.in\",\"Domain\":\"Control Systems, Robotics\"}}"

curl -X POST "%API%/peoples" -H "Content-Type: application/json" -d "{\"data\":{\"Name\":\"Dr. Amit Patel\",\"Designation\":\"Assistant Professor\",\"Role\":\"Faculty Members\",\"Email\":\"amit.patel@iitdh.ac.in\",\"Domain\":\"VLSI Design, Embedded Systems\"}}"

curl -X POST "%API%/peoples" -H "Content-Type: application/json" -d "{\"data\":{\"Name\":\"Dr. Sneha Reddy\",\"Designation\":\"Assistant Professor\",\"Role\":\"Faculty Members\",\"Email\":\"sneha.reddy@iitdh.ac.in\",\"Domain\":\"Signal Processing, Machine Learning\"}}"

curl -X POST "%API%/peoples" -H "Content-Type: application/json" -d "{\"data\":{\"Name\":\"Dr. Vikram Singh\",\"Designation\":\"Associate Professor\",\"Role\":\"Faculty Members\",\"Email\":\"vikram.singh@iitdh.ac.in\",\"Domain\":\"Communication Systems, 5G Networks\"}}"

curl -X POST "%API%/peoples" -H "Content-Type: application/json" -d "{\"data\":{\"Name\":\"Dr. Ananya Gupta\",\"Designation\":\"Assistant Professor\",\"Role\":\"Faculty Members\",\"Email\":\"ananya.gupta@iitdh.ac.in\",\"Domain\":\"Power Electronics, Renewable Energy\"}}"

curl -X POST "%API%/peoples" -H "Content-Type: application/json" -d "{\"data\":{\"Name\":\"Mr. Suresh Babu\",\"Designation\":\"Technical Officer\",\"Role\":\"Staff Members\",\"Email\":\"suresh.babu@iitdh.ac.in\"}}"

curl -X POST "%API%/peoples" -H "Content-Type: application/json" -d "{\"data\":{\"Name\":\"Rahul Verma\",\"Designation\":\"PhD Scholar\",\"Role\":\"PHD\",\"Email\":\"rahul.phd@iitdh.ac.in\",\"Domain\":\"Power Systems\"}}"

curl -X POST "%API%/peoples" -H "Content-Type: application/json" -d "{\"data\":{\"Name\":\"Meera Krishnan\",\"Designation\":\"PhD Scholar\",\"Role\":\"PHD\",\"Email\":\"meera.phd@iitdh.ac.in\",\"Domain\":\"VLSI Design\"}}"

echo.
echo Adding News...

curl -X POST "%API%/newss" -H "Content-Type: application/json" -d "{\"data\":{\"Title\":\"Prof. Rajesh Kumar receives Best Paper Award\",\"Description\":\"Our Head of Department has been honored with the Best Paper Award at IEEE International Conference on Power Systems.\",\"Date\":\"2025-12-01\"}}"

curl -X POST "%API%/newss" -H "Content-Type: application/json" -d "{\"data\":{\"Title\":\"EE Department inaugurates new Power Electronics Lab\",\"Description\":\"The state-of-the-art Power Electronics Laboratory was inaugurated by the Director.\",\"Date\":\"2025-11-15\"}}"

curl -X POST "%API%/newss" -H "Content-Type: application/json" -d "{\"data\":{\"Title\":\"Student team wins Smart India Hackathon 2025\",\"Description\":\"A team of EE students won first prize at SIH 2025 for their smart grid management solution.\",\"Date\":\"2025-11-10\"}}"

echo.
echo Adding Research Labs...

curl -X POST "%API%/research-labs" -H "Content-Type: application/json" -d "{\"data\":{\"Name\":\"Power Electronics and Drives Laboratory\",\"Type\":\"Research Lab\",\"Description\":\"Research on power converters, motor drives, and renewable energy.\"}}"

curl -X POST "%API%/research-labs" -H "Content-Type: application/json" -d "{\"data\":{\"Name\":\"Control Systems Laboratory\",\"Type\":\"Research Lab\",\"Description\":\"Advanced control theory, robotics, and autonomous systems.\"}}"

curl -X POST "%API%/research-labs" -H "Content-Type: application/json" -d "{\"data\":{\"Name\":\"VLSI Design Laboratory\",\"Type\":\"Research Lab\",\"Description\":\"Digital and analog IC design, FPGA prototyping.\"}}"

curl -X POST "%API%/research-labs" -H "Content-Type: application/json" -d "{\"data\":{\"Name\":\"Communication Systems Laboratory\",\"Type\":\"Research Lab\",\"Description\":\"Wireless communications, 5G/6G networks, IoT.\"}}"

echo.
echo Adding Research Projects...

curl -X POST "%API%/research-projects" -H "Content-Type: application/json" -d "{\"data\":{\"Title\":\"Smart Grid Integration of Renewable Energy Sources\",\"Area\":\"Power Systems\",\"PI\":\"Dr. Rajesh Kumar\",\"Type\":\"Sponsored\",\"Duration\":\"2024-2027\",\"CurrentStatus\":\"Ongoing\"}}"

curl -X POST "%API%/research-projects" -H "Content-Type: application/json" -d "{\"data\":{\"Title\":\"Development of Indigenous 5G Base Station\",\"Area\":\"Communication Systems\",\"PI\":\"Dr. Vikram Singh\",\"Type\":\"Sponsored\",\"Duration\":\"2023-2026\",\"CurrentStatus\":\"Ongoing\"}}"

curl -X POST "%API%/research-projects" -H "Content-Type: application/json" -d "{\"data\":{\"Title\":\"Low-Power VLSI Design for IoT Applications\",\"Area\":\"VLSI\",\"PI\":\"Dr. Amit Patel\",\"Type\":\"Sponsored\",\"Duration\":\"2023-2026\",\"CurrentStatus\":\"Ongoing\"}}"

echo.
echo Adding Talks and Events...

curl -X POST "%API%/talk-and-events" -H "Content-Type: application/json" -d "{\"data\":{\"Title\":\"Guest Lecture: Future of Electric Vehicles in India\",\"Description\":\"Talk on EV technology and market trends by industry expert.\",\"Date\":\"2025-12-15\"}}"

curl -X POST "%API%/talk-and-events" -H "Content-Type: application/json" -d "{\"data\":{\"Title\":\"Workshop: FPGA Design using Xilinx Vivado\",\"Description\":\"Hands-on workshop on FPGA design for undergraduate students.\",\"Date\":\"2025-12-20\"}}"

echo.
echo ====================================
echo  DONE! Now go to Strapi Admin and 
echo  PUBLISH all entries!
echo  http://localhost:1337/admin
echo ====================================
pause
