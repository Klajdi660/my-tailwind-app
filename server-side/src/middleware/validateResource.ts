import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";
import { log } from "../utils";

export const validateResource = 
    (schema: AnyZodObject) => 
    (req: Request, res: Response, next: NextFunction ) => {
        try {
            schema.parse({
                body: req.body,
                query: req.query,
                params: req.params
            });
        
            next();
        } catch (e: any) {
            if (e instanceof ZodError) {
                log.error(`${JSON.stringify({ action: "validateResource catch", data: e.errors })}`);
                return res.json({ error: true, message: e.errors[0].message });
            }

            next({ error: true, message: e.errors[0].message });
        }
    };
