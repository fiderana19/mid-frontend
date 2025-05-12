import * as yup from 'yup'

export const RequestEditValidation = yup.object({
    type_request: yup.string(),
    date_wanted: yup.string(),
    object: yup.string()
})