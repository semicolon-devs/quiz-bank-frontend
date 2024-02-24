import React, { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";

import { ChevronDownIcon } from "../icons";

type Props = {
  value: any;
  setValue: (value: any) => void;
  array: any[] | undefined;
};

const EntriesPerPage = ({ value, setValue, array }: Props) => {
  return (
    <div className="w-full bg-white flex ps-4 justify-between items-center rounded-xl shadow">
      <p className="text-sm font-medium py-3">Entries per page</p>
      <Listbox value={value} onChange={setValue}>
        <div className="relative">
          <Listbox.Button className="relative w-full cursor-default pl-3 pr-10 text-left">
            <span className="block truncate">
              {value?.name ? value.name : value ? value : "Select option"}
            </span>
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronDownIcon
                classes="h-5 w-5 text-blue-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-none sm:text-sm">
              {array &&
                array.map((item, index) => (
                  <Listbox.Option
                    key={index}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 px-4 ${
                        active ? "bg-blue-50 text-blue-600" : "text-blue-600"
                      }`
                    }
                    value={item}
                  >
                    {({ selected }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {item?.name ? item.name : item}
                        </span>
                      </>
                    )}
                  </Listbox.Option>
                ))}
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
};

export default EntriesPerPage;
