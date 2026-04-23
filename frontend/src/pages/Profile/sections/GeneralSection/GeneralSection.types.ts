import type { UserProfile } from "../../../../api/services/user";

export interface GeneralSectionProps {
    user: UserProfile | null;
    loading: boolean;
    onSave: (data: { name: string; phoneNumber: string; location: string }) => Promise<void>;
}
