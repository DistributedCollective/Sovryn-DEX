import { BigNumber } from "ethers";
import { fromSqrtPrice } from "../../test/FixedPoint";

console.log(fromSqrtPrice(BigNumber.from("13043817803444843698")))