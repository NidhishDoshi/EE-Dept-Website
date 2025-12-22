# EE Department Dummy Data Seeder for Strapi
# Make sure Strapi is running on http://localhost:1337 before running this script

$API = "http://localhost:1337/api"

Write-Host "=====================================" -ForegroundColor Cyan
Write-Host " EE Department Dummy Data Seeder" -ForegroundColor Cyan
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""

# Check if Strapi is running
try {
    $null = Invoke-RestMethod -Uri "$API/peoples" -Method Get -ErrorAction Stop
    Write-Host "Strapi is running!" -ForegroundColor Green
} catch {
    Write-Host "Strapi is not running! Please start it first:" -ForegroundColor Red
    Write-Host "   cd backend; npm run develop" -ForegroundColor Yellow
    exit 1
}

# ========== PEOPLE ==========
Write-Host ""
Write-Host "Adding People..." -ForegroundColor Yellow

$People = @(
    @{ Name = "Dr. Rajesh Kumar"; Designation = "Professor and Head"; Role = "Department Leadership"; Email = "rajesh.kumar@iitdh.ac.in"; Domain = "Power Systems, Smart Grids" }
    @{ Name = "Dr. Priya Sharma"; Designation = "Associate Professor"; Role = "Faculty Members"; Email = "priya.sharma@iitdh.ac.in"; Domain = "Control Systems, Robotics" }
    @{ Name = "Dr. Amit Patel"; Designation = "Assistant Professor"; Role = "Faculty Members"; Email = "amit.patel@iitdh.ac.in"; Domain = "VLSI Design, Embedded Systems" }
    @{ Name = "Dr. Sneha Reddy"; Designation = "Assistant Professor"; Role = "Faculty Members"; Email = "sneha.reddy@iitdh.ac.in"; Domain = "Signal Processing, ML" }
    @{ Name = "Dr. Vikram Singh"; Designation = "Associate Professor"; Role = "Faculty Members"; Email = "vikram.singh@iitdh.ac.in"; Domain = "Communication Systems, 5G" }
    @{ Name = "Dr. Ananya Gupta"; Designation = "Assistant Professor"; Role = "Faculty Members"; Email = "ananya.gupta@iitdh.ac.in"; Domain = "Power Electronics, Renewable Energy" }
    @{ Name = "Mr. Suresh Babu"; Designation = "Technical Officer"; Role = "Staff Members"; Email = "suresh.babu@iitdh.ac.in" }
    @{ Name = "Ms. Lakshmi Devi"; Designation = "Administrative Assistant"; Role = "Staff Members"; Email = "lakshmi.devi@iitdh.ac.in" }
    @{ Name = "Rahul Verma"; Designation = "PhD Scholar"; Role = "PHD"; Email = "rahul.phd@iitdh.ac.in"; Domain = "Power Systems" }
    @{ Name = "Meera Krishnan"; Designation = "PhD Scholar"; Role = "PHD"; Email = "meera.phd@iitdh.ac.in"; Domain = "VLSI Design" }
)

foreach ($person in $People) {
    try {
        $body = @{ data = $person } | ConvertTo-Json -Depth 3
        $null = Invoke-RestMethod -Uri "$API/peoples" -Method Post -Body $body -ContentType "application/json"
        Write-Host "  Added: $($person.Name)" -ForegroundColor Green
    } catch {
        Write-Host "  Failed: $($person.Name)" -ForegroundColor Red
    }
}

# ========== NEWS ==========
Write-Host ""
Write-Host "Adding News..." -ForegroundColor Yellow

$News = @(
    @{ Title = "Prof. Rajesh Kumar receives Best Paper Award at IEEE Conference"; Description = "Our Head of Department has been honored with the Best Paper Award at the IEEE International Conference on Power Systems held in Singapore."; Date = "2025-12-01" }
    @{ Title = "EE Department inaugurates new Power Electronics Lab"; Description = "The state-of-the-art Power Electronics Laboratory was inaugurated by the Director featuring advanced equipment for EV and renewable energy research."; Date = "2025-11-15" }
    @{ Title = "Student team wins Smart India Hackathon 2025"; Description = "A team of EE students won first prize at SIH 2025 for their innovative solution on smart grid management using AI/ML techniques."; Date = "2025-11-10" }
    @{ Title = "Workshop on 5G and Beyond Communications"; Description = "The department organized a two-day workshop on next-generation communication systems with participation from industry experts."; Date = "2025-10-25" }
    @{ Title = "New M.Tech program in VLSI Design approved"; Description = "IIT Dharwad has approved a new M.Tech specialization in VLSI Design and Embedded Systems starting from 2026-27."; Date = "2025-10-15" }
)

foreach ($item in $News) {
    try {
        $body = @{ data = $item } | ConvertTo-Json -Depth 3
        $null = Invoke-RestMethod -Uri "$API/newss" -Method Post -Body $body -ContentType "application/json"
        Write-Host "  Added: $($item.Title.Substring(0, [Math]::Min(50, $item.Title.Length)))..." -ForegroundColor Green
    } catch {
        Write-Host "  Failed to add news item" -ForegroundColor Red
    }
}

# ========== RESEARCH LABS ==========
Write-Host ""
Write-Host "Adding Research Labs..." -ForegroundColor Yellow

$Labs = @(
    @{ Name = "Power Electronics and Drives Laboratory"; Type = "Research Lab"; Description = "Research on power converters, motor drives, electric vehicles, and renewable energy integration." }
    @{ Name = "Control Systems Laboratory"; Type = "Research Lab"; Description = "Advanced control theory, robotics, autonomous systems, and industrial automation research." }
    @{ Name = "VLSI Design Laboratory"; Type = "Research Lab"; Description = "Digital and analog IC design, FPGA prototyping, and SoC development." }
    @{ Name = "Signal Processing Laboratory"; Type = "Research Lab"; Description = "Image processing, audio/speech processing, biomedical signal analysis, and ML applications." }
    @{ Name = "Communication Systems Laboratory"; Type = "Research Lab"; Description = "Wireless communications, 5G/6G networks, IoT, and antenna design." }
    @{ Name = "High Voltage Laboratory"; Type = "Teaching Lab"; Description = "High voltage testing, insulation studies, and power system protection." }
)

foreach ($lab in $Labs) {
    try {
        $body = @{ data = $lab } | ConvertTo-Json -Depth 3
        $null = Invoke-RestMethod -Uri "$API/research-labs" -Method Post -Body $body -ContentType "application/json"
        Write-Host "  Added: $($lab.Name)" -ForegroundColor Green
    } catch {
        Write-Host "  Failed: $($lab.Name)" -ForegroundColor Red
    }
}

# ========== RESEARCH PROJECTS ==========
Write-Host ""
Write-Host "Adding Research Projects..." -ForegroundColor Yellow

$Projects = @(
    @{ Title = "Smart Grid Integration of Distributed Renewable Energy Sources"; Area = "Power Systems"; PI = "Dr. Rajesh Kumar"; CoPI = "Dr. Ananya Gupta"; Type = "Sponsored"; Duration = "2024-2027"; CurrentStatus = "Ongoing" }
    @{ Title = "Development of Indigenous 5G Base Station"; Area = "Communication Systems"; PI = "Dr. Vikram Singh"; Type = "Sponsored"; Duration = "2023-2026"; CurrentStatus = "Ongoing" }
    @{ Title = "AI-based Fault Detection in Power Distribution Networks"; Area = "Power Systems"; PI = "Dr. Rajesh Kumar"; Type = "Consultancy"; Duration = "2024-2025"; CurrentStatus = "Ongoing" }
    @{ Title = "Low-Power VLSI Design for IoT Applications"; Area = "VLSI"; PI = "Dr. Amit Patel"; Type = "Sponsored"; Duration = "2023-2026"; CurrentStatus = "Ongoing" }
    @{ Title = "Autonomous Mobile Robot for Warehouse Management"; Area = "Control Systems"; PI = "Dr. Priya Sharma"; Type = "Industry"; Duration = "2024-2025"; CurrentStatus = "Ongoing" }
)

foreach ($project in $Projects) {
    try {
        $body = @{ data = $project } | ConvertTo-Json -Depth 3
        $null = Invoke-RestMethod -Uri "$API/research-projects" -Method Post -Body $body -ContentType "application/json"
        Write-Host "  Added: $($project.Title.Substring(0, [Math]::Min(40, $project.Title.Length)))..." -ForegroundColor Green
    } catch {
        Write-Host "  Failed to add project" -ForegroundColor Red
    }
}

# ========== TALKS AND EVENTS ==========
Write-Host ""
Write-Host "Adding Talks and Events..." -ForegroundColor Yellow

$Events = @(
    @{ Title = "Guest Lecture: Future of Electric Vehicles in India"; Description = "Dr. Arun Mehta from Tata Motors will deliver a talk on EV technology and market trends."; Date = "2025-12-15" }
    @{ Title = "Workshop: FPGA Design using Xilinx Vivado"; Description = "A hands-on workshop on FPGA design and implementation for undergraduate students."; Date = "2025-12-20" }
    @{ Title = "Seminar: 6G Communications - What to Expect"; Description = "An overview of 6G technology, research directions, and potential applications."; Date = "2025-12-22" }
    @{ Title = "Industry Visit: ISRO Satellite Centre"; Description = "A visit to ISRO Satellite Centre, Bengaluru for final year students."; Date = "2026-01-10" }
)

foreach ($event in $Events) {
    try {
        $body = @{ data = $event } | ConvertTo-Json -Depth 3
        $null = Invoke-RestMethod -Uri "$API/talk-and-events" -Method Post -Body $body -ContentType "application/json"
        Write-Host "  Added: $($event.Title.Substring(0, [Math]::Min(40, $event.Title.Length)))..." -ForegroundColor Green
    } catch {
        Write-Host "  Failed to add event" -ForegroundColor Red
    }
}

# ========== DONE ==========
Write-Host ""
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host " SEEDING COMPLETE!" -ForegroundColor Green
Write-Host "=====================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "IMPORTANT: Now go to Strapi Admin and PUBLISH all entries!" -ForegroundColor Yellow
Write-Host "   1. Open: http://localhost:1337/admin" -ForegroundColor White
Write-Host "   2. Go to Content Manager" -ForegroundColor White
Write-Host "   3. For each content type: Select All -> Publish" -ForegroundColor White
Write-Host ""
