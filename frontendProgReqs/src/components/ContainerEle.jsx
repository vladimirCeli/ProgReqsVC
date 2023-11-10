const Container = (props) => {
    return (
      <div
        className={`bg-gradient-to-b from-indigo-100 to-slate-300 min-h-screen p-8 w-full ${
          props.className ? props.className : ""
        }`}>
        {props.children}
      </div>
    );
  }
  
  export default Container;