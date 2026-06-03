export type UserRole = "buyer" | "seller";

export type LocalAccount = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: string;
};

const ACCOUNT_STORAGE_KEY = "unfilteredqa_account";

export function getAccount(): LocalAccount | null {
  if (typeof window === "undefined") return null;

  const rawAccount = window.localStorage.getItem(ACCOUNT_STORAGE_KEY);
  if (!rawAccount) return null;

  try {
    return JSON.parse(rawAccount) as LocalAccount;
  } catch {
    window.localStorage.removeItem(ACCOUNT_STORAGE_KEY);
    return null;
  }
}

export function createAccount(input: {
  name: string;
  email: string;
  role: UserRole;
}): LocalAccount {
  const account: LocalAccount = {
    id: crypto.randomUUID(),
    name: input.name.trim(),
    email: input.email.trim().toLowerCase(),
    role: input.role,
    createdAt: new Date().toISOString(),
  };

  window.localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(account));
  window.dispatchEvent(new Event("account-updated"));
  return account;
}

export function updateAccountRole(role: UserRole): LocalAccount | null {
  const account = getAccount();
  if (!account) return null;

  const updatedAccount = { ...account, role };
  window.localStorage.setItem(ACCOUNT_STORAGE_KEY, JSON.stringify(updatedAccount));
  window.dispatchEvent(new Event("account-updated"));
  return updatedAccount;
}

export function signOut(): void {
  window.localStorage.removeItem(ACCOUNT_STORAGE_KEY);
  window.dispatchEvent(new Event("account-updated"));
}
