import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Disclosure } from '@headlessui/react';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import ThemeToggle from '../ThemeToggle';

const navigation = [
  { name: 'DATA 2 MENIT', href: '/per2mnt', current: false },
  { name: 'DATA PERJAM', href: '/perjam', current: false },
  { name: 'VALIDITAS DATA', href: '/validitas', current: false },
];

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}

const NavBar: React.FC = () => {
  const location = useLocation();

  const updatedNavigation = navigation.map((item) => ({
    ...item,
    current: location.pathname === item.href,
  }));

  return (
    <Disclosure as="nav" className="bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100 mx-auto max-w-full">
      {({ open }) => (
        <>
          <div className="container mx-auto px-5 sm:px-6 lg:px-12 shadow-lg">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button */}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <div className="flex flex-shrink-0 items-center">
                  <img
                    src="/logo-sensync.png" // Path ke logo di folder public
                    alt="Logo"
                    className="h-8 w-auto"
                  />
                </div>
                <div className="hidden sm:ml-10 sm:block">
                  <div className="flex space-x-0">
                    {updatedNavigation.map((item) => (
                      <Link
                        key={item.name}
                        to={item.href}
                        className={classNames(
                          item.current
                            ? 'bg-gray-900 text-white  dark:bg-gray-200 dark:text-gray-900'
                            : 'text-gray-800 dark:text-gray-300 hover:bg-gray-700 hover:text-white dark:hover:bg-white dark:hover:text-gray-900',
                          'rounded-md px-3 py-2 text-sm font-medium'
                        )}
                        aria-current={item.current ? 'page' : undefined}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                <ThemeToggle />
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pb-3 pt-2">
              {updatedNavigation.map((item) => (
                <Disclosure.Button
                  key={item.name}
                  as={Link}
                  to={item.href}
                  className={classNames(
                    item.current
                      ? 'bg-gray-900 text-white dark:bg-gray-200 dark:text-gray-900'
                      : 'text-gray-800 dark:text-gray-300 hover:bg-gray-700 hover:text-white  dark:hover:bg-white dark:hover:text-gray-900',
                    'block rounded-md px-3 py-2 text-base font-medium'
                  )}
                  aria-current={item.current ? 'page' : undefined}
                >
                  {item.name}
                </Disclosure.Button>
              ))}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  );
}

export default NavBar;
