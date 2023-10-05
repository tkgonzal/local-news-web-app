// Sample interface to maintain interfaces folder in project directory
import { SampleEnum } from "../enums/sampleEnum.tsx"
import { SampleType } from "../types/sampleType.tsx"

interface SampleInterface {
    colour: SampleEnum
    price: SampleType
}

export type { SampleInterface }