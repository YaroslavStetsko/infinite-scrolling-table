import { InitialValues } from "../../App.types";
import * as Yup from "yup";

const useFilterBarData = () => {
  const initialValues: InitialValues = {
    sentMin: 0,
    sentMax: 0,
    receivedMin: 0,
    receivedMax: 0,
  };

  const validationSchema = Yup.object({
    sentMin: Yup.number().required(),
    sentMax: Yup.number().required(),
    receivedMin: Yup.number().required(),
    receivedMax: Yup.number().required(),
  });

  return { initialValues, validationSchema };
};

export { useFilterBarData };
