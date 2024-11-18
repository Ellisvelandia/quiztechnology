const questionBank = [
    {
        question: "What does CPU stand for?",
        options: [
            "Central Processing Unit",
            "Computer Personal Unit",
            "Central Program Utility",
            "Computer Processing Utility"
        ],
        correct: 0
    },
    {
        question: "Which programming language is known as the 'mother of all programming languages'?",
        options: [
            "Python",
            "Java",
            "Assembly",
            "FORTRAN"
        ],
        correct: 2
    },
    {
        question: "What is the purpose of RAM in a computer?",
        options: [
            "Long-term storage",
            "Temporary memory for active programs",
            "Processing calculations",
            "Cooling the system"
        ],
        correct: 1
    },
    {
        question: "Which protocol is used for secure internet browsing?",
        options: [
            "HTTP",
            "FTP",
            "HTTPS",
            "SMTP"
        ],
        correct: 2
    },
    {
        question: "What does HTML stand for?",
        options: [
            "Hyper Text Markup Language",
            "High Technical Modern Language",
            "Hyper Transfer Markup Language",
            "High Text Machine Language"
        ],
        correct: 0
    },
    {
        question: "Which company developed the Android operating system?",
        options: [
            "Apple",
            "Microsoft",
            "Google",
            "Samsung"
        ],
        correct: 2
    },
    {
        question: "What is the smallest unit of digital information?",
        options: [
            "Byte",
            "Bit",
            "Megabyte",
            "Kilobyte"
        ],
        correct: 1
    },
    {
        question: "Which of these is not a programming paradigm?",
        options: [
            "Object-Oriented",
            "Functional",
            "Declarative",
            "Systematic"
        ],
        correct: 3
    },
    {
        question: "What is the main function of an operating system?",
        options: [
            "Run applications",
            "Manage hardware resources",
            "Store data",
            "Connect to the internet"
        ],
        correct: 1
    },
    {
        question: "Which technology is used for wireless communication over short distances?",
        options: [
            "Wi-Fi",
            "Bluetooth",
            "5G",
            "Ethernet"
        ],
        correct: 1
    },
    // Adding more questions to reach 100...
    {
        question: "What is the purpose of a firewall?",
        options: [
            "Speed up internet connection",
            "Monitor network traffic for security",
            "Store website data",
            "Compress files"
        ],
        correct: 1
    },
    // ... Add more questions here to reach 100
];

// Function to get random questions
function getRandomQuestions(count) {
    const shuffled = [...questionBank].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}
