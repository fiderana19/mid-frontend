import { FunctionComponent, lazy, Suspense } from "react";
const UserNavigation = lazy(() => import("../../../components/Navigation/UserNavigation"));
import { InfoCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { DatePicker, DatePickerProps, Select } from "antd";
import { getWeekStartAndEnd } from "../../../utils/GetWeek";
import { useNavigate } from "react-router-dom";
import { useCreateRequest } from "@/hooks/useCreateRequest";
import { Controller, useForm } from "react-hook-form";
import { useGetAllRequestByUser } from "@/hooks/useGetAllRequestByUser";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { yupResolver } from "@hookform/resolvers/yup";
import { RequestCreateValidation } from "@/validation/request_create.validation";
import { Input } from "@/components/ui/input";
import dayjs from "dayjs";
import { HttpStatus } from "@/constants/Http_status";

const UserAddDemande: FunctionComponent = () => {
    const { token } = useAuth()
    const { refetch } = useGetAllRequestByUser(token ? JSON.parse(atob(token.split('.')[1])).id : null);
    const { mutateAsync: requestCreate, isPending: isLoading } = useCreateRequest({action() {
        refetch()
    },});
    const { control, handleSubmit: submit, formState: { errors }, setValue } = useForm({
        resolver: yupResolver(RequestCreateValidation)
    });
    const navigate = useNavigate();
      
    const handleDateChange: DatePickerProps['onChange'] = (date) => {
        setValue('date_wanted', date.toString())
    };
      
    const handleRequestSubmit = async (data: any) => {
        const {date_debut, date_end } = getWeekStartAndEnd(data.date_wanted);
        const request = {
            type_request: data.type_request,
            object: data.object,
            date_wanted_debut: date_debut,
            date_wanted_end: date_end
        }
        const response = await requestCreate(request);
        if(response?.status === HttpStatus.OK || response?.status === HttpStatus.CREATED) {
            navigate("/user/demande")    
        }
    }
      
    return(
        <div className="w-full bg-four min-h-screen">
            <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                <UserNavigation />
            </Suspense>
            <form onSubmit={submit(handleRequestSubmit)} className="py-16 sm:px-10 px-4 text-center">
                <div className="font-bold text-2xl mt-10">NOUVELLE DEMANDE D'AUDIENCE</div>
                <div className="mx-auto my-5 p-4 bg-white shadow-md rounded sm:w-80 w-full">
                    <div className='w-60 my-4 mx-auto'>
                        <Label htmlFor="type_demande" className="mt-4 mb-1">Type de la demande</Label>
                        <Controller 
                            control={control}
                            name="type_request"
                            render={({
                                field: { value, onBlur, onChange }
                            }) => (
                                <Select
                                    className={`w-full text-left ${errors.type_request ? "border rounded border-red-500 text-red-500" : ""}`}
                                    placeholder="Selectionner le type de la requête"
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    options={[
                                    {
                                        value: "Demande d'information",
                                        label: "Demande d'information",
                                    },
                                    {
                                        value: 'Requête',
                                        label: 'Requête',
                                    },
                                    {
                                        value: 'Proposition',
                                        label: 'Proposition',
                                    },
                                    ]}
                                />
                            )}
                        />
                        {errors.type_request && <div className="text-xs text-left text-red-500">{ errors.type_request.message }</div>}
                        <Label htmlFor="date_wanted" className="mt-4 mb-1">Date souhaitée</Label>
                        <Controller 
                            control={control}
                            name="date_wanted"
                            render={({
                                field: { value, onBlur }
                            }) => (
                                <DatePicker 
                                    picker="week" 
                                    className={`w-full bg-transparent ${errors.date_wanted ? "border border-red-500 text-red-500 rounded" : ""}`}
                                    placeholder="Selectionner la date souhaitée..."
                                    onChange={handleDateChange} 
                                    onBlur={onBlur}
                                    value={dayjs(value)}
                                />
                            )}
                        />
                        {errors.date_wanted && <div className="text-xs text-left text-red-500">{ errors.date_wanted.message }</div>}
                        <Label htmlFor="object" className="mt-4 mb-1">Motif de la demande</Label>
                        <div className="relative">
                            <Controller 
                                control={control}
                                name="object"
                                render={({
                                    field: { value, onBlur, onChange }
                                }) => (
                                    <Input
                                        className={`w-full text-left pl-10 ${errors.object ? "border border-red-500 text-red-500" : ""}`}
                                        onChange={onChange}
                                        onBlur={onBlur}
                                        value={value}
                                    />
                                )}
                            />
                            <InfoCircleOutlined className='absolute top-1.5 left-1.5 bg-gray-700 text-white p-1.5 rounded text-sm' />
                        </div>
                        {errors.object && <div className="text-xs text-left text-red-500">{ errors.object.message }</div>}  
                        <Button variant={'success'} type="submit" className="mt-4" >
                            {isLoading && <LoadingOutlined className="text-xs" />}
                            SOUMETTRE
                        </Button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default UserAddDemande;