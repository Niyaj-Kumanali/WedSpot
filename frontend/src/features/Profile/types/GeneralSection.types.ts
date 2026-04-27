import type { User } from "@/features/auth";

export interface GeneralSectionProps {
    loading: boolean;
    onSave: (data: User) => Promise<void>;
}
