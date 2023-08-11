import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios.js";
import { useStateContext } from "../context/ContextProvider.jsx";

export default function Signup() {
  const { setCurrentUser, setUsetToken } = useStateContext();

  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [errors, setErrors] = useState({ __html: "" });

  const onSubmit = (ev) => {
    ev.preventDefault();
    setErrors({ __html: "" });
    axiosClient
      .post("/signup", {
        name: fullname,
        email,
        password,
        password_confirmation: passwordConfirmation,
      })
      .then(({ data }) => {
        setCurrentUser(data.user);
        setUsetToken(data.token);
      })
      .catch((error) => {
        const finalErrors = Object.values(error.response.data.errors).reduce(
          (accum, next) => [...next, ...accum],
          []
        );
        console.log("thisi is finalErrors :", finalErrors);
        setErrors({ __html: finalErrors.join("<br>") });
      });
  };

  return (
    <>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {errors.__html && (
          <div
            className="bg-red-500 rounded px-3 py-2 text-white"
            dangerouslySetInnerHTML={errors}
          ></div>
        )}
        <form
          onSubmit={onSubmit}
          className="space-y-6"
          action="#"
          method="POST"
        >
          <div>
            <label
              htmlFor="fullname"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Full name
            </label>
            <div className="mt-2">
              <input
                value={fullname}
                onChange={(ev) => setFullname(ev.target.value)}
                id="fullname"
                name="fullname"
                type="text"
                autoComplete="fullname"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password
              </label>
            </div>
            <div className="mt-2">
              <input
                value={password}
                onChange={(ev) => setPasword(ev.target.value)}
                id="password"
                name="password"
                type="text"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label
                htmlFor="password"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Password confirmation
              </label>
            </div>
            <div className="mt-2">
              <input
                value={passwordConfirmation}
                onChange={(ev) => setPasswordConfirmation(ev.target.value)}
                id="password-confirmation"
                name="password_confirmation"
                type="text"
                autoComplete="current-password"
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Signup
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          I have a account
          <Link
            to="/login"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Login
          </Link>
        </p>
      </div>
    </>
  );
}
