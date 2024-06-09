import { formatValidations } from "./Utils/formatValidation";

export const format = {
    dot: (rut: string): string => {
        formatValidations(rut);
        const [rutWithoutDv, dv] = rut.replace(/\./g, '').split('-');
        const formattedRut = rutWithoutDv.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
        return dv ? `${formattedRut}-${dv}` : formattedRut;
    },    

    dash: (rut: string): string => {
        formatValidations(rut);
        if (!rut.includes('-')) {
            return rut.slice(0, -1) + '-' + rut.slice(-1);
        }
        return rut;
    },

    dotDash: (rut: string): string => {
        formatValidations(rut);
        
        // Eliminar puntos y guiones para trabajar con el RUT limpio
        const cleanRut = rut.replace(/\./g, '').replace(/-/g, '');
    
        // Caso especial para RUTs de dos dígitos
        if (cleanRut.length === 2) {
            return `${cleanRut[0]}-${cleanRut[1]}`;
        }
    
        // Separar el dígito verificador
        const dv = cleanRut.slice(-1);
        const rutWithoutDv = cleanRut.slice(0, -1);
    
        // Formatear el RUT sin dígito verificador
        const formattedRut = rutWithoutDv.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
        // Verificar si el RUT ya está correctamente formateado
        const alreadyFormatted = rut.includes('.') && rut.includes('-');
    
        if (alreadyFormatted) {
            return rut; // No hacer nada si ya está correctamente formateado
        } else if (rut.includes('.')) {
            return `${formattedRut}-${dv}`; // Solo agregar guion si ya tiene puntos
        } else if (rut.includes('-')) {
            return formattedRut + '-' + dv; // Solo agregar puntos si ya tiene guion
        } else {
            return `${formattedRut}-${dv}`; // Agregar ambos si no tiene ni puntos ni guion
        }
    },
    

    notDot: (rut: string): string => {
        formatValidations(rut);
        return rut.replace(/\./g, '');
    },

    notDash: (rut: string): string => {
        formatValidations(rut);
        if (rut.includes('-')) {
            return rut.slice(0, -2);
        }
        return rut;
    },

    notDotDash: (rut: string): string => {
        formatValidations(rut);
        return rut.replace(/\./g, '').replace(/-(\d|k|K)$/i, '');
    }
};
