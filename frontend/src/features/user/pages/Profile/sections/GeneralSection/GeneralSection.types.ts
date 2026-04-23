import type { UserProfile } from "../../../../api/userService";

export interface GeneralSectionProps {
    user: UserProfile | null;
    loading: boolean;
    onSave: (data: { name: string; phoneNumber: string; location: string }) => Promise<void>;
}
