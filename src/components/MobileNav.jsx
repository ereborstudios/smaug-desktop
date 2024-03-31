import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useEffect, useState } from 'react'
import { useStoreState, useStoreActions } from 'easy-peasy';
import { XIcon } from '@heroicons/react/outline'
import { NavLink } from "react-router-dom";

export default ({ navigation }) => {
    const sidebarOpen = useStoreState((state) => state.sidebar.open);
    const openSidebar = useStoreActions((actions) => actions.openSidebar);
    const closeSidebar = useStoreActions((actions) => actions.closeSidebar);

    // the Dialog blocks clicking on the desktop nav
    // so we do some nonsense to workaround it
    const [hidden, setHidden] = useState(true);

    useEffect(() => {
        const handle = () => {
            
            const visible = document.getElementById("breakpoint-sm")?.offsetParent !== null;
            setHidden(!visible);
        }

        window.addEventListener("resize", handle);
        handle();

        return () => {
            window.removeEventListener("resize", handle);
        }
    }, [])
    
    if(hidden) return null;

    return (
        <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog as="div" className="fixed inset-0 z-40 flex md:hidden" onClose={openSidebar}>
                <Transition.Child
                    as={Fragment}
                    enter="transition-opacity ease-linear duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="transition-opacity ease-linear duration-300"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                </Transition.Child>
                <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                >
                    <div className="relative flex flex-col flex-1 w-full max-w-xs pt-5 pb-4 bg-gray-800">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-in-out duration-300"
                            enterFrom="opacity-0"
                            enterTo="opacity-100"
                            leave="ease-in-out duration-300"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                        >
                            <div className="absolute top-0 right-0 pt-2 -mr-12">
                                <button
                                    type="button"
                                    className="flex items-center justify-center w-10 h-10 ml-1 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                                    onClick={() => closeSidebar()}
                                >
                                    <span className="sr-only">Close sidebar</span>
                                    <XIcon className="w-6 h-6 text-white" aria-hidden="true" />
                                </button>
                            </div>
                        </Transition.Child>
                        <div className="flex items-center flex-shrink-0 px-4">
                            <img
                                className="w-auto h-8"
                                src="https://smaug.dev/smaug.png"
                                alt="Smaug"
                            />
                        </div>
                        <div className="flex-1 h-0 mt-5 overflow-y-auto">
                            <nav className="sidebar">
                                {navigation.map((item) => (
                                    <NavLink
                                        exact
                                        key={item.name}
                                        to={item.href}
                                        activeClassName="active">
                                        <item.icon className="icon" aria-hidden="true" />
                                        {item.name}
                                    </NavLink>
                                ))}
                            </nav>
                        </div>
                    </div>
                </Transition.Child>
                <div className="flex-shrink-0 w-14" aria-hidden="true">
                    {/* Dummy element to force sidebar to shrink to fit close icon */}
                </div>
            </Dialog>
        </Transition.Root>

    )
}