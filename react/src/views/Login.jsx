import { useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../axios";
import { useStateContext } from "../context/ContextProvider";

export default function Login() {
  const { setCurrentUser, setUsetToken } = useStateContext();

  const [email, setEmail] = useState("");
  const [password, setPasword] = useState("");
  const [errors, setErrors] = useState({ __html: "" });
  const [error, setError] = useState("");

  const onSubmit = (ev) => {
    ev.preventDefault();

    axiosClient
      .post("/login", {
        email,
        password,
      })
      .then(({ data }) => {
        setCurrentUser(data.user);
        setUsetToken(data.token);
      })
      .catch((error) => {
        if (error.response.data.errors) {
          const finalErrors = Object.values(error.response.data.errors).reduce(
            (accum, next) => [...next, ...accum],
            []
          );
          setErrors({ __html: finalErrors.join("<br>") });
        }

        if (error.response.data.error) {
          setError(error.response.data.error);
        }
      });
  };

  return (
    <>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        {error && (
          <div className="text-white bg-red-500 px-2 py-3 rounded shadow text-sm">
            {error}
          </div>
        )}

        {errors.__html && (
          <div
            className="text-white px-2 py-3 bg-red-500 rounded shadow text-sm"
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
              htmlFor="email"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Email address
            </label>
            <div className="mt-2">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
                autoComplete="email"
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
                id="password"
                name="password"
                type="password"
                value={password}
                onChange={(ev) => setPasword(ev.target.value)}
                autoComplete="current-password"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Sign in
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Create new account
          <Link
            to="/signup"
            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
          >
            Signup
          </Link>
        </p>
      </div>
    </>
  );
}
