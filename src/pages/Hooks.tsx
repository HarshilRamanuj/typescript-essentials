import UseState from "../components/HooksPractice/UseState";
import UseContext1 from "../components/HooksPractice/UseContext/UseContext1";
import UseEffect from "../components/HooksPractice/UseEffect";

const Hooks = () => {
  return (
    <div>
      <UseState />
      <UseContext1>Theme Button</UseContext1>
      <UseEffect />
    </div>
  );
};

export default Hooks;
