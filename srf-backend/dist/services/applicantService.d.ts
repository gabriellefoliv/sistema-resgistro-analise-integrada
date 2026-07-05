declare class ApplicantService {
    createApplicant(data: any): Promise<{
        name: string;
        id: string;
        email: string;
        message: string | null;
    }>;
    getApplicants(): Promise<{
        name: string;
        id: string;
        email: string;
        date: Date;
        message: string | null;
    }[]>;
    acceptApplicant(id: string): Promise<{
        name: string;
        id: string;
        email: string;
        role: {
            name: string;
        };
    }>;
    rejectApplicant(id: string): Promise<{
        password: string;
        name: string;
        id: string;
        email: string;
        date: Date;
        message: string | null;
    }>;
}
export { ApplicantService };
//# sourceMappingURL=applicantService.d.ts.map