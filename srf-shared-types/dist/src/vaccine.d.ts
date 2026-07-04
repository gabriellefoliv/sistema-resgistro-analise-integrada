import z from 'zod';
export declare const vaccineSchema: z.ZodObject<{
    id: z.ZodNumber;
    liveAnimalId: z.ZodNumber;
    vaccineId: z.ZodNumber;
    applicationDate: z.ZodString;
    veterinarianVisitId: z.ZodOptional<z.ZodNumber>;
    vaccineTypeId: z.ZodNumber;
}, z.core.$strip>;
export declare const createVaccineInputSchema: z.ZodObject<{
    liveAnimalId: z.ZodNumber;
    veterinarianVisitId: z.ZodOptional<z.ZodNumber>;
    vaccineId: z.ZodNumber;
    applicationDate: z.ZodString;
    vaccineTypeId: z.ZodNumber;
}, z.core.$strip>;
export declare const updateVaccineInputSchema: z.ZodObject<{
    liveAnimalId: z.ZodNumber;
    veterinarianVisitId: z.ZodOptional<z.ZodNumber>;
    vaccineId: z.ZodNumber;
    applicationDate: z.ZodString;
    vaccineTypeId: z.ZodNumber;
}, z.core.$strip>;
export declare const getAllVaccineOutputSchema: z.ZodObject<{
    id: z.ZodNumber;
    liveAnimalId: z.ZodNumber;
    vaccineId: z.ZodNumber;
    applicationDate: z.ZodString;
    vaccineTypeId: z.ZodNumber;
    canEdit: z.ZodBoolean;
    createdByMe: z.ZodBoolean;
    liveAnimalName: z.ZodString;
    vaccineName: z.ZodString;
    vaccineTypeName: z.ZodString;
    veterinarianVisitId: z.ZodOptional<z.ZodNumber>;
    veterinarianName: z.ZodOptional<z.ZodString>;
    veterinarianVisitDate: z.ZodOptional<z.ZodString>;
    veterinarianVisitDateFormatted: z.ZodOptional<z.ZodString>;
    applicationDateFormatted: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export declare const getFormOptionsVaccineOutputSchema: z.ZodObject<{
    liveAnimals: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, z.core.$strip>>;
    veterinarianVisits: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        date: z.ZodString;
        liveAnimal: z.ZodObject<{
            id: z.ZodNumber;
            name: z.ZodString;
        }, z.core.$strip>;
        veterinarian: z.ZodObject<{
            id: z.ZodNumber;
            name: z.ZodString;
        }, z.core.$strip>;
    }, z.core.$strip>>;
    vaccines: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, z.core.$strip>>;
    vaccineTypes: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export type Vaccine = z.infer<typeof vaccineSchema>;
export type CreateVaccineInput = z.infer<typeof createVaccineInputSchema>;
export type UpdateVaccineInput = z.infer<typeof updateVaccineInputSchema>;
export type GetAllVaccineOutput = z.infer<typeof getAllVaccineOutputSchema>;
export type GetFormOptionsVaccineOutput = z.infer<typeof getFormOptionsVaccineOutputSchema>;
//# sourceMappingURL=vaccine.d.ts.map