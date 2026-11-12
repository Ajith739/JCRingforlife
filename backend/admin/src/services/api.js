import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { isLocalDemo, localRequest } from "./localDemo.js";
export const localMode = isLocalDemo();
let csrf = "";
export class ApiError extends Error {
    status;
    constructor(message, status) {
        super(message);
        this.status = status;
    }
}
export async function api(path, options = {}) {
    if (localMode)
        return localRequest(path, options);
    const response = await fetch(`/api${path}`, {
        credentials: "same-origin",
        ...options,
        headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrf,
            ...options.headers,
        },
    });
    const data = await response.json().catch(() => ({
        error: "The API is unavailable. Start the server and try again.",
    }));
    if (!response.ok)
        throw new ApiError(data.error || "Request failed", response.status);
    if (path === "/auth/session")
        csrf = data.csrf;
    return data;
}
export function useSession() {
    return useQuery({
        queryKey: ["session"],
        queryFn: () => api("/auth/session"),
        staleTime: 30000,
        retry: false,
    });
}
export function useRecords(entity) {
    return useQuery({
        queryKey: ["records", entity],
        queryFn: () => api(`/admin/data/${entity}`),
        staleTime: 30000,
        retry: false,
    });
}
export function useSave(entity) {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (data) => api(`/admin/data/${entity}${data.id ? `/${data.id}` : ""}`, {
            method: data.id ? "PUT" : "POST",
            body: JSON.stringify(data),
        }),
        onSuccess: () => qc.invalidateQueries({ queryKey: ["records"] }),
    });
}
export const money = (value, currency = "USD") => new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 2,
}).format(value || 0);
export const date = (value) => value
    ? new Intl.DateTimeFormat("en-US", {
        dateStyle: "medium",
        timeZone: "Asia/Kolkata",
    }).format(new Date(value))
    : "—";
export function exportCsv(name, rows) {
    if (!rows.length)
        return false;
    const keys = [...new Set(rows.flatMap(Object.keys))];
    const cell = (v) => {
        let s = typeof v === "object" ? JSON.stringify(v) : String(v ?? "");
        if (/^[=+\-@\t\r]/.test(s))
            s = "'" + s;
        return '"' + s.replaceAll('"', '""') + '"';
    };
    const blob = new Blob([
        "\uFEFF" +
            [
                keys.map(cell).join(","),
                ...rows.map((r) => keys.map((k) => cell(r[k])).join(",")),
            ].join("\r\n"),
    ], { type: "text/csv;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `aion-${name}-${new Date().toISOString().slice(0, 10)}.csv`;
    link.click();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    return true;
}
