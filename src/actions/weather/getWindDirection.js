import Windrose from "windrose"
import { translations } from "../../constants.js"; 

const getWindDirection = (degree) => {
    const direction = Windrose.getPoint(degree, { depth: 1 });
    return translations[direction.symbol];
}

export default getWindDirection;