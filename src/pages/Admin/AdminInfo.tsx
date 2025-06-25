import React, { lazy, Suspense } from "react";
import { EnvironmentOutlined, LoadingOutlined, MailOutlined, PhoneOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { useGetUserById } from "@/hooks/useGetUserById";
import { Button } from "@/components/ui/button";
const AdminNavigation = lazy(() => import("../../components/Navigation/AdminNavigation"));
const Header = lazy(() => import("../../components/Header"));

const AdminInfo: React.FC = () => {
    const { token } = useAuth();
    const { data: user, isLoading } = useGetUserById(token ? JSON.parse(atob(token.split('.')[1])).id : null)
    const navigate = useNavigate();

    return(
        <>
             <div className="w-full flex bg-four min-h-screen">
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
                    <div className="md:pl-10 md:pr-5 sm:pl-20 pl-4 pr-4 pt-16 pb-5 w-full">
                        <div className="font-latobold text-lg mb-6">Votre profile</div>
                        {
                            isLoading && <div className='text-center my-10'><LoadingOutlined className='text-5xl' /></div>
                        }
                        {
                            user && 
                            <div>
                                <div className="gap-2 md:flex justify-between w-full">
                                    <div className="md:w-2/4 w-full">
                                        <div className=" pt-6 rounded text-center  bg-white border shadow-md">
                                            <img src={`data:image/png;base64,${user.profile_photo}`} alt="" className="w-48 h-48  object-cover mx-auto border" />
                                            <div className="font-latobold text-lg">{ user.nom } { user.prenom }</div>
                                            <div className="mx-auto w-full bg-gray-200 px-8 py-1">
                                                <div className="flex gap-4 my-2">
                                                    <EnvironmentOutlined />
                                                    <div>{ user.adresse }</div>
                                                </div>
                                                <div className="flex gap-4 my-2">
                                                    <MailOutlined />
                                                    <div>{ user.email }</div>
                                                </div>
                                                <div className="flex gap-4 my-2">
                                                    <PhoneOutlined />
                                                    <div>+261{ user.telephone }</div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="rounded p-4 my-2 bg-white border shadow-md">
                                            <div className="font-latobold text-md mb-3">Info</div>
                                            <div className="flex justify-between items-center">
                                                <div className="text-sm text-gray-500">Date de création</div>
                                                <div className="font-latobold">{ user.user_creation }</div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:w-2/4 w-full" >
                                        <div className="rounded p-4  bg-white border shadow-md">
                                            <div className="font-latobold text-md mb-3">Naissance</div>
                                            <div className="flex justify-between items-center">
                                                <div className="text-sm text-gray-500">Date de naissance</div>
                                                <div className="font-latobold">{ user.date_naissance }</div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="text-sm text-gray-500">Lieu de naissance</div>
                                                <div className="font-latobold">{ user.lieu_naissance }</div>
                                            </div>
                                        </div>
                                        <div className="rounded p-4 md:my-5 my-2 bg-white border shadow-md">
                                            <div className="font-latobold text-md mb-3">Identité Nationale</div>
                                            <div className="flex justify-between items-center">
                                                <div className="text-sm text-gray-500">CIN</div>
                                                <div className="font-latobold">{ user.cni }</div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="text-sm text-gray-500">Date de délivrance</div>
                                                <div className="font-latobold">{ user.date_cni }</div>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <div className="text-sm text-gray-500">Lieu</div>
                                                <div className="font-latobold">{ user.lieu_cni }</div>
                                            </div>
                                        </div>
                                        <div className="rounded p-4 my-2 bg-white border shadow-md">
                                            <div className="font-latobold text-md mb-3">Actions</div>
                                            <div className="flex justify-between items-center">
                                                <div className="text-sm text-gray-500">Changer le mot de passe</div>
                                                <Button
                                                    onClick={() => {navigate("/admin/change/password")}}
                                                >
                                                    Changer le mot de passe</Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                        </div>
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminInfo;