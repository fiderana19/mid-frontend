import React, { useState, useEffect, lazy, Suspense } from "react";
import { CheckCircleOutlined, CloseOutlined, EnvironmentOutlined, LoadingOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { useNavigate, useParams } from "react-router-dom";
const AdminNavigation = lazy(() => import("../../../components/Navigation/AdminNavigation"));
const Header = lazy(() => import("../../../components/Header"));
import dayjs from "dayjs";
import { Select } from "antd";
import { HttpStatus } from "../../../constants/Http_status";
import { ReportAudienceInterface } from "../../../interfaces/Audience";
import { useGetAudienceById } from "@/hooks/useGetAudienceById";
import { useGetAllFreeAvailability } from "@/hooks/useGetAllFreeAvailability";
import Status from "@/components/status/Status";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Controller, useForm } from "react-hook-form";
import { useReportAudience } from "@/hooks/useReportAudience";
import { useGetAllAudience } from "@/hooks/useGetAllAudience";
import { yupResolver } from "@hookform/resolvers/yup";
import { AudienceReportValidation } from "@/validation/audience.validation";
const { Option } = Select;

const AdminAudienceReport: React.FC = () => {
    const req = useParams();
    const audienceId = req.id;
    const { data: audience, isLoading } = useGetAudienceById(audienceId ? audienceId : '');
    const { data: free_av } = useGetAllFreeAvailability();
    const { control, handleSubmit: submit, formState: { errors }, setValue } = useForm<ReportAudienceInterface>({
        resolver: yupResolver(AudienceReportValidation)
    });
    const { refetch } = useGetAllAudience();
    const { mutateAsync: reportAudience, isPending: reportLoading } = useReportAudience({action() {
        refetch();
    },})
    const [availabilities_pref, setAvailabilitiesPref] = useState<any[]>([]);
    const navigate = useNavigate();

    useEffect(() => { 
        setValue('_id', (audienceId) ? audienceId : '');
        setValue('old_availability', audience?.availability);
        filterAvailability();
        filterAvailability();
    }, [audience, free_av])

    async function filterAvailability() {
        if(free_av) {
            const availability_pref: any = free_av.filter((item: any) => {
                return (
                    dayjs(item.date_initial) >= dayjs(audience?.date_initial) && 
                    dayjs(item.date_initial) <= dayjs(audience?.request_date_wanted_end_initial)
                )            
            }) 
            setAvailabilitiesPref(availability_pref);
        }
    }
    
    const handleReportSubmit = async (data: ReportAudienceInterface) => {
        const response = await reportAudience(data);
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
                            {
                                isLoading && <div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>
                            }
                            {
                                audience && 
                                    <div>
                                    <div className="font-bold text-lg mb-6">Reporter l'audience du { audience.availability_date } </div>
                                    <div className="gap-2 flex justify-between">
                                        <div className="w-1/4">
                                            <div className=" border pt-6 rounded text-center">
                                                <img src={`data:image/png;base64,${audience.user_profile_photo}`} alt="" className="w-3/4 h-48 object-cover mx-auto border" />
                                                <div className="font-bold text-lg">{ audience.user_nom } { audience.user_prenom }</div>
                                                <div className="flex justify-end px-8 py-2">
                                                </div>
                                                <div className="mx-auto w-full bg-gray-200 px-8 py-1">
                                                    <div className="flex gap-4 my-2">
                                                        <PhoneOutlined />
                                                        <div> { audience.user_cni } </div>
                                                    </div>
                                                    <div className="flex gap-4 my-2">
                                                        <EnvironmentOutlined />
                                                        <div> { audience.user_adresse } </div>
                                                    </div>
                                                    <div className="flex gap-4 my-2">
                                                        <MailOutlined />
                                                        <div> { audience.user_email } </div>
                                                    </div>
                                                    <div className="flex gap-4 my-2">
                                                        <PhoneOutlined />
                                                        <div>+261 { audience.user_telephone } </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="w-2/4" >
                                            <div className="border rounded p-4">
                                                <div className="flex justify-end">
                                                    { audience.status_audience[0] === "Fixé" ? 
                                                        <Status type="primary" data={`${audience.status_audience}`} />
                                                        : (
                                                            audience.status_audience[0] === "Reporté" ?
                                                            <Status type="alert" data={`${audience.status_audience}`} />
                                                            : (
                                                                audience.status_audience[0] === "Classé" ?
                                                                <Status type="success" data={`${audience.status_audience}`} />
                                                                :
                                                                (
                                                                    audience.status_audience[0] === "Absent" ?
                                                                    <Status type="gray" data={`${audience.status_audience}`} />
                                                                    :
                                                                    <Status type="danger" data={`${audience.status_audience}`} />
                                                                )
                                                            )
                                                        )
                                                    }     
                                                </div>
                                                <div className="mb-3 flex items-center gap-2">
                                                    <div className="text-md font-bold">
                                                        { audience.request_type }
                                                    </div>                                                    
                                                    <div>soumise le <span className="font-semibold"> {audience.request_creation}</span></div>
                                                </div>
                                                    <div className="text-sm text-gray-500">Motif: </div>
                                                    <div className=""> { audience.request_object } </div>
                                            </div>
                                        </div>
                                        <div className="w-1/4">
                                            <div className="border rounded p-5">
                                                <div className="font-bold text-md mb-3">Organisation</div>
                                                <div className="text-sm text-gray-500">Cette audience est organisée pour :</div>
                                                <div className="flex justify-between items-center">
                                                    <div className="text-sm text-gray-500">Date</div>
                                                    <div className="font-semibold"> { audience.availability_date } </div>
                                                </div>
                                                <div className="flex justify-between items-center">
                                                    <div className="text-sm text-gray-500">De</div>
                                                    <div className="font-semibold"> { audience.availability_hour_debut } </div>
                                                    <div className="text-sm text-gray-500">à</div>
                                                    <div className="font-semibold"> { audience.availability_hour_end } </div>
                                                </div>
                                            </div>
                                            <form onSubmit={submit(handleReportSubmit)} className="border rounded p-5">
                                                <div className="font-bold text-md mb-3">Report</div>
                                                <Label className="mb-1">Les disponibilités pour le report : </Label>
                                                <Controller 
                                                    name="new_availability"
                                                    control={control}
                                                    render={({
                                                        field: { value, onChange, onBlur }
                                                    }) => (
                                                        <Select
                                                            onChange={onChange}
                                                            onBlur={onBlur}
                                                            value={value}
                                                            className={`w-full ${errors?.new_availability && 'border border-red-500 rounded' }`}
                                                            showSearch
                                                            placeholder='Sélectionnez une disponibilité'
                                                            optionFilterProp="children"
                                                            filterOption={(input: any, option: any) =>
                                                                option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
                                                            }
                                                        >
                                                            {
                                                                availabilities_pref.map((ava: any, index) => {
                                                                    if(availabilities_pref.length < 1) {
                                                                        return(
                                                                            <Option key={index}>
                                                                                <div>
                                                                                    <CloseOutlined className="" />
                                                                                    Pas de disponibilité pour la semaine preféré
                                                                                </div>
                                                                            </Option>
                                                                        )
                                                                    }
                                                                    return(
                                                                        <Option key={index} value={ava._id}>
                                                                            <div className="flex gap-1">
                                                                                <CheckCircleOutlined className="text-green-500" />
                                                                                { `${ava.date_availability} de ${ava.hour_debut} à ${ava.hour_end}` }
                                                                            </div>
                                                                        </Option>
                                                                    )
                                                                })
                                                            }
                                                    </Select>
                                                    )}
                                                />
                                            {errors?.new_availability && <div className="text-left text-red-500 text-xs">{ errors?.new_availability.message }</div>}
                                            <div className="flex justify-end mt-4">
                                                <Button 
                                                    type="submit"
                                                    disabled={reportLoading}
                                                >   
                                                    { reportLoading && <LoadingOutlined className="text-xs" /> }
                                                    <div>Reporter</div>                                                    
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

export default AdminAudienceReport;