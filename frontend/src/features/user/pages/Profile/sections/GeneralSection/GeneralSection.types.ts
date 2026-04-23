import type { UserProfile } from "@/features/user/api/user.api";

export interface GeneralSectionProps {
    user: UserProfile | null;
    loading: boolean;
    onSave: (data: { name: string; phoneNumber: string; location: string }) => Promise<void>;
}
