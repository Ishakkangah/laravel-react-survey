import PageComponent from "../components/PageComponent";
import SurveyItemList from "../components/SurveyItemList";
import { useStateContext } from "../context/ContextProvider";

export default function Surveys() {
  const { surveys } = useStateContext();
  console.log(surveys);

  const onDeleteClick = () => {
    console.log("on Delete click");
  };

  return (
    <>
      <PageComponent title="Surverys">
        <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {surveys.map((survey) => (
            <SurveyItemList
              survey={survey}
              key={survey.id}
              onDeleteClick={onDeleteClick}
            />
          ))}
        </div>
      </PageComponent>
    </>
  );
}
