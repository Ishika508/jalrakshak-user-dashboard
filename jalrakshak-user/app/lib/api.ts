const getApiBase = () => {
  // In production on Vercel/browser, avoid localhost
  if (typeof window !== 'undefined') {
    const configured = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "");
    if (configured && configured.length > 0) {
      return configured;
    }
    // Fallback: assume backend is on same domain or use relative path
    return "";
  }
  // Server-side (build time)
  const configured = process.env.NEXT_PUBLIC_API_BASE_URL?.replace(/\/+$/, "");
  return configured && configured.length > 0 ? configured : "http://localhost:5000/api";
};

export const API_BASE = getApiBase();

export const apiUrl = (path: string) => {
	const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const base = API_BASE;
  
  // If base is empty (client-side with no env var), try to use the current origin
  if (typeof window !== 'undefined' && !base) {
    // In production, the backend should be accessible via a proxy or external URL
    // For now, return path for relative API calls
    console.warn(
      "NEXT_PUBLIC_API_BASE_URL not set. Backend API must be accessible from current origin or set NEXT_PUBLIC_API_BASE_URL environment variable.",
      `Attempting to fetch: /api${normalizedPath}`
    );
    return `/api${normalizedPath}`;
  }
  
  return `${base}${normalizedPath}`;
};