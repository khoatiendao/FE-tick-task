import { Field } from "@headlessui/react";
import { Switch } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getCityApiRequest, getCountryApiRequest, getDistrictApiRequest, getWardApiRequest } from "../../utils/service";

const ProfileComponent = () => {
  const [agreed, setAgreed] = useState(false);
  const [isUpdate, setIsUpdate] = useState(true);

  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const fetchCountries = async () => {
      const name = await getCountryApiRequest();

      setCountries(name); // Lưu tên quốc gia vào state nếu cần
    };

    fetchCountries();
  }, []);

  const [cities, setCities] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [wards, setWards] = useState([]);
  const [selectedCity, setSelectedCity] = useState("");
  const [selectedDistrict, setSelectedDistrict] = useState("");

  useEffect(() => {
    const fetchCities = async () => {
      const name = await getCityApiRequest();
      setCities(name);
    };

    fetchCities();
  }, []);

  const handleChangeCity = async (e) => {
    const cityId = e.target.value;
    const cityName = e.target.options[e.target.selectedIndex].text;
    setSelectedCity(cityId);
    if (cityId) {
      const fetchDistrict = async () => {
        const name = await getDistrictApiRequest(cityId);
        if (name) {
          setDistricts(name);
        }
      };
      fetchDistrict();

    } else {
      setDistricts([]);
    }
  };

  const handleChangeDistrict = async (e) => {
    const districtId = e.target.value;
    const districtName = e.target.options[e.target.selectedIndex].text;
    setSelectedDistrict(districtId);
    if (districtId) {
      const fetchWard = async () => {
        const name = await getWardApiRequest(districtId);
        if (name) {
          setWards(name);
        }
      };
      fetchWard();

    } else {
      setWards([]);
    }
  };

  return (
    <div className="isolate bg-white px-6 py-24 sm:py-14 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]"
      ></div>
      <div className="mx-auto max-w-2xl text-center">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Profile
        </h2>
        <p className="mt-2 text-lg leading-8 text-gray-600">
          Manage your information
        </p>
      </div>
      <form
        action="#"
        method="POST"
        className="mx-auto mt-16 max-w-xl sm:mt-10"
      >
        <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label htmlFor="name" className="text-sm font-semibold leading-6">
              Name
            </label>
            <div className="flex justify-between">
              <div className="mt-2.5 w-full">
                <input
                  readOnly={isUpdate}
                  id="name"
                  name="name"
                  type="text"
                  className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
              <div className="mt-2.5 ml-2 w-28">
                <select
                  disabled={isUpdate}
                  id="gender"
                  name="gender"
                  className="h-10 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-9 pl-2"
                >
                  <option hidden>Gender</option>
                  <option>Female</option>
                  <option>Male</option>
                  <option>Others</option>
                </select>
              </div>
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="phone-number"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Phone
            </label>
            <div className="mt-2.5">
              <input
                readOnly={isUpdate}
                id="phone-number"
                name="phone-number"
                type="tel"
                pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                autoComplete="tel"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label
              htmlFor="country"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Country
            </label>
            <div className="mt-2.5">
              <select
                disabled={isUpdate}
                id="country"
                name="country"
                rows={4}
                className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="">Country</option>
                {countries.map((country) => (
                  <option key={country.name}>{country.name}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="sm:col-span-2">
            <label
              htmlFor="address"
              className="block text-sm font-semibold leading-6 text-gray-900"
            >
              Address
            </label>
            <div className="mt-2.5">
              <input
                readOnly={isUpdate}
                id="address"
                name="address"
                type="text"
                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div className="sm:col-span-2">
            <div className="flex">
              <div className="sm:col-span-2">
                <label
                  htmlFor="city"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2.5">
                  <select
                    disabled={isUpdate}
                    id="city"
                    name="city"
                    onChange={handleChangeCity}
                    value={selectedCity}
                    rows={4}
                    className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">City</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="district"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  District
                </label>
                <div className="mt-2.5 w-48">
                  <select
                    disabled={isUpdate}
                    id="district"
                    name="district"
                    onChange={handleChangeDistrict}
                    value={selectedDistrict}
                    // rows={4}
                    className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">District</option>
                    {districts.map((district) => (
                      <option key={district.id} value={district.id}>
                        {district.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="ward"
                  className="block text-sm font-semibold leading-6 text-gray-900"
                >
                  Ward
                </label>
                <div className="mt-2.5 w-48">
                  <select
                    disabled={isUpdate}
                    id="ward"
                    name="ward"
                    rows={4}
                    className="block w-full rounded-md border-0 px-2 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  >
                    <option value="">Ward</option>
                    {wards.map((ward) => (
                      <option key={ward.id}>{ward.name}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>

          <Field className="flex gap-x-4 sm:col-span-2">
            <div className="flex h-6 items-center">
              <Switch
                checked={agreed}
                onChange={() => {
                  setAgreed(!agreed);
                  setIsUpdate(!isUpdate);
                }}
                className="group flex w-8 flex-none cursor-pointer rounded-full bg-gray-200 p-px ring-1 ring-inset ring-gray-900/5 transition-colors duration-200 ease-in-out focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 data-[checked]:bg-indigo-600"
              >
                <span className="sr-only">Agree to policies</span>
                <span
                  aria-hidden="true"
                  className="h-4 w-4 transform rounded-full bg-white shadow-sm ring-1 ring-gray-900/5 transition duration-200 ease-in-out group-data-[checked]:translate-x-3.5"
                />
              </Switch>
            </div>
            <label className="text-sm leading-6 text-gray-600">
              Click button if you want to update profile{" "}
              <a href="#" className="font-semibold text-indigo-600">
                privacy&nbsp;policy
              </a>
            </label>
          </Field>
        </div>
        <div className="mt-10">
          <button
            type="submit"
            className="block w-full rounded-md bg-midnight px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Let's talk
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileComponent;
