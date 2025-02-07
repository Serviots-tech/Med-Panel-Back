import { Role } from '@prisma/client';
import { createUser, findUserByEmail } from '../Repositories/userRepository';
import { CustomError } from '../utils/customError';
import { hashPassword } from '../helpers/passwordHelper';
import { createDoseForm, deleteDoseForm, getAllDoseForm, updateDoseForm, updateDoseFormByName, validateDoseFormById, validateDoseFormByName } from '../Repositories/doseFormRepository';

export const createDoseFormService = async (data: { name:string,createdBy:string}) => {

    // check email already exits
    const isDoseFormExist= await validateDoseFormByName(data?.name)

    if(isDoseFormExist && !isDoseFormExist?.isDeleted){
        throw new CustomError("Dose with same nam already exits",400)
    }
    let doseForm;

    if(isDoseFormExist?.isDeleted){
         doseForm= await updateDoseFormByName(data)

    }else{
        const doseForm = await createDoseForm(data)

    }


    return { data:doseForm,message:"Dose form created successfully" }

};
export const getAllDoseFormService = async (page:number,limit:number) => {

    const doseForm = await getAllDoseForm(page,limit)


    return { data:doseForm,message:"Fetch all dose form successfully" }

};


export const updateDoseFormService = async (data: { id:string,name:string,createdBy:string}) => {

    const isDoseFormExist= await validateDoseFormById(data?.id)

    if(!isDoseFormExist){
        throw new CustomError("No dose form found",404)
    }

    // check name already exits
    const isDoseFormExistWithSameName= await validateDoseFormByName(data?.name)

    if(isDoseFormExistWithSameName){
        throw new CustomError("Dose with same nam already exits",400)
    }

    const doseForm = await updateDoseForm(data)


    return { data:doseForm,message:"Dose form updated successfully" }

};

export const deleteDoseFormService = async (doseFormId:string) => {

    // check email already exits
    const isDoseFormExist= await validateDoseFormById(doseFormId)

    if(!isDoseFormExist){
        throw new CustomError("Dose form not dound",400)
    }

    if(isDoseFormExist?.Medicine.length){
        throw new CustomError("Dose form is assign to some medicine,can not delete",400)
    }

    const doseForm = await deleteDoseForm(doseFormId)


    return { data:doseForm,message:"Dose form created successfully" }

};