import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const createSelectOptions = (labels) => {
        if (!Array.isArray(labels)) return [];
        return labels
                .filter((label) => typeof label === "string" && label.trim() !== "")
                .map((label) => ({ label, value: label }));
};

// API disabled - not in use yet (exported to prevent import errors)
export const API_BASE_URL = "http://localhost/content_egg/wp-json/api";

export const checkWaitingStatus = async () => {
    // API disabled - not in use yet
    // const user = JSON.parse(localStorage.getItem("user"));
    // const userId = user ? user.id : 0;
    // try {
    //     const response = await fetch(`${API_BASE_URL}/mission-leave-check?user_id=${userId}`);
    //     const result = await response.json();
    //     return { hasWaiting: result.hasWaiting || false };
    // } catch (error) {
    //     console.error("Error checking waiting status:", error);
    //     return { hasWaiting: false };
    // }
    return { hasWaiting: false }; // Return default value
};


export const formatKhmerNumber = (num) => {
    const khmerDigits = ["០", "១", "២", "៣", "៤", "៥", "៦", "៧", "៨", "៩"];
    return String(num).replace(/\d/g, (digit) => khmerDigits[digit]);
};

export const convertToKhmerMonth = (month) => {
    const khmerMonths = [ 
        "មករា", "កុម្ភៈ", "មីនា", "មេសា", 
        "ឧសភា", "មិថុនា", "កក្កដា", "សីហា", 
        "កញ្ញា", "តុលា", "វិច្ឆិកា", "ធ្នូ" 
    ];
    return khmerMonths[month];
};

export const formatDateKhmer = (dateString) => {
    if (!dateString || dateString.trim() === '') return "";
    const date = new Date(dateString);
    
    const day = formatKhmerNumber(date.getDate());
    const month = convertToKhmerMonth(date.getMonth());
    const year = formatKhmerNumber(date.getFullYear());

    return `${day} ${month} ${year}`;
};