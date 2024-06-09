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
        const cleanRut = rut.replace(/[.-]/g, '');

        const dv = cleanRut.slice(-1);
        const rutWithoutDv = cleanRut.slice(0, -1);
        const formattedRut = rutWithoutDv.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    
        return `${formattedRut}-${dv}`;
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
