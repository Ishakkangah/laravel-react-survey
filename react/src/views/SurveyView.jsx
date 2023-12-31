import { PhotoIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import TButton from "../components/core/TButton";
import PageComponent from "../components/PageComponent";

export default function SurveysView() {
  const [survey, setSurvey] = useState({
    title: "",
    slug: "",
    status: false,
    description: "",
    image: null,
    image_url: null,
    expire_date: "",
    questions: [],
  });

  const onSubmit = (e) => {
    e.preeventDefault();
    console.log("on submit");
  };

  const onImageChoose = () => {
    console.log("on image choose");
  };
  return (
    <>
      <PageComponent title="Create new survey">
        <form action="#" method="POST" onSubmit={onSubmit}>
          <div className="shadow sm:overflow-hidden sm:rounded-md">
            <div className="space-y-6 bg-white px-4 py-5 sm:p-6">
              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Photo
                </label>
                <div className="mt-1 flex items-center">
                  {survey.image_url && (
                    <img
                      src={survey.image_url}
                      alt={survey.title}
                      className="w-32 h-32 object-cover"
                    />
                  )}
                  {!survey.image_url && (
                    <span className="flex justify-center items-center text-gray-400 h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                      <PhotoIcon className="h-8 w-8" />
                    </span>
                  )}
                  <button
                    type="button"
                    className="relative ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                  >
                    <input
                      type="file"
                      className="absolute left-0 top-0 right-0 bottom-0 opacity-0"
                      onChange={onImageChoose}
                    />
                    Change
                  </button>
                </div>
              </div>
              {/* Imag */}

              {/* Title */}
              <div className="col-span-6 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">
                  Survey Title
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={survey.title}
                  onChange={(ev) => {
                    setSurvey({ ...survey, title: ev.target.value });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-50 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              {/* Title */}

              {/* Description */}
              <div className="col-span-6 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={survey.description}
                  onChange={(ev) =>
                    setSurvey({ ...survey, description: ev.target.value })
                  }
                  placeholder="Describe your survey"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-50 focus:ring-indigo-500 sm:text-sm"
                ></textarea>
              </div>
              {/* Description */}

              {/* Expire date */}
              <div className="col-span-6 sm:col-span-3">
                <label className="block text-sm font-medium text-gray-700">
                  Expire date
                </label>
                <input
                  type="date"
                  name="expire_date"
                  id="title"
                  value={survey.expire_date}
                  onChange={(ev) => {
                    setSurvey({ ...survey, expire_date: ev.target.value });
                  }}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-50 focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              {/* Title */}

              {/*  Active */}
              <div className="flex items-start">
                <div className="flex h5 items-center">
                  <input
                    type="checkbox"
                    id="status"
                    name="status"
                    checked={survey.status}
                    onChange={(ev) =>
                      setSurvey({ ...survey, status: ev.target.checked })
                    }
                    className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label className="font-medium text-gray-700">Active</label>
                  <p className="text-gray-500">
                    Whether to make survey publicly available
                  </p>
                </div>
              </div>
              {/* Active */}
            </div>

            <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
              <TButton>Save</TButton>
            </div>
          </div>
        </form>
      </PageComponent>
    </>
  );
}
