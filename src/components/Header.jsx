import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { BellIcon, UserIcon } from '@heroicons/react/outline'
import { useAuth0 } from '@auth0/auth0-react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Header({ children, ...props }) {

    const {
    isLoading,
    isAuthenticated,
    error,
    user,
    loginWithRedirect,
    logout,
  } = useAuth0();

  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (error) {
    console.error(error);
    return <div>Oops... {error.message}</div>;
  }

  return (
    <div className="flex-1 px-4 flex justify-between bg-indigo-900">
      <div className="flex-1 flex">
        {children}
      </div>
      <div className="ml-4 flex items-center md:ml-6">
        <button
          type="button"
          className="bg-indigo-400 p-1 rounded-full text-white hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          <span className="sr-only">View notifications</span>
          <BellIcon className="h-6 w-6" aria-hidden="true" />
        </button>

        {!isAuthenticated &&
          <button
            type="button"
            onClick={loginWithRedirect}
            className="ml-3 bg-indigo-400 p-1 rounded-full text-white hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            <span className="sr-only">Sign in</span>
            <UserIcon className="h-6 w-6" aria-hidden="true" />
          </button>
        }

        {/* Profile dropdown */}
        {isAuthenticated &&
          <Menu as="div" className="ml-3 relative">
            <div>
              <Menu.Button className="max-w-xs bg-white flex items-center text-sm rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                <span className="sr-only">Open user menu</span>
                <img
                  className="h-8 w-8 rounded-full"
                  src={user.picture}
                  alt={user.name}
                />
              </Menu.Button>
            </div>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-100"
              enterFrom="transform opacity-0 scale-95"
              enterTo="transform opacity-100 scale-100"
              leave="transition ease-in duration-75"
              leaveFrom="transform opacity-100 scale-100"
              leaveTo="transform opacity-0 scale-95"
            >
              <Menu.Items className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5 focus:outline-none">
                <Menu.Item key="signout">
                  {({ active }) => (
                    <button
                      className={classNames(active ? 'bg-gray-100' : '', 'block px-4 py-2 text-sm text-gray-700')}
                      onClick={() => logout({ returnTo: window.location.origin })}>
                      Sign out
                    </button>
                  )}
                </Menu.Item>
              </Menu.Items>
            </Transition>
          </Menu>
        }
      </div>
    </div>
  );
}
