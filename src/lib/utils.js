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

const normalizeWorkflowApiBaseUrl = (apiBaseUrl = '') => {
    const rawApi = apiBaseUrl || import.meta.env.VITE_API_SERVER || import.meta.env.VITE_API_BASE_URL || '';
    return String(rawApi).replace(/\/api\/authcenter$/i, '').replace(/\/$/, '');
};

/** Normalize storage paths/URLs for the Vite dev proxy (avoids APP_URL port mismatches). */
export const resolveStorageAssetUrl = (value, apiBaseUrl = '') => {
    const source = typeof value === 'string' ? value.trim() : '';

    if (!source) {
        return '';
    }

    if (source.startsWith('data:') || source.startsWith('blob:')) {
        return source;
    }

    if (source.startsWith('http://') || source.startsWith('https://')) {
        try {
            const url = new URL(source);

            if (url.pathname.startsWith('/storage/')) {
                return `${url.pathname}${url.search}${url.hash}`;
            }

            return source;
        } catch {
            return source;
        }
    }

    if (source.startsWith('/storage/')) {
        return source;
    }

    if (source.startsWith('storage/')) {
        return `/${source}`;
    }

    if (source.startsWith('/')) {
        const normalizedApi = normalizeWorkflowApiBaseUrl(apiBaseUrl);
        return normalizedApi ? `${normalizedApi}${source}` : source;
    }

    return `/storage/${source.replace(/^storage\//, '')}`;
};

export const resolveWorkflowAvatarUrl = (user = {}, apiBaseUrl = '') => {
    const source = typeof user?.avatar_url === 'string' ? user.avatar_url.trim() : '';

    if (!source) {
        return '';
    }

    if (
        source.startsWith('http://')
        || source.startsWith('https://')
        || source.startsWith('data:')
        || source.startsWith('blob:')
    ) {
        return source;
    }

    const normalizedApi = normalizeWorkflowApiBaseUrl(apiBaseUrl);

    if (source.startsWith('/storage/') || source.startsWith('/uploads/') || source.startsWith('/')) {
        return `${normalizedApi}${source}`;
    }

    return `${normalizedApi}/storage/${source.replace(/^storage\//, '')}`;
};

export const getWorkflowAvatarFallback = (name = '') => {
    const label = String(name || '').trim() || 'User';

    return `https://ui-avatars.com/api/?name=${encodeURIComponent(label)}&background=e5e7eb&color=111827`;
};