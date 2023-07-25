import {
  ArrowTopRightOnSquareIcon,
  PencilIcon,
  TrashIcon,
} from "@heroicons/react/24/outline";
import TButton from "./core/TButton";

export default function SurveyItemList({ survey, onDeleteClick }) {
  return (
    <div className="flex flex-col py-4 px-6 shadow-md bg-white hover:bg-gray-600 h-[470px]">
      <img
        src={survey.image_url}
        alt={survey.title}
        className="w-full h-48 object-cover"
      />
      <h4 className="mt-4 text-lg font-bold">{survey.title}</h4>
      <div
        dangerouslySetInnerHTML={{ __html: survey.description }}
        className="overflow-hidden flex-1"
      ></div>
      <div className="flex justify-between items-center mt-3">
        <TButton to={`/survey/${survey.id}`}>
          <PencilIcon className="w-5 h-5" />
        </TButton>
        <div className="flex items-center">
          <TButton href={`/survey/view/${survey.slug}`} circle link>
            <ArrowTopRightOnSquareIcon className="w-5 h-5" />
          </TButton>
          {survey.id && (
            <TButton onClick={onDeleteClick} circle link color="red">
              <TrashIcon className="w-5 h-5" />
            </TButton>
          )}
        </div>
      </div>
    </div>
  );
}
