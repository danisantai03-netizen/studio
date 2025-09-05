
type MockUser = {
  id: string;
  name: string;
  email: string;      // stored lowercase
  password: string;   // PLAIN for dev mock only
  referralCode?: string;
};

const KEY = "mock_users_v1";

function load(): MockUser[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return seed();
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : seed();
  } catch {
    return seed();
  }
}

function save(users: MockUser[]) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(users));
}

// Seed with one default account for quick testing
function seed(): MockUser[] {
  const users: MockUser[] = [
    {
      id: "u_001",
      name: "Alex Green",
      email: "user@example.com",
      password: "Password123",
      referralCode: "REF123"
    }
  ];
  save(users);
  return users;
}

function sanitizeEmail(email: string) {
  return (email || "").trim().toLowerCase();
}

export function getUsers(): MockUser[] {
  return load();
}

export function addUser(u: Omit<MockUser, "id"> & { id?: string }): MockUser {
  const users = load();
  const email = sanitizeEmail(u.email);
  if (users.some(x => x.email === email)) {
    throw new Error("An account with this email already exists.");
  }
  const user: MockUser = {
    id: u.id ?? `u_${Date.now()}`,
    name: u.name.trim(),
    email,
    password: u.password,
    referralCode: u.referralCode
  };
  users.push(user);
  save(users);
  return user;
}

export function findByCredentials(email: string, password: string): MockUser | null {
  const users = load();
  const e = sanitizeEmail(email);
  const p = (password || "").trim();
  const user = users.find(u => u.email === e);
  if (user && user.password === p) {
    return user;
  }
  return null;
}
