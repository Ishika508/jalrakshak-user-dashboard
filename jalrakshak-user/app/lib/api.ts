const configuredBase = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "");

export const API_BASE = configuredBase && configuredBase.length > 0
	? configuredBase
	: "http://localhost:5000/api";

export const apiUrl = (path: string) => {
	const normalizedPath = path.startsWith("/") ? path : `/${path}`;
	return `${API_BASE}${normalizedPath}`;
};