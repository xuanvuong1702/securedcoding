import { Steps } from "antd";
import { useState } from "react";
import { fakeDataTimeLineHorizontal } from "../../../../../constant/constants";
import { useDispatch } from "react-redux";
import { incrementByAmount } from "../../../../../store/slices/counterSlice";

const TimeLineHorizontal = () => {
  const [current, setCurrent] = useState(0);
  const dispatch = useDispatch();

  const onChange = (value) => {
    console.log("onChange:", value);
    setCurrent(value);
    dispatch(incrementByAmount(current));
  };
  return (
    <>
      <Steps
        progressDot
        type="navigation"
        current={current}
        onChange={onChange}
        className="site-navigation-steps"
        items={fakeDataTimeLineHorizontal}
      />
    </>
  );
};
export default TimeLineHorizontal;
