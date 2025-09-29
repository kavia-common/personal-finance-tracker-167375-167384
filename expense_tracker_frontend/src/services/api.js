const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "/api";

async function request(path, { method = "GET", body, headers } = {}) {
  const config = {
    method,
    headers: {
      "Content-Type": "application/json",
      ...(headers || {}),
    },
    ...(body ? { body: JSON.stringify(body) } : {}),
  };

  try {
    const res = await fetch(`${API_BASE_URL}${path}`, config);
    const contentType = res.headers.get("content-type") || "";
    const isJSON = contentType.includes("application/json");
    if (!res.ok) {
      const errPayload = isJSON ? await res.json().catch(() => ({})) : { message: await res.text() };
      throw new Error(errPayload.message || `Request failed: ${res.status}`);
    }
    return isJSON ? res.json() : res.text();
  } catch (err) {
    console.error("API error:", err);
    throw err;
  }
}

// PUBLIC_INTERFACE
export const ExpensesAPI = {
  /** List all transactions with optional query params */
  list: async (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/expenses${qs ? `?${qs}` : ""}`);
  },
  /** Create a new expense */
  create: async (payload) => request("/expenses", { method: "POST", body: payload }),
  /** Update an expense by id */
  update: async (id, payload) => request(`/expenses/${id}`, { method: "PUT", body: payload }),
  /** Delete an expense by id */
  remove: async (id) => request(`/expenses/${id}`, { method: "DELETE" }),
  /** Get a single expense by id */
  get: async (id) => request(`/expenses/${id}`),
};

// PUBLIC_INTERFACE
export const CategoriesAPI = {
  /** List all categories */
  list: async () => request("/categories"),
  /** Create a category */
  create: async (payload) => request("/categories", { method: "POST", body: payload }),
  /** Update a category */
  update: async (id, payload) => request(`/categories/${id}`, { method: "PUT", body: payload }),
  /** Delete a category */
  remove: async (id) => request(`/categories/${id}`, { method: "DELETE" }),
};

// PUBLIC_INTERFACE
export const ReportsAPI = {
  /** Summary totals by month/category */
  summary: async (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/reports/summary${qs ? `?${qs}` : ""}`);
  },
  /** Cashflow by period */
  cashflow: async (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/reports/cashflow${qs ? `?${qs}` : ""}`);
  },
  /** Export data */
  exportCSV: async (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/reports/export${qs ? `?${qs}` : ""}`);
  },
};

export default { ExpensesAPI, CategoriesAPI, ReportsAPI };
