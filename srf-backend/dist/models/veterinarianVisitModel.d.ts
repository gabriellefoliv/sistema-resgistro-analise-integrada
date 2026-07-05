import z from "zod";
export declare const veterinarianVisitCreateInput: z.ZodObject<{
    liveAnimalId: z.ZodNumber;
    veterinarianId: z.ZodNumber;
    date: z.ZodString;
    animalPicture: z.ZodOptional<z.ZodString>;
    note: z.ZodOptional<z.ZodString>;
    bodyMeasurements: z.ZodOptional<z.ZodArray<z.ZodObject<{
        bodyMeasurementTypeId: z.ZodNumber;
        value: z.ZodNumber;
    }, z.core.$strip>>>;
}, z.core.$strip>;
export declare const veterinarianVisitUpdateInput: z.ZodObject<{
    liveAnimalId: z.ZodNumber;
    veterinarianId: z.ZodNumber;
    date: z.ZodString;
    animalPicture: z.ZodOptional<z.ZodString>;
    note: z.ZodOptional<z.ZodString>;
    bodyMeasurements: z.ZodOptional<z.ZodArray<z.ZodObject<{
        bodyMeasurementTypeId: z.ZodNumber;
        value: z.ZodNumber;
    }, z.core.$strip>>>;
}, z.core.$strip>;
//# sourceMappingURL=veterinarianVisitModel.d.ts.map