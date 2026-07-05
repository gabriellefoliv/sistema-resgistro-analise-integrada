import { type GetAllGpsTrackingOutput, type GetFormOptionsGpsTrackingOutput, type CreateGpsTrackingInput, type UpdateGpsTrackingInput } from "srf-shared-types";
export declare class GpsTrackingService {
    private auditService;
    private formId;
    getAll(requesterId: string): Promise<GetAllGpsTrackingOutput[]>;
    getFormOptions(): Promise<GetFormOptionsGpsTrackingOutput>;
    create(data: CreateGpsTrackingInput, requesterId: string): Promise<{
        id: number;
        liveAnimalId: number;
        note: string | null;
        trackingDeviceId: number;
        startDate: Date;
        endDate: Date | null;
        monitoredDays: number;
        locationPoints: number;
        livingArea: number;
        monitoringMethodId: number;
        rawSpreadsheetLink: string | null;
        rawSpreadsheetUpdateDate: Date | null;
        editedSpreadsheetLink: string | null;
        editedSpreadsheetUpdateDate: Date | null;
    }>;
    update(recordId: number, data: UpdateGpsTrackingInput, requesterId: string): Promise<{
        id: number;
        liveAnimalId: number;
        note: string | null;
        trackingDeviceId: number;
        startDate: Date;
        endDate: Date | null;
        monitoredDays: number;
        locationPoints: number;
        livingArea: number;
        monitoringMethodId: number;
        rawSpreadsheetLink: string | null;
        rawSpreadsheetUpdateDate: Date | null;
        editedSpreadsheetLink: string | null;
        editedSpreadsheetUpdateDate: Date | null;
    }>;
    delete(recordId: number, requesterId: string): Promise<{
        message: string;
    }>;
}
//# sourceMappingURL=gpsTrackingService.d.ts.map