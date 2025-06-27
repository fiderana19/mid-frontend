import React, { useState, lazy, Suspense } from "react";
import { DatePicker, DatePickerProps, Modal, Select } from "antd";
import { getWeekStartAndEnd } from "../../../utils/GetWeek";
import { getMonthDates } from "../../../utils/GetMonth";
import { getYearDates } from "../../../utils/GetYear";
import GeneratePdf from "../../../utils/setPdfGenerate";
import { CloseOutlined, LoadingOutlined } from "@ant-design/icons";
import { SearchAudienceDto } from '../../../../../mid-backend/src/dto/search-audience.dto';
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { yupResolver } from "@hookform/resolvers/yup";
import { AudienceSearchValidation } from "@/validation/audience.validation";
import { Label } from "@/components/ui/label";
import { useSearchAudience } from "@/hooks/useSearchAudience";
import Status from "@/components/status/Status";
const AdminNavigation = lazy(() => import("../../../components/Navigation/AdminNavigation"));
const Header = lazy(() => import("../../../components/Header"));

const AdminAudienceSearch: React.FC = () => {
    const { handleSubmit: submit, getValues , control, formState: { errors }, setValue } = useForm<SearchAudienceDto>({
        resolver: yupResolver(AudienceSearchValidation)
    });
    const { mutateAsync: searchAudience, isPending: isSearchLoading, data: audiences } = useSearchAudience();
    const [selectedDateType, setSelectedDateType] = useState<string>('week');
    const [isPdfModalVisible, setIsPdfModalVisible] = useState(false);

    const onDateChange: DatePickerProps['onChange'] = (date, dateString) => {
        if(selectedDateType === 'week') {
            const { date_debut, date_end } = getWeekStartAndEnd(date);
            setValue('date_debut', date_debut);
            setValue('date_end', date_end);
        } else if(selectedDateType === 'month') {
            const { date_debut, date_end } = getMonthDates(dateString);
            setValue('date_debut', date_debut);
            setValue('date_end', date_end);
        } else if(selectedDateType === 'year') {
            const { date_debut, date_end } = getYearDates(dateString);
            setValue('date_debut', date_debut);
            setValue('date_end', date_end);
        }
    };

    const handleSelectDateChange = (value: string) => {
        setSelectedDateType(value);
    };

    const handleSearchSubmit = async (data: SearchAudienceDto) => {
        await searchAudience(data);
    }

    const handleGenerateSubmit = async () => {
        setIsPdfModalVisible(true);
    }

    return(
        <>
            <div className="w-full flex min-h-screen bg-four">
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
                    <div className="pl-10 pr-5 py-16 relative">
                        <div className="flex justify-between items-center my-4">
                            <div className="text-lg font-latobold">Rechercher des audiences</div>
                        </div>
                        <form onSubmit={submit(handleSearchSubmit)} className="flex gap-1 justify-center">
                            <div>
                                <Label className="mb-1">
                                    Statut
                                </Label>
                                <Controller 
                                    control={control}
                                    name="status_audience"
                                    defaultValue="Fixé"
                                    render={({
                                        field: { value, onChange, onBlur }
                                    }) => (
                                        <Select
                                            value={value}
                                            onChange={onChange}
                                            onBlur={onBlur}
                                            className={`w-28 ${errors?.status_audience && 'border border-red-500 text-red-500 rounded'}`}
                                            options={[
                                                { value: 'Fixé', label: 'Fixé' },
                                                { value: 'Reporté', label: 'Reporté' },
                                                { value: 'Annulé', label: 'Annulé' },
                                                { value: 'Classé', label: 'Classé' },
                                                { value: 'Absent', label: 'Absent' },
                                            ]}
                                        />
                                    )}
                                />
                                { errors?.status_audience && <div className="text-xs text-red-500 w-28"> { errors?.status_audience.message } </div> }
                            </div>
                            <div>
                                <Label className="mb-1">
                                    Date
                                </Label>
                                <div className="flex gap-1">
                                    <Select
                                        defaultValue="Semaine"
                                        style={{ width: 120 }}
                                        onChange={handleSelectDateChange}
                                        className={`max-w-max ${errors?.date_end && "border rounded border-red-500"  }`} 
                                        options={[
                                            { value: 'week', label: 'Semaine' },
                                            { value: 'month', label: 'Mois' },
                                            { value: 'year', label: 'Année' },
                                        ]}
                                    />
                                    {
                                        (selectedDateType && selectedDateType === "week") ?
                                        <DatePicker onChange={onDateChange} className={`max-w-max ${errors?.date_end && "border rounded border-red-500"}`} picker="week" /> 
                                        :
                                        (
                                            (selectedDateType && selectedDateType === "month") ?
                                            <DatePicker onChange={onDateChange} className={`max-w-max ${errors?.date_end && "border rounded border-red-500"}`} picker="month" />
                                            :
                                            (
                                                <DatePicker onChange={onDateChange} className={`max-w-max ${errors?.date_end && "border rounded border-red-500"}`} picker="year" />
                                            )
                                        )
                                    }
                                </div>
                                { errors?.date_end && <div className="text-xs text-red-500"> { errors?.date_end.message } </div> }
                            </div>
                            <div>
                                <Button
                                    type="submit"
                                    variant={'primary'}
                                    disabled={isSearchLoading}
                                    className={`mt-4 ${isSearchLoading && 'cursor-not-allowed'}`}
                                >
                                    { isSearchLoading && <LoadingOutlined className="text-xs" /> }
                                    Rechercher
                                </Button>
                            </div>
                        </form>
                        {isSearchLoading && <div className="my-4 max-w-max mx-auto"> <LoadingOutlined className="text-5xl" /></div>}
                        {
                            audiences?.data && 
                            <div className="mt-6">
                                <div className="font-latobold my-4 mx-auto max-w-max text-xl">RESULTAT DE LA RECHERCHE</div>
                                <table className='min-w-full divide-y divide-gray-200'>
                                    <thead>
                                        <tr>
                                            <th className='px-1 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'></th>
                                            <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Nom et prenom(s)</th>
                                            <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>CIN</th>
                                            <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Ref</th>
                                            <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Type</th>
                                            <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Date</th>
                                            <th className='md:px-6 px-2 py-3 bg-gray-50 text-left text-xs leading-4 font-medium text-gray-500 uppercase tracking-wider'>Status</th>
                                        </tr>
                                    </thead> 
                                    <tbody className='bg-white divide-y divide-gray-200'>
                                        {
                                            audiences?.data && audiences.data.map((audience: any, index: any) => {
                                                return (
                                                    <tr key={index}>
                                                        <td className='md:px-6 py-1 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>
                                                            <img src={`data:image/png;base64,${audience.user_profile_photo}`} className="min-w-max rounded-full border border-slate-400 w-9 h-9 object-cover" />
                                                        </td>
                                                        <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { audience.user_nom } { audience.user_prenom }  </td>
                                                        <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { audience.user_cni }  </td>
                                                        <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { audience.ref_audience }  </td>
                                                        <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { audience.request_type }  </td>
                                                        <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>  { audience.availability_date } de { audience.availability_hour_debut } à { audience.availability_hour_end }  </td>
                                                        <td className='md:px-6 px-2 py-4 lg:whitespace-nowrap whitespace-normal text-sm leading-5 text-gray-900'>   
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
                                                        </td>
                                                    </tr>
                                                    )
                                                }
                                            )
                                        }
                                    </tbody>
                                </table>
                                {
                                    (audiences?.data && audiences.data.length) < 1 &&
                                        <div className="mx-auto flex justify-center w-full my-4 text-gray-500">
                                            <div className="text-center">
                                                <CloseOutlined className="text-5xl" />
                                                <div className="my-2">
                                                Aucune audience
                                                </div>
                                            </div>
                                        </div>                                
                                }
                        </div>
                        }
                        {
                            audiences?.data &&
                            <div className="fixed bottom-4 right-0 px-4 bg-four">
                                <Button
                                    onClick={handleGenerateSubmit}
                                > GENERER UN RAPPORT</Button>
                            </div>
                        }
                    </div>
                </div>
                <Modal 
                    title="Rapport"
                    open={isPdfModalVisible}
                    onCancel={() => setIsPdfModalVisible(false)}
                    onClose={() => setIsPdfModalVisible(false)}
                    footer={null}
                >
                    <div className="w-full h-3/4">
                    {
                        audiences?.data &&
                        <GeneratePdf audiences={audiences.data} audience_status={getValues('status_audience')} date_debut={getValues('date_debut')} date_end={getValues('date_end')} total={audiences?.data.length} />
                    }
                    </div>
                </Modal>
            </div>
        </>
    )
}

export default AdminAudienceSearch;

