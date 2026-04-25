"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const STORAGE_KEY = "ag_demo_auth";

export const demoUsers = [
  {
    phone: "0500 000 00 01",
    password: "10001",
    role: "admin",
    redirect: "/admin",
    label: "Admin"
  },
  {
    phone: "0500 000 00 02",
    password: "20001",
    role: "client",
    redirect: "/client",
    label: "Müşteri"
  },
  {
    phone: "0532 001 00 02",
    password: "32001",
    role: "field",
    redirect: "/field",
    label: "Usta / Saha Ekibi"
  }
];

const roleRedirects = {
  admin: "/admin",
  client: "/client",
  field: "/field"
};

function normalizePhone(value) {
  const digits = value.replace(/\D/g, "");
  return digits.startsWith("90") && digits.length === 12 ? `0${digits.slice(2)}` : digits;
}

export function authenticateDemoUser(phone, password) {
  const normalizedPhone = normalizePhone(phone);
  return demoUsers.find(
    (user) => normalizePhone(user.phone) === normalizedPhone && user.password === password
  );
}

export function saveDemoSession(user) {
  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify({
      role: user.role,
      phone: user.phone,
      label: user.label
    })
  );
}

export function getDemoSession() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
  } catch {
    return null;
  }
}

export function clearDemoSession() {
  localStorage.removeItem(STORAGE_KEY);
}

export function getRoleRedirect(role) {
  return roleRedirects[role] || "/login";
}

export function useDemoRoleGuard(requiredRole) {
  const router = useRouter();
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const session = getDemoSession();

    if (!session?.role) {
      router.replace("/login");
      return;
    }

    if (session.role !== requiredRole) {
      router.replace(getRoleRedirect(session.role));
      return;
    }

    setAllowed(true);
  }, [requiredRole, router]);

  return allowed;
}
