// js/data.js

// Initialize Shared System Collections
const defaultStats = {
    totalDonations: 48500,
    totalUsers: 142,
    totalVolunteers: 68,
    totalEvents: 24,
    mealsDistributed: 12500,
    treesPlanted: 3400
};

const defaultCampaigns = [
    { id: "c1", title: "Food Distribution Drive", raised: 18500, target: 25000, category: "Food" },
    { id: "c2", title: "Women Skill Development Center", raised: 15000, target: 20000, category: "Women Empowerment" },
    { id: "c3", title: "Child Education & Healthcare Fund", raised: 10000, target: 15000, category: "Child Welfare" },
    { id: "c4", title: "Urban Afforestation Initiative", raised: 5000, target: 10000, category: "Environmental Initiatives" }
];

const defaultEvents = [
    { id: "e1", title: "Weekend Mega Feed", date: "2026-07-12", time: "09:00 AM", location: "Community Center Hall A", status: "Upcoming" },
    { id: "e2", title: "Eco-Plantation Drive", date: "2026-07-28", time: "07:30 AM", location: "North City Reserve Park", status: "Upcoming" },
    { id: "e3", title: "Women's Literacy Seminar", date: "2026-08-05", time: "11:00 AM", location: "YourHope Training Hub", status: "Upcoming" }
];

// Seed to Storage utility function
function seedDatabase() {
    if (!localStorage.getItem('yh_stats')) localStorage.setItem('yh_stats', JSON.stringify(defaultStats));
    if (!localStorage.getItem('yh_campaigns')) localStorage.setItem('yh_campaigns', JSON.stringify(defaultCampaigns));
    if (!localStorage.getItem('yh_events')) localStorage.setItem('yh_events', JSON.stringify(defaultEvents));
    
    if (!localStorage.getItem('yh_donations')) {
        localStorage.setItem('yh_donations', JSON.stringify([
            { id: "D-9981", donor: "John Doe", amount: 250, campaign: "Food Distribution Drive", date: "2026-06-15" },
            { id: "D-9982", donor: "Jane Smith", amount: 500, campaign: "Child Education & Healthcare Fund", date: "2026-06-18" }
        ]));
    }
    if (!localStorage.getItem('yh_volunteers')) {
        localStorage.setItem('yh_volunteers', JSON.stringify([
            { id: "V-101", name: "Alice Green", email: "alice@example.com", program: "Environmental Initiatives", status: "Approved" }
        ]));
    }
    if (!localStorage.getItem('yh_contacts')) {
        localStorage.setItem('yh_contacts', JSON.stringify([
            { name: "Robert Hill", email: "robert@mail.com", msg: "Interested in Corporate CSR Partnership opportunities.", date: "2026-06-22" }
        ]));
    }
}

// Run bootstrapping execution
seedDatabase();

// Global Helper Accessors
function getStats() { return JSON.parse(localStorage.getItem('yh_stats')); }
function updateStats(newStats) { localStorage.setItem('yh_stats', JSON.stringify(newStats)); }
function getCampaigns() { return JSON.parse(localStorage.getItem('yh_campaigns')); }
function getEvents() { return JSON.parse(localStorage.getItem('yh_events')); }
function getDonations() { return JSON.parse(localStorage.getItem('yh_donations')); }
function getVolunteers() { return JSON.parse(localStorage.getItem('yh_volunteers')); }
function getContacts() { return JSON.parse(localStorage.getItem('yh_contacts')); }