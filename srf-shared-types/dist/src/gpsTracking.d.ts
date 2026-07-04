import z from 'zod';
export declare const gpsTrackingSchema: z.ZodObject<{
    id: z.ZodNumber;
    liveAnimalId: z.ZodNumber;
    trackingDeviceId: z.ZodNumber;
    startDate: z.ZodString;
    endDate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    monitoredDays: z.ZodNumber;
    locationPoints: z.ZodNumber;
    livingArea: z.ZodNumber;
    monitoringMethodId: z.ZodNumber;
    rawSpreadsheetLink: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    rawSpreadsheetUpdateDate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    editedSpreadsheetLink: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    editedSpreadsheetUpdateDate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export declare const createGpsTrackingInputSchema: z.ZodObject<{
    liveAnimalId: z.ZodNumber;
    note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    trackingDeviceId: z.ZodNumber;
    startDate: z.ZodString;
    endDate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    monitoredDays: z.ZodNumber;
    locationPoints: z.ZodNumber;
    livingArea: z.ZodNumber;
    monitoringMethodId: z.ZodNumber;
    rawSpreadsheetLink: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    rawSpreadsheetUpdateDate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    editedSpreadsheetLink: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    editedSpreadsheetUpdateDate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export declare const updateGpsTrackingInputSchema: z.ZodObject<{
    liveAnimalId: z.ZodNumber;
    note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    trackingDeviceId: z.ZodNumber;
    startDate: z.ZodString;
    endDate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    monitoredDays: z.ZodNumber;
    locationPoints: z.ZodNumber;
    livingArea: z.ZodNumber;
    monitoringMethodId: z.ZodNumber;
    rawSpreadsheetLink: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    rawSpreadsheetUpdateDate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    editedSpreadsheetLink: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    editedSpreadsheetUpdateDate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
}, z.core.$strip>;
export declare const getAllGpsTrackingOutputSchema: z.ZodObject<{
    id: z.ZodNumber;
    liveAnimalId: z.ZodNumber;
    trackingDeviceId: z.ZodNumber;
    startDate: z.ZodString;
    endDate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    note: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    monitoredDays: z.ZodNumber;
    locationPoints: z.ZodNumber;
    livingArea: z.ZodNumber;
    monitoringMethodId: z.ZodNumber;
    rawSpreadsheetLink: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    rawSpreadsheetUpdateDate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    editedSpreadsheetLink: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    editedSpreadsheetUpdateDate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    canEdit: z.ZodBoolean;
    createdByMe: z.ZodBoolean;
    liveAnimalName: z.ZodString;
    trackingDeviceBrandSerialNumber: z.ZodString;
    lastUpdateDate: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    lastUpdateDateFormatted: z.ZodOptional<z.ZodString>;
    startDateFormatted: z.ZodOptional<z.ZodString>;
    endDateFormatted: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    monitoringMethodDescription: z.ZodString;
    rawSpreadsheetUpdateDateFormatted: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    editedSpreadsheetUpdateDateFormatted: z.ZodOptional<z.ZodNullable<z.ZodString>>;
    withdrawn: z.ZodBoolean;
}, z.core.$strip>;
export declare const getFormOptionsGpsTrackingOutputSchema: z.ZodObject<{
    liveAnimals: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, z.core.$strip>>;
    trackingDevices: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        brand: z.ZodString;
        serialNumber: z.ZodString;
    }, z.core.$strip>>;
    monitoringMethods: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        description: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type GpsTracking = z.infer<typeof gpsTrackingSchema>;
export type CreateGpsTrackingInput = z.infer<typeof createGpsTrackingInputSchema>;
export type UpdateGpsTrackingInput = z.infer<typeof updateGpsTrackingInputSchema>;
export type GetAllGpsTrackingOutput = z.infer<typeof getAllGpsTrackingOutputSchema>;
export type GetFormOptionsGpsTrackingOutput = z.infer<typeof getFormOptionsGpsTrackingOutputSchema>;
//# sourceMappingURL=gpsTracking.d.ts.map