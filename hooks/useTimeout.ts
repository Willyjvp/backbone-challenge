import { hideAlert } from "../context/state/alert.slice";
import { useAppDispatch } from "../context/state/hooks";

export const useTimeoutAlert = () => {

  const dispatch = useAppDispatch();

  const handleTimeoutAlert = (seg: number) => {
    setTimeout(() => {
      dispatch(hideAlert());
    }, seg * 1000);
  };

  return [handleTimeoutAlert];
};