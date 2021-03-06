export type User = {
    id: string;
    login: string;
    password: string;
    age: number;
    isDeleted: boolean;
}

export type Permission = 'READ' | 'WRITE' | 'DELETE' | 'SHARE' | 'UPLOAD_FILES';

export type GroupType = {
    id: string;
    name: string;
    permissions: Permission[]
}
