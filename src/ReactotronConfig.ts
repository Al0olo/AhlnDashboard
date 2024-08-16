import apisaucePlugin from 'reactotron-apisauce';
import Reactotron from "reactotron-react-js";
import { reactotronRedux } from "reactotron-redux";

declare global {
    interface Console {
        tron: typeof Reactotron;
    }
}


Reactotron.configure({ name: "AhlanDashBoard" }) // we can use plugins here -- more on this later
    .use(reactotronRedux()) // Integrates with Redux
    .use(apisaucePlugin())
    .connect(); // let's connect!

(Reactotron as any)?.clear();
console.tron = Reactotron;

export default Reactotron;
