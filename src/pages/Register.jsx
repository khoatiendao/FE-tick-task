import React, { useContext, useEffect, useRef, useState } from "react";
import { UserCircleIcon } from "@heroicons/react/24/solid";
import { AuthContext } from "../contexts/AuthContext";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";
import {
  getCityApiRequest,
  getCountryApiRequest,
  getDistrictApiRequest,
  getWardApiRequest,
} from "../utils/service";
import { Backdrop, CircularProgress } from "@mui/material";

const Register = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [fileSelected, setFileSelected] = useState(false);

  const handleButtonClick = () => {
    document.getElementById("fileInput").click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result.split(",")[1];
        updateRegisterInfo({ ...registerInfo, photo: base64 });
        setImagePreview(reader.result);
        setFileSelected(true);
      };
      reader.readAsDataURL(file);
    }
  };
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
      updateRegisterInfo({ ...registerInfo, city: cityName });
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
      updateRegisterInfo({ ...registerInfo, district: districtName });
    } else {
      setWards([]);
    }
  };

  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const [showRetypePassword, setRetypeShowPassword] = useState(false);

  const toggleRetypeShowPassword = () => {
    setRetypeShowPassword(!showRetypePassword);
  };

  const { registerInfo, updateRegisterInfo, registerUser, isRegisterLoading } =
    useContext(AuthContext);

  return (
    <>
      <form
        onSubmit={registerUser}
        method="POST"
        className="flex justify-center items-center"
      >
        <div className="space-y-12 w-[50vw] p-14">
          <div className="pb-12 border-b border-gray-900/10">
            <h2 className="text-3xl font-semibold leading-7 text-gray-900 text-center">
              Register
            </h2>
            <p className="mt-3 text-sm leading-6 text-gray-600 text-center">
              This information will be displayed publicly so be careful what you
              share.
            </p>

            <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <div className="flex justify-between">
                  <label
                    htmlFor="username"
                    className="text-sm font-medium leading-6 text-gray-900"
                  >
                    Username
                  </label>
                  <label
                    htmlFor="gender"
                    className="text-sm font-medium leading-6 text-gray-900 mr-16"
                  >
                    Gender
                  </label>
                </div>
                <div className="flex justify-between">
                  <div className="mt-2 w-full">
                    <div className="flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-600 sm:max-w-md">
                      <input
                        id="name"
                        name="name"
                        type="text"
                        placeholder="janesmith"
                        onChange={(e) =>
                          updateRegisterInfo({
                            ...registerInfo,
                            name: e.target.value,
                          })
                        }
                        className="flex-1 border-0 bg-transparent py-1.5 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6 pl-3"
                      />
                    </div>
                  </div>

                  <div className="mt-2 ml-2 w-28">
                    <select
                      id="gender"
                      name="gender"
                      onChange={(e) =>
                        updateRegisterInfo({
                          ...registerInfo,
                          gender: e.target.value,
                        })
                      }
                      className="w-28 rounded-md border-0 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-9 pl-2"
                    >
                      <option hidden>Gender</option>
                      <option>Female</option>
                      <option>Male</option>
                      <option>Others</option>
                    </select>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Email address
                </label>
                <p className="mt-1 text-sm leading-6 text-gray-600">
                  Use a permanent address where you can receive mail.
                </p>
                <div className="mt-2">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    onChange={(e) =>
                      updateRegisterInfo({
                        ...registerInfo,
                        email: e.target.value,
                      })
                    }
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
                  />
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="mt-2 flex">
                  <div className="w-full relative">
                    <input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      onChange={(e) =>
                        updateRegisterInfo({
                          ...registerInfo,
                          password: e.target.value,
                        })
                      }
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
                    />
                    <span
                      className="absolute z-10 cursor-pointer right-2 top-3"
                      onClick={toggleShowPassword}
                    >
                      {showPassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
              </div>

              <div className="sm:col-span-4">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Retype password
                </label>
                <div className="mt-2 flex">
                  <div className="w-full relative">
                    <input
                      id="retypepassword"
                      name="retypepassword"
                      type={showRetypePassword ? "text" : "password"}
                      required
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
                    />
                    <span
                      className="absolute z-10 cursor-pointer right-2 top-3"
                      onClick={toggleRetypeShowPassword}
                    >
                      {showRetypePassword ? <FaEyeSlash /> : <FaEye />}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="pb-1">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label
                  htmlFor="phone"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Phone
                </label>
                <div className="mt-2">
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    pattern="[0-9]{3}[0-9]{3}[0-9]{4}"
                    onChange={(e) =>
                      updateRegisterInfo({
                        ...registerInfo,
                        phone: e.target.value,
                      })
                    }
                    required
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
                  />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="country"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Country
                </label>
                <div className="mt-2">
                  <select
                    id="country"
                    name="country"
                    value={registerInfo.country}
                    onChange={(e) =>
                      updateRegisterInfo({
                        ...registerInfo,
                        country: e.target.value,
                      })
                    }
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 pl-2"
                  >
                    <option value="">Select a country</option>
                    {countries.map((country) => (
                      <option key={country.name}>{country.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-span-4">
                <label
                  htmlFor="street-address"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Street address
                </label>
                <div className="mt-2">
                  <input
                    id="street-address"
                    name="street-address"
                    type="text"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
                    onChange={(e) =>
                      updateRegisterInfo({
                        ...registerInfo,
                        address: e.target.value,
                      })
                    }
                  />
                </div>
              </div>

              <div className="sm:col-span-2 sm:col-start-1">
                <label
                  htmlFor="ward"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  City
                </label>
                <div className="mt-2">
                  <select
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
                    name="city"
                    id="city"
                    onChange={handleChangeCity}
                    value={selectedCity}
                  >
                    <option value="">Select a city</option>
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
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  District
                </label>
                <div className="mt-2">
                  <select
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
                    name="district"
                    id="district"
                    onChange={handleChangeDistrict}
                    value={selectedDistrict}
                  >
                    <option value="">Select a district</option>
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
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Ward/Village
                </label>
                <div className="mt-2">
                  <select
                    name="ward"
                    id="ward"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6 pl-3"
                    onChange={(e) =>
                      updateRegisterInfo({
                        ...registerInfo,
                        ward: e.target.value,
                      })
                    }
                  >
                    <option value="">Select a ward/village</option>
                    {wards.map((ward) => (
                      <option key={ward.id}>{ward.name}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="col-span-full">
                <label
                  htmlFor="photo"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Photo
                </label>
                <div className="mt-2 flex items-center gap-x-3">
                  {imagePreview ? (
                    <img src={imagePreview} alt="pic user" className="w-52" />
                  ) : (
                    <UserCircleIcon
                      aria-hidden="true"
                      className="h-12 w-12 text-gray-300"
                    />
                  )}

                  <button
                    type="button"
                    className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
                    onClick={handleButtonClick}
                  >
                    {fileSelected ? "Change" : "Upload"}
                  </button>
                  <input
                    id="fileInput"
                    type="file"
                    accept=".png, .jpg, .jpeg, .gif"
                    className="hidden"
                    onChange={handleFileChange}
                  />
                  <p className="text-xs leading-5 text-gray-600">
                    PNG, JPG, GIF up to 10MB
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="border-b border-gray-900/10 pb-2"></div>

          <div className="flex items-center justify-center gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-black px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default Register;
