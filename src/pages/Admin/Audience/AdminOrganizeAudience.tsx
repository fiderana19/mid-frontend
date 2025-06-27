import React, { useState, useEffect, lazy, Suspense } from "react";
import { CheckCircleOutlined, CloseOutlined, EnvironmentOutlined, LoadingOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
const AdminNavigation = lazy(() => import("../../../components/Navigation/AdminNavigation"));
const Header = lazy(() => import("../../../components/Header"));
import dayjs from "dayjs";
import { HttpStatus } from "../../../constants/Http_status";
import { CreateAudienceInterface } from "../../../interfaces/Audience";
import { useGetRequestById } from "@/hooks/useGetRequestById";
import { useGetAllFreeAvailability } from "@/hooks/useGetAllFreeAvailability";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useCreateAudience } from "@/hooks/useCreateAudience";
import { useGetAllAudience } from "@/hooks/useGetAllAudience";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AudienceOrganizeValidation } from "@/validation/audience.validation";
import { useGetAllAvailability } from "@/hooks/useGetAllAvailability";
import RequestStatus from "@/components/status/RequestStatus";

const { Option } = Select;

const AdminOrganizeAudience: React.FC = () => {
    const req = useParams();
    const requestId = req.id;
    const { data: request, isLoading } = useGetRequestById(requestId ? requestId : '');
    const { refetch } = useGetAllAudience();
    const { refetch: refetchAvailability } = useGetAllAvailability();
    const { mutateAsync: audienceCreate, isPending: createLoading } = useCreateAudience({action() {
        refetch();
        refetchAvailability();
        refetchFreeAvailability();
    },});
    const { data: freeAvailability, refetch: refetchFreeAvailability } = useGetAllFreeAvailability();
    const { control, handleSubmit: submit, formState: { errors }, setValue } = useForm<CreateAudienceInterface>({
        resolver: yupResolver(AudienceOrganizeValidation)
    });
    const [availabilities_pref, setAvailabilitiesPref] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => { 
        assignDefaultValue();
        filterAvailability();
    }, [request, freeAvailability])

    async function assignDefaultValue() {
        setValue('request', ((requestId) ? requestId : ''));
        setValue('user', request.user);
    }

    async function filterAvailability() {
        const availability_pref: any = freeAvailability.filter((item: any) => {
            return (
                dayjs(item.date_initial) >= dayjs(request?.debut_initial) && 
                dayjs(item.date_initial) <= dayjs(request?.end_initial)
            )            
        })  
        setAvailabilitiesPref(availability_pref);
    }

    const handleOrganizeSubmit = async (data: CreateAudienceInterface) => {
        const response = await audienceCreate(data);
        if(response?.status === HttpStatus.OK || response?.status === HttpStatus.CREATED) {
            navigate("/admin/audience");
        }    
    }
    
    return(
        <>
            <div className="w-full flex">
                <div className="md:w-52 sm:block hidden">
                    <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                        <AdminNavigation />
                    </Suspense>
                </div>
                <div className="w-full">
                    <div className="z-40 fixed top-0 right-0 w-full">
                        <Suspense fallback={<div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>}>
                            <Header />
                        </Suspense>
                    </div>
                    <div className="">
                        <div className="pl-10 px-5 pt-16 pb-5 w-full">
                            <div className="font-latobold text-lg mb-6">Organiser une audience</div>
                            {
                                isLoading && <div className="flex justify-center text-5xl">
                                    <LoadingOutlined />
                                </div>
                            }
                            {
                                request && availabilities_pref && 
                                    <div>
                                    <div className="gap-2 flex justify-between">
                                        <div className="w-1/4">
                                            <div className=" border pt-6 rounded text-center">
                                                <img src={`data:image/png;base64,${request.profile_photo}`} alt="" className="w-3/4 h-48 object-cover mx-auto border" />
                                                <div className="font-latobold text-lg">{ request.user_nom } { request.user_prenom }</div>
                                                <div className="flex justify-end px-8 py-2">
                                                </div>
                                                <div className="mx-auto w-full bg-gray-200 px-8 py-1">
                                                    <div className="flex gap-4 my-2">
                                                        <EnvironmentOutlined />
                                                        <div>{request.user_cni} </div>
                                                    </div>
                                                    <div className="flex gap-4 my-2">
                                                        <EnvironmentOutlined />
                                                        <div>{request.user_adresse} </div>
                                                    </div>
                                                    <div className="flex gap-4 my-2">
                                                        <MailOutlined />
                                                        <div> {request.user_email} </div>
                                                    </div>
                                                    <div className="flex gap-4 my-2">
                                                        <PhoneOutlined />
                                                        <div>+261 {request.user_telephone} </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-2/4" >
                                            <div className="border rounded p-4">
                                                <div className="mb-3 flex items-center gap-2">
                                                    <div className="text-md font-latobold">
                                                        { request.type_request }
                                                    </div>
                                                    <div >
                                                        <RequestStatus value={request.status_request[0]} />
                                                    </div>
                                                    <div>soumise le <span className="font-latobold"> {request.request_creation}</span></div>
                                                </div>
                                                <div className="text-sm text-gray-500">Motif: </div>
                                                <div className=""> { request.object } </div>
                                            </div>
                                        </div>
                                        <div className="w-1/4">
                                            <div className="border rounded p-5">
                                                <div className="font-latobold text-md mb-3">Préférence</div>
                                                <div className="text-sm text-gray-500">Une audience demandé pour la semaine de :</div>
                                                <div className="flex justify-between items-center">
                                                    <div className="font-latobold"> { request.date_wanted_debut } </div>
                                                    <div className="text-sm text-gray-500">à</div>
                                                    <div className="font-latobold"> { request.date_wanted_end } </div>
                                                </div>
                                            </div>
                                            <form onSubmit={submit(handleOrganizeSubmit)} className="border rounded my-4 p-5">
                                                <div className="font-latobold text-md mb-3">Organisation</div>
                                                <Label className="mb-1 ">Les disponibilités : </Label>
                                                <Controller 
                                                    control={control}
                                                    name="availability"
                                                    render={({
                                                        field: { value, onChange, onBlur }
                                                    }) => (
                                                        <Select
                                                            value={value}
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            showSearch
                                                            placeholder="Sélectionnez un disponibilité"
                                                            className={`w-full text-left ${errors.availability ? "border rounded border-red-500 text-red-500" : ""}`}
                                                            optionFilterProp="children"
                                                            filterOption={(input: any, option: any) =>
                                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                            }
                                                        >
                                                            {
                                                            availabilities_pref && availabilities_pref.map((ava: any, index) => {
                                                                if(availabilities_pref.length < 1 || !availabilities_pref) {
                                                                    return(
                                                                        <Option key={index} value={ava._id}>
                                                                            <div>
                                                                                <CloseOutlined className="" />
                                                                                Pas de disponibilité pour la semaine preféré
                                                                            </div>
                                                                        </Option>
                                                                    )
                                                                } else {
                                                                    return(
                                                                        <Option key={index} value={ava._id}>
                                                                            <div className="flex gap-1">
                                                                                <CheckCircleOutlined className="text-green-500" />
                                                                                { `${ava.date_availability} de ${ava.hour_debut} à ${ava.hour_end}` }
                                                                            </div>
                                                                        </Option>
                                                                    )
                                                                }
                                                            })
                                                            }
                                                        </Select>
                                                    )}
                                                />
                                                {errors.availability && <div className="text-left text-red-500 text-xs">{ errors?.availability?.message }</div>}
                                                <div className="flex justify-end mt-2">
                                                    <Button
                                                        variant={'success'} 
                                                        type="submit"
                                                        disabled={ createLoading ? true : false }
                                                        className={`${createLoading ? 'cursor-not-allowed' : ''}`}
                                                    >   
                                                        { createLoading && <LoadingOutlined className="text-xs" /> }
                                                        <div>Organiser</div>                                                    
                                                    </Button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminOrganizeAudience;