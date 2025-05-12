import * as yup from 'yup'

export const RequestCreateValidation = yup.object({
    type_request: yup.string().required("Type de la demande requis !"),
    date_wanted: yup.string().required("Date preferé de la demande requis !"),
    object: yup.string().required("Motif de la demande requis !")
})