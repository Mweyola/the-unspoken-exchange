import { createContext, useContext, useState, ReactNode } from "react";

type UserLevel = 1 | 2 | 3;

type User = {
  email: string;
  username: string;
  level: UserLevel;
  phoneVerified: boolean;
  photoUploaded: boolean;
  firstName?: string;
  lastInitial?: string;
  idVerified: boolean;
  reliabilityScore: number;
  buyerReliabilityScore: number;
  buyerReliabilityLabel?: string;
};

export type ReservationStatus = "pending" | "completed" | "expired" | "cancelled" | "no_show";

export type Reservation = {
  listingTitle: string;
  holdHours: number;
  intent: "today" | "later" | "info" | "browsing";
  timeWindow?: string;
  pickupDate?: string;
  status: ReservationStatus;
};

type UserContextValue = {
  user: User;
  setLevel: (level: UserLevel) => void;
  updateUser: (data: Partial<User>) => void;
  adjustReliability: (delta: number) => void;
  adjustBuyerReliability: (delta: number) => void;
  reservation?: Reservation;
  setReservation: (reservation?: Reservation) => void;
  markReservation: (status: ReservationStatus) => void;
};

const UserContext = createContext<UserContextValue | undefined>(undefined);

const defaultUser: User = {
  email: "guest@example.com",
  username: "guest",
  level: 1,
  phoneVerified: false,
  photoUploaded: false,
  idVerified: false,
  reliabilityScore: 92,
  buyerReliabilityScore: 80,
  buyerReliabilityLabel: "Good",
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User>(defaultUser);
  const [reservation, setReservationState] = useState<Reservation | undefined>(undefined);

  const setLevel = (level: UserLevel) => setUser((prev) => ({ ...prev, level }));
  const updateUser = (data: Partial<User>) => setUser((prev) => ({ ...prev, ...data }));
  const adjustReliability = (delta: number) =>
    setUser((prev) => ({
      ...prev,
      reliabilityScore: Math.max(0, Math.min(100, (prev.reliabilityScore ?? 0) + delta)),
    }));
  const adjustBuyerReliability = (delta: number) =>
    setUser((prev) => ({
      ...prev,
      buyerReliabilityScore: Math.max(0, Math.min(100, (prev.buyerReliabilityScore ?? 0) + delta)),
    }));

  const setReservation = (next?: Reservation) => setReservationState(next);

  const markReservation = (status: ReservationStatus) => {
    setReservationState((prev) => (prev ? { ...prev, status } : prev));
    if (status === "completed") adjustReliability(5);
    if (status === "expired") adjustReliability(-1);
    if (status === "no_show") adjustReliability(-10);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        setLevel,
        updateUser,
        adjustReliability,
        adjustBuyerReliability,
        reservation,
        setReservation,
        markReservation,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within UserProvider");
  return ctx;
}
