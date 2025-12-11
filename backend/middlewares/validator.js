export const validateSchema = (schema) => (req, res, next) => {
    // 1. Usamos safeParse en lugar de parse
    const result = schema.safeParse(req.body);

    // 2. Si la validación falla (success es false)
    if (!result.success) {

        // --- DEBUGGING ---
        /*
        console.log("Validation Failed!");
        console.log("Result object:", result); 
        console.log("Error object:", result.error); 
        */
        // -----------------
        // result.error contiene el ZodError con los detalles
        const formattedErrors = result.error.issues.map(issue => ({
            field: issue.path.join("."),
            message: issue.message
        }));

        return res.status(400).json({
            message: "Error de validación",
            errors: formattedErrors
        });

    }

    // 3. Opcional pero recomendado:
    // Reemplazamos req.body con los datos ya "limpios" y tipeados que devuelve Zod.
    // Esto elimina cualquier campo extra que el usuario haya enviado y no esté en el esquema.
    req.body = result.data;

    next();
};

