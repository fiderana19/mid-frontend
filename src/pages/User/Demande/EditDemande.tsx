import { FunctionComponent, lazy, Suspense, useState } from "react";
const UserNavigation = lazy(() => import("../../../components/Navigation/UserNavigation"));
import { InfoCircleOutlined, LoadingOutlined } from "@ant-design/icons";
import { DatePicker, DatePickerProps, Select } from "antd";
import { getWeekStartAndEnd } from '../../../utils/GetWeek';
import { useNavigate, useParams } from "react-router-dom";
import { HttpStatus } from "../../../constants/Http_status";
import { useGetRequestById } from "@/hooks/useGetRequestById";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import dayjs from "dayjs";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { RequestEditValidation } from "@/validation/request_edit.validation";
import { usePatchRequest } from "@/hooks/usePatchRequest";
import { useGetAllRequestByUser } from "@/hooks/useGetAllRequestByUser";
import { useAuth } from "@/context/AuthContext";
import RequestStatus from "@/components/status/RequestStatus";

const UserEditDemande: FunctionComponent = () => {
    const { token } = useAuth();
    let req = useParams();
    let requestId = req.id;
    const { data: request, isLoading } = useGetRequestById(requestId ? requestId : '');
    const { refetch } = useGetAllRequestByUser(token ? JSON.parse(atob(token.split('.')[1])).id : null);
    const { mutateAsync: requestEdit, isPending: isApiLoading } = usePatchRequest({
        action() {
            refetch()
        },
    });
    const { control, handleSubmit: submit,  formState: { errors }, setValue } = useForm({
            resolver: yupResolver(RequestEditValidation)
    });
    const [isTouchedDate, setIsTouchedDate] = useState<boolean>(false)
    const navigate = useNavigate();

    const handleDateChange: DatePickerProps['onChange'] = (date) => {
        setValue('date_wanted', date.toString())
        setIsTouchedDate(true)
    };
      
    const handleRequestSubmit = async (data: any) => {
        if(isTouchedDate) {
            const {date_debut, date_end } = getWeekStartAndEnd(data.date_wanted);
            const request = {
                _id: requestId,
                type_request: data.type_request,
                object: data.object,
                date_wanted_debut: date_debut,
                date_wanted_end: date_end
            }
    
            const response = await requestEdit(request);
            if(response?.status === HttpStatus.OK || response?.status === HttpStatus.CREATED) {
                navigate("/user/demande");
            }  
        } else {
            const request = {
                _id: requestId,
                type_request: data.type_request,
                object: data.object,
            }
    
            const response = await requestEdit(request);
            if(response?.status === HttpStatus.OK || response?.status === HttpStatus.CREATED) {
                navigate("/user/demande");
            }  
        }        
    }
      

    return(
        <div className="w-full bg-four min-h-screen">
            <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                <UserNavigation />
            </Suspense>
            <form onSubmit={submit(handleRequestSubmit)} className="py-16 sm:px-10 px-4 text-center z-0">
                <div className="font-latobold text-2xl mt-10">MODIFIER UNE DEMANDE </div>
                {
                    request &&
                    <div className="mx-auto my-5 p-4 bg-white shadow-md rounded sm:w-80 w-full">
                        <div className="flex w-60 items-center gap-2 pt-4">
                            <img src={`data:image/png;base64,${request.profile_photo}`} alt="" className="w-12 h-12 rounded-full object-cover border" />
                            <div className="">
                                <span>Soumise le </span>
                                <span className="font-latobold">
                                    { request.request_creation }
                                </span>
                                <RequestStatus value={request?.status_request} />
                            </div>
                        </div>
                        <Label htmlFor="type_demande" className="mt-4 mb-1">Type de la demande</Label>
                        <Controller 
                            control={control}
                            name="type_request"
                            defaultValue={request.type_request.toString()}
                            render={({
                                field: { value, onBlur, onChange }
                            }) => (
                                <Select
                                    className={`w-full text-left  ${errors.type_request ? "border rounded border-red-500 text-red-500" : ""}`}
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
                                defaultValue={request.object}
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
                        <Button variant={'primary'} type="submit" className="mt-4" >
                            {isApiLoading && <LoadingOutlined className="text-xs" />}
                            MODIFIER
                        </Button>
                    </div>
                }
                {isLoading && <div className="my-4 max-w-max mx-auto"> <LoadingOutlined className="text-5xl" /></div>}
            </form>
        </div>
    )
}

export default UserEditDemande;