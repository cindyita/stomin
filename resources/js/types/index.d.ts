export interface User {
    id: number;
    name: string;
    biography: string | null;
    email: string;
    email_verified_at?: string;
}

export interface AccountType {
    id: number;
    name: string;
    total_storage: number;
    total_files: number | null;
    max_size_files: number;
    max_level_files: number;
    total_trash: number | null;
    can_share_open: number;
    can_share_private: number;
    created_at: string;
    updated_at: string | null;
}

export interface DataAccount {
    id: number;
    id_user: number;
    id_role: number;
    type_account: number;
    created_at: string;
    updated_at: string | null;
    account_type: AccountType;
}

export interface File {
    name: string;
}

export interface typeFilesData {
    name: string;
    extension: string;
    type_mime: string;
    id_type_level: number;
}

export type PageProps<
    T extends Record<string, unknown> = Record<string, unknown>,
> = T & {
    user?: User;
    dataAccount?: DataAccount;
    file?: File;
    typeFiles?: string[];
};

