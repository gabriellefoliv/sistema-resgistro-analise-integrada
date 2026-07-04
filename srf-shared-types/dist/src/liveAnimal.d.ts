import z from 'zod';
export declare const getAllLiveAnimalOutputSchema: z.ZodObject<{
    id: z.ZodNumber;
    createdByMe: z.ZodBoolean;
    canEdit: z.ZodBoolean;
    specieId: z.ZodNumber;
    specieName: z.ZodString;
    name: z.ZodString;
    genderId: z.ZodNumber;
    genderName: z.ZodString;
    birthDate: z.ZodString;
    birthDateFormatted: z.ZodOptional<z.ZodString>;
    active: z.ZodBoolean;
    activeFormatted: z.ZodOptional<z.ZodString>;
    animalPicture: z.ZodOptional<z.ZodString>;
    cardLink: z.ZodOptional<z.ZodString>;
    tutorId: z.ZodNumber;
    tutorName: z.ZodString;
    hasGpsTracking: z.ZodBoolean;
    hasCastration: z.ZodBoolean;
    hasVeterinarianVisit: z.ZodBoolean;
    hasVaccineApplication: z.ZodBoolean;
    hasAnimalInterview: z.ZodBoolean;
}, z.core.$strip>;
export declare const getFormOptionsAnimalOutputSchema: z.ZodObject<{
    species: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, z.core.$strip>>;
    genders: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, z.core.$strip>>;
    tutors: z.ZodArray<z.ZodObject<{
        id: z.ZodNumber;
        name: z.ZodString;
    }, z.core.$strip>>;
}, z.core.$strip>;
export declare const createLiveAnimalInputSchema: z.ZodObject<{
    specieId: z.ZodNumber;
    name: z.ZodString;
    genderId: z.ZodNumber;
    birthDate: z.ZodString;
    active: z.ZodBoolean;
    animalPicture: z.ZodOptional<z.ZodString>;
    cardLink: z.ZodOptional<z.ZodString>;
    tutorId: z.ZodNumber;
}, z.core.$strip>;
export declare const updateLiveAnimalInputSchema: z.ZodObject<{
    specieId: z.ZodNumber;
    name: z.ZodString;
    genderId: z.ZodNumber;
    birthDate: z.ZodString;
    active: z.ZodBoolean;
    animalPicture: z.ZodOptional<z.ZodString>;
    cardLink: z.ZodOptional<z.ZodString>;
    tutorId: z.ZodNumber;
}, z.core.$strip>;
export type GetAllLiveAnimalOutput = z.infer<typeof getAllLiveAnimalOutputSchema>;
export type GetFormOptionsAnimalOutput = z.infer<typeof getFormOptionsAnimalOutputSchema>;
export type CreateLiveAnimalInput = z.infer<typeof createLiveAnimalInputSchema>;
export type UpdateLiveAnimalInput = z.infer<typeof updateLiveAnimalInputSchema>;
//# sourceMappingURL=liveAnimal.d.ts.map